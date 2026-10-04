"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import en from "@/locales/en";
import id from "@/locales/id";

export type Language = "id" | "en";
export type TranslationValues = Record<string, string | number>;

const STORAGE_KEY = "karbontani-language";
const dictionaries: Record<Language, Record<string, string>> = { id, en };

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, values?: TranslationValues) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === "id" || value === "en";
}

export function LanguageProvider({ initialLanguage = "id", children }: { initialLanguage?: Language; children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>(initialLanguage);

  const setLanguage = useCallback((nextLanguage: Language) => {
    updateLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    document.cookie = `${STORAGE_KEY}=${nextLanguage}; Max-Age=31536000; Path=/; SameSite=Lax`;
  }, []);

  const t = useCallback((key: string, values?: TranslationValues) => {
    const template = dictionaries[language][key] ?? dictionaries.id[key] ?? key;
    if (!values) return template;
    return template.replace(/\{(\w+)\}/g, (match, name: string) =>
      Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : match,
    );
  }, [language]);

  useEffect(() => {
    function syncLanguage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY || !isLanguage(event.newValue)) return;
      updateLanguage(event.newValue);
      document.documentElement.lang = event.newValue;
      document.cookie = `${STORAGE_KEY}=${event.newValue}; Max-Age=31536000; Path=/; SameSite=Lax`;
    }
    window.addEventListener("storage", syncLanguage);
    return () => window.removeEventListener("storage", syncLanguage);
  }, []);

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used within LanguageProvider.");
  return value;
}
