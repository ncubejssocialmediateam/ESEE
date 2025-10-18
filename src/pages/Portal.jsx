import { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  Users, 
  Bell, 
  ArrowRight,
  Shield,
  Clock,
  TrendingUp,
  MessageSquare,
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Building2
} from 'lucide-react';
import TaxCalendar from './TaxCalendar';
import usePortalData from '../hooks/usePortalData';
import ContactInfo from '../components/portal/ContactInfo';
import FederationsAccordion from '../components/portal/FederationsAccordion';
import PollSection from '../components/portal/PollSection';
import Navigation from '../components/layout/Navigation';
import { useTheme } from '../context/ThemeContext';
import MemberSupport from './MemberSupport';
import { Link } from 'react-router-dom';

const Portal = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [recentActivities, setRecentActivities] = useState([]);
  const { isDark } = useTheme();
  
  // Use the custom hook for portal data
  const {
    portalStats,
    memberStats,
    taxStats,
    notifications,
    documents,
    loading,
    error,
    lastUpdated,
    refreshData
  } = usePortalData();

  const portalServices = [
    {
      id: 'documents',
      title: 'Έγγραφα & Φόρμες',
      description: 'Πρόσβαση σε όλα τα απαραίτητα έγγραφα και φόρμες',
      icon: FileText,
      color: 'bg-green-500',
      href: '#documents'
    },
    {
      id: 'members',
      title: 'Διαχείριση Μελών',
      description: 'Διαχείριση των μελών της ΕΣΕΕ',
      icon: Users,
      color: 'bg-purple-500',
      href: '#members'
    },
    {
      id: 'notifications',
      title: 'Ειδοποιήσεις',
      description: 'Σημαντικές ειδοποιήσεις και ανακοινώσεις',
      icon: Bell,
      color: 'bg-orange-500',
      href: '#notifications'
    },
    {
      id: 'polls',
      title: 'Έρευνες Γνώμης',
      description: 'Συμμετέχετε σε έρευνες και δώστε τη γνώμη σας',
      icon: TrendingUp,
      color: 'bg-pink-500',
      href: '#polls'
    },
    {
      id: 'helpdesk',
      title: 'ΥΠΟΣΤΗΡΙΞΗ ΜΕΛΩΝ',
      description: 'Ερωτοαπαντήσεις και υποστήριξη μελών',
      icon: MessageSquare,
      color: 'bg-rose-500',
      href: '#helpdesk'
    }
  ];

  const getQuickStats = () => {
    if (!memberStats || !taxStats || !portalStats || !notifications) {
      return [
        {
          title: 'Ενεργά Μέλη',
          value: '...',
          icon: Users,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        },
        {
          title: 'Φορολογικές Προθεσμίες',
          value: '...',
          icon: Clock,
          color: 'text-orange-600',
          bgColor: 'bg-orange-100'
        },
        {
          title: 'Συνολικά Άρθρα',
          value: '...',
          icon: FileText,
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        },
        {
          title: 'Ειδοποιήσεις',
          value: '...',
          icon: Bell,
          color: 'text-red-600',
          bgColor: 'bg-red-100'
        }
      ];
    }

    return [
      {
        title: 'Επιχειρήσεις',
        value: memberStats.totalMembers.toLocaleString(),
        icon: Users,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        subtitle: '225.000 μέλη'
      },
      {
        title: 'Ομοσπονδίες',
        value: memberStats.federations.toString(),
        icon: Shield,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        subtitle: '17 Ομοσπονδίες'
      },
      {
        title: 'Εμπορικοί Σύλλογοι',
        value: memberStats.tradeAssociations.toString(),
        icon: FileText,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        subtitle: '354 Συλλόγοι'
      },
      {
        title: 'Ειδοποιήσεις',
        value: notifications.filter(n => !n.read).length.toString(),
        icon: Bell,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        subtitle: 'Μη αναγνωσμένες'
      }
    ];
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'article':
        return FileText;
      case 'deadline':
        return Calendar;
      case 'member':
        return Users;
      case 'notification':
        return Bell;
      default:
        return MessageSquare;
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getQuickStats().map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                )}
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Portal Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Υπηρεσίες Portal</h2>
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portalServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveTab(service.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${service.color} text-white`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <span>Πρόσβαση</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Πρόσφατες Δραστηριότητες</h2>
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            {recentActivities.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Δεν υπάρχουν πρόσφατες δραστηριότητες</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.slice(0, 5).map((activity) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <ActivityIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        {activity.category && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {activity.category}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Επικοινωνία</h2>
          <ContactInfo />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'helpdesk':
        return <MemberSupport embedded={true} />;
      case 'documents':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Έγγραφα & Φόρμες</h2>
              <button
                onClick={refreshData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Ανανέωση
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    {doc.isRequired && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                        Απαραίτητο
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Κατηγορία:</span>
                      <span className="font-medium">{doc.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Μέγεθος:</span>
                      <span className="font-medium">{doc.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Τελευταία ενημέρωση:</span>
                      <span className="font-medium">
                        {doc.lastUpdated.toLocaleDateString('el-GR')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Download className="w-4 h-4" />
                      Λήψη
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'members':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Στατιστικά Μελών</h2>
            
            {memberStats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Συνολικές Επιχειρήσεις</p>
                      <p className="text-2xl font-bold text-gray-900">{memberStats.totalMembers.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">Από ολόκληρη τη χώρα</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ομοσπονδίες</p>
                      <p className="text-2xl font-bold text-gray-900">{memberStats.federations}</p>
                      <p className="text-xs text-gray-500 mt-1">Σε όλη την Ελλάδα</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Εμπορικοί Σύλλογοι</p>
                      <p className="text-2xl font-bold text-gray-900">{memberStats.tradeAssociations}</p>
                      <p className="text-xs text-gray-500 mt-1">Τοπικοί σύλλογοι</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Συνδέσμοι Αντιπροσώπων</p>
                      <p className="text-2xl font-bold text-gray-900">{memberStats.tradeRepresentatives}</p>
                      <p className="text-xs text-gray-500 mt-1">Εμπορικοί αντιπρόσωποι</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Αναπτυξιακά Στοιχεία</h3>
                {memberStats && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Αύξηση Μελών (ετήσια)</span>
                      <span className="text-lg font-semibold text-green-600">+{memberStats.memberGrowth}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(memberStats.memberGrowth, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Νέα μέλη (μήνας)</span>
                      <span className="text-lg font-semibold text-blue-600">{memberStats.newMembersThisMonth}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Εκκρεμείς αιτήσεις</span>
                      <span className="text-lg font-semibold text-orange-600">{memberStats.pendingApplications}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Κάλυψη ΕΣΕΕ</h3>
                {memberStats && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Θεσμική Φωνή</p>
                        <p className="text-sm text-gray-600">Υπεύθυνη φωνή του ελληνικού εμπορίου</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Κάλυψη</p>
                        <p className="text-sm text-gray-600">{memberStats.coverage}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Επιχειρηματικότητα</p>
                        <p className="text-sm text-gray-600">Μικρομεσαία επιχειρηματικότητα</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Ειδοποιήσεις</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {notifications.filter(n => !n.read).length} μη αναγνωσμένες
                </span>
                <button
                  onClick={refreshData}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Ανανέωση
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Δεν υπάρχουν ειδοποιήσεις</h3>
                  <p className="text-gray-600">Όλες οι ειδοποιήσεις είναι ενημερωμένες</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                      notification.priority === 'high' ? 'border-red-500' :
                      notification.priority === 'medium' ? 'border-yellow-500' : 'border-blue-500'
                    } ${!notification.read ? 'ring-2 ring-blue-100' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-2 rounded-lg ${
                          notification.priority === 'high' ? 'bg-red-100' :
                          notification.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                        }`}>
                          {notification.type === 'deadline' && <AlertCircle className="w-5 h-5 text-red-600" />}
                          {notification.type === 'document' && <FileText className="w-5 h-5 text-blue-600" />}
                          {notification.type === 'event' && <Calendar className="w-5 h-5 text-green-600" />}
                          {notification.type === 'membership' && <Users className="w-5 h-5 text-purple-600" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                            {!notification.read && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Νέα
                              </span>
                            )}
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                              notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {notification.priority === 'high' ? 'Υψηλή' :
                               notification.priority === 'medium' ? 'Μεσαία' : 'Χαμηλή'}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{notification.message}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{notification.createdAt.toLocaleDateString('el-GR')}</span>
                            <span>{notification.createdAt.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 ml-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          {notification.read ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      case 'polls':
        return <PollSection />;
      case 'statistics':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Στατιστικά Dashboard</h2>
              <button
                onClick={refreshData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Ανανέωση
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Διαδραστικό Dashboard Εμπορίου
              </h3>
              <p className="text-gray-600 mb-6">
                Εξερευνήστε τα στατιστικά δεδομένα του εμπορίου με διαδραστικά γραφήματα και αναλύσεις από το ΙΝΕΜΥ
              </p>
              
              <div className="relative w-full" style={{ height: '804px' }}>
                <iframe 
                  title="Report Section" 
                  width="100%" 
                  height="100%" 
                  src="https://app.powerbi.com/view?r=eyJrIjoiM2JhMGJhNzctZGFhYi00YmJlLWJiODktY2ViNDQ1NDE3NjcyIiwidCI6IjEwMDgzMzM3LTIyZTYtNDI4NS04MDUwLWZiMTBjOTI5ODA4OCIsImMiOjh9&pageName=ReportSection5da2c8c039acde92ccde&language=el&locale=el-gr" 
                  frameBorder="0" 
                  allowFullScreen=""
                  className="rounded-lg shadow-lg"
                  style={{ 
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#ffffff'
                  }}
                />
              </div>
            </div>
          </div>
        );
      case 'microsites':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Microsites Συλλόγων</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="w-4 h-4" />
                <span>Εξερευνήστε τα microsites των εμπορικών συλλόγων</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Kifisia Trade Association */}
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <img 
                      src="/assets/microsites/kifisia/IMG-20250926-WA0003.jpg" 
                      alt="Εμπορικός Σύλλογος Κηφισιάς"
                      className="w-20 h-20 object-contain rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.src = '/assets/ESEE-LOGO.png';
                        e.target.alt = 'ESEE Logo';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Εμπορικός Σύλλογος Κηφισιάς
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Ο Εμπορικός Σύλλογος Κηφισιάς είναι ένας από τους πιο δραστήριους εμπορικούς συλλόγους της περιοχής, με σκοπό την προώθηση του εμπορίου και της επιχειρηματικότητας στην Κηφισιά και τις γύρω περιοχές.
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Διοικητικό Συμβούλιο</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Πρόσφατες εκδηλώσεις</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>Έγγραφα & πληροφορίες</span>
                      </div>
                    </div>
                    
                    <Link 
                      to="/microsites/kifisia"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <span>Επισκεφτείτε το Microsite</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Placeholder for future microsites */}
              <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Περισσότερα Microsites
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Περισσότεροι εμπορικοί σύλλογοι θα προστεθούν σύντομα
                </p>
                <div className="text-xs text-gray-400">
                  Σύντομα διαθέσιμα
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Σχετικά με τα Microsites
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Τα microsites των εμπορικών συλλόγων παρέχουν ειδικές πληροφορίες για κάθε σύλλογο, 
                    συμπεριλαμβανομένων των διοικητικών συμβουλίων, πρόσφατων εκδηλώσεων, εγγράφων και 
                    πληροφοριών επικοινωνίας. Κάθε microsite είναι προσαρμοσμένο στις ανάγκες του αντίστοιχου συλλόγου.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση Portal ΕΣΕΕ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Σφάλμα Φόρτωσης</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refreshData}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Δοκιμή Ξανά
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Navigation isDark={isDark} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Shield className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Portal ΕΣΕΕ
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Κεντρικό σημείο πρόσβασης σε όλες τις υπηρεσίες της Ελληνικής Συνομοσπονδίας Εμπορίου & Επιχειρηματικότητας
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>225.000 επιχειρήσεις</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>17 Ομοσπονδίες</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>354 Εμπορικοί Σύλλογοι</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap space-x-2 sm:space-x-4 lg:space-x-8 px-4 sm:px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Επισκόπηση
              </button>
              <button
                onClick={() => setActiveTab('helpdesk')}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'helpdesk'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ΥΠΟΣΤΗΡΙΞΗ ΜΕΛΩΝ
              </button>
              
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'documents'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Έγγραφα & Φόρμες
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'members'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Μέλη
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'notifications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ειδοποιήσεις
              </button>
              <button
                onClick={() => setActiveTab('polls')}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'polls'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Έρευνες Γνώμης
              </button>
              <button
                onClick={() => setActiveTab('statistics')}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'statistics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Στατιστικά Dashboard
              </button>
              <button
                onClick={() => setActiveTab('microsites')}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'microsites'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Microsites
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {renderTabContent()}
        </div>

        {/* Footer */}
        {lastUpdated && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Τελευταία ενημέρωση: {lastUpdated.toLocaleString('el-GR')}</span>
              <button
                onClick={refreshData}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Ανανέωση δεδομένων
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </main>
  );
};

export default Portal;
