import { useState, useEffect } from 'react';
import ArticleCard from "../components/article/articleCard.jsx";
import Button from '../components/shared/Button';
import { useSelector } from 'react-redux';
import { useTheme } from "../context/ThemeContext.jsx";
import { useSearchParams } from 'react-router-dom';

// Category translations for filtering
const categoryTranslations = {
    'ΝΕΑ': 8,
    'Απόψεις': 7,
    'Εκδηλώσεις': 6,
    'Ανακοινώσεις': 5,
    'Δελτία Τύπου': 4,
    'Πρόσκλησεις': 3,
    'Διαγωνισμός': 2,
    'Page': 43,
};

const ARTICLES_PER_PAGE = 20;

const Archive = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const { isDark } = useTheme();
    const stateArticles = useSelector(state => state.articles);
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    // Filter articles based on category parameter
    const filteredArticles = stateArticles
        .filter(article => {
            if (!categoryParam) {
                // If no category specified, show all articles
                return true;
            }
            const categoryId = categoryTranslations[categoryParam];
            return article.categories.some(category => category.id === categoryId);
        })
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)); // Sort by date, newest first

    // Get current page articles
    const currentPageArticles = filteredArticles.slice(0, page * ARTICLES_PER_PAGE);

    // Calculate if there are more articles to load
    const hasMore = filteredArticles.length > page * ARTICLES_PER_PAGE;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!stateArticles.length) {
                setError('Failed to load articles');
            }
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [stateArticles]);

    const loadMore = () => {
        setPage(prev => prev + 1);
        setLoading(true);
        // Simulate loading delay
        setTimeout(() => setLoading(false), 500);
    };

    if (loading && page === 1) {
        return (
            <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {categoryParam || 'Αρχείο Νέων'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-lg h-96 animate-pulse`}
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
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {categoryParam || 'Αρχείο Νέων'}
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
                <h2 className={`text-4xl md:text-5xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {categoryParam || 'Αρχείο Νέων'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {currentPageArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} isDark={isDark} />
                    ))}
                </div>
                {hasMore && (
                    <div className="mt-8 text-center">
                        <Button onClick={loadMore} isDark={isDark}>
                            {loading ? 'Φόρτωση...' : 'Φόρτωση Περισσότερων'}
                        </Button>
                    </div>
                )}
                {filteredArticles.length === 0 && (
                    <div className="text-center mt-8">
                        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Δεν βρέθηκαν άρθρα για την επιλεγμένη κατηγορία.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Archive;
