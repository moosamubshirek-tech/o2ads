import { createFileRoute, Link, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, MessageSquare, Users, Tag, Briefcase, Image, Folder, LogOut, Loader2, Mail, Menu, Settings, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — O2 Ads" }] }),
  component: AdminGate,
});

function AdminGate() {
  const location = useLocation();
  // Login route is public — render it without the auth-protected layout
  if (location.pathname === "/admin/login") {
    return <Outlet />;
  }
  return <AdminLayout />;
}

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare, exact: false },
  { to: "/admin/team", label: "Team", icon: Users, exact: false },
  { to: "/admin/pricing", label: "Pricing", icon: Tag, exact: false },
  { to: "/admin/case-studies", label: "Case Studies", icon: Briefcase, exact: false },
  { to: "/admin/client-logos", label: "Client Logos", icon: Image, exact: false },
  { to: "/admin/portfolio", label: "Portfolio", icon: Folder, exact: false },
  { to: "/admin/submissions", label: "Submissions", icon: Mail, exact: false },
  { to: "/admin/settings", label: "Settings", icon: Settings, exact: false },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate({ to: "/admin/login" });
      else setEmail(session.user.email ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate({ to: "/admin/login" });
      else setEmail(data.session.user.email ?? null);
      setChecking(false);
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/admin/login" });
  };

  if (checking) {
    return <div className="grid min-h-screen place-items-center bg-background"><Loader2 className="h-6 w-6 animate-spin text-crimson" /></div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 md:hidden">
        <Link to="/" className="font-sans text-2xl font-extrabold tracking-tight"><span className="text-crimson">O</span><span className="text-foreground">2.</span></Link>
        <button onClick={() => setMobileNavOpen(true)} aria-label="Open admin menu" className="grid h-10 w-10 place-items-center border border-border text-foreground">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button className="absolute inset-0 bg-background/80" onClick={() => setMobileNavOpen(false)} aria-label="Close admin menu overlay" />
          <div className="animate-fade-in absolute left-0 top-0 h-full w-72 border-r border-border bg-surface p-4">
            <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
              <Link to="/" className="font-sans text-xl font-extrabold tracking-tight" onClick={() => setMobileNavOpen(false)}><span className="text-crimson">O</span><span className="text-foreground">2.</span> <span className="text-sm text-muted-foreground">Admin</span></Link>
              <button onClick={() => setMobileNavOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center border border-border text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav>
              {NAV.map((item) => {
                const Icon = item.icon;
                const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
                return (
                  <Link key={item.to} to={item.to} onClick={() => setMobileNavOpen(false)} className={`mb-1 flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${active ? "bg-crimson text-foreground" : "text-muted-foreground hover:bg-background hover:text-foreground"}`}>
                    <Icon className="h-4 w-4" />
                    <span className="font-display uppercase tracking-wider">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface md:flex md:flex-col">
        <div className="border-b border-border p-6">
          <Link to="/" className="font-sans text-2xl font-extrabold tracking-tight"><span className="text-crimson">O</span><span className="text-foreground">2.</span></Link>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`mb-1 flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${active ? "bg-crimson text-foreground" : "text-muted-foreground hover:bg-background hover:text-foreground"}`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-display uppercase tracking-wider">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-4">
          <p className="mb-3 truncate text-xs text-muted-foreground">{email}</p>
          <button onClick={signOut} className="inline-flex w-full items-center justify-center gap-2 border border-border px-3 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:border-crimson hover:text-crimson">
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
