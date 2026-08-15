# AI Action Collective

AI literacy for the progressive movement — a community directory of short-form
videos, blog posts & guides, and tutorials, made by many creators and organized
by subject. Live at [aiactioncollective.org](https://aiactioncollective.org).

## How it works

- **Astro static site** deployed on Netlify. Every content item is a markdown
  file in `src/content/items/` — git is the database and the audit log.
- **Taxonomy** (3 types, 9 subjects) lives in `src/data/taxonomy.ts`. Adding a
  subject there updates filters, pages, and the submit form. Keep the id lists
  in `netlify/functions/submit.mjs` in sync.
- **Submissions**: the form at `/submit` POSTs to
  `netlify/functions/submit.mjs`, which validates (honeypot + field checks) and
  opens a **GitHub pull request** containing the new entry file. Reviewing =
  reading the PR (with its Netlify deploy preview) and merging. Merge = publish.
  The submitter's email is in the PR body — **email them the outcome either way.**
- **Analytics**: PostHog (internal-only). Pageviews plus a `content_click`
  event on every outbound content link, tagged with `item_slug` and `creator`.
- **Creator credit**: outbound links are direct (referrer intact), carry
  `utm_source=aiactioncollective`, and are not nofollowed.

## Development

```sh
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

## Environment variables (set in Netlify)

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Fine-grained PAT (Contents R/W + Pull requests R/W on this repo) — powers the submission → PR pipeline |
| `GITHUB_REPO` | Optional; defaults to `tzmanics/AIActionCollective_web` |
| `PUBLIC_POSTHOG_KEY` | PostHog project API key (analytics disabled if unset) |
| `PUBLIC_POSTHOG_HOST` | Optional; defaults to `https://us.i.posthog.com` |

See `TODO_launch.md` for the launch checklist, seed-content list, and
third-party outreach tracker.
