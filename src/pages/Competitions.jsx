import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import ParticleBackground from '../components/shared/ParticleBackground';
import { 
  Search, 
  Download, 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  Target, 
  ChevronLeft, 
  ChevronRight, 
  ArrowDown,
  Filter,
  MapPin,
  Euro,
  FileText,
  ExternalLink
} from 'lucide-react';

const Competitions = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Όλες');
  const [selectedStatus, setSelectedStatus] = useState('Όλες');
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredCompetition = {
    id: 0,
    title: 'Ψηφιακός Μετασχηματισμός 2021-2027',
    description: 'Το πρόγραμμα Ψηφιακός Μετασχηματισμός 2021-2027 στοχεύει στην ενίσχυση της ψηφιακής ωρίμανσης των επιχειρήσεων και στην προώθηση της καινοτομίας μέσω της τεχνολογίας.',
    category: 'Ψηφιακός Μετασχηματισμός',
    status: 'Ενεργό',
    deadline: '2025-03-31',
    budget: '50.000.000€',
    participants: '500+',
    downloadUrl: '/assets/competitions/digital-transformation-2021-2027.pdf'
  };

  const competitions = [
    {
      id: 1,
      title: 'Ανθρώπινο Δυναμικό και Κοινωνική Συνοχή 2021-2027',
      description: 'Πρόγραμμα που στοχεύει στην ανάπτυξη των ανθρώπινων πόρων και την ενίσχυση της κοινωνικής συνοχής στις επιχειρήσεις.',
      category: 'Ανθρώπινο Δυναμικό',
      status: 'Ενεργό',
      deadline: '2025-04-15',
      budget: '30.000.000€',
      participants: '300+',
      location: 'Εθνικό',
      downloadUrl: '/assets/competitions/human-resources-2021-2027.pdf'
    },
    {
      id: 2,
      title: 'Ε.Π. Ανάπτυξη Ανθρώπινου Δυναμικού – Εκπαίδευση & Δια Βίου Μάθηση 2014-20',
      description: 'Επιχειρησιακό Πρόγραμμα για την ανάπτυξη των ανθρώπινων πόρων μέσω εκπαίδευσης και δια βίου μάθησης.',
      category: 'Εκπαίδευση',
      status: 'Ολοκληρωμένο',
      deadline: '2020-12-31',
      budget: '25.000.000€',
      participants: '250+',
      location: 'Εθνικό',
      downloadUrl: '/assets/competitions/education-lifelong-learning-2014-20.pdf'
    },
    {
      id: 3,
      title: 'Ε.Π. «Ανταγωνιστικότητα, Επιχειρηματικότητα & Καινοτομία 2014-2020»',
      description: 'Πρόγραμμα που ενισχύει την ανταγωνιστικότητα των επιχειρήσεων μέσω της επιχειρηματικότητας και της καινοτομίας.',
      category: 'Ανταγωνιστικότητα',
      status: 'Ολοκληρωμένο',
      deadline: '2020-12-31',
      budget: '40.000.000€',
      participants: '400+',
      location: 'Εθνικό',
      downloadUrl: '/assets/competitions/competitiveness-innovation-2014-2020.pdf'
    },
    {
      id: 4,
      title: 'Ε.Π. «Ανάπτυξη Ανθρώπινου Δυναμικού»',
      description: 'Επιχειρησιακό Πρόγραμμα για την ανάπτυξη και την εκπαίδευση του ανθρώπινου δυναμικού στις επιχειρήσεις.',
      category: 'Ανθρώπινο Δυναμικό',
      status: 'Ολοκληρωμένο',
      deadline: '2020-12-31',
      budget: '20.000.000€',
      participants: '200+',
      location: 'Εθνικό',
      downloadUrl: '/assets/competitions/human-development.pdf'
    },
    {
      id: 5,
      title: 'Ε.Π. «Ιόνια Νησιά»',
      description: 'Ειδικό πρόγραμμα για την ανάπτυξη των Ιονίων Νησιών και την ενίσχυση των τοπικών επιχειρήσεων.',
      category: 'Περιφερειακή Ανάπτυξη',
      status: 'Ενεργό',
      deadline: '2025-06-30',
      budget: '15.000.000€',
      participants: '150+',
      location: 'Ιόνια Νησιά',
      downloadUrl: '/assets/competitions/ionian-islands.pdf'
    },
    {
      id: 6,
      title: 'Ε.Π. «Ανταγωνιστικότητα & Επιχειρηματικότητα»',
      description: 'Πρόγραμμα που στοχεύει στην ενίσχυση της ανταγωνιστικότητας και της επιχειρηματικότητας στις ελληνικές επιχειρήσεις.',
      category: 'Ανταγωνιστικότητα',
      status: 'Ολοκληρωμένο',
      deadline: '2020-12-31',
      budget: '35.000.000€',
      participants: '350+',
      location: 'Εθνικό',
      downloadUrl: '/assets/competitions/competitiveness-entrepreneurship.pdf'
    },
    {
      id: 7,
      title: 'Ε.Π. «Ευρωπαϊκό Ταμείο Προσαρμογής στην Παγκοσμιοποίηση»',
      description: 'Ευρωπαϊκό πρόγραμμα για την προσαρμογή των επιχειρήσεων στην παγκοσμιοποίηση και τις νέες προκλήσεις.',
      category: 'Ευρωπαϊκά Προγράμματα',
      status: 'Ολοκληρωμένο',
      deadline: '2020-12-31',
      budget: '45.000.000€',
      participants: '450+',
      location: 'Ευρωπαϊκό',
      downloadUrl: '/assets/competitions/european-adjustment-fund.pdf'
    }
  ];

  const categories = ['Όλες', ...new Set(competitions.map(c => c.category))];
  const statuses = ['Όλες', 'Ενεργό', 'Ολοκληρωμένο', 'Προσεχώς'];

  const filteredCompetitions = competitions.filter(competition => {
    const matchesSearch = competition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          competition.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Όλες' || competition.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Όλες' || competition.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(competitions.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(competitions.length / 3)) % Math.ceil(competitions.length / 3));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ενεργό': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Ολοκληρωμένο': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Προσεχώς': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const isDeadlineNear = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation isDark={true} />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Particle Background */}
        {isDark && <ParticleBackground color="#00d4ff" count={100} />}
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Award className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-medium">Ενεργό Πρόγραμμα</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            {featuredCompetition.title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90">
            {featuredCompetition.description}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-white/70" />
              <span className="text-lg opacity-80">
                Λήξη: {new Date(featuredCompetition.deadline).toLocaleDateString('el-GR')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Euro className="w-5 h-5 text-white/70" />
              <span className="text-lg opacity-80">
                {featuredCompetition.budget}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-white/70" />
              <span className="text-lg opacity-80">
                {featuredCompetition.participants} συμμετέχοντες
              </span>
            </div>
          </div>
          
          <a
            href={featuredCompetition.downloadUrl}
            download
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-lg"
          >
            <ArrowDown className="w-5 h-5" />
            Λήψη Πληροφοριών
          </a>
        </div>
      </section>

      {/* Featured Competitions Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Διαγωνισμοί & Προσκλήσεις:
            </h2>
            
            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Προηγούμενη σελίδα"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Επόμενη σελίδα"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Competitions Carousel */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(competitions.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {competitions.slice(slideIndex * 3, (slideIndex + 1) * 3).map((competition) => (
                      <div
                        key={competition.id}
                        className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                      >
                        {/* Status Badge */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(competition.status)}`}>
                          {competition.status}
                        </div>
                        
                        {/* Cover Image */}
                        <div className="relative mb-6 h-48 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
                          <div className="w-full h-full flex items-center justify-center">
                            <Award className="w-16 h-16 text-white/30" />
                          </div>
                        </div>

                        {/* Category */}
                        <div className="text-sm font-medium text-white/80 mb-2 uppercase tracking-wide">
                          {competition.category}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-3 leading-tight">
                          {competition.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                          {competition.description}
                        </p>

                        {/* Details */}
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Calendar className="w-4 h-4" />
                            <span>Λήξη: {new Date(competition.deadline).toLocaleDateString('el-GR')}</span>
                            {isDeadlineNear(competition.deadline) && (
                              <span className="text-yellow-400 font-medium">(Σύντομα!)</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Euro className="w-4 h-4" />
                            <span>{competition.budget}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <MapPin className="w-4 h-4" />
                            <span>{competition.location}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <a
                            href={competition.downloadUrl}
                            download
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
                          >
                            <Download className="w-4 h-4" />
                            Λήψη
                          </a>
                          <button className="px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                            <ExternalLink className="w-4 h-4" />
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
            {Array.from({ length: Math.ceil(competitions.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
                aria-label={`Σελίδα ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Αναζήτηση Διαγωνισμών</h2>
            <p className="text-white/70">Βρείτε τους διαγωνισμούς και τις προσκλήσεις που σας ενδιαφέρουν</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Αναζήτηση διαγωνισμών..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <select
                className="block w-full pl-12 pr-10 py-4 bg-white/10 border border-white/20 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800">{category}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <select
                className="block w-full pl-12 pr-10 py-4 bg-white/10 border border-white/20 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status} className="bg-gray-800">{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Results */}
          {(searchTerm || selectedCategory !== 'Όλες' || selectedStatus !== 'Όλες') && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompetitions.map(competition => (
                <div
                  key={competition.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(competition.status)}`}>
                      {competition.status}
                    </div>
                    <div className="text-sm font-medium text-white/80 uppercase tracking-wide">
                      {competition.category}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 leading-tight">
                    {competition.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {competition.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(competition.deadline).toLocaleDateString('el-GR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Euro className="w-4 h-4" />
                      <span>{competition.budget}</span>
                    </div>
                  </div>
                  
                  <a
                    href={competition.downloadUrl}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
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
      
      <Footer isDark={true} />
    </main>
  );
};

export default Competitions;
