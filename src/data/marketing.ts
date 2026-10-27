/** Content for the digital marketing page and its panel in the home hero. */
import type { Lang } from '../i18n/routes';

interface Service {
	title: string;
	desc: string;
	examples: string[];
}

export const marketingServices: Record<Lang, Service[]> = {
	es: [
		{
			title: 'SEO y contenido',
			desc: 'Ajustamos tu sitio para que Google lo entienda y escribimos las páginas y artículos que tus clientes buscan antes de comprar.',
			examples: [
				'Revisión técnica del sitio y arreglo de lo que lo hace lento o invisible para Google',
				'Páginas y artículos escritos sobre lo que tus clientes buscan',
				'Perfil de Google Business con fotos, horarios y reseñas al día',
			],
		},
		{
			title: 'Pauta en Google y Meta Ads',
			desc: 'Montamos y manejamos tus campañas en Google, Facebook e Instagram con el presupuesto que tú defines, y pasamos la plata a los anuncios que traen clientes.',
			examples: [
				'Campañas de búsqueda para quien ya está buscando lo que vendes',
				'Anuncios en Instagram y Facebook por ciudad e intereses',
				'Medición de cada formulario, llamada o mensaje de WhatsApp que llega por un anuncio',
			],
		},
		{
			title: 'Redes sociales',
			desc: 'Planeamos el mes, hacemos las piezas y las publicamos con tu marca. Tu cuenta deja de depender de que alguien tenga un rato libre.',
			examples: [
				'Calendario mensual que apruebas antes de publicar',
				'Piezas gráficas y videos cortos con tu marca',
				'Respuesta a comentarios y mensajes en los horarios acordados',
			],
		},
	],
	en: [
		{
			title: 'SEO and content',
			desc: 'We fix your site so Google understands it, and we write the pages and articles your customers search for before they buy.',
			examples: [
				'A technical review of the site and fixes for whatever keeps it slow or hidden from Google',
				'Pages and articles written around what your customers search for',
				'A Google Business Profile with up-to-date photos, hours and reviews',
			],
		},
		{
			title: 'Google and Meta Ads',
			desc: 'We set up and run your campaigns on Google, Facebook and Instagram on the budget you choose, and move the money to the ads that bring in customers.',
			examples: [
				'Search campaigns for people already looking for what you sell',
				'Instagram and Facebook ads targeted by city and interests',
				'Tracking for every form, call or WhatsApp message that comes from an ad',
			],
		},
		{
			title: 'Social media',
			desc: 'We plan the month, make the posts and publish them under your brand, so your account no longer depends on someone finding a spare moment.',
			examples: [
				'A monthly calendar you approve before anything goes out',
				'Graphics and short videos in your brand style',
				'Replies to comments and messages during agreed hours',
			],
		},
	],
};

/** The steps on the marketing page: the first two happen once, the last two every month. */
export const marketingProcess: Record<Lang, { title: string; intro: string; steps: { title: string; desc: string }[] }> = {
	es: {
		title: 'Cómo trabajamos',
		intro: 'Los dos primeros pasos se hacen una vez. Los otros dos se repiten cada mes.',
		steps: [
			{ title: 'Revisar', desc: 'Miramos tu sitio, tus redes y lo que hace tu competencia.' },
			{ title: 'Planear', desc: 'Acordamos a quién le hablamos, en qué canales y con cuánto presupuesto de pauta.' },
			{ title: 'Ejecutar', desc: 'Lanzamos las campañas, publicamos en redes y hacemos los cambios al sitio.' },
			{ title: 'Ajustar', desc: 'Cada mes revisamos contigo los resultados y movemos el plan hacia lo que funcionó.' },
		],
	},
	en: {
		title: 'How we work',
		intro: 'The first two steps happen once. The other two repeat every month.',
		steps: [
			{ title: 'Review', desc: 'We look at your website, your social accounts and what your competitors are doing.' },
			{ title: 'Plan', desc: 'We agree on who we are talking to, which channels to use and how much to spend on ads.' },
			{ title: 'Run', desc: 'We launch the campaigns, publish on social media and make the changes to the site.' },
			{ title: 'Adjust', desc: 'Every month we go over the results with you and shift the plan toward what worked.' },
		],
	},
};

