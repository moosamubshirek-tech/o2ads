import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Trash2, Plus, UploadCloud, X, Pencil } from "lucide-react";

export const Route = createFileRoute("/admin/portfolio")({
  component: PortfolioPage,
});

const CATEGORIES = ["Social Media", "Ads", "Branding", "Posters"];

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image_url: string | null;
  description: string | null;
  created_at: string | null;
};

function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) toast.error(error.message);
    else setItems((data as PortfolioItem[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (item: PortfolioItem) => {
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;

    if (item.image_url?.includes("portfolio-images")) {
      const path = item.image_url.split("/portfolio-images/")[1];
      if (path) await supabase.storage.from("portfolio-images").remove([path]);
    }

    const { error } = await supabase.from("portfolio").delete().eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Work deleted.");
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Portfolio</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-wider">Our Works</h1>
          <p className="mt-2 text-sm text-muted-foreground">Manage portfolio pieces shown on the website.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 bg-crimson px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground hover:bg-blood"
        >
          <Plus className="h-4 w-4" /> Add Work
        </button>
      </div>

      {showForm && (
        <AddWorkForm
          onClose={() => setShowForm(false)}
          onAdded={(item) => {
            setItems((prev) => [item, ...prev]);
            setShowForm(false);
          }}
        />
      )}

      {editingItem && (
        <AddWorkForm
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdated={(updated) => {
            setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
            setEditingItem(null);
          }}
        />
      )}

      {loading ? (
        <div className="grid min-h-[260px] place-items-center">
          <Loader2 className="h-6 w-6 animate-spin text-crimson" />
        </div>
      ) : items.length === 0 ? (
        <div className="border border-border bg-surface p-8 text-center text-muted-foreground">
          No works added yet. Click &quot;Add Work&quot; to get started.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="group overflow-hidden border border-border bg-surface">
              <div className="relative aspect-[4/3] bg-background">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-sm text-muted-foreground">No image</div>
                )}
                <div className="absolute right-2 top-2 flex gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="grid h-9 w-9 place-items-center bg-background/80 text-foreground hover:bg-crimson hover:text-foreground"
                    title="Edit"
                    aria-label={`Edit ${item.title}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="grid h-9 w-9 place-items-center bg-background/80 text-crimson hover:bg-crimson hover:text-foreground"
                    title="Delete"
                    aria-label={`Delete ${item.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <span className="inline-block bg-crimson px-2 py-1 font-display text-[10px] uppercase tracking-[0.18em] text-foreground">
                  {item.category}
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold uppercase text-foreground">{item.title}</h2>
                {item.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddWorkForm({
  item,
  onClose,
  onAdded,
  onUpdated,
}: {
  item?: PortfolioItem;
  onClose: () => void;
  onAdded?: (item: PortfolioItem) => void;
  onUpdated?: (item: PortfolioItem) => void;
}) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState(item?.category ?? CATEGORIES[0]);
  const [description, setDescription] = useState(item?.description ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(item?.image_url ?? null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const isEditing = Boolean(item);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setImageFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!imageFile && !item?.image_url) {
      toast.error("Please select an image.");
      return;
    }

    setSaving(true);
    let imageUrl = item?.image_url ?? null;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
        .upload(fileName, imageFile, { contentType: imageFile.type, upsert: false });

      if (uploadError) {
        toast.error("Image upload failed: " + uploadError.message);
        setSaving(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage.from("portfolio-images").getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    }

    const payload = { title: title.trim(), category, description: description.trim() || null, image_url: imageUrl };
    const query = isEditing && item
      ? supabase.from("portfolio").update(payload).eq("id", item.id).select().single()
      : supabase.from("portfolio").insert(payload).select().single();
    const { data, error } = await query;

    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(isEditing ? "Work updated!" : "Work added!");
    if (isEditing) onUpdated?.(data as PortfolioItem);
    else onAdded?.(data as PortfolioItem);
  };

  const inputCls = "w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-crimson focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-background/80 px-3 py-4 sm:px-4 sm:py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-surface">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-6">
          <h2 className="break-words font-display text-xl font-bold uppercase tracking-normal sm:text-2xl">{isEditing ? "Edit Work" : "Add New Work"}</h2>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center border border-border text-muted-foreground hover:border-crimson hover:text-crimson" aria-label="Close form">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-4 sm:p-6">
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onFileChange} />
          {preview ? (
            <div className="relative grid min-h-[300px] place-items-center overflow-hidden border border-border bg-background p-2 sm:min-h-[360px]">
              <img src={preview} alt="Selected work preview" className="max-h-[70vh] w-full object-contain" />
              <button
                onClick={clearImage}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center bg-background/80 text-crimson hover:bg-crimson hover:text-foreground"
                aria-label="Remove selected image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-3 border border-dashed border-border bg-background py-10 text-muted-foreground transition-colors hover:border-crimson hover:text-crimson"
            >
              <UploadCloud className="h-8 w-8" />
              <span className="font-display text-sm font-bold uppercase tracking-[0.18em]">Click to upload image</span>
              <span className="text-xs">JPG, PNG, WEBP — max 5MB</span>
            </button>
          )}

          <input className={inputCls} placeholder="Title *" value={title} onChange={(e) => setTitle(e.target.value)} />
          <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <textarea
            className={`${inputCls} min-h-[110px] resize-y`}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-border px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button onClick={onClose} className="border border-border px-5 py-2.5 font-display text-xs uppercase tracking-[0.14em] text-muted-foreground hover:border-crimson hover:text-crimson sm:tracking-[0.18em]">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 bg-crimson px-6 py-2.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-foreground hover:bg-blood disabled:opacity-60 sm:tracking-[0.18em]"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {isEditing ? "Update Work" : "Save Work"}
          </button>
        </div>
      </div>
    </div>
  );
}
