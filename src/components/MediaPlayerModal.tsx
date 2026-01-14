import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MediaPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "mixcloud" | "youtube";
  title: string;
  // For Mixcloud: full embed URL path (e.g., "/DjLobo75/")
  // For YouTube: video ID (e.g., "dQw4w9WgXcQ")
  embedId: string;
}

const MediaPlayerModal = ({ isOpen, onClose, type, title, embedId }: MediaPlayerModalProps) => {
  const renderPlayer = () => {
    if (type === "mixcloud") {
      // Mixcloud embed URL format
      const mixcloudEmbedUrl = `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=${encodeURIComponent(embedId)}`;
      
      return (
        <iframe
          title={title}
          width="100%"
          height="180"
          src={mixcloudEmbedUrl}
          frameBorder="0"
          allow="autoplay"
          className="rounded-lg"
        />
      );
    }

    if (type === "youtube") {
      // YouTube embed URL format
      const youtubeEmbedUrl = `https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0`;
      
      return (
        <div className="aspect-video w-full">
          <iframe
            title={title}
            width="100%"
            height="100%"
            src={youtubeEmbedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[95vw] glass-card border-neon-pink/30 p-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="font-display text-lg font-bold text-neon-gradient truncate pr-4">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-white"
            aria-label="Stäng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player */}
        <div className="p-4">
          {renderPlayer()}
        </div>

        {/* Footer info */}
        <div className="px-4 pb-4 text-center">
          <p className="text-sm text-muted-foreground">
            @ DJ Lobo Producciones
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaPlayerModal;
