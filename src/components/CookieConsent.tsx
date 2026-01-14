import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const translations = {
  sv: {
    message: "Vi använder cookies för att förbättra din upplevelse och för att komma ihåg dina inställningar.",
    accept: "Jag förstår",
    learnMore: "Läs mer",
  },
  en: {
    message: "We use cookies to improve your experience and to remember your settings.",
    accept: "I understand",
    learnMore: "Learn more",
  },
  es: {
    message: "Usamos cookies para mejorar tu experiencia y recordar tus configuraciones.",
    accept: "Entiendo",
    learnMore: "Más información",
  },
};

const COOKIE_CONSENT_KEY = "dj-lobo-cookie-consent";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-20 sm:bottom-24 left-4 right-4 z-50 animate-fade-in"
      role="dialog"
      aria-label="Cookie-meddelande"
    >
      <div className="max-w-lg mx-auto glass-card rounded-xl p-4 shadow-lg border border-white/10">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground/90 mb-3">
              {t.message}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                onClick={handleAccept}
                size="sm"
                className="bg-neon-cyan text-background hover:bg-neon-cyan/90"
              >
                {t.accept}
              </Button>
              <Link 
                to="/privacy" 
                className="text-xs text-neon-cyan hover:underline"
              >
                {t.learnMore}
              </Link>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Stäng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
