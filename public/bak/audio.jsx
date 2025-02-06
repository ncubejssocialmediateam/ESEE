import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, Settings, ArrowRight } from 'lucide-react';

const AudioAccessibility = () => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(1);

  const handleVoiceCommand = () => {
    setIsListening(true);
    // Εδώ θα προσθέταμε την πραγματική λογική αναγνώρισης φωνής
    setTimeout(() => setIsListening(false), 2000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Main Control Panel */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4">
          {/* Primary Controls */}
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`p-3 rounded-full ${
                isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
              aria-label="Ενεργοποίηση ηχητικής πλοήγησης"
            >
              {isActive ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>

            {isActive && (
              <>
                <button
                  onClick={handleVoiceCommand}
                  className={`p-3 rounded-full ${
                    isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600'
                  }`}
                  aria-label="Φωνητική εντολή"
                >
                  <Mic className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  aria-label="Ρυθμίσεις προσβασιμότητας"
                >
                  <Settings className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Settings Panel */}
          {isActive && showSettings && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ένταση Ήχου
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ταχύτητα Ομιλίας
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="pt-2">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Αποθήκευση Ρυθμίσεων
                </button>
              </div>
            </div>
          )}

          {/* Active Indicator */}
          {isActive && (
            <div className="mt-4 px-4 py-2 bg-blue-50 text-blue-800 rounded-lg text-sm">
              {isListening ? (
                <div className="flex items-center">
                  <Mic className="w-4 h-4 mr-2 animate-pulse" />
                  <span>Ακούω την εντολή σας...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Volume2 className="w-4 h-4 mr-2" />
                  <span>Η ηχητική πλοήγηση είναι ενεργή</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Commands */}
        {isActive && (
          <div className="border-t px-4 py-3 bg-gray-50 rounded-b-lg">
            <div className="text-sm text-gray-600 mb-2">Γρήγορες Εντολές:</div>
            <div className="space-y-2">
              {[
                'Ανάγνωση σελίδας',
                'Μετάβαση στο μενού',
                'Αναζήτηση',
                'Επικοινωνία'
              ].map((command) => (
                <button
                  key={command}
                  className="flex items-center justify-between w-full px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded"
                >
                  {command}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioAccessibility;