"use client";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gift, ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";
import { play, useStore } from "@/lib/store";
import Heart, { HEART } from "./Heart";

const TAPS = 10;
const TOP = 2.2;     // altura del líquido cuando está lleno
const BOTTOM = 21.8; // altura del líquido cuando está vacío
const WAVE = "M-8 0 q2 -0.75 4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 V32 H-8 Z";

export default function HeartTap() {
  const { t } = useT();
  const uid = useId().replace(/:/g, "");
  const setStage = useStore((s) => s.setStage);
  const [n, setN] = useState(0);
  const [floaters, setFloaters] = useState<{ id: number; x: number; s: number }[]>([]);
  const [pop, setPop] = useState(false);

  const tap = () => {
    if (pop) return;
    if (n === 0) play("song", gift.song.audio); // el audio arranca con el primer gesto
    const next = n + 1;
    setN(next);
    navigator.vibrate?.(10);
    const id = Date.now() + Math.random();
    setFloaters((f) => [...f, { id, x: (Math.random() - 0.5) * 110, s: 0.7 + Math.random() * 0.7 }]);
    setTimeout(() => setFloaters((f) => f.filter((q) => q.id !== id)), 1500);
    if (next >= TAPS) { setPop(true); setTimeout(() => setStage("story"), 1300); }
  };

  const p = n / TAPS;
  const level = BOTTOM - p * (BOTTOM - TOP);

  return (
    <motion.section initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 0.6 }}
      className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="relative">
        {/* halo suave detrás */}
        <motion.div className="absolute -inset-10 rounded-full bg-crimson/20 blur-3xl" initial={false}
          animate={{ opacity: 0.25 + p * 0.55, scale: 0.9 + p * 0.25 }} transition={{ duration: 0.6 }} />
        {/* onda que sale con cada toque */}
        {n > 0 && (
          <motion.span key={n} className="pointer-events-none absolute inset-4 rounded-full border-2 border-crimson/40"
            initial={{ scale: 0.8, opacity: 0.7 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} />
        )}

        <motion.button onClick={tap} aria-label="Tap heart" whileTap={{ scale: 0.92 }}
          animate={pop ? { scale: [1, 1.22, 1.05] } : { scale: [1, 1.035, 1, 1.02, 1] }}
          transition={pop ? { duration: 0.7 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative block h-60 w-60 touch-manipulation select-none drop-shadow-[0_18px_28px_rgba(179,18,47,.30)]">
          <svg viewBox="1.5 2 21 20.5" className="h-full w-full" style={{ overflow: "visible" }}>
            <defs>
              <clipPath id={`${uid}c`}><path d={HEART} /></clipPath>
              <linearGradient id={`${uid}f`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ff6b88" /><stop offset=".45" stopColor="#e11d48" /><stop offset="1" stopColor="#8f0f2b" />
              </linearGradient>
              <linearGradient id={`${uid}g`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity=".95" /><stop offset="1" stopColor="#ffe3ea" stopOpacity=".55" />
              </linearGradient>
              <linearGradient id={`${uid}s`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity=".75" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* corazón vacío, tipo cristal */}
            <path d={HEART} fill={`url(#${uid}g)`} />

            {/* líquido que sube con cada toque */}
            <g clipPath={`url(#${uid}c)`}>
              <motion.g initial={{ y: BOTTOM + 0.5 }} animate={{ y: pop ? TOP - 1 : level }} transition={{ type: "spring", stiffness: 60, damping: 13 }}>
                <motion.g animate={{ x: [-8, 0] }} transition={{ duration: 3.1, repeat: Infinity, ease: "linear" }} opacity={0.45}>
                  <path d={WAVE} fill="#ff8aa1" transform="translate(0,-.5)" />
                </motion.g>
                <motion.g animate={{ x: [0, -8] }} transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}>
                  <path d={WAVE} fill={`url(#${uid}f)`} />
                </motion.g>
              </motion.g>
            </g>

            {/* contorno y brillo */}
            <path d={HEART} fill="none" stroke="#b3122f" strokeOpacity=".55" strokeWidth=".35" strokeLinejoin="round" />
            <path d="M5.2 8.6C5 6.9 6.1 5.4 7.7 5.2" fill="none" stroke={`url(#${uid}s)`} strokeWidth=".9" strokeLinecap="round" />
            <ellipse cx="8.4" cy="6.2" rx=".5" ry=".3" fill="#fff" opacity=".85" transform="rotate(-25 8.4 6.2)" />
          </svg>

          <AnimatePresence>
            {floaters.map((f) => (
              <motion.span key={f.id} className="pointer-events-none absolute left-1/2 top-1/2 text-crimson"
                initial={{ opacity: 1, x: f.x, y: 0, scale: 0.5 * f.s }} animate={{ opacity: 0, y: -190, scale: 1.1 * f.s }} exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}>
                <Heart filled stroke={0} className="h-6 w-6" />
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* progreso: 10 puntos */}
      <div className="mt-9 flex items-center gap-1.5" aria-label={`${n}/${TAPS}`}>
        {Array.from({ length: TAPS }, (_, i) => (
          <motion.span key={i} initial={false} animate={{ scale: i === n - 1 ? [1, 1.7, 1] : 1, backgroundColor: i < n ? "#b3122f" : "rgba(58,42,46,.18)" }}
            transition={{ duration: 0.4 }} className="h-1.5 w-1.5 rounded-full" />
        ))}
      </div>
      <p className="mt-4 text-[12px] text-ink/70">{t(ui.eachTap)}</p>
    </motion.section>
  );
}
