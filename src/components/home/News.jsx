import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getData } from '../../api/apiClient.jsx';
import { Link } from 'react-router-dom';

// Category translations can be reused and are defined outside the component
const categoryTranslations = {
  NEWS: 'Νέα',
  OPINION: 'Γνώμη',
  RESEARCH: 'Έρευνα',
  INNOVATION: 'Καινοτομία',
  COMPETITION: 'Διαγωνισμός',
  EVENT: 'Εκδήλωση',
  FEATURE: 'Αφιέρωμα',
};

const getCategoryTranslation = (category) => categoryTranslations[category] || category;

// A separate component for rendering a single article
const ArticleCard = ({ article, isDark }) => {
  const {
    id,
    title,
    slug,
    excerpt,
    category,
    image_url,
    published_at,
  } = article;

  return (
      <article
          key={id}
          className={`${
              isDark ? 'bg-gray-800' : 'bg-white'
          } rounded-xl overflow-hidden shadow-lg transform-gpu transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
              src={image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={title}
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
            {getCategoryTranslation(category)}
          </span>
          </div>
        </div>
        <div className="p-6">
          <time className="text-sm text-gray-500 mb-2 block">
            {published_at
                ? new Date(published_at).toLocaleDateString('el-GR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
                : 'Ημερομηνία μη διαθέσιμη'}
          </time>
          <h3
              className={`text-xl font-bold mb-3 line-clamp-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
              }`}
          >
            {title}
          </h3>
          <p
              className={`${
                  isDark ? 'text-gray-400' : 'text-gray-600'
              } mb-4 line-clamp-3`}
          >
            {excerpt}
          </p>
          <Link
              to={`/post/${id}`}
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-block"
              data-cursor="pointer"
          >
            Περισσότερα →
          </Link>
        </div>
      </article>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    slug: PropTypes.string,
    excerpt: PropTypes.string,
    category: PropTypes.string,
    image_url: PropTypes.string,
    published_at: PropTypes.string,
  }).isRequired,
  isDark: PropTypes.bool.isRequired,
};

const News = ({ isDark }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await getData('/api/articles');
        // Axios returns the data in res.data
        setArticles(res.data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
        <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <h2
                className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
                    isDark ? 'text-white' : 'text-gray-900'
                }`}
            >
              ΝΕΑ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                  <div
                      key={i}
                      className={`${
                          isDark ? 'bg-gray-800' : 'bg-white'
                      } rounded-xl overflow-hidden shadow-lg h-96 animate-pulse`}
                  >
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>
    );
  }

  if (error) {
    return (
        <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2
                className={`text-4xl md:text-5xl font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-900'
                }`}
            >
              ΝΕΑ
            </h2>
            <p className="text-red-500">
              Failed to load articles. Please try again later.
            </p>
          </div>
        </section>
    );
  }

  return (
      <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2
              className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
                  isDark ? 'text-white' : 'text-gray-900'
              }`}
          >
            ΝΕΑ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>
  );
};

News.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

export default News;
