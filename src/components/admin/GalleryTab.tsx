import { useState, useRef } from "react";
import { useGallery, GalleryImage } from "@/hooks/useGallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Trash2, ImageIcon, Loader2, X } from "lucide-react";

const GalleryTab = () => {
  const { images, isLoading, addImage, updateImage, deleteImage } = useGallery();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAltText, setNewAltText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await addImage.mutateAsync({ file });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReplaceImage = async (id: string, file: File) => {
    await updateImage.mutateAsync({ id, file });
    setEditingId(null);
  };

  const handleUpdateAltText = async (id: string) => {
    await updateImage.mutateAsync({ id, altText: newAltText });
    setEditingId(null);
    setNewAltText("");
  };

  const handleDeleteImage = async (id: string) => {
    if (confirm("Är du säker på att du vill ta bort denna bild?")) {
      await deleteImage.mutateAsync(id);
    }
  };

  const startEditing = (image: GalleryImage) => {
    setEditingId(image.id);
    setNewAltText(image.alt_text || "");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-neon-cyan" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-neon-cyan flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Bildgalleri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add new image */}
          <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-neon-cyan/50 transition-colors">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAddImage}
              accept="image/*"
              className="hidden"
              id="add-gallery-image"
            />
            <label
              htmlFor="add-gallery-image"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              {addImage.isPending ? (
                <Loader2 className="w-10 h-10 text-neon-cyan animate-spin" />
              ) : (
                <Upload className="w-10 h-10 text-muted-foreground" />
              )}
              <span className="text-muted-foreground">
                {addImage.isPending ? "Laddar upp..." : "Klicka för att lägga till en ny bild"}
              </span>
            </label>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-neon-pink/50 transition-all"
              >
                <img
                  src={image.image_url}
                  alt={image.alt_text || "Galleribild"}
                  className="w-full h-full object-cover"
                />

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                  {editingId === image.id ? (
                    <div className="w-full space-y-2">
                      <Input
                        value={newAltText}
                        onChange={(e) => setNewAltText(e.target.value)}
                        placeholder="Alt-text för bilden"
                        className="text-sm"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleUpdateAltText(image.id)}
                          disabled={updateImage.isPending}
                          className="flex-1"
                        >
                          Spara
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="relative">
                        <input
                          type="file"
                          ref={replaceInputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleReplaceImage(image.id, file);
                          }}
                          accept="image/*"
                          className="hidden"
                          id={`replace-${image.id}`}
                        />
                        <label htmlFor={`replace-${image.id}`}>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-full"
                            asChild
                          >
                            <span>
                              <Upload className="w-4 h-4 mr-1" />
                              Byt bild
                            </span>
                          </Button>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => startEditing(image)}
                      >
                        Redigera
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteImage(image.id)}
                        disabled={deleteImage.isPending}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Ta bort
                      </Button>
                    </>
                  )}
                </div>

                {/* Sort order badge */}
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  #{image.sort_order}
                </div>
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Inga bilder i galleriet. Lägg till din första bild ovan.
            </p>
          )}

          <p className="text-sm text-muted-foreground">
            Tips: Dessa bilder visas i "Connect with DJ Lobo"-sektionen på startsidan.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryTab;
