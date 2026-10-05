"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  Cloud,
  MapPin,
  Satellite,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Waves,
  ClipboardList,
} from "lucide-react";
import CarbonCalculator from "@/components/CarbonCalculator";
import GroundTruthModal from "@/components/GroundTruthModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";
import TutorialModal from "@/components/TutorialModal";
import Link from "next/link";
import PleretMap from "@/components/PleretMap";
import SatelliteTelemetryModal from "@/components/SatelliteTelemetryModal";
import type { FirmsScanResult } from "@/lib/firms";

export default function Home() {
  const { t } = useLanguage();
  const [isFarmerMode, setIsFarmerMode] = useState(false);
  const [isGroundTruthOpen, setIsGroundTruthOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [firmsResult, setFirmsResult] = useState<FirmsScanResult | null>(null);

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-surface-bg px-3 py-4 text-body-primary sm:px-6 sm:py-6 lg:px-8">
      <div className="relative mx-auto w-full max-w-7xl space-y-6">
        <header className="flex w-full flex-col gap-3 border-b border-surface-border bg-surface-card/90 py-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/logo.png"
              alt="KarbonTani Logo"
              width={48}
              height={48}
              className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-2xl object-contain shadow-xs"
              priority
            />
            <div className="min-w-0">
              <p className="text-lg font-bold tracking-tight text-body-primary sm:text-2xl">Karbon<span className="text-brand-primary">Tani</span></p>
              <p className="break-words text-[10px] font-mono tracking-widest text-slate-500 sm:text-xs">{t("common.tagline")}</p>
            </div>
          </div>
          <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:flex sm:w-auto sm:items-center">
            <div className="hidden items-center gap-2 rounded-full border border-surface-border bg-surface-card px-3 py-2 text-xs font-medium text-body-secondary md:flex">
              <Satellite className="h-3.5 w-3.5 text-semantic-info" />
              {t("common.nasaEvent")} <span className="text-body-muted">/</span> {t("common.pilotLocation")}
            </div>
            <button
              aria-label={t("header.modeAria", { mode: t(isFarmerMode ? "header.farmerMode" : "header.spatialMode") })}
              title={t("header.modeTitle")}
              onClick={() => setIsFarmerMode((current) => !current)}
              className="grid min-h-11 w-full grid-cols-2 gap-1.5 rounded-xl border border-surface-border bg-surface-bg p-1 text-xs sm:w-auto"
            >
              <span className={`min-h-9 min-w-0 rounded-lg px-2 py-2 text-center leading-tight transition ${isFarmerMode ? "bg-brand-primary font-semibold text-white" : "text-body-secondary hover:text-body-primary"}`}>{t("header.farmerMode")}</span>
              <span className={`min-h-9 min-w-0 rounded-lg px-2 py-2 text-center leading-tight transition ${!isFarmerMode ? "bg-brand-primary font-semibold text-white" : "text-body-secondary hover:text-body-primary"}`}>{t("header.spatialMode")}</span>
            </button>
            <LanguageSwitcher />
            <Link href="/panduan" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-primary/20 bg-brand-soft px-4 py-2.5 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white sm:w-auto">
              <BookOpen className="h-4 w-4 shrink-0" />{t("header.guide")}
            </Link>
          </div>
        </header>

        <section className="grid gap-8 pb-7 pt-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-semantic-success" />
              {t("hero.badge")}
            </div>
            <h1 className="max-w-3xl break-words text-3xl font-extrabold tracking-tight text-body-primary sm:text-5xl lg:text-6xl">
              {t("hero.headlineStart")} <span className="text-brand-primary">{t("hero.headlineHighlight")}</span>{" "}
              <br className="hidden sm:block" /> {t("hero.headlineEnd")}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-body-secondary sm:text-lg">
              {t("hero.subtitle")}
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto lg:justify-end">
            <div className="min-w-0 rounded-2xl border border-surface-border bg-surface-card px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-body-muted">{t("hero.pilotArea")}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><MapPin className="h-3.5 w-3.5 shrink-0 text-brand-primary" /> Pleret, Bantul</p>
            </div>
            <div className="min-w-0 rounded-2xl border border-surface-border bg-surface-card px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-body-muted">{t("hero.growingSeason")}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><Sprout className="h-3.5 w-3.5 shrink-0 text-semantic-success" /> {t("hero.seasonValue")}</p>
            </div>
            <button onClick={() => setIsGroundTruthOpen(true)} className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-hover">
              <Camera className="h-4 w-4" /> {t("hero.verify")}
            </button>
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-surface-border bg-surface-card px-6 py-3.5 text-sm font-bold text-body-primary transition hover:bg-slate-50"
            >
              <BookOpen className="w-4 h-4" />
                <span>{t("hero.howItWorks")}</span>
            </button>
          </div>
        </section>

        <section aria-label={t("home.metricsLabel")} className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <MetricCard icon={<Waves />} label={t("home.fieldsEnrolled")} value={t("metric.fieldsValue")} detail={t("home.gapoktan")} trend="↑ 12.8%" tone="orange" />
          <MetricCard icon={<ShieldCheck />} label={t("home.burningIncidents")} value={t("home.burningValue")} detail={t("home.last30Days")} trend={t("home.allClear")} tone="green" clear />
          <MetricCard icon={<Cloud />} label={t("home.carbonAvoided")} value={t("metric.carbonValue")} detail={t("home.projectedPerYear")} trend="↑ 8.4%" tone="gold" />
          <MetricCard icon={<TrendingUp />} label={t("home.farmerBenefit")} value={t("metric.farmerValue")} detail={t("home.estimatedAnnual")} trend="↑ 18.2%" tone="green" />
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
          <div className="min-w-0 overflow-hidden rounded-3xl border border-surface-border bg-surface-card shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border px-5 py-4 sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold tracking-tight text-body-primary">{t("home.spatialTitle")}</h2>
                  <span className="rounded-md border border-semantic-info/20 bg-sky-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sky-700">{t("home.livePilot")}</span>
                </div>
                <p className="mt-1 text-xs text-body-secondary">{t("home.clusterSubtitle")}</p>
              </div>
              <button aria-label={t("map.layerOptions")} className="flex min-h-11 items-center gap-1.5 rounded-xl border border-surface-border px-3 py-2 text-xs font-semibold text-body-primary hover:bg-slate-50">
                {t("home.layers")} <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
            <PleretMap onScanResult={setFirmsResult} />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-surface-border px-5 py-3.5 text-[11px] text-body-secondary sm:px-6">
              <Legend color="#22C55E" label={t("home.legendVerified")} />
              <Legend color="#FF5E00" label={t("home.legendBoundary")} />
              <span className="ml-auto flex items-center gap-1.5"><Satellite className="h-3.5 w-3.5 text-semantic-info" /> {t("home.imagery")}</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <CarbonCalculator />
            <div id="verification" className="rounded-3xl border border-surface-border bg-surface-card p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-semantic-info"><Activity className="h-4 w-4" /></div>
                    <h2 className="text-sm font-bold text-body-primary">{t("home.satelliteTitle")}</h2>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-body-secondary">{t("home.thermalDescription")}</p>
                  <p className="mt-2 inline-flex rounded-lg border border-semantic-info/20 bg-sky-50 px-2 py-1 text-[10px] font-medium text-sky-800">{t("home.liveObservation")}</p>
                </div>
                {firmsResult && <span className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold ${firmsResult.status === "fallback" || firmsResult.hotspotsCount > 0 ? "border-amber-200 bg-amber-50 text-amber-800" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                  {firmsResult.status === "success" && firmsResult.isCompliant ? <Check className="h-3 w-3" /> : <Activity className="h-3 w-3" />}
                  {firmsResult.status === "fallback"
                    ? t("home.fallback")
                    : firmsResult.isCompliant
                      ? t("home.compliant")
                      : t("home.reviewRequired")}
                </span>}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-surface-border bg-surface-bg px-4 py-3">
                <div>
                  <p className="text-xs font-semibold text-body-primary">{t("home.thermalPass")}</p>
                  <p className="mt-1 text-[10px] text-body-muted">{t("home.boundingBox")}</p>
                </div>
                <div className={`flex items-center gap-2 text-xs font-bold ${firmsResult?.status === "fallback" || (firmsResult?.hotspotsCount ?? 0) > 0 ? "text-amber-700" : "text-semantic-success"}`}>
                  <span className={`h-2 w-2 rounded-full ${firmsResult?.status === "fallback" || (firmsResult?.hotspotsCount ?? 0) > 0 ? "bg-amber-500" : "bg-semantic-success"}`} />
                  {firmsResult
                    ? firmsResult.status === "fallback"
                      ? t("home.fallback")
                      : firmsResult.hotspotsCount === 0
                        ? t("home.hotspotCountZero")
                        : t("home.hotspotCount", { count: firmsResult.hotspotsCount })
                    : t("home.awaitingScan")}
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-1 text-[10px] text-body-muted sm:flex-row sm:items-center sm:justify-between">
                {firmsResult
                  ? <time className="break-all sm:text-right" dateTime={firmsResult.scannedAt} title={firmsResult.scannedAt}>{t("home.scanTime")} · {firmsResult.scannedAt}</time>
                  : <span>{t("home.scanToObserve")}</span>}
              </div>
              <button
                type="button"
                onClick={() => setIsTelemetryOpen(true)}
                className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-bg px-4 py-2.5 text-xs font-bold text-body-primary transition hover:border-semantic-info hover:bg-sky-50"
              >
                <ClipboardList className="h-4 w-4 text-semantic-info" />
                {t("telemetry.inspect")}
              </button>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
      {isGroundTruthOpen && <GroundTruthModal onClose={() => setIsGroundTruthOpen(false)} />}
      {isTelemetryOpen && <SatelliteTelemetryModal result={firmsResult} onClose={() => setIsTelemetryOpen(false)} />}
      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
</main>
  );
}

function MetricCard({ icon, label, value, detail, trend, tone, clear = false }: { icon: React.ReactNode; label: string; value: string; detail: string; trend: string; tone: "orange" | "green" | "gold"; clear?: boolean }) {
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
          {clear ? <Check className="h-3 w-3" /> : trend.startsWith("↑") ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{trend}
        </span>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} />{label}</span>;
}
