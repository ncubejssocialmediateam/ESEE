import PropTypes from 'prop-types';

const ShareButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition-colors"
    >
      Κοινοποίηση
    </button>
  );
};

ShareButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ShareButton; 