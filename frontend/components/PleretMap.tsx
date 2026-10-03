"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";

const PleretMapCanvas = dynamic(() => import("@/components/PleretMapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[340px] items-center justify-center bg-slate-900/60 text-sm text-slate-400 sm:h-[420px]">
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Loading satellite map…
    </div>
  ),
});

export default function PleretMap() {
  return <PleretMapCanvas />;
}
