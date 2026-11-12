"use client";
import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { gift, ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";

const MapInner = dynamic(() => import("./MapInner"), { ssr: false, loading: () => <div className="h-full w-full animate-pulse bg-white/40" /> });

export default function PlacesMap() {
  const { t } = useT();
  const [active, setActive] = useState<number | null>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const mapBox = useRef<HTMLDivElement>(null);
  // desde la lista: sube al mapa para ver cómo vuela al lugar; desde un pin: baja a su tarjeta
  const select = useCallback((i: number, from: "list" | "map" = "map") => {
    setActive(i);
    if (from === "list") mapBox.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    else items.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <section className="px-6 py-12">
      <div className="text-center">
        <p className="eyebrow">{t(ui.ourPlaces)}</p>
        <h2 className="title-serif mt-2 text-[24px]">{t(ui.mapTitle)}</h2>
        <p className="mx-auto mt-2 max-w-[300px] text-[11.5px] text-ink/70">{t(ui.mapSub)}</p>
      </div>
      <motion.div ref={mapBox} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="relative z-0 mt-6 h-[300px] overflow-hidden rounded-3xl shadow-lg ring-1 ring-white/70">
        <MapInner active={active} onSelect={(i) => select(i, "map")} />
        <span className="pointer-events-none absolute bottom-3 left-1/2 z-[500] -translate-x-1/2 rounded-full bg-ink/85 px-3 py-1 text-[10px] text-white">{t(ui.mapHint)}</span>
      </motion.div>
      <div className="mt-5 space-y-3">
        {gift.places.map((p, i) => (
          <motion.div key={i} ref={(el) => { items.current[i] = el; }} onClick={() => select(i, "list")}
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5%" }} transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            className={`glass flex cursor-pointer gap-3 !rounded-[20px] p-3.5 transition-shadow ${active === i ? "ring-2 ring-crimson/70" : ""}`}>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-crimson text-[11px] font-semibold text-white">{i + 1}</span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="title-serif text-[14px]">{t(p.title)}</h3>
                <span className="rounded-full bg-crimson/10 px-2 py-0.5 text-[9px] text-crimson">{t(p.chip)}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-ink/75">{t(p.text)}</p>
              <p className="mt-1.5 flex items-center gap-1 truncate text-[10px] text-muted">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>{p.address}
              </p>
              <a href={`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                className="mt-1.5 inline-block text-[10px] font-medium text-crimson underline underline-offset-2">{t(ui.openMap)}</a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
