/* ------------------------------------------------------------------ *
 *  Barcelona — Hiszpański survival
 *  „Nie uczymy się hiszpańskiego — uczymy się 12 klocków LEGO."
 * ------------------------------------------------------------------ */

// Złota Dwunastka — 12 zwrotów, które realnie wystarczą.
export const PHRASES = [
  { pl: 'Cześć', es: 'Hola', pron: 'O-la', mnemo: 'Wpadasz do baru i śpiewasz operowo: „Oooo-laaa!”', use: '¡Hola!' },
  { pl: 'Proszę', es: 'Por favor', pron: 'por fa-WOR', mnemo: 'Robisz minę księcia: „Zrób mi favor, królu”.', use: '…, por favor.' },
  { pl: 'Dziękuję', es: 'Gracias', pron: 'GRA-sjas', mnemo: 'Kłaniasz się z gracją baletnicy: „Graaacja, señor!”', use: '¡Gracias!' },
  { pl: 'Przepraszam', es: 'Perdón', pron: 'per-DON', mnemo: 'Potrącasz kelnera: „Pardon, Don Pedro!”', use: 'Perdón…' },
  { pl: 'Chcę', es: 'Quiero', pron: 'KJE-ro', mnemo: 'Dziecko tupie nogą: „KJE-ro! Chcę i już!”', use: 'Quiero café.' },
  { pl: 'Potrzebuję', es: 'Necesito', pron: 'ne-se-SI-to', mnemo: 'Siedzisz na walizce dramatycznie: „Nie se sit-o! Potrzebuję!”', use: 'Necesito ayuda.' },
  { pl: 'To / tamto', es: 'Esto', pron: 'ES-to', mnemo: 'Wskazujesz palcem w menu: „ES-to! Właśnie to!”', use: 'Quiero esto.' },
  { pl: 'Woda', es: 'Agua', pron: 'A-gła', mnemo: 'Pijesz i wzdychasz: „Aaaa, gładko weszła”.', use: 'Agua, por favor.' },
  { pl: 'Kawa', es: 'Café', pron: 'ka-FE', mnemo: 'Kawa daje ci „feee-ver energii”.', use: 'Un café.' },
  { pl: 'Rachunek', es: 'La cuenta', pron: 'la KŁEN-ta', mnemo: 'Twoje konto płacze: „Kłęta! Znowu rachunek!”', use: 'La cuenta, por favor.' },
  { pl: 'Gdzie jest…?', es: '¿Dónde está…?', pron: 'DON-de es-TA', mnemo: 'Don Pedro zgubił hotel: „Donde está mój hotel?!”', use: '¿Dónde está el baño?' },
  { pl: 'Ile kosztuje?', es: '¿Cuánto cuesta?', pron: 'KŁAN-to KŁES-ta', mnemo: 'Kłaniasz się cenie z szacunkiem: „Kłanto kłesta?!”', use: '¿Cuánto cuesta?' },
];

// Bonus awaryjny — trzy zwroty, które ratują z każdej sytuacji.
export const EMERGENCY = [
  { pl: 'Nie rozumiem', es: 'No entiendo', pron: 'no en-TJEN-do', mnemo: 'Mina zagubionego turysty: „No en-tien-do nic!”' },
  { pl: 'Pomocy', es: 'Ayuda', pron: 'a-JU-da', mnemo: 'Krzyczysz: „Ajuda! Judyta, ratuj!”' },
  { pl: 'Mówi Pan/Pani po angielsku?', es: '¿Habla inglés?', pron: 'A-bla in-GLES', mnemo: 'Wskazujesz rozmówcę z nadzieją w oczach: „Inglés?”' },
];

// Trzy formuły, które łączą wszystkie klocki.
export const FORMULAS = [
  {
    n: 1,
    title: 'Zamawianie',
    pattern: 'Hola + (rzecz) + por favor',
    example: 'Hola, agua, por favor.',
    examplePl: 'Cześć, wodę proszę.',
    note: 'Wystarczy na bar, kawiarnię i większość zakupów.',
  },
  {
    n: 2,
    title: 'Wskazywanie palcem',
    pattern: 'Quiero + esto',
    example: 'Quiero esto, por favor.',
    examplePl: 'Chcę to, proszę.',
    note: 'Działa na każde menu i każdą półkę — nie musisz znać nazw.',
  },
  {
    n: 3,
    title: 'Ratunek',
    pattern: 'Perdón + no entiendo + ayuda',
    example: 'Perdón, no entiendo. Ayuda, por favor.',
    examplePl: 'Przepraszam, nie rozumiem. Pomocy, proszę.',
    note: 'Zdanie-scyzoryk na każdą stresową sytuację.',
  },
];

// Jedno zdanie uniwersalne — awaryjny scyzoryk.
export const UNIVERSAL = {
  es: 'Hola. Perdón. No entiendo. Necesito ayuda, por favor. Gracias.',
  pl: 'Cześć. Przepraszam. Nie rozumiem. Potrzebuję pomocy, proszę. Dziękuję.',
};

