/**
 * Generates the replaceable SAMPLE images in /public/images.
 *
 * These are clearly-labelled, on-brand line illustrations used until real
 * project photography is available. To use real photos, simply overwrite
 * the JPG files in /public/images with your own (same file names), or add
 * new files and point to them from src/data/*.ts.
 *
 *   npm run images
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "images");
const W = 1600;
const H = 1100;

const C = {
  bg: "#222831",
  bg2: "#1b2027",
  grid: "#2b323c",
  steel: "#52616B",
  line: "#C9D3DB",
  dim: "#7D8C96",
  accent: "#F28C28",
};

const s = (d, color = C.line, w = 6, extra = "") =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const rect = (x, y, w, h, color = C.line, sw = 6, fill = "none", rx = 0) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${color}" stroke-width="${sw}"/>`;
const range = (n) => [...Array(n).keys()];

const ground = (y = 900) => s(`M120 ${y} H1480`, C.dim, 4) +
  range(28).map((i) => s(`M${140 + i * 48} ${y} l-22 26`, C.grid, 3)).join("");

const sparks = (cx, cy, n = 22, r = 160) =>
  range(n)
    .map((i) => {
      const a = (-Math.PI * 0.95) + (i / n) * Math.PI * 0.9 + (i % 3) * 0.04;
      const r1 = 18 + (i % 4) * 10;
      const r2 = r * (0.45 + ((i * 37) % 55) / 100);
      return s(
        `M${(cx + Math.cos(a) * r1).toFixed(1)} ${(cy + Math.sin(a) * r1).toFixed(1)} L${(cx + Math.cos(a) * r2).toFixed(1)} ${(cy + Math.sin(a) * r2).toFixed(1)}`,
        i % 4 === 0 ? "#FFD08A" : C.accent,
        i % 3 === 0 ? 4 : 2.5,
      );
    })
    .join("") + `<circle cx="${cx}" cy="${cy}" r="14" fill="#FFE2B8"/><circle cx="${cx}" cy="${cy}" r="34" fill="${C.accent}" opacity="0.25"/>`;

/* ── Motifs ─────────────────────────────────────────────────────────────── */
const motifs = {
  gate: () => {
    const bars = (x0, w) => range(9).map((i) => s(`M${x0 + 30 + i * ((w - 60) / 8)} 380 V840`, C.line, 7)).join("");
    return ground() +
      rect(300, 300, 50, 600, C.steel, 6, C.steel) + rect(1250, 300, 50, 600, C.steel, 6, C.steel) +
      rect(360, 360, 435, 500) + rect(805, 360, 435, 500) +
      bars(360, 435) + bars(805, 435) +
      s("M360 470 H795 M805 470 H1240 M360 760 H795 M805 760 H1240", C.line, 6) +
      s("M360 360 Q577 250 795 360 M805 360 Q1022 250 1240 360", C.accent, 7) +
      s("M770 600 v40 M830 600 v40", C.accent, 10);
  },
  ssgate: () =>
    ground() + rect(300, 330, 50, 570, C.steel, 6, C.steel) + rect(1250, 330, 50, 570, C.steel, 6, C.steel) +
    rect(360, 380, 880, 480) +
    range(10).map((i) => s(`M360 ${420 + i * 44} H1240`, i === 4 ? C.accent : C.line, i === 4 ? 8 : 5)).join("") +
    s("M800 380 V860", C.line, 6),
  railing: () =>
    s("M180 900 L1420 300", C.steel, 18) + s("M200 760 L1420 170", C.line, 10) +
    range(16).map((i) => {
      const x = 260 + i * 72;
      const yTop = 760 - (x - 200) * (590 / 1220);
      const yBot = 900 - (x - 180) * (600 / 1240);
      return s(`M${x} ${yTop.toFixed(0)} V${yBot.toFixed(0)}`, C.line, 5);
    }).join("") + s("M200 760 L200 900 M1420 170 V300", C.accent, 10),
  balcony: () =>
    ground(860) + rect(200, 860, 1200, 40, C.steel, 4, C.steel) +
    s("M200 520 H1400", C.accent, 12) + s("M200 520 V860 M1400 520 V860", C.line, 8) +
    range(4).map((i) => rect(240 + i * 290, 560, 250, 280, C.dim, 4, "#2a3440")).join("") +
    range(4).map((i) => s(`M${270 + i * 290} 600 l60 -30`, C.line, 3, 'opacity="0.6"')).join(""),
  grill: () =>
    rect(400, 220, 800, 680, C.steel, 26) +
    range(7).map((i) => s(`M${400 + (i + 1) * 100} 233 V887`, C.line, 6)).join("") +
    range(5).map((i) => s(`M413 ${220 + (i + 1) * 113} H1187`, C.line, 6)).join("") +
    range(3).map((i) => `<circle cx="${600 + i * 200}" cy="560" r="44" fill="none" stroke="${C.accent}" stroke-width="6"/>`).join(""),
  structure: () =>
    ground() + s("M200 360 H1400 M200 420 H1400", C.line, 10) + s("M200 820 H1400 M200 880 H1400", C.line, 10) +
    range(7).map((i) => s(`M${200 + i * 200} 420 L${300 + i * 200} 820 L${400 + i * 200} 420`, C.steel, 8)).join("") +
    s("M200 360 V880 M1400 360 V880", C.accent, 12),
  welding: () =>
    rect(220, 640, 1160, 70, C.steel, 4, C.steel) + rect(300, 560, 480, 80, C.line, 5) + rect(820, 560, 480, 80, C.line, 5) +
    s("M780 600 H820", C.accent, 12) +
    s("M1180 220 L860 520", C.line, 26) + s("M1180 220 L1330 120", C.dim, 14) + s("M860 520 L815 575", C.accent, 10) +
    sparks(805, 590, 30, 260),
  frames: () =>
    rect(260, 260, 420, 600) + rect(300, 300, 340, 520, C.dim, 4) +
    rect(760, 380, 580, 400) + rect(800, 420, 500, 320, C.dim, 4) +
    s("M680 560 H760", C.accent, 8) + s("M260 860 l30 30 M680 860 l-30 30", C.accent, 6),
  industrial: () =>
    ground() + rect(260, 300, 300, 600, C.steel, 6) + rect(1040, 300, 300, 600, C.steel, 6) +
    s("M200 300 H1400", C.line, 14) + s("M560 400 L1040 400 M560 400 L800 300 L1040 400", C.line, 7) +
    s("M800 300 V560", C.dim, 4) + rect(740, 560, 120, 90, C.accent, 6) + sparks(1150, 700, 18, 140),
  slidingWindow: () =>
    rect(300, 240, 1000, 640, C.line, 26, "#2a3440", 6) +
    rect(330, 270, 500, 580, C.line, 10) + rect(770, 290, 500, 560, C.dim, 10) +
    s("M380 330 l140 -40 M800 340 l140 -40", C.line, 3, 'opacity="0.5"') +
    s("M560 560 H700 M680 540 l20 20 -20 20", C.accent, 7),
  casement: () =>
    rect(380, 220, 840, 680, C.line, 26, "#2a3440", 6) + s("M800 233 V887", C.line, 12) +
    s("M800 260 L1080 320 V800 L800 860 Z", C.accent, 7) + s("M413 260 H780 V860 H413 Z", C.dim, 6),
  fixedWindow: () =>
    rect(260, 260, 1080, 600, C.line, 26, "#2a3440", 6) + s("M620 273 V847 M980 273 V847", C.line, 10) +
    s("M320 340 l160 -50 M680 340 l160 -50 M1040 340 l160 -50", C.line, 3, 'opacity="0.5"') + s("M260 900 H1340", C.accent, 8),
  slidingDoor: () =>
    ground(910) + rect(260, 160, 1080, 750, C.line, 24, "#2a3440", 4) +
    rect(290, 190, 360, 700, C.dim, 8) + rect(620, 190, 360, 700, C.line, 10) + rect(950, 190, 360, 700, C.dim, 8) +
    s("M940 540 V620", C.accent, 12) + s("M700 960 H900 M880 940 l20 20 -20 20", C.accent, 6),
  door: () =>
    ground(910) + rect(560, 160, 480, 750, C.line, 22, "#2a3440", 4) +
    rect(620, 220, 360, 270, C.dim, 6) + rect(620, 540, 360, 300, C.dim, 6) + s("M960 560 V640", C.accent, 14),
  mesh: () =>
    rect(380, 220, 840, 680, C.line, 24, "#2a3440", 6) +
    range(40).map((i) => s(`M${400 + i * 20} 236 V884`, C.dim, 1.5)).join("") +
    range(32).map((i) => s(`M396 ${240 + i * 20} H1204`, C.dim, 1.5)).join("") + s("M1180 520 V600", C.accent, 12),
  balconyWindow: () =>
    rect(200, 200, 1200, 520, C.line, 22, "#2a3440", 4) + range(3).map((i) => s(`M${500 + i * 300} 210 V710`, C.line, 10)).join("") +
    rect(200, 720, 1200, 40, C.steel, 4, C.steel) + s("M200 880 H1400", C.accent, 10) +
    range(13).map((i) => s(`M${220 + i * 96} 760 V880`, C.dim, 5)).join(""),
  house: () =>
    ground(900) + s("M260 520 L800 200 L1340 520", C.line, 10) + rect(330, 500, 940, 400, C.line, 8) +
    rect(400, 580, 260, 180, C.dim, 6, "#2a3440") + rect(940, 580, 260, 180, C.dim, 6, "#2a3440") +
    s("M530 580 V760 M1070 580 V760", C.dim, 4) + rect(720, 640, 160, 260, C.accent, 7) +
    range(9).map((i) => s(`M${150 + i * 18} 900 V820`, C.line, 4)).join("") + range(9).map((i) => s(`M${1300 + i * 18} 900 V820`, C.line, 4)).join(""),
  commercial: () =>
    ground(920) + rect(380, 180, 840, 740, C.line, 8) +
    range(5).map((r) => range(5).map((c) => rect(430 + c * 154, 230 + r * 120, 124, 90, C.dim, 4, "#2a3440")).join("")).join("") +
    rect(700, 820, 200, 100, C.accent, 7),
  workshop: () =>
    ground(900) + s("M160 180 H1440", C.dim, 6) + s("M500 180 V300 M1100 180 V300", C.dim, 4) +
    s("M440 300 H560 M1040 300 H1160", C.line, 10) + rect(280, 640, 640, 40, C.line, 6, C.steel) +
    s("M320 680 V900 M880 680 V900", C.line, 8) + rect(1000, 520, 320, 380, C.steel, 6) +
    rect(1040, 560, 240, 120, C.dim, 4) + rect(380, 560, 300, 80, C.line, 5) + sparks(700, 620, 20, 170),
  team: () =>
    ground(900) + range(4).map((i) => {
      const x = 360 + i * 300;
      return `<circle cx="${x}" cy="420" r="62" fill="none" stroke="${i === 1 ? C.accent : C.line}" stroke-width="7"/>` +
        s(`M${x - 62} 395 Q${x} 330 ${x + 62} 395`, i === 1 ? C.accent : C.line, 7) +
        s(`M${x - 120} 900 V640 Q${x - 120} 520 ${x} 520 Q${x + 120} 520 ${x + 120} 640 V900`, C.line, 7);
    }).join(""),
};

