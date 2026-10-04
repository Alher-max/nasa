"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-8 rounded-2xl bg-brand-dark px-5 py-6 text-slate-400 sm:px-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="KarbonTani Logo" width={36} height={36} className="h-9 w-9 shrink-0 rounded-xl object-contain" />
          <div className="min-w-0 space-y-1 text-xs">
            <p className="font-semibold text-white">KarbonTani by Thortech Software</p>
            <p>NASA Space Apps Challenge 2026 · Yogyakarta Local Event</p>
          </div>
        </div>
        <nav aria-label="Tautan cepat" className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <Link className="transition hover:text-white" href="/panduan">{t("footer.guide")}</Link>
          <Link className="transition hover:text-white" href="/#verification">{t("footer.methodology")}</Link>
          <a className="transition hover:text-white" href="https://www.thortech.shop/" target="_blank" rel="noreferrer">{t("footer.catalog")}</a>
          <a className="transition hover:text-white" href="/sitemap.xml">{t("footer.sitemap")}</a>
        </nav>
      </div>
    </footer>
  );
}
