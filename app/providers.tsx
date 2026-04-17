"use client";

import { useEffect } from "react";
import { LangProvider } from "@/context/LangContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return <LangProvider>{children}</LangProvider>;
}
