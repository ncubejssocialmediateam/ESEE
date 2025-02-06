import { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, X, ArrowDown } from 'lucide-react';

// Mock navigation structure based on ESEE.gr sitemap
export const navigation = {
  'Η ΕΣΕΕ': {
    'Ταυτότητα': ['Ιστορικό', 'Καταστατικό', 'Διοίκηση', 'Οργανόγραμμα'],
    'Μέλη': ['Ομοσπονδίες', 'Εμπορικοί Σύλλογοι'],
    'Επιτροπές': ['Φορολογική', 'Ασφαλιστική', 'Εργασιακή']
  },
  'Δράσεις': {
    'Έρευνες': ['Ετήσιες', 'ΙΝΕΜΥ', 'Κλαδικές'],
    'Προγράμματα': ['Τρέχοντα', 'Ολοκληρωμένα'],
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

const NavItem = ({ title, subItems, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
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
              <div className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                {subTitle}
              </div>
              {items.length > 0 && (
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item}>
                      <a 
                        href="#" 
                        className={`${
                          isDark 
                            ? 'text-gray-400 hover:text-blue-400' 
                            : 'text-gray-600 hover:text-blue-600'
                        } transition-colors`}
                      >
                        {item}
                      </a>
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

const Navigation = ({ isDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                  <NavItem key={title} title={title} subItems={subItems} isDark={isDark} />
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className={`hidden lg:block px-6 py-2 ${
                isDark 
                  ? 'bg-blue-400 hover:bg-blue-500 text-blue-950' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } rounded-lg transition-colors`}>
                Επικοινωνία
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden ${isDark ? 'text-white' : 'text-gray-900'}`}
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
                <NavItem title={title} subItems={subItems} isDark={isDark} />
              </div>
            ))}
            
            <button className={`w-full mt-4 px-6 py-2 ${
              isDark 
                ? 'bg-blue-400 hover:bg-blue-500 text-blue-950' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } rounded-lg transition-colors`}>
              Επικοινωνία
            </button>
          </div>
        </div>
      )}
    </>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  subItems: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  isDark: PropTypes.bool.isRequired
};

Navigation.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default Navigation;
