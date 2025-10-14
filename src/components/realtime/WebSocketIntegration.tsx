/**
 * WebSocket Server Integration Component
 * 
 * Real-time communication system with Socket.io integration
 * Includes live updates, presence tracking, and collaborative features
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import io, { Socket } from 'socket.io-client';

interface UserPresence {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  currentActivity: string;
  lastSeen: string;
  location: {
    page: string;
    section?: string;
    element?: string;
  };
}

interface LiveUpdate {
  id: string;
  type: 'task_created' | 'task_updated' | 'task_deleted' | 'project_created' | 'project_updated' | 'comment_added' | 'user_joined' | 'user_left';
  userId: string;
  userName: string;
  timestamp: string;
  data: any;
  teamId: string;
}

interface CollaborationSession {
  id: string;
  type: 'task_edit' | 'project_edit' | 'comment_thread';
  resourceId: string;
  participants: string[];
  cursors: Record<string, CursorPosition>;
  lastActivity: string;
}

interface CursorPosition {
  userId: string;
  userName: string;
  x: number;
  y: number;
  element: string;
  timestamp: string;
}

interface WebSocketIntegrationProps {
  teamId: string;
  userId: string;
  onClose: () => void;
}

const WebSocketIntegration: React.FC<WebSocketIntegrationProps> = ({ teamId, userId, onClose }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([]);
  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>([]);
  const [collaborationSessions, setCollaborationSessions] = useState<CollaborationSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'presence' | 'updates' | 'collaboration' | 'settings'>('presence');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');
  
  const socketRef = useRef<Socket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeWebSocket();
    return () => {
      cleanup();
    };
  }, [teamId, userId]);

  const initializeWebSocket = () => {
    try {
      // Initialize Socket.io connection
      const newSocket = io('ws://localhost:3001', {
        auth: {
          teamId,
          userId,
          token: 'mock-jwt-token'
        },
        transports: ['websocket', 'polling'],
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      socketRef.current = newSocket;
      setSocket(newSocket);

      // Connection events
      newSocket.on('connect', () => {
        console.log('✅ WebSocket connected');
        setIsConnected(true);
        setConnectionStatus('connected');
        setIsLoading(false);
        
        // Join team room
        newSocket.emit('join_team', { teamId, userId });
      });

      newSocket.on('disconnect', (reason) => {
        console.log('❌ WebSocket disconnected:', reason);
        setIsConnected(false);
        setConnectionStatus('disconnected');
        
        // Attempt reconnection
        if (reason !== 'io client disconnect') {
          scheduleReconnect();
        }
      });

      newSocket.on('connect_error', (error) => {
        console.error('❌ WebSocket connection error:', error);
        setConnectionStatus('error');
        setIsLoading(false);
      });

      // Presence events
      newSocket.on('user_online', (user: UserPresence) => {
        setOnlineUsers(prev => {
          const existing = prev.find(u => u.userId === user.userId);
          if (existing) {
            return prev.map(u => u.userId === user.userId ? { ...u, ...user } : u);
          }
          return [...prev, user];
        });
      });

      newSocket.on('user_offline', (userId: string) => {
        setOnlineUsers(prev => prev.map(user => 
          user.userId === userId 
            ? { ...user, status: 'offline', lastSeen: new Date().toISOString() }
            : user
        ));
      });

      newSocket.on('presence_update', (user: UserPresence) => {
        setOnlineUsers(prev => prev.map(u => 
          u.userId === user.userId ? { ...u, ...user } : u
        ));
      });

      // Live updates events
      newSocket.on('live_update', (update: LiveUpdate) => {
        setLiveUpdates(prev => [update, ...prev.slice(0, 49)]); // Keep last 50 updates
      });

      // Collaboration events
      newSocket.on('collaboration_start', (session: CollaborationSession) => {
        setCollaborationSessions(prev => {
          const existing = prev.find(s => s.id === session.id);
          if (existing) {
            return prev.map(s => s.id === session.id ? { ...s, ...session } : s);
          }
          return [...prev, session];
        });
      });

      newSocket.on('collaboration_end', (sessionId: string) => {
        setCollaborationSessions(prev => prev.filter(s => s.id !== sessionId));
      });

      newSocket.on('cursor_update', (cursor: CursorPosition) => {
        setCollaborationSessions(prev => prev.map(session => 
          session.id === cursor.element ? {
            ...session,
            cursors: {
              ...session.cursors,
              [cursor.userId]: cursor
            },
            lastActivity: cursor.timestamp
          } : session
        ));
      });

      // Error handling
      newSocket.on('error', (error) => {
        console.error('WebSocket error:', error);
      });

    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
      setConnectionStatus('error');
      setIsLoading(false);
    }
  };

  const scheduleReconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    reconnectTimeoutRef.current = setTimeout(() => {
      console.log('🔄 Attempting to reconnect...');
      setConnectionStatus('connecting');
      initializeWebSocket();
    }, 5000);
  };

  const cleanup = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
  };

  const sendLiveUpdate = (type: LiveUpdate['type'], data: any) => {
    if (socket && isConnected) {
      const update: LiveUpdate = {
        id: `update_${Date.now()}`,
        type,
        userId,
        userName: 'Current User',
        timestamp: new Date().toISOString(),
        data,
        teamId
      };
      
      socket.emit('live_update', update);
    }
  };

  const updatePresence = (activity: string, location: UserPresence['location']) => {
    if (socket && isConnected) {
      socket.emit('presence_update', {
        userId,
        activity,
        location,
        timestamp: new Date().toISOString()
      });
    }
  };

  const startCollaboration = (type: CollaborationSession['type'], resourceId: string) => {
    if (socket && isConnected) {
      socket.emit('collaboration_start', {
        type,
        resourceId,
        userId,
        timestamp: new Date().toISOString()
      });
    }
  };

  const endCollaboration = (sessionId: string) => {
    if (socket && isConnected) {
      socket.emit('collaboration_end', { sessionId, userId });
    }
  };

  const sendCursorUpdate = (x: number, y: number, element: string) => {
    if (socket && isConnected) {
      const cursor: CursorPosition = {
        userId,
        userName: 'Current User',
        x,
        y,
        element,
        timestamp: new Date().toISOString()
      };
      
      socket.emit('cursor_update', cursor);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'away': return 'text-yellow-600 bg-yellow-100';
      case 'busy': return 'text-red-600 bg-red-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return '🟢';
      case 'away': return '🟡';
      case 'busy': return '🔴';
      case 'offline': return '⚫';
      default: return '⚫';
    }
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'task_created': return '📝';
      case 'task_updated': return '✏️';
      case 'task_deleted': return '🗑️';
      case 'project_created': return '📁';
      case 'project_updated': return '📂';
      case 'comment_added': return '💬';
      case 'user_joined': return '👋';
      case 'user_left': return '👋';
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
            <span className="text-lg font-medium text-gray-700">Connecting to real-time server...</span>
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
              <h2 className="text-2xl font-bold">WebSocket Integration</h2>
              <p className="text-blue-100 mt-1">Real-time collaboration and live updates</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    connectionStatus === 'connected' ? 'bg-green-500' :
                    connectionStatus === 'connecting' ? 'bg-yellow-500' :
                    connectionStatus === 'error' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}>
                    {connectionStatus.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Online:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {onlineUsers.filter(u => u.status === 'online').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Updates:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {liveUpdates.length}
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
              { id: 'presence', name: 'Live Presence', icon: '👥' },
              { id: 'updates', name: 'Live Updates', icon: '⚡' },
              { id: 'collaboration', name: 'Collaboration', icon: '🤝' },
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
          {selectedTab === 'presence' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Live Team Presence</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {onlineUsers.map((user) => (
                  <motion.div
                    key={user.userId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          user.status === 'online' ? 'bg-green-500' :
                          user.status === 'away' ? 'bg-yellow-500' :
                          user.status === 'busy' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(user.status)}`}>
                          {getStatusIcon(user.status)} {user.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Activity</span>
                        <span className="text-sm font-medium text-gray-900">{user.currentActivity}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Location</span>
                        <span className="text-sm text-gray-900">{user.location.page}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Seen</span>
                        <span className="text-sm text-gray-900">
                          {new Date(user.lastSeen).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'updates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Live Updates</h3>
                <button
                  onClick={() => sendLiveUpdate('task_created', { title: 'Test Task', description: 'Created via WebSocket' })}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm"
                >
                  Send Test Update
                </button>
              </div>
              
              <div className="space-y-3">
                {liveUpdates.map((update) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getUpdateIcon(update.type)}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {update.userName} {update.type.replace('_', ' ')}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(update.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    {update.data && (
                      <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {JSON.stringify(update.data, null, 2)}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'collaboration' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Active Collaboration Sessions</h3>
              
              <div className="space-y-4">
                {collaborationSessions.map((session) => (
                  <div key={session.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {session.type.replace('_', ' ').toUpperCase()} - {session.resourceId}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {session.participants.length} participants
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          Last activity: {new Date(session.lastActivity).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Active Cursors:</div>
                      <div className="flex flex-wrap gap-2">
                        {Object.values(session.cursors).map((cursor) => (
                          <div key={cursor.userId} className="flex items-center space-x-2 px-2 py-1 bg-blue-100 rounded">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-blue-800">{cursor.userName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">WebSocket Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Connection Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Auto Reconnect</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Live Notifications</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Presence Sharing</span>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Update Frequency</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="realtime">Real-time (fastest)</option>
                        <option value="fast">Fast (1s)</option>
                        <option value="normal">Normal (5s)</option>
                        <option value="slow">Slow (10s)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Buffer Size</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="50">50 updates</option>
                        <option value="100">100 updates</option>
                        <option value="200">200 updates</option>
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
            WebSocket Status: {connectionStatus} • {onlineUsers.length} users online
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
                console.log('Exporting WebSocket data...');
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

export default WebSocketIntegration;
