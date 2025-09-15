import { Building2, Scale, Globe, Rocket, Users, Heart, ArrowRight, CheckCircle, TrendingUp, Shield, Lightbulb, Target } from 'lucide-react';

const Business = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Building2 className="w-8 h-8" />
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              ΕΠΙΧΕΙΡΗΣΕΙΣ
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Ενημερωμένη και στοχευμένη πληροφόρηση για την επιχειρηματικότητα
            </p>
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Σε συνεχή ανάπτυξη</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        {/* Business Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card: Business Formation */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Ίδρυση επιχειρήσεων
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Διανοητική Ιδιοκτησία</span>
                </li>
                <li className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Συναλλαγές με Πελάτες</span>
                </li>
                <li className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Εργασιακά/Πολιτικές</span>
                </li>
                <li className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Φορολογία</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  <span>Μάθετε περισσότερα</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Card: Legal Updates */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Νομοθετικές Ενημερώσεις
                </h3>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 border-l-4 border-emerald-500 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">ΦΕΚ Α' 71/07-04-2022</span>
                    <Shield className="w-4 h-4 text-emerald-500" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Νόμος 4919/2022</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Σύσταση εταιρειών μέσω των Υπηρεσιών Μιας Στάσης (Υ.Μ.Σ.) και τήρηση του Γενικού Εμπορικού Μητρώου (Γ.Ε.ΜΗ.)</p>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold mt-3 flex items-center group-hover:translate-x-1 transition-transform duration-300">
                    <span>Δείτε περισσότερα</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">ΦΕΚ Β' 4629/1-9-2022</span>
                    <Shield className="w-4 h-4 text-blue-500" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Υ.Α. 80016/2022</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Κώδικας Δεοντολογίας περί ανακοινώσεων μείωσης της τιμής (ιδίως σε προσφορές/εκπτώσεις)</p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-3 flex items-center group-hover:translate-x-1 transition-transform duration-300">
                    <span>Δείτε περισσότερα</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Digital Presence */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Προώθηση στο διαδίκτυο
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Ψηφιοποίηση Επιχείρησης</span>
                </li>
                <li className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Ιστότοπος / e-shop</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="flex items-center text-purple-600 hover:text-purple-700 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  <span>Μάθετε περισσότερα</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Card: Startups */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Νεοφυείς Επιχειρήσεις
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Ελληνικό Οικοσύστημα</span>
                </li>
                <li className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Εθνικό Μητρώο</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="flex items-center text-orange-600 hover:text-orange-700 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  <span>Μάθετε περισσότερα</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Card: Support Services */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Υποστήριξη & Εκπαίδευση
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Παροχή υπηρεσιών υποστήριξης, mentoring και καθοδήγησης για την ανάπτυξη της επιχείρησής σας.
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>Mentoring</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Target className="w-4 h-4 mr-2 text-green-500" />
                  <span>Στόχοι</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <button className="flex items-center text-teal-600 hover:text-teal-700 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  <span>Μάθετε περισσότερα</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Card: Women Entrepreneurship */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Γυναικεία Επιχειρηματικότητα
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ανάπτυξη του Γυναικείου Επιχειρείν και στήριξη της βιωσιμότητας της Ελληνικής Γυναικείας Επιχείρησης.
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2 text-pink-500" />
                  <span>Στήριξη</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                  <span>Ανάπτυξη</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <button className="flex items-center text-pink-600 hover:text-pink-700 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  <span>Μάθετε περισσότερα</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 mb-16">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Έτοιμοι να ξεκινήσετε;
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Ανακαλύψτε όλες τις υπηρεσίες και τα εργαλεία που χρειάζεστε για την επιχείρησή σας
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Εξερευνήστε Υπηρεσίες
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  Επικοινωνήστε μαζί μας
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