/* ── Image list ─────────────────────────────────────────────────────────── */
export const images = [
  ["hero-workshop", "workshop", "Fabrication workshop"],
  ["welding", "welding", "Welding work"],
  ["ms-gate", "gate", "MS entrance gate"],
  ["ss-gate", "ssgate", "Stainless steel gate"],
  ["staircase-railing", "railing", "Staircase railing"],
  ["balcony-railing", "balcony", "Balcony railing"],
  ["window-grill", "grill", "Window safety grill"],
  ["structural", "structure", "Structural fabrication"],
  ["metal-frames", "frames", "Custom metal frames"],
  ["industrial", "industrial", "Industrial fabrication"],
  ["upvc-sliding-window", "slidingWindow", "uPVC sliding window"],
  ["upvc-casement-window", "casement", "uPVC casement window"],
  ["upvc-fixed-window", "fixedWindow", "uPVC fixed window"],
  ["upvc-sliding-door", "slidingDoor", "uPVC sliding door"],
  ["upvc-door", "door", "uPVC door"],
  ["mosquito-mesh", "mesh", "Mosquito mesh"],
  ["balcony-window", "balconyWindow", "Balcony window"],
  ["residential", "house", "Residential project"],
  ["commercial", "commercial", "Commercial project"],
  ["team", "team", "Our team"],
];

const svgFor = (motif, label) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${C.grid}" stroke-width="1"/></pattern>
    <radialGradient id="v" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="${C.bg}"/><stop offset="1" stop-color="${C.bg2}"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#v)"/>
  <rect width="${W}" height="${H}" fill="url(#g)" opacity="0.8"/>
  <g>${motifs[motif]()}</g>
  <path d="M60 60 h60 M60 60 v60 M${W - 60} ${H - 60} h-60 M${W - 60} ${H - 60} v-60" stroke="${C.accent}" stroke-width="5" fill="none"/>
  <rect x="60" y="${H - 108}" width="${Math.max(420, label.length * 17 + 300)}" height="48" fill="${C.bg2}" stroke="${C.steel}" stroke-width="2"/>
  <text x="80" y="${H - 76}" font-family="DejaVu Sans Mono, monospace" font-size="20" fill="${C.line}" letter-spacing="2">SAMPLE IMAGE · ${label.toUpperCase()}</text>
</svg>`;

await mkdir(OUT, { recursive: true });
for (const [file, motif, label] of images) {
  await sharp(Buffer.from(svgFor(motif, label)))
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(OUT, `${file}.jpg`));
  console.log("✓", `${file}.jpg`);
}
