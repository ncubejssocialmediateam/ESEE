import { useState, useCallback } from 'react';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import ParticleBackground from '../components/shared/ParticleBackground';
import ESEE_LOGO_FINAL from '../assets/LOGO-site-final.png';
import { Search, Download, Calendar, FileText, ChevronLeft, ChevronRight, Eye, X, Maximize2, Minimize2 } from 'lucide-react';

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Όλες');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const featuredPublication = {
    id: 0,
    title: 'EU Brief 3',
    description: 'Ενημερωτικό δελτίο της ΕΣΕΕ για τις εξελίξεις στην Ευρωπαϊκή Ένωση και τις επιπτώσεις στο ελληνικό εμπόριο.',
    category: 'Ευρωπαϊκά Δελτία',
    date: '2024-12-15',
    size: '2.5 MB',
    format: 'PDF',
    downloadUrl: '/assets/publications/EU Brief 3.pdf',
    previewImage: '/assets/publications/publications.png'
  };

  const publications = [
    {
      id: 1,
      title: 'EU Brief 3',
      description: 'Ενημερωτικό δελτίο της ΕΣΕΕ για τις εξελίξεις στην Ευρωπαϊκή Ένωση και τις επιπτώσεις στο ελληνικό εμπόριο.',
      category: 'ΕΥΡΩΠΑΪΚΑ ΔΕΛΤΙΑ',
      date: '2024-12-15',
      size: '2.5 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/EU Brief 3.pdf',
      previewImage: '/assets/publications/publications.png'
    },
    {
      id: 2,
      title: 'EU Brief 6-7',
      description: 'Ειδικό δελτίο της ΕΣΕΕ για τις εξελίξεις στην Ευρωπαϊκή Ένωση κατά την περίοδο Ιουνίου-Ιουλίου.',
      category: 'ΕΥΡΩΠΑΪΚΑ ΔΕΛΤΙΑ',
      date: '2024-07-29',
      size: '3.2 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/EU Brief_6_7_20250729_155408_0000.pdf',
      previewImage: '/assets/publications/publications.png'
    },
    {
      id: 3,
      title: 'EU Brief Μάιος',
      description: 'Ενημερωτικό δελτίο της ΕΣΕΕ για τις εξελίξεις στην Ευρωπαϊκή Ένωση κατά τον Μάιο.',
      category: 'ΕΥΡΩΠΑΪΚΑ ΔΕΛΤΙΑ',
      date: '2024-05-31',
      size: '2.1 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/EU Brief_MAIOS.pdf',
      previewImage: '/assets/publications/publications.png'
    }
  ];

  const categories = ['Όλες', ...new Set(publications.map(p => p.category))];

  const filteredPublications = publications.filter(publication => {
    const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          publication.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Όλες' || publication.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(publications.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(publications.length / 3)) % Math.ceil(publications.length / 3));
  };

  const openPdfModal = (publication) => {
    setSelectedPdf(publication);
    setIsPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
    setSelectedPdf(null);
    setIsFullscreen(false);
  };

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const handleDownload = (publication, event) => {
    event.stopPropagation();
    const link = document.createElement('a');
    link.href = publication.downloadUrl;
    link.download = `${publication.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="bg-gray-50 text-gray-900 min-h-screen">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
      <Navigation isDark={false} />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="relative min-h-[80vh] bg-gradient-to-r from-purple-950 to-indigo-950 flex items-center overflow-hidden transition-colors duration-300">
          <ParticleBackground color="#a855f7" count={100} />
          <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="mb-8 flex justify-center">
                <img 
                  src={ESEE_LOGO_FINAL} 
                  alt="Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας"
                  className="max-w-full h-auto max-h-32 md:max-h-40 lg:max-h-48 drop-shadow-lg"
                />
              </div>
              <p className="text-xl md:text-3xl mb-12 leading-relaxed text-purple-100">
                Εξερευνήστε τις έρευνες, τις αναλύσεις και τις μελέτες της ΕΣΕΕ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Publications Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-purple-950 to-indigo-950 overflow-hidden">
        <ParticleBackground color="#8b5cf6" count={80} />
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Επιλεγμένες δημοσιεύσεις:
            </h2>
            
            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors border border-white border-opacity-30"
                aria-label="Προηγούμενη σελίδα"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors border border-white border-opacity-30"
                aria-label="Επόμενη σελίδα"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Publications Carousel */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(publications.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {publications.slice(slideIndex * 3, (slideIndex + 1) * 3).map((publication) => (
                      <div
                        key={publication.id}
                        className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-white/15"
                        onClick={() => openPdfModal(publication)}
                      >
                        {/* Document Corner Icon */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        
                        {/* Document Preview */}
                        <div className="relative mb-6 h-48 rounded-xl overflow-hidden bg-gradient-to-br from-white/20 to-white/10 border-2 border-white/30 group-hover:border-white/50 transition-colors backdrop-blur-sm">
                          {publication.previewImage ? (
                            <img
                              src={publication.previewImage}
                              alt={`${publication.title} Preview`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(event) => {
                            event.target.style.display = 'none';
                            event.target.nextSibling.style.display = 'flex';
                          }}
                            />
                          ) : null}
                          <div className={`absolute inset-0 flex items-center justify-center ${publication.previewImage ? 'hidden' : 'flex'}`}>
                            <div className="text-center">
                              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                                <FileText className="w-10 h-10 text-white" />
                              </div>
                              <div className="text-sm font-semibold text-white">PDF Document</div>
                              <div className="text-xs text-white/80 mt-1">{publication.size}</div>
                            </div>
                          </div>
                          {/* PDF Badge */}
                          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            PDF
                          </div>
                        </div>

                        {/* Category */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 mb-3">
                          {publication.category}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-3 leading-tight text-white group-hover:text-purple-300 transition-colors">
                          {publication.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                          {publication.description}
                        </p>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm text-white/70 mb-6">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(publication.date).toLocaleDateString('el-GR', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openPdfModal(publication);
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-500/25"
                          >
                            <Eye className="w-4 h-4" />
                            Προβολή
                          </button>
                          <button
                            onClick={(e) => handleDownload(publication, e)}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 font-medium border border-white/30"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(publications.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Σελίδα ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Αναζήτηση Δημοσιεύσεων</h2>
            <p className="text-gray-600">Βρείτε τις δημοσιεύσεις που σας ενδιαφέρουν</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Αναζήτηση δημοσιεύσεων..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="block w-full md:w-48 pl-4 pr-10 py-4 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-white">{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPublications.map(publication => (
                <div
                  key={publication.id}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => openPdfModal(publication)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {publication.category}
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  {/* Preview Image */}
                  {publication.previewImage && (
                    <div className="mb-4 h-32 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={publication.previewImage}
                        alt={`${publication.title} Preview`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <h3 className="text-lg font-bold mb-3 leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                    {publication.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {publication.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(publication.date).toLocaleDateString('el-GR')}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPdfModal(publication);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Προβολή
                    </button>
                    <button
                      onClick={(e) => handleDownload(publication, e)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* PDF Modal */}
      {isPdfModalOpen && selectedPdf && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isFullscreen ? 'bg-black' : 'bg-black bg-opacity-75'}`}>
          <div className={`relative ${isFullscreen ? 'w-full h-full' : 'w-11/12 h-4/5 max-w-7xl'} bg-white rounded-lg shadow-2xl overflow-hidden`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedPdf.title}</h3>
                  <p className="text-sm text-gray-500">{selectedPdf.category} • {selectedPdf.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={(e) => handleDownload(selectedPdf, e)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={closePdfModal}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="h-full overflow-hidden bg-gray-100">
              <div className="h-full flex flex-col">
                  {/* PDF Controls */}
                  <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium text-gray-600">
                        📄 PDF Document Viewer
                      </div>
                    </div>
                  </div>

                  {/* PDF Content */}
                  <div className="flex-1 overflow-auto bg-gray-200 p-4">
                    <div className="flex justify-center">
                      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-5xl w-full">
                        <iframe
                          src={selectedPdf.downloadUrl}
                          className="w-full h-[70vh] border-0"
                          title={selectedPdf.title}
                          onError={(e) => {
                            console.error('PDF failed to load:', e);
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        {/* Fallback content if PDF fails to load */}
                        <div className="hidden p-8 text-center">
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <FileText className="w-12 h-12 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedPdf.title}</h3>
                          <p className="text-gray-600 mb-6">{selectedPdf.description}</p>
                          <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                              <span>Κατηγορία:</span>
                              <span className="font-medium">{selectedPdf.category}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                              <span>Ημερομηνία:</span>
                              <span className="font-medium">{new Date(selectedPdf.date).toLocaleDateString('el-GR')}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>Μέγεθος:</span>
                              <span className="font-medium">{selectedPdf.size}</span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                              onClick={(e) => handleDownload(selectedPdf, e)}
                              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Λήψη PDF
                            </button>
                            <a
                              href={selectedPdf.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Άνοιγμα σε νέα καρτέλα
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>📄 PDF Document</span>
                <span>•</span>
                <span>{selectedPdf.size}</span>
                <span>•</span>
                <span>{new Date(selectedPdf.date).toLocaleDateString('el-GR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleDownload(selectedPdf, e)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  <Download className="w-4 h-4" />
                  Λήψη PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer isDark={false} />
    </main>
  );
};

export default Publications;
