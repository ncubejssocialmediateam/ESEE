import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { Building, Users, MapPin, Award } from 'lucide-react';

const Members = () => {
  const { isDark } = useTheme();

  const memberStats = [
    { icon: <Building className="w-8 h-8" />, number: "17", label: "Ομοσπονδίες", description: "Σε όλη την Ελλάδα" },
    { icon: <Users className="w-8 h-8" />, number: "354", label: "Εμπορικοί Σύλλογοι", description: "Τοπικοί και κλαδικοί" },
    { icon: <Award className="w-8 h-8" />, number: "11", label: "Σύνδεσμοι", description: "Ειδικών ενδιαφερόντων" },
    { icon: <MapPin className="w-8 h-8" />, number: "54", label: "Νομοί", description: "Κάλυψη σε όλη τη χώρα" }
  ];

  const federations = [
    {
      id: 1,
      name: "Ομοσπονδία Εμπορικών Συλλόγων Κρήτης",
      president: "Εμμανουήλ Κουμαντάκης",
      address: "Μιχελιδάκη & Βουρβάχων 11, Ηράκλειο Κρήτης, T.K. 712 02",
      phone: "2810 220450",
      email: "cretantrade_oesk@otenet.gr",
      region: "Κρήτη"
    },
    {
      id: 2,
      name: "Ομοσπονδία Εμπορίου & Επιχειρηματικότητας Ηλείας",
      president: "Νικόλαος Καρυώτης",
      address: "Πατρών 12-14, Πύργος, T.K. 271 00",
      phone: "26230 35726",
      email: "oesh1992@gmail.com",
      region: "Ηλεία"
    },
    {
      id: 3,
      name: "Πελοποννησιακή Ομοσπονδία Εμπορίου και Επιχειρηματικότητας",
      president: "Βασίλειος Παγώνης",
      address: "Σπετσεροπούλου 9-11, Τρίπολη, T.K. 221 00",
      phone: "694 888 9720",
      email: "poee2018@gmail.com",
      region: "Πελοπόννησος"
    },
    {
      id: 4,
      name: "Ομοσπονδία Εμπορίου και Επιχειρηματικότητας Πελοποννήσου, Νοτιοδυτικής Ελλάδος, Ζακύνθου, Κεφαλληνίας και Ιθάκης",
      president: "Γεώργιος Βαγενάς",
      address: "Κανακάρη 46 - 52, Πάτρα, T.K. 262 21",
      phone: "2610 276053",
      email: "oesp.nde@gmail.com",
      region: "Πελοπόννησος"
    },
    {
      id: 5,
      name: "Ομοσπονδία Εμπορικών Συλλόγων Βορειοδυτικής Ελλάδας & Νήσων",
      president: "Ανδρέας Καραμάνης",
      address: "Βλαχοπούλου 8, Αγρίνιο, T.K. 301 32",
      phone: "26410 57390",
      email: "omospondiaesbden@gmail.com",
      region: "Βορειοδυτική Ελλάδα"
    },
    {
      id: 6,
      name: "Ιόνιος Ομοσπονδία Εμπορίου και Επιχειρηματικότητας",
      president: "Κωνσταντίνος Μουζακίτης",
      address: "Αριστοτέλους 2, Κέρκυρα, T.K. 491 00",
      phone: "26610 45677",
      email: "info@escorfu.gr",
      region: "Ιόνια Νησιά"
    },
    {
      id: 7,
      name: "Ομοσπονδία Εμπορικών Συλλόγων Αττικής, Ομόρων Νομών & Νήσων Αιγαίου",
      president: "Παύλος Πολιτάκης",
      address: "Γ. Κασιμάτη 1, Πειραιάς, T.K. 185 31",
      phone: "210 4227662",
      email: "oesapir@otenet.gr",
      region: "Αττική"
    },
    {
      id: 8,
      name: "Ομοσπονδία Συνδέσμων Ανεξάρτητων Εμπορικών Αντιπροσώπων, Εισαγωγής, Εξαγωγής & Διανομέων",
      president: "Άλκης Ηλιάδης",
      address: "Βουλής 15, Αθήνα, T.K. 105 63",
      phone: "210 3311871",
      email: "osaea@otenet.gr",
      region: "Αττική"
    },
    {
      id: 9,
      name: "Ομοσπονδία Συλλόγων Οπτικών & Οπτομετρών Ελλάδας (ΟΣΟΟΕ)",
      president: "Θωμάγγελος Μιχαλάκης",
      address: "Ηρ. Πολυτεχνείου 3, Ρόδος, T.K. 851 00",
      phone: "22410 31818",
      email: "osooe.gr@gmail.com",
      region: "Δωδεκάνησα"
    },
    {
      id: 10,
      name: "Ομοσπονδία Εμπορίου & Επιχειρηματικότητας Θεσσαλίας",
      president: "Χρήστος Μπλουγούρας",
      address: "Σωκράτους 18, Τρίκαλα, T.K. 421 00",
      phone: "24310 30786",
      email: "oesthessaly@yahoo.gr",
      region: "Θεσσαλία"
    },
    {
      id: 11,
      name: "Ομοσπονδία Εμπορίου & Επιχειρηματικότητας, Ανατολικής Στερεάς Ελλάδας",
      president: "Δημήτρης Σαμαράς",
      address: "Κύπρου & Ανθήλης, Λαμία, T.K. 351 33",
      phone: "22310 52934",
      email: "omosp47@gmail.com",
      region: "Στερεά Ελλάδα"
    },
    {
      id: 12,
      name: "Ομοσπονδία Εμπορίου & Επιχειρηματικότητας Εύβοιας",
      president: "Παρασκευή Αγιοστρατίτη",
      address: "Ελ. Βενιζέλου 12, 3ος όροφος, Χαλκίδα, T.K. 341 00",
      phone: "22210 22111",
      email: "info@oesevias.gr",
      region: "Εύβοια"
    },
    {
      id: 13,
      name: "Ομοσπονδία Εμπορίου & Επιχειρηματικότητας Δωδεκανήσου",
      president: "Αντώνιος Γιαννούλης",
      address: "Εργάνης Αθηνάς & Στέλιου Κωτιάδη 6, Ρόδος, T.K. 851 00",
      phone: "22410 70280",
      email: "rodos@kaele.gr",
      region: "Δωδεκάνησα"
    },
    {
      id: 14,
      name: "Ελληνική Ομοσπονδία Γούνας",
      president: "Απόστολος Τσούκας",
      address: "Λεωφόρος Γουναράδων Χλόη (Τ.Θ. 1002), Καστοριά, T.K. 521 00",
      phone: "24670 22171",
      email: "helfurfe@otenet.gr",
      region: "Δυτική Μακεδονία"
    },
    {
      id: 15,
      name: "Ομοσπονδία Εμπορικών Συλλόγων Δυτικής & Κεντρικής Μακεδονίας",
      president: "Νεκτάριος Ελμαλόγλου",
      address: "Παπάγου 43, Βέροια, T.K. 591 32",
      phone: "23310 63707",
      email: "oesdkmak@gmail.com",
      region: "Μακεδονία"
    },
    {
      id: 16,
      name: "Ομοσπονδία Εμπορίου, Παραγωγικότητας και Επιχειρηματικότητας Κεντρικής – Ανατολικής Μακεδονίας & Θράκης",
      president: "Φανή Μπλιούμη",
      address: "Ολυμπίου Διαμαντή 16, Θεσσαλονίκη, T.K. 546 25",
      phone: "6980784917",
      email: "info@oepekamth.gr",
      region: "Μακεδονία & Θράκη"
    },
    {
      id: 17,
      name: "Ομοσπονδία Εμπορίου & Επιχειρηματικότητας Θράκης",
      president: "Αντώνης Φραντζής",
      address: "Λ. Δημοκρατίας 307 (Επιμελ. Έβρου – 4ος όροφος), Αλεξανδρούπολη, T.K. 681 00",
      phone: "25510 28880 & 27188",
      email: "oeethrace@gmail.com",
      region: "Θράκη"
    }
  ];

  const benefits = [
    {
      title: "Νομική Υποστήριξη",
      description: "Συμβουλευτική και υποστήριξη σε νομικά θέματα"
    },
    {
      title: "Εκπαίδευση & Ενημέρωση",
      description: "Σεμινάρια, ημερίδες και ενημερωτικά προγράμματα"
    },
    {
      title: "Δικτύωση",
      description: "Συνάντηση με άλλους επιχειρηματίες και συνεργάτες"
    },
    {
      title: "Εκπροσώπηση",
      description: "Υπεράσπιση των συμφερόντων σας σε θεσμικό επίπεδο"
    },
    {
      title: "Προγράμματα & Χρηματοδότηση",
      description: "Πρόσβαση σε ευρωπαϊκά και εθνικά προγράμματα"
    },
    {
      title: "Έρευνες & Στατιστικά",
      description: "Πρόσβαση σε ειδικές έρευνες και στατιστικά στοιχεία"
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
              ΜΕΛΗ ΤΗΣ ΕΣΕΕ
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className={`text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              17 Ομοσπονδίες & 354 Εμπορικούς Συλλόγους και 11 Συνδέσμους σε όλη την Ελλάδα
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {memberStats.map((stat, index) => (
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
                <div className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.description}
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Οφέλη Συμμετοχής
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className={`${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } border rounded-xl p-8 hover:shadow-xl transition-all duration-300`}>
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {benefit.title}
                  </h3>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Federations Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Ομοσπονδίες Μέλη
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {federations.map((federation) => (
                <div key={federation.id} className={`p-6 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                } hover:shadow-lg transition-shadow duration-300`}>
                  <div className="mb-4">
                    <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {federation.name}
                    </h3>
                    <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      {federation.region}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-medium">Πρόεδρος:</span> {federation.president}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-medium">Διεύθυνση:</span> {federation.address}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-medium">Τηλέφωνο:</span> {federation.phone}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-medium">Email:</span> 
                      <a href={`mailto:${federation.email}`} className={`ml-1 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                        {federation.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Join Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Πώς να γίνετε μέλος
              </h2>
              <div className={`space-y-6 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <p>Επικοινωνήστε με την τοπική σας Ομοσπονδία ή Εμπορικό Σύλλογο</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <p>Συμπληρώστε την αίτηση συμμετοχής με τα απαραίτητα έγγραφα</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <p>Αναμονή έγκρισης από το Διοικητικό Συμβούλιο</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <p>Πληρωμή ετήσιου συνδρομικού και ενεργοποίηση συμμετοχής</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Απαιτήσεις Συμμετοχής
              </h2>
              <div className={`space-y-4 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mr-4 mt-3 ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`}></div>
                  <p>Εμπορική επιχείρηση με έδρα στην Ελλάδα</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mr-4 mt-3 ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`}></div>
                  <p>Κανονική λειτουργία και πληρωμή φόρων</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mr-4 mt-3 ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`}></div>
                  <p>Συμμόρφωση με τις ηθικές αρχές του εμπορίου</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mr-4 mt-3 ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`}></div>
                  <p>Αποδοχή του καταστατικού της ΕΣΕΕ</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <Footer isDark={isDark} />
    </main>
  );
};

export default Members;
