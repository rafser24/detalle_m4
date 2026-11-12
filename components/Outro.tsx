"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { gift } from "@/lib/gift.config";
import Heart from "./Heart";

export default function Outro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(p, [0, 0.45], ["100%", "0%"]);
  const textO = useTransform(p, [0.35, 0.5, 0.65, 0.78], [0, 1, 1, 0]);
  const imgO = useTransform(p, [0.62, 0.85], [1, 0]);
  const wash = useTransform(p, [0.4, 0.55], [0.75, 0]);
  return (
    <section ref={ref} className="relative h-[210dvh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <motion.div style={{ y, opacity: imgO }} className="absolute inset-0">
          {/* fondo pastel (mismo de la portada) */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 35%, #fbf7ff 0%, #e3d6fa 50%, #c9b6f0 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 70%, #f3dde3 100%)" }} />
          <motion.div style={{ opacity: wash }} className="absolute inset-0 bg-[#f6e3e7]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-5 pb-6">
            {/* foto completa, sin recortar */}
            <img src={gift.outroPhoto} alt={gift.couple} className="w-full rounded-[28px] shadow-2xl ring-4 ring-white/70" />
            <motion.div style={{ opacity: textO }} className="flex flex-col items-center text-crimson">
              <Heart filled className="mb-3 h-4 w-4" />
              <p className="title-serif text-[22px] italic text-ink">{gift.couple}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
