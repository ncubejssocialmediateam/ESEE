import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { BookOpen, Users, TrendingUp, Award, Target, Lightbulb } from 'lucide-react';

const InemyKaele = () => {
  const { isDark } = useTheme();

  const inemyServices = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Εκπαιδευτικά Προγράμματα",
      description: "Σεμινάρια, ημερίδες και προγράμματα εκπαίδευσης για επιχειρηματίες"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Συμβουλευτική Υποστήριξη",
      description: "Εξειδικευμένη συμβουλευτική για την ανάπτυξη επιχειρήσεων"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Έρευνες & Μελέτες",
      description: "Επιστημονικές έρευνες για την εμπορική και επιχειρηματική ανάπτυξη"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Καινοτομία & Τεχνολογία",
      description: "Προώθηση καινοτόμων λύσεων και τεχνολογικών εξελίξεων"
    }
  ];

  const kaeleServices = [
    {
      title: "Εκπαιδευτικά Προγράμματα",
      description: "Προγράμματα εκπαίδευσης και κατάρτισης για το εμπορικό προσωπικό"
    },
    {
      title: "Συμβουλευτική Υποστήριξη",
      description: "Εξειδικευμένη συμβουλευτική για εμπορικές επιχειρήσεις"
    },
    {
      title: "Έρευνες & Στατιστικά",
      description: "Συλλογή και ανάλυση δεδομένων για την εμπορική δραστηριότητα"
    },
    {
      title: "Εκδηλώσεις & Δικτύωση",
      description: "Οργάνωση εκδηλώσεων και δραστηριοτήτων δικτύωσης"
    }
  ];

  const achievements = [
    {
      icon: <Award className="w-8 h-8" />,
      number: "500+",
      label: "Εκπαιδευτικά Προγράμματα",
      description: "Ολοκληρωμένα τα τελευταία 5 έτη"
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "10,000+",
      label: "Επιχειρηματίες",
      description: "Εκπαιδευμένοι μέσω των προγραμμάτων μας"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      number: "50+",
      label: "Έρευνες & Μελέτες",
      description: "Επιστημονικές δημοσιεύσεις"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "95%",
      label: "Ικανοποίηση",
      description: "Από τους συμμετέχοντες"
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
              ΙΝΕΜΥ – ΚΑΕΛΕ
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className={`text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Τα επίσημα επιστημονικά όργανα της ΕΣΕΕ
            </p>
          </div>

          {/* INEMY Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ΙΝΕΜΥ
              </h2>
              <p className={`text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                Ινστιτούτο Εμπορίου & Επιχειρηματικότητας
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mb-12">
              <p className={`text-lg leading-relaxed text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Το ΙΝΕΜΥ είναι το επιστημονικό όργανο της ΕΣΕΕ που ασχολείται με την 
                έρευνα, την εκπαίδευση και την ανάπτυξη της επιχειρηματικότητας. 
                Ιδρύθηκε με σκοπό την προώθηση της επιστημονικής γνώσης στον τομέα 
                του εμπορίου και της επιχειρηματικότητας.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {inemyServices.map((service, index) => (
                <div key={index} className={`${
                  isDark 
                    ? 'bg-gray-700' 
                    : 'bg-gray-50'
                } rounded-xl p-6 text-center`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* KAELE Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ΚΑΕΛΕ
              </h2>
              <p className={`text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                Κέντρο Ανάπτυξης Εμπορικού Λειτουργικού Επιπέδου
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mb-12">
              <p className={`text-lg leading-relaxed text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Το ΚΑΕΛΕ είναι το κέντρο που ασχολείται με την ανάπτυξη και την 
                υποστήριξη του εμπορικού λειτουργικού επιπέδου. Προσφέρει υπηρεσίες 
                εκπαίδευσης, συμβουλευτικής και έρευνας ειδικά για τις εμπορικές 
                επιχειρήσεις και το προσωπικό τους.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {kaeleServices.map((service, index) => (
                <div key={index} className={`${
                  isDark 
                    ? 'bg-gray-700' 
                    : 'bg-gray-50'
                } rounded-xl p-6`}>
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-16">
            <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Τα Επιτεύγματά μας
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className={`${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } border rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {achievement.number}
                  </div>
                  <div className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {achievement.label}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {achievement.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Programs Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Τρέχοντα Προγράμματα
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Ψηφιακός Μετασχηματισμός
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Προγράμματα εκπαίδευσης για την ψηφιακή μετάβαση των επιχειρήσεων
                </p>
                <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  Διάρκεια: 2021-2027
                </div>
              </div>
              
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Ανθρώπινο Δυναμικό
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Προγράμματα ανάπτυξης ανθρώπινου δυναμικού και κοινωνικής συνοχής
                </p>
                <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  Διάρκεια: 2021-2027
                </div>
              </div>
              
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Ανταγωνιστικότητα & Καινοτομία
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Προγράμματα ενίσχυσης της ανταγωνιστικότητας και της καινοτομίας
                </p>
                <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  Διάρκεια: 2014-2020
                </div>
              </div>
              
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Δια Βίου Μάθηση
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Προγράμματα δια βίου εκπαίδευσης και κατάρτισης
                </p>
                <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  Συνεχής λειτουργία
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Επικοινωνία
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Για περισσότερες πληροφορίες σχετικά με τα προγράμματά μας
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
                Δείτε τα προγράμματά μας
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isDark={isDark} />
    </main>
  );
};

export default InemyKaele;
