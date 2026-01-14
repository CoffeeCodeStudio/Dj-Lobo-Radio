import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  sv: {
    title: "Användarvillkor",
    lastUpdated: "Senast uppdaterad: Januari 2026",
    backToHome: "Tillbaka till startsidan",
    intro: "Genom att använda DJ Lobo Radio godkänner du dessa villkor. Läs dem noggrant.",
    
    section1Title: "Acceptans av villkor",
    section1Text: "När du använder vår tjänst accepterar du att följa dessa regler. Om du inte godkänner villkoren, vänligen sluta använda tjänsten.",
    
    section2Title: "Användning av chatten",
    section2Text: "Vår chat är till för att sprida glädje. Respektera andra användare – hotfulla, kränkande eller olagliga meddelanden tolereras inte.",
    
    section3Title: "IP-blockering",
    section3Text: "Vi kan blockera din IP-adress om du bryter mot våra regler. Detta görs för att skydda alla användare och säkerställa en trygg miljö.",
    
    section4Title: "Ansvarsbegränsning",
    section4Text: "Vi gör vårt bästa för att hålla tjänsten igång, men vi kan inte garantera att allt alltid fungerar perfekt. Vi ansvarar inte för tekniska problem, avbrott eller dataförlust.",
    
    section5Title: "Ändringar av villkoren",
    section5Text: "Vi kan uppdatera dessa villkor vid behov. Fortsatt användning efter ändringar innebär att du accepterar de nya villkoren.",
    
    section6Title: "Kontakt",
    section6Text: "Frågor om villkoren? Kontakta oss på:",
    contactEmail: "info@djloboradio.com",
  },
  en: {
    title: "Terms of Service",
    lastUpdated: "Last updated: January 2026",
    backToHome: "Back to homepage",
    intro: "By using DJ Lobo Radio, you agree to these terms. Please read them carefully.",
    
    section1Title: "Acceptance of Terms",
    section1Text: "By using our service, you agree to follow these rules. If you do not accept the terms, please stop using the service.",
    
    section2Title: "Chat Usage",
    section2Text: "Our chat is meant to spread joy. Respect other users – threatening, offensive, or illegal messages will not be tolerated.",
    
    section3Title: "IP Blocking",
    section3Text: "We may block your IP address if you violate our rules. This is done to protect all users and ensure a safe environment.",
    
    section4Title: "Limitation of Liability",
    section4Text: "We do our best to keep the service running, but we cannot guarantee everything will always work perfectly. We are not responsible for technical issues, interruptions, or data loss.",
    
    section5Title: "Changes to Terms",
    section5Text: "We may update these terms as needed. Continued use after changes means you accept the new terms.",
    
    section6Title: "Contact",
    section6Text: "Questions about the terms? Contact us at:",
    contactEmail: "info@djloboradio.com",
  },
  es: {
    title: "Términos de Servicio",
    lastUpdated: "Última actualización: Enero 2026",
    backToHome: "Volver a la página principal",
    intro: "Al usar DJ Lobo Radio, aceptas estos términos. Por favor léelos cuidadosamente.",
    
    section1Title: "Aceptación de Términos",
    section1Text: "Al usar nuestro servicio, aceptas seguir estas reglas. Si no aceptas los términos, por favor deja de usar el servicio.",
    
    section2Title: "Uso del Chat",
    section2Text: "Nuestro chat está hecho para difundir alegría. Respeta a otros usuarios – mensajes amenazantes, ofensivos o ilegales no serán tolerados.",
    
    section3Title: "Bloqueo de IP",
    section3Text: "Podemos bloquear tu dirección IP si violas nuestras reglas. Esto se hace para proteger a todos los usuarios y asegurar un ambiente seguro.",
    
    section4Title: "Limitación de Responsabilidad",
    section4Text: "Hacemos lo posible para mantener el servicio funcionando, pero no podemos garantizar que todo funcione perfectamente siempre. No somos responsables de problemas técnicos, interrupciones o pérdida de datos.",
    
    section5Title: "Cambios en los Términos",
    section5Text: "Podemos actualizar estos términos según sea necesario. El uso continuado después de los cambios significa que aceptas los nuevos términos.",
    
    section6Title: "Contacto",
    section6Text: "¿Preguntas sobre los términos? Contáctanos en:",
    contactEmail: "info@djloboradio.com",
  },
};

const TermsOfService = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Light leak backgrounds */}
      <div className="light-leak-purple" aria-hidden="true"></div>
      <div className="light-leak-blue" aria-hidden="true"></div>

      <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-neon-cyan hover:underline mb-8 focus-neon rounded px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToHome}
          </Link>

          {/* Header */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-neon-cyan" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{t.title}</h1>
            </div>
            <p className="text-muted-foreground text-sm">{t.lastUpdated}</p>
            <p className="text-foreground/90 mt-4">{t.intro}</p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-3">{t.section1Title}</h2>
              <p className="text-foreground/80">{t.section1Text}</p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-3">{t.section2Title}</h2>
              <p className="text-foreground/80">{t.section2Text}</p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-3">{t.section3Title}</h2>
              <p className="text-foreground/80">{t.section3Text}</p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-3">{t.section4Title}</h2>
              <p className="text-foreground/80">{t.section4Text}</p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-3">{t.section5Title}</h2>
              <p className="text-foreground/80">{t.section5Text}</p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-3">{t.section6Title}</h2>
              <p className="text-foreground/80 mb-2">{t.section6Text}</p>
              <a 
                href={`mailto:${t.contactEmail}`}
                className="text-neon-cyan hover:underline font-medium"
              >
                {t.contactEmail}
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
