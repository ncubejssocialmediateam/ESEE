import { PublicationCard } from "./PublicationCard";

const featuredPublications = [
  {
    title: "The Future of Global Fintech: From Rapid Expansion to Sustainable Growth - Second Edition",
    description: "Global Fintech growth has experienced a rapid rise. This report examines sustainable practices.",
    category: "FINANCIAL AND MONETARY SYSTEMS",
    date: "Jun 25, 2025",
    imageUrl: "https://ext.same-assets.com/2065835624/160900217.jpeg"
  },
  {
    title: "Fostering Effective Energy Transition 2025",
    description: "After several years of slow momentum, energy transition progress has accelerated.",
    category: "ENERGY TRANSITION",
    date: "Jun 18, 2025",
    imageUrl: "https://ext.same-assets.com/2065835624/116932586.jpeg"
  },
  {
    title: "Global Gender Gap Report 2025",
    description: "Global Gender Gap Index 2025 benchmarks gender parity across 148 economies.",
    category: "EQUITY, DIVERSITY AND INCLUSION",
    date: "Jun 12, 2025",
    imageUrl: "https://ext.same-assets.com/2065835624/2554234806.jpeg"
  },
  {
    title: "Technology Convergence Report 2025",
    description: "The Technology Convergence Report 2025 offers leaders a strategic lens - the 3C...",
    category: "FOURTH INDUSTRIAL REVOLUTION",
    date: "Jun 3, 2025",
    imageUrl: "https://ext.same-assets.com/2065835624/3916492660.jpeg"
  }
];

export function FeaturedPublications() {
  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
              <div className="w-4 h-4 bg-slate-900 rounded-full"></div>
            </div>
            <h2 className="text-2xl font-light text-white">
              Featured publications:
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPublications.map((publication, index) => (
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
      </div>
    </section>
  );
} 