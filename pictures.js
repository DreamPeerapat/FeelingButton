/*
 * Custom SVG illustrations for each feeling — drawn here, no emoji, no image
 * files. Each entry is a self-contained <svg> string (viewBox 0 0 100 100).
 * Consistent flat style: a soft colored disc + simple white/dark iconography.
 */
(function () {
  const D = "#33404f"; // dark ink for features

  // Round face helper. bg = disc color, inner = SVG for eyes/mouth/extras.
  const face = (bg, inner) =>
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img">
      <circle cx="50" cy="50" r="46" fill="${bg}"/>${inner}</svg>`;

  const eyeDots = (y = 44) =>
    `<circle cx="37" cy="${y}" r="4.5" fill="${D}"/>
     <circle cx="63" cy="${y}" r="4.5" fill="${D}"/>`;

  // Object icon helper: disc + custom content.
  const icon = (bg, inner) =>
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img">
      <circle cx="50" cy="50" r="46" fill="${bg}"/>${inner}</svg>`;

  const PICS = {
    // ---- Needs / objects ----
    hungry: icon("#FFE1B3", `
      <path d="M22 52 a28 20 0 0 0 56 0 Z" fill="#fff"/>
      <ellipse cx="50" cy="52" rx="27" ry="9" fill="#F4B860"/>
      <path d="M40 33 q4 6 0 12 M50 30 q4 6 0 12 M60 33 q4 6 0 12"
            stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".9"/>
      <rect x="20" y="50" width="60" height="6" rx="3" fill="#E79A3C"/>`),

    thirsty: icon("#BFE7FB", `
      <path d="M35 28 h30 l-4 44 a3 3 0 0 1 -3 3 h-16 a3 3 0 0 1 -3 -3 Z"
            fill="#fff" stroke="#7FB8DC" stroke-width="2"/>
      <path d="M37 48 h26 l-3 24 a3 3 0 0 1 -3 3 h-14 a3 3 0 0 1 -3 -3 Z" fill="#4FA9E0"/>
      <path d="M50 12 q7 10 0 16 q-7 -6 0 -16" fill="#4FA9E0"/>`),

    toilet: icon("#DCE3EA", `
      <rect x="30" y="24" width="16" height="20" rx="3" fill="#fff" stroke="#9aa7b4" stroke-width="2"/>
      <path d="M28 46 h44 v6 a22 16 0 0 1 -44 0 Z" fill="#fff" stroke="#9aa7b4" stroke-width="2"/>
      <ellipse cx="50" cy="52" rx="14" ry="7" fill="#BFD0DE"/>
      <rect x="40" y="72" width="20" height="8" rx="2" fill="#fff" stroke="#9aa7b4" stroke-width="2"/>`),

    medicine: icon("#E4DBF3", `
      <g transform="rotate(-40 50 50)">
        <rect x="30" y="42" width="40" height="18" rx="9" fill="#fff" stroke="#B9A6E0" stroke-width="2"/>
        <path d="M50 42 h11 a9 9 0 0 1 9 9 v0 a9 9 0 0 1 -9 9 h-11 Z" fill="#F26D6D"/>
      </g>
      <circle cx="34" cy="70" r="10" fill="#fff" stroke="#B9A6E0" stroke-width="2"/>
      <path d="M27 70 h14" stroke="#B9A6E0" stroke-width="2"/>`),

    help: icon("#FFD9DE", `
      <path d="M30 62 a20 18 0 0 1 40 0 Z" fill="#fff" stroke="#E8899A" stroke-width="2"/>
      <rect x="26" y="62" width="48" height="6" rx="3" fill="#fff" stroke="#E8899A" stroke-width="2"/>
      <rect x="47" y="30" width="6" height="10" rx="3" fill="#E8899A"/>
      <circle cx="50" cy="72" r="4" fill="#E8899A"/>
      <path d="M78 40 q6 6 0 12 M82 34 q10 10 0 24" stroke="#E8899A" stroke-width="3"
            fill="none" stroke-linecap="round" opacity=".8"/>`),

    nurse: icon("#CDEBE0", `
      <path d="M28 80 a22 20 0 0 1 44 0 Z" fill="#fff"/>
      <circle cx="50" cy="46" r="16" fill="#fff"/>
      <path d="M35 34 a15 12 0 0 1 30 0 Z" fill="#fff" stroke="#B7D9CC" stroke-width="1.5"/>
      <rect x="46" y="20" width="8" height="12" rx="1.5" fill="#E85D5D"/>
      <rect x="42" y="24" width="16" height="4" rx="1.5" fill="#E85D5D"/>
      <circle cx="44" cy="48" r="2.6" fill="${D}"/><circle cx="56" cy="48" r="2.6" fill="${D}"/>
      <path d="M45 55 q5 4 10 0" stroke="${D}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`),

    breath: icon("#CDE9F2", `
      <path d="M50 30 v14" stroke="#5A8FA6" stroke-width="4" stroke-linecap="round"/>
      <path d="M50 44 c-2 -12 -22 -10 -22 8 c0 14 4 22 12 22 c8 0 10 -8 10 -18"
            fill="#fff" stroke="#5A8FA6" stroke-width="2.5"/>
      <path d="M50 44 c2 -12 22 -10 22 8 c0 14 -4 22 -12 22 c-8 0 -10 -8 -10 -18"
            fill="#fff" stroke="#5A8FA6" stroke-width="2.5"/>
      <path d="M40 40 q-6 3 -6 9 M60 40 q6 3 6 9" stroke="#5A8FA6" stroke-width="2.5"
            fill="none" stroke-linecap="round" opacity=".6"/>`),

    itchy: icon("#FBE0C6", `
      <rect x="26" y="34" width="34" height="34" rx="8" fill="#fff" stroke="#E2B98C" stroke-width="2"/>
      <circle cx="36" cy="46" r="3" fill="#E86A6A"/><circle cx="50" cy="42" r="3" fill="#E86A6A"/>
      <circle cx="45" cy="55" r="3" fill="#E86A6A"/><circle cx="55" cy="58" r="3" fill="#E86A6A"/>
      <path d="M62 60 l14 10 M66 56 l14 8 M60 66 l12 10" stroke="#B98A5A"
            stroke-width="3" stroke-linecap="round"/>`),

    // ---- Feelings / faces ----
    pain: face("#F6D2C4", `
      <rect x="24" y="40" width="52" height="12" rx="6" transform="rotate(-18 50 46)"
            fill="#fff" stroke="#E0A48F" stroke-width="2"/>
      <path d="M42 40 l16 12 M58 40 l-16 12" transform="rotate(-18 50 46)"
            stroke="#E0A48F" stroke-width="1.6"/>
      <path d="M20 30 l-8 -6 M24 22 l-3 -9 M80 30 l8 -6 M76 22 l3 -9"
            stroke="#E06B4E" stroke-width="3.4" stroke-linecap="round"/>
      <circle cx="40" cy="62" r="3.5" fill="${D}"/><circle cx="60" cy="62" r="3.5" fill="${D}"/>
      <path d="M42 74 q8 -6 16 0" stroke="${D}" stroke-width="3" fill="none" stroke-linecap="round"/>`),

    sleepy: face("#B9B3E6", `
      <path d="M31 45 q6 -6 12 0 M57 45 q6 -6 12 0" stroke="${D}" stroke-width="3.4"
            fill="none" stroke-linecap="round"/>
      <ellipse cx="50" cy="64" rx="5" ry="6" fill="${D}"/>
      <text x="62" y="34" font-family="Arial" font-weight="bold" font-size="16" fill="#fff">z</text>
      <text x="72" y="26" font-family="Arial" font-weight="bold" font-size="12" fill="#fff">z</text>`),

    tired: face("#D7CBB6", `
      <path d="M31 40 q6 8 12 3 M57 43 q6 -5 12 3" stroke="${D}" stroke-width="3.2"
            fill="none" stroke-linecap="round"/>
      <path d="M40 66 q10 -5 20 0" stroke="${D}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M74 44 q5 6 0 12 q-5 -6 0 -12" fill="#7FB8DC"/>`),

    happy: face("#FFD65A", `
      ${eyeDots(43)}
      <path d="M34 58 q16 18 32 0" stroke="${D}" stroke-width="5" fill="none" stroke-linecap="round"/>`),

    sad: face("#8FBEF3", `
      ${eyeDots(44)}
      <path d="M35 68 q15 -14 30 0" stroke="${D}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M37 50 q-4 9 0 13 q4 -4 0 -13" fill="#3E7BD1"/>`),

    scared: face("#E7E2F2", `
      <circle cx="37" cy="44" r="8.5" fill="#fff" stroke="${D}" stroke-width="2"/>
      <circle cx="63" cy="44" r="8.5" fill="#fff" stroke="${D}" stroke-width="2"/>
      <circle cx="37" cy="46" r="3.6" fill="${D}"/><circle cx="63" cy="46" r="3.6" fill="${D}"/>
      <ellipse cx="50" cy="66" rx="7" ry="9" fill="#7a5b5b"/>
      <path d="M76 34 q5 7 0 13 q-5 -6 0 -13" fill="#7FB8DC"/>`),

    nausea: face("#A5D66A", `
      ${eyeDots(44)}
      <path d="M33 63 q5 -7 9 0 q4 7 9 0 q4 -7 9 0 q4 7 8 0" stroke="${D}"
            stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M20 40 q3 -6 8 -4" stroke="#6f9e3d" stroke-width="2.5" fill="none" opacity=".7"/>`),

    dizzy: face("#FFD65A", `
      <path d="M37 44 m8 0 a8 8 0 1 1 -8 -8 a5 5 0 0 1 5 5 a2.5 2.5 0 0 1 -2.5 2.5"
            fill="none" stroke="${D}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M63 44 m8 0 a8 8 0 1 1 -8 -8 a5 5 0 0 1 5 5 a2.5 2.5 0 0 1 -2.5 2.5"
            fill="none" stroke="${D}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M36 64 q7 -6 14 0 q7 6 14 0" stroke="${D}" stroke-width="3.2"
            fill="none" stroke-linecap="round"/>`),

    cold: face("#8FD6F5", `
      ${eyeDots(43)}
      <rect x="36" y="60" width="28" height="12" rx="3" fill="#fff" stroke="${D}" stroke-width="2"/>
      <path d="M43 60 v12 M50 60 v12 M57 60 v12 M36 66 h28" stroke="${D}" stroke-width="1.6"/>
      <path d="M16 30 v10 M12 34 l8 2 M12 36 l8 -2 M84 66 v10 M80 70 l8 2 M80 72 l8 -2"
            stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`),

    hot: face("#FF9A6B", `
      ${eyeDots(43)}
      <ellipse cx="50" cy="64" rx="8" ry="6" fill="#7a3b2b"/>
      <path d="M46 66 q4 10 8 0 Z" fill="#E8535A"/>
      <path d="M24 34 q-5 7 0 13 q5 -6 0 -13 M74 30 q-5 7 0 13 q5 -6 0 -13"
            fill="#fff" opacity=".85"/>`),
  };

  window.FEELING_PICS = PICS;
})();
