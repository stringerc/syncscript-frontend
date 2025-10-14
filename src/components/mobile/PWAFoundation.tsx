/**
 * Progressive Web App (PWA) Foundation Component
 * 
 * Service worker management, offline capabilities, and PWA features
 * Includes app installation, offline sync, and mobile optimization
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PWAStatus {
  isInstalled: boolean;
  isInstallable: boolean;
  isOnline: boolean;
  hasServiceWorker: boolean;
  lastSync: string | null;
  offlineData: {
    tasks: number;
    projects: number;
    energyLogs: number;
  };
}

interface OfflineAction {
  id: string;
  type: 'create_task' | 'update_task' | 'delete_task' | 'create_project' | 'update_project' | 'delete_project' | 'log_energy';
  data: any;
  timestamp: string;
  retryCount: number;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
}

interface PWAFoundationProps {
  onClose: () => void;
}

const PWAFoundation: React.FC<PWAFoundationProps> = ({ onClose }) => {
  const [pwaStatus, setPwaStatus] = useState<PWAStatus>({
    isInstalled: false,
    isInstallable: false,
    isOnline: true,
    hasServiceWorker: false,
    lastSync: null,
    offlineData: {
      tasks: 0,
      projects: 0,
      energyLogs: 0
    }
  });
  const [offlineActions, setOfflineActions] = useState<OfflineAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'status' | 'offline' | 'sync' | 'settings'>('status');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [serviceWorkerRegistration, setServiceWorkerRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    initializePWA();
    setupEventListeners();
  }, []);

  const initializePWA = async () => {
    setIsLoading(true);
    
    try {
      // Check if app is already installed
      const isInstalled = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true;
      
      // Check online status
      const isOnline = navigator.onLine;
      
      // Check for service worker
      let hasServiceWorker = false;
      let registration: ServiceWorkerRegistration | null = null;
      
      if ('serviceWorker' in navigator) {
        try {
          registration = await navigator.serviceWorker.getRegistration();
          hasServiceWorker = !!registration;
          setServiceWorkerRegistration(registration);
        } catch (error) {
          console.error('Service worker check failed:', error);
        }
      }
      
      // Load offline data
      const offlineData = await loadOfflineData();
      
      // Load pending actions
      const pendingActions = await loadPendingActions();
      
      setPwaStatus({
        isInstalled,
        isInstallable: !isInstalled && !!deferredPrompt,
        isOnline,
        hasServiceWorker,
        lastSync: localStorage.getItem('lastSync') || null,
        offlineData
      });
      
      setOfflineActions(pendingActions);
      
    } catch (error) {
      console.error('PWA initialization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupEventListeners = () => {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setPwaStatus(prev => ({ ...prev, isInstallable: true }));
    });

    // Listen for appinstalled event
    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      setPwaStatus(prev => ({ ...prev, isInstalled: true, isInstallable: false }));
    });

    // Listen for online/offline events
    window.addEventListener('online', () => {
      setPwaStatus(prev => ({ ...prev, isOnline: true }));
      syncOfflineActions();
    });

    window.addEventListener('offline', () => {
      setPwaStatus(prev => ({ ...prev, isOnline: false }));
    });

    // Listen for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'SYNC_COMPLETE') {
          setPwaStatus(prev => ({ ...prev, lastSync: new Date().toISOString() }));
          localStorage.setItem('lastSync', new Date().toISOString());
        }
      });
    }
  };

  const loadOfflineData = async (): Promise<PWAStatus['offlineData']> => {
    try {
      const tasks = JSON.parse(localStorage.getItem('offline_tasks') || '[]');
      const projects = JSON.parse(localStorage.getItem('offline_projects') || '[]');
      const energyLogs = JSON.parse(localStorage.getItem('offline_energy_logs') || '[]');
      
      return {
        tasks: tasks.length,
        projects: projects.length,
        energyLogs: energyLogs.length
      };
    } catch (error) {
      console.error('Failed to load offline data:', error);
      return { tasks: 0, projects: 0, energyLogs: 0 };
    }
  };

  const loadPendingActions = async (): Promise<OfflineAction[]> => {
    try {
      const actions = JSON.parse(localStorage.getItem('offline_actions') || '[]');
      return actions;
    } catch (error) {
      console.error('Failed to load pending actions:', error);
      return [];
    }
  };

  const installPWA = async () => {
    if (!deferredPrompt) return;
    
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA installation accepted');
      } else {
        console.log('PWA installation dismissed');
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('PWA installation failed:', error);
    }
  };

  const registerServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) {
      console.log('Service workers not supported');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service worker registered:', registration);
      
      setServiceWorkerRegistration(registration);
      setPwaStatus(prev => ({ ...prev, hasServiceWorker: true }));
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              console.log('New service worker available');
            }
          });
        }
      });
      
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  };

  const syncOfflineActions = async () => {
    if (!pwaStatus.isOnline || offlineActions.length === 0) return;
    
    try {
      const actionsToSync = offlineActions.filter(action => action.status === 'pending');
      
      for (const action of actionsToSync) {
        setOfflineActions(prev => prev.map(a => 
          a.id === action.id ? { ...a, status: 'syncing' } : a
        ));
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          setOfflineActions(prev => prev.map(a => 
            a.id === action.id ? { ...a, status: 'completed' } : a
          ));
          
        } catch (error) {
          setOfflineActions(prev => prev.map(a => 
            a.id === action.id ? { 
              ...a, 
              status: 'failed', 
              retryCount: a.retryCount + 1 
            } : a
          ));
        }
      }
      
      // Update last sync time
      setPwaStatus(prev => ({ ...prev, lastSync: new Date().toISOString() }));
      localStorage.setItem('lastSync', new Date().toISOString());
      
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  const clearCompletedActions = () => {
    setOfflineActions(prev => prev.filter(action => action.status !== 'completed'));
    localStorage.setItem('offline_actions', JSON.stringify(
      offlineActions.filter(action => action.status !== 'completed')
    ));
  };

  const retryFailedActions = () => {
    setOfflineActions(prev => prev.map(action => 
      action.status === 'failed' ? { ...action, status: 'pending' } : action
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'syncing': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'create_task': return '📝';
      case 'update_task': return '✏️';
      case 'delete_task': return '🗑️';
      case 'create_project': return '📁';
      case 'update_project': return '📂';
      case 'delete_project': return '🗑️';
      case 'log_energy': return '⚡';
      default: return '📄';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Initializing PWA...</span>
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">PWA Foundation</h2>
              <p className="text-blue-100 mt-1">Progressive Web App & Offline Support</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    pwaStatus.isInstalled ? 'bg-green-500' :
                    pwaStatus.isInstallable ? 'bg-yellow-500' :
                    'bg-gray-500'
                  }`}>
                    {pwaStatus.isInstalled ? 'INSTALLED' :
                     pwaStatus.isInstallable ? 'INSTALLABLE' :
                     'NOT INSTALLABLE'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Online:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    pwaStatus.isOnline ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {pwaStatus.isOnline ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">SW:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    pwaStatus.hasServiceWorker ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {pwaStatus.hasServiceWorker ? 'ACTIVE' : 'INACTIVE'}
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
              { id: 'status', name: 'PWA Status', icon: '📱' },
              { id: 'offline', name: 'Offline Data', icon: '💾' },
              { id: 'sync', name: 'Sync Queue', icon: '🔄' },
              { id: 'settings', name: 'Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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
          {selectedTab === 'status' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">PWA Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Installation Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">App Installed</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        pwaStatus.isInstalled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {pwaStatus.isInstalled ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Installable</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        pwaStatus.isInstallable ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {pwaStatus.isInstallable ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {pwaStatus.isInstallable && (
                      <button
                        onClick={installPWA}
                        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Install App
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Service Worker</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Registered</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        pwaStatus.hasServiceWorker ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {pwaStatus.hasServiceWorker ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Sync</span>
                      <span className="text-sm text-gray-600">
                        {pwaStatus.lastSync ? new Date(pwaStatus.lastSync).toLocaleString() : 'Never'}
                      </span>
                    </div>
                    {!pwaStatus.hasServiceWorker && (
                      <button
                        onClick={registerServiceWorker}
                        className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Register Service Worker
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'offline' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Offline Data</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📝</span>
                    <span className="text-lg text-blue-600">+12%</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{pwaStatus.offlineData.tasks}</div>
                  <div className="text-blue-600 text-sm">Offline Tasks</div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📁</span>
                    <span className="text-lg text-purple-600">+8%</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">{pwaStatus.offlineData.projects}</div>
                  <div className="text-purple-600 text-sm">Offline Projects</div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">⚡</span>
                    <span className="text-lg text-green-600">+15%</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">{pwaStatus.offlineData.energyLogs}</div>
                  <div className="text-green-600 text-sm">Energy Logs</div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'sync' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Sync Queue</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={syncOfflineActions}
                    disabled={!pwaStatus.isOnline}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm disabled:opacity-50"
                  >
                    Sync Now
                  </button>
                  <button
                    onClick={retryFailedActions}
                    className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-all text-sm"
                  >
                    Retry Failed
                  </button>
                  <button
                    onClick={clearCompletedActions}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm"
                  >
                    Clear Completed
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {offlineActions.map((action) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getActionIcon(action.type)}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {action.type.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(action.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(action.status)}`}>
                          {action.status.toUpperCase()}
                        </span>
                        {action.retryCount > 0 && (
                          <span className="text-xs text-gray-500">
                            Retries: {action.retryCount}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {JSON.stringify(action.data, null, 2)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">PWA Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Offline Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Auto Sync</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Background Sync</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Offline Notifications</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Performance Settings</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cache Strategy</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="cache-first">Cache First</option>
                        <option value="network-first">Network First</option>
                        <option value="stale-while-revalidate">Stale While Revalidate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sync Frequency</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="immediate">Immediate</option>
                        <option value="5min">Every 5 minutes</option>
                        <option value="15min">Every 15 minutes</option>
                        <option value="1hour">Every hour</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Retries</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
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
            PWA Foundation • {pwaStatus.isOnline ? 'Online' : 'Offline'} • {offlineActions.length} pending actions
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
                console.log('Exporting PWA data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PWAFoundation;
