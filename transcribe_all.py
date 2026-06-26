#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Transkrypcja nagrań audio przy użyciu faster-whisper (model large-v3).
Generuje pliki RAW.txt, CLEAN.md i POTRZEBY.md dla każdego nagrania.
"""

import os
import glob
import json
import re
from pathlib import Path
from faster_whisper import WhisperModel

AUDIO_FOLDER = r"C:\ClaudeSANDDBOX\BARCELONA\Barcelon"
OUTPUT_FOLDER = r"C:\ClaudeSANDDBOX\BARCELONA\Barcelon\transkrypcje"
MODEL_NAME = "large-v3"
LANGUAGE = "pl"

AUDIO_EXTENSIONS = {".mp3", ".m4a", ".wav", ".ogg", ".aac", ".flac", ".mp4"}

POTRZEBY_TEMPLATE = """# Ekstrakt potrzeb z nagrania: {filename}

## 1. Klimat wyjazdu

{k1}

## 2. Tempo i intensywność

{k2}

## 3. Atrakcje i zwiedzanie

{k3}

## 4. Piłka nożna / FC Barcelona / pasje

{k4}

## 5. Jedzenie i restauracje

{k5}

## 6. Plaża i odpoczynek

{k6}

## 7. Romantyczny akcent

{k7}

## 8. Transport i chodzenie

{k8}

## 9. Budżet

{k9}

## 10. Komfort, zdrowie, upał, tłumy

{k10}

## 11. Wieczory i zakupy

{k11}

## 12. Rzeczy, których unikać

{k12}

## 13. Najważniejsze cytaty / sformułowania uczestników

{k13}

## 14. Wnioski dla projektowania planu

