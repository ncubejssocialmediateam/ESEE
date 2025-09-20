import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BarChart3, Building2, Euro, UserCheck, Percent, Users, TrendingUp, Award } from 'lucide-react';
import PropTypes from 'prop-types';

const StatisticsSection = ({ isDark }) => {
  const [activeStatCategory, setActiveStatCategory] = useState('businesses');

  // INEMY Statistics Data - Same as InemyKaele page
  const statisticsData = {
    businesses: {
      title: "Αριθμός Επιχειρήσεων",
      icon: <Building2 className="w-6 h-6" />,
      trade: [
        { year: 2017, value: 234733, change: null },
        { year: 2018, value: 227461, change: -7272 },
        { year: 2019, value: 230782, change: 3321 },
        { year: 2020, value: 224729, change: -6053 },
        { year: 2021, value: 227192, change: 2463 },
        { year: 2022, value: 228725, change: 1533 }
      ],
      total: [
        { year: 2017, value: 886738, change: null },
        { year: 2018, value: 870493, change: -16245 },
        { year: 2019, value: 890361, change: 19868 },
        { year: 2020, value: 873506, change: -16855 },
        { year: 2021, value: 909474, change: 35968 },
        { year: 2022, value: 946926, change: 37452 }
      ],
      unit: "επιχειρήσεις",
      insight: "Το εμπόριο αντιπροσωπεύει το 24.2% όλων των επιχειρήσεων στην οικονομία"
    },
    turnover: {
      title: "Κύκλος Εργασιών",
      icon: <Euro className="w-6 h-6" />,
      trade: [
        { year: 2019, value: 123998009, change: null },
        { year: 2020, value: 118408288, change: -5589721 },
        { year: 2021, value: 139829511, change: 21421223 },
        { year: 2022, value: 171698358, change: 31868847 },
        { year: 2023, value: 176395470, change: 4697112 },
        { year: 2024, value: 179531084, change: 3135614 }
      ],
      total: [
        { year: 2019, value: 310289265, change: null },
        { year: 2020, value: 279688050, change: -30601215 },
        { year: 2021, value: 341965556, change: 62277506 },
        { year: 2022, value: 472517899, change: 130552343 },
        { year: 2023, value: 465241177, change: -7276722 },
        { year: 2024, value: 484461030, change: 19219853 }
      ],
      unit: "χιλιάδες €",
      insight: "Ο κύκλος εργασιών του εμπορίου αντιπροσωπεύει το 37.1% του συνολικού κύκλου εργασιών της οικονομίας"
    },
    employees: {
      title: "Αριθμός Απασχολουμένων",
      icon: <Users className="w-6 h-6" />,
      trade: [
        { year: 2020, value: 704.7, change: null },
        { year: 2021, value: 700.2, change: -4.5 },
        { year: 2022, value: 724.4, change: 24.2 },
        { year: 2023, value: 699.3, change: -25.1 },
        { year: 2024, value: 706.3, change: 7.0 },
        { year: 2025, value: 759.9, change: 53.6 }
      ],
      total: [
        { year: 2020, value: 3844.0, change: null },
        { year: 2021, value: 3915.3, change: 71.3 },
        { year: 2022, value: 4167.2, change: 251.9 },
        { year: 2023, value: 4236.5, change: 69.3 },
        { year: 2024, value: 4327.8, change: 91.3 },
        { year: 2025, value: 4386.8, change: 59.0 }
      ],
      unit: "χιλιάδες άτομα",
      insight: "Το εμπόριο είναι ο μεγαλύτερος εργοδότης στη χώρα, αντιπροσωπεύοντας το 17.3% της συνολικής απασχόλησης"
    },
    employers: {
      title: "Εργοδότες",
      icon: <UserCheck className="w-6 h-6" />,
      trade: [
        { year: 2020, value: 80.2, change: null },
        { year: 2021, value: 93.4, change: 13.2 },
        { year: 2022, value: 90.6, change: -2.8 },
        { year: 2023, value: 79.3, change: -11.3 },
        { year: 2024, value: 86.2, change: 6.9 },
        { year: 2025, value: 87.0, change: 0.8 }
      ],
      total: [
        { year: 2020, value: 288.8, change: null },
        { year: 2021, value: 312.5, change: 23.7 },
        { year: 2022, value: 313.0, change: 0.5 },
        { year: 2023, value: 304.8, change: -8.2 },
        { year: 2024, value: 325.0, change: 20.2 },
        { year: 2025, value: 318.8, change: -6.2 }
      ],
      unit: "χιλιάδες άτομα",
      insight: "Το 27.3% όλων των εργοδοτών στην οικονομία λειτουργεί στο εμπόριο"
    },
    gva: {
      title: "Ακαθάριστη Προστιθέμενη Αξία",
      icon: <BarChart3 className="w-6 h-6" />,
      trade: [
        { year: 2018, value: 19773, change: null },
        { year: 2019, value: 18882, change: -891 },
        { year: 2020, value: 17384, change: -1498 },
        { year: 2021, value: 19138, change: 1754 },
        { year: 2022, value: 22400, change: 3262 },
        { year: 2023, value: 22756, change: 356 }
      ],
      total: [
        { year: 2018, value: 156635, change: null },
        { year: 2019, value: 160733, change: 4098 },
        { year: 2020, value: 147236, change: -13497 },
        { year: 2021, value: 161015, change: 13779 },
        { year: 2022, value: 183409, change: 22394 },
        { year: 2023, value: 196528, change: 13119 }
      ],
      unit: "εκατομμύρια €",
      insight: "Το εμπόριο συμβάλλει με το 11.6% στο ΑΕΠ"
    },
    womenEmployment: {
      title: "Μερίδιο Απασχολουμένων Γυναικών",
      icon: <Percent className="w-6 h-6" />,
      trade: [
        { year: 2019, value: 50.9, change: null },
        { year: 2020, value: 51.0, change: 0.1 },
        { year: 2021, value: 48.7, change: -2.3 },
        { year: 2022, value: 50.2, change: 1.5 },
        { year: 2023, value: 53.4, change: 3.2 },
        { year: 2024, value: 55.3, change: 1.9 }
      ],
      total: [
        { year: 2019, value: 42.2, change: null },
        { year: 2020, value: 42.4, change: 0.2 },
        { year: 2021, value: 42.4, change: 0.0 },
        { year: 2022, value: 42.3, change: -0.1 },
        { year: 2023, value: 43.0, change: 0.7 },
        { year: 2024, value: 43.3, change: 0.3 }
      ],
      unit: "%",
      insight: "Το εμπόριο προωθεί ενεργά και σημαντικά την απασχόληση γυναικών, με σημαντικά υψηλότερα ποσοστά από τον μέσο όρο της οικονομίας"
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatChange = (change) => {
    if (change === null) return '-';
    const sign = change > 0 ? '+' : '';
    return `${sign}${change}`;
  };

  // Prepare chart data
  const prepareChartData = () => {
    const currentData = statisticsData[activeStatCategory];
    const chartData = [];
    
    // Find common years between trade and total data
    const tradeYears = currentData.trade.map(item => item.year);
    const totalYears = currentData.total.map(item => item.year);
    const commonYears = tradeYears.filter(year => totalYears.includes(year));
    
    commonYears.forEach(year => {
      const tradeItem = currentData.trade.find(item => item.year === year);
      const totalItem = currentData.total.find(item => item.year === year);
      
      if (tradeItem && totalItem) {
        chartData.push({
          year: year.toString(),
          trade: tradeItem.value,
          total: totalItem.value,
          tradeChange: tradeItem.change,
          totalChange: totalItem.change
        });
      }
    });
    
    return chartData;
  };

  const chartData = prepareChartData();

  // Key achievements data
  const achievements = [
    {
      icon: <Building2 className="w-8 h-8" />,
      number: "228,725",
      label: "Επιχειρήσεις Εμπορίου",
      description: "Σύνολο επιχειρήσεων (2022)"
    },
    {
      icon: <Euro className="w-8 h-8" />,
      number: "179.5B€",
      label: "Κύκλος Εργασιών",
      description: "Συνολικός κύκλος εργασιών (2024)"
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "706.3K",
      label: "Απασχολούμενοι",
      description: "Στο εμπόριο (2024)"
    },
    {
      icon: <Percent className="w-8 h-8" />,
      number: "55.3%",
      label: "Γυναίκες στο Λιανικό",
      description: "Μερίδιο γυναικών (2024)"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      number: "11.6%",
      label: "Συμβολή στο ΑΕΠ",
      description: "Ακαθάριστη Προστιθέμενη Αξία"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "37.1%",
      label: "Μερίδιο Οικονομίας",
      description: "Στον συνολικό κύκλο εργασιών"
    }
  ];

  return (
    <div className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Το Εμπόριο σε Αριθμούς
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Ολοκληρωμένη ανάλυση στατιστικών δεδομένων από το ΙΝΕΜΥ
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(statisticsData).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setActiveStatCategory(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeStatCategory === key
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {data.icon}
              {data.title}
            </button>
          ))}
        </div>

        {/* Chart Section */}
        <div className={`${
          isDark ? 'bg-gray-700' : 'bg-gray-50'
        } rounded-xl p-8 mb-12`}>
          <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {statisticsData[activeStatCategory].title}
          </h3>
          <p className={`text-center mb-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            {statisticsData[activeStatCategory].insight}
          </p>
          
          <div className="h-96">
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
                  tickFormatter={(value) => formatNumber(value)}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    border: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    color: isDark ? '#f9fafb' : '#111827'
                  }}
                  formatter={(value, name) => [
                    `${formatNumber(value)} ${statisticsData[activeStatCategory].unit}`,
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
                  dataKey="total" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  name="Σύνολο Οικονομίας"
                  dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="mb-16">
          <h3 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Βασικά Στοιχεία
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className={`${
                isDark 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-200'
              } border rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  {achievement.icon}
                </div>
                <div className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {achievement.number}
                </div>
                <div className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {achievement.label}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className={`${
          isDark 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-gray-50 border-gray-200'
        } border rounded-xl p-8`}>
          <h3 className={`text-2xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Βασικές Ενδείξεις
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
              }`}>
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Μεγαλύτερος Εργοδότης
              </h4>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Το εμπόριο είναι ο μεγαλύτερος εργοδότης στη χώρα, 
                αντιπροσωπεύοντας το 17.3% της συνολικής απασχόλησης.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <Euro className="w-6 h-6" />
              </div>
              <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Σημαντική Οικονομική Συμβολή
              </h4>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Το εμπόριο αντιπροσωπεύει πάνω από το 1/3 του οικονομικού 
                κύκλου εργασιών και συμβάλλει με το 11.6% στο ΑΕΠ.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                isDark ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-600'
              }`}>
                <Percent className="w-6 h-6" />
              </div>
              <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Προώθηση Ισότητας
              </h4>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Το εμπόριο προωθεί ενεργά την ισότητα των φύλων με 
                55.3% γυναικών στο λιανικό εμπόριο.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StatisticsSection.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default StatisticsSection;
