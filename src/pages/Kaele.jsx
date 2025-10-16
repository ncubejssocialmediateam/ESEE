import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Award, 
  Target, 
  Lightbulb, 
  BarChart3, 
  Building2, 
  Euro, 
  UserCheck, 
  Percent, 
  Calendar,
  GraduationCap,
  Briefcase,
  FileText,
  Network,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

const Kaele = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const kaeleServices = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Εκπαιδευτικά Προγράμματα",
      description: "Προγράμματα εκπαίδευσης και κατάρτισης για το εμπορικό προσωπικό και τους επιχειρηματίες",
      features: [
        "Σεμινάρια ειδικευμένης εκπαίδευσης",
        "Προγράμματα βιωματικής μάθησης",
        "Εκπαίδευση σε νέες τεχνολογίες",
        "Πιστοποιητικά επαγγελματικής κατάρτισης"
      ]
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Συμβουλευτική Υποστήριξη",
      description: "Εξειδικευμένη συμβουλευτική για εμπορικές επιχειρήσεις και ανάπτυξη επιχειρηματικότητας",
      features: [
        "Στρατηγικός σχεδιασμός επιχειρήσεων",
        "Ανάλυση αγοράς και ανταγωνισμού",
        "Οικονομικός σχεδιασμός",
        "Διαχείριση κρίσεων"
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Έρευνες & Στατιστικά",
      description: "Συλλογή και ανάλυση δεδομένων για την εμπορική δραστηριότητα και τις τάσεις της αγοράς",
      features: [
        "Έρευνες αγοράς",
        "Στατιστικές αναλύσεις",
        "Μελέτες επιχειρηματικότητας",
        "Αναφορές τάσεων"
      ]
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Εκδηλώσεις & Δικτύωση",
      description: "Οργάνωση εκδηλώσεων και δραστηριοτήτων δικτύωσης για την εμπορική κοινότητα",
      features: [
        "Επιστημονικά συνέδρια",
        "Εργαστήρια και σεμινάρια",
        "Δικτυακές εκδηλώσεις",
        "Επιχειρηματικά δίκτυα"
      ]
    }
  ];

  const achievements = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Εκπαιδευμένοι Επιχειρηματίες",
      value: "2,500+",
      description: "Επιχειρηματίες που έχουν εκπαιδευτεί μέσω των προγραμμάτων μας"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Υποστηριζόμενες Επιχειρήσεις",
      value: "1,200+",
      description: "Εμπορικές επιχειρήσεις που έχουν λάβει συμβουλευτική υποστήριξη"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Ολοκληρωμένες Έρευνες",
      value: "150+",
      description: "Ερευνητικά έργα και μελέτες που έχουν ολοκληρωθεί"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Εκδηλώσεις",
      value: "300+",
      description: "Εκδηλώσεις και δραστηριότητες που έχουν οργανωθεί"
    }
  ];

  const programs = [
    {
      title: "Πρόγραμμα Επιχειρηματικής Εκπαίδευσης",
      description: "Συνολικό πρόγραμμα εκπαίδευσης για νέους επιχειρηματίες",
      duration: "6 μήνες",
      participants: "50-100 άτομα ανά κύκλο"
    },
    {
      title: "Σεμινάρια Ειδικευμένης Εκπαίδευσης",
      description: "Ειδικευμένα σεμινάρια για συγκεκριμένους τομείς του εμπορίου",
      duration: "1-3 ημέρες",
      participants: "20-30 άτομα ανά σεμινάριο"
    },
    {
      title: "Προγράμματα Ψηφιακής Μετασχηματισμού",
      description: "Εκπαίδευση στην ψηφιακή μετασχηματισμό των επιχειρήσεων",
      duration: "3 μήνες",
      participants: "30-50 άτομα ανά κύκλο"
    },
    {
      title: "Επιχειρηματικά Δίκτυα",
      description: "Δημιουργία και διαχείριση επιχειρηματικών δικτύων",
      duration: "Συνεχές",
      participants: "Ανοιχτό σε όλους τους επιχειρηματίες"
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
              ΚΑΕΛΕ
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className={`text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              ΚΕΝΤΡΟ ΑΝΑΠΤΥΞΗΣ ΕΛΛΗΝΙΚΟΥ ΕΜΠΟΡΙΟΥ & ΕΠΙΧΕΙΡΗΜΑΤΙΚΟΤΗΤΑΣ
            </p>
            <p className={`text-lg mt-4 max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Το ΚΑΕΛΕ είναι το κέντρο που ασχολείται με την ανάπτυξη και την υποστήριξη 
              του εμπορικού λειτουργικού επιπέδου, προσφέροντας υπηρεσίες εκπαίδευσης, 
              συμβουλευτικής και έρευνας ειδικά για τις εμπορικές επιχειρήσεις.
            </p>
          </div>

          {/* Mission & Vision Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Αποστολή
                </h2>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Η αποστολή του ΚΑΕΛΕ είναι η προώθηση της ανάπτυξης και της 
                  εκσυγχρονισμού του εμπορικού τομέα μέσω της παροχής υπηρεσιών 
                  υψηλής ποιότητας σε εκπαίδευση, έρευνα και συμβουλευτική υποστήριξη.
                </p>
              </div>
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Όραμα
                </h2>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Να γίνουμε το κορυφαίο κέντρο αναφοράς για την ανάπτυξη της 
                  επιχειρηματικότητας και του εμπορίου στην Ελλάδα, συμβάλλοντας 
                  στην οικονομική ανάπτυξη και την κοινωνική ευημερία.
                </p>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-16">
            <h2 className={`text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Υπηρεσίες
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {kaeleServices.map((service, index) => (
                <div key={index} className={`${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } border rounded-xl p-8 hover:shadow-lg transition-shadow duration-300`}>
                  <div className={`inline-flex p-3 rounded-lg mb-6 ${
                    isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`flex items-center ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
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
            <h2 className={`text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Προγράμματα
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program, index) => (
                <div key={index} className={`${
                  isDark 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                } border rounded-lg p-6`}>
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {program.title}
                  </h3>
                  <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {program.description}
                  </p>
                  <div className="space-y-2">
                    <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">Διάρκεια:</span>
                      <span className="ml-2">{program.duration}</span>
                    </div>
                    <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Users className="w-4 h-4 mr-2" />
                      <span className="font-medium">Συμμετέχοντες:</span>
                      <span className="ml-2">{program.participants}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-16">
            <h2 className={`text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Επιτεύγματα
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className={`${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } border rounded-xl p-8 text-center`}>
                  <div className={`inline-flex p-4 rounded-full mb-4 ${
                    isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {achievement.value}
                  </h3>
                  <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Presentation Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16 text-center`}>
            <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Παρουσίαση ΚΑΕΛΕ
            </h2>
            <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Κατεβάστε την πλήρη παρουσίαση του ΚΑΕΛΕ για να μάθετε περισσότερα για τις υπηρεσίες και τα προγράμματά μας
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/src/assets/ΠΑΡΟΥΣΙΑΣΗ ΚΑΕΛΕ.docx" 
                download="ΠΑΡΟΥΣΙΑΣΗ ΚΑΕΛΕ.docx"
                className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  isDark 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <FileText className="w-5 h-5 mr-2" />
                Κατεβάστε Παρουσίαση
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <a 
                href="/inemy" 
                className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-200 ${
                  isDark 
                    ? 'border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white' 
                    : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
              >
                Μάθετε για το ΙΝΕΜΥ
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 text-center`}>
            <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Επικοινωνία
            </h2>
            <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Για περισσότερες πληροφορίες σχετικά με τα προγράμματα και τις υπηρεσίες του ΚΑΕΛΕ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  isDark 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Επικοινωνήστε μαζί μας
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer isDark={isDark} />
    </main>
  );
};

export default Kaele;
