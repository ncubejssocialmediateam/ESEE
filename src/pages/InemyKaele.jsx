import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { BookOpen, Users, TrendingUp, Award, Target, Lightbulb, BarChart3, Building2, Euro, UserCheck, Percent, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InemyKaele = () => {
  const { isDark } = useTheme();
  const [activeStatCategory, setActiveStatCategory] = useState('businesses');
  const navigate = useNavigate();

  const handleViewProgramsClick = () => {
    const el = document.getElementById('programs-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // INEMY Statistics Data
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

  const inemyServices = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Εκπαιδευτικά Προγράμματα",
      description: "Σεμινάρια, ημερίδες και προγράμματα εκπαίδευσης για επιχειρηματίες"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Συμβουλευτική Υποστήριξη",
      description: "Εξειδικευμένη συμβουλευτική για την ανάπτυξη επιχειρήσεων"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Έρευνες & Μελέτες",
      description: "Επιστημονικές έρευνες για την εμπορική και επιχειρηματική ανάπτυξη"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Καινοτομία & Τεχνολογία",
      description: "Προώθηση καινοτόμων λύσεων και τεχνολογικών εξελίξεων"
    }
  ];

  const kaeleServices = [
    {
      title: "Εκπαιδευτικά Προγράμματα",
      description: "Προγράμματα εκπαίδευσης και κατάρτισης για το εμπορικό προσωπικό"
    },
    {
      title: "Συμβουλευτική Υποστήριξη",
      description: "Εξειδικευμένη συμβουλευτική για εμπορικές επιχειρήσεις"
    },
    {
      title: "Έρευνες & Στατιστικά",
      description: "Συλλογή και ανάλυση δεδομένων για την εμπορική δραστηριότητα"
    },
    {
      title: "Εκδηλώσεις & Δικτύωση",
      description: "Οργάνωση εκδηλώσεων και δραστηριοτήτων δικτύωσης"
    }
  ];

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
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ΙΝΕΜΥ – ΚΑΕΛΕ
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className={`text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Τα επίσημα επιστημονικά όργανα της ΕΣΕΕ
            </p>
          </div>

          {/* INEMY Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ΙΝΕΜΥ
              </h2>
              <p className={`text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                Ινστιτούτο Εμπορίου & Επιχειρηματικότητας
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mb-12">
              <p className={`text-lg leading-relaxed text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Το ΙΝΕΜΥ είναι το επιστημονικό όργανο της ΕΣΕΕ που ασχολείται με την 
                έρευνα, την εκπαίδευση και την ανάπτυξη της επιχειρηματικότητας. 
                Ιδρύθηκε με σκοπό την προώθηση της επιστημονικής γνώσης στον τομέα 
                του εμπορίου και της επιχειρηματικότητας.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {inemyServices.map((service, index) => (
                <div key={index} className={`${
                  isDark 
                    ? 'bg-gray-700' 
                    : 'bg-gray-50'
                } rounded-xl p-6 text-center`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* KAELE Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ΚΑΕΛΕ
              </h2>
              <p className={`text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                Κέντρο Ανάπτυξης Εμπορικού Λειτουργικού Επιπέδου
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mb-12">
              <p className={`text-lg leading-relaxed text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Το ΚΑΕΛΕ είναι το κέντρο που ασχολείται με την ανάπτυξη και την 
                υποστήριξη του εμπορικού λειτουργικού επιπέδου. Προσφέρει υπηρεσίες 
                εκπαίδευσης, συμβουλευτικής και έρευνας ειδικά για τις εμπορικές 
                επιχειρήσεις και το προσωπικό τους.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {kaeleServices.map((service, index) => (
                <div key={index} className={`${
                  isDark 
                    ? 'bg-gray-700' 
                    : 'bg-gray-50'
                } rounded-xl p-6`}>
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Στατιστικά Δεδομένα Εμπορίου
              </h2>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Ολοκληρωμένη ανάλυση δεδομένων από το ΙΝΕΜΥ
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

            {/* Statistics Table */}
            <div className="overflow-x-auto">
              <div className={`${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              } rounded-lg p-6 mb-6`}>
                <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {statisticsData[activeStatCategory].title}
                </h3>
                <p className={`text-center mb-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {statisticsData[activeStatCategory].insight}
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Trade Data */}
                  <div>
                    <h4 className={`text-lg font-semibold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Εμπόριο
                    </h4>
                    <div className={`${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    } rounded-lg overflow-hidden`}>
                      <table className="w-full">
                        <thead className={`${
                          isDark ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <tr>
                            <th className={`px-4 py-3 text-left font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                              Έτος
                            </th>
                            <th className={`px-4 py-3 text-right font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                              Τιμή
                            </th>
                            <th className={`px-4 py-3 text-right font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                              Αλλαγή
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {statisticsData[activeStatCategory].trade.map((item, index) => (
                            <tr key={index} className={`${
                              index % 2 === 0 
                                ? isDark ? 'bg-gray-800' : 'bg-white'
                                : isDark ? 'bg-gray-750' : 'bg-gray-50'
                            }`}>
                              <td className={`px-4 py-3 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {item.year}
                              </td>
                              <td className={`px-4 py-3 text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {formatNumber(item.value)} {statisticsData[activeStatCategory].unit}
                              </td>
                              <td className={`px-4 py-3 text-right ${
                                item.change === null 
                                  ? isDark ? 'text-gray-400' : 'text-gray-500'
                                  : item.change > 0 
                                    ? 'text-green-600' 
                                    : 'text-red-600'
                              }`}>
                                {formatChange(item.change)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Total Economy Data */}
                  <div>
                    <h4 className={`text-lg font-semibold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Σύνολο Οικονομίας
                    </h4>
                    <div className={`${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    } rounded-lg overflow-hidden`}>
                      <table className="w-full">
                        <thead className={`${
                          isDark ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <tr>
                            <th className={`px-4 py-3 text-left font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                              Έτος
                            </th>
                            <th className={`px-4 py-3 text-right font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                              Τιμή
                            </th>
                            <th className={`px-4 py-3 text-right font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                              Αλλαγή
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {statisticsData[activeStatCategory].total.map((item, index) => (
                            <tr key={index} className={`${
                              index % 2 === 0 
                                ? isDark ? 'bg-gray-800' : 'bg-white'
                                : isDark ? 'bg-gray-750' : 'bg-gray-50'
                            }`}>
                              <td className={`px-4 py-3 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {item.year}
                              </td>
                              <td className={`px-4 py-3 text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {formatNumber(item.value)} {statisticsData[activeStatCategory].unit}
                              </td>
                              <td className={`px-4 py-3 text-right ${
                                item.change === null 
                                  ? isDark ? 'text-gray-400' : 'text-gray-500'
                                  : item.change > 0 
                                    ? 'text-green-600' 
                                    : 'text-red-600'
                              }`}>
                                {formatChange(item.change)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-16">
            <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Τα Επιτεύγματά μας
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className={`${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } border rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
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

          {/* Key Insights Section */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Βασικές Ενδείξεις
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
                }`}>
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Μεγαλύτερος Εργοδότης
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Το εμπόριο είναι ο μεγαλύτερος εργοδότης στη χώρα, 
                  αντιπροσωπεύοντας το 17.3% της συνολικής απασχόλησης.
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <Euro className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Σημαντική Οικονομική Συμβολή
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Το εμπόριο αντιπροσωπεύει πάνω από το 1/3 του οικονομικού 
                  κύκλου εργασιών και συμβάλλει με το 11.6% στο ΑΕΠ.
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDark ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                }`}>
                  <Percent className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Προώθηση Ισότητας
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Το εμπόριο προωθεί ενεργά την ισότητα των φύλων με 
                  55.3% γυναικών στο λιανικό εμπόριο.
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDark ? 'bg-orange-600/20 text-orange-400' : 'bg-orange-100 text-orange-600'
                }`}>
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Ανθεκτικότητα
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Παρά τις οικονομικές δυσκολίες, το εμπόριο δείχνει 
                  ανθεκτικότητα και συνεχή ανάπτυξη.
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDark ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-600'
                }`}>
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Σταθερή Ανάπτυξη
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Σταθερή αύξηση επιχειρήσεων και κύκλου εργασιών 
                  τα τελευταία χρόνια με θετικές προοπτικές.
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDark ? 'bg-teal-600/20 text-teal-400' : 'bg-teal-100 text-teal-600'
                }`}>
                  <Users className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Κοινωνική Ευθύνη
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Το 27.3% όλων των εργοδοτών στην οικονομία 
                  λειτουργεί στο εμπόριο, δημιουργώντας θέσεις εργασίας.
                </p>
              </div>
            </div>
          </div>

          {/* Programs Section */}
          <div id="programs-section" className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-12 mb-16`}>
            <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Τρέχοντα Προγράμματα
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Ψηφιακός Μετασχηματισμός
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Προγράμματα εκπαίδευσης για την ψηφιακή μετάβαση των επιχειρήσεων
                </p>
                <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  Διάρκεια: 2021-2027
                </div>
              </div>
              
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Ανθρώπινο Δυναμικό
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Προγράμματα ανάπτυξης ανθρώπινου δυναμικού και κοινωνικής συνοχής
                </p>
                <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  Διάρκεια: 2021-2027
                </div>
              </div>
              
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Ανταγωνιστικότητα & Καινοτομία
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Προγράμματα ενίσχυσης της ανταγωνιστικότητας και της καινοτομίας
                </p>
                <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  Διάρκεια: 2014-2020
                </div>
              </div>
              
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Δια Βίου Μάθηση
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Προγράμματα δια βίου εκπαίδευσης και κατάρτισης
                </p>
                <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  Συνεχής λειτουργία
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Επικοινωνία
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Για περισσότερες πληροφορίες σχετικά με τα προγράμματά μας
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/contact')} className={`px-8 py-4 rounded-lg font-medium text-lg transition-colors ${
                isDark 
                  ? 'bg-blue-400 hover:bg-blue-500 text-blue-950' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}>
                Επικοινωνήστε μαζί μας
              </button>
              <button onClick={handleViewProgramsClick} className={`px-8 py-4 rounded-lg font-medium text-lg border-2 transition-colors ${
                isDark 
                  ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-blue-950' 
                  : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              }`}>
                Δείτε τα προγράμματά μας
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isDark={isDark} />
    </main>
  );
};

export default InemyKaele;
