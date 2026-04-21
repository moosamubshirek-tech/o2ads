import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";

export type FieldType = "text" | "textarea" | "url" | "number" | "boolean" | "json";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
}

interface Props {
  table: "testimonials" | "team" | "pricing" | "case_studies" | "client_logos" | "portfolio";
  title: string;
  fields: FieldDef[];
  listColumns: { key: string; label: string }[];
  orderBy?: { column: string; ascending?: boolean };
}

type Row = Record<string, any>;

export function CrudManager({ table, title, fields, listColumns, orderBy }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    let q = supabase.from(table).select("*");
    if (orderBy) q = q.order(orderBy.column, { ascending: orderBy.ascending ?? true });
    else q = q.order("created_at", { ascending: false });
    const { data, error } = await q;
    setLoading(false);
    if (error) return toast.error(error.message);
    setRows(data || []);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [table]);

  const openNew = () => {
    const empty: Row = {};
    fields.forEach((f) => {
      empty[f.key] = f.type === "boolean" ? false : f.type === "number" ? 0 : "";
    });
    setEditing(empty);
    setShowForm(true);
  };

  const openEdit = (row: Row) => {
    const copy: Row = { ...row };
    fields.forEach((f) => {
      if (f.type === "json" && copy[f.key] != null && typeof copy[f.key] !== "string") {
        copy[f.key] = JSON.stringify(copy[f.key], null, 2);
      }
    });
    setEditing(copy);
    setShowForm(true);
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const payload: Row = {};
    for (const f of fields) {
      const v = editing[f.key];
      if (f.type === "json") {
        try {
          payload[f.key] = v ? JSON.parse(v) : null;
        } catch {
          setSaving(false);
          return toast.error(`${f.label}: invalid JSON`);
        }
      } else if (f.type === "number") {
        payload[f.key] = v === "" || v == null ? null : Number(v);
      } else if (f.type === "boolean") {
        payload[f.key] = !!v;
      } else {
        payload[f.key] = v === "" ? null : v;
      }
    }

    const client = supabase.from(table) as any;
    const { error } = editing.id
      ? await client.update(payload).eq("id", editing.id)
      : await client.insert(payload);

    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(editing.id ? "Updated" : "Created");
    setShowForm(false);
    setEditing(null);
    load();
  };

  const onDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from(table).delete().eq("id", deleteId);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    setDeleteId(null);
    load();
  };

  const inputCls = "w-full bg-background border border-border px-3 py-2 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-crimson";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-wider text-foreground">{title}</h1>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-crimson px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground hover:bg-blood">
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>

      <div className="mt-6 border border-border bg-surface">
        {loading ? (
          <div className="flex items-center justify-center p-12 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">No records yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {listColumns.map((c) => <th key={c.key} className="px-4 py-3">{c.label}</th>)}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border/50 last:border-0 hover:bg-background/40">
                  {listColumns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-foreground">
                      <div className="line-clamp-2 max-w-xs">{String(r[c.key] ?? "—")}</div>
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button onClick={() => openEdit(r)} className="border border-border p-1.5 text-muted-foreground hover:border-crimson hover:text-crimson"><Pencil className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setDeleteId(r.id)} className="border border-border p-1.5 text-muted-foreground hover:border-crimson hover:text-crimson"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" onClick={() => setShowForm(false)}>
          <form onSubmit={onSave} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl border border-border bg-surface p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider text-foreground">{editing.id ? "Edit" : "Create"} {title}</h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-crimson"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-5 space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="mb-1 block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{f.label}{f.required && " *"}</label>
                  {f.type === "textarea" || f.type === "json" ? (
                    <textarea className={`${inputCls} min-h-[100px] font-mono`} required={f.required} placeholder={f.placeholder} value={editing[f.key] ?? ""} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} />
                  ) : f.type === "boolean" ? (
                    <label className="inline-flex items-center gap-2 text-sm text-foreground">
                      <input type="checkbox" checked={!!editing[f.key]} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })} />
                      Yes
                    </label>
                  ) : (
                    <input className={inputCls} type={f.type === "number" ? "number" : f.type === "url" ? "url" : "text"} required={f.required} placeholder={f.placeholder} value={editing[f.key] ?? ""} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="border border-border px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:border-crimson hover:text-crimson">Cancel</button>
              <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-crimson px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground hover:bg-blood disabled:opacity-60">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" onClick={() => setDeleteId(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm border border-border bg-surface p-6 text-center">
            <h3 className="font-display text-xl font-bold uppercase tracking-wider text-foreground">Delete record?</h3>
            <p className="mt-2 text-sm text-muted-foreground">This action cannot be undone.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={() => setDeleteId(null)} className="border border-border px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:border-crimson hover:text-crimson">Cancel</button>
              <button onClick={onDelete} className="bg-crimson px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground hover:bg-blood">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
