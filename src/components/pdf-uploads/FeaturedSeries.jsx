import { ChevronLeft, ChevronRight } from "lucide-react";

const featuredSeries = [
  {
    title: "Global Risks Report",
    description: "The annual Global Risks Report explores some of the most severe risks we may face in the coming years. Underpinned by the Forum's Global Risks Perception Survey, the report brings together leading insights from over 1,200 experts across the world.",
    latestEdition: "2025",
    editions: "16 editions",
    imageUrl: "https://ext.same-assets.com/2065835624/2546493846.jpeg"
  },
  {
    title: "Global Cybersecurity Outlook",
    description: "The Global Cybersecurity Outlook reports examine the cybersecurity trends that will impact our economies and societies in the year to come.",
    latestEdition: "2025",
    editions: "4 editions",
    imageUrl: "https://ext.same-assets.com/2065835624/1636659845.jpeg"
  },
  {
    title: "Top 10 Emerging Technologies",
    description: "The annual Top 10 Emerging Technologies report highlights the technologies set to positively impact society within the next three to five years. The report provides a qualitative assessment of each technology's potential impact on people and the planet.",
    latestEdition: "2025",
    editions: "8 editions",
    imageUrl: "https://ext.same-assets.com/2065835624/2043539188.jpeg"
  }
];

export function FeaturedSeries() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            Featured series
          </h2>
          <div className="flex space-x-2">
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSeries.map((series, index) => (
            <div key={index} className="space-y-6">
              <div>
                <span className="bg-gray-200 text-gray-700 text-xs uppercase tracking-wide px-2 py-1 rounded mb-3 inline-block">
                  SERIES
                </span>
                <h3 className="text-xl font-semibold mb-4">
                  {series.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {series.description}
                </p>
              </div>

              <div className="border border-gray-200 bg-white rounded-lg">
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={series.imageUrl}
                      alt={series.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium text-sm mb-1">
                        Latest edition: {series.latestEdition}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {series.editions}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 