"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div aria-label={t("header.language")} className="inline-flex min-h-11 shrink-0 items-center gap-0.5 rounded-xl border border-surface-border bg-surface-bg p-1" role="group">
      {(["id", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-label={t(option === "id" ? "language.indonesian" : "language.english")}
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
          className={`min-h-9 min-w-10 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${language === option ? "bg-brand-primary font-bold text-white" : "px-2 text-body-secondary hover:text-body-primary"}`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
