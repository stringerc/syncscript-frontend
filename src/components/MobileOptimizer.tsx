// Mobile Optimization Component
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';

export function MobileOptimizer() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!isMobile) return null;

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1e2128] border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-white hover:bg-gray-700 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-semibold">SyncScript</span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-white hover:bg-gray-700 rounded-lg"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-[#1e2128] z-50 md:hidden overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <span className="text-white font-semibold">SyncScript</span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 text-white hover:bg-gray-700 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {[
                    { name: 'Dashboard', icon: '📊', active: true },
                    { name: 'Tasks', icon: '✅', active: false },
                    { name: 'Calendar', icon: '📅', active: false },
                    { name: 'AI Coach', icon: '🤖', active: false },
                    { name: 'Energy', icon: '⚡', active: false },
                    { name: 'Team', icon: '👥', active: false },
                    { name: 'Analytics', icon: '📈', active: false },
                    { name: 'Settings', icon: '⚙️', active: false }
                  ].map((item) => (
                    <button
                      key={item.name}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        item.active 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1e2128] border-t border-gray-800">
        <div className="flex items-center justify-around py-2">
          {[
            { name: 'Dashboard', icon: '📊' },
            { name: 'Tasks', icon: '✅' },
            { name: 'AI', icon: '🤖' },
            { name: 'Team', icon: '👥' },
            { name: 'More', icon: '⋯' }
          ].map((item) => (
            <button
              key={item.name}
              className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Content Padding */}
      <div className="md:hidden h-16" /> {/* Top padding for mobile header */}
      <div className="md:hidden h-16" /> {/* Bottom padding for mobile nav */}
    </>
  );
}
