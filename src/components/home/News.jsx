import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArticleCard from "../article/articleCard.jsx";
import { useSelector } from 'react-redux';
import Button from '../shared/Button';

const News = ({ isDark }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const stateArticles = useSelector(state => state.articles);

    // Filter articles that have a category with id: 8 and sort by publication date (newest first)
    const filteredArticles = stateArticles
        .filter(article => article.categories.some(category => category.id === 8))
        .sort((a, b) => {
            // Use createdAt as fallback if publishedAt is not available or invalid
            const dateA = a.publishedAt || a.createdAt;
            const dateB = b.publishedAt || b.createdAt;
            
            // Parse dates and handle invalid dates
            const parsedDateA = new Date(dateA);
            const parsedDateB = new Date(dateB);
            
            // If dates are invalid, use createdAt as fallback
            if (isNaN(parsedDateA.getTime())) {
                const fallbackA = new Date(a.createdAt);
                return isNaN(fallbackA.getTime()) ? 0 : fallbackA.getTime();
            }
            if (isNaN(parsedDateB.getTime())) {
                const fallbackB = new Date(b.createdAt);
                return isNaN(fallbackB.getTime()) ? 0 : fallbackB.getTime();
            }
            
            // Sort by newest first
            return parsedDateB.getTime() - parsedDateA.getTime();
        })
        .slice(0, 6);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000)
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
                    {filteredArticles && filteredArticles?.map((article) => (
                        <ArticleCard key={article.id} article={article} isDark={isDark} />
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <Link to="/archive">
                        <Button isDark={isDark} onClick={() => {}}>
                            Αρχείο Νέων
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

News.propTypes = {
    isDark: PropTypes.bool.isRequired,
};

export default News;
