import { useState, useEffect } from 'react';
import aiService from '../services/aiService';

/**
 * Custom hook to manage AI service initialization and status
 * This hook ensures the DeepSeek model is ready on app load
 */
export const useAIService = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);

  useEffect(() => {
    const initializeAIService = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if service is configured
        if (!aiService.isConfigured()) {
          setError('OpenRouter API key not configured');
          setIsInitialized(false);
          return;
        }

        // Test the AI service with a simple message to ensure it's working
        const testMessage = "Γεια σας! Είμαι έτοιμος να σας βοηθήσω.";
        const response = await aiService.sendMessage(testMessage);
        
        if (response.success) {
          setIsInitialized(true);
          setModelInfo({
            model: aiService.getCurrentModel(),
            status: 'ready'
          });
        } else {
          throw new Error('Failed to initialize AI service');
        }
      } catch (err) {
        console.error('AI Service Initialization Error:', err);
        setError(err.message);
        setIsInitialized(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Initialize the service
    initializeAIService();
  }, []);

  // Function to refresh AI memory
  const refreshMemory = async () => {
    try {
      setIsLoading(true);
      const result = await aiService.refreshMemory();
      if (result.success) {
        console.log('AI memory refreshed successfully');
      }
      return result;
    } catch (error) {
      console.error('Memory refresh failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get system information
  const getSystemInfo = () => {
    return aiService.getSystemInfo();
  };

  return {
    isInitialized,
    isLoading,
    error,
    modelInfo,
    isConfigured: aiService.isConfigured(),
    refreshMemory,
    getSystemInfo
  };
};

export default useAIService;
