// Raster icons from public/favicon.svg: run `pnpm icons` after changing the favicon.
import sharp from 'sharp';

const svg = 'public/favicon.svg';
const sizes = [
	['public/logo.png', 512],
	['public/apple-touch-icon.png', 180],
	['public/favicon-32.png', 32],
];
for (const [out, size] of sizes) {
	await sharp(svg, { density: 1200 }).resize(size, size).png({ compressionLevel: 9, palette: true }).toFile(out);
	console.log(`${out} ${size}x${size}`);
}
