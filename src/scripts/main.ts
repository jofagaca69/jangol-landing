/* Runs on every page. Kept free of GSAP and Lenis so articles and legal pages stay light;
 * the home hero loads its animation bundle from motion.ts. */

declare global {
	interface Window {
		/** Set by motion.ts when smooth scrolling is active. */
		jangolScroll?: (target: HTMLElement | 0) => void;
	}
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const narrow = window.matchMedia('(max-width: 767px)');

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
	Array.from(root.querySelectorAll<T>(sel));

function scrollToEl(target: HTMLElement | 0) {
	if (window.jangolScroll) return window.jangolScroll(target);
	const behavior = reduceMotion ? 'auto' : 'smooth';
	if (target === 0) window.scrollTo({ top: 0, behavior });
	else target.scrollIntoView({ behavior });
}

function initAnchors() {
	$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
		a.addEventListener('click', (e) => {
			const id = a.getAttribute('href')!;
			const target = id === '#top' ? 0 : $(id);
			if (id === '#' || target === null) return;
			e.preventDefault();
			scrollToEl(target);
			history.replaceState(null, '', id);
		});
	});
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
		window.dispatchEvent(new CustomEvent('jangol:menu', { detail: open }));
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
	const mark = (id: string) => links.forEach((l) => l.setAttribute('aria-current', String(l.dataset.spyLink === id)));

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
	const msg = form.dataset;
	const interest = $<HTMLSelectElement>('[data-interest]', form)!;
	const status = $('[data-contact-status]', form)!;
	const submit = $<HTMLButtonElement>('[data-contact-submit]', form)!;
	const field = <T extends HTMLElement>(name: string) => form.elements.namedItem(name) as unknown as T;

	// Links across the site pass the product as ?interes=gyms|schools|custom.
	const preset = new URLSearchParams(window.location.search).get('interes');
	if (preset && [...interest.options].some((o) => o.value === preset)) interest.value = preset;

	const fail = (el: HTMLInputElement, text: string) => {
		el.setAttribute('aria-invalid', 'true');
		status.textContent = text;
		el.focus();
	};

	form.addEventListener('input', (e) => (e.target as HTMLElement).removeAttribute('aria-invalid'));

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const name = field<HTMLInputElement>('name');
		const email = field<HTMLInputElement>('email');
		const consent = field<HTMLInputElement>('consent');
		if (!name.value.trim()) return fail(name, msg.msgName!);
		if (!email.value.trim() || !email.checkValidity()) return fail(email, msg.msgEmail!);
		if (!consent.checked) return fail(consent, msg.msgConsent!);

		const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
		data.interest = interest.selectedOptions[0].textContent ?? data.interest;

		// Until the Web3Forms key is configured, fall back to the visitor's mail app.
		if (data.access_key.startsWith('[')) {
			const body = Object.entries({ Nombre: data.name, Correo: data.email, Empresa: data.company, Interés: data.interest, Mensaje: data.message })
				.filter(([, v]) => v)
				.map(([k, v]) => `${k}: ${v}`)
				.join('\n');
			window.location.href = `mailto:${msg.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
			return;
		}

		submit.disabled = true;
		status.textContent = msg.msgSending!;
		try {
			const res = await fetch(form.action, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify(data),
			});
			const json = (await res.json().catch(() => ({}))) as { success?: boolean };
			if (!res.ok || json.success === false) throw new Error(String(res.status));
			form.reset();
			status.textContent = msg.msgOk!;
		} catch {
			status.textContent = msg.msgFail!;
		} finally {
			submit.disabled = false;
		}
	});
}

initAnchors();
initNav();
initMockups();
initModuleSpy();
initContact();

export {};
