import ShareButton from '../components/common/ShareButton';
import SharePopup from '../components/common/SharePopup';

const Newspaper = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
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
  );
};

export default Newspaper; 