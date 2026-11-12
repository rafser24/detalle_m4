"use client";
import { motion } from "motion/react";
import { gift, ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";

export default function Letter() {
  const { t, lang } = useT();
  const ps = gift.letter[lang];
  return (
    <section className="px-7 py-10">
      <p className="eyebrow">{t(ui.letter)}</p>
      <div className="title-serif mt-5 space-y-5 text-[15px] leading-[1.75] text-ink/90">
        {ps.map((p, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px -8% 0px" }} transition={{ duration: 0.7 }}>
            {p}
          </motion.p>
        ))}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="!mt-6 font-sans text-[10px] uppercase tracking-[.2em] text-muted">— {gift.fromShort.toUpperCase()}</motion.p>
      </div>
    </section>
  );
}
