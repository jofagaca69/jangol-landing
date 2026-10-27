// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { alternatesFor, htmlLang, routes, site } from './src/i18n/routes';

/** Date of the last content review for pages that are not articles. Bump it when page copy changes. */
const PAGES_UPDATED = '2026-10-27';

/** Article URL → last modified date, read from each article's frontmatter. */
const articleDates = new Map();
for (const lang of /** @type {const} */ (['es', 'en'])) {
	const dir = `./src/content/recursos/${lang}`;
	for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
		const fm = readFileSync(`${dir}/${file}`, 'utf8').split('---')[1] ?? '';
		const date = fm.match(/^updated:\s*(\S+)/m)?.[1] ?? fm.match(/^date:\s*(\S+)/m)?.[1];
		if (date) articleDates.set(`${routes.resources[lang]}${file.replace(/\.md$/, '')}/`, date);
	}
}

// https://astro.build/config
export default defineConfig({
	site,
	trailingSlash: 'always',
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: { prefixDefaultLocale: false },
	},
	integrations: [
		sitemap({
			filter: (page) => !/\/404\/?$/.test(new URL(page).pathname),
			serialize(item) {
				const { pathname } = new URL(item.url);
				item.lastmod = articleDates.get(pathname) ?? PAGES_UPDATED;
				const alt = alternatesFor(pathname);
				if (alt) {
					item.links = [
						{ lang: htmlLang.es, url: new URL(alt.es, site).href },
						{ lang: htmlLang.en, url: new URL(alt.en, site).href },
						{ lang: 'x-default', url: new URL(alt.es, site).href },
					];
				}
				return item;
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
