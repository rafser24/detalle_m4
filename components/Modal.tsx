"use client";
import { motion } from "motion/react";
import { useStore } from "@/lib/store";

export default function Modal({ children, closable = true }: { children: React.ReactNode; closable?: boolean }) {
  const setModal = useStore((s) => s.setModal);
  return (
    <motion.div role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      className="fixed inset-0 z-40 mx-auto flex max-w-[480px] flex-col items-center justify-center overflow-hidden bg-[#f6e3e7]/90 px-6 backdrop-blur-xl">
      {closable && (
        <button onClick={() => setModal(null)} aria-label="Close" className="absolute right-5 top-14 text-xl text-ink/60">✕</button>
      )}
      {children}
    </motion.div>
  );
}
