import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { Building, Users, MapPin, Award } from 'lucide-react';

const Members = () => {
  const { isDark } = useTheme();

  const memberStats = [
    { icon: <Building className="w-8 h-8" />, number: "17", label: "Ομοσπονδίες", description: "Σε όλη την Ελλάδα" },
    { icon: <Users className="w-8 h-8" />, number: "340", label: "Εμπορικοί Σύλλογοι", description: "Τοπικοί και κλαδικοί" },
    { icon: <Award className="w-8 h-8" />, number: "5", label: "Σύνδεσμοι", description: "Ειδικών ενδιαφερόντων" },
    { icon: <MapPin className="w-8 h-8" />, number: "54", label: "Νομοί", description: "Κάλυψη σε όλη τη χώρα" }
  ];

  const federations = [
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Αττικής",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Θεσσαλονίκης",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Κρήτης",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Πελοποννήσου",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Θεσσαλίας",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Μακεδονίας",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Θράκης",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Ηπείρου",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Στερεάς Ελλάδας",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Δυτικής Ελλάδας",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Ανατολικής Μακεδονίας",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Κεντρικής Μακεδονίας",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Δυτικής Μακεδονίας",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Βορείου Αιγαίου",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Νοτίου Αιγαίου",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Ιονίων Νήσων",
    "Ομοσπονδία Εμπορικών Επιχειρήσεων Δωδεκανήσου"
  ];

  const benefits = [
    {
      title: "Νομική Υποστήριξη",
      description: "Συμβουλευτική και υποστήριξη σε νομικά θέματα"
    },
    {
      title: "Εκπαίδευση & Ενημέρωση",
      description: "Σεμινάρια, ημερίδες και ενημερωτικά προγράμματα"
    },
    {
      title: "Δικτύωση",
      description: "Συνάντηση με άλλους επιχειρηματίες και συνεργάτες"
    },
    {
      title: "Εκπροσώπηση",
      description: "Υπεράσπιση των συμφερόντων σας σε θεσμικό επίπεδο"
    },
    {
      title: "Προγράμματα & Χρηματοδότηση",
      description: "Πρόσβαση σε ευρωπαϊκά και εθνικά προγράμματα"
    },
    {
      title: "Έρευνες & Στατιστικά",
      description: "Πρόσβαση σε ειδικές έρευνες και στατιστικά στοιχεία"
    }
  ];

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ΜΕΛΗ ΤΗΣ ΕΣΕΕ
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className={`text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              17 Ομοσπονδίες & 340 Εμπορικούς Συλλόγους και 5 Συνδέσμους σε όλη την Ελλάδα
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {memberStats.map((stat, index) => (
              <div key={index} className={`${
                isDark 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              } border rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  {stat.icon}
                </div>
                <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.number}
                </div>
                <div className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.description}
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Οφέλη Συμμετοχής
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className={`${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } border rounded-xl p-8 hover:shadow-xl transition-all duration-300`}>
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {benefit.title}
                  </h3>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Federations Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Ομοσπονδίες Μέλη
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {federations.map((federation, index) => (
                <div key={index} className={`p-4 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      isDark ? 'bg-blue-400' : 'bg-blue-600'
                    }`}></div>
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {federation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Join Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Πώς να γίνετε μέλος
              </h2>
              <div className={`space-y-6 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <p>Επικοινωνήστε με την τοπική σας Ομοσπονδία ή Εμπορικό Σύλλογο</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <p>Συμπληρώστε την αίτηση συμμετοχής με τα απαραίτητα έγγραφα</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <p>Αναμονή έγκρισης από το Διοικητικό Συμβούλιο</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <p>Πληρωμή ετήσιου συνδρομικού και ενεργοποίηση συμμετοχής</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Απαιτήσεις Συμμετοχής
              </h2>
              <div className={`space-y-4 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mr-4 mt-3 ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`}></div>
                  <p>Εμπορική επιχείρηση με έδρα στην Ελλάδα</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mr-4 mt-3 ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`}></div>
                  <p>Κανονική λειτουργία και πληρωμή φόρων</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mr-4 mt-3 ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`}></div>
                  <p>Συμμόρφωση με τις ηθικές αρχές του εμπορίου</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mr-4 mt-3 ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`}></div>
                  <p>Αποδοχή του καταστατικού της ΕΣΕΕ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Γίνετε μέλος της ΕΣΕΕ σήμερα
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Συμμετέχετε στο μεγαλύτερο δίκτυο εμπορικών επιχειρήσεων της Ελλάδας
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`px-8 py-4 rounded-lg font-medium text-lg transition-colors ${
                isDark 
                  ? 'bg-blue-400 hover:bg-blue-500 text-blue-950' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}>
                Επικοινωνήστε μαζί μας
              </button>
              <button className={`px-8 py-4 rounded-lg font-medium text-lg border-2 transition-colors ${
                isDark 
                  ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-blue-950' 
                  : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              }`}>
                Κατεβάστε αίτηση
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isDark={isDark} />
    </main>
  );
};

export default Members;
