import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {useEffect} from "react";

const Opinions = ({ isDark }) => {
  const stateArticles = useSelector(state => state.articles);

  // Filter articles for the 'Απόψεις' category (ID: 7)
  const opinions = stateArticles.filter(article =>
    article.categories.some(category => category.id === 7)
  ).slice(0, 2); // Show only the 2 most recent opinions

  if (!opinions.length) return null;


  return (
    <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          ΑΠΟΨΕΙΣ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {opinions.map(opinion => (
            <article
              key={opinion.id}
              className="group relative cursor-pointer"
            >
              <div className={`absolute -inset-x-4 -inset-y-6 z-0 scale-95 ${
                isDark ? 'bg-gray-800' : 'bg-zinc-100'
              } opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-lg sm:-inset-x-6 sm:rounded-2xl`} />

              <div className="relative z-10 p-2">
                <div className="aspect-video mb-6 overflow-hidden rounded-xl">
                  <img
                    src={`https://back.socialmediateam.gr/${opinion.heroImage?.url}` || 'https://back.socialmediateam.gr/api/media/file/PATS8575-1024x576-300x169.jpg'}
                    alt={opinion.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <h3 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                      {opinion.author?.node?.name || 'ΕΣΕΕ'}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {opinion.author?.node?.description || 'ΕΣΕΕ'}
                    </p>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {opinion.readingTime || '5 λεπτά'}
                  </span>
                </div>

                <h4 className={`text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {opinion.title}
                </h4>

                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-3`}>
                  {opinion.excerpt}
                </p>

                <Link
                  to={`/post/${opinion.slug}`}
                  className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors"
                >
                  <span>Διαβάστε περισσότερα</span>
                  <svg
                    className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>

                <div className={`h-px w-full bg-gradient-to-r ${
                  isDark 
                    ? 'from-gray-700/0 via-gray-700 to-gray-700/0' 
                    : 'from-zinc-200/0 via-zinc-200 to-zinc-200/0'
                }`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

Opinions.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default Opinions;
