import djLoboImage from "@/assets/dj-lobo-real.jpg";
import { Radio } from "lucide-react";

const HeroSection = () => {
  const scrollToSchedule = () => {
    document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-32 relative"
      aria-labelledby="hero-title"
    >
      {/* On Air Badge */}
      <div 
        className="glass-card-pink on-air-pulse px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3"
        role="status"
        aria-live="polite"
        aria-label="DJ Lobo är på luften just nu"
      >
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-neon-pink rounded-full live-dot" aria-hidden="true"></div>
        <span className="font-display font-bold text-neon-pink tracking-wider text-sm sm:text-base">
          PÅ LUFTEN
        </span>
      </div>

      {/* DJ Image with neon border */}
      <div className="relative mb-6 sm:mb-8">
        <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden neon-border-gradient">
          <img
            src={djLoboImage}
            alt="DJ Lobo vid mixerbordet med hörlurar"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* Glow effect behind image */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-pink/30 to-neon-cyan/30 blur-3xl -z-10 scale-110" aria-hidden="true"></div>
      </div>

      {/* Title */}
      <h1 
        id="hero-title"
        className="font-display text-5xl sm:text-6xl md:text-8xl font-black text-neon-gradient mb-3 sm:mb-4 tracking-wider text-high-contrast"
      >
        DJ LOBO
      </h1>

      {/* Tagline */}
      <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-2 text-center">
        Din port till <span className="text-neon-pink font-semibold">80s</span> &{" "}
        <span className="text-neon-cyan font-semibold">90s</span>
      </p>

      {/* Radio vibes */}
      <div className="flex items-center gap-2 sm:gap-3 text-neon-cyan mb-6 sm:mb-8" aria-hidden="true">
        <Radio className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="font-display text-xs sm:text-sm tracking-widest">
          RETRO RADIO VIBES
        </span>
        <Radio className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* CTA Button */}
      <button
        onClick={scrollToSchedule}
        aria-label="Scrolla ner till schemat"
        className="tap-target glass-card px-6 sm:px-8 py-3 sm:py-4 font-display font-bold tracking-wider hover:bg-muted/50 hover:border-neon-cyan/50 transition-all hover:scale-105 focus-neon rounded-lg"
      >
        SE SCHEMA
      </button>
    </section>
  );
};

export default HeroSection;
