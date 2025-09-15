import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Accessibility, Type, Eye, Monitor, MousePointer, X } from 'lucide-react';

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
        aria-label="Μενού προσβασιμότητας"
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-base ${
          isDark
            ? 'bg-blue-400 hover:bg-blue-500 text-blue-950'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        } transition-colors focus:ring-2 focus:ring-blue-300`}
      >
        <Accessibility size={20} />
        <span>ΑΜΕΑ</span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Επιλογές προσβασιμότητας"
          className={`absolute right-0 w-72 mt-2 p-2 ${
            isDark
              ? 'bg-blue-950 border-blue-900'
              : 'bg-white border-gray-200'
          } border rounded-lg shadow-lg z-50`}
        >
          <div className="flex justify-between items-center p-4 pb-2">
            <h3 className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              Επιλογές προσβασιμότητας
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Κλείσιμο μενού"
              className={`p-1 rounded-md transition-colors focus:ring-2 focus:ring-blue-300 ${
                isDark 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-blue-900' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <X size={16} />
            </button>
          </div>
          <div className="px-4 pb-4 space-y-4">
            <div role="menuitem" className="space-y-2">
              <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                <Type size={18} />
                <span>Μέγεθος γραμματοσειράς</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleFontSize('14px')}
                  className="px-3 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-300"
                  aria-label="Μικρή γραμματοσειρά"
                >
                  A
                </button>
                <button
                  onClick={() => handleFontSize('16px')}
                  className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-300"
                  aria-label="Μεσαία γραμματοσειρά"
                >
                  A
                </button>
                <button
                  onClick={() => handleFontSize('20px')}
                  className="px-3 py-2 text-lg rounded bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-300"
                  aria-label="Μεγάλη γραμματοσειρά"
                >
                  A
                </button>
              </div>
            </div>

            <button
              onClick={handleContrast}
              role="menuitem"
              className={`flex items-center space-x-2 w-full p-2 rounded-lg ${
                isDark ? 'text-gray-200 hover:text-blue-400 hover:bg-blue-900' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-100'
              } transition-colors focus:ring-2 focus:ring-blue-300`}
            >
              <Eye size={18} />
              <span>Υψηλή αντίθεση</span>
            </button>

            <button
              onClick={handleScreenReader}
              role="menuitem"
              className={`flex items-center space-x-2 w-full p-2 rounded-lg ${
                isDark ? 'text-gray-200 hover:text-blue-400 hover:bg-blue-900' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-100'
              } transition-colors focus:ring-2 focus:ring-blue-300`}
            >
              <Monitor size={18} />
              <span>Βελτιστοποίηση για αναγνώστη οθόνης</span>
            </button>

            <button
              onClick={handleReduceMotion}
              role="menuitem"
              className={`flex items-center space-x-2 w-full p-2 rounded-lg ${
                isDark ? 'text-gray-200 hover:text-blue-400 hover:bg-blue-900' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-100'
              } transition-colors focus:ring-2 focus:ring-blue-300`}
            >
              <MousePointer size={18} />
              <span>Μείωση κίνησης</span>
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
