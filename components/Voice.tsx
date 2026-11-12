"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { gift, ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";
import { getAudio, pause, play, useStore } from "@/lib/store";

const BARS = 60;
export default function Voice() {
  const { t } = useT();
  const playing = useStore((s) => s.playing) === "voice";
  const [p, setP] = useState(0);
  const [time, setTime] = useState(0);
  const heights = useMemo(() => Array.from({ length: BARS }, (_, i) => 18 + Math.abs(Math.sin(i * 1.7) * 30 + Math.cos(i * 0.55) * 22) + (i % 5) * 2), []);

  useEffect(() => {
    const a = getAudio("voice", gift.voice.audio);
    if (!a) return;
    const on = () => { setP(a.duration ? a.currentTime / a.duration : 0); setTime(Math.floor(a.currentTime)); };
    a.addEventListener("timeupdate", on);
    return () => a.removeEventListener("timeupdate", on);
  }, []);
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = getAudio("voice", gift.voice.audio); if (!a || !a.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * a.duration;
  };
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <section className="px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-crimson text-white">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
          </span>
          <div className="leading-tight"><p className="eyebrow !text-[9px]">{t(ui.voiceMessage)}</p><p className="text-[12px] font-semibold">{t(ui.fromLabel)} {gift.fromShort}</p></div>
        </div>
        <div onClick={seek} className="mt-4 flex h-14 cursor-pointer items-center gap-[2.5px]">
          {heights.map((h, i) => {
            const active = i / BARS < p;
            return (
              <motion.i key={i} className={`block flex-1 rounded-full ${active ? "bg-crimson" : "bg-ink/15"}`} style={{ height: h }}
                animate={active && playing ? { scaleY: [1, 1.08, 0.94, 1] } : { scaleY: 1 }} transition={{ duration: 0.8, repeat: Infinity, delay: (i % 7) * 0.05 }} />
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button onClick={() => (playing ? pause("voice") : play("voice", gift.voice.audio))} aria-label="Play voice"
            className="grid h-10 w-10 place-items-center rounded-full bg-crimson text-white shadow-md active:scale-95">
            {playing ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
          </button>
          <div className="h-[2px] flex-1 rounded bg-ink/15"><div className="h-full rounded bg-crimson" style={{ width: `${p * 100}%` }} /></div>
          <span className="text-[10px] tabular-nums text-muted">{fmt(time)}</span>
        </div>
      </motion.div>
    </section>
  );
}
