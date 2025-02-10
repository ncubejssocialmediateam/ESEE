import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
import Articles from './pages/admin/Articles';
import AdminLayout from './components/layout/AdminLayout';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/post/:id" element={<SinglePost isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="articles" element={<Articles />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
