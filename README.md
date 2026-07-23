# Patient Feeling Board · 病人感受板

A single-page communication board that helps patients tell caregivers how they
feel. Each card shows a **picture (emoji)** with **English** and **Chinese**
labels. Tapping a card **speaks the feeling out loud in Thai** — for example,
the *Hungry* card says **"หิว"**.

## How to use

Open `index.html` in any modern browser (Chrome recommended) and tap a card.

## Features

- 18 common patient feelings and needs (hungry, thirsty, pain, toilet, call
  nurse, etc.)
- Picture + English + Chinese on every card
- Thai text-to-speech via the browser's built-in Speech Synthesis API
- No installation, no internet, and no external files required — fully
  self-contained in one HTML file
- Responsive layout for phones and tablets

## Notes on Thai audio

Thai speech uses the device's built-in Thai voice. If no Thai voice is
installed, a warning banner appears and the browser may fall back to another
voice. Chrome and most mobile devices include Thai voice support.
