import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThreatEvent {
  id: string;
  timestamp: Date;
  type: 'suspicious_login' | 'brute_force' | 'data_breach' | 'malware' | 'phishing' | 'ddos' | 'injection' | 'xss';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  target: string;
  description: string;
  status: 'detected' | 'investigating' | 'mitigated' | 'resolved';
  riskScore: number;
  affectedUsers: number;
  autoResponse: boolean;
}

interface SecurityMetrics {
  totalThreats: number;
  activeThreats: number;
  mitigatedThreats: number;
  averageResponseTime: number;
  falsePositiveRate: number;
  securityScore: number;
}

interface ThreatPattern {
  id: string;
  pattern: string;
  frequency: number;
  lastDetected: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
}

const AdvancedThreatDetection: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [threats, setThreats] = useState<ThreatEvent[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalThreats: 0,
    activeThreats: 0,
    mitigatedThreats: 0,
    averageResponseTime: 0,
    falsePositiveRate: 0,
    securityScore: 0
  });
  const [patterns, setPatterns] = useState<ThreatPattern[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [selectedThreat, setSelectedThreat] = useState<string>('all');
  const intervalRef = useRef<NodeJS.Timeout>();

  // Generate threat data
  useEffect(() => {
    const generateThreats = (): ThreatEvent[] => {
      const threatTypes: ThreatEvent['type'][] = [
        'suspicious_login', 'brute_force', 'data_breach', 'malware', 
        'phishing', 'ddos', 'injection', 'xss'
      ];
      const severities: ThreatEvent['severity'][] = ['low', 'medium', 'high', 'critical'];
      const statuses: ThreatEvent['status'][] = ['detected', 'investigating', 'mitigated', 'resolved'];
      
      const descriptions = {
        suspicious_login: 'Multiple failed login attempts from unusual location',
        brute_force: 'Repeated password attempts detected',
        data_breach: 'Unauthorized access to sensitive data',
        malware: 'Malicious software detected in system',
        phishing: 'Phishing attempt targeting users',
        ddos: 'Distributed denial of service attack',
        injection: 'SQL injection attempt detected',
        xss: 'Cross-site scripting attack detected'
      };

      const threats: ThreatEvent[] = [];
      for (let i = 0; i < 50; i++) {
        const type = threatTypes[Math.floor(Math.random() * threatTypes.length)];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const riskScore = Math.floor(Math.random() * 100);
        const affectedUsers = Math.floor(Math.random() * 1000);
        const autoResponse = Math.random() > 0.3;

        threats.push({
          id: `threat-${i}`,
          timestamp: new Date(Date.now() - Math.random() * 86400000),
          type,
          severity,
          source: `IP: 192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          target: `User: user-${Math.floor(Math.random() * 1000)}`,
          description: descriptions[type],
          status,
          riskScore,
          affectedUsers,
          autoResponse
        });
      }

      return threats.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    };

    const generatePatterns = (): ThreatPattern[] => {
      return [
        {
          id: 'pattern-1',
          pattern: 'Brute Force Attacks',
          frequency: 23,
          lastDetected: new Date(Date.now() - 3600000),
          severity: 'high',
          mitigation: 'Implement rate limiting and account lockout policies'
        },
        {
          id: 'pattern-2',
          pattern: 'Suspicious Login Patterns',
          frequency: 15,
          lastDetected: new Date(Date.now() - 7200000),
          severity: 'medium',
          mitigation: 'Enable multi-factor authentication for high-risk accounts'
        },
        {
          id: 'pattern-3',
          pattern: 'SQL Injection Attempts',
          frequency: 8,
          lastDetected: new Date(Date.now() - 1800000),
          severity: 'critical',
          mitigation: 'Implement parameterized queries and input validation'
        },
        {
          id: 'pattern-4',
          pattern: 'Phishing Campaigns',
          frequency: 12,
          lastDetected: new Date(Date.now() - 5400000),
          severity: 'high',
          mitigation: 'Deploy email security filters and user training'
        }
      ];
    };

    const threats = generateThreats();
    const patterns = generatePatterns();

    setThreats(threats);
    setPatterns(patterns);

    // Calculate metrics
    const totalThreats = threats.length;
    const activeThreats = threats.filter(t => t.status === 'detected' || t.status === 'investigating').length;
    const mitigatedThreats = threats.filter(t => t.status === 'mitigated' || t.status === 'resolved').length;
    const averageResponseTime = Math.random() * 300 + 60; // 60-360 minutes
    const falsePositiveRate = Math.random() * 10; // 0-10%
    const securityScore = Math.max(0, 100 - (activeThreats * 5) - (falsePositiveRate * 2));

    setMetrics({
      totalThreats,
      activeThreats,
      mitigatedThreats,
      averageResponseTime,
      falsePositiveRate,
      securityScore
    });
  }, []);

  // Real-time threat monitoring simulation
  useEffect(() => {
    if (isMonitoring) {
      intervalRef.current = setInterval(() => {
        // Simulate new threat detection
        if (Math.random() > 0.7) {
          const newThreat: ThreatEvent = {
            id: `threat-${Date.now()}`,
            timestamp: new Date(),
            type: ['suspicious_login', 'brute_force', 'malware'][Math.floor(Math.random() * 3)] as any,
            severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
            source: `IP: 192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            target: `User: user-${Math.floor(Math.random() * 1000)}`,
            description: 'New threat detected by AI monitoring system',
            status: 'detected',
            riskScore: Math.floor(Math.random() * 100),
            affectedUsers: Math.floor(Math.random() * 100),
            autoResponse: Math.random() > 0.5
          };

          setThreats(prev => [newThreat, ...prev.slice(0, 49)]);
        }
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMonitoring]);

  const filteredThreats = threats.filter(threat => 
    (selectedSeverity === 'all' || threat.severity === selectedSeverity) &&
    (selectedThreat === 'all' || threat.type === selectedThreat)
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'detected': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'mitigated': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getThreatIcon = (type: string): string => {
    switch (type) {
      case 'suspicious_login': return '🔐';
      case 'brute_force': return '💥';
      case 'data_breach': return '🚨';
      case 'malware': return '🦠';
      case 'phishing': return '🎣';
      case 'ddos': return '⚡';
      case 'injection': return '💉';
      case 'xss': return '🌐';
      default: return '⚠️';
    }
  };

  const getSecurityScoreColor = (score: number): string => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    if (score >= 50) return '#f97316';
    return '#ef4444';
  };

  const mitigateThreat = (threatId: string) => {
    setThreats(prev => prev.map(threat => 
      threat.id === threatId ? { ...threat, status: 'mitigated' } : threat
    ));
  };

  const resolveThreat = (threatId: string) => {
    setThreats(prev => prev.map(threat => 
      threat.id === threatId ? { ...threat, status: 'resolved' } : threat
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🛡️ Advanced Threat Detection</h2>
              <p className="text-red-100 mt-1">Real-time security monitoring and threat response</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: getSecurityScoreColor(metrics.securityScore) }}
                >
                  {metrics.securityScore}
                </div>
                <div className="text-sm text-red-100">
                  Security Score
                </div>
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
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Security Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Total Threats</p>
                  <p className="text-2xl font-bold text-red-800">{metrics.totalThreats}</p>
                </div>
                <div className="text-3xl">🚨</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Active Threats</p>
                  <p className="text-2xl font-bold text-orange-800">{metrics.activeThreats}</p>
                </div>
                <div className="text-3xl">⚠️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Mitigated</p>
                  <p className="text-2xl font-bold text-green-800">{metrics.mitigatedThreats}</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Response Time</p>
                  <p className="text-2xl font-bold text-blue-800">{metrics.averageResponseTime.toFixed(0)}m</p>
                </div>
                <div className="text-3xl">⏱️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">False Positive</p>
                  <p className="text-2xl font-bold text-purple-800">{metrics.falsePositiveRate.toFixed(1)}%</p>
                </div>
                <div className="text-3xl">🎯</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Security Score</p>
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: getSecurityScoreColor(metrics.securityScore) }}
                  >
                    {metrics.securityScore}
                  </p>
                </div>
                <div className="text-3xl">🛡️</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Severity:</label>
                  <select
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Severities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Threat Type:</label>
                  <select
                    value={selectedThreat}
                    onChange={(e) => setSelectedThreat(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="suspicious_login">Suspicious Login</option>
                    <option value="brute_force">Brute Force</option>
                    <option value="data_breach">Data Breach</option>
                    <option value="malware">Malware</option>
                    <option value="phishing">Phishing</option>
                    <option value="ddos">DDoS</option>
                    <option value="injection">Injection</option>
                    <option value="xss">XSS</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="monitoring"
                    checked={isMonitoring}
                    onChange={(e) => setIsMonitoring(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="monitoring" className="text-sm text-gray-700">
                    Real-time Monitoring
                  </label>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Threat Patterns */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Threat Patterns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patterns.map((pattern) => (
                <div key={pattern.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{pattern.pattern}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(pattern.severity)}`}>
                      {pattern.severity}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Frequency: {pattern.frequency} | Last: {formatDate(pattern.lastDetected)}
                  </div>
                  <p className="text-sm text-gray-700">{pattern.mitigation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Threat Events */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Threat Events ({filteredThreats.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <AnimatePresence>
                {filteredThreats.map((threat) => (
                  <motion.div
                    key={threat.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${threat.status === 'resolved' ? 'opacity-60' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{getThreatIcon(threat.type)}</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(threat.severity)}`}>
                            {threat.severity}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(threat.status)}`}>
                            {threat.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatDate(threat.timestamp)}
                          </span>
                          {threat.autoResponse && (
                            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                              Auto-Response
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-800 mb-2">{threat.description}</p>
                        <div className="text-xs text-gray-600">
                          <div className="flex items-center space-x-4">
                            <span>Source: {threat.source}</span>
                            <span>Target: {threat.target}</span>
                            <span>Risk Score: {threat.riskScore}</span>
                            <span>Affected Users: {threat.affectedUsers}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {threat.status === 'detected' && (
                          <button
                            onClick={() => mitigateThreat(threat.id)}
                            className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors"
                          >
                            Mitigate
                          </button>
                        )}
                        {threat.status === 'mitigated' && (
                          <button
                            onClick={() => resolveThreat(threat.id)}
                            className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedThreatDetection;
