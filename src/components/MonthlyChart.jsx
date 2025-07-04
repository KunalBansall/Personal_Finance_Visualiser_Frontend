import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px'
              }}
            />
            <Bar dataKey="total" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No data to display
        </div>
      )}
    </div>
  );
};

export default MonthlyChart; 