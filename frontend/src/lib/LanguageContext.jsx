import { createContext, useContext, useEffect, useState } from "react";
import { mn } from "../i18n/mn";
import { ko } from "../i18n/ko";

const dictionaries = { mn, ko };
const STORAGE_KEY = "msa-lang";
const LanguageContext = createContext(null);

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "ko" ? "ko" : "mn";
  } catch {
    return "mn";
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // private-browsing / storage disabled — language just won't persist
    }
  }, [lang]);

  function t(key, vars) {
    const dict = dictionaries[lang] ?? dictionaries.mn;
    const value = dict[key] ?? dictionaries.mn[key] ?? key;
    if (typeof value !== "string" || !vars) return value;
    return Object.entries(vars).reduce(
      (str, [name, val]) => str.replaceAll(`{${name}}`, val),
      value
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
