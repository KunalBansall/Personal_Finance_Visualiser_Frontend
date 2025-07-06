import { useState, useEffect } from 'react';
import axios from 'axios';
import FloatingAddButton from './components/FloatingAddButton';
import StatsCard from './components/StatsCard';
import MonthlyChart from './components/MonthlyChart';
import TransactionsTable from './components/TransactionsTable';
import TransactionModal from './components/TransactionModal';
import Dashboard from './components/Dashboard';
import API_BASE_URL from './utils/api';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/transactions`);
      setTransactions(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
      setTransactions([]); // Ensure transactions is always an array
    } finally {
      setLoading(false);
    }
  };

  // Add new transaction
  const addTransaction = async (transactionData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/transactions`, {
        ...transactionData,
        amount: parseFloat(transactionData.amount)
      });
      setTransactions([response.data, ...(Array.isArray(transactions) ? transactions : [])]);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to add transaction');
      console.error('Error adding transaction:', err);
      throw err;
    }
  };

  // Update transaction
  const updateTransaction = async (id, transactionData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/transactions/${id}`, {
        ...transactionData,
        amount: parseFloat(transactionData.amount)
      });
      setTransactions((Array.isArray(transactions) ? transactions : []).map(t => t._id === id ? response.data : t));
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to update transaction');
      console.error('Error updating transaction:', err);
      throw err;
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/transactions/${id}`);
      setTransactions((Array.isArray(transactions) ? transactions : []).filter(t => t._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete transaction');
      console.error('Error deleting transaction:', err);
      throw err;
    }
  };

  // Calculate monthly totals for chart
  const getMonthlyData = () => {
    if (!Array.isArray(transactions)) return [];
    
    const monthlyTotals = {};
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyTotals[monthYear] = (monthlyTotals[monthYear] || 0) + transaction.amount;
    });

    return Object.entries(monthlyTotals)
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => a.month.localeCompare(b.month));
  };

  // Calculate total expenses
  const totalExpenses = Array.isArray(transactions) ? transactions.reduce((sum, t) => sum + t.amount, 0) : 0;

  // Calculate monthly average
  const monthlyAverage = Array.isArray(transactions) && transactions.length > 0 
    ? totalExpenses / Math.max(1, new Set(transactions.map(t => new Date(t.date).toISOString().slice(0, 7))).size)
    : 0;

  // Handle add transaction
  const handleAddTransaction = async (data) => {
    try {
      await addTransaction(data);
      setShowAddModal(false);
    } catch (err) {
      // Error is already handled in the function
    }
  };

  // Handle edit transaction
  const handleEditTransaction = async (data) => {
    try {
      await updateTransaction(editingTransaction._id, data);
      setShowEditModal(false);
      setEditingTransaction(null);
    } catch (err) {
      // Error is already handled in the function
    }
  };

  // Handle delete transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
    } catch (err) {
      // Error is already handled in the function
    }
  };

  // Open edit modal
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Floating Add Button */}
        <FloatingAddButton onClick={() => setShowAddModal(true)} />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Personal Finance Visualizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your expenses, visualize your spending patterns, and take control of your financial future
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'transactions'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Transactions
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'dashboard' ? (
          <Dashboard />
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <StatsCard 
                title="Total Transactions" 
                value={Array.isArray(transactions) ? transactions.length : 0} 
              />
              <StatsCard 
                title="Total Expenses" 
                value={`₹${totalExpenses.toFixed(2)}`} 
              />
              <StatsCard 
                title="Monthly Average" 
                value={`₹${monthlyAverage.toFixed(2)}`}
                className="sm:col-span-2 md:col-span-1"
              />
            </div>

            {/* Monthly Chart */}
            <div className="grid grid-cols-1 gap-8 mb-8">
              <MonthlyChart data={getMonthlyData()} />
            </div>

            {/* Transactions Table */}
            <TransactionsTable
              transactions={Array.isArray(transactions) ? transactions : []}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDeleteTransaction}
            />
          </>
        )}

        {/* Add Transaction Modal */}
        <TransactionModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTransaction}
          title="Add New Transaction"
          submitText="Add Transaction"
        />

        {/* Edit Transaction Modal */}
        <TransactionModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingTransaction(null);
          }}
          onSubmit={handleEditTransaction}
          title="Edit Transaction"
          submitText="Update"
          initialData={editingTransaction}
        />
      </div>
    </div>
  );
}

export default App;
