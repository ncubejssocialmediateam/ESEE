import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import AccessibilityMenu from '../shared/AccessibilityMenu';
import {useSelector} from "react-redux";
import ESEE_LOGO_WHITE from '../../assets/ESEE-LOGO_white.png';

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

const DropdownNavItem = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  const pressOfficeItems = [
    { label: 'Νέα', url: '/news' },
    { label: 'Ανακοινώσεις & Δελτία Τύπου', url: '/press-releases' }
  ];

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`flex items-center px-3 py-1.5 text-sm font-medium ${
          isDark
            ? 'text-gray-200 hover:text-blue-400'
            : 'text-gray-800 hover:text-blue-600'
        } transition-colors`}
      >
        Γραφείο Τύπου
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className={`absolute top-full left-0 mt-1 w-64 rounded-md shadow-lg z-50 ${
          isDark ? 'bg-blue-950 border border-blue-800' : 'bg-white border border-gray-200'
        }`}>
          <div className="py-1">
            {pressOfficeItems.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className={`block px-4 py-2 text-sm ${
                  isDark
                    ? 'text-gray-200 hover:bg-blue-900 hover:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                } transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
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
  const stateNavItems = useSelector(state => state.navItems);

  return (
      <>
        <nav className={`fixed w-full ${
            isDark
                ? 'bg-blue-950/80 border-b border-blue-900'
                : 'bg-white/80 border-b border-gray-100'
        } backdrop-blur-sm shadow-lg z-40 transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <a href="#" className="flex items-center">
                  <img 
                    src={ESEE_LOGO_WHITE} 
                    alt="ΕΣΕΕ - Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας"
                    className="h-12 w-auto hover:opacity-80 transition-opacity duration-300"
                  />
                </a>

                <div className="hidden lg:flex space-x-2">
                  {stateNavItems && stateNavItems?.map((item) => (
                    <NavItem
                      key={item.id}
                      item={item}
                      isDark={isDark}
                    />
                  ))}
                  <DropdownNavItem isDark={isDark} />
                  <Link
                    to="/positions"
                    className={`flex items-center px-3 py-1.5 text-sm font-medium ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400'
                        : 'text-gray-800 hover:text-blue-600'
                    } transition-colors`}
                  >
                    Θέσεις
                  </Link>
                  <Link
                    to="/projects"
                    className={`flex items-center px-3 py-1.5 text-sm font-medium ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400'
                        : 'text-gray-800 hover:text-blue-600'
                    } transition-colors`}
                  >
                    Έργα
                  </Link>
                  <Link
                    to="/portal"
                    className={`flex items-center px-3 py-1.5 text-sm font-medium ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400'
                        : 'text-gray-800 hover:text-blue-600'
                    } transition-colors`}
                  >
                    Portal
                  </Link>
                  <Link
                    to="/administration"
                    className={`flex items-center px-3 py-1.5 text-sm font-medium ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400'
                        : 'text-gray-800 hover:text-blue-600'
                    } transition-colors`}
                  >
                    Διοίκηση
                  </Link>
                  <Link
                    to="/contact"
                    className={`flex items-center px-3 py-1.5 text-sm font-medium ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400'
                        : 'text-gray-800 hover:text-blue-600'
                    } transition-colors`}
                  >
                    Επικοινωνία
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="relative z-50">
                    <AccessibilityMenu isDark={isDark} />
                  </div>
                  <button className={`px-4 py-1.5 text-sm ${
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
            } z-30 lg:hidden pt-16 transition-colors duration-300`}>
              <div className="p-4">
                {stateNavItems && stateNavItems?.map((item) => (
                  <div key={item.id} className="mb-2">
                    <NavItem
                      item={item}
                      isDark={isDark}
                    />
                  </div>
                ))}
                <div className="mb-2">
                  <div className={`px-3 py-1.5 text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Γραφείο Τύπου
                  </div>
                  <div className="ml-3 space-y-1">
                    <Link
                      to="/news"
                      className={`block px-3 py-1.5 text-sm font-medium ${
                        isDark
                          ? 'text-gray-200 hover:text-blue-400'
                          : 'text-gray-700 hover:text-blue-600'
                      } transition-colors`}
                    >
                      Νέα
                    </Link>
                    <Link
                      to="/press-releases"
                      className={`block px-3 py-1.5 text-sm font-medium ${
                        isDark
                          ? 'text-gray-200 hover:text-blue-400'
                          : 'text-gray-700 hover:text-blue-600'
                      } transition-colors`}
                    >
                      Ανακοινώσεις
                    </Link>
                  </div>
                </div>
                <div className="mb-2">
                  <Link
                    to="/positions"
                    className={`flex items-center px-3 py-1.5 text-sm font-medium ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400'
                        : 'text-gray-800 hover:text-blue-600'
                    } transition-colors`}
                  >
                    Θέσεις
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    to="/projects"
                    className={`flex items-center px-3 py-1.5 text-sm font-medium ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400'
                        : 'text-gray-800 hover:text-blue-600'
                    } transition-colors`}
                  >
                    Έργα
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    to="/portal"
                    className={`flex items-center px-3 py-1.5 text-sm font-medium ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400'
                        : 'text-gray-800 hover:text-blue-600'
                    } transition-colors`}
                  >
                    Portal
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    to="/administration"
                    className={`flex items-center px-3 py-1.5 text-sm font-medium ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400'
                        : 'text-gray-800 hover:text-blue-600'
                    } transition-colors`}
                  >
                    Διοίκηση
                  </Link>
                </div>
                <div className="mb-2">
                  <Link
                    to="/contact"
                    className={`flex items-center px-3 py-1.5 text-sm font-medium ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400'
                        : 'text-gray-800 hover:text-blue-600'
                    } transition-colors`}
                  >
                    Επικοινωνία
                  </Link>
                </div>

                <div className="space-y-4 mt-4">
                  <div className="relative z-50">
                    <AccessibilityMenu isDark={isDark} />
                  </div>
                  <button className={`w-full px-4 py-1.5 text-sm ${
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
