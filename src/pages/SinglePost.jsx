import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ParticleBackground from '../components/shared/ParticleBackground';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useSelector } from "react-redux";
import fallbackImage from '../assets/20150811_151613.jpg';

const SinglePost = ({ isLoaded, setIsLoaded }) => {
  const params = useParams();
  const { isDark, toggleTheme } = useTheme();
  const [imgLoaded, setImgLoaded] = useState(false);

  const stateArticles = useSelector(state => state.articles);

  useEffect(() => {
    if (!isLoaded) setIsLoaded(true);
  }, [isLoaded, setIsLoaded]);

  const post = stateArticles.find(article => article.slug === params.slug);


  useEffect(() => {
    console.log('stateArticles  =>  ', post);
  }, [post]);

  useEffect(() => {
    if (imgLoaded) {
      const timer = setTimeout(() => {
        const tl = gsap.timeline();
        tl.fromTo('.post-content', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        tl.fromTo('.post-image', { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [imgLoaded]);

  if (!post) {
    return (
        <div className="min-h-screen flex items-center justify-center text-center text-gray-700 dark:text-gray-300">
          <h1>Το άρθρο δεν βρέθηκε.</h1>
        </div>
    );
  }

  return (
      <div className={`relative min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} overflow-hidden transition-colors duration-300`}>
        {isDark && <ParticleBackground color="#ffffff" count={100} />}
        <button onClick={toggleTheme} className="fixed top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 z-50">
          {isDark ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="post-content space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-blue-600 text-sm font-medium">{post.category}</span>
                  <span className="text-gray-500 text-sm">{new Date(post.published_at).toLocaleDateString()}</span>
                </div>
                <h1 className="text-5xl font-bold leading-tight">{post.title}</h1>
              </div>

              <div className="post-image h-[400px] rounded-2xl overflow-hidden">
                <img
                    src={post?.media?.filename
                        ? `https://cms.socialmediateam.gr/api/media/file/${post?.media?.filename}`
                        : 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={post?.media?.alt || 'Default Image'}
                    className="w-full h-full object-cover"
                    onLoad={() => setImgLoaded(true)}
                />
              </div>


              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

              <div className="flex justify-center mt-12">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg">Κοινοποίηση</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

SinglePost.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  setIsLoaded: PropTypes.func.isRequired,
};

export default SinglePost;
