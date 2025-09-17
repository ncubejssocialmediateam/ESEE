/**
 * Member Statistics Service
 * Provides targeted statistical information for ESEE members based on their sector and region
 */

import eurostatProxy from '../utils/eurostatProxy';
import elstatService from './elstatService';

// ESEE member sectors mapping
const ESEE_SECTORS = {
  'retail': {
    name: 'Λιανικό Εμπόριο',
    indicators: ['retail_trade', 'cpi', 'unemployment', 'business_confidence'],
    description: 'Επιχειρήσεις λιανικού εμπορίου και καταναλωτικών αγαθών'
  },
  'wholesale': {
    name: 'Χονδρικό Εμπόριο',
    indicators: ['imports', 'exports', 'business_confidence', 'gdp_growth'],
    description: 'Επιχειρήσεις χονδρικού εμπορίου και διανομής'
  },
  'tourism': {
    name: 'Τουρισμός',
    indicators: ['tourism_arrivals', 'tourism_revenue', 'cpi', 'business_confidence'],
    description: 'Επιχειρήσεις τουριστικού κλάδου και υπηρεσιών'
  },
  'construction': {
    name: 'Οικοδομές',
    indicators: ['construction', 'gdp_growth', 'unemployment', 'business_confidence'],
    description: 'Επιχειρήσεις οικοδομικών έργων και ανακαινίσεων'
  },
  'manufacturing': {
    name: 'Βιομηχανία',
    indicators: ['industrial_production', 'exports', 'business_confidence', 'gdp_growth'],
    description: 'Επιχειρήσεις βιομηχανικής παραγωγής'
  },
  'services': {
    name: 'Υπηρεσίες',
    indicators: ['business_confidence', 'gdp_growth', 'unemployment', 'cpi'],
    description: 'Επιχειρήσεις υπηρεσιών και επαγγελματικών δραστηριοτήτων'
  },
  'food_beverage': {
    name: 'Τροφίμων & Ποτών',
    indicators: ['retail_trade', 'cpi', 'exports', 'business_confidence'],
    description: 'Επιχειρήσεις τροφίμων, ποτών και εστίασης'
  },
  'technology': {
    name: 'Τεχνολογία',
    indicators: ['business_confidence', 'gdp_growth', 'exports', 'unemployment'],
    description: 'Επιχειρήσεις τεχνολογίας και ψηφιακών υπηρεσιών'
  }
};

// Greek regions with economic characteristics
const REGION_CHARACTERISTICS = {
  'EL-A': {
    name: 'Αττική',
    characteristics: ['urban', 'services', 'tourism', 'technology'],
    description: 'Κέντρο οικονομικής δραστηριότητας και υπηρεσιών'
  },
  'EL-B': {
    name: 'Κεντρική Μακεδονία',
    characteristics: ['industrial', 'logistics', 'trade'],
    description: 'Βιομηχανικό κέντρο και λογιστικό κόμβος'
  },
  'EL-C': {
    name: 'Δυτική Μακεδονία',
    characteristics: ['energy', 'mining', 'agriculture'],
    description: 'Ενεργειακός και εξορυκτικός κλάδος'
  },
  'EL-D': {
    name: 'Ανατολική Μακεδονία και Θράκη',
    characteristics: ['agriculture', 'trade', 'logistics'],
    description: 'Γεωργία και εμπορικές δραστηριότητες'
  },
  'EL-E': {
    name: 'Θεσσαλία',
    characteristics: ['agriculture', 'tourism', 'services'],
    description: 'Γεωργία, τουρισμός και υπηρεσίες'
  },
  'EL-F': {
    name: 'Ήπειρος',
    characteristics: ['tourism', 'agriculture', 'services'],
    description: 'Τουρισμός και γεωργικές δραστηριότητες'
  },
  'EL-G': {
    name: 'Δυτική Ελλάδα',
    characteristics: ['tourism', 'agriculture', 'services'],
    description: 'Τουρισμός και γεωργικές δραστηριότητες'
  },
  'EL-H': {
    name: 'Στερεά Ελλάδα',
    characteristics: ['tourism', 'agriculture', 'services'],
    description: 'Τουρισμός και γεωργικές δραστηριότητες'
  },
  'EL-J': {
    name: 'Πελοπόννησος',
    characteristics: ['tourism', 'agriculture', 'services'],
    description: 'Τουρισμός και γεωργικές δραστηριότητες'
  },
  'EL-K': {
    name: 'Βόρειο Αιγαίο',
    characteristics: ['tourism', 'agriculture', 'services'],
    description: 'Τουρισμός και γεωργικές δραστηριότητες'
  },
  'EL-L': {
    name: 'Νότιο Αιγαίο',
    characteristics: ['tourism', 'services', 'trade'],
    description: 'Τουρισμός και εμπορικές δραστηριότητες'
  },
  'EL-M': {
    name: 'Κρήτη',
    characteristics: ['tourism', 'agriculture', 'services'],
    description: 'Τουρισμός, γεωργία και υπηρεσίες'
  }
};

