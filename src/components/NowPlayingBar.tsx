import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Radio } from "lucide-react";

const STREAM_URL = "https://stream.zeno.fm/gzzqvbuy0d7uv";

const NowPlayingBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Error playing audio:", error);
          setIsLoading(false);
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
      className={`fixed bottom-0 left-0 right-0 z-50 glass-card border-t transition-colors ${
        isPlaying ? "player-active border-neon-cyan/50" : "border-neon-cyan/30"
      }`}
      role="region"
      aria-label="Radiospelare"
    >
      <audio ref={audioRef} src={STREAM_URL} preload="none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Play Button and Visualizer */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={togglePlay}
            disabled={isLoading}
            aria-label={isPlaying ? "Pausa radio" : "Spela radio"}
            aria-pressed={isPlaying}
            className="tap-target w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple flex items-center justify-center hover:scale-110 transition-transform focus-neon disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-spin" aria-hidden="true" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" aria-hidden="true" />
            )}
          </button>

          {/* Audio Visualizer */}
          <div className="hidden sm:flex items-end gap-1 h-8" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((bar) => (
              <div
                key={bar}
                className={`w-1 bg-gradient-to-t from-neon-pink to-neon-cyan rounded-full ${
                  isPlaying && !isLoading ? "visualizer-bar" : "h-2"
                }`}
                style={{
                  height: isPlaying && !isLoading ? undefined : "8px",
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Now Playing Info */}
        <div className="flex-1 text-center min-w-0">
          <div className="flex items-center justify-center gap-2 text-neon-cyan text-xs mb-1">
            <Radio className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <span className="font-medium tracking-wider">
              {isLoading ? "ANSLUTER..." : isPlaying ? "SPELAR NU" : "NOW PLAYING"}
            </span>
          </div>
          <p className="text-foreground font-medium text-sm sm:text-base truncate">
            DJ Lobo Radio - 80s & 90s Hits
          </p>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={toggleMute}
            aria-label={isMuted ? "Slå på ljud" : "Tysta ljud"}
            aria-pressed={isMuted}
            className="tap-target text-muted-foreground hover:text-foreground transition-colors focus-neon rounded-lg"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Volume2 className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
          <div className="relative w-16 sm:w-24 h-2 bg-muted rounded-full overflow-hidden">
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
  );
};

export default NowPlayingBar;
