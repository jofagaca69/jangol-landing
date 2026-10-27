/* Home only: smooth scroll and the character-select hero. Loaded by the layout when `motion` is set. */
import gsap from 'gsap';
import Lenis from 'lenis';
import type { FighterId } from '../data/products';
import { CAP, CODE, DUMBBELL, MEGAPHONE, MONOGRAM, burst, fit, parseSprite, type Dot } from '../lib/dots';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const narrow = window.matchMedia('(max-width: 767px)');

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
	Array.from(root.querySelectorAll<T>(sel));
const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(`--color-${name}`).trim();

const monogram = parseSprite(MONOGRAM);
const sprites: Record<FighterId, Dot[]> = {
	gyms: parseSprite(DUMBBELL),
	schools: parseSprite(CAP),
	marketing: parseSprite(MEGAPHONE),
	custom: parseSprite(CODE),
};
const productColor: Record<FighterId, string> = { gyms: 'burdeos', schools: 'petroleo', marketing: 'tinta-soft', custom: 'tinta' };

/* ---------- Dots ---------- */
function morph(circles: SVGCircleElement[], target: Dot[], vars: gsap.TweenVars = {}) {
	const t = fit(target, circles.length);
	const attr = { cx: (i: number) => t[i].x, cy: (i: number) => t[i].y, r: (i: number) => t[i].r };
	if (reduceMotion) return gsap.set(circles, { attr });
	return gsap.to(circles, {
		attr,
		duration: 0.9,
		ease: 'expo.inOut',
		stagger: { each: 0.0025, from: 'random' },
		...vars,
	});
}

