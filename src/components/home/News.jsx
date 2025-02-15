import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getData } from '../../api/apiClient.jsx';
import ArticleCard from "../article/articleCard.jsx";

const News = ({ isDark }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await getData('/api/articles');
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
