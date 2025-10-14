/**
 * AR/VR Integration System Component
 * 
 * Immersive productivity experiences
 * Includes virtual workspaces, 3D task visualization, and spatial computing
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VirtualWorkspace {
  id: string;
  name: string;
  description: string;
  type: 'office' | 'nature' | 'space' | 'abstract' | 'custom';
  environment: string;
  features: string[];
  isActive: boolean;
  createdAt: string;
}

interface SpatialTask {
  id: string;
  title: string;
  description: string;
  position: { x: number; y: number; z: number };
  size: { width: number; height: number; depth: number };
  color: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
  tags: string[];
}

interface AROverlay {
  id: string;
  name: string;
  type: 'task' | 'calendar' | 'note' | 'timer' | 'focus';
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: string;
  isVisible: boolean;
  opacity: number;
}

interface VRController {
  id: string;
  name: string;
  type: 'hand' | 'wand' | 'glove' | 'eye-tracking';
  capabilities: string[];
  isConnected: boolean;
  batteryLevel: number;
  lastUsed: string;
}

interface ARVRIntegrationProps {
  onClose: () => void;
}

const ARVRIntegration: React.FC<ARVRIntegrationProps> = ({ onClose }) => {
  const [virtualWorkspaces, setVirtualWorkspaces] = useState<VirtualWorkspace[]>([]);
  const [spatialTasks, setSpatialTasks] = useState<SpatialTask[]>([]);
  const [arOverlays, setAROverlays] = useState<AROverlay[]>([]);
  const [vrControllers, setVRControllers] = useState<VRController[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'workspaces' | 'spatial' | 'ar' | 'controllers'>('workspaces');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    loadARVRData();
  }, []);

  const loadARVRData = async () => {
    setIsLoading(true);
    
    try {
      // Mock virtual workspaces
      const mockVirtualWorkspaces: VirtualWorkspace[] = [
        {
          id: 'workspace-1',
          name: 'Zen Garden Office',
          description: 'Peaceful garden environment for focused work',
          type: 'nature',
          environment: 'https://via.placeholder.com/800x600/90EE90/FFFFFF?text=Zen+Garden',
          features: [
            'Ambient nature sounds',
            'Dynamic lighting',
            'Floating task panels',
            'Meditation zones',
            'Natural weather effects'
          ],
          isActive: true,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'workspace-2',
          name: 'Cosmic Command Center',
          description: 'Futuristic space station for high-tech productivity',
          type: 'space',
          environment: 'https://via.placeholder.com/800x600/4169E1/FFFFFF?text=Cosmic+Command',
          features: [
            'Holographic displays',
            'Zero-gravity task floating',
            'AI assistant hologram',
            'Space weather effects',
            'Galaxy background'
          ],
          isActive: false,
          createdAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'workspace-3',
          name: 'Abstract Mind Palace',
          description: 'Surreal abstract environment for creative thinking',
          type: 'abstract',
          environment: 'https://via.placeholder.com/800x600/FF69B4/FFFFFF?text=Abstract+Mind',
          features: [
            'Morphing shapes',
            'Color-shifting walls',
            'Floating geometric tasks',
            'Psychedelic effects',
            'Infinite space illusion'
          ],
          isActive: false,
          createdAt: new Date(Date.now() - 259200000).toISOString()
        },
        {
          id: 'workspace-4',
          name: 'Traditional Office',
          description: 'Classic office environment with modern VR enhancements',
          type: 'office',
          environment: 'https://via.placeholder.com/800x600/8B4513/FFFFFF?text=Traditional+Office',
          features: [
            'Realistic office sounds',
            'Interactive whiteboards',
            'Virtual colleagues',
            'Meeting rooms',
            'Coffee break areas'
          ],
          isActive: false,
          createdAt: new Date(Date.now() - 345600000).toISOString()
        }
      ];

      // Mock spatial tasks
      const mockSpatialTasks: SpatialTask[] = [
        {
          id: 'task-1',
          title: 'Project Alpha',
          description: 'Complete the alpha version of the new feature',
          position: { x: 0, y: 0, z: 0 },
          size: { width: 2, height: 1, depth: 0.5 },
          color: '#FF6B6B',
          priority: 'high',
          status: 'in-progress',
          dueDate: new Date(Date.now() + 86400000).toISOString(),
          tags: ['development', 'feature', 'alpha']
        },
        {
          id: 'task-2',
          title: 'Team Meeting',
          description: 'Weekly team sync and planning session',
          position: { x: 3, y: 1, z: 0 },
          size: { width: 1.5, height: 1, depth: 0.3 },
          color: '#4ECDC4',
          priority: 'medium',
          status: 'pending',
          dueDate: new Date(Date.now() + 172800000).toISOString(),
          tags: ['meeting', 'team', 'planning']
        },
        {
          id: 'task-3',
          title: 'Code Review',
          description: 'Review pull requests and provide feedback',
          position: { x: -2, y: 0.5, z: 1 },
          size: { width: 1, height: 0.8, depth: 0.4 },
          color: '#45B7D1',
          priority: 'medium',
          status: 'pending',
          tags: ['code', 'review', 'feedback']
        },
        {
          id: 'task-4',
          title: 'Documentation',
          description: 'Update API documentation and user guides',
          position: { x: 1, y: -1, z: 0 },
          size: { width: 2.5, height: 1.2, depth: 0.6 },
          color: '#96CEB4',
          priority: 'low',
          status: 'completed',
          tags: ['documentation', 'api', 'guides']
        }
      ];

      // Mock AR overlays
      const mockAROverlays: AROverlay[] = [
        {
          id: 'overlay-1',
          name: 'Task List',
          type: 'task',
          position: { x: 100, y: 200 },
          size: { width: 300, height: 400 },
          content: 'Current tasks and priorities',
          isVisible: true,
          opacity: 0.9
        },
        {
          id: 'overlay-2',
          name: 'Calendar',
          type: 'calendar',
          position: { x: 500, y: 100 },
          size: { width: 250, height: 300 },
          content: 'Upcoming meetings and deadlines',
          isVisible: true,
          opacity: 0.8
        },
        {
          id: 'overlay-3',
          name: 'Focus Timer',
          type: 'timer',
          position: { x: 200, y: 500 },
          size: { width: 200, height: 150 },
          content: '25:00 - Focus Session',
          isVisible: false,
          opacity: 0.7
        },
        {
          id: 'overlay-4',
          name: 'Quick Notes',
          type: 'note',
          position: { x: 600, y: 400 },
          size: { width: 200, height: 250 },
          content: 'Voice-to-text notes',
          isVisible: true,
          opacity: 0.6
        }
      ];

      // Mock VR controllers
      const mockVRControllers: VRController[] = [
        {
          id: 'controller-1',
          name: 'Hand Tracking',
          type: 'hand',
          capabilities: [
            'Gesture recognition',
            'Natural hand movements',
            'Pinch and grab',
            'Pointing and selection'
          ],
          isConnected: true,
          batteryLevel: 100,
          lastUsed: new Date(Date.now() - 300000).toISOString()
        },
        {
          id: 'controller-2',
          name: 'VR Wand',
          type: 'wand',
          capabilities: [
            'Precise pointing',
            'Button controls',
            'Haptic feedback',
            '3D manipulation'
          ],
          isConnected: true,
          batteryLevel: 85,
          lastUsed: new Date(Date.now() - 600000).toISOString()
        },
        {
          id: 'controller-3',
          name: 'Eye Tracking',
          type: 'eye-tracking',
          capabilities: [
            'Gaze-based selection',
            'Attention tracking',
            'Automatic scrolling',
            'Focus detection'
          ],
          isConnected: false,
          batteryLevel: 0,
          lastUsed: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'controller-4',
          name: 'VR Gloves',
          type: 'glove',
          capabilities: [
            'Finger tracking',
            'Tactile feedback',
            'Force sensing',
            'Gesture recognition'
          ],
          isConnected: false,
          batteryLevel: 0,
          lastUsed: new Date(Date.now() - 7200000).toISOString()
        }
      ];

      setVirtualWorkspaces(mockVirtualWorkspaces);
      setSpatialTasks(mockSpatialTasks);
      setAROverlays(mockAROverlays);
      setVRControllers(mockVRControllers);
    } catch (error) {
      console.error('Failed to load AR/VR data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const activateWorkspace = async (workspaceId: string) => {
    setIsConnecting(true);
    
    try {
      // Simulate workspace activation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setVirtualWorkspaces(prev => prev.map(workspace => ({
        ...workspace,
        isActive: workspace.id === workspaceId
      })));
      
      console.log(`Activated workspace: ${workspaceId}`);
    } catch (error) {
      console.error('Failed to activate workspace:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const connectController = async (controllerId: string) => {
    try {
      setVRControllers(prev => prev.map(controller => 
        controller.id === controllerId 
          ? { 
              ...controller, 
              isConnected: true,
              batteryLevel: Math.floor(Math.random() * 100) + 20,
              lastUsed: new Date().toISOString()
            }
          : controller
      ));
      
      console.log(`Connected controller: ${controllerId}`);
    } catch (error) {
      console.error('Failed to connect controller:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'office': return '🏢';
      case 'nature': return '🌿';
      case 'space': return '🚀';
      case 'abstract': return '🎨';
      case 'custom': return '⚙️';
      case 'task': return '📋';
      case 'calendar': return '📅';
      case 'note': return '📝';
      case 'timer': return '⏰';
      case 'focus': return '🎯';
      case 'hand': return '✋';
      case 'wand': return '🪄';
      case 'glove': return '🧤';
      case 'eye-tracking': return '👁️';
      default: return '🔮';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-600 bg-gray-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
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
            <span className="text-lg font-medium text-gray-700">Loading AR/VR integration...</span>
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
              <h2 className="text-2xl font-bold">AR/VR Integration</h2>
              <p className="text-purple-100 mt-1">Immersive productivity experiences</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Workspaces:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {virtualWorkspaces.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Spatial Tasks:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {spatialTasks.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Controllers:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {vrControllers.filter(c => c.isConnected).length}
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
              { id: 'workspaces', name: 'Virtual Workspaces', icon: '🏢' },
              { id: 'spatial', name: 'Spatial Tasks', icon: '📦' },
              { id: 'ar', name: 'AR Overlays', icon: '👁️' },
              { id: 'controllers', name: 'Controllers', icon: '🎮' }
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'workspaces' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Virtual Workspaces</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {virtualWorkspaces.map((workspace) => (
                  <motion.div
                    key={workspace.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      workspace.isActive 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{getTypeIcon(workspace.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{workspace.name}</h4>
                        <p className="text-sm text-gray-600">{workspace.description}</p>
                      </div>
                      {workspace.isActive && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500">Environment Preview</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {workspace.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {!workspace.isActive && (
                        <button
                          onClick={() => activateWorkspace(workspace.id)}
                          disabled={isConnecting}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all disabled:opacity-50"
                        >
                          {isConnecting ? 'Connecting...' : 'Activate'}
                        </button>
                      )}
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Preview
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'spatial' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Spatial Tasks</h3>
              
              <div className="space-y-4">
                {spatialTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: task.color }}
                      ></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Position:</span>
                        <span className="ml-2 text-gray-900">
                          ({task.position.x}, {task.position.y}, {task.position.z})
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Size:</span>
                        <span className="ml-2 text-gray-900">
                          {task.size.width} × {task.size.height} × {task.size.depth}
                        </span>
                      </div>
                      {task.dueDate && (
                        <div>
                          <span className="text-gray-600">Due:</span>
                          <span className="ml-2 text-gray-900">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-1">
                      {task.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'ar' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">AR Overlays</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {arOverlays.map((overlay) => (
                  <motion.div
                    key={overlay.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      overlay.isVisible 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getTypeIcon(overlay.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{overlay.name}</h4>
                        <p className="text-sm text-gray-600">{overlay.content}</p>
                      </div>
                      {overlay.isVisible && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          VISIBLE
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Position:</span>
                        <span className="text-gray-900">
                          ({overlay.position.x}, {overlay.position.y})
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Size:</span>
                        <span className="text-gray-900">
                          {overlay.size.width} × {overlay.size.height}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Opacity:</span>
                        <span className="text-gray-900">{overlay.opacity}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        {overlay.isVisible ? 'Hide' : 'Show'}
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Configure
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'controllers' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">VR Controllers</h3>
              
              <div className="space-y-4">
                {vrControllers.map((controller) => (
                  <motion.div
                    key={controller.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      controller.isConnected 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{getTypeIcon(controller.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{controller.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{controller.type}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          controller.isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {controller.isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                        </span>
                        {controller.isConnected && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {controller.batteryLevel}%
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div className="text-sm font-medium text-gray-700">Capabilities:</div>
                      <div className="flex flex-wrap gap-1">
                        {controller.capabilities.map((capability, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {!controller.isConnected && (
                        <button
                          onClick={() => connectController(controller.id)}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all"
                        >
                          Connect
                        </button>
                      )}
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Settings
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            AR/VR Integration • {virtualWorkspaces.filter(w => w.isActive).length} active workspace • {spatialTasks.length} spatial tasks • {vrControllers.filter(c => c.isConnected).length} connected controllers
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
                console.log('Exporting AR/VR data...');
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

export default ARVRIntegration;
