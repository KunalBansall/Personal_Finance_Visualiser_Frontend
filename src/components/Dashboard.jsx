import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardSummary from './DashboardSummary';
import API_BASE_URL from '../utils/api';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/transactions/summary`);
      setSummary(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching summary:', err);
      // Set mock data for development while backend is being deployed
      setSummary({
        totalExpenses: 0,
        recentTransactions: [],
        categoryBreakdown: []
      });
      setError('Using demo data - backend deployment in progress');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="space-y-6">
      {/* Demo Data Notice */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <DashboardSummary summary={summary} loading={loading} />
    </div>
  );
};

export default Dashboard; 