"use client";
import { useEffect, useMemo } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Modal from "./Modal";
import Heart from "./Heart";

export default function Success() {
  const { t } = useT();
  const setModal = useStore((s) => s.setModal);
  const hearts = useMemo(() => Array.from({ length: 36 }, (_, i) => ({
    x: Math.random() * 100, size: 8 + Math.random() * 12, delay: Math.random() * 1.6, dur: 2.8 + Math.random() * 2,
    color: ["#b3122f", "#d4a24c", "#e8a0b0"][i % 3], rot: (Math.random() - 0.5) * 120,
  })), []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      const heart = confetti.shapeFromPath({ path: "M167 72c19-38 37-56 75-56 42 0 76 33 76 75 0 76-76 151-151 227C92 242 16 167 16 91c0-42 34-75 76-75 38 0 57 18 75 56z" });
      confetti({ particleCount: 60, spread: 90, origin: { y: 0.55 }, shapes: [heart], colors: ["#b3122f", "#e8a0b0", "#d4a24c"], scalar: 1.6, ticks: 220 });
    }
    const id = setTimeout(() => setModal("voucher"), 4200);
    return () => clearTimeout(id);
  }, [setModal]);

  return (
    <Modal>
      {hearts.map((h, i) => (
        <motion.span key={i} className="pointer-events-none absolute top-0" style={{ left: `${h.x}%`, color: h.color }}
          initial={{ y: -30, opacity: 0, rotate: 0 }} animate={{ y: "105dvh", opacity: [0, 1, 1, 0], rotate: h.rot }} transition={{ duration: h.dur, delay: h.delay, ease: "easeIn" }}>
          <Heart filled className="block" stroke={0} style={{ width: h.size, height: h.size }} />
        </motion.span>
      ))}
      <motion.h2 initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.8 }}
        className="title-serif text-center text-[30px]">{t(ui.done)}</motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-2 text-center text-[12px] text-muted">{t(ui.doneSub)}</motion.p>
    </Modal>
  );
}
