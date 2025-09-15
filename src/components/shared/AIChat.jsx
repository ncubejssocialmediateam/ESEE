import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiMinimize2, FiMaximize2, FiZap, FiTrendingUp, FiShield, FiDollarSign, FiUsers, FiBookOpen } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const AIChat = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Γεια σας! Είμαι ο AI βοηθός της ΕΣΕΕ. Πώς μπορώ να σας βοηθήσω σήμερα;',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickAnswers = [
    {
      id: 'tax-compliance',
      title: 'Φορολογική Συμμόρφωση',
      description: 'myDATA & ηλεκτρονικές αποδείξεις',
      icon: FiShield,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      id: 'energy-costs',
      title: 'Κόστος Ενέργειας',
      description: 'Διαχείριση ενεργειακών εξόδων',
      icon: FiZap,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      id: 'digital-transformation',
      title: 'Ψηφιακός Μετασχηματισμός',
      description: 'Ηλεκτρονικά συστήματα',
      icon: FiTrendingUp,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 'financial-assistance',
      title: 'Οικονομική Υποστήριξη',
      description: 'Επιδοτήσεις & δάνεια',
      icon: FiDollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 'labor-law',
      title: 'Εργατικό Δίκαιο',
      description: 'ERGANI II & ψηφιακές κάρτες',
      icon: FiUsers,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: 'training',
      title: 'Εκπαίδευση',
      description: 'KAELE προγράμματα',
      icon: FiBookOpen,
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50 dark:bg-rose-900/20'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getAIResponse = (answerId) => {
    const responses = {
      'tax-compliance': 'Η ΕΣΕΕ παρέχει ολοκληρωμένη υποστήριξη για φορολογική συμμόρφωση:\n\n• Υλοποίηση συστήματος myDATA\n• Ηλεκτρονικές αποδείξεις και παραστατικά\n• Διαχείριση ΦΠΑ (6%, 13%, 24%)\n• Ηλεκτρονικό τέλος συναλλαγών (0.3%-3.6%)\n• Οδηγίες πληρωμής εταιρικού φόρου (8 μηνιαίες δόσεις)\n\nΘέλετε περισσότερες λεπτομέρειες για κάποιο συγκεκριμένο θέμα;',
      'energy-costs': 'Για τη διαχείριση του κόστους ενέργειας, η ΕΣΕΕ προτείνει:\n\n• Παρακολούθηση τιμών ενέργειας\n• Εφαρμογή ενεργειακών μέτρων αποδοτικότητας\n• Αξιοποίηση κρατικών επιδοτήσεων\n• Συνεργασία με ενεργειακούς συμβούλους\n• Αναζήτηση εναλλακτικών πηγών ενέργειας\n\nΤο 85.7% των επιχειρήσεων επηρεάζεται αρνητικά από το κόστος ενέργειας. Πώς μπορώ να σας βοηθήσω περαιτέρω;',
      'digital-transformation': 'Η ψηφιακή μετάβαση είναι κρίσιμη για την επιβίωση:\n\n• Πύλη ΕΣΕΕ Digital Services (esee-digital.gr)\n• Υλοποίηση υποχρεωτικών ηλεκτρονικών συστημάτων\n• Εκπαίδευση ψηφιακών δεξιοτήτων\n• Κέντρο Καινοτομίας Λιανικής\n• Συνεργασία με τεχνολογικούς παρόχους\n\nΜόνο το 52.4% των ελληνικών ΜΜΕ έχει βασική ψηφιακή ολοκλήρωση. Θέλετε βοήθεια με συγκεκριμένο σύστημα;',
      'financial-assistance': 'Διαθέσιμες οικονομικές υποστηρίξεις:\n\n• Ευρωπαϊκό Ταμείο Ανάκαμψης (€2.79 δισ. σε 265 δάνεια ΜΜΕ)\n• Κρατικά προγράμματα επιδοτήσεων\n• Συντονισμός κρίσεων\n• Συμβουλευτική αναδιάρθρωσης χρέους\n• Πρόσβαση σε χρηματοδοτικά προγράμματα\n\nΠοια κατηγορία χρηματοδότησης σας ενδιαφέρει περισσότερο;',
      'labor-law': 'Υποστήριξη εργατικού δικαίου:\n\n• Ψηφιακές Κάρτες Εργασίας (ERGANI II)\n• Ηλεκτρονικά συστήματα παρακολούθησης ωρών\n• Προστασία καταγγελιών (επιχειρήσεις >50 εργαζομένων)\n• Ίση μεταχείριση και αντιαποκλεισμός\n• Διαχείριση άδειας μητρότητας/πατρότητας\n\nΈχετε συγκεκριμένη ερώτηση για εργατικό δίκαιο;',
      'training': 'Εκπαιδευτικά προγράμματα KAELE:\n\n• Πιστοποιημένη ποιότητα ISO 9001:2015\n• 70ωρα προγράμματα Δια Βίου Μάθησης\n• Ψηφιακή πλατφόρμα ERMEION+ (ermeion.kaele.gr)\n• 62 τρέχοντα προγράμματα\n• 700+ συμμετέχοντες εθνικά\n• Επαγγελματική συμβουλευτική\n\nΠοιον τομέα εξειδίκεσης σας ενδιαφέρει;'
    };
    return responses[answerId] || 'Συγγνώμη, δεν μπορώ να βρω την απάντηση. Μπορείτε να ρωτήσετε κάτι άλλο;';
  };

  const getAIResponseForInput = (input) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('φορολογ')) {
        return getAIResponse('tax-compliance');
    }
    if (lowerInput.includes('ενέργεια')) {
        return getAIResponse('energy-costs');
    }
    if (lowerInput.includes('ψηφιακ')) {
        return getAIResponse('digital-transformation');
    }
    if (lowerInput.includes('οικονομικ') || lowerInput.includes('χρηματοδότηση')) {
        return getAIResponse('financial-assistance');
    }
    if (lowerInput.includes('εργατικ')) {
        return getAIResponse('labor-law');
    }
    if (lowerInput.includes('εκπαίδευση') || lowerInput.includes('σεμινάρια')) {
        return getAIResponse('training');
    }

    return 'Συγγνώμη, δεν κατάλαβα την ερώτησή σας. Μπορείτε να δοκιμάσετε μια από τις γρήγορες απαντήσεις ή να διατυπώσετε την ερώτησή σας διαφορετικά?';
  }

  const handleQuickAnswer = (answer) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: answer.title,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue(''); // Clear any existing input
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: getAIResponse(answer.id),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInputValue = inputValue;
    setInputValue(''); // Clear input immediately
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: getAIResponseForInput(currentInputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className={`group relative p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl ${
              isDark 
                ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border border-slate-600/50' 
                : 'bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200/50'
            } backdrop-blur-xl`}
            aria-label="Άνοιγμα AI Chat"
          >
            <div className="relative">
              <FiMessageCircle 
                size={28} 
                className={`transition-all duration-300 group-hover:rotate-12 sm:w-8 sm:h-8 ${
                  isDark ? 'text-cyan-400' : 'text-blue-600'
                }`}
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden pointer-events-none">
              <div className={`absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${
                isDark ? 'bg-cyan-400/60' : 'bg-blue-400/60'
              } animate-ping`} style={{ animationDelay: '0s' }}></div>
              <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${
                isDark ? 'bg-emerald-400/60' : 'bg-green-400/60'
              } animate-ping`} style={{ animationDelay: '1s' }}></div>
              <div className={`absolute bottom-1.5 left-2 sm:bottom-2 sm:left-3 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${
                isDark ? 'bg-purple-400/60' : 'bg-purple-400/60'
              } animate-ping`} style={{ animationDelay: '2s' }}></div>
            </div>
          </button>
          
          {/* Tooltip */}
          <div className={`absolute bottom-full right-0 mb-2 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 ${
            isDark 
              ? 'bg-slate-700 text-slate-200 border border-slate-600' 
              : 'bg-gray-800 text-white'
          }`}>
            AI Assistant
            <div className={`absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 ${
              isDark ? 'border-t-slate-700' : 'border-t-gray-800'
            }`}></div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1rem)] sm:w-80 md:w-96 max-w-[calc(100vw-1rem)] ${
          isMinimized ? 'h-14' : 'h-[calc(100vh-2rem)] sm:h-[500px] md:h-[600px] max-h-[600px]'
        } transition-all duration-500 flex flex-col ${
          isDark 
            ? 'bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border border-slate-700/50' 
            : 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 border border-gray-200/50'
        } rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-2xl`}>
          
          {/* Chat Header */}
          <div className={`flex items-center justify-between p-3 border-b flex-shrink-0 ${
            isDark ? 'border-slate-700/50' : 'border-gray-200/50'
          } rounded-t-xl sm:rounded-t-2xl`}>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse`}></div>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-ping opacity-75"></div>
              </div>
              <div>
                <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ΕΣΕΕ AI Assistant
                </h3>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  {(inputValue.trim().length > 0 || messages.length > 1) ? 'Συνομιλία • 2025' : 'Online • 2025'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isDark 
                    ? 'hover:bg-slate-700/50 text-slate-400 hover:text-white' 
                    : 'hover:bg-gray-100/50 text-gray-500 hover:text-gray-700'
                }`}
                aria-label={isMinimized ? 'Μεγέθυνση' : 'Σμίκρυνση'}
              >
                {isMinimized ? <FiMaximize2 size={16} /> : <FiMinimize2 size={16} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isDark 
                    ? 'hover:bg-red-500/20 text-slate-400 hover:text-red-400' 
                    : 'hover:bg-red-50 text-gray-500 hover:text-red-500'
                }`}
                aria-label="Κλείσιμο"
              >
                <FiX size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0 transition-all duration-300">
                {messages.length <= 1 && (
                  <div className={`pb-3 border-b ${isDark ? 'border-slate-700/50' : 'border-gray-200/50'}`}>
                    <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                      Γρήγορες απαντήσεις:
                    </p>
                    
                    {/* Mobile: Horizontal scrollable */}
                    <div className="sm:hidden">
                      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                        {quickAnswers.map((answer) => {
                          const IconComponent = answer.icon;
                          return (
                            <button
                              key={answer.id}
                              onClick={() => handleQuickAnswer(answer)}
                              className={`group relative flex-shrink-0 w-28 p-2.5 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                                isDark
                                  ? `${answer.bgColor} hover:bg-opacity-30 border border-slate-600/30 hover:border-slate-500/50`
                                  : `${answer.bgColor} hover:bg-opacity-40 border border-gray-200/50 hover:border-gray-300/50`
                              } backdrop-blur-sm`}
                            >
                              <div className="flex flex-col items-center space-y-1.5">
                                <div className={`p-1.5 rounded-md bg-gradient-to-r ${answer.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                  <IconComponent size={14} className="text-white" />
                                </div>
                                <div>
                                  <p className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-gray-800'} group-hover:text-opacity-90 transition-colors`}>
                                    {answer.title}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Desktop: Grid layout */}
                    <div className="hidden sm:grid grid-cols-2 gap-2">
                      {quickAnswers.map((answer) => {
                        const IconComponent = answer.icon;
                        return (
                          <button
                            key={answer.id}
                            onClick={() => handleQuickAnswer(answer)}
                            className={`group relative p-2.5 rounded-lg text-left transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                              isDark
                                ? `${answer.bgColor} hover:bg-opacity-30 border border-slate-600/30 hover:border-slate-500/50`
                                : `${answer.bgColor} hover:bg-opacity-40 border border-gray-200/50 hover:border-gray-300/50`
                            } backdrop-blur-sm`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <div className={`p-1.5 rounded-md bg-gradient-to-r ${answer.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                <IconComponent size={14} className="text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-gray-800'} group-hover:text-opacity-90 transition-colors`}>
                                  {answer.title}
                                </p>
                                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-600'} group-hover:text-opacity-80 transition-colors`}>
                                  {answer.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-xl transition-all duration-200 hover:scale-[1.01] ${
                        message.type === 'user'
                          ? isDark
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg'
                            : 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg'
                          : isDark
                          ? 'bg-gradient-to-br from-slate-700/90 to-slate-600/90 text-slate-100 border border-slate-600/50'
                          : 'bg-gradient-to-br from-gray-100/90 to-gray-50/90 text-gray-900 border border-gray-200/50'
                      } backdrop-blur-sm`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 font-medium ${
                        message.type === 'user' 
                          ? 'text-blue-100/80' 
                          : isDark ? 'text-slate-400' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('el-GR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className={`p-3 rounded-xl ${
                      isDark 
                        ? 'bg-gradient-to-br from-slate-700/90 to-slate-600/90 border border-slate-600/50' 
                        : 'bg-gradient-to-br from-gray-100/90 to-gray-50/90 border border-gray-200/50'
                    } backdrop-blur-sm`}>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className={`p-3 border-t flex-shrink-0 ${
                isDark ? 'border-slate-700/50' : 'border-gray-200/50'
              }`}>
                <div className="flex items-center space-x-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={inputValue.trim() ? "Συνεχίστε τη συνομιλία..." : "Γράψτε την ερώτησή σας..."}
                    className={`flex-1 p-3 rounded-xl border transition-all duration-200 focus:scale-[1.01] ${
                      isDark
                        ? 'bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-slate-600/50 text-white placeholder-slate-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20'
                        : 'bg-gradient-to-r from-white/80 to-gray-50/80 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20'
                    } backdrop-blur-sm focus:outline-none text-sm`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                      inputValue.trim()
                        ? isDark
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white shadow-lg hover:shadow-xl'
                        : isDark
                        ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed border border-slate-600/30'
                        : 'bg-gray-200/50 text-gray-400 cursor-not-allowed border border-gray-300/30'
                    }`}
                    aria-label="Αποστολή μηνύματος"
                  >
                    <FiSend size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AIChat;
