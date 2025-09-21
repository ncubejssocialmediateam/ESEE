import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PortalService from '../services/portalService';
import { 
  setPortalStats, 
  setMemberStats, 
  setTaxStats, 
  setNotifications, 
  setDocuments, 
  setAnalytics 
} from '../redux/Reducer';

/**
 * Custom hook for managing portal data
 */
export const usePortalData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Get data from Redux store
  const portalStats = useSelector(state => state.portalStats);
  const memberStats = useSelector(state => state.memberStats);
  const taxStats = useSelector(state => state.taxStats);
  const notifications = useSelector(state => state.notifications);
  const documents = useSelector(state => state.documents);
  const analytics = useSelector(state => state.analytics);

  const loadPortalData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // Stage 1: Load essential data first (fast)
      const [memberStatsData, taxStatsData, notificationsData, documentsData] = await Promise.all([
        PortalService.getMemberStats(),
        PortalService.getTaxCalendarStats(),
        PortalService.getNotifications(),
        PortalService.getDocuments()
      ]);

      // Update Redux store with essential data and render immediately
      dispatch(setMemberStats(memberStatsData));
      dispatch(setTaxStats(taxStatsData));
      dispatch(setNotifications(notificationsData));
      dispatch(setDocuments(documentsData));
      setLastUpdated(new Date());

      // End loading state to let the page render
      setLoading(false);

      // Stage 2: Load heavy data in the background (non-blocking)
      Promise.all([
        PortalService.getPortalStats(),
        PortalService.getPortalAnalytics()
      ])
        .then(([portalStatsData, analyticsData]) => {
          dispatch(setPortalStats(portalStatsData));
          dispatch(setAnalytics(analyticsData));
        })
        .catch((bgErr) => {
          console.warn('Background portal data fetch failed:', bgErr?.message || bgErr);
        });
    } catch (err) {
      setError(err.message || 'Σφάλμα κατά τη φόρτωση των δεδομένων');
      console.error('Error loading portal data:', err);
    } finally {
      // loading already set to false after essential data; ensure it is false on hard errors
      setLoading(false);
    }
  };

  const refreshData = () => {
    loadPortalData(true);
  };

  // Load data on mount
  useEffect(() => {
    loadPortalData();
  }, []);

  return {
    // Data
    portalStats,
    memberStats,
    taxStats,
    notifications,
    documents,
    analytics,
    
    // State
    loading,
    error,
    lastUpdated,
    
    // Actions
    refreshData,
    loadPortalData
  };
};

export default usePortalData;

