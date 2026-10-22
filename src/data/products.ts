import { CAP, CODE, KETTLEBELL } from '../lib/dots';

export type ProductId = 'gyms' | 'schools';

export interface Product {
	id: ProductId;
	name: string;
	short: string;
	tagline: string;
	audience: string;
	moves: { title: string; desc: string }[];
	sprite: string[];
}

export const products: Product[] = [
	{
		id: 'gyms',
		name: 'Jangol for Gyms',
		short: 'Gyms',
		tagline: 'Membresías, accesos, clases y cobros de tu gimnasio en un solo lugar.',
		audience: 'Para gimnasios, boxes y estudios, con una sede o con varias.',
		moves: [
			{
				title: 'Membresías y planes',
				desc: 'Crea planes mensuales, por sesiones o con congelamiento, y ve quién está al día.',
			},
			{
				title: 'Check-in con QR',
				desc: 'Cada socio entra con un código en su móvil y recepción ve el acceso al instante.',
			},
			{
				title: 'Reservas de clases',
				desc: 'Cupos por clase, lista de espera y recordatorios automáticos.',
			},
			{
				title: 'Cobros recurrentes',
				desc: 'Cobra con tarjeta o transferencia y recibe aviso de cada pago pendiente.',
			},
			{
				title: 'Seguimiento de asistencia',
				desc: 'Encuentra a los socios que dejaron de venir y escríbeles antes de que cancelen.',
			},
		],
		sprite: KETTLEBELL,
	},
	{
		id: 'schools',
		name: 'Jangol for Schools',
		short: 'Schools',
		tagline: 'Matrícula, asistencia, notas y pensiones de tu colegio, con las familias al tanto.',
		audience: 'Para colegios, academias e institutos.',
		moves: [
			{
				title: 'Matrícula en línea',
				desc: 'Las familias inscriben a sus hijos y suben documentos sin hacer fila.',
			},
			{
				title: 'Asistencia y notas',
				desc: 'Los docentes registran desde el aula y los boletines se generan solos.',
			},
			{
				title: 'Pensiones y pagos',
				desc: 'Cobros por periodo, recordatorios y estado de cuenta por estudiante.',
			},
			{
				title: 'Comunicación con familias',
				desc: 'Circulares y avisos que llegan al móvil de cada familia.',
			},
			{
				title: 'Horarios',
				desc: 'Arma horarios por curso y por docente, sin cruces.',
			},
		],
		sprite: CAP,
	},
];

export type FighterId = ProductId | 'custom';

export interface Fighter extends Omit<Product, 'id' | 'audience' | 'moves'> {
	id: FighterId;
	moves: { title: string }[];
	/** Small line above the name on the hero panel. */
	label: string;
}

/** Hero panels: both platforms, plus custom software as a third option. */
export const fighters: Fighter[] = [
	...products.map((p) => ({ ...p, label: 'Jangol for' })),
	{
		id: 'custom',
		name: 'Software a la medida',
		short: 'A la medida',
		label: 'Hecho por Jangol',
		// The space in `short` is a non-breaking one (U+00A0) so "medida" never sits alone on a line.
		tagline: 'Si ninguna plataforma encaja, construimos la tuya.',
		moves: [
			{ title: 'Apps web y móviles' },
			{ title: 'Integraciones' },
			{ title: 'Automatización' },
			{ title: 'Mantenimiento' },
		],
		sprite: CODE,
	},
];

/** Replace with the real inbox before going live. */
export const CONTACT_EMAIL = 'hola@jangol.com';
