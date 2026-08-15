// Submission pipeline: validated form POST → new entry file on a branch →
// GitHub pull request. Merging the PR publishes the item (Netlify rebuilds).
//
// Required environment variables (set in Netlify → Site settings → Environment):
//   GITHUB_TOKEN — fine-grained PAT for the repo below, with Contents: R/W
//                  and Pull requests: R/W
//   GITHUB_REPO  — optional override, defaults to "tzmanics/AIActionCollective_web"

const REPO = process.env.GITHUB_REPO || 'tzmanics/AIActionCollective_web';
const API = `https://api.github.com/repos/${REPO}`;

// Mirrors src/data/taxonomy.ts — keep in sync when the taxonomy changes.
const TYPE_IDS = ['video', 'blog', 'tutorial'];
const SUBJECT_IDS = [
  'ai-and-jobs',
  'four-futures',
  'replicator-abundance',
  'who-owns-ai',
  'ai-productivity-tax',
  'shorter-workweeks',
  'organizing-with-ai',
  'campaigns-on-a-budget',
  'collective-knowledge',
];

const MAX = { title: 120, description: 300, creator: 80, otherSubject: 120 };

const isHttpUrl = (v) => {
  try {
    const u = new URL(v);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60) || 'submission';

// JSON.stringify produces valid, safely-escaped YAML scalars.
const yaml = (v) => JSON.stringify(String(v));

function validate(body) {
  const errors = [];
  for (const field of ['title', 'url', 'type', 'description', 'creator', 'email']) {
    if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
      errors.push(`Missing required field: ${field}.`);
    }
  }
  for (const [field, max] of Object.entries(MAX)) {
    if (typeof body[field] === 'string' && body[field].length > max) {
      errors.push(`${field} is too long (max ${max} characters).`);
    }
  }
  if (body.url && !isHttpUrl(body.url)) errors.push('Content link must be a valid http(s) URL.');
  for (const field of ['creatorLink', 'avatar', 'thumbnail']) {
    if (body[field] && !isHttpUrl(body[field])) errors.push(`${field} must be a valid http(s) URL.`);
  }
  if (!TYPE_IDS.includes(body.type)) errors.push('Unknown content type.');
  const subjects = Array.isArray(body.subjects) ? body.subjects : [];
  if (subjects.length < 1 || subjects.length > 2 || !subjects.every((s) => SUBJECT_IDS.includes(s))) {
    errors.push('Pick one or two subjects from the list.');
  }
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push('Email address does not look valid.');
  }
  return errors;
}

async function gh(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub ${init.method || 'GET'} ${path} → ${res.status}: ${text}`);
  }
  return res.json();
}

export default async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field. Pretend success, do nothing.
  if (body.website) {
    return Response.json({ ok: true });
  }

  // ── Anti-spam seam ─────────────────────────────────────────────────────
  // If form spam ever gets past the honeypot, add Cloudflare Turnstile here:
  // verify body.turnstileToken against https://challenges.cloudflare.com/
  // turnstile/v0/siteverify with a TURNSTILE_SECRET env var, and add the
  // widget to src/pages/submit.astro.
  // ───────────────────────────────────────────────────────────────────────

  const errors = validate(body);
  if (errors.length > 0) {
    return Response.json({ error: errors.join(' ') }, { status: 400 });
  }

  if (!process.env.GITHUB_TOKEN) {
    console.error('GITHUB_TOKEN is not configured');
    return Response.json({ error: 'Submissions are temporarily unavailable.' }, { status: 500 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const slug = slugify(body.title);
  const branch = `submission/${slug}-${Date.now()}`;
  const filePath = `src/content/items/${slug}.md`;

  const lines = [
    '---',
    `title: ${yaml(body.title.trim())}`,
    `url: ${yaml(body.url.trim())}`,
    `type: ${body.type}`,
    `subjects: [${body.subjects.join(', ')}]`,
    `description: ${yaml(body.description.trim())}`,
    `creator: ${yaml(body.creator.trim())}`,
  ];
  if (body.creatorLink) lines.push(`creatorLink: ${yaml(body.creatorLink.trim())}`);
  if (body.avatar) lines.push(`avatar: ${yaml(body.avatar.trim())}`);
  if (body.thumbnail) lines.push(`thumbnail: ${yaml(body.thumbnail.trim())}`);
  lines.push(`dateAdded: ${today}`, '---', '');
  const fileContent = lines.join('\n');

  const prBody = [
    '## New content submission',
    '',
    `**Submitter email (not published):** ${body.email.trim()}`,
    body.otherSubject ? `**Suggested new subject:** ${body.otherSubject.trim()}` : null,
    '',
    '### Reviewer checklist',
    '- [ ] Content is real, public, and matches our scope & guidelines',
    '- [ ] Links (content / creator / images) resolve and are safe',
    '- [ ] Merge to publish — or close if not a fit',
    '- [ ] **Email the submitter the outcome either way** (address above)',
  ]
    .filter((l) => l !== null)
    .join('\n');

  try {
    const repo = await gh('');
    const ref = await gh(`/git/ref/heads/${repo.default_branch}`);
    await gh('/git/refs', {
      method: 'POST',
      body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: ref.object.sha }),
    });
    await gh(`/contents/${filePath}`, {
      method: 'PUT',
      body: JSON.stringify({
        message: `Submission: ${body.title.trim()}`,
        content: Buffer.from(fileContent, 'utf8').toString('base64'),
        branch,
      }),
    });
    const pr = await gh('/pulls', {
      method: 'POST',
      body: JSON.stringify({
        title: `Submission: ${body.title.trim()} (${body.creator.trim()})`,
        head: branch,
        base: repo.default_branch,
        body: prBody,
      }),
    });
    console.log(`Opened submission PR #${pr.number}: ${pr.html_url}`);
    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: 'Could not file your submission. Please try again, or email aiactioncollective@gmail.com.' },
      { status: 502 }
    );
  }
};
