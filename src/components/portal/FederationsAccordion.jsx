import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Phone, Mail, User, Building } from 'lucide-react';

const FederationsAccordion = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const federations = [
    {
      id: 1,
      name: "Ομοσπονδία Εμπορικών Συλλόγων Κρήτης",
      president: "Εμμανουήλ Κουμαντάκης",
      address: "Μιχελιδάκη & Βουρβάχων 11, Ηράκλειο Κρήτης, T.K. 712 02",
      phone: "2810 220450",
      fax: "",
      email: "cretantrade_oesk@otenet.gr",
      region: "Κρήτη"
    },
    {
      id: 2,
      name: "Ομοσπονδία Εμπορικών Συλλόγων Ηλείας",
      president: "Νικόλαος Καρυώτης",
      address: "Πατρών 12-14, Πύργος, T.K. 271 00",
      phone: "26230 35726",
      fax: "",
      email: "oesh1992@gmail.com",
      region: "Ηλεία"
    },
    {
      id: 3,
      name: "Πελοποννησιακή Ομοσπονδία Εμπορίου και Επιχειρηματικότητας",
      president: "Βασίλειος Παγώνης",
      address: "Σπετσεροπούλου 9-11, Τρίπολη, T.K. 221 00",
      phone: "694 888 9720",
      fax: "",
      email: "poee2018@gmail.com",
      region: "Πελοπόννησος"
    },
    {
      id: 4,
      name: "Ομοσπονδία Εμπορίου και Επιχειρηματικότητας Πελοποννήσου, Νοτιοδυτικής Ελλάδος, Ζακύνθου, Κεφαλληνίας και Ιθάκης",
      president: "Γεώργιος Βαγενάς",
      address: "Κανακάρη 46 - 52, Πάτρα, T.K. 262 21",
      phone: "2610 276053",
      fax: "",
      email: "oesp.nde@gmail.com",
      region: "Πελοπόννησος"
    },
    {
      id: 5,
      name: "Ομοσπονδία Εμπορικών Συλλόγων Βορειοδυτικής Ελλάδας & Νήσων",
      president: "Ανδρέας Καραμάνης",
      address: "Βλαχοπούλου 8, Αγρίνιο, T.K. 30 100",
      phone: "26410 57390",
      fax: "26410 57390",
      email: "omospondiaesbden@gmail.com",
      region: "Βορειοδυτική Ελλάδα"
    },
    {
      id: 6,
      name: "Ιόνιος Ομοσπονδία Εμπορίου και Επιχειρηματικότητας",
      president: "Κωνσταντίνος Μουζακίτης",
      address: "Αριστοτέλους 2, Κέρκυρα, T.K. 491 00",
      phone: "26610 45677",
      fax: "",
      email: "info@escorfu.gr",
      region: "Ιόνια Νησιά"
    },
    {
      id: 7,
      name: "Ομοσπονδία Εμπορικών Συλλόγων Αττικής, Ομόρων Νομών & Νήσων Αιγαίου",
      president: "Παύλος Πολιτάκης",
      address: "Γ. Κασιμάτη 1, Πειραιάς, T.K. 185 31",
      phone: "210 4227662",
      fax: "210 4227661",
      email: "oesapir@otenet.gr",
      region: "Αττική"
    },
    {
      id: 8,
      name: "Ομοσπονδία Συνδέσμων Ανεξάρτητων Εμπορικών Αντιπροσώπων, Εισαγωγής, Εξαγωγής & Διανομέων",
      president: "Άλκης Ηλιάδης",
      address: "Βουλής 15, Αθήνα, T.K. 105 63",
      phone: "210 3311871 & 3311870",
      fax: "",
      email: "osaea@otenet.gr",
      region: "Αττική"
    },
    {
      id: 9,
      name: "Ομοσπονδία Συλλόγων Οπτικών Οπτομετρών Ελλάδας (ΟΣΟΟΕ)",
      president: "Θωμάγγελος Μιχαλάκης",
      address: "Πολυτεχνείου 12, Αθήνα, T.K. 104 33",
      phone: "211 1827465",
      fax: "",
      email: "osooe.gr@gmail.com",
      region: "Αττική"
    },
    {
      id: 10,
      name: "Ομοσπονδία Εμπορικών Συλλόγων Ανατολικής Στερεάς Ελλάδας",
      president: "Δημήτρης Σαμαράς",
      address: "Όθωνος 3, Λαμία, T.K. 351 00",
      phone: "22310 52934",
      fax: "",
      email: "oesase@otenet.gr",
      region: "Στερεά Ελλάδα"
    },
    {
      id: 11,
      name: "Ομοσπονδία Εμπορίου και Επιχειρηματικότητας Εύβοιας",
      president: "Παρασκευή Αγιοστρατίτη",
      address: "Ελ. Βενιζέλου 12, Χαλκίδα, T.K. 341 00",
      phone: "22210 22111",
      fax: "",
      email: "info@oesevias.gr",
      region: "Εύβοια"
    },
    {
      id: 12,
      name: "Ομοσπονδία Εμπορίου & Επιχειρηματικότητας Θεσσαλίας",
      president: "Χρήστος Μπλουγούρας",
      address: "Σωκράτους 18, Τρίκαλα, T.K. 421 00",
      phone: "24310 30786",
      fax: "",
      email: "oesthessaly@yahoo.gr",
      region: "Θεσσαλία"
    },
    {
      id: 13,
      name: "Ομοσπονδία Εμπορίου και Επιχειρηματικότητας Δωδεκανήσου",
      president: "Αντώνιος Γιαννούλης",
      address: "Αυστραλίας 80-86 & Μακρυγιάννη, Ρόδος, T.K. 851 00",
      phone: "22410 70280 & 70282",
      fax: "",
      email: "rodos@kaele.gr",
      region: "Δωδεκάνησα"
    },
    {
      id: 14,
      name: "Ελληνική Ομοσπονδία Γούνας",
      president: "Απόστολος Τσούκας",
      address: "Λεωφόρος Γουναράδων Χλόη (Τ.Θ. 1002), Καστοριά, T.K. 521 00",
      phone: "24670 22171",
      fax: "",
      email: "helfurfe@otenet.gr",
      region: "Δυτική Μακεδονία"
    },
    {
      id: 15,
      name: "Ομοσπονδία Εμπορικών Συλλόγων Δυτικής & Κεντρικής Μακεδονίας",
      president: "Νεκτάριος Ελμαλόγλου",
      address: "Παπάγου 43, Βέροια, T.K. 591 32",
      phone: "23310 63707",
      fax: "",
      email: "oesdkmak@gmail.com",
      region: "Μακεδονία"
    },
    {
      id: 16,
      name: "Ομοσπονδία Εμπορίου, Παραγωγικότητας και Επιχειρηματικότητας Κεντρικής – Ανατολικής Μακεδονίας & Θράκης",
      president: "Φανή Μπλιούμη",
      address: "Ολυμπίου Διαμαντή 16, Θεσσαλονίκη, T.K. 546 25",
      phone: "2310 548876 & 547887",
      fax: "",
      email: "info@oepekamth.gr",
      region: "Μακεδονία & Θράκη"
    },
    {
      id: 17,
      name: "Ομοσπονδία Εμπορίου & Επιχειρηματικότητας Θράκης",
      president: "Αντώνης Φραντζής",
      address: "Λ. Δημοκρατίας 307 (Επιμελ. Έβρου – 4ος όροφος), Αλεξανδρούπολη, T.K. 681 00",
      phone: "25510 28880 & 27188",
      fax: "",
      email: "oeethrace@gmail.com",
      region: "Θράκη"
    }
  ];

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const isExpanded = (id) => expandedItems.has(id);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ομοσπονδίες ΕΣΕΕ</h2>
        <p className="text-gray-600">17 Ομοσπονδίες σε όλη την Ελλάδα</p>
      </div>

      <div className="space-y-3">
        {federations.map((federation) => (
          <div
            key={federation.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleExpanded(federation.id)}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {federation.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{federation.president}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{federation.region}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {isExpanded(federation.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>
            </button>

            {/* Content */}
            {isExpanded(federation.id) && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-lg mt-1">
                          <MapPin className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Διεύθυνση</h4>
                          <p className="text-sm text-gray-600">{federation.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg mt-1">
                          <Phone className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Τηλέφωνο</h4>
                          <p className="text-sm text-gray-600">{federation.phone}</p>
                          {federation.fax && (
                            <p className="text-sm text-gray-500 mt-1">
                              Fax: {federation.fax}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg mt-1">
                          <Mail className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                          <a
                            href={`mailto:${federation.email}`}
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            {federation.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg mt-1">
                          <User className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Πρόεδρος</h4>
                          <p className="text-sm text-gray-600">{federation.president}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {federation.region}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Ενεργή Ομοσπονδία
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Συνολικά 17 Ομοσπονδίες
        </h3>
        <p className="text-gray-600">
          Οι ομοσπονδίες της ΕΣΕΕ καλύπτουν όλη την Ελλάδα και αντιπροσωπεύουν 
          περισσότερες από 225.000 επιχειρήσεις.
        </p>
      </div>
    </div>
  );
};

export default FederationsAccordion;

