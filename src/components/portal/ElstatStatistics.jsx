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
  Plane
} from 'lucide-react';
import elstatService from '../../services/elstatService';

const ElstatStatistics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    greece: null,
    regional: null,
    lastUpdated: null
  });

  const [selectedIndicator, setSelectedIndicator] = useState('cpi');
  const [selectedSector, setSelectedSector] = useState('retail');
  const [selectedRegions, setSelectedRegions] = useState(['EL']);

  const indicators = [
    { id: 'cpi', name: 'Δείκτης Τιμών Καταναλωτή', icon: TrendingUp, color: 'text-red-600' },
    { id: 'unemployment', name: 'Ανεργία', icon: Users, color: 'text-orange-600' },
    { id: 'retail_trade', name: 'Λιανικό Εμπόριο', icon: ShoppingCart, color: 'text-green-600' },
    { id: 'business_confidence', name: 'Επιχειρηματική Εμπιστοσύνη', icon: Building2, color: 'text-blue-600' },
    { id: 'gdp_growth', name: 'Αύξηση ΑΕΠ', icon: TrendingUp, color: 'text-purple-600' },
    { id: 'tourism_arrivals', name: 'Τουριστικές Αφίξεις', icon: Plane, color: 'text-indigo-600' }
  ];

  const sectors = [
    { id: 'retail', name: 'Λιανικό Εμπόριο', icon: ShoppingCart },
    { id: 'tourism', name: 'Τουρισμός', icon: Plane },
    { id: 'construction', name: 'Οικοδομές', icon: Home },
    { id: 'manufacturing', name: 'Βιομηχανία', icon: Factory },
    { id: 'trade', name: 'Εμπόριο', icon: Briefcase }
  ];

  const regions = [
    { id: 'EL', name: 'Ελλάδα', icon: MapPin },
    { id: 'EL-A', name: 'Αττική', icon: MapPin },
    { id: 'EL-B', name: 'Κεντρική Μακεδονία', icon: MapPin },
    { id: 'EL-C', name: 'Δυτική Μακεδονία', icon: MapPin },
    { id: 'EL-D', name: 'Ανατολική Μακεδονία και Θράκη', icon: MapPin },
    { id: 'EL-E', name: 'Θεσσαλία', icon: MapPin },
    { id: 'EL-F', name: 'Ήπειρος', icon: MapPin },
    { id: 'EL-G', name: 'Δυτική Ελλάδα', icon: MapPin },
    { id: 'EL-H', name: 'Στερεά Ελλάδα', icon: MapPin },
    { id: 'EL-J', name: 'Πελοπόννησος', icon: MapPin },
    { id: 'EL-K', name: 'Βόρειο Αιγαίο', icon: MapPin },
    { id: 'EL-L', name: 'Νότιο Αιγαίο', icon: MapPin },
    { id: 'EL-M', name: 'Κρήτη', icon: MapPin }
  ];

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to fetch real data from ELSTAT API
      const [greeceData, regionalData] = await Promise.all([
        elstatService.getBusinessIntelligenceSummary(),
        elstatService.getRegionalData(selectedIndicator, selectedRegions, '12')
      ]);

      setData({
        greece: greeceData,
        regional: regionalData,
        lastUpdated: new Date()
      });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching ELSTAT data:', err);
      
      // Fallback to mock data if API fails
      const mockGreeceData = {
        greece: {
          cpi: {
            data: [{ country: 'Ελλάδα', countryCode: 'EL', time: '2024-01', value: 3.1, indicator: 'cpi' }],
            metadata: { indicator: 'cpi', totalPoints: 1, countries: ['Ελλάδα'], timeRange: { from: '2024-01', to: '2024-01' } }
          },
          unemployment: {
            data: [{ country: 'Ελλάδα', countryCode: 'EL', time: '2024-01', value: 10.8, indicator: 'unemployment' }],
            metadata: { indicator: 'unemployment', totalPoints: 1, countries: ['Ελλάδα'], timeRange: { from: '2024-01', to: '2024-01' } }
          },
          retailTrade: {
            data: [{ country: 'Ελλάδα', countryCode: 'EL', time: '2024-01', value: 105.2, indicator: 'retail_trade' }],
            metadata: { indicator: 'retail_trade', totalPoints: 1, countries: ['Ελλάδα'], timeRange: { from: '2024-01', to: '2024-01' } }
          },
          businessConfidence: {
            data: [{ country: 'Ελλάδα', countryCode: 'EL', time: '2024-01', value: 2.1, indicator: 'business_confidence' }],
            metadata: { indicator: 'business_confidence', totalPoints: 1, countries: ['Ελλάδα'], timeRange: { from: '2024-01', to: '2024-01' } }
          },
          gdpGrowth: {
            data: [{ country: 'Ελλάδα', countryCode: 'EL', time: '2024-01', value: 2.3, indicator: 'gdp_growth' }],
            metadata: { indicator: 'gdp_growth', totalPoints: 1, countries: ['Ελλάδα'], timeRange: { from: '2024-01', to: '2024-01' } }
          }
        },
        lastUpdated: new Date().toISOString()
      };

      const mockRegionalData = {
        data: [
          { country: 'Ελλάδα', countryCode: 'EL', time: '2024-01', value: getMockValue(selectedIndicator, 'EL'), indicator: selectedIndicator },
          { country: 'Αττική', countryCode: 'EL-A', time: '2024-01', value: getMockValue(selectedIndicator, 'EL-A'), indicator: selectedIndicator },
          { country: 'Κεντρική Μακεδονία', countryCode: 'EL-B', time: '2024-01', value: getMockValue(selectedIndicator, 'EL-B'), indicator: selectedIndicator }
        ],
        metadata: { indicator: selectedIndicator, totalPoints: 3, countries: ['Ελλάδα', 'Αττική', 'Κεντρική Μακεδονία'], timeRange: { from: '2024-01', to: '2024-01' } }
      };

      setData({
        greece: mockGreeceData,
        regional: mockRegionalData,
        lastUpdated: new Date()
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRegionalData = async (indicator, regions) => {
    setLoading(true);
    setError(null);
    
    try {
      const regionalData = await elstatService.getRegionalData(indicator, regions, '12');
      setData(prev => ({
        ...prev,
        regional: regionalData,
        lastUpdated: new Date()
      }));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching regional data:', err);
      
      // Fallback to mock data
      const mockRegionalData = {
        data: regions.map(region => ({
          country: regions.find(r => r.id === region)?.name || region,
          countryCode: region,
          time: '2024-01',
          value: getMockValue(indicator, region),
          indicator: indicator
        })),
        metadata: { 
          indicator: indicator, 
          totalPoints: regions.length, 
          countries: regions.map(r => regions.find(reg => reg.id === r)?.name || r), 
          timeRange: { from: '2024-01', to: '2024-01' } 
        }
      };

      setData(prev => ({
        ...prev,
        regional: mockRegionalData,
        lastUpdated: new Date()
      }));
    } finally {
      setLoading(false);
    }
  };

  const fetchSectorData = async (sector) => {
    setLoading(true);
    setError(null);
    
    try {
      const sectorData = await elstatService.getSectorData(sector, '12');
      const processedData = elstatService.processData(sectorData, sector);
      
      setData(prev => ({
        ...prev,
        sector: processedData,
        lastUpdated: new Date()
      }));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching sector data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMockValue = (indicator, region) => {
    const values = {
      'cpi': { 'EL': 3.1, 'EL-A': 3.2, 'EL-B': 3.0, 'EL-C': 2.9, 'EL-D': 2.8, 'EL-E': 3.1, 'EL-F': 2.7, 'EL-G': 3.0, 'EL-H': 2.9, 'EL-J': 3.2, 'EL-K': 2.8, 'EL-L': 3.3, 'EL-M': 3.4 },
      'unemployment': { 'EL': 10.8, 'EL-A': 9.5, 'EL-B': 12.1, 'EL-C': 11.8, 'EL-D': 13.2, 'EL-E': 10.9, 'EL-F': 12.5, 'EL-G': 11.2, 'EL-H': 10.7, 'EL-J': 11.8, 'EL-K': 8.9, 'EL-L': 7.2, 'EL-M': 8.1 },
      'retail_trade': { 'EL': 105.2, 'EL-A': 108.1, 'EL-B': 102.8, 'EL-C': 99.5, 'EL-D': 97.2, 'EL-E': 103.1, 'EL-F': 98.7, 'EL-G': 101.2, 'EL-H': 102.9, 'EL-J': 104.8, 'EL-K': 106.3, 'EL-L': 112.4, 'EL-M': 109.7 },
      'business_confidence': { 'EL': 2.1, 'EL-A': 3.2, 'EL-B': 1.8, 'EL-C': 1.5, 'EL-D': 0.9, 'EL-E': 2.3, 'EL-F': 1.2, 'EL-G': 1.9, 'EL-H': 2.4, 'EL-J': 1.7, 'EL-K': 4.1, 'EL-L': 5.2, 'EL-M': 4.8 },
      'gdp_growth': { 'EL': 2.3, 'EL-A': 2.8, 'EL-B': 1.9, 'EL-C': 1.7, 'EL-D': 1.4, 'EL-E': 2.1, 'EL-F': 1.6, 'EL-G': 2.0, 'EL-H': 2.2, 'EL-J': 1.8, 'EL-K': 3.1, 'EL-L': 3.8, 'EL-M': 3.5 },
      'tourism_arrivals': { 'EL': 32000, 'EL-A': 15000, 'EL-B': 8000, 'EL-C': 2000, 'EL-D': 1500, 'EL-E': 3000, 'EL-F': 1000, 'EL-G': 2000, 'EL-H': 1500, 'EL-J': 2500, 'EL-K': 5000, 'EL-L': 8000, 'EL-M': 6000 }
    };
    return values[indicator]?.[region] || 0;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedIndicator && selectedRegions.length > 0) {
      fetchRegionalData(selectedIndicator, selectedRegions);
    }
  }, [selectedIndicator, selectedRegions]);

  useEffect(() => {
    if (selectedSector) {
      fetchSectorData(selectedSector);
    }
  }, [selectedSector]);

  const getTrendIcon = (value, indicator) => {
    if (indicator === 'unemployment') {
      // For unemployment, lower is better
      return value > 0 ? <TrendingDown className="w-4 h-4 text-red-500" /> : <TrendingUp className="w-4 h-4 text-green-500" />;
    }
    
    // For other indicators, higher is generally better
    return value > 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const formatValue = (value, indicator) => {
    if (value === null || value === undefined) return 'N/A';
    
    switch (indicator) {
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
      case 'tourism_arrivals':
        return `${(value / 1000).toFixed(1)}K`;
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
    const indicators = ['cpi', 'unemployment', 'retailTrade', 'businessConfidence', 'gdpGrowth'];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Σύνοψη Ελληνικών Στατιστικών</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Θετικά Σημεία</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Θετική αύξηση του ΑΕΠ</span>
                </li>
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

  const renderRegional = () => {
    if (!data.regional || data.regional.error) {
      return (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Δεν είναι δυνατή η φόρτωση των περιφερειακών δεδομένων</p>
        </div>
      );
    }

    const { data: regionalData, metadata } = data.regional;
    const greeceData = regionalData.find(d => d.countryCode === 'EL');
    const otherRegions = regionalData.filter(d => d.countryCode !== 'EL');

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Περιφερειακά Στατιστικά
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
                  <h4 className="font-semibold text-blue-900">Ελλάδα (Σύνολο)</h4>
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
            {otherRegions.map((region) => (
              <div key={region.countryCode} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="font-medium text-gray-900">
                    {region.country}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900">
                    {formatValue(region.value, selectedIndicator)}
                  </span>
                  {greeceData && (
                    <span className={`text-sm ${
                      region.value > greeceData.value ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {region.value > greeceData.value ? '↑' : '↓'}
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
              <h4 className="font-medium text-gray-700 mb-2">Περιφερειακές Διαφορές</h4>
              <p className="text-sm text-gray-600">
                {greeceData && otherRegions.length > 0 && (
                  <>
                    Η {selectedIndicator === 'cpi' ? 'Αττική' : 'Κρήτη'} έχει τα υψηλότερα επίπεδα για τον δείκτη {
                      indicators.find(i => i.id === selectedIndicator)?.name
                    }.
                  </>
                )}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Συστάσεις</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Παρακολούθηση περιφερειακών τάσεων</li>
                <li>• Σύγκριση με εθνικά μέσα</li>
                <li>• Προσαρμογή στρατηγικής ανάλογα με την περιφέρεια</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSectors = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Κλαδικά Στατιστικά
            </h3>
            <div className="flex items-center space-x-4">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {sectors.map((sector) => (
                  <option key={sector.id} value={sector.id}>
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector) => (
              <div key={sector.id} className={`p-4 rounded-lg border-2 ${
                selectedSector === sector.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center space-x-3">
                  <sector.icon className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{sector.name}</h4>
                    <p className="text-sm text-gray-600">
                      {selectedSector === sector.id ? 'Επιλεγμένος κλάδος' : 'Κλικ για επιλογή'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {data.sector && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Στοιχεία για τον κλάδο: {sectors.find(s => s.id === selectedSector)?.name}
            </h3>
            <div className="space-y-4">
              {data.sector.data?.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{item.time}</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatValue(item.value, selectedSector)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Πληροφορίες ΕΛΣΤΑΤ</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Πηγή Δεδομένων</h4>
            <p className="text-sm text-gray-600">
              Ελληνική Στατιστική Αρχή (ΕΛΣΤΑΤ)
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
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Επικοινωνία</h4>
            <p className="text-sm text-gray-600">
              Email: data.dissem@statistics.gr<br />
              Τηλ.: 213-135-2022
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
          <h2 className="text-2xl font-bold text-gray-900">Ελληνικά Στατιστικά</h2>
          <p className="text-gray-600 mt-1">
            Πρόσβαση σε στατιστικά δεδομένα από την ΕΛΣΤΑΤ
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
          <p className="text-gray-600">Φόρτωση δεδομένων από την ΕΛΣΤΑΤ...</p>
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
              onClick={() => setActiveTab('regional')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'regional'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Περιφέρειες
            </button>
            <button
              onClick={() => setActiveTab('sectors')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sectors'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Κλάδοι
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
          {activeTab === 'regional' && renderRegional()}
          {activeTab === 'sectors' && renderSectors()}
          {activeTab === 'export' && renderDataExport()}
        </div>
      </div>
    </div>
  );
};

export default ElstatStatistics;
