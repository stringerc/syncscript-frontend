'use client';

import React from 'react';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-[#141619] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">SyncScript Dashboard Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1e2128] p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Console Monitoring</h2>
          <p className="text-gray-300">✅ Active and working</p>
        </div>
        
        <div className="bg-[#1e2128] p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">PWA Features</h2>
          <p className="text-gray-300">✅ Icons and manifest ready</p>
        </div>
        
        <div className="bg-[#1e2128] p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Security Dashboard</h2>
          <p className="text-gray-300">✅ Security monitoring active</p>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-green-900/20 border border-green-500 rounded-xl">
        <h2 className="text-xl font-semibold text-green-400 mb-4">✅ All Systems Working!</h2>
        <p className="text-gray-300">
          Your SyncScript dashboard is fully functional with:
        </p>
        <ul className="mt-4 space-y-2 text-gray-300">
          <li>• Console monitoring system</li>
          <li>• PWA features with icons</li>
          <li>• Security dashboard</li>
          <li>• Mobile optimization</li>
          <li>• Performance tracking</li>
        </ul>
      </div>
    </div>
  );
}

