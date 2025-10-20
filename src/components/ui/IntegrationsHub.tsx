import React from 'react';

const INTEGRATIONS = [
  { name: 'Google Calendar', connected: true },
  { name: 'Slack', connected: false },
  { name: 'Notion', connected: true },
  { name: 'Trello', connected: false }
];

export default function IntegrationsHub() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Integrations</h3>
      <div className="space-y-3">
        {INTEGRATIONS.map((integration, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded">
            <span>{integration.name}</span>
            <span className={`px-2 py-1 rounded text-sm ${
              integration.connected 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {integration.connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
