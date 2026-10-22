import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { fighters, type FighterId, type ProductId } from '../data/products';
import { MONOGRAM, burst, fit, parseSprite, type Dot } from '../lib/dots';

gsap.registerPlugin(SplitText);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const narrow = window.matchMedia('(max-width: 767px)');

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
	root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
	Array.from(root.querySelectorAll<T>(sel));
const token = (name: string) =>
	getComputedStyle(document.documentElement).getPropertyValue(`--color-${name}`).trim();

const monogram = parseSprite(MONOGRAM);
const sprites = Object.fromEntries(fighters.map((f) => [f.id, parseSprite(f.sprite)])) as Record<
	FighterId,
	Dot[]
>;
const productColor: Record<FighterId, string> = { gyms: 'burdeos', schools: 'petroleo', custom: 'burdeos' };
const productName = (id: string) => fighters.find((f) => f.id === id)?.name ?? '';

let lenis: Lenis | null = null;

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
	lenis = new Lenis({ lerp: 0.09 });
	gsap.ticker.add((time) => lenis?.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);
}

function scrollToEl(target: HTMLElement | 0) {
	if (lenis) lenis.scrollTo(target, { duration: 1.3 });
	else if (target === 0) window.scrollTo({ top: 0 });
	else target.scrollIntoView();
}

function initAnchors() {
	$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
		a.addEventListener('click', (e) => {
			const id = a.getAttribute('href')!;
			const target = id === '#top' ? 0 : $(id);
			if (id === '#' || target === null) return;
			e.preventDefault();
			scrollToEl(target);
		});
	});
}

/* ---------- Shared product state ---------- */
type SelectDetail = { id: FighterId; from: 'hero' | 'tabs' | 'demo' };
const emit = (detail: SelectDetail) =>
	document.dispatchEvent(new CustomEvent<SelectDetail>('jangol:select', { detail }));
const onSelect = (fn: (d: SelectDetail) => void) =>
	document.addEventListener('jangol:select', (e) => fn((e as CustomEvent<SelectDetail>).detail));

/* ---------- Character select (hero) ---------- */
function initCharacterSelect() {
	const root = $('[data-select]');
	if (!root) return;

	const panels = $$('[data-fighter]', root);
	const byId = (id: string) => panels.find((f) => f.dataset.id === id)!;
	const circlesOf = (f: HTMLElement) => $$<SVGCircleElement>('[data-dots] circle', f);
	const confirmBtn = $<HTMLButtonElement>('[data-confirm]', root)!;
	const confirmName = $('[data-confirm-name]', root)!;
	const flash = $('[data-flash]', root)!;

	let active = (panels.find((f) => f.getAttribute('aria-current') === 'true')?.dataset.id ??
		'gyms') as FighterId;
	let busy = false;

	function activate(id: FighterId, animate = true) {
		const changed = id !== active;
		active = id;
		confirmName.textContent = productName(id);

		panels.forEach((f) => {
			const on = f.dataset.id === id;
			const pick = $<HTMLButtonElement>('[data-pick]', f)!;
			f.setAttribute('aria-current', String(on));
			pick.setAttribute('aria-checked', String(on));
			pick.tabIndex = on ? 0 : -1;

			const d = animate && !reduceMotion ? 0.75 : 0;
			// Three stacked panels on a phone leave little room to grow.
			gsap.to(f, { flexGrow: on ? (narrow.matches ? 1.15 : 1.6) : 1, duration: d, ease: 'expo.out' });
			gsap.to($('[data-portrait]', f), { scale: on ? 1 : 0.8, duration: d, ease: 'expo.out' });

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

		// The chosen fighter "powers up": its dots swell outward from the centre.
		if (animate && changed && !reduceMotion) {
			const c = circlesOf(byId(id));
			const base = fit(sprites[id], c.length);
			gsap.fromTo(c, { attr: { r: (i: number) => base[i].r } }, {
				attr: { r: (i: number) => base[i].r * 1.35 },
				overwrite: true,
				duration: 0.16,
				ease: 'power2.out',
				yoyo: true,
				repeat: 1,
				stagger: { each: 0.003, from: 'center' },
			});
		}
		if (changed) emit({ id, from: 'hero' });
	}

	function confirm() {
		if (busy) return;
		const id = active;
		// Custom software has its own section; the platforms share the tabs.
		const section = $(id === 'custom' ? '#a-medida' : '#productos');
		emit({ id, from: 'hero' });
		if (reduceMotion || !section) {
			if (section) scrollToEl(section);
			return;
		}
		busy = true;
		const circles = circlesOf(byId(id));
		const home = sprites[id];
		gsap
			.timeline({ onComplete: () => (busy = false) })
			.set(flash, { backgroundColor: token(productColor[id]) })
			.to(flash, { opacity: 0.85, duration: 0.12, ease: 'power2.out' })
			.to(flash, { opacity: 0, duration: 0.5, ease: 'power2.in' })
			.add(morph(circles, burst(fit(home, circles.length)), { duration: 0.7, ease: 'expo.out', stagger: { each: 0.001, from: 'center' } }), 0)
			.call(() => scrollToEl(section), [], 0.3)
			.add(morph(circles, home, { duration: 0.01, stagger: 0 }), 1.6);
	}

	panels.forEach((f) => {
		const id = f.dataset.id as FighterId;
		const pick = $<HTMLButtonElement>('[data-pick]', f)!;
		if (finePointer) f.addEventListener('pointerenter', () => !busy && activate(id));
		pick.addEventListener('click', () => (id === active ? confirm() : activate(id)));
	});
	confirmBtn.addEventListener('click', confirm);

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

	activate(active, false);
	if (!reduceMotion) intro();

	/* One orchestrated entrance: every panel shows the Jangol J, then its
	 * modules rearrange into each option. */
	function intro() {
		const names = $$('[data-name]', root!);
		const split = new SplitText(names, { type: 'chars', mask: 'chars' });
		const [left, ...rest] = panels;
		const right = rest.pop()!;

		gsap.set(panels, { flexGrow: 1 });
		gsap.set($('[data-cursor]', root!), { opacity: 0 });
		gsap.set($('[data-moves]', root!), { visibility: 'hidden' });
		panels.forEach((f) => {
			const c = circlesOf(f);
			const j = fit(monogram, c.length);
			gsap.set(c, { attr: { cx: (i: number) => j[i].x, cy: (i: number) => j[i].y, r: 0 } });
		});

		// Revert once done: the char masks would clip descenders like the "y" in Gyms.
		const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => split.revert() });
		tl.from(left, { xPercent: -100, duration: 1 }, 0)
			.from(right, { xPercent: 100, duration: 1 }, 0)
			.from(rest, { yPercent: 100, duration: 1 }, 0.1)
			.from('[data-select-title]', { opacity: 0, y: -12, duration: 0.6 }, 0.4);
		panels.forEach((f) => {
			const c = circlesOf(f);
			const j = fit(monogram, c.length);
			tl.to(c, { attr: { r: (i: number) => j[i].r }, duration: 0.5, ease: 'back.out(2)', stagger: { each: 0.004, from: 'end' } }, 0.45);
			tl.add(morph(c, sprites[f.dataset.id as FighterId], { duration: 1 }), 1.55);
		});
		tl.from(split.chars, { yPercent: 110, duration: 0.8, stagger: 0.035 }, 1.7)
			.from($$('[data-tagline]', root!), { opacity: 0, duration: 0.6 }, 2.1)
			.add(() => activate(active), 2.25);

		// Any interaction skips straight to the selection screen.
		const skip = () => tl.progress() < 1 && tl.progress(1);
		['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((ev) =>
			window.addEventListener(ev, skip, { once: true, passive: true }),
		);
	}
}

