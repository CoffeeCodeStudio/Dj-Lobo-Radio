import { Globe, ChevronDown, Instagram, Facebook, Youtube } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Language = "sv" | "en" | "es";

interface LanguageOption {
  code: Language;
  flag: string;
  label: string;
}

const languages: LanguageOption[] = [
  { code: "sv", flag: "🇸🇪", label: "Svenska" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "es", flag: "🇪🇸", label: "Español" },
];

const Header = () => {
  const [language, setLanguage] = useState<Language>("sv");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language)!;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, langCode: Language) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setLanguage(langCode);
      setIsOpen(false);
    }
  };

  const socialLinks = {
    instagram: "https://www.instagram.com/djloboradio",
    facebook: "https://www.facebook.com/djloboradiodjs/",
    youtube: "https://www.youtube.com/@djloboradio",
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

        {/* Social Links - Center */}
        <nav aria-label="Sociala medier" className="hidden sm:flex items-center gap-2">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Följ på Instagram"
            className="tap-target w-10 h-10 glass-card rounded-full flex items-center justify-center hover:border-neon-pink/50 transition-all duration-300 group focus-neon"
            style={{ boxShadow: "0 0 10px rgba(253, 29, 29, 0.2)" }}
          >
            <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-[#E1306C] transition-colors" />
          </a>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Följ på Facebook"
            className="tap-target w-10 h-10 glass-card rounded-full flex items-center justify-center hover:border-neon-cyan/50 transition-all duration-300 group focus-neon"
            style={{ boxShadow: "0 0 10px rgba(24, 119, 242, 0.2)" }}
          >
            <Facebook className="w-4 h-4 text-muted-foreground group-hover:text-[#1877F2] transition-colors" />
          </a>
          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Prenumerera på YouTube"
            className="tap-target w-10 h-10 glass-card rounded-full flex items-center justify-center hover:border-red-500/50 transition-all duration-300 group focus-neon"
            style={{ boxShadow: "0 0 10px rgba(255, 0, 0, 0.2)" }}
          >
            <Youtube className="w-4 h-4 text-muted-foreground group-hover:text-[#FF0000] transition-colors" />
          </a>
        </nav>

        {/* Language Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={`Välj språk. Nuvarande: ${currentLang.label}`}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            className="tap-target glass-card px-3 sm:px-4 py-2 flex items-center gap-2 hover:border-neon-cyan/50 transition-colors focus-neon rounded-lg"
          >
            <Globe className="w-4 h-4 text-foreground" aria-hidden="true" />
            <span className="text-sm font-medium flex items-center gap-1.5">
              <span aria-hidden="true">{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.label}</span>
            </span>
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} 
              aria-hidden="true" 
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <ul
              role="listbox"
              aria-label="Välj språk"
              className="absolute right-0 mt-2 w-40 glass-card rounded-lg overflow-hidden py-1 shadow-lg border border-neon-cyan/20"
            >
              {languages.map((lang) => (
                <li
                  key={lang.code}
                  role="option"
                  aria-selected={language === lang.code}
                  tabIndex={0}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, lang.code)}
                  className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors focus-neon ${
                    language === lang.code
                      ? "bg-neon-cyan/10 text-neon-cyan"
                      : "hover:bg-muted/50 text-foreground"
                  }`}
                >
                  <span aria-hidden="true">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
