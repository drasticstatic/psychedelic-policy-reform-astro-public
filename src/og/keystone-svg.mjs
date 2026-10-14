// The initiative's figure: a stone arch whose keystone is set, and a sprout growing beneath it.
// Pennsylvania is the Keystone State, and an arch only stands once its keystone is in: the picture
// says what this work is for (one clear protection that holds the rest up) without saying anything
// about anyone.
//
// Seeded by a key (an entry's slug), so every share card gets a sprout of its own (how many leaves,
// how it leans, which stones catch the light) that stays the same from build to build. Same pattern
// as the arrival kit's spore-svg.mjs, with this initiative's own figure in its place.
//
// Every element carries a class (ks-stone, ks-key, ks-pier, ks-ground, ks-sprout, ks-leaf, ks-lit)
// as well as plain colors, so the porch can draw the same figure inline and recolor it per mode with
// CSS (a class rule beats a presentation attribute).

function fnv(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function mulberry(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n) => n.toFixed(2);

/**
 * archSvg(seed, opts) → an SVG string.
 * opts: { width, height, cx, cy (the arch's springing line), ri, ro (inner and outer radius),
 *         stones (odd: the middle one is the keystone), stone (keystone color), line (the other
 *         stones' outline), fill (their face), leaf (the sprout), lit (the color a few stones catch),
 *         ground (bottom of the piers; default: the height), title? (an accessible name) }
 */
export function archSvg(seed, o = {}) {
  const rand = mulberry(fnv(String(seed || "keystone")));
  const W = o.width ?? 560;
  const H = o.height ?? 630;
  const cx = o.cx ?? W / 2;
  const cy = o.cy ?? H * 0.72;
  const ri = o.ri ?? W * 0.3;
  const ro = o.ro ?? W * 0.46;
  const n = o.stones ?? 9;
  const ground = o.ground ?? H;
  const stone = o.stone ?? "#e0b65e";
  const line = o.line ?? "rgba(227, 233, 238, 0.4)";
  const fill = o.fill ?? "rgba(227, 233, 238, 0.05)";
  const leaf = o.leaf ?? "#84d1a5";
  const lit = o.lit ?? leaf;
  const sw = o.strokeWidth ?? Math.max(1.2, W / 320);
  const pt = (r, a) => [cx + r * Math.cos(a), cy - r * Math.sin(a)];
  const gap = 0.018;
  const step = Math.PI / n;
  const key = Math.floor(n / 2);
  // Two or three stones beside the keystone catch a little light, different on every card.
  const litSet = new Set();
  const litCount = 2 + Math.floor(rand() * 2);
  while (litSet.size < litCount) {
    const k = Math.floor(rand() * n);
    if (k !== key) litSet.add(k);
  }

  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"${o.title ? ` role="img" aria-label="${o.title}"` : ""}>`;

  // The voussoirs, left to right; the keystone is drawn last, standing proud of the others.
  for (let k = 0; k < n; k++) {
    if (k === key) continue;
    const a1 = Math.PI - k * step - gap;
    const a2 = Math.PI - (k + 1) * step + gap;
    const [x1, y1] = pt(ri, a1);
    const [x2, y2] = pt(ro, a1);
    const [x3, y3] = pt(ro, a2);
    const [x4, y4] = pt(ri, a2);
    const isLit = litSet.has(k);
    s +=
      `<path class="ks-stone${isLit ? " ks-lit" : ""}" d="M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)} A${f(ro)} ${f(ro)} 0 0 1 ${f(x3)} ${f(y3)} L${f(x4)} ${f(y4)} A${f(ri)} ${f(ri)} 0 0 0 ${f(x1)} ${f(y1)} Z"` +
      ` fill="${isLit ? lit : fill}" fill-opacity="${isLit ? (0.1 + rand() * 0.08).toFixed(2) : 1}" stroke="${line}" stroke-width="${f(sw)}" stroke-linejoin="round"/>`;
  }
  {
    const a1 = Math.PI - key * step - gap;
    const a2 = Math.PI - (key + 1) * step + gap;
    const rki = ri - (ro - ri) * 0.06;
    const rko = ro + (ro - ri) * 0.16;
    // A keystone flares: wider at the crown than at the soffit.
    const flare = step * 0.12;
    const [x1, y1] = pt(rki, a1);
    const [x2, y2] = pt(rko, a1 + flare);
    const [x3, y3] = pt(rko, a2 - flare);
    const [x4, y4] = pt(rki, a2);
    s +=
      `<path class="ks-key" d="M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)} L${f(x3)} ${f(y3)} L${f(x4)} ${f(y4)} A${f(rki)} ${f(rki)} 0 0 0 ${f(x1)} ${f(y1)} Z"` +
      ` fill="${stone}" stroke="${stone}" stroke-width="${f(sw)}" stroke-linejoin="round"/>`;
  }

  // The piers the arch springs from, down to the ground.
  const pier = (x0, x1) =>
    `<path class="ks-pier" d="M${f(x0)} ${f(cy)} L${f(x1)} ${f(cy)} L${f(x1)} ${f(ground)} L${f(x0)} ${f(ground)} Z" fill="${fill}" stroke="${line}" stroke-width="${f(sw)}" stroke-linejoin="round"/>`;
  s += pier(cx - ro, cx - ri) + pier(cx + ri, cx + ro);
  // Courses in the piers.
  const course = (ro - ri) * 0.55;
  for (let y = cy + course; y < ground - 4; y += course) {
    s += `<path class="ks-ground" d="M${f(cx - ro)} ${f(y)} H${f(cx - ri)} M${f(cx + ri)} ${f(y)} H${f(cx + ro)}" stroke="${line}" stroke-width="${f(sw * 0.7)}" stroke-opacity="0.6"/>`;
  }

  // The sprout: a stem rising from the ground under the arch, leaning a little, with leaves in pairs.
  const base = ground - 2;
  const top = cy - ri * (0.42 + rand() * 0.16);
  const lean = (rand() - 0.5) * ri * 0.22;
  const sx = cx + (rand() - 0.5) * ri * 0.12;
  const c1x = sx + lean * 0.2;
  const c2x = sx + lean * 1.1;
  const tx = sx + lean;
  s += `<path class="ks-sprout" d="M${f(sx)} ${f(base)} C${f(c1x)} ${f(base - (base - top) * 0.45)} ${f(c2x)} ${f(top + (base - top) * 0.3)} ${f(tx)} ${f(top)}" fill="none" stroke="${leaf}" stroke-width="${f(sw * 2.3)}" stroke-linecap="round"/>`;
  const pairs = 2 + Math.floor(rand() * 2);
  const bez = (t) => {
    const u = 1 - t;
    const y0 = base, y1 = base - (base - top) * 0.45, y2 = top + (base - top) * 0.3, y3 = top;
    return [
      u * u * u * sx + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * tx,
      u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3,
    ];
  };
  const leafPath = (x, y, len, ang, side) => {
    // A leaf from (x, y), pointing at `ang` (radians, 0 = right), bulging to one side.
    const ex = x + len * Math.cos(ang);
    const ey = y - len * Math.sin(ang);
    const nx = -Math.sin(ang) * side;
    const ny = -Math.cos(ang) * side;
    const w = len * 0.42;
    const m1x = x + (ex - x) * 0.35 + nx * w;
    const m1y = y + (ey - y) * 0.35 + ny * w;
    const m2x = x + (ex - x) * 0.6 - nx * w * 0.25;
    const m2y = y + (ey - y) * 0.6 - ny * w * 0.25;
    return `<path class="ks-leaf" d="M${f(x)} ${f(y)} Q${f(m1x)} ${f(m1y)} ${f(ex)} ${f(ey)} Q${f(m2x)} ${f(m2y)} ${f(x)} ${f(y)} Z" fill="${leaf}"/>`;
  };
  for (let p = 0; p < pairs; p++) {
    const t = 0.38 + (p / pairs) * 0.5 + rand() * 0.06;
    const [x, y] = bez(Math.min(t, 0.96));
    const len = ri * (0.3 - p * 0.05) * (0.85 + rand() * 0.3);
    const tilt = 0.35 + rand() * 0.35;
    s += leafPath(x, y, len, Math.PI - tilt, 1);
    s += leafPath(x, y, len * (0.85 + rand() * 0.2), tilt, -1);
  }
  // A last, small leaf at the tip.
  s += leafPath(tx, top, ri * 0.14, Math.PI / 2 + (rand() - 0.5) * 0.6, rand() > 0.5 ? 1 : -1);
  s += "</svg>";
  return s;
}
