import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Info } from "lucide-react";

const testimonials = [
  { author: "Maria & Erik", event: "Bröllop", quote: "DJ Lobo skapade den perfekta stämningen på vårt bröllop. Alla gäster dansade hela natten!", rating: 5 },
  { author: "Anna Lindqvist, Volvo Cars", event: "Företagsevent", quote: "Professionell och flexibel. Anpassade musiken perfekt till vår företagsfest.", rating: 5 },
  { author: "Johan Andersson", event: "Privatfest", quote: "Bästa DJ:n vi haft på någon av våra fester! Energin var fantastisk.", rating: 5 },
  { author: "Studentkommittén 2024", event: "Studentfest", quote: "DJ Lobo fick hela studentfesten att lyfta. Kommer definitivt boka igen!", rating: 5 },
];

const TestimonialsTab = () => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">⭐ Omdömen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-start gap-3 bg-muted/30 rounded-lg p-4 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Omdömena visas automatiskt på sidan. Kontakta utvecklaren om du vill lägga till, ändra eller ta bort ett omdöme.
            </p>
          </div>
          {testimonials.map((t, i) => (
            <div key={i} className="p-4 rounded-lg bg-muted/20 border border-border/30">
              <div className="flex gap-1 mb-2">
                {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-neon-cyan fill-neon-cyan" />)}
              </div>
              <p className="text-sm text-foreground italic mb-2">"{t.quote}"</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{t.author}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{t.event}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialsTab;
