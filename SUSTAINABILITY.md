# 🌱 Sustainability: what keeps these pages running

<div class="tldr"><i class="ph ph-plant"></i> <span><strong>TL;DR:</strong> Nothing here costs money. What keeps it alive is a short list of things that quietly expire or drift: a publishing token, a daily rebuild, the shared arrival kit, a wallet-connect project and its allowlist, and cached link previews. Each one is written down below, with what to do when it needs attention.</span></div>

The initiative's pages are two public sites built from two private repositories. This page lists what
each one needs, so none of it depends on anyone's memory. It's also the repository's
`SUSTAINABILITY.md`, so it reads the same on GitHub.

## The pieces

| Repository | What it is | How it goes live |
| --- | --- | --- |
| `psychedelic-policy-reform-astro` (private) | The source of this AstroLog: entries, explainers, the Astro site, and the **arrival kit** both sites load (`public/arrival/`) | Two workflows: one builds the site and pushes it to the public repository's `gh-pages` branch; one mirrors the allowlisted source to its `main` |
| [`psychedelic-policy-reform-astro-public`](https://github.com/drasticstatic/psychedelic-policy-reform-astro-public) (public) | The built AstroLog you're reading | GitHub Pages, from `gh-pages` |
| `psychedelic-policy-reform-dapp` (private) | The source of the dApp preview (Next.js, static export, Reown AppKit) | Two workflows, the same shape |
| [`psychedelic-policy-reform-dapp-public-preview`](https://github.com/drasticstatic/psychedelic-policy-reform-dapp-public-preview) (public) | The built dApp preview | GitHub Pages, from `gh-pages` |

The private sources and the agent notes never reach the public repositories: only the files named in
each sync workflow's `public_allowlist` are mirrored, and this AstroLog's `changelog/` and `library/`
Markdown stay private (only the finished pages are published).

## What can quietly stop, and what to do

### 🔑 The publishing token (`PUBLIC_REPO_TOKEN`)

Both private repositories publish into their public siblings with a **classic personal access token**
stored as the Actions secret `PUBLIC_REPO_TOKEN` (scopes `repo` and `workflow`). Until it's added, every
push still builds the site and runs the checks, but the publish steps are skipped with a warning; the
first versions of both sites were published by hand. When the token expires, **the sites stop updating
without any visible sign on the sites themselves**: new entries, the daily ledger and every fix simply
stop arriving, and the pages keep showing the last good build.

*What to do:* make a classic token with `repo` and `workflow`, add it as `PUBLIC_REPO_TOKEN` in both
`psychedelic-policy-reform-astro` and `psychedelic-policy-reform-dapp` (Settings → Secrets and
variables → Actions), run each repository's workflows by hand once, and check the ledger's newest day.
Renew it before the expiry date GitHub shows.

### 📒 The ledger's private lane (`LEDGER_TOKEN`, optional)

The [ledger](https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/ledger) shows the
initiative's private work masked (repository, day and kind, with the words hidden). In the workflow, the
build's own token can read this AstroLog's source; the parent repository and the dApp's source need a
token that can read them. A read-only `LEDGER_TOKEN` (Contents: read on those three repositories) wins
when it's set, else `PUBLIC_REPO_TOKEN`. Without either, their rows carry over, masked, from the
committed snapshot (`npm run ledger:snapshot` refreshes it). A leak check (`npm run ledger:verify`) runs
between the build and the publish and fails the deploy if any private words reach the pages.

### 🗓️ The daily rebuild

So the ledger stays fresh on days nothing else changes, the AstroLog's deploy workflow also runs
**every day at 10:53 UTC**. It uses a few minutes of the account's Actions allowance a day.

*What to do:* if the ledger's newest day looks old, open the workflow's run history. A failed scheduled
run usually means the token above, or GitHub's API having a bad moment (the build then falls back to
the snapshot and still publishes).

### 🧰 The arrival kit lives here

The navbar (with its More and Menu folds), the light, motion and reading controls, `/` search, what's
new, the welcome guide, the contact and community windows and the map's cards all come from the
**arrival kit**: `arrival.js` and `arrival.css` (v1.2.1, copied unchanged), plus this initiative's own
`org.js` (facts and links) and `org.css` (the look), in this AstroLog's `public/arrival/`. The initiative
has no organization portal, so this site hosts the kit, and the dApp preview loads the same files by
absolute URL. The canonical kit is in
[`drasticstatic/my-template`](https://github.com/drasticstatic/my-template) under
`changelog-template/arrival/`.

*What to do:* to update the kit, copy the two core files over unchanged and rebuild. **Deploy order:**
this AstroLog first, then the dApp preview. Changes reach visitors within GitHub Pages' ten-minute cache.

### 👛 Wallet connect (Reown)

The dApp preview's wallet button is **Reown AppKit**. It needs a Reown project ID, set as the Actions
secret `NEXT_PUBLIC_REOWN_PROJECT_ID` in `psychedelic-policy-reform-dapp`, and the project's domain
allowlist must include `https://drasticstatic.github.io`. Without the ID, the preview still works: the
pledge offers a browser wallet (if one is installed) and explains what's missing, and nothing errors.

*What to do:* if wallet connect stops opening, check the Reown dashboard for the project and its
allowlist, then re-run the dApp's deploy workflow.

### 🖼️ Cached link previews

Every page has its own 1200×630 share card, drawn at build time. Apps cache previews for weeks, so a
changed card can keep showing the old one. No card ever carries a count, so a cached one is never wrong
about numbers.

*What to do:* after changing a card, refresh it in each app: Telegram's
[@WebpageBot](https://t.me/WebpageBot), LinkedIn's Post Inspector, Facebook's Sharing Debugger.

### 🛡️ Branch protection

Each public repository's `main` has a ruleset that blocks deletion and force-pushes, with an admin
bypass the mirror workflow uses. The `gh-pages` branch is rewritten on every deploy, by design.

*Maintained by Christopher W with Alfred (Claude Code). Last reviewed 2026-10-13.*
