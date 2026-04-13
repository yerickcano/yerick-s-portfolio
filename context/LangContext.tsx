"use client";

import { createContext, useContext, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

type LangContextValue = {
  lang: Lang;
  toggle: () => void;
  tr: typeof t.en;
};

const LangContext = createContext<LangContextValue>({
  lang: "es",
  toggle: () => {},
  tr: t.es as typeof t.en,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const toggle = () => setLang((l) => (l === "en" ? "es" : "en"));
  return (
    <LangContext.Provider value={{ lang, toggle, tr: t[lang] as typeof t.en }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
