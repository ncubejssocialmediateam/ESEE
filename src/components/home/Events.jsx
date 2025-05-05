import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Events = ({ isDark }) => {
  const stateArticles = useSelector(state => state.articles);

  // Filter articles for the 'Εκδηλώσεις' category (ID: 6)
  const events = stateArticles.filter(article =>
    article.categories.some(category => category.id === 6)
  ).slice(0, 3); // Show only the 3 most recent events

  if (!events.length) return null;

  return (
    <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          ΕΚΔΗΛΩΣΕΙΣ
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-1/2 top-0 w-0.5 h-full ${
            isDark ? 'bg-blue-900' : 'bg-blue-200'
          } transform -translate-x-1/2`} />

          <div className="relative">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`flex items-center mb-16 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Event card */}
                <div className={`relative w-5/12 group ${
                  index % 2 === 0 ? 'pr-12' : 'pl-12'
                }`}>
                  <div className={`${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=500'}
                        alt={event.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            {new Date(event.date).toLocaleDateString('el-GR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isDark 
                            ? 'bg-blue-900 text-blue-200'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          Εκδήλωση
                        </span>
                      </div>

                      <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {event.title}
                      </h3>

                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        {event.excerpt}
                      </p>

                      {event.location && (
                        <div className={`flex items-center ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        } mb-4`}>
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                      )}

                      <Link
                        to={`/post/${event.slug}`}
                        className={`${
                          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                        } font-medium transition-colors`}
                      >
                        Περισσότερα →
                      </Link>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className={`absolute top-1/2 w-4 h-4 rounded-full ${
                    isDark ? 'bg-blue-600' : 'bg-blue-500'
                  } border-4 ${
                    isDark ? 'border-gray-800' : 'border-white'
                  } shadow ${
                    index % 2 === 0 ? 'right-0 transform translate-x-1/2' : 'left-0 transform -translate-x-1/2'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Events.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default Events;
