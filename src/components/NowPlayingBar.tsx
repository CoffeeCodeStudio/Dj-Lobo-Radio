import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Radio } from "lucide-react";
import { useStreamStatus } from "@/hooks/useStreamStatus";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import BookNowButton from "./BookNowButton";
import { logger } from "@/lib/logger";

const STREAM_URL = "https://stream.zeno.fm/gzzqvbuy0d7uv";

const NowPlayingBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { setStatus } = useStreamStatus();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleWaiting = () => {
      setIsLoading(true);
      setStatus('connecting');
    };
    
    const handlePlaying = () => {
      setIsLoading(false);
      setStatus('live');
    };
    
    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setStatus('error', 'Kunde inte ansluta till streamen');
    };

    const handlePause = () => {
      if (!audio.ended) {
        setStatus('offline');
      }
    };

    const handleStalled = () => {
      setStatus('connecting');
    };

    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("stalled", handleStalled);

    return () => {
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("stalled", handleStalled);
    };
  }, [setStatus]);

  const { status } = useStreamStatus();
  const { nowPlaying } = useNowPlaying();

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setStatus('offline');
      } else {
        setIsLoading(true);
        setStatus('connecting');
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setStatus('live');
        } catch (error) {
          logger.error("Error playing audio:", error);
          setIsLoading(false);
          setStatus('error', 'Kunde inte spela upp');
        }
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
    if (isMuted && Number(e.target.value) > 0) {
      setIsMuted(false);
    }
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 glass-card border-t transition-colors ${
        isPlaying ? "player-active border-neon-cyan/50" : "border-neon-cyan/30"
      }`}
      role="region"
      aria-label="Radiospelare"
    >
      <audio ref={audioRef} src={STREAM_URL} preload="none" />
      
      {/* Desktop Layout - Compact */}
      <div className="hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          {/* Play Button and Visualizer */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              disabled={isLoading}
              aria-label={isPlaying ? "Pausa radio" : "Spela radio"}
              aria-pressed={isPlaying}
              className="tap-target w-11 h-11 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple flex items-center justify-center hover:scale-110 transition-transform focus-neon disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" aria-hidden="true" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5 text-white" aria-hidden="true" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" aria-hidden="true" />
              )}
            </button>

            {/* Audio Visualizer */}
            <div className="flex items-end gap-0.5 h-6" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  className={`w-1 bg-gradient-to-t from-neon-pink to-neon-cyan rounded-full ${
                    isPlaying && !isLoading ? "visualizer-bar" : "h-1.5"
                  }`}
                  style={{
                    height: isPlaying && !isLoading ? undefined : "6px",
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Now Playing Info */}
          <div className="flex-1 text-center min-w-0">
            <div className="flex items-center justify-center gap-2 text-neon-cyan text-[10px] mb-0.5">
              <Radio className="w-2.5 h-2.5 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium tracking-wider">
                {isLoading ? "ANSLUTER..." : isPlaying ? "SPELAR NU" : "NOW PLAYING"}
              </span>
            </div>
            <p className="text-foreground font-medium text-sm truncate">
              {nowPlaying.title}
            </p>
            {nowPlaying.artist && (
              <p className="text-muted-foreground text-xs truncate">
                {nowPlaying.artist}
              </p>
            )}
          </div>

          {/* Book Now Button - Compact */}
          <BookNowButton />

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleMute}
              aria-label={isMuted ? "Slå på ljud" : "Tysta ljud"}
              aria-pressed={isMuted}
              className="tap-target text-muted-foreground hover:text-foreground transition-colors focus-neon rounded-lg"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Volume2 className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
            <div className="relative w-20 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full transition-all"
                style={{ width: `${isMuted ? 0 : volume}%` }}
                aria-hidden="true"
              ></div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                aria-label={`Volym: ${volume}%`}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slim Layout - 56px */}
      <div className="sm:hidden">
        <div className="h-14 px-3 flex items-center justify-between gap-2">
          {/* Play Button */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            aria-label={isPlaying ? "Pausa radio" : "Spela radio"}
            aria-pressed={isPlaying}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple flex items-center justify-center hover:scale-105 active:scale-95 transition-transform focus-neon disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" aria-hidden="true" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4 text-white" aria-hidden="true" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" aria-hidden="true" />
            )}
          </button>

          {/* Now Playing Info - Truncated */}
          <div className="flex-1 min-w-0 text-center">
            <div className="flex items-center justify-center gap-1 text-neon-cyan text-[9px] mb-0.5">
              <Radio className="w-2 h-2 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium tracking-wider uppercase">
                {isLoading ? "..." : isPlaying ? "Live" : "Radio"}
              </span>
            </div>
            <p className="text-foreground font-medium text-xs truncate">
              DJ Lobo Radio
            </p>
          </div>

          {/* Mute Button Only on Mobile */}
          <button 
            onClick={toggleMute}
            aria-label={isMuted ? "Slå på ljud" : "Tysta ljud"}
            aria-pressed={isMuted}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-neon rounded-lg"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBar;
