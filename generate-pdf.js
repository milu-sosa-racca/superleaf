const { chromium } = require('playwright-core');
const path = require('path');

(async () => {
  console.log('Iniciando Chromium...');
  const browser = await chromium.launch({
    headless: true,
    channel: undefined  // usa el Chromium de Playwright
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 900 });

  console.log('Abriendo el libro...');
  await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded', timeout: 30000 });
  console.log('Título:', await page.title());

  // Esperar fonts
  await page.waitForTimeout(3000);

  console.log('Generando PDF...');
  const outputPath = path.join(__dirname, 'superleaf.pdf');

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', bottom: '12mm', left: '10mm', right: '10mm' }
  });

  await browser.close();
  console.log('✓ PDF generado: ' + outputPath);
})();
