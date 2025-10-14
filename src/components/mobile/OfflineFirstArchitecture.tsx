/**
 * Offline-First Architecture Component
 * 
 * Local storage management, sync queue, and offline data handling
 * Includes conflict resolution, data persistence, and sync strategies
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OfflineData {
  tasks: Task[];
  projects: Project[];
  energyLogs: EnergyLog[];
  userSettings: UserSettings;
  lastModified: string;
  version: number;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energy_requirement: number;
  estimated_duration: number;
  category?: string;
  due_date?: string;
  project_id?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  sync_status: 'synced' | 'pending' | 'conflict' | 'failed';
}

interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  created_at: string;
  updated_at: string;
  sync_status: 'synced' | 'pending' | 'conflict' | 'failed';
}

interface EnergyLog {
  id: string;
  energy_level: number;
  timestamp: string;
  notes?: string;
  sync_status: 'synced' | 'pending' | 'conflict' | 'failed';
}

interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  offline_mode: boolean;
  sync_frequency: 'immediate' | '5min' | '15min' | '1hour';
  last_sync: string;
}

interface SyncConflict {
  id: string;
  resourceType: 'task' | 'project' | 'energy_log';
  resourceId: string;
  localVersion: any;
  remoteVersion: any;
  conflictFields: string[];
  resolution: 'local' | 'remote' | 'merge' | 'manual';
  createdAt: string;
}

interface OfflineFirstArchitectureProps {
  onClose: () => void;
}

const OfflineFirstArchitecture: React.FC<OfflineFirstArchitectureProps> = ({ onClose }) => {
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null);
  const [syncConflicts, setSyncConflicts] = useState<SyncConflict[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'data' | 'conflicts' | 'sync' | 'settings'>('data');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [syncInProgress, setSyncInProgress] = useState(false);

  useEffect(() => {
    initializeOfflineData();
    setupEventListeners();
  }, []);

  const initializeOfflineData = async () => {
    setIsLoading(true);
    
    try {
      // Load offline data from localStorage
      const storedData = localStorage.getItem('offline_data');
      const storedConflicts = localStorage.getItem('sync_conflicts');
      const storedLastSync = localStorage.getItem('last_sync');
      
      if (storedData) {
        const data = JSON.parse(storedData);
        setOfflineData(data);
      } else {
        // Initialize with empty data
        const initialData: OfflineData = {
          tasks: [],
          projects: [],
          energyLogs: [],
          userSettings: {
            theme: 'auto',
            notifications: true,
            offline_mode: true,
            sync_frequency: '5min',
            last_sync: new Date().toISOString()
          },
          lastModified: new Date().toISOString(),
          version: 1
        };
        setOfflineData(initialData);
        localStorage.setItem('offline_data', JSON.stringify(initialData));
      }
      
      if (storedConflicts) {
        setSyncConflicts(JSON.parse(storedConflicts));
      }
      
      if (storedLastSync) {
        setLastSync(storedLastSync);
      }
      
    } catch (error) {
      console.error('Failed to initialize offline data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupEventListeners = () => {
    window.addEventListener('online', () => {
      setIsOnline(true);
      performSync();
    });

    window.addEventListener('offline', () => {
      setIsOnline(false);
    });

    // Listen for storage changes from other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'offline_data') {
        initializeOfflineData();
      }
    });
  };

  const saveOfflineData = (data: OfflineData) => {
    try {
      const updatedData = {
        ...data,
        lastModified: new Date().toISOString(),
        version: data.version + 1
      };
      
      setOfflineData(updatedData);
      localStorage.setItem('offline_data', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Failed to save offline data:', error);
    }
  };

  const addTask = (task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'sync_status'>) => {
    if (!offlineData) return;
    
    const newTask: Task = {
      ...task,
      id: `offline_task_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      sync_status: 'pending'
    };
    
    const updatedData = {
      ...offlineData,
      tasks: [...offlineData.tasks, newTask]
    };
    
    saveOfflineData(updatedData);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    if (!offlineData) return;
    
    const updatedTasks = offlineData.tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            ...updates, 
            updated_at: new Date().toISOString(),
            sync_status: 'pending' as const
          }
        : task
    );
    
    const updatedData = {
      ...offlineData,
      tasks: updatedTasks
    };
    
    saveOfflineData(updatedData);
  };

  const deleteTask = (taskId: string) => {
    if (!offlineData) return;
    
    const updatedTasks = offlineData.tasks.filter(task => task.id !== taskId);
    const updatedData = {
      ...offlineData,
      tasks: updatedTasks
    };
    
    saveOfflineData(updatedData);
  };

  const addProject = (project: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'sync_status'>) => {
    if (!offlineData) return;
    
    const newProject: Project = {
      ...project,
      id: `offline_project_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      sync_status: 'pending'
    };
    
    const updatedData = {
      ...offlineData,
      projects: [...offlineData.projects, newProject]
    };
    
    saveOfflineData(updatedData);
  };

  const logEnergy = (energyLevel: number, notes?: string) => {
    if (!offlineData) return;
    
    const newLog: EnergyLog = {
      id: `offline_energy_${Date.now()}`,
      energy_level: energyLevel,
      timestamp: new Date().toISOString(),
      notes,
      sync_status: 'pending'
    };
    
    const updatedData = {
      ...offlineData,
      energyLogs: [...offlineData.energyLogs, newLog]
    };
    
    saveOfflineData(updatedData);
  };

  const performSync = async () => {
    if (!isOnline || !offlineData || syncInProgress) return;
    
    setSyncInProgress(true);
    
    try {
      // Simulate API sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update sync status for synced items
      const updatedData = {
        ...offlineData,
        tasks: offlineData.tasks.map(task => 
          task.sync_status === 'pending' ? { ...task, sync_status: 'synced' as const } : task
        ),
        projects: offlineData.projects.map(project => 
          project.sync_status === 'pending' ? { ...project, sync_status: 'synced' as const } : project
        ),
        energyLogs: offlineData.energyLogs.map(log => 
          log.sync_status === 'pending' ? { ...log, sync_status: 'synced' as const } : log
        ),
        userSettings: {
          ...offlineData.userSettings,
          last_sync: new Date().toISOString()
        }
      };
      
      setOfflineData(updatedData);
      setLastSync(new Date().toISOString());
      localStorage.setItem('offline_data', JSON.stringify(updatedData));
      localStorage.setItem('last_sync', new Date().toISOString());
      
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setSyncInProgress(false);
    }
  };

  const resolveConflict = (conflictId: string, resolution: SyncConflict['resolution']) => {
    const updatedConflicts = syncConflicts.map(conflict => 
      conflict.id === conflictId ? { ...conflict, resolution } : conflict
    );
    
    setSyncConflicts(updatedConflicts);
    localStorage.setItem('sync_conflicts', JSON.stringify(updatedConflicts));
  };

  const clearSyncedData = () => {
    if (!offlineData) return;
    
    const updatedData = {
      ...offlineData,
      tasks: offlineData.tasks.filter(task => task.sync_status !== 'synced'),
      projects: offlineData.projects.filter(project => project.sync_status !== 'synced'),
      energyLogs: offlineData.energyLogs.filter(log => log.sync_status !== 'synced')
    };
    
    saveOfflineData(updatedData);
  };

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'conflict': return 'text-red-600 bg-red-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case 'synced': return '✅';
      case 'pending': return '⏳';
      case 'conflict': return '⚠️';
      case 'failed': return '❌';
      default: return '❓';
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
            <span className="text-lg font-medium text-gray-700">Loading offline data...</span>
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
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Offline-First Architecture</h2>
              <p className="text-green-100 mt-1">Local storage, sync queue, and conflict resolution</p>
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
                  <span className="text-green-200 text-sm">Data:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {offlineData ? offlineData.version : 0}
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
              { id: 'data', name: 'Offline Data', icon: '💾' },
              { id: 'conflicts', name: 'Conflicts', icon: '⚠️' },
              { id: 'sync', name: 'Sync Status', icon: '🔄' },
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
          {selectedTab === 'data' && offlineData && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Offline Data</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => addTask({
                      title: 'Sample Offline Task',
                      description: 'Created while offline',
                      priority: 3,
                      energy_requirement: 5,
                      estimated_duration: 30,
                      status: 'pending'
                    })}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => addProject({
                      name: 'Sample Offline Project',
                      description: 'Created while offline',
                      status: 'active'
                    })}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all text-sm"
                  >
                    Add Project
                  </button>
                  <button
                    onClick={() => logEnergy(7, 'Feeling productive offline!')}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm"
                  >
                    Log Energy
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📝</span>
                    <span className="text-lg text-blue-600">
                      {offlineData.tasks.filter(t => t.sync_status === 'pending').length}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{offlineData.tasks.length}</div>
                  <div className="text-blue-600 text-sm">Total Tasks</div>
                  <div className="text-xs text-blue-500 mt-1">
                    {offlineData.tasks.filter(t => t.sync_status === 'synced').length} synced
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📁</span>
                    <span className="text-lg text-purple-600">
                      {offlineData.projects.filter(p => p.sync_status === 'pending').length}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">{offlineData.projects.length}</div>
                  <div className="text-purple-600 text-sm">Total Projects</div>
                  <div className="text-xs text-purple-500 mt-1">
                    {offlineData.projects.filter(p => p.sync_status === 'synced').length} synced
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">⚡</span>
                    <span className="text-lg text-green-600">
                      {offlineData.energyLogs.filter(e => e.sync_status === 'pending').length}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">{offlineData.energyLogs.length}</div>
                  <div className="text-green-600 text-sm">Energy Logs</div>
                  <div className="text-xs text-green-500 mt-1">
                    {offlineData.energyLogs.filter(e => e.sync_status === 'synced').length} synced
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
                  <div key={conflict.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Conflict in {conflict.resourceType} - {conflict.resourceId}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {conflict.conflictFields.length} field{conflict.conflictFields.length !== 1 ? 's' : ''} in conflict
                        </p>
                      </div>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                        {conflict.resolution.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {conflict.conflictFields.map((field) => (
                        <div key={field} className="p-3 bg-white rounded border">
                          <div className="font-medium text-gray-900 mb-2">Field: {field}</div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm font-medium text-gray-700 mb-1">Local Value:</div>
                              <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                                {JSON.stringify(conflict.localVersion[field])}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-700 mb-1">Remote Value:</div>
                              <div className="text-sm text-gray-600 bg-green-50 p-2 rounded">
                                {JSON.stringify(conflict.remoteVersion[field])}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 mt-3">
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
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'sync' && offlineData && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Sync Status</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={performSync}
                    disabled={!isOnline || syncInProgress}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm disabled:opacity-50"
                  >
                    {syncInProgress ? 'Syncing...' : 'Sync Now'}
                  </button>
                  <button
                    onClick={clearSyncedData}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all text-sm"
                  >
                    Clear Synced
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Tasks</h4>
                  <div className="space-y-2">
                    {offlineData.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center space-x-3">
                          <span>{getSyncStatusIcon(task.sync_status)}</span>
                          <span className="text-sm font-medium text-gray-900">{task.title}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSyncStatusColor(task.sync_status)}`}>
                          {task.sync_status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Projects</h4>
                  <div className="space-y-2">
                    {offlineData.projects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center space-x-3">
                          <span>{getSyncStatusIcon(project.sync_status)}</span>
                          <span className="text-sm font-medium text-gray-900">{project.name}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSyncStatusColor(project.sync_status)}`}>
                          {project.sync_status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Energy Logs</h4>
                  <div className="space-y-2">
                    {offlineData.energyLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center space-x-3">
                          <span>{getSyncStatusIcon(log.sync_status)}</span>
                          <span className="text-sm font-medium text-gray-900">
                            Level {log.energy_level} - {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSyncStatusColor(log.sync_status)}`}>
                          {log.sync_status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'settings' && offlineData && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Offline Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Sync Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Offline Mode</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={offlineData.userSettings.offline_mode}
                          onChange={(e) => {
                            const updatedSettings = {
                              ...offlineData.userSettings,
                              offline_mode: e.target.checked
                            };
                            const updatedData = {
                              ...offlineData,
                              userSettings: updatedSettings
                            };
                            saveOfflineData(updatedData);
                          }}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sync Frequency</label>
                      <select 
                        value={offlineData.userSettings.sync_frequency}
                        onChange={(e) => {
                          const updatedSettings = {
                            ...offlineData.userSettings,
                            sync_frequency: e.target.value as any
                          };
                          const updatedData = {
                            ...offlineData,
                            userSettings: updatedSettings
                          };
                          saveOfflineData(updatedData);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="immediate">Immediate</option>
                        <option value="5min">Every 5 minutes</option>
                        <option value="15min">Every 15 minutes</option>
                        <option value="1hour">Every hour</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Auto Sync</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Data Management</h4>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <div className="font-medium mb-1">Storage Usage:</div>
                      <div>Tasks: {offlineData.tasks.length}</div>
                      <div>Projects: {offlineData.projects.length}</div>
                      <div>Energy Logs: {offlineData.energyLogs.length}</div>
                      <div className="mt-2">Last Modified: {new Date(offlineData.lastModified).toLocaleString()}</div>
                    </div>
                    <button
                      onClick={() => {
                        localStorage.removeItem('offline_data');
                        initializeOfflineData();
                      }}
                      className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all text-sm"
                    >
                      Clear All Data
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
            Offline-First Architecture • {isOnline ? 'Online' : 'Offline'} • Last sync: {lastSync ? new Date(lastSync).toLocaleString() : 'Never'}
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
                console.log('Exporting offline data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OfflineFirstArchitecture;
