#!/usr/bin/env python3
"""
Regenerate the BUNDLED OFFLINE Thai audio in audio/tts/<key>.mp3.

These files ship with the project so the board always makes sound — in any
browser, with no internet and no Speech Synthesis API. They are produced by the
open-source eSpeak NG engine, so the voice is robotic (understandable, not
natural). For a natural voice, add real recordings or Polly files at
audio/<key>.mp3 — those take priority over these (see scripts/generate_audio.py).

Requirements (all offline / from PyPI + apt):
    apt-get install -y espeak-ng
    pip install lameenc

Usage:
    python scripts/generate_offline_tts.py
"""

import json
import os
import subprocess
import tempfile
import wave

import lameenc

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT_DIR = os.path.join(ROOT, "audio", "tts")
MANIFEST = os.path.join(ROOT, "manifest.json")


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    feelings = json.load(open(MANIFEST, encoding="utf-8"))["feelings"]
    print(f"Generating {len(feelings)} offline Thai files into audio/tts/ ...")

    for f in feelings:
        # A "say" sentence is what the card speaks; fall back to the label.
        text = (f.get("say") or {}).get("th") or f["th"]
        wav_path = tempfile.NamedTemporaryFile(suffix=".wav", delete=False).name
        subprocess.run(
            ["espeak-ng", "-v", "th", "-s", "150", "-w", wav_path, text],
            check=True,
        )
        with wave.open(wav_path) as w:
            rate, channels = w.getframerate(), w.getnchannels()
            pcm = w.readframes(w.getnframes())
        os.unlink(wav_path)

        enc = lameenc.Encoder()
        enc.set_in_sample_rate(rate)
        enc.set_channels(channels)
        enc.set_bit_rate(64)
        enc.set_quality(2)
        mp3 = enc.encode(pcm) + enc.flush()

        out = os.path.join(OUT_DIR, f["key"] + ".mp3")
        with open(out, "wb") as fh:
            fh.write(mp3)
        print(f"  ✓ {f['key']:9s} {f['th']}")

    print("Done.")


if __name__ == "__main__":
    main()
