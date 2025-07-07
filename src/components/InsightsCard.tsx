import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from './ui/card';
// @ts-ignore
import { Badge } from './ui/badge';
// @ts-ignore
import API_BASE_URL from '../utils/api';

const currentMonth = new Date().toISOString().slice(0, 7);

type Insight = {
  category: string;
  status: string;
  difference: number;
};

export default function InsightsCard() {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/budgets/budget-vs-actual?month=${currentMonth}`)
      .then(res => {
        console.log('InsightsCard API response:', res.data);
        if (Array.isArray(res.data)) {
          const mapped = res.data.map((d: any) => ({
            category: d.category,
            status: d.actual > d.budget ? 'Over' : 'Under',
            difference: Math.abs(d.budget - d.actual),
          }));
          setInsights(mapped);
        } else {
          setInsights([]);
        }
      });
  }, []);

  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-2">Spending Insights</h2>
        <ul className="space-y-2">
          {insights.map((i, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{i.category}</span>
              <Badge
                variant={i.status === 'Over' ? 'destructive' : 'default'}
              >
                {i.status} by ₹{i.difference}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
} 