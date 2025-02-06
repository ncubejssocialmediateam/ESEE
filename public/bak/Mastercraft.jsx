import React, { useState } from 'react';
import { BookOpen, Award, Users, Star, Calendar, ArrowRight, Play, FileCheck } from 'lucide-react';

const MasterCraftPlatform = () => {
  const [activeTab, setActiveTab] = useState('featured');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-6">
                ESEE MasterCraft
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Μεταφορά εμπειρίας και τεχνογνωσίας από καταξιωμένους εμπόρους 
                στη νέα γενιά επαγγελματιών.
              </p>
              <div className="flex space-x-4">
                <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-blue-50">
                  Γίνε Μέντορας
                </button>
                <button className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10">
                  Αναζήτηση Μαθημάτων
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '500+', label: 'Ενεργοί Μέντορες' },
                { number: '2000+', label: 'Εκπαιδευόμενοι' },
                { number: '150+', label: 'Επιτυχημένες Ιστορίες' },
                { number: '15+', label: 'Χώρες' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Featured Mentors */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Καταξιωμένοι Μέντορες</h2>
          <div className="grid grid-cols-3 gap-8">
            {[1, 2, 3].map((mentor) => (
              <div key={mentor} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-video bg-gray-100"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="ml-4">
                      <h3 className="font-medium">Γιώργος Παπαδόπουλος</h3>
                      <p className="text-sm text-gray-600">40+ χρόνια εμπειρίας στο λιανεμπόριο</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>4.9/5 (120 αξιολογήσεις)</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>12 ενότητες εκπαίδευσης</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      <span>85 επιτυχημένοι εκπαιδευόμενοι</span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Προβολή Προφίλ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Ιστορίες Επιτυχίας</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              European Success Stories Competition →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {[1, 2].map((story) => (
              <div key={story} className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center mb-6">
                  <Award className="w-8 h-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="font-medium">Από μαθητευόμενος σε επιχειρηματίας</h3>
                    <p className="text-sm text-gray-600">Finalist - European Retail Innovation 2024</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  "Η καθοδήγηση που έλαβα από τον μέντορά μου ήταν καθοριστική για την 
                  επιτυχία της επιχείρησής μου. Σε 18 μήνες καταφέραμε να..."
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="ml-3">
                      <div className="font-medium">Μαρία Κ.</div>
                      <div className="text-sm text-gray-600">Fashion Retail</div>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    Περισσότερα
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm p-12">
          <h2 className="text-2xl font-bold text-center mb-12">Πώς Λειτουργεί</h2>
          <div className="grid grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Αντιστοίχιση",
                description: "Σύνδεση με τον κατάλληλο μέντορα βάσει τομέα και στόχων"
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Πρόγραμμα",
                description: "Εξατομικευμένο πλάνο εκπαίδευσης και πρακτικής άσκησης"
              },
              {
                icon: <Play className="w-8 h-8" />,
                title: "Εκπαίδευση",
                description: "Συνδυασμός θεωρίας και πρακτικής εξάσκησης"
              },
              {
                icon: <FileCheck className="w-8 h-8" />,
                title: "Πιστοποίηση",
                description: "Αναγνωρισμένη πιστοποίηση επαγγελματικής εμπειρίας"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4 text-blue-600">
                  {step.icon}
                </div>
                <h3 className="font-medium mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterCraftPlatform;
