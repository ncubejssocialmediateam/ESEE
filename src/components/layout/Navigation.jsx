import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, X } from 'lucide-react';
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
        className={`flex items-center px-4 py-2 text-lg font-medium ${
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
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-8">
                <a href="#" className="flex items-center">
                  <img 
                    src={ESEE_LOGO_WHITE} 
                    alt="ΕΣΕΕ - Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας"
                    className="h-12 w-auto hover:opacity-80 transition-opacity duration-300"
                  />
                </a>

                <div className="hidden lg:flex space-x-4">
                  {stateNavItems && stateNavItems?.map((item) => (
                    <NavItem
                      key={item.id}
                      item={item}
                      isDark={isDark}
                    />
                  ))}
                  <Link
                    to="/tax-calendar"
                    className={`flex items-center px-4 py-2 text-lg font-medium ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400'
                        : 'text-gray-800 hover:text-blue-600'
                    } transition-colors`}
                  >
                    Φορολογικό Ημερολόγιο
                  </Link>
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
                {stateNavItems && stateNavItems?.map((item) => (
                  <div key={item.id} className="mb-4">
                    <NavItem
                      item={item}
                      isDark={isDark}
                    />
                  </div>
                ))}
                <div className="mb-4">
                  <Link
                    to="/tax-calendar"
                    className={`flex items-center px-4 py-2 text-lg font-medium ${
                      isDark
                        ? 'text-gray-200 hover:text-blue-400'
                        : 'text-gray-800 hover:text-blue-600'
                    } transition-colors`}
                  >
                    Φορολογικό Ημερολόγιο
                  </Link>
                </div>

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
