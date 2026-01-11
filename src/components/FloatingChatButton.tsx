import { useState, useEffect } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import { usePresence } from "@/hooks/usePresence";

const FloatingChatButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const { listenerCount } = usePresence();

  // Hide button when user is near the chat section
  useEffect(() => {
    const handleScroll = () => {
      const chatSection = document.getElementById("live-chat-section");
      if (chatSection) {
        const rect = chatSection.getBoundingClientRect();
        // Hide when chat section is visible in viewport
        setIsVisible(rect.top > window.innerHeight - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChat = () => {
    const chatSection = document.getElementById("live-chat-section");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-40">
      {/* Tooltip */}
      <div
        className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
          showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="glass-card px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium">
          <span className="text-neon-cyan">Chatta live</span>
          <span className="text-muted-foreground"> med DJ Lobo & fans</span>
        </div>
        {/* Tooltip arrow */}
        <div className="absolute -bottom-1 right-6 w-2 h-2 bg-card border-r border-b border-white/10 rotate-45" />
      </div>

      {/* Main button */}
      <button
        onClick={scrollToChat}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full glass-card-pink transition-all duration-300 hover:scale-105 focus-neon"
        style={{
          boxShadow: "0 0 20px rgba(255, 0, 255, 0.4), 0 0 40px rgba(255, 0, 255, 0.2)",
        }}
        aria-label="Gå till Live Chat"
      >
        {/* Pulsing notification dot */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-neon-cyan items-center justify-center">
            <span className="text-[8px] font-bold text-background">
              {listenerCount > 0 ? (listenerCount > 99 ? "99+" : listenerCount) : "!"}
            </span>
          </span>
        </span>

        {/* Icon */}
        <MessageCircle className="w-5 h-5 text-neon-pink" />
        
        {/* Text */}
        <span className="text-sm font-semibold text-foreground hidden sm:inline">
          Live Chat
        </span>

        {/* Animated arrow */}
        <ChevronDown className="w-4 h-4 text-neon-cyan animate-bounce hidden sm:inline" />
      </button>

      {/* Live activity indicator on mobile */}
      {listenerCount > 0 && (
        <div className="sm:hidden mt-2 text-center">
          <span className="text-xs text-muted-foreground">
            <span className="text-neon-cyan font-semibold">{listenerCount}</span> chattar nu
          </span>
        </div>
      )}
    </div>
  );
};

export default FloatingChatButton;
