import { Instagram, Facebook, Youtube, Play, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGallery } from "@/hooks/useGallery";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/djloboradio",
  facebook: "https://www.facebook.com/djloboradiodjs/",
  youtube: "https://www.youtube.com/@djloboradio",
};

// Placeholder video embeds - replace with actual video IDs
const LIVE_SETS = [
  {
    id: 1,
    title: "Live Set - 80s Classics Mix",
    platform: "youtube",
    embedId: "placeholder",
    thumbnail: null,
  },
  {
    id: 2,
    title: "Friday Night Party Stream",
    platform: "facebook",
    embedId: "placeholder",
    thumbnail: null,
  },
  {
    id: 3,
    title: "90s Dance Hits Marathon",
    platform: "youtube",
    embedId: "placeholder",
    thumbnail: null,
  },
];

const SocialGallerySection = () => {
  const { images, isLoading } = useGallery();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" aria-labelledby="social-gallery-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            id="social-gallery-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neon-gradient mb-4"
          >
            CONNECT WITH DJ LOBO
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Follow the journey, catch live sets, and join the community
          </p>
        </div>

        {/* Photo Gallery Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-neon-cyan flex items-center gap-3">
              <ImageIcon className="w-6 h-6" />
              Gallery
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
                <p>Inga bilder i galleriet ännu</p>
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
              Follow on Instagram
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
              Join us on Facebook
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
              Subscribe on YouTube
              <span 
                className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </Button>
          </a>
        </div>

        {/* Live Sets / Video Section */}
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-neon-pink mb-6 flex items-center gap-3">
            <Play className="w-6 h-6" />
            Live Sets & Videos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LIVE_SETS.map((video) => (
              <div
                key={video.id}
                className="glass-card overflow-hidden group hover:border-neon-cyan/50 transition-all duration-300"
              >
                {/* Video Placeholder / Embed Area */}
                <div className="aspect-video relative bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center">
                  {/* Placeholder - Replace with actual embed */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-16 h-16 rounded-full bg-neon-pink/20 flex items-center justify-center group-hover:bg-neon-pink/40 transition-colors cursor-pointer"
                      style={{
                        boxShadow: "0 0 20px rgba(255, 0, 255, 0.3)",
                      }}
                    >
                      <Play className="w-8 h-8 text-neon-pink ml-1" />
                    </div>
                  </div>

                  {/* Platform badge */}
                  <div className="absolute top-3 left-3">
                    <span 
                      className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
                        video.platform === "youtube" 
                          ? "bg-red-600 text-white" 
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {video.platform === "youtube" ? (
                        <Youtube className="w-3 h-3" />
                      ) : (
                        <Facebook className="w-3 h-3" />
                      )}
                      {video.platform === "youtube" ? "YouTube" : "Facebook Live"}
                    </span>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h4 className="font-semibold text-foreground group-hover:text-neon-cyan transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click to watch
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Add YouTube or Facebook Live video IDs to embed your live sets
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialGallerySection;
