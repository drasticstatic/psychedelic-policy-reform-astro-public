// The initiative's ledger config (canonical example: my-template changelog-template/arrival/ledger).
// Plain .mjs so the Astro build, `npm run ledger:snapshot` and `npm run ledger:verify` can all import it.
//
// Whose history: ONLY this initiative's repositories on drasticstatic. The public lane reads the two
// PUBLIC repositories (the AstroLog and the dApp preview). Ledger v2's private lane reads only the
// initiative's private sources named below, never any other drasticstatic repository: repository,
// day, kind and priority, the words masked, no link; commits already public through a mirror are
// deduped. This file and the snapshot are public (src/ is synced to the public repository), which is
// fine: the snapshot only ever holds the masked form, and `npm run ledger:verify` checks that no
// private words reach the build.
import path from "node:path";

export const LEDGER = {
  owner: "drasticstatic",
  ownerType: "user",
  include: /^psychedelic-policy-reform-(astro-public|dapp-public-preview)$/,
  deny: [],
  private: [
    { repo: "psychedelic-policy-reform", label: "The initiative's notes", mask: "full" },
    { repo: "psychedelic-policy-reform-astro", label: "AstroLog source", mask: "full" },
    { repo: "psychedelic-policy-reform-dapp", label: "dApp source", mask: "full" },
  ],
  repoLabels: {
    "psychedelic-policy-reform-astro-public": { label: "AstroLog", blurb: "This record" },
    "psychedelic-policy-reform-dapp-public-preview": { label: "dApp preview", blurb: "Evidence, a pledge preview and updates" },
  },
  // First name and last initial (every org's default since ledger v2), linked to GitHub.
  people: [{ name: "Christopher W", github: "drasticstatic", names: ["Christopher", "drasticstatic"] }],
  nameStyle: "first-last-initial",
  // The changelog and library are this site's own editorial text (their wording may match a commit).
  verify: { publicText: ["changelog", "library"] },
  // Seen from Pennsylvania.
  timeZone: "America/New_York",
  maxPerRepo: 400,
  // The committed fallback (masked form only), used when the live fetch fails.
  // Refresh: LEDGER_TOKEN=$(gh auth token) npm run ledger:snapshot
  snapshot: path.resolve("src/data/ledger.snapshot.json"),
};
