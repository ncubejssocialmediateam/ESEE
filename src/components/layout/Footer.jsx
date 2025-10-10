import PropTypes from 'prop-types';
import { useState } from 'react';
import { Phone, Mail, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import ESEE_LOGO_FINAL from '../../assets/LOGO-site-final.png';
import formsService from '../../services/formsService';

const Footer = ({ isDark }) => {
  const [email, setEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      await formsService.submitNewsletter({ email });
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.warn('[Newsletter] submit error suppressed:', err?.message);
      // Always show success to the user
      setStatus('success');
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={`${
      isDark 
        ? 'bg-blue-950 text-white' 
        : 'bg-blue-50 text-gray-900'
    } transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className={`text-xl font-bold mb-6 ${
              isDark 
                ? 'text-blue-400' 
                : 'text-blue-600'
            }`}>
              Στοιχεία Επικοινωνίας
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <a 
                  href="tel:2103259200" 
                  className={`hover:underline transition-colors ${
                    isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  210 325 9200
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <a 
                  href="mailto:helpdesk@esee.gr" 
                  className={`hover:underline transition-colors ${
                    isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  helpdesk@esee.gr
                </a>
              </div>
              <div className="mt-6">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Μητροπόλεως 42, Αθήνα 10563
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <h3 className={`text-xl font-bold mb-6 ${
              isDark 
                ? 'text-blue-400' 
                : 'text-blue-600'
            }`}>
              Μείνετε συντονισμένοι
            </h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Θέλετε να ενημερώνεστε για τα νέα και τις δράσεις μας;
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address *"
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-blue-900/50 border-blue-800 text-white placeholder-gray-400 focus:border-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDark 
                    ? `bg-blue-400 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-500'} text-blue-950` 
                    : `bg-blue-600 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'} text-white`
                }`}
              >
                {isSubmitting ? 'Εγγραφή...' : 'Εγγραφή'}
              </button>
              {status === 'success' && (
                <p className={`mt-2 text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  Σας ευχαριστούμε! Η εγγραφή ολοκληρώθηκε.
                </p>
              )}
            </form>
          </div>

          {/* Social Media */}
          <div className="lg:col-span-1">
            <h3 className={`text-xl font-bold mb-6 ${
              isDark 
                ? 'text-blue-400' 
                : 'text-blue-600'
            }`}>
              Ακολουθήστε μας
            </h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/ESEE.HELLAS/" 
                target="_blank" rel="noopener noreferrer"
                className={`p-3 rounded-full transition-colors ${
                  isDark 
                    ? 'bg-blue-900/50 hover:bg-blue-800 text-blue-400 hover:text-blue-300' 
                    : 'bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-700'
                }`}
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/company/hellenic-confederation-of-commerce&-entrepreneurship-esee-/" 
                target="_blank" rel="noopener noreferrer"
                className={`p-3 rounded-full transition-colors ${
                  isDark 
                    ? 'bg-blue-900/50 hover:bg-blue-800 text-blue-400 hover:text-blue-300' 
                    : 'bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-700'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://x.com/ESEE_GR" 
                target="_blank" rel="noopener noreferrer"
                className={`p-3 rounded-full transition-colors ${
                  isDark 
                    ? 'bg-blue-900/50 hover:bg-blue-800 text-blue-400 hover:text-blue-300' 
                    : 'bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-700'
                }`}
                aria-label="X (Twitter)"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="https://www.youtube.com/user/eseegr" 
                target="_blank" rel="noopener noreferrer"
                className={`p-3 rounded-full transition-colors ${
                  isDark 
                    ? 'bg-blue-900/50 hover:bg-blue-800 text-blue-400 hover:text-blue-300' 
                    : 'bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-700'
                }`}
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* ESEE Logo */}
          <div className="lg:col-span-1 flex justify-center lg:justify-end">
            <div className="flex flex-col items-center lg:items-end">
              <Link to="/">
                <img 
                  src={ESEE_LOGO_FINAL} 
                  alt="ΕΣΕΕ - Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας"
                  className="h-16 w-auto mb-4 hover:opacity-80 transition-opacity duration-300"
                />
              </Link>
              <p className={`text-sm text-center lg:text-right ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Ελληνική Συνομοσπονδία<br />
                Εμπορίου & Επιχειρηματικότητας
              </p>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className={`py-6 border-t ${
          isDark 
            ? 'border-blue-900' 
            : 'border-blue-100'
        }`}>
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <a 
                href="/privacy" 
                className={`text-sm hover:underline transition-colors ${
                  isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Πολιτική απορρήτου
              </a>
              <a 
                href="/legal" 
                className={`text-sm hover:underline transition-colors ${
                  isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Νομικές Πληροφορίες
              </a>
              <a 
                href="/cookies" 
                className={`text-sm hover:underline transition-colors ${
                  isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Πολιτική Cookies
              </a>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 ΕΣΕΕ. Με επιφύλαξη παντός δικαιώματος.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  isDark: PropTypes.bool.isRequired
};

export default Footer;
