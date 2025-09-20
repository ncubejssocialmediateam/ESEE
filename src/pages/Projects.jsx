import Navigation from '../components/layout/Navigation';
import { useTheme } from '../context/ThemeContext';

const Projects = () => {
  const { isDark } = useTheme();
  
  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          ΣΥΓΧΡΗΜΑΤΟΔΟΤΟΥΜΕΝΑ ΕΡΓΑ
        </h1>

        {/* Introduction */}
        <div className="prose max-w-none text-gray-700 mb-12">
          <p className="text-xl">
            Η ΕΣΕΕ υλοποιεί, μέσω του ΕΣΠΑ 2007 – 2013 και με τη συγχρηματοδότηση της Ελλάδας και της Ευρωπαϊκής Ένωσης, ένα πλήθος έργων
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card 1 */}
          <div className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Επιστημονική και Επιχειρησιακή Ικανότητα
            </h3>
            <p className="text-gray-700">
              Ενισχύει την επιστημονική και επιχειρησιακή της ικανότητα
            </p>
          </div>

          {/* Project Card 2 */}
          <div className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Συμβουλευτική Υποστήριξη
            </h3>
            <p className="text-gray-700">
              Παρέχει υπηρεσίες συμβουλευτικής υποστήριξης στις μικρομεσαίες εμπορικές επιχειρήσεις
            </p>
          </div>

          {/* Project Card 3 */}
          <div className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Πράσινη Επιχειρηματικότητα
            </h3>
            <p className="text-gray-700">
              Αναπτύσσει καινοτόμες δράσεις για την ενίσχυση της πράσινης επιχειρηματικότητας και την ανάπτυξη της εταιρικής κοινωνικής ευθύνης στις μικρομεσαίες εμπορικές επιχειρήσεις
            </p>
          </div>

          {/* Project Card 4 */}
          <div className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Διαχείριση Ηλικίας
            </h3>
            <p className="text-gray-700">
              Σχεδιάζει και υλοποιεί πιλοτικά προγράμματα για την υποστήριξη των μικρομεσαίων εμπορικών επιχειρήσεων στην υλοποίηση δράσεων σχετικών με τη διαχείριση της ηλικίας (διαδοχή, νεοεισερχόμενοι, ενεργός γήρανση)
            </p>
          </div>

          {/* Project Card 5 */}
          <div className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Δια Βίου Εκπαίδευση
            </h3>
            <p className="text-gray-700">
              Σχεδιάζει και υλοποιεί Προγράμματα Δια Βίου Εκπαίδευσης για το ανθρώπινο δυναμικό των εμπορικών επιχειρήσεων
            </p>
          </div>

          {/* Project Card 6 */}
          <div className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ενίσχυση Γυναικείας Συμμετοχής
            </h3>
            <p className="text-gray-700">
              Ενισχύει και υποστηρίζει τη συμμετοχή των γυναικών στα κέντρα λήψης αποφάσεων
            </p>
          </div>
        </div>

        {/* Logo Carousel Section */}
        <div className="mt-16 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Συνεργαζόμενοι Φορείς
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {/* Digital Transformation */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="https://www.digitaltransform.gr/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-full h-full bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">Ψηφιακός Μετασχηματισμός 2021-2027</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Ψηφιακός Μετασχηματισμός</p>
              </a>
            </div>

            {/* Ministry of Education */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="https://empedu.gov.gr/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-full h-full bg-green-100 rounded flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">Υπουργείο Παιδείας</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Υπουργείο Παιδείας</p>
              </a>
            </div>

            {/* Competitiveness */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="#" className="block">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-full h-full bg-purple-100 rounded flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">Ανταγωνιστικότητα & Επιχειρηματικότητα</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Ανταγωνιστικότητα</p>
              </a>
            </div>

            {/* Human Resources */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="#" className="block">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-full h-full bg-orange-100 rounded flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">Ανάπτυξη Ανθρώπινου Δυναμικού</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Ανθρώπινο Δυναμικό</p>
              </a>
            </div>

            {/* Administrative Reform */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="#" className="block">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-full h-full bg-red-100 rounded flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">Διοικητική Μεταρρύθμιση</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Διοικητική Μεταρρύθμιση</p>
              </a>
            </div>

            {/* Education & Training */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="#" className="block">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-full h-full bg-indigo-100 rounded flex items-center justify-center">
                    <span className="text-indigo-600 font-bold text-sm">Εκπαίδευση & Δια Βίου Μάθηση</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Εκπαίδευση</p>
              </a>
            </div>

            {/* European Fund */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="#" className="block">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-full h-full bg-yellow-100 rounded flex items-center justify-center">
                    <span className="text-yellow-600 font-bold text-sm">Ευρωπαϊκό Ταμείο</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Ευρωπαϊκό Ταμείο</p>
              </a>
            </div>

            {/* Ionian Islands */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="#" className="block">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-full h-full bg-teal-100 rounded flex items-center justify-center">
                    <span className="text-teal-600 font-bold text-sm">Ιόνια Νησιά</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Ιόνια Νησιά</p>
              </a>
            </div>

            {/* Erasmus */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="#" className="block">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-full h-full bg-pink-100 rounded flex items-center justify-center">
                    <span className="text-pink-600 font-bold text-sm">Erasmus+</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Erasmus+</p>
              </a>
            </div>

            {/* Additional Partner */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <a href="#" className="block">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-sm">Συνεργαζόμενοι Φορείς</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Συνεργαζόμενοι</p>
              </a>
            </div>
          </div>
        </div>

        {/* EU Funding Notice */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 text-center">
            Τα έργα συγχρηματοδοτούνται από την Ελλάδα και την Ευρωπαϊκή Ένωση
          </p>
        </div>
      </div>
      </div>
    </main>
  );
};

export default Projects;
