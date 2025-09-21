import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { 
  FileText, 
  Calendar, 
  ArrowRight, 
  Search, 
  Filter,
  Download,
  Eye,
  Clock,
  Tag,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { parseWordPressExport } from '../utils/rssParser';

const Circulars = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCircular, setExpandedCircular] = useState(null);
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCirculars = async () => {
      try {
        setLoading(true);
        setError(null);
        // Try JSON first (generated at build time), then XML
        const jsonUrl = '/wp/circulars.json';
        let items = [];
        try {
          const rj = await fetch(jsonUrl);
          if (rj.ok) {
            const jd = await rj.json();
            items = Array.isArray(jd.items) ? jd.items : [];
          }
        } catch {}

        if (!items.length) {
          const primary = '/wp/esee-export.xml';
          let res = await fetch(primary);
          if (!res.ok) {
            const encodedPath = '/OLD%20SITE/-amp.WordPress.2025-09-21.xml';
            res = await fetch(encodedPath);
          }
          const xmlText = await res.text();
          items = parseWordPressExport(xmlText);
        }

        setCirculars(items);
      } catch (err) {
        console.error('Failed to load circulars:', err);
        setError('Αποτυχία φόρτωσης εγκυκλίων');
      } finally {
        setLoading(false);
      }
    };
    loadCirculars();
  }, []);

  const categories = [
    { value: 'all', label: 'Όλες οι κατηγορίες' },
    { value: 'Εγκύκλιοι ΕΣΕΕ', label: 'Εγκύκλιοι ΕΣΕΕ' }
  ];

  const filteredCirculars = circulars.filter(circular => {
    const matchesSearch = circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circular.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || circular.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Υψηλή';
      case 'medium': return 'Μεσαία';
      case 'low': return 'Χαμηλή';
      default: return 'Κανονική';
    }
  };

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
              <FileText className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-lg font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                ΕΣΕΕ
              </span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              ΕΓΚΥΚΛΙΟΙ ΕΣΕΕ
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to purple-500 mx-auto mb-6 rounded-full"></div>
            
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Ενημερωτικά έγγραφα και κυκλώματα της Ελληνικής Συνομοσπονδίας Εμπορίου & Επιχειρηματικότητας
            </p>
          </div>

          {/* Search and Filter */}
          <div className={`rounded-2xl p-6 mb-8 ${
            isDark 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
              : 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg'
          }`}>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Αναζήτηση εγκυκλίων..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    isDark 
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`pl-10 pr-8 py-3 rounded-xl border appearance-none ${
                    isDark 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                } pointer-events-none`} />
              </div>
            </div>
          </div>

          {/* Loading / Error */}
          {loading && (
            <div className="mb-6">
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Φόρτωση εγκυκλίων…</p>
            </div>
          )}
          {error && (
            <div className="mb-6">
              <p className={`${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
            </div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Εμφανίζονται {filteredCirculars.length} από {circulars.length} εγκύκλια
            </p>
          </div>

          {/* Circulars List */}
          <div className="space-y-6">
            {filteredCirculars.map((circular) => (
              <div
                key={circular.id}
                className={`rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  isDark 
                    ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
                    : 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg'
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getPriorityColor(circular.priority)
                        }`}>
                          {getPriorityLabel(circular.priority)}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                        }`}>
                          <Tag className="w-3 h-3 mr-1" />
                          {circular.category}
                        </span>
                      </div>
                      
                      <h3 className={`text-xl font-bold mb-2 leading-tight ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {circular.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div className={`flex items-center gap-1 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          {new Date(circular.date).toLocaleDateString('el-GR')}
                        </div>
                        <div className={`flex items-center gap-1 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Clock className="w-4 h-4" />
                          {new Date(circular.date).toLocaleTimeString('el-GR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <p className={`leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {expandedCircular === circular.id ? circular.content : circular.excerpt}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExpandedCircular(
                          expandedCircular === circular.id ? null : circular.id
                        )}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                          isDark 
                            ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30' 
                            : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                        }`}
                      >
                        {expandedCircular === circular.id ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            Λιγότερα
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Περισσότερα
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {circular.attachments?.map((attachment, index) => (
                        <button
                          key={index}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                            isDark 
                              ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          Λήψη
                        </button>
                      ))}
                      <a
                        href={circular.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                          isDark 
                            ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                        Προβολή
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-gray-800/50 border border-gray-700/50' 
                : 'bg-white/80 border border-white/20 shadow-lg'
            }`}>
              <button className={`px-3 py-1 text-sm font-medium rounded ${
                isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                Προηγούμενο
              </button>
              <span className={`px-3 py-1 text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                1
              </span>
              <span className={`px-3 py-1 text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                2
              </span>
              <span className={`px-3 py-1 text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                ...
              </span>
              <span className={`px-3 py-1 text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                7
              </span>
              <button className={`px-3 py-1 text-sm font-medium rounded ${
                isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                Επόμενο
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isDark={isDark} />
    </main>
  );
};

export default Circulars;
