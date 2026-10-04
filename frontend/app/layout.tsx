import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const localeCookie = "karbontani-language";

async function requestLanguage(): Promise<"id" | "en"> {
  const value = (await cookies()).get(localeCookie)?.value;
  return value === "en" ? "en" : "id";
}

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const language = await requestLanguage();
  const title = language === "en"
    ? "KarbonTani | Climate-smart rice farming"
    : "KarbonTani | Pertanian padi cerdas iklim";
  const description = language === "en"
    ? "NASA satellite-verified sustainable rice farming and carbon benefits for Pleret, Bantul."
    : "Pertanian padi berkelanjutan dan manfaat karbon terverifikasi satelit NASA untuk Pleret, Bantul.";
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"))
    ?.split(",")[0]
    .trim();
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProtocol === "http" || forwardedProtocol === "https"
    ? forwardedProtocol
    : host?.startsWith("localhost") || host?.startsWith("127.0.0.1") ? "http" : "https";

  return {
    ...(host ? { metadataBase: new URL(`${protocol}://${host}`) } : {}),
    title,
    description,
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      locale: language === "en" ? "en_US" : "id_ID",
      siteName: "KarbonTani",
      title,
      description,
      images: [{ url: "/logo.png", width: 1000, height: 1000, alt: "KarbonTani Logo" }],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const language = await requestLanguage();
  return (
    <html lang={language} className="h-full antialiased">
      <body className="min-h-full bg-surface-bg text-body-primary">
        <LanguageProvider initialLanguage={language}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
