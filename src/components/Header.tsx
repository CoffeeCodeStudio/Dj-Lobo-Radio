import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import djLoboLogo from "@/assets/dj-lobo-badge.png";
interface LanguageOption {
  code: Language;
  flag: string;
  label: string;
}
const languages: LanguageOption[] = [{
  code: "sv",
  flag: "🇸🇪",
  label: "Svenska"
}, {
  code: "en",
  flag: "🇬🇧",
  label: "English"
}, {
  code: "es",
  flag: "🇪🇸",
  label: "Español"
}];
const Header = () => {
  const {
    language,
    setLanguage
  } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLang = languages.find(l => l.code === language)!;
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
  return <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 py-2 sm:py-3 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        {/* Logo */}
        <a href="#" className="glass-card p-1.5 sm:p-2 focus-neon rounded-lg hover:scale-105 transition-transform" aria-label="DJ Lobo Radio - Hem">
          <img alt="DJ Lobo Radio Logo" className="h-10 sm:h-12 w-auto object-contain" src="/lovable-uploads/d7a552ee-7bb3-4dcb-9586-43d61b794a27.jpg" />
        </a>

        {/* Language Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setIsOpen(!isOpen)} aria-label={`Välj språk. Nuvarande: ${currentLang.label}`} aria-expanded={isOpen} aria-haspopup="listbox" className="tap-target glass-card px-3 sm:px-4 py-2 flex items-center gap-2 hover:border-neon-cyan/50 transition-colors focus-neon rounded-lg">
            <Globe className="w-4 h-4 text-foreground" aria-hidden="true" />
            <span className="text-sm font-medium flex items-center gap-1.5">
              <span aria-hidden="true">{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.label}</span>
            </span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && <ul role="listbox" aria-label="Välj språk" className="absolute right-0 mt-2 w-40 glass-card rounded-lg overflow-hidden py-1 shadow-lg border border-neon-cyan/20 z-[60]">
              {languages.map(lang => <li key={lang.code} role="option" aria-selected={language === lang.code} tabIndex={0} onClick={() => {
            setLanguage(lang.code);
            setIsOpen(false);
          }} onKeyDown={e => handleKeyDown(e, lang.code)} className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors focus-neon ${language === lang.code ? "bg-neon-cyan/10 text-neon-cyan" : "hover:bg-muted/50 text-foreground"}`}>
                  <span aria-hidden="true">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.label}</span>
                </li>)}
            </ul>}
        </div>
      </div>
    </header>;
};
export default Header;