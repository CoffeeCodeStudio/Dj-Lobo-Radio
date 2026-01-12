import { useState } from "react";
import { Calendar, Send, Music, PartyPopper, Building2, Mic2, CheckCircle, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  sv: {
    title: "Boka DJ Lobo",
    subtitle: "Fyll i formuläret så kontaktar vi dig",
    eventType: "Typ av event",
    selectEventType: "Välj eventtyp",
    wedding: "Bröllop",
    corporate: "Företagsevent",
    club: "Klubb / Nattklubb",
    private: "Privat fest",
    festival: "Festival",
    other: "Annat",
    date: "Önskat datum",
    selectDate: "Välj datum",
    name: "Ditt namn",
    namePlaceholder: "Ange ditt namn",
    email: "E-post",
    emailPlaceholder: "din@email.com",
    phone: "Telefon",
    phonePlaceholder: "+46 70 123 45 67",
    message: "Meddelande",
    messagePlaceholder: "Berätta mer om ditt event...",
    submit: "Skicka förfrågan",
    sending: "Skickar...",
    success: "Förfrågan skickad!",
    successDesc: "Vi kontaktar dig inom 24 timmar.",
    error: "Kunde inte skicka",
    errorDesc: "Försök igen senare.",
    required: "Obligatoriskt fält",
    location: "Plats",
    locationPlaceholder: "Stad eller lokal",
  },
  en: {
    title: "Book DJ Lobo",
    subtitle: "Fill out the form and we'll contact you",
    eventType: "Event Type",
    selectEventType: "Select event type",
    wedding: "Wedding",
    corporate: "Corporate Event",
    club: "Club / Nightclub",
    private: "Private Party",
    festival: "Festival",
    other: "Other",
    date: "Preferred Date",
    selectDate: "Select date",
    name: "Your Name",
    namePlaceholder: "Enter your name",
    email: "Email",
    emailPlaceholder: "your@email.com",
    phone: "Phone",
    phonePlaceholder: "+46 70 123 45 67",
    message: "Message",
    messagePlaceholder: "Tell us more about your event...",
    submit: "Send Request",
    sending: "Sending...",
    success: "Request Sent!",
    successDesc: "We'll contact you within 24 hours.",
    error: "Could not send",
    errorDesc: "Please try again later.",
    required: "Required field",
    location: "Location",
    locationPlaceholder: "City or venue",
  },
  es: {
    title: "Reserva a DJ Lobo",
    subtitle: "Completa el formulario y te contactaremos",
    eventType: "Tipo de Evento",
    selectEventType: "Selecciona tipo de evento",
    wedding: "Boda",
    corporate: "Evento Corporativo",
    club: "Club / Discoteca",
    private: "Fiesta Privada",
    festival: "Festival",
    other: "Otro",
    date: "Fecha Preferida",
    selectDate: "Selecciona fecha",
    name: "Tu Nombre",
    namePlaceholder: "Ingresa tu nombre",
    email: "Correo",
    emailPlaceholder: "tu@email.com",
    phone: "Teléfono",
    phonePlaceholder: "+46 70 123 45 67",
    message: "Mensaje",
    messagePlaceholder: "Cuéntanos más sobre tu evento...",
    submit: "Enviar Solicitud",
    sending: "Enviando...",
    success: "¡Solicitud Enviada!",
    successDesc: "Te contactaremos en 24 horas.",
    error: "No se pudo enviar",
    errorDesc: "Intenta de nuevo más tarde.",
    required: "Campo obligatorio",
    location: "Ubicación",
    locationPlaceholder: "Ciudad o lugar",
  },
};

const eventTypeIcons: Record<string, React.ReactNode> = {
  wedding: <PartyPopper className="w-4 h-4" />,
  corporate: <Building2 className="w-4 h-4" />,
  club: <Music className="w-4 h-4" />,
  private: <PartyPopper className="w-4 h-4" />,
  festival: <Mic2 className="w-4 h-4" />,
  other: <Music className="w-4 h-4" />,
};

