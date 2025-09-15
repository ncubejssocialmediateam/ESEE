import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Shield, FileText, Users, AlertTriangle, CheckCircle, ArrowRight, Search, Filter, Calendar, Mail, ExternalLink, Lock, Globe, BookOpen } from 'lucide-react';

const Legal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('overview');

  const legalSections = {
    overview: {
      title: "Γενικές Πληροφορίες",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      content: "Ο δικτυακός τόπος www.esee.gr (εφεξής «η Ιστοσελίδα»), ανήκει στο σωματείο με την επωνυμία «Ελληνική Συνομοσπονδία Εμπορίου και Επιχειρηματικότητας» και τον διακριτικό τίτλο «ΕΣΕΕ»), που εδρεύει στην Αθήνα, επί της οδού Μητροπόλεως και αριθμό 42 (εφεξής: η «ΕΣΕΕ»), η οποία έχει την ευθύνη λειτουργίας του και νομίμως διαχειρίζεται και αποτελεί το διαδικτυακό μέσο επικοινωνίας και ενημέρωσης της ΕΣΕΕ με το κοινό."
    },
    privacy: {
      title: "Πολιτική Ιδιωτικότητας",
      icon: Shield,
      color: "from-emerald-500 to-emerald-600",
      content: "Παρακαλούμε επισκεφτείτε την σελίδα Πολιτική Ιδιωτικότητας και Προστασίας Προσωπικών Δεδομένων στην οποία είναι αναρτημένες όλες οι πληροφορίες σχετικά με το είδος και τις μεθόδους συλλογής των προσωπικών δεδομένων των Χρηστών.",
      link: "/privacy"
    },
    cookies: {
      title: "Cookies",
      icon: Globe,
      color: "from-purple-500 to-purple-600",
      content: "Με τήρηση της κείμενης νομοθεσίας και σύμφωνα με την Ευρωπαϊκή Οδηγία E-Privacy 2009/136 ΣΕ και τις από 25.2.2020 Οδηγίες της ΑΠΔΠΧ, η ιστοσελίδα μας αποδέχεται τη χρήση των cookies. Τα «cookies» αποτελούν μικρά τμήματα πληροφορίας που αποθηκεύονται στον υπολογιστή του χρήστη."
    },
    intellectual: {
      title: "Δικαιώματα Πνευματικής Ιδιοκτησίας",
      icon: FileText,
      color: "from-orange-500 to-orange-600",
      content: "Το σύνολο του πρωτότυπου Περιεχομένου της Ιστοσελίδας αποτελεί αντικείμενο της πνευματικής ιδιοκτησίας της ΕΣΕΕ και προστατεύεται από το ισχύον εθνικό, ευρωπαϊκό και διεθνές δίκαιο."
    },
    liability: {
      title: "Περιορισμός Ευθύνης",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
      content: "Η ΕΣΕΕ χωρίς να παρέχει εγγυήσεις και συνεπώς να χωρίς ευθύνεται, καταβάλλει κάθε δυνατή προσπάθεια, ώστε το Περιεχόμενο της Ιστοσελίδας να είναι ακριβές και επικαιροποιημένο."
    },
    obligations: {
      title: "Υποχρεώσεις Χρηστών",
      icon: Users,
      color: "from-teal-500 to-teal-600",
      content: "Ο κάθε Χρήστης οφείλει να απέχει από κάθε παράνομη και καταχρηστική συμπεριφορά κατά τη χρήση της Ιστοσελίδας και εν γένει να κάνει χρήση της Ιστοσελίδας με οποιοδήποτε τρόπο θα μπορούσε να βλάψει την ΕΣΕΕ ή και τρίτους."
    }
  };

  const filteredSections = Object.entries(legalSections).filter(([, section]) =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'privacy': return <Shield className="w-4 h-4" />;
      case 'cookies': return <Globe className="w-4 h-4" />;
      case 'intellectual': return <FileText className="w-4 h-4" />;
      case 'liability': return <AlertTriangle className="w-4 h-4" />;
      case 'obligations': return <Users className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'privacy': return 'bg-emerald-100 text-emerald-600';
      case 'cookies': return 'bg-purple-100 text-purple-600';
      case 'intellectual': return 'bg-orange-100 text-orange-600';
      case 'liability': return 'bg-red-100 text-red-600';
      case 'obligations': return 'bg-teal-100 text-teal-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ backgroundColor: '#00B5F1' }}>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8 animate-bounce">
              <Scale className="w-10 h-10" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent leading-tight">
              ΝΟΜΙΚΕΣ ΠΛΗΡΟΦΟΡΙΕΣ
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-8">
              Όροι χρήσης, πολιτική ιδιωτικότητας και νομικές πληροφορίες
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Ασφαλής</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Lock className="w-5 h-5" />
                <span className="text-sm font-medium">Προστατευμένο</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Ενημερωμένο</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        {/* Search and Filter Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Αναζήτηση σε νομικές πληροφορίες..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">Φίλτρα:</span>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {Object.entries(legalSections).map(([key, section]) => {
              const IconComponent = section.icon;
              const isActive = activeSection === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-white shadow-lg transform scale-105 border border-white/20'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50/80 hover:shadow-md'
                  }`}
                  style={isActive ? { backgroundColor: '#00B5F1' } : {}}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredSections.map(([sectionKey, section]) => (
            <div
              key={sectionKey}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${getTypeColor(sectionKey)}`}>
                      {getTypeIcon(sectionKey)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {section.title}
                      </h3>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(sectionKey)}`}>
                        {sectionKey}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {section.content}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {section.link ? (
                    <Link
                      to={section.link}
                      className="flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-300"
                    >
                      <span>Δείτε περισσότερα</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  ) : (
                    <div className="flex items-center text-gray-400">
                      <FileText className="w-4 h-4 mr-2" />
                      <span className="text-sm">Πληροφορίες</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-xs">2024</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSections.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Δεν βρέθηκαν αποτελέσματα
            </h3>
            <p className="text-gray-500">
              Δοκιμάστε να αλλάξετε τους όρους αναζήτησής σας
            </p>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 mb-12">
          <div className="flex items-start space-x-6">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Επικοινωνία
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Για οποιοδήποτε θέμα σχετικό με τη λειτουργία και τη διαχείριση της παρούσας Ιστοσελίδας μπορείτε να επικοινωνείτε με την ΕΣΕΕ.
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="mailto:itsupport@esee.gr"
                  className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span>itsupport@esee.gr</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Τελευταία ενημέρωση: Ιανουάριος 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 mb-16">
          <div className="relative overflow-hidden rounded-3xl p-12 text-center text-white" style={{ backgroundColor: '#00B5F1' }}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-8">
                <Scale className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
                Έχετε Ερωτήσεις;
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Η ομάδα μας είναι εδώ για να σας βοηθήσει με οποιαδήποτε νομική ερώτηση
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:itsupport@esee.gr"
                  className="bg-white hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{ color: '#00B5F1' }}
                >
                  Επικοινωνήστε μαζί μας
                </a>
                <Link
                  to="/privacy"
                  className="border-2 border-white text-white hover:bg-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                  style={{ '--hover-color': '#00B5F1' }}
                  onMouseEnter={(e) => e.target.style.color = '#00B5F1'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  Πολιτική Ιδιωτικότητας
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;