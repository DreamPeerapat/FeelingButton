#!/usr/bin/env python3
"""
Generate the Thai audio files for the Patient Feeling Board.

Reads phrases from manifest.json and writes one MP3 per feeling into audio/,
named audio/<key>.mp3 — exactly what index.html plays.

Run this on a machine that has outbound internet access (it could NOT run
inside the locked-down build sandbox, where AWS Polly, Google TTS and Hugging
Face were all blocked). It supports two engines:

  1. Amazon Polly (recommended) — natural neural Thai voice "Achara"/"Sarawut".
     Needs valid AWS credentials (env vars, ~/.aws, or an instance role) and
     boto3 installed:  pip install boto3

  2. gTTS (Google Translate TTS) — no credentials, decent quality.
     pip install gTTS

Usage:
    python scripts/generate_audio.py                 # auto: Polly, else gTTS
    python scripts/generate_audio.py --engine polly  # force Polly
    python scripts/generate_audio.py --engine gtts   # force gTTS
    python scripts/generate_audio.py --voice Achara --region ap-southeast-1

These voices are AI-generated. For genuine human recordings, just record each
phrase yourself and save it as audio/<key>.mp3 (see README) — no script needed.
"""

import argparse
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
AUDIO_DIR = os.path.join(ROOT, "audio")
MANIFEST = os.path.join(ROOT, "manifest.json")


def load_feelings():
    with open(MANIFEST, encoding="utf-8") as fh:
        return json.load(fh)["feelings"]


def gen_polly(feelings, voice, region):
    import boto3  # noqa: WPS433

    client = boto3.client("polly", region_name=region) if region else boto3.client("polly")
    for f in feelings:
        resp = client.synthesize_speech(
            Text=f["th"], OutputFormat="mp3", VoiceId=voice, Engine="neural",
            LanguageCode="th-TH",
        )
        out = os.path.join(AUDIO_DIR, f["key"] + ".mp3")
        with open(out, "wb") as fh:
            fh.write(resp["AudioStream"].read())
        print(f"  ✓ {f['key']:9s} {f['th']}  ->  audio/{f['key']}.mp3")


# gTTS language config: manifest field -> (gTTS lang code, output subdir).
# Thai goes in audio/, other languages in audio/<subdir>/ to match index.html.
GTTS_LANGS = [
    ("th", "th", ""),
    ("zh", "zh-CN", "zh"),
    ("en", "en", "en"),
]


def gen_gtts(feelings):
    from gtts import gTTS  # noqa: WPS433

    for field, lang_code, subdir in GTTS_LANGS:
        out_dir = os.path.join(AUDIO_DIR, subdir) if subdir else AUDIO_DIR
        os.makedirs(out_dir, exist_ok=True)
        print(f"  [{field}] -> audio/{subdir + '/' if subdir else ''}<key>.mp3")
        for f in feelings:
            # A "say" sentence is what the card speaks; fall back to the label.
            text = (f.get("say") or {}).get(field) or f.get(field)
            if not text:
                continue
            gTTS(text=text, lang=lang_code).save(os.path.join(out_dir, f["key"] + ".mp3"))
        print(f"     ✓ {len(feelings)} files")


def main():
    p = argparse.ArgumentParser(description="Generate Thai audio for the Feeling Board")
    p.add_argument("--engine", choices=["auto", "polly", "gtts"], default="auto")
    p.add_argument("--voice", default="Achara",
                   help="Polly Thai voice id (Achara or Sarawut)")
    p.add_argument("--region", default=os.environ.get("AWS_REGION", ""),
                   help="AWS region for Polly (e.g. ap-southeast-1)")
    args = p.parse_args()

    os.makedirs(AUDIO_DIR, exist_ok=True)
    feelings = load_feelings()
    print(f"Generating audio for {len(feelings)} feelings into audio/ ...")

    engine = args.engine
    if engine == "auto":
        try:
            import boto3  # noqa: F401
            engine = "polly"
        except ImportError:
            engine = "gtts"
        print(f"  (auto-selected engine: {engine})")

    try:
        if engine == "polly":
            gen_polly(feelings, args.voice, args.region)
        else:
            gen_gtts(feelings)
    except ImportError as e:
        sys.exit(f"Missing dependency for engine '{engine}': {e}\n"
                 f"Install it (pip install boto3  OR  pip install gTTS) and retry.")
    except Exception as e:  # noqa: BLE001
        sys.exit(f"Generation failed with engine '{engine}': {e}")

    print("Done. Reload index.html — the board now plays these clear voices.")


if __name__ == "__main__":
    main()
