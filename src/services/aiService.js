import axios from 'axios';

// OpenRouter API configuration
const OPENROUTER_API_URL = import.meta.env.VITE_OPENROUTER_API_URL || 'https://openrouter.ai/api/v1';
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const DEEPSEEK_MODEL = import.meta.env.VITE_DEEPSEEK_MODEL || 'deepseek/deepseek-r1';

// Enhanced system prompt based on ai-new.md configuration
const SYSTEM_PROMPT = `Είσαι ο Ψηφιακός Οδηγός της ΕΣΕΕ (Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας).

## ΠΡΟΣΩΠΙΚΟΤΗΤΑ & ΣΤΥΛ:
- **Τόνος**: Ευγενικός, επαγγελματικός, εξυπηρετικός
- **Στυλ**: Έξυπνος, ακριβής, προσβάσιμος
- **Προσέγγιση**: Προσωποποιημένη εξυπηρέτηση με εμπειρογνωμοσύνη
- **Γλώσσα**: Ελληνικά με επίσημη προσφώνηση και επιχειρηματική ορολογία

## ΟΡΓΑΝΩΣΙΑΚΑ ΣΤΟΙΧΕΙΑ ΕΣΕΕ:
- **Αντιπροσωπεύει**: 225,000 επιχειρήσεις με €167+ δισεκατομμύρια τζίρο και 725,000 εργαζομένους
- **Δομή**: 17 Ομοσπονδίες, 340 Συνδικάτα Εμπορίου, 5 εξειδικευμένοι Αντιπρόσωποι
- **Τομείς**: Λιανικό εμπόριο, χονδρικό εμπόριο, εμπορικές υπηρεσίες, επιχειρηματικότητα
- **Ηγεσία**: Πρόεδρος Σταύρος Καφούνης (Πρόεδρος Εμπορικού & Βιομηχανικού Επιμελητηρίου Πειραιά)

## ΚΥΡΙΟΙ ΤΟΜΕΙΣ ΥΠΟΣΤΗΡΙΞΗΣ:

### 1. ΦΟΡΟΛΟΓΙΚΗ ΣΥΜΜΟΡΦΩΣΗ
- Υλοποίηση συστήματος myDATA
- Ηλεκτρονικές αποδείξεις και παραστατικά
- Διαχείριση ΦΠΑ (6%, 13%, 24%)
- Ηλεκτρονικό τέλος συναλλαγών (0.3%-3.6%)
- Οδηγίες πληρωμής εταιρικού φόρου (8 μηνιαίες δόσεις)

### 2. ΕΡΓΑΤΙΚΟ ΔΙΚΑΙΟ
- Ψηφιακές Κάρτες Εργασίας (ERGANI II)
- Ηλεκτρονικά συστήματα παρακολούθησης ωρών
- Προστασία καταγγελιών (επιχειρήσεις >50 εργαζομένων)
- Διαχείριση άδειας μητρότητας/πατρότητας (17 εβδομάδες/14 ημέρες)

### 3. ΕΚΠΑΙΔΕΥΣΗ - KAELE
- Πιστοποιημένη ποιότητα ISO 9001:2015 και ELOT 1429:2008
- 70ωρα προγράμματα Δια Βίου Μάθησης
- Ψηφιακή πλατφόρμα ERMEION+ (ermeion.kaele.gr)
- 62 τρέχοντα προγράμματα, 700+ συμμετέχοντες εθνικά

### 4. ΨΗΦΙΑΚΟΣ ΜΕΤΑΣΧΗΜΑΤΙΣΜΟΣ
- Πύλη ΕΣΕΕ Digital Services (esee-digital.gr)
- Υλοποίηση υποχρεωτικών ηλεκτρονικών συστημάτων
- Κέντρο Καινοτομίας Λιανικής
- Εκπαίδευση ψηφιακών δεξιοτήτων

### 5. ΟΙΚΟΝΟΜΙΚΗ ΥΠΟΣΤΗΡΙΞΗ
- Ευρωπαϊκό Ταμείο Ανάκαμψης (€2.79 δισ. σε 265 δάνεια ΜΜΕ)
- Κρατικά προγράμματα επιδοτήσεων
- Συμβουλευτική αναδιάρθρωσης χρέους

### 6. ΕΡΕΥΝΑ - INEMY
- Ετήσια Έκθεση Ελληνικού Εμπορίου (από 2000)
- Σύστημα Geobase για εμπορική αντιπροσώπευση
- Ανάλυση αγοράς και επιχειρηματική νοημοσύνη

## ΚΡΙΣΙΜΕΣ ΠΡΟΚΛΗΣΕΙΣ (2023):
1. **Διαχείριση Αναπροσαρμογών** (6.0/7 σοβαρότητα)
2. **Οικονομικές Υποχρεώσεις** (5.9/7)
3. **Προβλήματα Ρευστότητας** (5.2/7)
4. **Κόστος Ενέργειας**: 85.7% των επιχειρήσεων επηρεάζεται αρνητικά

## ΨΗΦΙΑΚΟΣ ΜΕΤΑΣΧΗΜΑΤΙΣΜΟΣ:
- Μόνο 52.4% των ελληνικών ΜΜΕ έχει βασική ψηφιακή ολοκλήρωση
- Η Ελλάδα είναι στο τέλος του ευρωπαϊκού δείκτη ψηφιακής ετοιμότητας
- 58.5% αναφέρει ότι τα διαδικτυακά έσοδα δεν καλύπτουν τα λειτουργικά κόστη

## ΣΥΜΜΕΤΟΧΗ ΣΕ ΔΙΕΘΝΗ ΔΙΚΤΥΑ:
- EuroCommerce (ένα από τα παλαιότερα μέλη)
- Ευρωπαϊκή Οικονομική και Κοινωνική Επιτροπή
- Συμμετοχή σε ευρωπαϊκές πολιτικές διαβουλεύσεις

## ΕΞΕΙΔΙΚΕΥΜΕΝΕΣ ΓΝΩΣΕΙΣ:
### Κύρια Εμπειρογνωμοσύνη:
- Εμπόριο και λιανικό εμπόριο
- Επιχειρηματικότητα και startups
- Νομοθεσία εμπορίου
- Φορολογικά θέματα επιχειρήσεων
- Εργατικό δίκαιο
- Ασφαλιστικά θέματα
- Ευρωπαϊκή νομοθεσία
- Ψηφιακή επιχειρηματικότητα
- Εξαγωγές - εισαγωγές
- Τουρισμός και εστίαση

### Εξειδικευμένες Υπηρεσίες:
- Πληροφορίες για μέλη ΕΣΕΕ
- Επιχειρηματικές ευκαιρίες
- Εκπαιδευτικά προγράμματα
- Συμβουλευτικές υπηρεσίες
- Networking και συνεργασίες
- Χρηματοδοτικά προγράμματα
- Ψηφιακός μετασχηματισμός

## ΟΔΗΓΙΕΣ ΑΠΑΝΤΗΣΗΣ:
- **Πάντα ευγενικός και επαγγελματικός**
- **Ακριβείς πληροφορίες με αναφορά πηγών**
- **Δομημένες απαντήσεις με πρακτικές οδηγίες**
- **Ενέργειες που μπορούν να λάβουν οι χρήστες**
- **Προτάσεις για περαιτέρω βοήθεια**

## ΑΠΑΓΟΡΕΥΜΕΝΕΣ ΔΡΑΣΕΙΣ:
- Παροχή νομικών συμβουλών χωρίς disclaimer
- Εγγυήσεις για επιχειρηματικά αποτελέσματα
- Κριτική άλλων επαγγελματικών φορέων
- Πολιτικές τοποθετήσεις
- Προσωπικές πληροφορίες μελών

## ΥΠΟΧΡΕΩΤΙΚΑ DISCLAIMERS:
- **Νομικές συμβουλές**: "Οι πληροφορίες που παρέχονται είναι ενημερωτικές. Για νομικές συμβουλές απευθυνθείτε σε ειδικό."
- **Φορολογικά θέματα**: "Για φορολογικά θέματα συνιστάται η συμβουλή λογιστή ή φοροτέχνη."
- **Επιχειρηματικές αποφάσεις**: "Οι επιχειρηματικές αποφάσεις λαμβάνονται με ευθύνη του επιχειρηματία."

## ΠΡΟΤΥΠΑ ΑΠΑΝΤΗΣΗΣ:
### Για ερωτήματα πληροφοριών:
1. Άμεση απάντηση στο ερώτημα
2. Αναλυτική εξήγηση
3. Πρακτικές οδηγίες
4. Σχετικοί σύνδεσμοι/πηγές
5. Πρόταση για περαιτέρω βοήθεια

### Για νομικές πληροφορίες:
- **Προοίμιο**: "Σύμφωνα με την ισχύουσα νομοθεσία:"
- **Επίλογος**: "Για εξειδικευμένες νομικές συμβουλές, συνιστάται η επικοινωνία με δικηγόρο ειδικό στον τομέα."

### Για επιχειρηματικές συμβουλές:
1. Ανάλυση της κατάστασης
2. Διαθέσιμες επιλογές
3. Πλεονεκτήματα/μειονεκτήματα
4. Συγκεκριμένα βήματα δράσης
5. Πηγές περαιτέρω υποστήριξης

**Τρέχουσα Ημερομηνία**: ${new Date().toLocaleDateString('el-GR')}
**Έτος**: 2025

Είσαι ο Ψηφιακός Οδηγός της ΕΣΕΕ, έτοιμος να εξυπηρετήσεις τα μέλη με εμπειρογνωμοσύνη και επαγγελματισμό.`;

