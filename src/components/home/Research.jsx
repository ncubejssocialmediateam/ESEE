import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Download, Filter, ChevronRight, TrendingUp, Users, Building2, Euro } from 'lucide-react';
import PropTypes from 'prop-types';
 
import inemyDataService from '../../services/inemyDataService';

const ResearchHub = ({ isDark }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeView, setActiveView] = useState('latest');
  const [chartData, setChartData] = useState([]);
  const [summaryStats, setSummaryStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load CSV data on component mount
  useEffect(() => {
    loadCSVData();
  }, []);

  const loadCSVData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch CSV data from GitHub (raw content)
      const response = await fetch('https://raw.githubusercontent.com/ncubejssocialmediateam/ESEE/main/src/assets/%CE%99%CE%9D%CE%95%CE%9C%CE%A5_%CE%95%CE%BC%CF%80%CF%8C%CF%81%CE%B9%CE%BF_%CE%94%CE%B5%CE%B4%CE%BF%CE%BC%CE%AD%CE%BD%CE%B1_2%20(1).csv');
      const csvContent = await response.text();
      
      // Parse the data
      inemyDataService.parseCSVData(csvContent);
      
      // Get chart data for turnover
      const turnoverData = inemyDataService.getChartData('turnover');
      setChartData(turnoverData);
      
      // Get summary statistics
      const stats = inemyDataService.getSummaryStats();
      setSummaryStats(stats);
      
    } catch (err) {
      console.error('Error loading CSV data:', err);
      setError('Αποτυχία φόρτωσης δεδομένων');
      
      // Fallback to mock data
      const mockData = Array.from({ length: 6 }, (_, i) => ({
        year: `202${i + 9}`,
        trade: Math.random() * 50000 + 100000,
        economy: Math.random() * 100000 + 200000,
      }));
      setChartData(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = () => {
    if (!summaryStats) return;
    
    const exportData = {
      timestamp: new Date().toISOString(),
      source: 'INEMY Εμπόριο Δεδομένα',
      statistics: summaryStats,
      chartData: chartData
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `esee-trade-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-3 order-2 md:order-1">
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
          <div className="md:col-span-9 order-1 md:order-2">
            {/* Market Overview Chart */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 mb-8`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Κύκλος Εργασιών Εμπορίου (χιλ. €)
                </h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => loadCSVData()}
                    className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                    title="Ανανέωση δεδομένων"
                  >
                    <TrendingUp className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={exportData}
                    disabled={!summaryStats}
                    className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} ${!summaryStats ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="Εξαγωγή δεδομένων"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Φόρτωση δεδομένων...
                  </div>
                </div>
              ) : error ? (
                <div className="h-80 flex items-center justify-center">
                  <div className={`text-lg ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    {error}
                  </div>
                </div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                      <XAxis 
                        dataKey="year" 
                        stroke={isDark ? '#9ca3af' : '#6b7280'}
                        fontSize={12}
                      />
                      <YAxis 
                        stroke={isDark ? '#9ca3af' : '#6b7280'}
                        fontSize={12}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: isDark ? '#374151' : '#ffffff',
                          border: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb',
                          borderRadius: '8px',
                          color: isDark ? '#f9fafb' : '#111827'
                        }}
                        formatter={(value, name) => [
                          `${(value / 1000).toFixed(0)}K €`,
                          name === 'trade' ? 'Εμπόριο' : 'Σύνολο Οικονομίας'
                        ]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="trade" 
                        stroke="#00B5F1" 
                        strokeWidth={3}
                        name="Εμπόριο"
                        dot={{ fill: '#00B5F1', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="economy" 
                        stroke="#16a34a" 
                        strokeWidth={3}
                        name="Σύνολο Οικονομίας"
                        dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
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
                {summaryStats ? [
                  {
                    title: 'Ετήσια Έκθεση Εμπορίου 2024',
                    description: `Κύκλος εργασιών: ${inemyDataService.formatNumber(summaryStats.turnover.amount / 1000, 'thousands')}K € (${summaryStats.turnover.percentage}% της οικονομίας)`,
                    icon: Euro,
                    color: 'green'
                  },
                  {
                    title: 'Ανάλυση Απασχόλησης 2024',
                    description: `${inemyDataService.formatNumber(summaryStats.employees.count, 'thousands')}K απασχολούμενοι (${summaryStats.employees.percentage}% της οικονομίας)`,
                    icon: Users,
                    color: 'purple'
                  },
                  {
                    title: 'Επιχειρηματικότητα & Εργοδότηση',
                    description: `${inemyDataService.formatNumber(summaryStats.employers.count, 'thousands')}K εργοδότες (${summaryStats.employers.percentage}% της οικονομίας)`,
                    icon: Building2,
                    color: 'orange'
                  },
                  {
                    title: 'Γυναικεία Απασχόληση στο Λιανεμπόριο',
                    description: `${inemyDataService.formatNumber(summaryStats.womenEmployment.percentage, 'percentage')} γυναίκες (υψηλότερο από το μέσο όρο)`,
                    icon: TrendingUp,
                    color: 'pink'
                  }
                ].map((report, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-4 border rounded-lg transition-colors cursor-pointer ${
                      isDark 
                        ? 'border-gray-700 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-3 rounded-lg mr-4 ${
                      isDark 
                        ? `bg-${report.color}-900/50` 
                        : `bg-${report.color}-50`
                    }`}>
                      <report.icon className={`w-6 h-6 ${
                        isDark 
                          ? `text-${report.color}-400` 
                          : `text-${report.color}-600`
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {report.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {report.description}
                      </p>
                    </div>
                    <div className={`flex items-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      <FileText className="w-5 h-5 mr-2" />
                      <span className="text-sm">INEMY</span>
                    </div>
                  </div>
                )) : (
                  [1, 2, 3, 4].map((item) => (
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
                  ))
                )}
              </div>

              <div className="mt-6 text-center">
                <a 
                  href="https://github.com/ncubejssocialmediateam/ESEE/blob/main/src/assets/%CE%99%CE%9D%CE%95%CE%9C%CE%A5_%CE%95%CE%BC%CF%80%CF%8C%CF%81%CE%B9%CE%BF_%CE%94%CE%B5%CE%B4%CE%BF%CE%BC%CE%AD%CE%BD%CE%B1_2%20(1).csv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <button className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                    Δείτε όλες τις εκθέσεις
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t mt-12`}>
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {summaryStats ? (
              <>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {inemyDataService.formatNumber(summaryStats.businesses.count, 'thousands')}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Εμπορικές Επιχειρήσεις
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {summaryStats.businesses.percentage}% της οικονομίας
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    {inemyDataService.formatNumber(summaryStats.turnover.amount / 1000, 'thousands')}K
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Κύκλος Εργασιών (εκ. €)
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {summaryStats.turnover.percentage}% της οικονομίας
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    {inemyDataService.formatNumber(summaryStats.employees.count, 'thousands')}K
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Απασχολούμενοι
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {summaryStats.employees.percentage}% της οικονομίας
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                    {inemyDataService.formatNumber(summaryStats.employers.count, 'thousands')}K
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Εργοδότες
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {summaryStats.employers.percentage}% της οικονομίας
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    {inemyDataService.formatNumber(summaryStats.gva.amount, 'thousands')}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    ΑΠΑ (εκ. €)
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {summaryStats.gva.percentage}% του ΑΕΠ
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                    {inemyDataService.formatNumber(summaryStats.womenEmployment.percentage, 'percentage')}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Γυναίκες στο Λιανεμπόριο
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    Υψηλότερο από το μέσο όρο
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>228K+</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Εμπορικές Επιχειρήσεις</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>179B+</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Κύκλος Εργασιών (€)</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>706K+</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Απασχολούμενοι</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>86K+</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Εργοδότες</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>22.7B</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>ΑΠΑ (€)</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>55.3%</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Γυναίκες</div>
                </div>
              </>
            )}
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
