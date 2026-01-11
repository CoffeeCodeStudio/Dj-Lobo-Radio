import { useEffect, useRef } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";

const translations = {
  sv: {
    title: "KOMMANDE DJ SETS",
    subtitle: "Missa inte dessa fantastiska shower",
    locationTBA: "Plats meddelas",
    placeholder: "Platshållare – koppla kalender i admin",
  },
  en: {
    title: "UPCOMING DJ SETS",
    subtitle: "Don't miss these amazing shows",
    locationTBA: "Location TBA",
    placeholder: "Placeholder – connect calendar in admin",
  },
  es: {
    title: "PRÓXIMOS DJ SETS",
    subtitle: "No te pierdas estos increíbles shows",
    locationTBA: "Lugar por confirmar",
    placeholder: "Marcador – conectar calendario en admin",
  },
};

const ScheduleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const t = translations[language];
  const { events, loading, isPlaceholder } = useCalendarEvents();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".scroll-reveal").forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("revealed");
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="schedule" 
      className="py-16 sm:py-24 px-4 sm:px-6 relative"
      aria-labelledby="schedule-title"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 scroll-reveal">
          <h2 
            id="schedule-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neon-gradient mb-3 sm:mb-4 italic"
          >
            {t.title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="loading-spinner" />
          </div>
        )}

        {/* Events List */}
        {!loading && (
          <ul className="space-y-4" role="list">
            {events.map((event, index) => (
              <li
                key={event.id}
                className="scroll-reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <article 
                  className="schedule-event-card glass-card p-5 sm:p-6 border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-[1.02]"
                  aria-labelledby={`event-${event.id}-title`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Date badge */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple flex flex-col items-center justify-center text-white shadow-lg shadow-neon-pink/20">
                        <span className="text-xs sm:text-sm font-medium uppercase tracking-wide">
                          {event.dateFormatted}
                        </span>
                        <span className="text-xl sm:text-2xl font-display font-bold">
                          {event.timeFormatted}
                        </span>
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="flex-1 min-w-0">
                      <h3 
                        id={`event-${event.id}-title`}
                        className="font-display text-lg sm:text-xl font-bold text-foreground mb-2 truncate"
                      >
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 flex-shrink-0 text-neon-cyan" aria-hidden="true" />
                        <span className="text-sm sm:text-base truncate">
                          {event.location || t.locationTBA}
                        </span>
                      </div>
                    </div>

                    {/* Neon glow accent */}
                    <div 
                      className="hidden sm:block w-1 h-16 rounded-full bg-gradient-to-b from-neon-pink via-neon-purple to-neon-cyan opacity-60"
                      aria-hidden="true"
                    />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        {/* Placeholder notice */}
        {isPlaceholder && !loading && (
          <p className="text-center text-xs text-muted-foreground mt-6 opacity-60">
            {t.placeholder}
          </p>
        )}
      </div>
    </section>
  );
};

export default ScheduleSection;
