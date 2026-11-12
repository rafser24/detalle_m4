"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { gift, ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";

export default function Gallery() {
  const { t } = useT();
  const [ref, api] = useEmblaCarousel({ align: "center", containScroll: false });
  const [sel, setSel] = useState(0);
  useEffect(() => {
    if (!api) return;
    const on = () => setSel(api.selectedScrollSnap());
    on(); api.on("select", on);
    return () => { api.off("select", on); };
  }, [api]);
  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);
  const n = gift.gallery.length;

  return (
    <section className="py-10">
      <div className="px-6 text-center">
        <p className="eyebrow">{t(ui.gallery)}</p>
        <h2 className="title-serif mt-2 text-[24px]">{t(ui.galleryTitle)}</h2>
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="mt-6 overflow-hidden" ref={ref} role="region" aria-roledescription="carousel">
        <div className="flex touch-pan-y pl-[12%]">
          {gift.gallery.map((src, i) => (
            <div key={src} className="min-w-0 shrink-0 grow-0 basis-[76%] px-2" role="group" aria-label={`${i + 1}/${n}`}>
              <motion.div animate={{ scale: sel === i ? 1 : 0.94, opacity: sel === i ? 1 : 0.8 }} transition={{ duration: 0.4 }}
                className="relative aspect-square overflow-hidden rounded-[28px] shadow-lg">
                {/* fondo difuminado + foto completa sin recortar */}
                <img src={src} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-xl" draggable={false} />
                <img src={src} alt={`${gift.couple} ${i + 1}`} className="relative h-full w-full object-contain" draggable={false} />
                <span className="absolute right-3 top-3 rounded-full bg-black/35 px-2 py-0.5 text-[10px] text-white backdrop-blur">{i + 1}/{n}</span>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="mt-4 flex items-center justify-center gap-3 text-ink/60">
        <button onClick={prev} aria-label="Previous" className="px-1 text-lg">‹</button>
        <div className="flex items-center gap-1.5">
          {gift.gallery.map((_, i) => (
            <motion.span key={i} layout className={`h-1.5 rounded-full ${sel === i ? "w-5 bg-crimson" : "w-1.5 bg-ink/25"}`} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
          ))}
        </div>
        <button onClick={next} aria-label="Next" className="px-1 text-lg">›</button>
      </div>
    </section>
  );
}
