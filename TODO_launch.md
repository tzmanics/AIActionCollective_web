# Launch TODO

## 1. One-time setup (do these first)

- [ ] **GitHub token for the submission pipeline**: create a fine-grained PAT at
      github.com/settings/personal-access-tokens → "Generate new token".
      Repository access: only `tzmanics/AIActionCollective_web`.
      Permissions: **Contents → Read and write**, **Pull requests → Read and write**.
      Add it in Netlify → Site settings → Environment variables as `GITHUB_TOKEN`.
- [ ] **PostHog**: create a free project at posthog.com, copy the project API key,
      add to Netlify env as `PUBLIC_POSTHOG_KEY` (and `PUBLIC_POSTHOG_HOST` if not
      the default `https://us.i.posthog.com`). Events to watch: `content_click`
      with `item_slug` / `creator` / `content_type`, plus automatic pageviews.
- [ ] Confirm Netlify build settings match `netlify.toml` (build `npm run build`,
      publish `dist`) and that **deploy previews on PRs are enabled** — that's how
      you preview a submission before merging.
- [ ] Test the pipeline end to end: fill out `/submit` on a deploy preview or
      prod, confirm a PR appears, merge it, confirm the item goes live.
- [ ] Delete the four `src/content/items/sample-*.md` entries once real seed
      content is in.

## 2. Seed content to MAKE (goal: every subject has ≥2 items, ~18–20 total)

Short-form videos (scripts partly written in `short_form_video_scripts.md`):

- [ ] Video: What AI is actually doing to jobs right now → `ai-and-jobs`
- [ ] Video: Who owns AI and why that matters → `who-owns-ai`
- [ ] Video: "AI is built on collective knowledge" — what that means → `collective-knowledge`
- [ ] Video: How an organizer can use AI today → `organizing-with-ai`
- [ ] Video: The replicator analogy / Star Trek and abundance → `replicator-abundance`
- [ ] Video: How AI is already shortening workweeks → `shorter-workweeks`
- [ ] (stretch) Video: vocab explainers from the terms list → any subject

Blog posts / guides:

- [ ] Post: The Four Futures, explained for organizers → `four-futures`
- [ ] Post: What an AI productivity tax could look like → `ai-productivity-tax`
- [ ] (stretch) Post: The abundance framework primer → `replicator-abundance` / `four-futures`

Tutorials:

- [ ] Tutorial: Campaign AI on a small budget, step by step → `campaigns-on-a-budget`
- [ ] Tutorial: One concrete organizer workflow (e.g., canvassing scripts with AI) → `organizing-with-ai`

To add a finished item: copy any file in `src/content/items/`, fill in the
frontmatter, commit to `main`. (Or submit it through your own form to test the
pipeline again.)

## 3. Third-party content to FIND & credit (fills remaining gaps fast)

Per the plan: items go **live immediately with full attribution**; the usage/
heads-up request goes out **in parallel**; instant removal if a creator asks.

Subjects most in need of third-party picks (no owned content planned yet):

- [ ] Find 1–2 pieces on **AI & jobs right now** (`ai-and-jobs`)
- [ ] Find 1–2 pieces on **the AI productivity tax / robot tax** (`ai-productivity-tax`)
- [ ] Find 1–2 pieces on **shorter workweeks** (`shorter-workweeks`)
- [ ] Find 1–2 pieces on **the Four Futures** (Frase's own writing/talks are the obvious pick) (`four-futures`)
- [ ] Find 1–2 pieces on **who owns AI** (`who-owns-ai`)

Mark these entries `curated: true` in their frontmatter (shows a "Curated pick"
tag on the card).

### Outreach tracker

The permission note doubles as the interview outreach already planned in
`content_list.md` (what's missing in this space / what's most misunderstood /
what you wish more people understood).

| Content item | Creator | Contact | Request sent | Response | Interview asked? |
| --- | --- | --- | --- | --- | --- |
| _Four Futures (book/talks)_ | Peter Frase | | | | |
| _(TBD)_ | Ezra Klein | | | | |
| | | | | | |

Suggested note template:

> Hi — I run AI Action Collective (aiactioncollective.org), a directory of AI
> literacy content for the progressive movement. We've listed and linked
> [your piece] with full credit (name, link, and traffic goes straight to you —
> tagged `utm_source=aiactioncollective` so you'll see us in your analytics).
> Happy to adjust or remove anything on request. We'd also love your take on
> three quick questions: what content is missing in this space, what's most
> misunderstood by the public, and what you wish more people understood.

## 4. Before flipping the switch

- [ ] Every subject page has ≥2 items, no `placeholder: true` entries remain
- [ ] Spot-check every outbound link, avatar, and thumbnail
- [ ] Check PostHog is receiving `content_click` events from prod
- [ ] Announce to the "stay in the loop" email list
