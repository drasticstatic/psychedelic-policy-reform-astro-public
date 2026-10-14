// One social card per changelog entry: /og/changelog/<repo>/<slug>.jpg (static, built once).
import { getCollection } from "astro:content";
import { entrySlug } from "../../../../data/site";
import { entryCard } from "../../../../og/cards";

export async function getStaticPaths() {
  const entries = await getCollection("changelog");
  return entries.map((entry) => ({ params: { repo: entry.data.repo ?? "initiative", slug: entrySlug(entry.id) }, props: { entry } }));
}

export const GET = ({ props }: { props: { entry: Parameters<typeof entryCard>[0] } }) => entryCard(props.entry);
