import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { Search, Download, Calendar, FileText, Users, TrendingUp, BookOpen, Award, Globe, Lightbulb } from 'lucide-react';

const Publications = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Όλες');

  const publications = [
    {
      id: 1,
      title: 'Ετήσια Έκθεση ΕΣΕΕ 2024',
      description: 'Πλήρης έκθεση των δραστηριοτήτων και των επιτευγμάτων της ΕΣΕΕ για το έτος 2024',
      category: 'Εκθέσεις',
      date: '2024-12-15',
      size: '2.5 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/annual-report-2024.pdf',
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 2,
      title: 'Οδηγός Επιχειρηματικότητας 2024',
      description: 'Πλήρης οδηγός για την έναρξη και λειτουργία επιχειρήσεων στην Ελλάδα',
      category: 'Οδηγοί',
      date: '2024-11-20',
      size: '1.8 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/entrepreneurship-guide-2024.pdf',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      id: 3,
      title: 'Στατιστικά Εμπορίου 2024',
      description: 'Αναλυτικά στατιστικά στοιχεία για το εμπόριο και την επιχειρηματικότητα',
      category: 'Στατιστικά',
      date: '2024-10-30',
      size: '3.2 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/trade-statistics-2024.pdf',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      id: 4,
      title: 'Έρευνα Μικρομεσαίων Επιχειρήσεων',
      description: 'Ερευνητική μελέτη για τις προκλήσεις και τις ευκαιρίες των ΜΜΕ',
      category: 'Έρευνες',
      date: '2024-09-15',
      size: '2.1 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/sme-research-2024.pdf',
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 5,
      title: 'Κατάλογος Μελών ΕΣΕΕ 2024',
      description: 'Πλήρης κατάλογος των μελών της ΕΣΕΕ ανά περιοχή και κλάδο',
      category: 'Κατάλογοι',
      date: '2024-08-25',
      size: '1.5 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/members-catalog-2024.pdf',
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 6,
      title: 'Προτάσεις Πολιτικής 2024',
      description: 'Οι προτάσεις της ΕΣΕΕ για την ανάπτυξη της επιχειρηματικότητας',
      category: 'Προτάσεις',
      date: '2024-07-10',
      size: '1.9 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/policy-proposals-2024.pdf',
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      id: 7,
      title: 'Διεθνείς Συνεργασίες 2024',
      description: 'Αναφορά για τις διεθνείς συνεργασίες και προγράμματα της ΕΣΕΕ',
      category: 'Διεθνή',
      date: '2024-06-20',
      size: '2.3 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/international-cooperation-2024.pdf',
      icon: <Globe className="w-6 h-6" />
    },
    {
      id: 8,
      title: 'Βραβεύσεις & Αναγνώριση 2024',
      description: 'Κατάλογος των βραβεύσεων και αναγνώσεων που έλαβε η ΕΣΕΕ',
      category: 'Βραβεύσεις',
      date: '2024-05-15',
      size: '1.2 MB',
      format: 'PDF',
      downloadUrl: '/assets/publications/awards-recognition-2024.pdf',
      icon: <Award className="w-6 h-6" />
    }
  ];

  const categories = ['Όλες', ...new Set(publications.map(p => p.category))];

  const filteredPublications = publications.filter(publication => {
    const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          publication.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Όλες' || publication.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Δημοσιεύσεις
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
            <p className={`text-xl leading-relaxed max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Εξερευνήστε τις δημοσιεύσεις, εκθέσεις και μελέτες της ΕΣΕΕ
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Αναζήτηση δημοσιεύσεων..."
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-600'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className={`block w-full md:w-48 pl-3 pr-10 py-3 border rounded-lg appearance-none focus:outline-none focus:ring-2 ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-600'
                }`}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Publications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublications.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Δεν βρέθηκαν δημοσιεύσεις με τα κριτήρια αναζήτησης.
                </p>
              </div>
            ) : (
              filteredPublications.map(publication => (
                <div
                  key={publication.id}
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                      : 'bg-white border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                    isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {publication.icon}
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className={`text-lg font-semibold mb-2 leading-tight ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {publication.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {publication.description}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className={`text-xs space-y-1 mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(publication.date).toLocaleDateString('el-GR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-3 h-3" />
                      <span>{publication.size} • {publication.format}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{publication.category}</span>
                    </div>
                  </div>

                  {/* Download Button */}
                  <a
                    href={publication.downloadUrl}
                    download
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isDark
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    Λήψη
                  </a>
                </div>
              ))
            )}
          </div>

          {/* Additional Info */}
          <div className={`mt-16 p-8 rounded-2xl ${
            isDark
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-200 shadow-lg'
          }`}>
            <div className="text-center">
              <h3 className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Περισσότερες Δημοσιεύσεις
              </h3>
              <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Για περισσότερες δημοσιεύσεις και εκθέσεις, επισκεφτείτε την επίσημη ιστοσελίδα της ΕΣΕΕ
                ή επικοινωνήστε με το Γραφείο Τύπου μας.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://esee.gr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    isDark
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Επίσκεψη ESEE.GR
                </a>
                <a
                  href="/contact"
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    isDark
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  Επικοινωνία
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isDark={isDark} />
    </main>
  );
};

export default Publications;
