import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { SUBJECTS, TYPES } from './data/taxonomy';

const subjectIds = SUBJECTS.map((s) => s.id) as [string, ...string[]];
const typeIds = TYPES.map((t) => t.id) as [string, ...string[]];

const items = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/items' }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    type: z.enum(typeIds),
    subjects: z.array(z.enum(subjectIds)).min(1).max(2),
    description: z.string(),
    creator: z.string(),
    creatorLink: z.string().url().optional(),
    avatar: z.string().url().optional(),
    thumbnail: z.string().url().optional(),
    dateAdded: z.coerce.date(),
    // Third-party content added by curators (not self-submitted by its creator).
    curated: z.boolean().default(false),
    // Sample entries shipped with the scaffold — delete before launch.
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { items };
