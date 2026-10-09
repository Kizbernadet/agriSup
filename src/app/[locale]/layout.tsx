import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { BackToTop } from "@/components/layout/back_to_top";
import { FloatingActions } from "@/components/layout/floating_actions";
import { PageTransition } from "@/components/layout/page_transition";
import { SiteFooter } from "@/components/layout/site_footer";
import { SiteHeader } from "@/components/layout/site_header";
import { RevealScript } from "@/components/layout/reveal_script";
import { MAIN_CONTENT_ID, SkipLink } from "@/components/layout/skip_link";
import { ThemeScript } from "@/components/layout/theme_script";
import { routing } from "@/i18n/routing";
import { isIndexingEnabled } from "@/lib/indexing";
import { pickClientMessages } from "@/i18n/client_messages";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/typography.css";

// Seules polices autorisées par la charte (Fraunces n'est jamais chargée).
// next/font les auto-héberge : aucune requête vers Google au chargement de la page.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: { default: t("title"), template: `%s | ${t("site_name")}` },
    description: t("description"),
    robots: isIndexingEnabled() ? undefined : { index: false, follow: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = pickClientMessages(await getMessages());

  return (
    // data-theme est posé par ThemeScript avant l'hydratation : l'écart avec le HTML
    // serveur est attendu sur cet élément uniquement.
    <html
      lang={locale}
      className={`${montserrat.variable} ${inter.variable}`}
      // Défilement doux pour les ancres, neutralisé par Next.js lors des changements de page.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <RevealScript />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SkipLink />
          <SiteHeader />
          {/* tabIndex -1 : le lien d'évitement peut y déplacer le focus. */}
          <main id={MAIN_CONTENT_ID} tabIndex={-1}>
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
          <BackToTop />
          <FloatingActions />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
