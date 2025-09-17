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
  Minus,
  MapPin,
  Briefcase,
  Factory,
  Home,
  Plane,
  Euro,
  Flag,
  Database,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';
import eurostatProxy from '../../utils/eurostatProxy';
import elstatService from '../../services/elstatService';

const StatisticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    eurostat: null,
    elstat: null,
    lastUpdated: null
  });

  const [selectedIndicator, setSelectedIndicator] = useState('inflation');
  const [selectedSource, setSelectedSource] = useState('both'); // 'eurostat', 'elstat', 'both'
  const [showComparison, setShowComparison] = useState(true);

  const indicators = [
    { id: 'inflation', name: 'Πληθωρισμός', icon: TrendingUp, color: 'text-red-600' },
    { id: 'unemployment', name: 'Ανεργία', icon: Users, color: 'text-orange-600' },
    { id: 'retail_trade', name: 'Λιανικό Εμπόριο', icon: ShoppingCart, color: 'text-green-600' },
    { id: 'business_confidence', name: 'Επιχειρηματική Εμπιστοσύνη', icon: Building2, color: 'text-blue-600' },
    { id: 'gdp_growth', name: 'Αύξηση ΑΕΠ', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const dataSources = [
    { id: 'eurostat', name: 'Eurostat', icon: Euro, description: 'Ευρωπαϊκά δεδομένα' },
    { id: 'elstat', name: 'ΕΛΣΤΑΤ', icon: Flag, description: 'Ελληνικά δεδομένα' },
    { id: 'both', name: 'Σύγκριση', icon: BarChart3, description: 'Σύγκριση και των δύο' }
  ];

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const promises = [];
      
      if (selectedSource === 'eurostat' || selectedSource === 'both') {
        promises.push(
          eurostatProxy.getBusinessIntelligenceSummary()
            .then(result => ({ source: 'eurostat', data: result }))
            .catch(err => ({ source: 'eurostat', error: err.message }))
        );
      }
      
      if (selectedSource === 'elstat' || selectedSource === 'both') {
        promises.push(
          elstatService.getBusinessIntelligenceSummary()
            .then(result => ({ source: 'elstat', data: result }))
            .catch(err => ({ source: 'elstat', error: err.message }))
        );
      }

      const results = await Promise.all(promises);
      
      const newData = {
        eurostat: null,
        elstat: null,
        lastUpdated: new Date()
      };

      results.forEach(result => {
        if (result.source === 'eurostat') {
          newData.eurostat = result;
        } else if (result.source === 'elstat') {
          newData.elstat = result;
        }
      });

      setData(newData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching statistics data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComparisonData = async (indicator) => {
    setLoading(true);
    setError(null);
    
    try {
      const promises = [];
      
      if (selectedSource === 'eurostat' || selectedSource === 'both') {
        promises.push(
          eurostatProxy.getComparativeData(indicator)
            .then(result => ({ source: 'eurostat', data: result }))
            .catch(err => ({ source: 'eurostat', error: err.message }))
        );
      }
      
      if (selectedSource === 'elstat' || selectedSource === 'both') {
        promises.push(
          elstatService.getComparativeData(indicator)
            .then(result => ({ source: 'elstat', data: result }))
            .catch(err => ({ source: 'elstat', error: err.message }))
        );
      }

      const results = await Promise.all(promises);
      
      setData(prev => ({
        ...prev,
        comparison: results,
        lastUpdated: new Date()
      }));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching comparison data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedSource]);

  useEffect(() => {
    if (selectedIndicator) {
      fetchComparisonData(selectedIndicator);
    }
  }, [selectedIndicator, selectedSource]);

  const getTrendIcon = (value, indicator) => {
    if (indicator === 'unemployment') {
      return value > 0 ? <TrendingDown className="w-4 h-4 text-red-500" /> : <TrendingUp className="w-4 h-4 text-green-500" />;
    }
    return value > 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const formatValue = (value, indicator) => {
    if (value === null || value === undefined) return 'N/A';
    
    switch (indicator) {
      case 'inflation':
      case 'cpi':
        return `${value.toFixed(2)}%`;
      case 'unemployment':
        return `${value.toFixed(1)}%`;
      case 'retail_trade':
        return value.toFixed(1);
      case 'business_confidence':
        return value.toFixed(1);
      case 'gdp_growth':
        return `${value.toFixed(1)}%`;
      default:
        return value.toFixed(2);
    }
  };

  const renderOverview = () => {
    return (
      <div className="space-y-6">
        {/* Data Source Selection */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Πηγή Δεδομένων</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dataSources.map((source) => (
              <button
                key={source.id}
                onClick={() => setSelectedSource(source.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedSource === source.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <source.icon className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">{source.name}</h4>
                    <p className="text-sm text-gray-600">{source.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indicators.map((indicator) => {
            const eurostatData = data.eurostat?.data?.greece?.[indicator.id]?.data?.[0];
            const elstatData = data.elstat?.data?.greece?.[indicator.id]?.data?.[0];
            
            return (
              <div key={indicator.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <indicator.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">
                        {indicator.name}
                      </h3>
                      <div className="space-y-1">
                        {selectedSource === 'eurostat' || selectedSource === 'both' ? (
                          <div className="flex items-center space-x-2">
                            <Euro className="w-3 h-3 text-blue-500" />
                            <span className="text-lg font-bold text-gray-900">
                              {eurostatData ? formatValue(eurostatData.value, indicator.id) : 'N/A'}
                            </span>
                          </div>
                        ) : null}
                        {selectedSource === 'elstat' || selectedSource === 'both' ? (
                          <div className="flex items-center space-x-2">
                            <Flag className="w-3 h-3 text-green-500" />
                            <span className="text-lg font-bold text-gray-900">
                              {elstatData ? formatValue(elstatData.value, indicator.id) : 'N/A'}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {(eurostatData || elstatData) && getTrendIcon((eurostatData || elstatData).value, indicator.id)}
                </div>
                <div className="text-xs text-gray-500">
                  Τελευταία ενημέρωση: {(eurostatData || elstatData)?.time || 'N/A'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ανάλυση για ΕΣΕΕ</h3>
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
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Θετική αύξηση του ΑΕΠ</span>
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
                <li className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span>Ανάγκη παρακολούθησης τάσεων</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderComparison = () => {
    if (!data.comparison || data.comparison.length === 0) {
      return (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Δεν είναι δυνατή η φόρτωση των δεδομένων σύγκρισης</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Σύγκριση Δεδομένων
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

          {data.comparison.map((comparison, index) => {
            if (comparison.error) {
              return (
                <div key={index} className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700">
                      Σφάλμα {comparison.source}: {comparison.error}
                    </span>
                  </div>
                </div>
              );
            }

            const { data: comparisonData, metadata } = comparison.data;
            const greeceData = comparisonData?.find(d => d.countryCode === 'EL');
            const otherCountries = comparisonData?.filter(d => d.countryCode !== 'EL') || [];

            return (
              <div key={index} className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  {comparison.source === 'eurostat' ? (
                    <Euro className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Flag className="w-5 h-5 text-green-500" />
                  )}
                  <h4 className="font-semibold text-gray-900">
                    {comparison.source === 'eurostat' ? 'Eurostat' : 'ΕΛΣΤΑΤ'}
                  </h4>
                </div>

                {greeceData && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-blue-900">Ελλάδα</h5>
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

                {otherCountries.length > 0 && (
                  <div className="space-y-2">
                    {otherCountries.slice(0, 5).map((country) => (
                      <div key={country.countryCode} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {country.countryCode}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">
                            {country.country}
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
                )}
              </div>
            );
          })}
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Πηγές Δεδομένων</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Euro className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-medium text-gray-700">Eurostat</h4>
              <p className="text-sm text-gray-600">Στατιστική Υπηρεσία της Ευρωπαϊκής Ένωσης</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <Flag className="w-6 h-6 text-green-600" />
            <div>
              <h4 className="font-medium text-gray-700">ΕΛΣΤΑΤ</h4>
              <p className="text-sm text-gray-600">Ελληνική Στατιστική Αρχή</p>
            </div>
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
          <h2 className="text-2xl font-bold text-gray-900">Στατιστικό Dashboard</h2>
          <p className="text-gray-600 mt-1">
            Ολοκληρωμένη εικόνα ελληνικών και ευρωπαϊκών στατιστικών για την ΕΣΕΕ
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
          <p className="text-gray-600">Φόρτωση στατιστικών δεδομένων...</p>
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

export default StatisticsDashboard;
