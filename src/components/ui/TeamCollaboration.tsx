import React from 'react';

export default function TeamCollaboration() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Team Collaboration</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-600">Working on Task A</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          <div>
            <p className="font-medium">Jane Smith</p>
            <p className="text-sm text-gray-600">Reviewing Task B</p>
          </div>
        </div>
      </div>
    </div>
  );
}
