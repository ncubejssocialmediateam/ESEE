import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { Users, Target, Award, Building } from 'lucide-react';

const About = () => {
  const { isDark } = useTheme();

  const stats = [
    { icon: <Building className="w-8 h-8" />, number: "17", label: "Ομοσπονδίες" },
    { icon: <Users className="w-8 h-8" />, number: "340", label: "Εμπορικοί Σύλλογοι" },
    { icon: <Award className="w-8 h-8" />, number: "5", label: "Σύνδεσμοι" },
    { icon: <Target className="w-8 h-8" />, number: "50+", label: "Έτη Εμπειρίας" }
  ];

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ΠΟΙΟΙ ΕΙΜΑΣΤΕ
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className={`text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Υπεύθυνη φωνή του ελληνικού εμπορίου και της μικρομεσαίας επιχειρηματικότητας
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
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
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column */}
            <div>
              <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Η ΕΣΕΕ
              </h2>
              <div className={`space-y-6 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  Η Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας (ΕΣΕΕ) είναι η κορυφαία 
                  οργάνωση που εκπροσωπεί το εμπόριο και την επιχειρηματικότητα στην Ελλάδα.
                </p>
                <p>
                  Ιδρύθηκε το 1975 και από τότε έχει αναπτυχθεί σε έναν από τους πιο σημαντικούς 
                  φορείς της ελληνικής οικονομίας, εκπροσωπώντας χιλιάδες επιχειρήσεις σε όλη τη χώρα.
                </p>
                <p>
                  Η ΕΣΕΕ ενώνει 17 Ομοσπονδίες, 340 Εμπορικούς Συλλόγους και 5 Συνδέσμους, 
                  δημιουργώντας ένα δυναμικό δίκτυο που καλύπτει όλες τις περιοχές της Ελλάδας.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Η Αποστολή μας
              </h2>
              <div className={`space-y-6 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  <strong>Υπεράσπιση των συμφερόντων</strong> των εμπορικών επιχειρήσεων και 
                  της μικρομεσαίας επιχειρηματικότητας σε όλα τα επίπεδα.
                </p>
                <p>
                  <strong>Προώθηση της ανάπτυξης</strong> μέσω καινοτόμων προγραμμάτων, 
                  εκπαίδευσης και υποστήριξης των μελών μας.
                </p>
                <p>
                  <strong>Συνεργασία με θεσμούς</strong> για τη δημιουργία ευνοϊκού 
                  επιχειρηματικού περιβάλλοντος.
                </p>
                <p>
                  <strong>Ενημέρωση και εκπαίδευση</strong> των μελών μας για τις 
                  τελευταίες εξελίξεις στον τομέα του εμπορίου.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-8 mb-16`}>
            <h2 className={`text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Οι Αξίες μας
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <Target className="w-8 h-8" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Ακεραιότητα
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Διατηρούμε υψηλά ηθικά πρότυπα και διαφάνεια σε όλες τις δραστηριότητές μας.
                </p>
              </div>
              
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <Users className="w-8 h-8" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Συνεργασία
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Ενισχύουμε τη συνεργασία μεταξύ των μελών μας και των θεσμικών φορέων.
                </p>
              </div>
              
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <Award className="w-8 h-8" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Αριστεία
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Προσφέρουμε υπηρεσίες υψηλής ποιότητας και συνεχή βελτίωση.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Γίνετε μέλος της ΕΣΕΕ
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Συμμετέχετε στο μεγαλύτερο δίκτυο εμπορικών επιχειρήσεων της Ελλάδας
            </p>
            <button className={`px-8 py-4 rounded-lg font-medium text-lg transition-colors ${
              isDark 
                ? 'bg-blue-400 hover:bg-blue-500 text-blue-950' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}>
              Μάθετε περισσότερα
            </button>
          </div>
        </div>
      </div>
      
      <Footer isDark={isDark} />
    </main>
  );
};

export default About;