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

