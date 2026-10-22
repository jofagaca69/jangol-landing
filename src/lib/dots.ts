/*
 * Dot-matrix sprites. Every figure on the page is drawn with the same module
 * as the Jangol monogram (Ícono 02, trama modular): identical dots on a grid,
 * with smaller dots used for shading and for the open tail of the J.
 *
 * Sprite legend:  O full dot · o 80% · : 60% · . 40% · space empty
 */

export interface Dot {
	x: number;
	y: number;
	r: number;
}

/** Side of the square viewBox every sprite is centred in, in grid units. */
export const GRID = 20;
const BASE_R = 0.42;
const SIZES: Record<string, number> = { O: 1, o: 0.8, ':': 0.6, '.': 0.4 };

export const MONOGRAM = [
	'       OOoo:.',
	'     OOOOOo::',
	'     OOOOOo:',
	'     OOOO',
	'     OOOO',
	'     OOOO',
	'     OOOO',
	'     OOOO',
	'     OOOO',
	'OOO  OOOO',
	'OOO  OOOO',
	'OOOOOOOOO',
	' OOOOOOO',
	'  OOOOO',
];

/** Kettlebell, shaded with smaller dots on its right flank. */
export const KETTLEBELL = [
	'      OOOOOO',
	'    OOOOOOOOoo',
	'   OOO      Ooo',
	'   OO        oo',
	'   OO        o:',
	'   OOO      Oo:',
	'   OOOOOOOOOOo:',
	'  OOOOOOOOOOOoo:',
	' OOOOOOOOOOOOOo::',
	'OOOOOOOOOOOOOOoo:.',
	'OOOOOOOOOOOOOOoo:.',
	'OOOOOOOOOOOOOOoo:.',
	'OOOOOOOOOOOOOOoo:.',
	'OOOOOOOOOOOOOOo::.',
	' OOOOOOOOOOOOOo::',
	'  OOOOOOOOOOOo::',
	'   OOOOOOOOOo:',
	'     OOOOOOo',
];

/** Graduation cap with its tassel, shaded underneath the board. */
export const CAP = [
	'         OO',
	'       OOOOOO',
	'     OOOOOOOOOO',
	'   OOOOOOOOOOOOOO',
	' OOOOOOOOOOOOOOOOOO',
	'OOOOOOOOOOOOOOOOOOOO',
	' ooOOOOOOOOOOOOOOoo:',
	'   ::oooooooooo::  :',
	'    OOOOOOOOOOOO   :',
	'    OOOOOOOOOOOO   :',
	'    OOOOOOOOOOOO  OOO',
	'    oOOOOOOOOOOo  OOO',
	'     ::oooooo::    O',
];

/** Code brackets "</>", for custom software. */
export const CODE = [
	'           OOo',
	'           OOo',
	'           OOo',
	'          OOo',
	'   OOo    OOo OOo',
	'  OOo     OOo  OOo',
	' OOo     OOo    OOo',
	'OOo      OOo     OOo',
	' OOo     OOo    OOo',
	'  OOo   OOo    OOo',
	'   OOo  OOo   OOo',
	'        OOo',
	'       OOo',
	'       OOo',
	'       OOo',
];

/** Converts a sprite into dots centred in the GRID×GRID viewBox. */
export function parseSprite(rows: string[]): Dot[] {
	const width = Math.max(...rows.map((r) => r.length));
	const ox = (GRID - width) / 2 + 0.5;
	const oy = (GRID - rows.length) / 2 + 0.5;
	const dots: Dot[] = [];
	rows.forEach((row, y) => {
		[...row].forEach((ch, x) => {
			const size = SIZES[ch];
			if (size) dots.push({ x: ox + x, y: oy + y, r: BASE_R * size });
		});
	});
	return dots;
}

/**
 * Pads a target so it has exactly `count` dots. Extra nodes collapse to
 * radius 0 on top of a real dot, so they vanish into the figure.
 */
export function fit(target: Dot[], count: number): Dot[] {
	const out = target.slice(0, count);
	for (let i = out.length; i < count; i++) {
		const host = target[(i * 7) % target.length];
		out.push({ x: host.x, y: host.y, r: 0 });
	}
	return out;
}

/** Dots blown outward from the centre, used when a fighter is chosen. */
export function burst(from: Dot[], strength = 14): Dot[] {
	const c = GRID / 2;
	return from.map((d, i) => {
		const angle = Math.atan2(d.y - c, d.x - c) + Math.sin(i * 12.9898) * 0.6;
		const dist = strength * (0.6 + ((i * 0.618) % 1) * 0.8);
		return { x: c + Math.cos(angle) * dist, y: c + Math.sin(angle) * dist, r: 0 };
	});
}

/** Renders `count` circles placed on `dots` as SVG markup (for SSR). */
export function circles(dots: Dot[], count = dots.length): string {
	return fit(dots, count)
		.map((d) => `<circle cx="${d.x.toFixed(2)}" cy="${d.y.toFixed(2)}" r="${d.r.toFixed(3)}"/>`)
		.join('');
}

/** Monogram with only the first `share` of its dots filled, top to bottom. */
export function partialMonogram(share: number): { on: Dot[]; off: Dot[] } {
	const dots = parseSprite(MONOGRAM);
	const cut = Math.round(dots.length * share);
	// Build from the foot of the J upward, so step one is the base.
	const ordered = [...dots].sort((a, b) => b.y - a.y || a.x - b.x);
	return { on: ordered.slice(0, cut), off: ordered.slice(cut) };
}
