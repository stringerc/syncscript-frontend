"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Mail, 
  Settings, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react';
import { useRubeIntegration } from '../hooks/useRubeIntegration';

export default function RubeIntegrationHub() {
  const {
    loading,
    error,
    connected,
    events,
    messages,
    integrations,
    fetchEvents,
    createEvent,
    deleteEvent,
    fetchMessages,
    connectIntegration,
    disconnectIntegration,
    clearError,
    refresh
  } = useRubeIntegration();

  const [activeTab, setActiveTab] = useState<'calendar' | 'email' | 'integrations'>('integrations');

  const handleCreateEvent = async () => {
    const event = {
      title: 'New SyncScript Event',
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3600000).toISOString(),
      source: 'syncscript',
      attendees: []
    };
    
    await createEvent(event);
  };

  const handleConnectIntegration = async (integrationId: string) => {
    await connectIntegration(integrationId);
  };

  const handleDisconnectIntegration = async (integrationId: string) => {
    await disconnectIntegration(integrationId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Rube.app Integration Hub
          </h1>
          <p className="text-lg text-gray-600">
            Connect SyncScript with Google Calendar, Outlook, Slack, and more
          </p>
          
          {/* Connection Status */}
          <div className="flex items-center gap-2 mt-4">
            {connected ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className={`font-medium ${connected ? 'text-green-700' : 'text-red-700'}`}>
              {connected ? 'Connected to Rube.app' : 'Disconnected from Rube.app'}
            </span>
            <button
              onClick={refresh}
              disabled={loading}
              className="ml-4 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-red-700">{error}</span>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            {[
              { id: 'integrations', label: 'Integrations', icon: Settings },
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'email', label: 'Email', icon: Mail },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Available Integrations</h2>
                <button
                  onClick={refresh}
                  disabled={loading}
                  className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        integration.status === 'enabled' || integration.status === 'connected'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {integration.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                    <div className="flex gap-2">
                      {integration.status === 'enabled' ? (
                        <button
                          onClick={() => handleConnectIntegration(integration.id)}
                          disabled={loading}
                          className="flex-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                        >
                          Connect
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDisconnectIntegration(integration.id)}
                          disabled={loading}
                          className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:opacity-50"
                        >
                          Disconnect
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Calendar Events</h2>
                <div className="flex gap-2">
                  <button
                    onClick={fetchEvents}
                    disabled={loading}
                    className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={handleCreateEvent}
                    disabled={loading}
                    className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {events.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No calendar events found. Create your first event!
                  </div>
                ) : (
                  events.map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">Source: {event.source}</p>
                        </div>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          disabled={loading}
                          className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Email Tab */}
          {activeTab === 'email' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Email Messages</h2>
                <button
                  onClick={fetchMessages}
                  disabled={loading}
                  className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No email messages found.
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{message.subject}</h3>
                        <span className="text-xs text-gray-500">{message.source}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        From: {message.from} → To: {message.to}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(message.date).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