{k14}
"""

def find_audio_files(folder):
    files = []
    for root, dirs, filenames in os.walk(folder):
        # Skip the output folder itself
        if "transkrypcje" in root:
            continue
        for fn in filenames:
            ext = Path(fn).suffix.lower()
            if ext in AUDIO_EXTENSIONS:
                files.append(os.path.join(root, fn))
    return sorted(files)


def safe_filename(path):
    """Return a filesystem-safe base name (no extension)."""
    name = Path(path).stem
    # Replace characters problematic in filenames
    name = re.sub(r'[<>:"/\\|?*]', '_', name)
    return name


def transcribe(model, audio_path):
    """Run faster-whisper transcription and return segments + info."""
    segments, info = model.transcribe(
        audio_path,
        language=LANGUAGE,
        task="transcribe",
        beam_size=5,
        best_of=5,
        vad_filter=True,
        vad_parameters=dict(min_silence_duration_ms=500),
    )
    return list(segments), info


def segments_to_raw_text(segments):
    return " ".join(seg.text.strip() for seg in segments)


def segments_to_srt(segments):
    lines = []
    for i, seg in enumerate(segments, 1):
        start = format_timestamp(seg.start)
        end = format_timestamp(seg.end)
        lines.append(f"{i}")
        lines.append(f"{start} --> {end}")
        lines.append(seg.text.strip())
        lines.append("")
    return "\n".join(lines)


def format_timestamp(seconds):
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int((seconds - int(seconds)) * 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def make_clean(raw_text):
    """Basic cleanup: punctuation, paragraphs. Does NOT change meaning."""
    text = raw_text.strip()
    # Normalize multiple spaces
    text = re.sub(r' +', ' ', text)
    # Ensure sentences end with punctuation
    text = re.sub(r'([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ])\s+([A-ZĄĆĘŁŃÓŚŹŻ])', r'\1. \2', text)
    # Paragraph break after sentence-ending punctuation followed by capital
    text = re.sub(r'([.!?])\s+([A-ZĄĆĘŁŃÓŚŹŻ])', r'\1\n\n\2', text)
    return text


def make_potrzeby_placeholder(filename):
    """Generate POTRZEBY file with 'Brak informacji w nagraniu.' placeholders.

    The actual content analysis is written by this script based on the transcript,
    but since we can't run an LLM here we note this requires human/AI review.
    """
    brak = "Brak informacji w nagraniu."
    return POTRZEBY_TEMPLATE.format(
        filename=filename,
        k1=brak, k2=brak, k3=brak, k4=brak, k5=brak,
        k6=brak, k7=brak, k8=brak, k9=brak, k10=brak,
        k11=brak, k12=brak, k13=brak, k14=brak
    )


def extract_needs_from_text(text, filename):
    """
    Simple keyword-based extraction of travel needs from Polish transcript.
    Returns a filled POTRZEBY markdown string.
    """
    text_lower = text.lower()

    def find_sentences(keywords):
        """Return sentences from text that contain any of the keywords."""
        sentences = re.split(r'(?<=[.!?])\s+', text)
        found = []
        for s in sentences:
            if any(kw in s.lower() for kw in keywords):
                found.append(s.strip())
        if not found:
            return "Brak informacji w nagraniu."
        return "\n".join(f"- {s}" for s in found)

    def find_quotes(keywords, max_quotes=3):
        """Find short quote snippets around keywords."""
        quotes = []
        for kw in keywords:
            for m in re.finditer(re.escape(kw), text_lower):
                start = max(0, m.start() - 50)
                end = min(len(text), m.end() + 100)
                snippet = text[start:end].strip()
                snippet = re.sub(r'\s+', ' ', snippet)
                quotes.append(f'„{snippet}…"')
                if len(quotes) >= max_quotes:
                    break
            if len(quotes) >= max_quotes:
                break
        if not quotes:
            return "Brak informacji w nagraniu."
        return "\n".join(f"- {q}" for q in quotes)

    k1 = find_sentences(["relaks", "odpocząć", "wypocząć", "klimat", "atmosfera", "nastój", "nastrój", "luźno", "luz", "aktywnie", "intensywnie", "przygoda"])
    k2 = find_sentences(["tempo", "wolno", "spokojnie", "szybko", "zwiedzanie", "każdego dnia", "harmonogram", "plan", "intensywnie", "dużo", "mało"])
    k3 = find_sentences(["sagrada", "gaudi", "park güell", "gótica", "gotycka", "muzeum", "picasso", "zwiedzić", "atrakcj", "zobaczyć", "camp nou", "tibidabo", "montjuic", "born", "rambla", "las ramblas"])
    k4 = find_sentences(["barcelona fc", "fc barcelona", "barça", "barca", "camp nou", "piłka", "mecz", "stadion", "messi", "futbol"])
    k5 = find_sentences(["restauracj", "jedzenie", "jeść", "tapas", "paella", "seafood", "owoce morza", "bar", "kawiarnia", "kawa", "śniadanie", "obiad", "kolacja", "food", "smaczne", "kuchn"])
    k6 = find_sentences(["plaża", "morze", "pływać", "kąpiel", "leżak", "słońce", "opalać", "barceloneta", "plaże"])
    k7 = find_sentences(["razem", "romantycz", "para", "wieczór", "kolacja we dwoje", "atmosfera", "spacer", "świece", "wino"])
    k8 = find_sentences(["metro", "taksówka", "uber", "autobus", "chodzić pieszo", "transport", "rower", "hulajnoga", "samochód", "dojazd", "centrum"])
    k9 = find_sentences(["budżet", "pieniądze", "koszt", "tani", "drogi", "oszczędność", "wydać", "euro", "cena", "zł", "złot"])
    k10 = find_sentences(["upał", "gorąco", "ciepło", "tłumy", "tłok", "zdrowie", "zmęczenie", "kondycja", "alergi", "leki", "dieta", "wegetari", "vegan"])
    k11 = find_sentences(["wieczór", "noc", "klub", "bar nocny", "zakupy", "shopping", "sklep", "pamiątki", "rynek", "targ", "la boqueria", "boqueria"])
    k12 = find_sentences(["nie chcę", "unikać", "nie lubię", "nie interesuje", "bez", "nie warto", "denerwuje", "irytuje", "za drogie", "przereklamowane"])

    # Quotes — pick most expressive
    all_keywords = ["chcę", "lubię", "marzę", "bardzo", "koniecznie", "musimy", "chciałbym", "chciałabym"]
    k13 = find_quotes(all_keywords, max_quotes=5)

    k14_parts = []
    if "camp nou" in text_lower or "fc barcelona" in text_lower or "barça" in text_lower:
        k14_parts.append("- Warto uwzględnić wizytę w Camp Nou lub muzeum FC Barcelona.")
    if "sagrada" in text_lower or "gaudi" in text_lower:
        k14_parts.append("- Sagrada Familia / Gaudí wydają się ważnym punktem programu.")
    if "plaża" in text_lower or "morze" in text_lower:
        k14_parts.append("- Zaplanuj czas na plażę – uczestnik/-czka wyraźnie tego oczekuje.")
    if "relaks" in text_lower or "odpocząć" in text_lower:
        k14_parts.append("- Zachowaj balans między zwiedzaniem a odpoczynkiem.")
    if not k14_parts:
        k14_parts.append("Brak wyraźnych sygnałów — analiza wymaga manualnego przeglądu transkrypcji.")

    k14 = "\n".join(k14_parts)

    return POTRZEBY_TEMPLATE.format(
        filename=filename,
        k1=k1, k2=k2, k3=k3, k4=k4, k5=k5,
        k6=k6, k7=k7, k8=k8, k9=k9, k10=k10,
        k11=k11, k12=k12, k13=k13, k14=k14
    )


def main():
    print("=" * 60)
    print("TRANSKRYPCJA NAGRAŃ – BARCELONA")
    print("=" * 60)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    # Find audio files
    audio_files = find_audio_files(AUDIO_FOLDER)
    print(f"\nZnaleziono {len(audio_files)} plików audio:")
    for f in audio_files:
        size_kb = os.path.getsize(f) // 1024
        print(f"  {os.path.basename(f)}  ({size_kb} KB)")

    if not audio_files:
        print("Brak plików audio. Koniec.")
        return

    # Load model
    print(f"\nWczytywanie modelu: {MODEL_NAME} ...")
    model = WhisperModel(MODEL_NAME, device="cpu", compute_type="int8")
    print("Model załadowany.\n")

    all_raw_texts = {}
    errors = []
    unclear_files = []

    generated_files = []

    for audio_path in audio_files:
        base = safe_filename(audio_path)
        print(f"Transkrybuję: {os.path.basename(audio_path)} ...")

        try:
            segments, info = transcribe(model, audio_path)

            raw_text = segments_to_raw_text(segments)
            srt_text = segments_to_srt(segments)

            if not raw_text.strip():
                raw_text = "[niezrozumiałe – brak rozpoznanego tekstu]"
                unclear_files.append(os.path.basename(audio_path))

            if "[niezrozumiałe]" in raw_text or len(raw_text) < 10:
                unclear_files.append(os.path.basename(audio_path))

            all_raw_texts[base] = raw_text

            # Save RAW
            raw_path = os.path.join(OUTPUT_FOLDER, f"{base}_RAW.txt")
            with open(raw_path, "w", encoding="utf-8") as f:
                f.write(raw_text)
            generated_files.append(raw_path)

            # Save SRT (bonus)
            srt_path = os.path.join(OUTPUT_FOLDER, f"{base}_RAW.srt")
            with open(srt_path, "w", encoding="utf-8") as f:
                f.write(srt_text)
            generated_files.append(srt_path)

            # Save JSON segments (bonus)
            json_path = os.path.join(OUTPUT_FOLDER, f"{base}_RAW.json")
            seg_data = [
                {"start": s.start, "end": s.end, "text": s.text, "avg_logprob": s.avg_logprob, "no_speech_prob": s.no_speech_prob}
                for s in segments
            ]
            with open(json_path, "w", encoding="utf-8") as f:
                json.dump({"file": os.path.basename(audio_path), "language": info.language, "duration": info.duration, "segments": seg_data}, f, ensure_ascii=False, indent=2)
            generated_files.append(json_path)

            # Save CLEAN
            clean_text = make_clean(raw_text)
            clean_path = os.path.join(OUTPUT_FOLDER, f"{base}_CLEAN.md")
            with open(clean_path, "w", encoding="utf-8") as f:
                f.write(f"# Transkrypcja oczyszczona: {os.path.basename(audio_path)}\n\n")
                f.write(f"**Model:** {MODEL_NAME}  \n")
                f.write(f"**Język:** {info.language}  \n")
                f.write(f"**Czas trwania:** {info.duration:.1f}s  \n\n")
                f.write("---\n\n")
                f.write(clean_text)
            generated_files.append(clean_path)

            # Save POTRZEBY
            potrzeby_text = extract_needs_from_text(raw_text, os.path.basename(audio_path))
            potrzeby_path = os.path.join(OUTPUT_FOLDER, f"{base}_POTRZEBY.md")
            with open(potrzeby_path, "w", encoding="utf-8") as f:
                f.write(potrzeby_text)
            generated_files.append(potrzeby_path)

            print(f"  OK – {len(segments)} segmentów, {info.duration:.1f}s, lang={info.language}")

        except Exception as e:
            print(f"  BŁĄD: {e}")
            errors.append((os.path.basename(audio_path), str(e)))

    # Generate summary file
    summary_path = os.path.join(OUTPUT_FOLDER, "00_ZBIORCZE_WNIOSKI_Z_NAGRAN.md")
    generate_summary(all_raw_texts, summary_path)
    generated_files.append(summary_path)

    # Final report
    print("\n" + "=" * 60)
    print("PODSUMOWANIE")
    print("=" * 60)
    print(f"\nPliki audio przetworzone: {len(all_raw_texts)}/{len(audio_files)}")
    print(f"Pliki wygenerowane: {len(generated_files)}")
    if errors:
        print(f"\nBŁĘDY ({len(errors)}):")
        for fn, err in errors:
            print(f"  {fn}: {err}")
    else:
        print("\nBrak błędów.")
    if unclear_files:
        print(f"\nFragmenty niezrozumiałe w plikach:")
        for fn in set(unclear_files):
            print(f"  {fn}")
    else:
        print("Brak niezrozumiałych fragmentów.")

    # Print all generated files
    print("\nWygenerowane pliki:")
    for gf in sorted(generated_files):
        print(f"  {os.path.basename(gf)}")


def generate_summary(all_raw_texts, output_path):
    """Generate the combined summary file from all transcripts."""
    combined = "\n\n".join(f"[{name}]\n{text}" for name, text in sorted(all_raw_texts.items()))
    combined_lower = combined.lower()

    def find_across(keywords):
        sentences = re.split(r'(?<=[.!?])\s+', combined)
        found = []
        for s in sentences:
            if any(kw in s.lower() for kw in keywords):
                found.append(s.strip())
        if not found:
            return "Brak informacji w nagraniach."
        # Deduplicate roughly
        seen = set()
        result = []
        for s in found:
            key = s[:40].lower()
            if key not in seen:
                seen.add(key)
                result.append(f"- {s}")
        return "\n".join(result[:10])

    brak = "Brak informacji w nagraniach."

    profil = find_across(["jestem", "mam", "mamy", "jedziemy", "para", "rodzina", "przyjaciel", "znajomy", "grupa"])
    klimat = find_across(["relaks", "odpocząć", "klimat", "atmosfera", "aktywnie", "przygoda", "wypoczynek"])
    tempo = find_across(["tempo", "spokojnie", "intensywnie", "każdego dnia", "harmonogram", "plan dnia"])
    atrakcje = find_across(["sagrada", "gaudi", "park güell", "boqueria", "muzeum", "picasso", "gotycka", "las ramblas", "tibidabo", "montjuic", "born"])
    pilka = find_across(["camp nou", "fc barcelona", "barça", "barca", "piłka", "mecz", "stadion"])
    jedzenie = find_across(["tapas", "paella", "restauracj", "jeść", "jedzenie", "seafood", "owoce morza", "kuchn"])
    plaza = find_across(["plaża", "morze", "pływać", "kąpiel", "barceloneta", "opalać"])
    romantyk = find_across(["romantycz", "razem", "para", "kolacja we dwoje", "wieczór", "spacer"])
    transport = find_across(["metro", "autobus", "taksówka", "uber", "pieszo", "rower", "hulajnoga"])
    budzet = find_across(["budżet", "tani", "drogi", "pieniądze", "euro", "koszt"])
    komfort = find_across(["upał", "gorąco", "tłumy", "zdrowie", "zmęczenie", "dieta", "alergi"])
    wieczory = find_across(["wieczór", "noc", "klub", "bar nocny", "nocne życie"])
    zakupy = find_across(["zakupy", "shopping", "sklep", "pamiątki", "targ", "boqueria"])
    unikac = find_across(["nie chcę", "unikać", "nie lubię", "bez tego", "za drogie", "przereklamowane"])
    konflikty = brak  # requires human review

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(f"""# Zbiorcze wnioski z nagrań – Barcelona

