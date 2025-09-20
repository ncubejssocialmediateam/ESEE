import { Building2, Users, Shield, CheckCircle, UserCheck, Crown, Award, Briefcase, FileText, Scale, Settings, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Navigation from '../components/layout/Navigation';
import { useTheme } from '../context/ThemeContext';

const Administration = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const { isDark } = useTheme();

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const boardMembers = [
    "ΑΡΙΣΤΟΤΕΛΗΣ ΑΝΤΩΝΙΟΥ",
    "ΓΕΩΡΓΙΟΣ ΒΑΓΕΝΑΣ",
    "ΝΙΚΟΛΑΟΣ ΒΟΥΡΛΑΚΗΣ",
    "ΣΠΥΡΙΔΩΝ ΓΕΡΟΝΤΙΤΗΣ",
    "ΚΩΝΣΤΑΝΤΙΝΟΣ ΔΗΜΑΔΗΣ",
    "ΝΕΚΤΑΡΙΟΣ ΕΛΜΑΛΟΓΛΟΥ",
    "ΚΛΕΟΒΟΥΛΟΣ ΘΕΟΤΟΚΗΣ",
    "ΘΕΟΔΩΡΟΣ ΚΑΠΡΑΛΟΣ",
    "ΣΤΑΥΡΟΣ ΚΑΦΟΥΝΗΣ",
    "ΝΙΚΟΛΑΟΣ ΚΟΓΙΟΥΜΤΣΗΣ",
    "ΘΕΟΔΩΡΑ ΚΥΡΙΑΚΑΚΗ",
    "ΒΑΣΙΛΕΙΟΣ ΛΕΜΟΝΙΔΗΣ",
    "ΘΕΟΦΑΝΕΙΑ ΜΠΛΙΟΥΜΗ",
    "ΧΡΗΣΤΟΣ ΜΠΛΟΥΓΟΥΡΑΣ",
    "ΝΙΚΟΛΑΟΣ ΜΠΟΝΗΣ",
    "ΝΙΚΟΛΑΟΣ ΝΟΜΙΚΟΣ",
    "ΒΑΣΙΛΕΙΟΣ ΠΑΓΩΝΗΣ",
    "ΧΑΡΑΛΑΜΠΟΣ ΠΑΠΑΔΟΠΟΥΛΟΣ",
    "ΚΩΝΣΤΑΝΤΙΝΟΣ ΠΑΣΙΟΠΟΥΛΟΣ",
    "ΝΙΚΟΛΑΟΣ ΣΚΟΡΔΑΛΗΣ",
    "ΑΓΗΣΙΛΑΟΣ ΤΡΙΓΑΖΗΣ",
    "ΓΕΩΡΓΙΟΣ ΤΣΙΑΠΛΕΣ",
    "ΠΑΝΤΕΛΗΣ ΦΙΛΙΠΠΙΔΗΣ",
    "ΑΝΤΩΝΙΟΣ ΦΡΑΝΤΖΗΣ",
    "ΔΗΜΗΤΡΙΟΣ ΣΑΜΑΡΑΣ"
  ];

  const auditCommitteeMembers = [
    { name: "ΧΑΡΙΣΙΟΣ ΚΑΤΑΝΑΣ", position: "ΠΡΟΕΔΡΟΣ" },
    { name: "ΚΥΡΙΑΚΟΥΛΑ ΚΩΝΣΤΑΝΤΙΝΙΔΟΥ", position: "ΜΕΛΟΣ" },
    { name: "ΑΝΑΣΤΑΣΙΟΣ ΜΠΟΖΙΝΗΣ", position: "ΜΕΛΟΣ" },
    { name: "ΙΩΑΝΝΗΣ ΓΙΟΠΑΝΟΣ", position: "ΜΕΛΟΣ" },
    { name: "ΠΑΡΑΣΚΕΥΗ ΑΓΙΟΣΤΡΑΤΙΤΗ", position: "ΜΕΛΟΣ" }
  ];

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-800/90"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-300/20 rounded-full blur-lg animate-pulse delay-500"></div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8 animate-bounce">
              <Building2 className="w-10 h-10" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent leading-tight">
              ΔΙΟΙΚΗΣΗ
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-8">
              Τα όργανα διοίκησης της ΕΣΕΕ
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Διαφάνεια</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Συνεργασία</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Αξιοπιστία</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        
        {/* General Assembly Section */}
        <div className="mb-20">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">ΓΕΝΙΚΗ ΣΥΝΕΛΕΥΣΗ ΤΩΝ ΑΝΤΙΠΡΟΣΩΠΩΝ</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Αποτελεί το ανώτατο όργανο και την κορυφαία εκδήλωση της ΕΣΕΕ.
              </p>
            </div>
          </div>
        </div>

        {/* Presidency Section */}
        <div className="mb-20">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">ΠΡΟΕΔΡΕΙΟ</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* President */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500">
                  <div className="flex items-center mb-4">
                    <Crown className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-bold text-blue-800">ΠΡΟΕΔΡΟΣ</h3>
                  </div>
                  <p className="text-gray-700 font-semibold text-lg">ΣΤΑΥΡΟΣ ΚΑΦΟΥΝΗΣ</p>
                </div>

                {/* Vice Presidents */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border-l-4 border-emerald-500">
                  <div className="flex items-center mb-4">
                    <Award className="w-6 h-6 text-emerald-600 mr-2" />
                    <h3 className="text-lg font-bold text-emerald-800">Α' ΑΝΤΙΠΡΟΕΔΡΟΣ</h3>
                  </div>
                  <p className="text-gray-700 font-semibold text-lg">ΘΕΟΦΑΝΕΙΑ (ΦΑΝΗ) ΜΠΛΙΟΥΜΗ</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500">
                  <div className="flex items-center mb-4">
                    <Award className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="text-lg font-bold text-purple-800">Β' ΑΝΤΙΠΡΟΕΔΡΟΣ</h3>
                  </div>
                  <p className="text-gray-700 font-semibold text-lg">ΒΑΣΙΛΕΙΟΣ ΠΑΓΩΝΗΣ</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-500">
                  <div className="flex items-center mb-4">
                    <Award className="w-6 h-6 text-orange-600 mr-2" />
                    <h3 className="text-lg font-bold text-orange-800">Γ' ΑΝΤΙΠΡΟΕΔΡΟΣ</h3>
                  </div>
                  <p className="text-gray-700 font-semibold text-lg">ΧΑΡΑΛΑΜΠΟΣ ΠΑΠΑΔΟΠΟΥΛΟΣ</p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border-l-4 border-indigo-500">
                  <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-indigo-600 mr-2" />
                    <h3 className="text-lg font-bold text-indigo-800">ΓΕΝΙΚΟΣ ΓΡΑΜΜΑΤΕΑΣ</h3>
                  </div>
                  <p className="text-gray-700 font-semibold text-lg">ΘΕΟΔΩΡΟΣ (ΔΩΡΟΣ) ΚΑΠΡΑΛΟΣ</p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border-l-4 border-teal-500">
                  <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-teal-600 mr-2" />
                    <h3 className="text-lg font-bold text-teal-800">ΑΝ / ΤΗΣ ΓΕΝ. ΓΡΑΜΜΑΤΕΑΣ</h3>
                  </div>
                  <p className="text-gray-700 font-semibold text-lg">ΑΓΗΣΙΛΑΟΣ ΤΡΙΓΑΖΗΣ</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-500">
                  <div className="flex items-center mb-4">
                    <Scale className="w-6 h-6 text-red-600 mr-2" />
                    <h3 className="text-lg font-bold text-red-800">ΟΙΚΟΝΟΜΙΚΟΣ ΕΠΟΠΤΗΣ</h3>
                  </div>
                  <p className="text-gray-700 font-semibold text-lg">ΝΙΚΟΛΑΟΣ ΝΟΜΙΚΟΣ</p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-l-4 border-pink-500">
                  <div className="flex items-center mb-4">
                    <Scale className="w-6 h-6 text-pink-600 mr-2" />
                    <h3 className="text-lg font-bold text-pink-800">ΑΝ / ΤΗΣ ΟΙΚΟΝΟΜΙΚΟΣ ΕΠΟΠΤΗΣ</h3>
                  </div>
                  <p className="text-gray-700 font-semibold text-lg">ΓΕΩΡΓΙΟΣ ΒΑΓΕΝΑΣ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Board of Directors Section */}
        <div className="mb-20">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">ΔΙΟΙΚΗΤΙΚΟ ΣΥΜΒΟΥΛΙΟ</h2>
                    <p className="text-gray-600 mt-2">Είναι 25μελές και εκλέγεται από την Γενική Συνέλευση.</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSection('board')}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span className="font-semibold">Μέλη</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.board ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {expandedSections.board && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {boardMembers.map((member, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border-l-4 border-gray-400 hover:border-blue-500 transition-colors">
                      <p className="text-gray-700 font-medium">{member}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Audit Committee Section */}
        <div className="mb-20">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">ΕΛΕΓΚΤΙΚΗ ΕΠΙΤΡΟΠΗ</h2>
                </div>
                <button
                  onClick={() => toggleSection('audit')}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span className="font-semibold">Μέλη</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.audit ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {expandedSections.audit && (
                <div className="space-y-4 mt-6">
                  {auditCommitteeMembers.map((member, index) => (
                    <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-l-4 border-green-500">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-700 font-semibold text-lg">{member.name}</p>
                        <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {member.position}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Organizational Chart Section */}
        <div className="mb-20">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">ΟΡΓΑΝΟΓΡΑΜΜΑ</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">ΔΙΟΙΚΗΤΙΚΟ ΣΥΜΒΟΥΛΙΟ</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>ΠΡΟΕΔΡΟΣ</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border-l-4 border-emerald-500">
                  <h3 className="text-xl font-bold text-emerald-800 mb-4">ΝΟΜΙΚΗ ΥΠΗΡΕΣΙΑ</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Ε.Σ.Ε.Ε</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Κ.Α.ΕΛ.Ε</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">ΔΙΑΧΕΙΡΙΣΗ ΕΡΓΩΝ</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>ΙΝ.ΕΜ.Υ</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">ΛΟΓΙΣΤΗΡΙΟ</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Οικονομική Διαχείριση</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default Administration;
