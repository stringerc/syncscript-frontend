/**
 * Touch Gestures System Component
 * 
 * Mobile touch interactions, swipe gestures, and touch-optimized UI
 * Includes pinch-to-zoom, swipe navigation, and haptic feedback
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface TouchGesture {
  id: string;
  type: 'swipe_left' | 'swipe_right' | 'swipe_up' | 'swipe_down' | 'pinch_in' | 'pinch_out' | 'tap' | 'long_press' | 'double_tap';
  action: string;
  enabled: boolean;
  haptic: boolean;
  threshold: number;
}

interface TouchSettings {
  swipeThreshold: number;
  pinchThreshold: number;
  longPressDelay: number;
  doubleTapDelay: number;
  hapticFeedback: boolean;
  gestureSensitivity: 'low' | 'medium' | 'high';
}

interface TouchEvent {
  id: string;
  type: string;
  timestamp: string;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  distance: number;
  duration: number;
}

interface TouchGesturesSystemProps {
  onClose: () => void;
}

const TouchGesturesSystem: React.FC<TouchGesturesSystemProps> = ({ onClose }) => {
  const [touchSettings, setTouchSettings] = useState<TouchSettings>({
    swipeThreshold: 50,
    pinchThreshold: 0.1,
    longPressDelay: 500,
    doubleTapDelay: 300,
    hapticFeedback: true,
    gestureSensitivity: 'medium'
  });
  const [touchGestures, setTouchGestures] = useState<TouchGesture[]>([
    {
      id: 'swipe_left',
      type: 'swipe_left',
      action: 'Navigate Back',
      enabled: true,
      haptic: true,
      threshold: 50
    },
    {
      id: 'swipe_right',
      type: 'swipe_right',
      action: 'Navigate Forward',
      enabled: true,
      haptic: true,
      threshold: 50
    },
    {
      id: 'swipe_up',
      type: 'swipe_up',
      action: 'Show Quick Actions',
      enabled: true,
      haptic: true,
      threshold: 50
    },
    {
      id: 'swipe_down',
      type: 'swipe_down',
      action: 'Refresh Data',
      enabled: true,
      haptic: true,
      threshold: 50
    },
    {
      id: 'pinch_in',
      type: 'pinch_in',
      action: 'Zoom Out',
      enabled: true,
      haptic: false,
      threshold: 0.1
    },
    {
      id: 'pinch_out',
      type: 'pinch_out',
      action: 'Zoom In',
      enabled: true,
      haptic: false,
      threshold: 0.1
    },
    {
      id: 'long_press',
      type: 'long_press',
      action: 'Show Context Menu',
      enabled: true,
      haptic: true,
      threshold: 500
    },
    {
      id: 'double_tap',
      type: 'double_tap',
      action: 'Quick Edit',
      enabled: true,
      haptic: true,
      threshold: 300
    }
  ]);
  const [touchEvents, setTouchEvents] = useState<TouchEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'gestures' | 'events' | 'settings' | 'test'>('gestures');
  const [isTesting, setIsTesting] = useState(false);
  const [testGesture, setTestGesture] = useState<string | null>(null);
  
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTapRef = useRef<number>(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeTouchSystem();
    setupTouchListeners();
  }, []);

  const initializeTouchSystem = async () => {
    setIsLoading(true);
    
    try {
      // Load saved settings
      const savedSettings = localStorage.getItem('touch_settings');
      if (savedSettings) {
        setTouchSettings(JSON.parse(savedSettings));
      }
      
      // Load saved gestures
      const savedGestures = localStorage.getItem('touch_gestures');
      if (savedGestures) {
        setTouchGestures(JSON.parse(savedGestures));
      }
      
      // Load touch events history
      const savedEvents = localStorage.getItem('touch_events');
      if (savedEvents) {
        setTouchEvents(JSON.parse(savedEvents));
      }
      
    } catch (error) {
      console.error('Failed to initialize touch system:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupTouchListeners = () => {
    const container = document.body;
    
    // Touch start
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    
    // Touch move
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Touch end
    container.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Mouse events for desktop testing
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };
      
      // Start long press timer
      longPressTimerRef.current = setTimeout(() => {
        triggerGesture('long_press', touch.clientX, touch.clientY);
      }, touchSettings.longPressDelay);
      
    } else if (e.touches.length === 2) {
      // Handle pinch gestures
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      touchStartRef.current = {
        x: distance,
        y: 0,
        time: Date.now()
      };
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 1 && touchStartRef.current) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      
      // Clear long press timer if moving
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
      
      // Detect swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > touchSettings.swipeThreshold) {
          if (deltaX > 0) {
            triggerGesture('swipe_right', touch.clientX, touch.clientY);
          } else {
            triggerGesture('swipe_left', touch.clientX, touch.clientY);
          }
        }
      } else {
        if (Math.abs(deltaY) > touchSettings.swipeThreshold) {
          if (deltaY > 0) {
            triggerGesture('swipe_down', touch.clientX, touch.clientY);
          } else {
            triggerGesture('swipe_up', touch.clientX, touch.clientY);
          }
        }
      }
    } else if (e.touches.length === 2 && touchStartRef.current) {
      // Handle pinch gestures
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const scale = distance / touchStartRef.current.x;
      
      if (Math.abs(scale - 1) > touchSettings.pinchThreshold) {
        if (scale > 1) {
          triggerGesture('pinch_out', (touch1.clientX + touch2.clientX) / 2, (touch1.clientY + touch2.clientY) / 2);
        } else {
          triggerGesture('pinch_in', (touch1.clientX + touch2.clientX) / 2, (touch1.clientY + touch2.clientY) / 2);
        }
      }
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartRef.current) {
      const duration = Date.now() - touchStartRef.current.time;
      
      // Clear long press timer
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
      
      // Handle tap and double tap
      if (duration < 200) { // Quick tap
        const now = Date.now();
        if (now - lastTapRef.current < touchSettings.doubleTapDelay) {
          triggerGesture('double_tap', touchStartRef.current.x, touchStartRef.current.y);
        } else {
          triggerGesture('tap', touchStartRef.current.x, touchStartRef.current.y);
        }
        lastTapRef.current = now;
      }
      
      touchStartRef.current = null;
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    touchStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    };
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (touchStartRef.current) {
      const duration = Date.now() - touchStartRef.current.time;
      
      if (duration < 200) {
        const now = Date.now();
        if (now - lastTapRef.current < touchSettings.doubleTapDelay) {
          triggerGesture('double_tap', e.clientX, e.clientY);
        } else {
          triggerGesture('tap', e.clientX, e.clientY);
        }
        lastTapRef.current = now;
      }
      
      touchStartRef.current = null;
    }
  };

  const triggerGesture = (gestureType: string, x: number, y: number) => {
    const gesture = touchGestures.find(g => g.type === gestureType);
    if (!gesture || !gesture.enabled) return;
    
    // Trigger haptic feedback
    if (gesture.haptic && touchSettings.hapticFeedback) {
      triggerHapticFeedback();
    }
    
    // Record touch event
    const touchEvent: TouchEvent = {
      id: `touch_${Date.now()}`,
      type: gestureType,
      timestamp: new Date().toISOString(),
      position: { x, y },
      velocity: { x: 0, y: 0 },
      distance: 0,
      duration: 0
    };
    
    setTouchEvents(prev => [touchEvent, ...prev.slice(0, 49)]); // Keep last 50 events
    localStorage.setItem('touch_events', JSON.stringify([touchEvent, ...touchEvents.slice(0, 49)]));
    
    // Show visual feedback
    setTestGesture(gestureType);
    setTimeout(() => setTestGesture(null), 1000);
    
    // Execute gesture action
    executeGestureAction(gesture.action);
  };

  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Short vibration
    }
  };

  const executeGestureAction = (action: string) => {
    console.log(`Executing gesture action: ${action}`);
    
    // Here you would implement the actual gesture actions
    switch (action) {
      case 'Navigate Back':
        // Navigate back
        break;
      case 'Navigate Forward':
        // Navigate forward
        break;
      case 'Show Quick Actions':
        // Show quick actions menu
        break;
      case 'Refresh Data':
        // Refresh data
        break;
      case 'Zoom In':
        // Zoom in
        break;
      case 'Zoom Out':
        // Zoom out
        break;
      case 'Show Context Menu':
        // Show context menu
        break;
      case 'Quick Edit':
        // Quick edit mode
        break;
    }
  };

  const updateGesture = (gestureId: string, updates: Partial<TouchGesture>) => {
    const updatedGestures = touchGestures.map(gesture =>
      gesture.id === gestureId ? { ...gesture, ...updates } : gesture
    );
    
    setTouchGestures(updatedGestures);
    localStorage.setItem('touch_gestures', JSON.stringify(updatedGestures));
  };

  const updateSettings = (updates: Partial<TouchSettings>) => {
    const updatedSettings = { ...touchSettings, ...updates };
    setTouchSettings(updatedSettings);
    localStorage.setItem('touch_settings', JSON.stringify(updatedSettings));
  };

  const clearTouchEvents = () => {
    setTouchEvents([]);
    localStorage.removeItem('touch_events');
  };

  const getGestureIcon = (type: string) => {
    switch (type) {
      case 'swipe_left': return '👈';
      case 'swipe_right': return '👉';
      case 'swipe_up': return '👆';
      case 'swipe_down': return '👇';
      case 'pinch_in': return '🤏';
      case 'pinch_out': return '🤲';
      case 'tap': return '👆';
      case 'long_press': return '👆';
      case 'double_tap': return '👆👆';
      default: return '👆';
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
            <span className="text-lg font-medium text-gray-700">Initializing touch gestures...</span>
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
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Touch Gestures System</h2>
              <p className="text-purple-100 mt-1">Mobile touch interactions and gesture controls</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Gestures:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {touchGestures.filter(g => g.enabled).length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Events:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {touchEvents.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Haptic:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    touchSettings.hapticFeedback ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {touchSettings.hapticFeedback ? 'ON' : 'OFF'}
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
              { id: 'gestures', name: 'Gestures', icon: '👆' },
              { id: 'events', name: 'Events', icon: '📊' },
              { id: 'settings', name: 'Settings', icon: '⚙️' },
              { id: 'test', name: 'Test Area', icon: '🧪' }
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
          {selectedTab === 'gestures' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Touch Gestures</h3>
              
              <div className="space-y-4">
                {touchGestures.map((gesture) => (
                  <div key={gesture.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getGestureIcon(gesture.type)}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {gesture.type.replace('_', ' ').toUpperCase()}
                          </h4>
                          <p className="text-sm text-gray-600">{gesture.action}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={gesture.enabled}
                            onChange={(e) => updateGesture(gesture.id, { enabled: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Haptic:</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={gesture.haptic}
                              onChange={(e) => updateGesture(gesture.id, { haptic: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Threshold:</span>
                          <input
                            type="number"
                            value={gesture.threshold}
                            onChange={(e) => updateGesture(gesture.id, { threshold: Number(e.target.value) })}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'events' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Touch Events</h3>
                <button
                  onClick={clearTouchEvents}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all text-sm"
                >
                  Clear Events
                </button>
              </div>
              
              <div className="space-y-3">
                {touchEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{getGestureIcon(event.type)}</span>
                        <div>
                          <div className="font-medium text-gray-900">
                            {event.type.replace('_', ' ').toUpperCase()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(event.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        ({event.position.x}, {event.position.y})
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Touch Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Sensitivity</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Swipe Threshold</label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={touchSettings.swipeThreshold}
                        onChange={(e) => updateSettings({ swipeThreshold: Number(e.target.value) })}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">{touchSettings.swipeThreshold}px</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pinch Threshold</label>
                      <input
                        type="range"
                        min="0.05"
                        max="0.3"
                        step="0.01"
                        value={touchSettings.pinchThreshold}
                        onChange={(e) => updateSettings({ pinchThreshold: Number(e.target.value) })}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">{touchSettings.pinchThreshold}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gesture Sensitivity</label>
                      <select
                        value={touchSettings.gestureSensitivity}
                        onChange={(e) => updateSettings({ gestureSensitivity: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Timing</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Long Press Delay</label>
                      <input
                        type="range"
                        min="300"
                        max="1000"
                        value={touchSettings.longPressDelay}
                        onChange={(e) => updateSettings({ longPressDelay: Number(e.target.value) })}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">{touchSettings.longPressDelay}ms</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Double Tap Delay</label>
                      <input
                        type="range"
                        min="200"
                        max="500"
                        value={touchSettings.doubleTapDelay}
                        onChange={(e) => updateSettings({ doubleTapDelay: Number(e.target.value) })}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">{touchSettings.doubleTapDelay}ms</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Haptic Feedback</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={touchSettings.hapticFeedback}
                          onChange={(e) => updateSettings({ hapticFeedback: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'test' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Gesture Test Area</h3>
              
              <div className="relative">
                <motion.div
                  className="w-full h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg border-2 border-dashed border-purple-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">👆</div>
                    <div className="text-lg font-medium text-gray-700 mb-2">Touch Test Area</div>
                    <div className="text-sm text-gray-600">
                      Try swiping, pinching, tapping, and long pressing
                    </div>
                    {testGesture && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg inline-block"
                      >
                        {getGestureIcon(testGesture)} {testGesture.replace('_', ' ').toUpperCase()}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Touch Gestures System • {touchGestures.filter(g => g.enabled).length} enabled • {touchEvents.length} events
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
                console.log('Exporting touch data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TouchGesturesSystem;
