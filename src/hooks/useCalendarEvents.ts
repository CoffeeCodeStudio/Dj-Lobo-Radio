import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface CalendarEvent {
  id: string;
  title: string;
  location: string;
  date: Date;
  dateFormatted: string;
  timeFormatted: string;
}

// Helper to get upcoming day name
const getUpcomingDay = (daysFromNow: number): string => {
  const date = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
  const dayNames = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
  return dayNames[date.getDay()];
};

const PLACEHOLDER_EVENTS: CalendarEvent[] = [
  {
    id: "placeholder-1",
    title: "🎧 DJ Lobo Live - 80s & 90s Classics",
    location: "Online Stream @ djloboradio.com",
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    dateFormatted: getUpcomingDay(1),
    timeFormatted: "20:00",
  },
  {
    id: "placeholder-2",
    title: "🔥 Latin Night Fiesta",
    location: "Online Stream @ djloboradio.com",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    dateFormatted: getUpcomingDay(3),
    timeFormatted: "21:00",
  },
  {
    id: "placeholder-3",
    title: "💃 Salsa & Reggaeton Mix",
    location: "Online Stream @ djloboradio.com",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    dateFormatted: getUpcomingDay(5),
    timeFormatted: "19:00",
  },
  {
    id: "placeholder-4",
    title: "🕺 Retro Disco Weekend",
    location: "Online Stream @ djloboradio.com",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    dateFormatted: getUpcomingDay(7),
    timeFormatted: "22:00",
  },
];

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [calendarId, setCalendarId] = useState<string | null>(null);
  const [isPlaceholder, setIsPlaceholder] = useState(false);

  useEffect(() => {
    fetchCalendarId();
  }, []);

  useEffect(() => {
    if (calendarId) {
      fetchCalendarEvents(calendarId);
    } else if (!loading) {
      setEvents(PLACEHOLDER_EVENTS);
      setIsPlaceholder(true);
    }
  }, [calendarId, loading]);

  const fetchCalendarId = async () => {
    const { data, error } = await supabase
      .from("site_branding")
      .select("google_calendar_id")
      .limit(1)
      .maybeSingle();

    if (!error && data?.google_calendar_id) {
      setCalendarId(data.google_calendar_id);
    }
    setLoading(false);
  };

  const fetchCalendarEvents = async (calId: string) => {
    setLoading(true);
    try {
      // Use Google Calendar public JSON feed
      const now = new Date().toISOString();
      const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
      
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events?key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs&timeMin=${now}&timeMax=${maxDate}&singleEvents=true&orderBy=startTime&maxResults=6`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error("Failed to fetch calendar events:", response.status);
        setEvents(PLACEHOLDER_EVENTS);
        setIsPlaceholder(true);
        return;
      }

      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const formattedEvents: CalendarEvent[] = data.items.map((item: any) => {
          const startDate = new Date(item.start.dateTime || item.start.date);
          const dayNames = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
          
          return {
            id: item.id,
            title: item.summary || "Untitled Event",
            location: item.location || "Plats meddelas",
            date: startDate,
            dateFormatted: dayNames[startDate.getDay()],
            timeFormatted: startDate.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" }),
          };
        });
        
        setEvents(formattedEvents);
        setIsPlaceholder(false);
      } else {
        setEvents(PLACEHOLDER_EVENTS);
        setIsPlaceholder(true);
      }
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      setEvents(PLACEHOLDER_EVENTS);
      setIsPlaceholder(true);
    }
    setLoading(false);
  };

  return { events, loading, isPlaceholder, refetch: () => calendarId && fetchCalendarEvents(calendarId) };
};
