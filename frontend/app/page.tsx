"use client";

import { useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
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
import PleretMap from "@/components/PleretMap";

export default function Home() {
  const [isFarmerMode, setIsFarmerMode] = useState(false);
  const [isGroundTruthOpen, setIsGroundTruthOpen] = useState(false);

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#0F172A] text-white px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_48%_-20%,rgba(255,107,0,0.10),transparent_54%)]" />
      <div className="relative mx-auto w-full max-w-7xl space-y-6">
        <header className="flex w-full flex-col gap-3 border-b border-slate-800 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF6B00]/15 text-[#FF6B00]">
              <Orbit className="absolute h-8 w-8 opacity-80" strokeWidth={1.5} />
              <Leaf className="relative h-5 w-5 fill-[#FF6B00]/20" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight sm:text-2xl">Karbon<span className="text-[#FF6B00]">Tani</span></p>
              <p className="text-[10px] font-mono tracking-widest text-gray-400 sm:text-xs">CULTIVATE A BETTER CLIMATE</p>
            </div>
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 md:flex">
              <Satellite className="h-3.5 w-3.5 text-[#FBBF24]" />
              NASA Space Apps 2026 <span className="text-slate-600">/</span> Pilot: Pleret, Bantul
            </div>
            <button
              aria-label={`Current view: ${isFarmerMode ? "Mode Petani (Mobile)" : "Dashboard Spasial (Investor/NASA)"}`}
              title="Switch between Mode Petani (Mobile) and Dashboard Spasial (Investor/NASA)"
              onClick={() => setIsFarmerMode((current) => !current)}
              className="grid w-full grid-cols-2 gap-1.5 rounded-xl bg-slate-800/90 p-1 text-xs sm:w-auto"
            >
              <span className={`min-w-0 rounded-lg px-2 py-2 text-center leading-tight transition ${isFarmerMode ? "bg-[#FF6B00] font-bold text-white" : "text-slate-400"}`}>Petani · Mobile</span>
              <span className={`min-w-0 rounded-lg px-2 py-2 text-center leading-tight transition ${!isFarmerMode ? "bg-[#FF6B00] font-bold text-white" : "text-slate-400"}`}>Spasial · Investor/NASA</span>
            </button>
          </div>
        </header>

        <section className="grid gap-8 pb-7 pt-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              ZERO-BURN PILOT ACTIVE
            </div>
            <h1 className="max-w-3xl break-words text-2xl font-extrabold leading-snug tracking-[-0.04em] sm:text-4xl sm:leading-tight lg:text-5xl">
              Healthy soil. <span className="text-[#FF6B00]">Verified carbon.</span>
              <br className="hidden sm:block" /> Better returns for Pleret&apos;s farmers.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Satellite-verified rice farming is helping smallholders restore their soil and earn more from every harvest.
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto lg:justify-end">
            <div className="min-w-0 rounded-2xl border border-slate-700/80 bg-slate-800/70 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Pilot area</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><MapPin className="h-3.5 w-3.5 shrink-0 text-[#FF6B00]" /> Pleret, Bantul</p>
            </div>
            <div className="min-w-0 rounded-2xl border border-slate-700/80 bg-slate-800/70 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Growing season</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><Sprout className="h-3.5 w-3.5 shrink-0 text-emerald-400" /> MT 2026 · Wet season</p>
            </div>
            <button onClick={() => setIsGroundTruthOpen(true)} className="flex items-center justify-center gap-2 rounded-2xl bg-[#FF6B00] px-4 py-3 text-sm font-bold shadow-lg shadow-orange-950/30 transition hover:bg-orange-500">
              <Camera className="h-4 w-4" /> Verify my field
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
          <div className="min-w-0 overflow-hidden rounded-3xl border border-slate-700/80 bg-[#1E293B] shadow-2xl shadow-black/10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 px-5 py-4 sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold tracking-tight">Pleret spatial intelligence</h2>
                  <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">Live pilot</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">Agricultural parcels · Bantul, D.I. Yogyakarta</p>
              </div>
              <button className="flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700/50">
                Layers <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
            <PleretMap />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-700/80 px-5 py-3.5 text-[11px] text-slate-400 sm:px-6">
              <Legend color="#22C55E" label="Zero-burn verified" />
              <Legend color="#FF6B00" label="Pilot boundary" />
              <span className="ml-auto flex items-center gap-1.5"><Satellite className="h-3.5 w-3.5 text-[#FBBF24]" /> Imagery · NASA GIBS VIIRS True Color</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <CarbonCalculator />
            <div className="rounded-3xl border border-slate-700/80 bg-[#1E293B] p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FBBF24]/10 text-[#FBBF24]"><Activity className="h-4 w-4" /></div>
                    <h2 className="text-sm font-bold">Satellite verification</h2>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-400">Thermal anomaly scan across the Pleret pilot boundary.</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400"><Check className="h-3 w-3" /> COMPLIANT</span>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-700/70 bg-slate-900/40 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold">NASA FIRMS thermal pass</p>
                  <p className="mt-1 text-[10px] text-slate-500">Pleret · Bounding box scan</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" /> 0 hotspots</div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
                <span className="flex items-center gap-1.5"><CircleHelp className="h-3 w-3" /> Simulated pilot response</span>
                <span>Source: NASA FIRMS</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-5 text-[10px] text-slate-500">
          <span>KarbonTani · Climate-smart rice farming for a thriving future</span>
          <span>NASA Space Apps Challenge 2026 · Yogyakarta Local Event</span>
        </footer>
      </div>
      {isGroundTruthOpen && <GroundTruthModal onClose={() => setIsGroundTruthOpen(false)} />}
    </main>
  );
}

function MetricCard({ icon, label, value, detail, trend, tone }: { icon: React.ReactNode; label: string; value: string; detail: string; trend: string; tone: "orange" | "green" | "gold" }) {
  const colors = { orange: "text-[#FF6B00] bg-[#FF6B00]/10", green: "text-emerald-400 bg-emerald-400/10", gold: "text-[#FBBF24] bg-[#FBBF24]/10" };
  return (
    <div className="min-w-0 rounded-xl border border-slate-700/80 bg-[#1E293B] p-3 sm:rounded-2xl sm:p-4">
      <div className="flex items-center justify-between">
        <p className="min-w-0 truncate text-xs font-medium text-slate-400">{label}</p>
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${colors[tone]}`}>{icon}</div>
      </div>
      <p className="mt-3 break-words text-lg font-extrabold text-white sm:text-2xl">{value}</p>
      <div className="mt-2 flex items-center justify-between gap-1 text-[9px] text-slate-500 sm:text-[10px]">
        <span className="min-w-0 truncate">{detail}</span>
        <span className={`flex shrink-0 items-center gap-0.5 font-semibold ${tone === "green" ? "text-emerald-400" : tone === "gold" ? "text-[#FBBF24]" : "text-[#FF6B00]"}`}>
          {tone === "green" && trend === "All clear" ? <Check className="h-3 w-3" /> : trend.startsWith("↑") ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{trend}
        </span>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} />{label}</span>;
}
