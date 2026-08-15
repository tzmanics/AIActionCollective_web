// The canonical taxonomy for the directory. Curator-extendable: add a new
// subject here and it appears in filters, subject pages, and the submit form.
// The submit Netlify Function keeps its own copy of the id lists — update
// netlify/functions/submit.mjs when you change these.

export interface Subject {
  id: string;
  label: string;
  blurb: string;
}

export const SUBJECTS: Subject[] = [
  {
    id: 'ai-and-jobs',
    label: 'AI & Jobs Right Now',
    blurb: 'What AI is actually doing to jobs today — automation, augmentation, and what "AI-assisted" means for real workers.',
  },
  {
    id: 'four-futures',
    label: 'The Four Futures',
    blurb: "Peter Frase's four futures — abundance vs. scarcity, equality vs. hierarchy — and which one we're currently building.",
  },
  {
    id: 'replicator-abundance',
    label: 'The Replicator & Abundance',
    blurb: "What Star Trek gets right about AI and abundance, and why the Federation didn't happen automatically.",
  },
  {
    id: 'who-owns-ai',
    label: 'Who Owns AI',
    blurb: 'How a handful of companies control the most powerful AI systems, and what public or cooperative ownership could look like.',
  },
  {
    id: 'ai-productivity-tax',
    label: 'AI Productivity Tax',
    blurb: 'Who is capturing AI productivity gains, and how a robot tax or AI dividend could work in practice.',
  },
  {
    id: 'shorter-workweeks',
    label: 'Shorter Workweeks',
    blurb: 'How AI is already shortening workweeks in some places, and what would need to change politically to make it the norm.',
  },
  {
    id: 'organizing-with-ai',
    label: 'Organizing with AI',
    blurb: 'How progressive organizers can use AI today — scripts, research, comms, and automating the busywork.',
  },
  {
    id: 'campaigns-on-a-budget',
    label: 'Campaigns on a Budget',
    blurb: 'Free and low-cost AI tools any campaign can use to punch above its weight.',
  },
  {
    id: 'collective-knowledge',
    label: 'Built on Collective Knowledge',
    blurb: 'AI is trained on all of our collective knowledge and labor — and what we can demand in return.',
  },
];

export interface ContentType {
  id: string;
  label: string;
  labelPlural: string;
  blurb: string;
}

export const TYPES: ContentType[] = [
  {
    id: 'video',
    label: 'Short-Form Video',
    labelPlural: 'Short-Form Videos',
    blurb: 'Quick explainers that define the terms, cut through the hype, and connect AI to the issues that matter.',
  },
  {
    id: 'blog',
    label: 'Blog Post & Guide',
    labelPlural: 'Blog Posts & Guides',
    blurb: 'Deeper dives into AI policy, the abundance framework, and what progressive organizers need to know.',
  },
  {
    id: 'tutorial',
    label: 'Tutorial',
    labelPlural: 'Tutorials',
    blurb: 'Practical, step-by-step guides for using AI tools for campaigns, canvassing, comms, and organizing.',
  },
];

export const subjectById = (id: string): Subject | undefined =>
  SUBJECTS.find((s) => s.id === id);

export const typeById = (id: string): ContentType | undefined =>
  TYPES.find((t) => t.id === id);
