import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  sv: {
    title: "Sekretesspolicy",
    lastUpdated: "Senast uppdaterad: Januari 2026",
    backToHome: "Tillbaka till startsidan",
    intro: "Vi värnar om din integritet. Denna policy förklarar på ett enkelt sätt hur vi hanterar data på DJ Lobo Radio.",
    
    section1Title: "Vilken data samlar vi in?",
    section1Text: "Vi samlar endast in IP-adresser för att skydda vår tjänst mot missbruk. Vi sparar inga namn, e-postadresser eller annan personlig information om dig.",
    
    section2Title: "Varför samlar vi in denna data?",
    section2Text: "Din IP-adress används endast för säkerhet och drift – till exempel för att kunna blockera användare som bryter mot våra regler i chatten.",
    
    section3Title: "Hur länge sparas data?",
    section3Text: "IP-adresser som blockerats sparas så länge blockeringen är aktiv. Efter att blockeringen löpt ut raderas informationen automatiskt.",
    
    section4Title: "Dina rättigheter enligt GDPR",
    section4Text: "Du har rätt att begära information om vilken data vi har om dig, samt begära att den raderas. Kontakta oss via e-post för sådana förfrågningar.",
    
    section5Title: "Kontakta oss",
    section5Text: "Har du frågor om din data eller vill begära borttagning? Kontakta oss på:",
    contactEmail: "info@djloboradio.com",
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: January 2026",
    backToHome: "Back to homepage",
    intro: "We care about your privacy. This policy explains in simple terms how we handle data at DJ Lobo Radio.",
    
    section1Title: "What data do we collect?",
    section1Text: "We only collect IP addresses to protect our service from abuse. We do not store names, email addresses, or any other personal information about you.",
    
    section2Title: "Why do we collect this data?",
    section2Text: "Your IP address is used only for security and operations – for example, to block users who violate our rules in the chat.",
    
    section3Title: "How long is data stored?",
    section3Text: "Blocked IP addresses are stored as long as the block is active. After the block expires, the information is automatically deleted.",
    
    section4Title: "Your rights under GDPR",
    section4Text: "You have the right to request information about what data we have about you, and to request its deletion. Contact us via email for such requests.",
    
    section5Title: "Contact us",
    section5Text: "Have questions about your data or want to request deletion? Contact us at:",
    contactEmail: "info@djloboradio.com",
  },
  es: {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: Enero 2026",
    backToHome: "Volver a la página principal",
    intro: "Nos importa tu privacidad. Esta política explica de forma sencilla cómo manejamos los datos en DJ Lobo Radio.",
    
    section1Title: "¿Qué datos recopilamos?",
    section1Text: "Solo recopilamos direcciones IP para proteger nuestro servicio contra abusos. No guardamos nombres, correos electrónicos ni otra información personal sobre ti.",
    
    section2Title: "¿Por qué recopilamos estos datos?",
    section2Text: "Tu dirección IP se usa únicamente para seguridad y operación – por ejemplo, para bloquear usuarios que violen nuestras reglas en el chat.",
    
    section3Title: "¿Cuánto tiempo se almacenan los datos?",
    section3Text: "Las direcciones IP bloqueadas se almacenan mientras el bloqueo esté activo. Después de que expire, la información se elimina automáticamente.",
    
    section4Title: "Tus derechos según el GDPR",
    section4Text: "Tienes derecho a solicitar información sobre qué datos tenemos sobre ti y a solicitar su eliminación. Contáctanos por correo electrónico para tales solicitudes.",
    
    section5Title: "Contáctanos",
    section5Text: "¿Tienes preguntas sobre tus datos o quieres solicitar su eliminación? Contáctanos en:",
    contactEmail: "info@djloboradio.com",
  },
};

const PrivacyPolicy = () => {
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
              <Shield className="w-8 h-8 text-neon-cyan" />
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
              <p className="text-foreground/80 mb-2">{t.section5Text}</p>
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

export default PrivacyPolicy;
