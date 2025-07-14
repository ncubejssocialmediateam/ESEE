import { Download } from "lucide-react";
import PropTypes from 'prop-types';

export function PublicationCard({
  title,
  description,
  category,
  date,
  imageUrl,
  downloadUrl
}) {
  return (
    <div className="group hover:shadow-lg transition-all duration-300 border-0 overflow-hidden bg-white rounded-lg">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 text-slate-700 text-xs uppercase tracking-wide px-2 py-1 rounded">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-lg mb-3 line-clamp-2 leading-tight">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{date}</span>
          {downloadUrl && (
            <button className="border border-gray-300 text-sm px-3 py-1 rounded hover:bg-gray-50 flex items-center">
              <Download className="w-3 h-3 mr-1" />
              Download PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

PublicationCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  downloadUrl: PropTypes.string
}; 