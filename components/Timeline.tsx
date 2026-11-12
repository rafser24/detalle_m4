"use client";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useSpring } from "motion/react";
import { gift, ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";

const startMs = (iso: string, time = "00:00") => new Date(`${iso}T${time}:00`).getTime();

export default function Timeline() {
  const { t, fmtDate } = useT();
  const start = startMs(gift.startDate, gift.startTime);
  const counterRef = useRef<HTMLDivElement>(null);
  const inView = useInView(counterRef, { once: true, margin: "-20%" });
  const [ms, setMs] = useState(0);
  const [live, setLive] = useState(false);
  // 1) cuenta animada desde 0 hasta el tiempo real; 2) luego avanza en vivo cada segundo
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, Math.max(0, Date.now() - start), {
      duration: 1.8, ease: "easeOut", onUpdate: (v) => setMs(v), onComplete: () => setLive(true),
    });
    return () => c.stop();
  }, [inView, start]);
  useEffect(() => {
    if (!live) return;
    const tick = () => setMs(Math.max(0, Date.now() - start));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [live, start]);
  const secs = Math.floor(ms / 1000);
  const n = Math.floor(secs / 86400);
  const parts = [
    { v: Math.floor(secs / 3600) % 24, label: t(ui.hours) },
    { v: Math.floor(secs / 60) % 60, label: t(ui.minutes) },
    { v: secs % 60, label: t(ui.seconds) },
  ];

  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="px-6 py-12">
      <div className="text-center">
        <p className="eyebrow">{t(ui.memories)}</p>
        <h2 className="title-serif mt-2 text-[24px]">{t(ui.timelineTitle)}</h2>
      </div>
      <motion.div ref={counterRef} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="glass mx-auto mt-6 px-6 py-5 text-center">
        <div className="title-serif text-[44px] leading-none text-crimson tabular-nums">{n}</div>
        <p className="mt-1 text-[12px] text-ink/70">{t(ui.daysTogether)}</p>
        <div className="mx-auto mt-4 flex max-w-[260px] items-stretch justify-center gap-2">
          {parts.map((p) => (
            <div key={p.label} className="flex-1 rounded-2xl bg-white/60 py-2">
              <div className="title-serif text-[22px] leading-none text-crimson tabular-nums">{String(p.v).padStart(2, "0")}</div>
              <p className="mt-1 text-[9px] uppercase tracking-wider text-muted">{p.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-muted">{t(ui.sinceDate)} {fmtDate(gift.startDate)}</p>
      </motion.div>

      <div ref={listRef} className="relative mt-8 pl-5">
        <div className="absolute bottom-2 left-[3px] top-2 w-px bg-crimson/15" />
        <motion.div style={{ scaleY, transformOrigin: "top" }} className="absolute bottom-2 left-[3px] top-2 w-px bg-crimson/70" />
        <div className="space-y-4">
          {gift.timeline.map((m, i) => (
            <motion.div key={m.date} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.05 }} className="relative">
              <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.15 }}
                className="absolute -left-[22px] top-5 h-[7px] w-[7px] rounded-full bg-crimson" />
              <div className="glass flex gap-3 !rounded-[22px] p-3.5">
                <img src={m.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                <div>
                  <p className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-muted">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
                    {fmtDate(m.date, true)}
                  </p>
                  <h3 className="title-serif mt-0.5 text-[15px] leading-snug">{t(m.title)}</h3>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-ink/75">{t(m.text)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
