import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Download, Filter, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

const ResearchHub = ({ isDark }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeView, setActiveView] = useState('latest');

  const mockData = Array.from({ length: 12 }, (_, i) => ({
    month: `2024/${String(i + 1).padStart(2, '0')}`,
    retail: Math.random() * 100 + 50,
    ecommerce: Math.random() * 100 + 70,
    exports: Math.random() * 100 + 60,
  }));

  return (
    <div className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Header Section */}
      <div className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Το Εμπόριο σε Αριθμούς</h1>
          <p className={`text-xl max-w-3xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Εμπεριστατωμένες αναλύσεις και έρευνες για την πορεία του ελληνικού εμπορίου
            και τις τάσεις της αγοράς.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
              <h3 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Κατηγορίες Έρευνας</h3>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'Όλες οι Έρευνες' },
                  { id: 'market', label: 'Ανάλυση Αγοράς' },
                  { id: 'trends', label: 'Τάσεις & Προβλέψεις' },
                  { id: 'sectoral', label: 'Κλαδικές Μελέτες' },
                  { id: 'special', label: 'Ειδικές Εκθέσεις' }
                ].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeCategory === category.id 
                        ? `${isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-50 text-blue-600'}`
                        : `hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'} ${isDark ? 'text-gray-300' : ''}`
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={`mt-6 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
              <h3 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Φίλτρα</h3>
              <div className="space-y-4">
                <div>
                  <label className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Χρονική Περίοδος</label>
                  <select className={`mt-1 w-full p-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
                    <option>Τελευταίοι 12 μήνες</option>
                    <option>Τελευταίοι 6 μήνες</option>
                    <option>Τελευταίοι 3 μήνες</option>
                  </select>
                </div>
                <div>
                  <label className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Τύπος Έρευνας</label>
                  <select className={`mt-1 w-full p-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
                    <option>Όλοι οι τύποι</option>
                    <option>Ποσοτική</option>
                    <option>Ποιοτική</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            {/* Market Overview Chart */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 mb-8`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Επισκόπηση Αγοράς</h2>
                <div className="flex space-x-2">
                  <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}>
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="retail" stroke="#2563eb" name="Λιανεμπόριο" />
                    <Line type="monotone" dataKey="ecommerce" stroke="#16a34a" name="E-commerce" />
                    <Line type="monotone" dataKey="exports" stroke="#9333ea" name="Εξαγωγές" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Latest Reports */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Πρόσφατες Εκθέσεις</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveView('latest')}
                    className={`px-4 py-2 rounded-lg ${
                      activeView === 'latest' 
                        ? `${isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-50 text-blue-600'}`
                        : `hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'} ${isDark ? 'text-gray-300' : ''}`
                    }`}
                  >
                    Πρόσφατες
                  </button>
                  <button
                    onClick={() => setActiveView('trending')}
                    className={`px-4 py-2 rounded-lg ${
                      activeView === 'trending' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    Δημοφιλείς
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className={`flex items-center p-4 border rounded-lg transition-colors cursor-pointer ${
                      isDark 
                        ? 'border-gray-700 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-3 rounded-lg mr-4 ${isDark ? 'bg-blue-900/50' : 'bg-blue-50'}`}>
                      <FileText className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Τριμηνιαία Έκθεση Λιανεμπορίου Q4 2024
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Ανάλυση τάσεων και προβλέψεις για το ελληνικό λιανεμπόριο
                      </p>
                    </div>
                    <div className={`flex items-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      <Download className="w-5 h-5 mr-2" />
                      <span className="text-sm">2.4MB</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                  Δείτε όλες τις εκθέσεις
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t mt-12`}>
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>350+</div>
              <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Ετήσιες Έρευνες</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>50K+</div>
              <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Λήψεις Εκθέσεων</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>85%</div>
              <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Ικανοποίηση Χρηστών</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ResearchHub.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default ResearchHub;
