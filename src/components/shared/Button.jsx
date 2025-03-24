import PropTypes from 'prop-types';

const Button = ({ children, onClick, isDark, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 
        rounded-lg 
        font-medium 
        transition-all 
        duration-200 
        ${isDark 
          ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-800' 
          : 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300'
        }
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
