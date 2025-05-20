import { useState } from 'react';
import { Calendar, Clock, Share2, Bookmark, ChevronRight } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext.jsx";
import ShareButton from '../common/ShareButton';
import SharePopup from '../common/SharePopup';

const ESEENewspaper = () => {
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [isShareOpen, setIsShareOpen] = useState(false);
  
  return (
    <div className="py-12" style={{ background: '#f5f5f5' }}>
      {/* Newspaper Header */}
      <div className="max-w-6xl mx-auto bg-[#fff9f0] shadow-xl" 
        style={{
          backgroundImage: `
            radial-gradient(#00000011 1px, transparent 0),
            radial-gradient(#00000011 1px, transparent 0)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
          boxShadow: `
            0 2px 4px rgba(0,0,0,0.1),
            0 8px 16px rgba(0,0,0,0.1),
            inset 0 0 0 1px rgba(0,0,0,0.05)
          `
        }}>
        <div className="border-b-4 border-black p-8" style={{ borderColor: 'rgba(0,0,0,0.85)' }}>
          <div className="text-center">
            <div className="text-sm font-serif mb-2">Τεύχος 1 • Ιανουάριος 2025</div>
            <h1 className="font-serif text-6xl font-bold tracking-tight mb-4">
              Η ΕΦΗΜΕΡΙΔΑ ΤΗΣ ΕΣΕΕ
            </h1>
            <div className="flex items-center justify-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>28 Ιανουαρίου 2025</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Εβδομαδιαία Έκδοση</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-8 p-8">
          {/* Lead Story */}
          <div className="col-span-8 border-r border-gray-300 pr-8" style={{ borderColor: 'rgba(0,0,0,0.15)' }}>
            <div className="mb-8">
              <div 
                className="aspect-video w-full mb-4 rounded-sm flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0077b6 0%, #023e8a 100%)',
                }}
              >
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
                <div className="text-white text-opacity-90 text-6xl">🏢</div>
              </div>
              <h2 className="font-serif text-4xl font-bold mb-4">
                Νέες Προοπτικές Ανάπτυξης για το Ελληνικό Εμπόριο
              </h2>
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <span className="font-medium">Από τον Διευθυντή Σύνταξης</span>
                <span className="mx-2">•</span>
                <span>10 λεπτά ανάγνωση</span>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Σε μια εποχή που οι προκλήσεις για το ελληνικό εμπόριο πολλαπλασιάζονται, 
                η ΕΣΕΕ παρουσιάζει ένα ολοκληρωμένο πλάνο δράσης για την ενίσχυση της 
                ανταγωνιστικότητας των ελληνικών επιχειρήσεων. Το νέο πρόγραμμα, που 
                παρουσιάστηκε στην ετήσια συνέλευση της Συνομοσπονδίας, περιλαμβάνει 
                καινοτόμες δράσεις και πρωτοβουλίες.
              </p>
            </div>

            {/* Secondary Stories */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div 
                  className="aspect-video w-full mb-4 rounded-sm flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)',
                  }}
                >
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  <div className="text-white text-opacity-90 text-6xl">💻</div>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">
                  Ψηφιακός Μετασχηματισμός
                </h3>
                <p className="text-gray-700">
                  Νέες ψηφιακές λύσεις για τις μικρομεσαίες επιχειρήσεις.
                </p>
              </div>
              <div>
                <div 
                  className="aspect-video w-full mb-4 rounded-sm flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #2d6a4f 0%, #40916c 100%)',
                  }}
                >
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  <div className="text-white text-opacity-90 text-6xl">🌱</div>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">
                  Πράσινη Ανάπτυξη
                </h3>
                <p className="text-gray-700">
                  Περιβαλλοντικές δράσεις και βιώσιμες πρακτικές.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4">
            <div className="bg-[#fff9f0] p-6 mb-8" style={{ 
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
              backgroundImage: `
                radial-gradient(#00000008 1px, transparent 0),
                radial-gradient(#00000008 1px, transparent 0)
              `,
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 8px 8px'
            }}>
              <h3 className="font-serif text-xl font-bold mb-4">
                Τελευταία Νέα
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border-b border-gray-200 pb-4 last:border-0">
                    <h4 className="font-serif font-bold mb-2">
                      Ανακοίνωση Νέων Προγραμμάτων
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Σύντομη περιγραφή της είδησης και των βασικών σημείων...
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Overview */}
            <div className="border-t-2 pt-4" style={{ borderColor: 'rgba(0,0,0,0.85)' }}>
              <h3 className="font-serif text-xl font-bold mb-4">
                Επισκόπηση Αγοράς
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Λιανεμπόριο', value: '+2.3%' },
                  { label: 'Ηλ. Εμπόριο', value: '+15.7%' },
                  { label: 'Εξαγωγές', value: '+5.1%' }
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="font-medium">{stat.label}</span>
                    <span className="text-green-600">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t border-gray-200 p-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <ShareButton onClick={() => setIsShareOpen(true)} />
              <button className="flex items-center text-gray-600 hover:text-blue-600">
                <Bookmark className="w-4 h-4 mr-2" />
                Αποθήκευση
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">Σελίδα {currentPage} από 12</span>
              <button 
                className="flex items-center text-blue-600 hover:text-blue-700"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, 12))}
              >
                Επόμενη Σελίδα
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

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

export default ESEENewspaper;
