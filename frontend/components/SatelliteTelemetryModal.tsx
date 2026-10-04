"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { ReactNode } from "react";
import { Activity, Check, Clock3, Flame, MapPin, Satellite, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { FirmsScanResult } from "@/lib/firms";

export default function SatelliteTelemetryModal({
  result,
  onClose,
}: {
  result: FirmsScanResult | null;
  onClose: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const scannedAt = result
    ? new Date(result.scannedAt).toLocaleString(t("calculator.currencyCode"), { timeZone: "Asia/Jakarta" })
    : null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="telemetry-modal-title"
        aria-modal="true"
        className="my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-surface-border bg-surface-card shadow-xl"
        role="dialog"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-surface-border bg-surface-card/95 px-5 py-4 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Image src="/logo.png" alt="KarbonTani Logo" width={36} height={36} className="h-9 w-9 shrink-0 rounded-xl object-contain" />
            <div className="min-w-0">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-semantic-info">
                <Satellite className="h-4 w-4 shrink-0" /> {t("telemetry.eyebrow")}
              </span>
              <h2 id="telemetry-modal-title" className="mt-1 text-lg font-bold text-body-primary sm:text-xl">
                {t("telemetry.title")}
              </h2>
            </div>
          </div>
          <button
            aria-label={t("telemetry.close")}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-surface-border text-body-secondary transition hover:bg-surface-bg hover:text-body-primary"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="space-y-5 p-5 sm:p-6">
          {result ? (
            <>
              <div className={`flex items-start gap-3 rounded-2xl border p-4 ${result.status === "fallback" ? "border-amber-200 bg-amber-50 text-amber-900" : result.isCompliant ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-red-200 bg-red-50 text-red-900"}`}>
                {result.status === "fallback"
                  ? <Activity className="mt-0.5 h-5 w-5 shrink-0" />
                  : result.isCompliant
                    ? <Check className="mt-0.5 h-5 w-5 shrink-0" />
                    : <Flame className="mt-0.5 h-5 w-5 shrink-0" />}
                <div>
                  <p className="text-sm font-bold">
                    {result.status === "fallback"
                      ? t("telemetry.fallback")
                      : result.isCompliant
                        ? t("telemetry.compliant")
                        : t("telemetry.hotspots", { count: result.hotspotsCount })}
                  </p>
                  <p className="mt-1 text-xs opacity-80">{t("telemetry.areaLevelNote")}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <TelemetryValue icon={<Satellite />} label={t("telemetry.satellite")} value={result.satellite} />
                <TelemetryValue
                  icon={<Clock3 />}
                  label={t("telemetry.scanTime")}
                  value={scannedAt ?? result.scannedAt}
                  detail={result.scannedAt}
                />
                <TelemetryValue
                  icon={<Flame />}
                  label={t("telemetry.hotspotCount")}
                  value={String(result.hotspotsCount)}
                />
                <TelemetryValue
                  icon={<MapPin />}
                  label={t("telemetry.boundingBox")}
                  value={`${result.boundingBox.minLon}, ${result.boundingBox.minLat}`}
                  detail={`${result.boundingBox.maxLon}, ${result.boundingBox.maxLat}`}
                />
              </div>

              <section aria-labelledby="telemetry-hotspot-title">
                <div className="flex items-center justify-between gap-3">
                  <h3 id="telemetry-hotspot-title" className="text-sm font-bold text-body-primary">
                    {t("telemetry.detections")}
                  </h3>
                  <span className="text-xs text-body-muted">{t("telemetry.resolution")}</span>
                </div>
                {result.hotspots.length > 0 ? (
                  <ul className="mt-3 space-y-3">
                    {result.hotspots.map((hotspot, index) => (
                      <li key={`${hotspot.latitude}-${hotspot.longitude}-${index}`} className="rounded-2xl border border-red-200 bg-red-50/70 p-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-red-800">
                          <Flame className="h-4 w-4" /> {t("telemetry.hotspotNumber", { number: index + 1 })}
                        </div>
                        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                          <TelemetryDatum label={t("telemetry.coordinates")} value={`${hotspot.latitude}, ${hotspot.longitude}`} />
                          <TelemetryDatum label={t("map.frp")} value={`${hotspot.frp} MW`} />
                          <TelemetryDatum label={t("map.brightness")} value={`${hotspot.brightness} K`} />
                          <TelemetryDatum label={t("map.confidence")} value={hotspot.confidence} />
                          <TelemetryDatum label={t("map.acquired")} value={`${hotspot.acqDate} ${hotspot.acqTime} UTC`} />
                        </dl>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-3 rounded-2xl border border-surface-border bg-surface-bg px-4 py-5 text-center text-sm text-body-secondary">
                    {result.status === "fallback" ? t("telemetry.noLiveData") : t("telemetry.noDetections")}
                  </div>
                )}
              </section>
            </>
          ) : (
            <div className="rounded-2xl border border-surface-border bg-surface-bg px-4 py-6 text-center">
              <Satellite className="mx-auto h-8 w-8 text-body-muted" />
              <p className="mt-3 text-sm font-semibold text-body-primary">{t("telemetry.awaitingScan")}</p>
              <p className="mt-1 text-xs text-body-secondary">{t("telemetry.runScanHint")}</p>
            </div>
          )}

          <p className="text-[11px] leading-5 text-body-muted">{t("telemetry.disclaimer")}</p>
        </div>
      </section>
    </div>
  );
}

function TelemetryValue({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-surface-border bg-surface-bg p-3.5">
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-body-muted">
        <span className="text-semantic-info">{icon}</span>{label}
      </p>
      <p className="mt-2 break-words text-sm font-bold text-body-primary">{value}</p>
      {detail && <p className="mt-1 break-all text-[10px] text-body-muted">{detail}</p>}
    </div>
  );
}

function TelemetryDatum({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[10px] text-body-muted">{label}</dt>
      <dd className="mt-0.5 break-words font-semibold text-body-primary">{value}</dd>
    </div>
  );
}
