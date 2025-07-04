import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const transactionSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required')
});

const TransactionModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  submitText, 
  initialData = null 
}) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(transactionSchema)
  });

  // Set initial values when modal opens
  React.useEffect(() => {
    if (isOpen && initialData) {
      setValue('amount', initialData.amount);
      setValue('date', initialData.date.split('T')[0]);
      setValue('description', initialData.description);
    } else if (isOpen) {
      reset();
    }
  }, [isOpen, initialData, setValue, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              {...register('amount', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              {...register('date')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              {...register('description')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What was this expense for?"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {submitText}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-1/2 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal; 