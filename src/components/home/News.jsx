import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const News = ({ isDark }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      const parsedArticles = JSON.parse(savedArticles);
      // Filter only published articles and sort by date
      const publishedArticles = parsedArticles
        .filter(article => article.status === 'PUBLISHED')
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3); // Show only the latest 3 articles
      setArticles(publishedArticles);
    }
  }, []);

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

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-4xl md:text-5xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          ΝΕΑ
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map(article => (
            <article 
              key={article.id}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-lg transform-gpu transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
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
                  {article.date}
                </time>
                <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {article.title}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-3`}>
                  {article.excerpt}
                </p>
                <button 
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  data-cursor="pointer"
                >
                  Περισσότερα →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

News.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default News;
