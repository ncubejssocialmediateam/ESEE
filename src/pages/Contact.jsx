import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import formsService from '../services/formsService';

const Contact = () => {
  const { isDark } = useTheme();
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.info('[Contact] Submit clicked', {
        useRest: import.meta?.env?.VITE_FORMS_USE_REST,
        hasSupabaseUrl: Boolean(import.meta?.env?.VITE_SUPABASE_URL),
        hasAnonKey: Boolean(import.meta?.env?.VITE_SUPABASE_ANON_KEY)
      });
    } catch {
      // ignore if import.meta.env not available in some contexts
    }
    setIsSubmitting(true);
    setStatus(null);
    try {
      await formsService.submitContact(contactForm);
      setStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus(err.message || 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ΕΠΙΚΟΙΝΩΝΙΑ
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className={`text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Επικοινωνήστε μαζί μας για οποιαδήποτε πληροφορία ή υποστήριξη χρειάζεστε
            </p>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Phone */}
            <div className={`${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <Phone className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Τηλέφωνο
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <a href="tel:2103259200" className="hover:text-blue-600 transition-colors">
                  210 325 9200
                </a>
              </p>
            </div>

            {/* Email */}
            <div className={`${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <Mail className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Email
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <a href="mailto:info@esee.gr" className="hover:text-blue-600 transition-colors">
                  info@esee.gr
                </a>
              </p>
            </div>

            {/* Address */}
            <div className={`${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Διεύθυνση
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Μητροπόλεως 42<br />
                Αθήνα 10563
              </p>
            </div>

            {/* Hours */}
            <div className={`${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <Clock className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Ώρες Λειτουργίας
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Δευτέρα - Παρασκευή<br />
                09:00 - 17:00
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border rounded-xl p-8 max-w-4xl mx-auto`}>
            <h2 className={`text-2xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Στείλτε μας μήνυμα
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Όνομα *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Το όνομά σας"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Το email σας"
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Θέμα
                </label>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Θέμα του μηνύματος"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Μήνυμα *
                </label>
                <textarea
                  rows={6}
                  name="message"
                  value={contactForm.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Το μήνυμά σας..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    isDark 
                      ? `bg-blue-400 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-500'} text-blue-950` 
                      : `bg-blue-600 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'} text-white`
                  }`}
                >
                  {isSubmitting ? 'Αποστολή...' : 'Αποστολή Μηνύματος'}
                </button>
              </div>

              {status === 'success' && (
                <div className={`${isDark ? 'text-green-400' : 'text-green-700'} text-center`}>
                  Το μήνυμα στάλθηκε επιτυχώς.
                </div>
              )}
              {status && status !== 'success' && (
                <div className={`${isDark ? 'text-red-400' : 'text-red-600'} text-center`}>
                  Αποτυχία αποστολής: {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      
      <Footer isDark={isDark} />
    </main>
  );
};

export default Contact;
