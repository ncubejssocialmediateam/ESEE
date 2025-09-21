import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Calculator, 
  CreditCard, 
  Briefcase, 
  FileText, 
  Shield, 
  MessageCircle, 
  Send, 
  User, 
  Mail, 
  Phone, 
  Building,
  CheckCircle,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import formsService from '../services/formsService';

const MemberSupport = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    commercialAssociation: '',
    email: '',
    fullName: '',
    phone: '',
    question: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categories = [
    {
      id: 'accounting',
      name: 'ΛΟΓΙΣΤΙΚΑ',
      icon: <Calculator className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'financial',
      name: 'ΧΡΗΜΑΤΟΟΙΚΟΝΟΜΙΑΚΑ',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'labor',
      name: 'ΕΡΓΑΣΙΑΚΑ',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 'pension',
      name: 'ΣΥΝΤΑΞΙΟΔΟΤΙΚΑ',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'insurance',
      name: 'ΑΣΦΑΛΙΣΤΙΚΑ',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500'
    }
  ];

  // Helper: normalize Greek text (lowercase, remove diacritics) for robust matching
  const normalize = (text) =>
    (text || '')
      .toLowerCase()
      .normalize('NFD')
      // Remove diacritics (combining marks)
      .replace(/[\u0300-\u036f]+/g, '')
      // Keep greek/latin letters, numbers and spaces
      .replace(/[^a-zA-Zα-ωΑ-Ω0-9\s]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  // Category synonyms to improve reasoning-based search
  const categorySynonyms = {
    accounting: ['λογιστικ', 'φπα', 'φορολ', 'βιβλια', 'δηλωσ', 'mydata'],
    financial: ['χρηματο', 'δανει', 'εσπα', 'επιδοτ', 'ταμειο', 'προγραμμα'],
    labor: ['εργασ', 'μισθ', 'υπερωρ', 'ωραριο', 'αδει', 'συμβασ'],
    pension: ['συνταξ', 'εφαπαξ', 'ασφαλιστικα ετη', 'ηλικια'],
    insurance: ['ασφαλ', 'εισφορ', 'εφκα', 'ταμειο υγειας']
  };

  const searchTokens = normalize(searchTerm).split(' ').filter(Boolean);

  const faqs = [
    // ΛΟΓΙΣΤΙΚΑ
    {
      id: 1,
      category: 'accounting',
      question: 'Πότε πρέπει να υποβάλω τη φορολογική δήλωση;',
      answer: 'Η φορολογική δήλωση υποβάλλεται ετησίως μέχρι τις 31 Ιουλίου για το προηγούμενο φορολογικό έτος. Για το 2024, η προθεσμία είναι 31 Ιουλίου 2025.'
    },
    {
      id: 2,
      category: 'accounting',
      question: 'Πώς υπολογίζεται ο ΦΠΑ για τις επιχειρήσεις;',
      answer: 'Ο ΦΠΑ υπολογίζεται με συντελεστές 24% (γενικός), 13% (μειωμένος), 6% (υπερμειωμένος) και 0% (μη επιβαρυνόμενος). Η επιλογή του συντελεστή εξαρτάται από τον τύπο των αγαθών ή υπηρεσιών.'
    },
    {
      id: 3,
      category: 'accounting',
      question: 'Τι είναι το μητρώο εσόδων-εξόδων;',
      answer: 'Το μητρώο εσόδων-εξόδων είναι η βασική λογιστική βιβλιογραφία για τις ατομικές επιχειρήσεις και τους ελεύθερους επαγγελματίες. Περιλαμβάνει όλες τις εισπράξεις και πληρωμές της επιχείρησης.'
    },
    // ΧΡΗΜΑΤΟΟΙΚΟΝΟΜΙΑΚΑ
    {
      id: 4,
      category: 'financial',
      question: 'Πώς μπορώ να λάβω επιχειρηματικό δάνειο;',
      answer: 'Τα επιχειρηματικά δάνεια παρέχονται από τράπεζες και ειδικούς φορείς. Χρειάζεστε επιχειρηματικό σχέδιο, οικονομικές καταστάσεις και εγγυήσεις. Η ΕΣΕΕ μπορεί να σας βοηθήσει με συμβουλευτική.'
    },
    {
      id: 5,
      category: 'financial',
      question: 'Τι είναι το ΕΣΠΑ και πώς μπορώ να συμμετάσχω;',
      answer: 'Το ΕΣΠΑ (Ευρωπαϊκό Στρατηγικό Πλαίσιο Αναφοράς) είναι το κύριο εργαλείο χρηματοδότησης της ΕΕ. Συμμετοχή μέσω προσκλήσεων που ανακοινώνονται από τους αρμόδιους φορείς.'
    },
    {
      id: 6,
      category: 'financial',
      question: 'Πώς υπολογίζονται οι επιδοτήσεις επιχειρήσεων;',
      answer: 'Οι επιδοτήσεις υπολογίζονται με βάση το μέγεθος της επιχείρησης, τον κλάδο δραστηριότητας, την επένδυση και τα κριτήρια του κάθε προγράμματος. Κάθε πρόγραμμα έχει διαφορετικούς συντελεστές.'
    },
    // ΕΡΓΑΣΙΑΚΑ
    {
      id: 7,
      category: 'labor',
      question: 'Ποιος είναι ο κατώτατος μισθός για το 2025;',
      answer: 'Ο κατώτατος μισθός για το 2025 είναι 880€ μικτά. Αυτό ισχύει για όλους τους εργαζόμενους ανεξάρτητα από την ηλικία ή την εμπειρία.'
    },
    {
      id: 8,
      category: 'labor',
      question: 'Πώς υπολογίζονται οι υπερωρίες;',
      answer: 'Οι υπερωρίες αμείβονται με επιπλέον 25% για τις πρώτες 2 ώρες και 50% για τις επόμενες. Σε περίπτωση εργασίας Κυριακής ή αργίας, η αμοιβή είναι 75% επιπλέον.'
    },
    {
      id: 9,
      category: 'labor',
      question: 'Τι είναι το εργασιακό ωράριο;',
      answer: 'Το κανονικό εργασιακό ωράριο είναι 8 ώρες ημερησίως και 40 ώρες εβδομαδιαίως. Μπορεί να υπάρχουν ειδικές ρυθμίσεις ανάλογα με τον κλάδο δραστηριότητας.'
    },
    // ΣΥΝΤΑΞΙΟΔΟΤΙΚΑ
    {
      id: 10,
      category: 'pension',
      question: 'Πότε μπορώ να συνταξιοδοτηθώ;',
      answer: 'Η συνταξιοδότηση εξαρτάται από την ηλικία και τα ασφαλιστικά έτη. Για τους γεννημένους μετά το 1960, η ηλικία συνταξιοδότησης είναι 67 ετών με τουλάχιστον 15 ασφαλιστικά έτη.'
    },
    {
      id: 11,
      category: 'pension',
      question: 'Πώς υπολογίζεται η σύνταξη;',
      answer: 'Η σύνταξη υπολογίζεται με βάση τα ασφαλιστικά έτη, τα ασφαλιστικά εισοδήματα και τον συντελεστή αναπλήρωσης. Κάθε έτος ασφάλισης δίνει 1,2% του μέσου ασφαλιστικού εισοδήματος.'
    },
    {
      id: 12,
      category: 'pension',
      question: 'Τι είναι το εφάπαξ;',
      answer: 'Το εφάπαξ είναι μια εφάπαξ πληρωμή που μπορεί να λάβει ο συνταξιούχος αντί για μηνιαία σύνταξη. Το ποσό εξαρτάται από τα ασφαλιστικά έτη και εισοδήματα.'
    },
    // ΑΣΦΑΛΙΣΤΙΚΑ
    {
      id: 13,
      category: 'insurance',
      question: 'Ποια είναι τα ασφαλιστικά ταμεία;',
      answer: 'Τα κύρια ασφαλιστικά ταμεία είναι το ΕΦΚΑ (Ενιαίο Ταμείο Κοινωνικής Ασφάλισης), το ΤΕΒΕ (Ταμείο Ενίσχυσης Βιοτεχνίας), και τα επαγγελματικά ταμεία ανά κλάδο.'
    },
    {
      id: 14,
      category: 'insurance',
      question: 'Πώς υπολογίζονται οι ασφαλιστικές εισφορές;',
      answer: 'Οι ασφαλιστικές εισφορές υπολογίζονται ως ποσοστό του μισθού. Για το 2025, οι εισφορές είναι περίπου 44% του μισθού (22% εργοδότης, 22% εργαζόμενος).'
    },
    {
      id: 15,
      category: 'insurance',
      question: 'Τι καλύπτει η ασφάλιση υγείας;',
      answer: 'Η ασφάλιση υγείας καλύπτει ιατρικές εξετάσεις, νοσηλεία, φάρμακα, χειρουργικές επεμβάσεις και άλλες υπηρεσίες υγείας. Υπάρχουν συμμετοχές και οριακά ποσά.'
    }
  ];

  const commercialAssociations = [
    'Εμπορικός Σύλλογος Αθηνών',
    'Εμπορικός Σύλλογος Θεσσαλονίκης',
    'Εμπορικός Σύλλογος Πειραιά',
    'Εμπορικός Σύλλογος Πατρών',
    'Εμπορικός Σύλλογος Ηρακλείου',
    'Εμπορικός Σύλλογος Λάρισας',
    'Εμπορικός Σύλλογος Βόλου',
    'Εμπορικός Σύλλογος Ιωαννίνων',
    'Εμπορικός Σύλλογος Καβάλας',
    'Εμπορικός Σύλλογος Χανίων',
    'Εμπορικός Σύλλογος Κομοτηνής',
    'Εμπορικός Σύλλογος Κέρκυρας',
    'Εμπορικός Σύλλογος Ρόδου',
    'Εμπορικός Σύλλογος Μυτιλήνης',
    'Εμπορικός Σύλλογος Χίου',
    'Άλλος Εμπορικός Σύλλογος'
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    if (!matchesCategory) return false;

    if (searchTokens.length === 0) return true;

    const q = normalize(faq.question);
    const a = normalize(faq.answer);
    const catObj = categories.find((c) => c.id === faq.category);
    const catName = normalize(catObj?.name || '');
    const synonyms = categorySynonyms[faq.category] || [];

    // token-based AND match across question, answer, category name, or synonyms
    return searchTokens.every((tok) => {
      if (q.includes(tok) || a.includes(tok) || catName.includes(tok)) return true;
      // match against synonyms
      return synonyms.some((syn) => normalize(syn).includes(tok) || tok.includes(normalize(syn)));
    });
  });

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await formsService.submitMemberSupport(formData);
      setSubmitStatus('success');
      setFormData({
        category: '',
        commercialAssociation: '',
        email: '',
        fullName: '',
        phone: '',
        question: ''
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (err) {
      setSubmitStatus(err.message || 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation isDark={true} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <MessageCircle className="w-6 h-6 text-blue-400" />
            <span className="text-blue-400 font-medium">Ομάδα Υποστήριξης</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            ΕΣΕΕ Helpdesk<br />
            ΟΜΑΔΑ ΥΠΟΣΤΗΡΙΞΗΣ ΜΕΛΩΝ
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto opacity-90">
            Βρείτε απαντήσεις στις πιο συχνές ερωτήσεις ή υποβάλετε τη δική σας ερώτηση. 
            Η ομάδα μας είναι εδώ για να σας βοηθήσει.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Αναζήτηση Ερωτήσεων</h2>
            <p className="text-white/70">Βρείτε γρήγορα την απάντηση που ψάχνετε</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Αναζήτηση ερωτήσεων, λέξεων-κλειδιών ή κατηγοριών..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="block w-full md:w-48 pl-4 pr-10 py-4 bg-white/10 border border-white/20 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all" className="bg-gray-800">Όλες οι κατηγορίες</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id} className="bg-gray-800">{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Κατηγορίες Υποστήριξης</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  selectedCategory === category.id 
                    ? 'bg-white/10 border-2 border-white/30' 
                    : 'bg-white/5 border border-white/10 hover:border-white/20'
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4">
                  {category.name}
                </h3>
                
                <p className="text-white/70 text-sm">
                  {faqs.filter(faq => faq.category === category.id).length} ερωτήσεις διαθέσιμες
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Συχνές Ερωτήσεις
            {selectedCategory !== 'all' && (
              <span className="block text-xl text-white/70 mt-2">
                {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
          </h2>

          {/* Results meta */}
          <div className="text-center text-white/60 mb-6">
            Εμφανίζονται {filteredFAQs.length} αποτελέσματα
            {searchTokens.length > 0 && (
              <span> για: "{searchTokens.join(' ')}"</span>
            )}
          </div>

          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/70 text-lg">
                  Δεν βρέθηκαν ερωτήσεις με τα κριτήρια αναζήτησης.
                </p>
              </div>
            ) : (
              filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <span className="font-medium text-lg pr-4">
                      {faq.question}
                    </span>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-white/70 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/70 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-4">
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-white/80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Υποβάλετε την Ερώτησή σας</h2>
            <p className="text-white/70">Δεν βρήκατε την απάντηση; Στείλτε μας την ερώτησή σας</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Κατηγορία *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
                >
                  <option value="" className="bg-gray-800">Επιλέξτε κατηγορία</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id} className="bg-gray-800">{category.name}</option>
                  ))}
                </select>
              </div>

              {/* Commercial Association */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Εμπορικός Σύλλογος *
                </label>
                <select
                  name="commercialAssociation"
                  value={formData.commercialAssociation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
                >
                  <option value="" className="bg-gray-800">Επιλέξτε σύλλογο</option>
                  {commercialAssociations.map(association => (
                    <option key={association} value={association} className="bg-gray-800">{association}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ονοματεπώνυμο *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50"
                    placeholder="Το πλήρες όνομά σας"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Τηλέφωνο *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50"
                    placeholder="210 1234567"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            {/* Question */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Η Ερώτησή σας *
              </label>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50 resize-none"
                placeholder="Περιγράψτε αναλυτικά την ερώτησή σας..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-white/20 text-white/50 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white/70 rounded-full animate-spin" />
                    Αποστολή...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Υποβολή Ερώτησης
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span>Η ερώτησή σας υποβλήθηκε επιτυχώς! Θα σας απαντήσουμε σύντομα.</span>
              </div>
            )}
          </form>
        </div>
      </section>
      
      <Footer isDark={true} />
    </main>
  );
};

export default MemberSupport;
