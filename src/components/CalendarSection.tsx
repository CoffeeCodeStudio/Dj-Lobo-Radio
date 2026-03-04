import { useEffect, useRef } from "react";
import { MapPin, Clock, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { Skeleton } from "@/components/ui/skeleton";

const translations = {
  sv: {
    title: "KOMMANDE SPELNINGAR",
    subtitle: "Missa inte dessa spelningar",
    noEvents: "Inga kommande spelningar just nu",
    locationTBA: "Plats meddelas",
    errorMessage: "Kunde inte ladda spelningar just nu",
    retry: "Försök igen",
  },
  en: {
    title: "UPCOMING EVENTS",
    subtitle: "Don't miss these shows",
    noEvents: "No upcoming shows right now",
    locationTBA: "Location TBA",
    errorMessage: "Could not load shows right now",
    retry: "Try again",
  },
  es: {
    title: "PRÓXIMOS EVENTOS",
    subtitle: "No te pierdas estos shows",
    noEvents: "No hay shows próximos",
    locationTBA: "Lugar por confirmar",
    errorMessage: "No se pudieron cargar los shows",
    retry: "Reintentar",
  },
};

const SkeletonEvent = () => (
  <li className="flex items-center gap-4 px-4 sm:px-6 py-4">
    <Skeleton className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/5" />
      <Skeleton className="h-3 w-2/5" />
    </div>
  </li>
);

const CalendarSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const t = translations[language];
  const { events, loading, error, refetch } = useCalendarEvents();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".scroll-reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="calendar"
      className="py-12 sm:py-16 relative"
      aria-labelledby="calendar-title"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10 scroll-reveal">
          <h2
            id="calendar-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neon-gradient mb-2 italic"
          >
            {t.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">{t.subtitle}</p>
        </div>

        {/* Event list container */}
        <div className="scroll-reveal rounded-2xl border border-neon-cyan/20 bg-background/40 backdrop-blur-md overflow-hidden" style={{ boxShadow: '0 0 30px -10px hsla(180, 100%, 50%, 0.15)' }}>
          {/* Skeleton loading */}
          {loading && events.length === 0 && (
            <ul role="list" className="divide-y divide-neon-cyan/10">
              <SkeletonEvent />
              <SkeletonEvent />
              <SkeletonEvent />
            </ul>
          )}

          {/* Error state */}
          {!loading && error && events.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <AlertCircle className="w-8 h-8 text-muted-foreground/50" />
              <p className="text-muted-foreground text-sm">{t.errorMessage}</p>
              <button
                onClick={refetch}
                className="text-xs text-neon-cyan hover:underline transition-colors"
              >
                {t.retry}
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && events.length === 0 && (
            <p className="text-center text-muted-foreground py-12 text-sm">
              {t.noEvents}
            </p>
          )}

          {/* Events */}
          {events.length > 0 && (
            <ul role="list" className="divide-y divide-neon-cyan/10">
              {events.map((event, i) => {
                const day = event.date.getDate();
                const month = event.date.toLocaleString(language === "sv" ? "sv-SE" : language === "es" ? "es-ES" : "en-US", { month: "short" }).toUpperCase();

                return (
                  <li
                    key={event.id}
                    className="scroll-reveal group flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-white/[0.03] transition-colors"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {/* Date block */}
                    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#FF8C00]/10 border border-[#FFD700]/30 flex flex-col items-center justify-center">
                      <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#FFD700]/80">
                        {month}
                      </span>
                      <span className="text-xl sm:text-2xl font-display font-black text-[#FFD700]">
                        {day}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#FFD700] truncate">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-xs sm:text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neon-cyan" aria-hidden="true" />
                          {event.timeFormatted}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-neon-cyan" aria-hidden="true" />
                            {event.location || t.locationTBA}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
