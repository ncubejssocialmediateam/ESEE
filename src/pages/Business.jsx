import { useState } from 'react';
import { Building2, Scale, Globe, Rocket, Users, Heart, ArrowRight, CheckCircle, TrendingUp, Shield, Lightbulb, Target, Search, Filter, FileText, ExternalLink, Calendar, Award, Briefcase, Zap } from 'lucide-react';
import Navigation from '../components/layout/Navigation';
import { useTheme } from '../context/ThemeContext';

const Business = () => {
  const [activeTab, setActiveTab] = useState('formation');
  const [searchTerm, setSearchTerm] = useState('');
  const { isDark } = useTheme();

  const businessData = {
    formation: {
      title: "Ίδρυση Επιχειρήσεων",
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      items: [
        {
          id: 1,
          title: "Νόμος 4919/2022",
          subtitle: "ΦΕΚ Α' 71/07-04-2022",
          description: "Σύσταση εταιρειών μέσω των Υπηρεσιών Μιας Στάσης (Υ.Μ.Σ.) και τήρηση του Γενικού Εμπορικού Μητρώου (Γ.Ε.ΜΗ.)",
          link: "https://esee.gr/wp-content/uploads/2022/07/4919.pdf",
          type: "legal"
        },
        {
          id: 2,
          title: "Υ.Α. 80016/2022",
          subtitle: "ΦΕΚ Β' 4629/1-9-2022",
          description: "Κώδικας Δεοντολογίας περί ανακοινώσεων μείωσης της τιμής (ιδίως σε προσφορές/εκπτώσεις)",
          link: "https://esee.gr/wp-content/uploads/2023/05/FEK-2022-Tefxos-B-04629.pdf",
          type: "legal"
        },
        {
          id: 3,
          title: "Ψηφιοποίηση Επιχείρησης",
          subtitle: "Προώθηση της επιχείρησης στο διαδίκτυο",
          description: "Ιστότοπος / ηλεκτρονικό κατάστημα",
          link: "https://europa.eu/youreurope/business/running-business/digitalising/index_el.htm",
          type: "digital"
        },
        {
          id: 4,
          title: "Ελληνικό Οικοσύστημα Νεοφυών Επιχειρήσεων",
          subtitle: "Νεοφυείς Επιχειρήσεις",
          description: "Εθνικό Μητρώο Νεοφυών Επιχειρήσεων",
          link: "https://elevategreece.gov.gr/el/",
          type: "startup"
        },
        {
          id: 5,
          title: "Γυναικεία Επιχειρηματικότητα",
          subtitle: "Συμβουλευτική, Εκπαίδευση, Mentoring",
          description: "Ανάπτυξη του Γυναικείου Επιχειρείν και στήριξη της βιωσιμότητας της Ελληνικής Γυναικείας Επιχείρησης",
          link: "https://www.sege.gr/",
          type: "support"
        }
      ]
    },
    intellectual: {
      title: "Διανοητική Ιδιοκτησία",
      icon: Lightbulb,
      color: "from-purple-500 to-purple-600",
      items: [
        {
          id: 6,
          title: "Εμπορικά Σήματα",
          subtitle: "Σήματα",
          description: "Ονομασίες, λογότυπους, χρώματα, εικόνες, σχέδια, μεγέθη, συσκευασίες προϊόντων ή ήχους",
          link: "http://www.obi.gr/el/",
          type: "trademark"
        },
        {
          id: 7,
          title: "Κατοχύρωση Πατέντας",
          subtitle: "Πατέντες",
          description: "Κατοχυρωμένη με δίπλωμα ευρεσιτεχνίας",
          link: "https://europa.eu/youreurope/business/running-business/intellectual-property/patents/index_el.htm",
          type: "patent"
        }
      ]
    },
    customers: {
      title: "Συναλλαγές με Πελάτες",
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
      items: [
        {
          id: 8,
          title: "Καταναλωτικές συμβάσεις και εγγυήσεις",
          subtitle: "Καταναλωτές",
          description: "Υποχρεώσεις δίκαιης μεταχείρισης και διαφάνειας",
          link: "https://europa.eu/youreurope/business/dealing-with-customers/consumer-contracts-guarantees/index_el.htm",
          type: "consumer"
        },
        {
          id: 9,
          title: "Προστασία Δεδομένων",
          subtitle: "GDPR",
          description: "Ποια δεδομένα θεωρούνται «προσωπικά δεδομένα» και ποιες είναι οι ευθύνες",
          link: "https://esee.gr/wp-content/uploads/2022/09/Προστασία-Δεδομένων.pdf",
          type: "privacy"
        },
        {
          id: 10,
          title: "ΦΕΚ 969/22-3-2017",
          subtitle: "e-commerce",
          description: "Κώδικας Καταναλωτικής Δεοντολογίας για το Ηλεκτρονικό Εμπόριο",
          link: "https://esee.gr/wp-content/uploads/2022/09/Νομοθεσία-Κώδικας-καταναλωτικής-Δοεντολογίας-για-το-Ηλεκτρονικό-εμποριο.pdf",
          type: "ecommerce"
        },
        {
          id: 11,
          title: "Νομοθεσία",
          subtitle: "Καταναλωτές",
          description: "Αρμοδιότητας Γενικής Διεύθυνσης Προστασίας Καταναλωτή",
          link: "https://esee.gr/wp-content/uploads/2022/09/Νομοθεσία_21_1_2021.pdf",
          type: "legal"
        }
      ]
    },
    workplace: {
      title: "Εργασιακά/Πολιτικές",
      icon: Briefcase,
      color: "from-orange-500 to-orange-600",
      items: [
        {
          id: 12,
          title: "Σεξουαλική Παρενόχληση",
          subtitle: "Ποια είναι τα όρια στη σεξουαλική παρενόχληση στον χώρο εργασίας",
          description: "Νομικό και θεσμικό πλαίσιο. Διατάξεις για την προστασία του θύματος",
          link: "https://esee.gr/wp-content/uploads/2022/09/Σεξουαλική-Παρενόχληση.pdf",
          type: "workplace"
        },
        {
          id: 13,
          title: "Ισότητα",
          subtitle: "Γενική Γραμματεία Δημογραφικής και Οικογενειακής Πολιτικής και Ισότητας των Φύλων",
          description: "Πληροφόρηση για τις πολιτικές και τα προγράμματα που υλοποιούνται, τις υπηρεσίες που παρέχονται και τα νομοθετικά μέτρα που θεσπίζονται για την ισότητα μεταξύ γυναικών και ανδρών",
          link: "https://isotita.gr/",
          type: "equality"
        }
      ]
    },
    taxation: {
      title: "Φορολογία",
      icon: Scale,
      color: "from-teal-500 to-teal-600",
      items: [
        {
          id: 14,
          title: "Νόμοι, Άρθρα, Αποφάσεις",
          subtitle: "Ενημέρωση",
          description: "Φορολογικές Εξελίξεις",
          link: "https://www.taxheaven.gr/",
          type: "tax"
        }
      ]
    }
  };

  const filteredItems = businessData[activeTab]?.items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'legal': return <FileText className="w-4 h-4" />;
      case 'digital': return <Globe className="w-4 h-4" />;
      case 'startup': return <Rocket className="w-4 h-4" />;
      case 'support': return <Users className="w-4 h-4" />;
      case 'trademark': return <Award className="w-4 h-4" />;
      case 'patent': return <Lightbulb className="w-4 h-4" />;
      case 'consumer': return <Users className="w-4 h-4" />;
      case 'privacy': return <Shield className="w-4 h-4" />;
      case 'ecommerce': return <Globe className="w-4 h-4" />;
      case 'workplace': return <Briefcase className="w-4 h-4" />;
      case 'equality': return <Heart className="w-4 h-4" />;
      case 'tax': return <Scale className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'legal': return 'bg-blue-100 text-blue-600';
      case 'digital': return 'bg-purple-100 text-purple-600';
      case 'startup': return 'bg-orange-100 text-orange-600';
      case 'support': return 'bg-teal-100 text-teal-600';
      case 'trademark': return 'bg-yellow-100 text-yellow-600';
      case 'patent': return 'bg-indigo-100 text-indigo-600';
      case 'consumer': return 'bg-emerald-100 text-emerald-600';
      case 'privacy': return 'bg-red-100 text-red-600';
      case 'ecommerce': return 'bg-cyan-100 text-cyan-600';
      case 'workplace': return 'bg-pink-100 text-pink-600';
      case 'equality': return 'bg-rose-100 text-rose-600';
      case 'tax': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
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
              <Building2 className="w-10 h-10" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent leading-tight">
              ΕΠΙΧΕΙΡΗΣΕΙΣ
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-8">
              Ενημερωμένη και στοχευμένη πληροφόρηση για την επιχειρηματικότητα
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Αξιόπιστοι</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Σε ανάπτυξη</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">Διεθνείς</span>
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
                placeholder="Αναζήτηση σε όλα τα θέματα..."
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

        {/* Tab Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {Object.entries(businessData).map(([key, data]) => {
              const IconComponent = data.icon;
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-white shadow-lg transform scale-105 border border-white/20'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50/80 hover:shadow-md'
                  }`}
                  style={isActive ? { backgroundColor: '#00B5F1' } : {}}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{data.title}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isActive ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {data.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                    {item.type}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-300"
                  >
                    <span>Δείτε περισσότερα</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
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
        {filteredItems.length === 0 && (
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

        {/* Call to Action Section */}
        <div className="mt-20 mb-16">
          <div className="relative overflow-hidden rounded-3xl p-12 text-center text-white" style={{ backgroundColor: '#00B5F1' }}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-8">
                <Zap className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
                Έτοιμοι να ξεκινήσετε;
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Ανακαλύψτε όλες τις υπηρεσίες και τα εργαλεία που χρειάζεστε για την επιχείρησή σας
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg" style={{ color: '#00B5F1' }}>
                  Εξερευνήστε Υπηρεσίες
                </button>
                <button className="border-2 border-white text-white hover:bg-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105" style={{ '--hover-color': '#00B5F1' }} onMouseEnter={(e) => e.target.style.color = '#00B5F1'} onMouseLeave={(e) => e.target.style.color = 'white'}>
                  Επικοινωνήστε μαζί μας
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default Business;