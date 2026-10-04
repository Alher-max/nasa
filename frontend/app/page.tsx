"use client";

import { useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  CircleHelp,
  Cloud,
  Leaf,
  MapPin,
  Orbit,
  Satellite,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Waves,
} from "lucide-react";
import CarbonCalculator from "@/components/CarbonCalculator";
import GroundTruthModal from "@/components/GroundTruthModal";
import SiteFooter from "@/components/SiteFooter";
import TutorialModal from "@/components/TutorialModal";
import Link from "next/link";
import PleretMap from "@/components/PleretMap";

export default function Home() {
  const [isFarmerMode, setIsFarmerMode] = useState(false);
  const [isGroundTruthOpen, setIsGroundTruthOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-surface-bg px-3 py-4 text-body-primary sm:px-6 sm:py-6 lg:px-8">
      <div className="relative mx-auto w-full max-w-7xl space-y-6">
        <header className="flex w-full flex-col gap-3 border-b border-surface-border bg-surface-card/90 py-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand-primary">
              <Orbit className="absolute h-8 w-8 opacity-80" strokeWidth={1.5} />
              <Leaf className="relative h-5 w-5 fill-brand-primary/20" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-body-primary sm:text-2xl">Karbon<span className="text-brand-primary">Tani</span></p>
              <p className="text-[10px] font-mono tracking-widest text-body-muted sm:text-xs">CULTIVATE A BETTER CLIMATE</p>
            </div>
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="hidden items-center gap-2 rounded-full border border-surface-border bg-surface-card px-3 py-2 text-xs font-medium text-body-secondary md:flex">
              <Satellite className="h-3.5 w-3.5 text-semantic-info" />
              NASA Space Apps 2026 <span className="text-body-muted">/</span> Pilot: Pleret, Bantul
            </div>
            <button
              aria-label={`Current view: ${isFarmerMode ? "Mode Petani (Mobile)" : "Dashboard Spasial (Investor/NASA)"}`}
              title="Switch between Mode Petani (Mobile) and Dashboard Spasial (Investor/NASA)"
              onClick={() => setIsFarmerMode((current) => !current)}
              className="grid min-h-11 w-full grid-cols-2 gap-1.5 rounded-xl border border-surface-border bg-surface-bg p-1 text-xs sm:w-auto"
            >
              <span className={`min-h-9 min-w-0 rounded-lg px-2 py-2 text-center leading-tight transition ${isFarmerMode ? "bg-brand-primary font-semibold text-white" : "text-body-secondary hover:text-body-primary"}`}>Petani · Mobile</span>
              <span className={`min-h-9 min-w-0 rounded-lg px-2 py-2 text-center leading-tight transition ${!isFarmerMode ? "bg-brand-primary font-semibold text-white" : "text-body-secondary hover:text-body-primary"}`}>Spasial · Investor/NASA</span>
            </button>
            <Link href="/panduan" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-primary/20 bg-brand-soft px-4 py-2.5 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white sm:w-auto">
              <BookOpen className="h-4 w-4 shrink-0" />Panduan Petani
            </Link>
          </div>
        </header>

        <section className="grid gap-8 pb-7 pt-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-semantic-success" />
              ZERO-BURN PILOT ACTIVE
            </div>
            <h1 className="max-w-3xl break-words text-3xl font-extrabold tracking-tight text-body-primary sm:text-5xl lg:text-6xl">
              Healthy soil. <span className="text-brand-primary">Verified carbon.</span>
              <br className="hidden sm:block" /> Better returns for Pleret&apos;s farmers.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-body-secondary sm:text-lg">
              Satellite-verified rice farming is helping smallholders restore their soil and earn more from every harvest.
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto lg:justify-end">
            <div className="min-w-0 rounded-2xl border border-surface-border bg-surface-card px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-body-muted">Pilot area</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><MapPin className="h-3.5 w-3.5 shrink-0 text-brand-primary" /> Pleret, Bantul</p>
            </div>
            <div className="min-w-0 rounded-2xl border border-surface-border bg-surface-card px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-body-muted">Growing season</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><Sprout className="h-3.5 w-3.5 shrink-0 text-semantic-success" /> MT 2026 · Wet season</p>
            </div>
            <button onClick={() => setIsGroundTruthOpen(true)} className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-hover">
              <Camera className="h-4 w-4" /> Verify my field
            </button>
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-surface-border bg-surface-card px-6 py-3.5 text-sm font-bold text-body-primary transition hover:bg-slate-50"
            >
              <BookOpen className="w-4 h-4" />
              <span>Panduan & Cara Kerja</span>
            </button>
          </div>
        </section>

        <section aria-label="Pilot overview" className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <MetricCard icon={<Waves />} label="Fields enrolled" value="42.5 ha" detail="Gapoktan Pleret Makmur" trend="↑ 12.8%" tone="orange" />
          <MetricCard icon={<ShieldCheck />} label="Burning incidents" value="0 detected" detail="NASA FIRMS · last 30 days" trend="All clear" tone="green" />
          <MetricCard icon={<Cloud />} label="Carbon avoided" value="212.5 t" detail="Projected per year" trend="↑ 8.4%" tone="gold" />
          <MetricCard icon={<TrendingUp />} label="Farmer benefit" value="Rp 279 jt" detail="Estimated annual value" trend="↑ 18.2%" tone="green" />
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
          <div className="min-w-0 overflow-hidden rounded-3xl border border-surface-border bg-surface-card shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border px-5 py-4 sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold tracking-tight text-body-primary">Pleret spatial intelligence</h2>
                  <span className="rounded-md border border-semantic-info/20 bg-sky-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sky-700">Live pilot</span>
                </div>
                <p className="mt-1 text-xs text-body-secondary">Agricultural parcels · Bantul, D.I. Yogyakarta</p>
              </div>
              <button className="flex min-h-11 items-center gap-1.5 rounded-xl border border-surface-border px-3 py-2 text-xs font-semibold text-body-primary hover:bg-slate-50">
                Layers <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
            <PleretMap />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-surface-border px-5 py-3.5 text-[11px] text-body-secondary sm:px-6">
              <Legend color="#22C55E" label="Zero-burn verified" />
              <Legend color="#FF5E00" label="Pilot boundary" />
              <span className="ml-auto flex items-center gap-1.5"><Satellite className="h-3.5 w-3.5 text-semantic-info" /> Imagery · NASA GIBS VIIRS True Color</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <CarbonCalculator />
            <div id="verification" className="rounded-3xl border border-surface-border bg-surface-card p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-semantic-info"><Activity className="h-4 w-4" /></div>
                    <h2 className="text-sm font-bold text-body-primary">Satellite verification</h2>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-body-secondary">Thermal anomaly scan across the Pleret pilot boundary.</p>
                </div>
                <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700"><Check className="h-3 w-3" /> COMPLIANT</span>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-surface-border bg-surface-bg px-4 py-3">
                <div>
                  <p className="text-xs font-semibold text-body-primary">NASA FIRMS thermal pass</p>
                  <p className="mt-1 text-[10px] text-body-muted">Pleret · Bounding box scan</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-semantic-success"><span className="h-2 w-2 rounded-full bg-semantic-success" /> 0 hotspots</div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-body-muted">
                <span className="flex items-center gap-1.5"><CircleHelp className="h-3 w-3" /> Simulated pilot response</span>
                <span>Source: NASA FIRMS</span>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
      {isGroundTruthOpen && <GroundTruthModal onClose={() => setIsGroundTruthOpen(false)} />}
      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
</main>
  );
}

function MetricCard({ icon, label, value, detail, trend, tone }: { icon: React.ReactNode; label: string; value: string; detail: string; trend: string; tone: "orange" | "green" | "gold" }) {
  const colors = { orange: "text-brand-primary bg-brand-soft", green: "text-semantic-success bg-emerald-50", gold: "text-amber-600 bg-amber-50" };
  return (
    <div className="min-w-0 rounded-2xl border border-surface-border bg-surface-card p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between">
        <p className="min-w-0 truncate text-xs font-medium text-body-secondary">{label}</p>
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${colors[tone]}`}>{icon}</div>
      </div>
      <p className="mt-3 break-words text-2xl font-extrabold text-body-primary sm:text-3xl">{value}</p>
      <div className="mt-2 flex items-center justify-between gap-1 text-[9px] text-body-muted sm:text-[10px]">
        <span className="min-w-0 truncate">{detail}</span>
        <span className={`flex shrink-0 items-center gap-0.5 font-semibold ${tone === "green" ? "text-semantic-success" : tone === "gold" ? "text-amber-600" : "text-brand-primary"}`}>
          {tone === "green" && trend === "All clear" ? <Check className="h-3 w-3" /> : trend.startsWith("↑") ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{trend}
        </span>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} />{label}</span>;
}
