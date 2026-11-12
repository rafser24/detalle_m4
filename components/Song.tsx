"use client";
import { motion } from "motion/react";
import { gift, ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";
import { pause, play, useStore } from "@/lib/store";

export default function Song() {
  const { t } = useT();
  const playing = useStore((s) => s.playing) === "song";
  const toggle = () => (playing ? pause("song") : play("song", gift.song.audio));
  const eq = [0.5, 0.9, 0.4, 0.8, 0.6];
  return (
    <section className="px-6 pb-10 pt-12 text-center">
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="eyebrow">{t(ui.ourSong)}</motion.p>
      <motion.button onClick={toggle} whileTap={{ scale: 0.95 }} aria-label={playing ? "Pause" : "Play"}
        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 80 }}
        className="relative mx-auto mt-6 block h-[132px] w-[132px]">
        <img src={gift.song.cover} alt="" className="spin h-full w-full rounded-full object-cover shadow-xl ring-4 ring-white/70" style={{ animationPlayState: playing ? "running" : "paused" }} />
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-crimson/85 text-white backdrop-blur">
          {playing ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
        </span>
        <span className="absolute -bottom-1 left-1/2 flex h-4 -translate-x-1/2 items-end gap-[3px]">
          {eq.map((h, i) => (
            <motion.i key={i} className="block w-[3px] rounded-full bg-crimson" style={{ height: 14 }}
              animate={playing ? { scaleY: [h, 1, h * 0.5, 1, h] } : { scaleY: 0.25 }} transition={{ duration: 0.9 + i * 0.1, repeat: Infinity }} />
          ))}
        </span>
      </motion.button>
      <p className="title-serif mt-8 text-[15px] text-ink/80">{t(ui.ourSong)}</p>
      <p className="eyebrow !text-[9px]">Spotify</p>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="mx-auto mt-5 flex items-center gap-3 rounded-[20px] bg-[#2d4a1e] p-3 text-left text-white shadow-lg">
        <img src={gift.song.cover} alt="" className="h-16 w-16 rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold">{gift.song.title}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/80">
            <span className="rounded bg-black/40 px-1 text-[8px]">{t(ui.sample)}</span><span className="rounded bg-white/25 px-1 text-[8px]">E</span>{gift.song.artist}
          </p>
        </div>
        <button onClick={toggle} aria-label="play" className="grid h-9 w-9 place-items-center rounded-full bg-white text-black">
          {playing ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
        </button>
      </motion.div>
    </section>
  );
}