export const marketingFaqs: Record<Lang, { q: string; a: string }[]> = {
	es: [
		{
			q: '¿Cuánto cuesta?',
			a: 'Depende de los canales y del trabajo de cada mes. La pauta se paga aparte, directo a Google o a Meta, y desde tu cuenta ves cuánto se gastó.',
		},
		{
			q: '¿Cuándo se ven resultados?',
			a: 'La pauta trae visitas desde que se activan las campañas. El SEO toma meses; en la propuesta te decimos qué esperar y cuándo revisarlo.',
		},
		{
			q: '¿Las cuentas quedan a mi nombre?',
			a: 'Sí. El perfil de Google Business, las cuentas de anuncios y las redes son de tu negocio. Nosotros entramos con un acceso que puedes retirar cuando quieras.',
		},
		{
			q: '¿Necesito tener sitio web?',
			a: 'Para pautar en redes no siempre. Para SEO sí. Si no tienes sitio, o el que tienes es lento, también lo hacemos.',
		},
	],
	en: [
		{
			q: 'How much does it cost?',
			a: 'It depends on the channels and the work each month. Ad spend is paid separately, straight to Google or Meta, and you see in your own account how much went out.',
		},
		{
			q: 'When will I see results?',
			a: 'Ads bring visits as soon as the campaigns go live. SEO takes months; the proposal tells you what to expect and when to check.',
		},
		{
			q: 'Are the accounts in my name?',
			a: 'Yes. The Google Business Profile, the ad accounts and the social accounts belong to your business. We sign in with access you can remove whenever you want.',
		},
		{
			q: 'Do I need a website?',
			a: 'Not always for social media ads. For SEO, yes. If you do not have a site, or yours is slow, we build that too.',
		},
	],
};

/** Copy for the marketing page itself. */
export const marketingPage: Record<
	Lang,
	{ label: string; h1: string; lead: string; tell: string; how: string; what: string; ctaTitle: string; ctaText: string; crumb: string }
> = {
	es: {
		label: 'Hecho por Jangol',
		h1: 'Marketing digital para negocios en Colombia',
		lead: 'Hacemos que tu negocio aparezca cuando alguien busca lo que vendes, y mantenemos tus redes al día. El equipo que construye tu sitio web también lo posiciona y maneja la pauta, y cada mes te muestra de dónde llegaron los clientes.',
		tell: 'Cuéntanos de tu negocio',
		how: 'Cómo trabajamos',
		what: 'Qué hacemos',
		ctaTitle: 'Cuéntanos cómo te llegan los clientes hoy',
		ctaText: 'En la primera conversación revisamos tu sitio y tus redes, y te decimos por dónde empezaríamos.',
		crumb: 'Marketing digital',
	},
	en: {
		label: 'Built by Jangol',
		h1: 'Digital marketing for businesses in Colombia',
		lead: 'We get your business in front of people searching for what you sell, and we keep your social accounts up to date. The team that builds your website also handles its SEO and your ads, and every month shows you where your customers came from.',
		tell: 'Tell us about your business',
		how: 'How we work',
		what: 'What we do',
		ctaTitle: 'Tell us how customers find you today',
		ctaText: 'In the first conversation we look at your website and social accounts and tell you where we would start.',
		crumb: 'Digital marketing',
	},
};

/** The marketing panel in the home hero. */
export const marketingFighter: Record<Lang, { name: string; short: string; label: string; tagline: string; moves: { title: string }[] }> = {
	es: {
		name: 'Marketing digital',
		short: 'Marketing',
		label: 'Hecho por Jangol',
		tagline: 'Que tu negocio aparezca en Google y en redes, y que sepas qué te trajo clientes.',
		moves: [{ title: 'SEO y contenido' }, { title: 'Google y Meta Ads' }, { title: 'Redes sociales' }],
	},
	en: {
		name: 'Digital marketing',
		short: 'Marketing',
		label: 'Built by Jangol',
		tagline: 'Get found on Google and social media, and know what brought in customers.',
		moves: [{ title: 'SEO and content' }, { title: 'Google and Meta Ads' }, { title: 'Social media' }],
	},
};
