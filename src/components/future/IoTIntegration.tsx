/**
 * IoT Integration System Component
 * 
 * Smart device connectivity and automation
 * Includes smart home integration, wearable devices, and environmental sensors
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SmartDevice {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'camera' | 'speaker' | 'sensor' | 'wearable';
  brand: string;
  model: string;
  status: 'online' | 'offline' | 'error' | 'maintenance';
  batteryLevel?: number;
  lastSeen: string;
  capabilities: string[];
  location: string;
  isConnected: boolean;
}

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  condition: string;
  action: string;
  status: 'active' | 'inactive' | 'error';
  lastExecuted: string;
  executionCount: number;
  priority: 'low' | 'medium' | 'high';
}

interface EnvironmentalData {
  id: string;
  sensor: string;
  type: 'temperature' | 'humidity' | 'light' | 'noise' | 'air-quality';
  value: number;
  unit: string;
  timestamp: string;
  location: string;
  threshold: {
    min: number;
    max: number;
    optimal: number;
  };
}

interface WearableData {
  id: string;
  device: string;
  type: 'heart-rate' | 'steps' | 'sleep' | 'stress' | 'activity';
  value: number;
  unit: string;
  timestamp: string;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
}

interface IoTIntegrationProps {
  onClose: () => void;
}

const IoTIntegration: React.FC<IoTIntegrationProps> = ({ onClose }) => {
  const [smartDevices, setSmartDevices] = useState<SmartDevice[]>([]);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData[]>([]);
  const [wearableData, setWearableData] = useState<WearableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'devices' | 'automation' | 'environment' | 'wearables'>('devices');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    loadIoTData();
  }, []);

  const loadIoTData = async () => {
    setIsLoading(true);
    
    try {
      // Mock smart devices
      const mockSmartDevices: SmartDevice[] = [
        {
          id: 'device-1',
          name: 'Living Room Light',
          type: 'light',
          brand: 'Philips Hue',
          model: 'Hue White A19',
          status: 'online',
          lastSeen: new Date(Date.now() - 300000).toISOString(),
          capabilities: ['brightness', 'color', 'scheduling', 'voice-control'],
          location: 'Living Room',
          isConnected: true
        },
        {
          id: 'device-2',
          name: 'Office Thermostat',
          type: 'thermostat',
          brand: 'Nest',
          model: 'Learning Thermostat',
          status: 'online',
          lastSeen: new Date(Date.now() - 600000).toISOString(),
          capabilities: ['temperature-control', 'scheduling', 'energy-saving', 'remote-access'],
          location: 'Office',
          isConnected: true
        },
        {
          id: 'device-3',
          name: 'Security Camera',
          type: 'camera',
          brand: 'Ring',
          model: 'Indoor Cam',
          status: 'online',
          lastSeen: new Date(Date.now() - 120000).toISOString(),
          capabilities: ['motion-detection', 'night-vision', 'two-way-audio', 'cloud-storage'],
          location: 'Office',
          isConnected: true
        },
        {
          id: 'device-4',
          name: 'Smart Speaker',
          type: 'speaker',
          brand: 'Amazon',
          model: 'Echo Dot',
          status: 'online',
          lastSeen: new Date(Date.now() - 180000).toISOString(),
          capabilities: ['voice-assistant', 'music', 'smart-home-control', 'alarms'],
          location: 'Office',
          isConnected: true
        },
        {
          id: 'device-5',
          name: 'Air Quality Sensor',
          type: 'sensor',
          brand: 'Awair',
          model: 'Element',
          status: 'online',
          lastSeen: new Date(Date.now() - 240000).toISOString(),
          capabilities: ['air-quality', 'temperature', 'humidity', 'alerts'],
          location: 'Office',
          isConnected: true
        },
        {
          id: 'device-6',
          name: 'Apple Watch',
          type: 'wearable',
          brand: 'Apple',
          model: 'Series 9',
          status: 'online',
          batteryLevel: 85,
          lastSeen: new Date(Date.now() - 60000).toISOString(),
          capabilities: ['heart-rate', 'steps', 'sleep-tracking', 'notifications'],
          location: 'Wrist',
          isConnected: true
        }
      ];

      // Mock automation rules
      const mockAutomationRules: AutomationRule[] = [
        {
          id: 'rule-1',
          name: 'Focus Mode Lighting',
          description: 'Dim lights and set warm color when focus mode is activated',
          trigger: 'Focus mode activated',
          condition: 'Time between 9 AM and 5 PM',
          action: 'Set lights to 30% brightness with warm white color',
          status: 'active',
          lastExecuted: new Date(Date.now() - 1800000).toISOString(),
          executionCount: 45,
          priority: 'high'
        },
        {
          id: 'rule-2',
          name: 'Temperature Optimization',
          description: 'Adjust thermostat based on productivity levels',
          trigger: 'High productivity detected',
          condition: 'Temperature above 72°F',
          action: 'Lower temperature to 68°F for optimal focus',
          status: 'active',
          lastExecuted: new Date(Date.now() - 3600000).toISOString(),
          executionCount: 23,
          priority: 'medium'
        },
        {
          id: 'rule-3',
          name: 'Break Reminders',
          description: 'Play gentle music and adjust lighting for break time',
          trigger: 'Break time detected',
          condition: 'Work session longer than 25 minutes',
          action: 'Play relaxing music and increase light brightness',
          status: 'active',
          lastExecuted: new Date(Date.now() - 900000).toISOString(),
          executionCount: 67,
          priority: 'high'
        },
        {
          id: 'rule-4',
          name: 'Air Quality Alert',
          description: 'Notify when air quality drops below optimal levels',
          trigger: 'Air quality sensor reading',
          condition: 'PM2.5 above 25 μg/m³',
          action: 'Send notification and suggest air purifier activation',
          status: 'inactive',
          lastExecuted: new Date(Date.now() - 86400000).toISOString(),
          executionCount: 3,
          priority: 'low'
        }
      ];

      // Mock environmental data
      const mockEnvironmentalData: EnvironmentalData[] = [
        {
          id: 'env-1',
          sensor: 'Air Quality Sensor',
          type: 'air-quality',
          value: 15,
          unit: 'μg/m³',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          location: 'Office',
          threshold: { min: 0, max: 50, optimal: 12 }
        },
        {
          id: 'env-2',
          sensor: 'Temperature Sensor',
          type: 'temperature',
          value: 72,
          unit: '°F',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          location: 'Office',
          threshold: { min: 65, max: 75, optimal: 70 }
        },
        {
          id: 'env-3',
          sensor: 'Humidity Sensor',
          type: 'humidity',
          value: 45,
          unit: '%',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          location: 'Office',
          threshold: { min: 30, max: 60, optimal: 45 }
        },
        {
          id: 'env-4',
          sensor: 'Light Sensor',
          type: 'light',
          value: 350,
          unit: 'lux',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          location: 'Office',
          threshold: { min: 200, max: 500, optimal: 400 }
        },
        {
          id: 'env-5',
          sensor: 'Noise Sensor',
          type: 'noise',
          value: 45,
          unit: 'dB',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          location: 'Office',
          threshold: { min: 30, max: 60, optimal: 40 }
        }
      ];

      // Mock wearable data
      const mockWearableData: WearableData[] = [
        {
          id: 'wearable-1',
          device: 'Apple Watch',
          type: 'heart-rate',
          value: 72,
          unit: 'bpm',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          quality: 'good'
        },
        {
          id: 'wearable-2',
          device: 'Apple Watch',
          type: 'steps',
          value: 8542,
          unit: 'steps',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          quality: 'excellent'
        },
        {
          id: 'wearable-3',
          device: 'Apple Watch',
          type: 'sleep',
          value: 7.5,
          unit: 'hours',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          quality: 'good'
        },
        {
          id: 'wearable-4',
          device: 'Apple Watch',
          type: 'stress',
          value: 35,
          unit: '%',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          quality: 'good'
        },
        {
          id: 'wearable-5',
          device: 'Apple Watch',
          type: 'activity',
          value: 85,
          unit: '%',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          quality: 'excellent'
        }
      ];

      setSmartDevices(mockSmartDevices);
      setAutomationRules(mockAutomationRules);
      setEnvironmentalData(mockEnvironmentalData);
      setWearableData(mockWearableData);
    } catch (error) {
      console.error('Failed to load IoT data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const connectDevice = async (deviceId: string) => {
    setIsConnecting(true);
    
    try {
      // Simulate device connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSmartDevices(prev => prev.map(device => 
        device.id === deviceId 
          ? { 
              ...device, 
              isConnected: true,
              status: 'online',
              lastSeen: new Date().toISOString()
            }
          : device
      ));
      
      console.log(`Connected device: ${deviceId}`);
    } catch (error) {
      console.error('Failed to connect device:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const toggleAutomationRule = async (ruleId: string) => {
    try {
      setAutomationRules(prev => prev.map(rule => 
        rule.id === ruleId 
          ? { 
              ...rule, 
              status: rule.status === 'active' ? 'inactive' : 'active'
            }
          : rule
      ));
      
      console.log(`Toggled automation rule: ${ruleId}`);
    } catch (error) {
      console.error('Failed to toggle automation rule:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'light': return '💡';
      case 'thermostat': return '🌡️';
      case 'camera': return '📹';
      case 'speaker': return '🔊';
      case 'sensor': return '📡';
      case 'wearable': return '⌚';
      default: return '🔌';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getValueColor = (value: number, threshold: { min: number; max: number; optimal: number }) => {
    if (value < threshold.min || value > threshold.max) {
      return 'text-red-600';
    } else if (Math.abs(value - threshold.optimal) <= 5) {
      return 'text-green-600';
    } else {
      return 'text-yellow-600';
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
            <span className="text-lg font-medium text-gray-700">Loading IoT integration...</span>
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
              <h2 className="text-2xl font-bold">IoT Integration</h2>
              <p className="text-green-100 mt-1">Smart device connectivity and automation</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Devices:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {smartDevices.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Online:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {smartDevices.filter(d => d.status === 'online').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Automations:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {automationRules.filter(r => r.status === 'active').length}
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
              { id: 'devices', name: 'Smart Devices', icon: '🔌' },
              { id: 'automation', name: 'Automation', icon: '⚙️' },
              { id: 'environment', name: 'Environment', icon: '🌍' },
              { id: 'wearables', name: 'Wearables', icon: '⌚' }
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
          {selectedTab === 'devices' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Smart Devices</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {smartDevices.map((device) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      device.isConnected 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{getTypeIcon(device.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{device.name}</h4>
                        <p className="text-sm text-gray-600">{device.brand} {device.model}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(device.status)}`}>
                          {device.status.toUpperCase()}
                        </span>
                        {device.batteryLevel && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {device.batteryLevel}%
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Location:</div>
                      <div className="text-sm text-gray-600">{device.location}</div>
                      
                      <div className="text-sm font-medium text-gray-700">Capabilities:</div>
                      <div className="flex flex-wrap gap-1">
                        {device.capabilities.map((capability, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {!device.isConnected && (
                        <button
                          onClick={() => connectDevice(device.id)}
                          disabled={isConnecting}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all disabled:opacity-50"
                        >
                          {isConnecting ? 'Connecting...' : 'Connect'}
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

          {selectedTab === 'automation' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Automation Rules</h3>
              
              <div className="space-y-4">
                {automationRules.map((rule) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{rule.name}</h4>
                        <p className="text-sm text-gray-600">{rule.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(rule.status)}`}>
                          {rule.status.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {rule.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Trigger:</div>
                      <div className="text-sm text-gray-600">{rule.trigger}</div>
                      
                      <div className="text-sm font-medium text-gray-700">Condition:</div>
                      <div className="text-sm text-gray-600">{rule.condition}</div>
                      
                      <div className="text-sm font-medium text-gray-700">Action:</div>
                      <div className="text-sm text-gray-600">{rule.action}</div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Executions:</span>
                        <span className="ml-2 text-gray-900">{rule.executionCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Executed:</span>
                        <span className="ml-2 text-gray-900">
                          {new Date(rule.lastExecuted).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => toggleAutomationRule(rule.id)}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          rule.status === 'active' 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {rule.status === 'active' ? 'Disable' : 'Enable'}
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Edit
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'environment' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Environmental Data</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {environmentalData.map((data) => (
                  <motion.div
                    key={data.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{getTypeIcon('sensor')}</div>
                      <h4 className="font-medium text-gray-900 mb-1">{data.type.charAt(0).toUpperCase() + data.type.slice(1)}</h4>
                      <p className="text-sm text-gray-600 mb-3">{data.sensor}</p>
                      
                      <div className="space-y-2">
                        <div className={`text-2xl font-bold ${getValueColor(data.value, data.threshold)}`}>
                          {data.value} {data.unit}
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          Location: {data.location}
                        </div>
                        
                        <div className="text-sm font-medium text-gray-700">Thresholds:</div>
                        <div className="text-xs text-gray-600">
                          Min: {data.threshold.min} | Max: {data.threshold.max} | Optimal: {data.threshold.optimal}
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          {new Date(data.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'wearables' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Wearable Data</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wearableData.map((data) => (
                  <motion.div
                    key={data.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{getTypeIcon('wearable')}</div>
                      <h4 className="font-medium text-gray-900 mb-1">{data.type.charAt(0).toUpperCase() + data.type.slice(1)}</h4>
                      <p className="text-sm text-gray-600 mb-3">{data.device}</p>
                      
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-gray-900">
                          {data.value} {data.unit}
                        </div>
                        
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getQualityColor(data.quality)}`}>
                          {data.quality.toUpperCase()}
                        </span>
                        
                        <div className="text-xs text-gray-500">
                          {new Date(data.timestamp).toLocaleString()}
                        </div>
                      </div>
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
            IoT Integration • {smartDevices.filter(d => d.status === 'online').length}/{smartDevices.length} devices online • {automationRules.filter(r => r.status === 'active').length} active automations
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
                console.log('Exporting IoT data...');
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

export default IoTIntegration;