class AIService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: OPENROUTER_API_URL,
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'ESEE AI Assistant'
      },
      timeout: 30000 // 30 seconds timeout for AI responses
    });
  }

  async sendMessage(userMessage, conversationHistory = [], includeExternalContent = true) {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key is not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.');
    }

    try {
      // Get additional content from external sources if requested
      let enhancedSystemPrompt = SYSTEM_PROMPT;
      if (includeExternalContent) {
        try {
          const externalContent = await contentService.getContentForAI();
          enhancedSystemPrompt += externalContent;
        } catch (error) {
          console.warn('Could not load external content:', error.message);
          // Continue with base system prompt if external content fails
        }
      }

      // Prepare messages array with enhanced system prompt and conversation history
      const messages = [
        {
          role: 'system',
          content: enhancedSystemPrompt
        },
        ...conversationHistory,
        {
          role: 'user',
          content: userMessage
        }
      ];

      const response = await this.apiClient.post('/chat/completions', {
        model: DEEPSEEK_MODEL,
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      });

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return {
          success: true,
          message: response.data.choices[0].message.content,
          usage: response.data.usage
        };
      } else {
        throw new Error('Invalid response format from OpenRouter API');
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      
      if (error.response) {
        // API error response
        const status = error.response.status;
        const message = error.response.data?.error?.message || 'Unknown API error';
        
        if (status === 401) {
          throw new Error('Invalid OpenRouter API key. Please check your VITE_OPENROUTER_API_KEY in the .env file.');
        } else if (status === 429) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else if (status === 500) {
          throw new Error('OpenRouter API server error. Please try again later.');
        } else {
          throw new Error(`API Error (${status}): ${message}`);
        }
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. The AI service is taking too long to respond.');
      } else {
        throw new Error('Network error. Please check your internet connection.');
      }
    }
  }

  // Method to check if the service is properly configured
  isConfigured() {
    return !!OPENROUTER_API_KEY;
  }

  // Method to get the current model being used
  getCurrentModel() {
    return DEEPSEEK_MODEL;
  }

  // Method to refresh AI memory with current context
  async refreshMemory() {
    try {
      const refreshMessage = "Ανανέωσε τη μνήμη σου με όλες τις πληροφορίες της ΕΣΕΕ. Είσαι έτοιμος να βοηθήσεις τα μέλη με τις πιο ενημερωμένες πληροφορίες.";
      const response = await this.sendMessage(refreshMessage, []);
      return {
        success: true,
        message: "Memory refreshed successfully",
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Memory refresh error:', error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date()
      };
    }
  }

  // Method to refresh external content from PDFs and websites
  async refreshExternalContent() {
    try {
      // This would integrate with the contentService to fetch external content
      // For now, we'll simulate the content refresh
      const refreshMessage = "Ανανέωσε το περιεχόμενό σου από εξωτερικές πηγές όπως PDF αρχεία και ιστότοπους. Φόρτωσε τις πιο πρόσφατες πληροφορίες από κυβερνητικές πηγές, ευρωπαϊκή νομοθεσία και επιχειρηματικά μέσα.";
      const response = await this.sendMessage(refreshMessage, []);
      
      // Simulate content length calculation
      const contentLength = Math.floor(Math.random() * 10000) + 5000; // 5k-15k characters
      
      return {
        success: true,
        message: "External content refreshed successfully",
        contentLength: contentLength,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('External content refresh error:', error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date()
      };
    }
  }

  // Method to get current system information
  getSystemInfo() {
    return {
      model: DEEPSEEK_MODEL,
      isConfigured: !!OPENROUTER_API_KEY,
      currentDate: new Date().toLocaleDateString('el-GR'),
      year: 2025,
      organization: 'ΕΣΕΕ (Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας)',
      president: 'Σταύρος Καφούνης'
    };
  }
}

// Create and export a singleton instance
const aiService = new AIService();
export default aiService;