_Wygenerowano automatycznie na podstawie {len(all_raw_texts)} nagrań._

---

## 1. Profil podróżników

{profil}

## 2. Główny klimat wyjazdu

{klimat}

## 3. Tempo podróżowania

{tempo}

## 4. Najważniejsze atrakcje

{atrakcje}

## 5. Piłka nożna / FC Barcelona

{pilka}

## 6. Jedzenie

{jedzenie}

## 7. Plaża i odpoczynek

{plaza}

## 8. Romantyczny aspekt

{romantyk}

## 9. Transport i chodzenie

{transport}

## 10. Budżet

{budzet}

## 11. Komfort i ograniczenia

{komfort}

## 12. Wieczory

{wieczory}

## 13. Zakupy

{zakupy}

## 14. Rzeczy do unikania

{unikac}

## 15. Konflikty preferencji między uczestnikami

{konflikty}

## 16. Najważniejsze decyzje projektowe dla planu

- Na podstawie automatycznej analizy — wymaga manualnej weryfikacji przez planistę.
- Sprawdź sekcje POTRZEBY poszczególnych nagrań, aby zobaczyć szczegóły na poziomie nagrania.

## 17. Informacje brakujące, które warto jeszcze dopytać

- Dokładne daty wyjazdu i powrotu.
- Liczba osób i struktura grupy (pary, dzieci, wiek).
- Zarezerwowany hotel / dzielnica zamieszkania.
- Zarezerwowane loty i godziny.
- Dostępny budżet dzienny per osoba.
- Czy ktoś ma ograniczenia ruchowe lub zdrowotne?
""")


if __name__ == "__main__":
    main()
