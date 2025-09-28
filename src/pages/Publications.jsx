import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { Search, Download, Calendar, FileText, Users, TrendingUp, BookOpen, Award, Globe, Lightbulb, ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';

const Publications = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Όλες');
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredPublication = {
    id: 0,
    title: 'Ετήσια Έκθεση ΕΣΕΕ 2024',
    description: 'Η Ετήσια Έκθεση ΕΣΕΕ εξερευνά πώς οι ηγέτες χτίζουν ανθεκτικές, συμπεριληπτικές και τεχνολογικά ενισχυμένες επιχειρηματικές κοινότητες μέσω πολιτισμού, τεχνητής νοημοσύνης και ευέλικτου σχεδιασμού.',
    category: 'Εκθέσεις',
    date: '2024-12-15',
    size: '2.5 MB',
    format: 'PDF',
    downloadUrl: '/assets/publications/annual-report-2024.pdf'
  };

  const publications = [
    {
      id: 1,
      title: 'Τεχνολογίες Κλειδί: Στρατηγικές και Ευκαιρίες για Ηγέτες Χρηματοοικονομικών Υπηρεσιών',
      description: 'Η μελέτη Τεχνολογίες Κλειδί: Στρατηγικές και Ευκαιρίες για Χρηματοοικονομικές Υπηρεσίες αξιολογεί τις προκλήσεις...',
      category: 'ΤΕΧΝΟΛΟΓΙΕΣ',
      date: '2024-11-20',
      size: '1.8 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/tech-strategies-2024.pdf'
    },
    {
      id: 2,
      title: 'Ταξίδι και Τουρισμός σε Σημείο Καμπής: Αρχές για Μετασχηματική Ανάπτυξη',
      description: 'Με τον κλάδο ταξιδιών και τουρισμού να προβλέπεται να συμβάλει 16 τρισεκατομμύρια δολάρια στο παγκόσμιο ΑΕΠ μέχρι το 2034...',
      category: 'ΒΙΟΜΗΧΑΝΙΕΣ',
      date: '2024-10-30',
      size: '3.2 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/tourism-growth-2024.pdf'
    },
    {
      id: 3,
      title: 'Το Μέλλον της Παγκόσμιας Fintech: Από την Γρήγορη Επέκταση στην Βιώσιμη Ανάπτυξη',
      description: 'Η δεύτερη έκδοση της μελέτης εξερευνά την εξέλιξη του κλάδου fintech και τις προκλήσεις της βιώσιμης ανάπτυξης...',
      category: 'ΧΡΗΜΑΤΟΟΙΚΟΝΟΜΙΚΑ ΣΥΣΤΗΜΑΤΑ',
      date: '2024-09-15',
      size: '2.1 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/fintech-future-2024.pdf'
    },
    {
      id: 4,
      title: 'Ενθάρρυνση Αποτελεσματικής Ενεργειακής Μετάβασης 2024',
      description: 'Μετά από αρκετά χρόνια αργής δυναμικής, η πρόοδος της ενεργειακής μετάβασης έχει επιταχυνθεί, σύμφωνα με τον Παγκόσμιο...',
      category: 'ΕΝΕΡΓΕΙΑΚΗ ΜΕΤΑΒΑΣΗ',
      date: '2024-08-25',
      size: '1.5 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/energy-transition-2024.pdf'
    },
    {
      id: 5,
      title: 'Οδηγός Επιχειρηματικότητας 2024',
      description: 'Πλήρης οδηγός για την έναρξη και λειτουργία επιχειρήσεων στην Ελλάδα',
      category: 'ΟΔΗΓΟΙ',
      date: '2024-07-10',
      size: '1.9 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/entrepreneurship-guide-2024.pdf'
    },
    {
      id: 6,
      title: 'Ετήσια Έκθεση ΕΣΕΕ 2023',
      description: 'Η Ετήσια Έκθεση ΕΣΕΕ 2023 παρουσιάζει τα αποτελέσματα και τις επιτεύξεις της οργάνωσης',
      category: 'ΕΚΘΕΣΕΙΣ',
      date: '2023-12-15',
      size: '2.8 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/annual-report-2023.pdf'
    },
    {
      id: 7,
      title: 'Ετήσια Έκθεση ΕΣΕΕ 2022',
      description: 'Η Ετήσια Έκθεση ΕΣΕΕ 2022 εξερευνά τις προκλήσεις και τις ευκαιρίες του ελληνικού εμπορίου',
      category: 'ΕΚΘΕΣΕΙΣ',
      date: '2022-12-15',
      size: '2.3 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/annual-report-2022.pdf'
    },
    {
      id: 8,
      title: 'Euro Brief - Οκτώβριος 2024',
      description: 'Μηνιαίο ενημερωτικό δελτίο για τις ευρωπαϊκές εξελίξεις που επηρεάζουν το ελληνικό εμπόριο',
      category: 'EURO BRIEFS',
      date: '2024-10-01',
      size: '1.2 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/euro-brief-october-2024.pdf'
    },
    {
      id: 9,
      title: 'Euro Brief - Σεπτέμβριος 2024',
      description: 'Μηνιαίο ενημερωτικό δελτίο για τις ευρωπαϊκές εξελίξεις που επηρεάζουν το ελληνικό εμπόριο',
      category: 'EURO BRIEFS',
      date: '2024-09-01',
      size: '1.1 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/euro-brief-september-2024.pdf'
    },
    {
      id: 10,
      title: 'Euro Brief - Αύγουστος 2024',
      description: 'Μηνιαίο ενημερωτικό δελτίο για τις ευρωπαϊκές εξελίξεις που επηρεάζουν το ελληνικό εμπόριο',
      category: 'EURO BRIEFS',
      date: '2024-08-01',
      size: '1.3 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/euro-brief-august-2024.pdf'
    },
    {
      id: 11,
      title: 'Ετήσια Έκθεση ΕΣΕΕ 2021',
      description: 'Η Ετήσια Έκθεση ΕΣΕΕ 2021 παρουσιάζει την ανάκαμψη του ελληνικού εμπορίου μετά την πανδημία',
      category: 'ΕΚΘΕΣΕΙΣ',
      date: '2021-12-15',
      size: '2.1 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/annual-report-2021.pdf'
    },
    {
      id: 12,
      title: 'Euro Brief - Ιούλιος 2024',
      description: 'Μηνιαίο ενημερωτικό δελτίο για τις ευρωπαϊκές εξελίξεις που επηρεάζουν το ελληνικό εμπόριο',
      category: 'EURO BRIEFS',
      date: '2024-07-01',
      size: '1.0 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/euro-brief-july-2024.pdf'
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

  return (
    <main className="bg-gray-50 text-gray-900 min-h-screen">
      <Navigation isDark={false} />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800">
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            {featuredPublication.title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90">
            {featuredPublication.description}
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-lg opacity-80">
              {new Date(featuredPublication.date).toLocaleDateString('el-GR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <a
              href={featuredPublication.downloadUrl}
              download
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <ArrowDown className="w-5 h-5" />
              Λήψη PDF
            </a>
          </div>
        </div>
      </section>

      {/* Featured Publications Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Επιλεγμένες δημοσιεύσεις:
            </h2>
            
            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Προηγούμενη σελίδα"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Επόμενη σελίδα"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
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
                        className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        {/* Document Corner Icon */}
                        <div className="absolute top-4 right-4 w-6 h-6 bg-black rounded-sm opacity-60">
                          <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 rounded-sm"></div>
                        </div>
                        
                        {/* Document Icon */}
                        <div className="relative mb-6 h-48 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <div className="text-center">
                            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-2" />
                            <div className="text-sm font-medium text-blue-800">PDF Document</div>
                          </div>
                        </div>

                        {/* Category */}
                        <div className="text-sm font-medium text-blue-600 mb-2 uppercase tracking-wide">
                          {publication.category}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-3 leading-tight text-gray-900">
                          {publication.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {publication.description}
                        </p>

                        {/* Date */}
                        <div className="text-sm text-gray-500 mb-6">
                          {new Date(publication.date).toLocaleDateString('el-GR', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>

                        {/* Download Button */}
                        <a
                          href={publication.downloadUrl}
                          download
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          <Download className="w-4 h-4" />
                          Λήψη PDF
                        </a>
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
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-sm font-medium text-blue-600 mb-2 uppercase tracking-wide">
                    {publication.category}
                  </div>
                  <h3 className="text-lg font-bold mb-3 leading-tight text-gray-900">
                    {publication.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {publication.description}
                  </p>
                  <div className="text-sm text-gray-500 mb-4">
                    {new Date(publication.date).toLocaleDateString('el-GR')}
                  </div>
                  <a
                    href={publication.downloadUrl}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Λήψη
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer isDark={false} />
    </main>
  );
};

export default Publications;
