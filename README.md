# Regalo digital (estilo ConQRiño)

Next.js 15 · React 19 · Tailwind v4 · Motion · Embla · Leaflet · canvas-confetti · Zustand

## Arrancar
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Personalizar
Todo el contenido está en `lib/gift.config.ts` (destinatario, fecha, carta, hitos, lugares con lat/lng,
preguntas del quiz, vale) con textos ES/EN. Sustituye los archivos de `public/img` y `public/audio`
(`song.wav` → tu mp3, `voice.wav` → tu mensaje de voz) y actualiza las rutas en la config.

## Estructura
- `components/` una pieza por sección (Welcome, HeartTap, Hero, Song, Gallery, Letter, Timeline, Voice, PlacesMap, Outro, Surprise, Quiz, Success, Voucher)
- `lib/store.ts` estado (etapa, modal, idioma) y audio singleton (canción y voz son excluyentes)
- `app/globals.css` tokens de color, glassmorphism y tipografías (fontsource, sin depender de Google Fonts)

## Despliegue
Vercel: importar el repositorio, sin variables de entorno.
