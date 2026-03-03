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

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // 1. Get calendar ID from branding
      const { data: branding, error: brandingError } = await supabase
        .from("site_branding")
        .select("google_calendar_id")
        .limit(1)
        .maybeSingle();

      if (brandingError || !branding?.google_calendar_id) {
        console.log("[Calendar] No calendar ID configured");
        setEvents([]);
        setIsPlaceholder(true);
        setLoading(false);
        return;
      }

      // 2. Call edge function to fetch events securely
      const { data, error } = await supabase.functions.invoke("google-calendar", {
        body: { calendarId: branding.google_calendar_id },
      });

      if (error) {
        console.error("[Calendar] Edge function error:", error);
        setEvents([]);
        setIsPlaceholder(true);
        setLoading(false);
        return;
      }

      if (data?.items && data.items.length > 0) {
        const formatted: CalendarEvent[] = data.items.map((item: any) => {
          const startDate = new Date(item.start.dateTime || item.start.date);
          const dayNames = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

          return {
            id: item.id,
            title: item.summary || "Untitled Event",
            location: item.location || "",
            date: startDate,
            dateFormatted: `${dayNames[startDate.getDay()]} ${startDate.getDate()} ${monthNames[startDate.getMonth()]}`,
            timeFormatted: startDate.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" }),
          };
        });

        setEvents(formatted);
        setIsPlaceholder(false);
      } else {
        setEvents([]);
        setIsPlaceholder(true);
      }
    } catch (err) {
      console.error("[Calendar] Unexpected error:", err);
      setEvents([]);
      setIsPlaceholder(true);
    }
    setLoading(false);
  };

  return { events, loading, isPlaceholder, refetch: fetchEvents };
};
