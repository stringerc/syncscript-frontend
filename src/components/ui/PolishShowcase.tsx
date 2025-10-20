import React from 'react';

export default function PolishShowcase() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Polish Showcase</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <h4 className="font-semibold">Gradient Card</h4>
          <p className="text-sm opacity-90">Beautiful gradient design</p>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold">Clean Card</h4>
          <p className="text-sm text-gray-600">Minimalist design</p>
        </div>
      </div>
    </div>
  );
}
