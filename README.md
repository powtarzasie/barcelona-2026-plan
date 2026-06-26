# Barcelona dla Dwojga · 2–5 lipca 2026

Personalizowany plan wyjazdu do Barcelony dla pary (małżeństwo, bez dzieci) —
spokojny, kulinarny, z architekturą Gaudíego, morzem i piłkarskim akcentem (Camp Nou),
ze świadomością, że Tour de France 2026 startuje z Barcelony w te właśnie dni.

## Co jest w repo

| Plik / katalog | Zawartość |
|----------------|-----------|
| `src/`, `index.html`, `*.config.js` | Interaktywna strona-przewodnik (**React + Vite + Tailwind**) |
| `src/data/itinerary.js` | Dane planu (dni, harmonogram, lokalizacje z GPS, checklista) |
| `01_PROFIL_PODROZNIKOW.md` | Profil podróżników |
| `02_RESEARCH_BARCELONA_2026.md` | Research (zweryfikowany 26.06.2026) |
| `03_PLAN_BARCELONA_FULL.md` | Pełny plan dzień po dniu |
| `05_PLAN_NA_TELEFON.md` | Skrócona wersja na telefon |
| `06_CHECKLISTA_REZERWACJI.md` | Checklista rezerwacji |
| `07_RYZYKA_I_PLAN_B.md` | Ryzyka i plan B |
| `barcelona_2026.html` | Wersja jednoplikowa (bez builda) |

## Uruchomienie strony

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produkcja → dist/
```

Szczegóły: [README_BARCELONA_STRONA.md](README_BARCELONA_STRONA.md).

## Uwagi

- **Sagrada Família** — wstęp na lipiec 2026 wyprzedany; w planie zwiedzanie fasad z zewnątrz
  (darmowe), opcjonalnie wnętrze Gaudíego w Casa Batlló.
- Surowe nagrania głosowe i transkrypcje rozmowy są **celowo wyłączone** z repo (`.gitignore`)
  ze względu na prywatność.
- Ceny, godziny i trasy Tour de France zweryfikowano 26.06.2026 — potwierdź tuż przed wyjazdem.
