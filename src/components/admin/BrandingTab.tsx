import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Upload, 
  Image, 
  Palette, 
  Save, 
  Loader2, 
  Check,
  Monitor,
  User,
  Layout,
  Sparkles,
  Youtube
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useBranding, SiteBranding } from "@/hooks/useBranding";

// Preset color themes
const COLOR_PRESETS = [
  { name: "Neon Pink", primary: "300 100% 50%", secondary: "180 100% 50%", accent: "270 100% 60%" },
  { name: "Electric Blue", primary: "220 100% 60%", secondary: "180 100% 50%", accent: "200 100% 50%" },
  { name: "Sunset Orange", primary: "25 100% 55%", secondary: "45 100% 50%", accent: "10 100% 50%" },
  { name: "Cyber Green", primary: "120 100% 45%", secondary: "180 100% 50%", accent: "150 100% 50%" },
  { name: "Purple Haze", primary: "280 100% 55%", secondary: "260 100% 50%", accent: "300 100% 60%" },
  { name: "Golden Hour", primary: "40 100% 50%", secondary: "60 100% 45%", accent: "30 100% 55%" },
];

const BrandingTab = () => {
  const { branding, loading, updateBranding, uploadImage, refetch } = useBranding();
  const { toast } = useToast();
  
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  
  // Local state for pending changes
  const [pendingChanges, setPendingChanges] = useState<Partial<SiteBranding>>({});
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({});
  
  const heroInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
    imageType: "hero" | "logo" | "background" | "profile"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Please select an image file", variant: "destructive" });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Error", description: "Image must be less than 5MB", variant: "destructive" });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImages((prev) => ({ ...prev, [imageType]: e.target?.result as string }));
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(imageType);
    const { url, error } = await uploadImage(file, imageType);
    setUploading(null);

    if (error) {
      toast({ title: "Upload Failed", description: error, variant: "destructive" });
      setPreviewImages((prev) => {
        const next = { ...prev };
        delete next[imageType];
        return next;
      });
      return;
    }

    // Add to pending changes
    const fieldMap = {
      hero: "hero_image_url",
      logo: "logo_url",
      background: "background_image_url",
      profile: "profile_image_url",
    };
    
    setPendingChanges((prev) => ({ ...prev, [fieldMap[imageType]]: url }));
    toast({ title: "Uploaded", description: `${imageType} image uploaded. Click Save to apply.` });
  };

  const handleColorPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setPendingChanges((prev) => ({
      ...prev,
      primary_glow_color: preset.primary,
      secondary_glow_color: preset.secondary,
      accent_color: preset.accent,
    }));
  };

  const handleCustomColor = (colorType: string, value: string) => {
    // Convert hex to HSL
    const hsl = hexToHsl(value);
    if (hsl) {
      setPendingChanges((prev) => ({ ...prev, [colorType]: hsl }));
    }
  };

  const handleSave = async () => {
    if (Object.keys(pendingChanges).length === 0) {
      toast({ title: "No Changes", description: "Nothing to save" });
      return;
    }

    setSaving(true);
    const { error } = await updateBranding(pendingChanges);
    setSaving(false);

    if (error) {
      toast({ title: "Save Failed", description: error, variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: "Branding updated successfully" });
      setPendingChanges({});
      setPreviewImages({});
      refetch();
    }
  };

  const getImagePreview = (imageType: "hero" | "logo" | "background" | "profile") => {
    if (previewImages[imageType]) return previewImages[imageType];
    
    const fieldMap = {
      hero: branding?.hero_image_url,
      logo: branding?.logo_url,
      background: branding?.background_image_url,
      profile: branding?.profile_image_url,
    };
    
    return fieldMap[imageType] || null;
  };

  const hasPendingChanges = Object.keys(pendingChanges).length > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-6 pr-4">
        {/* Save Button - Sticky */}
        {hasPendingChanges && (
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur py-3 -mx-4 px-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                You have unsaved changes
              </p>
              <Button onClick={handleSave} disabled={saving} className="neon-glow-cyan">
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        )}

        {/* Profile Image */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <User className="w-5 h-5 text-neon-pink" />
              DJ Profile Picture
            </CardTitle>
            <CardDescription>Main profile image shown on the landing page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              {/* Preview */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-neon-pink/50 bg-muted/30 flex-shrink-0">
                {getImagePreview("profile") ? (
                  <img 
                    src={getImagePreview("profile")!} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                {uploading === "profile" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-3">
                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, "profile")}
                />
                <Button 
                  variant="outline" 
                  onClick={() => profileInputRef.current?.click()}
                  disabled={uploading === "profile"}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Photo
                </Button>
                <p className="text-xs text-muted-foreground">
                  Recommended: Square image, at least 400x400px, max 5MB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hero Image */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Layout className="w-5 h-5 text-neon-cyan" />
              Hero Banner Image
            </CardTitle>
            <CardDescription>Large banner image at the top of the landing page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Preview */}
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border/50 bg-muted/30">
                {getImagePreview("hero") ? (
                  <img 
                    src={getImagePreview("hero")!} 
                    alt="Hero preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
                {uploading === "hero" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <input
                  ref={heroInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, "hero")}
                />
                <Button 
                  variant="outline" 
                  onClick={() => heroInputRef.current?.click()}
                  disabled={uploading === "hero"}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Hero Image
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Recommended: 1920x1080px or 16:9 aspect ratio, max 5MB
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Logo */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-neon-purple" />
              Logo
            </CardTitle>
            <CardDescription>Your brand logo shown in the header and footer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              {/* Preview */}
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border/50 bg-muted/30 flex-shrink-0">
                {getImagePreview("logo") ? (
                  <img 
                    src={getImagePreview("logo")!} 
                    alt="Logo preview" 
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                {uploading === "logo" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-3">
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, "logo")}
                />
                <Button 
                  variant="outline" 
                  onClick={() => logoInputRef.current?.click()}
                  disabled={uploading === "logo"}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </Button>
                <p className="text-xs text-muted-foreground">
                  Recommended: PNG with transparent background, max 5MB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Background Image */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Monitor className="w-5 h-5 text-neon-blue" />
              Background Image
            </CardTitle>
            <CardDescription>Full-page background image (optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Preview */}
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border/50 bg-muted/30 max-w-md">
                {getImagePreview("background") ? (
                  <img 
                    src={getImagePreview("background")!} 
                    alt="Background preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Monitor className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                {uploading === "background" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <input
                  ref={bgInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, "background")}
                />
                <Button 
                  variant="outline" 
                  onClick={() => bgInputRef.current?.click()}
                  disabled={uploading === "background"}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Background
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Recommended: High-resolution image, will be darkened for readability
              </p>
            </div>
          </CardContent>
        </Card>

        {/* YouTube Video */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-500" />
              YouTube Video
            </CardTitle>
            <CardDescription>Featured video shown on the landing page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-video-id">Video ID</Label>
              <Input
                id="youtube-video-id"
                placeholder="e.g. dQw4w9WgXcQ"
                value={pendingChanges.youtube_video_id ?? branding?.youtube_video_id ?? ""}
                onChange={(e) => setPendingChanges((prev) => ({ ...prev, youtube_video_id: e.target.value }))}
                className="bg-input border-border"
              />
              <p className="text-xs text-muted-foreground">
                Kopiera video-ID från YouTube URL (t.ex. youtube.com/watch?v=<strong>ABC123</strong>)
              </p>
            </div>
            
            {/* Video Preview */}
            {(pendingChanges.youtube_video_id || branding?.youtube_video_id) && (
              <div className="aspect-video rounded-lg overflow-hidden border border-border/50">
                <iframe
                  src={`https://www.youtube.com/embed/${pendingChanges.youtube_video_id || branding?.youtube_video_id}?rel=0&modestbranding=1`}
                  title="YouTube Video Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Color Theme */}
        <Card className="glass-card-pink">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              Glow Colors
            </CardTitle>
            <CardDescription>Choose your site's neon glow theme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Preset Themes */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Quick Presets</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {COLOR_PRESETS.map((preset) => {
                  const isSelected = 
                    pendingChanges.primary_glow_color === preset.primary ||
                    branding?.primary_glow_color === preset.primary;
                  
                  return (
                    <button
                      key={preset.name}
                      onClick={() => handleColorPreset(preset)}
                      className={`relative p-4 rounded-lg border transition-all ${
                        isSelected 
                          ? "border-primary bg-primary/10" 
                          : "border-border/50 hover:border-primary/50 bg-muted/20"
                      }`}
                    >
                      <div className="flex gap-1 mb-2">
                        <span 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: `hsl(${preset.primary})` }}
                        />
                        <span 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: `hsl(${preset.secondary})` }}
                        />
                        <span 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: `hsl(${preset.accent})` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{preset.name}</span>
                      {isSelected && (
                        <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Colors */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Custom Colors</Label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Primary Glow</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={hslToHex(pendingChanges.primary_glow_color || branding?.primary_glow_color || "300 100% 50%")}
                      onChange={(e) => handleCustomColor("primary_glow_color", e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-0"
                    />
                    <div 
                      className="w-10 h-10 rounded neon-glow-pink"
                      style={{ 
                        backgroundColor: `hsl(${pendingChanges.primary_glow_color || branding?.primary_glow_color || "300 100% 50%"})` 
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Secondary Glow</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={hslToHex(pendingChanges.secondary_glow_color || branding?.secondary_glow_color || "180 100% 50%")}
                      onChange={(e) => handleCustomColor("secondary_glow_color", e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-0"
                    />
                    <div 
                      className="w-10 h-10 rounded neon-glow-cyan"
                      style={{ 
                        backgroundColor: `hsl(${pendingChanges.secondary_glow_color || branding?.secondary_glow_color || "180 100% 50%"})` 
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Accent</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={hslToHex(pendingChanges.accent_color || branding?.accent_color || "270 100% 60%")}
                      onChange={(e) => handleCustomColor("accent_color", e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-0"
                    />
                    <div 
                      className="w-10 h-10 rounded"
                      style={{ 
                        backgroundColor: `hsl(${pendingChanges.accent_color || branding?.accent_color || "270 100% 60%"})`,
                        boxShadow: `0 0 20px hsla(${pendingChanges.accent_color || branding?.accent_color || "270 100% 60%"}, 0.5)`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Live Preview</Label>
              <div 
                className="p-6 rounded-lg border border-border/50 bg-background"
                style={{
                  background: `linear-gradient(135deg, 
                    hsla(${pendingChanges.primary_glow_color || branding?.primary_glow_color || "300 100% 50%"}, 0.1),
                    hsla(${pendingChanges.secondary_glow_color || branding?.secondary_glow_color || "180 100% 50%"}, 0.1)
                  )`
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full"
                    style={{ 
                      backgroundColor: `hsl(${pendingChanges.primary_glow_color || branding?.primary_glow_color || "300 100% 50%"})`,
                      boxShadow: `0 0 20px hsla(${pendingChanges.primary_glow_color || branding?.primary_glow_color || "300 100% 50%"}, 0.5)`
                    }}
                  />
                  <div>
                    <h4 
                      className="font-display font-bold"
                      style={{
                        background: `linear-gradient(90deg, 
                          hsl(${pendingChanges.primary_glow_color || branding?.primary_glow_color || "300 100% 50%"}), 
                          hsl(${pendingChanges.secondary_glow_color || branding?.secondary_glow_color || "180 100% 50%"})
                        )`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      DJ LOBO RADIO
                    </h4>
                    <p className="text-sm text-muted-foreground">Preview of your theme</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  style={{ 
                    backgroundColor: `hsl(${pendingChanges.primary_glow_color || branding?.primary_glow_color || "300 100% 50%"})`,
                    boxShadow: `0 0 15px hsla(${pendingChanges.primary_glow_color || branding?.primary_glow_color || "300 100% 50%"}, 0.4)`
                  }}
                >
                  Sample Button
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Site Info */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-display">Site Information</CardTitle>
            <CardDescription>Basic site name and tagline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={pendingChanges.site_name ?? branding?.site_name ?? ""}
                onChange={(e) => setPendingChanges((prev) => ({ ...prev, site_name: e.target.value }))}
                placeholder="DJ Lobo Radio"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={pendingChanges.tagline ?? branding?.tagline ?? ""}
                onChange={(e) => setPendingChanges((prev) => ({ ...prev, tagline: e.target.value }))}
                placeholder="Bringing the best of 80s and 90s music"
                className="mt-1.5"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

// Helper: Convert HSL string to hex
function hslToHex(hsl: string): string {
  try {
    const [h, s, l] = hsl.split(" ").map((v) => parseFloat(v));
    const sNorm = s / 100;
    const lNorm = l / 100;
    
    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = lNorm - c / 2;
    
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }
    
    const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } catch {
    return "#ff00ff";
  }
}

// Helper: Convert hex to HSL string
function hexToHsl(hex: string): string | null {
  try {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;
    
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  } catch {
    return null;
  }
}

export default BrandingTab;
