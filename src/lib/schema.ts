/**
 * schema.org JSON-LD builders. Every node uses a stable @id on jangol.com.co so
 * pages can reference the Organization and WebSite without repeating them.
 */
import { company, isSet } from '../data/company';
import type { Product } from '../data/products';
import { htmlLang, path, site, type Lang } from '../i18n/routes';
import { t } from '../i18n/ui';

type Node = Record<string, unknown>;

export const ORG_ID = `${site}/#organization`;
export const WEBSITE_ID = `${site}/#website`;

const abs = (p: string) => new URL(p, site).href;
const only = <T>(v: T, ok: boolean) => (ok ? v : undefined);

export function organization(lang: Lang): Node {
	const address = isSet(company.address)
		? {
				'@type': 'PostalAddress',
				streetAddress: company.address,
				addressLocality: only(company.city, isSet(company.city)),
				addressRegion: only(company.region, isSet(company.region)),
				addressCountry: company.countryCode,
			}
		: { '@type': 'PostalAddress', addressCountry: company.countryCode };
	return {
		'@type': 'Organization',
		'@id': ORG_ID,
		name: company.brand,
		legalName: only(company.legalName, isSet(company.legalName)),
		taxID: only(company.nit, isSet(company.nit)),
		url: abs('/'),
		logo: { '@type': 'ImageObject', url: abs('/logo.png'), width: 512, height: 512 },
		slogan: t(lang).slogan,
		description: t(lang).footer.about,
		email: company.email,
		telephone: only(company.phone, isSet(company.phone)),
		foundingDate: only(company.foundingYear, isSet(company.foundingYear)),
		founder: company.founders.filter(isSet).map((name) => ({ '@type': 'Person', name })),
		address,
		areaServed: { '@type': 'Country', name: 'Colombia' },
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'sales',
			email: company.email,
			telephone: only(company.phone, isSet(company.phone)),
			areaServed: 'CO',
			availableLanguage: ['es', 'en'],
		},
		sameAs: company.sameAs.length ? company.sameAs : undefined,
	};
}

export function website(): Node {
	return {
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		url: abs('/'),
		name: company.brand,
		inLanguage: ['es-CO', 'en'],
		publisher: { '@id': ORG_ID },
	};
}

/** The page itself; `type` is WebPage, AboutPage, ContactPage or CollectionPage. */
export function webPage(opts: { url: string; name: string; description: string; lang: Lang; type?: string }): Node {
	return {
		'@type': opts.type ?? 'WebPage',
		'@id': `${abs(opts.url)}#webpage`,
		url: abs(opts.url),
		name: opts.name,
		description: opts.description,
		inLanguage: htmlLang[opts.lang],
		isPartOf: { '@id': WEBSITE_ID },
		about: { '@id': ORG_ID },
	};
}

export function breadcrumbs(lang: Lang, trail: { name: string; url: string }[]): Node {
	const items = [{ name: t(lang).breadcrumbHome, url: path('home', lang) }, ...trail];
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.url) })),
	};
}

export function softwareApp(p: Product, lang: Lang): Node {
	return {
		'@type': 'SoftwareApplication',
		'@id': `${abs(p.href)}#software`,
		name: p.name,
		description: p.definition,
		url: abs(p.href),
		applicationCategory: 'BusinessApplication',
		applicationSubCategory: p.id === 'gyms' ? (lang === 'es' ? 'Software para gimnasios' : 'Gym management software') : lang === 'es' ? 'Software para colegios' : 'School management software',
		operatingSystem: 'Web',
		featureList: p.modules.map((m) => m.title),
		inLanguage: htmlLang[lang],
		areaServed: { '@type': 'Country', name: 'Colombia' },
		audience: { '@type': 'BusinessAudience', audienceType: p.audience },
		publisher: { '@id': ORG_ID },
		provider: { '@id': ORG_ID },
	};
}

export function service(opts: { url: string; name: string; description: string; lang: Lang; offers: { title: string; desc: string }[] }): Node {
	return {
		'@type': 'Service',
		'@id': `${abs(opts.url)}#service`,
		name: opts.name,
		serviceType: opts.name,
		description: opts.description,
		url: abs(opts.url),
		provider: { '@id': ORG_ID },
		areaServed: { '@type': 'Country', name: 'Colombia' },
		inLanguage: htmlLang[opts.lang],
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: opts.name,
			itemListElement: opts.offers.map((o) => ({
				'@type': 'Offer',
				itemOffered: { '@type': 'Service', name: o.title, description: o.desc },
			})),
		},
	};
}

export function blogPosting(opts: {
	url: string;
	title: string;
	description: string;
	lang: Lang;
	published: Date;
	modified?: Date;
	author: string;
	image: string;
	wordCount: number;
}): Node {
	return {
		'@type': 'BlogPosting',
		'@id': `${abs(opts.url)}#article`,
		headline: opts.title,
		description: opts.description,
		url: abs(opts.url),
		mainEntityOfPage: { '@id': `${abs(opts.url)}#webpage` },
		inLanguage: htmlLang[opts.lang],
		datePublished: opts.published.toISOString(),
		dateModified: (opts.modified ?? opts.published).toISOString(),
		author: { '@type': 'Organization', name: opts.author, url: abs(path('about', opts.lang)) },
		publisher: { '@id': ORG_ID },
		image: abs(opts.image),
		wordCount: opts.wordCount,
		isPartOf: { '@id': WEBSITE_ID },
	};
}

/** Drops undefined and empty values so the output stays clean. */
function clean(v: unknown): unknown {
	if (Array.isArray(v)) {
		const a = v.map(clean).filter((x) => x !== undefined);
		return a.length ? a : undefined;
	}
	if (v && typeof v === 'object') {
		const o = Object.fromEntries(
			Object.entries(v)
				.map(([k, x]) => [k, clean(x)])
				.filter(([, x]) => x !== undefined),
		);
		return Object.keys(o).length ? o : undefined;
	}
	return v;
}

export const graph = (nodes: Node[]) =>
	JSON.stringify({ '@context': 'https://schema.org', '@graph': clean(nodes) }).replace(/</g, '\\u003c');
