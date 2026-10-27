/** Title, description and social-card heading for the pages that are not products or articles. */
import type { Lang, RouteKey } from './routes';

export interface PageMeta {
	title: string;
	description: string;
	/** Short heading printed on the social preview image. */
	ogHeading: string;
}

type MetaKey = Exclude<RouteKey, 'gyms' | 'schools'>;

export const meta: Record<Lang, Record<MetaKey, PageMeta>> = {
	es: {
		home: {
			title: 'Jangol | Software que entiende tu negocio',
			description:
				'Jangol hace software para gimnasios y colegios en Colombia, y desarrolla software a la medida. Conoce Jangol for Gyms y Jangol for Schools.',
			ogHeading: 'Software que entiende tu negocio',
		},
		custom: {
			title: 'Software a la medida y diseño web en Colombia | Jangol',
			description:
				'Diseñamos, construimos y mantenemos sitios web, aplicaciones web y móviles, integraciones y automatizaciones para negocios en Colombia.',
			ogHeading: 'Desarrollo de software a la medida',
		},
		contact: {
			title: 'Pide una demo | Jangol',
			description:
				'Pide una demo de Jangol for Gyms o Jangol for Schools, o cuéntanos el software que necesitas construir. Respondemos en un día hábil.',
			ogHeading: 'Pide una demo o cuéntanos tu idea',
		},
		resources: {
			title: 'Guías para administrar gimnasios y colegios | Jangol',
			description: 'Guías prácticas para administrar gimnasios y colegios en Colombia, y para decidir qué software necesita tu negocio.',
			ogHeading: 'Guías para tu negocio',
		},
		about: {
			title: 'Nosotros | Jangol, empresa de software en Colombia',
			description:
				'Jangol es una empresa colombiana de software. Hacemos plataformas para gimnasios y colegios y desarrollamos software a la medida.',
			ogHeading: 'Una casa de software colombiana',
		},
		privacy: {
			title: 'Política de tratamiento de datos personales | Jangol',
			description: 'Cómo Jangol recoge, usa y protege tus datos personales según la Ley 1581 de 2012, y cómo ejercer tus derechos.',
			ogHeading: 'Política de tratamiento de datos',
		},
		terms: {
			title: 'Términos de uso del sitio web | Jangol',
			description: 'Condiciones para usar el sitio web de Jangol y la información que publicamos en él.',
			ogHeading: 'Términos de uso',
		},
	},
	en: {
		home: {
			title: 'Jangol | Software that understands your business',
			description:
				'Jangol builds software for gyms and schools in Colombia, and custom software for businesses. Meet Jangol for Gyms and Jangol for Schools.',
			ogHeading: 'Software that understands your business',
		},
		custom: {
			title: 'Custom Software and Web Design in Colombia | Jangol',
			description:
				'We design, build and maintain websites, web and mobile apps, integrations and automations for businesses in Colombia.',
			ogHeading: 'Custom software development',
		},
		contact: {
			title: 'Book a demo | Jangol',
			description:
				'Book a demo of Jangol for Gyms or Jangol for Schools, or tell us about the software you need built. We answer within one business day.',
			ogHeading: 'Book a demo or tell us your idea',
		},
		resources: {
			title: 'Guides for Running Gyms and Schools | Jangol',
			description: 'Practical guides for running gyms and schools in Colombia, and for deciding what software your business needs.',
			ogHeading: 'Guides for your business',
		},
		about: {
			title: 'About us | Jangol, a software company in Colombia',
			description: 'Jangol is a Colombian software company. We build platforms for gyms and schools and develop custom software.',
			ogHeading: 'A Colombian software house',
		},
		privacy: {
			title: 'Personal Data Policy | Jangol',
			description: 'How Jangol collects, uses and protects your personal data under Colombian Law 1581 of 2012, and how to exercise your rights.',
			ogHeading: 'Personal data policy',
		},
		terms: {
			title: 'Website Terms of Use | Jangol',
			description: 'Conditions for using the Jangol website and the information we publish on it.',
			ogHeading: 'Terms of use',
		},
	},
};
