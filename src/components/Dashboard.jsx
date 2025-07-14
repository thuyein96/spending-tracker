import React from 'react';

const Dashboard = () => {
  // Get records from localStorage
  const records = window.localStorage.getItem('records') ? JSON.parse(window.localStorage.getItem('records')) : [];
  
  // Calculate total expenses
  const totalExpenses = records.reduce((sum, record) => sum + parseFloat(record.amount || 0), 0);
  
  // Calculate expenses by category
  const categoryTotals = records.reduce((acc, record) => {
    if (!acc[record.name]) {
      acc[record.name] = 0;
    }
    acc[record.name] += parseFloat(record.amount || 0);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your spending</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">฿{totalExpenses.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Transactions</h3>
          <p className="text-3xl font-bold text-blue-600">{records.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average per Transaction</h3>
          <p className="text-3xl font-bold text-green-600">
            ฿{records.length > 0 ? (totalExpenses / records.length).toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h3>
        <div className="space-y-4">
          {Object.entries(categoryTotals).map(([category, amount]) => (
            <div key={category} className="flex justify-between items-center">
              <span className="text-gray-700">{category}</span>
              <span className="font-semibold text-gray-900">฿{amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
