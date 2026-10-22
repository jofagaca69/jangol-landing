import { getCollection } from 'astro:content';

export const topics = {
	gyms: 'Gimnasios',
	schools: 'Colegios',
	custom: 'Software a la medida',
} as const;

/** Published articles, newest first. */
export async function getRecursos() {
	const all = await getCollection('recursos', ({ data }) => !data.draft);
	return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

const fmt = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const formatDate = (d: Date) => fmt.format(d);
