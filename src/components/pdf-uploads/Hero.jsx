import { Download } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[600px] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 overflow-hidden">
      {/* Background geometric pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-teal-900/20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center h-full">
          <div className="max-w-2xl text-white">
            <div className="mb-4">
              <span className="text-sm font-medium tracking-wider uppercase text-gray-300">
                FEATURED
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
              Top 10 Emerging Technologies of 2025
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              The Top 10 Emerging Technologies of 2025 report highlights 10
              innovations with the potential to reshape industries and
              societies.
            </p>

            <div className="flex items-center space-x-6">
              <span className="text-gray-300">Jun 24, 2025</span>
              <button className="bg-white text-slate-900 hover:bg-gray-100 px-6 py-2 rounded flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 