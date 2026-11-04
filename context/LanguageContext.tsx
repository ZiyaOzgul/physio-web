"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import type { Language, TranslationDictionary } from "@/lib/i18n";
import { dictionaries } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "physio_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("tr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved === "tr" || saved === "en") {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      } else {
        const browserLang = navigator.language?.toLowerCase() || "";
        const initial = browserLang.startsWith("tr") ? "tr" : "en";
        // Default to tr as per primary requirement, unless explicitly en browser
        setLanguageState(saved || "tr");
        document.documentElement.lang = saved || "tr";
      }
    } catch {
      // localStorage may fail in private mode
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "tr" ? "en" : "tr";
    setLanguage(nextLang);
  };

  const t = useMemo(() => {
    return dictionaries[language] || dictionaries.tr;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
