import React from 'react';
import { SparklesIcon } from '../icons';

interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Memproses...',
  subMessage 
}) => (
  <div className="text-center">
    <SparklesIcon className="w-12 h-12 text-teal-500 mx-auto animate-pulse" />
    <p className="mt-2 text-gray-600 font-medium">{message}</p>
    {subMessage && (
      <p className="text-sm text-gray-400 mt-1">{subMessage}</p>
    )}
  </div>
);
