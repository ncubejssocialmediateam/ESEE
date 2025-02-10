import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { fetchArticles } from '../apiGenericCalls/apiClient';
import { Link } from 'react-router-dom';

const Archive = () => {
  const { isDark } = useTheme();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const articlesPerPage = 9;

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles({ 
          status: 'PUBLISHED', 
          limit: articlesPerPage, 
          offset: (page - 1) * articlesPerPage 
        });
        if (data.length < articlesPerPage) {
          setHasMore(false);
        }
        if (page === 1) {
          setArticles(data);
        } else {
          setArticles(prev => [...prev, ...data]);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err.message || 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [page]);

  const getCategoryTranslation = (category) => {
    const translations = {
      'NEWS': 'Νέα',
      'OPINION': 'Γνώμη',
      'RESEARCH': 'Έρευνα',
      'INNOVATION': 'Καινοτομία',
      'COMPETITION': 'Διαγωνισμός',
      'EVENT': 'Εκδήλωση',
      'FEATURE': 'Αφιέρωμα'
    };
    return translations[category] || category;
  };

  if (error) {
    return (
      <section className={`min-h-screen py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Αρχείο Άρθρων
          </h1>
          <p className="text-red-500">Failed to load articles. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`min-h-screen py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className={`text-4xl md:text-5xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Αρχείο Άρθρων
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map(article => (
            <article 
              key={article.id}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-lg transform-gpu transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image_url || 'https://via.placeholder.com/400x300?text=No+Image'} 
                  alt={article.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    {getCategoryTranslation(article.category)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <time className="text-sm text-gray-500 mb-2 block">
                  {article.published_at ? new Date(article.published_at).toLocaleDateString('el-GR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Ημερομηνία μη διαθέσιμη'}
                </time>
                <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {article.title}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-3`}>
                  {article.excerpt}
                </p>
                <Link 
                  to={`/post/${article.id}`}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-block"
                  data-cursor="pointer"
                >
                  Περισσότερα →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map(i => (
              <div key={i} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-lg h-96 animate-pulse`}>
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
        )}

        {hasMore && !loading && (
          <div className="text-center mt-12">
            <button
              onClick={() => setPage(p => p + 1)}
              className={`px-6 py-3 ${
                isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              } text-white rounded-lg font-medium transition-colors`}
              data-cursor="pointer"
            >
              Φόρτωση Περισσότερων
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Archive;
