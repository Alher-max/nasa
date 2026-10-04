import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-8 rounded-2xl bg-brand-dark px-5 py-6 text-slate-400 sm:px-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1 text-xs">
          <p className="font-semibold text-white">KarbonTani by Thortech Software</p>
          <p>NASA Space Apps Challenge 2026 · Yogyakarta Local Event</p>
        </div>
        <nav aria-label="Tautan cepat" className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <Link className="transition hover:text-white" href="/panduan">Panduan Petani</Link>
          <Link className="transition hover:text-white" href="/#verification">Metodologi NASA MRV</Link>
          <a className="transition hover:text-white" href="https://www.thortech.shop/" target="_blank" rel="noreferrer">Katalog ThortechShop</a>
          <Link className="transition hover:text-white" href="/sitemap.xml">Sitemap</Link>
        </nav>
      </div>
    </footer>
  );
}
