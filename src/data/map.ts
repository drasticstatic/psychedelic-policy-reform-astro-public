// The map of everywhere the initiative's pages lead: THE canonical copy (kit 1.2, map version 2).
//
// This AstroLog draws it at /map (MapGrid.astro, at build time) and publishes it at /map.json; the
// dApp preview's /map draws the same file with the kit's <arrival-map>. Each destination carries
// `og`, the share image its link shows, which both maps use as its thumbnail. `self` lets a page mark
// "You are here" (this map passes here="map", the dApp's here="dapp-map"). Change the map here; the
// dApp follows on its next load.
import { DAPP, LOG } from "./site";
import { pageCardUrl } from "../og/pages";

export type MapGroup = { id: string; label: string; icon?: string; note?: string };
export type MapNode = {
  id: string;
  group: string;
  name: string;
  line?: string;
  href?: string;
  /** Opens one of the kit's windows instead of following the link ("contact" | "community"). */
  open?: string;
  og?: string;
  icon?: string;
  self?: string;
  external?: boolean;
};
export type SiteMap = { version: 2; title: string; desc: string; groups: MapGroup[]; nodes: MapNode[] };

const GH = "https://github.com/drasticstatic";

export const SITE_MAP: SiteMap = {
  version: 2,
  title: "Where everything is",
  desc: "Every place the initiative's pages lead, grouped: the two front doors, the record, the dApp preview's pages, and the ways in. Each one shows the picture its link shows when shared.",
  groups: [
    { id: "start", label: "Start here", icon: "signpost", note: "Two front doors: the record, and the dApp preview." },
    { id: "record", label: "The record", icon: "clock-counter-clockwise", note: "What changed, the explainers, every public change, and where it's all headed." },
    { id: "dapp", label: "In the dApp preview", icon: "cube", note: "The evidence library's shelves, a pledge you can try, and the latest news." },
    { id: "involved", label: "Get involved", icon: "hand-heart", note: "How to reach the initiative, the communities Christopher W serves, and where people following it gather." },
    { id: "beyond", label: "The code", icon: "code", note: "The public repositories behind these pages." },
  ],
  nodes: [
    { id: "porch", group: "start", name: "AstroLog porch", line: "The front door to the record.", href: `${LOG}/`, og: pageCardUrl("porch"), icon: "door-open", self: "porch" },
    { id: "dapp", group: "start", name: "dApp preview", line: "Evidence, a pledge preview and updates.", href: `${DAPP}/`, og: pageCardUrl("dapp"), icon: "cube", self: "dapp" },

    { id: "changelog", group: "record", name: "Changelog", line: "Every notable change, newest first.", href: `${LOG}/changelog`, og: pageCardUrl("changelog"), icon: "clock-counter-clockwise" },
    { id: "library", group: "record", name: "Library", line: "Explainers in plain words, starting with RFRA.", href: `${LOG}/library`, og: pageCardUrl("library"), icon: "books" },
    { id: "ledger", group: "record", name: "Ledger", line: "Every public change, in plain words, refreshed daily.", href: `${LOG}/ledger`, og: `${LOG}/og/ledger.jpg`, icon: "scroll" },
    { id: "map", group: "record", name: "Map", line: "This page: everywhere at a glance.", href: `${LOG}/map`, og: pageCardUrl("map"), icon: "map-trifold", self: "map" },
    { id: "roadmap", group: "record", name: "Roadmap", line: "Where the initiative is headed.", href: `${LOG}/roadmap`, og: pageCardUrl("roadmap"), icon: "path" },
    { id: "sustainability", group: "record", name: "Sustainability", line: "What it takes to keep these pages running.", href: `${LOG}/sustainability`, og: pageCardUrl("sustainability"), icon: "plant" },

    { id: "evidence", group: "dapp", name: "Evidence", line: "The library's shelves, filling in as sources are reviewed.", href: `${DAPP}/evidence`, og: pageCardUrl("dapp-evidence"), icon: "folder-open", self: "dapp-evidence" },
    { id: "pledge", group: "dapp", name: "Pledge (preview)", line: "Try a wallet-signed pledge. Nothing is recorded yet.", href: `${DAPP}/pledge`, og: pageCardUrl("dapp-pledge"), icon: "signature", self: "dapp-pledge" },
    { id: "updates", group: "dapp", name: "Updates", line: "The latest from this AstroLog.", href: `${DAPP}/updates`, og: pageCardUrl("dapp-updates"), icon: "newspaper", self: "dapp-updates" },
    { id: "about", group: "dapp", name: "About", line: "What this is, and who it's for.", href: `${DAPP}/about`, og: pageCardUrl("dapp-about"), icon: "info", self: "dapp-about" },
    { id: "dapp-map", group: "dapp", name: "The dApp's map", line: "This same map, inside the preview.", href: `${DAPP}/map`, og: pageCardUrl("map"), icon: "map-trifold", self: "dapp-map" },

    { id: "contact", group: "involved", name: "Reach out", line: "Every way to reach the initiative, in one place.", href: `${GH}`, open: "contact", og: pageCardUrl("contact"), icon: "envelope-simple" },
    { id: "community", group: "involved", name: "Communities", line: "Every community Christopher W serves, and the Facebook groups where people gather.", href: `${LOG}/communities`, og: pageCardUrl("communities"), icon: "users-three", self: "communities" },

    { id: "astro-src", group: "beyond", name: "AstroLog on GitHub", line: "The published record's public repository.", href: `${GH}/psychedelic-policy-reform-astro-public`, og: pageCardUrl("github"), icon: "github-logo", external: true },
    { id: "dapp-src", group: "beyond", name: "dApp preview on GitHub", line: "The preview's public repository.", href: `${GH}/psychedelic-policy-reform-dapp-public-preview`, og: pageCardUrl("github"), icon: "github-logo", external: true },
  ],
};
