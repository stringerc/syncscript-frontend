import React from 'react';

export default function MindMap() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Mind Map</h3>
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2"></div>
          <p className="text-gray-600">Mind Map Visualization</p>
          <p className="text-sm text-gray-500">Interactive mind mapping coming soon</p>
        </div>
      </div>
    </div>
  );
}
