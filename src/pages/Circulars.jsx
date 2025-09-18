import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { 
  FileText, 
  Calendar, 
  ArrowRight, 
  Search, 
  Filter,
  Download,
  Eye,
  Clock,
  Tag,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Circulars = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCircular, setExpandedCircular] = useState(null);

  // Circulars data from ESEE website
  const circulars = [
    {
      id: 1,
      title: 'Διενέργεια Προσφορών μετά τις θερινές Εκπτώσεις',
      excerpt: 'Δεδομένου ότι, πολλά μέλη μας έχουν δηλώσει στην σχετική έρευνα του ΙΝΕΜΥ για τις εκπτώσεις την πρόθεσή τους να συνεχίσουν...',
      content: 'Δεδομένου ότι, πολλά μέλη μας έχουν δηλώσει στην σχετική έρευνα του ΙΝΕΜΥ για τις εκπτώσεις την πρόθεσή τους να συνεχίσουν με προσφορές και εκπτώσεις, σας ενημερώνουμε για τις βασικές αρχές που πρέπει να τηρούνται σύμφωνα με το νόμο.',
      category: 'Εμπόριο',
      date: '2025-01-15',
      priority: 'medium',
      attachments: ['circular-2025-01.pdf']
    },
    {
      id: 2,
      title: 'Κατάργηση/Μείωση χρεώσεων για Ατομικές επιχειρήσεις, Ελεύθερους επαγγελματίες & Ιδιώτες',
      excerpt: 'Με τη ψήφιση του νέου Εθνικού τελωνειακού Κώδικα (επισυναπτόμενος νόμος 5222/2025) και ειδικότερα με το άρθρο 271 αυτού, επέρχονται σημαντικές...',
      content: 'Με τη ψήφιση του νέου Εθνικού τελωνειακού Κώδικα (επισυναπτόμενος νόμος 5222/2025) και ειδικότερα με το άρθρο 271 αυτού, επέρχονται σημαντικές αλλαγές στις χρεώσεις για ατομικές επιχειρήσεις, ελεύθερους επαγγελματίες και ιδιώτες.',
      category: 'Φορολογία',
      date: '2025-01-10',
      priority: 'high',
      attachments: ['customs-law-5222-2025.pdf']
    },
    {
      id: 3,
      title: 'Δυνατότητα επανένταξης αλληλεγγύως ευθυνόμενων προσώπων Εταιρειών σε απολεσθείσα ρύθμιση τμηματικής',
      excerpt: 'Όπως είναι γνωστό τα φυσικά πρόσωπα που εκτελούν χρέη διευθυντών, γενικών διευθυντών, εκτελεστικών προέδρων, διαχειριστών, διευθυνόντων συμβούλων...',
      content: 'Όπως είναι γνωστό τα φυσικά πρόσωπα που εκτελούν χρέη διευθυντών, γενικών διευθυντών, εκτελεστικών προέδρων, διαχειριστών, διευθυνόντων συμβούλων, εντεταλμένων στη διοίκηση έχουν τη δυνατότητα επανένταξης σε απολεσθείσα ρύθμιση τμηματικής.',
      category: 'Νομικά',
      date: '2025-01-08',
      priority: 'medium',
      attachments: ['reintegration-regulation.pdf']
    },
    {
      id: 4,
      title: 'Κυριότερες Υποχρεώσεις των Εμπορικών Επιχειρήσεων για το μήνα Ιούλιο 2025',
      excerpt: 'Αναλυτική καταγραφή των υποχρεώσεων των εμπορικών επιχειρήσεων ανά θεματικές κατηγορίες προς: ΑΑΔΕ, ΕΦΚΑ, ΟΑΕΕ και άλλους φορείς...',
      content: 'Αναλυτική καταγραφή των υποχρεώσεων των εμπορικών επιχειρήσεων ανά θεματικές κατηγορίες προς: ΑΑΔΕ, ΕΦΚΑ, ΟΑΕΕ και άλλους φορείς για τον μήνα Ιούλιο 2025.',
      category: 'Υποχρεώσεις',
      date: '2025-01-05',
      priority: 'high',
      attachments: ['obligations-july-2025.pdf']
    },
    {
      id: 5,
      title: 'Αλλαγές στο πλαίσιο υποβολής περιοδικών δηλώσεων ΦΠΑ από τρίμηνο σε μήνα',
      excerpt: 'Με την επισυναπτόμενη απόφαση της ΑΑΔΕ (Α. 1049/2025) επέρχονται σημαντικές αλλαγές στο μέχρι πρότινος ισχύον πλαίσιο υποβολής περιοδικών δηλώσεων ΦΠΑ...',
      content: 'Με την επισυναπτόμενη απόφαση της ΑΑΔΕ (Α. 1049/2025) επέρχονται σημαντικές αλλαγές στο μέχρι πρότινος ισχύον πλαίσιο υποβολής περιοδικών δηλώσεων ΦΠΑ από τρίμηνο σε μήνα.',
      category: 'Φορολογία',
      date: '2025-01-03',
      priority: 'high',
      attachments: ['aade-decision-1049-2025.pdf']
    },
    {
      id: 6,
      title: 'Δημοσίευση Απόφασης για την εξαίρεση από την υποχρεωτική ασφάλιση',
      excerpt: 'Όπως γνωρίζετε, από 1ης Ιουνίου 2025, τέθηκε σε εφαρμογή η υποχρέωση ασφάλισης για επιχειρήσεις με ακαθάριστα έσοδα για το προηγούμενο...',
      content: 'Όπως γνωρίζετε, από 1ης Ιουνίου 2025, τέθηκε σε εφαρμογή η υποχρέωση ασφάλισης για επιχειρήσεις με ακαθάριστα έσοδα για το προηγούμενο έτος άνω των 10.000€.',
      category: 'Ασφάλιση',
      date: '2025-01-01',
      priority: 'medium',
      attachments: ['insurance-exemption.pdf']
    },
    {
      id: 7,
      title: 'Δημοσίευση Υπουργικής Απόφασης για παρατάσεις δηλώσεων σε περίπτωση αδυναμίας του συστήματος',
      excerpt: 'Μετά από προσπάθειες της ΕΣΕΕ, εκδόθηκε και δημοσιεύτηκε στην Εφημερίδα της Κυβερνήσεως, η Υπουργική Απόφαση A1065/2025...',
      content: 'Μετά από προσπάθειες της ΕΣΕΕ, εκδόθηκε και δημοσιεύτηκε στην Εφημερίδα της Κυβερνήσεως, η Υπουργική Απόφαση A1065/2025 (ΦΕΚ 2584Β΄) για παρατάσεις δηλώσεων σε περίπτωση αδυναμίας του συστήματος.',
      category: 'Δηλώσεις',
      date: '2024-12-28',
      priority: 'high',
      attachments: ['ministerial-decision-a1065-2025.pdf']
    },
    {
      id: 8,
      title: 'Έναρξη υποβολής ηλεκτρονικών αιτήσεων από επιχειρήσεις για τη λήψη της αναδρομικής επιδότησης',
      excerpt: 'Σε συνέχεια της Εγκυκλίου που σας αποστείλαμε την Παρασκευή 2 Μαΐου του τρέχοντος, αναφορικά με την αναδρομική επιδότηση μέρους του...',
      content: 'Σε συνέχεια της Εγκυκλίου που σας αποστείλαμε την Παρασκευή 2 Μαΐου του τρέχοντος, αναφορικά με την αναδρομική επιδότηση μέρους του κόστους ηλεκτρικής ενέργειας, ανακοινώνουμε την έναρξη υποβολής ηλεκτρονικών αιτήσεων.',
      category: 'Επιδοτήσεις',
      date: '2024-12-25',
      priority: 'medium',
      attachments: ['subsidy-application-guide.pdf']
    },
    {
      id: 9,
      title: 'Αναδρομική επιδότηση τιμολογίων ηλεκτρικής ενέργειας για επιχειρήσεις',
      excerpt: 'Σε συνέχεια της ανακοίνωσης του Υπουργείου Περιβάλλοντος & Ενέργειας την προηγούμενη Παρασκευή 25 Απριλίου, αναφορικά με την αναδρομική επιδότηση των...',
      content: 'Σε συνέχεια της ανακοίνωσης του Υπουργείου Περιβάλλοντος & Ενέργειας την προηγούμενη Παρασκευή 25 Απριλίου, αναφορικά με την αναδρομική επιδότηση των τιμολογίων ηλεκτρικής ενέργειας για επιχειρήσεις.',
      category: 'Επιδοτήσεις',
      date: '2024-12-20',
      priority: 'medium',
      attachments: ['energy-subsidy-circular.pdf']
    },
    {
      id: 10,
      title: 'Αύξηση του ονομαστικού μεικτού Κατώτατου μισθού στα 880€',
      excerpt: 'Όπως έχει γίνει γνωστό από χθες, Τρίτη 1 Απριλίου του τρέχοντος έτους, έχει τεθεί σε ισχύ ο αυξημένος κατά περίπου...',
      content: 'Όπως έχει γίνει γνωστό από χθες, Τρίτη 1 Απριλίου του τρέχοντος έτους, έχει τεθεί σε ισχύ ο αυξημένος κατά περίπου 6,4% ονομαστικός μεικτός κατώτατος μισθός στα 880€.',
      category: 'Εργασία',
      date: '2024-12-15',
      priority: 'high',
      attachments: ['minimum-wage-increase-2025.pdf']
    },
    {
      id: 11,
      title: 'Ορθός τρόπος διενέργειας Προσφορών μετά τις Εκπτώσεις',
      excerpt: 'Μία πάγια πρακτική των μελών μας είναι, μετά την λήξη της περιόδου των τακτικών εκπτώσεων, να προχωρούν στη διενέργεια προσφορών...',
      content: 'Μία πάγια πρακτική των μελών μας είναι, μετά την λήξη της περιόδου των τακτικών εκπτώσεων, να προχωρούν στη διενέργεια προσφορών. Σας ενημερώνουμε για τον ορθό τρόπο διενέργειας προσφορών σύμφωνα με το νόμο.',
      category: 'Εμπόριο',
      date: '2024-12-10',
      priority: 'medium',
      attachments: ['sales-promotion-guidelines.pdf']
    }
  ];

  const categories = [
    { value: 'all', label: 'Όλες οι κατηγορίες' },
    { value: 'Εμπόριο', label: 'Εμπόριο' },
    { value: 'Φορολογία', label: 'Φορολογία' },
    { value: 'Νομικά', label: 'Νομικά' },
    { value: 'Υποχρεώσεις', label: 'Υποχρεώσεις' },
    { value: 'Ασφάλιση', label: 'Ασφάλιση' },
    { value: 'Δηλώσεις', label: 'Δηλώσεις' },
    { value: 'Επιδοτήσεις', label: 'Επιδοτήσεις' },
    { value: 'Εργασία', label: 'Εργασία' }
  ];

  const filteredCirculars = circulars.filter(circular => {
    const matchesSearch = circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circular.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || circular.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Υψηλή';
      case 'medium': return 'Μεσαία';
      case 'low': return 'Χαμηλή';
      default: return 'Κανονική';
    }
  };

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
              <FileText className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-lg font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                ΕΣΕΕ
              </span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              ΕΓΚΥΚΛΙΟΙ ΕΣΕΕ
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
            
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Ενημερωτικά έγγραφα και κυκλώματα της Ελληνικής Συνομοσπονδίας Εμπορίου & Επιχειρηματικότητας
            </p>
          </div>

          {/* Search and Filter */}
          <div className={`rounded-2xl p-6 mb-8 ${
            isDark 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
              : 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg'
          }`}>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Αναζήτηση εγκυκλίων..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    isDark 
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`pl-10 pr-8 py-3 rounded-xl border appearance-none ${
                    isDark 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                } pointer-events-none`} />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Εμφανίζονται {filteredCirculars.length} από {circulars.length} εγκύκλια
            </p>
          </div>

          {/* Circulars List */}
          <div className="space-y-6">
            {filteredCirculars.map((circular) => (
              <div
                key={circular.id}
                className={`rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  isDark 
                    ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
                    : 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg'
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getPriorityColor(circular.priority)
                        }`}>
                          {getPriorityLabel(circular.priority)}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                        }`}>
                          <Tag className="w-3 h-3 mr-1" />
                          {circular.category}
                        </span>
                      </div>
                      
                      <h3 className={`text-xl font-bold mb-2 leading-tight ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {circular.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div className={`flex items-center gap-1 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          {new Date(circular.date).toLocaleDateString('el-GR')}
                        </div>
                        <div className={`flex items-center gap-1 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Clock className="w-4 h-4" />
                          {new Date(circular.date).toLocaleTimeString('el-GR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <p className={`leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {expandedCircular === circular.id ? circular.content : circular.excerpt}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExpandedCircular(
                          expandedCircular === circular.id ? null : circular.id
                        )}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                          isDark 
                            ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30' 
                            : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                        }`}
                      >
                        {expandedCircular === circular.id ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            Λιγότερα
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Περισσότερα
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {circular.attachments.map((attachment, index) => (
                        <button
                          key={index}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                            isDark 
                              ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          Λήψη
                        </button>
                      ))}
                      <button className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        isDark 
                          ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                      }`}>
                        <Eye className="w-4 h-4" />
                        Προβολή
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-gray-800/50 border border-gray-700/50' 
                : 'bg-white/80 border border-white/20 shadow-lg'
            }`}>
              <button className={`px-3 py-1 text-sm font-medium rounded ${
                isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                Προηγούμενο
              </button>
              <span className={`px-3 py-1 text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                1
              </span>
              <span className={`px-3 py-1 text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                2
              </span>
              <span className={`px-3 py-1 text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                ...
              </span>
              <span className={`px-3 py-1 text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                7
              </span>
              <button className={`px-3 py-1 text-sm font-medium rounded ${
                isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                Επόμενο
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isDark={isDark} />
    </main>
  );
};

export default Circulars;
