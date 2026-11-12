"use client";
import { motion } from "motion/react";
import { ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Heart from "./Heart";

export default function Surprise() {
  const { t } = useT();
  const setModal = useStore((s) => s.setModal);
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center px-6">
      <p className="eyebrow mb-6 text-center !text-[9px]">{t(ui.brandTag)}</p>
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }}
        transition={{ type: "spring", stiffness: 80, damping: 16 }} className="glass w-full px-6 py-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-crimson/10 text-crimson"><Heart filled className="h-5 w-5" /></span>
        <h2 className="title-serif mt-5 text-[21px] uppercase tracking-[.12em]">{t(ui.lastSurprise)}</h2>
        <p className="mt-3 text-[12.5px] text-ink/70">{t(ui.thoughtOver)}</p>
        <p className="title-serif mt-1 text-[13px] italic">{t(ui.stillHave)}</p>
        <motion.button whileTap={{ scale: 0.96 }} onClick={() => setModal("quiz")} className="btn-primary mt-6">{t(ui.discover)}</motion.button>
      </motion.div>
    </section>
  );
}
