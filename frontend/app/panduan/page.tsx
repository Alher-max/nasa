import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CircleHelp,
  Coins,
  Droplets,
  Leaf,
  Satellite,
  Sprout,
} from "lucide-react";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Panduan Penggunaan KarbonTani",
  description:
    "Panduan menghitung insentif karbon, mengolah jerami tanpa bakar, dan memverifikasi lahan sawah di Pleret.",
};

const guides = [
  {
    number: "01",
    title: "Cara Menghitung Nilai Jerami (Kalkulator Karbon)",
    description: "Lihat estimasi manfaat tahunan berdasarkan luas lahan; angka merupakan model pilot.",
    icon: Coins,
    accent: "text-amber-700 bg-amber-50 border-amber-200",
    steps: [
      "Pilih 1 Kapling (0,1 ha), 0,5 Ha, atau 1 Ha. Geser slider atau masukkan luas sendiri.",
      "Baca estimasi insentif Rupiah, penghematan pupuk kimia, dan peningkatan hasil gabah per tahun.",
      "Total manfaat ekonomi menjumlahkan ketiga komponen; tinjau nilai estimasi bersama kelompok tani.",
    ],
  },
  {
    number: "02",
    title: "Praktik Zero-Burn & Pengomposan Jerami",
    description: "Kembalikan bahan organik ke tanah tanpa membakar sisa panen.",
    icon: Sprout,
    accent: "text-emerald-700 bg-emerald-50 border-emerald-200",
    steps: [
      "Setelah panen, potong atau cacah jerami agar lebih mudah diratakan dan terurai; jangan membakarnya.",
      "Hamparkan jerami dan aplikasikan mikroba pengurai sesuai petunjuk produk serta arahan penyuluh. Jaga kelembapannya.",
      "Terapkan irigasi berselang (AWD) sesuai kondisi tanah dan fase tanaman, dengan arahan penyuluh.",
    ],
  },
  {
    number: "03",
    title: "Validasi Lahan & Sinkronisasi Satelit NASA",
    description: "Cocokkan pengamatan tingkat kawasan dengan batas dan kondisi petak di lapangan.",
    icon: Satellite,
    accent: "text-sky-700 bg-sky-50 border-sky-200",
    steps: [
      "Lintasan Terra dan akuisisi Landsat mengikuti orbit; awan dan pemrosesan dapat mengubah ketersediaan citra.",
      "Pastikan titik koordinat dan poligon sawah Pleret sesuai batas petak yang disepakati kelompok tani.",
      "Cocokkan citra dan catatan lapangan pada periode yang sama. Anomali satelit adalah sinyal pemeriksaan, bukan bukti tunggal pembakaran.",
    ],
  },
  {
    number: "04",
    title: "Penyaluran Insentif Bersama Gapoktan",
    description: "Pencatatan kelompok membantu menelusuri verifikasi dan penyaluran insentif.",
    icon: BadgeCheck,
    accent: "text-brand-primary bg-brand-soft border-brand-primary/20",
    steps: [
      "Petani dan pengurus mencatat petak, praktik zero-burn, dan bukti kegiatan untuk ditinjau bersama.",
      "Setelah kelayakan dan kredit karbon dikonfirmasi, skema pilot mengalokasikan 70% nilai kredit untuk petani. Estimasi bukan konfirmasi pencairan.",
      "Gapoktan merekap hak anggota dan menyalurkan bagian yang disetujui melalui rekening kelompok tani desa dengan catatan yang dapat diperiksa.",
    ],
  },
];

const faqs = [
  {
    question: "Apakah panduan bisa dibuka tanpa internet di ponsel?",
    answer:
      "Saat ini KarbonTani belum menyediakan mode offline. Buka halaman saat tersambung internet; simpan tangkapan layar bagian yang diperlukan.",
  },
  {
    question: "Apa kriteria foto untuk verifikasi lahan?",
    answer:
      "Bukti yang berguna memperlihatkan jerami atau kompos dan konteks petak, dengan waktu serta lokasi yang bisa dicocokkan. Form verifikasi saat ini masih demo: belum mengambil foto sungguhan atau mengunggah bukti.",
  },
  {
    question: "Bagaimana rumus estimasi manfaat dihitung?",
    answer:
      "Untuk A hektare per tahun: karbon Rp1.008.000 × A, hemat pupuk Rp1.000.000 × A, dan kenaikan hasil gabah Rp4.550.000 × A. Total adalah penjumlahan ketiganya; angka ini estimasi model.",
  },
];

