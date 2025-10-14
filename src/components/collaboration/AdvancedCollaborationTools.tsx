import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoCall {
  id: string;
  title: string;
  participants: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status: 'connected' | 'connecting' | 'disconnected' | 'muted' | 'speaking';
    role: 'host' | 'participant' | 'presenter';
  }[];
  status: 'scheduled' | 'active' | 'ended' | 'recording';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  recordingUrl?: string;
  chatMessages: {
    id: string;
    sender: string;
    message: string;
    timestamp: Date;
    type: 'text' | 'system' | 'file';
  }[];
}

interface ScreenShare {
  id: string;
  sharer: string;
  title: string;
  type: 'screen' | 'window' | 'tab' | 'application';
  status: 'active' | 'paused' | 'stopped';
  participants: string[];
  startTime: Date;
  annotations: {
    id: string;
    type: 'drawing' | 'highlight' | 'text' | 'arrow';
    data: any;
    author: string;
    timestamp: Date;
  }[];
}

interface RealTimeDocument {
  id: string;
  title: string;
  content: string;
  collaborators: {
    id: string;
    name: string;
    cursor: { x: number; y: number };
    selection?: { start: number; end: number };
    color: string;
  }[];
  version: number;
  lastModified: Date;
  changes: {
    id: string;
    author: string;
    type: 'insert' | 'delete' | 'format';
    position: number;
    content?: string;
    timestamp: Date;
  }[];
}

interface CollaborationSession {
  id: string;
  name: string;
  type: 'meeting' | 'workshop' | 'brainstorm' | 'review';
  participants: string[];
  status: 'active' | 'scheduled' | 'completed';
  startTime: Date;
  endTime?: Date;
  agenda: {
    id: string;
    title: string;
    duration: number;
    completed: boolean;
    presenter?: string;
  }[];
  recordings: string[];
  notes: string;
}

