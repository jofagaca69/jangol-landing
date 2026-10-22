import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { fighters, type FighterId } from '../data/products';
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
const productColor: Record<FighterId, string> = { gyms: 'burdeos', schools: 'petroleo', custom: 'tinta' };
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
	// Leave room for the fixed nav.
	if (lenis) lenis.scrollTo(target, { duration: 1.3, offset: target === 0 ? 0 : -80 });
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
	}

	function confirm() {
		if (busy) return;
		const id = active;
		const href = fighters.find((f) => f.id === id)!.href;
		if (reduceMotion) {
			window.location.href = href;
			return;
		}
		busy = true;
		const circles = circlesOf(byId(id));
		const home = sprites[id];
		// The flash fills the screen with the product colour, which is the colour its page opens with.
		gsap
			.timeline()
			.set(flash, { backgroundColor: token(productColor[id]) })
			.add(morph(circles, burst(fit(home, circles.length)), { duration: 0.7, ease: 'expo.out', stagger: { each: 0.001, from: 'center' } }), 0)
			.to(flash, { opacity: 1, duration: 0.35, ease: 'power2.in' }, 0.15)
			.call(() => (window.location.href = href), [], 0.55);
	}

	// Coming back with the browser's back button restores the page from cache mid-flash.
	window.addEventListener('pageshow', (e) => {
		if (!e.persisted) return;
		busy = false;
		gsap.set(flash, { opacity: 0 });
		panels.forEach((f) => {
			const c = circlesOf(f);
			const s = fit(sprites[f.dataset.id as FighterId], c.length);
			gsap.set(c, { attr: { cx: (i: number) => s[i].x, cy: (i: number) => s[i].y, r: (i: number) => s[i].r } });
		});
	});

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

/* ---------- Nav ---------- */
function initNav() {
	const nav = $('[data-nav]');
	if (!nav) return;
	const toggle = $<HTMLButtonElement>('[data-nav-toggle]', nav)!;
	const sheet = $('[data-nav-sheet]', nav)!;

	// Over the home hero the bar stays transparent; elsewhere it turns solid as soon as the page moves.
	const threshold = () => (nav.hasAttribute('data-home') ? window.innerHeight - 80 : 24);
	const update = () => nav.toggleAttribute('data-solid', window.scrollY > threshold());
	update();
	window.addEventListener('scroll', update, { passive: true });

	const setOpen = (open: boolean) => {
		toggle.setAttribute('aria-expanded', String(open));
		sheet.hidden = !open;
		document.documentElement.style.overflow = open ? 'hidden' : '';
		if (open) lenis?.stop();
		else lenis?.start();
	};
	toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && !sheet.hidden) {
			setOpen(false);
			toggle.focus();
		}
	});
	narrow.addEventListener('change', (e) => !e.matches && setOpen(false));
}

/* ---------- Product pages: mockups and module index ---------- */
function initMockups() {
	const mocks = $$('[data-mock]');
	if (!mocks.length) return;
	if (reduceMotion || !('IntersectionObserver' in window)) {
		mocks.forEach((m) => m.setAttribute('data-live', ''));
		return;
	}
	const io = new IntersectionObserver(
		(entries) =>
			entries.forEach((e) => {
				if (!e.isIntersecting) return;
				e.target.setAttribute('data-live', '');
				io.unobserve(e.target);
			}),
		{ threshold: 0.35 },
	);
	mocks.forEach((m) => io.observe(m));
}

function initModuleSpy() {
	const links = $$('[data-spy-link]');
	if (!links.length) return;
	const modules = $$('[data-module]');
	const mark = (id: string) =>
		links.forEach((l) => l.setAttribute('aria-current', String(l.dataset.spyLink === id)));

	// The active module is the last one whose top has passed the upper third of the viewport.
	const update = () => {
		const line = window.innerHeight * 0.35;
		let current = modules[0];
		for (const m of modules) if (m.getBoundingClientRect().top <= line) current = m;
		mark(current.id);
	};
	update();
	window.addEventListener('scroll', update, { passive: true });
}

/* ---------- Contact ---------- */
function initContact() {
	const form = $<HTMLFormElement>('[data-contact]');
	if (!form) return;
	const interest = $<HTMLSelectElement>('[data-interest]', form)!;
	const status = $('[data-contact-status]', form)!;

	// Links across the site pass the product as ?interes=gyms|schools|custom.
	const preset = new URLSearchParams(window.location.search).get('interes');
	if (preset && [...interest.options].some((o) => o.value === preset)) interest.value = preset;

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const data = new FormData(form);
		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const company = String(data.get('company') ?? '').trim();
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
		const body = [
			`Nombre: ${name}`,
			`Correo: ${email}`,
			...(company ? [`Empresa: ${company}`] : []),
			`Interés: ${topic}`,
			'',
			String(data.get('message') ?? ''),
		].join('\n');
		const to = form.dataset.email!;
		window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		status.textContent = `Abrimos tu correo con el mensaje listo. Si no se abrió, escríbenos a ${to}.`;
	});
}

initSmoothScroll();
initAnchors();
initNav();
initCharacterSelect();
initMockups();
initModuleSpy();
initContact();
