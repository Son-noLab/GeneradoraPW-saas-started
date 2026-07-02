// Reusable image-prep pipeline (sharp): resize + compress a directory of
// source photos into public/img/, optionally slugifying filenames.
//
// Usage:
//   node scripts/optimize-images.mjs <inputDir> <outputDir> [--max-width=2000] [--quality=82] [--format=jpg|webp] [--slugify]

import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

function parseArgs(argv) {
  const flags = {}
  const positional = []
  for (const arg of argv) {
    if (arg.startsWith('--')) {
      const [key, val] = arg.slice(2).split('=')
      flags[key] = val ?? true
    } else {
      positional.push(arg)
    }
  }
  return { flags, positional }
}

async function resizeAndCompress(inputPath, outputPath, { maxWidth = 2000, quality = 82, format = 'jpg' } = {}) {
  const pipeline = sharp(inputPath).rotate().resize({ width: maxWidth, withoutEnlargement: true }) // rotate() auto-orients from EXIF
  if (format === 'webp') pipeline.webp({ quality })
  else pipeline.jpeg({ quality, mozjpeg: true })
  await pipeline.toFile(outputPath)
}

function slugify(name) {
  return name
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function main() {
  const { flags, positional } = parseArgs(process.argv.slice(2))
  const [inputDir, outputDir] = positional

  if (!inputDir || !outputDir) {
    console.error('Usage: node scripts/optimize-images.mjs <inputDir> <outputDir> [--max-width=2000] [--quality=82] [--format=jpg|webp] [--slugify]')
    process.exit(1)
  }

  await fs.mkdir(outputDir, { recursive: true })
  const files = (await fs.readdir(inputDir)).filter(f => /\.(jpg|jpeg|png)$/i.test(f))

  let ok = 0
  let fail = 0
  for (const file of files) {
    const inputPath = path.join(inputDir, file)
    const slug = flags.slugify ? slugify(file) : path.parse(file).name
    const ext = flags.format === 'webp' ? 'webp' : 'jpg'
    const outputPath = path.join(outputDir, `${slug}.${ext}`)
    try {
      await resizeAndCompress(inputPath, outputPath, {
        maxWidth: flags['max-width'] ? Number(flags['max-width']) : undefined,
        quality: flags.quality ? Number(flags.quality) : undefined,
        format: flags.format,
      })
      const { size } = await fs.stat(outputPath)
      console.log(`✅ ${file} → ${path.basename(outputPath)} (${(size / 1024).toFixed(0)} KB)`)
      ok++
    } catch (err) {
      console.error(`❌ ${file}: ${err.message}`)
      fail++
    }
  }
  console.log(`\n${ok} OK, ${fail} failed, ${files.length} total`)
  process.exit(fail ? 1 : 0)
}

main()
