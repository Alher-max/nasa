"use client";

import { useState } from "react";
import { Camera, Check, Clock3, Fingerprint, LoaderCircle, MapPin, X } from "lucide-react";

export default function GroundTruthModal({ onClose }: { onClose: () => void }) {
  const [snapshot, setSnapshot] = useState<{ timestamp: string; hash: string } | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function captureEvidence() {
    setIsCapturing(true);
    setError(null);
    try {
      const timestamp = new Date().toISOString();
      const evidence = `KarbonTani|Pleret|-7.8681,110.4072|${timestamp}|composted-straw`;
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(evidence));
      const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
      setSnapshot({ timestamp, hash });
    } catch (captureError) {
      setError(captureError instanceof Error ? `Could not create verification hash: ${captureError.message}` : "Could not create verification hash.");
    } finally {
      setIsCapturing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="ground-truth-title" className="my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700 bg-[#1E293B] shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between border-b border-slate-700 px-5 py-4">
          <div>
            <div className="flex items-center gap-2 text-[#FF6B00]"><Camera className="h-4 w-4" /><span className="text-[10px] font-bold uppercase tracking-[0.16em]">Ground-truth verification</span></div>
            <h2 id="ground-truth-title" className="mt-1 text-lg font-bold">Document your field</h2>
          </div>
          <button aria-label="Close verification modal" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-white"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"><Clock3 className="h-4 w-4" /></div>
            <div><p className="text-xs font-bold text-emerald-300">Next NASA Terra Overpass: 10:24 WIB</p><p className="mt-0.5 text-[10px] text-emerald-400/70">In Window · Good conditions for field observation</p></div>
            <span className="ml-auto h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
          </div>
          <div className="viewfinder relative mt-4 flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-600 bg-[radial-gradient(ellipse_at_center,#28413a_0%,#15241f_46%,#0c1512_100%)]">
            <div className="absolute inset-5 border border-white/20"><span className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-[#FBBF24]" /><span className="absolute -right-px -top-px h-5 w-5 border-r-2 border-t-2 border-[#FBBF24]" /><span className="absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-[#FBBF24]" /><span className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-[#FBBF24]" /></div>
            <div className="relative z-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#FBBF24]/30 bg-[#FBBF24]/10 text-[#FBBF24]"><Camera className="h-7 w-7" /></div>
              <p className="mt-3 text-sm font-bold">Composted rice straw</p>
              <p className="mt-1 text-[10px] text-slate-400">Align compost pile inside the frame</p>
            </div>
            <div className="absolute inset-x-6 bottom-6 flex items-center justify-between text-[9px] font-medium text-white/80">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-[#FBBF24]" /> -7.8681, 110.4072</span>
              <span>{snapshot ? new Date(snapshot.timestamp).toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB" : "GPS LOCKED"}</span>
            </div>
            <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" /><div className="absolute left-0 top-1/2 h-px w-full bg-white/10" />
          </div>
          {error && <p role="alert" className="mt-3 text-xs text-red-300">{error}</p>}
          {snapshot && (
            <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
              <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-300"><Check className="h-3.5 w-3.5" /> Cryptographic Hash: SHA-256 Verified</p>
              <p className="mt-1 break-all font-mono text-[9px] leading-4 text-emerald-200/60">{snapshot.hash}</p>
              <p className="mt-1 text-[9px] text-slate-500">Demo evidence hash · not uploaded or externally authenticated</p>
            </div>
          )}
          <button disabled={isCapturing} onClick={() => void captureEvidence()} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition hover:bg-orange-500 disabled:cursor-wait disabled:opacity-70">
            {isCapturing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : snapshot ? <Fingerprint className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
            {isCapturing ? "Generating SHA-256…" : snapshot ? "Retake field photo" : "Capture field evidence"}
          </button>
          <p className="mt-3 text-center text-[9px] text-slate-500">NASA GLOBE Observer-inspired demo · camera access not required</p>
        </div>
      </section>
    </div>
  );
}
