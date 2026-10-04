"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";

const PleretMapCanvas = dynamic(() => import("@/components/PleretMapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] w-full items-center justify-center rounded-2xl bg-surface-bg text-sm text-body-secondary sm:h-[420px] lg:h-[480px]">
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Loading satellite map…
    </div>
  ),
});

export default function PleretMap() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-3xl border border-surface-border bg-surface-card p-3 shadow-sm sm:p-4">
      <div className="overflow-hidden rounded-2xl">
        <PleretMapCanvas />
      </div>
    </div>
  );
}
