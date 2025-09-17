import { useState, useEffect } from 'react';
import ArticleCard from "../components/article/articleCard.jsx";
import Button from '../components/shared/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from "../context/ThemeContext.jsx";
import { useSearchParams } from 'react-router-dom';
import { getData } from '../api/apiClient.jsx';
import { setArticles } from '../redux/Reducer.jsx';

// Category translations for filtering (excluding redundant press release categories)
const categoryTranslations = {
    'ΝΕΑ': 8,
    'Απόψεις': 7,
    'Εκδηλώσεις': 6,
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
    const dispatch = useDispatch();


    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []); //

    // Add effect to fetch articles if they are not in the store
    useEffect(() => {
        const fetchArticles = async () => {
            if (!stateArticles.length) {
                try {
                    const res = await getData('/api/posts?limit=10000');
                    dispatch(setArticles(res.data.docs));
                } catch (err) {
                    console.error('Error fetching articles:', err);
                    setError(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        void fetchArticles();
    }, [stateArticles.length, dispatch]);

    // Filter articles based on category parameter
    const filteredArticles = stateArticles
        .filter(article => {
            // Exclude press release articles by default
            const isPressRelease = article.categories?.some(category => 
                category.title?.toLowerCase().includes('ανακοινώσεις') ||
                category.title?.toLowerCase().includes('δελτία') ||
                category.title?.toLowerCase().includes('τύπου') ||
                category.title?.toLowerCase().includes('press')
            );
            
            if (isPressRelease) {
                return false; // Exclude press releases from archive
            }
            
            if (!categoryParam) {
                // If no category specified, show all non-press-release articles
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
