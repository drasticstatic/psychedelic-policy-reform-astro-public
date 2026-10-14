/* Psychedelic Policy Reform's arrival config, read by arrival.js (kit v1.2.1). Shared by every page
   of the initiative: this AstroLog (where the kit's files live, under /arrival/) and, by absolute
   URL, the dApp preview.

   The initiative has no organization or main website of its own yet, so this AstroLog hosts the kit
   the way an org's portal would. Facts here are kept to what's true today; anything not decided
   (partners, a public address, a community space) is a placeholder or "coming soon", never a guess,
   and no link is made up. People are named by first name and last initial. This is a policy and
   evidence lane: nothing here tells anyone's personal story. Strings shown in the guide and the
   modals may hold simple HTML. */
(function () {
  var ROOT = "https://drasticstatic.github.io";
  var LOG = ROOT + "/psychedelic-policy-reform-astro-public";
  var DAPP = ROOT + "/psychedelic-policy-reform-dapp-public-preview";
  var GH = "https://github.com/drasticstatic";
  // Keystone gold, sage leaf and slate blues. They color the guide's glyph (one stone per step) and
  // the initials avatars of anyone without a GitHub picture.
  var STONES = ["#e0b65e", "#84d1a5", "#7fa7d9", "#c99a4a", "#5fb487", "#a7c4e6", "#f0d08f", "#3f8f6a"];

  // An initials avatar in the initiative's shape: a keystone, with the initials on its face. System
  // serif only: an <img> SVG can't load the page's web fonts.
  function keystoneAvatar(ini, c1, c2, name) {
    var one = String(name || "").trim();
    if (one && !/\s/.test(one)) ini = one.charAt(0).toUpperCase();
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<rect width="100" height="100" rx="50" fill="#0e151c"/>' +
      '<path d="M18 20 H82 L68 84 H32 Z" fill="' + c1 + '" stroke="' + c2 + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<text x="50" y="52" dy=".36em" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" font-weight="600" font-size="' +
      (ini.length > 1 ? 27 : 33) + '" fill="#0e151c">' + ini + "</text></svg>"
    );
  }

  window.ARRIVAL = {
    org: {
      short: "Psychedelic Policy Reform",
      name: "An RFRA-based initiative",
      motto: "Religious freedom for sincere sacramental practice, seen from Pennsylvania.",
      about:
        "Psychedelic Policy Reform is a policy and evidence initiative built on the Religious Freedom Restoration Act (RFRA): the federal law that limits how far the government may burden a person's sincere exercise of religion. It's seen from Pennsylvania, and it's meant to serve communities whose sincere spiritual practice includes sacraments the law still restricts. It gathers sources, explains them plainly, and keeps an open record of the work. Nothing here is legal advice.",
      mark: { src: LOG + "/favicon.svg" },
      home: {
        label: "The dApp preview",
        href: DAPP + "/",
        text: "The initiative's interactive side: the evidence library's shelves (filling in as sources are reviewed), a pledge of support you can try with a wallet signature (a preview: nothing is recorded yet), and the latest news from this record.",
      },
      welcomeNote: null,
      welcomePlaceholder:
        "A few words of welcome belong here once the initiative's partner organizations are announced. The space is left empty on purpose until then.",
    },

    // Both sites share drasticstatic.github.io with other labs, so the key names this initiative.
    storage: { key: "ppr-arrival" },

    modes: [
      { id: "docket", name: "Docket", note: "Ink-blue slate, a sage-green leaf and a keystone in gold: the record, lit for reading late.", swatch: ["#0e151c", "#84d1a5"], dark: true },
      { id: "parchment", name: "Parchment", note: "Warm paper and deep green ink, like a bill on a clerk's desk.", swatch: ["#f5f1e6", "#1d6a45"], calm: true },
      { id: "capitol", name: "Capitol", note: "Pennsylvania's own blue and gold, under the dome after dark.", swatch: ["#0c1630", "#f0c45c"], dark: true },
      {
        id: "day",
        name: "Follow the day",
        note: "Parchment by day, Capitol at dusk, Docket by night.",
        shows: ["parchment", "capitol", "docket"],
        ink: "linear-gradient(90deg, #f5f1e6 0 33.3%, #f0c45c 0 66.6%, #84d1a5 0)",
        follows: function (d) {
          var h = d.getHours();
          return h >= 7 && h < 17 ? "parchment" : h >= 17 && h < 21 ? "capitol" : "docket";
        },
      },
    ],
    defaultMode: "docket",

    // Reading mode: one tap for Parchment, nothing moving, more contrast, no cursor effects and a
    // comfortable line length; text size steps sit beside it (kit 1.2).
    reading: { light: "parchment" },

    // "What's new since your last visit": the AstroLog's latest.json lists its newest entries,
    // write-ups and ledger items (the dApp preview reads the same file).
    news: { sources: [LOG + "/latest.json"] },

    // Motion here is quiet: the arch's stones settle or catch the light, and the cursor trail is a
    // faint line of sage and gold (or none at all).
    motions: [
      { id: "still", name: "Still", icon: "pause", note: "Nothing moves." },
      { id: "steady", name: "Steady", icon: "wind", note: "The arch's stones catch the light one by one, and a faint trail of sage and gold follows your pointer.", trail: { colors: ["#84d1a5", "#e0b65e"], life: 460, width: 1.8, alpha: 0.4 } },
      { id: "lively", name: "Lively", icon: "sparkle", note: "A brighter trail that scatters a few small keystones as you move.", trail: { colors: STONES, life: 620, width: 2.4, alpha: 0.6, sparks: 0.18, sides: 4 } },
    ],
    defaultMotion: "steady",
    stillMotion: "still",

    wedges: STONES,

    // GitHub pictures when a handle is known; otherwise keystone initials. No role domain exists yet,
    // so Gravatar is never used.
    avatar: { shape: "circle", roleDomains: [], svg: keystoneAvatar },

    // ── kit 1.2: one navbar for both sites ─────────────────────────────────────────────────────
    // `sites` keeps an item to the AstroLog ("astrolog") or the dApp preview ("dapp"). Lower
    // priority folds into "More" first when the bar runs short; below 1100px it all folds into the
    // Menu.
    nav: {
      label: "Psychedelic Policy Reform",
      fold: 1100,
      items: [
        { id: "porch", label: "Porch", icon: "door-open", href: LOG + "/", exact: true, priority: 1, sites: ["astrolog"], note: "The AstroLog's front door" },
        { id: "home", label: "Home", icon: "house-simple", href: DAPP + "/", exact: true, priority: 1, sites: ["dapp"], note: "The dApp preview's front door" },
        { id: "evidence", label: "Evidence", icon: "folder-open", href: DAPP + "/evidence", priority: 2, sites: ["dapp"], note: "The library's shelves, coming soon" },
        { id: "pledge", label: "Pledge", icon: "signature", href: DAPP + "/pledge", priority: 2, sites: ["dapp"], note: "Try a wallet-signed pledge (preview)" },
        { id: "updates", label: "Updates", icon: "newspaper", href: DAPP + "/updates", priority: 3, sites: ["dapp"], note: "The latest from the AstroLog" },
        { id: "changelog", label: "Changelog", icon: "clock-counter-clockwise", href: LOG + "/changelog", priority: 3, sites: ["astrolog"], note: "What changed, newest first" },
        { id: "library", label: "Library", icon: "books", href: LOG + "/library", priority: 2, sites: ["astrolog"], note: "Explainers in plain words" },
        { id: "ledger", label: "Ledger", icon: "scroll", href: LOG + "/ledger", priority: 2, sites: ["astrolog"], note: "Every public change, in plain words" },
        { id: "map", label: "Map", icon: "map-trifold", href: LOG + "/map", hrefs: { dapp: DAPP + "/map" }, priority: 2, note: "Every place, with a picture of each" },
        { id: "dapp", label: "dApp preview", icon: "cube", href: DAPP + "/", priority: 3, sites: ["astrolog"], note: "Evidence, a pledge preview and updates" },
        {
          id: "record",
          label: "The record",
          icon: "clock-counter-clockwise",
          priority: 2,
          sites: ["dapp"],
          items: [
            { id: "log-porch", label: "AstroLog", icon: "door-open", href: LOG + "/", note: "The initiative's open record" },
            { id: "log-changelog", label: "Changelog", icon: "clock-counter-clockwise", href: LOG + "/changelog", note: "What changed, newest first" },
            { id: "log-library", label: "Library", icon: "books", href: LOG + "/library", note: "Explainers in plain words" },
            { id: "log-ledger", label: "Ledger", icon: "scroll", href: LOG + "/ledger", note: "Every public change, in plain words" },
          ],
        },
        {
          id: "involved",
          label: "Get involved",
          icon: "hand-heart",
          priority: 3,
          items: [
            { id: "pledge-preview", label: "Pledge (preview)", icon: "signature", href: DAPP + "/pledge", sites: ["astrolog"], note: "Try a wallet-signed pledge. Nothing is recorded" },
            { id: "community", label: "Community", icon: "users-three", href: LOG + "/#community", open: "community", note: "Where supporters will gather" },
            { id: "contact", label: "Reach out", icon: "envelope-simple", href: GH, open: "contact", note: "Every way to reach the initiative" },
          ],
        },
        {
          id: "about",
          label: "About",
          icon: "info",
          priority: 1,
          items: [
            { id: "about-page", label: "About the initiative", icon: "info", href: DAPP + "/about", note: "What this is, and who it's for" },
            { id: "roadmap", label: "Roadmap", icon: "path", href: LOG + "/roadmap", note: "Where the initiative is headed" },
            { id: "sustainability", label: "Sustainability", icon: "plant", href: LOG + "/sustainability", note: "What keeps these pages running" },
            { id: "evidence-shelves", label: "Evidence library", icon: "folder-open", href: DAPP + "/evidence", sites: ["astrolog"], note: "The shelves, coming soon" },
            { id: "github", label: "GitHub", icon: "github-logo", href: GH + "/psychedelic-policy-reform-astro-public", note: "The code, in the open" },
          ],
        },
      ],
    },
    footer: {
      label: "Psychedelic Policy Reform, all the ways around",
      groups: [
        { label: "Explore", icon: "compass", items: ["porch", "home", "changelog", "library", "ledger", "map", "dapp", "evidence", "pledge", "updates", "log-porch", "log-ledger"] },
        { label: "Get involved", icon: "hand-heart", items: ["pledge-preview", "community", "contact", { id: "guide", label: "Welcome guide", icon: "signpost", href: "#welcome", open: "guide" }] },
        {
          label: "About this build",
          icon: "wrench",
          items: [
            "about-page",
            "roadmap",
            "sustainability",
            { id: "astro-src", label: "AstroLog source", icon: "code", href: GH + "/psychedelic-policy-reform-astro-public" },
            { id: "dapp-src", label: "dApp source", icon: "code", href: GH + "/psychedelic-policy-reform-dapp-public-preview" },
          ],
        },
      ],
      note: "Not legal advice. Code here is MIT licensed and the words are CC BY-SA 4.0.",
    },

    // ── kit 1.2: one modal for every way to reach the initiative ─────────────────────────────────
    // intercept: false, so a plain link to Christopher's GitHub profile (the ledger's names link
    // there) stays a link rather than opening this window.
    contact: {
      title: "Reach out",
      intro: "Every way to reach the initiative. It's young, so for now GitHub is the way in; the other paths are placeholders, ready for when they exist.",
      intercept: false,
      paths: [
        {
          kind: "github",
          label: "Christopher W on GitHub",
          href: GH,
          action: "Open the profile",
          note: "The initiative's maintainer. His GitHub profile lists the ways he can be reached.",
        },
        {
          kind: "email",
          label: "A public address for the initiative",
          placeholder: "Not set up yet. When the initiative has its own address, it goes here.",
        },
        {
          kind: "form",
          label: "A contact form",
          placeholder: "Coming with the initiative's own website, once it has one.",
        },
      ],
      fine: "Please don't send personal legal details through any of these. This initiative works on policy and evidence and can't give legal advice.",
    },

    // ── where supporters will gather: nothing yet, on purpose, and a sneak peek ─────────────────
    community: {
      name: "a community space",
      icon: "users-three",
      label: "See every way in",
      title: "Where we'll gather",
      eyebrow: "Community",
      text: "The initiative doesn't have a community space of its own yet. The slots below are ready, and each one stays marked “coming soon” until it's real.",
      intro: "No community space yet, on purpose: one will open once the initiative's partner organizations are announced. Until then, these slots wait, and the dApp preview's pledge shows the direction.",
      platforms: [
        { id: "discussion", kind: "forum", name: "A discussion space", status: "soon", text: "Somewhere to ask questions and share sources." },
        { id: "updates", kind: "email", name: "Updates by email", status: "soon", text: "News when something changes, and nothing else." },
      ],
      bespoke: {
        title: "Looking ahead: a supporters' network of our own",
        tag: "Sneak peek",
        icon: "graph",
        text: "In time, supporters could sign a pledge with a wallet signature and gather in a small network that belongs to them rather than to one company.",
        points: [
          "Pledges signed with a wallet signature: no gas, and no personal details needed. The dApp preview lets you try one today, and nothing is recorded.",
          "Profiles and posts on open protocols like Lens and Farcaster, paired with a DAO where supporters propose ideas and decide together.",
          "Privacy first: everyone chooses what's public.",
        ],
        note: "No dates, and nothing to sign up for yet. This is a direction, not a promise.",
      },
      more: ['Want to know when a space opens? The <a href="' + LOG + '/changelog">changelog</a> will say so first.'],
    },

    record: {
      intro: "The initiative's AstroLog has three parts.",
      share:
        "Sharing one change? Every entry and every write-up has its own preview card: a stone arch with its keystone set and a sprout of its own, the title and the summary. Paste its link into Telegram, iMessage or Discord and it arrives with that card. The <strong>Copy a link</strong> button under each one does the copying.",
      changelog: {
        name: "The changelog",
        text: "Every notable step, newest first. Each entry opens with a one-line summary, with the full story folded underneath, and credits whoever did the work.",
        href: LOG + "/changelog",
        label: "Read the changelog",
      },
      library: {
        name: "The library",
        text: "Explainers in plain words, starting with RFRA. Drafts are marked as drafts until they've been reviewed, and nothing in them is legal advice.",
        href: LOG + "/library",
        label: "Open the library",
      },
      ledger: {
        name: "The ledger",
        text: "Every public change to the initiative's code on GitHub, in plain words: grouped by day and by kind, credited by name, and linked to the change itself. Private work shows too, masked. It refreshes every day.",
        href: LOG + "/ledger",
        label: "Open the ledger",
      },
    },

    sites: {
      astrolog: {
        name: "the Psychedelic Policy Reform AstroLog",
        what: "The AstroLog is the initiative's open record: what changed and why, explainers in plain words, a map of every page, and a ledger of every change to its code.",
      },
      dapp: {
        name: "the Psychedelic Policy Reform dApp preview",
        what: "This is the initiative's dApp preview: the evidence library's shelves, a pledge you can try with a wallet signature (nothing is recorded yet), and the latest news from the AstroLog. Your light and motion choices carry over between the two.",
      },
    },

    guide: {
      light: {
        text: "Every page here takes its colors from the record itself: Docket's ink-blue slate, Parchment's paper and ink, and Capitol's Pennsylvania blue and gold. Pick one, and it follows you between the AstroLog and the dApp preview.",
      },
      motion: {
        text: "Motion here is quiet: the arch's stones catch the light one by one, and a faint trail can follow your pointer. Choose how much moves, how large the text is, and whether you'd like more contrast for reading.",
      },
      people: {
        text: "Every entry credits whoever did the work, by first name and last initial.",
        fine: "Pictures come from public GitHub profiles. Anyone without one linked gets a small keystone with their initials.",
      },
    },
    guideFinale: "You've set every stone in the arch. Welcome to Psychedelic Policy Reform.",

    words: {
      enter: "Enter",
      cursorNote: "A faint trail of sage and gold behind your pointer. Switch it off if you'd rather not.",
      readingNote: "One tap for the calmest page: Parchment, nothing moving, more contrast, shorter lines, and no cursor effects. Tap again to go back to how you had it.",
      pause: "Let the stones rest",
      play: "Let the light move",
      searchTip: "Anywhere on the initiative's pages, any time: every change, explainer, person and page, from the AstroLog or the dApp preview.",
    },

    search: {
      sources: [{ url: LOG + "/search.json" }],
      items: [
        { t: "AstroLog porch", k: "page", i: "door-open", h: LOG + "/", pin: true, x: "home front door record astrolog" },
        { t: "dApp preview", k: "dApp", i: "cube", h: DAPP + "/", pin: true, x: "home app web3 wallet preview" },
        { t: "The ledger: every public change", k: "AstroLog", i: "scroll", h: LOG + "/ledger", pin: true, x: "commits github history code record plain words" },
        { t: "Map: every place, with pictures", k: "page", i: "map-trifold", h: LOG + "/map", pin: true, x: "sitemap where everything links overview thumbnails" },
        { t: "Evidence library (coming soon)", k: "dApp", i: "folder-open", h: DAPP + "/evidence", x: "sources law statutes court decisions research practice pennsylvania" },
        { t: "Pledge of support (preview)", k: "dApp", i: "signature", h: DAPP + "/pledge", x: "sign wallet signature support pledge web3 reown" },
        { t: "Updates", k: "dApp", i: "newspaper", h: DAPP + "/updates", x: "news latest follow" },
        { t: "About the initiative", k: "dApp", i: "info", h: DAPP + "/about", x: "what who rfra pennsylvania partners not legal advice" },
        { t: "Roadmap", k: "page", i: "path", h: LOG + "/roadmap", x: "plans next future evidence pennsylvania partners" },
        { t: "Sustainability", k: "page", i: "plant", h: LOG + "/sustainability", x: "maintenance keep running tokens costs upkeep allowlist" },
        { t: "AstroLog on GitHub", k: "link", i: "github-logo", h: GH + "/psychedelic-policy-reform-astro-public", x: "code repository source" },
        { t: "dApp preview on GitHub", k: "link", i: "github-logo", h: GH + "/psychedelic-policy-reform-dapp-public-preview", x: "code repository source next" },
      ],
    },
  };
})();
