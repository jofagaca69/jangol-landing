import { CAP, CODE, DUMBBELL, MEGAPHONE } from '../lib/dots';
import { marketingFighter } from './marketing';
import { path, type Lang } from '../i18n/routes';

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
	/** Visible H1, written around the search people actually type. */
	heading: string;
	seoTitle: string;
	description: string;
	/** Plain definition of the product, right under the hero. */
	definition: string;
	tagline: string;
	audience: string;
	intro: string;
	modules: Module[];
	/** Modules featured on the home page. */
	highlights: string[];
	faqs: { q: string; a: string }[];
	sprite: string[];
}

const productsEs: Product[] = [
	{
		id: 'gyms',
		href: path('gyms', 'es'),
		name: 'Jangol for Gyms',
		short: 'Gyms',
		heading: 'Software para gimnasios',
		seoTitle: 'Software para gimnasios en Colombia | Jangol for Gyms',
		description:
			'Software para gimnasios en Colombia: membresías, check-in con QR, reservas de clases, cobros con PSE y Nequi, y factura electrónica DIAN.',
		definition:
			'Jangol for Gyms es un software para administrar gimnasios. Reúne la ficha de cada socio con su plan, sus pagos y sus entradas, así que recepción ya no tiene que cruzar una hoja de cálculo con un cuaderno. Los socios pagan con PSE, Nequi o Daviplata, y cada pago puede generar la factura electrónica que pide la DIAN.',
		tagline: 'Membresías, accesos, clases y cobros de tu gimnasio en un solo lugar.',
		audience: 'Para gimnasios, boxes y estudios en Colombia, con una sede o con varias.',
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
				problem: 'En hora pico se forma fila en recepción mientras alguien busca nombres en una lista.',
				summary:
					'Cada socio muestra un código desde su celular. Recepción ve al instante si el plan está activo y la entrada queda registrada.',
				details: [
					'Si el plan venció, el sistema lo avisa en la misma pantalla del ingreso.',
					'Registro de entradas por sede, día y hora.',
					'Funciona con una tablet en recepción o con un lector de códigos.',
				],
				mockup: 'checkin',
				mockupLabel: 'Celular de un socio con su código QR y, al lado, la pantalla de recepción que confirma el acceso.',
			},
			{
				id: 'clases',
				title: 'Reservas de clases',
				problem: 'Las clases grupales se llenan por WhatsApp y nadie lleva la cuenta de los cupos.',
				summary:
					'Publicas el horario con cupos por clase. Los socios reservan, cancelan o entran en lista de espera desde el celular.',
				details: [
					'Cupo máximo por clase y por salón.',
					'Cuando alguien cancela, el primero de la lista de espera recibe el cupo.',
					'Recordatorio antes de cada clase para que no queden cupos vacíos.',
				],
				mockup: 'classes',
				mockupLabel: 'Horario del día con clases de spinning, funcional y yoga, cupos ocupados y lista de espera.',
			},
			{
				id: 'cobros',
				title: 'Cobros y facturación',
				problem: 'Cobrar a fin de mes significa revisar uno por uno quién pagó y escribirle a quien no.',
				summary:
					'Cada plan genera su cobro en la fecha que corresponde. Ves lo pagado, lo pendiente y lo vencido en una sola lista.',
				details: [
					'Pagos con PSE, tarjeta, Nequi, Daviplata o transferencia.',
					'Factura electrónica DIAN por cada pago, sin digitarla en otro sistema.',
					'Aviso automático al socio cuando un pago queda pendiente.',
					'Cierre de caja por día y por sede.',
				],
				mockup: 'payments',
				mockupLabel: 'Resumen de cobros del mes en pesos con montos pagados, pendientes y vencidos, y la lista de movimientos.',
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
				q: '¿Emite factura electrónica?',
				a: 'Sí. Cada pago puede generar su factura electrónica válida ante la DIAN, sin pasar los datos a otro programa.',
			},
			{
				q: '¿Puedo pasar mis socios desde una hoja de cálculo?',
				a: 'Sí. La migración es parte de la implementación: nos pasas tu archivo y lo cargamos con planes, fechas y saldos.',
			},
			{
				q: '¿Qué pasa si necesito algo que la plataforma no tiene?',
				a: 'Lo conversamos. Si le sirve a otros gimnasios, puede entrar en la hoja de ruta; si es propio de tu operación, lo construimos a la medida.',
			},
			{
				q: '¿Cuánto cuesta?',
				a: 'Depende del número de sedes y de socios. En la demo vemos tu caso y te enviamos una propuesta.',
			},
		],
		sprite: DUMBBELL,
	},
	{
		id: 'schools',
		href: path('schools', 'es'),
		name: 'Jangol for Schools',
		short: 'Schools',
		heading: 'Software para colegios',
		seoTitle: 'Software para colegios en Colombia | Jangol for Schools',
		description:
			'Software para colegios en Colombia: matrícula en línea, notas con la escala del Decreto 1290, reportes para SIMAT, pensiones con PSE y circulares.',
		definition:
			'Jangol for Schools es una plataforma de gestión escolar. Secretaría, docentes, tesorería y familias trabajan sobre los mismos datos: la matrícula, el boletín con la escala de valoración del Decreto 1290, la información que se reporta al SIMAT y el estado de cuenta de cada estudiante. Las familias pagan la pensión por PSE, Nequi o Daviplata y el colegio emite la factura electrónica.',
		tagline: 'Matrícula, asistencia, notas y pensiones de tu colegio, con las familias al tanto.',
		audience: 'Para colegios, academias e institutos en Colombia.',
		intro:
			'Secretaría, docentes, tesorería y familias usan el mismo sistema, cada uno con lo que le toca ver. La información se registra una vez y llega a quien la necesita.',
		modules: [
			{
				id: 'matricula',
				title: 'Matrícula en línea',
				problem: 'Cada año hay filas en secretaría y carpetas de papeles que alguien tiene que revisar a mano.',
				summary:
					'Las familias llenan la ficha y suben los documentos desde la casa. Secretaría revisa, pide lo que falte y confirma el cupo.',
				details: [
					'Formulario por grado con los documentos que pide tu colegio: registro civil, tarjeta de identidad, boletín del año anterior.',
					'Estado de cada matrícula: en revisión, con observaciones o confirmada.',
					'Reinscripción de estudiantes antiguos con sus datos ya cargados.',
					'Información de matrícula lista para reportar en el SIMAT.',
				],
				mockup: 'enrollment',
				mockupLabel: 'Formulario de matrícula en el celular con la lista de documentos subidos y los que faltan.',
			},
			{
				id: 'asistencia-notas',
				title: 'Asistencia y notas',
				problem: 'Los docentes llaman a lista en papel y las notas se copian a mano en el boletín al final del periodo.',
				summary:
					'Los docentes registran asistencia y calificaciones desde el salón. Al cierre del periodo, el boletín ya está armado.',
				details: [
					'Escala de valoración institucional con su equivalencia en la escala nacional del Decreto 1290: superior, alto, básico y bajo.',
					'Promedios por asignatura y por periodo, calculados solos.',
					'Las familias ven asistencia y notas desde su cuenta.',
				],
				mockup: 'grades',
				mockupLabel: 'Boletín de un estudiante con notas de 1,0 a 5,0 por asignatura en tres periodos y su desempeño.',
			},
			{
				id: 'pensiones',
				title: 'Pensiones y pagos',
				problem: 'Tesorería persigue pagos por teléfono y cada familia pregunta cuánto debe.',
				summary:
					'Cada estudiante tiene su estado de cuenta con las cuotas del año. Las familias lo consultan y reciben recordatorios antes del vencimiento.',
				details: [
					'Cronograma de cuotas por grado, con descuentos por hermanos o becas.',
					'Pago en línea con PSE, Nequi o Daviplata, y factura electrónica DIAN.',
					'Recordatorios antes y después de cada vencimiento.',
					'Reporte de cartera por grado.',
				],
				mockup: 'fees',
				mockupLabel: 'Estado de cuenta de un estudiante con pensiones pagadas, la del mes por vencer y las siguientes.',
			},
			{
				id: 'comunicacion',
				title: 'Comunicación con familias',
				problem: 'Las circulares se pierden en la maleta y nadie sabe quién las leyó.',
				summary:
					'Envías circulares y avisos a todo el colegio, a un grado o a un curso. Llegan al celular de cada familia y ves quién los abrió.',
				details: [
					'Avisos con fecha, adjuntos y confirmación de lectura.',
					'Autorizaciones para salidas y actividades, firmadas desde el celular.',
					'Mensajes entre docentes y familias con historial.',
				],
				mockup: 'notices',
				mockupLabel: 'Circular sobre una salida al museo en el celular de una familia, con el botón para autorizar.',
			},
			{
				id: 'horarios',
				title: 'Horarios',
				problem: 'Armar los horarios toma semanas y siempre aparece un docente en dos salones a la misma hora.',
				summary: 'Cargas asignaturas, docentes y salones, y armas el horario sobre una grilla que avisa cuando algo se cruza.',
				details: [
					'Vista por curso, por docente y por salón.',
					'Aviso de cruces antes de publicar.',
					'Cada familia y cada docente ve su propio horario.',
				],
				mockup: 'timetable',
				mockupLabel: 'Horario semanal de un curso con bloques de matemáticas, lenguaje, ciencias y artes.',
			},
		],
		highlights: ['matricula', 'asistencia-notas', 'pensiones'],
		faqs: [
			{
				q: '¿Cumple con el Decreto 1290 y el SIMAT?',
				a: 'Sí. Configuras la escala de valoración de tu colegio y el sistema muestra su equivalencia en la escala nacional: superior, alto, básico y bajo. La información de matrícula queda lista para reportar en el SIMAT.',
			},
			{
				q: '¿Sirve para academias e institutos?',
				a: 'Sí. Los grados, periodos y escalas de notas se configuran según tu institución, sea un colegio, un preicfes o un instituto.',
			},
			{
				q: '¿Las familias necesitan instalar algo?',
				a: 'Entran con su cuenta desde el celular o el computador. Les enviamos una guía corta cuando activamos el colegio.',
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

const productsEn: Product[] = [
	{
		id: 'gyms',
		href: path('gyms', 'en'),
		name: 'Jangol for Gyms',
		short: 'Gyms',
		heading: 'Gym management software',
		seoTitle: 'Gym Management Software in Colombia | Jangol for Gyms',
		description:
			'Gym management software for Colombia: memberships, QR check-in, class bookings, payments with PSE and Nequi, and DIAN electronic invoices.',
		definition:
			'Jangol for Gyms is software for running a gym. It keeps each member\'s plan, payments and visits on one record, so the front desk no longer has to match a spreadsheet against a notebook. Members pay with PSE, Nequi or Daviplata, and every payment can produce the electronic invoice that DIAN, Colombia\'s tax authority, requires.',
		tagline: 'Memberships, access, classes and payments for your gym in one place.',
		audience: 'For gyms, boxes and studios in Colombia, with one location or several.',
		intro:
			'The front desk, trainers and managers work on the same data. When a member pays, books or walks in, everyone sees it at that moment.',
		modules: [
			{
				id: 'membresias',
				title: 'Memberships and plans',
				problem: 'Plans live in a spreadsheet and nobody knows for sure who is up to date.',
				summary: 'You set up your plans once and each member is linked to theirs, with a start date, an end date and a payment status.',
				details: [
					'Monthly, quarterly and yearly plans, or session packs.',
					'Freezes for travel or injury, with the end date pushed back.',
					'A record for each member with their plans, payments and visits.',
				],
				mockup: 'members',
				mockupLabel: 'Member list with each plan, end date and status: up to date, ending soon or expired.',
			},
			{
				id: 'check-in',
				title: 'QR check-in',
				problem: 'At peak hours a line forms at the front desk while someone looks for names on a list.',
				summary: 'Each member shows a code on their phone. The front desk sees right away whether the plan is active, and the visit is logged.',
				details: [
					'If the plan has expired, the check-in screen says so.',
					'Visit log by location, day and time.',
					'Works with a tablet at the front desk or with a code scanner.',
				],
				mockup: 'checkin',
				mockupLabel: 'A member\'s phone showing their QR code next to the front desk screen confirming access.',
			},
			{
				id: 'clases',
				title: 'Class bookings',
				problem: 'Group classes fill up over WhatsApp and nobody keeps count of the spots.',
				summary: 'You publish the schedule with spots per class. Members book, cancel or join the waitlist from their phone.',
				details: [
					'Maximum spots per class and per room.',
					'When someone cancels, the first person on the waitlist gets the spot.',
					'A reminder before each class so spots do not go empty.',
				],
				mockup: 'classes',
				mockupLabel: 'Today\'s schedule with spinning, functional and yoga classes, booked spots and a waitlist.',
			},
			{
				id: 'cobros',
				title: 'Payments and invoicing',
				problem: 'Collecting at the end of the month means checking one by one who paid and writing to those who did not.',
				summary: 'Each plan creates its charge on the right date. You see what is paid, pending and overdue in one list.',
				details: [
					'Payments with PSE, card, Nequi, Daviplata or bank transfer.',
					'A DIAN electronic invoice for each payment, without typing it into another system.',
					'Automatic notice to the member when a payment is pending.',
					'Daily cash close per location.',
				],
				mockup: 'payments',
				mockupLabel: 'Monthly payment summary in Colombian pesos with paid, pending and overdue amounts, and the list of transactions.',
			},
			{
				id: 'asistencia',
				title: 'Attendance tracking',
				problem: 'You find out a member left when they do not renew.',
				summary: 'Jangol compares how often each member comes with their previous weeks and shows you who is dropping off.',
				details: [
					'A list of members whose attendance fell in recent weeks.',
					'Message them straight from their record.',
					'Attendance by class and time slot, so you know what to fill and what to move.',
				],
				mockup: 'retention',
				mockupLabel: 'Two months of attendance for four members; two are flagged because they stopped coming.',
			},
		],
		highlights: ['check-in', 'clases', 'cobros'],
		faqs: [
			{
				q: 'Does it work if I have more than one location?',
				a: 'Yes. Each location has its own front desk, schedule and cash register, and managers see them together or one at a time.',
			},
			{
				q: 'Does it issue electronic invoices?',
				a: 'Yes. Each payment can produce an electronic invoice that is valid with DIAN, without moving the data to another program.',
			},
			{
				q: 'Can I bring my members over from a spreadsheet?',
				a: 'Yes. Migration is part of the setup: you send us your file and we load it with plans, dates and balances.',
			},
			{
				q: 'What if I need something the platform does not have?',
				a: 'We talk it through. If other gyms would use it, it can go on the roadmap; if it is specific to your business, we build it for you.',
			},
			{
				q: 'How much does it cost?',
				a: 'It depends on the number of locations and members. In the demo we look at your case and then send you a proposal.',
			},
		],
		sprite: DUMBBELL,
	},
	{
		id: 'schools',
		href: path('schools', 'en'),
		name: 'Jangol for Schools',
		short: 'Schools',
		heading: 'School management software',
		seoTitle: 'School Management Software in Colombia | Jangol for Schools',
		description:
			'School management software for Colombia: online enrollment, grades on the Decreto 1290 scale, SIMAT reporting, tuition payments with PSE and notices.',
		definition:
			'Jangol for Schools is a school management platform. The registrar, teachers, the finance office and families work on the same data: enrollment, report cards on the Decreto 1290 grading scale, the information schools report to SIMAT (the national enrollment system) and each student\'s account. Families pay tuition with PSE, Nequi or Daviplata, and the school issues the electronic invoice.',
		tagline: 'Enrollment, attendance, grades and tuition for your school, with families kept in the loop.',
		audience: 'For schools, academies and institutes in Colombia.',
		intro:
			'The registrar, teachers, the finance office and families use the same system, each seeing what they need. Information is entered once and reaches whoever needs it.',
		modules: [
			{
				id: 'matricula',
				title: 'Online enrollment',
				problem: 'Every year there are lines at the office and folders of paper that someone has to check by hand.',
				summary: 'Families fill in the form and upload documents from home. The office reviews them, asks for anything missing and confirms the spot.',
				details: [
					'A form per grade with the documents your school asks for: birth certificate, ID card, last year\'s report card.',
					'Status for each enrollment: under review, needs changes or confirmed.',
					'Re-enrollment for returning students with their data already filled in.',
					'Enrollment data ready to report to SIMAT.',
				],
				mockup: 'enrollment',
				mockupLabel: 'Enrollment form on a phone with the documents uploaded and the ones still missing.',
			},
			{
				id: 'asistencia-notas',
				title: 'Attendance and grades',
				problem: 'Teachers take attendance on paper and grades are copied by hand onto the report card at the end of the term.',
				summary: 'Teachers record attendance and grades from the classroom. When the term closes, the report card is already done.',
				details: [
					'Your school\'s grading scale, mapped to the national Decreto 1290 scale: superior, high, basic and low.',
					'Averages per subject and per term, calculated for you.',
					'Families see attendance and grades from their account.',
				],
				mockup: 'grades',
				mockupLabel: 'A student\'s report card with grades from 1.0 to 5.0 per subject over three terms, with the performance level.',
			},
			{
				id: 'pensiones',
				title: 'Tuition and payments',
				problem: 'The finance office chases payments by phone and every family asks how much they owe.',
				summary: 'Each student has an account with the year\'s installments. Families check it and get reminders before each due date.',
				details: [
					'Installment schedule per grade, with sibling discounts or scholarships.',
					'Online payment with PSE, Nequi or Daviplata, and DIAN electronic invoices.',
					'Reminders before and after each due date.',
					'Overdue report by grade.',
				],
				mockup: 'fees',
				mockupLabel: 'A student\'s account with paid installments, this month\'s due soon and the ones ahead.',
			},
			{
				id: 'comunicacion',
				title: 'Family communication',
				problem: 'Notices get lost in backpacks and nobody knows who read them.',
				summary: 'You send notices to the whole school, a grade or a class. They reach each family\'s phone and you see who opened them.',
				details: [
					'Notices with dates, attachments and read receipts.',
					'Permission slips for trips and activities, signed from the phone.',
					'Messages between teachers and families, with history.',
				],
				mockup: 'notices',
				mockupLabel: 'A notice about a museum trip on a family\'s phone, with the button to give permission.',
			},
			{
				id: 'horarios',
				title: 'Timetables',
				problem: 'Building timetables takes weeks and a teacher always ends up in two rooms at the same time.',
				summary: 'You load subjects, teachers and rooms, and build the timetable on a grid that warns you when something overlaps.',
				details: [
					'Views by class, by teacher and by room.',
					'Overlap warnings before you publish.',
					'Each family and each teacher sees their own timetable.',
				],
				mockup: 'timetable',
				mockupLabel: 'Weekly timetable for a class with blocks of math, language, science and art.',
			},
		],
		highlights: ['matricula', 'asistencia-notas', 'pensiones'],
		faqs: [
			{
				q: 'Does it follow Decreto 1290 and SIMAT?',
				a: 'Yes. You set your school\'s grading scale and the system shows its match on the national scale: superior, high, basic and low. Enrollment data is ready to report to SIMAT.',
			},
			{
				q: 'Does it work for academies and institutes?',
				a: 'Yes. Grades, terms and grading scales are set up for your institution, whether it is a school, a test-prep academy or an institute.',
			},
			{
				q: 'Do families need to install anything?',
				a: 'They sign in from their phone or computer. We send them a short guide when we switch the school on.',
			},
			{
				q: 'Can we bring last year\'s data?',
				a: 'Yes. Migrating students, families and balances is part of the setup.',
			},
			{
				q: 'How much does it cost?',
				a: 'It depends on the number of students and the modules you use. In the demo we review your case and then send you a proposal.',
			},
		],
		sprite: CAP,
	},
];

export const products: Record<Lang, Product[]> = { es: productsEs, en: productsEn };

export const productById = (id: ProductId, lang: Lang) => products[lang].find((p) => p.id === id)!;

/** What every platform has underneath, whatever the business. */
export const shared: Record<Lang, { title: string; desc: string }[]> = {
	es: [
		{ title: 'Cuentas y roles', desc: 'Cada persona entra con su usuario y ve lo que le corresponde: recepción, docentes, administración o familias.' },
		{ title: 'Pagos', desc: 'El mismo motor de cobros con PSE, Nequi y factura electrónica DIAN, con recordatorios y reportes, en las dos plataformas.' },
		{ title: 'Permisos', desc: 'Decides quién puede ver montos, editar datos o anular un pago.' },
		{ title: 'Soporte', desc: 'Te atiende el mismo equipo que construye la plataforma.' },
	],
	en: [
		{ title: 'Accounts and roles', desc: 'Everyone signs in with their own user and sees what applies to them: front desk, teachers, managers or families.' },
		{ title: 'Payments', desc: 'The same payment engine with PSE, Nequi and DIAN electronic invoices, plus reminders and reports, on both platforms.' },
		{ title: 'Permissions', desc: 'You decide who can see amounts, edit data or void a payment.' },
		{ title: 'Support', desc: 'You talk to the same team that builds the platform.' },
	],
};

/** Implementation steps, the same for both platforms. */
export const onboarding: Record<Lang, { title: string; desc: string }[]> = {
	es: [
		{ title: 'Demo con tu caso', desc: 'Vemos cómo trabajas hoy y qué módulos necesitas primero.' },
		{ title: 'Configuración', desc: 'Cargamos tus planes, grados, sedes y permisos.' },
		{ title: 'Migración de datos', desc: 'Pasamos tu información actual al sistema y la revisamos contigo.' },
		{ title: 'Capacitación', desc: 'Una sesión por rol, y seguimos pendientes durante las primeras semanas.' },
	],
	en: [
		{ title: 'A demo with your case', desc: 'We look at how you work today and which modules you need first.' },
		{ title: 'Setup', desc: 'We load your plans, grades, locations and permissions.' },
		{ title: 'Data migration', desc: 'We move your current information into the system and review it with you.' },
		{ title: 'Training', desc: 'One session per role, and we stay close during the first weeks.' },
	],
};

export type FighterId = ProductId | 'marketing' | 'custom';

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

const customFighter: Record<Lang, Omit<Fighter, 'id' | 'sprite'>> = {
	es: {
		href: path('custom', 'es'),
		name: 'Software a la medida',
		// Non-breaking space so "medida" never sits alone on a line.
		short: 'A la medida',
		label: 'Hecho por Jangol',
		tagline: 'Si ninguna plataforma encaja, construimos la tuya.',
		moves: [{ title: 'Apps web y móviles' }, { title: 'Integraciones' }, { title: 'Automatización' }, { title: 'Mantenimiento' }],
	},
	en: {
		href: path('custom', 'en'),
		name: 'Custom software',
		short: 'Custom',
		label: 'Built by Jangol',
		tagline: 'If no platform fits, we build yours.',
		moves: [{ title: 'Web and mobile apps' }, { title: 'Integrations' }, { title: 'Automation' }, { title: 'Maintenance' }],
	},
};

/** Hero panels: both platforms, then the two services, marketing and custom software. */
export const fighters = (lang: Lang): Fighter[] => [
	...products[lang].map((p) => ({
		id: p.id,
		href: p.href,
		name: p.name,
		short: p.short,
		tagline: p.tagline,
		moves: p.modules.map((m) => ({ title: m.title })),
		sprite: p.sprite,
		label: 'Jangol for',
	})),
	{ id: 'marketing', sprite: MEGAPHONE, href: path('marketing', lang), ...marketingFighter[lang] },
	{ id: 'custom', sprite: CODE, ...customFighter[lang] },
];
