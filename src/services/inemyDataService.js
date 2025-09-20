/**
 * Service for parsing and managing INEMY trade data from CSV
 */
class InemyDataService {
  constructor() {
    this.rawData = null;
    this.parsedData = null;
    this.lastUpdated = null;
  }

  /**
   * Parse CSV data and extract structured information
   * @param {string} csvContent - Raw CSV content
   * @returns {Object} - Parsed data structure
   */
  parseCSVData(csvContent) {
    try {
      const lines = csvContent.split('\n');
      const data = {
        businesses: [],
        turnover: [],
        employees: [],
        employers: [],
        gva: [],
        womenEmployment: []
      };

      // Parse businesses data (lines 6-7)
      const businessData = this.parseBusinessData(lines);
      data.businesses = businessData;

      // Parse turnover data (lines 13-14)
      const turnoverData = this.parseTurnoverData(lines);
      data.turnover = turnoverData;

      // Parse employees data (lines 20-21)
      const employeeData = this.parseEmployeeData(lines);
      data.employees = employeeData;

      // Parse employers data (lines 26-27)
      const employerData = this.parseEmployerData(lines);
      data.employers = employerData;

      // Parse GVA data (lines 32-33)
      const gvaData = this.parseGVAData(lines);
      data.gva = gvaData;

      // Parse women employment data (lines 37-38)
      const womenData = this.parseWomenEmploymentData(lines);
      data.womenEmployment = womenData;

      this.parsedData = data;
      this.lastUpdated = new Date();
      
      return data;
    } catch (error) {
      console.error('Error parsing CSV data:', error);
      throw new Error(`Failed to parse CSV data: ${error.message}`);
    }
  }

  /**
   * Parse business count data
   */
  parseBusinessData(lines) {
    const tradeLine = lines[5]; // Εμπόριο line
    const economyLine = lines[6]; // Σύνολο οικονομίας line
    
    const tradeData = this.extractYearlyData(tradeLine, [2, 3, 4, 5, 6, 7]); // 2017-2022
    const economyData = this.extractYearlyData(economyLine, [2, 3, 4, 5, 6, 7]);
    
    return {
      trade: tradeData,
      economy: economyData,
      years: ['2017', '2018', '2019', '2020', '2021', '2022']
    };
  }

  /**
   * Parse turnover data
   */
  parseTurnoverData(lines) {
    const tradeLine = lines[12]; // Εμπόριο line
    const economyLine = lines[13]; // Σύνολο Οικονομίας line
    
    const tradeData = this.extractYearlyData(tradeLine, [2, 3, 4, 5, 6, 7]); // 2019-2024
    const economyData = this.extractYearlyData(economyLine, [2, 3, 4, 5, 6, 7]);
    
    return {
      trade: tradeData,
      economy: economyData,
      years: ['2019', '2020', '2021', '2022', '2023', '2024']
    };
  }

  /**
   * Parse employee data
   */
  parseEmployeeData(lines) {
    const tradeLine = lines[19]; // Εμπόριο line
    const economyLine = lines[20]; // Σύνολο Οικονομίας line
    
    const tradeData = this.extractYearlyData(tradeLine, [2, 3, 4, 5, 6, 7]); // 2020-2025
    const economyData = this.extractYearlyData(economyLine, [2, 3, 4, 5, 6, 7]);
    
    return {
      trade: tradeData,
      economy: economyData,
      years: ['2020', '2021', '2022', '2023', '2024', '2025']
    };
  }

  /**
   * Parse employer data
   */
  parseEmployerData(lines) {
    const tradeLine = lines[25]; // Εμπόριο line
    const economyLine = lines[26]; // Σύνολο Οικονομίας line
    
    const tradeData = this.extractYearlyData(tradeLine, [2, 3, 4, 5, 6, 7]); // 2020-2025
    const economyData = this.extractYearlyData(economyLine, [2, 3, 4, 5, 6, 7]);
    
    return {
      trade: tradeData,
      economy: economyData,
      years: ['2020', '2021', '2022', '2023', '2024', '2025']
    };
  }

  /**
   * Parse GVA data
   */
  parseGVAData(lines) {
    const tradeLine = lines[31]; // Εμπόριο line
    const economyLine = lines[32]; // Σύνολο Οικονομίας line
    
    const tradeData = this.extractYearlyData(tradeLine, [2, 3, 4, 5, 6, 7]); // 2018-2023
    const economyData = this.extractYearlyData(economyLine, [2, 3, 4, 5, 6, 7]);
    
    return {
      trade: tradeData,
      economy: economyData,
      years: ['2018', '2019', '2020', '2021', '2022', '2023']
    };
  }

