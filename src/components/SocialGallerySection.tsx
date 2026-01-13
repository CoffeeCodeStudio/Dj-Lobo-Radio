import { Instagram, Facebook, Youtube, Play, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGallery } from "@/hooks/useGallery";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBranding } from "@/hooks/useBranding";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/djloboradio",
  facebook: "https://www.facebook.com/djloboradiodjs/",
  youtube: "https://www.youtube.com/@djloboproducciones3211",
};

// Static placeholder videos until API integration is ready
const PLACEHOLDER_VIDEOS = [
  { 
    id: 1, 
    title: "DJ Lobo Exclusive", 
    subtitle: "Coming Soon",
    image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&h=400&fit=crop"
  },
  { 
    id: 2, 
    title: "Live Mix Session", 
    subtitle: "Coming Soon",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop"
  },
  { 
    id: 3, 
    title: "Festival Set 2024", 
    subtitle: "Coming Soon",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop"
  },
  { 
    id: 4, 
    title: "Club Night Special", 
    subtitle: "Coming Soon",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop"
  },
  { 
    id: 5, 
    title: "80s & 90s Retro Mix", 
    subtitle: "Coming Soon",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=400&fit=crop"
  },
  { 
    id: 6, 
    title: "Summer Party Vibes", 
    subtitle: "Coming Soon",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop"
  },
];

const translations = {
  sv: {
    connectTitle: "FÖLJ DJ LOBO",
    connectSubtitle: "Följ resan, fånga live-set och gå med i communityn",
    gallery: "Galleri",
    noImages: "Inga bilder i galleriet ännu",
    followInstagram: "Följ på Instagram",
    joinFacebook: "Gilla på Facebook",
    subscribeYoutube: "Prenumerera på YouTube",
    liveSets: "Live Sets & Videos",
    clickToWatch: "Klicka för att titta",
    latestVideo: "Senaste Videon",
    watchOnYoutube: "Se på YouTube",
  },
  en: {
    connectTitle: "CONNECT WITH DJ LOBO",
    connectSubtitle: "Follow the journey, catch live sets, and join the community",
    gallery: "Gallery",
    noImages: "No images in gallery yet",
    followInstagram: "Follow on Instagram",
    joinFacebook: "Join on Facebook",
    subscribeYoutube: "Subscribe on YouTube",
    liveSets: "Live Sets & Videos",
    clickToWatch: "Click to watch",
    latestVideo: "Latest Video",
    watchOnYoutube: "Watch on YouTube",
  },
  es: {
    connectTitle: "CONECTA CON DJ LOBO",
    connectSubtitle: "Sigue el viaje, mira sets en vivo y únete a la comunidad",
    gallery: "Galería",
    noImages: "No hay imágenes en la galería aún",
    followInstagram: "Seguir en Instagram",
    joinFacebook: "Únete en Facebook",
    subscribeYoutube: "Suscribirse en YouTube",
    liveSets: "Sets en Vivo & Videos",
    clickToWatch: "Clic para ver",
    latestVideo: "Último Video",
    watchOnYoutube: "Ver en YouTube",
  },
};

const SocialGallerySection = () => {
  const { images, isLoading } = useGallery();
  const { language } = useLanguage();
  const { branding } = useBranding();
  const t = translations[language];
  
  // Featured video from branding (shown as main video)
  const featuredVideoId = branding?.youtube_video_id || "ea8_sn1xlcE";

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
              // Loading skeleton
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
                  
                  {/* Hover overlay with neon glow */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: "inset 0 0 30px rgba(255, 0, 255, 0.2)",
                    }}
                  />
                </div>
              ))
            ) : (
              // Empty state
              <div className="col-span-full text-center py-8 text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>{t.noImages}</p>
              </div>
            )}
          </div>
        </div>


        {/* Latest Video Section - Placeholder */}
        <div className="mb-16">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-neon-pink mb-6 flex items-center justify-center gap-3">
            <Youtube className="w-6 h-6" />
            {t.latestVideo}
          </h3>
          
          <div className="max-w-3xl mx-auto">
            <div className="glass-card overflow-hidden group hover:border-neon-pink/50 transition-all duration-300">
              {/* Placeholder Image */}
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1200&h=675&fit=crop"
                  alt="DJ Lobo - Coming Soon"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                  <div 
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan text-white font-bold text-lg uppercase tracking-wider mb-4"
                    style={{
                      boxShadow: "0 0 40px rgba(255, 0, 255, 0.5), 0 0 80px rgba(0, 255, 255, 0.3)",
                    }}
                  >
                    Coming Soon
                  </div>
                  <p className="text-white/80 text-sm">DJ Lobo Exclusive Content</p>
                </div>

                {/* Exclusive badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded text-sm font-semibold flex items-center gap-1.5 bg-neon-pink/90 text-white">
                    <Play className="w-4 h-4" />
                    Featured
                  </span>
                </div>
              </div>
              
              {/* Video Info */}
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

        {/* Coming Soon Video Previews */}
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-neon-cyan mb-6 flex items-center gap-3">
            <Play className="w-6 h-6" />
            {t.liveSets}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_VIDEOS.map((video) => (
              <div
                key={video.id}
                className="glass-card overflow-hidden group hover:border-neon-cyan/50 transition-all duration-300 cursor-default"
              >
                {/* Neon/DJ Themed Thumbnail */}
                <div className="aspect-video relative">
                  <img
                    src={video.image}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Overlay with Coming Soon badge */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                    <div 
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan text-white font-bold text-sm uppercase tracking-wider"
                      style={{
                        boxShadow: "0 0 30px rgba(255, 0, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)",
                      }}
                    >
                      {video.subtitle}
                    </div>
                  </div>

                  {/* DJ Lobo Exclusive badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 bg-neon-pink/90 text-white">
                      <Play className="w-3 h-3" />
                      Exclusive
                    </span>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h4 className="font-semibold text-foreground group-hover:text-neon-cyan transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <Youtube className="w-3 h-3" />
                    DJ Lobo Producciones
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Link to full channel */}
          <div className="mt-8 text-center">
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
            >
              <Youtube className="w-5 h-5" />
              Se alla videos på YouTube
              <Play className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialGallerySection;
