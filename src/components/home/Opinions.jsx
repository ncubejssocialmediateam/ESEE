const Opinions = () => {
  const opinions = [
    {
      id: 1,
      author: 'Γιώργος Καρανίκας',
      position: 'Πρόεδρος ΕΣΕΕ',
      title: 'Η σημασία της βιώσιμης ανάπτυξης στο σύγχρονο εμπόριο',
      excerpt: 'Σε έναν κόσμο που αλλάζει ραγδαία, η βιώσιμη ανάπτυξη δεν είναι απλώς μια επιλογή, αλλά αναγκαιότητα για την επιβίωση και ανάπτυξη των επιχειρήσεων.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500',
      readTime: '5 λεπτά'
    },
    {
      id: 2,
      author: 'Μαρία Αντωνίου',
      position: 'Οικονομική Αναλύτρια',
      title: 'Ψηφιακός μετασχηματισμός: Προκλήσεις και ευκαιρίες',
      excerpt: 'Ο ψηφιακός μετασχηματισμός αποτελεί μονόδρομο για τις σύγχρονες επιχειρήσεις. Πώς μπορούν να προσαρμοστούν στη νέα ψηφιακή εποχή;',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500',
      readTime: '4 λεπτά'
    },
    {
      id: 3,
      author: 'Νίκος Παπαδόπουλος',
      position: 'Σύμβουλος Επιχειρήσεων',
      title: 'Το μέλλον του λιανικού εμπορίου',
      excerpt: 'Οι νέες τεχνολογίες και οι αλλαγές στην καταναλωτική συμπεριφορά διαμορφώνουν το μέλλον του λιανικού εμπορίου. Ποιες είναι οι τάσεις που θα επικρατήσουν;',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=500',
      readTime: '6 λεπτά'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
          ΑΠΟΨΕΙΣ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {opinions.map(opinion => (
            <article 
              key={opinion.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group h-[600px] flex flex-col"
            >
              <div className="h-[250px] overflow-hidden">
                <img 
                  src={opinion.image} 
                  alt={opinion.author}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{opinion.author}</h3>
                    <p className="text-sm text-gray-500">{opinion.position}</p>
                  </div>
                  <span className="text-sm text-gray-400">{opinion.readTime}</span>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {opinion.title}
                </h4>

                <p className="text-gray-600 mb-4 flex-1">
                  {opinion.excerpt}
                </p>

                <button 
                  className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors mt-auto"
                  data-cursor="pointer"
                >
                  <span>Διαβάστε περισσότερα</span>
                  <svg 
                    className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Opinions;
