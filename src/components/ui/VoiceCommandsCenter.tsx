import React from 'react';

export default function VoiceCommandsCenter() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Voice Commands</h3>
      <div className="text-center">
        <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-2xl">🎤</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Start Listening
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Click to activate voice commands
        </p>
      </div>
    </div>
  );
}
