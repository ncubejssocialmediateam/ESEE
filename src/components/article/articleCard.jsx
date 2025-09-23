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
    // Destructure article fields based on the new JSON schema
    const { title, slug, content, categories, heroImage, publishedAt } = article;

    // Extract a basic excerpt from the content.
    // Adjust the extraction logic depending on your content structure.
    const excerpt =
        content?.root?.children?.[1]?.children?.[0]?.text ||
        "No excerpt available";

    // Format the date using publishedAt
    const formattedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString('el-GR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'Ημερομηνία μη διαθέσιμη';

    // Use the first category in the array (if available)
    const primaryCategory =
        categories && categories.length > 0 ? categories[0] : null;
    const categoryName = primaryCategory
        ? getCategoryTranslation(primaryCategory.id)
        : '';

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
                                : 'https://via.placeholder.com/400x300?text=No+Image')
                    }
                    alt={heroImage?.alt || 'Default Image'}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />

                <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
            {categoryName}
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
                <Link
                    to={`/post/${slug}`}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-block"
                >
                    Περισσότερα →
                </Link>
            </div>
        </article>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        content: PropTypes.object.isRequired,
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
            })
        ).isRequired,
        heroImage: PropTypes.shape({
            url: PropTypes.string,
            alt: PropTypes.string,
        }),
        publishedAt: PropTypes.string.isRequired,
    }).isRequired,
    isDark: PropTypes.bool.isRequired,
};

export default ArticleCard;
