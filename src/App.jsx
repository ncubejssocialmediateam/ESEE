import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import RouterNavigator from "./router/RouterNavigator.jsx";
import AIChat from "./components/shared/AIChat.jsx";
import { useAIService } from './hooks/useAIService';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Initialize AI service with DeepSeek model on app load
  const { isInitialized, isLoading, error, modelInfo, refreshMemory, getSystemInfo } = useAIService();

  return (
    <ThemeProvider>
        <RouterNavigator isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
        <AIChat 
          aiStatus={{
            isInitialized,
            isLoading,
            error,
            modelInfo,
            refreshMemory,
            getSystemInfo
          }}
        />
    </ThemeProvider>
  );
}

export default App;
