# Patient Feeling Board · 病人感受板

A single-page communication board that helps patients tell caregivers how they
feel. Each card shows a **picture (emoji)** with **English** and **Chinese**
labels. Tapping a card **plays the feeling out loud in Thai** — for example,
the *Hungry* card says **"หิว"**.

## How to use

Open `index.html` in any modern browser (Chrome recommended) and tap a card.

## Audio: real recordings, with a safety net

The board plays **pre-recorded audio files** from the [`audio/`](audio/) folder
(`audio/<key>.mp3`). If a file isn't present yet, it still makes sound by
falling back through this chain, so the app is never silent:

1. **Local recording** — `audio/<key>.mp3` (works offline) → 🟢 REC
2. **Online Thai TTS** — plays Thai speech from the internet; works even in
   browsers with no Speech Synthesis API → 🟡 TTS
3. **Browser Thai voice** — the device's built-in speech, if available → 🟡 TTS
4. A short banner only if all of the above are unavailable

Each card shows a small badge:

- 🟢 **REC** — a real recording played
- 🟡 **TTS** — no file yet, browser fallback voice used

### Add real recordings

Two options, covered in [`audio/README.md`](audio/README.md):

1. **Human recordings** — record each Thai phrase yourself and save it as
   `audio/<key>.mp3` (e.g. `audio/hungry.mp3`). Most authentic.
2. **Generate them** — run the helper script on a machine with internet:

   ```
   python scripts/generate_audio.py
   ```

   Uses Amazon Polly's neural Thai voice (`pip install boto3`, valid AWS
   credentials) or falls back to gTTS (`pip install gTTS`). See the script
   header for options.

The filename ↔ phrase map lives in [`manifest.json`](manifest.json).

## Files

```
index.html               The board (open this)
manifest.json            key -> {English, Chinese, Thai} for all 18 feelings
audio/                   audio/<key>.mp3 recordings (+ how-to)
scripts/generate_audio.py  Generate the Thai MP3s (Polly or gTTS)
```

## Feelings included (18)

Hungry, Thirsty, Pain, Sleepy, Tired, Toilet, Cold, Hot, Nausea, Dizzy, Short of
Breath, Itchy, Scared, Sad, Happy, Medicine, Help, Call Nurse.

## Notes

- Pictures are emoji, so the board works fully offline with no image files.
- The generator uses AI (neural TTS) voices. For a genuine human voice, use
  option 1 above — the app treats any `audio/<key>.mp3` the same way.
