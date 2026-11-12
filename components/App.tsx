"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useStore } from "@/lib/store";
import Topbar from "./Topbar";
import Welcome from "./Welcome";
import HeartTap from "./HeartTap";
import Story from "./Story";
import Quiz from "./Quiz";
import Success from "./Success";
import Voucher from "./Voucher";
import Protect from "./Protect";

export default function App() {
  const stage = useStore((s) => s.stage);
  const modal = useStore((s) => s.modal);
  const lang = useStore((s) => s.lang);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    document.body.style.overflow = stage !== "story" || modal ? "hidden" : "";
  }, [stage, modal]);

  return (
    <main className="relative z-10 mx-auto min-h-dvh w-full max-w-[480px]">
      <Protect />
      <Topbar />
      <AnimatePresence mode="wait">
        {stage === "welcome" && <Welcome key="w" />}
        {stage === "heart" && <HeartTap key="h" />}
      </AnimatePresence>
      {stage === "story" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <Story />
        </motion.div>
      )}
      <AnimatePresence>
        {modal === "quiz" && <Quiz key="q" />}
        {modal === "success" && <Success key="s" />}
        {modal === "voucher" && <Voucher key="v" />}
      </AnimatePresence>
    </main>
  );
}
