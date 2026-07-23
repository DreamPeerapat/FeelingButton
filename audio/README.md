# audio/ — Thai voice recordings

The board plays one file per feeling from this folder:

```
audio/<key>.mp3
```

The `<key>` values come from [`../manifest.json`](../manifest.json). All 18:

| key | English | Thai (say this) |
|-----|---------|-----------------|
| hungry   | Hungry          | หิว |
| thirsty  | Thirsty         | หิวน้ำ |
| pain     | Pain            | เจ็บ |
| sleepy   | Sleepy          | ง่วงนอน |
| tired    | Tired           | เหนื่อย |
| toilet   | Toilet          | เข้าห้องน้ำ |
| cold     | Cold            | หนาว |
| hot      | Hot             | ร้อน |
| nausea   | Nausea          | คลื่นไส้ |
| dizzy    | Dizzy           | เวียนหัว |
| breath   | Short of Breath | หายใจไม่ออก |
| itchy    | Itchy           | คัน |
| scared   | Scared          | กลัว |
| sad      | Sad             | เศร้า |
| happy    | Happy           | มีความสุข |
| medicine | Medicine        | อยากกินยา |
| help     | Help            | ช่วยด้วย |
| nurse    | Call Nurse      | เรียกพยาบาล |

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
