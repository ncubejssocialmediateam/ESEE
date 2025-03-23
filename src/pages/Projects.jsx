const Projects = () => {
  return (
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

        {/* EU Funding Notice */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 text-center">
            Τα έργα συγχρηματοδοτούνται από την Ελλάδα και την Ευρωπαϊκή Ένωση
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
