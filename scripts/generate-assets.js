const path = require('path');
const sharp = require('sharp');

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#010736" />
  <rect x="48" y="48" width="1104" height="534" rx="28" fill="#0D1C42" stroke="#22396F" stroke-width="3" />
  <rect x="96" y="102" width="218" height="38" rx="19" fill="#22396F" />
  <text x="205" y="127" text-anchor="middle" fill="#FCF1D0" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="600">Open for Freelance</text>
  <text x="96" y="232" fill="#FCF1D0" font-family="Inter, Arial, sans-serif" font-size="64" font-weight="700">Riyan Sugiarto</text>
  <text x="96" y="294" fill="#FCF1D0" fill-opacity="0.88" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="500">Software Engineer (backend-first, end-to-end)</text>
  <text x="96" y="346" fill="#FCF1D0" fill-opacity="0.68" font-family="Inter, Arial, sans-serif" font-size="24">Jakarta, Indonesia · 6+ Years Experience · Java · Spring Boot · Quarkus · Kafka</text>
  <text x="96" y="514" fill="#FCF1D0" fill-opacity="0.72" font-family="Inter, Arial, sans-serif" font-size="22">riyans.tech  ·  ryansgrt23@gmail.com  ·  github.com/0xriyans</text>
</svg>
`;

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#010736" />
  <rect x="28" y="28" width="456" height="456" rx="92" fill="#0D1C42" stroke="#22396F" stroke-width="14" />
  <text x="256" y="314" text-anchor="middle" fill="#FCF1D0" font-family="Inter, Arial, sans-serif" font-size="210" font-weight="700">RS</text>
</svg>
`;

async function run() {
  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(path.join(__dirname, '..', 'static', 'og.png'));
  await sharp(Buffer.from(ogSvg))
    .resize(2400, 1260)
    .png()
    .toFile(path.join(__dirname, '..', 'static', 'og@2x.png'));
  await sharp(Buffer.from(iconSvg))
    .png()
    .toFile(path.join(__dirname, '..', 'src', 'images', 'logo.png'));
  console.log('Generated palette OG and favicon assets.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
