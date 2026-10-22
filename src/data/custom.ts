/** Content for /a-la-medida. */

export const services = [
	{
		title: 'Aplicaciones web y móviles',
		desc: 'Herramientas internas para tu equipo, portales para tus clientes o un producto nuevo que quieres lanzar.',
		examples: ['Portal de clientes con pedidos y estado de cuenta', 'App de campo para registrar visitas', 'Panel interno de operaciones'],
	},
	{
		title: 'Integraciones',
		desc: 'Conectamos tu software con pasarelas de pago, facturación electrónica, CRM o los sistemas que ya usas, para que los datos no se copien a mano.',
		examples: ['Ventas de la tienda en línea que llegan a contabilidad', 'Facturación electrónica desde tu sistema', 'Sincronización con tu CRM'],
	},
	{
		title: 'Automatización',
		desc: 'Los procesos que hoy dependen de hojas de cálculo y correos pasan a un sistema que los registra y avisa a quien tiene que actuar.',
		examples: ['Aprobaciones de compras con historial', 'Reportes que se generan solos cada semana', 'Alertas cuando un indicador se sale de rango'],
	},
	{
		title: 'Mantenimiento y evolución',
		desc: 'Seguimos con el producto después del lanzamiento: corregimos, actualizamos dependencias y agregamos lo que el negocio vaya pidiendo.',
		examples: ['Soporte con tiempos de respuesta acordados', 'Mejoras planificadas por trimestre', 'Monitoreo y respaldos'],
	},
];

/** Helps a visitor decide between a platform and a custom build. */
export const fit = {
	platform: {
		title: 'Te conviene una plataforma si',
		items: [
			'Tienes un gimnasio, un colegio o una academia.',
			'Lo que necesitas es parecido a lo que necesitan otros negocios de tu rubro.',
			'Quieres empezar a usarla en semanas.',
		],
	},
	custom: {
		title: 'Te conviene construir a la medida si',
		items: [
			'Tu proceso es la ventaja de tu negocio y no quieres adaptarlo a un software genérico.',
			'Necesitas conectar varios sistemas que hoy no se hablan.',
			'Quieres lanzar un producto digital propio.',
		],
	},
};

export const customFaqs = [
	{
		q: '¿Cuánto cuesta un proyecto a la medida?',
		a: 'Depende del alcance. Después de la primera conversación te enviamos una propuesta con lo que construiríamos primero, el plazo y el costo.',
	},
	{
		q: '¿De quién es el código?',
		a: 'Lo acordamos en la propuesta. Lo habitual es que el código y los datos sean tuyos.',
	},
	{
		q: '¿Pueden continuar un proyecto que empezó otro equipo?',
		a: 'Sí. Primero revisamos el código y te contamos qué encontramos antes de comprometer un plan.',
	},
	{
		q: '¿Cómo veo el avance?',
		a: 'Cada dos semanas te entregamos algo que puedes usar en un entorno de prueba, y lo revisamos juntos.',
	},
];
