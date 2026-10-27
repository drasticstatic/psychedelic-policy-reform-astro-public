// Share cards for the site's own pages (kit 1.2): the porch and the dApp preview (the big-name
// "hero" layout), the record's pages, the dApp's pages, and the ways in. Each one is also the
// thumbnail the map shows for that destination, so the map's pictures are exactly what a shared link
// shows. Built once per build at /og/page/<slug>.jpg (src/pages/og/page/[slug].jpg.ts). The dApp
// preview's own og:image tags point here too, so one generator draws every card. No counts on any
// card: link previews are cached for weeks.
import path from "node:path";
import { pathToFileURL } from "node:url";
import { renderCard } from "./keystone-card.mjs";
import { CARD_THEME } from "./theme.mjs";
import { LOG, NAME, SITE } from "../data/site";

const HOST = new URL(SITE).host;
const OG_DIR = pathToFileURL(path.resolve("src/og") + "/");

export const pageCardUrl = (slug: string) => `${LOG}/og/page/${slug}.jpg`;

type PageCard = { slug: string; eyebrow: string; kicker?: string; title: string; summary?: string; footer?: string; hero?: boolean };

export const PAGE_CARDS: PageCard[] = [
  { slug: "porch", hero: true, eyebrow: `${NAME} · AstroLog`, title: NAME, summary: "Religious freedom for sincere sacramental practice, seen from Pennsylvania", footer: `${HOST}/psychedelic-policy-reform-astro-public` },
  { slug: "changelog", eyebrow: `${NAME} · Changelog`, kicker: "What changed", title: "Every change, newest first", summary: "Short, dated entries in plain language, each with the full story folded underneath and credit to whoever did the work.", footer: HOST },
  { slug: "library", eyebrow: `${NAME} · Library`, kicker: "In plain words", title: "Explainers and write-ups", summary: "Plain-language explainers on the law and the evidence, starting with RFRA, each one reviewed before it's called final.", footer: HOST },
  { slug: "map", eyebrow: `${NAME} · Map`, kicker: "Where everything is", title: "Every place these pages lead", summary: "The AstroLog, the dApp preview, the record and the ways in, each with a picture of where it goes.", footer: HOST },
  { slug: "roadmap", eyebrow: `${NAME} · Roadmap`, kicker: "Where it's headed", title: "What comes next", summary: "An evidence library, a Pennsylvania lane, the four healing communities it wants to see protected, partners to be announced, and tokens of gratitude later.", footer: HOST },
  { slug: "sustainability", eyebrow: `${NAME} · Sustainability`, kicker: "What keeps it running", title: "Nothing left to memory", summary: "The tokens, the scheduled jobs, the shared kit, the wallet connection and the cached previews, and the plan for these pages to outlive any one person.", footer: HOST },
  { slug: "dapp", hero: true, eyebrow: `${NAME} · dApp preview`, title: "The dApp preview", summary: "An evidence library taking shape, and a pledge you can try with a wallet signature", footer: `${HOST}/psychedelic-policy-reform-dapp-public-preview` },
  { slug: "dapp-evidence", eyebrow: `${NAME} · Evidence`, kicker: "Coming soon", title: "The evidence library", summary: "Law, court decisions, research and practice, gathered with care and reviewed before publishing. The shelves are built; the sources come next.", footer: HOST },
  { slug: "dapp-pledge", eyebrow: `${NAME} · Pledge`, kicker: "Preview: nothing is recorded yet", title: "A pledge of support, signed with a wallet", summary: "Try signing a short statement of support with a wallet signature. No gas, no contract, and nothing is sent or saved.", footer: HOST },
  { slug: "dapp-updates", eyebrow: `${NAME} · Updates`, kicker: "From the AstroLog", title: "What's new", summary: "The latest entries and write-ups from the initiative's AstroLog, and where to follow along.", footer: HOST },
  { slug: "dapp-about", eyebrow: `${NAME} · About`, kicker: "What this is", title: "About the initiative", summary: "An RFRA-based policy and evidence initiative, seen from Pennsylvania, for communities whose sincere practice includes sacraments the law still restricts.", footer: HOST },
  { slug: "communities", eyebrow: `${NAME} · Communities`, kicker: "Where Christopher W serves", title: "The communities Christopher W serves", summary: "PIR®, The Holy Earth Foundation, ORG, Psanctuary and Psanctuary Church, each in its own words and at its home on GitHub, and the Facebook groups where people gather.", footer: HOST },
  // The Community window's card, from before it became the Communities page; kept for links that
  // still carry it.
  { slug: "community", eyebrow: `${NAME} · Community`, kicker: "Where we gather", title: "Facebook groups in Pennsylvania", summary: "Pennsylvania Psychedelic Reform and Pennsylvania RFRA, two related NORML groups, and further out, a supporters' network of our own.", footer: HOST },
  { slug: "contact", eyebrow: `${NAME} · Reach out`, kicker: "Every way in", title: "Reach the initiative", summary: "Every way in, in one place: GitHub today, and an address and a form as the initiative grows.", footer: HOST },
  { slug: "github", eyebrow: `${NAME} · GitHub`, kicker: "The code", title: "The code, in the open", summary: "The public repositories behind these pages, built from private sources so only finished pages are published.", footer: "github.com/drasticstatic" },
];

export async function pageCard(slug: string) {
  const c = PAGE_CARDS.find((x) => x.slug === slug);
  if (!c) throw new Error(`[og] no page card "${slug}"`);
  const buf = await renderCard({ ...c, seed: `page/${slug}` }, CARD_THEME, OG_DIR);
  return new Response(new Uint8Array(buf), { headers: { "Content-Type": "image/jpeg" } });
}
