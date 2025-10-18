import { useState } from 'react';
import { 
  Download, 
  Calendar, 
  Users, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowLeft,
  Building2,
  Award,
  Image as ImageIcon
} from 'lucide-react';
import Navigation from '../components/layout/Navigation';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const MicrositeKifisia = () => {
  const { isDark } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample data - in a real application, this would come from an API
  const micrositeData = {
    title: "Εμπορικός Σύλλογος Κηφισιάς",
    subtitle: "Μέλος της Ελληνικής Συνομοσπονδίας Εμπορίου & Επιχειρηματικότητας",
    logo: "/assets/microsites/kifisia/IMG-20250926-WA0003.jpg",
    description: "Ο Εμπορικός Σύλλογος Κηφισιάς 1992 με την παρουσία του, ως μέλος, της Συνομοσπονδίας, αναγνωρίζει έμπρακτα την αναγκαιότητα συμμετοχής σε συλλογικές προσπάθειες επίλυσης των προβλημάτων που λίγο ή πολύ αντιμετωπίζουν όλες οι επιχειρήσεις. Είμαστε εδώ για να εργαστούμε για ένα καλύτερο μέλλον αλλά κυρίως για να είμαστε χρήσιμοι για τα μέλη μας.",
    
    // President's Greeting
    presidentGreeting: {
      title: "Χαιρετισμός Προέδρου",
      content: "Αξιότιμα μέλη της Ελληνική Συνομοσπονδίας Εμπορίου και Επιχειρηματικότητας, Αγαπητοί Συνάδελφοι,\n\nΟ Εμπορικός Σύλλογος Κηφισιάς 1992 με την παρουσία του, ως μέλος, της Συνομοσπονδίας, αναγνωρίζει έμπρακτα την αναγκαιότητα συμμετοχής σε συλλογικές προσπάθειες επίλυσης των προβλημάτων που λίγο ή πολύ αντιμετωπίζουν όλες οι επιχειρήσεις.\n\nΈχω διαπιστώσει ότι η Συνομοσπονδία διαθέτει διοίκηση, επιστημονικό προσωπικό, γνώση, εργαλεία και θέληση ώστε θεσμικά και επιστημονικά τεκμηριωμένα να διεκδικήσει για τους εμπόρους την θέση που τους αναλογεί στην Ελληνική οικονομία.\n\nΕίμαστε εδώ για να εργαστούμε για ένα καλύτερο μέλλον αλλά κυρίως για να είμαστε χρήσιμοι για τα μέλη μας."
    },
    
    // Board of Directors - Real Data
    boardMembers: [
      { name: "ΑΝΤΩΝΙΟΣ ΒΑΡΣΟΣ", position: "Πρόεδρος", fatherName: "του Βασιλείου" },
      { name: "ΖΕΡΑΡ ΚΑΡΑΒΑΝΗΣ", position: "Α' Αντιπρόεδρος", fatherName: "του Δημητρίου" },
      { name: "ΧΡΟΝΟΠΟΥΛΟΥ ΕΛΕΝΗ", position: "Β' Αντιπρόεδρος", fatherName: "του Χρήστου" },
      { name: "ΠΑΠΑΔΗΜΗΤΡΙΟΥ ΒΑΛΙΑ (ΒΑΣΙΛΙΚΗ)", position: "Γενικός Γραμματέας", fatherName: "του Δημητρίου" },
      { name: "ΠΙΣΧΟΣ ΤΗΛΕΜΑΧΟΣ", position: "Ταμίας", fatherName: "του Βασιλείου" },
      { name: "ΜΑΡΑΓΚΟΣ ΓΕΩΡΓΙΟΣ", position: "Ειδικός Γραμματέας", fatherName: "του Ιωάννη" },
      { name: "ΜΠΟΖΙΟΣ ΚΩΝ/ΝΟΣ", position: "Έφορος", fatherName: "του Παναγιώτη" },
      { name: "ΓΙΑΝΝΕΤΟΣ ΠΑΝΑΓΙΩΤΗΣ", position: "Μέλος", fatherName: "του Δημητρίου" },
      { name: "ΔΑΡΑΤΣΙΑΝΟΣ ΙΩΑΝΝΗΣ", position: "Μέλος", fatherName: "του Χρήστου" },
      { name: "ΦΩΤΟΠΟΥΛΟΣ ΠΑΝΑΓΙΩΤΗΣ", position: "Μέλος", fatherName: "του Κων/νου" },
      { name: "ΚΑΡΑΜΙΧΑΛΗΣ ΣΥΝΟΔΙΝΟΣ", position: "Μέλος", fatherName: "του Αντωνίου" }
    ],

    // Contact Information
    contact: {
      address: "Κηφισιά, Αττική",
      phone: "+30 210 1234567",
      email: "info@kifisia-chamber.gr",
      website: "www.kifisia-chamber.gr"
    },

    // Recent Events
    recentEvents: [
      {
        title: "Παγκόσμια Ημέρα Ζώων - Άλσος Κηφισιάς",
        date: "4 Οκτωβρίου 2025",
        type: "Δελτίο Τύπου",
        description: "Το Σάββατο 04-10-2025 στο άλσος Κηφισιάς διεξήχθη εκδήλωση για την παγκόσμια ημέρα ζώων. Εκ μέρους του Εμπορικού Συλλόγου Κηφισιάς 1992 παρευρέθηκαν ο Πρόεδρος Αντώνης Βάρσος, η Β' Αντιπρόεδρος Ελένη Χρονοπούλου και το Μέλος Γιάννης Δαρατσιανός.",
        fullContent: "Βρεθήκαμε εκεί για να μεταδώσουμε το μήνυμα ότι η αγάπη και φροντίδα προς τα ζώα πρέπει να είναι όχι απλά μία σκέψη αλλά μία καθημερινή πράξη.\n\nΚατά τη διάρκεια της εκδήλωσης έγινε μία σύντομη ενημέρωση για τα εμπορικά τεκταινόμενα στην Κηφισιά προς τον Κυβερνητικό Εκπρόσωπο κ. Παύλο Μαρινάκη.\n\nΕπίσης με τον Περιφέρειαρχή κ. Νίκο Χαραδαλιά συζητήθηκαν θέματα που έχουν να κάνουν με τον σχεδιασμό των νέων έργων υποδομής στην περιοχή.\n\nΜε τον Δήμαρχο Κηφισιάς κ. Βασίλη Ξυπολυτά έγινε αναφορά στα πάγια αιτήματα του εμπορικού συλλόγου και και επιβεβαιώθηκε η κοινή γραμμή που έχει ο Δήμος και ο Σύλλογος μας για πράσινη ανάπτυξη, σεβασμό στο περιβάλλον και στα ζώα και ότι θα καταβληθεί κάθε δυνατή προσπάθεια ώστε ο Δήμος Κηφισιάς να παραμείνει κηπούπολη.",
        attendees: [
          "Πρόεδρος Αντώνης Βάρσος",
          "Β' Αντιπρόεδρος Ελένη Χρονοπούλου", 
          "Μέλος Γιάννης Δαρατσιανός"
        ],
        officials: [
          "Κυβερνητικός Εκπρόσωπος κ. Παύλος Μαρινάκης",
          "Περιφέρειαρχής κ. Νίκος Χαραδαλιάς",
          "Δήμαρχος Κηφισιάς κ. Βασίλης Ξυπολυτάς"
        ],
        images: [
          "/assets/microsites/kifisia/Αλσος 1.jpg",
          "/assets/microsites/kifisia/Αλσος 2.jpg"
        ]
      }
    ],

    // Documents
    documents: [
      {
        title: "Σύνθεση Διοικητικού Συμβουλίου",
        file: "/assets/microsites/kifisia/ΔΣ.docx",
        type: "docx",
        size: "2.1 MB"
      },
      {
        title: "Χαιρετισμός Προέδρου ΕΣΚ",
        file: "/assets/microsites/kifisia/Χαιρετισμος Προεδρου ΕΣΚ.docx",
        type: "docx",
        size: "1.8 MB"
      },
      {
        title: "Παρουσίαση ΚΑΕΛΕ",
        file: "/assets/microsites/kifisia/ΠΑΡΟΥΣΙΑΣΗ ΚΑΕΛΕ.docx",
        type: "docx",
        size: "3.2 MB"
      },
      {
        title: "Περιγραφή Φωτογραφιών",
        file: "/assets/microsites/kifisia/Περιγραφή Φωτογραφιών.docx",
        type: "docx",
        size: "1.5 MB"
      }
    ]
  };

  const handleDownload = (filePath, fileName) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      
      {/* Back to Portal Button */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/portal" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Επιστροφή στο Portal
          </Link>
        </div>
      </div>

      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Logo and Title Section */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="relative">
                  <div className="absolute -inset-4 bg-white bg-opacity-20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                    <img 
                      src={micrositeData.logo} 
                      alt={`${micrositeData.title} Logo`}
                      className="w-32 h-32 lg:w-40 lg:h-40 object-contain mx-auto lg:mx-0"
                      onError={(e) => {
                        e.target.src = '/assets/ESEE-LOGO.png';
                        e.target.alt = 'ESEE Logo';
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white border border-white border-opacity-30 mb-4">
                    <Building2 className="w-4 h-4 mr-2" />
                    Εμπορικός Σύλλογος
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {micrositeData.title}
                </h1>
                
                <p className="text-xl lg:text-2xl text-blue-100 mb-6 font-light">
                  {micrositeData.subtitle}
                </p>
                
                <p className="text-lg text-blue-50 leading-relaxed mb-8 max-w-3xl">
                  {micrositeData.description}
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                    <div className="text-2xl font-bold text-white">11</div>
                    <div className="text-sm text-blue-100">Μέλη ΔΣ</div>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                    <div className="text-2xl font-bold text-white">1</div>
                    <div className="text-sm text-blue-100">Εκδήλωση</div>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                    <div className="text-2xl font-bold text-white">4</div>
                    <div className="text-sm text-blue-100">Έγγραφα</div>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                    <div className="text-2xl font-bold text-white">2</div>
                    <div className="text-sm text-blue-100">Φωτογραφίες</div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                    <Users className="w-5 h-5 mr-2" />
                    Διοικητικό Συμβούλιο
                  </button>
                  <button className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    <FileText className="w-5 h-5 mr-2" />
                    Έγγραφα
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-12 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="currentColor" opacity="0.5"></path>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-10">

          {/* President's Greeting Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{micrositeData.presidentGreeting.title}</h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      ΑΝΤΩΝΙΟΣ ΒΑΡΣΟΣ
                    </h3>
                    <p className="text-gray-600 font-medium mb-4">
                      Πρόεδρος Εμπορικού Συλλόγου Κηφισιάς
                    </p>
                    <div className="prose prose-lg max-w-none">
                      {micrositeData.presidentGreeting.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Board of Directors Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Διοικητικό Συμβούλιο</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Το Διοικητικό Συμβούλιο του Εμπορικού Συλλόγου Κηφισιάς αποτελείται από 11 έμπειρους επαγγελματίες 
                που αφοσιώνονται στην προώθηση του εμπορίου και της επιχειρηματικότητας στην περιοχή.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {micrositeData.boardMembers.map((member, index) => (
                <div key={index} className="group relative">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      {member.fatherName}
                    </p>
                    <p className="text-gray-600 font-medium">
                      {member.position}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Ενεργό Μέλος
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Events Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Πρόσφατες Εκδηλώσεις</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Οι εκδηλώσεις του Εμπορικού Συλλόγου Κηφισιάς συμβάλλουν στην ενίσχυση του εμπορίου 
                και της επιχειρηματικότητας στην περιοχή.
              </p>
            </div>
            
            {micrositeData.recentEvents.map((event, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-4 text-green-600 font-medium">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          {event.type && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {event.type}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      {event.description}
                    </p>
                    
                    {/* Full Press Release Content */}
                    {event.fullContent && (
                      <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          Πλήρες Δελτίο Τύπου
                        </h4>
                        <div className="prose prose-sm max-w-none">
                          {event.fullContent.split('\n\n').map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-gray-700 leading-relaxed mb-3 last:mb-0">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Attendees Section */}
                    {event.attendees && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-600" />
                          Παρευρέθηκαν από τον Σύλλογο
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {event.attendees.map((attendee, aIndex) => (
                            <div key={aIndex} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="w-4 h-4 text-blue-600" />
                              </div>
                              <span className="text-gray-700 font-medium">{attendee}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Officials Section */}
                    {event.officials && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-purple-600" />
                          Συνάντηση με Αξιωματούχους
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {event.officials.map((official, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-purple-600" />
                              </div>
                              <span className="text-gray-700 font-medium">{official}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <Calendar className="w-4 h-4 mr-2" />
                        Εκδήλωση
                      </span>
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <MapPin className="w-4 h-4 mr-2" />
                        Άλσος Κηφισιάς
                      </span>
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        <Users className="w-4 h-4 mr-2" />
                        Παγκόσμια Ημέρα Ζώων
                      </span>
                    </div>
                  </div>
                  
                  {event.images && event.images.length > 0 && (
                    <div className="flex-shrink-0">
                      <div className="grid grid-cols-2 gap-4">
                        {event.images.map((image, imgIndex) => (
                          <div key={imgIndex} className="relative group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl shadow-lg">
                              <img 
                                src={image} 
                                alt={`${event.title} - Φωτογραφία ${imgIndex + 1}`}
                                className="w-40 h-40 object-cover hover:scale-105 transition-transform duration-300"
                                onClick={() => openImageModal(image)}
                                onError={(e) => {
                                  e.target.src = '/assets/ESEE-LOGO.png';
                                  e.target.alt = 'ESEE Logo';
                                }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-xl flex items-center justify-center">
                                <div className="bg-white bg-opacity-90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ImageIcon className="w-6 h-6 text-gray-800" />
                                </div>
                              </div>
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                              <span className="text-xs font-bold text-white">{imgIndex + 1}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-3 text-center">
                        Κάντε κλικ στις φωτογραφίες για μεγέθυνση
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Documents Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Έγγραφα & Πληροφορίες</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Πρόσβαση σε όλα τα σημαντικά έγγραφα και πληροφορίες του Εμπορικού Συλλόγου Κηφισιάς. 
                Κάντε λήψη των εγγράφων που σας ενδιαφέρουν.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {micrositeData.documents.map((doc, index) => (
                <div key={index} className="group relative">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                          {doc.title}
                        </h3>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="font-medium">{doc.type.toUpperCase()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="font-medium">{doc.size}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleDownload(doc.file, doc.title)}
                          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                        >
                          <Download className="w-5 h-5" />
                          Λήψη Εγγράφου
                        </button>
                      </div>
                    </div>
                    
                    {/* Status indicator */}
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Download All Button */}
            <div className="text-center mt-8">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                <Download className="w-5 h-5" />
                Λήψη Όλων των Εγγράφων
              </button>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Επικοινωνία</h2>
                <p className="text-blue-100 max-w-2xl mx-auto">
                  Επικοινωνήστε με τον Εμπορικό Σύλλογο Κηφισιάς για οποιαδήποτε πληροφορία ή υποστήριξη χρειάζεστε.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-opacity-30 transition-all duration-300">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Διεύθυνση</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{micrositeData.contact.address}</p>
                </div>
                
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-opacity-30 transition-all duration-300">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Τηλέφωνο</h3>
                  <p className="text-blue-100 text-sm">{micrositeData.contact.phone}</p>
                </div>
                
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-opacity-30 transition-all duration-300">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                  <p className="text-blue-100 text-sm">{micrositeData.contact.email}</p>
                </div>
                
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-opacity-30 transition-all duration-300">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Website</h3>
                  <p className="text-blue-100 text-sm">{micrositeData.contact.website}</p>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="text-center mt-12 pt-8 border-t border-white border-opacity-20">
                <h3 className="text-xl font-bold text-white mb-4">Επικοινωνήστε μαζί μας</h3>
                <p className="text-blue-100 mb-6">Θα χαρούμε να σας βοηθήσουμε με οποιαδήποτε ερώτηση έχετε</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                    <Phone className="w-5 h-5" />
                    Καλέστε μας
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    <Mail className="w-5 h-5" />
                    Στείλτε Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage} 
              alt="Event Photo" 
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default MicrositeKifisia;
