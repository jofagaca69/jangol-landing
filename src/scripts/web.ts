/* Custom page: the website that builds itself while you scroll, and the client logo strip.
 * Loaded only by WebBuild and ClientMarquee, so GSAP stays off every other page but the home. */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
	Array.from(root.querySelectorAll<T>(sel));

/* ---------- Website build ---------- */
function initBuild() {
	const root = $('[data-build]');
	if (!root || reduceMotion) return;
	const pin = $('[data-build-pin]', root)!;
	const site = $('[data-site]', root)!;
	const rail = $('[data-rail]', root)!;
	const steps = $$('[data-step]', root);
	const STAGES = steps.length;

	root.setAttribute('data-live', '');
	const show = (stage: number) => {
		if (site.dataset.stage === String(stage)) return;
		site.dataset.stage = String(stage);
		steps.forEach((s, i) => {
			s.toggleAttribute('data-on', i < stage);
			if (i === stage - 1) s.setAttribute('aria-current', 'step');
			else s.removeAttribute('aria-current');
		});
	};
	const update = (progress: number) => {
		gsap.set(rail, { scaleY: progress });
		show(Math.min(STAGES, Math.floor(progress * STAGES) + 1));
	};
	update(0);

	const mm = gsap.matchMedia();
	// Wide and tall enough to hold steps and window on one screen: pin them and let the scroll drive the build.
	mm.add('(min-width: 1024px) and (min-height: 700px)', () => {
		ScrollTrigger.create({
			trigger: pin,
			start: 'center center',
			end: () => `+=${window.innerHeight * 2.2}`,
			pin: true,
			anticipatePin: 1,
			onUpdate: (self) => update(self.progress),
		});
	});
	// Smaller screens build it while the window crosses the viewport, without pinning.
	mm.add('(max-width: 1023px), (max-height: 699px)', () => {
		ScrollTrigger.create({
			trigger: site,
			start: 'top 70%',
			end: 'bottom 40%',
			onUpdate: (self) => update(self.progress),
		});
	});
}

/* ---------- Client logos ---------- */
function initMarquee() {
	const root = $('[data-marquee]');
	if (!root || reduceMotion) return;
	const track = $('[data-marquee-track]', root)!;
	const toggle = $<HTMLButtonElement>('[data-marquee-toggle]', root)!;
	const label = $('[data-marquee-label]', root)!;
	root.setAttribute('data-running', '');

	// Half the track is one full group, so wrapping at -50% loops without a seam.
	const BASE = 50 / 40; // percent per second: one group every 40 s
	let pos = 0;
	let dir = 1;
	let boost = 0;
	const pace = { slow: 1 };
	let paused = false;
	let visible = false;

	gsap.ticker.add((_, dt) => {
		if (paused || !visible) return;
		boost *= 0.94;
		pos = gsap.utils.wrap(-50, 0, pos - (BASE * dir * pace.slow + boost) * (dt / 1000));
		gsap.set(track, { xPercent: pos });
	});

	// Scrolling pushes the strip in the same direction, then it settles back to its pace.
	ScrollTrigger.create({
		trigger: root,
		start: 'top bottom',
		end: 'bottom top',
		onToggle: (self) => (visible = self.isActive),
		onUpdate: (self) => {
			dir = self.direction;
			boost = gsap.utils.clamp(-12, 12, self.getVelocity() / 120);
		},
	});

	// Pointer over the logos slows them down enough to read.
	track.addEventListener('pointerenter', () => gsap.to(pace, { slow: 0.2, duration: 0.6, overwrite: true }));
	track.addEventListener('pointerleave', () => gsap.to(pace, { slow: 1, duration: 0.6, overwrite: true }));

	toggle.addEventListener('click', () => {
		paused = !paused;
		toggle.setAttribute('aria-pressed', String(paused));
		label.textContent = paused ? toggle.dataset.play! : toggle.dataset.pause!;
	});
}

initBuild();
initMarquee();
