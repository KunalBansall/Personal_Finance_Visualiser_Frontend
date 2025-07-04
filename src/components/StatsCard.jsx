import React from 'react';

const StatsCard = ({ title, value, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
};

export default StatsCard; 