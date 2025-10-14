import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataSubject {
  id: string;
  email: string;
  name: string;
  dataCategories: string[];
  consentStatus: 'granted' | 'denied' | 'withdrawn' | 'pending';
  lastUpdated: Date;
  dataRetention: Date;
  rights: DataRights;
}

interface DataRights {
  access: boolean;
  rectification: boolean;
  erasure: boolean;
  portability: boolean;
  restriction: boolean;
  objection: boolean;
}

interface PrivacyRequest {
  id: string;
  type: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection';
  subject: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  submitted: Date;
  completed: Date | null;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface DataProcessingActivity {
  id: string;
  name: string;
  purpose: string;
  legalBasis: 'consent' | 'contract' | 'legal-obligation' | 'vital-interests' | 'public-task' | 'legitimate-interests';
  dataCategories: string[];
  recipients: string[];
  retentionPeriod: string;
  status: 'active' | 'inactive' | 'under-review';
}

interface PrivacyMetrics {
  totalSubjects: number;
  activeConsents: number;
  pendingRequests: number;
  completedRequests: number;
  dataBreaches: number;
  complianceScore: number;
}

const DataPrivacyControls: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [subjects, setSubjects] = useState<DataSubject[]>([]);
  const [requests, setRequests] = useState<PrivacyRequest[]>([]);
  const [activities, setActivities] = useState<DataProcessingActivity[]>([]);
  const [metrics, setMetrics] = useState<PrivacyMetrics>({
    totalSubjects: 0,
    activeConsents: 0,
    pendingRequests: 0,
    completedRequests: 0,
    dataBreaches: 0,
    complianceScore: 0
  });
  const [selectedTab, setSelectedTab] = useState<'subjects' | 'requests' | 'activities'>('subjects');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);

  // Generate privacy data
  useEffect(() => {
    const generateSubjects = (): DataSubject[] => {
      const dataCategories = ['personal', 'contact', 'behavioral', 'financial', 'health', 'biometric'];
      const consentStatuses: DataSubject['consentStatus'][] = ['granted', 'denied', 'withdrawn', 'pending'];

      const subjects: DataSubject[] = [];
      for (let i = 0; i < 100; i++) {
        const consentStatus = consentStatuses[Math.floor(Math.random() * consentStatuses.length)];
        const categories = dataCategories.slice(0, Math.floor(Math.random() * 4) + 1);
        const retentionDate = new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000);

        subjects.push({
          id: `subject-${i}`,
          email: `user${i}@example.com`,
          name: `User ${i}`,
          dataCategories: categories,
          consentStatus,
          lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          dataRetention: retentionDate,
          rights: {
            access: Math.random() > 0.2,
            rectification: Math.random() > 0.3,
            erasure: Math.random() > 0.4,
            portability: Math.random() > 0.5,
            restriction: Math.random() > 0.6,
            objection: Math.random() > 0.7
          }
        });
      }

      return subjects;
    };

    const generateRequests = (): PrivacyRequest[] => {
      const requestTypes: PrivacyRequest['type'][] = [
        'access', 'rectification', 'erasure', 'portability', 'restriction', 'objection'
      ];
      const statuses: PrivacyRequest['status'][] = ['pending', 'in-progress', 'completed', 'rejected'];
      const priorities: PrivacyRequest['priority'][] = ['low', 'medium', 'high', 'urgent'];

      const requests: PrivacyRequest[] = [];
      for (let i = 0; i < 50; i++) {
        const type = requestTypes[Math.floor(Math.random() * requestTypes.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const priority = priorities[Math.floor(Math.random() * priorities.length)];
        const submitted = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
        const completed = status === 'completed' ? new Date(submitted.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000) : null;

        requests.push({
          id: `request-${i}`,
          type,
          subject: `user${Math.floor(Math.random() * 100)}@example.com`,
          status,
          submitted,
          completed,
          description: `Privacy request for ${type} of personal data`,
          priority
        });
      }

      return requests.sort((a, b) => b.submitted.getTime() - a.submitted.getTime());
    };

    const generateActivities = (): DataProcessingActivity[] => {
      const legalBases: DataProcessingActivity['legalBasis'][] = [
        'consent', 'contract', 'legal-obligation', 'vital-interests', 'public-task', 'legitimate-interests'
      ];
      const statuses: DataProcessingActivity['status'][] = ['active', 'inactive', 'under-review'];
      const purposes = [
        'Service Provision', 'Marketing', 'Analytics', 'Security', 'Legal Compliance', 'Research'
      ];
      const recipients = ['Internal Teams', 'Third-party Vendors', 'Government Agencies', 'Partners'];

      return purposes.map((purpose, index) => {
        const legalBasis = legalBases[Math.floor(Math.random() * legalBases.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const dataCategories = ['personal', 'contact', 'behavioral'].slice(0, Math.floor(Math.random() * 3) + 1);
        const recipientsList = recipients.slice(0, Math.floor(Math.random() * 3) + 1);

        return {
          id: `activity-${index}`,
          name: `${purpose} Processing`,
          purpose,
          legalBasis,
          dataCategories,
          recipients: recipientsList,
          retentionPeriod: `${Math.floor(Math.random() * 5) + 1} years`,
          status
        };
      });
    };

    const subjects = generateSubjects();
    const requests = generateRequests();
    const activities = generateActivities();

    setSubjects(subjects);
    setRequests(requests);
    setActivities(activities);

    // Calculate metrics
    const totalSubjects = subjects.length;
    const activeConsents = subjects.filter(s => s.consentStatus === 'granted').length;
    const pendingRequests = requests.filter(r => r.status === 'pending').length;
    const completedRequests = requests.filter(r => r.status === 'completed').length;
    const dataBreaches = Math.floor(Math.random() * 5); // Simulate breaches
    const complianceScore = Math.max(0, 100 - (pendingRequests * 2) - (dataBreaches * 10));

    setMetrics({
      totalSubjects,
      activeConsents,
      pendingRequests,
      completedRequests,
      dataBreaches,
      complianceScore
    });
  }, []);

  const filteredSubjects = subjects.filter(subject => 
    selectedStatus === 'all' || subject.consentStatus === selectedStatus
  );

  const filteredRequests = requests.filter(request => 
    selectedStatus === 'all' || request.status === selectedStatus
  );

  const filteredActivities = activities.filter(activity => 
    selectedStatus === 'all' || activity.status === selectedStatus
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };

  const getConsentColor = (status: string): string => {
    switch (status) {
      case 'granted': return 'bg-green-100 text-green-800';
      case 'denied': return 'bg-red-100 text-red-800';
      case 'withdrawn': return 'bg-orange-100 text-orange-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRequestStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceScoreColor = (score: number): string => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    if (score >= 50) return '#f97316';
    return '#ef4444';
  };

  const processRequest = async (requestId: string) => {
    setIsProcessingRequest(true);
    
    // Simulate request processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { ...request, status: 'completed', completed: new Date() }
        : request
    ));
    
    setIsProcessingRequest(false);
  };

  const withdrawConsent = (subjectId: string) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId 
        ? { ...subject, consentStatus: 'withdrawn', lastUpdated: new Date() }
        : subject
    ));
  };

  const grantConsent = (subjectId: string) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId 
        ? { ...subject, consentStatus: 'granted', lastUpdated: new Date() }
        : subject
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
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🔒 Data Privacy Controls</h2>
              <p className="text-green-100 mt-1">GDPR, CCPA, and data protection compliance</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: getComplianceScoreColor(metrics.complianceScore) }}
                >
                  {metrics.complianceScore}
                </div>
                <div className="text-sm text-green-100">
                  Compliance Score
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
          {/* Privacy Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Subjects</p>
                  <p className="text-2xl font-bold text-blue-800">{metrics.totalSubjects}</p>
                </div>
                <div className="text-3xl">👥</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Active Consents</p>
                  <p className="text-2xl font-bold text-green-800">{metrics.activeConsents}</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Pending Requests</p>
                  <p className="text-2xl font-bold text-yellow-800">{metrics.pendingRequests}</p>
                </div>
                <div className="text-3xl">⏳</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Completed</p>
                  <p className="text-2xl font-bold text-purple-800">{metrics.completedRequests}</p>
                </div>
                <div className="text-3xl">🔧</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Data Breaches</p>
                  <p className="text-2xl font-bold text-red-800">{metrics.dataBreaches}</p>
                </div>
                <div className="text-3xl">🚨</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Compliance</p>
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: getComplianceScoreColor(metrics.complianceScore) }}
                  >
                    {metrics.complianceScore}
                  </p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTab('subjects')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTab === 'subjects' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Data Subjects
                  </button>
                  <button
                    onClick={() => setSelectedTab('requests')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTab === 'requests' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Privacy Requests
                  </button>
                  <button
                    onClick={() => setSelectedTab('activities')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTab === 'activities' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Processing Activities
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Statuses</option>
                    {selectedTab === 'subjects' && (
                      <>
                        <option value="granted">Granted</option>
                        <option value="denied">Denied</option>
                        <option value="withdrawn">Withdrawn</option>
                        <option value="pending">Pending</option>
                      </>
                    )}
                    {selectedTab === 'requests' && (
                      <>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </>
                    )}
                    {selectedTab === 'activities' && (
                      <>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="under-review">Under Review</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Data Subjects Tab */}
          {selectedTab === 'subjects' && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Data Subjects ({filteredSubjects.length})</h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Categories</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retention</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rights</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubjects.slice(0, 20).map((subject) => (
                      <tr key={subject.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{subject.name}</div>
                            <div className="text-sm text-gray-500">{subject.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConsentColor(subject.consentStatus)}`}>
                            {subject.consentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {subject.dataCategories.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(subject.dataRetention)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Object.values(subject.rights).filter(Boolean).length}/6
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {subject.consentStatus === 'granted' ? (
                              <button
                                onClick={() => withdrawConsent(subject.id)}
                                className="text-red-600 hover:text-red-900 transition-colors"
                              >
                                Withdraw
                              </button>
                            ) : (
                              <button
                                onClick={() => grantConsent(subject.id)}
                                className="text-green-600 hover:text-green-900 transition-colors"
                              >
                                Grant
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Privacy Requests Tab */}
          {selectedTab === 'requests' && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Privacy Requests ({filteredRequests.length})</h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{request.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRequestStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(request.submitted)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {request.status === 'pending' && (
                            <button
                              onClick={() => processRequest(request.id)}
                              disabled={isProcessingRequest}
                              className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                            >
                              Process
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Processing Activities Tab */}
          {selectedTab === 'activities' && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Processing Activities ({filteredActivities.length})</h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Legal Basis</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Categories</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retention</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredActivities.map((activity) => (
                      <tr key={activity.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.purpose}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.legalBasis}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.dataCategories.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.recipients.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.retentionPeriod}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActivityStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DataPrivacyControls;
