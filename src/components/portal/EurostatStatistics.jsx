import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Globe, 
  RefreshCw, 
  Download,
  AlertCircle,
  CheckCircle,
  Calendar,
  Users,
  ShoppingCart,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import eurostatProxy from '../../utils/eurostatProxy';

const EurostatStatistics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    greece: null,
    euComparison: null,
    lastUpdated: null
  });

  const [selectedIndicator, setSelectedIndicator] = useState('inflation');
  const [selectedCountries, setSelectedCountries] = useState(['EL', 'DE', 'FR', 'IT', 'ES']);

  const indicators = [
    { id: 'inflation', name: 'Πληθωρισμός', icon: TrendingUp, color: 'text-red-600' },
    { id: 'unemployment', name: 'Ανεργία', icon: Users, color: 'text-orange-600' },
    { id: 'retail_trade', name: 'Λιανικό Εμπόριο', icon: ShoppingCart, color: 'text-green-600' },
    { id: 'business_confidence', name: 'Επιχειρηματική Εμπιστοσύνη', icon: Building2, color: 'text-blue-600' },
    { id: 'imports', name: 'Εισαγωγές', icon: ArrowDownRight, color: 'text-purple-600' },
    { id: 'exports', name: 'Εξαγωγές', icon: ArrowUpRight, color: 'text-indigo-600' }
  ];

  const countryNames = {
    'EL': 'Ελλάδα',
    'DE': 'Γερμανία',
    'FR': 'Γαλλία',
    'IT': 'Ιταλία',
    'ES': 'Ισπανία',
    'NL': 'Ολλανδία',
    'BE': 'Βέλγιο',
    'AT': 'Αυστρία',
    'PT': 'Πορτογαλία',
    'FI': 'Φινλανδία',
    'IE': 'Ιρλανδία'
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to fetch real data from Eurostat API
      const [greeceData, euData] = await Promise.all([
        eurostatProxy.getBusinessIntelligenceSummary(),
        eurostatProxy.getComparativeData(selectedIndicator)
      ]);

      setData({
        greece: greeceData,
        euComparison: euData,
        lastUpdated: new Date()
      });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching Eurostat data:', err);
      
      // Fallback to mock data if API fails
      const mockGreeceData = {
        greece: {
          inflation: {
            data: [{ country: 'Greece', countryCode: 'EL', time: '2024-01', value: 3.2, indicator: 'inflation' }],
            metadata: { indicator: 'inflation', totalPoints: 1, countries: ['Greece'], timeRange: { from: '2024-01', to: '2024-01' } }
          },
          unemployment: {
            data: [{ country: 'Greece', countryCode: 'EL', time: '2024-01', value: 10.8, indicator: 'unemployment' }],
            metadata: { indicator: 'unemployment', totalPoints: 1, countries: ['Greece'], timeRange: { from: '2024-01', to: '2024-01' } }
          },
          retail_trade: {
            data: [{ country: 'Greece', countryCode: 'EL', time: '2024-01', value: 105.2, indicator: 'retail_trade' }],
            metadata: { indicator: 'retail_trade', totalPoints: 1, countries: ['Greece'], timeRange: { from: '2024-01', to: '2024-01' } }
          },
          business_confidence: {
            data: [{ country: 'Greece', countryCode: 'EL', time: '2024-01', value: 2.1, indicator: 'business_confidence' }],
            metadata: { indicator: 'business_confidence', totalPoints: 1, countries: ['Greece'], timeRange: { from: '2024-01', to: '2024-01' } }
          }
        },
        lastUpdated: new Date().toISOString()
      };

      const mockEUData = {
        data: [
          { country: 'Greece', countryCode: 'EL', time: '2024-01', value: 3.2, indicator: selectedIndicator },
          { country: 'Germany', countryCode: 'DE', time: '2024-01', value: 2.8, indicator: selectedIndicator },
          { country: 'France', countryCode: 'FR', time: '2024-01', value: 3.1, indicator: selectedIndicator },
          { country: 'Italy', countryCode: 'IT', time: '2024-01', value: 2.9, indicator: selectedIndicator },
          { country: 'Spain', countryCode: 'ES', time: '2024-01', value: 3.4, indicator: selectedIndicator }
        ],
        metadata: { indicator: selectedIndicator, totalPoints: 5, countries: ['Greece', 'Germany', 'France', 'Italy', 'Spain'], timeRange: { from: '2024-01', to: '2024-01' } }
      };

      setData({
        greece: mockGreeceData,
        euComparison: mockEUData,
        lastUpdated: new Date()
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchComparisonData = async (indicator) => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to fetch real data from Eurostat API
      const comparisonData = await eurostatProxy.getComparativeData(indicator);
      setData(prev => ({
        ...prev,
        euComparison: comparisonData,
        lastUpdated: new Date()
      }));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching comparison data:', err);
      
      // Fallback to mock data
      const mockComparisonData = {
        data: [
          { country: 'Greece', countryCode: 'EL', time: '2024-01', value: getMockValue(indicator, 'EL'), indicator: indicator },
          { country: 'Germany', countryCode: 'DE', time: '2024-01', value: getMockValue(indicator, 'DE'), indicator: indicator },
          { country: 'France', countryCode: 'FR', time: '2024-01', value: getMockValue(indicator, 'FR'), indicator: indicator },
          { country: 'Italy', countryCode: 'IT', time: '2024-01', value: getMockValue(indicator, 'IT'), indicator: indicator },
          { country: 'Spain', countryCode: 'ES', time: '2024-01', value: getMockValue(indicator, 'ES'), indicator: indicator }
        ],
        metadata: { indicator: indicator, totalPoints: 5, countries: ['Greece', 'Germany', 'France', 'Italy', 'Spain'], timeRange: { from: '2024-01', to: '2024-01' } }
      };

      setData(prev => ({
        ...prev,
        euComparison: mockComparisonData,
        lastUpdated: new Date()
      }));
    } finally {
      setLoading(false);
    }
  };

  const getMockValue = (indicator, country) => {
    const values = {
      'inflation': { 'EL': 3.2, 'DE': 2.8, 'FR': 3.1, 'IT': 2.9, 'ES': 3.4 },
      'unemployment': { 'EL': 10.8, 'DE': 3.2, 'FR': 7.1, 'IT': 7.8, 'ES': 12.1 },
      'retail_trade': { 'EL': 105.2, 'DE': 98.5, 'FR': 102.1, 'IT': 99.8, 'ES': 103.4 },
      'business_confidence': { 'EL': 2.1, 'DE': -0.8, 'FR': 1.2, 'IT': -1.5, 'ES': 0.8 },
      'imports': { 'EL': 45000, 'DE': 1200000, 'FR': 650000, 'IT': 480000, 'ES': 320000 },
      'exports': { 'EL': 38000, 'DE': 1400000, 'FR': 580000, 'IT': 520000, 'ES': 350000 }
    };
    return values[indicator]?.[country] || 0;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedIndicator) {
      fetchComparisonData(selectedIndicator);
    }
  }, [selectedIndicator]);

  const getTrendIcon = (value, indicator) => {
    if (indicator === 'unemployment' || indicator === 'business_confidence') {
      // For unemployment, lower is better
      // For business confidence, higher is better
      if (indicator === 'unemployment') {
        return value > 0 ? <TrendingDown className="w-4 h-4 text-red-500" /> : <TrendingUp className="w-4 h-4 text-green-500" />;
      } else {
        return value > 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />;
      }
    }
    
    // For other indicators, higher is generally better
    return value > 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const formatValue = (value, indicator) => {
    if (value === null || value === undefined) return 'N/A';
    
    switch (indicator) {
      case 'inflation':
        return `${value.toFixed(2)}%`;
      case 'unemployment':
        return `${value.toFixed(1)}%`;
      case 'retail_trade':
        return value.toFixed(1);
      case 'business_confidence':
        return value.toFixed(1);
      case 'imports':
      case 'exports':
        return `€${(value / 1000).toFixed(1)}B`;
      default:
        return value.toFixed(2);
    }
  };

  const renderOverview = () => {
    if (!data.greece || data.greece.error) {
      return (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Δεν είναι δυνατή η φόρτωση των δεδομένων</p>
        </div>
      );
    }

    const { greece } = data.greece;
    const indicators = ['inflation', 'unemployment', 'retail_trade', 'business_confidence'];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicators.map((indicator) => {
            const indicatorData = greece[indicator];
            const latestData = indicatorData?.data?.[0];
            const indicatorInfo = indicators.find(i => i.id === indicator);
            
            return (
              <div key={indicator} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {indicatorInfo?.icon && <indicatorInfo.icon className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">
                        {indicatorInfo?.name || indicator}
                      </h3>
                      <p className="text-2xl font-bold text-gray-900">
                        {latestData ? formatValue(latestData.value, indicator) : 'N/A'}
                      </p>
                    </div>
                  </div>
                  {latestData && getTrendIcon(latestData.value, indicator)}
                </div>
                <div className="text-xs text-gray-500">
                  Τελευταία ενημέρωση: {latestData?.time || 'N/A'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Σύνοψη Οικονομικών Δευκτών</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Θετικά Σημεία</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Επιχειρηματική εμπιστοσύνη σε θετικά επίπεδα</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Σταθερά επίπεδα λιανικού εμπορίου</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Προσοχή</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span>Πληθωρισμός πάνω από τον στόχο της ΕΚΤ</span>
                </li>
                <li className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span>Ανεργία σε υψηλά επίπεδα</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderComparison = () => {
    if (!data.euComparison || data.euComparison.error) {
      return (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Δεν είναι δυνατή η φόρτωση των δεδομένων σύγκρισης</p>
        </div>
      );
    }

    const { data: comparisonData, metadata } = data.euComparison;
    const greeceData = comparisonData.find(d => d.countryCode === 'EL');
    const otherCountries = comparisonData.filter(d => d.countryCode !== 'EL');

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Σύγκριση με άλλες Ευρωπαϊκές Χώρες
            </h3>
            <div className="flex items-center space-x-4">
              <select
                value={selectedIndicator}
                onChange={(e) => setSelectedIndicator(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {indicators.map((indicator) => (
                  <option key={indicator.id} value={indicator.id}>
                    {indicator.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {greeceData && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-blue-900">Ελλάδα</h4>
                  <p className="text-2xl font-bold text-blue-800">
                    {formatValue(greeceData.value, selectedIndicator)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600">Τελευταία ενημέρωση</p>
                  <p className="text-sm text-blue-600">{greeceData.time}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {otherCountries.map((country) => (
              <div key={country.countryCode} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {country.countryCode}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {countryNames[country.countryCode] || country.country}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900">
                    {formatValue(country.value, selectedIndicator)}
                  </span>
                  {greeceData && (
                    <span className={`text-sm ${
                      country.value > greeceData.value ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {country.value > greeceData.value ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ανάλυση</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Θέση της Ελλάδας</h4>
              <p className="text-sm text-gray-600">
                {greeceData && otherCountries.length > 0 && (
                  <>
                    Η Ελλάδα βρίσκεται στην {
                      otherCountries.filter(c => c.value > greeceData.value).length + 1
                    }η θέση από {otherCountries.length + 1} χώρες για τον δείκτη {
                      indicators.find(i => i.id === selectedIndicator)?.name
                    }.
                  </>
                )}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Συστάσεις</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Παρακολούθηση τάσεων σε ευρωπαϊκό επίπεδο</li>
                <li>• Σύγκριση με παρόμοιες οικονομίες</li>
                <li>• Προσαρμογή στρατηγικής ανάλογα με τα δεδομένα</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDataExport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Εξαγωγή Δεδομένων</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Διαθέσιμα Δεδομένα</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {indicators.map((indicator) => (
                <li key={indicator.id} className="flex items-center space-x-2">
                  <indicator.icon className="w-4 h-4 text-gray-400" />
                  <span>{indicator.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Εξαγωγή</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Εξαγωγή CSV</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Εξαγωγή Excel</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Εξαγωγή JSON</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Πληροφορίες</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Πηγή Δεδομένων</h4>
            <p className="text-sm text-gray-600">
              Eurostat - Στατιστική Υπηρεσία της Ευρωπαϊκής Ένωσης
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Συχνότητα Ενημέρωσης</h4>
            <p className="text-sm text-gray-600">
              Μηνιαία ενημέρωση με καθυστέρηση 1-2 μηνών
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Τελευταία Ενημέρωση</h4>
            <p className="text-sm text-gray-600">
              {data.lastUpdated ? data.lastUpdated.toLocaleString('el-GR') : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ευρωπαϊκά Στατιστικά</h2>
          <p className="text-gray-600 mt-1">
            Πρόσβαση σε οικονομικά δεδομένα από το Eurostat
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {data.lastUpdated && (
            <span className="text-sm text-gray-500">
              Ενημερώθηκε: {data.lastUpdated.toLocaleTimeString('el-GR')}
            </span>
          )}
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Ανανέωση</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">Σφάλμα: {error}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση δεδομένων από το Eurostat...</p>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Επισκόπηση
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'comparison'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Σύγκριση
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'export'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Εξαγωγή
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'comparison' && renderComparison()}
          {activeTab === 'export' && renderDataExport()}
        </div>
      </div>
    </div>
  );
};

export default EurostatStatistics;
