#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

const srcXmlPaths = [
  path.join(__dirname, '..', 'public', 'wp', 'esee-export.xml'),
  path.join(__dirname, '..', 'public', 'OLD SITE', '-amp.WordPress.2025-09-21.xml')
];

const outDir = path.join(__dirname, '..', 'public', 'wp');
const outJson = path.join(outDir, 'circulars.json');

function stripHtml(html) {
  return (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseItems(obj) {
  const channel = obj?.rss?.channel || obj?.channel || {};
  const items = channel.item || [];
  const list = Array.isArray(items) ? items : [items];

  const results = list.map((it, idx) => {
    const catList = Array.isArray(it.category) ? it.category : (it.category ? [it.category] : []);
    const categories = catList.map((c) => typeof c === 'string' ? c : (c['#text'] || ''));
    const nicenames = catList.map((c) => typeof c === 'string' ? '' : (c['@_nicename'] || ''));
    const isCircular = [...categories, ...nicenames]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes('egkyklio') || String(v).toLowerCase().includes('εγκύκλ'));
    if (!isCircular) return null;

    const wpGmt = it['wp:post_date_gmt'] || '';
    const wpLocal = it['wp:post_date'] || '';
    const pubDate = it.pubDate || '';
    const raw = wpGmt || wpLocal || pubDate;
    let iso = '';
    if (raw) {
      if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(raw)) {
        iso = new Date(raw.replace(' ', 'T') + (wpGmt ? 'Z' : '')).toISOString();
      } else {
        const d = new Date(raw);
        if (!isNaN(d.getTime())) iso = d.toISOString();
      }
    }

    const content = stripHtml(it['content:encoded'] || '');
    const excerptFull = stripHtml(it['excerpt:encoded'] || '');
    const excerpt = excerptFull ? excerptFull.slice(0, 300) : (content.slice(0, 300) + (content.length > 300 ? '…' : ''));

    return {
      id: idx + 1,
      title: it.title || '',
      link: it.link || '',
      date: iso || new Date().toISOString(),
      excerpt,
      content,
      category: 'Εγκύκλιοι ΕΣΕΕ',
      priority: 'medium',
      attachments: []
    };
  }).filter(Boolean).sort((a,b) => new Date(b.date) - new Date(a.date));

  return results;
}

function main() {
  try {
    let xmlPath = srcXmlPaths.find((p) => fs.existsSync(p));
    if (!xmlPath) {
      console.warn('[convert-circulars] XML source not found. Skipping.');
      return;
    }
    const xml = fs.readFileSync(xmlPath, 'utf8');
    const parser = new XMLParser({
      ignoreAttributes: false,
      removeNSPrefix: false,
      attributeNamePrefix: '@_',
      allowBooleanAttributes: true
    });
    const obj = parser.parse(xml);
    const items = parseItems(obj);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outJson, JSON.stringify({ items }, null, 2));
    console.log(`[convert-circulars] Wrote ${items.length} items to ${path.relative(process.cwd(), outJson)}`);
  } catch (e) {
    console.error('[convert-circulars] Failed:', e.message);
    process.exit(0);
  }
}

main();
