# Patient Feeling Board · 病人感受板

A single-page communication board that helps patients tell caregivers how they
feel. Each card shows a **picture (emoji)** with **English** and **Chinese**
labels. Tapping a card **plays the feeling out loud in Thai** — for example,
the *Hungry* card says **"หิว"**.

## How to use

Open `index.html` in any modern browser (Chrome recommended) and tap a card.

## Choose the spoken language

Use the **🗣️ Speak in** selector at the top to pick which language a tap speaks:
**ไทย Thai** (default), **中文**, or **English**. Your choice is highlighted on
each card (with a 🔊) and saved in the browser for next time. It applies to
built-in and custom feelings alike.

On the deployed site, all three languages play a clear voice (the Pages build
generates `audio/<key>.mp3` for Thai and `audio/zh/`, `audio/en/` for the
others). Offline, Thai uses its bundled voice; Chinese/English use the device's
built-in voice if present.

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
and not tonally accurate.

**On the deployed GitHub Pages site, step 1 is filled in automatically with a
clear Google Thai voice.** The Pages workflow (`.github/workflows/static.yml`)
runs `gTTS` at build time — the runner has internet, so it generates clear
`audio/<key>.mp3` files into the deployed site. That's why the live site sounds
clear even though the repo only ships the offline eSpeak fallback. For an even
more natural voice (Amazon Polly neural, or a real human recording), drop your
own `audio/<key>.mp3` in — it takes priority over everything.

## Add your own feelings

Tap the dashed **➕ Add feeling** card at the end of the board to create a new
one. Enter the **English**, **Chinese**, and **Thai** (spoken) words, then
**pick a picture** from the illustration set. Your feeling is added to the board
and saved in the browser (`localStorage`), so it's still there next visit.
Remove a custom feeling with the **×** in its corner.

Custom feelings speak their Thai text via the online voice (or the browser
voice) — no build step needed for them.

## Pictures

Each card's picture is a **custom SVG illustration** defined in
[`pictures.js`](pictures.js) — drawn in code, no emoji and no image files, so
they render identically on every device. Emoji are only a last-resort fallback.

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
pictures.js                       custom SVG illustration for each feeling
manifest.json                     key -> {English, Chinese, Thai} for all 18
audio/<key>.mp3                   clear voice: CI (gTTS) / Polly / human (priority)
audio/tts/<key>.mp3               bundled offline voice (always present)
scripts/generate_audio.py         make clear Thai MP3s (gTTS or Polly)
scripts/generate_offline_tts.py   regenerate the bundled offline voice (eSpeak)
.github/workflows/static.yml      deploys to Pages + generates clear audio
```

## Feelings included (18)

Hungry, Thirsty, Pain, Sleepy, Tired, Toilet, Cold, Hot, Nausea, Dizzy, Short of
Breath, Itchy, Scared, Sad, Happy, Medicine, Help, Call Nurse.

## Notes

- Pictures are emoji, so the board works fully offline with no image files.
- The generator uses AI (neural TTS) voices. For a genuine human voice, use
  option 1 above — the app treats any `audio/<key>.mp3` the same way.