// Scenki do zapamiętania — 6 realnych sytuacji w Barcelonie.
export const SCENES = [
  {
    id: 'cafe',
    icon: 'Coffee',
    title: 'Kawiarnia',
    goal: 'Kupić kawę i wodę',
    lines: [
      { es: 'Hola. Un café, por favor.', pl: 'Cześć. Kawę, proszę.' },
      { es: 'Agua, por favor.', pl: 'Wodę, proszę.' },
      { es: 'La cuenta, por favor. Gracias.', pl: 'Rachunek, proszę. Dziękuję.' },
    ],
    image: 'W jednej ręce café, w drugiej agua, a twoje konto płacze: „La kłęta! Znowu rachunek!”',
  },
  {
    id: 'restauracja',
    icon: 'Utensils',
    title: 'Restauracja',
    goal: 'Wejść, zamówić, zapłacić',
    lines: [
      { es: 'Hola. Por favor.', pl: 'Cześć. Proszę.' },
      { es: 'Quiero esto.', pl: 'Chcę to. (pokazujesz palcem w menu)' },
      { es: 'Agua, por favor.', pl: 'Wodę, proszę.' },
      { es: 'La cuenta, por favor.', pl: 'Rachunek, proszę.' },
    ],
    image: 'Nie musisz znać nazw dań. Wystarczy „Quiero esto” i palec w menu.',
  },
  {
    id: 'sklep',
    icon: 'ShoppingBag',
    title: 'Sklep / targ',
    goal: 'Zapytać o cenę',
    lines: [
      { es: 'Hola. ¿Cuánto cuesta?', pl: 'Cześć. Ile kosztuje?' },
      { es: 'Quiero esto, por favor.', pl: 'Chcę to, proszę. (jeśli bierzesz)' },
      { es: 'No, gracias.', pl: 'Nie, dziękuję. (jeśli nie bierzesz)' },
    ],
    image: 'Stoisz przed ceną 99 €, kłaniasz się jej dramatycznie: „¿Cuánto cuesta?! Co to za kosmiczna kwota?”',
  },
  {
    id: 'ulica',
    icon: 'Navigation',
    title: 'Metro / ulica',
    goal: 'Zapytać, gdzie coś jest',
    lines: [
      { es: 'Perdón. ¿Dónde está el metro?', pl: 'Przepraszam. Gdzie jest metro?' },
      { es: '¿Dónde está el baño?', pl: 'Gdzie jest toaleta?' },
      { es: '¿Dónde está la Sagrada Familia?', pl: 'Gdzie jest Sagrada Família?' },
    ],
    image: 'Widzisz eleganckiego Hiszpana w kapeluszu — to Don Pedro. Pytasz: „¿Dónde está…?”',
  },
  {
    id: 'hotel',
    icon: 'BedDouble',
    title: 'Hotel',
    goal: 'Powiedzieć, że czegoś potrzebujesz',
    lines: [
      { es: 'Hola. Necesito ayuda.', pl: 'Cześć. Potrzebuję pomocy.' },
      { es: 'Necesito agua.', pl: 'Potrzebuję wody.' },
      { es: 'Necesito un taxi.', pl: 'Potrzebuję taksówki.' },
    ],
    image: 'Leżysz dramatycznie na walizce i jęczysz: „Necesitooo… nie se sit-o, bo czegoś potrzebuję!”',
  },
  {
    id: 'awaria',
    icon: 'LifeBuoy',
    title: 'Awaria / stres',
    goal: 'Wybrnąć, gdy nie rozumiesz',
    lines: [
      { es: 'Perdón. No entiendo.', pl: 'Przepraszam. Nie rozumiem.' },
      { es: 'Ayuda, por favor.', pl: 'Pomocy, proszę.' },
      { es: '¿Habla inglés?', pl: 'Czy mówi Pan/Pani po angielsku?' },
    ],
    image: 'Wersja minimum, która ratuje każdą sytuację: „Perdón. No entiendo. Ayuda, por favor.”',
  },
];

// Trening 3-minutowy — odgrywany na głos.
export const TRAINING = [
  {
    round: 'Runda 1 — bar',
    lines: ['Hola.', 'Un café, por favor.', 'Agua, por favor.', 'La cuenta, por favor.', 'Gracias.'],
  },
  {
    round: 'Runda 2 — sklep',
    lines: ['Hola.', '¿Cuánto cuesta?', 'Quiero esto, por favor.', 'Gracias.'],
  },
  {
    round: 'Runda 3 — ulica',
    lines: ['Perdón.', '¿Dónde está el metro?', 'No entiendo.', 'Ayuda, por favor.'],
  },
];

// Najmniejsza możliwa ściąga — do druku / na ekran blokady.
export const CHEATSHEET = [
  ['Hola', 'cześć'],
  ['Por favor', 'proszę'],
  ['Gracias', 'dziękuję'],
  ['Perdón', 'przepraszam'],
  ['Quiero', 'chcę'],
  ['Necesito', 'potrzebuję'],
  ['Esto', 'to'],
  ['Agua', 'woda'],
  ['Café', 'kawa'],
  ['La cuenta', 'rachunek'],
  ['¿Dónde está…?', 'gdzie jest…?'],
  ['¿Cuánto cuesta?', 'ile kosztuje?'],
  ['Ayuda', 'pomocy'],
  ['No entiendo', 'nie rozumiem'],
];
