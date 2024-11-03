// components/ui/table.tsx
import React from 'react';

// Table Component
export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  );
};

// TableHeader Component
export const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <thead className="bg-gray-50">
      {children}
    </thead>
  );
};

// TableBody Component
export const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {children}
    </tbody>
  );
};

// TableRow Component
export const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <tr className="hover:bg-gray-100">
      {children}
    </tr>
  );
};

// TableCell Component
export const TableCell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {children}
    </td>
  );
};

// TableHead Component
export const TableHead: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
};
