"use client";
import { useStore } from "@/lib/store";
import { gift } from "@/lib/gift.config";
import { motion } from "motion/react";

export default function Topbar() {
  const { lang, setLang } = useStore();
  return (
    <div className="pointer-events-none fixed left-1/2 top-0 z-50 flex w-full max-w-[480px] -translate-x-1/2 items-center justify-center px-4 pt-3">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        className="title-serif rounded-full bg-white/65 px-4 py-0.5 text-[19px] font-semibold tracking-tight text-ink shadow-sm backdrop-blur">
        <span className="text-crimson">{gift.fromShort[0]}</span>{gift.fromShort.slice(1)} &amp; <span className="text-crimson">{gift.toShort[0]}</span>{gift.toShort.slice(1)}
      </motion.div>
      <button onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label="Language"
        className="pointer-events-auto absolute right-4 top-3 flex items-center gap-1 rounded-full bg-black/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-ink/70 backdrop-blur">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>
        {lang}
      </button>
    </div>
  );
}
