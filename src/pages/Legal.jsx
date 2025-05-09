import { Link } from 'react-router-dom';

const Legal = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Νομικές Πληροφορίες
        </h1>

        {/* Introduction */}
        <div className="prose max-w-none text-gray-700 space-y-6">
          <p>
            Ο δικτυακός τόπος www.esee.gr (εφεξής «η Ιστοσελίδα»), ανήκει στο σωματείο με την επωνυμία «Ελληνική Συνομοσπονδία Εμπορίου και Επιχειρηματικότητας» και τον διακριτικό τίτλο «ΕΣΕΕ»), που εδρεύει στην Αθήνα, επί της οδού Μητροπόλεως και αριθμό 42 (εφεξής: η «ΕΣΕΕ»), η οποία έχει την ευθύνη λειτουργίας του και νομίμως διαχειρίζεται και αποτελεί το διαδικτυακό μέσο επικοινωνίας και ενημέρωσης της ΕΣΕΕ με το κοινό.
          </p>

          <p>
            Η χρήση της παρούσας Ιστοσελίδας της Ελληνικής Συνομοσπονδίας Εμπορίου και Επιχειρηματικότητας (ΕΣΕΕ) υπόκειται στους Όρους που παρατίθενται στη συνέχεια. Η χρήση της Ιστοσελίδας προϋποθέτει και συνεπάγεται ότι ο επισκέπτης ή και χρήστης έχει μελετήσει, κατανοήσει και αποδεχτεί όλους τους Όρους Χρήσης της Ιστοσελίδας.
          </p>
        </div>

        {/* Privacy Policy Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Πολιτική Ιδιωτικότητας και προστασίας προσωπικών δεδομένων
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p>
              Παρακαλούμε επισκεφτείτε την <Link to="/privacy" className="text-blue-600 hover:text-blue-800">σελίδα Πολιτική Ιδιωτικότητας και Προστασίας Προσωπικών Δεδομένων</Link> στην οποία είναι αναρτημένες όλες οι πληροφορίες σχετικά με το είδος και τις μεθόδους συλλογής των προσωπικών δεδομένων των Χρηστών.
            </p>
          </div>
        </div>

        {/* Cookies Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Cookies
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p>
              Με τήρηση της κείμενης νομοθεσίας και σύμφωνα με την Ευρωπαϊκή Οδηγία E-Privacy 2009/136 ΣΕ και τις από 25.2.2020 Οδηγίες της ΑΠΔΠΧ, η ιστοσελίδα μας αποδέχεται τη χρήση των &ldquo;cookies&rdquo;. Τα «cookies» αποτελούν μικρά τμήματα πληροφορίας που αποθηκεύονται στον υπολογιστή του χρήστη.
            </p>
          </div>
        </div>

        {/* Intellectual Property Rights */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Δικαιώματα Πνευματικής Ιδιοκτησίας
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p>
              Το σύνολο του πρωτότυπου Περιεχομένου της Ιστοσελίδας αποτελεί αντικείμενο της πνευματικής ιδιοκτησίας της ΕΣΕΕ και προστατεύεται από το ισχύον εθνικό, ευρωπαϊκό και διεθνές δίκαιο.
            </p>
          </div>
        </div>

        {/* Liability Limitation */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Περιορισμός ευθύνης της ΕΣΕΕ
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p>
              Η ΕΣΕΕ χωρίς να παρέχει εγγυήσεις και συνεπώς να χωρίς ευθύνεται, καταβάλλει κάθε δυνατή προσπάθεια, ώστε το Περιεχόμενο της Ιστοσελίδας να είναι ακριβές και επικαιροποιημένο.
            </p>
          </div>
        </div>

        {/* User Obligations */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Υποχρεώσεις των Χρηστών
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p>
              Ο κάθε Χρήστης οφείλει να απέχει από κάθε παράνομη και καταχρηστική συμπεριφορά κατά τη χρήση της Ιστοσελίδας και εν γένει να κάνει χρήση της Ιστοσελίδας με οποιοδήποτε τρόπο θα μπορούσε να βλάψει την ΕΣΕΕ ή και τρίτους.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700">
            Για οποιοδήποτε θέμα σχετικό με τη λειτουργία και τη διαχείριση της παρούσας Ιστοσελίδας μπορείτε να επικοινωνείτε με την ΕΣΕΕ στη διεύθυνση itsupport@esee.gr.
          </p>
          <p className="text-gray-500 mt-4">
            Τελευταία ενημέρωση: Ιανουάριος 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Legal;
