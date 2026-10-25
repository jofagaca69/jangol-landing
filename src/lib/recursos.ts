import { getCollection, type CollectionEntry } from 'astro:content';
import { path, type Lang } from '../i18n/routes';

/** Published articles in one language, newest first. */
export async function getRecursos(lang: Lang) {
	const all = await getCollection('recursos', ({ data }) => !data.draft && data.lang === lang);
	return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Entry ids look like "es/socios-que-dejan-de-venir"; the slug is the file name. */
export const recursoSlug = (entry: CollectionEntry<'recursos'>) => entry.id.split('/').pop()!;

export const recursoPath = (entry: CollectionEntry<'recursos'>) => `${path('resources', entry.data.lang)}${recursoSlug(entry)}/`;

const formats: Record<Lang, Intl.DateTimeFormat> = {
	es: new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
	en: new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
};
export const formatDate = (d: Date, lang: Lang) => formats[lang].format(d);

export const wordCount = (body = '') => body.split(/\s+/).filter(Boolean).length;
