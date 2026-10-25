/**
 * Legal and contact details shown in the footer, the legal pages and the structured data.
 * Values that start with "[POR COMPLETAR" are placeholders: fill them in before publishing.
 * The build prints a warning for each one that is still pending.
 */
export const company = {
	brand: 'Jangol',
	legalName: '[POR COMPLETAR: razón social, ej. Jangol S.A.S.]',
	nit: '[POR COMPLETAR: NIT]',
	address: '[POR COMPLETAR: dirección]',
	city: '[POR COMPLETAR: ciudad]',
	region: '[POR COMPLETAR: departamento]',
	country: 'Colombia',
	countryCode: 'CO',
	/** Shown as written, e.g. "+57 300 000 0000". */
	phone: '[POR COMPLETAR: teléfono]',
	/** Digits only with country code, e.g. "573000000000", for wa.me links. */
	whatsapp: '[POR COMPLETAR: WhatsApp]',
	/** Needs MX records on jangol.com.co (Cloudflare Email Routing, Google Workspace or similar). */
	email: 'hola@jangol.com.co',
	foundingYear: '[POR COMPLETAR: año de fundación]',
	founders: ['[POR COMPLETAR: nombre de fundador o fundadora]'],
	/** Public profiles (LinkedIn, Instagram, etc.) for schema.org sameAs. */
	sameAs: [] as string[],
	/** Public access key from web3forms.com. It is safe to ship in the HTML. */
	web3formsKey: '[POR COMPLETAR: access key de Web3Forms]',
	/** Date the legal pages were last reviewed (YYYY-MM-DD). */
	legalUpdated: '2026-10-24',
};

export const isSet = (value: string) => !value.startsWith('[POR COMPLETAR');

export const whatsappUrl = isSet(company.whatsapp) ? `https://wa.me/${company.whatsapp}` : undefined;

const pending = Object.entries(company)
	.flatMap(([k, v]) => (Array.isArray(v) ? v.map((x) => [k, x] as const) : [[k, v] as const]))
	.filter(([, v]) => typeof v === 'string' && !isSet(v))
	.map(([k]) => k);

if (pending.length && import.meta.env.SSR) {
	console.warn(`\n[jangol] Datos de empresa por completar en src/data/company.ts: ${[...new Set(pending)].join(', ')}\n`);
}
