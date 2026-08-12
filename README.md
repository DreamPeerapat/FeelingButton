# Patient Feeling Board (CCU1) · 病人感受板

A single-page communication board that helps patients tell caregivers how they
feel. Each card shows a **picture** with **English** and **Chinese** labels. Tapping a card **plays the feeling out loud in Thai** — for example,
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

## Text size (A− / A+)

Next to the language selector is a **🔠 Text size** control. **A−** and **A+**
step the whole board through 85% – 200% (85, 100, 115, 130, 150, 175, 200) and
the current value is shown between them. The buttons disable at each end, and
the choice is saved in the browser so the ward keeps its setting.

Card widths, pictures and text are all sized in `rem`, so a change zooms the
board as a whole rather than only growing text inside fixed-width cards; the
grid simply reflows to fewer columns as things get bigger.

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
one. Enter the **English**, **Chinese**, and **Thai** (spoken) words, then either
**pick a picture** from the illustration set or **📤 upload your own**. Your
feeling is added to the board and saved in the browser (`localStorage`), so it's
still there next visit. Remove a custom feeling with the **×** in its corner.

### Uploaded pictures are resized automatically

A photo straight from a phone is several MB, but browser storage only holds
about 5 MB in total — so every upload is processed before it is saved:

- redrawn on a canvas at a **maximum edge of 320px** (cards never show bigger)
- re-encoded to **WebP** (JPEG on browsers without WebP), stepping quality and
  then size down until it fits a **~60 KB budget**
- transparency is flattened onto white so it can't turn black

The modal shows the result, e.g. `320×240 · 37 KB (from 2194 KB)`. That keeps
roughly 80+ uploaded pictures within the storage limit; if storage does fill up,
saving shows a clear message instead of failing silently.

Custom feelings speak their Thai text via the online voice (or the browser
voice) — no build step needed for them.

## Pictures

Most cards use a **hand-drawn illustration** of a patient acting out the feeling,
stored as `images/<key>.png` (34 of the 37 cards). The three without one
(Medicine, Help, Call Nurse) fall back to a **custom SVG icon** from
[`pictures.js`](pictures.js); emoji are the final fallback. The add-feeling
picker offers both the illustrations and the SVG icons to choose from.

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
manifest.json                     key -> {English, Chinese, Thai} for all 37
audio/<key>.mp3                   clear voice: CI (gTTS) / Polly / human (priority)
audio/tts/<key>.mp3               bundled offline voice (always present)
scripts/generate_audio.py         make clear Thai MP3s (gTTS or Polly)
scripts/generate_offline_tts.py   regenerate the bundled offline voice (eSpeak)
.github/workflows/static.yml      deploys to Pages + generates clear audio
```

## Categories and cards (37)

Cards are grouped into categories, each with a heading in all three languages:

| Category | Cards |
|----------|-------|
| 🍚 **Basic Needs** · 基本需求 · ความต้องการพื้นฐาน | Hungry, Thirsty, Toilet, Pee, Bowel movement, Medicine |
| 🤕 **Pain & Symptoms** · 疼痛与症状 · อาการเจ็บป่วย | Pain, Back pain, Chest pain, Palpitation, Short of Breath, Nausea, Dizzy, Itchy, Cold, Hot, Tired, Sleepy |
| 🙂 **Feelings** · 情绪 · อารมณ์ | Scared, Sad, Happy |
| 🔔 **Requests & Help** · 请求与帮助 · คำขอและความช่วยเหลือ | Help, Call Nurse, Talk to the doctor, Go home, Breathing tube out, Urinary catheter out |
| 🧼 **Care & Procedures** · 护理与操作 · การดูแลและหัตถการ | Bed Bath, Peri Care, Lift Your Hips, Blood Test, Suctioning |
| ⚠️ **Please / Do Not** · 注意事项 · ข้อควรปฏิบัติ | Please Stay Still, Do Not Bend Your Legs, Do Not Sit Up or Get Up |
| 💬 **Staff Messages** · 工作人员的话 · คำพูดจากเจ้าหน้าที่ | Thank You, Call for Help |
| ⭐ **My Feelings** · 自定义 · เพิ่มเอง | Anything you add yourself |

The first four groups are things the **patient** says. *Care & Procedures*,
*Please / Do Not* and *Staff Messages* are things **staff say to the patient** —
explaining what they are about to do, a safety instruction, or a courtesy.

When adding a feeling you pick which category it belongs to, so it can join a
built-in group instead of only "My Feelings".

### Cards that speak a full sentence

Staff cards keep a short label on the card but speak the complete sentence. In
`manifest.json` that is the optional `say` object:

```json
{ "key": "bathe", "en": "Bed Bath", "zh": "洗澡", "th": "อาบน้ำ",
  "say": { "th": "เจ้าหน้าที่จะช่วยอาบน้ำ เพื่อความสะอาดและความสบายตัว", "...": "..." } }
```

The sentence is also shown under the labels in the selected language, and it is
what gets recorded into the audio files.

## Notes

- Illustrations ship with the project, so the board works fully offline.
- The generator uses AI (neural TTS) voices. For a genuine human voice, use
  option 1 above — the app treats any `audio/<key>.mp3` the same way.
