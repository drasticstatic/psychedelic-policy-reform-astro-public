// Psychedelic Policy Reform's signature share card (arrival kit 1.2: "a signature card per org").
// The spore-card.mjs layout from my-template changelog-template/arrival/og/, with this initiative's
// own figure in place of the spore print: a stone arch with its keystone set and a sprout beneath it,
// rising off the right edge (keystone-svg.mjs, seeded per card so each one differs and stays the
// same from build to build). Same call and spec as the kit's generators:
//
//   const jpeg = await renderCard({ eyebrow, kicker, title, summary, meta, footer, seed, hero? }, THEME, base)
//
// A 1200×630 JPEG for og:image / twitter:image, rendered at build time: Satori lays out the card
// and turns the text into paths, sharp writes the JPEG; fonts and images are read from disk, no
// network. theme.frame draws the formal double hairline. Never a count on a card: link previews are
// cached for weeks. Fonts must be TTF/OTF/WOFF (not WOFF2). `base` is a file: URL that font and mark
// paths resolve against; resolve it from the project folder, since Astro bundles the caller.
import satori from "satori";
import sharp from "sharp";
import fs from "node:fs";
import { archSvg } from "./keystone-svg.mjs";

export const W = 1200;
export const H = 630;

// Every box is border-box: satori 0.18 laid boxes out that way, but satori 0.63 follows CSS
// (content-box), so a box with a set width or height plus padding or a border overflowed and the
// card's frame and footer were cut off. This default draws the same card on both versions.
const h = (type, style, children) => ({ type, props: { style: { boxSizing: "border-box", ...style }, children } });
const img = (src, width, height, style = {}) => ({ type: "img", props: { src, width, height, style } });
const clip = (s, n) => (s && s.length > n ? s.slice(0, n - 1).replace(/[\s,.;:]+\S*$/, "") + "…" : s || "");
const svgData = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
const rgba = (hex, a) => `rgba(${[1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(", ")}, ${a})`;

const fontCache = new Map();
function fonts(T, base) {
  const key = JSON.stringify(T.fonts) + base;
  if (fontCache.has(key)) return fontCache.get(key);
  const out = [];
  for (const role of ["heading", "body"]) {
    const font = T.fonts[role];
    for (const [weight, file] of Object.entries(font.files)) {
      out.push({ name: font.name, data: fs.readFileSync(new URL(file, base)), weight: Number(weight), style: "normal" });
    }
  }
  fontCache.set(key, out);
  return out;
}

const markCache = new Map();
async function mark(T, base) {
  if (!T.mark) return null;
  if (!markCache.has(T.mark)) {
    const png = await sharp(fs.readFileSync(new URL(T.mark, base))).resize(112, 112).png().toBuffer();
    markCache.set(T.mark, `data:image/png;base64,${png.toString("base64")}`);
  }
  return markCache.get(T.mark);
}

/**
 * spec: { eyebrow, kicker?, title, summary?, meta?, footer?, seed?, hero? }
 * theme: { background, heading, text, muted, accent, leaf, line, fill, glow, leafGlow, mark?, frame?, fonts }
 */
export async function renderCard(spec, T, base) {
  const hero = !!spec.hero;
  const title = clip(spec.title, 110);
  const titleSize = hero ? (title.length > 22 ? 80 : 100) : title.length > 84 ? 46 : title.length > 58 ? 53 : title.length > 32 ? 60 : 70;
  const summary = clip(spec.summary, hero ? 120 : title.length > 58 ? 132 : 168);
  const m = await mark(T, base);
  const arch = archSvg(spec.seed || spec.title, {
    width: 560,
    height: H,
    cx: 330,
    cy: 452,
    ri: 178,
    ro: 276,
    stone: T.accent,
    line: T.line,
    fill: T.fill,
    leaf: T.leaf,
    lit: T.leaf,
    strokeWidth: 2,
  });
  const glows = `radial-gradient(circle at 88% 40%, ${T.glow} 0%, transparent 36%), radial-gradient(circle at 0% 0%, ${T.leafGlow} 0%, transparent 46%)`;
  const rule = h("div", { display: "flex", alignItems: "center", marginTop: 24, marginBottom: 20 }, [
    h("div", { width: 120, height: 2, backgroundColor: T.accent, opacity: 0.9 }, ""),
    // a tiny keystone at the end of the rule
    img(svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M3 3 H17 L13.5 17 H6.5 Z" fill="${T.accent}"/></svg>`), 14, 14, { marginLeft: 10 }),
    h("div", { width: 40, height: 2, marginLeft: 10, backgroundColor: T.leaf, opacity: 0.7 }, ""),
  ]);
  const pad = T.frame ? "64px 86px 58px" : "54px 72px 48px";

  const tree = h(
    "div",
    {
      position: "relative",
      width: W,
      height: H,
      display: "flex",
      flexDirection: "column",
      padding: pad,
      backgroundColor: T.background,
      backgroundImage: glows,
      fontFamily: T.fonts.body.name,
    },
    [
      img(svgData(arch), 560, H, { position: "absolute", left: 640, top: 0 }),
      // The formal frame: two hairlines in the accent, inset from the edge.
      T.frame ? h("div", { position: "absolute", left: 24, top: 24, width: W - 48, height: H - 48, border: `1.5px solid ${rgba(T.accent, 0.7)}`, borderRadius: 6 }, "") : null,
      T.frame ? h("div", { position: "absolute", left: 32, top: 32, width: W - 64, height: H - 64, border: `1px solid ${rgba(T.accent, 0.28)}`, borderRadius: 3 }, "") : null,
      // top: the mark, the eyebrow, the kicker
      h("div", { display: "flex", alignItems: "center" }, [
        m ? img(m, 56, 56, { marginRight: 20 }) : null,
        h("div", { display: "flex", flexDirection: "column" }, [
          h("div", { fontSize: 20, fontWeight: 700, letterSpacing: 4.2, textTransform: "uppercase", color: T.muted }, spec.eyebrow || ""),
          spec.kicker ? h("div", { fontSize: 24, fontWeight: 700, color: T.accent, marginTop: 3 }, spec.kicker) : null,
        ].filter(Boolean)),
      ].filter(Boolean)),
      // middle: the title, a rule, the summary
      h("div", { display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, width: 590 }, [
        h("div", { fontFamily: T.fonts.heading.name, fontWeight: 600, fontSize: titleSize, lineHeight: 1.1, color: T.heading, letterSpacing: hero ? -1 : -0.4 }, title),
        rule,
        summary ? h("div", { fontSize: hero ? 29 : 26, lineHeight: 1.42, color: T.text }, summary) : null,
      ].filter(Boolean)),
      // bottom: when and who, and where
      h("div", { display: "flex", alignItems: "center", fontSize: 20, color: T.muted, width: 760 }, [
        h("div", { display: "flex", flexShrink: 0 }, spec.meta || ""),
        spec.meta && spec.footer ? h("div", { display: "flex", margin: "0 12px", color: T.leaf }, "·") : null,
        spec.footer ? h("div", { display: "flex", flexShrink: 0, color: T.accent, fontWeight: 700 }, spec.footer) : null,
      ].filter(Boolean)),
    ].filter(Boolean)
  );

  const svg = await satori(tree, { width: W, height: H, fonts: fonts(T, base) });
  return sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
}
