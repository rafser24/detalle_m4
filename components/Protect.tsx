"use client";
import { useEffect, useState } from "react";
import Heart from "./Heart";

// Capa de protección básica. Solo actúa en producción (en `npm run dev` no estorba).
// Importante: en una web NO es posible bloquear de verdad las capturas de pantalla;
// esto dificulta guardar fotos y capturar por los caminos comunes y tapa la pantalla
// cuando la página pierde el foco o se usa un atajo de captura.
export default function Protect() {
  const [cover, setCover] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const stop = (e: Event) => e.preventDefault();
    const settle = () => window.setTimeout(() => setCover(document.hidden || !document.hasFocus()), 700);

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;
      // atajos de captura de Windows/macOS (Win+Shift+S, Cmd+Shift+3/4/5): tapar mientras se pulsan
      if (e.metaKey && e.shiftKey) setCover(true);
      if (k === "printscreen") {
        navigator.clipboard?.writeText(" ").catch(() => {});
        setCover(true);
        settle();
      }
      if ((mod && ["s", "p", "u"].includes(k)) || k === "f12" || (mod && e.shiftKey && ["i", "j", "c"].includes(k))) e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "printscreen") navigator.clipboard?.writeText(" ").catch(() => {});
      settle();
    };
    const hide = () => setCover(true);
    const show = () => setCover(document.hidden ? true : false);

    document.addEventListener("contextmenu", stop);
    document.addEventListener("dragstart", stop);
    document.addEventListener("selectstart", stop);
    document.addEventListener("copy", stop);
    document.addEventListener("cut", stop);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("visibilitychange", () => (document.hidden ? hide() : show()));
    window.addEventListener("blur", hide);
    window.addEventListener("focus", show);
    window.addEventListener("pagehide", hide);
    window.addEventListener("beforeprint", hide);
    window.addEventListener("afterprint", show);
    return () => {
      document.removeEventListener("contextmenu", stop);
      document.removeEventListener("dragstart", stop);
      document.removeEventListener("selectstart", stop);
      document.removeEventListener("copy", stop);
      document.removeEventListener("cut", stop);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", hide);
      window.removeEventListener("focus", show);
      window.removeEventListener("pagehide", hide);
      window.removeEventListener("beforeprint", hide);
      window.removeEventListener("afterprint", show);
    };
  }, []);

  if (!cover) return null;
  return (
    <div role="presentation" className="fixed inset-0 z-[9999] grid place-items-center bg-[#f6e3e7]">
      <div className="flex flex-col items-center text-crimson">
        <Heart filled stroke={0} className="h-10 w-10" />
        <p className="title-serif mt-3 text-[15px] italic text-ink/70">Contenido protegido</p>
      </div>
    </div>
  );
}
