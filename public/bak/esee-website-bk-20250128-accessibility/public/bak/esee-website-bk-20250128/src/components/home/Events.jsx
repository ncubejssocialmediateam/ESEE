const Events = () => {
  const events = [
    {
      id: 1,
      date: '15 Φεβρουαρίου 2025',
      time: '10:00',
      title: 'Συνέδριο Ψηφιακού Μετασχηματισμού',
      location: 'Ζάππειο Μέγαρο',
      type: 'conference',
      description: 'Ετήσιο συνέδριο για τις τελευταίες εξελίξεις στον ψηφιακό μετασχηματισμό του εμπορίου.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=500'
    },
    {
      id: 2,
      date: '20 Μαρτίου 2025',
      time: '18:30',
      title: 'Workshop: Βιώσιμη Ανάπτυξη στο Λιανεμπόριο',
      location: 'ΕΣΕΕ Hub',
      type: 'workshop',
      description: 'Πρακτικό εργαστήριο για την εφαρμογή βιώσιμων πρακτικών στο λιανικό εμπόριο.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500'
    },
    {
      id: 3,
      date: '5 Απριλίου 2025',
      time: '11:00',
      title: 'Forum Νεανικής Επιχειρηματικότητας',
      location: 'Τεχνόπολη Δήμου Αθηναίων',
      type: 'forum',
      description: 'Διάλογος και δικτύωση για νέους επιχειρηματίες στον χώρο του εμπορίου.',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=500'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
          ΕΚΔΗΛΩΣΕΙΣ
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 w-0.5 h-full bg-blue-200 transform -translate-x-1/2" />

          <div className="relative">
            {events.map((event, index) => (
              <div 
                key={event.id}
                className={`flex items-center mb-16 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Event card */}
                <div className={`relative w-5/12 group ${
                  index % 2 === 0 ? 'pr-12' : 'pl-12'
                }`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{event.date}</span>
                          <span className="text-sm">•</span>
                          <span className="text-sm">{event.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          event.type === 'conference' 
                            ? 'bg-purple-100 text-purple-700'
                            : event.type === 'workshop'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {event.type === 'conference' 
                            ? 'Συνέδριο'
                            : event.type === 'workshop'
                            ? 'Workshop'
                            : 'Forum'
                          }
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 mb-4">
                        {event.description}
                      </p>

                      <div className="flex items-center text-gray-500 mb-4">
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
                        <span>{event.location}</span>
                      </div>

                      <button 
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                        data-cursor="pointer"
                      >
                        Εγγραφή →
                      </button>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className={`absolute top-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow ${
                    index % 2 === 0 ? 'right-0 transform translate-x-1/2' : 'left-0 transform -translate-x-1/2'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
