import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Send, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  nickname: string;
  message: string;
  created_at: string;
}

const LiveChat = () => {
  const [nickname, setNickname] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch initial messages
  useEffect(() => {
    if (!isJoined) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(100);

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();
  }, [isJoined]);

  // Real-time subscription
  useEffect(() => {
    if (!isJoined) return;

    const channel = supabase
      .channel("chat-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isJoined]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNickname = nickname.trim();
    if (trimmedNickname.length < 2) {
      toast({
        title: "Ogiltigt namn",
        description: "Ditt smeknamn måste vara minst 2 tecken.",
        variant: "destructive",
      });
      return;
    }
    if (trimmedNickname.length > 20) {
      toast({
        title: "Ogiltigt namn",
        description: "Ditt smeknamn får vara max 20 tecken.",
        variant: "destructive",
      });
      return;
    }
    setIsJoined(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    
    if (!trimmedMessage) return;
    if (trimmedMessage.length > 500) {
      toast({
        title: "Meddelandet är för långt",
        description: "Max 500 tecken per meddelande.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.from("chat_messages").insert({
      nickname: nickname.trim(),
      message: trimmedMessage,
    });

    if (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Kunde inte skicka",
        description: "Försök igen.",
        variant: "destructive",
      });
    } else {
      setMessage("");
    }

    setIsLoading(false);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Join screen
  if (!isJoined) {
    return (
      <section 
        className="py-12 sm:py-16 px-4 sm:px-6"
        aria-labelledby="chat-join-title"
      >
        <div className="max-w-md mx-auto">
          <div className="glass-card p-6 sm:p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full icon-gradient-cyan flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <h2 
              id="chat-join-title"
              className="font-display text-2xl sm:text-3xl font-bold text-neon-gradient mb-2"
            >
              LIVE CHAT
            </h2>
            <p className="text-muted-foreground mb-6">
              Chatta med andra lyssnare i realtid!
            </p>
            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <label htmlFor="nickname-input" className="sr-only">
                  Ange ditt smeknamn
                </label>
                <Input
                  id="nickname-input"
                  type="text"
                  placeholder="Ange ditt smeknamn..."
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="bg-background/50 border-muted focus:border-neon-cyan text-center text-lg"
                  maxLength={20}
                  aria-describedby="nickname-help"
                />
                <p id="nickname-help" className="text-xs text-muted-foreground mt-2">
                  2-20 tecken
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90 text-white font-display font-bold tracking-wider"
                aria-label="Gå med i chatten"
              >
                <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                GÅ MED I CHATTEN
              </Button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // Chat interface
  return (
    <section 
      className="py-12 sm:py-16 px-4 sm:px-6"
      aria-labelledby="chat-title"
    >
      <div className="max-w-2xl mx-auto">
        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-muted flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-neon-cyan rounded-full animate-pulse" aria-hidden="true"></div>
              <h2 
                id="chat-title"
                className="font-display font-bold text-neon-gradient"
              >
                LIVE CHAT
              </h2>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="text-neon-pink font-semibold">{nickname}</span>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea 
            className="h-64 sm:h-80 p-4" 
            ref={scrollRef}
            aria-label="Chattmeddelanden"
            role="log"
            aria-live="polite"
          >
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" aria-hidden="true" />
                <p>Inga meddelanden ännu. Bli först!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.nickname === nickname ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 ${
                        msg.nickname === nickname
                          ? "bg-gradient-to-r from-neon-pink/20 to-neon-cyan/20 border border-neon-cyan/30"
                          : "bg-muted/50 border border-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-semibold ${
                            msg.nickname === nickname
                              ? "text-neon-cyan"
                              : "text-neon-pink"
                          }`}
                        >
                          {msg.nickname}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {formatTime(msg.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground break-words">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-muted flex gap-2"
          >
            <label htmlFor="message-input" className="sr-only">
              Skriv ett meddelande
            </label>
            <Input
              id="message-input"
              ref={inputRef}
              type="text"
              placeholder="Skriv ett meddelande..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-background/50 border-muted focus:border-neon-cyan"
              maxLength={500}
              disabled={isLoading}
              aria-label="Meddelande"
            />
            <Button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90 text-white"
              aria-label="Skicka meddelande"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LiveChat;
