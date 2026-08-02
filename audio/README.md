# audio/ — Thai voice recordings

The board plays one file per card from this folder:

```
audio/<key>.mp3
```

The `<key>` values come from [`../manifest.json`](../manifest.json). Cards with a
`say` sentence record that whole sentence, not just the short label. All 35:

| key | category | English label | Thai spoken |
|-----|----------|---------------|-------------|
| hungry | Basic Needs | Hungry | หิว |
| thirsty | Basic Needs | Thirsty | หิวน้ำ |
| toilet | Basic Needs | Toilet | เข้าห้องน้ำ |
| pee | Basic Needs | I need to pee. | ฉันต้องการถ่ายปัสสาวะ |
| bowel | Basic Needs | I need to have a bowel movement. | ถ่ายอุจจาระ |
| medicine | Basic Needs | Medicine | อยากกินยา |
| pain | Pain & Symptoms | Pain | เจ็บ |
| backpain | Pain & Symptoms | I have back pain. | ปวดหลัง |
| chestpain | Pain & Symptoms | Chest pain | เจ็บแน่นอก |
| palpitations | Pain & Symptoms | Palpitation | ใจสั่น |
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
| bathe | Care & Procedures | Bed Bath | เจ้าหน้าที่จะช่วยอาบน้ำ เพื่อความสะอาดและความสบายตัว |
| cleanbottom | Care & Procedures | Peri Care | เจ้าหน้าที่จะช่วยล้างทำความสะอาดก้น เพื่อสุขอนามัย |
| liftbottom | Care & Procedures | Lift Your Hips | เจ้าหน้าที่จะช่วยยกก้น เพื่อเปลี่ยนผ้าหรือแผ่นรอง |
| bloodtest | Care & Procedures | Blood Test | พยาบาลจะเจาะเลือด เพื่อตรวจร่างกาย |
| suction | Care & Procedures | Suctioning | พยาบาลจะดูดเสมหะ เพื่อช่วยให้หายใจสะดวก |
| staystill | Please / Do Not | Please Stay Still | กรุณาอยู่นิ่งๆ เพื่อความปลอดภัย |
| nobendleg | Please / Do Not | Do Not Bend Your Legs | ห้ามงอขา เพื่อป้องกันการเลือดออก |
| nositup | Please / Do Not | Do Not Sit Up or Get Up | ห้ามลุกนั่ง เพื่อความปลอดภัย |
| thanks | Staff Messages | Thank You | ขอบคุณสำหรับความร่วมมือ ช่วยให้คุณปลอดภัย |
| callhelp | Staff Messages | Call for Help | หากต้องการสิ่งใด กรุณากดกริ่งเรียกพยาบาล |

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
