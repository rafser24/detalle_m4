"use client";
import { useStore } from "./store";
import type { L } from "./gift.config";
import { ui } from "./gift.config";

export function useT() {
  const lang = useStore((s) => s.lang);
  const t = (v: L) => v[lang];
  const fmtDate = (iso: string, upper = false) => {
    const d = new Date(iso + "T12:00:00");
    const m = ui.months[lang][d.getMonth()];
    const s = lang === "es"
      ? `${d.getDate()} de ${m} de ${d.getFullYear()}`
      : `${m} ${d.getDate()}, ${d.getFullYear()}`;
    return upper ? s.toUpperCase() : s;
  };
  return { t, lang, fmtDate };
}
