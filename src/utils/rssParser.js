// RSS Parser utility for Taxheaven calendar
export const parseRSSFeed = (xmlText) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    const items = xmlDoc.querySelectorAll('item');
    const events = [];
    
    items.forEach((item, index) => {
      const title = item.querySelector('title')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      
      // Parse the date
      let eventDate = new Date();
      if (pubDate) {
        eventDate = new Date(pubDate);
      }
      
      // Determine event type based on title content
      let eventType = 'deadline';
      if (title.includes('πληρωμή') || title.includes('καταβολή')) {
        eventType = 'payment';
      } else if (title.includes('αίτηση') || title.includes('επικαιροποίηση')) {
        eventType = 'application';
      } else if (title.includes('ερωτηματολόγιο') || title.includes('φόρμα')) {
        eventType = 'form';
      } else if (title.includes('υποχρέωση') || title.includes('υποχρεώσεις')) {
        eventType = 'obligation';
      }
      
      events.push({
        id: index + 1,
        title: title,
        date: eventDate,
        description: description,
        url: link,
        type: eventType
      });
    });
    
    return events;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
};

// Alternative method using a CORS proxy for development
export const fetchRSSFeed = async (rssUrl) => {
  try {
    // For development, we'll use a CORS proxy
    // In production, you should implement this on your backend
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (data.contents) {
      return parseRSSFeed(data.contents);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
};

// Parse WordPress WXR (export) file to a simplified list of circulars
export const parseWordPressExport = (xmlText) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    const items = Array.from(xmlDoc.getElementsByTagName('item'));
    const circulars = items
      .map((item, index) => {
        const qs = (sel) => item.querySelector(sel)?.textContent?.trim() || '';

        const title = qs('title');
        const link = qs('link');
        const pubDate = qs('pubDate');
        const wpPostDateGmt = qs('wp\\:post_date_gmt');
        const wpPostDate = qs('wp\\:post_date');
        const contentHtml = qs('content\\:encoded');
        const excerptHtml = qs('excerpt\\:encoded');
        const categoryNodes = Array.from(item.getElementsByTagName('category'));
        const categories = categoryNodes
          .map((c) => c.textContent?.trim())
          .filter(Boolean);

        // Detect circulars by slug or text (case-insensitive)
        const isCircular = categoryNodes.some((n) => {
          const slug = (n.getAttribute('nicename') || '').toLowerCase();
          const text = (n.textContent || '').toLowerCase();
          return slug.includes('egkyklio') || text.includes('εγκύκλ');
        });
        if (!isCircular) return null;

        // Prefer GMT date, then post_date, then pubDate
        const rawDate = wpPostDateGmt || wpPostDate || pubDate;
        let iso = '';
        if (rawDate) {
          // Normalize to ISO when only "YYYY-MM-DD HH:mm:ss" is provided
          if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(rawDate)) {
            // Treat as UTC if GMT provided, else as local but serialize
            iso = new Date(rawDate.replace(' ', 'T') + (wpPostDateGmt ? 'Z' : '')).toISOString();
          } else {
            const d = new Date(rawDate);
            if (!isNaN(d.getTime())) iso = d.toISOString();
          }
        }
        const dateIso = iso || new Date().toISOString();

        // Strip HTML (simple)
        const stripHtml = (html) => (html || '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        const textContent = stripHtml(contentHtml);
        const excerpt = (excerptHtml && excerptHtml.length > 0)
          ? stripHtml(excerptHtml)
          : textContent.substring(0, 300) + (textContent.length > 300 ? '…' : '');

        return {
          id: index + 1,
          title,
          link,
          date: dateIso,
          excerpt,
          content: textContent,
          category: 'Εγκύκλιοι ΕΣΕΕ',
          priority: 'medium',
          attachments: []
        };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return circulars;
  } catch (error) {
    console.error('Error parsing WordPress export:', error);
    return [];
  }
};

