import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
// @ts-ignore
import API_BASE_URL from '../utils/api';

const currentMonth = new Date().toISOString().slice(0, 7);

export default function BudgetVsActualChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/budgets/budget-vs-actual?month=${currentMonth}`)
      .then(res => {
        console.log('BudgetVsActualChart API response:', res.data);
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([]);
        }
      });
  }, []);

  return (
    <div className="w-full h-80">
      <h2 className="text-lg font-semibold mb-2">Budget vs Actual</h2>
      <ResponsiveContainer>
        <BarChart data={Array.isArray(data) ? data : []}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" />
          <Bar dataKey="actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 