import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// Types for mix metadata
export interface TrackCue {
  timestamp: number; // seconds into the mix
  title: string;
  artist: string;
}

export interface MixData {
  id: string;
  mixTitle: string;
  audioUrl: string;
  duration: number; // total duration in seconds
  coverImage?: string;
  tracks: TrackCue[];
}

// Example mix data - this would typically come from an API or database
const EXAMPLE_MIX: MixData = {
  id: "mix-001",
  mixTitle: "80s & 90s Classics Mix",
  audioUrl: "", // Add your audio URL here
  duration: 3600, // 1 hour
  tracks: [
    { timestamp: 0, title: "Take On Me", artist: "A-ha" },
    { timestamp: 180, title: "Billie Jean", artist: "Michael Jackson" },
    { timestamp: 360, title: "Sweet Dreams", artist: "Eurythmics" },
    { timestamp: 540, title: "Blue Monday", artist: "New Order" },
    { timestamp: 720, title: "Don't You Want Me", artist: "Human League" },
    { timestamp: 900, title: "Tainted Love", artist: "Soft Cell" },
    { timestamp: 1080, title: "Livin' on a Prayer", artist: "Bon Jovi" },
    { timestamp: 1260, title: "I Wanna Dance with Somebody", artist: "Whitney Houston" },
    { timestamp: 1440, title: "Walking on Sunshine", artist: "Katrina & The Waves" },
    { timestamp: 1620, title: "The Power of Love", artist: "Huey Lewis" },
  ],
};

interface MixInsightPlayerProps {
  mix?: MixData;
  className?: string;
}

const MixInsightPlayer = ({ mix = EXAMPLE_MIX, className = "" }: MixInsightPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(mix.duration);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackCue>(mix.tracks[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Find the current track based on playback position
  const findCurrentTrack = useCallback((time: number): TrackCue => {
    // Find the last track whose timestamp is <= current time
    for (let i = mix.tracks.length - 1; i >= 0; i--) {
      if (time >= mix.tracks[i].timestamp) {
        return mix.tracks[i];
      }
    }
    return mix.tracks[0];
  }, [mix.tracks]);

  // Update current track when time changes
  useEffect(() => {
    const newTrack = findCurrentTrack(currentTime);
    if (newTrack.timestamp !== currentTrack.timestamp) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTrack(newTrack);
        setIsTransitioning(false);
      }, 150);
    }
  }, [currentTime, currentTrack.timestamp, findCurrentTrack]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || mix.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [mix.duration]);

  // Demo mode: simulate time progression when no audio URL
  useEffect(() => {
    if (mix.audioUrl || !isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration, mix.audioUrl]);

  const togglePlay = () => {
    if (mix.audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const skipToTrack = (direction: "prev" | "next") => {
    const currentIndex = mix.tracks.findIndex(
      (t) => t.timestamp === currentTrack.timestamp
    );
    
    let newIndex: number;
    if (direction === "prev") {
      // If more than 3 seconds into track, restart it; otherwise go to previous
      if (currentTime - currentTrack.timestamp > 3 && currentIndex >= 0) {
        newIndex = currentIndex;
      } else {
        newIndex = Math.max(0, currentIndex - 1);
      }
    } else {
      newIndex = Math.min(mix.tracks.length - 1, currentIndex + 1);
    }

    const newTime = mix.tracks[newIndex].timestamp;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate progress percentage for the current track
  const currentTrackIndex = mix.tracks.findIndex(
    (t) => t.timestamp === currentTrack.timestamp
  );
  const nextTrackTimestamp = mix.tracks[currentTrackIndex + 1]?.timestamp || duration;
  const trackDuration = nextTrackTimestamp - currentTrack.timestamp;
  const trackProgress = ((currentTime - currentTrack.timestamp) / trackDuration) * 100;

  return (
    <div className={`glass-card p-4 sm:p-6 ${className}`}>
      {mix.audioUrl && <audio ref={audioRef} src={mix.audioUrl} preload="metadata" />}
      
      {/* Mix Title & Current Track Display */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-neon-pink via-neon-purple to-neon-cyan flex items-center justify-center flex-shrink-0 shadow-lg shadow-neon-pink/20">
            {mix.coverImage ? (
              <img 
                src={mix.coverImage} 
                alt={mix.mixTitle}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Music2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Mix Title */}
            <h3 className="font-display text-sm sm:text-base font-bold text-foreground truncate">
              {mix.mixTitle}
            </h3>
            
            {/* Current Track - Mix Insight */}
            <div 
              className={`transition-all duration-150 ${
                isTransitioning ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="text-neon-cyan font-medium text-sm sm:text-base truncate">
                {currentTrack.title}
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>
          
          {/* Track Progress Indicator */}
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-xs text-muted-foreground">
              Track {currentTrackIndex + 1}/{mix.tracks.length}
            </span>
            <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, trackProgress))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        {/* Playback Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => skipToTrack("prev")}
            className="w-8 h-8 sm:w-10 sm:h-10 hover:text-neon-cyan transition-colors"
            aria-label="Previous track"
          >
            <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            onClick={togglePlay}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-pink/80 hover:to-neon-purple/80 shadow-lg shadow-neon-pink/30"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => skipToTrack("next")}
            className="w-8 h-8 sm:w-10 sm:h-10 hover:text-neon-cyan transition-colors"
            aria-label="Next track"
          >
            <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="w-8 h-8 hover:text-neon-cyan transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-20 sm:w-24 cursor-pointer"
          />
        </div>
      </div>

      {/* Track List (Expandable) */}
      <details className="mt-4 group">
        <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors list-none flex items-center gap-2">
          <span className="text-xs">▶</span>
          <span className="group-open:hidden">Visa spårlista</span>
          <span className="hidden group-open:inline">Dölj spårlista</span>
        </summary>
        <ul className="mt-3 space-y-1 max-h-48 overflow-y-auto">
          {mix.tracks.map((track, index) => {
            const isCurrentTrack = track.timestamp === currentTrack.timestamp;
            return (
              <li 
                key={`${track.timestamp}-${index}`}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                  isCurrentTrack 
                    ? "bg-neon-pink/10 border border-neon-pink/30" 
                    : "hover:bg-muted/50"
                }`}
                onClick={() => {
                  setCurrentTime(track.timestamp);
                  if (audioRef.current) {
                    audioRef.current.currentTime = track.timestamp;
                  }
                }}
              >
                <span className="text-xs text-muted-foreground w-10 flex-shrink-0">
                  {formatTime(track.timestamp)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${isCurrentTrack ? "text-neon-cyan font-medium" : ""}`}>
                    {track.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {track.artist}
                  </p>
                </div>
                {isCurrentTrack && isPlaying && (
                  <div className="flex gap-0.5">
                    <span className="w-0.5 h-3 bg-neon-cyan rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                    <span className="w-0.5 h-4 bg-neon-cyan rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-0.5 h-2 bg-neon-cyan rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </details>
    </div>
  );
};

export default MixInsightPlayer;
