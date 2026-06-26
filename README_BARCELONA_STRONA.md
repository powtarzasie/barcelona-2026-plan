# Barcelona dla Dwojga — interaktywna strona planu (React + Vite + Tailwind)

Personalizowana strona-przewodnik z planem wyjazdu do Barcelony (2–5 lipca 2026),
zbudowana w stylu dostarczonego wzoru „Majorka Premium", ale z treścią dla Barcelony
oraz rozszerzona o pinezki Google Maps (GPS), linki do biletów i checklistę rezerwacyjną.

## Stos technologiczny

- **React 18** + `useState` (rozwijane karty dni)
- **Vite 5** (dev server + build)
- **Tailwind CSS 3** (style premium, responsywność)
- **lucide-react** (ikony wektorowe — bez emoji jako ikon strukturalnych)

## Struktura plików

```
Barcelon/
├── index.html              # punkt wejścia + Google Fonts (Playfair Display / Inter)
├── package.json
├── vite.config.js
├── tailwind.config.js      # fonty serif/sans, content paths
├── postcss.config.js
├── src/
│   ├── main.jsx            # bootstrap Reacta
│   ├── index.css           # dyrektywy Tailwind + prefers-reduced-motion
│   ├── App.jsx             # cała strona (komponenty + sekcje)
│   └── data/
│       └── itinerary.js    # dane: TRIP_META, ITINERARY, CHECKLIST, KEY_LOCATIONS
│                           # (kopia 04_ITINERARY_DATA.js — pojedyncze źródło prawdy)
└── README_BARCELONA_STRONA.md
```

> Dane są oddzielone od widoku: `src/data/itinerary.js` to kopia `04_ITINERARY_DATA.js`
> z katalogu głównego projektu. Edytując plan, zmieniaj dane w jednym miejscu.

## Jak uruchomić lokalnie

```bash
cd C:\ClaudeSANDDBOX\BARCELONA\Barcelon
npm install        # raz, instaluje zależności
npm run dev        # serwer deweloperski → http://localhost:5173
```

Build produkcyjny (statyczne pliki do hostingu, np. Vercel/Netlify):

```bash
npm run build      # wynik w katalogu dist/
npm run preview    # podgląd builda lokalnie
```

## Komponenty (w `src/App.jsx`)

| Komponent | Rola |
|-----------|------|
| `CopyButton` | kopiowanie nazwy lokalizacji do schowka (z fallbackiem) |
| `LinkPill` | przycisk-pigułka linku; **nie renderuje się**, gdy brak `href` |
| `SectionHeader` | nagłówek sekcji (wariant jasny/ciemny) |
| `ScheduleItem` | punkt harmonogramu + pigułki Mapa / Bilety / Strona |
| `LocationCard` | lokalizacja: adres, koszt, czas, „wymaga rezerwacji", przyciski |
| `DayCard` | rozwijana karta dnia (alert, 3 kafelki, harmonogram, lokalizacje, Plan B) |
| `App` | hero + wszystkie sekcje + footer |

## Sekcje strony

1. **Hero** — zdjęcie Barcelony (Eixample + Sagrada Família z lotu ptaka), daty, tytuł, etykiety.
2. **Filozofia wyjazdu** + karta „Dane wyjazdu" (loty, nocleg, mapa hotelu).
3. **Główne filary wyjazdu** — 6 kart (Gaudí, tapas, morze, FC Barcelona, wieczór, logistyka).
4. **Rozkład dni** — 4 rozwijane karty dni (domyślnie rozwinięte).
5. **Transport i logistyka** — lotnisko↔hotel, bilety/karty, ryzyka komunikacyjne.
6. **Piłka nożna / FC Barcelona** — Camp Nou Immersive, wariant krótki/rozszerzony, bonus TdF.
7. **Jedzenie i restauracje** — tapas, owoce morza, targ, „koniecznie spróbować".
8. **Plaża i spokojne wieczory** — Bogatell, Bunkers del Carmel, Fontanna Magiczna.
9. **Matryca rezerwacyjna** — checklista z kosztem, deadlinem, statusem i przyciskami.
10. **Plan B i ryzyka** — 6 bloków (TdF, upał, tłumy, bilety, lot, kieszonkowcy).
11. **Footer**.

## Linki i pinezki

- Każda lokalizacja ma `mapsUrl` w formacie
  `https://www.google.com/maps/search/?api=1&query=LAT,LNG` (pinezka GPS, nie wyszukiwanie po nazwie).
- Linki zewnętrzne: `target="_blank"` + `rel="noreferrer"`.
- Przycisk „Zarezerwuj"/„Bilety" pojawia się **tylko** gdy istnieje `bookingUrl`.

## Kontrola jakości (wynik)

- ✅ `npm run build` — kompiluje się bez błędów (1577 modułów).
- ✅ Brak błędów w konsoli przeglądarki.
- ✅ Wszystkie 4 dni rozwijają się i zwijają (`useState`).
- ✅ Brak poziomego przewijania na 375 px (mobile).
- ✅ Zdjęcie hero ładuje się (naturalWidth 2000).
- ✅ Treść dotyczy Barcelony (nie Majorki); piłkarski akcent obecny, ale nie dominuje.
- ✅ Ostatni dzień uwzględnia późny lot (wyjazd metrem L9 o 17:30–18:00).

## Dane do ponownej weryfikacji przed wyjazdem

Godziny, ceny i trasy zweryfikowano **26 czerwca 2026**. Tuż przed wyjazdem potwierdź:

- dostępność slotów **Sagrada Família** i **Park Güell** (bilety wyprzedają się tygodniami),
- godziny **Camp Nou — Barça Immersive Tour** w tygodniu wizyty,
- harmonogram **Fontanny Magicznej** na 3–5 lipca,
- ostateczne **mapy zamknięć ulic Tour de France** (4 i 5 lipca, barcelona.cat/mobilitat),
- godziny **check-in/out** i przechowania bagażu w Residencia Erasmus Gràcia.

## Linki do ręcznego sprawdzenia przed przekazaniem podróżnikom

- Bilety Sagrada Família — https://sagradafamilia.org/en/tickets-individuals
- Bilety Park Güell — https://parkguell.barcelona/en/buy-tickets
- Camp Nou Immersive — https://go.fcbarcelona.com/Museu/BarcaImmersiveTour/CampNouExperience/EN
- Aerobús — https://www.aerobusbarcelona.es/
- Restauracje **Can Ros / Can Solé** nie mają systemu rezerwacji online — rezerwacja telefoniczna.
