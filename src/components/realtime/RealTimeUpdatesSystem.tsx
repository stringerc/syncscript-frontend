/**
 * Real-Time Updates System Component
 * 
 * Instant synchronization for tasks, projects, and team activities
 * Includes conflict resolution, live editing, and update broadcasting
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RealTimeUpdate {
  id: string;
  type: 'task_created' | 'task_updated' | 'task_deleted' | 'project_created' | 'project_updated' | 'project_deleted' | 'comment_added' | 'status_changed' | 'assignment_changed';
  resourceId: string;
  resourceType: 'task' | 'project' | 'comment' | 'user';
  userId: string;
  userName: string;
  timestamp: string;
  changes: Record<string, any>;
  metadata: {
    priority: 'low' | 'medium' | 'high' | 'urgent';
    impact: 'low' | 'medium' | 'high';
    requiresAction: boolean;
    teamId: string;
  };
}

interface ConflictResolution {
  id: string;
  resourceId: string;
  resourceType: string;
  conflicts: Conflict[];
  status: 'pending' | 'resolved' | 'escalated';
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

interface Conflict {
  field: string;
  localValue: any;
  remoteValue: any;
  localTimestamp: string;
  remoteTimestamp: string;
  resolution: 'local' | 'remote' | 'merge' | 'manual';
}

interface UpdateQueue {
  id: string;
  updates: RealTimeUpdate[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  processedAt?: string;
}

interface RealTimeUpdatesSystemProps {
  teamId: string;
  onClose: () => void;
}

const RealTimeUpdatesSystem: React.FC<RealTimeUpdatesSystemProps> = ({ teamId, onClose }) => {
  const [updates, setUpdates] = useState<RealTimeUpdate[]>([]);
  const [conflicts, setConflicts] = useState<ConflictResolution[]>([]);
  const [updateQueue, setUpdateQueue] = useState<UpdateQueue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'updates' | 'conflicts' | 'queue' | 'settings'>('updates');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    loadRealTimeData();
  }, [teamId]);

  const loadRealTimeData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock real-time updates
      const mockUpdates: RealTimeUpdate[] = [
        {
          id: 'update-1',
          type: 'task_created',
          resourceId: 'task-123',
          resourceType: 'task',
          userId: 'user-1',
          userName: 'John Admin',
          timestamp: new Date().toISOString(),
          changes: {
            title: 'Implement user authentication',
            description: 'Add Auth0 integration',
            priority: 'high',
            assignee: 'user-2'
          },
          metadata: {
            priority: 'high',
            impact: 'high',
            requiresAction: true,
            teamId
          }
        },
        {
          id: 'update-2',
          type: 'task_updated',
          resourceId: 'task-456',
          resourceType: 'task',
          userId: 'user-2',
          userName: 'Jane Manager',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          changes: {
            status: 'in_progress',
            progress: 75,
            updatedFields: ['status', 'progress']
          },
          metadata: {
            priority: 'medium',
            impact: 'medium',
            requiresAction: false,
            teamId
          }
        },
        {
          id: 'update-3',
          type: 'project_updated',
          resourceId: 'project-789',
          resourceType: 'project',
          userId: 'user-3',
          userName: 'Bob Developer',
          timestamp: new Date(Date.now() - 600000).toISOString(),
          changes: {
            name: 'Mobile App Development',
            description: 'Native mobile application for iOS and Android',
            deadline: '2024-06-30',
            updatedFields: ['name', 'description', 'deadline']
          },
          metadata: {
            priority: 'high',
            impact: 'high',
            requiresAction: true,
            teamId
          }
        },
        {
          id: 'update-4',
          type: 'comment_added',
          resourceId: 'comment-101',
          resourceType: 'comment',
          userId: 'user-4',
          userName: 'Alice Designer',
          timestamp: new Date(Date.now() - 900000).toISOString(),
          changes: {
            content: 'The UI mockups look great! Let me know if you need any adjustments.',
            parentId: 'task-123',
            mentions: ['user-1', 'user-2']
          },
          metadata: {
            priority: 'low',
            impact: 'low',
            requiresAction: false,
            teamId
          }
        }
      ];

      // Mock conflicts
      const mockConflicts: ConflictResolution[] = [
        {
          id: 'conflict-1',
          resourceId: 'task-123',
          resourceType: 'task',
          conflicts: [
            {
              field: 'description',
              localValue: 'Add Auth0 integration with MFA',
              remoteValue: 'Add Auth0 integration without MFA',
              localTimestamp: new Date(Date.now() - 120000).toISOString(),
              remoteTimestamp: new Date(Date.now() - 180000).toISOString(),
              resolution: 'pending'
            }
          ],
          status: 'pending',
          createdAt: new Date(Date.now() - 300000).toISOString()
        }
      ];

      // Mock update queue
      const mockQueue: UpdateQueue[] = [
        {
          id: 'queue-1',
          updates: mockUpdates.slice(0, 2),
          status: 'processing',
          createdAt: new Date(Date.now() - 600000).toISOString(),
          processedAt: new Date(Date.now() - 300000).toISOString()
        },
        {
          id: 'queue-2',
          updates: mockUpdates.slice(2),
          status: 'pending',
          createdAt: new Date(Date.now() - 300000).toISOString()
        }
      ];

      setUpdates(mockUpdates);
      setConflicts(mockConflicts);
      setUpdateQueue(mockQueue);
    } catch (error) {
      console.error('Failed to load real-time data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConflictResolution = (conflictId: string, resolution: Conflict['resolution']) => {
    setConflicts(prev => prev.map(conflict => 
      conflict.id === conflictId
        ? {
            ...conflict,
            status: 'resolved',
            resolvedAt: new Date().toISOString(),
            resolvedBy: 'current-user',
            conflicts: conflict.conflicts.map(c => ({ ...c, resolution }))
          }
        : conflict
    ));
  };

  const retryFailedUpdate = (queueId: string) => {
    setUpdateQueue(prev => prev.map(queue => 
      queue.id === queueId
        ? { ...queue, status: 'pending', processedAt: undefined }
        : queue
    ));
  };

  const filteredUpdates = updates.filter(update => {
    const typeMatch = filterType === 'all' || update.type === filterType;
    const priorityMatch = filterPriority === 'all' || update.metadata.priority === filterPriority;
    return typeMatch && priorityMatch;
  });

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'task_created': return '📝';
      case 'task_updated': return '✏️';
      case 'task_deleted': return '🗑️';
      case 'project_created': return '📁';
      case 'project_updated': return '📂';
      case 'project_deleted': return '🗑️';
      case 'comment_added': return '💬';
      case 'status_changed': return '🔄';
      case 'assignment_changed': return '👤';
      default: return '📄';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'escalated': return 'text-red-600 bg-red-100';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading real-time updates...</span>
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Real-Time Updates System</h2>
              <p className="text-purple-100 mt-1">Instant synchronization and conflict resolution</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    isConnected ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Updates:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {updates.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Conflicts:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {conflicts.filter(c => c.status === 'pending').length}
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
              { id: 'updates', name: 'Live Updates', icon: '⚡' },
              { id: 'conflicts', name: 'Conflicts', icon: '⚠️' },
              { id: 'queue', name: 'Update Queue', icon: '📋' },
              { id: 'settings', name: 'Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Type:</span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Types</option>
                <option value="task_created">Task Created</option>
                <option value="task_updated">Task Updated</option>
                <option value="project_updated">Project Updated</option>
                <option value="comment_added">Comment Added</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Priority:</span>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'updates' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Live Updates</h3>
              
              <div className="space-y-4">
                {filteredUpdates.map((update) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getUpdateIcon(update.type)}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {update.userName} {update.type.replace('_', ' ')}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(update.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(update.metadata.priority)}`}>
                          {update.metadata.priority.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(update.metadata.impact)}`}>
                          {update.metadata.impact.toUpperCase()}
                        </span>
                        {update.metadata.requiresAction && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                            ACTION REQUIRED
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-sm font-medium text-gray-700 mb-2">Changes:</div>
                      <div className="text-sm text-gray-600">
                        {Object.entries(update.changes).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="font-medium">{key}:</span>
                            <span>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'conflicts' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Conflict Resolution</h3>
              
              <div className="space-y-4">
                {conflicts.map((conflict) => (
                  <div key={conflict.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Conflict in {conflict.resourceType} - {conflict.resourceId}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {conflict.conflicts.length} conflict{conflict.conflicts.length !== 1 ? 's' : ''} detected
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(conflict.status)}`}>
                        {conflict.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {conflict.conflicts.map((conf, index) => (
                        <div key={index} className="p-3 bg-white rounded border">
                          <div className="font-medium text-gray-900 mb-2">Field: {conf.field}</div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm font-medium text-gray-700 mb-1">Local Value:</div>
                              <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                                {String(conf.localValue)}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {new Date(conf.localTimestamp).toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-700 mb-1">Remote Value:</div>
                              <div className="text-sm text-gray-600 bg-green-50 p-2 rounded">
                                {String(conf.remoteValue)}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {new Date(conf.remoteTimestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          
                          {conflict.status === 'pending' && (
                            <div className="flex space-x-2 mt-3">
                              <button
                                onClick={() => handleConflictResolution(conflict.id, 'local')}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all"
                              >
                                Use Local
                              </button>
                              <button
                                onClick={() => handleConflictResolution(conflict.id, 'remote')}
                                className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all"
                              >
                                Use Remote
                              </button>
                              <button
                                onClick={() => handleConflictResolution(conflict.id, 'merge')}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all"
                              >
                                Merge
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'queue' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Update Queue</h3>
              
              <div className="space-y-4">
                {updateQueue.map((queue) => (
                  <div key={queue.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">Queue {queue.id}</h4>
                        <p className="text-sm text-gray-600">
                          {queue.updates.length} update{queue.updates.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(queue.status)}`}>
                          {queue.status.toUpperCase()}
                        </span>
                        {queue.status === 'failed' && (
                          <button
                            onClick={() => retryFailedUpdate(queue.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-all"
                          >
                            Retry
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {queue.updates.map((update) => (
                        <div key={update.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                          <span className="text-lg">{getUpdateIcon(update.type)}</span>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">
                              {update.type.replace('_', ' ')}
                            </div>
                            <div className="text-xs text-gray-600">
                              {update.resourceType} - {update.resourceId}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(update.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-500">
                      Created: {new Date(queue.createdAt).toLocaleString()}
                      {queue.processedAt && (
                        <span> • Processed: {new Date(queue.processedAt).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Real-Time Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Sync Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Auto Sync</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Conflict Detection</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Offline Mode</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Performance Settings</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sync Frequency</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        <option value="realtime">Real-time (fastest)</option>
                        <option value="fast">Fast (1s)</option>
                        <option value="normal">Normal (5s)</option>
                        <option value="slow">Slow (10s)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Buffer Size</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        <option value="50">50 updates</option>
                        <option value="100">100 updates</option>
                        <option value="200">200 updates</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Retry Attempts</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        <option value="3">3 attempts</option>
                        <option value="5">5 attempts</option>
                        <option value="10">10 attempts</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Real-Time Updates • {updates.length} updates • {conflicts.filter(c => c.status === 'pending').length} conflicts
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
                console.log('Exporting real-time data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RealTimeUpdatesSystem;
