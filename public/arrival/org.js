/* Psychedelic Policy Reform's arrival config, read by arrival.js (kit v1.5). Shared by every page
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
  // Facebook groups (Christopher's decision, 2026-10-22). Each tinyurl Christopher shared resolves
  // (curl -sI, 2026-10-22) to the group's plain facebook.com/groups/<name> address, used here. Names
  // are the groups' own, as Facebook's public listings show them. Facebook may ask a visitor to sign in.
  //   Groups Christopher W manages:
  var FB_REFORM = "https://www.facebook.com/groups/pennsylvaniapsychedelicreform"; // tinyurl.com/pennsylvaniapsychedelicreform
  var FB_RFRA = "https://www.facebook.com/groups/pennsylvaniarfra"; // tinyurl.com/pennsylvaniarfra
  //   Related groups (not part of this initiative):
  var FB_NORML_SPA = "https://www.facebook.com/groups/normlsouthernpa"; // tinyurl.com/normlsouthernpa
  var FB_NORML_LVC = "https://www.facebook.com/groups/normllvc"; // tinyurl.com/normllvc
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
            { id: "community", label: "Community", icon: "users-three", href: LOG + "/#community", open: "community", note: "Facebook groups for Pennsylvania, for now" },
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
    // there) stays a link rather than opening this window. The two Facebook groups Christopher W
    // manages are ways in too (Christopher, 2026-10-27: "reach out"); the two related NORML groups
    // stay in the Community window only, since they aren't the initiative's to answer for.
    contact: {
      title: "Reach out",
      intro: 'Every way to reach the initiative. It\'s young, so for now the way in is one of the two Facebook groups Christopher W manages (Facebook may ask you to sign in) or his GitHub; an address and a form come later. Two related NORML groups are in the <a href="' + LOG + '/#community" data-arrival-open="community">Community window</a>.',
      intercept: false,
      paths: [
        {
          kind: "page",
          icon: "facebook-logo",
          label: "Pennsylvania Psychedelic Reform",
          href: FB_REFORM,
          action: "Open the group",
          note: "A Facebook group Christopher W manages, for anyone following psychedelic law and policy reform in Pennsylvania. Questions and hellos are welcome there.",
        },
        {
          kind: "page",
          icon: "facebook-logo",
          label: "Pennsylvania RFRA",
          href: FB_RFRA,
          action: "Open the group",
          note: "A Facebook group Christopher W manages, on religious-freedom law in Pennsylvania and what it means for sincere sacramental practice.",
        },
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

    // ── where supporters gather: for now, Facebook groups in Pennsylvania (two Christopher W manages,
    //    two related ones), an email slot still to come, and a sneak peek at a network of our own.
    //    One link per group (org.css hides the kit's empty second slot on a live card). ──────────
    community: {
      name: "Facebook groups in Pennsylvania",
      icon: "users-three",
      label: "See every way in",
      title: "Where we gather",
      eyebrow: "Community",
      text: "For now, the conversation happens in Facebook groups in Pennsylvania: two that Christopher W manages, and two related NORML groups. A space of the initiative's own comes later.",
      intro: "For now, people following this work gather in Facebook groups in Pennsylvania. Two are groups Christopher W manages; two are related groups run by others. Facebook may ask you to sign in.",
      platforms: [
        {
          id: "fb-reform",
          kind: "Facebook group",
          icon: "facebook-logo",
          name: "Pennsylvania Psychedelic Reform",
          text: "A group Christopher W manages, for anyone following psychedelic law and policy reform in Pennsylvania.",
          join: { href: FB_REFORM, label: "Open the group", note: "facebook.com/groups/pennsylvaniapsychedelicreform" },
        },
        {
          id: "fb-rfra",
          kind: "Facebook group",
          icon: "facebook-logo",
          name: "Pennsylvania RFRA",
          text: "A group Christopher W manages, on religious-freedom law in Pennsylvania (the state's Religious Freedom Protection Act and the federal RFRA) and what it means for sincere sacramental practice.",
          join: { href: FB_RFRA, label: "Open the group", note: "facebook.com/groups/pennsylvaniarfra" },
        },
        {
          id: "fb-norml-spa",
          kind: "Related group",
          icon: "facebook-logo",
          name: "NORML Southern PA",
          text: "A related Facebook group for southern Pennsylvania, in the circle of NORML (the National Organization for the Reform of Marijuana Laws). Not part of this initiative.",
          join: { href: FB_NORML_SPA, label: "Open the group", note: "facebook.com/groups/normlsouthernpa" },
        },
        {
          id: "fb-norml-lvc",
          kind: "Related group",
          icon: "facebook-logo",
          name: "NORML - Lebanon Valley College Chapter",
          text: "A related Facebook group: NORML's Lebanon Valley College chapter. Not part of this initiative.",
          join: { href: FB_NORML_LVC, label: "Open the group", note: "facebook.com/groups/normllvc" },
        },
        { id: "updates", kind: "email", name: "Updates by email", status: "soon", text: "News when something changes, and nothing else." },
      ],
      bespoke: {
        title: "Looking ahead: a supporters' network of our own",
        tag: "Sneak peek",
        icon: "graph",
        text: "In time, supporters could sign a pledge with a wallet signature and gather in a small network that belongs to them rather than to one company.",
        points: [
          "Pledges signed with a wallet signature: no gas, and no personal details needed. The dApp preview lets you try one today, and nothing is recorded.",
          "Tokens of gratitude, later: soulbound thank-yous that stay in the wallet they're given to, a deeper commitment beyond a signed pledge (a sneak peek on the pledge page).",
          "Profiles and posts on open protocols like Lens and Farcaster, paired with a DAO where supporters propose ideas and decide together.",
          "Privacy first: everyone chooses what's public.",
        ],
        note: "No dates, and nothing to sign up for yet. This is a direction, not a promise.",
      },
      fine: "The NORML groups are related, not partners: this initiative doesn't speak for them, and they don't speak for it. Please don't share personal legal details in any group; this initiative can't give legal advice.",
      more: ['Want to know when a space of our own opens? The <a href="' + LOG + '/changelog">changelog</a> will say so first.'],
    },

    // ── kit 1.4 ───────────────────────────────────────────────────────────────────────────────
    // The dock (the one-row strip at the bottom) shows a fade and a chevron on the side with more, so
    // a phone visitor can tell it scrolls: the AstroLog's .universal-footer .footer-inner (the kit's
    // default). Not the dApp preview's .dock-inner: React renders that footer, and the kit's chevrons
    // added before hydration break it (React error #418). The dApp can opt in after hydration
    // (data-arr-scroll + Arrival.strips()), a change in its own code.
    dock: { scroll: true },
    // The initiative takes no gifts, so there's no Donate to add; the welcome guide stays everywhere.
    essentials: { donate: false },

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
        { t: "Pennsylvania Psychedelic Reform", k: "Facebook group", i: "facebook-logo", h: FB_REFORM, x: "community facebook group pennsylvania psychedelic reform discuss" },
        { t: "Pennsylvania RFRA", k: "Facebook group", i: "facebook-logo", h: FB_RFRA, x: "community facebook group pennsylvania rfra religious freedom protection act" },
        { t: "NORML Southern PA", k: "Facebook group, related", i: "facebook-logo", h: FB_NORML_SPA, x: "norml southern pennsylvania cannabis marijuana related group" },
        { t: "NORML - Lebanon Valley College Chapter", k: "Facebook group, related", i: "facebook-logo", h: FB_NORML_LVC, x: "norml lvc lebanon valley college cannabis marijuana related group" },
        { t: "About the initiative", k: "dApp", i: "info", h: DAPP + "/about", x: "what who rfra pennsylvania partners not legal advice" },
        { t: "Roadmap", k: "page", i: "path", h: LOG + "/roadmap", x: "plans next future evidence pennsylvania partners" },
        { t: "Sustainability", k: "page", i: "plant", h: LOG + "/sustainability", x: "maintenance keep running tokens costs upkeep allowlist" },
        { t: "AstroLog on GitHub", k: "link", i: "github-logo", h: GH + "/psychedelic-policy-reform-astro-public", x: "code repository source" },
        { t: "dApp preview on GitHub", k: "link", i: "github-logo", h: GH + "/psychedelic-policy-reform-dapp-public-preview", x: "code repository source next" },
      ],
    },
  };
})();

/* ── Kit 1.5 (2026-10-26): languages. English first: every visitor starts in English, and the welcome's
   first row ("Your language · Tu idioma") offers Español one tap away. The kit's own
   words come from arrival/i18n/<id>.js; the org's own words below are swapped by exact match
   (`text`). They're AI-written and marked reviewed: false ("translation in review") until someone
   who speaks the language as their own reads them. Names, marks, quotes and the pledge statement
   (the exact message a wallet signs) stay as written. ── */
