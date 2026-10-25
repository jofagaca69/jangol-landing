import type { APIRoute, GetStaticPaths } from 'astro';
import { ogPages, renderOg, type OgPage } from '../../lib/og';

export const getStaticPaths = (async () =>
	(await ogPages()).map((page) => ({ params: { slug: page.slug }, props: page }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
	new Response(new Uint8Array(await renderOg(props as OgPage)), { headers: { 'Content-Type': 'image/png' } });
