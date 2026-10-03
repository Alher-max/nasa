import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KarbonTani | Climate-smart rice farming",
  description: "Satellite-verified sustainable rice farming and carbon benefits for Pleret, Bantul.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
