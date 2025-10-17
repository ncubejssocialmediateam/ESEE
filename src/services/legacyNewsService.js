// Lightweight client-side fetcher for legacy WordPress posts (old2025.esee.gr)
// Uses multiple CORS-friendly strategies to retrieve JSON reliably from the browser.

const WP_BASE = 'https://old2025.esee.gr/web/wp-json/wp/v2/posts?_embed&status=publish&per_page=';

function stripHtml(html) {
  return (html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeEntities(text) {
  if (!text) return '';
  // Use browser to decode HTML entities safely
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

function normalizeWpPosts(posts) {
  return (posts || [])
    .filter((p) => {
      // Filter out the specific post about "Ημέρα Ελληνικού Εμπορίου"
      const title = p?.title?.rendered || '';
      const content = p?.content?.rendered || '';
      const excerpt = p?.excerpt?.rendered || '';
      
      // Check if this is the post we want to remove
      const isTargetPost = 
        title.includes('Ημέρα Ελληνικού Εμπορίου') ||
        title.includes('Δήλωση επίτιμου Προέδρου ΕΣΕΕ Βασίλη Κορκίδη') ||
        content.includes('Ημέρα Ελληνικού Εμπορίου') ||
        excerpt.includes('Ημέρα Ελληνικού Εμπορίου');
      
      return !isTargetPost;
    })
    .map((p) => {
      const featured = p?._embedded?.['wp:featuredmedia']?.[0];
      const term = p?._embedded?.['wp:term']?.[0]?.[0]; // first category if present

      return {
        id: `legacy-${p.id}`,
        title: decodeEntities(stripHtml(p?.title?.rendered || '')),
        slug: p?.slug || `legacy-${p.id}`,
        excerpt: decodeEntities(stripHtml(p?.excerpt?.rendered || '')),
        content: p?.content?.rendered || '',
        createdAt: p?.date_gmt || p?.date || new Date().toISOString(),
        featuredImage: featured?.source_url ? { url: featured.source_url } : null,
        category: term ? { title: term.name, slug: term.slug } : null,
        source: 'old2025',
        url: p?.link || null
      };
    });
}

async function tryFetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

export async function fetchLegacyNews(limit = 20) {
  const target = `${WP_BASE}${encodeURIComponent(String(limit))}`;

  const strategies = [
    // 1) AllOrigins raw passthrough (best for JSON)
    async () => {
      const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`;
      const json = await tryFetchJson(url);
      return normalizeWpPosts(json);
    },
    // 2) ThingProxy freeboard
    async () => {
      const url = `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(target)}`;
      const json = await tryFetchJson(url);
      return normalizeWpPosts(json);
    },
    // 3) isomorphic-git CORS proxy
    async () => {
      const url = `https://cors.isomorphic-git.org/${target}`;
      const json = await tryFetchJson(url);
      return normalizeWpPosts(json);
    }
  ];

  for (const attempt of strategies) {
    try {
      const docs = await attempt();
      if (Array.isArray(docs)) return docs;
    } catch (err) {
      // continue to next strategy
      // console.warn('[legacyNews] strategy failed:', err?.message || err);
    }
  }

  return [];
}

export default { fetchLegacyNews };


