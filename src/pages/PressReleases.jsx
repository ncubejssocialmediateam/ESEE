import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const PressReleases = () => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const articles = useSelector(state => state.articles);

  useEffect(() => {
    // Filter articles that are press releases
    const pressReleases = articles.filter(article => 
      article.category && (
        article.category.title.toLowerCase().includes('ανακοινώσεις') ||
        article.category.title.toLowerCase().includes('δελτία') ||
        article.category.title.toLowerCase().includes('τύπου') ||
        article.category.title.toLowerCase().includes('press') ||
        article.category.slug === 'press-releases' || 
        article.category.slug === 'announcements' ||
        article.tags?.some(tag => tag.toLowerCase().includes('δελτίο') || tag.toLowerCase().includes('ανακοίνωση'))
      )
    );

    if (selectedYear === 'all') {
      setFilteredArticles(pressReleases);
    } else {
      const filtered = pressReleases.filter(article => {
        const articleYear = new Date(article.createdAt).getFullYear().toString();
        return articleYear === selectedYear;
      });
      setFilteredArticles(filtered);
    }
  }, [articles, selectedYear]);

  // Get unique years from articles
  const years = [...new Set(articles.map(article => 
    new Date(article.createdAt).getFullYear().toString()
  ))].sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gray-50">
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
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedYear === 'all'
                  ? 'bg-blue-600 text-white'
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
              <article key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">
                        Δελτίο Τύπου
                      </span>
                      <time className="text-sm text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString('el-GR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt || article.content?.substring(0, 200) + '...'}
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
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Δεν βρέθηκαν δελτία τύπου</h3>
            <p className="text-gray-500">Δεν υπάρχουν δελτία τύπου για την επιλεγμένη χρονιά.</p>
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
  );
};

export default PressReleases;
