# 🌱 Sustainability: what keeps these pages running

<div class="tldr"><i class="ph ph-plant"></i> <span><strong>TL;DR:</strong> Nothing here costs money. What keeps it alive is a short list of things that quietly expire or drift: a publishing token, a daily rebuild, the shared arrival kit, a wallet-connect project and its allowlist, and cached link previews. Each one is written down below, with what to do when it needs attention. And today one person holds every key, so there's a plan to change that.</span></div>

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
**arrival kit** (1.4.0, copied unchanged): `arrival.js`, `arrival.css`, `give/give.js` and
`pledge/pledge.js`, plus this initiative's own `org.js` (facts and links) and `org.css` (the look), in
this AstroLog's `public/arrival/`. The kit's own wallet modules (give, pledge) are copied but not
switched on here: the dApp preview has its own pledge. The initiative
has no organization portal, so this site hosts the kit, and the dApp preview loads the same files by
absolute URL. The canonical kit is in
[`drasticstatic/my-template`](https://github.com/drasticstatic/my-template) under
`changelog-template/arrival/`.

*What to do:* to update the kit, copy the kit files over unchanged (`cmp` each against the previous
canonical version first: a mismatch is a fork, not a stale copy) and rebuild. **Deploy order:**
this AstroLog first, then the dApp preview. Changes reach visitors within GitHub Pages' ten-minute cache.

### 👛 Wallet connect (Reown)

The dApp preview's wallet button is **Reown AppKit**. It needs a Reown project ID, set as the Actions
secret `NEXT_PUBLIC_REOWN_PROJECT_ID` in `psychedelic-policy-reform-dapp`, and the project's domain
allowlist must include `https://drasticstatic.github.io`. Without the ID, the preview still works: the
pledge offers a browser wallet (if one is installed) and explains what's missing, and nothing errors.

**Shared, or its own.** The fleet's other sites connect through **one shared Reown project**
(`00b6a1cd528ff580f1fd845ed08b0187`, made for the O-R-G dApp, held in Christopher W's Reown account),
and its allowlist already includes `https://drasticstatic.github.io`, so this preview can use it today
by setting that ID as the secret. If that project is deleted, suspended or runs past its free plan,
wallet connect stops everywhere it's used (calmly; nothing breaks). The initiative's own project is a
**one-line change**: create a free project at dashboard.reown.com under an account the initiative
controls, add `https://drasticstatic.github.io` (and any future domain) to its allowlist, and put its ID
in the secret (and in `give.reownProjectId` in `org.js`, if the kit's wallet modules are ever switched
on here). Do it before anything is recorded.

*What to do:* if wallet connect stops opening, check the Reown dashboard for the project and its
allowlist, then re-run the dApp's deploy workflow.

### 🖼️ Cached link previews

Every page has its own 1200×630 share card, drawn at build time. Apps cache previews for weeks, so a
changed card can keep showing the old one. No card ever carries a count, so a cached one is never wrong
about numbers.

*What to do:* after changing a card, refresh it in each app: Telegram's
[@WebpageBot](https://t.me/WebpageBot), LinkedIn's Post Inspector, Facebook's Sharing Debugger.

### 🔗 Links that leave GitHub

The Community window links four Facebook groups (Pennsylvania Psychedelic Reform and Pennsylvania RFRA,
which Christopher W manages, and two related NORML groups), by their plain facebook.com/groups
addresses. *What to do:* if a group is renamed, moved or closed, update `community` in
`public/arrival/org.js` and the community card in `src/og/pages.ts`.

### 🛡️ Branch protection

Each public repository's `main` has a ruleset that blocks deletion and force-pushes, with an admin
bypass the mirror workflow uses. The `gh-pages` branch is rewritten on every deploy, by design.

## 🤝 Stewardship and succession

**Today, one person holds every key.** drasticstatic (Christopher W) owns both private repositories and
their public siblings, will hold the tokens that publish them (`PUBLIC_REPO_TOKEN`, and a `LEDGER_TOKEN`
if one is set), administers the two Facebook groups he manages, and holds the Reown account above. That's a single point of failure: if he stepped away, the tokens would expire on schedule and the
sites would quietly stop updating, with nobody else able to renew them. The plan, so these pages outlive
any one person, Christopher included:

1. **A home of the initiative's own.** Move the four repositories into a GitHub organization (the
   initiative's, or its first announced partner's), with at least two owners, each with two-factor
   sign-in.
2. **Org-owned automation, not personal tokens.** Publishing moves to a GitHub App installed on that
   organization (short-lived tokens, scoped to the repositories it needs), or failing that a dedicated
   bot account whose credentials the owners share.
3. **A token register**: every token, key and secret the sites use, with what it does, which secret
   holds it, who owns it, its scopes and its expiry date, kept where every owner can read it (never the
   values themselves).
4. **A renewal runbook**: for each item in the register, how to renew it, step by step, and a reminder
   a month before each expiry date.
5. **Documented hand-over steps**: how to add an owner, transfer a repository, transfer the Reown
   project (or create the initiative's own), add a co-admin to each Facebook group, and remove someone
   who's leaving.
6. **Exports and backups**: the repositories (with their issues and history) cloned or exported
   somewhere the initiative controls, on a schedule.

Progress on each step is on the
[roadmap](https://drasticstatic.github.io/psychedelic-policy-reform-astro-public/roadmap).

*Maintained by Christopher W with Alfred (Claude Code). Last reviewed 2026-10-22.*
