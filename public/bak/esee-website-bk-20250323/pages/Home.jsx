import PropTypes from 'prop-types';
import Navigation from '../components/layout/Navigation';
import Hero from '../components/home/Hero';
import Newspaper from '../components/home/Newspaper';
import News from '../components/home/News';
import Opinions from '../components/home/Opinions';
import Competitions from '../components/home/Competitions';
import Events from '../components/home/Events';
import Features from '../components/home/Features';
import ResearchHub from '../components/home/Research';
import InnovationShowcase from '../components/home/Innovation';
import Footer from '../components/layout/Footer';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import {useEffect} from "react";

const Home = ({ isLoaded, setIsLoaded }) => {
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
      setIsLoaded(false);
  }, [])

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-3 rounded-full ${
          isDark 
            ? 'bg-white/10 hover:bg-white/20 text-white' 
            : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900'
        } backdrop-blur-sm transition-all duration-300 z-50`}
      >
        {isDark ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>

      <Navigation isDark={isDark} />
      <Hero isLoaded={isLoaded} setIsLoaded={setIsLoaded} isDark={isDark} />
      {/*<Newspaper isDark={isDark} />*/}
      <News isDark={isDark} />
      {/*<ResearchHub isDark={isDark} />*/}
      {/*<InnovationShowcase isDark={isDark} />*/}
      <Opinions isDark={isDark} />
      <Competitions isDark={isDark} />
      <Events isDark={isDark} />
      {/*<Features isDark={isDark} />*/}
      <Footer isDark={isDark} />
    </main>
  );
};

Home.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  setIsLoaded: PropTypes.func.isRequired
};

export default Home;
