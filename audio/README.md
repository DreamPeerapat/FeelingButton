# audio/ — Thai voice recordings

The board plays one file per feeling from this folder:

```
audio/<key>.mp3
```

The `<key>` values come from [`../manifest.json`](../manifest.json). All 25:

| key | category | English | Thai (say this) |
|-----|----------|---------|-----------------|
| hungry | Basic Needs | Hungry | หิว |
| thirsty | Basic Needs | Thirsty | หิวน้ำ |
| toilet | Basic Needs | Toilet | เข้าห้องน้ำ |
| bowel | Basic Needs | I need to have a bowel movement. | ถ่ายอุจจาระ |
| medicine | Basic Needs | Medicine | อยากกินยา |
| pain | Pain & Symptoms | Pain | เจ็บ |
| backpain | Pain & Symptoms | I have back pain. | ปวดหลัง |
| chestpain | Pain & Symptoms | I have chest tightness. | เจ็บแน่นอก |
| palpitations | Pain & Symptoms | My heart is racing. | ใจสั่น |
| urinepain | Pain & Symptoms | It hurts when I pee. | ปวดปัสสาวะ |
| breath | Pain & Symptoms | Short of Breath | หายใจไม่ออก |
| nausea | Pain & Symptoms | Nausea | คลื่นไส้ |
| dizzy | Pain & Symptoms | Dizzy | เวียนหัว |
| itchy | Pain & Symptoms | Itchy | คัน |
| cold | Pain & Symptoms | Cold | หนาว |
| hot | Pain & Symptoms | Hot | ร้อน |
| tired | Pain & Symptoms | Tired | เหนื่อย |
| sleepy | Pain & Symptoms | Sleepy | ง่วงนอน |
| scared | Feelings | Scared | กลัว |
| sad | Feelings | Sad | เศร้า |
| happy | Feelings | Happy | มีความสุข |
| help | Requests & Help | Help | ช่วยด้วย |
| nurse | Requests & Help | Call Nurse | เรียกพยาบาล |
| talkdoctor | Requests & Help | I want to talk to the doctor. | อยากคุยกับหมอ |
| gohome | Requests & Help | I want to go home. | อยากกลับบ้าน |

## Two ways to fill this folder

**A. Real human recordings (most authentic).**
Record each phrase (phone voice recorder is fine), export as MP3, and save it
here with the exact filename above — e.g. the "hungry" clip becomes
`audio/hungry.mp3`. Keep clips short (~1 second) and trim silence.

**B. Generate them with a script.**
From the project root, run:

```
python scripts/generate_audio.py
```

This uses Amazon Polly's neural Thai voice (needs AWS credentials + `boto3`),
or falls back to gTTS if boto3 isn't installed. See the script header for
options.

## How the app behaves

- If `audio/<key>.mp3` exists → it plays that file, and the card shows a
  🟢 **REC** badge.
- If the file is missing → the card falls back to the browser's built-in Thai
  voice and shows a 🟡 **TTS** badge.

So you can add files one at a time; each feeling upgrades to a real recording
the moment its file appears. No code changes needed.
