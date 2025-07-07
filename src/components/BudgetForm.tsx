import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from './ui/card';
import { Input as _Input } from './ui/input.js';
import { Select as _Select, SelectItem as _SelectItem, SelectContent as _SelectContent, SelectTrigger as _SelectTrigger } from './ui/select.jsx';
import { Button as _Button } from './ui/button.js';
// @ts-ignore
import API_BASE_URL from '../utils/api';

const Input = _Input as any;
const Select = _Select as any;
const SelectItem = _SelectItem as any;
const Button = _Button as any;
const SelectContent = _SelectContent as any;
const SelectTrigger = _SelectTrigger as any;

const categories = ['Food', 'Travel', 'Shopping', 'Rent', 'Bills', 'Others'];
const month = new Date().toISOString().slice(0, 7);

export default function BudgetForm() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    await axios.post(`${API_BASE_URL}/budgets`, {
      category,
      amount: Number(amount),
      month,
    });
    alert('Budget saved!');
  };

  return (
    <Card className="p-4 max-w-md">
      <CardContent>
        <h2 className="text-lg font-semibold mb-2">Set Budget</h2>
        {React.createElement(
          Select,
          { value: category, onValueChange: setCategory },
          [
            React.createElement(
              SelectTrigger,
              { className: 'w-full', key: 'trigger' },
              category || 'Select category...'
            ),
            React.createElement(
              SelectContent,
              { key: 'content' },
              categories.map(cat =>
                React.createElement(SelectItem, { key: cat, value: cat }, cat)
              )
            )
          ]
        )}
        {React.createElement(Input, {
          placeholder: 'Amount',
          value: amount,
          onChange: (e: any) => setAmount(e.target.value),
          className: 'my-2',
        })}
        {React.createElement(Button, { onClick: handleSubmit }, 'Save Budget')}
      </CardContent>
    </Card>
  );
} 