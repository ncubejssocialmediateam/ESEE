import ShareButton from '../components/common/ShareButton';
import SharePopup from '../components/common/SharePopup';
import Navigation from '../components/layout/Navigation';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const Newspaper = () => {
  const { isDark } = useTheme();
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <main className="bg-gray-900 text-white transition-colors duration-300">
      <Navigation isDark={isDark} />
      <div className="flex justify-center mt-12">
      <ShareButton onClick={() => setIsShareOpen(true)} />
      <SharePopup 
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        isDark={isDark}
        title="Εφημερίδα"
        url={window.location.href}
      />
      </div>
    </main>
  );
};

export default Newspaper; 