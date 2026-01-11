import { Instagram, Facebook, Headphones, Radio } from "lucide-react";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/djloboradio",
  facebook: "https://www.facebook.com/djloboradiodjs/",
  mixcloud: "https://www.mixcloud.com/DjLobo75/",
};

const Footer = () => {
  return (
    <footer className="py-16 px-6 pb-32 relative">
      <div className="max-w-7xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex items-center text-neon-cyan text-2xl">
            <span>((</span>
            <Radio className="w-5 h-5 mx-1" />
            <span>))</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-neon-gradient">
            DJ LOBO RADIO
          </h3>
        </div>

        {/* Description */}
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Bringing the best of 80s and 90s music to your ears. Tune in and let the
          nostalgia flow.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:border-neon-pink/50 transition-colors group"
          >
            <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-neon-pink transition-colors" />
          </a>
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:border-neon-pink/50 transition-colors group"
          >
            <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-neon-pink transition-colors" />
          </a>
          <a
            href={SOCIAL_LINKS.mixcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:border-neon-pink/50 transition-colors group"
          >
            <Headphones className="w-5 h-5 text-muted-foreground group-hover:text-neon-pink transition-colors" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-muted-foreground text-sm mb-4">
          © 2026 DJ Lobo Radio. All rights reserved.
        </p>

        {/* Legal Links */}
        <div className="flex justify-center gap-4 text-sm">
          <a href="#" className="text-neon-cyan hover:underline">
            Integritetspolicy
          </a>
          <span className="text-muted-foreground">•</span>
          <a href="#" className="text-neon-cyan hover:underline">
            Användarvillkor
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
