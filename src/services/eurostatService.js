/**
 * Eurostat API Service
 * Provides access to European statistics data for business intelligence
 */

const EUROSTAT_BASE_URL = '/api/eurostat/statistics/1.0/data';

// Common Eurostat datasets for business intelligence
const DATASETS = {
  // Economic indicators
  INFLATION: 'prc_hicp_midx', // Harmonised Index of Consumer Prices
  UNEMPLOYMENT: 'une_rt_m', // Unemployment rate by sex and age
  GDP: 'nama_10_gdp', // GDP and main components
  RETAIL_TRADE: 'sts_trtu_m', // Retail trade volume
  
  // Trade data
  IMPORTS: 'bop_its6_det', // International trade in goods
  EXPORTS: 'bop_its6_det', // International trade in goods
  
  // Business indicators
  BUSINESS_CONFIDENCE: 'ei_bsci_m_r2', // Business confidence indicator
  INDUSTRIAL_PRODUCTION: 'sts_inpr_m', // Industrial production index
  
  // Employment
  EMPLOYMENT_RATE: 'lfsi_emp_a', // Employment rate by sex and age
  LABOUR_COST: 'lc_lci_r2_q', // Labour cost index
  
  // Prices
  PRODUCER_PRICES: 'sts_inpp_m', // Producer price index
  CONSUMER_PRICES: 'prc_hicp_midx', // Consumer price index
};

// Country codes for EU member states
const COUNTRY_CODES = {
  'EL': 'Greece',
  'DE': 'Germany',
  'FR': 'France',
  'IT': 'Italy',
  'ES': 'Spain',
  'NL': 'Netherlands',
  'BE': 'Belgium',
  'AT': 'Austria',
  'PT': 'Portugal',
  'FI': 'Finland',
  'IE': 'Ireland',
  'LU': 'Luxembourg',
  'MT': 'Malta',
  'CY': 'Cyprus',
  'SK': 'Slovakia',
  'SI': 'Slovenia',
  'EE': 'Estonia',
  'LV': 'Latvia',
  'LT': 'Lithuania',
  'PL': 'Poland',
  'CZ': 'Czech Republic',
  'HU': 'Hungary',
  'RO': 'Romania',
  'BG': 'Bulgaria',
  'HR': 'Croatia',
  'SE': 'Sweden',
  'DK': 'Denmark'
};

