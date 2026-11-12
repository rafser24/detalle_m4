"use client";
import { create } from "zustand";

export type Stage = "welcome" | "heart" | "story";
export type Modal = null | "quiz" | "success" | "voucher";
type Lang = "es" | "en";

type S = {
  lang: Lang; setLang: (l: Lang) => void;
  stage: Stage; setStage: (s: Stage) => void;
  modal: Modal; setModal: (m: Modal) => void;
  playing: null | "song" | "voice"; setPlaying: (p: null | "song" | "voice") => void;
};
export const useStore = create<S>((set) => ({
  lang: "es", setLang: (lang) => set({ lang }),
  stage: "welcome", setStage: (stage) => set({ stage }),
  modal: null, setModal: (modal) => set({ modal }),
  playing: null, setPlaying: (playing) => set({ playing }),
}));

// Audio singleton (song + voice son excluyentes)
const els: Record<string, HTMLAudioElement> = {};
export function getAudio(key: "song" | "voice", src: string) {
  if (typeof window === "undefined") return null;
  if (!els[key]) {
    const a = new Audio(src);
    a.loop = key === "song";
    a.preload = "auto";
    a.addEventListener("pause", () => { if (useStore.getState().playing === key) useStore.getState().setPlaying(null); });
    a.addEventListener("ended", () => { if (useStore.getState().playing === key) useStore.getState().setPlaying(null); });
    els[key] = a;
  }
  return els[key];
}
export function play(key: "song" | "voice", src: string) {
  const other = key === "song" ? "voice" : "song";
  els[other]?.pause();
  const a = getAudio(key, src);
  a?.play().then(() => useStore.getState().setPlaying(key)).catch(() => {});
}
export function pause(key: "song" | "voice") {
  els[key]?.pause();
  if (useStore.getState().playing === key) useStore.getState().setPlaying(null);
}
