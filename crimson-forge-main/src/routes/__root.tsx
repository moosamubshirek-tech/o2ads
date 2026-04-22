import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-[10rem] font-extrabold leading-none text-crimson md:text-[14rem]">404</h1>
        <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-foreground">
          Looks like this page went off-brand.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-crimson px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-blood"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "O2 Ads — We Don't Run Ads. We Build Brands." },
      { name: "description", content: "O2 Ads is a results-driven digital marketing agency specializing in organic growth, authority SEO, personal branding, and bespoke content strategies." },
      { name: "author", content: "O2 Ads" },
      { property: "og:title", content: "O2 Ads — We Don't Run Ads. We Build Brands." },
      { property: "og:description", content: "Results-driven digital marketing agency. Organic growth, authority SEO, personal branding, and bespoke content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@o2_ads" },
      { name: "theme-color", content: "#0A0A0A" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&family=Dancing+Script:wght@500;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        {/* TODO: Replace G-XXXXXXXX with real GA4 ID */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              // window.dataLayer = window.dataLayer || [];
              // function gtag(){dataLayer.push(arguments);} gtag('js', new Date());
              // gtag('config', 'G-XXXXXXXX');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster theme="dark" position="top-center" />
    </>
  );
}
