import { useState, useMemo } from "react";
import { Play, Clock, Flame, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export interface Mix {
  id: string;
  title: string;
  genre: string;
  duration: string;
  imageUrl: string;
  playCount: number;
  createdAt: Date;
  isNew?: boolean;
}

// Placeholder mixes - in production, these would come from a database
const PLACEHOLDER_MIXES: Mix[] = [
  {
    id: "1",
    title: "80s Synth Wave Classics",
    genre: "Synthwave / 80s",
    duration: "1:23:45",
    imageUrl: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&h=400&fit=crop",
    playCount: 1250,
    createdAt: new Date("2024-12-15"),
    isNew: true,
  },
  {
    id: "2",
    title: "90s Eurodance Party",
    genre: "Eurodance / 90s",
    duration: "1:45:30",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    playCount: 3420,
    createdAt: new Date("2024-11-20"),
  },
  {
    id: "3",
    title: "Latin Heat Mix",
    genre: "Salsa / Reggaeton",
    duration: "1:12:00",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    playCount: 2180,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "4",
    title: "Retro Disco Nights",
    genre: "Disco / Funk",
    duration: "2:00:00",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    playCount: 4560,
    createdAt: new Date("2024-10-15"),
  },
  {
    id: "5",
    title: "Summer Throwback 2024",
    genre: "Mixed / Party",
    duration: "1:30:00",
    imageUrl: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=400&fit=crop",
    playCount: 890,
    createdAt: new Date("2024-12-28"),
    isNew: true,
  },
  {
    id: "6",
    title: "Club Classics Vol. 1",
    genre: "House / Club",
    duration: "1:55:20",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
    playCount: 5230,
    createdAt: new Date("2024-09-10"),
  },
];

type SortOption = "newest" | "most_played";

const translations = {
  sv: {
    title: "Mixar & Sets",
    subtitle: "Utforska DJ Lobos senaste mixar",
    newest: "Nyast",
    mostPlayed: "Mest spelade",
    plays: "spelningar",
    new: "NY",
    comingSoon: "Kommer snart",
    noMixes: "Inga mixar tillgängliga",
  },
  en: {
    title: "Mixes & Sets",
    subtitle: "Explore DJ Lobo's latest mixes",
    newest: "Newest",
    mostPlayed: "Most Played",
    plays: "plays",
    new: "NEW",
    comingSoon: "Coming Soon",
    noMixes: "No mixes available",
  },
  es: {
    title: "Mezclas & Sets",
    subtitle: "Explora las últimas mezclas de DJ Lobo",
    newest: "Más recientes",
    mostPlayed: "Más reproducidos",
    plays: "reproducciones",
    new: "NUEVO",
    comingSoon: "Próximamente",
    noMixes: "No hay mezclas disponibles",
  },
};

interface MixGridProps {
  mixes?: Mix[];
  className?: string;
}

const MixGrid = ({ mixes = PLACEHOLDER_MIXES, className = "" }: MixGridProps) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const sortedMixes = useMemo(() => {
    const sorted = [...mixes];
    
    if (sortBy === "newest") {
      sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sortBy === "most_played") {
      sorted.sort((a, b) => b.playCount - a.playCount);
    }
    
    return sorted;
  }, [mixes, sortBy]);

  const formatPlayCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <section className={`py-16 sm:py-24 px-4 sm:px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neon-gradient mb-3 sm:mb-4 italic">
            {t.title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={sortBy === "newest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("newest")}
            className={sortBy === "newest" 
              ? "bg-gradient-to-r from-neon-pink to-neon-purple border-0" 
              : "glass-card border-primary/30 hover:border-primary/60"
            }
          >
            <Clock className="w-4 h-4 mr-2" />
            {t.newest}
          </Button>
          <Button
            variant={sortBy === "most_played" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("most_played")}
            className={sortBy === "most_played" 
              ? "bg-gradient-to-r from-neon-pink to-neon-purple border-0" 
              : "glass-card border-primary/30 hover:border-primary/60"
            }
          >
            <Flame className="w-4 h-4 mr-2" />
            {t.mostPlayed}
          </Button>
        </div>

        {/* Mix Grid */}
        {sortedMixes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t.noMixes}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMixes.map((mix) => (
              <article
                key={mix.id}
                className="glass-card overflow-hidden group hover:border-neon-cyan/50 transition-all duration-300 cursor-pointer"
              >
                {/* Cover Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={mix.imageUrl}
                    alt={mix.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div 
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300"
                      style={{
                        boxShadow: "0 0 30px rgba(255, 0, 255, 0.5)",
                      }}
                    >
                      <Play className="w-7 h-7 text-white ml-1" />
                    </div>
                  </div>

                  {/* Coming Soon Overlay */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan text-white font-bold text-sm uppercase tracking-wider">
                      {t.comingSoon}
                    </span>
                  </div>

                  {/* New Badge */}
                  {mix.isNew && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded text-xs font-bold bg-neon-cyan text-black">
                        {t.new}
                      </span>
                    </div>
                  )}

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-black/70 text-white backdrop-blur-sm">
                      {mix.duration}
                    </span>
                  </div>
                </div>

                {/* Mix Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-neon-cyan transition-colors line-clamp-1 mb-1">
                    {mix.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {mix.genre}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Flame className="w-3 h-3 text-neon-pink" />
                    <span>{formatPlayCount(mix.playCount)} {t.plays}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MixGrid;
