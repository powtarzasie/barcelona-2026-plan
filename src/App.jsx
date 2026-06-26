import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Calendar,
  Sun,
  Sunset,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Train,
  Bus,
  Plane,
  Utensils,
  Map as MapIcon,
  Wallet,
  ShoppingBag,
  Heart,
  Trophy,
  Ticket,
  ExternalLink,
  Waves,
  Footprints,
  ShieldAlert,
  Flame,
  Users,
  Route,
  PlayCircle,
} from 'lucide-react';
import { TRIP_META, ITINERARY, CHECKLIST } from './data/itinerary.js';

/* ----------------------------- Helpers / atoms ---------------------------- */

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 rounded-md p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
      title="Skopiuj nazwę"
      aria-label={`Skopiuj nazwę: ${text}`}
    >
      {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
    </button>
  );
}

const PILL_TONES = {
  map: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
  official: 'bg-stone-100 text-stone-700 hover:bg-stone-200',
  book: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
};

function LinkPill({ href, icon: Icon, label, tone = 'map' }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${PILL_TONES[tone]}`}
    >
      <Icon size={13} /> {label}
    </a>
  );
}

function SectionHeader({ icon: Icon, title, subtitle, light = false }) {
  return (
    <div className="mb-8 text-center sm:text-left">
      <div className="mb-2 flex items-center justify-center gap-3 sm:justify-start">
        {Icon ? <Icon className={`h-7 w-7 ${light ? 'text-amber-400' : 'text-amber-700'}`} /> : null}
        <h2 className={`font-serif text-3xl ${light ? 'text-white' : 'text-stone-800'}`}>{title}</h2>
      </div>
      {subtitle ? (
        <p className={`max-w-2xl text-base leading-relaxed ${light ? 'text-stone-300' : 'text-stone-500'}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------- Day card --------------------------------- */

function ScheduleItem({ slot }) {
  return (
    <div className="relative">
      <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-4 border-[#FDFBF7] bg-amber-500" />
      <div className="mb-1 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
        <span className="min-w-[120px] whitespace-nowrap text-sm font-semibold text-stone-500">{slot.time}</span>
        <span className="font-bold text-stone-800">{slot.action}</span>
      </div>
      <p className="text-sm leading-relaxed text-stone-600">{slot.desc}</p>
      {slot.transport && (
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
          <Route size={13} className="shrink-0" />
          <span>Dojazd: {slot.transport}</span>
        </div>
      )}
      {(slot.mapsUrl || slot.bookingUrl || slot.officialUrl) && (
        <div className="mt-2 flex flex-wrap gap-2">
          <LinkPill href={slot.mapsUrl} icon={MapIcon} label="Mapa" tone="map" />
          <LinkPill href={slot.bookingUrl} icon={Ticket} label="Bilety" tone="book" />
          <LinkPill href={slot.officialUrl} icon={ExternalLink} label="Strona" tone="official" />
        </div>
      )}
    </div>
  );
}

function LocationCard({ loc }) {
  return (
    <li className="border-b border-stone-100 pb-4 last:border-0 last:pb-0">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <span className="mb-0.5 block text-xs text-stone-400">{loc.type}</span>
          <span className="block text-sm font-semibold leading-snug text-stone-800">{loc.name}</span>
          {loc.address ? <span className="mt-0.5 block text-xs text-stone-500">{loc.address}</span> : null}
        </div>
        <CopyButton text={loc.name} />
      </div>

      {(loc.estimatedCost || loc.timeOnSite) && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
          {loc.estimatedCost ? (
            <span className="inline-flex items-center gap-1">
              <Wallet size={12} className="text-blue-500" /> {loc.estimatedCost}
            </span>
          ) : null}
          {loc.timeOnSite ? (
            <span className="inline-flex items-center gap-1">
              <Clock size={12} className="text-amber-600" /> {loc.timeOnSite}
            </span>
          ) : null}
        </div>
      )}

      {loc.reservationRequired ? (
        <span className="mt-2 inline-block rounded bg-red-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-red-600">
          Wymaga rezerwacji
        </span>
      ) : null}

      {loc.notes ? <p className="mt-2 text-xs italic leading-relaxed text-stone-500">{loc.notes}</p> : null}

      <div className="mt-2.5 flex flex-wrap gap-2">
        <LinkPill href={loc.mapsUrl} icon={MapIcon} label="Otwórz mapę" tone="map" />
        <LinkPill href={loc.officialUrl} icon={ExternalLink} label="Oficjalna strona" tone="official" />
        <LinkPill href={loc.bookingUrl} icon={Ticket} label="Zarezerwuj" tone="book" />
      </div>
    </li>
  );
}

function DayCard({ day, isOpen, toggleOpen }) {
  return (
    <div
      className={`mb-5 overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen ? 'border-amber-200 shadow-md' : 'border-stone-200 shadow-sm hover:shadow-md'
      }`}
    >
      <button
        onClick={toggleOpen}
        aria-expanded={isOpen}
        className="flex w-full flex-col justify-between gap-4 bg-white p-5 text-left sm:flex-row sm:items-center sm:p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full border border-stone-100 bg-stone-50 font-serif text-amber-800 shadow-inner">
            <span className="text-[10px] font-semibold uppercase tracking-wider">Dzień</span>
            <span className="text-xl font-bold leading-none">{day.day}</span>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-stone-400">{day.date}</p>
            <h3 className="font-serif text-xl text-stone-800 sm:text-2xl">{day.title}</h3>
            {day.subtitle ? <p className="mt-0.5 text-sm text-stone-500">{day.subtitle}</p> : null}
          </div>
        </div>
        <div className="self-end rounded-full bg-stone-50 p-2 text-stone-400 sm:self-center">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-stone-100 bg-[#FDFBF7] p-5 sm:p-8">
          {day.alert && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
              <AlertTriangle className="mt-0.5 shrink-0 text-red-600" size={20} />
              <p className="text-sm font-medium leading-relaxed text-red-800">{day.alert}</p>
            </div>
          )}

          <div className="mb-8 grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
              <Heart className="shrink-0 text-amber-600 opacity-70" />
              <div>
                <p className="mb-0.5 text-xs uppercase tracking-wider text-stone-400">Klimat dnia</p>
                <p className="font-medium text-stone-800">{day.vibe}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
              <Footprints className="shrink-0 text-emerald-600 opacity-70" />
              <div>
                <p className="mb-0.5 text-xs uppercase tracking-wider text-stone-400">Aktywność</p>
                <p className="font-medium text-stone-800">
                  {day.intensity} · {day.steps} kroków
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
              <Wallet className="shrink-0 text-blue-600 opacity-70" />
              <div>
                <p className="mb-0.5 text-xs uppercase tracking-wider text-stone-400">Szacunkowy budżet</p>
                <p className="font-medium text-stone-800">{day.cost}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h4 className="mb-6 flex items-center gap-2 font-serif text-lg text-stone-800">
                <Clock size={20} className="text-amber-700" />
                Harmonogram
              </h4>
              <div className="relative space-y-6 border-l-2 border-stone-200 pl-6">
                {day.schedule.map((slot, idx) => (
                  <ScheduleItem key={idx} slot={slot} />
                ))}
              </div>
            </div>

            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-stone-400">
                  <MapPin size={16} /> Lokalizacje
                </h4>
                <ul className="space-y-4">
                  {day.locations.map((loc, idx) => (
                    <LocationCard key={idx} loc={loc} />
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-dashed border-stone-300 bg-stone-100/70 p-5">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-stone-500">
                  <AlertTriangle size={16} /> Plan B
                </h4>
                {day.weather ? (
                  <p className="mb-3 border-b border-stone-200/60 pb-3 text-xs italic text-stone-500">
                    Pogoda: {day.weather}
                  </p>
                ) : null}
                <p className="text-sm leading-relaxed text-stone-600">{day.contingency}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Static content ---------------------------- */

const PILLARS = [
  {
    icon: MapPin,
    color: 'text-amber-600',
    title: 'Gaudí i architektura',
    text: 'Sagrada Família z zewnątrz (wstęp na lipiec wyprzedany), Park Güell od środka rano, fasady Casa Batlló i La Pedrera. Bez muzealnego maratonu.',
  },
  {
    icon: Utensils,
    color: 'text-red-600',
    title: 'Tapas i lokalny rytm',
    text: 'Proste, smaczne, lokalne. Tapas w Gràci, targ Santa Caterina, owoce morza w Barcelonecie. Bez gwiazdek Michelin.',
  },
  {
    icon: Waves,
    color: 'text-blue-600',
    title: 'Morze i odpoczynek',
    text: 'Okno sjesty w upalne popołudnia i spokojniejsza plaża Bogatell zamiast zatłoczonej Barcelonety.',
  },
  {
    icon: Trophy,
    color: 'text-rose-700',
    title: 'Piłkarski akcent',
    text: 'Camp Nou — Barça Immersive Tour i Megastore. Maksymalnie godzina, dokładnie tak, jak chcieliście.',
  },
  {
    icon: Sunset,
    color: 'text-orange-600',
    title: 'Spokojny wieczór',
    text: 'Wieczorne spacery po Gràci, drink na Plaça del Sol, fontanna na Montjuïc — bez presji i bez pędu.',
  },
  {
    icon: ShieldAlert,
    color: 'text-emerald-600',
    title: 'Bezpieczna logistyka',
    text: 'Metro zamiast taksówek w dni Tour de France, bufory czasowe i spokojny dojazd na późny lot powrotny.',
  },
];

const RISKS = [
  {
    icon: Trophy,
    title: 'Tour de France (4–5 lipca)',
    text: 'Zamknięcia ulic od 12:00, pełne od 13:30. Metro działa normalnie (+40% kursów). Sagrada Família i Camp Nou robimy przed południem. Na lotnisko 5 lipca: metro L9 — niezależne od dróg.',
  },
  {
    icon: Flame,
    title: 'Upał (28–34°C)',
    text: 'Zwiedzanie rano (do 13:00) i po 17:00. Sjesta 13:00–17:00 w hotelu. Woda z Mercadony, nakrycie głowy, krem SPF 50.',
  },
  {
    icon: Users,
    title: 'Tłumy i kolejki',
    text: 'Bilety z timelotem na Sagrada Família i Park Güell = brak kolejki. Targ Santa Caterina zamiast Boqueria, plaża Bogatell zamiast Barcelonety.',
  },
  {
    icon: Ticket,
    title: 'Brak biletów',
    text: 'Sagrada Família w 2026 (rok Gaudíego) wyprzedaje się tygodniami — kup natychmiast. Brak biletu = darmowy widok fasady lub Bunkers del Carmel.',
  },
  {
    icon: Plane,
    title: 'Opóźnienie lotu',
    text: 'Lot powrotny o 21:40 daje duży bufor. Pierwszego dnia plan jest lekki, więc opóźnienie przylotu nic nie psuje.',
  },
  {
    icon: ShieldAlert,
    title: 'Kieszonkowcy',
    text: 'La Rambla, metro i plaża — torba z przodu, telefon schowany po zdjęciu, gotówka podzielona. Gràcia (hotel) jest spokojna i bezpieczna.',
  },
];

const FOOD = [
  {
    name: 'Bar Bodega Quimet',
    tag: 'Tapas w Gràci · Dzień 1/2',
    reservation: false,
    text: 'Pokoleniowe, autentyczne katalońskie tapas bez turystycznej atmosfery. Przyjdź wcześnie lub późno — bez rezerwacji.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4012,2.1612',
    bookingUrl: null,
  },
  {
    name: 'El Xampanyet',
    tag: 'Cava i tapas · El Born · Dzień 2',
    reservation: false,
    text: 'Kultowy bar przy Carrer de Montcada. Domowa cava i klasyczne tapas. Bywa kolejka — to część rytuału.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3850,2.1820',
    bookingUrl: null,
  },
  {
    name: 'Can Ros / Can Solé',
    tag: 'Owoce morza · Barceloneta · Dzień 3',
    reservation: true,
    text: 'Wyjątkowa kolacja wyjazdu. Rodzinne instytucje od 1903–1908: paella, fideuà, świeże ryby. Rezerwacja konieczna 1–2 dni wcześniej.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3783,2.1864',
    bookingUrl: null,
  },
  {
    name: 'Mercat de Santa Caterina',
    tag: 'Targ lokalny · Dzień 2',
    reservation: false,
    text: 'Mniej turystyczny niż La Boqueria, z falistą kolorową dachówką. Świeże produkty i bar Joan w środku. Uwaga: w niedzielę zamknięty.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3846,2.1769',
    bookingUrl: null,
  },
];

const ESCAPES = [
  {
    name: 'Bogatell Beach',
    tag: 'Spokojniejsza plaża',
    text: 'Trzy przystanki dalej niż Barceloneta (metro L4), więcej lokalsów, mniej tłumów i kieszonkowców. Chiringuito na miejscu. Idealna na popołudniowy reset.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3968,2.2022',
  },
  {
    name: 'Bunkers del Carmel',
    tag: 'Punkt widokowy 360° · romantyczny moment',
    text: 'Najlepsza panorama Barcelony — darmowa. Najpiękniej w złotym świetle przed zamknięciem (latem ok. 19:30). Dojazd: metro L4 do Alfons X + spacer pod górę.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.4205,2.1567',
  },
  {
    name: 'Fontanna Magiczna Montjuïc',
    tag: 'Wieczorny spektakl · darmowy',
    text: 'Pokaz muzyczno-świetlny u podnóża Montjuïc. Latem śr.–niedz. od ok. 21:00. Najlepiej 3 lipca (piątek) — bez komplikacji Tour de France. Metro L3 do Espanya.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.3716,2.1528',
  },
];

const STATUS_TONES = {
  'Do rezerwacji': 'bg-red-100 text-red-700',
  'Do zakupu': 'bg-amber-100 text-amber-700',
  'Do zakupu na miejscu': 'bg-amber-100 text-amber-700',
  'Do check-inu online': 'bg-amber-100 text-amber-700',
  'Bez biletu': 'bg-stone-200 text-stone-600',
  Opcjonalne: 'bg-blue-100 text-blue-700',
  Zarezerwowane: 'bg-emerald-100 text-emerald-700',
};

/* --------------------------------- App ------------------------------------ */

export default function App() {
  const [expandedDays, setExpandedDays] = useState(ITINERARY.map((d) => d.day));

  const toggleDay = (dayId) => {
    setExpandedDays((prev) =>
      prev.includes(dayId) ? prev.filter((id) => id !== dayId) : [...prev, dayId]
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800">
      {/* HERO */}
      <header className="relative flex min-h-[78vh] w-full flex-col items-center justify-center overflow-hidden bg-stone-900 p-6 text-center text-stone-50">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-900 via-stone-900/40 to-stone-900/70" />
          <img
            src="https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=2000"
            alt="Lotnicza panorama Barcelony — dzielnica Eixample z Sagrada Família w centrum"
            className="h-full w-full scale-105 object-cover"
          />
        </div>

        <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="block h-px w-12 bg-amber-400/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              2 – 5 lipca 2026
            </span>
            <span className="block h-px w-12 bg-amber-400/60" />
          </div>
          <h1 className="mb-6 font-serif text-5xl font-medium leading-tight drop-shadow-md md:text-7xl">
            Barcelona <i className="font-light text-amber-300/90">dla Dwojga</i>
          </h1>
          <p className="mb-9 max-w-2xl text-lg font-light leading-relaxed text-stone-200 md:text-xl">
            Zaległa podróż sprzed 21 lat. Gaudí, tapas, morze i piłkarski akcent — ułożone tak,
            żeby było spokojnie, smacznie i bez logistycznego chaosu w lipcowym upale.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm font-medium">
            {[
              { icon: MapPin, label: 'Gaudí i morze' },
              { icon: Utensils, label: 'Tapas i lokalny rytm' },
              { icon: Trophy, label: 'Piłkarski akcent' },
              { icon: CheckCircle, label: 'Bez tarcia organizacyjnego' },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 rounded-full border border-stone-600 bg-stone-800/70 px-4 py-2 backdrop-blur"
              >
                <Icon size={16} className="text-amber-400" /> {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-24 px-4 py-16 sm:px-6">
        {/* FILOZOFIA */}
        <section>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <SectionHeader
                title="Filozofia wyjazdu"
                subtitle="Mniej zaliczania atrakcji, więcej wspólnego przeżywania miasta."
              />
              <p className="mb-5 leading-relaxed text-stone-600">
                To plan dla małżeństwa bez dzieci, które wraca do Barcelony po 21 latach. Nie robimy
                maratonu zabytków — każdy dzień ma <i>jedną główną kotwicę</i> i codzienny moment
                oddechu. Sagrada Família, Park Güell i Camp Nou są tu dlatego, że sami je wskazaliście.
              </p>
              <p className="mb-5 leading-relaxed text-stone-600">
                Lipiec to upał i tłumy, dlatego rytm jest prosty: zwiedzanie rano, sjesta lub morze w
                najgorętszych godzinach, wieczór na spacer i dobre jedzenie. Późny lot powrotny (21:40)
                pozwala przeznaczyć ostatni dzień na spokój, a nie na pośpiech.
              </p>
              <p className="leading-relaxed text-stone-600">
                Bonus, którego nie było w planach z 2005 roku:{' '}
                <strong className="text-stone-800">Tour de France 2026 startuje z Barcelony</strong>{' '}
                właśnie w te dni — darmowe widowisko, które wpięliśmy w plan zamiast z nim walczyć.
              </p>
            </div>
            <div className="rounded-3xl border border-amber-100 bg-amber-50 p-8 shadow-inner">
              <h3 className="mb-6 flex items-center gap-3 font-serif text-xl text-stone-800">
                <CheckCircle className="text-amber-600" />
                Dane wyjazdu
              </h3>
              <ul className="space-y-3 text-sm text-stone-700">
                <li className="flex justify-between gap-4 border-b border-amber-100 pb-2">
                  <span className="text-stone-500">Para</span>
                  <span className="text-right font-medium">{TRIP_META.participants}</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-amber-100 pb-2">
                  <span className="text-stone-500">Przylot</span>
                  <span className="text-right font-medium">2 lipca, 09:50 · FR 3050</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-amber-100 pb-2">
                  <span className="text-stone-500">Powrót</span>
                  <span className="text-right font-medium">5 lipca, 21:40 · FR 3049</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-amber-100 pb-2">
                  <span className="text-stone-500">Nocleg</span>
                  <span className="text-right font-medium">Residencia Erasmus, Gràcia</span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="text-stone-500">Baza</span>
                  <a
                    href={TRIP_META.accommodation.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-amber-700 hover:text-amber-800"
                  >
                    <MapPin size={13} /> Metro Lesseps · 200 m
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FILARY */}
        <section>
          <SectionHeader
            title="Główne filary wyjazdu"
            subtitle="Sześć rzeczy, wokół których zbudowany jest cały plan."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map(({ icon: Icon, color, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <Icon className={`mb-4 h-8 w-8 ${color}`} />
                <h3 className="mb-2 font-serif text-lg text-stone-800">{title}</h3>
                <p className="text-sm leading-relaxed text-stone-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MAPA TRASY */}
        <section>
          <SectionHeader
            icon={MapIcon}
            title="Mapa trasy"
            subtitle="Cała trasa i 20 ponumerowanych punktów — dzień po dniu, z lotniskiem i transferami."
          />
          <a
            href="trasa-barcelona.jpg"
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <img
              src="trasa-barcelona.jpg"
              alt="Mapa Barcelony z trasą wyjazdu i 20 ponumerowanymi punktami pogrupowanymi według dni"
              className="mx-auto block w-full max-w-2xl"
              loading="lazy"
              width="1054"
              height="1492"
            />
          </a>
          <p className="mt-3 text-center text-sm text-stone-500">
            Kliknij mapę, aby otworzyć w pełnym rozmiarze.
          </p>
        </section>

        {/* ROZKŁAD DNI */}
        <section id="plan">
          <SectionHeader
            icon={Calendar}
            title="Rozkład dni"
            subtitle="Cztery dni Barcelony. Każdy z jedną kotwicą, oknem oddechu i planem B. Kliknij dzień, aby rozwinąć szczegóły."
          />
          <div>
            {ITINERARY.map((day) => (
              <DayCard
                key={day.day}
                day={day}
                isOpen={expandedDays.includes(day.day)}
                toggleOpen={() => toggleDay(day.day)}
              />
            ))}
          </div>
        </section>

        {/* TRANSPORT */}
        <section>
          <SectionHeader
            icon={Train}
            title="Transport i logistyka"
            subtitle="Metro to plan główny i plan B jednocześnie — szczególnie w dni Tour de France."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-7 shadow-sm">
              <div className="pointer-events-none absolute right-0 top-0 p-6 text-stone-100">
                <Plane size={96} />
              </div>
              <div className="relative z-10">
                <h3 className="mb-3 flex items-center gap-3 font-serif text-xl text-stone-800">
                  <Bus className="text-blue-600" /> Z lotniska do hotelu · 2 lipca
                </h3>
                <ol className="space-y-2 text-sm text-stone-600">
                  <li><b className="text-stone-800">1.</b> Aerobús A2 (T2 → Plaça Catalunya), €11/os., co 10–15 min, ~40 min.</li>
                  <li><b className="text-stone-800">2.</b> Metro L3 → Lesseps (5–6 przystanków, ~12 min).</li>
                  <li><b className="text-stone-800">3.</b> 200 m pieszo do hotelu.</li>
                </ol>
                <div className="mt-4 flex flex-wrap gap-2">
                  <LinkPill href="https://www.aerobusbarcelona.es/" icon={ExternalLink} label="Aerobús" tone="official" />
                  <LinkPill href="https://www.tmb.cat/" icon={ExternalLink} label="TMB metro" tone="official" />
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-[#1f2937] p-7 text-white shadow-sm">
              <div className="pointer-events-none absolute right-0 top-0 p-6 text-stone-700 opacity-50">
                <Train size={96} />
              </div>
              <div className="relative z-10">
                <h3 className="mb-3 flex items-center gap-3 font-serif text-xl">
                  <Train className="text-amber-400" /> Na lotnisko · 5 lipca
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-stone-300">
                  Tego dnia Tour de France wjeżdża do miasta — drogi zamknięte od 12:00. Dlatego{' '}
                  <b className="text-white">metro L9, nie taksówka.</b>
                </p>
                <ul className="space-y-2 text-sm text-stone-200">
                  <li className="flex items-start gap-2"><CheckCircle size={15} className="mt-0.5 shrink-0 text-amber-400" /> L3 Lesseps → Zona Universitaria → L9 Sud → Aeroport T2.</li>
                  <li className="flex items-start gap-2"><CheckCircle size={15} className="mt-0.5 shrink-0 text-amber-400" /> Czas ~45–50 min. Wyjazd z hotelu ok. 17:30–18:00.</li>
                  <li className="flex items-start gap-2"><CheckCircle size={15} className="mt-0.5 shrink-0 text-amber-400" /> Bilet lotniskowy L9: €5.90/os. (T-Casual NIE działa!).</li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm">
              <h3 className="mb-3 flex items-center gap-3 font-serif text-xl text-stone-800">
                <Wallet className="text-emerald-600" /> Bilety i karty
              </h3>
              <ul className="space-y-3 text-sm text-stone-600">
                <li className="border-b border-stone-100 pb-2"><b className="text-stone-800">T-Casual</b> — €13/os., 10 przejazdów. Metro, bus, FGC. Kup w kasie automatycznej. Nie działa na L9 do lotniska.</li>
                <li className="border-b border-stone-100 pb-2"><b className="text-stone-800">Bilet L9 lotnisko</b> — €5.90/os., osobny.</li>
                <li><b className="text-stone-800">Aerobús</b> — €11/os., płatność kartą na miejscu.</li>
              </ul>
              <div className="mt-4">
                <LinkPill href="https://www.tmb.cat/en/barcelona-fares-metro-bus/t-casual" icon={ExternalLink} label="T-Casual (TMB)" tone="official" />
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7 shadow-sm">
              <h3 className="mb-3 flex items-center gap-3 font-serif text-xl text-stone-800">
                <AlertTriangle className="text-amber-600" /> Ryzyka komunikacyjne
              </h3>
              <ul className="space-y-2 text-sm text-stone-700">
                <li className="flex items-start gap-2"><span className="font-bold text-amber-600">•</span> 4 i 5 lipca: nie planuj przejazdów taksówką przez centrum — zamknięcia TdF od południa.</li>
                <li className="flex items-start gap-2"><span className="font-bold text-amber-600">•</span> Bagaż ostatniego dnia: zostaw w recepcji hotelu po check-oucie (do 11:00), odbierz przed wyjazdem o 17:00.</li>
                <li className="flex items-start gap-2"><span className="font-bold text-amber-600">•</span> Pobierz aplikację TMB lub offline mapę metra na telefon.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FC BARCELONA */}
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#7a1f3d] to-[#1e3a6b] p-8 text-white shadow-md sm:p-12">
          <SectionHeader
            icon={Trophy}
            title={<span className="text-white">Piłka nożna · FC Barcelona</span>}
            subtitle={<span className="text-rose-100/80">Piłkarski akcent — wyraźny, ale w jedną godzinę, dokładnie tak, jak chcieliście.</span>}
            light
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <h3 className="mb-3 font-serif text-xl">Camp Nou — Barça Immersive Tour</h3>
              <p className="mb-4 text-sm leading-relaxed text-rose-50/90">
                Stadion jest w przebudowie, więc klasyczny tour (boisko, szatnie, tunel) jest zamknięty
                — wrócą planowo w sierpniu 2026. Czynna jest wersja immersyjna: muzeum FC Barcelona,
                pokaz 360° i punkt widokowy na plac budowy nowego stadionu.
              </p>
              <ul className="mb-4 space-y-2 text-sm text-rose-50">
                <li className="flex items-start gap-2"><CheckCircle size={15} className="mt-0.5 shrink-0 text-amber-300" /> <span><b>Wariant krótki (wybrany):</b> muzeum + 360° + Megastore, ~1 h.</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={15} className="mt-0.5 shrink-0 text-amber-300" /> <span><b>Wariant rozszerzony:</b> dłuższe zwiedzanie muzeum i instalacji, do 2 h.</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={15} className="mt-0.5 shrink-0 text-amber-300" /> <span><b>Bilety:</b> €36/os., warto kupić 1–7 dni przed.</span></li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <LinkPill href="https://www.google.com/maps/search/?api=1&query=41.3809,2.1228" icon={MapIcon} label="Mapa Camp Nou" tone="map" />
                <LinkPill href="https://go.fcbarcelona.com/Museu/BarcaImmersiveTour/CampNouExperience/EN" icon={Ticket} label="Bilety" tone="book" />
                <LinkPill href="https://www.fcbarcelona.com/en/tickets/camp-nou-experience" icon={ExternalLink} label="Strona" tone="official" />
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <h3 className="mb-3 font-serif text-xl">Bonus: Tour de France 4 lipca</h3>
              <p className="mb-4 text-sm leading-relaxed text-rose-50/90">
                Ten sam dzień co Camp Nou — dwa sporty w jeden dzień. Rano piłka nożna, po południu
                kolarze przejeżdżają przez Passeig de Gràcia z Casa Batlló w tle. Darmowe widowisko,
                jakiego w Barcelonie jeszcze nie było.
              </p>
              <ul className="space-y-2 text-sm text-rose-50">
                <li className="flex items-start gap-2"><CheckCircle size={15} className="mt-0.5 shrink-0 text-amber-300" /> Megastore FC Barcelona przy wejściu — koszulki, pamiątki.</li>
                <li className="flex items-start gap-2"><CheckCircle size={15} className="mt-0.5 shrink-0 text-amber-300" /> Brak meczu La Liga w lipcu (sezon letni) — to nie jest wyjazd stadionowy.</li>
                <li className="flex items-start gap-2"><CheckCircle size={15} className="mt-0.5 shrink-0 text-amber-300" /> 2 lipca wieczorem: darmowa prezentacja drużyn TdF przy Sagrada Família.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* JEDZENIE */}
        <section>
          <SectionHeader
            icon={Utensils}
            title="Jedzenie i restauracje"
            subtitle="Prosto i smacznie, lokalnie, bez gwiazdek Michelin — i jedna wyjątkowa kolacja przy morzu."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {FOOD.map((f) => (
              <div key={f.name} className="relative rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
                {f.reservation ? (
                  <span className="absolute right-5 top-5 rounded bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
                    Wymaga rezerwacji
                  </span>
                ) : null}
                <h3 className="mb-1 pr-24 font-serif text-lg text-stone-800">{f.name}</h3>
                <p className="mb-3 text-xs uppercase tracking-widest text-stone-500">{f.tag}</p>
                <p className="mb-4 text-sm leading-relaxed text-stone-600">{f.text}</p>
                <div className="flex flex-wrap gap-2">
                  <LinkPill href={f.mapsUrl} icon={MapIcon} label="Mapa" tone="map" />
                  <LinkPill href={f.bookingUrl} icon={Ticket} label="Rezerwacja" tone="book" />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-stone-100 bg-white p-4 text-sm text-stone-600 shadow-sm">
            <b className="text-stone-800">Koniecznie spróbować:</b> pa amb tomàquet, patatas bravas,
            croquetes, boquerones; z morza — arròs a banda, fideuà, gambes; do tego cava, vermut i
            lokalne piwo Estrella lub Moritz.
          </p>
        </section>

        {/* PLAŻA I ROMANTYCZNE MOMENTY */}
        <section>
          <SectionHeader
            icon={Waves}
            title="Plaża i spokojne wieczory"
            subtitle="Morze w upalne popołudnia i kilka miejsc na zachód słońca — bez nacisku, jeśli akurat się uda."
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {ESCAPES.map((e) => (
              <div key={e.name} className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
                <h3 className="mb-1 font-serif text-lg text-stone-800">{e.name}</h3>
                <p className="mb-3 text-xs uppercase tracking-widest text-stone-500">{e.tag}</p>
                <p className="mb-4 text-sm leading-relaxed text-stone-600">{e.text}</p>
                <LinkPill href={e.mapsUrl} icon={MapIcon} label="Otwórz mapę" tone="map" />
              </div>
            ))}
          </div>
        </section>

        {/* MATRYCA REZERWACYJNA */}
        <section className="rounded-3xl bg-emerald-900 p-8 text-emerald-50 shadow-md sm:p-12">
          <SectionHeader
            icon={CheckCircle}
            title={<span className="text-white">Matryca rezerwacyjna</span>}
            subtitle={<span className="text-emerald-200/80">Co i kiedy zarezerwować. Sagrada Família — natychmiast.</span>}
            light
          />
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {CHECKLIST.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 rounded-xl border border-emerald-700 bg-emerald-800/50 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium text-emerald-50">{item.item}</p>
                  {item.status ? (
                    <span
                      className={`shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${
                        STATUS_TONES[item.status] || 'bg-emerald-950 text-emerald-100'
                      }`}
                    >
                      {item.status}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-200">
                  <span className="font-mono">KOSZT: {item.cost}</span>
                  <span className="text-emerald-300/80">Deadline: {item.deadline}</span>
                </div>
                {item.notes ? <p className="text-xs italic leading-relaxed text-emerald-200/70">{item.notes}</p> : null}
                {(item.bookingUrl || item.officialUrl) && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.bookingUrl ? (
                      <a
                        href={item.bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-emerald-950 transition-colors hover:bg-amber-300"
                      >
                        <Ticket size={13} /> Zarezerwuj
                      </a>
                    ) : null}
                    {item.officialUrl ? (
                      <a
                        href={item.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500 px-3 py-1 text-xs font-medium text-emerald-100 transition-colors hover:bg-emerald-800"
                      >
                        <ExternalLink size={13} /> Oficjalna strona
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* PLAN B / RYZYKA */}
        <section>
          <SectionHeader
            icon={ShieldAlert}
            title="Plan B i ryzyka"
            subtitle="Co może pójść inaczej i co wtedy zrobić. Bez straszenia — z konkretnym rozwiązaniem."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RISKS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="h-6 w-6 text-red-500" />
                  <h3 className="font-serif text-base text-stone-800">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-stone-600">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 rounded-xl border border-dashed border-stone-300 bg-stone-100/70 p-4 text-xs italic text-stone-500">
            <Sun size={16} className="mt-0.5 shrink-0 text-amber-500" />
            Godziny otwarcia, ceny i trasy TdF zweryfikowano 26 czerwca 2026. Potwierdź dostępność
            biletów i ostateczne mapy zamknięć ulic tuż przed wyjazdem — szczegóły w pliku
            06_CHECKLISTA_REZERWACJI.md.
          </p>
        </section>

        {/* METRO DLA POCZĄTKUJĄCYCH */}
        <section>
          <SectionHeader
            icon={Train}
            title="Metro dla początkujących"
            subtitle="Barcelońskie metro (TMB) jest proste, czyste i szybkie — oto wszystko, czego potrzebujecie."
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-serif text-xl text-stone-800">
                <Train className="text-blue-600" /> Jak jeździć — krok po kroku
              </h3>
              <ol className="space-y-3 text-sm leading-relaxed text-stone-700">
                <li><b className="text-stone-900">1.</b> Kup bilet w automacie na stacji (jest język angielski, płatność kartą).</li>
                <li><b className="text-stone-900">2.</b> Przyłóż lub włóż bilet do bramki przy wejściu — otworzy się. Zachowaj bilet do końca.</li>
                <li><b className="text-stone-900">3.</b> Znajdź swoją linię po numerze i kolorze (np. L3 = zielona, L4 = żółta, L5 = niebieska).</li>
                <li><b className="text-stone-900">4.</b> Wybierz peron według <b>kierunku = nazwy stacji końcowej</b> (np. L3 w stronę „Trinitat Nova" albo „Zona Universitària").</li>
                <li><b className="text-stone-900">5.</b> Pociągi co 2–5 min. Nad drzwiami i na tablicach jest mapa linii i kolejne stacje.</li>
                <li><b className="text-stone-900">6.</b> Wysiądź na swojej stacji i idź do wyjścia „Sortida / Salida". Przy wyjściu nie trzeba kasować.</li>
              </ol>
              <p className="mt-4 rounded-xl bg-stone-50 p-3 text-xs leading-relaxed text-stone-600">
                Nawigacja: <b>Google Maps</b> lub aplikacja <b>TMB</b> podają linię, kierunek i przesiadki.
                Godziny: pn–czw i niedz. do ok. 24:00, pt do 02:00, <b>sobota całą noc</b>. Uważajcie na
                kieszonkowców przy bramkach i w tłoku.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-serif text-xl text-stone-800">
                <Ticket className="text-amber-600" /> Co kupić na ten wyjazd
              </h3>
              <ul className="space-y-4 text-sm leading-relaxed text-stone-700">
                <li>
                  <b>2× T-casual</b> (po ok. €13/os.) — 10 przejazdów na kartę: metro, autobus i FGC,
                  strefa 1 (cała Barcelona). Karta jest <b>jednoosobowa</b>, więc dla pary kupujecie dwie.
                  ~20 przejazdów spokojnie starcza na cały plan.
                </li>
                <li>
                  <b>Lotnisko osobno:</b> T-casual <b>nie działa</b> na metrze L9 do/z lotniska.
                  Na powrót 5 lipca kupcie <b>2× bilet lotniskowy</b> (ok. €5,90/os.); na przylot 2 lipca
                  plan zakłada <b>Aerobús</b>.
                </li>
                <li className="text-stone-600">
                  <b>Alternatywa:</b> <b>Hola Barcelona Travel Card</b> (48/72/96 h, przejazdy bez limitu,
                  <b> obejmuje też metro lotniskowe L9</b>) — wygodniejsza, ale dla Was zwykle droższa niż
                  2× T-casual + bilety lotniskowe.
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <LinkPill href="https://www.tmb.cat/en/barcelona-fares-metro-bus/t-casual" icon={ExternalLink} label="T-casual (TMB)" tone="official" />
                <LinkPill href="https://www.tmb.cat/en/barcelona/transport-tickets-barcelona" icon={ExternalLink} label="Wszystkie bilety TMB" tone="official" />
              </div>
              <p className="mt-3 text-xs italic text-stone-500">
                Ceny orientacyjne — potwierdźcie aktualne stawki na tmb.cat tuż przed wyjazdem.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="mb-1 flex items-center gap-2 font-serif text-xl text-stone-800">
              <PlayCircle className="text-red-600" /> Wideo: metro w Barcelonie po polsku
            </h3>
            <p className="mb-4 text-sm text-stone-500">
              Krótki przewodnik wyjaśniony przez Polaka — jak kupić bilet i poruszać się metrem.
            </p>
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-stone-900">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/0zHwDyRrXDQ"
                title="Metro w Barcelonie — przewodnik po polsku"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <a
              href="https://www.youtube.com/watch?v=0zHwDyRrXDQ"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              <ExternalLink size={14} /> Otwórz na YouTube
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-stone-900 bg-stone-950 py-12 text-center text-sm text-stone-400">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-3 font-serif text-xl text-stone-200">Barcelona dla Dwojga · 2026</p>
          <p className="mx-auto mb-6 max-w-lg opacity-70">
            Plan przygotowany strategicznie dla wymagających podróżników — chroniący energię, rytm i
            wspólny czas, z dobrym jedzeniem, morzem i piłkarskim akcentem.
          </p>
          <div className="flex items-center justify-center gap-2 opacity-50">
            <ShoppingBag size={14} /> <span>Gaudí · tapas · morze · Camp Nou · Tour de France 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
