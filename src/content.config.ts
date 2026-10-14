// Content collections (fleet-wide template: my-template/changelog-template). The Astro project sits
// at the repository root here (like the O-R-G lab), so every collection reads from the root.
//
// `changelog/` and `library/` are classified PRIVATE in sync-public-allowlist.yml: only the built
// pages reach the public site, so drafts and notes in the Markdown source can't slip out by accident.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const changelog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./changelog" }),
  schema: z.object({
    title: z.string(),
    date: z.string(), // YYYY-MM-DD
    priority: z.enum(["P1-high", "P2-medium", "P3-low"]).default("P2-medium"),
    // Which project card this entry belongs to (BUCKETS in src/data/site.ts).
    repo: z.string().optional(),
    // Who did the work, first name and last initial ("Christopher W"). See PEOPLE in src/data/site.ts.
    who: z.string().optional(),
  }),
});

// Standalone write-ups: the evidence library's plain-language explainers and how-it-works pieces.
// `draft: true` shows a "Draft, to be reviewed" banner on the page; it's still published.
const library = defineCollection({
  loader: glob({ pattern: "*.md", base: "./library" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().optional(),
    draft: z.boolean().default(false),
    // Shows the "not legal advice" note on the page (anything that discusses law or evidence).
    legal: z.boolean().default(false),
  }),
});

// The repository's own README.md, rendered as this site's homepage (the porch).
const home = defineCollection({
  loader: glob({ pattern: "README.md", base: "." }),
  schema: z.object({}),
});

// ROADMAP.md and SUSTAINABILITY.md (kit 1.2), each rendered as a page and read on GitHub as they are.
const docs = defineCollection({
  loader: glob({ pattern: ["ROADMAP.md", "SUSTAINABILITY.md"], base: "." }),
  schema: z.object({}),
});

export const collections = { changelog, library, home, docs };
