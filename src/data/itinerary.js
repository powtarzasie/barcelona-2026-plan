// Barcelona 2–5 lipca 2026
// Mariusz + żona | Residencia Erasmus Gràcia

export const TRIP_META = {
  destination: 'Barcelona',
  country: 'Hiszpania',
  dates: '2–5 lipca 2026',
  participants: 'Mariusz + żona',
  ages: '48 + 47',
  type: 'para / małżeństwo',
  accommodation: {
    name: 'Residencia Erasmus Gràcia',
    address: 'Torrent de l\'Olla, 212-214, 08012 Barcelona',
    neighbourhood: 'Gràcia',
    metro: 'Lesseps (L3) – 200m',
    lat: 41.4049,
    lng: 2.1558,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4049,2.1558',
    officialUrl: 'https://www.residenciaerasmusgracia.com/en/',
    bookingUrl: 'https://www.booking.com/hotel/es/residencia-erasmus.en-gb.html',
    breakfastIncluded: true,
    checkIn: '14:00 – 15:00',
    checkOut: '11:00'
  },
  flightOut: {
    from: 'Kraków (KRK)',
    to: 'Barcelona (BCN)',
    date: '2026-07-02',
    departure: '07:05',
    arrival: '09:50',
    flight: 'Ryanair FR 3050',
    terminal: 'T2 Barcelona El Prat'
  },
  flightReturn: {
    from: 'Barcelona (BCN)',
    to: 'Kraków (KRK)',
    date: '2026-07-05',
    departure: '21:40',
    arrival: '00:30+1',
    flight: 'Ryanair FR 3049',
    terminal: 'T2 Barcelona El Prat'
  },
  vibe: 'spokojny, kulinarny, aktywny, trochę plaży',
  philosophy: 'Zaległa podróż sprzed 21 lat. Nie robimy maratonu atrakcji — robimy doświadczenie Barcelony.',
  mustSee: ['Sagrada Família', 'Park Güell', 'Camp Nou', 'Barrio Gótico', 'Owoce morza', 'Plaża'],
  avoid: ['muzea sztuki', 'przeładowany harmonogram', 'eleganckie restauracje', 'godziny szczytu w tłumach']
};

