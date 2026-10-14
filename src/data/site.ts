// One place for the AstroLog's facts: where it lives, its project buckets, its people, and the small
// helpers every page shares.

export const SITE = "https://drasticstatic.github.io";
export const BASE = "/psychedelic-policy-reform-astro-public";
export const LOG = `${SITE}${BASE}`;
export const NAME = "Psychedelic Policy Reform";
// The dApp preview: the other half of the initiative's suite.
export const DAPP = `${SITE}/psychedelic-policy-reform-dapp-public-preview`;
// The arrival kit (navbar, contact and community windows, splash, light & motion, reading mode,
// "/" search, what's new, avatars), served from this AstroLog's own /arrival/ folder. The initiative
// has no organization portal, so this site is where the kit lives; the dApp preview loads the very
// same files by absolute URL.
export const KIT = `${LOG}/arrival`;
// The guide's progress glyph and the initials avatars draw from these (keystone gold, sage leaf,
// slate blues); the ledger colors its kinds with them. Same list as org.js `wedges`.
export const STONES = ["#e0b65e", "#84d1a5", "#7fa7d9", "#c99a4a", "#5fb487", "#a7c4e6", "#f0d08f", "#3f8f6a"];

export type Bucket = {
  slug: string;
  icon: string;
  name: string;
  description: string;
  comingSoon?: boolean;
  externalUrl?: string;
  externalLabel?: string;
};

// Each changelog entry's `repo:` frontmatter field is one of these slugs. A bucket with no entries
// yet still shows (muted) when `comingSoon` is set.
export const BUCKETS: Bucket[] = [
  {
    slug: "initiative",
    icon: "ph-flag-banner",
    name: "The initiative",
    description: "What this work is for, who it serves, and how it's organized.",
  },
  {
    slug: "astrolog",
    icon: "ph-door-open",
    name: "This AstroLog",
    description: "The changelog, library, map and ledger you're reading.",
    comingSoon: true,
  },
  {
    slug: "dapp",
    icon: "ph-cube",
    name: "The dApp preview",
    description: "The evidence library's future home, and a pledge you can try with a wallet signature.",
    comingSoon: true,
    externalUrl: DAPP + "/",
    externalLabel: "Open the preview",
  },
  {
    slug: "evidence",
    icon: "ph-folder-open",
    name: "Evidence library",
    description: "Sources on law, court decisions, research and practice, gathered and reviewed with care.",
    comingSoon: true,
    externalUrl: DAPP + "/evidence",
    externalLabel: "See the structure",
  },
  {
    slug: "pennsylvania",
    icon: "ph-map-pin",
    name: "The Pennsylvania lane",
    description: "How the law and policy look from Pennsylvania, where this work is seen from.",
    comingSoon: true,
  },
];
export const bucketBySlug = (slug?: string) => BUCKETS.find((b) => b.slug === slug);

// First name and last initial on public pages, with no period. `match` is how a person appears at
// the start of an entry's `who` field ("Christopher W" credits Christopher). `github` gives the
// avatar. Nothing more about anyone is published than what's written here.
export type Person = { name: string; role: string; match: string; aliases?: string[]; github?: string; email?: string };
export const PEOPLE: Person[] = [
  { name: "Christopher W", role: "Started this initiative, and builds and keeps these pages, with Alfred.", match: "Christopher", github: "drasticstatic" },
];

// Everyone named in a `who` field, in the order they're named.
export const peopleIn = (who?: string): Person[] => {
  if (!who) return [];
  return PEOPLE.map((p) => ({ p, at: Math.min(...[p.match, ...(p.aliases ?? [])].map((n) => who.indexOf(n)).filter((i) => i >= 0)) }))
    .filter((x) => Number.isFinite(x.at))
    .sort((a, b) => a.at - b.at)
    .map((x) => x.p);
};

// Entries where this person did the work (named first).
export const madeBy = (p: Person, who?: string) => !!who && who.startsWith(p.match);

export const PRIORITY: Record<string, string> = {
  "P1-high": "High",
  "P2-medium": "Medium",
  "P3-low": "Low",
};

export const entrySlug = (id: string) => id.replace(/\.md$/, "");

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

// The one-line TL;DR an entry opens with (used for meta descriptions, search and social cards).
export const tldrOf = (body = "") =>
  body
    .match(/<strong>TL;DR:<\/strong>\s*([\s\S]*?)<\/span><\/div>/)?.[1]
    ?.replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim() ?? "";
