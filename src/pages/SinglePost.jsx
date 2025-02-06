import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ParticleBackground from '../components/shared/ParticleBackground';
import CustomCursor from '../components/shared/CustomCursor';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const SinglePost = ({ isLoaded, setIsLoaded }) => {
  const { id } = useParams();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  }, [isLoaded, setIsLoaded]);

  // Simulated post data (in real app, fetch based on id)
  const post = {
    title: `Article #${id}: The Future of Greek Commerce in 2025`,
    date: 'January 28, 2025',
    category: 'News'
  };

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      '.post-content',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    tl.fromTo(
      '.post-image',
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );
  }, []);

  return (
    <div className={`relative min-h-screen ${isDark ? 'bg-gradient-to-b from-blue-950 to-indigo-950 text-white' : 'bg-gradient-to-b from-blue-50 to-indigo-50 text-gray-900'} overflow-hidden transition-colors duration-300`}>
      <CustomCursor />
      {isDark && <ParticleBackground color="#ffffff" count={100} />}

      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-3 rounded-full ${
          isDark 
            ? 'bg-white/10 hover:bg-white/20 text-white' 
            : 'bg-blue-900/10 hover:bg-blue-900/20 text-blue-900'
        } backdrop-blur-sm transition-all duration-300 z-50`}
      >
        {isDark ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="post-content space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'} text-sm font-medium`}>
                  {post?.category}
                </span>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                  {post?.date}
                </span>
              </div>
              <h1 className={`text-5xl font-bold leading-tight ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-400 to-indigo-400' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600'
              } bg-clip-text text-transparent`}>
                {post?.title}
              </h1>
            </div>

            <div className="post-image relative h-[400px] rounded-2xl overflow-hidden">
              <div className={`absolute inset-0 ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-400/20 to-indigo-400/20' 
                  : 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20'
              } mix-blend-overlay`}></div>
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                alt="Post header"
                className="w-full h-full object-cover"
              />
            </div>

            <div className={`prose ${isDark ? 'prose-invert' : ''} max-w-none`}>
              <p className={`text-xl leading-relaxed ${isDark ? 'text-blue-100' : 'text-blue-900'}`}>
                As we step into 2025, the landscape of Greek commerce continues to evolve at an unprecedented pace. Digital transformation, sustainable practices, and innovative business models are reshaping how businesses operate and interact with consumers.
              </p>

              <div className={`my-8 p-6 ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20' 
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50'
              } rounded-xl backdrop-blur-sm`}>
                <blockquote className={`text-2xl font-light italic ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  &ldquo;The future of commerce lies in the seamless integration of digital and physical experiences, creating value through innovation and sustainability.&rdquo;
                </blockquote>
              </div>

              <h2 className={`text-2xl font-bold mt-8 mb-4 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Key Insights
              </h2>

              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>•</span>
                  <span>Digital transformation acceleration across all sectors</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>•</span>
                  <span>Sustainable business practices becoming the norm</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>•</span>
                  <span>Enhanced focus on customer experience and personalization</span>
                </li>
              </ul>

              <p className="mt-8">
                The integration of artificial intelligence and machine learning continues to drive innovation in the retail sector, while blockchain technology is revolutionizing supply chain management and transparency in business transactions.
              </p>
            </div>

            <div className="flex justify-center mt-12">
              <button className={`px-8 py-3 rounded-full font-medium text-lg transform-gpu custom-transition hover:shadow-2xl hover:scale-105 ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-blue-950 hover:shadow-blue-500/25' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-600/25'
              }`}>
                Share Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SinglePost.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  setIsLoaded: PropTypes.func.isRequired
};

export default SinglePost;
