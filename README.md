<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/brand/readme-banner-dark.svg">
  <img alt="Psychedelic Policy Reform. Religious freedom for sincere sacramental practice, seen from Pennsylvania: a quiet docket page breathing behind a stone arch with a glowing golden keystone." src="public/brand/readme-banner-light.svg" width="100%">
</picture>

# Psychedelic Policy Reform

> The open record of an RFRA-based psychedelic policy reform initiative, seen from Pennsylvania.

[![License: MIT](https://img.shields.io/badge/code-MIT-lightgrey?style=flat)](https://github.com/drasticstatic/psychedelic-policy-reform-astro-public/blob/main/LICENSE)
[![Content: CC BY-SA 4.0](https://img.shields.io/badge/words-CC%20BY--SA%204.0-lightgrey?style=flat)](https://github.com/drasticstatic/psychedelic-policy-reform-astro-public/blob/main/LICENSE-CONTENT)
[![Live Site](https://img.shields.io/badge/%F0%9F%8C%90%20Live-AstroLog-84D1A5)](https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/)
[![dApp preview](https://img.shields.io/badge/%F0%9F%A7%AA%20dApp-preview-E0B65E)](https://drasticstatic.github.io/psychedelic-policy-reform-dapp-public-preview/)
[![Built with Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code%20CLI-blueviolet)](https://code.claude.com/docs/en/overview)

---

<strong><i class="ph ph-door-open"></i> <a href="https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/">The AstroLog</a></strong> · <a href="https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/changelog"><i class="ph ph-clock-counter-clockwise"></i> Changelog</a> · <a href="https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/library"><i class="ph ph-books"></i> Library</a> · <a href="https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/ledger"><i class="ph ph-scroll"></i> Ledger</a> · <a href="https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/map"><i class="ph ph-map-trifold"></i> Map</a> · <a href="https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/roadmap"><i class="ph ph-path"></i> Roadmap</a> · <a href="https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/sustainability"><i class="ph ph-plant"></i> Sustainability</a> · <a href="https://drasticstatic.github.io/psychedelic-policy-reform-dapp-public-preview/"><i class="ph ph-cube"></i> dApp preview</a>

---

## 👋 What this is

**Psychedelic Policy Reform** is a policy and evidence initiative built on the **Religious Freedom
Restoration Act (RFRA)**, the federal law that limits how far the government may burden a person's
sincere exercise of religion. It's seen from Pennsylvania, and it's meant to serve communities whose
sincere spiritual practice includes sacraments the law still restricts.

The work is plain: gather the evidence, explain the law in words anyone can follow, and keep an open
record of every step. This AstroLog is that record. Its other half, the
[dApp preview](https://drasticstatic.github.io/psychedelic-policy-reform-dapp-public-preview/), holds
the evidence library's shelves and a pledge of support you can try with a wallet signature (a preview:
nothing is recorded yet).

> **Not legal advice.** Everything here is general information about the law and public sources,
> written for understanding. It can't account for anyone's situation. For advice, talk to a lawyer
> licensed where you live.

## 🧭 Where to start

- **[RFRA in plain words](https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/library/rfra-in-plain-words)**:
  what the law says, where it came from, and the landmark case about a sacramental tea. A draft, to
  be reviewed.
- **[The roadmap](https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/roadmap)**:
  an evidence library, a Pennsylvania lane, partner organizations, and what this work can mean for
  each community it serves.
- **[The changelog](https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/changelog)**:
  every step, newest first. Updates appear there first.

**Partner organizations:** to be announced.

## 🗂️ What's in this repository

- `changelog/`: one Markdown file per entry, named `YYYY-MM-DD-short-slug.md`.
- `library/`: explainers and longer write-ups. A draft says so (`draft: true`), and anything about law
  or evidence carries the "not legal advice" note (`legal: true`).
- `src/`, `public/`: the Astro site. `public/arrival/` holds the arrival kit (v1.5.1) that both this
  AstroLog and the dApp preview load. Since kit 1.5 it welcomes visitors in English first, with
  Español one tap away; the kit's own menus are translated and marked "under review", and a quiet
  note says when a page's words are still in English. `public/brand/` holds this README's banner.
- `ROADMAP.md` and `SUSTAINABILITY.md`: where this is headed, and what keeps it running. Each is also
  a page on the site.

The source repository is private. On every push to `main`, one workflow builds the site and publishes
only the finished pages to the `gh-pages` branch of
[`psychedelic-policy-reform-astro-public`](https://github.com/drasticstatic/psychedelic-policy-reform-astro-public),
and another mirrors the allowlisted source (never `changelog/`, `library/` or agent notes) to its
`main`. The site also rebuilds every day, so the ledger stays fresh.

## ✍️ Adding an entry

New file in `changelog/`, named `YYYY-MM-DD-short-slug.md`:

```yaml
---
title: "Plain-language title"
date: "YYYY-MM-DD"
priority: "P2-medium" # P1-high, P2-medium (default), or P3-low
repo: "initiative" # which card it belongs to: initiative, astrolog, dapp, evidence, pennsylvania
who: "Christopher W" # first name + last initial, no period
---
```

Open with a one-line TL;DR, then put the full story inside a `<details>` block. This is a policy and
evidence lane: no one's personal story or legal history ever goes here, and partners are named only
once they've been announced.

## 💻 Local development

```sh
sh scripts/install-hooks.sh   # once per clone
npm install
npm run dev
```

Requires Node.js `>=22.12.0`.

## 📄 License

- 💻 **Code:** MIT, see [`LICENSE`](https://github.com/drasticstatic/psychedelic-policy-reform-astro-public/blob/main/LICENSE)
- 📝 **Written content** (docs, changelog and library prose, READMEs): CC BY-SA 4.0, see [`LICENSE-CONTENT`](https://github.com/drasticstatic/psychedelic-policy-reform-astro-public/blob/main/LICENSE-CONTENT)
- 🏷️ **Names and marks:** not covered by either license, see [`TRADEMARKS.md`](https://github.com/drasticstatic/psychedelic-policy-reform-astro-public/blob/main/TRADEMARKS.md)

---

*Kept by Christopher W ([drasticstatic](https://github.com/drasticstatic)) with Alfred, using Anthropic's Claude Code CLI.*
