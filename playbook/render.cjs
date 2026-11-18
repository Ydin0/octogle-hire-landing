// node playbook/render.cjs: prints one-rep-playbook.html to public/playbook/ as a UK and a US PDF,
// plus a cover image for the page. PW=<path to the playwright package>.
const fs = require('fs'), path = require('path')
const { chromium } = require(process.env.PW)

const BOOK = 'https://app.leadey.ai/book/introduction-call-with-connor-6ibd7u'
const VARIANTS = {
  uk: { LANG: 'en-GB', MARKET: 'UK', PRICE: '£2,000', TPS: ' UK numbers should be screened against TPS and CTPS.' },
  us: { LANG: 'en-US', MARKET: 'US', PRICE: '$2,500', TPS: '' },
}

;(async () => {
  const src = fs.readFileSync(path.join(__dirname, 'one-rep-playbook.html'), 'utf8')
  const out = path.join(__dirname, '..', 'public', 'playbook')
  const b = await chromium.launch()
  for (const [k, v] of Object.entries(VARIANTS)) {
    let html = src
    for (const [key, val] of Object.entries({ ...v, BOOK, BOOK_SHORT: BOOK.replace('https://', '') })) html = html.split(`{{${key}}}`).join(val)
    if (k === 'us') html = html.replace(/dialling/g, 'dialing')
    const p = await b.newPage()
    await p.setContent(html, { waitUntil: 'networkidle' })
    await p.evaluate(() => document.fonts.ready)
    await p.pdf({ path: path.join(out, `one-rep-meeting-machine-${k}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true })
    await p.setViewportSize({ width: 794, height: 1123 })
    await (await p.$$('.page'))[0].screenshot({ path: path.join(out, `cover-${k}.png`) })
    const over = await p.$$eval('.page', (ps) => ps.map((x, i) => [i + 1, x.scrollHeight > x.clientHeight + 1]).filter((x) => x[1]))
    console.log(k, 'pages', (await p.$$('.page')).length, 'overflowing', JSON.stringify(over))
    await p.close()
  }
  await b.close()
})()
