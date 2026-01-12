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

// Default video ID from DJ Lobo's channel
const DEFAULT_VIDEO_ID = "ea8_sn1xlcE";

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
  
  // Use video ID from branding or fall back to default
  const videoId = branding?.youtube_video_id || DEFAULT_VIDEO_ID;

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

        {/* Follow on Instagram Button - Prominent placement */}
        <div className="flex justify-center mb-16">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Button
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:from-[#9B4BC9] hover:via-[#FD3D3D] hover:to-[#F89257] text-white border-0 font-semibold text-lg px-8 py-7 h-auto transition-all duration-300 group-hover:scale-105"
              style={{
                boxShadow: "0 0 25px rgba(253, 29, 29, 0.5), 0 0 50px rgba(131, 58, 180, 0.4)",
              }}
            >
              <Instagram className="w-6 h-6 mr-3" />
              {t.followInstagram}
              <span 
                className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </Button>
          </a>
        </div>

        {/* Social Action Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Button
              size="lg"
              className="relative overflow-hidden bg-[#1877F2] hover:bg-[#2184F5] text-white border-0 font-semibold text-base px-6 py-6 h-auto transition-all duration-300 group-hover:scale-105"
              style={{
                boxShadow: "0 0 20px rgba(24, 119, 242, 0.5), 0 0 40px rgba(24, 119, 242, 0.3)",
              }}
            >
              <Facebook className="w-5 h-5 mr-2" />
              {t.joinFacebook}
              <span 
                className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </Button>
          </a>

          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Button
              size="lg"
              className="relative overflow-hidden bg-[#FF0000] hover:bg-[#FF2222] text-white border-0 font-semibold text-base px-6 py-6 h-auto transition-all duration-300 group-hover:scale-105"
              style={{
                boxShadow: "0 0 20px rgba(255, 0, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.3)",
              }}
            >
              <Youtube className="w-5 h-5 mr-2" />
              {t.subscribeYoutube}
              <span 
                className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </Button>
          </a>
        </div>

        {/* Latest Video Section */}
        <div className="mb-16">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-neon-pink mb-6 flex items-center justify-center gap-3">
            <Youtube className="w-6 h-6" />
            {t.latestVideo}
          </h3>
          
          <div className="max-w-3xl mx-auto">
            <div className="glass-card overflow-hidden group hover:border-neon-pink/50 transition-all duration-300">
              {/* YouTube Embed */}
              <div className="aspect-video relative">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                  title="DJ Lobo Latest Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              
              {/* Video Info */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center">
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

        {/* Live Sets / Video Section */}
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-neon-cyan mb-6 flex items-center gap-3">
            <Play className="w-6 h-6" />
            {t.liveSets}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              branding?.live_set_video_1,
              branding?.live_set_video_2,
              branding?.live_set_video_3,
            ].map((videoId, i) => (
              videoId ? (
                <div
                  key={i}
                  className="glass-card overflow-hidden group hover:border-neon-cyan/50 transition-all duration-300"
                >
                  {/* YouTube Embed */}
                  <div className="aspect-video relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                      title={`DJ Lobo Live Set ${i + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                    />
                  </div>

                  {/* Video Info */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#FF0000] flex items-center justify-center">
                        <Youtube className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-medium text-sm text-foreground">Live Set #{i + 1}</span>
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neon-cyan hover:underline flex items-center gap-1"
                    >
                      {t.watchOnYoutube}
                      <Play className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <a
                  key={i}
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card overflow-hidden group hover:border-neon-cyan/50 transition-all duration-300"
                >
                  {/* Video Placeholder */}
                  <div className="aspect-video relative bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="w-16 h-16 rounded-full bg-neon-pink/20 flex items-center justify-center group-hover:bg-neon-pink/40 transition-colors"
                        style={{
                          boxShadow: "0 0 20px rgba(255, 0, 255, 0.3)",
                        }}
                      >
                        <Play className="w-8 h-8 text-neon-pink ml-1" />
                      </div>
                    </div>

                    {/* Platform badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 bg-red-600 text-white">
                        <Youtube className="w-3 h-3" />
                        YouTube
                      </span>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground group-hover:text-neon-cyan transition-colors line-clamp-2">
                      Live Set #{i + 1}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t.clickToWatch}
                    </p>
                  </div>
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialGallerySection;
