/** Content for the custom software page and the custom block on the home page. */
import type { Lang } from '../i18n/routes';
import gtmLogo from '../assets/clients/gtm-alliance-logo.webp';
import coldfoodLogo from '../assets/clients/coldfood-precocidos-logo.webp';

interface Service {
	title: string;
	desc: string;
	examples: string[];
}

export const services: Record<Lang, Service[]> = {
	es: [
		{
			title: 'Aplicaciones web y móviles',
			desc: 'Herramientas internas para tu equipo, portales para tus clientes o un producto nuevo que quieres lanzar.',
			examples: ['Portal de clientes con pedidos y estado de cuenta', 'App de campo para registrar visitas', 'Panel interno de operaciones'],
		},
		{
			title: 'Integraciones',
			desc: 'Conectamos tu software con pasarelas de pago, facturación electrónica DIAN, CRM o los sistemas que ya usas, para que nadie copie datos a mano.',
			examples: ['Ventas de la tienda en línea que llegan a contabilidad', 'Facturación electrónica desde tu sistema', 'Pagos con PSE y Nequi conectados a tu operación'],
		},
		{
			title: 'Automatización',
			desc: 'Los procesos que hoy dependen de hojas de cálculo y correos pasan a un sistema que los registra y avisa a quien tiene que actuar.',
			examples: ['Aprobaciones de compras con historial', 'Reportes que se generan solos cada semana', 'Alertas cuando un indicador se sale de rango'],
		},
		{
			title: 'Mantenimiento y evolución',
			desc: 'Seguimos con el producto después del lanzamiento: corregimos, actualizamos dependencias y agregamos lo que el negocio vaya pidiendo.',
			examples: ['Soporte con tiempos de respuesta acordados', 'Mejoras planificadas por trimestre', 'Monitoreo y copias de seguridad'],
		},
	],
	en: [
		{
			title: 'Web and mobile apps',
			desc: 'Internal tools for your team, portals for your customers or a new product you want to launch.',
			examples: ['Customer portal with orders and account status', 'Field app for logging visits', 'Internal operations dashboard'],
		},
		{
			title: 'Integrations',
			desc: 'We connect your software to payment gateways, DIAN electronic invoicing, your CRM or the systems you already use, so nobody copies data by hand.',
			examples: ['Online store sales that flow into accounting', 'Electronic invoices issued from your system', 'PSE and Nequi payments wired into your operation'],
		},
		{
			title: 'Automation',
			desc: 'Processes that run on spreadsheets and email today move to a system that records them and alerts whoever has to act.',
			examples: ['Purchase approvals with history', 'Reports that build themselves every week', 'Alerts when a metric goes out of range'],
		},
		{
			title: 'Maintenance and growth',
			desc: 'We stay with the product after launch: we fix bugs, update dependencies and add what the business asks for next.',
			examples: ['Support with agreed response times', 'Improvements planned each quarter', 'Monitoring and backups'],
		},
	],
};

/** Helps a visitor decide between a platform and a custom build. */
export const fit: Record<Lang, { platform: { title: string; items: string[] }; custom: { title: string; items: string[] } }> = {
	es: {
		platform: {
			title: 'Te conviene una plataforma si',
			items: [
				'Tienes un gimnasio, un colegio o una academia.',
				'Lo que necesitas se parece a lo que necesitan otros negocios de tu sector.',
				'Quieres empezar a usarla en semanas.',
			],
		},
		custom: {
			title: 'Te conviene construir a la medida si',
			items: [
				'Tu forma de trabajar es lo que te diferencia y un software genérico te obligaría a cambiarla.',
				'Necesitas conectar varios sistemas que hoy no se hablan.',
				'Quieres lanzar un producto digital propio.',
			],
		},
	},
	en: {
		platform: {
			title: 'A platform is the better fit if',
			items: [
				'You run a gym, a school or an academy.',
				'What you need is close to what other businesses in your sector need.',
				'You want to start using it within weeks.',
			],
		},
		custom: {
			title: 'A custom build is the better fit if',
			items: [
				'The way you work is what sets you apart, and generic software would force you to change it.',
				'You need to connect several systems that do not talk to each other today.',
				'You want to launch a digital product of your own.',
			],
		},
	},
};

export const customFaqs: Record<Lang, { q: string; a: string }[]> = {
	es: [
		{
			q: '¿Cuánto cuesta un proyecto a la medida?',
			a: 'Depende del alcance. Después de la primera conversación te enviamos una propuesta con lo que construiríamos primero, el plazo y el costo.',
		},
		{ q: '¿De quién es el código?', a: 'Lo acordamos en la propuesta. Lo habitual es que el código y los datos sean tuyos.' },
		{
			q: '¿Pueden continuar un proyecto que empezó otro equipo?',
			a: 'Sí. Primero revisamos el código y te contamos qué encontramos antes de comprometer un plan.',
		},
		{ q: '¿Cómo veo el avance?', a: 'Cada dos semanas te entregamos algo que puedes usar en un entorno de prueba, y lo revisamos juntos.' },
	],
	en: [
		{
			q: 'How much does a custom project cost?',
			a: 'It depends on the scope. After the first conversation we send you a proposal with what we would build first, the timeline and the cost.',
		},
		{ q: 'Who owns the code?', a: 'We agree on it in the proposal. Usually the code and the data are yours.' },
		{
			q: 'Can you take over a project another team started?',
			a: 'Yes. We review the code first and tell you what we found before committing to a plan.',
		},
		{ q: 'How do I see progress?', a: 'Every two weeks we hand you something you can use in a test environment, and we review it together.' },
	],
};

