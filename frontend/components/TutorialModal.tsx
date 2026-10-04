"use client";

import React, { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  Leaf, 
  Flame, 
  Satellite, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const [activeTab, setActiveTab] = useState<'purpose' | 'steps' | 'nasa' | 'faq'>('purpose');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface-card text-body-primary shadow-2xl"
      >
        {/* Header Modal */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-surface-border bg-surface-card/95 p-4 backdrop-blur sm:p-5">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl border border-brand-primary/20 bg-brand-soft p-2 text-brand-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight text-body-primary sm:text-lg">Panduan & Cara Kerja KarbonTani</h2>
              <p className="text-xs text-body-secondary">NASA Space Apps 2026 • Pilot Pleret, Bantul</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl p-2 text-body-secondary transition hover:bg-slate-100 hover:text-body-primary"
            aria-label="Tutup panduan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigasi */}
        <div className="grid grid-cols-4 border-b border-surface-border bg-surface-bg p-1.5 text-xs font-medium">
          <button
            onClick={() => setActiveTab('purpose')}
            className={`min-h-11 px-1 py-2 text-center rounded-lg transition ${
              activeTab === 'purpose' 
                ? 'bg-brand-primary text-white font-bold shadow-sm'
                  : 'text-body-secondary hover:text-body-primary'
            }`}
          >
            Tujuan
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`min-h-11 px-1 py-2 text-center rounded-lg transition ${
              activeTab === 'steps' 
                ? 'bg-brand-primary text-white font-bold shadow-sm'
                  : 'text-body-secondary hover:text-body-primary'
            }`}
          >
            4 Langkah
          </button>
          <button
            onClick={() => setActiveTab('nasa')}
            className={`min-h-11 px-1 py-2 text-center rounded-lg transition ${
              activeTab === 'nasa' 
                ? 'bg-brand-primary text-white font-bold shadow-sm'
                  : 'text-body-secondary hover:text-body-primary'
            }`}
          >
            Data NASA
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`min-h-11 px-1 py-2 text-center rounded-lg transition ${
              activeTab === 'faq' 
                ? 'bg-brand-primary text-white font-bold shadow-sm'
                  : 'text-body-secondary hover:text-body-primary'
            }`}
          >
            FAQ
          </button>
        </div>

        {/* Konten Scrollable */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm leading-relaxed text-body-secondary sm:p-6">
          
          {/* TAB 1: TUJUAN & MISI */}
          {activeTab === 'purpose' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-brand-primary/20 bg-brand-soft p-4 text-body-secondary">
                <h3 className="mb-1 flex items-center gap-2 text-base font-bold text-brand-primary">
                  <Leaf className="w-4 h-4" /> Mengapa KarbonTani Hadir?
                </h3>
                <p className="text-xs sm:text-sm">
                  Menjembatani petani sawah kecil di Bantul dengan bursa kredit karbon global, mengubah limbah jerami menjadi pendapatan tunai tanpa biaya audit mahal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-red-200 bg-red-50 p-3.5">
                  <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-red-700">
                    <Flame className="w-4 h-4" /> Jika Jerami Dibakar:
                  </span>
                  <ul className="space-y-1 text-xs text-body-secondary">
                    <li>• Merusak unsur hara & mikroba tanah.</li>
                    <li>• Melepas emisi beracun CO2 & Metana.</li>
                    <li>• Kehilangan potensi cuan karbon Rp 1 jt/ha.</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5">
                  <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" /> Jika Tidak Dibakar:
                  </span>
                  <ul className="space-y-1 text-xs text-body-secondary">
                    <li>• Tanah gembur, hemat pupuk kimia Rp 1 jt/ha.</li>
                    <li>• Panen gabah naik 5–8% berkat silika jerami.</li>
                    <li>• Petani dapat cuan tunai kredit karbon!</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 4 LANGKAH PENGGUNAAN */}
          {activeTab === 'steps' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-surface-border bg-surface-card p-3.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-primary">1</div>
                <div>
                  <h4 className="text-sm font-bold text-body-primary">Hitung Cuan Jerami (Kalkulator)</h4>
                  <p className="mt-0.5 text-xs text-body-secondary">
                    Masukkan luas sawah Anda (misal 1 kapling = 1.000 m² atau 0,5 Ha). Sistem otomatis menghitung estimasi uang karbon dan penghematan pupuk.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-surface-border bg-surface-card p-3.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-primary">2</div>
                <div>
                  <h4 className="text-sm font-bold text-body-primary">Pantau Hamparan Sawah Pleret dari Satelit</h4>
                  <p className="mt-0.5 text-xs text-body-secondary">
                    Lihat peta spasial Pleret untuk memastikan poligon sawah desa berstatus hijau (Zero-Burn Verified).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-surface-border bg-surface-card p-3.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-primary">3</div>
                <div>
                  <h4 className="text-sm font-bold text-body-primary">Ambil Bukti Foto Lapangan</h4>
                  <p className="mt-0.5 text-xs text-body-secondary">
                    Saat jerami dicacah/difermentasi, potret menggunakan tombol &quot;Verify my field&quot; pada jendela waktu lintas satelit NASA.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-surface-border bg-surface-card p-3.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-semantic-success">4</div>
                <div>
                  <h4 className="text-sm font-bold text-body-primary">Pencairan Insentif via Gapoktan</h4>
                  <p className="mt-0.5 text-xs text-body-secondary">
                    Data agregat desa dilaporkan ke bursa karbon. Hasil penjualan kredit karbon dibagikan 70% ke kas kelompok tani dan petani!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SAINS & DATA NASA */}
          {activeTab === 'nasa' && (
            <div className="space-y-3.5">
              <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                <div className="mb-1 flex items-center gap-2 text-semantic-info text-sm font-bold">
                  <Satellite className="w-4 h-4" /> NASA FIRMS (Sensor VIIRS & MODIS)
                </div>
                <p className="text-xs text-body-secondary">
                  Mendeteksi anomali suhu panas api secara real-time dengan sensitivitas sub-piksel. Menjamin transparansi bahwa lahan petani bebas dari pembakaran jerami.
                </p>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                <div className="mb-1 flex items-center gap-2 text-semantic-success text-sm font-bold">
                  <ShieldCheck className="w-4 h-4" /> NASA HLS (Harmonized Landsat-Sentinel 30m)
                </div>
                <p className="text-xs text-body-secondary">
                  Memantau indeks vegetasi (NDVI) dan perubahan warna tanah setiap 2–3 hari sekali untuk memverifikasi proses pelapukan alami jerami di lahan.
                </p>
              </div>

              <div className="rounded-lg bg-surface-bg p-3 text-[11px] text-body-secondary">
                💡 Semua data NASA bersifat terbuka (*Open Data*), memungkinkan biaya audit verifikasi ditekan hingga mendekati Rp 0.
              </div>
            </div>
          )}

          {/* TAB 4: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-surface-border bg-surface-card p-3.5">
                <h4 className="text-xs font-bold text-body-primary sm:text-sm">Apakah petani dipungut biaya pendaftaran?</h4>
                <p className="mt-1 text-xs text-body-secondary">
                  100% Gratis. Platform ini dirancang untuk mendemokratisasi akses pasar karbon bagi petani kecil tanpa biaya apa pun.
                </p>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-3.5">
                <h4 className="text-xs font-bold text-body-primary sm:text-sm">Apakah lahan kecil 1 kapling (1.000 m²) bisa ikut?</h4>
                <p className="mt-1 text-xs text-body-secondary">
                  Bisa! Petani gurem digabungkan melalui kelompok tani (Gapoktan Pleret) menjadi satu hamparan desa seluas 20–50 hektar agar memenuhi syarat pasar karbon internasional.
                </p>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-3.5">
                <h4 className="text-xs font-bold text-body-primary sm:text-sm">Kapan uang insentif karbon bisa diterima?</h4>
                <p className="mt-1 text-xs text-body-secondary">
                  Insentif dicairkan per musim tanam setelah siklus panen selesai dan verifikasi satelit NASA mengonfirmasi tidak ada pembakaran di hamparan tersebut.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Modal */}
        <div className="flex items-center justify-between border-t border-surface-border bg-surface-card p-4 text-xs">
          <span className="hidden text-body-muted sm:inline">Tekan ESC untuk menutup</span>
          <button
            onClick={onClose}
            className="min-h-11 w-full rounded-full bg-brand-primary px-6 py-3.5 text-center font-bold text-white transition hover:bg-brand-hover sm:w-auto"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}
