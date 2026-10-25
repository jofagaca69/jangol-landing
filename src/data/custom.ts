/** Content for the custom software page and the custom block on the home page. */
import type { Lang } from '../i18n/routes';

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
