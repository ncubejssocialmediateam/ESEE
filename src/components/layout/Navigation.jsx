import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import AccessibilityMenu from '../shared/AccessibilityMenu';
import {useSelector} from "react-redux";
import ESEE_LOGO_FINAL from '../../assets/LOGO-site-final.png';

const NavItem = ({ item, isDark }) => {
  const { link } = item;
  const slug = link?.url;
  const label = link?.label;

  // Handle archive links with category parameter
  const getNavigationUrl = () => {
    if (slug === 'archive') {
      return `/archive?category=${encodeURIComponent(label)}`;
    }
    return `/${slug}`;
  };

  return (
    <div className="relative group">
      <Link
        to={getNavigationUrl()}
        className={`flex items-center px-3 py-1.5 text-sm font-medium ${
          isDark
            ? 'text-gray-200 hover:text-blue-400'
            : 'text-gray-800 hover:text-blue-600'
        } transition-colors`}
      >
        {label}
      </Link>
    </div>
  );
};

const DropdownNavItem = ({ isDark, title, items, onMouseEnter, onMouseLeave, isOpen, setIsOpen }) => {
  return (
    <div 
      className="relative group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        className={`flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
          isDark
            ? 'text-gray-200 hover:text-blue-400 hover:bg-blue-900/20'
            : 'text-gray-800 hover:text-blue-600 hover:bg-blue-50'
        } ${isOpen ? (isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-600') : ''}`}
      >
        {title}
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 w-80 rounded-lg shadow-xl z-50 border ${
          isDark ? 'bg-blue-950 border-blue-800' : 'bg-white border-gray-200'
        } animate-in fade-in-0 zoom-in-95 duration-200`}>
          <div className="py-2">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className={`block px-4 py-3 text-sm transition-all duration-150 ${
                  isDark
                    ? 'text-gray-200 hover:bg-blue-900 hover:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
                onClick={() => setIsOpen && setIsOpen(false)}
              >
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <div className={`text-xs mt-1 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

NavItem.propTypes = {
  item: PropTypes.shape({
    link: PropTypes.shape({
      url: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  isDark: PropTypes.bool.isRequired
};

const Navigation = ({ isDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const stateNavItems = useSelector(state => state.navItems);
  const hoverTimeoutRef = useRef(null);

  const eseeItems = [
    { label: 'ΠΟΙΟΙ ΕΙΜΑΣΤΕ', url: '/about', description: 'Υπεύθυνη φωνή του ελληνικού εμπορίου και της μικρομεσαίας επιχειρηματικότητας' },
    { label: 'ΔΙΟΙΚΗΣΗ', url: '/administration', description: 'Τα όργανα διοίκησης της ΕΣΕΕ, σύμφωνα με το καταστατικό της' },
    { label: 'ΜΕΛΗ ΤΗΣ ΕΣΕΕ', url: '/members', description: '17 Ομοσπονδίες & 354 Εμπορικούς Συλλόγους και 11 Συνδέσμους σε όλη την Ελλάδα' },
    { label: 'ΙΝΕΜΥ', url: '/inemy', description: 'Ινστιτούτο Εμπορίου & Επιχειρηματικότητας' },
    { label: 'ΚΑΕΛΕ', url: '/kaele', description: 'ΚΕΝΤΡΟ ΑΝΑΠΤΥΞΗΣ ΕΛΛΗΝΙΚΟΥ ΕΜΠΟΡΙΟΥ & ΕΠΙΧΕΙΡΗΜΑΤΙΚΟΤΗΤΑΣ' },
    { label: 'ΧΡΗΣΙΜΕΣ ΠΛΗΡΟΦΟΡΙΕΣ', url: '/business', description: 'Ενημερωμένη και στοχευμένη πληροφόρηση για την επιχειρηματικότητα' },
    { label: 'ΥΠΟΣΤΗΡΙΞΗ ΜΕΛΩΝ', url: '/member-support', description: 'Ερωτοαπαντήσεις και υποστήριξη για τα μέλη της ΕΣΕΕ' }
  ];

  const pressOfficeItems = [
    { label: 'ΔΕΛΤΙΑ ΤΥΠΟΥ – ΑΝΑΚΟΙΝΩΣΕΙΣ', url: '/press-releases' },
    { label: 'ΕΓΚΥΚΛΙΟΙ', url: '/circulars' },
    { label: 'ΔΗΜΟΣΙΕΥΣΕΙΣ', url: '/publications' }
  ];

  // Competitions dropdown replaced with direct link to /competitions page

  // Improved hover functions with timing
  const handleMouseEnter = (dropdownName) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms delay before closing
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      // Focus the first link in the mobile menu
      const firstLink = document.querySelector('.mobile-menu-content a');
      if (firstLink) {
        firstLink.focus();
      }
    }
  }, [isMenuOpen]);

  return (
      <>
        <nav className={`fixed w-full ${
            isDark
                ? 'bg-blue-950/80 border-b border-blue-900'
                : 'bg-white/80 border-b border-gray-100'
        } backdrop-blur-sm shadow-lg z-40 transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-6">
                <Link to="/" className="flex items-center">
                  <img 
                    src={ESEE_LOGO_FINAL} 
                    alt="ΕΣΕΕ - Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας"
                    className="h-12 w-auto hover:opacity-80 transition-opacity duration-300"
                  />
                </Link>

                <div className="hidden lg:flex items-center space-x-1 flex-nowrap">
                  <DropdownNavItem 
                    isDark={isDark}
                    title="ΕΣΕΕ"
                    items={eseeItems}
                    onMouseEnter={() => handleMouseEnter('esee')}
                    onMouseLeave={handleMouseLeave}
                    isOpen={activeDropdown === 'esee'}
                    setIsOpen={setActiveDropdown}
                  />
                  <DropdownNavItem 
                    isDark={isDark}
                    title="ΓΡΑΦΕΙΟ ΤΥΠΟΥ"
                    items={pressOfficeItems}
                    onMouseEnter={() => handleMouseEnter('press')}
                    onMouseLeave={handleMouseLeave}
                    isOpen={activeDropdown === 'press'}
                    setIsOpen={setActiveDropdown}
                  />
                  <Link
                    to="/positions"
                    className={`flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400 hover:bg-blue-900/20'
                        : 'text-gray-800 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    ΕΥΡΩΠΑΪΚΑ ΘΕΜΑΤΑ
                  </Link>
                  <Link
                    to="/projects"
                    className={`flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400 hover:bg-blue-900/20'
                        : 'text-gray-800 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    ΕΡΓΑ
                  </Link>
                  <Link
                    to="/competitions"
                    className={`flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400 hover:bg-blue-900/20'
                        : 'text-gray-800 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    ΔΙΑΓΩΝΙΣΜΟΙ & ΠΡΟΣΚΛΗΣΕΙΣ
                  </Link>
                  <Link
                    to="/contact"
                    className={`flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400 hover:bg-blue-900/20'
                        : 'text-gray-800 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    ΕΠΙΚΟΙΝΩΝΙΑ
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                    <div className="hidden lg:flex items-center space-x-4">
                      {/* <div className="relative z-50">
                        <AccessibilityMenu isDark={isDark} />
                      </div> */}
                  <Link to="/portal">
                    <button className={`px-4 py-1.5 text-sm ${
                        isDark
                            ? 'bg-blue-400 hover:bg-blue-500 text-blue-950'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    } rounded-lg transition-colors`}>
                      ΥΠΟΣΤΗΡΙΞΗ ΜΕΛΩΝ
                    </button>
                  </Link>
                </div>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
                      isDark 
                        ? 'text-white hover:bg-blue-900/20' 
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                    aria-label="Μενού πλοήγησης"
                >
                  <div className="relative w-6 h-6">
                    <Menu 
                      size={24} 
                      className={`absolute inset-0 transition-all duration-300 ${
                        isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                      }`}
                    />
                    <X 
                      size={24} 
                      className={`absolute inset-0 transition-all duration-300 ${
                        isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Menu Panel */}
              <div className={`fixed top-16 left-0 right-0 bottom-0 ${
                isDark ? 'bg-blue-950' : 'bg-white'
              } z-40 lg:hidden transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}>
                <div className="h-full overflow-y-auto">
                  {/* Close Button */}
                  <div className="flex justify-end p-4">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isDark 
                          ? 'text-white hover:bg-blue-900/20' 
                          : 'text-gray-900 hover:bg-gray-100'
                      }`}
                      aria-label="Κλείσιμο μενού"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="px-6 pb-6 space-y-6 mobile-menu-content">
                    {/* ΕΣΕΕ Dropdown */}
                    <div className="space-y-3">
                      <div className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        ΕΣΕΕ
                      </div>
                      <div className="space-y-2">
                        {eseeItems.map((item, index) => (
                          <Link
                            key={index}
                            to={item.url}
                            className={`block p-4 rounded-lg border transition-all duration-200 ${
                              isDark
                                ? 'border-blue-800 bg-blue-900/20 text-gray-200 hover:bg-blue-800/30 hover:text-blue-400'
                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="font-medium text-base">{item.label}</div>
                            <div className={`text-sm mt-1 ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {item.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>


                    {/* ΓΡΑΦΕΙΟ ΤΥΠΟΥ */}
                    <div className="space-y-3">
                      <div className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        ΓΡΑΦΕΙΟ ΤΥΠΟΥ
                      </div>
                      <div className="space-y-2">
                        {pressOfficeItems.map((item, index) => (
                          <Link
                            key={index}
                            to={item.url}
                            className={`block p-4 rounded-lg border transition-all duration-200 ${
                              isDark
                                ? 'border-blue-800 bg-blue-900/20 text-gray-200 hover:bg-blue-800/30 hover:text-blue-400'
                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="font-medium text-base">{item.label}</div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Additional Navigation Links */}
                    <div className="space-y-2">
                      <Link
                        to="/positions"
                        className={`block p-4 rounded-lg border transition-all duration-200 ${
                          isDark
                            ? 'border-blue-800 bg-blue-900/20 text-gray-200 hover:bg-blue-800/30 hover:text-blue-400'
                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="font-medium text-base">ΕΥΡΩΠΑΪΚΑ ΘΕΜΑΤΑ</div>
                      </Link>
                      
                      <Link
                        to="/projects"
                        className={`block p-4 rounded-lg border transition-all duration-200 ${
                          isDark
                            ? 'border-blue-800 bg-blue-900/20 text-gray-200 hover:bg-blue-800/30 hover:text-blue-400'
                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="font-medium text-base">ΕΡΓΑ</div>
                      </Link>
                      
                      <Link
                        to="/competitions"
                        className={`block p-4 rounded-lg border transition-all duration-200 ${
                          isDark
                            ? 'border-blue-800 bg-blue-900/20 text-gray-200 hover:bg-blue-800/30 hover:text-blue-400'
                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="font-medium text-base">ΔΙΑΓΩΝΙΣΜΟΙ & ΠΡΟΣΚΛΗΣΕΙΣ</div>
                      </Link>
                      
                      <Link
                        to="/contact"
                        className={`block p-4 rounded-lg border transition-all duration-200 ${
                          isDark
                            ? 'border-blue-800 bg-blue-900/20 text-gray-200 hover:bg-blue-800/30 hover:text-blue-400'
                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="font-medium text-base">ΕΠΙΚΟΙΝΩΝΙΑ</div>
                      </Link>
                    </div>

                    {/* HELPDESK Button */}
                    <div className="pt-6 border-t border-gray-200 dark:border-blue-800">
                      <Link to="/portal">
                        <button className={`w-full px-6 py-4 text-base font-semibold rounded-lg transition-all duration-200 ${
                            isDark
                                ? 'bg-blue-400 hover:bg-blue-500 text-blue-950 shadow-lg hover:shadow-xl'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                        }`}>
                          ΥΠΟΣΤΗΡΙΞΗ ΜΕΛΩΝ
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
        )}
      </>
  );
};

Navigation.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default Navigation;
