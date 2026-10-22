import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const recursos = defineCollection({
	loader: glob({ base: './src/content/recursos', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		topic: z.enum(['gyms', 'schools', 'custom']),
		draft: z.boolean().default(false),
	}),
});

export const collections = { recursos };
