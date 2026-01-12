import { useState, useEffect, useCallback } from "react";

export interface NowPlayingData {
  title: string;
  artist: string;
  isLive: boolean;
  streamTitle: string;
}

const ZENO_STATION_ID = "gzzqvbuy0d7uv";
const POLL_INTERVAL = 15000; // Poll every 15 seconds

export const useNowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData>({
    title: "DJ Lobo Radio",
    artist: "80s & 90s Hits",
    isLive: false,
    streamTitle: "DJ Lobo Radio",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNowPlaying = useCallback(async () => {
    try {
      // Zeno.fm provides now playing data via their API
      // Format: https://api.zeno.fm/mounts/metadata/subscribe/{station_id}
      // Alternative: Parse from ICY metadata or use their widget API
      
      const response = await fetch(
        `https://api.zeno.fm/mounts/${ZENO_STATION_ID}/now-playing`,
        {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        if (data?.now_playing) {
          const { title, artist } = parseNowPlaying(data.now_playing);
          setNowPlaying({
            title: title || "DJ Lobo Radio",
            artist: artist || "80s & 90s Hits",
            isLive: true,
            streamTitle: data.station?.name || "DJ Lobo Radio",
          });
          setError(null);
        }
      } else {
        // Fallback: Try alternative endpoint
        await fetchFromAlternativeSource();
      }
    } catch (err) {
      // On error, try alternative or keep current data
      await fetchFromAlternativeSource();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchFromAlternativeSource = async () => {
    try {
      // Try Zeno.fm's public widget data
      const response = await fetch(
        `https://api.zeno.fm/mounts/${ZENO_STATION_ID}`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data?.now_playing?.text) {
          const { title, artist } = parseNowPlaying(data.now_playing.text);
          setNowPlaying({
            title: title || "DJ Lobo Radio",
            artist: artist || "80s & 90s Hits",
            isLive: data.is_live || false,
            streamTitle: data.title || "DJ Lobo Radio",
          });
          setError(null);
          return;
        }
      }
    } catch {
      // Keep default/current data on error
    }
    
    // Final fallback - keep showing default
    setNowPlaying((prev) => ({
      ...prev,
      title: prev.title || "DJ Lobo Radio",
      artist: prev.artist || "80s & 90s Hits",
    }));
  };

  // Parse "Artist - Title" or "Title" format
  const parseNowPlaying = (text: string): { title: string; artist: string } => {
    if (!text) return { title: "", artist: "" };
    
    // Common format: "Artist - Title"
    const dashIndex = text.indexOf(" - ");
    if (dashIndex > 0) {
      return {
        artist: text.substring(0, dashIndex).trim(),
        title: text.substring(dashIndex + 3).trim(),
      };
    }
    
    // Alternative format: "Title by Artist"
    const byIndex = text.toLowerCase().indexOf(" by ");
    if (byIndex > 0) {
      return {
        title: text.substring(0, byIndex).trim(),
        artist: text.substring(byIndex + 4).trim(),
      };
    }
    
    // No separator found - treat as title only
    return { title: text.trim(), artist: "" };
  };

  useEffect(() => {
    // Initial fetch
    fetchNowPlaying();
    
    // Poll for updates
    const interval = setInterval(fetchNowPlaying, POLL_INTERVAL);
    
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  return {
    nowPlaying,
    isLoading,
    error,
    refetch: fetchNowPlaying,
  };
};
