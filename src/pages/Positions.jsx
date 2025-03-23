import { useState } from 'react';

const Positions = () => {
  const [activeSection, setActiveSection] = useState('development');

  const sections = [
    {
      id: 'development',
      title: 'ΑΝΑΠΤΥΞΗ',
      content: 'Στηρίζουμε την ανάπτυξη του εμπορίου με καινοτόμες προτάσεις και δράσεις που ενισχύουν την επιχειρηματικότητα και προωθούν τον ψηφιακό μετασχηματισμό.'
    },
    {
      id: 'insurance-employment',
      title: 'ΑΣΦΑΛΙΣΤΙΚΑ - ΕΡΓΑΣΙΑΚΑ/ΑΠΑΣΧΟΛΗΣΗ',
      content: 'Προωθούμε πολιτικές που διασφαλίζουν τα δικαιώματα των εργαζομένων και των επιχειρήσεων, με έμφαση στη βιωσιμότητα του ασφαλιστικού συστήματος.'
    },
    {
      id: 'taxation',
      title: 'ΦΟΡΟΛΟΓΙΚΑ',
      content: 'Υποστηρίζουμε ένα δίκαιο και απλοποιημένο φορολογικό σύστημα που ενθαρρύνει την επιχειρηματική δραστηριότητα και την οικονομική ανάπτυξη.'
    },
    {
      id: 'operating-costs',
      title: 'ΚΟΣΤΟΣ ΛΕΙΤΟΥΡΓΙΑΣ',
      content: 'Εργαζόμαστε για τη μείωση του λειτουργικού κόστους των επιχειρήσεων μέσω στοχευμένων παρεμβάσεων και προτάσεων.'
    },
    {
      id: 'commercial',
      title: 'ΕΜΠΟΡΙΚΑ ΘΕΜΑΤΑ',
      content: 'Αναδεικνύουμε και προωθούμε λύσεις για τα σημαντικά ζητήματα που απασχολούν τον εμπορικό κόσμο.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            ΟΙ ΘΕΣΕΙΣ ΜΑΣ
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Διαμορφώνουμε το μέλλον του ελληνικού εμπορίου με συγκεκριμένες θέσεις και προτάσεις
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-900 font-medium'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`space-y-6 transition-all duration-300 ${
                  activeSection === section.id ? 'block' : 'hidden'
                }`}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {section.title}
                </h2>
                
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {section.content}
                  </p>
                  
                  {/* Example Points */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">
                        Συνεχής διάλογος με τους αρμόδιους φορείς
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">
                        Τεκμηριωμένες προτάσεις βασισμένες σε έρευνα και δεδομένα
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">
                        Στενή συνεργασία με τα μέλη μας για την καταγραφή των αναγκών
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8">
                  <a
                    href="#contact"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    Μάθετε περισσότερα
                    <svg
                      className="ml-2 -mr-1 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Positions;
