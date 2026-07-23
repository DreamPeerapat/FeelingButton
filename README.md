# Patient Feeling Board · 病人感受板

A single-page communication board that helps patients tell caregivers how they
feel. Each card shows a **picture (emoji)** with **English** and **Chinese**
labels. Tapping a card **plays the feeling out loud in Thai** — for example,
the *Hungry* card says **"หิว"**.

## How to use

Open `index.html` in any modern browser (Chrome recommended) and tap a card.

## Audio: real recordings, with a safety net

**The board always makes sound out of the box** — no setup required. On every
tap it tries this chain and stops at the first that works:

1. **Real recording** — `audio/<key>.mp3` (offline) → 🟢 REC
2. **Bundled offline voice** — `audio/tts/<key>.mp3`, ships with the project
   (offline; works even with no internet and no Speech API) → 🟡 TTS
3. **Online Thai TTS** — Thai speech from the internet → 🟡 TTS
4. **Browser Thai voice** — the device's built-in speech, if any → 🟡 TTS
5. A short banner only if literally none of the above is available

Step 2 is why it's never silent: those bundled files play in any browser,
offline. They use the open-source **eSpeak NG** engine, so the voice is robotic
(clear, but not natural). Add real recordings or Polly files at
`audio/<key>.mp3` for a natural voice — they take priority (step 1).

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
index.html                        The board (open this)
manifest.json                     key -> {English, Chinese, Thai} for all 18
audio/<key>.mp3                   your real / Polly recordings (priority)
audio/tts/<key>.mp3               bundled offline voice (always present)
scripts/generate_audio.py         make natural Thai MP3s (Polly or gTTS)
scripts/generate_offline_tts.py   regenerate the bundled offline voice (eSpeak)
```

## Feelings included (18)

Hungry, Thirsty, Pain, Sleepy, Tired, Toilet, Cold, Hot, Nausea, Dizzy, Short of
Breath, Itchy, Scared, Sad, Happy, Medicine, Help, Call Nurse.

## Notes

- Pictures are emoji, so the board works fully offline with no image files.
- The generator uses AI (neural TTS) voices. For a genuine human voice, use
  option 1 above — the app treats any `audio/<key>.mp3` the same way.
