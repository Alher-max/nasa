"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, LoaderCircle, Sprout, TriangleAlert } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type CalculatorResponse = {
  area: { hectares: number };
  annual_benefits_idr: {
    carbon_payout: number;
    fertilizer_savings: number;
    grain_yield_increase: number;
    total_economic_benefit: number;
  };
};

const currency = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });

function useCountUp(target: number, duration = 450) {
  const [value, setValue] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    const start = current.current;
    const startedAt = performance.now();
    let frame = 0;

    function animate(now: number) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const next = start + (target - start) * eased;
      setValue(next);
      if (progress < 1) frame = requestAnimationFrame(animate);
      else current.current = target;
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration, target]);

  return Math.round(value);
}

function AnimatedRupiah({ amount, prominent = false }: { amount: number; prominent?: boolean }) {
  const value = useCountUp(amount);
  return <span className={prominent ? "tabular-nums text-[#FBBF24]" : "tabular-nums"}>Rp {currency.format(value)}</span>;
}

export default function CarbonCalculator() {
  const [hectares, setHectares] = useState(1);
  const [result, setResult] = useState<CalculatorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function calculate() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/api/v1/calculator`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ area_value: hectares, unit: "hektar" }),
          signal: controller.signal,
        });
        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.detail ?? `Calculator request failed (${response.status}).`);
        }
        setResult((await response.json()) as CalculatorResponse);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(requestError instanceof Error ? requestError.message : "Could not calculate benefits.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void calculate();
    return () => controller.abort();
  }, [hectares]);

  function selectPreset(value: number) {
    setHectares(value);
  }

  const benefits = result?.annual_benefits_idr;

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-[#1E293B] p-5 shadow-xl shadow-black/10 sm:p-6">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FF6B00]/10 text-[#FF6B00]"><Sprout className="h-4 w-4" /></div>
            <h2 className="text-sm font-bold">Your carbon potential</h2>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Estimate your annual farm benefits</p>
        </div>
        <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">Verified model</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <SizeButton selected={Math.abs(hectares - 0.1) < 0.0001} onClick={() => selectPreset(0.1)}>1 Kapling</SizeButton>
        <SizeButton selected={Math.abs(hectares - 0.5) < 0.0001} onClick={() => selectPreset(0.5)}>0.5 Ha</SizeButton>
        <SizeButton selected={Math.abs(hectares - 1) < 0.0001} onClick={() => selectPreset(1)}>1 Ha</SizeButton>
        <span className="ml-auto self-center text-[10px] text-slate-500">or custom</span>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <input
          aria-label="Farm size in hectares"
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={hectares}
          onChange={(event) => setHectares(Number(event.target.value))}
          className="h-1.5 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-slate-700 accent-[#FF6B00]"
        />
        <label className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/50 px-2.5 py-2">
          <input
            aria-label="Custom farm size in hectares"
            type="number"
            min="0.1"
            max="10000"
            step="0.1"
            value={hectares}
            onChange={(event) => {
              const value = Number(event.target.value);
              if (Number.isFinite(value) && value > 0) setHectares(value);
            }}
            className="w-12 bg-transparent text-right text-xs font-bold outline-none"
          />
          <span className="text-[10px] text-slate-500">Ha</span>
        </label>
      </div>
      <div className="mt-2 flex justify-between text-[9px] text-slate-600"><span>0.1 ha</span><span>10 ha</span></div>
      {error && (
        <div role="alert" className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-[11px] text-red-300">
          <TriangleAlert className="h-4 w-4 shrink-0" /> {error}. Make sure the backend is running at {apiUrl}.
        </div>
      )}
      <div className="mt-4 space-y-2.5">
        <BenefitRow label="Uang Tunai Karbon" value={benefits?.carbon_payout ?? 0} />
        <BenefitRow label="Hemat Pupuk Kimia" value={benefits?.fertilizer_savings ?? 0} />
        <BenefitRow label="Peningkatan Gabah" value={benefits?.grain_yield_increase ?? 0} />
      </div>
      <div className="mt-4 rounded-2xl border border-[#FBBF24]/20 bg-gradient-to-r from-[#FF6B00]/10 to-[#FBBF24]/10 p-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">Total cuan ekonomi</p>
            <p className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl"><AnimatedRupiah amount={benefits?.total_economic_benefit ?? 0} prominent /><span className="ml-1 text-[10px] font-medium text-slate-500">/ tahun</span></p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FBBF24]/10 text-[#FBBF24]"><ArrowUpRight className="h-5 w-5" /></div>
        </div>
      </div>
      <p aria-live="polite" className="mt-3 flex items-center justify-between text-[9px] text-slate-500">
        <span>Based on zero-burn farming · 2 seasons/year</span>
        {isLoading && <span className="flex items-center gap-1 text-[#FBBF24]"><LoaderCircle className="h-3 w-3 animate-spin" /> Updating</span>}
      </p>
    </div>
  );
}

function SizeButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className={`rounded-lg border px-2.5 py-2 text-[10px] font-semibold transition ${selected ? "border-[#FF6B00]/50 bg-[#FF6B00]/10 text-[#FF6B00]" : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"}`}>{children}</button>;
}

function BenefitRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[11px]">
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-slate-200"><AnimatedRupiah amount={value} /> <span className="text-[9px] font-medium text-slate-500">/ yr</span></span>
    </div>
  );
}