/* ---------- Smooth scroll ---------- */
function initSmoothScroll() {
	if (reduceMotion) return;
	const lenis = new Lenis({ lerp: 0.09 });
	gsap.ticker.add((time) => lenis.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);
	// Leave room for the fixed nav.
	window.jangolScroll = (target) => lenis.scrollTo(target, { duration: 1.3, offset: target === 0 ? 0 : -80 });
	window.addEventListener('jangol:menu', (e) => ((e as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start()));
}

/* ---------- Character select (hero) ---------- */
function initCharacterSelect() {
	const root = $('[data-select]');
	if (!root) return;

	const panels = $$('[data-fighter]', root);
	const byId = (id: string) => panels.find((f) => f.dataset.id === id)!;
	const circlesOf = (f: HTMLElement) => $$<SVGCircleElement>('[data-dots] circle', f);
	const confirmBtn = $<HTMLAnchorElement>('[data-confirm]', root)!;
	const confirmName = $('[data-confirm-name]', root)!;
	const flash = $('[data-flash]', root)!;
	// Stacked on a phone, a growing panel would push the others around; colour and the cursor mark it instead.
	const grow = (on: boolean) => (on && !narrow.matches ? 1.6 : 1);

	let active = (panels.find((f) => f.getAttribute('aria-current') === 'true')?.dataset.id ?? 'gyms') as FighterId;
	let busy = false;
	// While the entrance plays, hovering only remembers the panel: animating the dots then
	// would kill the entrance tweens halfway and leave a panel stuck as a J or a half-built icon.
	let introPlaying = false;
	let pending: FighterId | null = null;

	/** Puts every panel's dots exactly on its icon. */
	const settle = () =>
		panels.forEach((f) => {
			const c = circlesOf(f);
			const s = fit(sprites[f.dataset.id as FighterId], c.length);
			gsap.set(c, { attr: { cx: (i: number) => s[i].x, cy: (i: number) => s[i].y, r: (i: number) => s[i].r } });
		});

	function activate(id: FighterId, animate = true) {
		const changed = id !== active;
		active = id;
		const panel = byId(id);
		confirmName.textContent = panel.dataset.fullName ?? '';
		confirmBtn.href = panel.dataset.href ?? confirmBtn.href;

		panels.forEach((f) => {
			const on = f.dataset.id === id;
			const pick = $<HTMLButtonElement>('[data-pick]', f)!;
			f.setAttribute('aria-current', String(on));
			pick.setAttribute('aria-checked', String(on));
			pick.tabIndex = on ? 0 : -1;

			const d = animate && !reduceMotion ? 0.75 : 0;
			// Panels only grow side by side; see `grow`.
			gsap.to(f, { flexGrow: grow(on), duration: d, ease: 'expo.out' });
			gsap.to($('[data-portrait]', f), { scale: on ? 1 : 0.88, duration: d, ease: 'expo.out' });

			const cursor = $('[data-cursor]', f)!;
			const moves = $$('[data-moves] li', f);
			if (on) {
				gsap.fromTo(cursor, { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: d * 0.6, ease: 'back.out(3)' });
				gsap.set($('[data-moves]', f), { visibility: 'visible' });
				if (d) gsap.fromTo(moves, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, delay: 0.15 });
			} else {
				gsap.to(cursor, { opacity: 0, duration: d * 0.3 });
				gsap.set($('[data-moves]', f), { visibility: 'hidden' });
			}
		});

		// The chosen panel "powers up": its dots swell outward from the centre.
		if (animate && changed && !reduceMotion && !introPlaying) {
			const c = circlesOf(panel);
			const base = fit(sprites[id], c.length);
			gsap.fromTo(
				c,
				{ attr: { r: (i: number) => base[i].r } },
				{
					attr: { r: (i: number) => base[i].r * 1.35 },
					// Only replaces an earlier power-up's radius; positions are never touched.
					overwrite: 'auto',
					duration: 0.16,
					ease: 'power2.out',
					yoyo: true,
					repeat: 1,
					stagger: { each: 0.003, from: 'center' },
				},
			);
		}
	}

	function confirm() {
		if (busy) return;
		const id = active;
		const href = byId(id).dataset.href!;
		if (reduceMotion) {
			window.location.href = href;
			return;
		}
		busy = true;
		const circles = circlesOf(byId(id));
		// The flash fills the screen with the product colour, which is the colour its page opens with.
		gsap
			.timeline()
			.set(flash, { backgroundColor: token(productColor[id]) })
			.add(morph(circles, burst(fit(sprites[id], circles.length)), { duration: 0.7, ease: 'expo.out', stagger: { each: 0.001, from: 'center' } }), 0)
			.to(flash, { opacity: 1, duration: 0.35, ease: 'power2.in' }, 0.15)
			.call(() => (window.location.href = href), [], 0.55);
	}

	// Coming back with the browser's back button restores the page from cache mid-flash.
	window.addEventListener('pageshow', (e) => {
		if (!e.persisted) return;
		busy = false;
		gsap.set(flash, { opacity: 0 });
		settle();
	});

	panels.forEach((f) => {
		const id = f.dataset.id as FighterId;
		const pick = $<HTMLButtonElement>('[data-pick]', f)!;
		if (finePointer)
			f.addEventListener('pointerenter', () => {
				if (busy) return;
				if (introPlaying) pending = id;
				else activate(id);
			});
		pick.addEventListener('click', () => (id === active ? confirm() : activate(id)));
	});
	confirmBtn.addEventListener('click', (e) => {
		e.preventDefault();
		confirm();
	});

	const order = panels.map((f) => f.dataset.id as FighterId);
	const step = (dir: number) => {
		if (busy) return active;
		const next = order[(order.indexOf(active) + dir + order.length) % order.length];
		activate(next);
		return next;
	};
	root.addEventListener('keydown', (e) => {
		const keys: Record<string, number> = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 };
		const target = e.target as HTMLElement;
		if (!(e.key in keys) || !target.matches('[data-pick]')) return;
		e.preventDefault();
		$<HTMLButtonElement>('[data-pick]', byId(step(keys[e.key])))!.focus();
	});
	// Arrow keys also work without focusing the hero, while it is on screen.
	window.addEventListener('keydown', (e) => {
		if (e.defaultPrevented || window.scrollY > window.innerHeight * 0.5) return;
		if ((e.target as HTMLElement).closest('input, textarea, select, [data-select]')) return;
		if (e.key === 'ArrowLeft') step(-1);
		if (e.key === 'ArrowRight') step(1);
	});

	// Panel widths are final from the first frame, so the entrance never shifts the layout.
	activate(active, false);
	if (!reduceMotion) intro();

	/* The entrance plays on the dots only: every panel shows the Jangol J, then its
	 * modules rearrange into each option. Names and taglines stay visible throughout,
	 * so the largest text on the page paints as soon as the HTML does. */
	function intro() {
		const cursors = $$('[data-cursor]', root!);
		gsap.set(cursors, { opacity: 0 });
		gsap.set($$('[data-moves]', root!), { visibility: 'hidden' });
		panels.forEach((f) => {
			const c = circlesOf(f);
			const j = fit(monogram, c.length);
			gsap.set(c, { attr: { cx: (i: number) => j[i].x, cy: (i: number) => j[i].y, r: 0 } });
		});

		introPlaying = true;
		const tl = gsap.timeline({
			defaults: { ease: 'expo.out' },
			onComplete: () => {
				introPlaying = false;
				settle();
				if (pending) activate(pending);
				pending = null;
			},
		});
		panels.forEach((f) => {
			const c = circlesOf(f);
			const j = fit(monogram, c.length);
			tl.to(c, { attr: { r: (i: number) => j[i].r }, duration: 0.5, ease: 'back.out(2)', stagger: { each: 0.004, from: 'end' } }, 0.1);
			tl.add(morph(c, sprites[f.dataset.id as FighterId], { duration: 1 }), 0.9);
		});
		// The cursor shows up while the last dots are still settling.
		tl.add(() => {
			activate(pending ?? active);
			pending = null;
		}, 1.6);

		// Any interaction skips straight to the selection screen.
		const skip = () => tl.progress() < 1 && tl.progress(1);
		['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((ev) => window.addEventListener(ev, skip, { once: true, passive: true }));
	}
}

initSmoothScroll();
initCharacterSelect();
