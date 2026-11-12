"use client";
import { motion } from "motion/react";
import { gift, ui } from "@/lib/gift.config";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Modal from "./Modal";

export default function Voucher() {
  const { t } = useT();
  const setModal = useStore((s) => s.setModal);
  return (
    <Modal>
      <motion.div initial={{ y: -260, rotate: -3, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 70, damping: 11 }}
        className="relative w-full">
        <motion.div initial={{ opacity: 0, scaleX: 0.6 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute inset-x-6 -bottom-3 h-6 rounded-full bg-crimson/20 blur-xl" />
        <div className="relative rounded-3xl border-[1.5px] border-dashed border-crimson/60 bg-white/60 px-7 py-8 text-center backdrop-blur">
          <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-crimson/40 bg-[#f6e3e7]" />
          <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-crimson/40 bg-[#f6e3e7]" />
          <div className="text-crimson">✂</div>
          <p className="eyebrow mt-1 !text-[9px]">{t(ui.specialVoucher)}</p>
          <p className="title-serif mt-4 text-[19px] leading-snug">❤️ {t(gift.voucher)}</p>
          <p className="mt-4 text-[10px] uppercase tracking-[.2em] text-muted">— {gift.fromShort.toUpperCase()}</p>
        </div>
      </motion.div>
      <button onClick={() => setModal(null)} className="btn-glass mt-10">{t(ui.backToGift)}</button>
      <p className="eyebrow mt-4 !text-[9px] opacity-50">{gift.brand.short}</p>
    </Modal>
  );
}
