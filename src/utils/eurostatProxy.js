/**
 * Eurostat Proxy Utility
 * Handles Eurostat API calls with proper error handling and fallback to mock data
 */

const EUROSTAT_API_BASE = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data';

/**
 * Make a request to Eurostat API with CORS handling
 */
export const fetchEurostatData = async (dataset, params = {}) => {
  try {
    // Build URL
    const url = new URL(EUROSTAT_API_BASE);
    url.searchParams.append('dataset', dataset);
    
    // Add parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });

    console.log('Fetching from Eurostat:', url.toString());

    // Try to fetch with CORS
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ESEE-Portal/1.0'
      },
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
    
  } catch (error) {
    console.error('Eurostat API failed:', error.message);
    throw error;
  }
};


/**
 * Process Eurostat data for easier consumption
 */
export const processEurostatData = (rawData, indicator) => {
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
};

/**
 * Get inflation data
 */
export const getInflationData = async (countries = ['EL'], timeRange = '12') => {
  const params = {
    format: 'json',
    lang: 'en',
    geo: countries.join(','),
    time: timeRange,
    coicop: 'CP00', // All items HICP
    unit: 'RCH_M', // Rate of change, monthly
    s_adj: 'NSA' // Not seasonally adjusted
  };

  const result = await fetchEurostatData('prc_hicp_midx', params);
  return processEurostatData(result.data, 'inflation');
};

/**
 * Get unemployment data
 */
export const getUnemploymentData = async (countries = ['EL'], timeRange = '12') => {
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

  const result = await fetchEurostatData('une_rt_m', params);
  return processEurostatData(result.data, 'unemployment');
};

/**
 * Get retail trade data
 */
export const getRetailTradeData = async (countries = ['EL'], timeRange = '12') => {
  const params = {
    format: 'json',
    lang: 'en',
    geo: countries.join(','),
    time: timeRange,
    indic_bt: 'RT000', // Retail trade index
    unit: 'I15', // Index 2015=100
    s_adj: 'SA' // Seasonally adjusted
  };

  const result = await fetchEurostatData('sts_trtu_m', params);
  return processEurostatData(result.data, 'retail_trade');
};

/**
 * Get business confidence data
 */
export const getBusinessConfidenceData = async (countries = ['EL'], timeRange = '12') => {
  const params = {
    format: 'json',
    lang: 'en',
    geo: countries.join(','),
    time: timeRange,
    s_adj: 'SA', // Seasonally adjusted
    unit: 'BAL' // Balance
  };

  const result = await fetchEurostatData('ei_bsci_m_r2', params);
  return processEurostatData(result.data, 'business_confidence');
};

/**
 * Get trade data (imports/exports)
 */
export const getTradeData = async (countries = ['EL'], timeRange = '12', tradeType = 'imports') => {
  const params = {
    format: 'json',
    lang: 'en',
    geo: countries.join(','),
    time: timeRange,
    indic_et: tradeType === 'imports' ? 'M' : 'X', // M for imports, X for exports
    unit: 'MIO_EUR', // Million EUR
    s_adj: 'NSA' // Not seasonally adjusted
  };

  const result = await fetchEurostatData('bop_its6_det', params);
  return processEurostatData(result.data, tradeType);
};

/**
 * Get comparative data for multiple countries
 */
export const getComparativeData = async (indicator, countries = ['EL', 'DE', 'FR', 'IT'], timeRange = '12') => {
  const indicatorMethods = {
    'inflation': () => getInflationData(countries, timeRange),
    'unemployment': () => getUnemploymentData(countries, timeRange),
    'retail_trade': () => getRetailTradeData(countries, timeRange),
    'business_confidence': () => getBusinessConfidenceData(countries, timeRange),
    'imports': () => getTradeData(countries, timeRange, 'imports'),
    'exports': () => getTradeData(countries, timeRange, 'exports')
  };

  if (!indicatorMethods[indicator]) {
    throw new Error(`Unknown indicator: ${indicator}`);
  }

  return await indicatorMethods[indicator]();
};

/**
 * Get business intelligence summary for Greece
 */
export const getBusinessIntelligenceSummary = async () => {
  try {
    const [inflation, unemployment, retailTrade, businessConfidence] = await Promise.all([
      getInflationData(['EL'], '1'), // Last month
      getUnemploymentData(['EL'], '1'),
      getRetailTradeData(['EL'], '1'),
      getBusinessConfidenceData(['EL'], '1')
    ]);

    return {
      greece: {
        inflation,
        unemployment,
        retail_trade: retailTrade,
        business_confidence: businessConfidence
      },
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching business intelligence summary:', error);
    return { error: error.message };
  }
};

export default {
  fetchEurostatData,
  processEurostatData,
  getInflationData,
  getUnemploymentData,
  getRetailTradeData,
  getBusinessConfidenceData,
  getTradeData,
  getComparativeData,
  getBusinessIntelligenceSummary
};
