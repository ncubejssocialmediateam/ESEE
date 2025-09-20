import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ParticleBackground from '../components/shared/ParticleBackground';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { useSelector } from "react-redux";
import ShareButton from '../components/common/ShareButton';
import SharePopup from '../components/common/SharePopup';
import ArticleCard from '../components/article/articleCard';
import Navigation from '../components/layout/Navigation';

const SinglePost = ({ isLoaded, setIsLoaded }) => {
  const params = useParams();
  const { isDark } = useTheme();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const stateArticles = useSelector(state => state.articles);

  useEffect(() => {
    if (!isLoaded) setIsLoaded(true);
  }, [isLoaded, setIsLoaded]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [params.slug]);

  const post = stateArticles.find(article => article.slug === params.slug);

  // Get related posts
  const relatedPosts = post ? stateArticles
    .filter(article => 
      // Same category and not the current post
      article.categories.some(category => 
        post.categories.some(postCategory => postCategory.id === category.id)
      ) && article.id !== post.id
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 5) // Get only 5 posts
    : [];

  useEffect(() => {
    if (imgLoaded) {
      const timer = setTimeout(() => {
        const tl = gsap.timeline();
        tl.fromTo('.post-content', { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power3.out' });
        tl.fromTo('.post-image', { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [imgLoaded]);

  if (!post) {
    return (
        <main className="bg-gray-900 text-white transition-colors duration-300">
          <Navigation isDark={isDark} />
          <div className="min-h-screen flex items-center justify-center text-center text-gray-300">
            <h1>Το άρθρο δεν βρέθηκε.</h1>
          </div>
        </main>
    );
  }

  return (
      <main className="bg-gray-900 text-white transition-colors duration-300">
        <Navigation isDark={isDark} />
        <div className="relative min-h-screen bg-gray-900 text-white transition-colors duration-300">
          {isDark && <ParticleBackground color="#ffffff" count={100} />}

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
                        ? `https://back.socialmediateam.gr/api/media/file/${post?.heroImage?.filename}`
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
                            href={`https://back.socialmediateam.gr${media.url}`}
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
                <ShareButton onClick={() => setIsShareOpen(true)} />
              </div>
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <div className="mt-20 border-t border-gray-200 pt-12">
                <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Σχετικά Άρθρα
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((article) => (
                    <ArticleCard key={article.id} article={article} isDark={isDark} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <SharePopup
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
            isDark={isDark}
            title={post.title}
            url={window.location.href}
        />
        </div>
      </main>
  );
};

SinglePost.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  setIsLoaded: PropTypes.func.isRequired,
};

export default SinglePost;
