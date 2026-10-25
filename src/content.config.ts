import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const recursos = defineCollection({
	loader: glob({ base: './src/content/recursos', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		topic: z.enum(['gyms', 'schools', 'custom']),
		lang: z.enum(['es', 'en']),
		/** Pairs the Spanish and English versions; must be a key of `articles` in src/i18n/routes.ts. */
		translationKey: z.string(),
		author: z.string().default('Equipo Jangol'),
		draft: z.boolean().default(false),
	}),
});

export const collections = { recursos };
