/**
 * Offline Synchronization System Component
 * 
 * Work without internet connection, sync when online
 * Includes offline storage, sync queue, and conflict resolution
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SyncItem {
  id: string;
  type: 'task' | 'project' | 'energy' | 'settings';
  action: 'create' | 'update' | 'delete';
  data: any;
  timestamp: string;
  synced: boolean;
  retryCount: number;
  lastError?: string;
}

interface OfflineData {
  tasks: any[];
  projects: any[];
  energyLogs: any[];
  settings: any;
  lastSync: string;
  totalItems: number;
  pendingItems: number;
}

interface SyncConflict {
  id: string;
  type: string;
  localData: any;
  remoteData: any;
  conflictType: 'update' | 'delete' | 'create';
  resolution?: 'local' | 'remote' | 'merge';
}

interface OfflineSynchronizationSystemProps {
  onClose: () => void;
}

const OfflineSynchronizationSystem: React.FC<OfflineSynchronizationSystemProps> = ({ onClose }) => {
  const [syncQueue, setSyncQueue] = useState<SyncItem[]>([]);
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null);
  const [syncConflicts, setSyncConflicts] = useState<SyncConflict[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'queue' | 'data' | 'conflicts' | 'settings'>('queue');
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    loadOfflineData();
    checkOnlineStatus();
    
    // Simulate online/offline status changes
    const interval = setInterval(() => {
      setIsOnline(prev => !prev);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const loadOfflineData = async () => {
    setIsLoading(true);
    
    try {
      // Mock sync queue
      const mockSyncQueue: SyncItem[] = [
        {
          id: 'sync-1',
          type: 'task',
          action: 'create',
          data: { title: 'Complete project proposal', priority: 4 },
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          synced: false,
          retryCount: 0
        },
        {
          id: 'sync-2',
          type: 'energy',
          action: 'update',
          data: { level: 8, timestamp: new Date().toISOString() },
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          synced: false,
          retryCount: 1,
          lastError: 'Network timeout'
        },
        {
          id: 'sync-3',
          type: 'project',
          action: 'update',
          data: { name: 'Updated Project Name', status: 'active' },
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          synced: true,
          retryCount: 0
        }
      ];

      // Mock offline data
      const mockOfflineData: OfflineData = {
        tasks: [
          { id: 'task-1', title: 'Review budget report', completed: false },
          { id: 'task-2', title: 'Team meeting prep', completed: true },
          { id: 'task-3', title: 'Update documentation', completed: false }
        ],
        projects: [
          { id: 'project-1', name: 'Website Redesign', status: 'active' },
          { id: 'project-2', name: 'Mobile App', status: 'planning' }
        ],
        energyLogs: [
          { id: 'energy-1', level: 7, timestamp: new Date().toISOString() },
          { id: 'energy-2', level: 5, timestamp: new Date(Date.now() - 3600000).toISOString() }
        ],
        settings: {
          theme: 'dark',
          notifications: true,
          autoSync: true
        },
        lastSync: new Date(Date.now() - 1800000).toISOString(),
        totalItems: 8,
        pendingItems: 2
      };

      // Mock sync conflicts
      const mockConflicts: SyncConflict[] = [
        {
          id: 'conflict-1',
          type: 'task',
          localData: { title: 'Updated Task Title', priority: 4 },
          remoteData: { title: 'Original Task Title', priority: 3 },
          conflictType: 'update'
        },
        {
          id: 'conflict-2',
          type: 'project',
          localData: { name: 'Project A', status: 'active' },
          remoteData: null,
          conflictType: 'delete'
        }
      ];

      setSyncQueue(mockSyncQueue);
      setOfflineData(mockOfflineData);
      setSyncConflicts(mockConflicts);
    } catch (error) {
      console.error('Failed to load offline data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncData = async () => {
    setIsSyncing(true);
    
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mark items as synced
      setSyncQueue(prev => prev.map(item => 
        !item.synced ? { ...item, synced: true, retryCount: 0 } : item
      ));
      
      // Update offline data
      setOfflineData(prev => prev ? {
        ...prev,
        lastSync: new Date().toISOString(),
        pendingItems: 0
      } : null);
      
      console.log('Sync completed successfully');
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const resolveConflict = async (conflictId: string, resolution: 'local' | 'remote' | 'merge') => {
    try {
      setSyncConflicts(prev => prev.map(conflict => 
        conflict.id === conflictId 
          ? { ...conflict, resolution }
          : conflict
      ));
      
      // Remove resolved conflict
      setTimeout(() => {
        setSyncConflicts(prev => prev.filter(c => c.id !== conflictId));
      }, 1000);
    } catch (error) {
      console.error('Failed to resolve conflict:', error);
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'text-green-600 bg-green-100';
      case 'update': return 'text-blue-600 bg-blue-100';
      case 'delete': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return '📝';
      case 'project': return '📁';
      case 'energy': return '⚡';
      case 'settings': return '⚙️';
      default: return '📄';
    }
  };

  const getConflictIcon = (type: string) => {
    switch (type) {
      case 'update': return '🔄';
      case 'delete': return '🗑️';
      case 'create': return '➕';
      default: return '⚠️';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading offline sync system...</span>
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
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Offline Synchronization System</h2>
              <p className="text-green-100 mt-1">Work without internet connection, sync when online</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    isOnline ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {isOnline ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Pending:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {syncQueue.filter(item => !item.synced).length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Conflicts:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {syncConflicts.length}
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
              { id: 'queue', name: 'Sync Queue', icon: '📋' },
              { id: 'data', name: 'Offline Data', icon: '💾' },
              { id: 'conflicts', name: 'Conflicts', icon: '⚠️' },
              { id: 'settings', name: 'Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-green-500 text-green-600'
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
          {selectedTab === 'queue' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Sync Queue</h3>
                <button
                  onClick={syncData}
                  disabled={isSyncing || !isOnline}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSyncing ? 'Syncing...' : 'Sync Now'}
                </button>
              </div>
              
              <div className="space-y-4">
                {syncQueue.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      item.synced ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(item.type)}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">{item.type} {item.action}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(item.action)}`}>
                          {item.action.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.synced ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.synced ? 'SYNCED' : 'PENDING'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      <pre>{JSON.stringify(item.data, null, 2)}</pre>
                    </div>
                    
                    {item.lastError && (
                      <div className="mt-2 text-sm text-red-600">
                        Error: {item.lastError} (Retry: {item.retryCount})
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'data' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Offline Data</h3>
              
              {offlineData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">📝 Tasks ({offlineData.tasks.length})</h4>
                    <div className="space-y-2">
                      {offlineData.tasks.map((task, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className={task.completed ? 'text-green-600' : 'text-gray-400'}>
                            {task.completed ? '✅' : '⏳'}
                          </span>
                          {task.title}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">📁 Projects ({offlineData.projects.length})</h4>
                    <div className="space-y-2">
                      {offlineData.projects.map((project, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          {project.name} - {project.status}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">⚡ Energy Logs ({offlineData.energyLogs.length})</h4>
                    <div className="space-y-2">
                      {offlineData.energyLogs.map((log, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          Level {log.level} - {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">⚙️ Settings</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>Theme: {offlineData.settings.theme}</div>
                      <div>Notifications: {offlineData.settings.notifications ? 'On' : 'Off'}</div>
                      <div>Auto Sync: {offlineData.settings.autoSync ? 'On' : 'Off'}</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Last Sync</div>
                    <div className="text-sm text-gray-600">
                      {offlineData ? new Date(offlineData.lastSync).toLocaleString() : 'Never'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">Total Items</div>
                    <div className="text-sm text-gray-600">{offlineData?.totalItems || 0}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'conflicts' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Sync Conflicts</h3>
              
              <div className="space-y-4">
                {syncConflicts.map((conflict) => (
                  <motion.div
                    key={conflict.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getConflictIcon(conflict.conflictType)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 capitalize">{conflict.type} Conflict</h4>
                        <p className="text-sm text-gray-600">Conflict Type: {conflict.conflictType}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Local Data:</div>
                        <div className="text-xs text-gray-600 bg-white p-2 rounded">
                          <pre>{JSON.stringify(conflict.localData, null, 2)}</pre>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Remote Data:</div>
                        <div className="text-xs text-gray-600 bg-white p-2 rounded">
                          <pre>{JSON.stringify(conflict.remoteData, null, 2)}</pre>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => resolveConflict(conflict.id, 'local')}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all"
                      >
                        Use Local
                      </button>
                      <button
                        onClick={() => resolveConflict(conflict.id, 'remote')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all"
                      >
                        Use Remote
                      </button>
                      <button
                        onClick={() => resolveConflict(conflict.id, 'merge')}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all"
                      >
                        Merge
                      </button>
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
                      <span className="text-sm text-gray-700">Enable automatic sync when online</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Sync in background</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">Sync only on WiFi</span>
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
                      <span className="text-sm text-gray-700">Always use local data</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="conflict-resolution" className="rounded" />
                      <span className="text-sm text-gray-700">Always use remote data</span>
                    </label>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Storage</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Offline Storage Used</span>
                      <span className="text-sm font-medium text-gray-900">2.3 MB / 50 MB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '4.6%' }}></div>
                    </div>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-all">
                      Clear Offline Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Offline Synchronization System • {isOnline ? 'Online' : 'Offline'} • {syncQueue.filter(item => !item.synced).length} pending • {syncConflicts.length} conflicts
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
                console.log('Exporting offline sync data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OfflineSynchronizationSystem;
