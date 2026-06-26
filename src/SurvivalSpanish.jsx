import React, { useState } from 'react';
import {
  Languages,
  Sparkles,
  Volume2,
  Eye,
  EyeOff,
  Coffee,
  Utensils,
  ShoppingBag,
  Navigation,
  BedDouble,
  LifeBuoy,
  LifeBuoy as Rescue,
  Hand,
  Printer,
  Clock,
  Star,
  ListChecks,
  Download,
} from 'lucide-react';
import { PHRASES, EMERGENCY, FORMULAS, UNIVERSAL, SCENES, TRAINING, CHEATSHEET } from './data/spanish.js';

const SCENE_ICONS = {
  Coffee,
  Utensils,
  ShoppingBag,
  Navigation,
  BedDouble,
  LifeBuoy,
};

/* Wymowa na głos — Web Speech API (es-ES). */
function speak(text) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    u.rate = 0.9;
    synth.speak(u);
  } catch (e) {
    /* cicho — wymowa to dodatek, nie warunek */
  }
}

function SpeakButton({ text, light = false }) {
  return (
    <button
      onClick={() => speak(text)}
      title="Posłuchaj wymowy"
      aria-label={`Posłuchaj: ${text}`}
      className={`shrink-0 rounded-full p-2 transition-colors ${
        light
          ? 'text-amber-200 hover:bg-white/10 hover:text-white'
          : 'text-amber-700 hover:bg-amber-100'
      }`}
    >
      <Volume2 size={16} />
    </button>
  );
}

/* ----------------------------- Karta zwrotu ------------------------------- */

