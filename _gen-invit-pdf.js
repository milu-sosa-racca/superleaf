const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 700, height: 1000, deviceScaleFactor: 2 });
  const file = 'file://' + path.join(__dirname, 'invitacion-mili-10-pijamada.html');
  await page.goto(file, { waitUntil: 'networkidle0', timeout: 60000 });
  // Neutralizar viewport units para impresión: card con alto natural
  await page.addStyleTag({ content: `
    html,body{height:auto!important;background:#060d07!important;}
    body{display:block!important;padding:0!important;}
    .invit{max-height:none!important;margin:0 auto!important;width:460px!important;}
    .escena{max-height:none!important;height:auto!important;}
  `});
  await page.waitForTimeout ? await page.waitForTimeout(1500) : await new Promise(r=>setTimeout(r,1500));
  const box = await page.$eval('.invit', el => {
    const r = el.getBoundingClientRect();
    return { w: Math.ceil(r.width), h: Math.ceil(r.height) };
  });
  const out = path.join(__dirname, 'invitacion-mili-10-pijamada.pdf');
  await page.pdf({
    path: out,
    printBackground: true,
    width:  box.w + 'px',
    height: box.h + 'px',
    pageRanges: '1',
    margin: { top:'0', bottom:'0', left:'0', right:'0' }
  });
  await browser.close();
  console.log('OK', out, JSON.stringify(box));
})().catch(e=>{console.error('ERR', e.message); process.exit(1);});
