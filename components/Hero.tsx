"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { gift, ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";
import Heart from "./Heart";

type Burst = { id: number; x: number; y: number; dx: number; rise: number; size: number; rot: number; dur: number; delay: number; color: string };
const REDS = ["#ff2d55", "#e11d48", "#ff3b30", "#d90429", "#ff4d6d"];
let uid = 0;

export default function Hero() {
  const { t, fmtDate } = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1]);
  const [hearts, setHearts] = useState<Burst[]>([]);
  const [tapped, setTapped] = useState(false);
  // al tocar: ráfaga de corazones rojos desde el punto del toque (efecto "tap tap" de TikTok)
  const onTap = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const batch: Burst[] = Array.from({ length: 8 }, (_, i) => ({
      id: ++uid, x, y,
      dx: (Math.random() - 0.5) * (i === 0 ? 30 : 150),
      rise: i === 0 ? 80 : 90 + Math.random() * 180,
      size: i === 0 ? 52 + Math.random() * 14 : 16 + Math.random() * 24,
      rot: (Math.random() - 0.5) * (i === 0 ? 40 : 70),
      dur: 0.9 + Math.random() * 0.8,
      delay: i === 0 ? 0 : Math.random() * 0.14,
      color: REDS[Math.floor(Math.random() * REDS.length)],
    }));
    setHearts((h) => [...h.slice(-60), ...batch]);
    setTapped(true);
    navigator.vibrate?.(8);
  };
  const up = (d: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 + d, duration: 0.8 } });
  return (
    <section ref={ref} onClick={onTap} className="relative h-[70dvh] min-h-[560px] cursor-pointer touch-manipulation select-none overflow-hidden">
      {/* fondo rosa de la página (se funde con la foto) */}
      <div className="absolute inset-0" style={{ background: "#f3dde3" }} />
      {/* foto original completa, con su fondo, adaptada al tamaño */}
      <motion.img src={gift.hero} alt={gift.couple} style={{ y, scale, transformOrigin: "50% 0%", objectPosition: "50% 25%",
        WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)", maskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)" }}
        className="absolute inset-x-0 top-0 h-[76%] w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-7 text-center text-ink">
        <motion.p {...up(0)} className="text-[9px] uppercase tracking-[.25em] text-ink/60">{t(ui.for)}</motion.p>
        <motion.h2 {...up(0.12)} className="title-serif text-[34px] leading-tight">{gift.to}</motion.h2>
        <motion.p {...up(0.24)} className="title-serif text-[14px] italic text-crimson">{gift.couple}</motion.p>
        <motion.p {...up(0.36)} className="mt-3 text-[9px] uppercase tracking-[.2em] text-muted">
          {t(ui.fromLabel)} {gift.fromShort} · {fmtDate(gift.date, true)}
        </motion.p>
      </div>
      {/* corazones del toque */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {hearts.map((h) => (
          <motion.span key={h.id} className="absolute" style={{ left: h.x - h.size / 2, top: h.y - h.size / 2, color: h.color, filter: "drop-shadow(0 4px 8px rgba(225,29,72,.35))" }}
            initial={{ opacity: 0, scale: 0.2, x: 0, y: 0, rotate: h.rot }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.2, 1.25, 1, 0.9], x: h.dx, y: -h.rise, rotate: h.rot * 1.4 }}
            transition={{ duration: h.dur, delay: h.delay, ease: "easeOut", times: [0, 0.15, 0.65, 1] }}
            onAnimationComplete={() => setHearts((cur) => cur.filter((q) => q.id !== h.id))}>
            <Heart filled className="block" stroke={0} style={{ width: h.size, height: h.size }} />
          </motion.span>
        ))}
      </div>
      {!tapped && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0.5, 0.8] }} transition={{ delay: 1.6, duration: 2.4, repeat: Infinity }}
          className="pointer-events-none absolute inset-x-0 bottom-1.5 z-10 text-center text-[9px] uppercase tracking-[.2em] text-muted">
          {t(ui.tapPhoto)}
        </motion.p>
      )}
    </section>
  );
}
