import { Shield, Lock, Eye, Database, Users, Mail, CheckCircle, AlertTriangle, FileText, Globe, ArrowRight, ExternalLink } from 'lucide-react';
import Navigation from '../components/layout/Navigation';
import { useTheme } from '../context/ThemeContext';

const Privacy = () => {
  const { isDark } = useTheme();
  
  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent leading-tight">
              ΠΟΛΙΤΙΚΗ
              <br />
              <span className="text-5xl md:text-6xl">ΙΔΙΩΤΙΚΟΤΗΤΑΣ</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-8">
              Προστασία προσωπικών δεδομένων και διαφάνεια στις πληροφορίες
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">

        {/* Introduction Card */}
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Γενικές Πληροφορίες</h2>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Η Ελληνική Συνομοσπονδία Εμπορίου και Επιχειρηματικότητας, (εφεξής ΕΣΕΕ) είναι ιδιοκτήτης, δημιουργός και δικαιούχος όλων των δικαιωμάτων της ιστοσελίδας με όνομα χώρου (domain name): www.esee.gr (εφεξής «Ιστοσελίδα») και των παρεχομένων σε αυτήν υπηρεσιών καθώς και ο Υπεύθυνος Επεξεργασίας των δεδομένων που τυχόν δηλώνονται από τους επισκέπτες/χρήστες αυτής της Ιστοσελίδας.
            </p>
            <p>
              Η ΕΣΕΕ σωματείο με την επωνυμία «Ελληνική Συνομοσπονδία Εμπορίου και Επιχειρηματικότητας» και τον διακριτικό τίτλο «ΕΣΕΕ», που εδρεύει στην Αθήνα, επί της οδού Μητροπόλεως και αριθμό 42 είναι η τριτοβάθμια οργάνωση του ελληνικού εμπορίου, εκπροσωπεί τον εμπορικό κόσμο και γενικότερα τη μικρομεσαία επιχειρηματικότητα σε εθνικό και διεθνές επίπεδο.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Personal Data Definition */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Προσωπικά Δεδομένα</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Στα προσωπικά σας δεδομένα ανήκει κάθε πληροφορία σε χαρτί ή ηλεκτρονικό μέσο που μπορεί να οδηγήσει, είτε απευθείας είτε συνδυαστικά με άλλες, στη μοναδική σας αναγνώριση ή στον εντοπισμό σας ως φυσικό πρόσωπο.
            </p>
          </div>

          {/* Purpose of Processing */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Σκοπός Επεξεργασίας</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Τα προσωπικά δεδομένα που συλλέγονται χρησιμοποιούνται αποκλειστικά και μόνο για λόγους που αφορούν την εκπλήρωση του σκοπού δραστηριότητας της ΕΣΕΕ και την επικοινωνία με τα Υποκείμενα των Δεδομένων καθώς και τις συναλλαγές με αυτήν.
            </p>
          </div>

          {/* Data Recipients */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Αποδέκτες Δεδομένων</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Πρόσβαση στα δεδομένα σας μπορεί να έχει μόνο το αρμόδιο προσωπικό της ΕΣΕΕ στο πλαίσιο άσκησης των καθηκόντων του, που δεσμεύεται για την τήρηση εχεμύθειας και εμπιστευτικότητας.
            </p>
          </div>

          {/* User Rights */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Δικαιώματα Χρηστών</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-600">Δικαίωμα πρόσβασης</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-600">Δικαίωμα διόρθωσης</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-600">Δικαίωμα διαγραφής</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-600">Δικαίωμα περιορισμού</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-600">Δικαίωμα φορητότητας</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-600">Δικαίωμα εναντίωσης</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-12">
          <div className="flex items-start space-x-6">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Επικοινωνία για ερωτήσεις ή σχόλια
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Εάν έχετε ερωτήσεις ή σχόλια σχετικά με την παρούσα πολιτική ασφαλείας προστασίας προσωπικών δεδομένων μπορείτε να επικοινωνείτε με την ΕΣΕΕ.
              </p>
              <div className="flex items-center space-x-4 mb-4">
                <a
                  href="mailto:dp@esee.gr"
                  className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span>dp@esee.gr</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-yellow-800 font-medium mb-1">Σημαντική Πληροφορία</p>
                    <p className="text-sm text-yellow-700">
                      Αν θεωρείτε ότι η επεξεργασία των προσωπικών δεδομένων σας παραβιάζει το κανονιστικό πλαίσιο, έχετε δικαίωμα να υποβάλετε καταγγελία στην Αρχή Προστασίας Προσωπικών Δεδομένων.
                    </p>
                  </div>
                </div>
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
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
                Έχετε Ερωτήσεις;
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Η ομάδα μας είναι εδώ για να σας βοηθήσει με οποιαδήποτε ερώτηση σχετικά με την προστασία των προσωπικών δεδομένων
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:dp@esee.gr"
                  className="bg-white hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{ color: '#00B5F1' }}
                >
                  Επικοινωνήστε μαζί μας
                </a>
                <a
                  href="mailto:contact@dpa.gr"
                  className="border-2 border-white text-white hover:bg-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                  style={{ '--hover-color': '#00B5F1' }}
                  onMouseEnter={(e) => e.target.style.color = '#00B5F1'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  Αρχή Προστασίας Δεδομένων
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default Privacy;
