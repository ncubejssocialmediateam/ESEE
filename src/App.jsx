import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import RouterNavigator from "./router/RouterNavigator.jsx";
import AIChat from "./components/shared/AIChat.jsx";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ThemeProvider>
        <RouterNavigator isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
        <AIChat />
    </ThemeProvider>
  );
}

export default App;
