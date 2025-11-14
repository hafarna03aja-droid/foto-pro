import React from 'react';

interface ToggleSwitchProps {
  label: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  description?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  label, 
  enabled, 
  setEnabled,
  description 
}) => (
  <div className="flex items-start justify-between gap-4">
    <div className="flex-1">
      <span className="text-sm text-gray-700 font-medium block">{label}</span>
      {description && (
        <span className="text-xs text-gray-500 mt-1 block">{description}</span>
      )}
    </div>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`${
        enabled ? 'bg-teal-500' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex-shrink-0`}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  </div>
);
