// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import { baseLinks } from "./src/plugins/base-links.mjs";

// Served as a GitHub Pages project site, so every route and asset lives under the public repo's name.
const BASE = "/psychedelic-policy-reform-astro-public";

// Astro doesn't add `base` to links inside Markdown, so `/library/x` would resolve to
// drasticstatic.github.io's root and 404. The base-links plugin (canonical copy:
// my-template/changelog-template/base-links.mjs) prefixes root-relative href/src at build time, so
// authors keep writing base-less links with no trailing slash.
export default defineConfig({
  site: "https://drasticstatic.github.io",
  base: BASE,
  trailingSlash: "never",
  markdown: { processor: satteri({ hastPlugins: [baseLinks(BASE)] }) },
});
