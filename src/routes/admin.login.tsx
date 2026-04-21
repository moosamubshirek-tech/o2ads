import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — O2 Ads" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Signed in");
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. Check your email to confirm.");
    }
  };

  const inputCls = "w-full bg-surface border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-crimson transition-colors";

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 block text-center font-sans text-3xl font-extrabold tracking-tight"><span className="text-crimson">O</span><span className="text-foreground">2.</span></Link>
        <div className="border border-border bg-surface p-8">
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-wider text-foreground">
            {mode === "signin" ? "Admin Sign In" : "Create Admin"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">O2 Ads Content Manager</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <input className={inputCls} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className={inputCls} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 bg-crimson px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-foreground hover:bg-blood disabled:opacity-60">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </form>
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-4 w-full text-center text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-crimson">
            {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
