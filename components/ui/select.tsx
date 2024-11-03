// components/ui/select.tsx

import React, { useState } from 'react';

// Select Component
export const Select: React.FC<{ onChange: (value: string) => void; children: React.ReactNode }> = ({ onChange, children }) => {
  const [open, setOpen] = useState(false);
  const handleSelect = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <div className="relative inline-block w-full text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Sort by
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {React.Children.map(children, (child) => {
              return React.cloneElement(child as React.ReactElement<any>, {
                onSelect: handleSelect
              });
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

// SelectItem Component
export const SelectItem: React.FC<{ value: string; children: React.ReactNode; onSelect: (value: string) => void }> = ({ value, children, onSelect }) => {
  return (
    <li onClick={() => onSelect(value)} className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100">
      <span className="block truncate">{children}</span>
    </li>
  );
};


// SelectTrigger Component
export const SelectTrigger: React.FC<{ className: string; children: React.ReactNode }> = ({ className, children }) => {
  return (
    <button className={`inline-flex justify-between w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}>
      {children}
    </button>
  );
};

// SelectValue Component
export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  return <span className="block truncate">{placeholder}</span>;
};

// SelectContent Component
export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <ul className="max-h-60 overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {children}
      </ul>
    </div>
  );
};

