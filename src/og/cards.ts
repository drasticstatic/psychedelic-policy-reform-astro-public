// Social cards for the AstroLog's entries, write-ups and ledger: one 1200×630 JPEG each, rendered at
// build time by the initiative's signature card (keystone-card.mjs), each with a sprout of its own.
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { CollectionEntry } from "astro:content";
import { renderCard } from "./keystone-card.mjs";
import { CARD_THEME } from "./theme.mjs";
import { LOG, NAME, SITE, bucketBySlug, entrySlug, formatDate, tldrOf } from "../data/site";

const FOOTER = new URL(SITE).host;
// Astro bundles this file, so resolve fonts from the project folder, not import.meta.url.
const OG_DIR = pathToFileURL(path.resolve("src/og") + "/");

export const entryCardUrl = (e: CollectionEntry<"changelog">) => `${LOG}/og/changelog/${e.data.repo ?? "initiative"}/${entrySlug(e.id)}.jpg`;
export const docCardUrl = (d: CollectionEntry<"library">) => `${LOG}/og/library/${entrySlug(d.id)}.jpg`;
export const ledgerCardUrl = `${LOG}/og/ledger.jpg`;

const jpeg = (buf: Buffer) => new Response(new Uint8Array(buf), { headers: { "Content-Type": "image/jpeg" } });

export async function entryCard(e: CollectionEntry<"changelog">) {
  return jpeg(
    await renderCard(
      {
        eyebrow: `${NAME} · Changelog`,
        kicker: bucketBySlug(e.data.repo)?.name ?? NAME,
        title: e.data.title,
        summary: tldrOf(e.body),
        meta: [formatDate(e.data.date), e.data.who ? `By ${e.data.who}` : ""].filter(Boolean).join(" · "),
        footer: FOOTER,
        seed: `changelog/${entrySlug(e.id)}`,
      },
      CARD_THEME,
      OG_DIR
    )
  );
}

export async function docCard(d: CollectionEntry<"library">) {
  return jpeg(
    await renderCard(
      {
        eyebrow: `${NAME} · Library`,
        kicker: d.data.draft ? "Draft, to be reviewed" : "In plain words",
        title: d.data.title,
        summary: d.data.description,
        meta: d.data.date ? `Written ${formatDate(d.data.date)}` : "A library write-up",
        footer: FOOTER,
        seed: `library/${entrySlug(d.id)}`,
      },
      CARD_THEME,
      OG_DIR
    )
  );
}

// No counts on the card (ledger v2): a cached share preview would go stale; the page has the numbers.
export async function ledgerCard() {
  return jpeg(
    await renderCard(
      {
        eyebrow: `${NAME} · Ledger`,
        kicker: "Every change, in plain words",
        title: "The initiative's code, in plain words",
        summary: "Every public change, grouped by day and by kind and linked to the change itself, with private work shown masked so you can watch it move.",
        meta: "Refreshed every day",
        footer: FOOTER,
        seed: "ledger",
      },
      CARD_THEME,
      OG_DIR
    )
  );
}