class MemberStatisticsService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 30 * 60 * 1000; // 30 minutes
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
   * Get sector-specific statistics for a member
   */
  async getSectorStatistics(sector, timeRange = '12') {
    const cacheKey = `sector_${sector}_${timeRange}`;
    
    if (this.isCacheValid(cacheKey)) {
      return this.getCachedData(cacheKey);
    }

    try {
      const sectorInfo = ESEE_SECTORS[sector];
      if (!sectorInfo) {
        throw new Error(`Unknown sector: ${sector}`);
      }

      const promises = sectorInfo.indicators.map(async (indicator) => {
        try {
          // Try ELSTAT first for Greek-specific data
          const elstatData = await elstatService.getComparativeData(indicator, timeRange);
          const eurostatData = await eurostatProxy.getComparativeData(indicator, ['EL'], timeRange);
          
          return {
            indicator,
            elstat: elstatData,
            eurostat: eurostatData,
            source: 'elstat' // Prefer ELSTAT for Greek data
          };
        } catch (error) {
          console.warn(`Failed to fetch ${indicator} for sector ${sector}:`, error.message);
          return {
            indicator,
            error: error.message
          };
        }
      });

      const results = await Promise.all(promises);
      
      const sectorStatistics = {
        sector: sectorInfo,
        indicators: results,
        timeRange,
        lastUpdated: new Date().toISOString()
      };

      this.setCachedData(cacheKey, sectorStatistics);
      return sectorStatistics;
    } catch (error) {
      console.error('Error fetching sector statistics:', error);
      return { error: error.message };
    }
  }

  /**
   * Get regional statistics for a member
   */
  async getRegionalStatistics(region, timeRange = '12') {
    const cacheKey = `region_${region}_${timeRange}`;
    
    if (this.isCacheValid(cacheKey)) {
      return this.getCachedData(cacheKey);
    }

    try {
      const regionInfo = REGION_CHARACTERISTICS[region];
      if (!regionInfo) {
        throw new Error(`Unknown region: ${region}`);
      }

      // Get regional data from ELSTAT
      const regionalData = await elstatService.getRegionalData('cpi', [region], timeRange);
      
      const regionalStatistics = {
        region: regionInfo,
        data: regionalData,
        timeRange,
        lastUpdated: new Date().toISOString()
      };

      this.setCachedData(cacheKey, regionalStatistics);
      return regionalStatistics;
    } catch (error) {
      console.error('Error fetching regional statistics:', error);
      return { error: error.message };
    }
  }

  /**
   * Get comprehensive member dashboard data
   */
  async getMemberDashboard(memberProfile) {
    const { sector, region, interests = [] } = memberProfile;
    
    try {
      const promises = [];
      
      // Get sector-specific data
      if (sector) {
        promises.push(
          this.getSectorStatistics(sector, '12')
            .then(result => ({ type: 'sector', data: result }))
            .catch(error => ({ type: 'sector', error: error.message }))
        );
      }
      
      // Get regional data
      if (region) {
        promises.push(
          this.getRegionalStatistics(region, '12')
            .then(result => ({ type: 'region', data: result }))
            .catch(error => ({ type: 'region', error: error.message }))
        );
      }
      
      // Get general business intelligence
      promises.push(
        Promise.all([
          eurostatProxy.getBusinessIntelligenceSummary(),
          elstatService.getBusinessIntelligenceSummary()
        ]).then(([eurostat, elstat]) => ({
          type: 'general',
          data: { eurostat, elstat }
        })).catch(error => ({
          type: 'general',
          error: error.message
        }))
      );

      const results = await Promise.all(promises);
      
      const dashboard = {
        memberProfile,
        sector: results.find(r => r.type === 'sector'),
        region: results.find(r => r.type === 'region'),
        general: results.find(r => r.type === 'general'),
        lastUpdated: new Date().toISOString()
      };

      return dashboard;
    } catch (error) {
      console.error('Error fetching member dashboard:', error);
      return { error: error.message };
    }
  }

  /**
   * Get market insights for a specific sector
   */
  async getMarketInsights(sector, timeRange = '12') {
    try {
      const sectorInfo = ESEE_SECTORS[sector];
      if (!sectorInfo) {
        throw new Error(`Unknown sector: ${sector}`);
      }

      // Get relevant indicators for the sector
      const insights = await this.getSectorStatistics(sector, timeRange);
      
      // Add market analysis
      const analysis = this.analyzeMarketTrends(insights);
      
      return {
        sector: sectorInfo,
        insights,
        analysis,
        recommendations: this.generateRecommendations(sector, analysis),
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching market insights:', error);
      return { error: error.message };
    }
  }

  /**
   * Analyze market trends from statistics
   */
  analyzeMarketTrends(insights) {
    if (!insights || insights.error) {
      return { error: 'No data available for analysis' };
    }

    const analysis = {
      trends: {},
      outlook: 'neutral',
      keyFactors: []
    };

    // Analyze each indicator
    insights.indicators.forEach(indicator => {
      if (indicator.error) return;
      
      const data = indicator.elstat || indicator.eurostat;
      if (!data || !data.data || data.data.length === 0) return;
      
      const latest = data.data[0];
      const previous = data.data[1];
      
      if (latest && previous) {
        const change = latest.value - previous.value;
        const changePercent = (change / previous.value) * 100;
        
        analysis.trends[indicator.indicator] = {
          current: latest.value,
          change: change,
          changePercent: changePercent,
          trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
        };
      }
    });

    // Determine overall outlook
    const trends = Object.values(analysis.trends);
    const positiveTrends = trends.filter(t => t.trend === 'up').length;
    const negativeTrends = trends.filter(t => t.trend === 'down').length;
    
    if (positiveTrends > negativeTrends) {
      analysis.outlook = 'positive';
    } else if (negativeTrends > positiveTrends) {
      analysis.outlook = 'negative';
    }

    return analysis;
  }

  /**
   * Generate recommendations based on sector and analysis
   */
  generateRecommendations(sector, analysis) {
    const recommendations = [];
    
    if (analysis.error) {
      return ['Δεν είναι δυνατή η παραγωγή συστάσεων λόγω έλλειψης δεδομένων'];
    }

    // Sector-specific recommendations
    switch (sector) {
      case 'retail':
        if (analysis.trends.cpi && analysis.trends.cpi.trend === 'up') {
          recommendations.push('Παρακολούθηση τιμών και προσαρμογή στρατηγικής τιμολόγησης');
        }
        if (analysis.trends.retail_trade && analysis.trends.retail_trade.trend === 'up') {
          recommendations.push('Επέκταση δραστηριοτήτων λόγω θετικής τάσης λιανικού εμπορίου');
        }
        break;
        
      case 'tourism':
        if (analysis.trends.tourism_arrivals && analysis.trends.tourism_arrivals.trend === 'up') {
          recommendations.push('Προετοιμασία για αύξηση τουριστικής κίνησης');
        }
        if (analysis.trends.business_confidence && analysis.trends.business_confidence.trend === 'up') {
          recommendations.push('Επένδυση σε νέες τουριστικές υπηρεσίες');
        }
        break;
        
      case 'construction':
        if (analysis.trends.gdp_growth && analysis.trends.gdp_growth.trend === 'up') {
          recommendations.push('Επέκταση σε νέα οικοδομικά έργα');
        }
        if (analysis.trends.unemployment && analysis.trends.unemployment.trend === 'down') {
          recommendations.push('Προσέλκυση ειδικευμένου προσωπικού');
        }
        break;
        
      default:
        if (analysis.outlook === 'positive') {
          recommendations.push('Συνέχιση της τρέχουσας στρατηγικής');
        } else if (analysis.outlook === 'negative') {
          recommendations.push('Αναθεώρηση και προσαρμογή επιχειρηματικής στρατηγικής');
        }
    }

    // General recommendations
    if (analysis.trends.business_confidence && analysis.trends.business_confidence.trend === 'up') {
      recommendations.push('Επένδυση σε νέες δραστηριότητες');
    }
    
    if (analysis.trends.unemployment && analysis.trends.unemployment.trend === 'down') {
      recommendations.push('Προσέλκυση και διατήρηση ταλέντων');
    }

    return recommendations.length > 0 ? recommendations : ['Συνεχής παρακολούθηση των αγορών και των τάσεων'];
  }

  /**
   * Get available sectors
   */
  getAvailableSectors() {
    return ESEE_SECTORS;
  }

  /**
   * Get available regions
   */
  getAvailableRegions() {
    return REGION_CHARACTERISTICS;
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }
}

// Create singleton instance
const memberStatisticsService = new MemberStatisticsService();

export default memberStatisticsService;
export { ESEE_SECTORS, REGION_CHARACTERISTICS };
