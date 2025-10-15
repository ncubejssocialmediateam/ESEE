import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Category translations reused across the component
const categoryTranslations = {
    2: 'Διαγωνισμός',
    3: 'Πρόσκλησεις',
    4: 'Δελτία Τύπου',
    5: 'Ανακοινώσεις',
    6: 'Εκδηλώσεις',
    7: 'Απόψεις',
    8: 'Νέα',
    9: 'Page',
};

const getCategoryTranslation = (categoryId) =>
    categoryTranslations[categoryId] || categoryId;

const ArticleCard = ({ article, isDark }) => {
    // Support both modern articles and legacy (old2025) items
    const isLegacy = article?.source === 'old2025' || String(article?.id || '').startsWith('legacy-');
    const { title, slug, content, categories, heroImage, featuredImage, publishedAt } = article;

    // Extract a basic excerpt from the content.
    // Adjust the extraction logic depending on your content structure.
    const stripHtml = (html) => (html || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    let excerpt = '';
    if (article?.excerpt) {
        excerpt = article.excerpt;
    } else if (typeof content === 'string') {
        const text = stripHtml(content);
        excerpt = text.substring(0, 180) + (text.length > 180 ? '…' : '');
    } else {
        excerpt = content?.root?.children?.[1]?.children?.[0]?.text || "No excerpt available";
    }

    // Format the date using publishedAt or createdAt as fallback
    const formatDate = (dateString) => {
        if (!dateString) return 'Ημερομηνία μη διαθέσιμη';
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Ημερομηνία μη διαθέσιμη';
        
        return date.toLocaleDateString('el-GR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    
    const formattedDate = formatDate(publishedAt || article.createdAt);

    // Category handling for modern vs legacy
    const primaryCategory = Array.isArray(categories) && categories.length > 0 ? categories[0] : null;
    const legacyCategoryTitle = article?.category?.title || '';
    // Normalize legacy taxonomy to our labels
    let displayCategory = legacyCategoryTitle;
    if (primaryCategory) {
        displayCategory = getCategoryTranslation(primaryCategory.id);
    } else if (legacyCategoryTitle) {
        const lc = legacyCategoryTitle.toLowerCase();
        if (lc.includes('δελτ') || lc.includes('τύπου') || lc.includes('press')) displayCategory = 'Δελτία Τύπου';
        else if (lc.includes('ανακοιν')) displayCategory = 'Ανακοινώσεις';
        else if (lc.includes('νέα')) displayCategory = 'Νέα';
    }

    return (
        <article
            className={`${
                isDark ? 'bg-gray-800' : 'bg-white'
            } rounded-xl overflow-hidden shadow-lg transform-gpu transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={
                        heroImage?.url
                            ? `https://back.socialmediateam.gr${heroImage.url}`
                            : (heroImage?.filename
                                ? `https://back.socialmediateam.gr/api/media/file/${encodeURIComponent(heroImage.filename)}`
                                : (featuredImage?.url || 'https://via.placeholder.com/400x300?text=No+Image'))
                    }
                    alt={heroImage?.alt || title || 'Default Image'}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />

                <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
            {displayCategory}
          </span>
                </div>
            </div>
            <div className="p-6">
                <time className="text-sm text-gray-500 mb-2 block">
                    {formattedDate}
                </time>
                <h3
                    className={`text-xl font-bold mb-3 line-clamp-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                    }`}
                >
                    {title}
                </h3>
                <p
                    className={`${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                    } mb-4 line-clamp-3`}
                >
                    {excerpt}
                </p>
                {isLegacy && article?.url ? (
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-block"
                    >
                        Περισσότερα →
                    </a>
                ) : (
                    <Link
                        to={`/post/${slug}`}
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-block"
                    >
                        Περισσότερα →
                    </Link>
                )}
            </div>
        </article>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        title: PropTypes.string.isRequired,
        slug: PropTypes.string,
        content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        excerpt: PropTypes.string,
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string,
            })
        ),
        category: PropTypes.shape({
            title: PropTypes.string,
            slug: PropTypes.string,
        }),
        heroImage: PropTypes.shape({
            url: PropTypes.string,
            alt: PropTypes.string,
            filename: PropTypes.string,
        }),
        featuredImage: PropTypes.shape({
            url: PropTypes.string,
        }),
        publishedAt: PropTypes.string,
        createdAt: PropTypes.string,
        source: PropTypes.string,
        url: PropTypes.string,
    }).isRequired,
    isDark: PropTypes.bool.isRequired,
};

export default ArticleCard;
