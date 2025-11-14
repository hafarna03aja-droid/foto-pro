import React from 'react';
import { XIcon } from '../icons';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  title = 'Oops! Terjadi kesalahan',
  message,
  onDismiss 
}) => (
  <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg border border-red-200">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="font-bold">{title}</p>
        <p className="text-sm mt-1">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-4 text-red-400 hover:text-red-600 transition"
          aria-label="Dismiss error"
        >
          <XIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  </div>
);
