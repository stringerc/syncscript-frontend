// Security Dashboard Component
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Key, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Settings,
  User,
  Smartphone,
  Globe
} from 'lucide-react';

export function SecurityDashboard() {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    biometricAuth: false,
    sessionTimeout: 30,
    dataEncryption: true,
    auditLogging: true,
    privacyMode: false
  });

  const securityMetrics = {
    overallScore: 85,
    vulnerabilities: 2,
    lastScan: '2 hours ago',
    threatsBlocked: 47
  };

  const recentActivity = [
    { id: 1, action: 'Login from new device', time: '2 min ago', status: 'success', location: 'San Francisco, CA' },
    { id: 2, action: 'Password changed', time: '1 hour ago', status: 'success', location: 'Current session' },
    { id: 3, action: 'Failed login attempt', time: '3 hours ago', status: 'failed', location: 'Unknown' },
    { id: 4, action: '2FA enabled', time: '1 day ago', status: 'success', location: 'Current session' }
  ];

  const toggleSetting = (setting: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-xl font-semibold flex items-center">
          <Shield className="w-6 h-6 mr-2 text-blue-400" />
          Security Dashboard
        </h3>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            securityMetrics.overallScore >= 80 ? 'bg-green-500' : 
            securityMetrics.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          <span className="text-white font-semibold">{securityMetrics.overallScore}/100</span>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#141619] p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Secure</span>
          </div>
          <p className="text-white font-semibold">{securityMetrics.threatsBlocked}</p>
          <p className="text-gray-400 text-xs">Threats Blocked</p>
        </div>

        <div className="bg-[#141619] p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Warning</span>
          </div>
          <p className="text-white font-semibold">{securityMetrics.vulnerabilities}</p>
          <p className="text-gray-400 text-xs">Vulnerabilities</p>
        </div>

        <div className="bg-[#141619] p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Monitoring</span>
          </div>
          <p className="text-white font-semibold">24/7</p>
          <p className="text-gray-400 text-xs">Active</p>
        </div>

        <div className="bg-[#141619] p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Settings className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Updated</span>
          </div>
          <p className="text-white font-semibold">{securityMetrics.lastScan}</p>
          <p className="text-gray-400 text-xs">Last Scan</p>
        </div>
      </div>

      {/* Security Settings */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-4">Security Settings</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#141619] rounded-lg border border-gray-700">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-gray-400 text-sm">Add an extra layer of security</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('twoFactor')}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                securitySettings.twoFactor ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                securitySettings.twoFactor ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#141619] rounded-lg border border-gray-700">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-white font-medium">Biometric Authentication</p>
                <p className="text-gray-400 text-sm">Use fingerprint or face ID</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('biometricAuth')}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                securitySettings.biometricAuth ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                securitySettings.biometricAuth ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#141619] rounded-lg border border-gray-700">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">Data Encryption</p>
                <p className="text-gray-400 text-sm">End-to-end encryption enabled</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 text-sm">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="text-white font-semibold mb-4">Recent Security Activity</h4>
        <div className="space-y-2">
          {recentActivity.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 bg-[#141619] rounded-lg border border-gray-700"
            >
              <div className="flex items-center gap-3">
                {activity.status === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.location}</p>
                </div>
              </div>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

