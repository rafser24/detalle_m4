"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { gift } from "@/lib/gift.config";

export default function MapInner({ active, onSelect }: { active: number | null; onSelect: (i: number) => void }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const sel = useRef(onSelect);
  sel.current = onSelect;

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { zoomControl: false, attributionControl: true, scrollWheelZoom: false, dragging: !L.Browser.mobile }).setView([20, -30], 2);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom: 19 }).addTo(m);
    markers.current = gift.places.map((p, i) => {
      const icon = L.divIcon({ className: "", html: `<div class="pin"><span>${i + 1}</span></div>`, iconSize: [30, 30], iconAnchor: [15, 30] });
      return L.marker([p.lat, p.lng], { icon }).addTo(m).on("click", () => sel.current(i));
    });
    m.fitBounds(L.latLngBounds(gift.places.map((p) => [p.lat, p.lng] as [number, number])), { padding: [30, 30] });
    map.current = m;
    return () => { m.remove(); map.current = null; };
  }, []);

  useEffect(() => {
    if (active == null || !map.current) return;
    const p = gift.places[active];
    map.current.invalidateSize();
    map.current.flyTo([p.lat, p.lng], 13, { duration: 1.4 });
  }, [active]);

  return <div ref={el} className="h-full w-full" />;
}