const AdvancedCollaborationTools: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [videoCalls, setVideoCalls] = useState<VideoCall[]>([]);
  const [screenShares, setScreenShares] = useState<ScreenShare[]>([]);
  const [realTimeDocuments, setRealTimeDocuments] = useState<RealTimeDocument[]>([]);
  const [collaborationSessions, setCollaborationSessions] = useState<CollaborationSession[]>([]);
  const [isStartingCall, setIsStartingCall] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [isCreatingDocument, setIsCreatingDocument] = useState(false);
  const [activeCall, setActiveCall] = useState<VideoCall | null>(null);
  const [activeDocument, setActiveDocument] = useState<RealTimeDocument | null>(null);

  // Generate collaboration data
  useEffect(() => {
    const generateVideoCalls = (): VideoCall[] => {
      return [
        {
          id: 'call-1',
          title: 'Weekly Team Standup',
          participants: [
            {
              id: 'user-1',
              name: 'John Doe',
              email: 'john@company.com',
              status: 'connected',
              role: 'host'
            },
            {
              id: 'user-2',
              name: 'Jane Smith',
              email: 'jane@company.com',
              status: 'connected',
              role: 'participant'
            },
            {
              id: 'user-3',
              name: 'Mike Johnson',
              email: 'mike@company.com',
              status: 'speaking',
              role: 'participant'
            }
          ],
          status: 'active',
          startTime: new Date(Date.now() - 30 * 60 * 1000),
          chatMessages: [
            {
              id: 'msg-1',
              sender: 'John Doe',
              message: 'Welcome everyone to our weekly standup!',
              timestamp: new Date(Date.now() - 30 * 60 * 1000),
              type: 'text'
            },
            {
              id: 'msg-2',
              sender: 'Jane Smith',
              message: 'Thanks John! Ready to discuss our progress.',
              timestamp: new Date(Date.now() - 29 * 60 * 1000),
              type: 'text'
            }
          ]
        },
        {
          id: 'call-2',
          title: 'Project Review Meeting',
          participants: [
            {
              id: 'user-4',
              name: 'Sarah Wilson',
              email: 'sarah@company.com',
              status: 'connected',
              role: 'host'
            },
            {
              id: 'user-5',
              name: 'David Brown',
              email: 'david@company.com',
              status: 'muted',
              role: 'participant'
            }
          ],
          status: 'scheduled',
          startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
          chatMessages: []
        }
      ];
    };

    const generateScreenShares = (): ScreenShare[] => {
      return [
        {
          id: 'share-1',
          sharer: 'John Doe',
          title: 'Dashboard Demo',
          type: 'screen',
          status: 'active',
          participants: ['Jane Smith', 'Mike Johnson'],
          startTime: new Date(Date.now() - 15 * 60 * 1000),
          annotations: [
            {
              id: 'ann-1',
              type: 'highlight',
              data: { x: 100, y: 200, width: 200, height: 50 },
              author: 'Jane Smith',
              timestamp: new Date(Date.now() - 10 * 60 * 1000)
            }
          ]
        },
        {
          id: 'share-2',
          sharer: 'Sarah Wilson',
          title: 'Code Review',
          type: 'window',
          status: 'paused',
          participants: ['David Brown'],
          startTime: new Date(Date.now() - 45 * 60 * 1000),
          annotations: []
        }
      ];
    };

    const generateRealTimeDocuments = (): RealTimeDocument[] => {
      return [
        {
          id: 'doc-1',
          title: 'Project Requirements',
          content: 'This document outlines the requirements for our new project...',
          collaborators: [
            {
              id: 'user-1',
              name: 'John Doe',
              cursor: { x: 150, y: 200 },
              color: '#3B82F6'
            },
            {
              id: 'user-2',
              name: 'Jane Smith',
              cursor: { x: 300, y: 150 },
              selection: { start: 10, end: 25 },
              color: '#10B981'
            }
          ],
          version: 12,
          lastModified: new Date(Date.now() - 5 * 60 * 1000),
          changes: [
            {
              id: 'change-1',
              author: 'John Doe',
              type: 'insert',
              position: 50,
              content: 'Updated requirements section',
              timestamp: new Date(Date.now() - 5 * 60 * 1000)
            }
          ]
        },
        {
          id: 'doc-2',
          title: 'Meeting Notes',
          content: 'Key discussion points from today\'s meeting...',
          collaborators: [
            {
              id: 'user-3',
              name: 'Mike Johnson',
              cursor: { x: 200, y: 300 },
              color: '#F59E0B'
            }
          ],
          version: 5,
          lastModified: new Date(Date.now() - 2 * 60 * 1000),
          changes: []
        }
      ];
    };

    const generateCollaborationSessions = (): CollaborationSession[] => {
      return [
        {
          id: 'session-1',
          name: 'Product Brainstorming',
          type: 'brainstorm',
          participants: ['John Doe', 'Jane Smith', 'Mike Johnson'],
          status: 'active',
          startTime: new Date(Date.now() - 60 * 60 * 1000),
          agenda: [
            {
              id: 'agenda-1',
              title: 'Welcome & Introductions',
              duration: 5,
              completed: true,
              presenter: 'John Doe'
            },
            {
              id: 'agenda-2',
              title: 'Product Vision Discussion',
              duration: 30,
              completed: true,
              presenter: 'Jane Smith'
            },
            {
              id: 'agenda-3',
              title: 'Feature Ideas',
              duration: 45,
              completed: false,
              presenter: 'Mike Johnson'
            }
          ],
          recordings: [],
          notes: 'Great discussion about product direction. Need to follow up on feature prioritization.'
        },
        {
          id: 'session-2',
          name: 'Code Review Session',
          type: 'review',
          participants: ['Sarah Wilson', 'David Brown'],
          status: 'scheduled',
          startTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
          agenda: [
            {
              id: 'agenda-4',
              title: 'Review Pull Request #123',
              duration: 30,
              completed: false,
              presenter: 'Sarah Wilson'
            }
          ],
          recordings: [],
          notes: ''
        }
      ];
    };

    setVideoCalls(generateVideoCalls());
    setScreenShares(generateScreenShares());
    setRealTimeDocuments(generateRealTimeDocuments());
    setCollaborationSessions(generateCollaborationSessions());
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'connecting': return 'bg-yellow-100 text-yellow-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'muted': return 'bg-orange-100 text-orange-800';
      case 'speaking': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      case 'recording': return 'bg-red-100 text-red-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'stopped': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string): string => {
    switch (role) {
      case 'host': return 'bg-purple-100 text-purple-800';
      case 'participant': return 'bg-blue-100 text-blue-800';
      case 'presenter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'brainstorm': return 'bg-purple-100 text-purple-800';
      case 'review': return 'bg-orange-100 text-orange-800';
      case 'screen': return 'bg-blue-100 text-blue-800';
      case 'window': return 'bg-green-100 text-green-800';
      case 'tab': return 'bg-purple-100 text-purple-800';
      case 'application': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startVideoCall = async () => {
    setIsStartingCall(true);
    
    // Simulate starting a video call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newCall: VideoCall = {
      id: `call-${Date.now()}`,
      title: 'New Video Call',
      participants: [
        {
          id: 'current-user',
          name: 'You',
          email: 'you@company.com',
          status: 'connected',
          role: 'host'
        }
      ],
      status: 'active',
      startTime: new Date(),
      chatMessages: []
    };
    
    setVideoCalls(prev => [newCall, ...prev]);
    setActiveCall(newCall);
    setIsStartingCall(false);
  };

  const startScreenShare = async () => {
    setIsSharingScreen(true);
    
    // Simulate starting screen share
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newShare: ScreenShare = {
      id: `share-${Date.now()}`,
      sharer: 'You',
      title: 'Screen Share',
      type: 'screen',
      status: 'active',
      participants: [],
      startTime: new Date(),
      annotations: []
    };
    
    setScreenShares(prev => [newShare, ...prev]);
    setIsSharingScreen(false);
  };

  const createRealTimeDocument = async () => {
    setIsCreatingDocument(true);
    
    // Simulate creating document
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDocument: RealTimeDocument = {
      id: `doc-${Date.now()}`,
      title: 'New Collaborative Document',
      content: 'Start typing here...',
      collaborators: [
        {
          id: 'current-user',
          name: 'You',
          cursor: { x: 0, y: 0 },
          color: '#3B82F6'
        }
      ],
      version: 1,
      lastModified: new Date(),
      changes: []
    };
    
    setRealTimeDocuments(prev => [newDocument, ...prev]);
    setActiveDocument(newDocument);
    setIsCreatingDocument(false);
  };

  const joinCall = (callId: string) => {
    const call = videoCalls.find(c => c.id === callId);
    if (call) {
      setActiveCall(call);
    }
  };

  const openDocument = (docId: string) => {
    const doc = realTimeDocuments.find(d => d.id === docId);
    if (doc) {
      setActiveDocument(doc);
    }
  };

  const totalCalls = videoCalls.length;
  const activeCalls = videoCalls.filter(c => c.status === 'active').length;
  const totalParticipants = videoCalls.reduce((sum, call) => sum + call.participants.length, 0);
  const activeShares = screenShares.filter(s => s.status === 'active').length;
  const activeDocuments = realTimeDocuments.length;
  const activeSessions = collaborationSessions.filter(s => s.status === 'active').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🤝 Advanced Collaboration Tools</h2>
              <p className="text-green-100 mt-1">Video calls, screen sharing, and real-time collaboration</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Collaboration Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Video Calls</p>
                  <p className="text-2xl font-bold text-blue-800">{totalCalls}</p>
                  <p className="text-xs text-blue-600">{activeCalls} active</p>
                </div>
                <div className="text-3xl">📹</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Participants</p>
                  <p className="text-2xl font-bold text-green-800">{totalParticipants}</p>
                  <p className="text-xs text-green-600">Total joined</p>
                </div>
                <div className="text-3xl">👥</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Screen Shares</p>
                  <p className="text-2xl font-bold text-purple-800">{activeShares}</p>
                  <p className="text-xs text-purple-600">Currently active</p>
                </div>
                <div className="text-3xl">🖥️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Documents</p>
                  <p className="text-2xl font-bold text-orange-800">{activeDocuments}</p>
                  <p className="text-xs text-orange-600">Real-time editing</p>
                </div>
                <div className="text-3xl">📝</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-teal-600 font-medium">Sessions</p>
                  <p className="text-2xl font-bold text-teal-800">{activeSessions}</p>
                  <p className="text-xs text-teal-600">Active sessions</p>
                </div>
                <div className="text-3xl">🎯</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Quick collaboration actions
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={startVideoCall}
                  disabled={isStartingCall}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isStartingCall ? '⏳ Starting...' : '📹 Start Call'}
                </button>
                <button
                  onClick={startScreenShare}
                  disabled={isSharingScreen}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isSharingScreen ? '⏳ Sharing...' : '🖥️ Share Screen'}
                </button>
                <button
                  onClick={createRealTimeDocument}
                  disabled={isCreatingDocument}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingDocument ? '⏳ Creating...' : '📝 New Document'}
                </button>
              </div>
            </div>
          </div>

          {/* Video Calls */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Video Calls ({videoCalls.length})</h3>
            <div className="space-y-4">
              {videoCalls.map((call) => (
                <div key={call.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{call.title}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(call.status)}`}>
                        {call.status}
                      </span>
                      {call.status === 'active' && (
                        <button
                          onClick={() => joinCall(call.id)}
                          className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Join
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-medium text-gray-900">{call.participants.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Started:</span>
                      <span className="text-gray-500">{formatDate(call.startTime)}</span>
                    </div>
                    {call.duration && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium text-gray-900">{formatDuration(call.duration)}</span>
                      </div>
                    )}
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Participants:</div>
                      <div className="flex flex-wrap gap-2">
                        {call.participants.map((participant) => (
                          <div key={participant.id} className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(participant.status)}`}>
                              {participant.status}
                            </span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(participant.role)}`}>
                              {participant.role}
                            </span>
                            <span className="text-sm text-gray-600">{participant.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Screen Shares */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Screen Shares ({screenShares.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {screenShares.map((share) => (
                <div key={share.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{share.title}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(share.type)}`}>
                        {share.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(share.status)}`}>
                        {share.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sharer:</span>
                      <span className="font-medium text-gray-900">{share.sharer}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Viewers:</span>
                      <span className="font-medium text-gray-900">{share.participants.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Started:</span>
                      <span className="text-gray-500">{formatDate(share.startTime)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Annotations:</span>
                      <span className="font-medium text-gray-900">{share.annotations.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Documents */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Real-time Documents ({realTimeDocuments.length})</h3>
            <div className="space-y-4">
              {realTimeDocuments.map((doc) => (
                <div key={doc.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{doc.title}</h4>
                    <button
                      onClick={() => openDocument(doc.id)}
                      className="px-3 py-1 bg-purple-500 text-white text-xs rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Open
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Version:</span>
                      <span className="font-medium text-gray-900">v{doc.version}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Collaborators:</span>
                      <span className="font-medium text-gray-900">{doc.collaborators.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Modified:</span>
                      <span className="text-gray-500">{formatDate(doc.lastModified)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Changes:</span>
                      <span className="font-medium text-gray-900">{doc.changes.length}</span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Active Collaborators:</div>
                      <div className="flex flex-wrap gap-2">
                        {doc.collaborators.map((collaborator) => (
                          <div key={collaborator.id} className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: collaborator.color }}
                            ></div>
                            <span className="text-sm text-gray-600">{collaborator.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collaboration Sessions */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Collaboration Sessions ({collaborationSessions.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {collaborationSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{session.name}</div>
                          <div className="text-sm text-gray-500">{session.notes || 'No notes'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(session.type)}`}>
                          {session.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {session.participants.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(session.startTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ 
                                width: `${(session.agenda.filter(a => a.completed).length / session.agenda.length) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <span>
                            {session.agenda.filter(a => a.completed).length}/{session.agenda.length}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedCollaborationTools;
