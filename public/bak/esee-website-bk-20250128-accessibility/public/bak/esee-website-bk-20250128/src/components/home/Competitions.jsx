const Competitions = () => {
  const items = [
    {
      id: 1,
      type: 'competition',
      title: 'Βραβεία Καινοτομίας στο Λιανικό Εμπόριο 2025',
      deadline: '31 Μαρτίου 2025',
      description: 'Αναδείξτε την καινοτομία της επιχείρησής σας και διεκδικήστε σημαντικά βραβεία και αναγνώριση στον κλάδο.',
      categories: ['Ψηφιακή Καινοτομία', 'Εξυπηρέτηση Πελατών', 'Βιωσιμότητα'],
      status: 'active'
    },
    {
      id: 2,
      type: 'invitation',
      title: 'Πρόσκληση συμμετοχής στο Συνέδριο Ελληνικού Εμπορίου',
      deadline: '15 Φεβρουαρίου 2025',
      description: 'Το ετήσιο συνέδριο που φέρνει κοντά τους ηγέτες του ελληνικού εμπορίου για ανταλλαγή ιδεών και δικτύωση.',
      location: 'Μέγαρο Μουσικής Αθηνών',
      status: 'upcoming'
    },
    {
      id: 3,
      type: 'competition',
      title: 'Διαγωνισμός Νεανικής Επιχειρηματικότητας',
      deadline: '30 Απριλίου 2025',
      description: 'Υποστηρίζουμε τους νέους επιχειρηματίες με καινοτόμες ιδέες στον χώρο του εμπορίου.',
      categories: ['Startup', 'E-commerce', 'Πράσινη Ανάπτυξη'],
      status: 'active'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
          ΔΙΑΓΩΝΙΣΜΟΙ & ΠΡΟΣΚΛΗΣΕΙΣ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <div 
              key={item.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.status === 'active' ? 'Ενεργός' : 'Προσεχώς'}
                </span>
              </div>

              <div className="p-8">
                <div className="mb-4">
                  <span className={`text-sm font-medium ${
                    item.type === 'competition' 
                      ? 'text-purple-600'
                      : 'text-blue-600'
                  }`}>
                    {item.type === 'competition' ? 'Διαγωνισμός' : 'Πρόσκληση'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-6">
                  {item.description}
                </p>

                {item.categories && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.categories.map(category => (
                      <span 
                        key={category}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}

                {item.location && (
                  <div className="flex items-center text-gray-500 mb-6">
                    <svg 
                      className="w-5 h-5 mr-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{item.location}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Προθεσμία:</span> {item.deadline}
                  </div>
                  <button 
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    data-cursor="pointer"
                  >
                    Περισσότερα →
                  </button>
                </div>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Competitions;
