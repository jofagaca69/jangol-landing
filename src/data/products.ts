import { CAP, CODE, KETTLEBELL } from '../lib/dots';

export type ProductId = 'gyms' | 'schools';

export type MockupId =
	| 'members'
	| 'checkin'
	| 'classes'
	| 'payments'
	| 'retention'
	| 'enrollment'
	| 'grades'
	| 'fees'
	| 'notices'
	| 'timetable';

export interface Module {
	id: string;
	title: string;
	/** How the work gets done today, before Jangol. */
	problem: string;
	summary: string;
	details: string[];
	mockup: MockupId;
	/** What the mockup shows, for screen readers. */
	mockupLabel: string;
}

export interface Product {
	id: ProductId;
	href: string;
	name: string;
	short: string;
	tagline: string;
	audience: string;
	intro: string;
	modules: Module[];
	/** Modules featured on the home page. */
	highlights: string[];
	faqs: { q: string; a: string }[];
	sprite: string[];
}

export const products: Product[] = [
	{
		id: 'gyms',
		href: '/gyms',
		name: 'Jangol for Gyms',
		short: 'Gyms',
		tagline: 'Membresías, accesos, clases y cobros de tu gimnasio en un solo lugar.',
		audience: 'Para gimnasios, boxes y estudios, con una sede o con varias.',
		intro:
			'Recepción, entrenadores y administración trabajan sobre los mismos datos. Cuando un socio paga, reserva o entra, todos lo ven en ese momento.',
		modules: [
			{
				id: 'membresias',
				title: 'Membresías y planes',
				problem: 'Los planes viven en una hoja de cálculo y nadie sabe con certeza quién está al día.',
				summary:
					'Defines tus planes una vez y cada socio queda asociado al suyo, con fecha de inicio, vencimiento y estado de pago.',
				details: [
					'Planes mensuales, trimestrales, anuales o por paquete de sesiones.',
					'Congelamiento por viaje o lesión, con la fecha de vencimiento corrida.',
					'Ficha de cada socio con su historial de planes, pagos y asistencias.',
				],
				mockup: 'members',
				mockupLabel: 'Lista de socios con su plan, fecha de vencimiento y estado: al día, por vencer o vencido.',
			},
			{
				id: 'check-in',
				title: 'Check-in con QR',
				problem: 'En hora punta se forma fila en recepción mientras alguien busca nombres en una lista.',
				summary:
					'Cada socio muestra un código desde su móvil. Recepción ve al instante si el plan está activo y la entrada queda registrada.',
				details: [
					'Si el plan venció, el sistema lo avisa en la misma pantalla del ingreso.',
					'Registro de entradas por sede, día y hora.',
					'Sirve con una tablet en recepción o con un lector de códigos.',
				],
				mockup: 'checkin',
				mockupLabel: 'Móvil de un socio mostrando su código QR y, al lado, la pantalla de recepción confirmando el acceso.',
			},
			{
				id: 'clases',
				title: 'Reservas de clases',
				problem: 'Las clases grupales se llenan por WhatsApp y nadie lleva la cuenta de los cupos.',
				summary:
					'Publicas el horario con cupos por clase. Los socios reservan, cancelan o entran en lista de espera desde el móvil.',
				details: [
					'Cupo máximo por clase y por sala.',
					'Cuando alguien cancela, el primero de la lista de espera recibe el lugar.',
					'Recordatorio antes de cada clase para que no queden cupos vacíos.',
				],
				mockup: 'classes',
				mockupLabel: 'Horario del día con clases de spinning, funcional y yoga, cupos ocupados y lista de espera.',
			},
			{
				id: 'cobros',
				title: 'Cobros recurrentes',
				problem: 'Cobrar a fin de mes significa revisar uno por uno quién pagó y escribir a quien no.',
				summary:
					'Cada plan genera su cobro en la fecha que corresponde. Ves lo pagado, lo pendiente y lo vencido en una sola lista.',
				details: [
					'Pagos con tarjeta o transferencia.',
					'Aviso automático al socio cuando un pago queda pendiente.',
					'Cierre de caja por día y por sede.',
				],
				mockup: 'payments',
				mockupLabel: 'Resumen de cobros del mes con montos pagados, pendientes y vencidos, y la lista de movimientos.',
			},
			{
				id: 'asistencia',
				title: 'Seguimiento de asistencia',
				problem: 'Te enteras de que un socio se fue cuando ya no renovó.',
				summary:
					'Jangol compara la frecuencia de cada socio con la de sus semanas anteriores y te muestra quién está dejando de venir.',
				details: [
					'Lista de socios que bajaron su asistencia en las últimas semanas.',
					'Mensaje directo desde la ficha del socio.',
					'Asistencia por clase y por horario, para saber qué llenar y qué mover.',
				],
				mockup: 'retention',
				mockupLabel: 'Asistencia de los últimos dos meses de cuatro socios; dos aparecen marcados porque dejaron de venir.',
			},
		],
		highlights: ['check-in', 'clases', 'cobros'],
		faqs: [
			{
				q: '¿Sirve si tengo más de una sede?',
				a: 'Sí. Cada sede tiene su recepción, su horario y su caja, y desde administración ves todas juntas o cada una por separado.',
			},
			{
				q: '¿Puedo pasar mis socios desde una hoja de cálculo?',
				a: 'Sí. La migración es parte de la implementación: nos pasas tu archivo y lo cargamos con planes, fechas y saldos.',
			},
			{
				q: '¿Qué pasa si necesito algo que la plataforma no tiene?',
				a: 'Lo conversamos. Si es útil para otros gimnasios, puede entrar en la hoja de ruta; si es propio de tu operación, lo construimos a la medida.',
			},
			{
				q: '¿Cuánto cuesta?',
				a: 'Depende del número de sedes y de socios. En la demo vemos tu caso y te enviamos una propuesta.',
			},
		],
		sprite: KETTLEBELL,
	},
	{
		id: 'schools',
		href: '/schools',
		name: 'Jangol for Schools',
		short: 'Schools',
		tagline: 'Matrícula, asistencia, notas y pensiones de tu colegio, con las familias al tanto.',
		audience: 'Para colegios, academias e institutos.',
		intro:
			'Secretaría, docentes, tesorería y familias usan el mismo sistema, cada uno con lo que le toca ver. La información se registra una vez y llega a quien la necesita.',
		modules: [
			{
				id: 'matricula',
				title: 'Matrícula en línea',
				problem: 'Cada año hay filas en secretaría y carpetas de papeles que alguien tiene que revisar a mano.',
				summary:
					'Las familias llenan la ficha y suben los documentos desde casa. Secretaría revisa, pide lo que falte y confirma la vacante.',
				details: [
					'Formulario por nivel con los documentos que pide tu colegio.',
					'Estado de cada matrícula: en revisión, observada o confirmada.',
					'Reinscripción de alumnos antiguos con sus datos ya cargados.',
				],
				mockup: 'enrollment',
				mockupLabel: 'Formulario de matrícula en el móvil con la lista de documentos subidos y los que faltan.',
			},
			{
				id: 'asistencia-notas',
				title: 'Asistencia y notas',
				problem: 'Los docentes pasan lista en papel y las notas se copian a mano en el boletín al final del periodo.',
				summary:
					'Los docentes registran asistencia y calificaciones desde el aula. Al cierre del periodo, el boletín ya está armado.',
				details: [
					'Escalas de calificación numéricas o por letras, según tu reglamento.',
					'Promedios por curso y por periodo, calculados solos.',
					'Las familias ven asistencia y notas desde su cuenta.',
				],
				mockup: 'grades',
				mockupLabel: 'Boletín de un estudiante con notas por curso en tres periodos y su promedio.',
			},
			{
				id: 'pensiones',
				title: 'Pensiones y pagos',
				problem: 'Tesorería persigue pagos por teléfono y cada familia pregunta cuánto debe.',
				summary:
					'Cada estudiante tiene su estado de cuenta con las cuotas del año. Las familias lo consultan y reciben recordatorios antes del vencimiento.',
				details: [
					'Cronograma de cuotas por nivel, con descuentos por hermanos o becas.',
					'Recordatorios antes y después de cada vencimiento.',
					'Reporte de morosidad por grado.',
				],
				mockup: 'fees',
				mockupLabel: 'Estado de cuenta de un estudiante con cuotas pagadas, la del mes por vencer y las siguientes.',
			},
			{
				id: 'comunicacion',
				title: 'Comunicación con familias',
				problem: 'Las circulares se pierden en la mochila y nadie sabe quién las leyó.',
				summary:
					'Envías circulares y avisos a todo el colegio, a un grado o a una sección. Llegan al móvil de cada familia y ves quién los abrió.',
				details: [
					'Avisos con fecha, adjuntos y confirmación de lectura.',
					'Autorizaciones para salidas y actividades, firmadas desde el móvil.',
					'Mensajes entre docentes y familias con historial.',
				],
				mockup: 'notices',
				mockupLabel: 'Circular sobre una salida al museo en el móvil de una familia, con el botón para autorizar.',
			},
			{
				id: 'horarios',
				title: 'Horarios',
				problem: 'Armar los horarios toma semanas y siempre aparece un docente en dos aulas a la misma hora.',
				summary:
					'Cargas cursos, docentes y aulas, y armas el horario sobre una grilla que avisa cuando algo se cruza.',
				details: [
					'Vista por sección, por docente y por aula.',
					'Aviso de cruces antes de publicar.',
					'Cada familia y cada docente ve su propio horario.',
				],
				mockup: 'timetable',
				mockupLabel: 'Horario semanal de una sección con bloques de matemática, comunicación, ciencia y arte.',
			},
		],
		highlights: ['matricula', 'asistencia-notas', 'pensiones'],
		faqs: [
			{
				q: '¿Sirve para academias e institutos, no solo para colegios?',
				a: 'Sí. Los niveles, periodos y escalas de notas se configuran según tu institución, sea un colegio, una academia preuniversitaria o un instituto.',
			},
			{
				q: '¿Las familias necesitan instalar algo?',
				a: 'Entran con su cuenta desde el móvil o la computadora. Les enviamos una guía corta al activar el colegio.',
			},
			{
				q: '¿Podemos traer los datos del año anterior?',
				a: 'Sí. La migración de estudiantes, familias y saldos es parte de la implementación.',
			},
			{
				q: '¿Cuánto cuesta?',
				a: 'Depende del número de estudiantes y de los módulos que uses. En la demo revisamos tu caso y te enviamos una propuesta.',
			},
		],
		sprite: CAP,
	},
];

