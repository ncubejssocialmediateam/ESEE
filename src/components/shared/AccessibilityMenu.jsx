import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Accessibility, Type, Eye, Monitor, MousePointer, X, Settings } from 'lucide-react';

const AccessibilityMenu = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleFontSize = (size) => {
    document.documentElement.style.fontSize = size;
  };

  const handleContrast = () => {
    document.documentElement.classList.toggle('high-contrast');
  };

  const handleReduceMotion = () => {
    document.documentElement.classList.toggle('reduce-motion');
  };

  const handleScreenReader = () => {
    document.documentElement.classList.toggle('screen-reader-optimize');
  };

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Επιλογές προσβασιμότητας"
        className={`flex items-center justify-center w-10 h-10 rounded-full ${
          isDark
            ? 'bg-blue-400 hover:bg-blue-500 text-blue-950'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        } transition-all duration-200 focus:ring-2 focus:ring-blue-300 hover:scale-105`}
      >
        <Settings size={20} />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Επιλογές προσβασιμότητας"
          className={`absolute right-0 w-80 mt-2 p-4 ${
            isDark
              ? 'bg-blue-950 border-blue-800'
              : 'bg-white border-gray-200'
          } border rounded-xl shadow-xl backdrop-blur-sm z-50`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold flex items-center space-x-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              <Accessibility size={20} />
              <span>Προσβασιμότητα</span>
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Κλείσιμο μενού"
              className={`p-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-300 hover:scale-105 ${
                isDark 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-blue-900' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <X size={18} />
            </button>
          </div>
          <div className="space-y-6">
            <div role="menuitem" className="space-y-3">
              <div className={`flex items-center space-x-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                <Type size={20} />
                <span className="font-medium">Μέγεθος γραμματοσειράς</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleFontSize('14px')}
                  className={`px-4 py-3 text-sm rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-blue-900 hover:bg-blue-800 text-blue-200' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  aria-label="Μικρή γραμματοσειρά"
                >
                  A
                </button>
                <button
                  onClick={() => handleFontSize('16px')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-blue-900 hover:bg-blue-800 text-blue-200' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  aria-label="Μεσαία γραμματοσειρά"
                >
                  A
                </button>
                <button
                  onClick={() => handleFontSize('20px')}
                  className={`px-4 py-3 text-lg rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-blue-900 hover:bg-blue-800 text-blue-200' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  aria-label="Μεγάλη γραμματοσειρά"
                >
                  A
                </button>
              </div>
            </div>

            <button
              onClick={handleContrast}
              role="menuitem"
              className={`flex items-center space-x-3 w-full p-4 rounded-xl ${
                isDark 
                  ? 'text-gray-200 hover:text-blue-300 hover:bg-blue-900' 
                  : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'
              } transition-all duration-200 focus:ring-2 focus:ring-blue-300 hover:scale-[1.02]`}
            >
              <Eye size={20} />
              <span className="font-medium">Υψηλή αντίθεση</span>
            </button>

            <button
              onClick={handleScreenReader}
              role="menuitem"
              className={`flex items-center space-x-3 w-full p-4 rounded-xl ${
                isDark 
                  ? 'text-gray-200 hover:text-blue-300 hover:bg-blue-900' 
                  : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'
              } transition-all duration-200 focus:ring-2 focus:ring-blue-300 hover:scale-[1.02]`}
            >
              <Monitor size={20} />
              <span className="font-medium">Βελτιστοποίηση για αναγνώστη οθόνης</span>
            </button>

            <button
              onClick={handleReduceMotion}
              role="menuitem"
              className={`flex items-center space-x-3 w-full p-4 rounded-xl ${
                isDark 
                  ? 'text-gray-200 hover:text-blue-300 hover:bg-blue-900' 
                  : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'
              } transition-all duration-200 focus:ring-2 focus:ring-blue-300 hover:scale-[1.02]`}
            >
              <MousePointer size={20} />
              <span className="font-medium">Μείωση κίνησης</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

AccessibilityMenu.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default AccessibilityMenu;
