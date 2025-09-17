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
  EyeOff,
  Target,
  Lightbulb,
  BookOpen,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';
import memberStatisticsService, { ESEE_SECTORS, REGION_CHARACTERISTICS } from '../../services/memberStatisticsService';

const MemberDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    dashboard: null,
    insights: null,
    lastUpdated: null
  });

  const [memberProfile, setMemberProfile] = useState({
    sector: 'retail',
    region: 'EL-A',
    interests: ['business_confidence', 'retail_trade']
  });

  const [selectedSector, setSelectedSector] = useState('retail');
  const [selectedRegion, setSelectedRegion] = useState('EL-A');

  const sectors = Object.entries(ESEE_SECTORS).map(([id, info]) => ({
    id,
    name: info.name,
    description: info.description,
    icon: getSectorIcon(id)
  }));

  const regions = Object.entries(REGION_CHARACTERISTICS).map(([id, info]) => ({
    id,
    name: info.name,
    description: info.description,
    characteristics: info.characteristics
  }));

  function getSectorIcon(sectorId) {
    const icons = {
      'retail': ShoppingCart,
      'wholesale': Briefcase,
      'tourism': Plane,
      'construction': Home,
      'manufacturing': Factory,
      'services': Settings,
      'food_beverage': Users,
      'technology': Database
    };
    return icons[sectorId] || Briefcase;
  }

  const fetchMemberDashboard = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const dashboard = await memberStatisticsService.getMemberDashboard(memberProfile);
      setData(prev => ({
        ...prev,
        dashboard,
        lastUpdated: new Date()
      }));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching member dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketInsights = async (sector) => {
    setLoading(true);
    setError(null);
    
    try {
      const insights = await memberStatisticsService.getMarketInsights(sector, '12');
      setData(prev => ({
        ...prev,
        insights,
        lastUpdated: new Date()
      }));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching market insights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberDashboard();
  }, [memberProfile]);

  useEffect(() => {
    if (selectedSector) {
      fetchMarketInsights(selectedSector);
    }
  }, [selectedSector]);

  const handleProfileUpdate = (field, value) => {
    setMemberProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatValue = (value, indicator) => {
    if (value === null || value === undefined) return 'N/A';
    
    switch (indicator) {
      case 'cpi':
      case 'inflation':
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

  const renderProfileSetup = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Προφίλ Μέλους</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Κλάδος Επιχείρησης
              </label>
              <select
                value={memberProfile.sector}
                onChange={(e) => handleProfileUpdate('sector', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {sectors.map((sector) => (
                  <option key={sector.id} value={sector.id}>
                    {sector.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {sectors.find(s => s.id === memberProfile.sector)?.description}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Περιφέρεια
              </label>
              <select
                value={memberProfile.region}
                onChange={(e) => handleProfileUpdate('region', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {regions.find(r => r.id === memberProfile.region)?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOverview = () => {
    if (!data.dashboard || data.dashboard.error) {
      return (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Δεν είναι δυνατή η φόρτωση των δεδομένων</p>
        </div>
      );
    }

    const { sector, region, general } = data.dashboard;

    return (
      <div className="space-y-6">
        {/* Member Profile Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Προφίλ Μέλους</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {getSectorIcon(memberProfile.sector)({ className: "w-6 h-6 text-blue-600" })}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {sectors.find(s => s.id === memberProfile.sector)?.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {sectors.find(s => s.id === memberProfile.sector)?.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {regions.find(r => r.id === memberProfile.region)?.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {regions.find(r => r.id === memberProfile.region)?.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sector Statistics */}
        {sector && !sector.error && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Στατιστικά Κλάδου: {sector.data?.sector?.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sector.data?.indicators?.map((indicator) => {
                if (indicator.error) return null;
                
                const data = indicator.elstat || indicator.eurostat;
                const latestData = data?.data?.[0];
                
                return (
                  <div key={indicator.indicator} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-600">
                        {indicator.indicator}
                      </h4>
                      {latestData && getTrendIcon('up')}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {latestData ? formatValue(latestData.value, indicator.indicator) : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {latestData?.time || 'N/A'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* General Statistics */}
        {general && !general.error && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Γενικά Στατιστικά</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Eurostat</h4>
                <div className="space-y-2">
                  {general.data?.eurostat?.greece && Object.entries(general.data.eurostat.greece).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{key}</span>
                      <span className="text-sm font-medium">
                        {value?.data?.[0] ? formatValue(value.data[0].value, key) : 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">ΕΛΣΤΑΤ</h4>
                <div className="space-y-2">
                  {general.data?.elstat?.greece && Object.entries(general.data.elstat.greece).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{key}</span>
                      <span className="text-sm font-medium">
                        {value?.data?.[0] ? formatValue(value.data[0].value, key) : 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderInsights = () => {
    if (!data.insights || data.insights.error) {
      return (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Δεν είναι δυνατή η φόρτωση των market insights</p>
        </div>
      );
    }

    const { sector, analysis, recommendations } = data.insights;

    return (
      <div className="space-y-6">
        {/* Market Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Ανάλυση Αγοράς: {sector.name}
            </h3>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                analysis.outlook === 'positive' ? 'bg-green-500' : 
                analysis.outlook === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span className="text-sm font-medium text-gray-600">
                {analysis.outlook === 'positive' ? 'Θετική' : 
                 analysis.outlook === 'negative' ? 'Αρνητική' : 'Ουδέτερη'} Προοπτική
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(analysis.trends).map(([indicator, trend]) => (
              <div key={indicator} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">{indicator}</h4>
                  {getTrendIcon(trend.trend)}
                </div>
                <p className="text-xl font-bold text-gray-900">
                  {formatValue(trend.current, indicator)}
                </p>
                <p className={`text-xs ${
                  trend.change > 0 ? 'text-green-600' : 
                  trend.change < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {trend.change > 0 ? '+' : ''}{trend.changePercent?.toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Συστάσεις</h3>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderResources = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Χρήσιμοι Πόροι</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ΕΛΣΤΑΤ</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span>Επίσημα στατιστικά δεδομένα</span>
              </li>
              <li className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-gray-400" />
                <span>Βάση δεδομένων ΕΛΣΤΑΤ</span>
              </li>
              <li className="flex items-center space-x-2">
                <Download className="w-4 h-4 text-gray-400" />
                <span>Εξαγωγή δεδομένων</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ΕΣΕΕ</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-gray-400" />
                <span>Στρατηγικές κατευθύνσεις</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span>Δικτύωση μελών</span>
              </li>
              <li className="flex items-center space-x-2">
                <TrendingUpIcon className="w-4 h-4 text-gray-400" />
                <span>Επιχειρηματική ανάπτυξη</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Επικοινωνία</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">ΕΛΣΤΑΤ</h4>
            <p className="text-sm text-gray-600">
              Email: data.dissem@statistics.gr<br />
              Τηλ.: 213-135-2022
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">ΕΣΕΕ</h4>
            <p className="text-sm text-gray-600">
              Για περισσότερες πληροφορίες και υποστήριξη επικοινωνήστε με την ΕΣΕΕ
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
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Μέλους</h2>
          <p className="text-gray-600 mt-1">
            Προσωποποιημένα στατιστικά και insights για την επιχείρησή σας
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {data.lastUpdated && (
            <span className="text-sm text-gray-500">
              Ενημερώθηκε: {data.lastUpdated.toLocaleTimeString('el-GR')}
            </span>
          )}
          <button
            onClick={fetchMemberDashboard}
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
          <p className="text-gray-600">Φόρτωση δεδομένων...</p>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Προφίλ
            </button>
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
              onClick={() => setActiveTab('insights')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'insights'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Insights
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'resources'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Πόροι
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && renderProfileSetup()}
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'insights' && renderInsights()}
          {activeTab === 'resources' && renderResources()}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
