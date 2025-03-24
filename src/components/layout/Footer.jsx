import PropTypes from 'prop-types';

const Footer = ({ isDark }) => {
  return (
    <footer className={`${
      isDark 
        ? 'bg-blue-950 text-white' 
        : 'bg-blue-50 text-gray-900'
    } transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className={`text-xl font-bold mb-4 ${
              isDark 
                ? 'text-blue-400' 
                : 'text-blue-600'
            }`}>ΕΣΕΕ</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Μητροπόλεως 42, Αθήνα 10563
            </p>
          </div>
          
          {Object.entries(navigation).map(([title, subItems], index) => (
            <div key={index}>
              <h3 className={`text-xl font-bold mb-4 ${
                isDark 
                  ? 'text-blue-400' 
                  : 'text-blue-600'
              }`}>{title}</h3>
              <ul className="space-y-2">
                {Object.keys(subItems).map((item) => (
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
            </div>
          ))}
        </div>
        
        <div className={`mt-12 pt-8 ${
          isDark 
            ? 'border-blue-900' 
            : 'border-blue-100'
        } border-t`}>
          <p className={`text-center ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © 2025 ΕΣΕΕ. Με επιφύλαξη παντός δικαιώματος.
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default Footer;
