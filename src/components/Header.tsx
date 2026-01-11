import { Globe } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [language, setLanguage] = useState<"sv" | "en">("sv");

  const toggleLanguage = () => {
    setLanguage(language === "sv" ? "en" : "sv");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          className="glass-card px-3 sm:px-4 py-2 focus-neon rounded-lg"
          aria-label="DJ Lobo Radio - Hem"
        >
          <div className="flex items-center gap-2 text-neon-cyan">
            <div className="flex items-center" aria-hidden="true">
              <span className="text-base sm:text-lg">((</span>
              <span className="text-base sm:text-lg">•</span>
              <span className="text-base sm:text-lg">))</span>
            </div>
          </div>
        </a>

        {/* Language Selector */}
        <button
          onClick={toggleLanguage}
          aria-label={language === "sv" ? "Byt språk till engelska" : "Switch language to Swedish"}
          className="tap-target glass-card px-3 sm:px-4 py-2 flex items-center gap-2 hover:border-neon-cyan/50 transition-colors focus-neon rounded-lg"
        >
          <Globe className="w-4 h-4 text-foreground" aria-hidden="true" />
          <span className="text-sm font-medium">
            {language === "sv" ? "SE Svenska" : "EN English"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
