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
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
          ΑΠΟΨΕΙΣ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {opinions.map(opinion => (
            <article 
              key={opinion.id}
              className="group relative cursor-pointer"
            >
              <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-100 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-lg sm:-inset-x-6 sm:rounded-2xl" />
              
              <div className="relative z-10 p-2">
                <div className="aspect-w-16 aspect-h-9 mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={opinion.image} 
                    alt={opinion.author}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{opinion.author}</h3>
                    <p className="text-sm text-gray-500">{opinion.position}</p>
                  </div>
                  <span className="text-sm text-gray-400">{opinion.readTime}</span>
                </div>

                <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {opinion.title}
                </h4>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {opinion.excerpt}
                </p>

                <button 
                  className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors"
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

                <div className="h-px w-full bg-gradient-to-r from-zinc-200/0 via-zinc-200 to-zinc-200/0" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Opinions;
