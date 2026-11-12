import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Un regalo para ti ❤️",
  description: "Un recuerdo hecho con cariño",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true }, // que no salga en buscadores
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f1d9df" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="es"><body>{children}</body></html>);
}
