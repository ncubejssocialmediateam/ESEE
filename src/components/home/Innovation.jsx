import { Lightbulb, Award, ArrowRight, BookOpen, TrendingUp, Share2, Building2 } from 'lucide-react';
import PropTypes from 'prop-types';

const InnovationShowcase = ({ isDark }) => {
  return (
    <div className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-8 py-24">
          <h1 className="text-5xl font-bold mb-6">
            Καινοτομία στο Ελληνικό Εμπόριο
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mb-8">
            Ανακαλύψτε πρωτοποριακές ιδέες και επιτυχημένες ιστορίες ψηφιακού 
            μετασχηματισμού από την ελληνική αγορά.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-blue-50">
              Υποβολή Case Study
            </button>
            <button className="bg-transparent border border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10">
              Εξερεύνηση
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Featured Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-12">Επιτυχημένες Ιστορίες</h2>
          <div className="grid grid-cols-3 gap-8">
            {[1, 2, 3].map((story) => (
              <div key={story} className={`group cursor-pointer ${isDark ? 'text-white' : ''}`}>
                <div className={`aspect-video ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg overflow-hidden mb-6 relative`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4">
                      <Award className="text-white w-8 h-8" />
                    </div>
                  </div>
                </div>
                <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-2`}>Ψηφιακός Μετασχηματισμός</div>
                <h3 className={`text-xl font-medium mb-2 group-hover:${isDark ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>
                  Από το Παραδοσιακό στο Ψηφιακό: Η Ιστορία της ABC Electronics
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  Πώς μια παραδοσιακή επιχείρηση πέτυχε 300% αύξηση πωλήσεων μέσω 
                  του ψηφιακού μετασχηματισμού.
                </p>
                <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span>Διαβάστε περισσότερα</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Guides */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Οδηγοί Υλοποίησης</h2>
          <div className="grid grid-cols-2 gap-8">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "E-commerce Transformation",
                description: "Βήμα-προς-βήμα οδηγός για τη δημιουργία online καταστήματος"
              },
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Digital Infrastructure",
                description: "Εκσυγχρονισμός υποδομών και συστημάτων"
              }
            ].map((guide, index) => (
              <div 
                key={index}
                className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} p-8 rounded-lg hover:shadow-lg transition-shadow cursor-pointer`}
              >
                <div className={`${isDark ? 'text-blue-400' : 'text-blue-600'} mb-4`}>{guide.icon}</div>
                <h3 className={`text-xl font-medium mb-2 ${isDark ? 'text-white' : ''}`}>{guide.title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{guide.description}</p>
                <button className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium`}>
                  Δείτε τον οδηγό →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Innovation Metrics */}
        <div className="bg-blue-900 text-white rounded-2xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Αποτελέσματα Καινοτομίας</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Μετρήσιμα αποτελέσματα από την εφαρμογή καινοτόμων λύσεων στις 
              ελληνικές επιχειρήσεις
            </p>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {[
              { number: "250%", label: "Μέση αύξηση online πωλήσεων" },
              { number: "85%", label: "Βελτίωση εξυπηρέτησης πελατών" },
              { number: "120+", label: "Επιτυχημένες υλοποιήσεις" },
              { number: "45%", label: "Μείωση λειτουργικού κόστους" }
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{metric.number}</div>
                <div className="text-blue-200">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Πόροι & Εργαλεία</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Βιβλιοθήκη Μελετών",
                description: "Λεπτομερείς αναλύσεις και case studies"
              },
              {
                icon: <Share2 className="w-6 h-6" />,
                title: "Δίκτυο Συνεργατών",
                description: "Συνεργάτες τεχνολογίας και υλοποίησης"
              },
              {
                icon: <Lightbulb className="w-6 h-6" />,
                title: "Innovation Lab",
                description: "Πειραματιστείτε με νέες τεχνολογίες"
              }
            ].map((resource, index) => (
              <div 
                key={index}
                className={`border ${isDark ? 'border-gray-700 hover:border-blue-400' : 'border-gray-200 hover:border-blue-600'} p-6 rounded-lg transition-colors cursor-pointer`}
              >
                <div className={`${isDark ? 'text-blue-400' : 'text-blue-600'} mb-4`}>{resource.icon}</div>
                <h3 className={`font-medium mb-2 ${isDark ? 'text-white' : ''}`}>{resource.title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="text-center">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : ''}`}>
              Μείνετε Ενημερωμένοι
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8 max-w-2xl mx-auto`}>
              Λάβετε τις τελευταίες ιστορίες καινοτομίας και οδηγούς υλοποίησης 
              απευθείας στο inbox σας.
            </p>
            <div className="flex max-w-md mx-auto">
              <input 
                type="email"
                placeholder="Διεύθυνση email"
                className={`flex-1 px-4 py-3 rounded-l-lg border-y border-l focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors">
                Εγγραφή
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InnovationShowcase.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default InnovationShowcase;
