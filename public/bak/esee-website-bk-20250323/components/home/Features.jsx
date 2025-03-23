import { Building, Users, FileText, Globe } from 'lucide-react';

const features = [
  {
    icon: <Building className="w-12 h-12 text-blue-600" />,
    title: 'Εμπορικοί Σύλλογοι',
    description: 'Υποστήριξη και ανάπτυξη του εμπορικού κλάδου'
  },
  {
    icon: <Users className="w-12 h-12 text-blue-600" />,
    title: 'Μέλη',
    description: 'Εκπροσώπηση των συμφερόντων των μελών μας'
  },
  {
    icon: <FileText className="w-12 h-12 text-blue-600" />,
    title: 'Έρευνες',
    description: 'Μελέτες και αναλύσεις της αγοράς'
  },
  {
    icon: <Globe className="w-12 h-12 text-blue-600" />,
    title: 'Διεθνείς Σχέσεις',
    description: 'Συνεργασίες με διεθνείς οργανισμούς'
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transform-gpu transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl group"
            >
              <div className="icon-wrapper mb-4 transform-gpu transition-transform duration-500 group-hover:rotate-[360deg]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
