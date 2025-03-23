import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import RouterNavigator from "./router/RouterNavigator.jsx";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ThemeProvider>
        <RouterNavigator isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
    </ThemeProvider>
  );
}

export default App;