function PhraseCard({ phrase, hide }) {
  // hide: null | 'pl' | 'es' — tryb ćwiczeń zasłania jedną kolumnę.
  const [revealed, setRevealed] = useState(false);
  const hidePl = hide === 'pl' && !revealed;
  const hideEs = hide === 'es' && !revealed;
  const clickable = hide && !revealed;

  return (
    <div
      onClick={() => clickable && setRevealed(true)}
      className={`group flex flex-col gap-2 rounded-2xl border border-stone-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${
        clickable ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`text-xs uppercase tracking-widest text-stone-400 transition ${
            hidePl ? 'select-none rounded bg-stone-100 text-transparent' : ''
          }`}
        >
          {phrase.pl}
        </span>
        <SpeakButton text={phrase.es} />
      </div>

      <div className="flex items-baseline gap-2">
        <span
          className={`font-serif text-xl text-stone-900 transition ${
            hideEs ? 'select-none rounded bg-stone-100 text-transparent' : ''
          }`}
        >
          {phrase.es}
        </span>
      </div>

      <span
        className={`text-sm font-medium text-amber-700 transition ${
          hideEs ? 'select-none rounded bg-stone-100 text-transparent' : ''
        }`}
      >
        [{phrase.pron}]
      </span>

      <p className="mt-1 border-t border-stone-100 pt-2 text-xs italic leading-relaxed text-stone-500">
        {phrase.mnemo}
      </p>

      {phrase.use ? (
        <p className="text-xs text-stone-400">
          Użycie: <span className="font-medium text-stone-600">{phrase.use}</span>
        </p>
      ) : null}

      {clickable ? (
        <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-stone-400 group-hover:text-amber-600">
          <Eye size={12} /> kliknij, aby odkryć
        </span>
      ) : null}
    </div>
  );
}

/* ------------------------------ Tryb ćwiczeń ------------------------------ */

function ModeSwitch({ mode, setMode }) {
  const options = [
    { key: null, label: 'Pokaż wszystko', icon: Eye },
    { key: 'pl', label: 'Zasłoń polski', icon: EyeOff },
    { key: 'es', label: 'Zasłoń hiszpański', icon: EyeOff },
  ];
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-full border border-stone-200 bg-white p-1 shadow-sm">
      {options.map((o) => {
        const active = mode === o.key;
        return (
          <button
            key={String(o.key)}
            onClick={() => setMode(o.key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              active ? 'bg-amber-500 text-white shadow' : 'text-stone-500 hover:bg-stone-100'
            }`}
          >
            <o.icon size={13} /> {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------- Scenka ---------------------------------- */

function SceneCard({ scene }) {
  const Icon = SCENE_ICONS[scene.icon] || Coffee;
  return (
    <div className="flex flex-col rounded-2xl border border-stone-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-700">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="font-serif text-lg leading-tight text-stone-800">{scene.title}</h3>
          <p className="text-xs uppercase tracking-widest text-stone-400">{scene.goal}</p>
        </div>
      </div>

      <ul className="space-y-3">
        {scene.lines.map((l, i) => (
          <li key={i} className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3 last:border-0 last:pb-0">
            <div className="min-w-0">
              <p className="font-semibold text-stone-900">{l.es}</p>
              <p className="text-sm text-stone-500">{l.pl}</p>
            </div>
            <SpeakButton text={l.es} />
          </li>
        ))}
      </ul>

      <p className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50/70 p-3 text-xs italic leading-relaxed text-amber-800">
        <Sparkles size={14} className="mt-0.5 shrink-0" /> {scene.image}
      </p>
    </div>
  );
}

/* --------------------------------- Tab ------------------------------------ */

export default function SurvivalSpanish() {
  const [mode, setMode] = useState(null);

  return (
    <div className="bg-[#FDFBF7]">
      {/* HERO sekcji */}
      <header className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-br from-[#9d2235] via-[#b83a2b] to-[#e8a13a] px-6 py-16 text-center text-white sm:py-20">
        <div className="pointer-events-none absolute -right-8 -top-8 opacity-15">
          <Languages size={220} />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="block h-px w-10 bg-amber-200/70" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-100">
              Hiszpański survival 🇪🇸
            </span>
            <span className="block h-px w-10 bg-amber-200/70" />
          </div>
          <h1 className="mb-5 font-serif text-4xl font-medium leading-tight drop-shadow md:text-6xl">
            12 zwrotów, które <i className="font-light text-amber-100">naprawdę wystarczą</i>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-rose-50/90">
            Nie uczysz się języka. Uczysz się <b className="font-medium text-white">12 klocków LEGO</b>,
            z których złożysz kawiarnię, restaurację, sklep, ulicę i sytuację awaryjną. ¡Vamos!
          </p>
          <a
            href="Barcelona-hiszpanski.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-lg transition-colors hover:bg-amber-300"
          >
            <Download size={16} /> Pobierz ściągę PDF (na telefon)
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-20 px-4 py-16 sm:px-6">
        {/* GRAFIKA — mantra na start */}
        <section>
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <img
              src="hola-banner.svg"
              alt="Śpiewający operowo Hiszpan w barze tapas — Hola znaczy Cześć"
              className="mx-auto block w-full max-w-3xl"
              loading="lazy"
              width="1200"
              height="640"
            />
          </div>
          <p className="mt-3 text-center text-sm text-stone-500">
            Pierwszy klocek: <b className="text-stone-700">Hola</b> = Cześć. Reszta pójdzie z górki. 🎶
          </p>
        </section>

        {/* NAJWAŻNIEJSZY SCHEMAT */}
        <section>
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center shadow-inner sm:p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              Najważniejszy schemat
            </p>
            <p className="font-serif text-2xl text-stone-900 sm:text-3xl">
              Hola. <span className="text-amber-700">Por favor.</span> Quiero…
            </p>
            <p className="mt-1 text-stone-500">Cześć. Proszę. Chcę…</p>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-stone-600">
              Zamień <b>Quiero</b> (chcę) na <b>Necesito</b> (potrzebuję) i ten jeden wzór obsłuży
              większość sytuacji. Reszta to tylko wymiana ostatniego słowa.
            </p>
          </div>
        </section>

        {/* ZŁOTA DWUNASTKA */}
        <section>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <Star className="h-7 w-7 text-amber-600" />
                <h2 className="font-serif text-3xl text-stone-800">Złota Dwunastka</h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-stone-500">
                Dwanaście zwrotów + wymowa + głupia (= skuteczna) mnemotechnika. Dotknij{' '}
                <Volume2 size={14} className="inline text-amber-700" />, aby usłyszeć wymowę.
              </p>
            </div>
            <ModeSwitch mode={mode} setMode={setMode} />
          </div>

          {mode ? (
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-500">
              <Hand size={13} /> Tryb ćwiczeń — kliknij kartę, aby odkryć zasłoniętą kolumnę.
            </p>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PHRASES.map((p) => (
              <PhraseCard key={`${p.es}-${mode}`} phrase={p} hide={mode} />
            ))}
          </div>

          {/* Bonus awaryjny */}
          <div className="mt-6 rounded-3xl border border-rose-200 bg-rose-50 p-6 sm:p-7">
            <h3 className="mb-4 flex items-center gap-2 font-serif text-lg text-rose-800">
              <Rescue className="text-rose-600" size={20} /> Bonus awaryjny
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {EMERGENCY.map((e) => (
                <div key={e.es} className="rounded-2xl bg-white/70 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs uppercase tracking-widest text-rose-400">{e.pl}</span>
                    <SpeakButton text={e.es} />
                  </div>
                  <p className="font-serif text-lg text-stone-900">{e.es}</p>
                  <p className="text-sm font-medium text-rose-700">[{e.pron}]</p>
                  <p className="mt-1 text-xs italic text-stone-500">{e.mnemo}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRZY FORMUŁY */}
        <section>
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-3">
              <ListChecks className="h-7 w-7 text-amber-600" />
              <h2 className="font-serif text-3xl text-stone-800">Trzy formuły</h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-stone-500">
              Trzy wzory, które łączą klocki w gotowe zdania.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {FORMULAS.map((f) => (
              <div key={f.n} className="flex flex-col rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 font-serif text-lg font-bold text-white">
                    {f.n}
                  </span>
                  <h3 className="font-serif text-lg text-stone-800">{f.title}</h3>
                </div>
                <p className="mb-3 rounded-lg bg-stone-50 px-3 py-2 text-sm font-semibold text-stone-700">
                  {f.pattern}
                </p>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-stone-900">{f.example}</p>
                    <p className="text-sm text-stone-500">{f.examplePl}</p>
                  </div>
                  <SpeakButton text={f.example} />
                </div>
                <p className="mt-3 border-t border-stone-100 pt-3 text-xs italic text-stone-500">{f.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* JEDNO ZDANIE UNIWERSALNE */}
        <section>
          <div className="relative overflow-hidden rounded-3xl bg-stone-900 p-8 text-center text-white shadow-md sm:p-12">
            <div className="pointer-events-none absolute -left-6 -top-6 opacity-10">
              <LifeBuoy size={180} />
            </div>
            <div className="relative z-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                Jedno zdanie uniwersalne · awaryjny scyzoryk
              </p>
              <p className="mx-auto max-w-2xl font-serif text-2xl leading-snug sm:text-3xl">
                „{UNIVERSAL.es}”
              </p>
              <p className="mt-3 text-stone-300">{UNIVERSAL.pl}</p>
              <button
                onClick={() => speak(UNIVERSAL.es)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-300"
              >
                <Volume2 size={16} /> Posłuchaj wymowy
              </button>
            </div>
          </div>
        </section>

        {/* SCENKI */}
        <section>
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-3">
              <Sparkles className="h-7 w-7 text-amber-600" />
              <h2 className="font-serif text-3xl text-stone-800">Scenki do zapamiętania</h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-stone-500">
              Sześć realnych sytuacji w Barcelonie — gotowe linijki, które wystarczy odegrać.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {SCENES.map((s) => (
              <SceneCard key={s.id} scene={s} />
            ))}
          </div>
        </section>

        {/* TRENING 3 MIN */}
        <section>
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-3">
              <Clock className="h-7 w-7 text-amber-600" />
              <h2 className="font-serif text-3xl text-stone-800">Trening 3-minutowy</h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-stone-500">
              Nie czytaj po cichu — <b className="text-stone-700">odegraj scenki na głos</b>, z minami
              i gestami. Im głupiej, tym lepiej zapadnie w pamięć.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {TRAINING.map((t) => (
              <div key={t.round} className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
                <h3 className="mb-3 font-serif text-base text-stone-800">{t.round}</h3>
                <ul className="space-y-1.5 text-sm text-stone-700">
                  {t.lines.map((l, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-amber-500">→</span> {l}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => speak(t.lines.join(' '))}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-800"
                >
                  <Volume2 size={13} /> Odsłuchaj rundę
                </button>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-dashed border-stone-300 bg-stone-100/70 p-4 text-sm leading-relaxed text-stone-600">
            <b className="text-stone-800">Plan powtórek:</b> rano przed wyjściem — 3 formuły na głos ·
            po 10 minutach — szybka miniściąga (60 s) · wieczorem przed snem — przeleć wzrokiem listę.
            Zakryj polski, potem hiszpański — i sprawdź się.
          </p>
        </section>

        {/* MINIŚCIĄGA */}
        <section>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <ListChecks className="h-7 w-7 text-amber-600" />
                <h2 className="font-serif text-3xl text-stone-800">Miniściąga</h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-stone-500">
                Najmniejsza możliwa ściąga — zerknij i ruszaj. Zrób zrzut ekranu na telefon.
              </p>
            </div>
            <a
              href="Barcelona-hiszpanski.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm transition-colors hover:bg-stone-50 sm:self-auto"
            >
              <Printer size={15} /> Pobierz / drukuj PDF
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <ul className="grid grid-cols-1 sm:grid-cols-2">
              {CHEATSHEET.map(([es, pl], i) => (
                <li
                  key={es}
                  className={`flex items-center justify-between gap-3 px-6 py-3 ${
                    i % 2 === 0 ? 'sm:border-r border-stone-100' : ''
                  } border-b border-stone-100`}
                >
                  <span className="font-serif text-lg text-stone-900">{es}</span>
                  <span className="text-sm text-stone-500">{pl}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 rounded-xl bg-amber-50 p-4 text-center text-sm leading-relaxed text-amber-800">
            <b>Zasada wyjazdowa:</b> nie mów idealnie — mów{' '}
            <b>Hola + por favor + jedno słowo + gracias</b>. To nie egzamin, to językowy multitool na
            Barcelonę. 🎯
          </p>
        </section>
      </main>
    </div>
  );
}
