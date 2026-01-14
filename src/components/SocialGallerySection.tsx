import { useState } from "react";
import { Play, ImageIcon, Youtube, Headphones } from "lucide-react";
import { useGallery } from "@/hooks/useGallery";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBranding } from "@/hooks/useBranding";
import MediaPlayerModal from "./MediaPlayerModal";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/djloboradio",
  facebook: "https://www.facebook.com/djloboradiodjs/",
  youtube: "https://www.youtube.com/@djloboproducciones3211",
  mixcloud: "https://www.mixcloud.com/DjLobo75/",
};

// Video/Mix configuration - easy to update
const MEDIA_CONFIG = {
  // Mixcloud mixes - embedId is the path after mixcloud.com
  mixcloud: {
    "80s-90s-retro": {
      embedId: "/DjLobo75/",  // Update this to specific mix URL path
      title: "80s & 90s Retro Mix",
    },
    "live-mix-session": {
      embedId: "/DjLobo75/",  // Update this to specific mix URL path
      title: "Live Mix Session",
    },
  },
  // YouTube videos - embedId is the video ID from URL
  youtube: {
    "dj-lobo-exclusive": {
      embedId: "ea8_sn1xlcE",  // Update with actual video ID
      title: "DJ Lobo Exclusive",
    },
    "summer-party-vibes": {
      embedId: "ea8_sn1xlcE",  // Update with actual video ID
      title: "Summer Party Vibes",
    },
  },
};

// Cards with their media type and config key
const VIDEO_CARDS = [
  { 
    id: 1, 
    title: "DJ Lobo Exclusive", 
    type: "youtube" as const,
    configKey: "dj-lobo-exclusive",
    image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&h=400&fit=crop",
    bpmOffset: 0,
  },
  { 
    id: 2, 
    title: "Live Mix Session", 
    type: "mixcloud" as const,
    configKey: "live-mix-session",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    bpmOffset: 0.12,
  },
  { 
    id: 3, 
    title: "Festival Set 2024", 
    type: "coming-soon" as const,
    configKey: null,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
    bpmOffset: 0.24,
  },
  { 
    id: 4, 
    title: "Club Night Special", 
    type: "coming-soon" as const,
    configKey: null,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
    bpmOffset: 0.36,
  },
  { 
    id: 5, 
    title: "80s & 90s Retro Mix", 
    type: "mixcloud" as const,
    configKey: "80s-90s-retro",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=400&fit=crop",
    bpmOffset: 0.48,
  },
  { 
    id: 6, 
    title: "Summer Party Vibes", 
    type: "youtube" as const,
    configKey: "summer-party-vibes",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
    bpmOffset: 0.6,
  },
];

const translations = {
  sv: {
    connectTitle: "FÖLJ DJ LOBO",
    connectSubtitle: "Följ resan, fånga live-set och gå med i communityn",
    gallery: "Galleri",
    noImages: "Inga bilder i galleriet ännu",
    liveSets: "Live Sets & Videos",
    latestVideo: "Senaste Videon",
    watchOnYoutube: "Se på YouTube",
    comingSoon: "Kommer Snart",
    exclusiveContent: "DJ Lobo exklusivt innehåll",
    featured: "Utvald",
    listenNow: "Lyssna Nu",
    watchNow: "Titta Nu",
    seeAllVideos: "Se alla videos på YouTube",
    listenOnMixcloud: "Lyssna på Mixcloud",
  },
  en: {
    connectTitle: "CONNECT WITH DJ LOBO",
    connectSubtitle: "Follow the journey, catch live sets, and join the community",
    gallery: "Gallery",
    noImages: "No images in gallery yet",
    liveSets: "Live Sets & Videos",
    latestVideo: "Latest Video",
    watchOnYoutube: "Watch on YouTube",
    comingSoon: "Coming Soon",
    exclusiveContent: "DJ Lobo exclusive content",
    featured: "Featured",
    listenNow: "Listen Now",
    watchNow: "Watch Now",
    seeAllVideos: "See all videos on YouTube",
    listenOnMixcloud: "Listen on Mixcloud",
  },
  es: {
    connectTitle: "CONECTA CON DJ LOBO",
    connectSubtitle: "Sigue el viaje, mira sets en vivo y únete a la comunidad",
    gallery: "Galería",
    noImages: "No hay imágenes en la galería aún",
    liveSets: "Sets en Vivo & Videos",
    latestVideo: "Último Video",
    watchOnYoutube: "Ver en YouTube",
    comingSoon: "Próximamente",
    exclusiveContent: "Contenido exclusivo de DJ Lobo",
    featured: "Destacado",
    listenNow: "Escuchar Ahora",
    watchNow: "Ver Ahora",
    seeAllVideos: "Ver todos los videos en YouTube",
    listenOnMixcloud: "Escuchar en Mixcloud",
  },
};

