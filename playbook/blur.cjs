// node playbook/blur.cjs: blurs applicants' names, photos, emails, pay and source in the
// applicant-pipeline screenshot, so the PDF can show the volume without showing who.
// Regions are fractions of the image (the screenshot is 2000 px wide). PW=<playwright path>.
const fs = require('fs'), path = require('path')
const { chromium } = require(process.env.PW)

const SRC = path.join(__dirname, 'assets', 'applicants-raw.webp')
const OUT = path.join(__dirname, 'assets', 'applicants-blurred.png')
// [x0, x1] as fractions of width; every one runs from the header row to the bottom.
const COLUMNS = [
  [0.028, 0.168], // sales rep: photo, name, email
  [0.500, 0.572], // OTE / mo
  [0.770, 0.850], // source
]
const TOP = 0.255 // below the table header

;(async () => {
  const b = await chromium.launch(); const p = await b.newPage()
  const data = 'data:image/webp;base64,' + fs.readFileSync(SRC).toString('base64')
  const png = await p.evaluate(async ({ data, COLUMNS, TOP }) => {
    const img = new Image(); img.src = data; await img.decode()
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
    const x = c.getContext('2d'); x.drawImage(img, 0, 0)
    for (const [a, z] of COLUMNS) {
      const sx = Math.round(a * img.width), sw = Math.round((z - a) * img.width)
      const sy = Math.round(TOP * img.height), sh = img.height - sy
      // Pixelate hard, then blur, so nothing in the region can be read back.
      const t = document.createElement('canvas'); t.width = Math.max(1, Math.round(sw / 14)); t.height = Math.max(1, Math.round(sh / 14))
      t.getContext('2d').drawImage(c, sx, sy, sw, sh, 0, 0, t.width, t.height)
      x.imageSmoothingEnabled = true
      x.filter = 'blur(6px)'
      x.drawImage(t, 0, 0, t.width, t.height, sx, sy, sw, sh)
      x.filter = 'none'
    }
    // Drop the half-cut last row, where the blur fades at the image edge.
    const keep = Math.round(img.height * 0.975)
    const out = document.createElement('canvas'); out.width = img.width; out.height = keep
    out.getContext('2d').drawImage(c, 0, 0)
    return out.toDataURL('image/png')
  }, { data, COLUMNS, TOP })
  fs.writeFileSync(OUT, Buffer.from(png.split(',')[1], 'base64'))
  console.log('wrote', OUT)
  await b.close()
})()