export const ITINERARY = [
  {
    day: 1,
    date: '2 lipca 2026 (czwartek)',
    title: 'Zaległa podróż się zaczyna',
    subtitle: 'Pierwsze spotkanie z Barceloną',
    vibe: 'Spokojne przybycie, odkrywanie Gràcia, pierwsze lokalne tapas',
    intensity: 'niska',
    steps: '6 000 – 9 000',
    cost: '€120 – €160 para',
    weather: '27–32°C. Aklimatyzacja — nie szaleć po przylocie.',
    alert: '⚠️ Prezentacja drużyn Tour de France 2026 przy Sagrada Família: godz. 18:30–20:00. 80 000 osób! Opcja do zobaczenia (darmowe) LUB spokojny wieczór w Gràcia.',
    schedule: [
      {
        time: '07:05',
        action: 'Wylot z Krakowa',
        desc: 'Terminal 1 Kraków Balice. Ryanair FR 3050.',
        mapsUrl: null,
        officialUrl: 'https://www.ryanair.com/',
        bookingUrl: null
      },
      {
        time: '09:50',
        action: 'Lądowanie Barcelona El Prat',
        desc: 'Terminal 2. Odbiór bagażu ok. 30 min.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.2966,2.0833',
        officialUrl: 'https://www.aena.es/en/barcelona-airport.html',
        bookingUrl: null
      },
      {
        time: '10:30',
        action: 'Aerobús A2 → Plaça Catalunya',
        transport: 'Aerobús A2 (T2 → Pl. Catalunya) · ~40 min',
        desc: 'Terminal 2 → Plaça Catalunya. Co 10–15 min. Czas: 40 min. Bilet: €11/os.',
        mapsUrl: null,
        officialUrl: 'https://www.aerobusbarcelona.es/',
        bookingUrl: 'https://www.aerobusbarcelona.es/'
      },
      {
        time: '11:15',
        action: 'Metro L3 → Lesseps',
        transport: 'Metro L3 (Catalunya → Lesseps, 5–6 przyst.) · ~12 min',
        desc: 'Plaça Catalunya → Lesseps (5–6 przystanków, 12 min). T-Casual lub bilet jednorazowy.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4064,2.1548',
        officialUrl: 'https://www.tmb.cat/',
        bookingUrl: null
      },
      {
        time: '11:35',
        action: 'Residencia Erasmus Gràcia — zostawienie bagażu',
        transport: 'Pieszo (Lesseps → hotel, 200 m) · 3 min',
        desc: 'Check-in od 14:00–15:00. Zostaw bagaż w recepcji i idź na lunch.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4049,2.1558',
        officialUrl: 'https://www.residenciaerasmusgracia.com/en/',
        bookingUrl: null
      },
      {
        time: '12:00 – 13:30',
        action: 'Lunch w Gràcia',
        transport: 'Pieszo (hotel → restauracja) · 5–10 min',
        desc: 'Pierwsze lokalne jedzenie. Bar Bodega Quimet (Carrer de Vic, 23) — tapas katalońskie. LUB Sol Soler na Plaça del Sol.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4012,2.1612',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '13:30 – 15:00',
        action: 'Check-in + odpoczynek',
        desc: 'Prysznic, reset po wczesnym wstaniu i podróży.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '15:00 – 17:30',
        action: 'Spacer po Gràcia',
        desc: 'Plaça del Sol → Carrer Verdi → Plaça de la Virreina → Carrer Gran de Gràcia. Klimatyczna dzielnica, bez turystów.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4028,2.1564',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '18:00 – 20:30 (OPCJA)',
        action: '🚴 TdF Team Presentation — Avinguda de Gaudí',
        transport: 'Metro L3 (Lesseps → Verdaguer) · ~8 min + 10 min pieszo',
        desc: 'OPCJONALNIE: Metro do Verdaguer (L3, 3 przystanki). Prezentacja 23 drużyn Tour de France przy Sagrada Família. Darmowe! Sportowa atmosfera. Wyjdź przed 20:00.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4069,2.1760',
        officialUrl: 'https://www.barcelona.com/things-to-do-in-barcelona/tour-de-france-2026-in-barcelona',
        bookingUrl: null
      },
      {
        time: '21:00 – 22:30',
        action: 'Kolacja w Gràcia',
        transport: 'Pieszo (po Gràci) · 5–10 min',
        desc: 'Extra Bar (Carrer de Sant Domènec, 5) — wina naturalne i małe dania. LUB Oído (Carrer de la Providència, 41) — nowoczesne tapas.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4015,2.1573',
        officialUrl: null,
        bookingUrl: null
      }
    ],
    locations: [
      {
        name: 'Residencia Erasmus Gràcia',
        type: 'Nocleg',
        address: 'Torrent de l\'Olla, 212-214, 08012 Barcelona',
        lat: 41.4049,
        lng: 2.1558,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4049,2.1558',
        officialUrl: 'https://www.residenciaerasmusgracia.com/en/',
        bookingUrl: 'https://www.booking.com/hotel/es/residencia-erasmus.en-gb.html',
        reservationRequired: true,
        estimatedCost: 'zarezerwowane',
        timeOnSite: 'nocleg 3 noce',
        notes: 'Metro Lesseps 200m. Śniadanie zarezerwowane. Check-in od 14:00.'
      },
      {
        name: 'Bar Bodega Quimet',
        type: 'Restauracja / tapas',
        address: 'Carrer de Vic, 23, 08006 Barcelona',
        lat: 41.4012,
        lng: 2.1612,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4012,2.1612',
        officialUrl: null,
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: '€15–25/os.',
        timeOnSite: '1 – 1.5h',
        notes: 'Autentyczne katalońskie tapas. Pokoleniowe miejsce. Bez rezerwacji — przyjdź wcześnie lub późno.'
      },
      {
        name: 'Sol Soler',
        type: 'Bar / tapas / wino',
        address: 'Plaça del Sol, 21-22, 08012 Barcelona',
        lat: 41.4028,
        lng: 2.1573,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4028,2.1573',
        officialUrl: null,
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: '€12–20/os.',
        timeOnSite: '45 min – 1h',
        notes: 'Na Plaça del Sol. Lokale + turystki. Wino na zewnątrz.'
      },
      {
        name: 'Extra Bar',
        type: 'Bar z jedzeniem',
        address: 'Carrer de Sant Domènec, 5, 08012 Barcelona',
        lat: 41.4015,
        lng: 2.1573,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4015,2.1573',
        officialUrl: null,
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: '€15–25/os.',
        timeOnSite: '1 – 1.5h',
        notes: 'Wina naturalne. Małe dania. Klimat.'
      },
      {
        name: 'Avinguda de Gaudí (TdF Prezentacja)',
        type: 'Wydarzenie sportowe (opcjonalne)',
        address: 'Avinguda de Gaudí, 08025 Barcelona',
        lat: 41.4069,
        lng: 2.1760,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4069,2.1760',
        officialUrl: 'https://www.barcelona.com/things-to-do-in-barcelona/tour-de-france-2026-in-barcelona',
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: 'darmowe',
        timeOnSite: '1 – 1.5h',
        notes: 'Prezentacja 23 drużyn TdF. Godz. 18:30–20:00. 80k ludzi. Przyjdź wcześnie by mieć miejsce. Metro Verdaguer (L3/L5).'
      }
    ],
    contingency: 'Zmęczenie po locie: zrezygnuj z TdF i zostań w Gràcia. Spokojny wieczór to też dobra decyzja. Brak check-in: zostaw bagaż w recepcji. Upał: sjesta 13:00–15:00 w hotelu.'
  },
  {
    day: 2,
    date: '3 lipca 2026 (piątek)',
    title: 'Park Güell, gotyckie uliczki i fontanna',
    subtitle: 'Gaudí, labirynty i El Born',
    vibe: 'Architektura, stare miasto, targ z jedzeniem, magiczne wieczory',
    intensity: 'średnia',
    steps: '14 000 – 18 000',
    cost: '€120 – €160 para',
    weather: '28–33°C. Park Güell rano, kiedy jest najchłodniej.',
    alert: '⚠️ Bilety Park Güell — OBOWIĄZKOWE z wyprzedzeniem. Brak biletów przy kasie. Zarezerwuj online!',
    schedule: [
      {
        time: '09:00 – 09:45',
        action: 'Śniadanie w hotelu',
        desc: 'Zarezerwowane — korzystaj w pełni.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '10:00',
        action: 'Droga do Park Güell',
        transport: 'Pieszo pod górę (hotel → Park Güell) · 20–25 min — lub metro L3 do Vallcarca + 10 min pieszo',
        desc: 'Pieszo 20–25 min pod górę (Torrent de l\'Olla → Carrer de l\'Escorial → Carrer del Cedrón). LUB Metro L3 Lesseps → Vallcarca + 10 min spacer.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4138,2.1527',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '10:30 – 12:30',
        action: '🌈 Park Güell',
        desc: 'Strefa płatna: Dragon Staircase, mozaiki Sala Hipóstila, taras z widokiem. Strefa darmowa: punkty widokowe, promenada. Idź na Turó del Calvari (najwyższy punkt) dla panoramy 360°.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4138,2.1527',
        officialUrl: 'https://parkguell.barcelona/en',
        bookingUrl: 'https://parkguell.barcelona/en/buy-tickets'
      },
      {
        time: '12:30 – 13:15',
        action: 'Zejście + metro do Gràcia',
        transport: 'Pieszo w dół lub bus (Park Güell → Lesseps) · ~15 min',
        desc: 'Zejście pieszo lub bus do Lesseps. Odpoczynek po wspinaczce.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '13:00 – 14:30',
        action: 'Lunch w Gràcia',
        desc: 'Fonda Pepa (Carrer de Vic, 7) lub dowolne lokalne tapas przy Carrer de Verdi. Pierwsze piwo lub wino z widokiem.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4018,2.1606',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '14:30 – 15:30',
        action: 'Sjesta w hotelu',
        desc: 'Godzina odpoczynku — lipiec = 33°C w południe. To mądrość, nie słabość.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '15:30',
        action: 'Metro do centrum',
        transport: 'Metro L3 (Lesseps → Urquinaona / Jaume I) · ~14 min',
        desc: 'L3 Lesseps → Urquinaona lub Jaume I. Czas: 12–15 min.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '16:00 – 18:30',
        action: '🏛️ Gothic Quarter + El Born',
        transport: 'Pieszo (trasa po Starym Mieście) · ~2,5 km łącznie',
        desc: 'Trasa piesza: Carrer del Bisbe (most neo-gotycki) → Katedra → Plaça de Sant Jaume → Plaça Reial → przez Carrer de Ferran do El Born → Carrer del Rec → Passeig del Born → Santa Maria del Mar.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3837,2.1764',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '18:30 – 19:30',
        action: '🛒 Mercat de Santa Caterina',
        transport: 'Pieszo (z Gothic/El Born) · ~5 min',
        desc: 'Kolorowy targ — piękna falista dachówka, mniej turystyczny niż Boqueria. Przespaceruj się, kawa przy barze wewnątrz (Bar Joan). W piątek otwarty do 20:30!',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3846,2.1769',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '19:30 – 20:30',
        action: 'Drink w El Born — El Xampanyet',
        transport: 'Pieszo (Mercat → El Xampanyet) · ~5 min',
        desc: 'Cava i tapas. Kultowe miejsce przy Carrer de Montcada. Bez rezerwacji — może być kolejka.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3850,2.1820',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '21:00 – 22:30',
        action: 'Kolacja w Gràcia',
        transport: 'Metro L4 + L3 (Jaume I → Lesseps) · ~20 min',
        desc: 'Bar Bodega Quimet (jeśli nie byłeś w Dniu 1) lub Tangana (Carrer de la Riera de Sant Miquel, 19).',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4012,2.1612',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '22:30 (OPCJA)',
        action: '⛲ Fontanna Magiczna Montjuïc',
        transport: 'Metro L3 (Lesseps → Espanya) · ~12 min + 5 min pieszo',
        desc: 'Jeśli masz energię: Metro L3 do Espanya (10 min), spacer 5 min. Darmowy pokaz muzyczno-świetlny (ok. 21:00 i 21:30). Powrót ok. 23:00.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3716,2.1528',
        officialUrl: 'https://www.barcelona.cat/en/what-to-do-in-bcn/magic-fountain',
        bookingUrl: null
      }
    ],
    locations: [
      {
        name: 'Park Güell (strefa płatna)',
        type: 'Atrakcja — architektura Gaudíego',
        address: 'Carrer d\'Olot, s/n, 08024 Barcelona',
        lat: 41.4138,
        lng: 2.1527,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4138,2.1527',
        officialUrl: 'https://parkguell.barcelona/en',
        bookingUrl: 'https://parkguell.barcelona/en/buy-tickets',
        reservationRequired: true,
        estimatedCost: '€18/os. (od 2026)',
        timeOnSite: '1.5 – 2h',
        notes: 'REZERWACJA OBOWIĄZKOWA. Brak biletów przy kasie. Slot 9:30 lub 10:00 dla małych tłumów. Blisko hotelu (20 min pieszo pod górę).'
      },
      {
        name: 'Katedra Barcelońska',
        type: 'Kościół / architektura',
        address: 'Plaça de la Seu, s/n, 08002 Barcelona',
        lat: 41.3837,
        lng: 2.1764,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3837,2.1764',
        officialUrl: 'https://catedralbcn.org/',
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: 'bezpłatne (€3 krużganek)',
        timeOnSite: '20–30 min',
        notes: 'Zewnątrz darmowe. Gęsi w krużganku — klimat.'
      },
      {
        name: 'Plaça Reial',
        type: 'Plac publiczny',
        address: 'Plaça Reial, 08002 Barcelona',
        lat: 41.3800,
        lng: 2.1749,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3800,2.1749',
        officialUrl: null,
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: 'bezpłatne',
        timeOnSite: '15 min',
        notes: 'Palmy, arkady, stare latarnie zaprojektowane przez Gaudíego. Kawiarnie dookoła.'
      },
      {
        name: 'Mercat de Santa Caterina',
        type: 'Targ lokalny',
        address: 'Av. de Francesc Cambó, 16, 08003 Barcelona',
        lat: 41.3846,
        lng: 2.1769,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3846,2.1769',
        officialUrl: null,
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: 'wejście bezpłatne',
        timeOnSite: '30–45 min',
        notes: 'Otwarte w piątek do 20:30. Niedziela — ZAMKNIĘTE. Mniej turystyczny niż Boqueria.'
      },
      {
        name: 'Santa Maria del Mar',
        type: 'Kościół gotycki',
        address: 'Plaça de Santa Maria, 1, 08003 Barcelona',
        lat: 41.3844,
        lng: 2.1821,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3844,2.1821',
        officialUrl: 'https://www.santamariadelmarbarcelona.org/',
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: '€7 (dorosły)',
        timeOnSite: '20–30 min',
        notes: 'Piękna gotycka katedra zbudowana przez kupców. Wnętrze surowe i monumentalne.'
      },
      {
        name: 'El Xampanyet',
        type: 'Bar / tapas / cava',
        address: 'Carrer de Montcada, 22, 08003 Barcelona',
        lat: 41.3850,
        lng: 2.1820,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3850,2.1820',
        officialUrl: null,
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: '€10–15/os.',
        timeOnSite: '45 min',
        notes: 'Kultowy bar w El Born. Cava domu. Tapas. Może być kolejka.'
      },
      {
        name: 'Fontanna Magiczna Montjuïc',
        type: 'Wydarzenie / widok (opcjonalne)',
        address: 'Plaça de Carles Buïgas, s/n, 08038 Barcelona',
        lat: 41.3716,
        lng: 2.1528,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3716,2.1528',
        officialUrl: 'https://www.barcelona.cat/en/what-to-do-in-bcn/magic-fountain',
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: 'darmowe',
        timeOnSite: '30–45 min',
        notes: 'Pokaz muzyczno-świetlny. Lato: środa–niedziela od ok. 21:00. Dojazd: metro L3 do Espanya.'
      }
    ],
    contingency: 'Zmęczenie po Park Güell: przedłuż sjeście. Gothic przesuń na wieczór 17:00. Fontanna Magiczna: opcjonalna, pomiń jeśli zmęczeni. Park Güell brak biletów: alternatywa — Bunkers del Carmel (darmowe, 360° widok).'
  },
  {
    day: 3,
    date: '4 lipca 2026 (sobota)',
    title: 'Camp Nou, Tour de France i Gaudí z zewnątrz',
    subtitle: 'Piłka, kolarstwo i fasady Sagrada Família',
    vibe: 'Piłkarski akcent + Tour de France + fasady Gaudíego + kolacja przy morzu',
    intensity: 'średnia rano, niska popołudnie',
    steps: '11 000 – 15 000',
    cost: '€130 – €180 para',
    weather: '28–34°C. Zwiedzanie rano przed upałem i zamknięciami TdF.',
    alert: '⚠️ Bilety wstępu do Sagrada Família na lipiec są wyprzedane — zwiedzamy fasady z zewnątrz (darmowe, i tak robią największe wrażenie). ⚠️ TOUR DE FRANCE Etap 1: zamknięcia ulic od 12:00, pełne 13:30 (Passeig de Gràcia, okolica Sagrada Família, Montjuïc). METRO DZIAŁA! Camp Nou robimy przed południem.',
    schedule: [
      {
        time: '08:30 – 09:15',
        action: 'Śniadanie w hotelu',
        desc: 'Wcześniejsze dziś — duży dzień.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '09:20',
        action: 'Metro do Sagrada Família',
        transport: 'Metro L3 (Lesseps → Verdaguer) · ~8 min + 10 min pieszo',
        desc: 'L3 Lesseps → Verdaguer (3 przystanki, 6 min) → spacer 10 min do SF. LUB bus 19 lub 33 z Lesseps.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4036,2.1743',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '09:30 – 10:15',
        action: '⛪ Sagrada Família — fasady z zewnątrz (darmowe)',
        desc: 'Bilety wstępu na lipiec wyprzedane, ale fasady robią największe wrażenie z zewnątrz. Obejdź bazylikę: fasada Narodzenia od Carrer de la Marina, staw z odbiciem na Plaça de Gaudí, fasada Męki od Carrer de Sardenya. Kawa na Avinguda de Gaudí.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4036,2.1743',
        officialUrl: 'https://sagradafamilia.org/',
        bookingUrl: null
      },
      {
        time: '10:15 – 11:00',
        action: 'Metro L5 do Camp Nou',
        transport: 'Metro L5 (Sagrada Família → Collblanc) · ~12 min + 10 min pieszo',
        desc: 'Sagrada Família (L5) → Collblanc (~10 min) → spacer 10 min przez Av. de Joan XXIII.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3809,2.1228',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '11:00 – 12:15',
        action: '⚽ CAMP NOU — Barça Immersive Tour',
        desc: 'Max 1 godzina. Muzeum FC Barcelona + pokaz 360° + widok na plac budowy. Megastore FC Barcelony po wyjściu — pamiątki, koszulki.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3809,2.1228',
        officialUrl: 'https://www.fcbarcelona.com/en/tickets/camp-nou-experience',
        bookingUrl: 'https://go.fcbarcelona.com/Museu/BarcaImmersiveTour/CampNouExperience/EN'
      },
      {
        time: '13:15 – 14:00',
        action: 'Szybki lunch',
        transport: 'Metro (Camp Nou → Eixample) · ~10–15 min',
        desc: 'Tapas bar w Eixample. Carrer d\'Urgell lub Carrer del Consell de Cent (zanim drogi pełne są zamknięte). Można też wrócić do hotelu i zjeść w Gràcia.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '14:00 – 17:30',
        action: '🚴 Oglądanie Tour de France Etap 1',
        transport: 'Metro L3/L5 (→ Passeig de Gràcia) · ~10 min',
        desc: 'DARMOWE! Stań przy trasie. Opcje: A) Passeig de Gràcia (Metro L3, widok na Casa Batlló). B) Carrer de Mallorca przy Sagrada Família. Rowerzyści przejeżdżają falami przez 3+ godziny. Festynowa atmosfera, piwo przy trasie.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3917,2.1648',
        officialUrl: 'https://www.barcelona.cat/mobilitat/en/mobility-impacts-tour-france-2026/4-july-stage-1-time-trial',
        bookingUrl: null
      },
      {
        time: '17:30 – 19:00',
        action: 'Odpoczynek w hotelu',
        transport: 'Metro L3 (Passeig de Gràcia → Lesseps) · ~10 min',
        desc: 'Powrót metrem (L3 Passeig de Gràcia → Lesseps). Prysznic, odpoczynek — zasłużony po wielkim dniu.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '19:30',
        action: 'Metro do Barcelonety',
        transport: 'Metro L3 + L4 (Lesseps → Barceloneta) · ~22 min',
        desc: 'L3 Lesseps → Passeig de Gràcia → L4 → Barceloneta. Czas ok. 20 min.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '20:00 – 22:00',
        action: '🦐 KOLACJA — Can Ros lub Can Solé (owoce morza)',
        transport: 'Pieszo (stacja Barceloneta → restauracja) · ~5 min',
        desc: 'Najlepsza kolacja wyjazdu. Can Ros (od 1908, piąte pokolenie) lub Can Solé (od 1903). Paella owoce morza, świeże ryby. REZERWACJA KONIECZNA — zadzwoń 1–2 dni wcześniej.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3783,2.1864',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '22:00 – 22:45',
        action: 'Spacer przy morzu',
        desc: 'Barceloneta w sobotni wieczór. Promenada, widok na morze, powrót metrem.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3775,2.1901',
        officialUrl: null,
        bookingUrl: null
      }
    ],
    locations: [
      {
        name: 'Sagrada Família (zwiedzanie z zewnątrz)',
        type: 'Atrakcja — architektura Gaudíego',
        address: 'Carrer de Mallorca, 401, 08013 Barcelona',
        lat: 41.4036,
        lng: 2.1743,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4036,2.1743',
        officialUrl: 'https://sagradafamilia.org/',
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: 'darmowe (z zewnątrz)',
        timeOnSite: '30–45 min',
        notes: 'Bilety wstępu na lipiec 2026 wyprzedane (rok Gaudíego). Fasady i staw z odbiciem na Plaça de Gaudí robią ogromne wrażenie z zewnątrz. Sprawdzaj ewentualne zwroty na sagradafamilia.org bliżej terminu.'
      },
      {
        name: 'Casa Batlló (opcjonalne wnętrze Gaudíego)',
        type: 'Atrakcja — architektura (opcjonalna)',
        address: 'Passeig de Gràcia, 43, 08007 Barcelona',
        lat: 41.3917,
        lng: 2.1648,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3917,2.1648',
        officialUrl: 'https://www.casabatllo.es/en/',
        bookingUrl: 'https://www.casabatllo.es/en/online-tickets/',
        reservationRequired: true,
        estimatedCost: 'od €29/os.',
        timeOnSite: '1 – 1.5h',
        notes: 'Jeśli mimo wszystko chcecie wejść do wnętrza Gaudíego — to najefektowniejsza alternatywa dostępna online. Otwarte od 9:00; idźcie rano (Passeig de Gràcia bywa zamknięty po południu przez TdF 4 lipca).'
      },
      {
        name: 'Camp Nou — Barça Immersive Tour',
        type: 'Atrakcja — piłka nożna / muzeum',
        address: 'Av. de Joan XXIII, 1, 08001 Barcelona',
        lat: 41.3809,
        lng: 2.1228,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3809,2.1228',
        officialUrl: 'https://www.fcbarcelona.com/en/tickets/camp-nou-experience',
        bookingUrl: 'https://go.fcbarcelona.com/Museu/BarcaImmersiveTour/CampNouExperience/EN',
        reservationRequired: true,
        estimatedCost: '€36/os.',
        timeOnSite: 'max 1h (preferencja podróżników)',
        notes: 'Muzeum + pokaz 360° + widok na plac budowy. Szatnie i boisko zamknięte (remont do VIII 2026). Megastore FC Barcelona przy wejściu.'
      },
      {
        name: 'Passeig de Gràcia (TdF Stage 1)',
        type: 'Widowisko sportowe (darmowe)',
        address: 'Passeig de Gràcia, 08007 Barcelona',
        lat: 41.3917,
        lng: 2.1648,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3917,2.1648',
        officialUrl: 'https://www.barcelona.cat/mobilitat/en/mobility-impacts-tour-france-2026/4-july-stage-1-time-trial',
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: 'darmowe',
        timeOnSite: '2 – 3h',
        notes: 'Rowerzyści TdF przejeżdżają od ok. 14:00. Widok z Casa Batlló/Milà w tle. Przyjdź 30 min wcześniej po dobre miejsce.'
      },
      {
        name: 'Can Ros',
        type: 'Restauracja — owoce morza',
        address: 'Carrer del Almirall Aixada, 7, 08003 Barcelona',
        lat: 41.3783,
        lng: 2.1864,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3783,2.1864',
        officialUrl: null,
        bookingUrl: null,
        reservationRequired: true,
        estimatedCost: '€40–60/os.',
        timeOnSite: '1.5 – 2h',
        notes: 'Od 1908. Piąte pokolenie rodziny Cid. Paella, fideuà, świeże ryby. Zarezerwuj dzień przed.'
      },
      {
        name: 'Can Solé',
        type: 'Restauracja — owoce morza (alternatywa)',
        address: 'Carrer de Sant Carles, 4, 08003 Barcelona',
        lat: 41.3775,
        lng: 2.1877,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3775,2.1877',
        officialUrl: null,
        bookingUrl: null,
        reservationRequired: true,
        estimatedCost: '€40–60/os.',
        timeOnSite: '1.5 – 2h',
        notes: 'Instytucja od 1903. Ryż morski, owoce morza. Zarezerwuj dzień przed.'
      }
    ],
    contingency: 'Bilety do Sagrada Família się zwolniły? Sprawdź sagradafamilia.org — jeśli złapiesz slot, wejdź do środka zamiast Casa Batlló. Camp Nou zamknięty: Megastore + zdjęcia przy stadionie. TdF za tłoczne: wróć do hotelu, odpoczywaj, oglądaj retransmisję w barze. Can Ros/Solé pełne: MANÁ 75 (Passeig del Mare Nostrum, 19).'
  },
  {
    day: 4,
    date: '5 lipca 2026 (niedziela)',
    title: 'Ostatnie godziny — smak Barcelony na drogę',
    subtitle: 'Spokojna niedziela, plaża i pożegnanie',
    vibe: 'Lekki, niedziela w Gràcia, morze, ostatnie tapas, lotnisko',
    intensity: 'bardzo niska',
    steps: '6 000 – 10 000',
    cost: '€80 – €120 para',
    weather: '27–32°C. Lekki dzień — nie przemęczać się.',
    alert: '⚠️ TdF Etap 2 przyjeżdża do Barcelony: zamknięcia od 12:00. Metro L9 do lotniska — NIEZALEŻNE. Wyjazd z hotelu METRO o godz. 18:00 (lot 21:40). Targi (Boqueria, Santa Caterina) w niedzielę ZAMKNIĘTE.',
    schedule: [
      {
        time: '09:00 – 10:00',
        action: 'Śniadanie w hotelu',
        desc: 'Ostatnie śniadanie. Bez pośpiechu.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '10:00 – 11:30',
        action: 'Niedziela w Gràcia',
        desc: 'Spacer po spokojnej Gràcia. Plaça del Sol — kawa i słońce. Carrer de Verdi. Ewentualne zakupy — lokalne kosmetyki, delikatesy, pamiątki.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4028,2.1564',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '10:45 – 11:00',
        action: 'Check-out (do 11:00)',
        desc: 'Wymeldowanie do godz. 11:00 (oficjalna godzina). Zostaw bagaż w recepcji do wieczora.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '12:00 – 15:00 (OPCJA A)',
        action: '🏖️ Plaża Bogatell',
        transport: 'Metro L3 + L4 (Lesseps → Bogatell) · ~25 min',
        desc: 'Metro L3 Lesseps → Passeig de Gràcia → L4 → Bogatell (ok. 25 min). Spokojniejsza niż Barceloneta. Chiringuito (beach bar) po drodze. Pilnuj rzeczy!',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3968,2.2022',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '12:00 – 15:00 (OPCJA B)',
        action: 'Spacer Gràcia + zakupy',
        desc: 'Jeśli nie na plażę: spacer wokół dzielnicy, zakupy na Carrer Verdi, kawa, odpoczynek.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '15:00 – 17:00',
        action: 'Ostatni lunch / tapas',
        transport: 'Metro L4 + L3 (Bogatell → Lesseps) · ~25 min — lub pieszo, jeśli zostajecie w Gràci',
        desc: 'Sol Soler (Plaça del Sol, 21) lub Bar Bodega Quimet. Pożegnalne wino lub piwo. Czas się nie spieszyć, poczuć dzielnicę.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4028,2.1573',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '17:00',
        action: 'Zebranie bagażu z hotelu',
        desc: 'Odbiór z recepcji.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '17:30 – 18:00',
        action: 'Metro na lotnisko',
        transport: 'Metro L3 + L9 Sud (Lesseps → Zona Universitaria → Aeroport T2) · ~45–50 min',
        desc: 'L3 Lesseps → Zona Universitaria (4 przystanki) → przesiadka na L9 Sud → Airport T2 (Ryanair). Czas: ok. 45–50 min. BILET LOTNISKOWY L9: €5.90/os. (T-Casual NIE ważny!).',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.2966,2.0833',
        officialUrl: 'https://www.tmb.cat/',
        bookingUrl: null
      },
      {
        time: '18:45 – 19:30',
        action: 'Barcelona El Prat T2',
        desc: 'Check-in, odprawy, bezpieczeństwo. Ryanair wymaga check-inu min. 40 min przed.',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.2966,2.0833',
        officialUrl: null,
        bookingUrl: null
      },
      {
        time: '21:40',
        action: '✈️ Powrót do Krakowa — FR 3049',
        desc: 'Ryanair. Krótki lot ~2h 50 min. Lądowanie Kraków 00:30+1.',
        mapsUrl: null,
        officialUrl: null,
        bookingUrl: null
      }
    ],
    locations: [
      {
        name: 'Plaça del Sol',
        type: 'Plac publiczny / kawa',
        address: 'Plaça del Sol, Gràcia, 08012',
        lat: 41.4028,
        lng: 2.1564,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4028,2.1564',
        officialUrl: null,
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: 'kawa ok. €2–3',
        timeOnSite: '30–60 min',
        notes: 'Serce Gràcia. Kawiarnie dookoła. Niedziela rano = spokój.'
      },
      {
        name: 'Bogatell Beach',
        type: 'Plaża',
        address: 'Platja del Bogatell, 08005 Barcelona',
        lat: 41.3968,
        lng: 2.2022,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3968,2.2022',
        officialUrl: null,
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: 'darmowe',
        timeOnSite: '2 – 3h',
        notes: 'Spokojniejsza niż Barceloneta. Więcej lokalsów. Metro L4 Bogatell. Chiringuito na miejscu.'
      },
      {
        name: 'Sol Soler (pożegnalny drink / lunch)',
        type: 'Bar / tapas',
        address: 'Plaça del Sol, 21-22, 08012 Barcelona',
        lat: 41.4028,
        lng: 2.1573,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4028,2.1573',
        officialUrl: null,
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: '€15–25/os.',
        timeOnSite: '1 – 1.5h',
        notes: 'Pożegnalny drink/lunch przed wyjazdem na lotnisko.'
      },
      {
        name: 'Barcelona El Prat — Terminal 2 (Ryanair)',
        type: 'Lotnisko',
        address: 'El Prat de Llobregat, 08820 Barcelona',
        lat: 41.2966,
        lng: 2.0833,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.2966,2.0833',
        officialUrl: 'https://www.aena.es/en/barcelona-airport.html',
        bookingUrl: null,
        reservationRequired: false,
        estimatedCost: 'bilet L9: €5.90/os.',
        timeOnSite: '1.5 – 2h (check-in + odprawy)',
        notes: 'Metro L9 Sud. Wyjazd z hotelu ok. 17:30–18:00. Ryanair: check-in min. 40 min przed.'
      }
    ],
    contingency: 'TdF zamknięcia: metro L9 niezależne od dróg — spokojnie. Brak check-out na czas: zostawienie bagażu zazwyczaj możliwe. Za gorąco na plażę: zostań w Gràcia, kawiarnia. Brak energii na plażę: wypocznij przed lotem.'
  }
];

