// node playbook/render.cjs: prints one-rep-playbook.html to public/playbook/ as a UK and a US PDF,
// plus a cover image for the page. PW=<path to the playwright package>.
// {{KEY}} is filled per market; {{IMG:file}} embeds playbook/assets/<file> as a data URI.
const fs = require('fs'), path = require('path')
const { chromium } = require(process.env.PW)

const BOOK = 'https://app.leadey.ai/book/octogle-hire-introduction-with-c-n6ggx5'
// Worked examples (page 3): revenue minus the rep minus delivery cost. Cost per meeting is the
// rep's monthly price over 20 and 10 meetings.
const VARIANTS = {
  uk: { LANG: 'en-GB', MARKET: 'UK', C: '£', PRICE: '£2,000', E1_PROFIT: '£6,500', E2_PROFIT: '£34,000', CPM_LOW: '£100', CPM_HIGH: '£200', LEADEY_PRICE: '£49' },
  us: { LANG: 'en-US', MARKET: 'US', C: '$', PRICE: '$2,500', E1_PROFIT: '$6,000', E2_PROFIT: '$33,500', CPM_LOW: '$125', CPM_HIGH: '$250', LEADEY_PRICE: '$59' },
}
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' }

;(async () => {
  let src = fs.readFileSync(path.join(__dirname, 'one-rep-playbook.html'), 'utf8')
  src = src.replace(/\{\{IMG:([^}]+)\}\}/g, (_, f) => {
    const file = path.join(__dirname, 'assets', f)
    return `data:${MIME[path.extname(f)]};base64,${fs.readFileSync(file).toString('base64')}`
  })
  const out = path.join(__dirname, '..', 'public', 'playbook')
  const b = await chromium.launch()
  for (const [k, v] of Object.entries(VARIANTS)) {
    let html = src
    for (const [key, val] of Object.entries({ ...v, BOOK, BOOK_SHORT: BOOK.replace('https://', '') })) html = html.split(`{{${key}}}`).join(val)
    const left = html.match(/\{\{[A-Z_]+\}\}/g)
    if (left) throw new Error(`${k}: unfilled ${[...new Set(left)].join(', ')}`)
    const p = await b.newPage()
    await p.setContent(html, { waitUntil: 'networkidle' })
    await p.evaluate(() => document.fonts.ready)
    await p.pdf({ path: path.join(out, `one-rep-meeting-machine-${k}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true })
    await p.setViewportSize({ width: 794, height: 1123 })
    const pages = await p.$$('.page')
    await pages[0].screenshot({ path: path.join(out, `cover-${k}.png`) })
    if (process.env.PREVIEW) for (let i = 0; i < pages.length; i++) await pages[i].screenshot({ path: path.join(process.env.PREVIEW, `${k}-p${i + 1}.png`) })
    const over = await p.$$eval('.page', (ps) => ps.map((x, i) => [i + 1, x.scrollHeight > x.clientHeight + 1]).filter((x) => x[1]))
    console.log(k, 'pages', pages.length, 'overflowing', JSON.stringify(over))
    await p.close()
  }
  await b.close()
})()
