import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../components/layout/Navigation';
import { useTheme } from '../context/ThemeContext';

const PressReleases = () => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const articles = useSelector(state => state.articles);
  const { isDark } = useTheme();

  useEffect(() => {
    // Debug: Log articles to understand data structure
    console.log('Total articles loaded:', articles.length);
    console.log('Sample article structure:', articles[0]);
    
    // Filter articles that are press releases based on category ID
    const pressReleases = articles.filter(article => 
      article.categories && article.categories.some(category => 
        category.id === 4 || // Δελτία Τύπου
        category.id === 5 || // Ανακοινώσεις
        category.title?.toLowerCase().includes('ανακοινώσεις') ||
        category.title?.toLowerCase().includes('δελτία') ||
        category.title?.toLowerCase().includes('τύπου') ||
        category.title?.toLowerCase().includes('press')
      )
    );
    
    console.log('Press releases found:', pressReleases.length);

    // Helper function for robust date sorting
    const sortByDate = (a, b) => {
      const dateA = a.publishedAt || a.createdAt;
      const dateB = b.publishedAt || b.createdAt;
      
      const parsedDateA = new Date(dateA);
      const parsedDateB = new Date(dateB);
      
      // Handle invalid dates
      if (isNaN(parsedDateA.getTime()) && isNaN(parsedDateB.getTime())) return 0;
      if (isNaN(parsedDateA.getTime())) return 1;
      if (isNaN(parsedDateB.getTime())) return -1;
      
      return parsedDateB.getTime() - parsedDateA.getTime();
    };

    if (selectedYear === 'all') {
      // Sort by publication date (newest first)
      const sortedReleases = pressReleases.sort(sortByDate);
      setFilteredArticles(sortedReleases);
    } else {
      const filtered = pressReleases.filter(article => {
        const dateString = article.publishedAt || article.createdAt;
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return false;
        const articleYear = date.getFullYear().toString();
        return articleYear === selectedYear;
      }).sort(sortByDate);
      setFilteredArticles(filtered);
    }
  }, [articles, selectedYear]);

  // Get unique years from press release articles
  const pressReleaseYears = articles.filter(article => 
    article.categories && article.categories.some(category => 
      category.id === 4 || category.id === 5 ||
      category.title?.toLowerCase().includes('ανακοινώσεις') ||
      category.title?.toLowerCase().includes('δελτία') ||
      category.title?.toLowerCase().includes('τύπου') ||
      category.title?.toLowerCase().includes('press')
    )
  );
  
  const years = [...new Set(pressReleaseYears.map(article => 
    new Date(article.publishedAt || article.createdAt).getFullYear().toString()
  ))].sort((a, b) => b - a);

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              Ανακοινώσεις & Δελτία Τύπου
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Επίσημες ανακοινώσεις και δελτία τύπου της ΕΣΕΕ
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedYear === 'all'
                  ? 'bg-blue-600 text-white'
                  : isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Όλα τα Έτη
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedYear === year
                    ? 'bg-blue-600 text-white'
                    : isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Press Releases List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredArticles.length > 0 ? (
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <article key={article.id} className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        isDark 
                          ? 'text-red-400 bg-red-900/30' 
                          : 'text-red-600 bg-red-100'
                      }`}>
                        Δελτίο Τύπου
                      </span>
                      <time className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(article.publishedAt || article.createdAt).toLocaleDateString('el-GR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {article.title}
                    </h2>
                    <p className={`mb-4 line-clamp-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {article.excerpt || (article.content?.root?.children?.[1]?.children?.[0]?.text || 'Δεν υπάρχει περίληψη διαθέσιμη')}
                    </p>
                  </div>
                  <div className="flex-shrink-0 lg:ml-6">
                    <a
                      href={`/post/${article.slug}`}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                    >
                      Διαβάστε το Δελτίο
                      <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className={`mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Δεν βρέθηκαν δελτία τύπου</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Δεν υπάρχουν δελτία τύπου για την επιλεγμένη χρονιά.</p>
            
            {/* Debug info */}
            {articles.length > 0 && (
              <div className={`mt-8 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Debug: Βρέθηκαν {articles.length} συνολικά άρθρα. 
                  Ελέγξτε την κονσόλα για περισσότερες λεπτομέρειες.
                </p>
                <div className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <p>Διαθέσιμες κατηγορίες:</p>
                  <ul className="list-disc list-inside mt-1">
                    {[...new Set(articles.flatMap(article => 
                      article.categories?.map(cat => `${cat.id}: ${cat.title}`) || []
                    ))].slice(0, 5).map((cat, index) => (
                      <li key={index}>{cat}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Επικοινωνία με το Γραφείο Τύπου
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Για περισσότερες πληροφορίες ή αιτήματα συνεντεύξεων, επικοινωνήστε με το Γραφείο Τύπου της ΕΣΕΕ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:press@esee.gr"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-900 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              press@esee.gr
            </a>
            <a
              href="tel:+302103259200"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-900 transition-colors duration-200"
            >
              <svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              210 325 9200
            </a>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default PressReleases;
