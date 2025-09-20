/**
 * ELSTAT API Service
 * Provides access to Greek statistical data from ELSTAT (Hellenic Statistical Authority)
 * Supports both direct API calls and SDMX protocol for data exchange
 */

// ELSTAT API endpoints and configuration
const ELSTAT_CONFIG = {
  // Base URLs for different data sources
  BASE_URL: 'https://www.statistics.gr',
  API_BASE: 'https://www.statistics.gr/api',
  SDMX_BASE: 'https://www.statistics.gr/sdmx',
  
  // Data dissemination endpoints
  DATA_DISSEMINATION: '/provision-of-statistical-data',
  WEB_SERVICES: '/web-services',
  
  // Contact information
  CONTACT: {
    email: 'data.dissem@statistics.gr',
    phone: '213-135-2022',
    address: 'Πειραιώς 46 και Επονιτών, 185 10 Πειραιάς'
  }
};

// Common ELSTAT datasets for business intelligence
const ELSTAT_DATASETS = {
  // Economic indicators
  CONSUMER_PRICE_INDEX: 'cpi', // Consumer Price Index
  RETAIL_TRADE_TURNOVER: 'retail_trade', // Retail Trade Turnover
  INDUSTRIAL_PRODUCTION: 'industrial_production', // Industrial Production Index
  BUSINESS_CONFIDENCE: 'business_confidence', // Business Confidence Indicator
  
  // Trade data
  IMPORTS: 'imports', // Imports of goods
  EXPORTS: 'exports', // Exports of goods
  TRADE_BALANCE: 'trade_balance', // Trade balance
  
  // Employment
  UNEMPLOYMENT_RATE: 'unemployment', // Unemployment rate
  EMPLOYMENT_RATE: 'employment', // Employment rate
  LABOUR_COST_INDEX: 'labour_cost', // Labour cost index
  
  // GDP and National Accounts
  GDP: 'gdp', // Gross Domestic Product
  GDP_GROWTH: 'gdp_growth', // GDP growth rate
  NATIONAL_ACCOUNTS: 'national_accounts', // National accounts data
  
  // Tourism
  TOURISM_ARRIVALS: 'tourism_arrivals', // Tourism arrivals
  TOURISM_REVENUE: 'tourism_revenue', // Tourism revenue
  
  // Construction
  CONSTRUCTION_INDEX: 'construction', // Construction activity index
  BUILDING_PERMITS: 'building_permits', // Building permits issued
  
  // Energy
  ENERGY_CONSUMPTION: 'energy_consumption', // Energy consumption
  RENEWABLE_ENERGY: 'renewable_energy', // Renewable energy share
};

// Greek regions and areas
const GREEK_REGIONS = {
  'EL': 'Ελλάδα',
  'EL-A': 'Αττική',
  'EL-B': 'Κεντρική Μακεδονία',
  'EL-C': 'Δυτική Μακεδονία',
  'EL-D': 'Ανατολική Μακεδονία και Θράκη',
  'EL-E': 'Θεσσαλία',
  'EL-F': 'Ήπειρος',
  'EL-G': 'Δυτική Ελλάδα',
  'EL-H': 'Στερεά Ελλάδα',
  'EL-I': 'Αττική',
  'EL-J': 'Πελοπόννησος',
  'EL-K': 'Βόρειο Αιγαίο',
  'EL-L': 'Νότιο Αιγαίο',
  'EL-M': 'Κρήτη'
};

