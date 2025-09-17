import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Στοιχεία Επικοινωνίας ΕΣΕΕ</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Τηλέφωνο</p>
            <p className="text-sm text-gray-600">210 325 9200</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Mail className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Email</p>
            <p className="text-sm text-gray-600">info@esee.gr</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <MapPin className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Κάλυψη</p>
            <p className="text-sm text-gray-600">Ολόκληρη η Ελλάδα</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Ώρες Λειτουργίας</p>
            <p className="text-sm text-gray-600">Δευτέρα - Παρασκευή: 09:00 - 17:00</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          Η ΕΣΕΕ αποτελεί τη θεσμική και υπεύθυνη φωνή περίπου 225.000 επιχειρήσεων από ολόκληρη τη χώρα.
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
