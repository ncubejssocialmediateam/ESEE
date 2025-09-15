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

// Mock data generator for development
export const generateMockTaxEvents = () => {
  const currentDate = new Date();
  const events = [];
  
  // Generate events for the next 3 months
  for (let i = 0; i < 30; i++) {
    const eventDate = new Date(currentDate);
    eventDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 90));
    
    const eventTypes = ['deadline', 'payment', 'application', 'form', 'obligation'];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    const titles = {
      deadline: [
        'Υποβολή δήλωσης Φ.Π.Α.',
        'Υποβολή δήλωσης εισοδήματος',
        'Υποβολή δήλωσης Μέσων Πληρωμών',
        'Υποβολή στατιστικής δήλωσης Intrastat',
        'Οριστικοποίηση καταστάσεων προσώπων'
      ],
      payment: [
        'Καταβολή φόρου εισοδήματος',
        'Καταβολή Ειδικής Εισφοράς Διαδικτύου',
        'Πληρωμή χρηματικού ποσού 35% επί κέρδους',
        'Καταβολή ειδικής εισφοράς',
        'Πληρωμή φόρου ακινήτων'
      ],
      application: [
        'Υποβολή αίτησης επικαιροποίησης στοιχείων',
        'Αίτηση απαλλαγής από παρακράτηση φόρου',
        'Υποβολή αίτησης εγγραφής',
        'Αίτηση αναστολής εκτέλεσης',
        'Υποβολή αίτησης επανεξέτασης'
      ],
      form: [
        'Συμπλήρωση ερωτηματολογίου Α.Α.Δ.Ε.',
        'Συμπλήρωση φόρμας φορολογικής δήλωσης',
        'Συμπλήρωση εντύπου εφαρμογής',
        'Συμπλήρωση δήλωσης περιουσιακής κατάστασης',
        'Συμπλήρωση ερωτηματολογίου επιχειρηματικής δραστηριότητας'
      ],
      obligation: [
        'Υποχρεώσεις παραγωγών γάλακτος',
        'Υποχρεώσεις εταιρειών παροχής υπηρεσιών',
        'Υποχρεώσεις αθλητικών σωματείων',
        'Υποχρεώσεις φυσικών προσώπων',
        'Υποχρεώσεις νομικών προσώπων'
      ]
    };
    
    const descriptions = {
      deadline: 'Προθεσμία υποβολής φορολογικής δήλωσης',
      payment: 'Καταβολή φορολογικών υποχρεώσεων',
      application: 'Υποβολή αίτησης σε φορολογική αρχή',
      form: 'Συμπλήρωση φορολογικού εντύπου',
      obligation: 'Εκπλήρωση φορολογικών υποχρεώσεων'
    };
    
    const title = titles[eventType][Math.floor(Math.random() * titles[eventType].length)];
    const description = descriptions[eventType];
    
    events.push({
      id: i + 1,
      title: title,
      date: eventDate,
      description: description,
      url: `https://www.taxheaven.gr/calendar/event/${10000 + i}`,
      type: eventType
    });
  }
  
  return events.sort((a, b) => new Date(a.date) - new Date(b.date));
};