/* ---------- Product tabs ---------- */
function initProducts() {
	const root = $('[data-products]');
	if (!root) return;
	const tabs = $$<HTMLButtonElement>('[data-tab]', root);
	const showcase = $('[data-showcase]', root)!;
	const dots = $$<SVGCircleElement>('[data-showcase-dots] circle', root);
	let current = tabs.find((t) => t.getAttribute('aria-selected') === 'true')!.dataset.tab as ProductId;

	function setTab(id: ProductId, animate = true) {
		if (id === current) return;
		current = id;
		tabs.forEach((t) => {
			const on = t.dataset.tab === id;
			t.setAttribute('aria-selected', String(on));
			t.tabIndex = on ? 0 : -1;
		});
		$$('[data-panel]', root!).forEach((p) => (p.hidden = p.dataset.panel !== id));
		const panel = $(`[data-panel="${id}"]`, root!)!;
		const d = animate && !reduceMotion ? 0.7 : 0;
		gsap.to(showcase, { backgroundColor: token(productColor[id]), duration: d, ease: 'power2.inOut' });
		gsap.to(showcase, { color: token(id === 'gyms' ? 'crema' : 'agua'), duration: d });
		morph(dots, sprites[id]);
		if (d) gsap.from(panel.children, { opacity: 0, y: 14, duration: 0.5, stagger: 0.06, ease: 'power3.out' });
	}

	tabs.forEach((t, i) => {
		t.addEventListener('click', () => {
			setTab(t.dataset.tab as ProductId);
			emit({ id: current, from: 'tabs' });
		});
		t.addEventListener('keydown', (e) => {
			const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
			if (!dir) return;
			e.preventDefault();
			const next = tabs[(i + dir + tabs.length) % tabs.length];
			next.focus();
			next.click();
		});
	});
	onSelect(({ id, from }) => {
		if (from !== 'tabs' && id !== 'custom') setTab(id);
	});
}

/* ---------- Contact ---------- */
function initContact() {
	const form = $<HTMLFormElement>('[data-contact]');
	if (!form) return;
	const interest = $<HTMLSelectElement>('[data-interest]', form)!;
	const status = $('[data-contact-status]', form)!;

	onSelect(({ id }) => (interest.value = id));
	$$<HTMLAnchorElement>('[data-demo]').forEach((a) =>
		a.addEventListener('click', () => emit({ id: a.dataset.demo as SelectDetail['id'], from: 'demo' })),
	);

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const data = new FormData(form);
		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const emailField = form.elements.namedItem('email') as HTMLInputElement;

		if (!name) {
			status.textContent = 'Escribe tu nombre para que sepamos a quién responder.';
			(form.elements.namedItem('name') as HTMLInputElement).focus();
			return;
		}
		if (!email || !emailField.checkValidity()) {
			status.textContent = 'Escribe un correo válido, por ejemplo nombre@empresa.com.';
			emailField.focus();
			return;
		}

		const topic = interest.selectedOptions[0].textContent ?? '';
		const subject = `${topic}: ${name}`;
		const body = [`Nombre: ${name}`, `Correo: ${email}`, `Interés: ${topic}`, '', String(data.get('message') ?? '')].join('\n');
		const to = form.dataset.email!;
		window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		status.textContent = `Abrimos tu correo con el mensaje listo. Si no se abrió, escríbenos a ${to}.`;
	});
}

initSmoothScroll();
initAnchors();
initCharacterSelect();
initProducts();
initContact();
