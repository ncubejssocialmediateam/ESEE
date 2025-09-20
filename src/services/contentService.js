import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Service for extracting and managing content from various sources
 * including website content and S3 documents
 */
class ContentService {
  constructor() {
    this.cachedContent = new Map();
    this.lastRefresh = null;
    this.refreshInterval = 24 * 60 * 60 * 1000; // 24 hours
  }

  /**
   * Extract text content from a PDF URL
   * @param {string} pdfUrl - URL of the PDF file
   * @returns {Promise<string>} - Extracted text content
   */
  async extractPDFContent(pdfUrl) {
    try {
      console.log('Extracting content from PDF:', pdfUrl);
      
      // Fetch the PDF file
      const response = await axios.get(pdfUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });

      // Load PDF with PDF.js
      const pdf = await pdfjsLib.getDocument({
        data: response.data,
        useSystemFonts: true
      }).promise;

      let extractedText = '';
      
      // Extract text from all pages
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map(item => item.str)
          .join(' ');
        extractedText += pageText + '\n';
      }

      console.log('PDF content extracted successfully, length:', extractedText.length);
      return extractedText;
    } catch (error) {
      console.error('Error extracting PDF content:', error);
      throw new Error(`Failed to extract PDF content: ${error.message}`);
    }
  }

  /**
   * Extract content from website pages
   * @param {string} url - Website URL
   * @returns {Promise<string>} - Extracted text content
   */
  async extractWebsiteContent(url) {
    try {
      console.log('Extracting content from website:', url);
      
      const response = await axios.get(url, {
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ESEE-AI-Bot/1.0)'
        }
      });

      // Basic HTML content extraction (you might want to use a proper HTML parser)
      const htmlContent = response.data;
      
      // Remove HTML tags and extract text content
      const textContent = htmlContent
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/<style[^>]*>.*?<\/style>/gi, '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      console.log('Website content extracted successfully, length:', textContent.length);
      return textContent;
    } catch (error) {
      console.error('Error extracting website content:', error);
      throw new Error(`Failed to extract website content: ${error.message}`);
    }
  }

  /**
   * Get content from multiple sources and combine them
   * @param {Array} sources - Array of source objects with type and url
   * @returns {Promise<Object>} - Combined content from all sources
   */
  async getCombinedContent(sources = []) {
    const defaultSources = [
      {
        type: 'pdf',
        url: 'https://ofntwlyyaeqthsokjndr.supabase.co/storage/v1/object/public/PDF/01_AG-NIKOLAOS.pdf',
        name: 'AG-NIKOLAOS Document'
      },
      {
        type: 'website',
        url: 'https://esee.gr',
        name: 'ESEE Main Website'
      }
    ];

    const sourcesToProcess = sources.length > 0 ? sources : defaultSources;
    const combinedContent = {
      pdfs: {},
      websites: {},
      lastUpdated: new Date(),
      totalSources: sourcesToProcess.length
    };

    for (const source of sourcesToProcess) {
      try {
        let content = '';
        
        if (source.type === 'pdf') {
          content = await this.extractPDFContent(source.url);
          combinedContent.pdfs[source.name || source.url] = {
            url: source.url,
            content: content.substring(0, 5000), // Limit content length
            fullLength: content.length
          };
        } else if (source.type === 'website') {
          content = await this.extractWebsiteContent(source.url);
          combinedContent.websites[source.name || source.url] = {
            url: source.url,
            content: content.substring(0, 5000), // Limit content length
            fullLength: content.length
          };
        }
      } catch (error) {
        console.error(`Error processing source ${source.url}:`, error);
        // Continue with other sources even if one fails
      }
    }

    return combinedContent;
  }

  /**
   * Format content for AI system prompt
   * @param {Object} combinedContent - Combined content from all sources
   * @returns {string} - Formatted content for AI prompt
   */
  formatContentForAI(combinedContent) {
    let formattedContent = '\n\n## ΕΠΙΠΛΕΟΝ ΠΗΓΕΣ ΠΛΗΡΟΦΟΡΙΩΝ:\n\n';

    // Add PDF content
    if (Object.keys(combinedContent.pdfs).length > 0) {
      formattedContent += '### ΕΓΓΡΑΦΑ PDF:\n';
      for (const [name, pdfData] of Object.entries(combinedContent.pdfs)) {
        formattedContent += `\n**${name}** (${pdfData.url}):\n`;
        formattedContent += `${pdfData.content}\n`;
        if (pdfData.fullLength > 5000) {
          formattedContent += `\n[Σημείωση: Το έγγραφο περιέχει ${pdfData.fullLength} χαρακτήρες. Εμφανίζεται μόνο το πρώτο μέρος.]\n`;
        }
      }
    }

    // Add website content
    if (Object.keys(combinedContent.websites).length > 0) {
      formattedContent += '\n### ΠΛΗΡΟΦΟΡΙΕΣ ΑΠΟ ΙΣΤΟΣΕΛΙΔΕΣ:\n';
      for (const [name, websiteData] of Object.entries(combinedContent.websites)) {
        formattedContent += `\n**${name}** (${websiteData.url}):\n`;
        formattedContent += `${websiteData.content}\n`;
        if (websiteData.fullLength > 5000) {
          formattedContent += `\n[Σημείωση: Η σελίδα περιέχει ${websiteData.fullLength} χαρακτήρες. Εμφανίζεται μόνο το πρώτο μέρος.]\n`;
        }
      }
    }

    formattedContent += `\n**Τελευταία ενημέρωση περιεχομένου**: ${combinedContent.lastUpdated.toLocaleDateString('el-GR')}\n`;
    formattedContent += `**Συνολικές πηγές**: ${combinedContent.totalSources}\n`;

    return formattedContent;
  }

  /**
   * Get cached content or fetch new content if needed
   * @param {Array} sources - Sources to fetch content from
   * @returns {Promise<string>} - Formatted content for AI
   */
  async getContentForAI(sources = []) {
    const now = Date.now();
    const cacheKey = JSON.stringify(sources);

    // Check if we have cached content and it's still fresh
    if (this.cachedContent.has(cacheKey) && 
        this.lastRefresh && 
        (now - this.lastRefresh) < this.refreshInterval) {
      console.log('Using cached content');
      return this.cachedContent.get(cacheKey);
    }

    try {
      console.log('Fetching fresh content from sources');
      const combinedContent = await this.getCombinedContent(sources);
      const formattedContent = this.formatContentForAI(combinedContent);
      
      // Cache the formatted content
      this.cachedContent.set(cacheKey, formattedContent);
      this.lastRefresh = now;
      
      return formattedContent;
    } catch (error) {
      console.error('Error getting content for AI:', error);
      return '\n\n## ΣΗΜΕΙΩΣΗ: Δεν ήταν δυνατή η φόρτωση επιπλέον περιεχομένου.\n';
    }
  }

  /**
   * Force refresh of all content
   * @param {Array} sources - Sources to refresh
   * @returns {Promise<string>} - Fresh formatted content
   */
  async refreshContent(sources = []) {
    console.log('Force refreshing content');
    this.cachedContent.clear();
    this.lastRefresh = null;
    return await this.getContentForAI(sources);
  }

  /**
   * Get content statistics
   * @returns {Object} - Content statistics
   */
  getContentStats() {
    return {
      cachedSources: this.cachedContent.size,
      lastRefresh: this.lastRefresh ? new Date(this.lastRefresh) : null,
      refreshInterval: this.refreshInterval,
      isContentFresh: this.lastRefresh ? (Date.now() - this.lastRefresh) < this.refreshInterval : false
    };
  }
}

// Create and export a singleton instance
const contentService = new ContentService();
export default contentService;
