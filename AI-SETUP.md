# AI Chatbot Setup Guide

This guide explains how to set up the AI chatbot integration with OpenRouter API and DeepSeek model.

## Prerequisites

1. **OpenRouter API Key**: You need an API key from [OpenRouter](https://openrouter.ai/)
2. **Node.js**: Ensure you have Node.js installed
3. **Environment Variables**: Set up your `.env` file

## Setup Instructions

### 1. Get OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up for an account
3. Navigate to your API keys section
4. Create a new API key
5. Copy the API key for use in your `.env` file

### 2. Configure Environment Variables

The `.env` file has been created with the following structure:

```env
# OpenRouter API Configuration
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_OPENROUTER_API_URL=https://openrouter.ai/api/v1
VITE_DEEPSEEK_MODEL=deepseek/deepseek-r1

# Application Configuration
VITE_API_URL=https://back.socialmediateam.gr
```

**Important**: Replace `your_openrouter_api_key_here` with your actual OpenRouter API key.

### 3. Available Models

The system is configured to use the DeepSeek model by default. You can change the model by updating the `VITE_DEEPSEEK_MODEL` variable in your `.env` file.

Popular models available through OpenRouter:
- `deepseek/deepseek-r1` (default - R1 reasoning model)
- `deepseek/deepseek-chat` (standard chat model)
- `openai/gpt-4o`
- `openai/gpt-4o-mini`
- `anthropic/claude-3.5-sonnet`
- `google/gemini-pro-1.5`

### 4. Features

#### AI Service Integration
- **Real-time AI responses** using OpenRouter API
- **Conversation context** maintained across messages
- **Fallback responses** when AI service is unavailable
- **Error handling** with user-friendly messages

#### DeepSeek R1 Model Features
- **Advanced reasoning capabilities** with R1 architecture
- **Greek language support** optimized for ESEE context
- **ESEE-specific knowledge** based on organizational data
- **Contextual responses** for commerce and entrepreneurship topics
- **Professional tone** appropriate for business users
- **Enhanced problem-solving** for complex business queries

#### Chatbot Features
- **Quick answer buttons** for common topics
- **Real-time typing indicators**
- **Message history** with timestamps
- **Responsive design** for mobile and desktop
- **Dark/light theme** support

### 5. Usage

Once configured, the AI chatbot will:

1. **Initialize on app load** with DeepSeek model
2. **Provide contextual responses** based on ESEE knowledge
3. **Handle common topics** like:
   - Tax compliance (myDATA, electronic receipts)
   - Energy cost management
   - Digital transformation
   - Financial assistance
   - Labor law (ERGANI II)
   - Training programs (KAELE)

### 6. Troubleshooting

#### Common Issues

1. **"AI service not configured"**
   - Check that `VITE_OPENROUTER_API_KEY` is set in `.env`
   - Restart the development server after adding the key

2. **"Invalid OpenRouter API key"**
   - Verify your API key is correct
   - Check that your OpenRouter account has sufficient credits

3. **"API rate limit exceeded"**
   - Wait a few minutes before trying again
   - Consider upgrading your OpenRouter plan

4. **"Request timeout"**
   - Check your internet connection
   - The AI service may be experiencing high load

#### Debug Mode

To see detailed error information:
1. Open browser developer tools (F12)
2. Check the Console tab for error messages
3. Look for "AI Service Error:" messages

### 7. Development

#### File Structure
```
src/
├── services/
│   └── aiService.js          # OpenRouter API integration
├── hooks/
│   └── useAIService.js       # AI service initialization hook
├── components/
│   └── shared/
│       └── AIChat.jsx        # Chatbot UI component
└── App.jsx                   # Main app with AI initialization
```

#### Key Components

- **aiService.js**: Handles all OpenRouter API communications
- **useAIService.js**: Manages AI service initialization and status
- **AIChat.jsx**: Provides the chatbot user interface
- **App.jsx**: Initializes AI service on app load

### 8. Security Notes

- **Never commit** your `.env` file to version control
- **Keep your API key** secure and private
- **Monitor usage** through your OpenRouter dashboard
- **Set spending limits** to prevent unexpected charges

### 9. Support

For technical support:
1. Check the browser console for error messages
2. Verify your OpenRouter account status
3. Ensure all environment variables are correctly set
4. Restart the development server after making changes

The AI chatbot is now ready to provide intelligent assistance to ESEE members with context-aware responses about commerce, entrepreneurship, and organizational services.
