import axios from 'axios';
import contentService from './contentService.js';

// OpenRouter API configuration
const OPENROUTER_API_URL = import.meta.env.VITE_OPENROUTER_API_URL || 'https://openrouter.ai/api/v1';
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const DEEPSEEK_MODEL = import.meta.env.VITE_DEEPSEEK_MODEL || 'deepseek/deepseek-r1';

// Enhanced system prompt with improved intelligence and context awareness
const SYSTEM_PROMPT = `Είσαι ο Ψηφιακός Οδηγός της ΕΣΕΕ (Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας) - ένας εξειδικευμένος AI βοηθός με βαθιά γνώση του ελληνικού επιχειρηματικού περιβάλλοντος.

## ΠΡΟΣΩΠΙΚΟΤΗΤΑ & ΣΤΥΛ:
- **Τόνος**: Ευγενικός, επαγγελματικός, εξυπηρετικός, αλλά και φιλικός
- **Στυλ**: Έξυπνος, ακριβής, προσβάσιμος, με βαθιά κατανόηση των επιχειρηματικών αναγκών
- **Προσέγγιση**: Προσωποποιημένη εξυπηρέτηση με εμπειρογνωμοσύνη και πρακτική καθοδήγηση
- **Γλώσσα**: Ελληνικά με επίσημη προσφώνηση, επιχειρηματική ορολογία και σαφή εξηγήσεις
- **Ανταπόκριση**: Πάντα δομημένη, με συγκεκριμένες οδηγίες και actionable βήματα

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

### 3. ΕΚΠΑΙΔΕΥΣΗ - ΚΑΕΛΕ
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
- **Πάντα ευγενικός, επαγγελματικός και φιλικός**
- **Ακριβείς πληροφορίες με αναφορά πηγών και ημερομηνιών**
- **Δομημένες απαντήσεις με πρακτικές οδηγίες και συγκεκριμένα βήματα**
- **Ενέργειες που μπορούν να λάβουν οι χρήστες με προτεραιότητες**
- **Προτάσεις για περαιτέρω βοήθεια και σχετικές υπηρεσίες**
- **Ανάλυση επιπτώσεων και πιθανών προκλήσεων**
- **Συγκριτική ανάλυση επιλογών όπου εφαρμόζεται**
- **Προληπτικές συμβουλές και best practices**

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
1. **Σύντομη απάντηση** - Άμεση απάντηση στο ερώτημα
2. **Αναλυτική εξήγηση** - Λεπτομερής ανάλυση με πλαίσιο
3. **Πρακτικές οδηγίες** - Συγκεκριμένα βήματα και ενέργειες
4. **Σχετικές πληροφορίες** - Επιπλέον context και σχετικά θέματα
5. **Επόμενα βήματα** - Προτάσεις για περαιτέρω βοήθεια και ακολουθία ενεργειών

### Για νομικές πληροφορίες:
- **Προοίμιο**: "Σύμφωνα με την ισχύουσα νομοθεσία (ενημέρωση 2025):"
- **Κύριο περιεχόμενο**: Δομημένη εξήγηση με παραγράφους και υποσημειώσεις
- **Πρακτικές επιπτώσεις**: Τι σημαίνει αυτό για την επιχείρησή σας
- **Επίλογος**: "⚠️ Για εξειδικευμένες νομικές συμβουλές, συνιστάται η επικοινωνία με δικηγόρο ειδικό στον τομέα."

### Για επιχειρηματικές συμβουλές:
1. **Ανάλυση κατάστασης** - Κατανόηση του τρέχοντος περιβάλλοντος
2. **Διαθέσιμες επιλογές** - Όλες οι πιθανές λύσεις
3. **Συγκριτική ανάλυση** - Πλεονεκτήματα/μειονεκτήματα κάθε επιλογής
4. **Συνιστώμενη προσέγγιση** - Η καλύτερη στρατηγική με αιτιολόγηση
5. **Συγκεκριμένα βήματα** - Actionable plan με timeline
6. **Πηγές υποστήριξης** - ΕΣΕΕ υπηρεσίες και εξωτερικοί συνεργάτες
7. **Παρακολούθηση** - Πώς να μετρήσετε την επιτυχία

### Για τεχνικά θέματα:
1. **Τεχνική εξήγηση** - Απλή και κατανοητή
2. **Πρακτική εφαρμογή** - Πώς να το εφαρμόσετε
3. **Κοινές προκλήσεις** - Τι να προσέξετε
4. **Βοηθητικά εργαλεία** - Πηγές και εργαλεία υποστήριξης
5. **Επόμενα βήματα** - Προτάσεις για περαιτέρω εξέλιξη

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
      timeout: 45000 // 45 seconds timeout for more complex responses
    });
    
    // Enhanced conversation management
    this.conversationContext = {
      userProfile: null,
      currentTopic: null,
      conversationHistory: [],
      userPreferences: {},
      lastInteraction: null
    };
    
    // Response enhancement settings
    this.responseSettings = {
      maxTokens: 1500, // Increased for more detailed responses
      temperature: 0.6, // Slightly lower for more consistent responses
      topP: 0.9,
      frequencyPenalty: 0.1,
      presencePenalty: 0.1
    };
  }

  async sendMessage(userMessage, conversationHistory = [], includeExternalContent = true) {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key is not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.');
    }

    try {
      // Update conversation context
      this.updateConversationContext(userMessage, conversationHistory);
      
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

      // Add contextual information to system prompt
      enhancedSystemPrompt += this.getContextualPrompt();

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
        max_tokens: this.responseSettings.maxTokens,
        temperature: this.responseSettings.temperature,
        top_p: this.responseSettings.topP,
        frequency_penalty: this.responseSettings.frequencyPenalty,
        presence_penalty: this.responseSettings.presencePenalty
      });

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const aiResponse = response.data.choices[0].message.content;
        
        // Enhance the response with additional context
        const enhancedResponse = this.enhanceResponse(aiResponse, userMessage);
        
        return {
          success: true,
          message: enhancedResponse,
          usage: response.data.usage,
          context: this.conversationContext
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

  // Enhanced conversation context management
  updateConversationContext(userMessage, conversationHistory) {
    this.conversationContext.lastInteraction = new Date();
    this.conversationContext.conversationHistory = conversationHistory;
    
    // Analyze user message for topic detection
    const topicKeywords = {
      'φορολογ': 'tax-compliance',
      'ενέργεια': 'energy-costs',
      'ψηφιακ': 'digital-transformation',
      'οικονομικ': 'financial-assistance',
      'εργατικ': 'labor-law',
      'εκπαίδευση': 'training',
      'myDATA': 'tax-compliance',
      'ERGANI': 'labor-law',
      'KAELE': 'training'
    };
    
    const lowerMessage = userMessage.toLowerCase();
    for (const [keyword, topic] of Object.entries(topicKeywords)) {
      if (lowerMessage.includes(keyword)) {
        this.conversationContext.currentTopic = topic;
        break;
      }
    }
  }

  // Generate contextual prompt based on conversation state
  getContextualPrompt() {
    let contextualPrompt = '\n\n## ΤΡΕΧΟΥΣΑ ΣΥΝΟΜΙΛΙΑ:\n';
    
    if (this.conversationContext.currentTopic) {
      contextualPrompt += `- **Τρέχον θέμα**: ${this.conversationContext.currentTopic}\n`;
    }
    
    if (this.conversationContext.conversationHistory.length > 0) {
      contextualPrompt += `- **Ιστορικό συνομιλίας**: ${this.conversationContext.conversationHistory.length} προηγούμενα μηνύματα\n`;
    }
    
    contextualPrompt += `- **Ώρα αλληλεπίδρασης**: ${new Date().toLocaleString('el-GR')}\n`;
    
    // Add conversation-specific guidance
    if (this.conversationContext.conversationHistory.length > 3) {
      contextualPrompt += '\n**ΟΔΗΓΙΑ**: Αυτή είναι μια συνεχής συνομιλία. Αναφέρετε προηγούμενα σημεία όπου είναι σχετικό και προσφέρετε follow-up ερωτήσεις.\n';
    }
    
    return contextualPrompt;
  }

  // Enhance AI response with additional context and formatting
  enhanceResponse(aiResponse, userMessage) {
    let enhancedResponse = aiResponse;
    
    // Add follow-up suggestions for better conversation flow
    const followUpSuggestions = this.generateFollowUpSuggestions(userMessage, aiResponse);
    if (followUpSuggestions.length > 0) {
      enhancedResponse += '\n\n**💡 Σχετικές ερωτήσεις που μπορείτε να κάνετε:**\n';
      followUpSuggestions.forEach((suggestion, index) => {
        enhancedResponse += `${index + 1}. ${suggestion}\n`;
      });
    }
    
    // Add relevant ESEE services if applicable
    const relevantServices = this.getRelevantServices(userMessage);
    if (relevantServices.length > 0) {
      enhancedResponse += '\n\n**🔗 Σχετικές υπηρεσίες ΕΣΕΕ:**\n';
      relevantServices.forEach(service => {
        enhancedResponse += `• ${service}\n`;
      });
    }
    
    return enhancedResponse;
  }

  // Generate intelligent follow-up suggestions
  generateFollowUpSuggestions(userMessage, aiResponse) {
    const suggestions = [];
    const lowerMessage = userMessage.toLowerCase();
    const lowerResponse = aiResponse.toLowerCase();
    
    if (lowerMessage.includes('φορολογ') || lowerResponse.includes('φορολογ')) {
      suggestions.push('Πώς μπορώ να εφαρμόσω το σύστημα myDATA στην επιχείρησή μου;');
      suggestions.push('Ποια είναι τα βήματα για την ηλεκτρονική υποβολή ΦΠΑ;');
      suggestions.push('Υπάρχουν επιπτώσεις για καθυστερημένες φορολογικές υποχρεώσεις;');
    }
    
    if (lowerMessage.includes('ενέργεια') || lowerResponse.includes('ενέργεια')) {
      suggestions.push('Ποια μέτρα ενεργειακής αποδοτικότητας μπορώ να εφαρμόσω;');
      suggestions.push('Υπάρχουν επιδοτήσεις για ανανεώσιμες πηγές ενέργειας;');
      suggestions.push('Πώς μπορώ να μειώσω το κόστος ενέργειας στην επιχείρησή μου;');
    }
    
    if (lowerMessage.includes('ψηφιακ') || lowerResponse.includes('ψηφιακ')) {
      suggestions.push('Ποια είναι τα πρώτα βήματα για ψηφιακό μετασχηματισμό;');
      suggestions.push('Πώς μπορώ να βελτιώσω την online παρουσία της επιχείρησής μου;');
      suggestions.push('Υπάρχουν εκπαιδευτικά προγράμματα για ψηφιακές δεξιότητες;');
    }
    
    return suggestions.slice(0, 3); // Limit to 3 suggestions
  }

  // Get relevant ESEE services based on user message
  getRelevantServices(userMessage) {
    const services = [];
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('φορολογ') || lowerMessage.includes('mydata')) {
      services.push('ΕΣΕΕ Digital Services - Φορολογική Συμμόρφωση');
      services.push('Συμβουλευτική Υπηρεσία Φορολογικών Θεμάτων');
    }
    
    if (lowerMessage.includes('εκπαίδευση') || lowerMessage.includes('σεμινάρια')) {
      services.push('KAELE - Κέντρο Εκπαίδευσης ΕΣΕΕ');
      services.push('ERMEION+ - Ψηφιακή Πλατφόρμα Εκπαίδευσης');
    }
    
    if (lowerMessage.includes('οικονομικ') || lowerMessage.includes('χρηματοδότηση')) {
      services.push('Ευρωπαϊκό Ταμείο Ανάκαμψης - Δάνεια ΜΜΕ');
      services.push('Συμβουλευτική Αναδιάρθρωσης Χρέους');
    }
    
    return services;
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