export const CHECKLIST = [
  {
    item: 'Sagrada Família — wstęp niedostępny (lipiec wyprzedany)',
    deadline: 'Sprawdzaj zwroty do ostatniej chwili',
    cost: 'zwiedzanie z zewnątrz: darmowe',
    status: 'Bez biletu',
    officialUrl: 'https://sagradafamilia.org/',
    bookingUrl: null,
    notes: 'Bilety wstępu na lipiec 2026 wyprzedane. Zwiedzamy fasady z zewnątrz (Plaça de Gaudí). Opcjonalnie wnętrze Gaudíego: Casa Batlló (pozycja niżej).'
  },
  {
    item: 'Casa Batlló — opcjonalne wnętrze Gaudíego (4 lipca rano)',
    deadline: 'Jeśli chcecie — 1–7 dni przed',
    cost: 'od €29/os. (€58+ para)',
    status: 'Opcjonalne',
    officialUrl: 'https://www.casabatllo.es/en/',
    bookingUrl: 'https://www.casabatllo.es/en/online-tickets/',
    notes: 'Najefektowniejsze wnętrze Gaudíego dostępne online. Idźcie rano — Passeig de Gràcia zamykany po południu (TdF).'
  },
  {
    item: 'Park Güell — bilety wejściowe (3 lipca, slot 10:00)',
    deadline: 'Min. 1–2 tygodnie przed. Warto teraz.',
    cost: '€18/os. (€36 para)',
    status: 'Do rezerwacji',
    officialUrl: 'https://parkguell.barcelona/',
    bookingUrl: 'https://parkguell.barcelona/en/buy-tickets',
    notes: 'Limit 1400 osób/godz. Tylko online. Slot 9:30 lub 10:00.'
  },
  {
    item: 'Camp Nou — Barça Immersive Tour (4 lipca, ok. 12:15)',
    deadline: '1–7 dni przed',
    cost: '€36/os. (€72 para)',
    status: 'Do rezerwacji',
    officialUrl: 'https://www.fcbarcelona.com/en/tickets/camp-nou-experience',
    bookingUrl: 'https://go.fcbarcelona.com/Museu/BarcaImmersiveTour/CampNouExperience/EN',
    notes: 'Muzeum + 360° + widok na plac budowy. Pełny tour (szatnie) od VIII 2026.'
  },
  {
    item: 'Kolacja — Can Ros lub Can Solé (4 lipca, godz. 20:00)',
    deadline: '1–3 dni przed — telefon lub online',
    cost: '~€40–60/os. (~€80–120 para)',
    status: 'Do rezerwacji',
    officialUrl: null,
    bookingUrl: null,
    notes: 'Can Ros: Carrer del Almirall Aixada, 7. Can Solé: Carrer de Sant Carles, 4. Zadzwoń lub zajrzyj osobiście. W sobotni wieczór Barceloneta jest pełna.'
  },
  {
    item: 'Aerobús A2 — transfer z lotniska (2 lipca)',
    deadline: 'Na miejscu lub online',
    cost: '€11/os. (€22 para)',
    status: 'Do zakupu',
    officialUrl: 'https://www.aerobusbarcelona.es/',
    bookingUrl: 'https://www.aerobusbarcelona.es/',
    notes: 'Terminal 2 → Plaça Catalunya. Można zapłacić kartą na miejscu.'
  },
  {
    item: 'T-Casual — karty komunikacji miejskiej x2',
    deadline: 'Na miejscu (kasy automatyczne metra)',
    cost: '€13/os. (€26 para)',
    status: 'Do zakupu na miejscu',
    officialUrl: 'https://www.tmb.cat/en/barcelona-fares-metro-bus/t-casual',
    bookingUrl: null,
    notes: '10 przejazdów / karta. Ważna na metro, bus, FGC. NIE na L9 lotnisko.'
  },
  {
    item: 'Bilet lotniskowy L9 Sud x2 (5 lipca — powrót)',
    deadline: 'Na miejscu (kasy automatyczne metra)',
    cost: '€5.90/os. (€11.80 para)',
    status: 'Do zakupu na miejscu',
    officialUrl: 'https://www.tmb.cat/',
    bookingUrl: null,
    notes: 'Osobny bilet — T-Casual nie jest ważny na stacje Airport T1/T2.'
  },
  {
    item: 'Ubezpieczenie podróżne',
    deadline: 'Przed wylotem (2 lipca)',
    cost: '~€20–40 para',
    status: 'Do zakupu',
    officialUrl: null,
    bookingUrl: null,
    notes: 'EKUZ (karta UE — obowiązkowo zabrać) + ewentualnie dodatkowe ubezpieczenie bagażu/kosztów leczenia.'
  },
  {
    item: 'Nocleg Residencia Erasmus Gràcia',
    deadline: 'ZAREZERWOWANE',
    cost: 'w cenie wyjazdu',
    status: 'Zarezerwowane',
    officialUrl: 'https://www.residenciaerasmusgracia.com/en/',
    bookingUrl: 'https://www.booking.com/hotel/es/residencia-erasmus.en-gb.html',
    notes: 'Śniadanie zarezerwowane. Potwierdzić godziny check-in i możliwość przechowania bagażu w Dniu 4.'
  },
  {
    item: 'Boarding pass Ryanair (oba loty)',
    deadline: '24 godziny przed lotem',
    cost: 'w cenie biletu',
    status: 'Do check-inu online',
    officialUrl: 'https://www.ryanair.com/',
    bookingUrl: null,
    notes: 'FR 3050 (2/7) i FR 3049 (5/7). Check-in online 24h–2h przed. Pobierz na telefon.'
  }
];

