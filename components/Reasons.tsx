"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gift, ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";
import Heart from "./Heart";

// Un degradado distinto por tarjeta, todos dentro de la paleta carmesí/rosa.
const FRONTS = [
  "linear-gradient(150deg,#e0476b 0%,#b3122f 58%,#7d0c22 100%)",
  "linear-gradient(150deg,#f08aa1 0%,#d6355b 55%,#a31c3f 100%)",
  "linear-gradient(150deg,#c9304f 0%,#8f1233 55%,#5c0a22 100%)",
  "linear-gradient(150deg,#f4a3b3 0%,#e0526f 55%,#b3122f 100%)",
];
const hide = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as const;

export default function Reasons() {
  const { t } = useT();
  const items = gift.reasons;
  const [open, setOpen] = useState<number[]>([]);
  const [seen, setSeen] = useState<number[]>([]);

  const flip = (i: number) => {
    setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
    setSeen((s) => (s.includes(i) ? s : [...s, i]));
    navigator.vibrate?.(8);
  };
  const all = seen.length === items.length;

  return (
    <section className="px-6 py-12">
      <div className="text-center">
        <p className="eyebrow">{t(ui.reasonsEyebrow)}</p>
        <h2 className="title-serif mt-2 text-[24px] leading-snug">{t(ui.reasonsTitle)}</h2>
        <p className="mx-auto mt-2 max-w-[280px] text-[11.5px] text-ink/70">{t(ui.reasonsSub)}</p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3.5">
        {items.map((r, i) => {
          const flipped = open.includes(i);
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 + Math.floor(i / 2) * 0.08 }}>
              <button onClick={() => flip(i)} aria-pressed={flipped} aria-label={`${t(ui.reasonLabel)} ${i + 1}`}
                className="relative block aspect-[3/4] w-full touch-manipulation select-none" style={{ perspective: 900 }}>
                <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}
                  initial={false} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ type: "spring", stiffness: 80, damping: 15 }}>
                  {/* frente */}
                  <div className="absolute inset-0 flex flex-col items-center justify-between overflow-hidden rounded-[26px] p-4 text-white shadow-lg ring-1 ring-white/30"
                    style={{ ...hide, background: FRONTS[i % FRONTS.length] }}>
                    <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
                    <span className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-black/10" />
                    <p className="relative text-[9px] uppercase tracking-[.25em] text-white/80">{t(ui.reasonLabel)}</p>
                    <div className="relative flex flex-col items-center">
                      <Heart className="h-14 w-14 text-white/90 drop-shadow-md" stroke={1.2} />
                      <p className="title-serif -mt-9 text-[22px] leading-none">{i + 1}</p>
                    </div>
                    <p className="relative text-[9.5px] tracking-wide text-white/85">{t(ui.tapReveal)}</p>
                  </div>
                  {/* reverso: foto + texto en blanco sobre degradado oscuro (legible con cualquier foto) */}
                  <div className="absolute inset-0 overflow-hidden rounded-[26px] shadow-lg ring-1 ring-white/50"
                    style={{ ...hide, transform: "rotateY(180deg)" }}>
                    <img src={r.img} alt={t(r.title)} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 8%" }} draggable={false} />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" style={{ backgroundPosition: "bottom", backgroundSize: "100% 62%", backgroundRepeat: "no-repeat" }} />
                    <div className="relative flex h-full flex-col items-center justify-end px-3.5 pb-4 text-center text-white [text-shadow:0_1px_6px_rgba(0,0,0,.65)]">
                      <h3 className="title-serif text-[14px] leading-snug text-white">{t(r.title)}</h3>
                      <div className="mx-auto my-1.5 h-px w-8 bg-white/50" />
                      <p className="text-[11px] leading-[1.45] text-white/95">{t(r.text)}</p>
                    </div>
                  </div>
                </motion.div>
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-[10px] uppercase tracking-[.2em] text-muted">{seen.length} / {items.length} {t(ui.discovered)}</p>
        <AnimatePresence>
          {all && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="title-serif mt-3 text-[15px] italic text-crimson">{t(ui.reasonsEnd)}</motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
