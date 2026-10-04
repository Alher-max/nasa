import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const localeCookie = "karbontani-language";

async function requestLanguage(): Promise<"id" | "en"> {
  const value = (await cookies()).get(localeCookie)?.value;
  return value === "en" ? "en" : "id";
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await requestLanguage();
  return language === "en"
    ? { title: "KarbonTani | Climate-smart rice farming", description: "NASA satellite-verified sustainable rice farming and carbon benefits for Pleret, Bantul." }
    : { title: "KarbonTani | Pertanian padi cerdas iklim", description: "Pertanian padi berkelanjutan dan manfaat karbon terverifikasi satelit NASA untuk Pleret, Bantul." };
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
