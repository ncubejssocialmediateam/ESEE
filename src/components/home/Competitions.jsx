import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Competitions = ({ isDark }) => {
  const stateArticles = useSelector(state => state.articles);

  // Filter articles for both 'Διαγωνισμός' (ID: 2) and 'Πρόσκλησεις' (ID: 3) categories
  const items = stateArticles.filter(article =>
    article.categories.some(category => category.id === 2 || category.id === 3)
  ).slice(0, 3); // Show only the 3 most recent items

  if (!items.length) return null;

  return (
    <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          ΔΙΑΓΩΝΙΣΜΟΙ & ΠΡΟΣΚΛΗΣΕΙΣ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => {
            const isCompetition = item.categories.some(category => category.id === 2);

            return (
              <div
                key={item.id}
                className={`group relative ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isDark 
                      ? 'bg-blue-900 text-blue-200'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {isCompetition ? 'Διαγωνισμός' : 'Πρόσκληση'}
                  </span>
                </div>

                <div className="p-8">
                  <div className="mb-4">
                    <span className={`text-sm font-medium ${
                      isDark
                        ? isCompetition ? 'text-purple-400' : 'text-blue-400'
                        : isCompetition ? 'text-purple-600' : 'text-blue-600'
                    }`}>
                      {isCompetition ? 'Διαγωνισμός' : 'Πρόσκληση'}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                    {item.excerpt}
                  </p>

                  {item.categories && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.categories.map(category => (
                        <span
                          key={category.id}
                          className={`px-3 py-1 ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          } rounded-full text-sm`}
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="font-medium">Ημερομηνία:</span> {new Date(item.date).toLocaleDateString('el-GR')}
                    </div>
                    <Link
                      to={`/post/${item.slug}`}
                      className={`${
                        isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      } font-medium transition-colors`}
                    >
                      Περισσότερα →
                    </Link>
                  </div>
                </div>

                <div className={`h-1 w-full ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500'
                } transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

Competitions.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default Competitions;
