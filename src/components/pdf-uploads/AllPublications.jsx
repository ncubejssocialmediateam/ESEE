import { PublicationCard } from "./PublicationCard";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";

const allPublications = [
  {
    title: "Four Scenarios for the Future of Travel and Tourism",
    description: "Exploring potential futures for the travel and tourism industry in a post-pandemic world.",
    category: "INDUSTRIES IN DEPTH",
    date: "Jul 10, 2025",
    imageUrl: "https://ext.same-assets.com/2065835624/622622515.jpeg"
  },
  {
    title: "Making Collaboration Work for Climate and Nature: Practical Insights from GAEA Award Winners",
    description: "Insights and lessons learned from award-winning climate and nature collaboration initiatives.",
    category: "CLIMATE ACTION",
    date: "Jul 9, 2025",
    imageUrl: "https://ext.same-assets.com/2065835624/222349533.jpeg"
  },
  {
    title: "Travel and Tourism at a Turning Point: Principles for Transformative Growth",
    description: "Examining the transformation needed for sustainable tourism growth in the modern era.",
    category: "INDUSTRIES IN DEPTH",
    date: "Jul 2, 2025",
    imageUrl: "https://ext.same-assets.com/2065835624/16928682.jpeg"
  },
  {
    title: "The Future of Global Fintech: From Rapid Expansion to Sustainable Growth – Second Edition",
    description: "Updated analysis of the global fintech landscape and sustainable growth strategies.",
    category: "FINANCIAL AND MONETARY SYSTEMS",
    date: "Jun 25, 2025",
    imageUrl: "https://ext.same-assets.com/2065835624/2486437493.jpeg"
  },
  {
    title: "From Scarcity to Solutions: Food-Water Innovation in Asia and the Middle East",
    description: "Innovative solutions addressing food and water security challenges in key regions.",
    category: "FOOD AND WATER",
    date: "Jun 25, 2025",
    imageUrl: "https://ext.same-assets.com/2065835624/1896715938.jpeg"
  },
  {
    title: "Top 10 Emerging Technologies of 2025",
    description: "The annual report highlighting the most promising emerging technologies.",
    category: "EMERGING TECHNOLOGIES",
    date: "Jun 24, 2025",
    imageUrl: "https://ext.same-assets.com/2065835624/2679986628.jpeg"
  },
  {
    title: "Global Economic Futures: Competitiveness in 2030",
    description: "Analysis of global economic competitiveness trends and future projections.",
    category: "ECONOMIC GROWTH",
    date: "Jun 24, 2025",
    imageUrl: "https://ext.same-assets.com/2065835624/1638348866.jpeg"
  },
  {
    title: "Adaptation through Water: Mobilizing the Private Sector for Climate Adaptation in Southeast Asia",
    description: "Strategies for private sector engagement in climate adaptation initiatives.",
    category: "CLIMATE ACTION",
    date: "Jun 23, 2025",
    imageUrl: "https://ext.same-assets.com/2065835624/2943684468.jpeg"
  }
];

export function AllPublications() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-semibold text-slate-900">
            All publications
          </h2>
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {allPublications.map((publication, index) => (
            <PublicationCard
              key={index}
              title={publication.title}
              description={publication.description}
              category={publication.category}
              date={publication.date}
              imageUrl={publication.imageUrl}
              downloadUrl="#"
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-4">
          <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-gray-600">1 / 149</span>
          <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 bg-blue-600 text-white border-blue-600">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
} 