interface BookingFormProps {
  className?: string;
}

const BookingForm = ({ className = "" }: BookingFormProps) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    eventType: "",
    date: undefined as Date | undefined,
    location: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.eventType || !formData.date || !formData.name || !formData.email) {
      toast({
        title: t.error,
        description: t.required,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("bookings").insert({
        event_type: formData.eventType,
        event_date: formData.date ? format(formData.date, "yyyy-MM-dd") : null,
        location: formData.location || null,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        message: formData.message.trim() || null,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: t.success,
        description: t.successDesc,
      });
    } catch (err) {
      console.error("Booking error:", err);
      toast({
        title: t.error,
        description: t.errorDesc,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`glass-card p-8 text-center ${className}`}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-pink to-neon-cyan flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-display text-2xl font-bold text-neon-gradient mb-2">
          {t.success}
        </h3>
        <p className="text-muted-foreground">{t.successDesc}</p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              eventType: "",
              date: undefined,
              location: "",
              name: "",
              email: "",
              phone: "",
              message: "",
            });
          }}
        >
          {language === "sv" ? "Skicka ny förfrågan" : language === "es" ? "Nueva solicitud" : "New request"}
        </Button>
      </div>
    );
  }

  return (
    <div className={`glass-card p-6 sm:p-8 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-neon-gradient mb-2">
          {t.title}
        </h3>
        <p className="text-muted-foreground text-sm">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Type */}
        <div className="space-y-2">
          <Label htmlFor="eventType">{t.eventType} *</Label>
          <Select
            value={formData.eventType}
            onValueChange={(value) => setFormData({ ...formData, eventType: value })}
          >
            <SelectTrigger id="eventType" className="glass-card border-primary/30">
              <SelectValue placeholder={t.selectEventType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wedding">
                <span className="flex items-center gap-2">
                  {eventTypeIcons.wedding} {t.wedding}
                </span>
              </SelectItem>
              <SelectItem value="corporate">
                <span className="flex items-center gap-2">
                  {eventTypeIcons.corporate} {t.corporate}
                </span>
              </SelectItem>
              <SelectItem value="club">
                <span className="flex items-center gap-2">
                  {eventTypeIcons.club} {t.club}
                </span>
              </SelectItem>
              <SelectItem value="private">
                <span className="flex items-center gap-2">
                  {eventTypeIcons.private} {t.private}
                </span>
              </SelectItem>
              <SelectItem value="festival">
                <span className="flex items-center gap-2">
                  {eventTypeIcons.festival} {t.festival}
                </span>
              </SelectItem>
              <SelectItem value="other">
                <span className="flex items-center gap-2">
                  {eventTypeIcons.other} {t.other}
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date & Location Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t.date} *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal glass-card border-primary/30"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {formData.date ? (
                    format(formData.date, "PPP", { locale: language === "sv" ? sv : undefined })
                  ) : (
                    <span className="text-muted-foreground">{t.selectDate}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarPicker
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => setFormData({ ...formData, date })}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">{t.location}</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                type="text"
                placeholder={t.locationPlaceholder}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="glass-card border-primary/30 pl-9"
              />
            </div>
          </div>
        </div>

        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t.name} *</Label>
            <Input
              id="name"
              type="text"
              placeholder={t.namePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="glass-card border-primary/30"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t.email} *</Label>
            <Input
              id="email"
              type="email"
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="glass-card border-primary/30"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">{t.phone}</Label>
          <Input
            id="phone"
            type="tel"
            placeholder={t.phonePlaceholder}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="glass-card border-primary/30"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">{t.message}</Label>
          <Textarea
            id="message"
            placeholder={t.messagePlaceholder}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="glass-card border-primary/30 min-h-[100px]"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-pink/80 hover:to-neon-purple/80 text-white font-bold py-6"
          style={{
            boxShadow: "0 0 20px rgba(255, 0, 255, 0.4)",
          }}
        >
          {isSubmitting ? (
            <>
              <span className="loading-spinner mr-2" />
              {t.sending}
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {t.submit}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
