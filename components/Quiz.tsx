"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gift, ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Modal from "./Modal";
import Heart from "./Heart";

export default function Quiz() {
  const { t } = useT();
  const setModal = useStore((s) => s.setModal);
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number | null>(null);
  const lock = useRef(false);
  const q = gift.quiz[step];

  const pick = (i: number) => {
    if (lock.current) return;
    if (i !== q.correct) { setWrong(i); setTimeout(() => setWrong(null), 600); return; }
    lock.current = true; setChosen(i);
    setTimeout(() => {
      if (step + 1 >= gift.quiz.length) { setModal("success"); return; }
      setStep(step + 1); setChosen(null); lock.current = false;
    }, 1000);
  };

  return (
    <Modal>
      <p className="max-w-[290px] text-center text-[11.5px] text-ink/70">{t(ui.quizIntro)}</p>
      <div className="mt-4 flex items-center gap-1.5">
        {gift.quiz.map((_, i) => (
          <motion.span key={i} layout transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={`h-1.5 rounded-full ${i === step ? "w-6 bg-crimson" : i < step ? "w-1.5 bg-crimson/60" : "w-1.5 bg-ink/25"}`} />
        ))}
      </div>
      <div className="relative mt-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }} className="glass w-full p-5">
            <p className="eyebrow !text-[9px]">{t(ui.question)} {step + 1} {t(ui.of)} {gift.quiz.length}</p>
            <h3 className="title-serif mt-2 text-[19px] leading-snug">{t(q.q)}</h3>
            <div className="mt-4 space-y-2.5">
              {q.options.map((o, i) => {
                const ok = chosen === i;
                return (
                  <motion.button key={i} onClick={() => pick(i)} whileTap={{ scale: 0.98 }}
                    animate={wrong === i ? { x: [0, -8, 8, -4, 4, 0], opacity: 0.6 } : { x: 0, opacity: 1 }} transition={{ duration: 0.45 }}
                    className="relative w-full overflow-hidden rounded-2xl border border-ink/10 bg-white/50 px-4 py-3 text-left text-[13px]">
                    <motion.span className="absolute inset-0 origin-left bg-crimson" initial={false} animate={{ scaleX: ok ? 1 : 0 }} transition={{ duration: 0.45, ease: "easeOut" }} />
                    <span className={`relative transition-colors duration-300 ${ok ? "font-medium text-white" : ""}`}>{t(o)}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {chosen !== null && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-x-0 -bottom-14 text-center text-[14px] font-medium">
              {t(ui.yes)}
              {[0, 1, 2, 3, 4].map((k) => (
                <motion.span key={k} className="absolute left-1/2 top-0 text-crimson" initial={{ opacity: 1, x: 0, y: 0 }}
                  animate={{ opacity: 0, x: (k - 2) * 22, y: -40 - k * 6 }} transition={{ duration: 0.9, delay: k * 0.05 }}><Heart filled className="h-2.5 w-2.5" /></motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
