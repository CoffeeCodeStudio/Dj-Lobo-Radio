import BookingSection from "@/components/BookingSection";
import CalendarSection from "@/components/CalendarSection";
import ScheduleSection from "@/components/ScheduleSection";
import EquipmentSection from "@/components/EquipmentSection";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  sv: {
    pageTitle: "SPELNINGAR",
    pageSubtitle: "Kommande event, boka din spelning och se vår utrustning",
  },
  en: {
    pageTitle: "SHOWS",
    pageSubtitle: "Upcoming events, book your show and see our equipment",
  },
  es: {
    pageTitle: "SHOWS",
    pageSubtitle: "Próximos eventos, reserva tu show y conoce nuestro equipo",
  },
};

const SpelningarPage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <section className="pt-12 sm:pt-16 pb-4 text-center px-4">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neon-gradient mb-3 italic">
          {t.pageTitle}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          {t.pageSubtitle}
        </p>
      </section>

      {/* Calendar / Schedule */}
      <ErrorBoundary>
        <CalendarSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <ScheduleSection />
      </ErrorBoundary>

      {/* Booking Form */}
      <div id="boka">
        <BookingSection />
      </div>

      {/* Equipment — bottom section */}
      <ErrorBoundary>
        <EquipmentSection />
      </ErrorBoundary>

      <Footer />
    </div>
  );
};

export default SpelningarPage;
