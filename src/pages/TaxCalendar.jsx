import { useState, useEffect } from 'react';
import { Calendar, Clock, ExternalLink, AlertCircle, CheckCircle, XCircle, RefreshCw, Filter } from 'lucide-react';
import { fetchRSSFeed } from '../utils/rssParser';
import Navigation from '../components/layout/Navigation';
import { useTheme } from '../context/ThemeContext';

const TaxCalendar = () => {
  const [taxEvents, setTaxEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedType, setSelectedType] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const { isDark } = useTheme();

  const months = [
    'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος',
    'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'
  ];

  useEffect(() => {
    fetchTaxEvents();
  }, []);

  useEffect(() => {
    filterEventsByMonth();
  }, [taxEvents, selectedMonth, selectedYear, selectedType]);

  const fetchTaxEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from RSS feed first
      const rssUrl = 'https://www.taxheaven.gr/bibliothiki/soft/xml/soft_dat.xml';
      let events = await fetchRSSFeed(rssUrl);
      
      // If RSS fetch fails or returns empty, set empty array
      if (events.length === 0) {
        events = [];
      }
      
      setTaxEvents(events);
    } catch (err) {
      setError('Σφάλμα κατά την φόρτωση των φορολογικών γεγονότων');
      console.error('Error fetching tax events:', err);
      setTaxEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshEvents = async () => {
    setRefreshing(true);
    await fetchTaxEvents();
    setRefreshing(false);
  };

  const filterEventsByMonth = () => {
    const filtered = taxEvents.filter(event => {
      const eventDate = new Date(event.date);
      const monthMatch = eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
      const typeMatch = selectedType === 'all' || event.type === selectedType;
      return monthMatch && typeMatch;
    });
    setFilteredEvents(filtered.sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'deadline':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'payment':
        return <XCircle className="w-5 h-5 text-orange-500" />;
      case 'application':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'form':
        return <Calendar className="w-5 h-5 text-green-500" />;
      case 'obligation':
        return <Clock className="w-5 h-5 text-purple-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'deadline':
        return 'border-l-red-500 bg-red-50';
      case 'payment':
        return 'border-l-orange-500 bg-orange-50';
      case 'application':
        return 'border-l-blue-500 bg-blue-50';
      case 'form':
        return 'border-l-green-500 bg-green-50';
      case 'obligation':
        return 'border-l-purple-500 bg-purple-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getEventTypeLabel = (type) => {
    switch (type) {
      case 'deadline':
        return 'Προθεσμία';
      case 'payment':
        return 'Πληρωμή';
      case 'application':
        return 'Αίτηση';
      case 'form':
        return 'Φόρμα';
      case 'obligation':
        return 'Υποχρέωση';
      default:
        return 'Γεγονός';
    }
  };

  const isEventOverdue = (eventDate) => {
    return new Date(eventDate) < new Date();
  };

  const isEventToday = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    return today.toDateString() === event.toDateString();
  };

  const isEventUpcoming = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση φορολογικού ημερολογίου...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-gray-800">
              Φορολογικό Ημερολόγιο
            </h1>
            <button
              onClick={refreshEvents}
              disabled={refreshing}
              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50"
              title="Ανανέωση δεδομένων"
            >
              <RefreshCw className={`w-6 h-6 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ενημερωθείτε για όλες τις φορολογικές υποχρεώσεις και προθεσμίες
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Μήνας:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Έτος:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={2025}>2025</option>
                <option value={2024}>2024</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Τύπος:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Όλα</option>
                <option value="deadline">Προθεσμίες</option>
                <option value="payment">Πληρωμές</option>
                <option value="application">Αιτήσεις</option>
                <option value="form">Φόρμες</option>
                <option value="obligation">Υποχρεώσεις</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{filteredEvents.length}</div>
            <div className="text-sm text-gray-600">Συνολικά Γεγονότα</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {filteredEvents.filter(e => isEventOverdue(e.date)).length}
            </div>
            <div className="text-sm text-gray-600">Εκπρόθεσμα</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredEvents.filter(e => isEventToday(e.date)).length}
            </div>
            <div className="text-sm text-gray-600">Σήμερα</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {filteredEvents.filter(e => isEventUpcoming(e.date)).length}
            </div>
            <div className="text-sm text-gray-600">Προσεχώς</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredEvents.filter(e => !isEventOverdue(e.date) && !isEventToday(e.date) && !isEventUpcoming(e.date)).length}
            </div>
            <div className="text-sm text-gray-600">Μελλοντικά</div>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Δεν υπάρχουν φορολογικά γεγονότα για τον επιλεγμένο μήνα</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className={`bg-white rounded-lg shadow-md border-l-4 ${getEventTypeColor(event.type)} ${
                  isEventOverdue(event.date) ? 'ring-2 ring-red-200' : ''
                } ${isEventToday(event.date) ? 'ring-2 ring-yellow-200' : ''} ${
                  isEventUpcoming(event.date) ? 'ring-2 ring-blue-200' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {getEventTypeLabel(event.type)}
                          </span>
                          {isEventOverdue(event.date) && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Εκπρόθεσμο
                            </span>
                          )}
                          {isEventToday(event.date) && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Σήμερα
                            </span>
                          )}
                          {isEventUpcoming(event.date) && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Προσεχώς
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {event.date.toLocaleDateString('el-GR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Λεπτομέρειες
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Τα δεδομένα προέρχονται από το φορολογικό ημερολόγιο του Taxheaven
            </p>
            <a
              href="https://www.taxheaven.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Επισκεφτείτε το Taxheaven.gr για περισσότερες πληροφορίες
            </a>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default TaxCalendar;
