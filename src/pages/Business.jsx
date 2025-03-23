const Business = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ΕΠΙΧΕΙΡΗΣΕΙΣ
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Ενημερωμένη και στοχευμένη πληροφόρηση για την επιχειρηματικότητα.
        </p>

        {/* Business Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Business Formation */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                &Iota;δρυση επιχειρήσεων
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Διανοητική Ιδιοκτησία</li>
                <li>• Συναλλαγές με Πελάτες</li>
                <li>• Εργασιακά/Πολιτικές</li>
                <li>• Φορολογία</li>
              </ul>
            </div>
          </div>

          {/* Legal Updates */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Νομοθετικές Ενημερώσεις
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">ΦΕΚ Α&apos; 71/07-04-2022</p>
                  <p className="font-medium">Νόμος 4919/2022</p>
                  <p className="text-gray-700">Σύσταση εταιρειών μέσω των Υπηρεσιών Μιας Στάσης (Υ.Μ.Σ.) και τήρηση του Γενικού Εμπορικού Μητρώου (Γ.Ε.ΜΗ.)</p>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">Δείτε περισσότερα</a>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ΦΕΚ Β&apos; 4629/1-9-2022</p>
                  <p className="font-medium">Υ.Α. 80016/2022</p>
                  <p className="text-gray-700">Κώδικας Δεοντολογίας περί ανακοινώσεων μείωσης της τιμής (ιδίως σε προσφορές/εκπτώσεις)</p>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">Δείτε περισσότερα</a>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Presence */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Προώθηση της επιχείρησης στο διαδίκτυο
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Ψηφιοποίηση Επιχείρησης</li>
                <li>• Ιστότοπος / ηλεκτρονικό κατάστημα</li>
              </ul>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm mt-4 inline-block">Δείτε περισσότερα</a>
            </div>
          </div>

          {/* Startups */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Νεοφυείς Επιχειρήσεις
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Ελληνικό Οικοσύστημα Νεοφυών Επιχειρήσεων</li>
                <li>• Εθνικό Μητρώο Νεοφυών Επιχειρήσεων</li>
              </ul>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm mt-4 inline-block">Δείτε περισσότερα</a>
            </div>
          </div>

          {/* Support Services */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Συμβουλευτική, Εκπαίδευση, Mentoring
              </h3>
              <p className="text-gray-700">
                Παροχή υπηρεσιών υποστήριξης και καθοδήγησης για την ανάπτυξη της επιχείρησής σας.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm mt-4 inline-block">Δείτε περισσότερα</a>
            </div>
          </div>

          {/* Women Entrepreneurship */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Γυναικεία Επιχειρηματικότητα
              </h3>
              <p className="text-gray-700">
                Ανάπτυξη του Γυναικείου Επιχειρείν και στήριξη της βιωσιμότητας της Ελληνικής Γυναικείας Επιχείρησης
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm mt-4 inline-block">Δείτε περισσότερα</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
