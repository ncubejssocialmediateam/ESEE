import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
import Articles from './pages/admin/Articles';
import AdminLayout from './components/layout/AdminLayout';
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
