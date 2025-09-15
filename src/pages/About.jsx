import { Building2, Users, Target, Award, TrendingUp, Globe, Heart, ArrowRight, CheckCircle, Star, Shield, Lightbulb } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-800/90"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-300/20 rounded-full blur-lg animate-pulse delay-500"></div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8 animate-bounce">
              <Building2 className="w-10 h-10" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent leading-tight">
              Η ΕΣΕΕ
              <br />
              <span className="text-5xl md:text-6xl">ΜΕ ΜΙΑ ΜΑΤΙΑ</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-8">
              Η Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας αποτελεί την υπεύθυνη «φωνή» του ελληνικού εμπορίου και της μικρομεσαίας επιχειρηματικότητας
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Αξιόπιστοι</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Σε ανάπτυξη</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">Διεθνείς</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-4xl font-black text-gray-800 mb-2">17</h3>
            <p className="text-gray-600 font-semibold">Ομοσπονδίες</p>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-4xl font-black text-gray-800 mb-2">340</h3>
            <p className="text-gray-600 font-semibold">Εμπορικοί Σύλλογοι</p>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-4xl font-black text-gray-800 mb-2">5</h3>
            <p className="text-gray-600 font-semibold">Σύνδεσμοι Αντιπροσώπων</p>
          </div>
        </div>

        {/* About Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Who We Are Card */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Ποιοι Είμαστε</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Η Ελληνική Συνομοσπονδία Εμπορίου και Επιχειρηματικότητας (ΕΣΕΕ) είναι η τριτοβάθμια οργάνωση του ελληνικού εμπορίου. Εκπροσωπεί τον εμπορικό κόσμο και τη μικρομεσαία επιχειρηματικότητα σε εθνικό και σε διεθνές επίπεδο.
              </p>
            </div>
          </div>

          {/* Our Role Card */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Ο Ρόλος μας</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <span>Συμμετέχει ως ισότιμος κοινωνικός εταίρος στην υπογραφή της Εθνικής Γενικής Συλλογικής Σύμβασης Εργασίας</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <span>Αναδεικνύει τον κοινωνικό ρόλο των επιχειρήσεων</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <span>Εργάζεται για την ανάδειξη του εμπορίου ως ατμομηχανή της οικονομικής ανάπτυξης</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <span>Προωθεί την ανταγωνιστικότητα και την οικονομική πρόοδο</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Our History Card */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden lg:col-span-2">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Η Ιστορία μας</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-2xl font-bold text-purple-600 mb-3">Από το 1994</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Από το 1994, όταν και απέκτησε τη σημερινή της μορφή, η ΕΣΕΕ, πέρα και έξω από συντεχνιακές λογικές, δίχως κομματικές εξαρτήσεις, εκπροσωπεί θεσμικά και υπεύθυνα τον εμπορικό κλάδο και τη μικρομεσαία επιχειρηματικότητα.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">30+ Χρόνια</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Με περισσότερα από 30 χρόνια εμπειρίας, η ΕΣΕΕ έχει αναπτύξει ένα δυνατό δίκτυο σχέσεων και συνεργασιών που στηρίζει την ελληνική επιχειρηματικότητα.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-12 text-center text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-8">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent leading-tight">
              "ΣΤΗΡΙΖΟΥΜΕ ΤΟ ΕΜΠΟΡΙΟ & ΤΗΝ ΕΠΙΧΕΙΡΗΜΑΤΙΚΟΤΗΤΑ.
              <br />
              <span className="text-3xl md:text-4xl">ΔΥΝΑΜΩΝΟΥΜΕ ΤΗΝ ΕΛΛΑΔΑ ΜΑΖΙ."</span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Η ΕΣΕΕ στηρίζει -στην πράξη- τις επιχειρήσεις, βοηθώντας τις να εκσυγχρονιστούν και να αναπτυχθούν μέσα από την καινοτομία και την εξωστρέφεια.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Γίνετε Μέλος
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Επικοινωνήστε μαζί μας
              </button>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              Οι Αξίες μας
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Οι αρχές που μας καθοδηγούν και μας κάνουν να διαφέρουμε
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Αξιοπιστία</h3>
              <p className="text-gray-600 leading-relaxed">
                Εκπροσωπούμε με ευθύνη και διαφάνεια τον εμπορικό κόσμο
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Καινοτομία</h3>
              <p className="text-gray-600 leading-relaxed">
                Προωθούμε τη σύγχρονη τεχνολογία και τις νέες ιδέες
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Συνεργασία</h3>
              <p className="text-gray-600 leading-relaxed">
                Δημιουργούμε δυναμικές συνεργασίες για κοινό όφελος
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ανάπτυξη</h3>
              <p className="text-gray-600 leading-relaxed">
                Στηρίζουμε την οικονομική πρόοδο και την ευημερία
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
