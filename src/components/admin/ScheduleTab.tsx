import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar, Save, ExternalLink, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScheduleTab = () => {
  const [calendarId, setCalendarId] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCalendarId();
  }, []);

  const fetchCalendarId = async () => {
    const { data, error } = await supabase
      .from("site_branding")
      .select("google_calendar_id")
      .limit(1)
      .maybeSingle();

    if (!error && data?.google_calendar_id) {
      setCalendarId(data.google_calendar_id);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Check if branding row exists
    const { data: existing } = await supabase
      .from("site_branding")
      .select("id")
      .limit(1)
      .maybeSingle();

    let error;
    
    if (existing) {
      const result = await supabase
        .from("site_branding")
        .update({ google_calendar_id: calendarId || null })
        .eq("id", existing.id);
      error = result.error;
    } else {
      const result = await supabase
        .from("site_branding")
        .insert({ google_calendar_id: calendarId || null });
      error = result.error;
    }

    if (error) {
      toast({
        title: "Fel",
        description: "Kunde inte spara kalender-ID: " + error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sparat!",
        description: "Google Calendar-ID har uppdaterats",
      });
    }
    
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Google Calendar Integration
          </CardTitle>
          <CardDescription>
            Koppla en Google Kalender för att visa kommande DJ-spelningar automatiskt
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Info box */}
          <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Så här hittar du ditt Kalender-ID:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Öppna Google Calendar</li>
                  <li>Klicka på ⋮ bredvid din kalender → "Inställningar och delning"</li>
                  <li>Scrolla ner till "Integrera kalender"</li>
                  <li>Kopiera "Kalender-ID" (t.ex. example@gmail.com)</li>
                </ol>
                <p className="mt-2">
                  <strong>Viktigt:</strong> Kalendern måste vara offentlig för att kunna hämtas.
                </p>
              </div>
            </div>
          </div>

          {/* Calendar ID input */}
          <div className="space-y-2">
            <Label htmlFor="calendar-id">Google Calendar ID</Label>
            <div className="flex gap-2">
              <Input
                id="calendar-id"
                value={calendarId}
                onChange={(e) => setCalendarId(e.target.value)}
                placeholder="example@gmail.com eller längre ID"
                className="bg-input border-border"
              />
              <Button onClick={handleSave} disabled={saving} className="neon-glow-pink">
                {saving ? (
                  <div className="loading-spinner w-4 h-4" />
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Spara
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Lämna tomt för att visa platshållare istället
            </p>
          </div>

          {/* Current status */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              <strong>Status:</strong>{" "}
              {calendarId ? (
                <span className="text-green-400">Kalender kopplad</span>
              ) : (
                <span className="text-yellow-400">Visar platshållare</span>
              )}
            </p>
          </div>

          {/* Link to Google Calendar */}
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Öppna Google Calendar
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleTab;
