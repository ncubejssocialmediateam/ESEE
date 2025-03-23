const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Η ΕΣΕΕ ΜΕ ΜΙΑ ΜΑΤΙΑ
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl">
            Η Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας αποτελεί την υπεύθυνη «φωνή» του ελληνικού εμπορίου και της μικρομεσαίας επιχειρηματικότητας, τον ισχυρό εκπρόσωπο της «ραχοκοκαλιάς» της ελληνικής οικονομίας, στην Ελλάδα και στο εξωτερικό.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ποιοι Είμαστε</h2>
              <p className="text-gray-700">
                Η Ελληνική Συνομοσπονδία Εμπορίου και Επιχειρηματικότητας (ΕΣΕΕ) είναι η τριτοβάθμια οργάνωση του ελληνικού εμπορίου. Εκπροσωπεί τον εμπορικό κόσμο και τη μικρομεσαία επιχειρηματικότητα σε εθνικό και σε διεθνές επίπεδο.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ο Ρόλος μας</h2>
              <ul className="space-y-4 text-gray-700">
                <li>• Συμμετέχει ως ισότιμος κοινωνικός εταίρος στην υπογραφή της Εθνικής Γενικής Συλλογικής Σύμβασης Εργασίας</li>
                <li>• Αναδεικνύει τον κοινωνικό ρόλο των επιχειρήσεων</li>
                <li>• Εργάζεται για την ανάδειξη του εμπορίου ως ατμομηχανή της οικονομικής ανάπτυξης</li>
                <li>• Προωθεί την ανταγωνιστικότητα και την οικονομική πρόοδο</li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Η Δύναμή μας</h2>
              <p className="text-gray-700">
                Αριθμούμε:
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>• 17 Ομοσπονδίες</li>
                <li>• 340 Εμπορικούς Συλλόγους</li>
                <li>• 5 Συνδέσμους Εμπορικών Αντιπροσώπων</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Η Ιστορία μας</h2>
              <p className="text-gray-700">
                Από το 1994, όταν και απέκτησε τη σημερινή της μορφή, η ΕΣΕΕ, πέρα και έξω από συντεχνιακές λογικές, δίχως κομματικές εξαρτήσεις, εκπροσωπεί θεσμικά και υπεύθυνα τον εμπορικό κλάδο και τη μικρομεσαία επιχειρηματικότητα.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            &ldquo;ΣΤΗΡΙΖΟΥΜΕ ΤΟ ΕΜΠΟΡΙΟ & ΤΗΝ ΕΠΙΧΕΙΡΗΜΑΤΙΚΟΤΗΤΑ.<br />
            ΔΥΝΑΜΩΝΟΥΜΕ ΤΗΝ ΕΛΛΑΔΑ ΜΑΖΙ.&rdquo;
          </h2>
          <p className="text-xl opacity-90">
            Η ΕΣΕΕ στηρίζει -στην πράξη- τις επιχειρήσεις, βοηθώντας τις να εκσυγχρονιστούν και να αναπτυχθούν μέσα από την καινοτομία και την εξωστρέφεια.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
