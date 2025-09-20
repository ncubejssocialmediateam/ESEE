# ESEE AI Content Integration Guide

## Overview

The ESEE AI Chat system now supports dynamic content integration from external sources, including PDF documents and website content. This enhancement allows the AI to provide more comprehensive and up-to-date information by incorporating content from your website and S3-stored documents.

## 🚀 New Features

### 1. PDF Content Extraction
- **Automatic PDF parsing** from S3 URLs
- **Text extraction** from PDF documents
- **Content caching** for improved performance
- **Error handling** for inaccessible documents

### 2. Website Content Scraping
- **HTML content extraction** from website URLs
- **Text cleaning** and formatting
- **CORS handling** for cross-origin requests
- **Content length management**

### 3. Enhanced AI System Prompt
- **Dynamic content injection** into AI system prompt
- **Context-aware responses** based on external content
- **Fallback handling** when external content is unavailable
- **Content freshness tracking**

### 4. Content Management
- **Automatic caching** with 24-hour refresh interval
- **Manual refresh** capabilities
- **Content statistics** and monitoring
- **Source configuration** flexibility

## 📁 File Structure

```
src/
├── services/
│   ├── contentService.js     # New: Content extraction and management
│   └── aiService.js          # Enhanced: AI service with content integration
├── components/
│   └── shared/
│       └── AIChat.jsx        # Enhanced: UI with content refresh buttons
└── test-content-integration.html  # Test page for content integration
```

## 🔧 Configuration

### Default Content Sources

The system is pre-configured with these default sources:

1. **PDF Document**: `https://ofntwlyyaeqthsokjndr.supabase.co/storage/v1/object/public/PDF/01_AG-NIKOLAOS.pdf`
2. **ESEE Website**: `https://esee.gr`

### Custom Content Sources

You can configure custom sources by modifying the `getCombinedContent` method in `contentService.js`:

```javascript
const customSources = [
  {
    type: 'pdf',
    url: 'https://your-bucket.s3.amazonaws.com/document.pdf',
    name: 'Custom Document'
  },
  {
    type: 'website',
    url: 'https://your-website.com',
    name: 'Custom Website'
  }
];
```

## 🎯 Usage

### Automatic Content Integration

The AI chat automatically includes external content in responses:

1. **First message**: Content is fetched and cached
2. **Subsequent messages**: Cached content is used for faster responses
3. **24-hour refresh**: Content is automatically refreshed daily

### Manual Content Refresh

Users can manually refresh content using the new refresh button in the AI chat:

1. **Memory Refresh** (🔄): Refreshes AI memory with current ESEE information
2. **Content Refresh** (📖): Refreshes external content from PDF and websites

### Content Statistics

The system provides content statistics:

```javascript
const stats = aiService.getContentStats();
console.log(stats);
// Output:
// {
//   cachedSources: 2,
//   lastRefresh: Date,
//   refreshInterval: 86400000,
//   isContentFresh: true
// }
```

## 🧪 Testing

### Test Page

Open `test-content-integration.html` in your browser to test:

1. **PDF Content Extraction**: Tests access to the S3 PDF
2. **Website Content Extraction**: Tests website accessibility
3. **Combined Content Processing**: Tests content combination
4. **AI Integration**: Tests AI service integration
5. **Content Statistics**: Shows system statistics

### Manual Testing

1. Open the AI chat in your application
2. Click the content refresh button (📖)
3. Ask questions about content from the PDF or website
4. Verify that responses include information from external sources

## 🔍 Technical Details

### Content Service (`contentService.js`)

**Key Methods:**
- `extractPDFContent(url)`: Extracts text from PDF URLs
- `extractWebsiteContent(url)`: Extracts text from website URLs
- `getCombinedContent(sources)`: Combines content from multiple sources
- `formatContentForAI(content)`: Formats content for AI system prompt
- `getContentForAI(sources)`: Gets cached or fresh content for AI
- `refreshContent(sources)`: Forces content refresh

**Caching Strategy:**
- Content is cached for 24 hours
- Cache key based on source configuration
- Automatic refresh when cache expires

### AI Service Enhancement (`aiService.js`)

**New Parameters:**
- `includeExternalContent`: Boolean to include/exclude external content
- Enhanced system prompt with external content
- Content refresh methods

**Enhanced Methods:**
- `sendMessage()`: Now includes external content by default
- `refreshExternalContent()`: Refreshes external content sources
- `getContentStats()`: Returns content statistics

### UI Enhancements (`AIChat.jsx`)

**New Features:**
- Content refresh button with book icon (📖)
- Loading states for content refresh
- Success/error messages for content operations
- Tooltips explaining button functions

## 🚨 Error Handling

### Common Issues

1. **PDF Access Errors**:
   - Check URL accessibility
   - Verify CORS settings
   - Ensure PDF is not password-protected

2. **Website Scraping Errors**:
   - CORS restrictions in browser
   - Server-side implementation required
   - Network connectivity issues

3. **Content Processing Errors**:
   - Large file handling
   - Memory limitations
   - Timeout issues

### Fallback Behavior

- If external content fails to load, AI continues with base system prompt
- Error messages are logged but don't break the chat functionality
- Users can retry content refresh manually

## 📊 Performance Considerations

### Content Limits
- PDF content: Limited to first 5,000 characters
- Website content: Limited to first 5,000 characters
- Full content length is tracked and reported

### Caching Benefits
- Reduces API calls to external sources
- Improves response time for AI messages
- Reduces bandwidth usage

### Memory Usage
- Content is cached in memory
- Automatic cleanup after 24 hours
- Configurable refresh intervals

## 🔒 Security Considerations

### Content Validation
- URLs are validated before processing
- Content is sanitized before AI processing
- No sensitive data is logged

### CORS Handling
- Proper CORS headers required for website scraping
- Server-side implementation recommended for production
- Fallback mechanisms for CORS failures

## 🚀 Future Enhancements

### Planned Features
1. **Multiple PDF Support**: Support for multiple PDF documents
2. **Content Filtering**: Filter content by relevance
3. **Real-time Updates**: WebSocket-based content updates
4. **Content Analytics**: Track content usage and effectiveness
5. **Custom Parsers**: Support for different document formats

### Integration Opportunities
1. **Database Integration**: Store content in database
2. **Search Integration**: Full-text search across content
3. **Version Control**: Track content changes over time
4. **User Preferences**: Allow users to configure content sources

## 📞 Support

For technical support or questions about content integration:

1. Check the browser console for error messages
2. Verify content source URLs are accessible
3. Test with the provided test page
4. Review the content statistics for system health

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ PDF content extraction from S3 URLs
- ✅ Website content scraping
- ✅ Enhanced AI system prompt with external content
- ✅ Content caching and refresh functionality
- ✅ UI enhancements with refresh buttons
- ✅ Comprehensive error handling
- ✅ Test page for integration verification

---

The content integration system is now ready to enhance your ESEE AI chat with dynamic, up-to-date information from your website and S3 documents!
