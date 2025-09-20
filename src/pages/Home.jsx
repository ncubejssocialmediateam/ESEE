import PropTypes from 'prop-types';
import Navigation from '../components/layout/Navigation';
import Hero from '../components/home/Hero';
import News from '../components/home/News';
import Opinions from '../components/home/Opinions';
import Competitions from '../components/home/Competitions';
import Events from '../components/home/Events';
import Newspaper from '../components/home/Newspaper';
import Features from '../components/home/Features';
import Footer from '../components/layout/Footer';
import { useTheme } from '../context/ThemeContext';
import { useEffect } from "react";
import ResearchHub from "../components/home/Research.jsx";

const Home = ({ isLoaded, setIsLoaded }) => {
  const { isDark } = useTheme();

  useEffect(() => {
    setIsLoaded(false);
  }, []);

  return (
    <main className="bg-gray-900 text-white transition-colors duration-300">
      <Navigation isDark={isDark} />
      <Hero isLoaded={isLoaded} setIsLoaded={setIsLoaded} isDark={isDark} />
      <Newspaper isDark={isDark} />
      <News isDark={isDark} />
      <ResearchHub isDark={isDark} />
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
