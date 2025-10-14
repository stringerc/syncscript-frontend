import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComplianceFramework {
  id: string;
  name: string;
  type: 'GDPR' | 'SOC2' | 'HIPAA' | 'PCI-DSS' | 'ISO27001' | 'CCPA' | 'PIPEDA' | 'LGPD';
  status: 'compliant' | 'partial' | 'non-compliant' | 'pending';
  score: number;
  lastAudit: Date;
  nextAudit: Date;
  requirements: ComplianceRequirement[];
}

interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  status: 'met' | 'partial' | 'not-met' | 'not-applicable';
  evidence: string[];
  lastUpdated: Date;
  responsible: string;
}

interface ComplianceViolation {
  id: string;
  framework: string;
  requirement: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  discovered: Date;
  resolved: Date | null;
  impact: string;
}

interface ComplianceReport {
  id: string;
  framework: string;
  type: 'audit' | 'assessment' | 'gap-analysis';
  status: 'in-progress' | 'completed' | 'pending';
  generated: Date;
  findings: number;
  recommendations: number;
}

const ComplianceManagement: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [frameworks, setFrameworks] = useState<ComplianceFramework[]>([]);
  const [violations, setViolations] = useState<ComplianceViolation[]>([]);
  const [reports, setReports] = useState<ComplianceReport[]>([]);
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Generate compliance data
  useEffect(() => {
    const generateFrameworks = (): ComplianceFramework[] => {
      const frameworkTypes: ComplianceFramework['type'][] = [
        'GDPR', 'SOC2', 'HIPAA', 'PCI-DSS', 'ISO27001', 'CCPA', 'PIPEDA', 'LGPD'
      ];
      const statuses: ComplianceFramework['status'][] = ['compliant', 'partial', 'non-compliant', 'pending'];

      return frameworkTypes.map((type, index) => {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const score = status === 'compliant' ? Math.random() * 20 + 80 : 
                     status === 'partial' ? Math.random() * 30 + 50 :
                     Math.random() * 50;

        const requirements: ComplianceRequirement[] = [];
        const reqCount = Math.floor(Math.random() * 10) + 5;
        for (let i = 0; i < reqCount; i++) {
          const reqStatus: ComplianceRequirement['status'][] = ['met', 'partial', 'not-met', 'not-applicable'];
          requirements.push({
            id: `req-${i}`,
            title: `Requirement ${i + 1}`,
            description: `Compliance requirement ${i + 1} for ${type}`,
            status: reqStatus[Math.floor(Math.random() * reqStatus.length)],
            evidence: [`Evidence ${i + 1}a`, `Evidence ${i + 1}b`],
            lastUpdated: new Date(Date.now() - Math.random() * 86400000),
            responsible: `Team ${Math.floor(Math.random() * 5) + 1}`
          });
        }

        return {
          id: `framework-${index}`,
          name: type,
          type,
          status,
          score,
          lastAudit: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
          nextAudit: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000),
          requirements
        };
      });
    };

    const generateViolations = (): ComplianceViolation[] => {
      const frameworks = ['GDPR', 'SOC2', 'HIPAA', 'PCI-DSS'];
      const severities: ComplianceViolation['severity'][] = ['low', 'medium', 'high', 'critical'];
      
      const violations: ComplianceViolation[] = [];
      for (let i = 0; i < 20; i++) {
        const framework = frameworks[Math.floor(Math.random() * frameworks.length)];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        const resolved = Math.random() > 0.3;

        violations.push({
          id: `violation-${i}`,
          framework,
          requirement: `Requirement ${Math.floor(Math.random() * 10) + 1}`,
          severity,
          description: `Compliance violation in ${framework} requirement`,
          discovered: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          resolved: resolved ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null,
          impact: severity === 'critical' ? 'High impact on business operations' : 'Moderate impact'
        });
      }

      return violations.sort((a, b) => b.discovered.getTime() - a.discovered.getTime());
    };

    const generateReports = (): ComplianceReport[] => {
      const frameworks = ['GDPR', 'SOC2', 'HIPAA', 'PCI-DSS', 'ISO27001'];
      const types: ComplianceReport['type'][] = ['audit', 'assessment', 'gap-analysis'];
      const statuses: ComplianceReport['status'][] = ['in-progress', 'completed', 'pending'];

      return frameworks.map((framework, index) => {
        const type = types[Math.floor(Math.random() * types.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        return {
          id: `report-${index}`,
          framework,
          type,
          status,
          generated: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
          findings: Math.floor(Math.random() * 20) + 5,
          recommendations: Math.floor(Math.random() * 15) + 3
        };
      });
    };

    setFrameworks(generateFrameworks());
    setViolations(generateViolations());
    setReports(generateReports());
  }, []);

  const filteredFrameworks = frameworks.filter(framework => 
    (selectedFramework === 'all' || framework.type === selectedFramework) &&
    (selectedStatus === 'all' || framework.status === selectedStatus)
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
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

  const generateComplianceReport = async () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newReport: ComplianceReport = {
      id: `report-${Date.now()}`,
      framework: 'Comprehensive',
      type: 'audit',
      status: 'completed',
      generated: new Date(),
      findings: Math.floor(Math.random() * 20) + 5,
      recommendations: Math.floor(Math.random() * 15) + 3
    };

    setReports(prev => [newReport, ...prev]);
    setIsGeneratingReport(false);
  };

  const resolveViolation = (violationId: string) => {
    setViolations(prev => prev.map(violation => 
      violation.id === violationId ? { ...violation, resolved: new Date() } : violation
    ));
  };

  const totalFrameworks = frameworks.length;
  const compliantFrameworks = frameworks.filter(f => f.status === 'compliant').length;
  const activeViolations = violations.filter(v => !v.resolved).length;
  const averageScore = frameworks.reduce((sum, f) => sum + f.score, 0) / frameworks.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">📋 Compliance Management System</h2>
              <p className="text-blue-100 mt-1">GDPR, SOC2, HIPAA, and other regulatory compliance</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: getScoreColor(averageScore) }}
                >
                  {averageScore.toFixed(0)}
                </div>
                <div className="text-sm text-blue-100">
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
          {/* Compliance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Frameworks</p>
                  <p className="text-2xl font-bold text-blue-800">{totalFrameworks}</p>
                </div>
                <div className="text-3xl">📋</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Compliant</p>
                  <p className="text-2xl font-bold text-green-800">{compliantFrameworks}</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Active Violations</p>
                  <p className="text-2xl font-bold text-red-800">{activeViolations}</p>
                </div>
                <div className="text-3xl">🚨</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Average Score</p>
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: getScoreColor(averageScore) }}
                  >
                    {averageScore.toFixed(0)}
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
                  <label className="text-sm font-medium text-gray-700">Framework:</label>
                  <select
                    value={selectedFramework}
                    onChange={(e) => setSelectedFramework(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Frameworks</option>
                    <option value="GDPR">GDPR</option>
                    <option value="SOC2">SOC2</option>
                    <option value="HIPAA">HIPAA</option>
                    <option value="PCI-DSS">PCI-DSS</option>
                    <option value="ISO27001">ISO27001</option>
                    <option value="CCPA">CCPA</option>
                    <option value="PIPEDA">PIPEDA</option>
                    <option value="LGPD">LGPD</option>
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
                    <option value="compliant">Compliant</option>
                    <option value="partial">Partial</option>
                    <option value="non-compliant">Non-Compliant</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={generateComplianceReport}
                  disabled={isGeneratingReport}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingReport ? '⏳ Generating...' : '📊 Generate Report'}
                </button>
              </div>
            </div>
          </div>

          {/* Compliance Frameworks */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Compliance Frameworks ({filteredFrameworks.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFrameworks.map((framework) => (
                <div key={framework.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-800">{framework.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(framework.status)}`}>
                      {framework.status}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Compliance Score</span>
                      <span 
                        className="font-medium"
                        style={{ color: getScoreColor(framework.score) }}
                      >
                        {framework.score.toFixed(0)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${framework.score}%`,
                          backgroundColor: getScoreColor(framework.score)
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Last Audit: {formatDate(framework.lastAudit)}</div>
                    <div>Next Audit: {formatDate(framework.nextAudit)}</div>
                    <div>Requirements: {framework.requirements.length}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Violations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Compliance Violations</h3>
            <div className="space-y-3">
              <AnimatePresence>
                {violations.slice(0, 10).map((violation) => (
                  <motion.div
                    key={violation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`p-4 rounded-lg border-l-4 ${
                      violation.severity === 'critical' ? 'border-red-500 bg-red-50' :
                      violation.severity === 'high' ? 'border-orange-500 bg-orange-50' :
                      violation.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-green-500 bg-green-50'
                    } ${violation.resolved ? 'opacity-60' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(violation.severity)}`}>
                            {violation.severity}
                          </span>
                          <span className="text-sm text-gray-600">{violation.framework}</span>
                          <span className="text-sm text-gray-500">
                            {formatDate(violation.discovered)}
                          </span>
                          {violation.resolved && (
                            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                              Resolved
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-800 mb-1">{violation.description}</p>
                        <p className="text-xs text-gray-600">{violation.impact}</p>
                      </div>
                      {!violation.resolved && (
                        <button
                          onClick={() => resolveViolation(violation.id)}
                          className="ml-4 px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Compliance Reports */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Compliance Reports</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Framework</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Findings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendations</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.framework}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          report.status === 'completed' ? 'bg-green-100 text-green-800' :
                          report.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(report.generated)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.findings}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.recommendations}
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

export default ComplianceManagement;
