import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../components/layout/Navigation';
import { useTheme } from '../context/ThemeContext';

const News = () => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const articles = useSelector(state => state.articles);
  const categories = useSelector(state => state.categories);
  const { isDark } = useTheme();

  useEffect(() => {
    // Filter out redundant categories and press releases
    const filteredCategories = categories.filter(category => 
      !category.title.toLowerCase().includes('ανακοινώσεις') &&
      !category.title.toLowerCase().includes('δελτία') &&
      !category.title.toLowerCase().includes('τύπου') &&
      !category.title.toLowerCase().includes('press')
    );

    if (selectedCategory === 'all') {
      // Show all articles except press releases
      const newsArticles = articles.filter(article => 
        !article.category || 
        (!article.category.title.toLowerCase().includes('ανακοινώσεις') &&
         !article.category.title.toLowerCase().includes('δελτία') &&
         !article.category.title.toLowerCase().includes('τύπου') &&
         !article.category.title.toLowerCase().includes('press'))
      );
      setFilteredArticles(newsArticles);
    } else {
      const filtered = articles.filter(article => 
        article.category && article.category.slug === selectedCategory
      );
      setFilteredArticles(filtered);
    }
  }, [articles, selectedCategory, categories]);

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              Νέα
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Μείνετε ενημερωμένοι με τα τελευταία νέα και εξελίξεις από την ΕΣΕΕ
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Όλα τα Νέα
            </button>
            {categories && categories
              .filter(category => 
                !category.title.toLowerCase().includes('ανακοινώσεις') &&
                !category.title.toLowerCase().includes('δελτία') &&
                !category.title.toLowerCase().includes('τύπου') &&
                !category.title.toLowerCase().includes('press')
              )
              .map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.title}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                {article.featuredImage && (
                  <div className="aspect-video">
                    <img
                      src={article.featuredImage.url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  {article.category && (
                    <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full mb-3">
                      {article.category.title}
                    </span>
                  )}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt || article.content?.substring(0, 150) + '...'}
                  </p>
                  <div className="flex items-center justify-between">
                    <time className="text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString('el-GR')}
                    </time>
                    <a
                      href={`/post/${article.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Διαβάστε περισσότερα →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Δεν βρέθηκαν άρθρα</h3>
            <p className="text-gray-500">Δεν υπάρχουν άρθρα για την επιλεγμένη κατηγορία.</p>
          </div>
        )}
      </div>
      </div>
    </main>
  );
};

export default News;
