/**
 * Social preview images (1200×630), rendered at build time with satori and sharp.
 * Text is converted to paths by satori, so the output does not depend on system fonts.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { getCollection } from 'astro:content';
import { products } from '../data/products';
import { meta } from '../i18n/meta';
import { langs, path, routes, type Lang, type RouteKey } from '../i18n/routes';
import { t } from '../i18n/ui';
import { MONOGRAM, circles, parseSprite } from './dots';

export interface OgPage {
	slug: string;
	heading: string;
	label: string;
	theme: 'gyms' | 'schools' | 'marketing' | 'custom';
	lang: Lang;
}

/** URL of the preview image for a page path: "/en/gyms/" → "/og/en/gyms.png", "/" → "/og/home.png". */
export const ogImagePath = (pathname: string) => `/og/${pathname.replace(/^\/|\/$/g, '') || 'home'}.png`;

const slugOf = (pathname: string) => ogImagePath(pathname).slice(4, -4);

export async function ogPages(): Promise<OgPage[]> {
	const pages: OgPage[] = [];
	for (const lang of langs) {
		for (const key of Object.keys(routes) as RouteKey[]) {
			const product = key === 'gyms' || key === 'schools' ? products[lang].find((p) => p.id === key) : undefined;
			pages.push({
				slug: slugOf(path(key, lang)),
				heading: product ? product.heading : meta[lang][key as Exclude<RouteKey, 'gyms' | 'schools'>].ogHeading,
				label: product ? product.name : 'Jangol',
				theme: product ? product.id : key === 'marketing' ? 'marketing' : 'custom',
				lang,
			});
		}
	}
	const articles = await getCollection('recursos', ({ data }) => !data.draft);
	for (const a of articles) {
		const lang = a.data.lang;
		pages.push({
			slug: slugOf(`${path('resources', lang)}${a.id.split('/').pop()}/`),
			heading: a.data.title,
			label: t(lang).topics[a.data.topic],
			theme: a.data.topic,
			lang,
		});
	}
	return pages;
}

const font = (pkg: string, file: string) => readFileSync(resolve('node_modules', pkg, 'files', file));
let fonts: { name: string; data: Buffer; weight: 400 | 500 | 700; style: 'normal' }[] | undefined;
const loadFonts = () =>
	(fonts ??= [
		{ name: 'Space Grotesk', data: font('@fontsource/space-grotesk', 'space-grotesk-latin-700-normal.woff'), weight: 700, style: 'normal' },
		{ name: 'Space Grotesk', data: font('@fontsource/space-grotesk', 'space-grotesk-latin-500-normal.woff'), weight: 500, style: 'normal' },
	]);

const palette = {
	gyms: { bg: '#751c39', ink: '#efe7db' },
	schools: { bg: '#0c3d45', ink: '#cce6e8' },
	marketing: { bg: '#2a2826', ink: '#efe7db' },
	custom: { bg: '#1a1a1a', ink: '#efe7db' },
};

const monogramSvg = (color: string) => {
	const dots = parseSprite(MONOGRAM);
	const xs = dots.map((d) => d.x);
	const ys = dots.map((d) => d.y);
	const [x0, y0] = [Math.min(...xs) - 0.5, Math.min(...ys) - 0.5];
	const vb = `${x0} ${y0} ${Math.max(...xs) - x0 + 0.5} ${Math.max(...ys) - y0 + 0.5}`;
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="${color}">${circles(dots)}</svg>`;
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

type El = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): El => ({
	type,
	props: { style, children, ...extra },
});

export async function renderOg(page: OgPage): Promise<Buffer> {
	const { bg, ink } = palette[page.theme];
	const size = page.heading.length > 48 ? 64 : page.heading.length > 30 ? 76 : 92;
	// Satori sizes boxes as content-box, so the margins come from an inset container instead of padding.
	const tree = h('div', { width: '100%', height: '100%', display: 'flex', backgroundColor: bg, color: ink, fontFamily: 'Space Grotesk' }, [
		h(
			'div',
			{ position: 'absolute', top: 64, right: 72, bottom: 64, left: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
			[
			h('div', { display: 'flex', alignItems: 'center', gap: 18 }, [
				h('img', { width: 46, height: 64 }, undefined, { src: monogramSvg(ink), width: 46, height: 64 }),
				h('div', { fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 44, letterSpacing: -1.5 }, 'Jangol'),
				page.label !== 'Jangol'
					? h('div', { marginLeft: 12, fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: 28, opacity: 0.75 }, page.label)
					: null,
			].filter(Boolean)),
			h('div', { display: 'flex', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: size, lineHeight: 1.02, letterSpacing: -2.5, maxWidth: 1000 }, page.heading),
			h('div', { display: 'flex', justifyContent: 'space-between', fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: 28, opacity: 0.8 }, [
				h('div', {}, t(page.lang).slogan),
				h('div', {}, 'jangol.com.co'),
			]),
			],
		),
	]);
	const svg = await satori(tree as never, { width: 1200, height: 630, fonts: loadFonts() });
	return sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer();
}
