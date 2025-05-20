import { Facebook, Twitter, Linkedin, Link2, X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const SharePopup = ({ isOpen, onClose, isDark, title, url }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const shareOptions = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-6 h-6" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'X',
      icon: <Twitter className="w-6 h-6" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'hover:bg-black hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-700 hover:text-white'
    },
    {
      name: 'Copy Link',
      icon: <Link2 className="w-6 h-6" />,
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy link:', err);
        }
      },
      color: 'hover:bg-gray-600 hover:text-white'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999
        }}
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-2xl p-6 w-96 z-[10000]`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h3 className={`text-xl font-semibold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Κοινοποίηση
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => {
                if (option.onClick) {
                  option.onClick();
                } else {
                  window.open(option.url, '_blank', 'noopener,noreferrer');
                }
                onClose();
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-lg ${
                isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
              } ${option.color} transition-colors`}
            >
              {option.icon}
              <span className="mt-2 text-sm">{option.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

SharePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default SharePopup; 