class ElstatService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 60 * 60 * 1000; // 1 hour (ELSTAT data updates less frequently)
    this.retryAttempts = 3;
    this.retryDelay = 1000; // 1 second
  }

  /**
   * Build ELSTAT API URL with parameters
   */
  buildUrl(endpoint, params = {}) {
    const url = new URL(`${ELSTAT_CONFIG.API_BASE}${endpoint}`);
    
    // Add parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, value);
      }
    });
    
    return url.toString();
  }

  /**
   * Build SDMX URL for data exchange
   */
  buildSDMXUrl(dataset, params = {}) {
    const url = new URL(`${ELSTAT_CONFIG.SDMX_BASE}/data/${dataset}`);
    
    // Add SDMX parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
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
   * Make HTTP request with retry logic
   */
  async makeRequest(url, options = {}, attempt = 1) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, application/xml, text/xml',
          'User-Agent': 'ESEE-Portal/1.0',
          'Accept-Language': 'el-GR,el;q=0.9,en;q=0.8',
          ...options.headers
        },
        mode: 'cors',
        ...options
      });

      if (!response.ok) {
        throw new Error(`ELSTAT API error: ${response.status} ${response.statusText}`);
      }

      // Try to parse as JSON first, fallback to XML for SDMX
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else if (contentType && contentType.includes('xml')) {
        const text = await response.text();
        return this.parseSDMXData(text);
      } else {
        return await response.text();
      }
    } catch (error) {
      if (attempt < this.retryAttempts) {
        console.warn(`ELSTAT API attempt ${attempt} failed, retrying...`, error.message);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        return this.makeRequest(url, options, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Parse SDMX XML data to JSON format
   */
  parseSDMXData(xmlText) {
    // This is a simplified SDMX parser
    // In a real implementation, you would use a proper XML parser
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      // Extract data from SDMX structure
      const data = {
        value: {},
        dimension: {},
        label: {}
      };

      // Parse observations
      const observations = xmlDoc.getElementsByTagName('Obs');
      for (let obs of observations) {
        const key = obs.getAttribute('DIM_AT_OBS') || '0';
        const value = parseFloat(obs.getAttribute('OBS_VALUE')) || null;
        data.value[key] = value;
      }

      // Parse dimensions
      const dimensions = xmlDoc.getElementsByTagName('Dimension');
      for (let dim of dimensions) {
        const id = dim.getAttribute('id');
        const values = dim.getElementsByTagName('Value');
        data.dimension[id] = {
          category: {
            index: {},
            label: {}
          }
        };
        
        values.forEach((value, index) => {
          const code = value.getAttribute('id');
          const label = value.getAttribute('label') || code;
          data.dimension[id].category.index[code] = index;
          data.dimension[id].category.label[code] = label;
        });
      }

      return data;
    } catch (error) {
      console.error('Error parsing SDMX data:', error);
      return { error: 'Failed to parse SDMX data' };
    }
  }

  /**
   * Fetch data from ELSTAT API
   */
  async fetchData(dataset, params = {}) {
    const cacheKey = `${dataset}_${JSON.stringify(params)}`;
    
    // Check cache first
    if (this.isCacheValid(cacheKey)) {
      return this.getCachedData(cacheKey);
    }

    try {
      // Try direct API first
      const url = this.buildUrl(`/data/${dataset}`, params);
      console.log('Fetching from ELSTAT:', url);
      
      const data = await this.makeRequest(url);
      
      // Cache the result
      this.setCachedData(cacheKey, data);
      
      return data;
    } catch (error) {
      console.warn('ELSTAT direct API failed, trying SDMX:', error.message);
      
      try {
        // Fallback to SDMX
        const sdmxUrl = this.buildSDMXUrl(dataset, params);
        const data = await this.makeRequest(sdmxUrl);
        
        // Cache the result
        this.setCachedData(cacheKey, data);
        
        return data;
      } catch (sdmxError) {
        console.error('ELSTAT SDMX also failed:', sdmxError.message);
        throw sdmxError;
      }
    }
  }


  /**
   * Get Consumer Price Index data
   */
  async getConsumerPriceIndex(timeRange = '12') {
    const params = {
      format: 'json',
      lang: 'el',
      geo: 'EL',
      time: timeRange,
      coicop: 'CP00', // All items
      unit: 'RCH_M', // Rate of change, monthly
      s_adj: 'NSA' // Not seasonally adjusted
    };

    return await this.fetchData(ELSTAT_DATASETS.CONSUMER_PRICE_INDEX, params);
  }

  /**
   * Get unemployment rate data
   */
  async getUnemploymentRate(timeRange = '12') {
    const params = {
      format: 'json',
      lang: 'el',
      geo: 'EL',
      time: timeRange,
      age: 'TOTAL', // All ages
      sex: 'T', // Total
      unit: 'PC_ACT', // Percentage of active population
      s_adj: 'SA' // Seasonally adjusted
    };

    return await this.fetchData(ELSTAT_DATASETS.UNEMPLOYMENT_RATE, params);
  }

  /**
   * Get retail trade turnover data
   */
  async getRetailTradeTurnover(timeRange = '12') {
    const params = {
      format: 'json',
      lang: 'el',
      geo: 'EL',
      time: timeRange,
      indic_bt: 'RT000', // Retail trade index
      unit: 'I15', // Index 2015=100
      s_adj: 'SA' // Seasonally adjusted
    };

    return await this.fetchData(ELSTAT_DATASETS.RETAIL_TRADE_TURNOVER, params);
  }

  /**
   * Get business confidence indicator
   */
  async getBusinessConfidence(timeRange = '12') {
    const params = {
      format: 'json',
      lang: 'el',
      geo: 'EL',
      time: timeRange,
      s_adj: 'SA', // Seasonally adjusted
      unit: 'BAL' // Balance
    };

    return await this.fetchData(ELSTAT_DATASETS.BUSINESS_CONFIDENCE, params);
  }

  /**
   * Get GDP growth data
   */
  async getGDPGrowth(timeRange = '12') {
    const params = {
      format: 'json',
      lang: 'el',
      geo: 'EL',
      time: timeRange,
      unit: 'RCH_M', // Rate of change, monthly
      s_adj: 'SA' // Seasonally adjusted
    };

    return await this.fetchData(ELSTAT_DATASETS.GDP_GROWTH, params);
  }

  /**
   * Get trade data (imports/exports)
   */
  async getTradeData(tradeType = 'imports', timeRange = '12') {
    const dataset = tradeType === 'imports' ? ELSTAT_DATASETS.IMPORTS : ELSTAT_DATASETS.EXPORTS;
    const params = {
      format: 'json',
      lang: 'el',
      geo: 'EL',
      time: timeRange,
      indic_et: tradeType === 'imports' ? 'M' : 'X', // M for imports, X for exports
      unit: 'MIO_EUR', // Million EUR
      s_adj: 'NSA' // Not seasonally adjusted
    };

    return await this.fetchData(dataset, params);
  }

  /**
   * Get tourism data
   */
  async getTourismData(dataType = 'arrivals', timeRange = '12') {
    const dataset = dataType === 'arrivals' ? ELSTAT_DATASETS.TOURISM_ARRIVALS : ELSTAT_DATASETS.TOURISM_REVENUE;
    const params = {
      format: 'json',
      lang: 'el',
      geo: 'EL',
      time: timeRange,
      unit: dataType === 'arrivals' ? 'THS_PER' : 'MIO_EUR'
    };

    return await this.fetchData(dataset, params);
  }

  /**
   * Get comparative data for multiple indicators
   */
  async getComparativeData(indicator, timeRange = '12') {
    const indicatorMethods = {
      'cpi': () => this.getConsumerPriceIndex(timeRange),
      'unemployment': () => this.getUnemploymentRate(timeRange),
      'retail_trade': () => this.getRetailTradeTurnover(timeRange),
      'business_confidence': () => this.getBusinessConfidence(timeRange),
      'gdp_growth': () => this.getGDPGrowth(timeRange),
      'imports': () => this.getTradeData('imports', timeRange),
      'exports': () => this.getTradeData('exports', timeRange),
      'tourism_arrivals': () => this.getTourismData('arrivals', timeRange),
      'tourism_revenue': () => this.getTourismData('revenue', timeRange)
    };

    if (!indicatorMethods[indicator]) {
      throw new Error(`Unknown indicator: ${indicator}`);
    }

    return await indicatorMethods[indicator]();
  }

  /**
   * Process ELSTAT data for easier consumption
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
      const [cpi, unemployment, retailTrade, businessConfidence, gdpGrowth] = await Promise.all([
        this.getConsumerPriceIndex('1'), // Last month
        this.getUnemploymentRate('1'),
        this.getRetailTradeTurnover('1'),
        this.getBusinessConfidence('1'),
        this.getGDPGrowth('1')
      ]);

      return {
        greece: {
          cpi: this.processData(cpi, 'cpi'),
          unemployment: this.processData(unemployment, 'unemployment'),
          retailTrade: this.processData(retailTrade, 'retail_trade'),
          businessConfidence: this.processData(businessConfidence, 'business_confidence'),
          gdpGrowth: this.processData(gdpGrowth, 'gdp_growth')
        },
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching business intelligence summary:', error);
      return { error: error.message };
    }
  }

  /**
   * Get sector-specific data for ESEE members
   */
  async getSectorData(sector, timeRange = '12') {
    const sectorMappings = {
      'retail': () => this.getRetailTradeTurnover(timeRange),
      'tourism': () => this.getTourismData('arrivals', timeRange),
      'construction': () => this.fetchData(ELSTAT_DATASETS.CONSTRUCTION_INDEX, { time: timeRange }),
      'manufacturing': () => this.fetchData(ELSTAT_DATASETS.INDUSTRIAL_PRODUCTION, { time: timeRange }),
      'trade': () => this.getTradeData('imports', timeRange)
    };

    if (!sectorMappings[sector]) {
      throw new Error(`Unknown sector: ${sector}`);
    }

    return await sectorMappings[sector]();
  }

  /**
   * Get regional data for specific Greek regions
   */
  async getRegionalData(indicator, regions = ['EL'], timeRange = '12') {
    const params = {
      format: 'json',
      lang: 'el',
      geo: regions.join(','),
      time: timeRange
    };

    return await this.fetchData(indicator, params);
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
    return ELSTAT_DATASETS;
  }

  /**
   * Get available regions
   */
  getAvailableRegions() {
    return GREEK_REGIONS;
  }

  /**
   * Get ELSTAT contact information
   */
  getContactInfo() {
    return ELSTAT_CONFIG.CONTACT;
  }
}

// Create singleton instance
const elstatService = new ElstatService();

export default elstatService;
export { ELSTAT_DATASETS, GREEK_REGIONS, ELSTAT_CONFIG };
