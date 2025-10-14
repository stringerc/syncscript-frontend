/**
 * Cross-Platform Synchronization Component
 * 
 * Seamless desktop-mobile experience with real-time sync
 * Includes data synchronization, conflict resolution, and platform-specific optimizations
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SyncSession {
  id: string;
  platform: 'desktop' | 'mobile' | 'web';
  deviceId: string;
  deviceName: string;
  lastActive: string;
  status: 'online' | 'offline' | 'syncing';
  dataVersion: number;
}

interface SyncData {
  id: string;
  type: 'task' | 'project' | 'energy' | 'settings' | 'user';
  platform: 'desktop' | 'mobile' | 'web';
  data: any;
  timestamp: string;
  version: number;
  synced: boolean;
}

interface PlatformOptimization {
  id: string;
  platform: 'desktop' | 'mobile' | 'web';
  optimization: string;
  description: string;
  implemented: boolean;
  impact: 'low' | 'medium' | 'high';
}

interface CrossPlatformSyncProps {
  onClose: () => void;
}

const CrossPlatformSync: React.FC<CrossPlatformSyncProps> = ({ onClose }) => {
  const [syncSessions, setSyncSessions] = useState<SyncSession[]>([]);
  const [syncData, setSyncData] = useState<SyncData[]>([]);
  const [platformOptimizations, setPlatformOptimizations] = useState<PlatformOptimization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'sessions' | 'data' | 'optimizations' | 'settings'>('sessions');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    loadSyncData();
  }, []);

  const loadSyncData = async () => {
    setIsLoading(true);
    
    try {
      // Mock sync sessions
      const mockSessions: SyncSession[] = [
        {
          id: 'session-1',
          platform: 'desktop',
          deviceId: 'desktop-001',
          deviceName: 'MacBook Pro',
          lastActive: new Date(Date.now() - 300000).toISOString(),
          status: 'online',
          dataVersion: 156
        },
        {
          id: 'session-2',
          platform: 'mobile',
          deviceId: 'mobile-001',
          deviceName: 'iPhone 15 Pro',
          lastActive: new Date(Date.now() - 600000).toISOString(),
          status: 'online',
          dataVersion: 155
        },
        {
          id: 'session-3',
          platform: 'web',
          deviceId: 'web-001',
          deviceName: 'Chrome Browser',
          lastActive: new Date(Date.now() - 1800000).toISOString(),
          status: 'offline',
          dataVersion: 154
        }
      ];

      // Mock sync data
      const mockSyncData: SyncData[] = [
        {
          id: 'data-1',
          type: 'task',
          platform: 'desktop',
          data: { title: 'Complete project proposal', priority: 4, completed: false },
          timestamp: new Date(Date.now() - 300000).toISOString(),
          version: 156,
          synced: true
        },
        {
          id: 'data-2',
          type: 'energy',
          platform: 'mobile',
          data: { level: 8, timestamp: new Date().toISOString() },
          timestamp: new Date(Date.now() - 600000).toISOString(),
          version: 155,
          synced: true
        },
        {
          id: 'data-3',
          type: 'project',
          platform: 'web',
          data: { name: 'Website Redesign', status: 'active', progress: 75 },
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          version: 154,
          synced: false
        },
        {
          id: 'data-4',
          type: 'settings',
          platform: 'desktop',
          data: { theme: 'dark', notifications: true, autoSync: true },
          timestamp: new Date(Date.now() - 900000).toISOString(),
          version: 156,
          synced: true
        }
      ];

      // Mock platform optimizations
      const mockOptimizations: PlatformOptimization[] = [
        {
          id: 'opt-1',
          platform: 'desktop',
          optimization: 'Keyboard Shortcuts',
          description: 'Full keyboard navigation and shortcuts for power users',
          implemented: true,
          impact: 'high'
        },
        {
          id: 'opt-2',
          platform: 'mobile',
          optimization: 'Touch Gestures',
          description: 'Swipe, pinch, and tap gestures for mobile interaction',
          implemented: true,
          impact: 'high'
        },
        {
          id: 'opt-3',
          platform: 'web',
          optimization: 'Progressive Web App',
          description: 'PWA features for offline functionality and app-like experience',
          implemented: true,
          impact: 'medium'
        },
        {
          id: 'opt-4',
          platform: 'desktop',
          optimization: 'Multi-Window Support',
          description: 'Support for multiple windows and tabs',
          implemented: false,
          impact: 'medium'
        },
        {
          id: 'opt-5',
          platform: 'mobile',
          optimization: 'Haptic Feedback',
          description: 'Tactile feedback for better mobile experience',
          implemented: false,
          impact: 'low'
        },
        {
          id: 'opt-6',
          platform: 'web',
          optimization: 'Service Worker',
          description: 'Background sync and caching for offline support',
          implemented: true,
          impact: 'high'
        }
      ];

      setSyncSessions(mockSessions);
      setSyncData(mockSyncData);
      setPlatformOptimizations(mockOptimizations);
    } catch (error) {
      console.error('Failed to load sync data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncAllPlatforms = async () => {
    setIsSyncing(true);
    
    try {
      // Simulate cross-platform sync
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update all sessions to syncing status
      setSyncSessions(prev => prev.map(session => 
        session.status === 'online' 
          ? { ...session, status: 'syncing' as const, dataVersion: session.dataVersion + 1 }
          : session
      ));
      
      // Mark all data as synced
      setSyncData(prev => prev.map(data => 
        !data.synced 
          ? { ...data, synced: true, version: data.version + 1 }
          : data
      ));
      
      // Reset status after sync
      setTimeout(() => {
        setSyncSessions(prev => prev.map(session => 
          session.status === 'syncing' 
            ? { ...session, status: 'online' as const }
            : session
        ));
      }, 1000);
      
      console.log('Cross-platform sync completed');
    } catch (error) {
      console.error('Failed to sync platforms:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'desktop': return '💻';
      case 'mobile': return '📱';
      case 'web': return '🌐';
      default: return '📄';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      case 'syncing': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return '📝';
      case 'project': return '📁';
      case 'energy': return '⚡';
      case 'settings': return '⚙️';
      case 'user': return '👤';
      default: return '📄';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading cross-platform sync...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Cross-Platform Synchronization</h2>
              <p className="text-indigo-100 mt-1">Seamless desktop-mobile experience with real-time sync</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-200 text-sm">Sessions:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {syncSessions.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-200 text-sm">Online:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {syncSessions.filter(s => s.status === 'online').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-200 text-sm">Data Items:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {syncData.length}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'sessions', name: 'Sessions', icon: '🔄' },
              { id: 'data', name: 'Sync Data', icon: '📊' },
              { id: 'optimizations', name: 'Optimizations', icon: '⚡' },
              { id: 'settings', name: 'Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'sessions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Active Sessions</h3>
                <button
                  onClick={syncAllPlatforms}
                  disabled={isSyncing}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {isSyncing ? 'Syncing...' : 'Sync All Platforms'}
                </button>
              </div>
              
              <div className="space-y-4">
                {syncSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{getPlatformIcon(session.platform)}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{session.deviceName}</h4>
                          <p className="text-sm text-gray-600 capitalize">{session.platform} • {session.deviceId}</p>
                          <p className="text-xs text-gray-500">
                            Last active: {new Date(session.lastActive).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(session.status)}`}>
                          {session.status.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          v{session.dataVersion}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Platform: {session.platform}</span>
                      <span>Data Version: {session.dataVersion}</span>
                      <span>Status: {session.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'data' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Synchronized Data</h3>
              
              <div className="space-y-4">
                {syncData.map((data) => (
                  <motion.div
                    key={data.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      data.synced ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(data.type)}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">{data.type} Data</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(data.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getPlatformIcon(data.platform)}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          data.synced ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {data.synced ? 'SYNCED' : 'PENDING'}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          v{data.version}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700 bg-white p-3 rounded">
                      <pre>{JSON.stringify(data.data, null, 2)}</pre>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'optimizations' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Platform Optimizations</h3>
              
              <div className="space-y-4">
                {platformOptimizations.map((optimization) => (
                  <motion.div
                    key={optimization.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getPlatformIcon(optimization.platform)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{optimization.optimization}</h4>
                        <p className="text-sm text-gray-600">{optimization.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(optimization.impact)}`}>
                          {optimization.impact.toUpperCase()} IMPACT
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          optimization.implemented ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {optimization.implemented ? 'IMPLEMENTED' : 'PENDING'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Platform:</span>
                        <span className="ml-2 text-gray-900 capitalize">{optimization.platform}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Impact:</span>
                        <span className="ml-2 text-gray-900 capitalize">{optimization.impact}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Sync Settings</h3>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Auto Sync</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Enable automatic sync across platforms</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Sync in real-time when online</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">Sync only on WiFi</span>
                    </label>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Data Sync</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Sync tasks and projects</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Sync energy logs</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Sync user settings</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">Sync analytics data</span>
                    </label>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Conflict Resolution</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="conflict-resolution" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Ask me to resolve conflicts</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="conflict-resolution" className="rounded" />
                      <span className="text-sm text-gray-700">Use most recent data</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="conflict-resolution" className="rounded" />
                      <span className="text-sm text-gray-700">Merge data automatically</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Cross-Platform Synchronization • {syncSessions.filter(s => s.status === 'online').length} online • {syncData.filter(d => d.synced).length}/{syncData.length} synced
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                console.log('Exporting cross-platform sync data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CrossPlatformSync;