class EurostatService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 30 * 60 * 1000; // 30 minutes
  }

  /**
   * Build Eurostat API URL with parameters
   */
  buildUrl(dataset, params = {}) {
    const url = new URL(EUROSTAT_BASE_URL);
    url.searchParams.append('dataset', dataset);
    
    // Add parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });
    
    return url.toString();
  }

  /**
   * Check if data is cached and still valid
   */
  isCacheValid(key) {
    const cached = this.cache.get(key);
    if (!cached) return false;
    
    const now = Date.now();
    return (now - cached.timestamp) < this.cacheTimeout;
  }

  /**
   * Get cached data
   */
  getCachedData(key) {
    const cached = this.cache.get(key);
    return cached ? cached.data : null;
  }

  /**
   * Cache data with timestamp
   */
  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Fetch data from Eurostat API
   */
  async fetchData(dataset, params = {}) {
    const cacheKey = `${dataset}_${JSON.stringify(params)}`;
    
    // Check cache first
    if (this.isCacheValid(cacheKey)) {
      return this.getCachedData(cacheKey);
    }

    try {
      const url = this.buildUrl(dataset, params);
      console.log('Fetching from Eurostat:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'ESEE-Portal/1.0',
          'Origin': 'http://localhost:5173'
        },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`Eurostat API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the result
      this.setCachedData(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Eurostat API fetch error:', error);
      // Return mock data if API fails (for development)
      return this.getMockData(dataset, params);
    }
  }

  /**
   * Get mock data for development when API is not available
   */
  getMockData(dataset, params) {
    const mockData = {
      value: {
        '0,0': 3.2, // Greece, latest month
        '1,0': 2.8, // Germany, latest month
        '2,0': 3.1, // France, latest month
        '3,0': 2.9, // Italy, latest month
        '4,0': 3.4  // Spain, latest month
      },
      dimension: {
        geo: {
          category: {
            index: { 'EL': 0, 'DE': 1, 'FR': 2, 'IT': 3, 'ES': 4 },
            label: { 'EL': 'Greece', 'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain' }
          }
        },
        time: {
          category: {
            index: { '2024-01': 0 },
            label: { '2024-01': '2024-01' }
          }
        }
      },
      label: {
        geo: { 'EL': 'Greece', 'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain' },
        time: { '2024-01': '2024-01' }
      }
    };

    return mockData;
  }

  /**
   * Get inflation data for EU countries
   */
  async getInflationData(countries = ['EL'], timeRange = '12') {
    const params = {
      format: 'json',
      lang: 'en',
      geo: countries.join(','),
      time: timeRange,
      coicop: 'CP00', // All items HICP
      unit: 'RCH_M', // Rate of change, monthly
      s_adj: 'NSA' // Not seasonally adjusted
    };

    return await this.fetchData(DATASETS.INFLATION, params);
  }

  /**
   * Get unemployment data
   */
  async getUnemploymentData(countries = ['EL'], timeRange = '12') {
    const params = {
      format: 'json',
      lang: 'en',
      geo: countries.join(','),
      time: timeRange,
      age: 'TOTAL', // All ages
      sex: 'T', // Total
      unit: 'PC_ACT', // Percentage of active population
      s_adj: 'SA' // Seasonally adjusted
    };

    return await this.fetchData(DATASETS.UNEMPLOYMENT, params);
  }

  /**
   * Get retail trade data
   */
  async getRetailTradeData(countries = ['EL'], timeRange = '12') {
    const params = {
      format: 'json',
      lang: 'en',
      geo: countries.join(','),
      time: timeRange,
      indic_bt: 'RT000', // Retail trade index
      unit: 'I15', // Index 2015=100
      s_adj: 'SA' // Seasonally adjusted
    };

    return await this.fetchData(DATASETS.RETAIL_TRADE, params);
  }

  /**
   * Get business confidence indicator
   */
  async getBusinessConfidenceData(countries = ['EL'], timeRange = '12') {
    const params = {
      format: 'json',
      lang: 'en',
      geo: countries.join(','),
      time: timeRange,
      s_adj: 'SA', // Seasonally adjusted
      unit: 'BAL' // Balance
    };

    return await this.fetchData(DATASETS.BUSINESS_CONFIDENCE, params);
  }

  /**
   * Get trade data (imports/exports)
   */
  async getTradeData(countries = ['EL'], timeRange = '12', tradeType = 'imports') {
    const params = {
      format: 'json',
      lang: 'en',
      geo: countries.join(','),
      time: timeRange,
      indic_et: tradeType === 'imports' ? 'M' : 'X', // M for imports, X for exports
      unit: 'MIO_EUR', // Million EUR
      s_adj: 'NSA' // Not seasonally adjusted
    };

    return await this.fetchData(DATASETS.IMPORTS, params);
  }

  /**
   * Get comparative data for multiple countries
   */
  async getComparativeData(indicator, countries = ['EL', 'DE', 'FR', 'IT'], timeRange = '12') {
    const indicatorMethods = {
      'inflation': () => this.getInflationData(countries, timeRange),
      'unemployment': () => this.getUnemploymentData(countries, timeRange),
      'retail_trade': () => this.getRetailTradeData(countries, timeRange),
      'business_confidence': () => this.getBusinessConfidenceData(countries, timeRange),
      'imports': () => this.getTradeData(countries, timeRange, 'imports'),
      'exports': () => this.getTradeData(countries, timeRange, 'exports')
    };

    if (!indicatorMethods[indicator]) {
      throw new Error(`Unknown indicator: ${indicator}`);
    }

    return await indicatorMethods[indicator]();
  }

  /**
   * Process Eurostat data for easier consumption
   */
  processData(rawData, indicator) {
    if (!rawData || !rawData.value) {
      return { error: 'No data available' };
    }

    const { value, dimension, label } = rawData;
    const processedData = [];

    // Extract time periods
    const timeLabels = label.time || {};
    const geoLabels = label.geo || {};

    // Process each data point
    Object.entries(value).forEach(([key, val]) => {
      const dimensions = key.split(',');
      const geo = dimensions[0];
      const time = dimensions[1];

      if (geoLabels[geo] && timeLabels[time] && val !== null) {
        processedData.push({
          country: geoLabels[geo],
          countryCode: geo,
          time: timeLabels[time],
          value: val,
          indicator: indicator
        });
      }
    });

    // Sort by time (most recent first)
    processedData.sort((a, b) => new Date(b.time) - new Date(a.time));

    return {
      data: processedData,
      metadata: {
        indicator,
        totalPoints: processedData.length,
        countries: [...new Set(processedData.map(d => d.country))],
        timeRange: {
          from: processedData[processedData.length - 1]?.time,
          to: processedData[0]?.time
        }
      }
    };
  }

  /**
   * Get business intelligence summary for Greece
   */
  async getBusinessIntelligenceSummary() {
    try {
      const [inflation, unemployment, retailTrade, businessConfidence] = await Promise.all([
        this.getInflationData(['EL'], '1'), // Last month
        this.getUnemploymentData(['EL'], '1'),
        this.getRetailTradeData(['EL'], '1'),
        this.getBusinessConfidenceData(['EL'], '1')
      ]);

      return {
        greece: {
          inflation: this.processData(inflation, 'inflation'),
          unemployment: this.processData(unemployment, 'unemployment'),
          retailTrade: this.processData(retailTrade, 'retail_trade'),
          businessConfidence: this.processData(businessConfidence, 'business_confidence')
        },
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching business intelligence summary:', error);
      return { error: error.message };
    }
  }

  /**
   * Get EU comparison data
   */
  async getEUComparison(indicator = 'inflation') {
    const euCountries = ['EL', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT'];
    
    try {
      const data = await this.getComparativeData(indicator, euCountries, '1');
      return this.processData(data, indicator);
    } catch (error) {
      console.error(`Error fetching EU comparison for ${indicator}:`, error);
      return { error: error.message };
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get available datasets
   */
  getAvailableDatasets() {
    return DATASETS;
  }

  /**
   * Get available countries
   */
  getAvailableCountries() {
    return COUNTRY_CODES;
  }
}

// Create singleton instance
const eurostatService = new EurostatService();

export default eurostatService;
export { DATASETS, COUNTRY_CODES };
