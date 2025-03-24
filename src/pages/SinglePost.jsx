import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ParticleBackground from '../components/shared/ParticleBackground';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useSelector } from "react-redux";

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
    if (imgLoaded) {
      const timer = setTimeout(() => {
        const tl = gsap.timeline();
        tl.fromTo('.post-content', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        tl.fromTo('.post-image', { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [imgLoaded]);

  // useEffect(() => {
  //   console.log('post is ', post)
  // }, [post])

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
                  <span className="text-gray-500 text-sm">{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <h1 className="text-5xl font-bold leading-tight">{post.title}</h1>
              </div>

              <div className="post-image h-[400px] rounded-2xl overflow-hidden">
                <img
                    src={post?.heroImage?.filename
                        ? `https://cms.socialmediateam.gr/api/media/file/${post?.heroImage?.filename}`
                        : 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={post?.heroImage?.alt || 'Default Image'}
                    className="w-full h-full object-cover"
                    onLoad={() => setImgLoaded(true)}
                />
              </div>


              <div className="prose max-w-none">
                {post.content?.root?.children?.map((block, index) => {
                  if (block.type === 'paragraph' && block.children?.[0]?.text) {
                    return <p key={index}>{block.children[0].text}</p>;
                  }

                  if (block.type === 'horizontalrule') {
                    return <hr key={index} className="my-4" />;
                  }

                  if (block.type === 'block' && block.fields?.blockType === 'banner') {
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg my-4 ${
                          block.fields.style === 'warning' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {block.fields.content?.root?.children?.[0]?.children?.[0]?.text}
                      </div>
                    );
                  }

                  if (block.type === 'block' && block.fields?.blockType === 'mediaBlock') {
                    const media = block.fields.media;
                    if (media?.mimeType?.startsWith('application/pdf')) {
                      return (
                        <div key={index} className="my-4">
                          <a
                            href={`https://cms.socialmediateam.gr${media.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Download {media.filename}
                          </a>
                        </div>
                      );
                    }
                    // Handle other media types if needed
                  }

                  return null;
                })}
              </div>

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
