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
      
      // Load all data in parallel
      const [
        portalStatsData,
        memberStatsData,
        taxStatsData,
        activitiesData,
        notificationsData,
        documentsData,
        analyticsData
      ] = await Promise.all([
        PortalService.getPortalStats(),
        PortalService.getMemberStats(),
        PortalService.getTaxCalendarStats(),
        PortalService.getRecentActivities(),
        PortalService.getNotifications(),
        PortalService.getDocuments(),
        PortalService.getPortalAnalytics()
      ]);

      // Update Redux store
      dispatch(setPortalStats(portalStatsData));
      dispatch(setMemberStats(memberStatsData));
      dispatch(setTaxStats(taxStatsData));
      dispatch(setNotifications(notificationsData));
      dispatch(setDocuments(documentsData));
      dispatch(setAnalytics(analyticsData));
      
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Σφάλμα κατά τη φόρτωση των δεδομένων');
      console.error('Error loading portal data:', err);
    } finally {
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

