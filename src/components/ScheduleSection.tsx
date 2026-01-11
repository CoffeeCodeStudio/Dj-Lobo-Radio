import { useEffect, useRef } from "react";
import { Radio, Calendar, Clock } from "lucide-react";

interface ShowCard {
  id: number;
  name: string;
  genre: string;
  day: string;
  time: string;
  isLive?: boolean;
}

const ScheduleSection = () => {
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

  const shows: ShowCard[] = [
    {
      id: 1,
      name: "Neon Nights",
      genre: "80s Synthpop & New Wave",
      day: "Fredag",
      time: "20:00 - 00:00",
      isLive: true,
    },
    {
      id: 2,
      name: "Retro Rewind",
      genre: "90s Dance & Eurodance",
      day: "Lördag",
      time: "18:00 - 22:00",
    },
    {
      id: 3,
      name: "Sunday Grooves",
      genre: "80s Rock & Power Ballads",
      day: "Söndag",
      time: "16:00 - 20:00",
    },
    {
      id: 4,
      name: "Throwback Thursday",
      genre: "90s Hip-Hop & R&B",
      day: "Torsdag",
      time: "21:00 - 01:00",
    },
    {
      id: 5,
      name: "Midnight Mix",
      genre: "80s & 90s Mix",
      day: "Onsdag",
      time: "22:00 - 02:00",
    },
    {
      id: 6,
      name: "Vinyl Sessions",
      genre: "Classic Vinyl Spins",
      day: "Måndag",
      time: "19:00 - 22:00",
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="schedule" 
      className="py-16 sm:py-24 px-4 sm:px-6 relative"
      aria-labelledby="schedule-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 scroll-reveal">
          <h2 
            id="schedule-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neon-gradient mb-3 sm:mb-4 italic"
          >
            KOMMANDE DJ SETS
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Missa inte dessa fantastiska shower fyllda med de bästa 80- och 90-talshitsen
          </p>
        </div>

        {/* Shows Grid */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
          {shows.map((show) => (
            <li
              key={show.id}
              className={`scroll-reveal relative ${
                show.isLive ? "glass-card-pink" : "glass-card"
              } p-5 sm:p-6 hover:scale-[1.02] transition-transform focus-within:scale-[1.02]`}
            >
              <article aria-labelledby={`show-${show.id}-title`}>
                {/* Live Badge */}
                {show.isLive && (
                  <div 
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-2 bg-neon-pink/20 px-2.5 sm:px-3 py-1 rounded-full"
                    role="status"
                    aria-label="Live just nu"
                  >
                    <div className="w-2 h-2 bg-neon-pink rounded-full live-dot" aria-hidden="true"></div>
                    <span className="text-neon-pink text-xs font-bold">LIVE</span>
                  </div>
                )}

                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-neon-pink to-neon-cyan flex items-center justify-center mb-3 sm:mb-4" aria-hidden="true">
                  <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                {/* Show Name */}
                <h3 
                  id={`show-${show.id}-title`}
                  className="font-display text-lg sm:text-xl font-bold mb-2 sm:mb-3"
                >
                  {show.name}
                </h3>

                {/* Genre Tag */}
                <span className="genre-tag text-xs px-2.5 sm:px-3 py-1 rounded-full inline-block mb-3 sm:mb-4">
                  {show.genre}
                </span>

                {/* Day and Time */}
                <dl className="space-y-1.5 sm:space-y-2 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <dt className="sr-only">Dag</dt>
                    <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <dd>{show.day}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="sr-only">Tid</dt>
                    <Clock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <dd>{show.time}</dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ScheduleSection;
