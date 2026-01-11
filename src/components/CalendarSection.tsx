import { useEffect, useRef } from "react";

const CALENDAR_ID = "djloboradio2016@gmail.com";

const CalendarSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="calendar" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-neon-gradient mb-4 italic">
            KALENDER
          </h2>
          <p className="text-muted-foreground text-lg">
            Kommande shower och events
          </p>
        </div>

        {/* Google Calendar Embed */}
        <div className="scroll-reveal glass-card p-2 overflow-hidden">
          <iframe
            src={calendarSrc}
            style={{ border: 0 }}
            width="100%"
            height="500"
            frameBorder="0"
            scrolling="no"
            className="rounded-lg"
            title="DJ Lobo Radio Kalender"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
