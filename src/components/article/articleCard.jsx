import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import CustomCursor from "../shared/CustomCursor.jsx";


// Category translations reused across the component
const categoryTranslations = {
    NEWS: 'Νέα',
    OPINION: 'Γνώμη',
    RESEARCH: 'Έρευνα',
    INNOVATION: 'Καινοτομία',
    COMPETITION: 'Διαγωνισμός',
    EVENT: 'Εκδήλωση',
    FEATURE: 'Αφιέρωμα',
};

const getCategoryTranslation = (category) =>
    categoryTranslations[category] || category;


const ArticleCard = ({ article, isDark }) => {
    const { id, title, slug, excerpt, category, image_url, published_at } = article;

    console.log('article  =>  ', article);

    const formattedDate = published_at
        ? new Date(published_at).toLocaleDateString('el-GR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'Ημερομηνία μη διαθέσιμη';

    return (
        <article
            className={`${
                isDark ? 'bg-gray-800' : 'bg-white'
            } rounded-xl overflow-hidden shadow-lg transform-gpu transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={title}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
            {getCategoryTranslation(category)}
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
                <Link to={`/post/${slug}`} className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-block">
                    Περισσότερα →
                </Link>

            </div>
        </article>
    );
};

export default ArticleCard;

ArticleCard.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        slug: PropTypes.string,
        excerpt: PropTypes.string,
        category: PropTypes.string,
        image_url: PropTypes.string,
        published_at: PropTypes.string,
    }).isRequired,
    isDark: PropTypes.bool.isRequired,
};
