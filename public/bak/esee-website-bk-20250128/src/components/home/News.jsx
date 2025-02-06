const News = () => {
  const newsItems = [
    {
      id: 1,
      date: '28 Ιαν 2025',
      title: 'Νέα πρωτοβουλία για την ψηφιακή μετάβαση των επιχειρήσεων',
      excerpt: 'Η ΕΣΕΕ παρουσιάζει ένα νέο πρόγραμμα υποστήριξης για τον ψηφιακό μετασχηματισμό των μικρομεσαίων επιχειρήσεων.',
      category: 'Ανάπτυξη',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500'
    },
    {
      id: 2,
      date: '27 Ιαν 2025',
      title: 'Συνάντηση με εκπροσώπους της Ευρωπαϊκής Επιτροπής',
      excerpt: 'Συζήτηση για τις προκλήσεις και τις ευκαιρίες του ελληνικού εμπορίου στην ενιαία ευρωπαϊκή αγορά.',
      category: 'Διεθνή',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=500'
    },
    {
      id: 3,
      date: '26 Ιαν 2025',
      title: 'Έρευνα: Οι τάσεις στο λιανικό εμπόριο για το 2025',
      excerpt: 'Νέα έρευνα αποκαλύπτει τις αναδυόμενες τάσεις και προκλήσεις στον κλάδο του λιανικού εμπορίου.',
      category: 'Έρευνα',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=500'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          ΝΕΑ
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map(item => (
            <article 
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transform-gpu transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <time className="text-sm text-gray-500 mb-2 block">
                  {item.date}
                </time>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <button 
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  data-cursor="pointer"
                >
                  Περισσότερα →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
