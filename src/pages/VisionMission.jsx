import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { Eye, Target, Lightbulb, Heart, Users, TrendingUp } from 'lucide-react';

const VisionMission = () => {
  const { isDark } = useTheme();

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Κοινότητα",
      description: "Δημιουργούμε μια δυναμική κοινότητα επιχειρηματιών που στηρίζουν ο ένας τον άλλο"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Καινοτομία",
      description: "Προωθούμε νέες ιδέες και τεχνολογικές λύσεις για την ανάπτυξη του εμπορίου"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Κοινωνική Ευθύνη",
      description: "Υποστηρίζουμε την αειφόρο ανάπτυξη και την κοινωνική ευθύνη των επιχειρήσεων"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Ανάπτυξη",
      description: "Συμβάλλουμε στην οικονομική ανάπτυξη και την ευημερία της ελληνικής κοινωνίας"
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
              ΤΟ ΟΡΑΜΑ & Η ΑΠΟΣΤΟΛΗ
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className={`text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Όταν οι άνθρωποι επιχειρούν, οι κοινωνίες ευημερούν
            </p>
          </div>

          {/* Vision Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <div className="text-center mb-12">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <Eye className="w-10 h-10" />
              </div>
              <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Το Οράμα μας
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className={`text-2xl leading-relaxed text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Να είμαστε η κορυφαία οργάνωση που εκπροσωπεί και υποστηρίζει το ελληνικό εμπόριο 
                και την επιχειρηματικότητα, δημιουργώντας ένα δυναμικό και βιώσιμο επιχειρηματικό 
                περιβάλλον που ευνοεί την καινοτομία, την ανάπτυξη και την κοινωνική ευημερία.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <div className="text-center mb-12">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <Target className="w-10 h-10" />
              </div>
              <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Η Αποστολή μας
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className={`text-xl leading-relaxed text-center mb-12 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Η ΕΣΕΕ έχει ως αποστολή να:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-6 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Υπεράσπιση & Εκπροσώπηση
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Υπερασπιζόμαστε τα συμφέροντα των εμπορικών επιχειρήσεων και της 
                    μικρομεσαίας επιχειρηματικότητας σε όλα τα επίπεδα.
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Υποστήριξη & Εκπαίδευση
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Παρέχουμε συμβουλευτικές υπηρεσίες, εκπαίδευση και υποστήριξη 
                    για την ανάπτυξη των επιχειρήσεων.
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Καινοτομία & Ανάπτυξη
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Προωθούμε καινοτόμες λύσεις και προγράμματα που συμβάλλουν 
                    στην οικονομική ανάπτυξη.
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Δικτύωση & Συνεργασία
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Δημιουργούμε δίκτυα συνεργασίας μεταξύ επιχειρήσεων και 
                    θεσμικών φορέων.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Οι Αξίες μας
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className={`${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } border rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {value.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {value.title}
                  </h3>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 text-center`}>
            <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Η Επίδρασή μας
            </h2>
            <p className={`text-xl leading-relaxed max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Μέσω των δραστηριοτήτων μας, συμβάλλουμε στην δημιουργία χιλιάδων θέσεων εργασίας, 
              στην ανάπτυξη της ελληνικής οικονομίας και στην ενίσχυση της επιχειρηματικότητας 
              σε όλη τη χώρα. Η ΕΣΕΕ είναι η φωνή που ακούγεται και η δύναμη που κινεί 
              την ελληνική επιχειρηματικότητα προς το μέλλον.
            </p>
          </div>
        </div>
      </div>
      
      <Footer isDark={isDark} />
    </main>
  );
};

export default VisionMission;