export const productById = (id: ProductId) => products.find((p) => p.id === id)!;

/** What every platform has underneath, whatever the business. */
export const shared = [
	{ title: 'Cuentas y roles', desc: 'Cada persona entra con su usuario y ve lo que le corresponde: recepción, docentes, administración o familias.' },
	{ title: 'Pagos', desc: 'El mismo motor de cobros, recordatorios y reportes en las dos plataformas.' },
	{ title: 'Permisos', desc: 'Decides quién puede ver montos, editar datos o anular un pago.' },
	{ title: 'Soporte', desc: 'Te atiende el mismo equipo que construye la plataforma.' },
];

/** Implementation steps, the same for both platforms. */
export const onboarding = [
	{ title: 'Demo con tu caso', desc: 'Vemos cómo trabajas hoy y qué módulos necesitas primero.' },
	{ title: 'Configuración', desc: 'Cargamos tus planes, niveles, sedes y permisos.' },
	{ title: 'Migración de datos', desc: 'Pasamos tu información actual al sistema y la revisamos contigo.' },
	{ title: 'Capacitación', desc: 'Una sesión por rol, y seguimos disponibles durante las primeras semanas.' },
];

export type FighterId = ProductId | 'custom';

export interface Fighter {
	id: FighterId;
	href: string;
	name: string;
	short: string;
	tagline: string;
	moves: { title: string }[];
	sprite: string[];
	/** Small line above the name on the hero panel. */
	label: string;
}

/** Hero panels: both platforms, plus custom software as a third option. */
export const fighters: Fighter[] = [
	...products.map((p) => ({
		id: p.id,
		href: p.href,
		name: p.name,
		short: p.short,
		tagline: p.tagline,
		moves: p.modules.map((m) => ({ title: m.title })),
		sprite: p.sprite,
		label: 'Jangol for',
	})),
	{
		id: 'custom',
		href: '/a-la-medida',
		name: 'Software a la medida',
		// Non-breaking space so "medida" never sits alone on a line.
		short: 'A la medida',
		label: 'Hecho por Jangol',
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
