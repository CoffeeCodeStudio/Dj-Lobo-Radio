import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Disc3, 
  Headphones, 
  Music2, 
  Radio, 
  Speaker, 
  Mic2,
  MonitorSpeaker,
  Podcast
} from "lucide-react";

interface EquipmentItem {
  icon: React.ElementType;
  name: {
    sv: string;
    en: string;
    es: string;
  };
  description: {
    sv: string;
    en: string;
    es: string;
  };
}

const equipment: EquipmentItem[] = [
  {
    icon: Disc3,
    name: { sv: "Pioneer CDJ-3000", en: "Pioneer CDJ-3000", es: "Pioneer CDJ-3000" },
    description: { 
      sv: "Professionella CD/USB-spelare med 9\" touch-skärm", 
      en: "Professional CD/USB players with 9\" touch screen",
      es: "Reproductores CD/USB profesionales con pantalla táctil de 9\""
    },
  },
  {
    icon: Music2,
    name: { sv: "Pioneer DJM-900NXS2", en: "Pioneer DJM-900NXS2", es: "Pioneer DJM-900NXS2" },
    description: { 
      sv: "4-kanals professionell DJ-mixer", 
      en: "4-channel professional DJ mixer",
      es: "Mezclador DJ profesional de 4 canales"
    },
  },
  {
    icon: Headphones,
    name: { sv: "Sennheiser HD 25", en: "Sennheiser HD 25", es: "Sennheiser HD 25" },
    description: { 
      sv: "Branschstandard DJ-hörlurar", 
      en: "Industry standard DJ headphones",
      es: "Auriculares DJ estándar de la industria"
    },
  },
  {
    icon: Speaker,
    name: { sv: "JBL EON ONE", en: "JBL EON ONE", es: "JBL EON ONE" },
    description: { 
      sv: "Portabla PA-högtalare för mindre evenemang", 
      en: "Portable PA speakers for smaller events",
      es: "Altavoces PA portátiles para eventos pequeños"
    },
  },
  {
    icon: MonitorSpeaker,
    name: { sv: "QSC K12.2", en: "QSC K12.2", es: "QSC K12.2" },
    description: { 
      sv: "Kraftfulla aktiva högtalare för större evenemang", 
      en: "Powerful active speakers for larger events",
      es: "Altavoces activos potentes para eventos grandes"
    },
  },
  {
    icon: Mic2,
    name: { sv: "Shure SM58", en: "Shure SM58", es: "Shure SM58" },
    description: { 
      sv: "Professionell dynamisk mikrofon", 
      en: "Professional dynamic microphone",
      es: "Micrófono dinámico profesional"
    },
  },
  {
    icon: Radio,
    name: { sv: "Streaming Setup", en: "Streaming Setup", es: "Configuración de Streaming" },
    description: { 
      sv: "Komplett utrustning för live streaming", 
      en: "Complete equipment for live streaming",
      es: "Equipamiento completo para streaming en vivo"
    },
  },
  {
    icon: Podcast,
    name: { sv: "Ljusshow", en: "Light Show", es: "Show de Luces" },
    description: { 
      sv: "LED-belysning och lasrar för atmosfär", 
      en: "LED lighting and lasers for atmosphere",
      es: "Iluminación LED y láseres para ambiente"
    },
  },
];

const translations = {
  sv: {
    title: "Min Utrustning",
    subtitle: "Professionell utrustning för alla typer av evenemang",
    quality: "Kvalitetsutrustning",
    qualityDesc: "All utrustning underhålls regelbundet för optimal prestanda",
  },
  en: {
    title: "My Equipment",
    subtitle: "Professional equipment for all types of events",
    quality: "Quality Equipment",
    qualityDesc: "All equipment is regularly maintained for optimal performance",
  },
  es: {
    title: "Mi Equipo",
    subtitle: "Equipo profesional para todo tipo de eventos",
    quality: "Equipo de Calidad",
    qualityDesc: "Todo el equipo se mantiene regularmente para un rendimiento óptimo",
  },
};

const EquipmentSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section
      id="utrustning"
      className="py-16 sm:py-24"
      aria-labelledby="equipment-title"
    >
      <div className="text-center mb-12">
        <h2
          id="equipment-title"
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neon-gradient mb-4"
        >
          {t.title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {equipment.map((item, index) => (
          <div
            key={index}
            className="glass-card p-6 rounded-xl hover:border-neon-cyan/50 transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center mb-4 group-hover:bg-neon-cyan/10 transition-colors">
                <item.icon className="w-8 h-8 text-neon-purple group-hover:text-neon-cyan transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-neon-cyan transition-colors">
                {item.name[language]}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description[language]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quality Badge */}
      <div className="mt-12 flex justify-center">
        <div className="glass-card-neon px-6 py-4 rounded-full flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse" />
          <div>
            <span className="font-semibold text-neon-cyan">{t.quality}</span>
            <span className="text-muted-foreground ml-2">— {t.qualityDesc}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
