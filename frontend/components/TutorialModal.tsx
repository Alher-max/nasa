"use client";

import React, { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  HelpCircle, 
  Leaf, 
  Flame, 
  Satellite, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight,
  Calculator,
  Camera
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
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-white overflow-hidden"
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">Panduan & Cara Kerja KarbonTani</h2>
              <p className="text-xs text-slate-400">NASA Space Apps 2026 • Pilot Pleret, Bantul</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            aria-label="Tutup panduan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigasi */}
        <div className="grid grid-cols-4 p-1.5 bg-slate-950/60 border-b border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('purpose')}
            className={`py-2 px-1 text-center rounded-lg transition ${
              activeTab === 'purpose' 
                ? 'bg-orange-500 text-white font-bold shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tujuan
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`py-2 px-1 text-center rounded-lg transition ${
              activeTab === 'steps' 
                ? 'bg-orange-500 text-white font-bold shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4 Langkah
          </button>
          <button
            onClick={() => setActiveTab('nasa')}
            className={`py-2 px-1 text-center rounded-lg transition ${
              activeTab === 'nasa' 
                ? 'bg-orange-500 text-white font-bold shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Data NASA
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-2 px-1 text-center rounded-lg transition ${
              activeTab === 'faq' 
                ? 'bg-orange-500 text-white font-bold shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            FAQ
          </button>
        </div>

        {/* Konten Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-sm leading-relaxed text-slate-300">
          
          {/* TAB 1: TUJUAN & MISI */}
          {activeTab === 'purpose' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-200">
                <h3 className="font-bold text-base text-orange-400 mb-1 flex items-center gap-2">
                  <Leaf className="w-4 h-4" /> Mengapa KarbonTani Hadir?
                </h3>
                <p className="text-xs sm:text-sm">
                  Menjembatani petani sawah kecil di Bantul dengan bursa kredit karbon global, mengubah limbah jerami menjadi pendapatan tunai tanpa biaya audit mahal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40">
                  <span className="text-xs font-bold text-red-400 flex items-center gap-1.5 mb-1.5">
                    <Flame className="w-4 h-4" /> Jika Jerami Dibakar:
                  </span>
                  <ul className="text-xs space-y-1 text-slate-400">
                    <li>• Merusak unsur hara & mikroba tanah.</li>
                    <li>• Melepas emisi beracun CO2 & Metana.</li>
                    <li>• Kehilangan potensi cuan karbon Rp 1 jt/ha.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Jika Tidak Dibakar:
                  </span>
                  <ul className="text-xs space-y-1 text-slate-400">
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
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="font-bold text-white text-sm">Hitung Cuan Jerami (Kalkulator)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Masukkan luas sawah Anda (misal 1 kapling = 1.000 m² atau 0,5 Ha). Sistem otomatis menghitung estimasi uang karbon dan penghematan pupuk.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="font-bold text-white text-sm">Pantau Hamparan Sawah Pleret dari Satelit</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Lihat peta spasial Pleret untuk memastikan poligon sawah desa berstatus hijau (Zero-Burn Verified).
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="font-bold text-white text-sm">Ambil Bukti Foto Lapangan</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Saat jerami dicacah/difermentasi, potret menggunakan tombol "Verify my field" pada jendela waktu lintas satelit NASA.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
                <div>
                  <h4 className="font-bold text-white text-sm">Pencairan Insentif via Gapoktan</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Data agregat desa dilaporkan ke bursa karbon. Hasil penjualan kredit karbon dibagikan 70% ke kas kelompok tani dan petani!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SAINS & DATA NASA */}
          {activeTab === 'nasa' && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                  <Satellite className="w-4 h-4" /> NASA FIRMS (Sensor VIIRS & MODIS)
                </div>
                <p className="text-xs text-slate-300">
                  Mendeteksi anomali suhu panas api secara real-time dengan sensitivitas sub-piksel. Menjamin transparansi bahwa lahan petani bebas dari pembakaran jerami.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4" /> NASA HLS (Harmonized Landsat-Sentinel 30m)
                </div>
                <p className="text-xs text-slate-300">
                  Memantau indeks vegetasi (NDVI) dan perubahan warna tanah setiap 2–3 hari sekali untuk memverifikasi proses pelapukan alami jerami di lahan.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/40 text-slate-400 text-[11px]">
                💡 Semua data NASA bersifat terbuka (*Open Data*), memungkinkan biaya audit verifikasi ditekan hingga mendekati Rp 0.
              </div>
            </div>
          )}

          {/* TAB 4: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="font-bold text-white text-xs sm:text-sm">Apakah petani dipungut biaya pendaftaran?</h4>
                <p className="text-xs text-slate-400 mt-1">
                  100% Gratis. Platform ini dirancang untuk mendemokratisasi akses pasar karbon bagi petani kecil tanpa biaya apa pun.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="font-bold text-white text-xs sm:text-sm">Apakah lahan kecil 1 kapling (1.000 m²) bisa ikut?</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Bisa! Petani gurem digabungkan melalui kelompok tani (Gapoktan Pleret) menjadi satu hamparan desa seluas 20–50 hektar agar memenuhi syarat pasar karbon internasional.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="font-bold text-white text-xs sm:text-sm">Kapan uang insentif karbon bisa diterima?</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Insentif dicairkan per musim tanam setelah siklus panen selesai dan verifikasi satelit NASA mengonfirmasi tidak ada pembakaran di hamparan tersebut.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Modal */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-between items-center text-xs">
          <span className="text-slate-400 hidden sm:inline">Tekan ESC untuk menutup</span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-white transition text-center"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}
