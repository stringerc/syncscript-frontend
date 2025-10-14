import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecurityAudit {
  id: string;
  name: string;
  type: 'vulnerability' | 'penetration' | 'compliance' | 'code-review' | 'infrastructure';
  status: 'scheduled' | 'in-progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: Date;
  endDate: Date | null;
  findings: SecurityFinding[];
  score: number;
  auditor: string;
}

interface SecurityFinding {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'authentication' | 'authorization' | 'data-protection' | 'network' | 'application' | 'infrastructure';
  description: string;
  remediation: string;
  status: 'open' | 'in-progress' | 'resolved' | 'false-positive';
  discovered: Date;
  resolved: Date | null;
  cvssScore: number;
}

interface SecurityMetrics {
  totalAudits: number;
  completedAudits: number;
  activeFindings: number;
  resolvedFindings: number;
  averageScore: number;
  criticalFindings: number;
}

interface SecurityTrend {
  date: Date;
  findings: number;
  resolved: number;
  score: number;
}

const SecurityAuditDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [audits, setAudits] = useState<SecurityAudit[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalAudits: 0,
    completedAudits: 0,
    activeFindings: 0,
    resolvedFindings: 0,
    averageScore: 0,
    criticalFindings: 0
  });
  const [trends, setTrends] = useState<SecurityTrend[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedAudit, setSelectedAudit] = useState<string | null>(null);

  // Generate security audit data
  useEffect(() => {
    const generateAudits = (): SecurityAudit[] => {
      const auditTypes: SecurityAudit['type'][] = [
        'vulnerability', 'penetration', 'compliance', 'code-review', 'infrastructure'
      ];
      const statuses: SecurityAudit['status'][] = ['scheduled', 'in-progress', 'completed', 'failed'];
      const priorities: SecurityAudit['priority'][] = ['low', 'medium', 'high', 'critical'];
      const auditors = ['Security Team Alpha', 'External Auditor Beta', 'Internal Team Gamma'];

      const audits: SecurityAudit[] = [];
      for (let i = 0; i < 20; i++) {
        const type = auditTypes[Math.floor(Math.random() * auditTypes.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const priority = priorities[Math.floor(Math.random() * priorities.length)];
        const auditor = auditors[Math.floor(Math.random() * auditors.length)];
        
        const startDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
        const endDate = status === 'completed' ? new Date(startDate.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000) : null;
        const score = status === 'completed' ? Math.random() * 40 + 60 : 0;

        // Generate findings
        const findings: SecurityFinding[] = [];
        const findingCount = Math.floor(Math.random() * 15) + 5;
        for (let j = 0; j < findingCount; j++) {
          const findingSeverities: SecurityFinding['severity'][] = ['low', 'medium', 'high', 'critical'];
          const categories: SecurityFinding['category'][] = [
            'authentication', 'authorization', 'data-protection', 'network', 'application', 'infrastructure'
          ];
          const findingStatuses: SecurityFinding['status'][] = ['open', 'in-progress', 'resolved', 'false-positive'];
          
          const severity = findingSeverities[Math.floor(Math.random() * findingSeverities.length)];
          const category = categories[Math.floor(Math.random() * categories.length)];
          const findingStatus = findingStatuses[Math.floor(Math.random() * findingStatuses.length)];
          const discovered = new Date(startDate.getTime() + Math.random() * (endDate ? endDate.getTime() - startDate.getTime() : 14 * 24 * 60 * 60 * 1000));
          const resolved = findingStatus === 'resolved' ? new Date(discovered.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000) : null;
          const cvssScore = Math.random() * 10;

          findings.push({
            id: `finding-${i}-${j}`,
            title: `Security Finding ${j + 1}`,
            severity,
            category,
            description: `Security vulnerability found in ${category} during ${type} audit`,
            remediation: `Implement proper security controls for ${category}`,
            status: findingStatus,
            discovered,
            resolved,
            cvssScore
          });
        }

        audits.push({
          id: `audit-${i}`,
          name: `${type.charAt(0).toUpperCase() + type.slice(1)} Audit ${i + 1}`,
          type,
          status,
          priority,
          startDate,
          endDate,
          findings,
          score,
          auditor
        });
      }

      return audits.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    };

    const generateTrends = (): SecurityTrend[] => {
      const trends: SecurityTrend[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        trends.push({
          date,
          findings: Math.floor(Math.random() * 20) + 5,
          resolved: Math.floor(Math.random() * 15) + 3,
          score: Math.random() * 30 + 70
        });
      }
      return trends;
    };

    const audits = generateAudits();
    const trends = generateTrends();

    setAudits(audits);
    setTrends(trends);

    // Calculate metrics
    const totalAudits = audits.length;
    const completedAudits = audits.filter(a => a.status === 'completed').length;
    const allFindings = audits.flatMap(a => a.findings);
    const activeFindings = allFindings.filter(f => f.status === 'open' || f.status === 'in-progress').length;
    const resolvedFindings = allFindings.filter(f => f.status === 'resolved').length;
    const averageScore = audits.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.score, 0) / completedAudits || 0;
    const criticalFindings = allFindings.filter(f => f.severity === 'critical').length;

    setMetrics({
      totalAudits,
      completedAudits,
      activeFindings,
      resolvedFindings,
      averageScore,
      criticalFindings
    });
  }, []);

  const filteredAudits = audits.filter(audit => 
    (selectedType === 'all' || audit.type === selectedType) &&
    (selectedStatus === 'all' || audit.status === selectedStatus)
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    if (score >= 50) return '#f97316';
    return '#ef4444';
  };

  const getAuditIcon = (type: string): string => {
    switch (type) {
      case 'vulnerability': return '🔍';
      case 'penetration': return '🎯';
      case 'compliance': return '📋';
      case 'code-review': return '💻';
      case 'infrastructure': return '🏗️';
      default: return '🔒';
    }
  };

  const selectedAuditData = audits.find(audit => audit.id === selectedAudit);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🔍 Security Audit Dashboard</h2>
              <p className="text-purple-100 mt-1">Comprehensive security auditing and monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: getScoreColor(metrics.averageScore) }}
                >
                  {metrics.averageScore.toFixed(0)}
                </div>
                <div className="text-sm text-purple-100">
                  Avg Score
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
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Audits</p>
                  <p className="text-2xl font-bold text-blue-800">{metrics.totalAudits}</p>
                </div>
                <div className="text-3xl">🔍</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-800">{metrics.completedAudits}</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Active Findings</p>
                  <p className="text-2xl font-bold text-orange-800">{metrics.activeFindings}</p>
                </div>
                <div className="text-3xl">⚠️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Resolved</p>
                  <p className="text-2xl font-bold text-purple-800">{metrics.resolvedFindings}</p>
                </div>
                <div className="text-3xl">🔧</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Critical</p>
                  <p className="text-2xl font-bold text-red-800">{metrics.criticalFindings}</p>
                </div>
                <div className="text-3xl">🚨</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Avg Score</p>
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: getScoreColor(metrics.averageScore) }}
                  >
                    {metrics.averageScore.toFixed(0)}
                  </p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Type:</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="vulnerability">Vulnerability</option>
                    <option value="penetration">Penetration</option>
                    <option value="compliance">Compliance</option>
                    <option value="code-review">Code Review</option>
                    <option value="infrastructure">Infrastructure</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Security Trends Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Security Trends (Last 30 Days)</h3>
            <div className="h-64 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📈</div>
                <p>Security trends visualization would be displayed here</p>
                <p className="text-sm mt-2">
                  Average findings: {(trends.reduce((sum, t) => sum + t.findings, 0) / trends.length).toFixed(1)} | 
                  Average score: {(trends.reduce((sum, t) => sum + t.score, 0) / trends.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Security Audits */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Security Audits ({filteredAudits.length})</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Findings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auditor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAudits.map((audit) => (
                    <tr key={audit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{getAuditIcon(audit.type)}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{audit.name}</div>
                            <div className="text-sm text-gray-500">
                              {formatDate(audit.startDate)} - {audit.endDate ? formatDate(audit.endDate) : 'Ongoing'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {audit.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(audit.status)}`}>
                          {audit.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(audit.priority)}`}>
                          {audit.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {audit.score > 0 ? (
                          <span 
                            className="text-sm font-medium"
                            style={{ color: getScoreColor(audit.score) }}
                          >
                            {audit.score.toFixed(0)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {audit.findings.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {audit.auditor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedAudit(audit.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Audit Details Modal */}
          {selectedAuditData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold">{selectedAuditData.name}</h3>
                      <p className="text-purple-100 mt-1">Audit Details and Findings</p>
                    </div>
                    <button
                      onClick={() => setSelectedAudit(null)}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6 h-full overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Audit Info</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Type: {selectedAuditData.type}</div>
                        <div>Status: {selectedAuditData.status}</div>
                        <div>Priority: {selectedAuditData.priority}</div>
                        <div>Auditor: {selectedAuditData.auditor}</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Timeline</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Start: {formatDate(selectedAuditData.startDate)}</div>
                        <div>End: {selectedAuditData.endDate ? formatDate(selectedAuditData.endDate) : 'Ongoing'}</div>
                        <div>Score: {selectedAuditData.score > 0 ? selectedAuditData.score.toFixed(0) : 'Pending'}</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Findings Summary</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Total: {selectedAuditData.findings.length}</div>
                        <div>Critical: {selectedAuditData.findings.filter(f => f.severity === 'critical').length}</div>
                        <div>High: {selectedAuditData.findings.filter(f => f.severity === 'high').length}</div>
                        <div>Resolved: {selectedAuditData.findings.filter(f => f.status === 'resolved').length}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-800">Findings ({selectedAuditData.findings.length})</h4>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {selectedAuditData.findings.map((finding) => (
                        <div key={finding.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(finding.severity)}`}>
                                  {finding.severity}
                                </span>
                                <span className="text-sm text-gray-600">{finding.category}</span>
                                <span className="text-sm text-gray-500">
                                  CVSS: {finding.cvssScore.toFixed(1)}
                                </span>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                  finding.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                  finding.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {finding.status}
                                </span>
                              </div>
                              <h5 className="font-semibold text-gray-800 mb-1">{finding.title}</h5>
                              <p className="text-sm text-gray-600 mb-2">{finding.description}</p>
                              <p className="text-sm text-gray-700">{finding.remediation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SecurityAuditDashboard;