/** The four steps on the home page and the custom page. */
export const process: Record<Lang, { title: string; intro: string; steps: { title: string; desc: string }[] }> = {
	es: {
		title: 'Cómo trabajamos',
		intro: 'Seguimos el mismo proceso para un producto nuevo y para adaptar Gyms o Schools a tu operación.',
		steps: [
			{ title: 'Definir', desc: 'Entendemos cómo funciona tu negocio y acordamos qué problema resolvemos primero.' },
			{ title: 'Diseñar', desc: 'Pantallas y flujos que pruebas antes de que escribamos código.' },
			{ title: 'Construir', desc: 'Entregas cada dos semanas, en un entorno donde puedes usarlas.' },
			{ title: 'Evolucionar', desc: 'Medimos el uso real y añadimos módulos a medida que tu negocio crece.' },
		],
	},
	en: {
		title: 'How we work',
		intro: 'We follow the same process for a new product and for adapting Gyms or Schools to your operation.',
		steps: [
			{ title: 'Define', desc: 'We learn how your business works and agree on which problem to solve first.' },
			{ title: 'Design', desc: 'Screens and flows you try out before we write any code.' },
			{ title: 'Build', desc: 'Deliveries every two weeks, in an environment where you can use them.' },
			{ title: 'Grow', desc: 'We measure real usage and add modules as your business grows.' },
		],
	},
};

/** The websites block on the custom page: what we include and the four steps the mockup walks through. */
export const web: Record<
	Lang,
	{
		title: string;
		lead: string;
		includes: string[];
		cta: string;
		steps: { title: string; desc: string }[];
		offer: { title: string; desc: string };
		clientsTitle: string;
		pause: string;
		play: string;
	}
> = {
	es: {
		title: 'Sitios web',
		lead: 'Diseñamos sitios web con tu marca, rápidos en el celular y bien armados para que Google los entienda.',
		includes: [
			'Sitio de empresa o página para un producto',
			'Tienda en línea con pagos por PSE y Nequi',
			'Versión en inglés si vendes afuera',
			'Si lo necesitas, un panel para cambiar textos y fotos sin depender de nosotros',
		],
		cta: 'Cotiza tu sitio web',
		steps: [
			{ title: 'Estructura', desc: 'Definimos qué páginas necesitas y qué tiene que encontrar tu cliente en cada una.' },
			{ title: 'Contenido', desc: 'Escribimos los textos contigo o pulimos los que ya tienes. Los cerramos antes de empezar a diseñar.' },
			{ title: 'Diseño', desc: 'Llevamos tu marca a la pantalla y probamos cada página en celular y en computador.' },
			{ title: 'Publicación', desc: 'Lo subimos a tu dominio con certificado de seguridad y analítica, y con los datos que Google usa para entenderlo.' },
		],
		offer: {
			title: 'Diseño y desarrollo de sitios web',
			desc: 'Sitios de empresa, páginas de producto y tiendas en línea con tu marca, rápidos en el celular y preparados para Google.',
		},
		clientsTitle: 'Hemos hecho sitios para',
		pause: 'Pausar logos',
		play: 'Mover logos',
	},
	en: {
		title: 'Websites',
		lead: 'We design websites around your brand that load fast on a phone and are built so Google can understand them.',
		includes: [
			'A company site or a page for one product',
			'An online store with PSE and Nequi payments',
			'An English version if you sell abroad',
			'If you need it, a panel to change text and photos without waiting on us',
		],
		cta: 'Get a quote for your website',
		steps: [
			{ title: 'Structure', desc: 'We decide which pages you need and what your customer has to find on each one.' },
			{ title: 'Content', desc: 'We write the copy with you or polish what you already have, and settle it before design starts.' },
			{ title: 'Design', desc: 'We bring your brand to the screen and test every page on a phone and on a computer.' },
			{ title: 'Launch', desc: 'We put it on your domain with a security certificate and analytics, plus the data Google uses to understand it.' },
		],
		offer: {
			title: 'Website design and development',
			desc: 'Company sites, product pages and online stores built around your brand, fast on a phone and ready for Google.',
		},
		clientsTitle: 'We have built websites for',
		pause: 'Pause logos',
		play: 'Play logos',
	},
};

export interface Client {
	name: string;
	logo: ImageMetadata;
	/** Live site, linked from the logo once the client confirms it. */
	url?: string;
	/** Display height in rem; square marks need more height than wide wordmarks to look the same size. */
	height: number;
}

export const clients: Client[] = [
	{ name: 'GtM Alliance', logo: gtmLogo, height: 5.5 },
	{ name: 'Precocidos Coldfood', logo: coldfoodLogo, height: 6.5 },
];
