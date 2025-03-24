import { useState, useEffect } from 'react';
import { getData } from '../api/apiClient.jsx';
import ArticleCard from "../components/article/articleCard.jsx";
import Button from '../components/shared/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setArticles } from '../redux/Reducer';

const Archive = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const articlesPerPage = 12;
    const isDark = useSelector(state => state.darkMode);
    const dispatch = useDispatch();
    const stateArticles = useSelector(state => state.articles);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await getData(`/api/posts?page=${page}&limit=${articlesPerPage}&where[categories][in][]=8`);
                if (page === 1) {
                    dispatch(setArticles(res.data.docs));
                } else {
                    dispatch(setArticles({
                        ...res.data,
                        docs: [...(stateArticles?.docs || []), ...res.data.docs]
                    }));
                }
                setHasMore(res.data.hasNextPage);
            } catch (err) {
                console.error('Error fetching articles:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        void fetchArticles();
    }, [dispatch, page]);

    const loadMore = () => {
        setPage(prev => prev + 1);
        setLoading(true);
    };

    if (loading && page === 1) {
        return (
            <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Αρχείο Νέων
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
                        Αρχείο Νέων
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
                    Αρχείο Νέων
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stateArticles && stateArticles?.map((article) => (
                        <ArticleCard key={article.id} article={article} isDark={isDark} />
                    ))}
                </div>
                {hasMore && !loading && (
                    <div className="mt-8 text-center">
                        <Button onClick={loadMore} isDark={isDark}>
                            Φόρτωση Περισσότερων
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Archive;
