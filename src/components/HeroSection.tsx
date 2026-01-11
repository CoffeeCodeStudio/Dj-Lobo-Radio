import djLoboImage from "@/assets/dj-lobo-real.jpg";
import { Radio, MessageCircle } from "lucide-react";
import { useBranding } from "@/hooks/useBranding";
import { usePresence } from "@/hooks/usePresence";

const HeroSection = () => {
  const { branding } = useBranding();
  const { listenerCount } = usePresence();
  
  const scrollToSchedule = () => {
    document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
  };

  // Use dynamic profile image if available, otherwise use the default
  const profileImage = branding?.profile_image_url || djLoboImage;
  const siteName = branding?.site_name || "DJ LOBO";

  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-32 relative"
      aria-labelledby="hero-title"
    >
      {/* On Air Badge + Live Chat Counter */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        {/* On Air Badge */}
        <div 
          className="glass-card-pink on-air-pulse px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2 sm:gap-3"
          role="status"
          aria-live="polite"
          aria-label="DJ Lobo är på luften just nu"
        >
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-neon-pink rounded-full live-dot" aria-hidden="true"></div>
          <span className="font-display font-bold text-neon-pink tracking-wider text-sm sm:text-base">
            PÅ LUFTEN
          </span>
        </div>

        {/* Live Chat Counter - FOMO indicator */}
        {listenerCount > 0 && (
          <button
            onClick={() => document.getElementById("live-chat-section")?.scrollIntoView({ behavior: "smooth" })}
            className="glass-card px-4 sm:px-5 py-2 sm:py-3 flex items-center gap-2 hover:border-neon-cyan/50 transition-all hover:scale-105 cursor-pointer group"
            aria-label={`${listenerCount} fans chattar just nu, klicka för att gå till chatten`}
          >
            <MessageCircle className="w-4 h-4 text-neon-cyan group-hover:animate-bounce" aria-hidden="true" />
            <span className="text-sm sm:text-base">
              <span className="font-bold text-neon-cyan">{listenerCount}</span>
              <span className="text-muted-foreground ml-1.5 hidden sm:inline">fans chattar</span>
              <span className="text-muted-foreground ml-1.5 sm:hidden">💬</span>
            </span>
          </button>
        )}
      </div>

      {/* DJ Image with neon border */}
      <div className="relative mb-6 sm:mb-8">
        <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden neon-border-gradient">
          <img
            src={profileImage}
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
        {siteName.toUpperCase().replace(" RADIO", "")}
      </h1>

      {/* Tagline */}
      <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-2 text-center">
        Din port till <span className="text-neon-pink font-semibold">80s</span>,{" "}
        <span className="text-neon-cyan font-semibold">90s</span> &{" "}
        <span className="text-neon-pink font-semibold">Latin</span>
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