(function () {
  var A = window.ARRIVAL;
  if (!A) return;
  A.languages = { list: [{ id: "en", name: "English" }, { id: "es", name: "Español" }], start: "en" };
  A.i18n = {
    es: {
      reviewed: false,
      text: {
        "An RFRA-based initiative": "Una iniciativa basada en la RFRA",
        "Religious freedom for sincere sacramental practice, seen from Pennsylvania.": "Libertad religiosa para la práctica sacramental sincera, vista desde Pensilvania.",
        "Psychedelic Policy Reform is a policy and evidence initiative built on the Religious Freedom Restoration Act (RFRA): the federal law that limits how far the government may burden a person's sincere exercise of religion. It's seen from Pennsylvania, and it's meant to serve communities whose sincere spiritual practice includes sacraments the law still restricts. It gathers sources, explains them plainly, and keeps an open record of the work. Nothing here is legal advice.": "Psychedelic Policy Reform es una iniciativa de políticas y evidencia construida sobre la Ley de Restauración de la Libertad Religiosa (RFRA, por sus siglas en inglés): la ley federal que limita cuánto puede el gobierno obstaculizar el ejercicio sincero de la religión de una persona. Se ve desde Pensilvania y busca servir a comunidades cuya práctica espiritual sincera incluye sacramentos que la ley todavía restringe. Reúne fuentes, las explica con sencillez y lleva un registro abierto del trabajo. Nada de lo que hay aquí es asesoría legal.",
        "The dApp preview": "La vista previa de la dApp",
        "The initiative's interactive side: the evidence library's shelves (filling in as sources are reviewed), a pledge of support you can try with a wallet signature (a preview: nothing is recorded yet), and the latest news from this record.": "El lado interactivo de la iniciativa: los estantes de la biblioteca de evidencia (que se van llenando a medida que se revisan las fuentes), un compromiso de apoyo que puedes probar con la firma de una billetera (una vista previa: todavía no se registra nada) y las últimas noticias de este registro.",
        "A few words of welcome belong here once the initiative's partner organizations are announced. The space is left empty on purpose until then.": "Aquí irán unas palabras de bienvenida cuando se anuncien las organizaciones aliadas de la iniciativa. Este espacio queda vacío a propósito hasta entonces.",
        "Docket": "Expediente",
        "Ink-blue slate, a sage-green leaf and a keystone in gold: the record, lit for reading late.": "Pizarra azul tinta, una hoja verde salvia y una clave de arco dorada: el registro, iluminado para leer de noche.",
        "Parchment": "Pergamino",
        "Warm paper and deep green ink, like a bill on a clerk's desk.": "Papel cálido y tinta verde profunda, como un proyecto de ley sobre el escritorio de un secretario.",
        "Capitol": "Capitolio",
        "Pennsylvania's own blue and gold, under the dome after dark.": "El azul y oro de Pensilvania, bajo la cúpula de noche.",
        "Follow the day": "Sigue el día",
        "Parchment by day, Capitol at dusk, Docket by night.": "Pergamino de día, Capitolio al atardecer, Expediente de noche.",
        "Still": "Quieto",
        "Nothing moves.": "Nada se mueve.",
        "Steady": "Sereno",
        "The arch's stones catch the light one by one, and a faint trail of sage and gold follows your pointer.": "Las piedras del arco toman la luz una por una, y una estela tenue de salvia y oro sigue a tu puntero.",
        "Lively": "Animado",
        "A brighter trail that scatters a few small keystones as you move.": "Una estela más brillante que esparce algunas claves de arco pequeñas al moverte.",
        "Porch": "Pórtico",
        "The AstroLog's front door": "La puerta de entrada del AstroLog",
        "Home": "Inicio",
        "The dApp preview's front door": "La puerta de entrada de la vista previa de la dApp",
        "Evidence": "Evidencia",
        "The library's shelves, coming soon": "Los estantes de la biblioteca, muy pronto",
        "Pledge": "Compromiso",
        "Try a wallet-signed pledge (preview)": "Prueba un compromiso firmado con billetera (vista previa)",
        "Updates": "Novedades",
        "The latest from the AstroLog": "Lo último del AstroLog",
        "Changelog": "Registro de cambios",
        "What changed, newest first": "Qué cambió, lo más nuevo primero",
        "Library": "Biblioteca",
        "Explainers in plain words": "Explicaciones en palabras sencillas",
        "Ledger": "Libro de cambios",
        "Every public change, in plain words": "Cada cambio público, en palabras sencillas",
        "Map": "Mapa",
        "Every place, with a picture of each": "Cada lugar, con una imagen de cada uno",
        "dApp preview": "Vista previa de la dApp",
        "Evidence, a pledge preview and updates": "Evidencia, una vista previa del compromiso y novedades",
        "The record": "El registro",
        "The initiative's open record": "El registro abierto de la iniciativa",
        "Get involved": "Participa",
        "Pledge (preview)": "Compromiso (vista previa)",
        "Try a wallet-signed pledge. Nothing is recorded": "Prueba un compromiso firmado con billetera. No se registra nada",
        "Community": "Comunidad",
        "Facebook groups for Pennsylvania, for now": "Grupos de Facebook de Pensilvania, por ahora",
        "Reach out": "Ponte en contacto",
        "Every way to reach the initiative": "Todas las formas de contactar a la iniciativa",
        "About": "Acerca de",
        "About the initiative": "Acerca de la iniciativa",
        "What this is, and who it's for": "Qué es esto, y para quién es",
        "Roadmap": "Hoja de ruta",
        "Where the initiative is headed": "Hacia dónde va la iniciativa",
        "Sustainability": "Sostenibilidad",
        "What keeps these pages running": "Lo que mantiene estas páginas funcionando",
        "Evidence library": "Biblioteca de evidencia",
        "The shelves, coming soon": "Los estantes, muy pronto",
        "The code, in the open": "El código, a la vista",
        "Psychedelic Policy Reform, all the ways around": "Psychedelic Policy Reform, todos los caminos",
        "Explore": "Explora",
        "Welcome guide": "Guía de bienvenida",
        "About this build": "Sobre este sitio",
        "AstroLog source": "Código del AstroLog",
        "dApp source": "Código de la dApp",
        "Not legal advice. Code here is MIT licensed and the words are CC BY-SA 4.0.": "No es asesoría legal. El código aquí tiene licencia MIT y los textos, CC BY-SA 4.0.",
        "Every way to reach the initiative. It's young, so for now the way in is one of the two Facebook groups Christopher W manages (Facebook may ask you to sign in) or his GitHub; an address and a form come later. Two related NORML groups are in the <a href=\"https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/#community\" data-arrival-open=\"community\">Community window</a>.": "Todas las formas de contactar a la iniciativa. Es joven, así que por ahora la puerta de entrada es uno de los dos grupos de Facebook que administra Christopher W (Facebook puede pedirte que inicies sesión) o su GitHub; una dirección y un formulario vendrán después. Dos grupos relacionados de NORML están en la <a href=\"https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/#community\" data-arrival-open=\"community\">ventana de Comunidad</a>.",
        "A Facebook group Christopher W manages, for anyone following psychedelic law and policy reform in Pennsylvania. Questions and hellos are welcome there.": "Un grupo de Facebook que administra Christopher W, para quien siga la reforma de leyes y políticas sobre psicodélicos en Pensilvania. Ahí son bienvenidas las preguntas y los saludos.",
        "A Facebook group Christopher W manages, on religious-freedom law in Pennsylvania and what it means for sincere sacramental practice.": "Un grupo de Facebook que administra Christopher W, sobre las leyes de libertad religiosa en Pensilvania y lo que significan para la práctica sacramental sincera.",
        "Christopher W on GitHub": "Christopher W en GitHub",
        "Open the profile": "Abrir el perfil",
        "The initiative's maintainer. His GitHub profile lists the ways he can be reached.": "Quien mantiene la iniciativa. Su perfil de GitHub indica las formas de contactarlo.",
        "A public address for the initiative": "Una dirección pública para la iniciativa",
        "Not set up yet. When the initiative has its own address, it goes here.": "Todavía no existe. Cuando la iniciativa tenga su propia dirección, irá aquí.",
        "A contact form": "Un formulario de contacto",
        "Coming with the initiative's own website, once it has one.": "Llegará con el sitio web propio de la iniciativa, cuando lo tenga.",
        "Please don't send personal legal details through any of these. This initiative works on policy and evidence and can't give legal advice.": "Por favor, no envíes detalles legales personales por ninguno de estos medios. Esta iniciativa trabaja en políticas y evidencia y no puede dar asesoría legal.",
        "Facebook groups in Pennsylvania": "Grupos de Facebook en Pensilvania",
        "See every way in": "Ver todas las formas de entrar",
        "Where we gather": "Donde nos reunimos",
        "For now, the conversation happens in Facebook groups in Pennsylvania: two that Christopher W manages, and two related NORML groups. A space of the initiative's own comes later.": "Por ahora, la conversación ocurre en grupos de Facebook de Pensilvania: dos que administra Christopher W y dos grupos relacionados de NORML. Un espacio propio de la iniciativa vendrá después.",
        "For now, people following this work gather in Facebook groups in Pennsylvania. Two are groups Christopher W manages; two are related groups run by others. Facebook may ask you to sign in.": "Por ahora, quienes siguen este trabajo se reúnen en grupos de Facebook de Pensilvania. Dos son grupos que administra Christopher W; dos son grupos relacionados que administran otras personas. Facebook puede pedirte que inicies sesión.",
        "A group Christopher W manages, for anyone following psychedelic law and policy reform in Pennsylvania.": "Un grupo que administra Christopher W, para quien siga la reforma de leyes y políticas sobre psicodélicos en Pensilvania.",
        "Open the group": "Abrir el grupo",
        "A group Christopher W manages, on religious-freedom law in Pennsylvania (the state's Religious Freedom Protection Act and the federal RFRA) and what it means for sincere sacramental practice.": "Un grupo que administra Christopher W, sobre las leyes de libertad religiosa en Pensilvania (la Religious Freedom Protection Act del estado y la RFRA federal) y lo que significan para la práctica sacramental sincera.",
        "A related Facebook group for southern Pennsylvania, in the circle of NORML (the National Organization for the Reform of Marijuana Laws). Not part of this initiative.": "Un grupo de Facebook relacionado, del sur de Pensilvania, en el círculo de NORML (la Organización Nacional para la Reforma de las Leyes sobre la Marihuana). No forma parte de esta iniciativa.",
        "A related Facebook group: NORML's Lebanon Valley College chapter. Not part of this initiative.": "Un grupo de Facebook relacionado: el capítulo de NORML en Lebanon Valley College. No forma parte de esta iniciativa.",
        "Updates by email": "Novedades por correo",
        "News when something changes, and nothing else.": "Noticias cuando algo cambia, y nada más.",
        "Looking ahead: a supporters' network of our own": "Mirando hacia adelante: una red propia de simpatizantes",
        "Sneak peek": "Un adelanto",
        "In time, supporters could sign a pledge with a wallet signature and gather in a small network that belongs to them rather than to one company.": "Con el tiempo, quienes apoyan podrían firmar un compromiso con la firma de una billetera y reunirse en una pequeña red que sea suya y no de una empresa.",
        "Pledges signed with a wallet signature: no gas, and no personal details needed. The dApp preview lets you try one today, and nothing is recorded.": "Compromisos firmados con la firma de una billetera: sin gas y sin datos personales. La vista previa de la dApp te deja probar uno hoy, y no se registra nada.",
        "Tokens of gratitude, later: soulbound thank-yous that stay in the wallet they're given to, a deeper commitment beyond a signed pledge (a sneak peek on the pledge page).": "Tokens de gratitud, más adelante: agradecimientos intransferibles (soulbound) que se quedan en la billetera a la que se entregan, un compromiso más profundo que un compromiso firmado (un adelanto en la página del compromiso).",
        "Profiles and posts on open protocols like Lens and Farcaster, paired with a DAO where supporters propose ideas and decide together.": "Perfiles y publicaciones en protocolos abiertos como Lens y Farcaster, junto con una DAO donde quienes apoyan proponen ideas y deciden juntos.",
        "Privacy first: everyone chooses what's public.": "La privacidad primero: cada persona elige qué es público.",
        "No dates, and nothing to sign up for yet. This is a direction, not a promise.": "Sin fechas, y todavía nada en qué inscribirse. Es una dirección, no una promesa.",
        "The NORML groups are related, not partners: this initiative doesn't speak for them, and they don't speak for it. Please don't share personal legal details in any group; this initiative can't give legal advice.": "Los grupos de NORML están relacionados, no son aliados: esta iniciativa no habla por ellos y ellos no hablan por ella. Por favor, no compartas detalles legales personales en ningún grupo; esta iniciativa no puede dar asesoría legal.",
        "Want to know when a space of our own opens? The <a href=\"https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/changelog\">changelog</a> will say so first.": "¿Quieres saber cuándo abre un espacio propio? El <a href=\"https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/changelog\">registro de cambios</a> lo dirá primero.",
        "The initiative's AstroLog has three parts.": "El AstroLog de la iniciativa tiene tres partes.",
        "Sharing one change? Every entry and every write-up has its own preview card: a stone arch with its keystone set and a sprout of its own, the title and the summary. Paste its link into Telegram, iMessage or Discord and it arrives with that card. The <strong>Copy a link</strong> button under each one does the copying.": "¿Vas a compartir un cambio? Cada entrada y cada texto tiene su propia tarjeta de vista previa: un arco de piedra con su clave puesta y un brote propio, el título y el resumen. Pega su enlace en Telegram, iMessage o Discord y llega con esa tarjeta. El botón <strong>Copiar un enlace</strong> debajo de cada uno lo copia por ti.",
        "The changelog": "El registro de cambios",
        "Every notable step, newest first. Each entry opens with a one-line summary, with the full story folded underneath, and credits whoever did the work.": "Cada paso notable, lo más nuevo primero. Cada entrada abre con un resumen de una línea, con la historia completa plegada debajo, y reconoce a quien hizo el trabajo.",
        "Read the changelog": "Leer el registro de cambios",
        "The library": "La biblioteca",
        "Explainers in plain words, starting with RFRA. Drafts are marked as drafts until they've been reviewed, and nothing in them is legal advice.": "Explicaciones en palabras sencillas, empezando por la RFRA. Los borradores se marcan como borradores hasta que se revisan, y nada de lo que dicen es asesoría legal.",
        "Open the library": "Abrir la biblioteca",
        "The ledger": "El libro de cambios",
        "Every public change to the initiative's code on GitHub, in plain words: grouped by day and by kind, credited by name, and linked to the change itself. Private work shows too, masked. It refreshes every day.": "Cada cambio público en el código de la iniciativa en GitHub, en palabras sencillas: agrupados por día y por tipo, reconocidos por nombre y enlazados al cambio mismo. El trabajo privado también aparece, enmascarado. Se actualiza cada día.",
        "Open the ledger": "Abrir el libro de cambios",
        "the Psychedelic Policy Reform AstroLog": "el AstroLog de Psychedelic Policy Reform",
        "The AstroLog is the initiative's open record: what changed and why, explainers in plain words, a map of every page, and a ledger of every change to its code.": "El AstroLog es el registro abierto de la iniciativa: qué cambió y por qué, explicaciones en palabras sencillas, un mapa de cada página y un libro de cada cambio en su código.",
        "the Psychedelic Policy Reform dApp preview": "la vista previa de la dApp de Psychedelic Policy Reform",
        "This is the initiative's dApp preview: the evidence library's shelves, a pledge you can try with a wallet signature (nothing is recorded yet), and the latest news from the AstroLog. Your light and motion choices carry over between the two.": "Esta es la vista previa de la dApp de la iniciativa: los estantes de la biblioteca de evidencia, un compromiso que puedes probar con la firma de una billetera (todavía no se registra nada) y las últimas noticias del AstroLog. Tus elecciones de luz y movimiento te acompañan entre los dos.",
        "Every page here takes its colors from the record itself: Docket's ink-blue slate, Parchment's paper and ink, and Capitol's Pennsylvania blue and gold. Pick one, and it follows you between the AstroLog and the dApp preview.": "Cada página aquí toma sus colores del registro mismo: la pizarra azul tinta de Expediente, el papel y la tinta de Pergamino, y el azul y oro de Pensilvania de Capitolio. Elige uno y te acompaña entre el AstroLog y la vista previa de la dApp.",
        "Motion here is quiet: the arch's stones catch the light one by one, and a faint trail can follow your pointer. Choose how much moves, how large the text is, and whether you'd like more contrast for reading.": "Aquí el movimiento es tranquilo: las piedras del arco toman la luz una por una, y una estela tenue puede seguir a tu puntero. Elige cuánto se mueve, qué tan grande es el texto y si quieres más contraste para leer.",
        "Every entry credits whoever did the work, by first name and last initial.": "Cada entrada reconoce a quien hizo el trabajo, por su nombre y la inicial de su apellido.",
        "Pictures come from public GitHub profiles. Anyone without one linked gets a small keystone with their initials.": "Las imágenes vienen de perfiles públicos de GitHub. Quien no tenga uno enlazado recibe una pequeña clave de arco con sus iniciales.",
        "You've set every stone in the arch. Welcome to Psychedelic Policy Reform.": "Colocaste cada piedra del arco. Te damos la bienvenida a Psychedelic Policy Reform.",
        "Enter": "Entrar",
        "A faint trail of sage and gold behind your pointer. Switch it off if you'd rather not.": "Una estela tenue de salvia y oro tras tu puntero. Apágala si lo prefieres.",
        "One tap for the calmest page: Parchment, nothing moving, more contrast, shorter lines, and no cursor effects. Tap again to go back to how you had it.": "Un toque para la página más tranquila: Pergamino, nada en movimiento, más contraste, líneas más cortas y sin efectos del cursor. Toca otra vez para volver a como la tenías.",
        "Let the stones rest": "Dejar descansar las piedras",
        "Let the light move": "Dejar que la luz se mueva",
        "Anywhere on the initiative's pages, any time: every change, explainer, person and page, from the AstroLog or the dApp preview.": "En cualquier lugar de las páginas de la iniciativa, en cualquier momento: cada cambio, explicación, persona y página, desde el AstroLog o la vista previa de la dApp.",
        "AstroLog porch": "Pórtico del AstroLog",
        "The ledger: every public change": "El libro de cambios: cada cambio público",
        "Map: every place, with pictures": "Mapa: cada lugar, con imágenes",
        "Evidence library (coming soon)": "Biblioteca de evidencia (muy pronto)",
        "Pledge of support (preview)": "Compromiso de apoyo (vista previa)",
        "Facebook group, related": "grupo de Facebook, relacionado",
        "AstroLog on GitHub": "AstroLog en GitHub",
        "dApp preview on GitHub": "Vista previa de la dApp en GitHub",
      },
    },
  };
})();
/* ── end of the languages block ── */
