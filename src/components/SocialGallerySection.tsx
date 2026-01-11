import { Instagram, Facebook, Youtube, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/djloboradio",
  facebook: "https://www.facebook.com/djloboradiodjs/",
  youtube: "https://www.youtube.com/@djloboradio",
};

// Placeholder Instagram posts - replace with actual embed or API integration
const INSTAGRAM_POSTS = [
  { id: 1, placeholder: true },
  { id: 2, placeholder: true },
  { id: 3, placeholder: true },
  { id: 4, placeholder: true },
  { id: 5, placeholder: true },
  { id: 6, placeholder: true },
];

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

        {/* Social Action Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Button
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:from-[#9B4BC9] hover:via-[#FD3D3D] hover:to-[#F89257] text-white border-0 font-semibold text-base px-6 py-6 h-auto transition-all duration-300 group-hover:scale-105"
              style={{
                boxShadow: "0 0 20px rgba(253, 29, 29, 0.4), 0 0 40px rgba(131, 58, 180, 0.3)",
              }}
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow on Instagram
              <span 
                className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </Button>
          </a>

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

        {/* Instagram Feed Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-neon-cyan flex items-center gap-3">
              <Instagram className="w-6 h-6" />
              Latest from Instagram
            </h3>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-neon-pink transition-colors flex items-center gap-1"
            >
              View all <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Instagram Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square glass-card overflow-hidden group relative hover:border-neon-pink/50 transition-all duration-300"
              >
                {/* Placeholder content */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-neon-purple/20 to-neon-cyan/20 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-muted-foreground group-hover:text-neon-pink transition-colors" />
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-xs text-white font-medium">View Post</span>
                </div>
              </a>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-4">
            Connect your Instagram to display live posts
          </p>
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
