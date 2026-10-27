/**
 * Every page that exists in both languages, keyed so links, hreflang tags,
 * the language switcher and the sitemap all read from one place.
 * Spanish is the default locale and lives at the root; English lives under /en/.
 */

export const langs = ['es', 'en'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'es';

export const site = 'https://jangol.com.co';

/** BCP 47 tags for <html lang> and hreflang. */
export const htmlLang: Record<Lang, string> = { es: 'es-CO', en: 'en' };
export const ogLocale: Record<Lang, string> = { es: 'es_CO', en: 'en_US' };

export const routes = {
	home: { es: '/', en: '/en/' },
	gyms: { es: '/gyms/', en: '/en/gyms/' },
	schools: { es: '/schools/', en: '/en/schools/' },
	custom: { es: '/a-la-medida/', en: '/en/custom-software/' },
	marketing: { es: '/marketing-digital/', en: '/en/digital-marketing/' },
	contact: { es: '/contacto/', en: '/en/contact/' },
	resources: { es: '/recursos/', en: '/en/resources/' },
	about: { es: '/nosotros/', en: '/en/about/' },
	privacy: { es: '/privacidad/', en: '/en/privacy/' },
	terms: { es: '/terminos/', en: '/en/terms/' },
} satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/** Article slugs per language, paired by the `translationKey` in each article's frontmatter. */
export const articles = {
	'socios-que-dejan-de-venir': { es: 'socios-que-dejan-de-venir', en: 'members-about-to-leave' },
	'matricula-en-linea-checklist': { es: 'matricula-en-linea-checklist', en: 'online-enrollment-checklist' },
	'plataforma-o-a-la-medida': { es: 'plataforma-o-a-la-medida', en: 'platform-or-custom-software' },
} satisfies Record<string, Record<Lang, string>>;

export type ArticleKey = keyof typeof articles;

export const path = (key: RouteKey, lang: Lang) => routes[key][lang];

export const articlePath = (key: ArticleKey, lang: Lang) => `${routes.resources[lang]}${articles[key][lang]}/`;

export const asLang = (locale: string | undefined): Lang => (locale === 'en' ? 'en' : 'es');

/** All language versions of a page, or undefined when the page exists in one language only. */
export function alternatesFor(pathname: string): Record<Lang, string> | undefined {
	const p = pathname.endsWith('/') ? pathname : `${pathname}/`;
	for (const r of Object.values(routes)) if (r.es === p || r.en === p) return r;
	for (const key of Object.keys(articles) as ArticleKey[]) {
		const pair = { es: articlePath(key, 'es'), en: articlePath(key, 'en') };
		if (pair.es === p || pair.en === p) return pair;
	}
	return undefined;
}
