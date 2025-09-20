import { useState, useEffect } from 'react';
import PortalService from '../../services/portalService';

const PortalDebug = () => {
  const [debugInfo, setDebugInfo] = useState({
    portalStats: null,
    memberStats: null,
    taxStats: null,
    notifications: null,
    documents: null,
    analytics: null,
    errors: []
  });

  const [loading, setLoading] = useState(false);

  const testPortalServices = async () => {
    setLoading(true);
    const errors = [];
    const results = {};

    try {
      console.log('Testing PortalService.getPortalStats()...');
      results.portalStats = await PortalService.getPortalStats();
      console.log('Portal stats result:', results.portalStats);
    } catch (error) {
      console.error('Portal stats error:', error);
      errors.push(`Portal Stats: ${error.message}`);
    }

    try {
      console.log('Testing PortalService.getMemberStats()...');
      results.memberStats = await PortalService.getMemberStats();
      console.log('Member stats result:', results.memberStats);
    } catch (error) {
      console.error('Member stats error:', error);
      errors.push(`Member Stats: ${error.message}`);
    }

    try {
      console.log('Testing PortalService.getTaxCalendarStats()...');
      results.taxStats = await PortalService.getTaxCalendarStats();
      console.log('Tax stats result:', results.taxStats);
    } catch (error) {
      console.error('Tax stats error:', error);
      errors.push(`Tax Stats: ${error.message}`);
    }

    try {
      console.log('Testing PortalService.getNotifications()...');
      results.notifications = await PortalService.getNotifications();
      console.log('Notifications result:', results.notifications);
    } catch (error) {
      console.error('Notifications error:', error);
      errors.push(`Notifications: ${error.message}`);
    }

    try {
      console.log('Testing PortalService.getDocuments()...');
      results.documents = await PortalService.getDocuments();
      console.log('Documents result:', results.documents);
    } catch (error) {
      console.error('Documents error:', error);
      errors.push(`Documents: ${error.message}`);
    }

    try {
      console.log('Testing PortalService.getPortalAnalytics()...');
      results.analytics = await PortalService.getPortalAnalytics();
      console.log('Analytics result:', results.analytics);
    } catch (error) {
      console.error('Analytics error:', error);
      errors.push(`Analytics: ${error.message}`);
    }

    setDebugInfo({ ...results, errors });
    setLoading(false);
  };

  useEffect(() => {
    testPortalServices();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Portal Debug Information</h1>
      
      <button
        onClick={testPortalServices}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Portal Services'}
      </button>

      {debugInfo.errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
          <h3 className="font-bold text-red-800 mb-2">Errors:</h3>
          <ul className="list-disc list-inside text-red-700">
            {debugInfo.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Portal Stats</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(debugInfo.portalStats, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Member Stats</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(debugInfo.memberStats, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Tax Stats</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(debugInfo.taxStats, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Notifications</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(debugInfo.notifications, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Documents</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(debugInfo.documents, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Analytics</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(debugInfo.analytics, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PortalDebug;