export default function PanduanPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-surface-bg px-3 py-4 text-body-primary sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-8 sm:space-y-10">
        <header className="flex flex-col gap-5 border-b border-surface-border bg-surface-card/90 pb-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="KarbonTani Logo"
              width={48}
              height={48}
              className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-2xl object-contain shadow-xs"
              priority
            />
            <div className="min-w-0">
              <Link href="/" className="text-sm font-semibold text-body-primary hover:text-brand-primary">
                Karbon<span className="text-brand-primary">Tani</span>
              </Link>
              <p className="text-[10px] font-mono tracking-widest text-body-muted">PANDUAN PETANI · PLERET</p>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex min-h-11 w-fit max-w-full items-center gap-2 rounded-full border border-surface-border bg-surface-card px-4 py-2.5 text-sm font-semibold text-body-primary transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />Kembali ke beranda
          </Link>
        </header>

        <section className="space-y-4">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-primary">
            <Leaf className="h-3.5 w-3.5" />Dari sawah sehat menuju insentif terukur
          </span>
          <h1 className="max-w-4xl break-words text-3xl font-extrabold tracking-tight text-body-primary sm:text-5xl lg:text-6xl">
            Panduan Penggunaan <span className="text-brand-primary">KarbonTani</span>
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-body-secondary sm:text-lg">
            Cara Menghitung Insentif Karbon, Mengolah Jerami Tanpa Bakar, dan Memverifikasi Lahan via Satelit
          </p>
        </section>

        <section aria-labelledby="guides-title" className="space-y-4">
          <div className="border-b border-surface-border pb-3">
            <p className="text-xs font-bold uppercase tracking-widest text-semantic-success">Empat langkah praktis</p>
            <h2 id="guides-title" className="mt-1 text-xl font-bold text-body-primary sm:text-2xl">
              Dari pengelolaan jerami ke manfaat
            </h2>
          </div>
          <div className="space-y-3">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <details
                  key={guide.number}
                  className="group overflow-hidden rounded-2xl border border-surface-border bg-surface-card shadow-sm transition open:border-brand-primary/40"
                >
                  <summary className="flex min-h-20 cursor-pointer list-none items-center gap-3 p-4 sm:gap-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                    <span className="shrink-0 font-mono text-xs text-body-muted">{guide.number}</span>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${guide.accent}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block break-words text-sm font-bold leading-snug text-body-primary sm:text-base">
                        {guide.title}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-body-secondary">{guide.description}</span>
                    </span>
                    <span className="shrink-0 text-xl text-brand-primary transition group-open:rotate-45">+</span>
                  </summary>
                  <div className="border-t border-surface-border px-4 py-4 sm:px-6">
                    <ol className="space-y-3">
                      {guide.steps.map((step, index) => (
                        <li key={step} className="flex gap-3 text-sm leading-relaxed text-body-secondary">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs text-brand-primary">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="faq-title"
          className="grid gap-6 border-t border-surface-border pt-7 sm:grid-cols-[0.75fr_1.25fr]"
        >
          <div>
            <CircleHelp className="h-8 w-8 text-brand-primary" />
            <h2 id="faq-title" className="mt-3 text-xl font-bold text-body-primary sm:text-2xl">
              Pertanyaan umum
            </h2>
            <p className="mt-2 text-sm text-body-secondary">Akses, bukti lapangan, dan estimasi manfaat.</p>
          </div>
          <div className="divide-y divide-surface-border border-y border-surface-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 text-sm font-semibold text-body-primary">
                  <span className="min-w-0 flex-1">{faq.question}</span>
                  <span className="text-lg text-brand-primary transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-body-secondary">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-semantic-success/20 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Droplets className="mt-0.5 h-5 w-5 shrink-0 text-semantic-success" />
            <p className="text-sm leading-relaxed text-body-secondary">
              Catat praktik di petak, lalu tinjau bersama Gapoktan dan penyuluh.
            </p>
          </div>
          <Link
            href="/#verification"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover"
          >
            Lihat verifikasi <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
