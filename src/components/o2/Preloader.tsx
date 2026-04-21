import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("o2-preloaded")) return;
    setDone(false);
    sessionStorage.setItem("o2-preloaded", "1");
    const t = setTimeout(() => setDone(true), 1900);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="font-display text-7xl font-extrabold tracking-tight text-crimson md:text-9xl animate-[scale-in_1.4s_ease-out]">
          C2<span className="text-foreground">.</span>
        </div>
        <div className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground animate-[fade-in_1.4s_ease-out]">
          We Build Brands
        </div>
      </div>
    </div>
  );
}
