import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CALENDAR_ID = "djloboradio2016@gmail.com";

const translations = {
  sv: {
    title: "KALENDER",
    subtitle: "Kommande shower och events",
    calendarTitle: "DJ Lobo Radio Kalender - kommande shower och events",
  },
  en: {
    title: "CALENDAR",
    subtitle: "Upcoming shows and events",
    calendarTitle: "DJ Lobo Radio Calendar - upcoming shows and events",
  },
  es: {
    title: "CALENDARIO",
    subtitle: "Próximos shows y eventos",
    calendarTitle: "Calendario de DJ Lobo Radio - próximos shows y eventos",
  },
};

const CalendarSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const t = translations[language];

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

  const calendarSrc = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=Europe%2FStockholm&mode=AGENDA&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&bgcolor=%23000000`;

  return (
    <section 
      ref={sectionRef} 
      id="calendar" 
      className="py-16 sm:py-24 px-4 sm:px-6 relative"
      aria-labelledby="calendar-title"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 scroll-reveal">
          <h2 
            id="calendar-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neon-gradient mb-3 sm:mb-4 italic"
          >
            {t.title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Google Calendar Embed */}
        <div className="scroll-reveal glass-card p-2 overflow-hidden">
          <iframe
            src={calendarSrc}
            style={{ border: 0 }}
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            className="rounded-lg sm:h-[500px]"
            title={t.calendarTitle}
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
