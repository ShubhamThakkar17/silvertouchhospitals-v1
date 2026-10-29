import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { EmergencyBar } from "@/components/layout/EmergencyBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Analytics } from "@/components/layout/Analytics";
import { AppointmentProvider } from "@/components/forms/AppointmentProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { img } from "@/lib/media";
import { LOGO, SITE_NAME, SITE_URL } from "@/lib/site";
import { t } from "@/lib/i18n";
import "./globals.css";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Multispeciality Hospitals in Ahmedabad | Silver Touch Hospitals", template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#004EA0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={geist.variable} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide scroll-reveal content only when JS is available. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-white"
        >
          {t.skipToContent}
        </a>
        <JsonLd data={organizationSchema()} />
        <AppointmentProvider>
          <header className="sticky top-0 z-40">
            <EmergencyBar />
            <Header logo={img(LOGO)} />
          </header>
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
        </AppointmentProvider>
        <Analytics />
      </body>
    </html>
  );
}
