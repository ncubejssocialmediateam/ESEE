import { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, X, ArrowDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AccessibilityMenu from '../shared/AccessibilityMenu';

// Mock navigation structure based on ESEE.gr sitemap
export const navigation = {
  'ΟΙ ΘΕΣΕΙΣ ΜΑΣ': {
    'ΑΝΑΠΤΥΞΗ': [],
    'ΑΣΦΑΛΙΣΤΙΚΑ - ΕΡΓΑΣΙΑΚΑ/ΑΠΑΣΧΟΛΗΣΗ': [],
    'ΦΟΡΟΛΟΓΙΚΑ': [],
    'ΚΟΣΤΟΣ ΛΕΙΤΟΥΡΓΙΑΣ': [],
    'ΕΜΠΟΡΙΚΑ ΘΕΜΑΤΑ': []
  },
  'Η ΕΣΕΕ': {
    'Η ΕΣΕΕ ΜΕ ΜΙΑ ΜΑΤΙΑ': [],
    'Ταυτότητα': ['Ιστορικό', 'Καταστατικό', 'Διοίκηση', 'Οργανόγραμμα'],
    'Μέλη': ['Ομοσπονδίες', 'Εμπορικοί Σύλλογοι'],
    'Επιτροπές': ['Φορολογική', 'Ασφαλιστική', 'Εργασιακή'],
    'Νομικές Πληροφορίες': ['Όροι Χρήσης', 'Πολιτική Απορρήτου']
  },
  'Δράσεις': {
    'Έρευνες': ['Ετήσιες', 'ΙΝΕΜΥ', 'Κλαδικές'],
    'Προγράμματα': ['Συγχρηματοδοτούμενα Έργα', 'Τρέχοντα', 'Ολοκληρωμένα'],
    'Εκδηλώσεις': ['Συνέδρια', 'Ημερίδες']
  },
  'Ενημέρωση': {
    'Δελτία Τύπου': [],
    'Νέα - Ανακοινώσεις': [],
    'Νομοθεσία': ['Εμπορική', 'Εργατική', 'Φορολογική'],
    'Χρήσιμοι Σύνδεσμοι': []
  },
  'Υπηρεσίες': {
    'Νομική Υποστήριξη': [],
    'Συμβουλευτική': [],
    'Πιστοποιήσεις': [],
    'Εκπαίδευση': []
  }
};

const NavItem = ({ title, subItems, isDark, activeNavItem, setActiveNavItem }) => {
  // Determine if this item should be open based on parent's state
  const isOpen = activeNavItem === title;

  const handleToggle = () => {
    // Toggle open state: close if already open, or open this one and close any other
    setActiveNavItem(isOpen ? null : title);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    if (title === 'ΟΙ ΘΕΣΕΙΣ ΜΑΣ') {
      navigate('/positions');
      setActiveNavItem(null);
    } else {
      handleToggle();
    }
  };

  const handleSubItemClick = (subTitle, item) => {
    if (subTitle === 'Η ΕΣΕΕ ΜΕ ΜΙΑ ΜΑΤΙΑ') {
      navigate('/about');
      setActiveNavItem(null);
    } else if (subTitle === 'Νομικές Πληροφορίες') {
      if (item === 'Όροι Χρήσης') {
        navigate('/legal');
      } else if (item === 'Πολιτική Απορρήτου') {
        navigate('/privacy');
      }
      setActiveNavItem(null);
    } else if (subTitle === 'Προγράμματα' && item === 'Συγχρηματοδοτούμενα Έργα') {
      navigate('/projects');
      setActiveNavItem(null);
    }
  };

  return (
      <div className="relative group">
        <button
            onClick={handleClick}
            className={`flex items-center justify-between w-full px-4 py-2 text-lg font-medium ${
                isDark
                    ? 'text-gray-200 hover:text-blue-400'
                    : 'text-gray-800 hover:text-blue-600'
            } transition-colors`}
        >
          {title}
          <ArrowDown
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              size={20}
          />
        </button>

        {isOpen && (
            <div className={`absolute left-0 w-64 mt-2 ${
                isDark
                    ? 'bg-blue-950 border-blue-900'
                    : 'bg-white border-gray-200'
            } border rounded-lg shadow-lg z-50`}>
              {Object.entries(subItems).map(([subTitle, items]) => (
                  <div key={subTitle} className="p-4">
                    <Link 
                      to={title === 'ΟΙ ΘΕΣΕΙΣ ΜΑΣ' ? '/positions' : subTitle === 'Η ΕΣΕΕ ΜΕ ΜΙΑ ΜΑΤΙΑ' ? '/about' : '#'} 
                      className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2 hover:text-blue-600 transition-colors`}
                      onClick={() => {
                        handleSubItemClick(subTitle);
                        setActiveNavItem(null);
                      }}
                    >
                      {subTitle}
                    </Link>
                    {items.length > 0 && (
                        <ul className="space-y-2">
                          {items.map((item) => (
                              <li key={item}>
                                <button
                                    onClick={() => handleSubItemClick(subTitle, item)}
                                    className={`${
                                        isDark
                                            ? 'text-gray-400 hover:text-blue-400'
                                            : 'text-gray-600 hover:text-blue-600'
                                    } transition-colors w-full text-left`}
                                >
                                  {item}
                                </button>
                              </li>
                          ))}
                        </ul>
                    )}
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  subItems: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  isDark: PropTypes.bool.isRequired,
  activeNavItem: PropTypes.string,
  setActiveNavItem: PropTypes.func.isRequired
};

const Navigation = ({ isDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State to track which navigation item is open
  const [activeNavItem, setActiveNavItem] = useState(null);

  return (
      <>
        <nav className={`fixed w-full ${
            isDark
                ? 'bg-blue-950/80 border-b border-blue-900'
                : 'bg-white/80 border-b border-gray-100'
        } backdrop-blur-sm shadow-lg z-40 transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-8">
                <a href="#" className={`text-3xl font-bold ${
                    isDark
                        ? 'text-blue-400 hover:text-blue-300'
                        : 'text-blue-600 hover:text-blue-700'
                } transition-colors`}>
                  ΕΣΕΕ
                </a>

                <div className="hidden lg:flex space-x-4">
                  {Object.entries(navigation).map(([title, subItems]) => (
                      <NavItem
                          key={title}
                          title={title}
                          subItems={subItems}
                          isDark={isDark}
                          activeNavItem={activeNavItem}
                          setActiveNavItem={setActiveNavItem}
                      />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center space-x-6">
                  <div className="relative z-50">
                    <AccessibilityMenu isDark={isDark} />
                  </div>
                  <button className={`px-6 py-2 ${
                      isDark
                          ? 'bg-blue-400 hover:bg-blue-500 text-blue-950'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } rounded-lg transition-colors`}>
                    Επικοινωνία
                  </button>
                </div>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`lg:hidden ${isDark ? 'text-white' : 'text-gray-900'}`}
                    aria-label="Μενού πλοήγησης"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className={`fixed inset-0 ${
                isDark ? 'bg-blue-950' : 'bg-white'
            } z-30 lg:hidden pt-20 transition-colors duration-300`}>
              <div className="p-4">
                {Object.entries(navigation).map(([title, subItems]) => (
                    <div key={title} className="mb-4">
                      <NavItem
                          title={title}
                          subItems={subItems}
                          isDark={isDark}
                          activeNavItem={activeNavItem}
                          setActiveNavItem={setActiveNavItem}
                      />
                    </div>
                ))}

                <div className="space-y-6 mt-6">
                  <div className="relative z-50">
                    <AccessibilityMenu isDark={isDark} />
                  </div>
                  <button className={`w-full px-6 py-2 ${
                      isDark
                          ? 'bg-blue-400 hover:bg-blue-500 text-blue-950'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } rounded-lg transition-colors`}>
                    Επικοινωνία
                  </button>
                </div>
              </div>
            </div>
        )}
      </>
  );
};

Navigation.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default Navigation;
