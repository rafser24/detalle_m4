"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { gift, ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Heart from "./Heart";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 16, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } } };

export default function Welcome() {
  const { t } = useT();
  const setStage = useStore((s) => s.setStage);
  const [ready, setReady] = useState(false);
  useEffect(() => { const id = setTimeout(() => setReady(true), 900); return () => clearTimeout(id); }, []);

  return (
    <motion.section exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }} transition={{ duration: 0.5 }}
      className="flex min-h-dvh flex-col items-center justify-center px-6 pb-16 pt-20">
      {ready && (
        <motion.div variants={container} initial="hidden" animate="show" className="flex w-full flex-col items-center">
          <motion.div variants={{ hidden: { opacity: 0, y: 40, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 90, damping: 16 } } }}
            className="glass w-full px-7 py-8 text-center">
            <motion.p variants={item} className="eyebrow">{t(ui.youHaveGift)}</motion.p>
            <motion.p variants={item} className="eyebrow mt-6 !text-[9px]">{t(ui.for)}</motion.p>
            <motion.h1 variants={item} className="title-serif mt-1 text-[36px] leading-tight">{gift.to}</motion.h1>
            <motion.div variants={item} className="mx-auto my-3 h-px w-10 bg-ink/30" />
            <motion.p variants={item} className="text-[13px]">{t(ui.fromLabel)} {gift.from} ❤️</motion.p>
            <motion.p variants={item} className="title-serif mt-5 text-[13px] italic leading-relaxed text-ink/80">“{t(gift.quote)}”</motion.p>
          </motion.div>
          <motion.p variants={item} className="mt-10 text-[12px] text-ink/70">{t(ui.tapHeart)}</motion.p>
          <motion.button variants={item} onClick={() => setStage("heart")} whileTap={{ scale: 0.9 }} aria-label="Open" className="relative mt-5 grid h-16 w-16 place-items-center">
            <motion.span className="absolute inset-0 rounded-full bg-crimson/20"
              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }} />
            <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="text-crimson">
              <Heart className="h-12 w-12" />
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </motion.section>
  );
}
