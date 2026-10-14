// The AstroLog's search index, read by the arrival kit ("/" search, <arrival-latest>,
// <arrival-people>). The dApp preview fetches it too, so "/" there finds AstroLog entries. URLs are absolute so any page can link into it. Shape: { updated, items: [{ t, k, h,
// i, d?, s?, x?, who?, type }], people: [{ name, role, github?, count }] }, documented in
// my-template/changelog-template/README.md (wave 4).
import { getCollection } from "astro:content";
import { BUCKETS, PEOPLE, PRIORITY, SITE, bucketBySlug, entrySlug, madeBy, tldrOf } from "../data/site";

const plain = (md = "") =>
  md
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export async function GET() {
  const base = import.meta.env.BASE_URL;
  const at = (path: string) => `${SITE}${base}${path}`;
  const entries = (await getCollection("changelog")).sort((a, b) => b.data.date.localeCompare(a.data.date));
  const docs = await getCollection("library");

  const items = [
    { type: "page", t: "AstroLog porch", k: "page", i: "door-open", h: at("/"), x: "home latest astrolog readme" },
    { type: "page", t: "Changelog: every change", k: "page", i: "clock-counter-clockwise", h: at("/changelog"), x: "entries history what changed", pin: true },
    { type: "page", t: "Library: the write-ups", k: "page", i: "books", h: at("/library"), x: "docs how it works", pin: true },
    { type: "page", t: "Ledger: every public change", k: "page", i: "scroll", h: at("/ledger"), x: "commits github history code record plain words", pin: true },
    ...BUCKETS.filter((b) => entries.some((e) => (e.data.repo ?? "initiative") === b.slug)).map((b) => ({
      type: "area",
      t: `${b.name}: changelog`,
      k: "project",
      i: b.icon.replace(/^ph-/, ""),
      h: at(`/changelog/${b.slug}`),
      s: b.description,
    })),
    ...entries.map((e) => {
      const repo = e.data.repo ?? "initiative";
      return {
        type: "entry",
        t: e.data.title,
        k: `changelog · ${bucketBySlug(repo)?.name ?? repo}`,
        i: e.data.priority === "P1-high" ? "sparkle" : "clock-counter-clockwise",
        h: at(`/changelog/${repo}/${entrySlug(e.id)}`),
        d: e.data.date,
        s: tldrOf(e.body),
        who: e.data.who,
        x: `${PRIORITY[e.data.priority]} ${plain(e.body).slice(0, 700)}`,
      };
    }),
    ...docs.map((d) => ({
      type: "doc",
      t: d.data.title,
      k: "library",
      i: "book-open-text",
      h: at(`/library/${entrySlug(d.id)}`),
      d: d.data.date,
      s: d.data.description,
      x: plain(d.body).slice(0, 700),
    })),
  ];

  const people = PEOPLE.map((p) => ({
    name: p.name,
    role: p.role,
    github: p.github,
    count: entries.filter((e) => madeBy(p, e.data.who)).length,
  }));

  const body = { updated: entries[0]?.data.date ?? null, items, people };
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
}