  /**
   * Parse women employment data
   */
  parseWomenEmploymentData(lines) {
    const retailLine = lines[36]; // ΛΙΑΝΙΚΟ Εμπόριο line
    const economyLine = lines[37]; // Σύνολο Οικονομίας line
    
    const retailData = this.extractYearlyData(retailLine, [1, 2, 3, 4, 5, 6]); // 2019-2024
    const economyData = this.extractYearlyData(economyLine, [1, 2, 3, 4, 5, 6]);
    
    return {
      retail: retailData,
      economy: economyData,
      years: ['2019', '2020', '2021', '2022', '2023', '2024']
    };
  }

  /**
   * Extract yearly data from a CSV line
   */
  extractYearlyData(line, columnIndices) {
    if (!line) return [];
    
    const columns = line.split(',');
    return columnIndices.map(index => {
      const value = columns[index]?.trim();
      if (!value) return null;
      
      // Remove quotes and convert to number
      const cleanValue = value.replace(/"/g, '').replace(/,/g, '');
      
      // Handle percentage values
      if (cleanValue.includes('%')) {
        return parseFloat(cleanValue.replace('%', ''));
      }
      
      // Handle numeric values
      const numValue = parseFloat(cleanValue);
      return isNaN(numValue) ? null : numValue;
    });
  }

  /**
   * Get chart data for visualization
   */
  getChartData(dataType = 'turnover') {
    if (!this.parsedData) {
      throw new Error('No data available. Please load CSV data first.');
    }

    const data = this.parsedData[dataType];
    if (!data) {
      throw new Error(`Data type '${dataType}' not found.`);
    }

    return data.years.map((year, index) => ({
      year,
      trade: data.trade[index] || 0,
      economy: data.economy[index] || 0,
      retail: data.retail ? data.retail[index] || 0 : null
    }));
  }

  /**
   * Get summary statistics
   */
  getSummaryStats() {
    if (!this.parsedData) {
      throw new Error('No data available. Please load CSV data first.');
    }

    const latestBusinesses = this.parsedData.businesses.trade[this.parsedData.businesses.trade.length - 1];
    const latestTurnover = this.parsedData.turnover.trade[this.parsedData.turnover.trade.length - 1];
    const latestEmployees = this.parsedData.employees.trade[this.parsedData.employees.trade.length - 1];
    const latestEmployers = this.parsedData.employers.trade[this.parsedData.employers.trade.length - 1];
    const latestGVA = this.parsedData.gva.trade[this.parsedData.gva.trade.length - 1];
    const latestWomenEmployment = this.parsedData.womenEmployment.retail[this.parsedData.womenEmployment.retail.length - 1];

    return {
      businesses: {
        count: latestBusinesses,
        percentage: 24.2, // From CSV note
        label: 'Εμπορικές Επιχειρήσεις'
      },
      turnover: {
        amount: latestTurnover,
        percentage: 37.1, // From CSV note
        label: 'Κύκλος Εργασιών (χιλ. €)'
      },
      employees: {
        count: latestEmployees,
        percentage: 17.3, // From CSV note
        label: 'Απασχολούμενοι (χιλ.)'
      },
      employers: {
        count: latestEmployers,
        percentage: 27.3, // From CSV note
        label: 'Εργοδότες (χιλ.)'
      },
      gva: {
        amount: latestGVA,
        percentage: 11.6, // From CSV note
        label: 'Ακαθάριστη Προστιθέμενη Αξία (εκ. €)'
      },
      womenEmployment: {
        percentage: latestWomenEmployment,
        label: 'Μερίδιο Γυναικών (%)'
      }
    };
  }

  /**
   * Format numbers for display
   */
  formatNumber(value, type = 'number') {
    if (value === null || value === undefined) return 'N/A';
    
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('el-GR', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'thousands':
        return new Intl.NumberFormat('el-GR').format(value);
      default:
        return new Intl.NumberFormat('el-GR').format(value);
    }
  }

  /**
   * Get data metadata
   */
  getDataInfo() {
    return {
      lastUpdated: this.lastUpdated,
      hasData: !!this.parsedData,
      dataTypes: this.parsedData ? Object.keys(this.parsedData) : []
    };
  }
}

// Create and export a singleton instance
const inemyDataService = new InemyDataService();
export default inemyDataService;
