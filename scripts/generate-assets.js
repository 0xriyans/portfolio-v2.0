import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FCF1D0" />
  <rect x="48" y="48" width="1104" height="534" rx="28" fill="#FFFFFF" stroke="#010736" stroke-opacity="0.12" stroke-width="2" />
  <rect x="96" y="102" width="218" height="38" rx="19" fill="#010736" />
  <text x="205" y="127" text-anchor="middle" fill="#FCF1D0" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="600">Open for Freelance</text>
  <text x="96" y="232" fill="#010736" font-family="Inter, Arial, sans-serif" font-size="64" font-weight="700">Riyan Sugiarto</text>
  <text x="96" y="294" fill="#22396F" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="600">Software Engineer (backend-first, end-to-end)</text>
  <text x="96" y="348" fill="#22396F" font-family="Inter, Arial, sans-serif" font-size="24">Jakarta, Indonesia · 6+ Years · Java · Spring Boot · Quarkus · Kafka</text>
  <text x="96" y="514" fill="#010736" fill-opacity="0.75" font-family="Inter, Arial, sans-serif" font-size="22">riyans.tech  ·  ryansgrt23@gmail.com  ·  github.com/0xriyans</text>
</svg>
`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#FCF1D0" />
  <rect x="24" y="24" width="464" height="464" rx="92" fill="#010736" />
  <text x="256" y="316" text-anchor="middle" fill="#FCF1D0" font-family="Inter, Arial, sans-serif" font-size="214" font-weight="700">RS</text>
</svg>
`;

async function run() {
  const pub = path.join(__dirname, '..', 'public');
  fs.mkdirSync(pub, { recursive: true });
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(pub, 'og.png'));
  await sharp(Buffer.from(ogSvg)).resize(2400, 1260).png().toFile(path.join(pub, 'og@2x.png'));
  fs.writeFileSync(path.join(pub, 'favicon.svg'), faviconSvg);
  await sharp(Buffer.from(faviconSvg)).png().toFile(path.join(pub, 'favicon.png'));
  console.log('Generated Light Cream/Navy palette OG and favicon assets into public/.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
