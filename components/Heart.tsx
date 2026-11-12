// Corazón simétrico de curvas suaves (caja 20×20 con margen para el trazo).
export const HEART = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
export default function Heart({ filled = false, className = "", stroke = 2.2, style }: { filled?: boolean; className?: string; stroke?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="2 2 20 20" className={className} style={{ overflow: "visible", ...style }} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={stroke * 0.24} strokeLinejoin="round" strokeLinecap="round">
      <path d={HEART} />
    </svg>
  );
}