export const KEY_LOCATIONS = {
  hotel: { name: 'Residencia Erasmus Gràcia', lat: 41.4049, lng: 2.1558 },
  sagradaFamilia: { name: 'Sagrada Família', lat: 41.4036, lng: 2.1743 },
  parkGuell: { name: 'Park Güell', lat: 41.4138, lng: 2.1527 },
  campNou: { name: 'Camp Nou', lat: 41.3809, lng: 2.1228 },
  casaBatllo: { name: 'Casa Batlló', lat: 41.3917, lng: 2.1648 },
  casaMila: { name: 'Casa Milà / La Pedrera', lat: 41.3953, lng: 2.1614 },
  gothicCathedral: { name: 'Katedra Barcelońska', lat: 41.3837, lng: 2.1764 },
  placeReial: { name: 'Plaça Reial', lat: 41.3800, lng: 2.1749 },
  santaMariaMar: { name: 'Santa Maria del Mar', lat: 41.3844, lng: 2.1821 },
  mercatSantaCaterina: { name: 'Mercat de Santa Caterina', lat: 41.3846, lng: 2.1769 },
  barceloneta: { name: 'Barceloneta Beach', lat: 41.3775, lng: 2.1901 },
  bogatell: { name: 'Bogatell Beach', lat: 41.3968, lng: 2.2022 },
  magicFountain: { name: 'Fontanna Magiczna Montjuïc', lat: 41.3716, lng: 2.1528 },
  bunkersDelCarmel: { name: 'Bunkers del Carmel', lat: 41.4205, lng: 2.1567 },
  placeDelSol: { name: 'Plaça del Sol (Gràcia)', lat: 41.4028, lng: 2.1564 },
  canRos: { name: 'Can Ros', lat: 41.3783, lng: 2.1864 },
  canSole: { name: 'Can Solé', lat: 41.3775, lng: 2.1877 },
  barBodegaQuimet: { name: 'Bar Bodega Quimet', lat: 41.4012, lng: 2.1612 },
  airport: { name: 'Barcelona El Prat T2', lat: 41.2966, lng: 2.0833 }
};
