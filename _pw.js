const { chromium } = require('playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.setViewportSize({ width: 700, height: 1000 });
  await page.goto('file://' + path.join(process.cwd(), 'invitacion-mili-10-pijamada.html'), { waitUntil: 'networkidle', timeout: 60000 });
  await page.addStyleTag({ content: `
    html,body{height:auto!important;background:#060d07!important;}
    body{display:block!important;padding:0!important;}
    .invit{max-height:none!important;margin:0 auto!important;width:460px!important;}
    .escena{max-height:none!important;height:auto!important;}
  `});
  await page.waitForTimeout(1500);
  const box = await page.$eval('.invit', el => { const r = el.getBoundingClientRect(); return { w: Math.ceil(r.width), h: Math.ceil(r.height) }; });
  await page.pdf({ path: path.join(process.cwd(),'invitacion-mili-10-pijamada.pdf'), printBackground: true, width: box.w+'px', height: box.h+'px', margin:{top:'0',bottom:'0',left:'0',right:'0'} });
  await page.screenshot({ path: path.join(process.cwd(),'invitacion-mili-10-pijamada.png'), clip: { x: (700-box.w)/2, y: 0, width: box.w, height: box.h } });
  await browser.close();
  console.log('OK', JSON.stringify(box));
})().catch(e=>{console.error('ERR', e.message); process.exit(1);});