const SocialGallerySection = () => {
  const { images, isLoading } = useGallery();
  const { language } = useLanguage();
  const { branding } = useBranding();
  const t = translations[language];
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<{
    type: "mixcloud" | "youtube";
    title: string;
    embedId: string;
  } | null>(null);

  const handleCardClick = (card: typeof VIDEO_CARDS[0]) => {
    if (card.type === "coming-soon" || !card.configKey) return;

    const config = card.type === "mixcloud" 
      ? MEDIA_CONFIG.mixcloud[card.configKey as keyof typeof MEDIA_CONFIG.mixcloud]
      : MEDIA_CONFIG.youtube[card.configKey as keyof typeof MEDIA_CONFIG.youtube];

    if (config) {
      setActiveMedia({
        type: card.type,
        title: config.title,
        embedId: config.embedId,
      });
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveMedia(null);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" aria-labelledby="social-gallery-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            id="social-gallery-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neon-gradient mb-4"
          >
            {t.connectTitle}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {t.connectSubtitle}
          </p>
        </div>

        {/* Photo Gallery Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-neon-cyan flex items-center gap-3">
              <ImageIcon className="w-6 h-6" />
              {t.gallery}
            </h3>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square glass-card overflow-hidden animate-pulse bg-muted/20"
                />
              ))
            ) : images.length > 0 ? (
              images.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square glass-card overflow-hidden group relative hover:border-neon-pink/50 transition-all duration-300"
                >
                  <img
                    src={image.image_url}
                    alt={image.alt_text || "DJ Lobo gallery image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: "inset 0 0 30px rgba(255, 0, 255, 0.2)" }}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>{t.noImages}</p>
              </div>
            )}
          </div>
        </div>

        {/* Latest Video Section */}
        <div className="mb-16">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-neon-pink mb-6 flex items-center justify-center gap-3">
            <Youtube className="w-6 h-6" />
            {t.latestVideo}
          </h3>
          
          <div className="max-w-3xl mx-auto">
            <div className="glass-card overflow-hidden group hover:border-neon-pink/50 transition-all duration-300">
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1200&h=675&fit=crop"
                  alt="DJ Lobo - Coming Soon"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                  <div 
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan text-white font-bold text-lg uppercase tracking-wider mb-4"
                    style={{ boxShadow: "0 0 40px rgba(255, 0, 255, 0.5), 0 0 80px rgba(0, 255, 255, 0.3)" }}
                  >
                    {t.comingSoon}
                  </div>
                  <p className="text-white/80 text-sm">{t.exclusiveContent}</p>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded text-sm font-semibold flex items-center gap-1.5 bg-neon-pink/90 text-white">
                    <Play className="w-4 h-4" />
                    {t.featured}
                  </span>
                </div>
              </div>
              
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neon-pink flex items-center justify-center">
                    <Youtube className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-foreground">DJ Lobo Producciones</span>
                </div>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neon-cyan hover:underline flex items-center gap-1"
                >
                  {t.watchOnYoutube}
                  <Play className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Live Sets & Videos Grid with BPM Pulse */}
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-neon-cyan mb-6 flex items-center gap-3">
            <Play className="w-6 h-6" />
            {t.liveSets}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_CARDS.map((card) => {
              const isPlayable = card.type !== "coming-soon";
              
              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className={`
                    glass-card overflow-hidden group transition-all duration-300 relative
                    ${isPlayable ? "cursor-pointer hover:scale-[1.02]" : "cursor-default"}
                  `}
                  style={{
                    // BPM pulse animation at 124 BPM (484ms per beat)
                    animation: `bpm-pulse 0.484s ease-in-out infinite`,
                    animationDelay: `${card.bpmOffset}s`,
                  }}
                  role={isPlayable ? "button" : undefined}
                  tabIndex={isPlayable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (isPlayable && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      handleCardClick(card);
                    }
                  }}
                  aria-label={isPlayable ? `${card.type === "youtube" ? t.watchNow : t.listenNow}: ${card.title}` : undefined}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`
                        w-full h-full object-cover transition-transform duration-500
                        ${isPlayable ? "group-hover:scale-110" : "group-hover:scale-105"}
                      `}
                      loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className={`
                      absolute inset-0 flex items-center justify-center transition-colors duration-300
                      ${isPlayable 
                        ? "bg-black/30 group-hover:bg-black/50" 
                        : "bg-black/40 group-hover:bg-black/50"
                      }
                    `}>
                      {isPlayable ? (
                        // Play button for active cards
                        <div 
                          className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                          style={{ boxShadow: "0 0 30px rgba(255, 0, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)" }}
                        >
                          <Play className="w-7 h-7 text-white ml-1" fill="white" />
                        </div>
                      ) : (
                        // Coming Soon badge
                        <div 
                          className="px-6 py-3 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan text-white font-bold text-sm uppercase tracking-wider"
                          style={{ boxShadow: "0 0 30px rgba(255, 0, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)" }}
                        >
                          {t.comingSoon}
                        </div>
                      )}
                    </div>

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      {isPlayable ? (
                        <span className="px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 bg-neon-cyan/90 text-white">
                          {card.type === "mixcloud" ? (
                            <>
                              <Headphones className="w-3 h-3" />
                              {t.listenNow}
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3" />
                              {t.watchNow}
                            </>
                          )}
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 bg-neon-pink/90 text-white">
                          <Play className="w-3 h-3" />
                          {t.comingSoon}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-semibold text-foreground group-hover:text-neon-cyan transition-colors line-clamp-2">
                      {card.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      {card.type === "mixcloud" ? (
                        <Headphones className="w-3 h-3" />
                      ) : (
                        <Youtube className="w-3 h-3" />
                      )}
                      @ DJ Lobo Producciones
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Links to full channels */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
            >
              <Youtube className="w-5 h-5" />
              {t.seeAllVideos}
              <Play className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.mixcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neon-pink hover:text-neon-cyan transition-colors"
            >
              <Headphones className="w-5 h-5" />
              {t.listenOnMixcloud}
              <Play className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Media Player Modal */}
      {activeMedia && (
        <MediaPlayerModal
          isOpen={modalOpen}
          onClose={closeModal}
          type={activeMedia.type}
          title={activeMedia.title}
          embedId={activeMedia.embedId}
        />
      )}
    </section>
  );
};

export default SocialGallerySection;
