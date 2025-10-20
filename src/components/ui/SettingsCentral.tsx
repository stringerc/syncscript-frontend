import React from 'react';

export default function SettingsCentral() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <input type="checkbox" className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <span>Notifications</span>
          <input type="checkbox" className="rounded" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span>Auto-save</span>
          <input type="checkbox" className="rounded" defaultChecked />
        </div>
      </div>
    </div>
  );
}
