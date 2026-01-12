import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";

interface PresenceState {
  nickname: string;
  joinedAt: string;
}

export const usePresence = (channelName: string = "radio-listeners") => {
  const [listenerCount, setListenerCount] = useState(0);
  const [listeners, setListeners] = useState<PresenceState[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const trackPresence = useCallback((nickname: string) => {
    const channel = supabase.channel(channelName, {
      config: {
        presence: {
          key: crypto.randomUUID(),
        },
      },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<PresenceState>();
        const allListeners: PresenceState[] = [];
        
        Object.values(state).forEach((presences) => {
          presences.forEach((presence) => {
            allListeners.push(presence);
          });
        });
        
        setListeners(allListeners);
        setListenerCount(allListeners.length);
      })
      .on("presence", { event: "join" }, ({ newPresences }) => {
        logger.log("User joined:", newPresences);
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        logger.log("User left:", leftPresences);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
          await channel.track({
            nickname,
            joinedAt: new Date().toISOString(),
          });
        }
      });

    return () => {
      channel.untrack();
      supabase.removeChannel(channel);
      setIsConnected(false);
    };
  }, [channelName]);

  return {
    listenerCount,
    listeners,
    isConnected,
    trackPresence,
  };
};

// Standalone hook for admin to just observe presence
export const usePresenceObserver = (channelName: string = "radio-listeners") => {
  const [listenerCount, setListenerCount] = useState(0);
  const [listeners, setListeners] = useState<PresenceState[]>([]);

  useEffect(() => {
    const channel = supabase.channel(channelName);

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<PresenceState>();
        const allListeners: PresenceState[] = [];
        
        Object.values(state).forEach((presences) => {
          presences.forEach((presence) => {
            allListeners.push(presence);
          });
        });
        
        setListeners(allListeners);
        setListenerCount(allListeners.length);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelName]);

  return { listenerCount, listeners };
};
