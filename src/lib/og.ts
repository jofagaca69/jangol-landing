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
import { CAP, DUMBBELL, GRID, MONOGRAM, circles, parseSprite } from './dots';
import { WORDMARK, lockupHeight, logoSvg, type SubBrand } from './logo';

export interface OgPage {
	slug: string;
	heading: string;
	label: string;
	theme: 'gyms' | 'schools' | 'marketing' | 'custom';
	lang: Lang;
	/** Product pages carry their sub-brand lockup instead of the plain logo. */
	sub?: SubBrand;
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
				sub: product?.id,
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
let fonts: { name: string; data: Buffer; weight: 500 | 600; style: 'normal' }[] | undefined;
const loadFonts = () =>
	(fonts ??= [
		{ name: 'Barlow', data: font('@fontsource/barlow', 'barlow-latin-600-normal.woff'), weight: 600, style: 'normal' },
		{ name: 'Barlow', data: font('@fontsource/barlow', 'barlow-latin-500-normal.woff'), weight: 500, style: 'normal' },
	]);

const palette = {
	gyms: { bg: '#751c39', ink: '#f5f1ea' },
	schools: { bg: '#0c3d45', ink: '#cce6e8' },
	marketing: { bg: '#2a2826', ink: '#f5f1ea' },
	custom: { bg: '#1a1a1a', ink: '#f5f1ea' },
};

const monogramSvg = (color: string) => {
	const dots = parseSprite(MONOGRAM);
	const x0 = Math.min(...dots.map((d) => d.x - d.r));
	const y0 = Math.min(...dots.map((d) => d.y - d.r));
	const vb = `${x0} ${y0} ${Math.max(...dots.map((d) => d.x + d.r)) - x0} ${Math.max(...dots.map((d) => d.y + d.r)) - y0}`;
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="${color}">${circles(dots)}</svg>`;
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

const wordmarkWidth = Math.round((52 * WORDMARK.width) / WORDMARK.height);
const wordmarkSrc = (color: string, sub?: SubBrand) => `data:image/svg+xml;base64,${Buffer.from(logoSvg(color, sub)).toString('base64')}`;

/** The sector icon of a sub-brand, in the same GRID viewBox the site uses. */
const iconSrc = (color: string, sub: SubBrand) => {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${GRID} ${GRID}" fill="${color}">${circles(parseSprite(sub === 'gyms' ? DUMBBELL : CAP))}</svg>`;
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

const lockup = (ink: string, sub: SubBrand) => {
	const height = 76;
	const width = Math.round((height * WORDMARK.width) / lockupHeight(sub));
	return h('img', { width, height }, undefined, { src: wordmarkSrc(ink, sub), width, height });
};

type El = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): El => ({
	type,
	props: { style, children, ...extra },
});

export async function renderOg(page: OgPage): Promise<Buffer> {
	const { bg, ink } = palette[page.theme];
	const size = page.heading.length > 48 ? 70 : page.heading.length > 30 ? 84 : 100;
	// Satori sizes boxes as content-box, so the margins come from an inset container instead of padding.
	const tree = h('div', { width: '100%', height: '100%', display: 'flex', backgroundColor: bg, color: ink, fontFamily: 'Barlow' }, [
		page.sub ? h('img', { position: 'absolute', top: 150, right: 64, width: 330, height: 330 }, undefined, { src: iconSrc(ink, page.sub), width: 330, height: 330 }) : null,
		h(
			'div',
			{ position: 'absolute', top: 64, right: 72, bottom: 64, left: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
			[
			page.sub
				? h('div', { display: 'flex' }, [lockup(ink, page.sub)])
				: h('div', { display: 'flex', alignItems: 'center', gap: 11 }, [
				h('img', { width: 52, height: 52 }, undefined, { src: monogramSvg(ink), width: 52, height: 52 }),
				h('img', { width: wordmarkWidth, height: 52 }, undefined, { src: wordmarkSrc(ink), width: wordmarkWidth, height: 52 }),
				page.label !== 'Jangol'
					? h('div', { marginLeft: 16, fontWeight: 500, fontSize: 30, opacity: 0.75 }, page.label)
					: null,
			].filter(Boolean)),
			h('div', { display: 'flex', fontWeight: 600, fontSize: size, lineHeight: 0.98, letterSpacing: -1.2, maxWidth: page.sub ? 640 : 1000 }, page.heading),
			h('div', { display: 'flex', justifyContent: 'space-between', fontWeight: 500, fontSize: 30, opacity: 0.8 }, [
				h('div', {}, t(page.lang).slogan),
				h('div', {}, 'jangol.com.co'),
			]),
			],
		),
	].filter(Boolean));
	const svg = await satori(tree as never, { width: 1200, height: 630, fonts: loadFonts() });
	return sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer();
}
