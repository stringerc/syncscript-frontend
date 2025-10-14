import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollaborationSession {
  id: string;
  name: string;
  type: 'meeting' | 'workshop' | 'brainstorm' | 'review' | 'training';
  description: string;
  participants: Participant[];
  startTime: Date;
  endTime: Date;
  duration: number;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  agenda: AgendaItem[];
  recordings: Recording[];
  notes: Note[];
  outcomes: Outcome[];
}

interface Participant {
  id: string;
  name: string;
  email: string;
  role: 'host' | 'participant' | 'observer';
  status: 'invited' | 'accepted' | 'declined' | 'attending' | 'left';
  joinTime: Date | null;
  leaveTime: Date | null;
  contribution: number;
}

interface AgendaItem {
  id: string;
  title: string;
  description: string;
  duration: number;
  presenter: string;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  startTime: Date | null;
  endTime: Date | null;
}

interface Recording {
  id: string;
  name: string;
  url: string;
  duration: number;
  quality: 'low' | 'medium' | 'high';
  size: number;
  createdAt: Date;
  transcript: string;
}

interface Note {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  type: 'action' | 'decision' | 'idea' | 'question';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string | null;
}

interface Outcome {
  id: string;
  title: string;
  description: string;
  type: 'decision' | 'action' | 'follow-up' | 'blocker';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
}

interface CollaborationTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  duration: number;
  agenda: Partial<AgendaItem>[];
  participants: number;
  tools: string[];
  bestPractices: string[];
}

interface CollaborationMetric {
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
  target: number;
}

const AdvancedCollaborationTools: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [sessions, setSessions] = useState<CollaborationSession[]>([]);
  const [templates, setTemplates] = useState<CollaborationTemplate[]>([]);
  const [metrics, setMetrics] = useState<CollaborationMetric[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [isStartingSession, setIsStartingSession] = useState(false);

  // Generate collaboration data
  useEffect(() => {
    const generateSessions = (): CollaborationSession[] => {
      const sessionData = [
        {
          name: 'Product Strategy Meeting',
          type: 'meeting' as const,
          description: 'Quarterly product strategy and roadmap planning',
          status: 'completed' as const,
          duration: 120
        },
        {
          name: 'Design Workshop',
          type: 'workshop' as const,
          description: 'UX/UI design workshop for new features',
          status: 'active' as const,
          duration: 180
        },
        {
          name: 'Sprint Planning',
          type: 'meeting' as const,
          description: 'Weekly sprint planning and backlog refinement',
          status: 'scheduled' as const,
          duration: 90
        },
        {
          name: 'Code Review Session',
          type: 'review' as const,
          description: 'Peer code review and knowledge sharing',
          status: 'completed' as const,
          duration: 60
        },
        {
          name: 'Team Training',
          type: 'training' as const,
          description: 'New tool training and onboarding session',
          status: 'scheduled' as const,
          duration: 240
        },
        {
          name: 'Brainstorming Session',
          type: 'brainstorm' as const,
          description: 'Creative brainstorming for marketing campaign',
          status: 'cancelled' as const,
          duration: 90
        }
      ];

      return sessionData.map((session, index) => {
        const participants: Participant[] = [];
        const participantCount = Math.floor(Math.random() * 8) + 3;
        const names = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Eva Brown', 'Frank Miller', 'Grace Lee', 'Henry Taylor'];
        
        for (let i = 0; i < participantCount; i++) {
          const name = names[i] || `Participant ${i + 1}`;
          const roles: Participant['role'][] = ['host', 'participant', 'observer'];
          const statuses: Participant['status'][] = ['invited', 'accepted', 'declined', 'attending', 'left'];
          
          participants.push({
            id: `participant-${index}-${i}`,
            name,
            email: `${name.toLowerCase().replace(' ', '.')}@company.com`,
            role: i === 0 ? 'host' : roles[Math.floor(Math.random() * roles.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            joinTime: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * session.duration * 60 * 1000) : null,
            leaveTime: Math.random() > 0.7 ? new Date(Date.now() - Math.random() * session.duration * 60 * 1000) : null,
            contribution: Math.random() * 100
          });
        }

        const agenda: AgendaItem[] = [];
        const agendaCount = Math.floor(Math.random() * 5) + 2;
        
        for (let i = 0; i < agendaCount; i++) {
          const statuses: AgendaItem['status'][] = ['pending', 'active', 'completed', 'skipped'];
          agenda.push({
            id: `agenda-${index}-${i}`,
            title: `Agenda Item ${i + 1}`,
            description: `Discussion topic ${i + 1}`,
            duration: Math.floor(Math.random() * 30) + 10,
            presenter: participants[Math.floor(Math.random() * participants.length)].name,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            startTime: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * session.duration * 60 * 1000) : null,
            endTime: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * session.duration * 60 * 1000) : null
          });
        }

        const recordings: Recording[] = [];
        if (Math.random() > 0.3) {
          recordings.push({
            id: `recording-${index}`,
            name: `${session.name} Recording`,
            url: `https://recordings.company.com/${session.name.toLowerCase().replace(' ', '-')}`,
            duration: session.duration,
            quality: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
            size: Math.floor(Math.random() * 1000000000) + 100000000,
            createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
            transcript: 'Auto-generated transcript of the session...'
          });
        }

        const notes: Note[] = [];
        const noteCount = Math.floor(Math.random() * 10) + 3;
        
        for (let i = 0; i < noteCount; i++) {
          const types: Note['type'][] = ['action', 'decision', 'idea', 'question'];
          const priorities: Note['priority'][] = ['low', 'medium', 'high'];
          
          notes.push({
            id: `note-${index}-${i}`,
            content: `Note ${i + 1}: Important discussion point`,
            author: participants[Math.floor(Math.random() * participants.length)].name,
            timestamp: new Date(Date.now() - Math.random() * session.duration * 60 * 1000),
            type: types[Math.floor(Math.random() * types.length)],
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            assignedTo: Math.random() > 0.5 ? participants[Math.floor(Math.random() * participants.length)].name : null
          });
        }

        const outcomes: Outcome[] = [];
        const outcomeCount = Math.floor(Math.random() * 5) + 1;
        
        for (let i = 0; i < outcomeCount; i++) {
          const types: Outcome['type'][] = ['decision', 'action', 'follow-up', 'blocker'];
          const priorities: Outcome['priority'][] = ['low', 'medium', 'high', 'urgent'];
          const statuses: Outcome['status'][] = ['pending', 'in-progress', 'completed'];
          
          outcomes.push({
            id: `outcome-${index}-${i}`,
            title: `Outcome ${i + 1}`,
            description: `Action item or decision from the session`,
            type: types[Math.floor(Math.random() * types.length)],
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            assignedTo: participants[Math.floor(Math.random() * participants.length)].name,
            dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
            status: statuses[Math.floor(Math.random() * statuses.length)]
          });
        }

        const startTime = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
        const endTime = new Date(startTime.getTime() + session.duration * 60 * 1000);

        return {
          id: `session-${index}`,
          ...session,
          participants,
          agenda,
          recordings,
          notes,
          outcomes,
          startTime,
          endTime
        };
      });
    };

    const generateTemplates = (): CollaborationTemplate[] => {
      const templateData = [
        {
          name: 'Daily Standup',
          description: 'Daily team synchronization meeting',
          type: 'meeting',
          duration: 15,
          participants: 8,
          tools: ['Video call', 'Screen sharing', 'Chat'],
          bestPractices: ['Keep it brief', 'Focus on blockers', 'Update progress']
        },
        {
          name: 'Sprint Planning',
          description: 'Sprint planning and backlog refinement',
          type: 'meeting',
          duration: 120,
          participants: 12,
          tools: ['Video call', 'Shared board', 'Documentation'],
          bestPractices: ['Prepare backlog', 'Estimate stories', 'Set goals']
        },
        {
          name: 'Design Review',
          description: 'Design review and feedback session',
          type: 'review',
          duration: 60,
          participants: 6,
          tools: ['Screen sharing', 'Design tools', 'Feedback forms'],
          bestPractices: ['Share designs early', 'Provide constructive feedback', 'Document decisions']
        },
        {
          name: 'Retrospective',
          description: 'Team retrospective and improvement planning',
          type: 'workshop',
          duration: 90,
          participants: 10,
          tools: ['Whiteboard', 'Sticky notes', 'Voting'],
          bestPractices: ['Create safe space', 'Focus on process', 'Action items']
        },
        {
          name: 'Training Session',
          description: 'Team training and knowledge sharing',
          type: 'training',
          duration: 180,
          participants: 15,
          tools: ['Presentation', 'Hands-on practice', 'Q&A'],
          bestPractices: ['Prepare materials', 'Interactive format', 'Follow-up resources']
        },
        {
          name: 'Brainstorming',
          description: 'Creative brainstorming and ideation',
          type: 'brainstorm',
          duration: 90,
          participants: 8,
          tools: ['Whiteboard', 'Mind mapping', 'Timer'],
          bestPractices: ['No criticism', 'Quantity over quality', 'Build on ideas']
        }
      ];

      return templateData.map((template, index) => ({
        id: `template-${index}`,
        ...template,
        agenda: Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, i) => ({
          id: `template-agenda-${i}`,
          title: `Template Agenda ${i + 1}`,
          description: `Template agenda item ${i + 1}`,
          duration: Math.floor(Math.random() * 30) + 10
        }))
      }));
    };

    const generateMetrics = (): CollaborationMetric[] => {
      const metricData = [
        {
          metric: 'Meeting Effectiveness',
          value: 78.5,
          trend: 'up' as const,
          period: '30d',
          target: 80
        },
        {
          metric: 'Participant Engagement',
          value: 85.2,
          trend: 'stable' as const,
          period: '30d',
          target: 85
        },
        {
          metric: 'Action Item Completion',
          value: 72.1,
          trend: 'up' as const,
          period: '30d',
          target: 75
        },
        {
          metric: 'Meeting Duration Efficiency',
          value: 68.9,
          trend: 'down' as const,
          period: '30d',
          target: 70
        },
        {
          metric: 'Collaboration Satisfaction',
          value: 91.3,
          trend: 'up' as const,
          period: '30d',
          target: 90
        }
      ];

      return metricData.map((metric, index) => ({
        id: `metric-${index}`,
        ...metric
      }));
    };

    setSessions(generateSessions());
    setTemplates(generateTemplates());
    setMetrics(generateMetrics());
  }, []);

  const filteredSessions = sessions.filter(session => 
    (selectedType === 'all' || session.type === selectedType) &&
    (selectedStatus === 'all' || session.status === selectedStatus)
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'brainstorm': return 'bg-purple-100 text-purple-800';
      case 'review': return 'bg-orange-100 text-orange-800';
      case 'training': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string): string => {
    switch (role) {
      case 'host': return 'bg-red-100 text-red-800';
      case 'participant': return 'bg-blue-100 text-blue-800';
      case 'observer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getParticipantStatusColor = (status: string): string => {
    switch (status) {
      case 'attending': return 'bg-green-100 text-green-800';
      case 'invited': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'left': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNoteTypeColor = (type: string): string => {
    switch (type) {
      case 'action': return 'bg-blue-100 text-blue-800';
      case 'decision': return 'bg-green-100 text-green-800';
      case 'idea': return 'bg-purple-100 text-purple-800';
      case 'question': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOutcomeTypeColor = (type: string): string => {
    switch (type) {
      case 'decision': return 'bg-green-100 text-green-800';
      case 'action': return 'bg-blue-100 text-blue-800';
      case 'follow-up': return 'bg-yellow-100 text-yellow-800';
      case 'blocker': return 'bg-red-100 text-red-800';
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

  const getTrendIcon = (trend: string): string => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string): string => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const createSession = async () => {
    setIsCreatingSession(true);
    
    // Simulate session creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newSession: CollaborationSession = {
      id: `session-${Date.now()}`,
      name: 'New Collaboration Session',
      type: 'meeting',
      description: 'Custom collaboration session',
      participants: [],
      startTime: new Date(),
      endTime: new Date(Date.now() + 60 * 60 * 1000),
      duration: 60,
      status: 'scheduled',
      agenda: [],
      recordings: [],
      notes: [],
      outcomes: []
    };

    setSessions(prev => [newSession, ...prev]);
    setIsCreatingSession(false);
  };

  const startSession = async (sessionId: string) => {
    setIsStartingSession(true);
    
    // Simulate session start
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'active' as const }
        : session
    ));
    
    setIsStartingSession(false);
  };

  const types = [
    { key: 'all', label: 'All Types', count: sessions.length },
    { key: 'meeting', label: 'Meetings', count: sessions.filter(s => s.type === 'meeting').length },
    { key: 'workshop', label: 'Workshops', count: sessions.filter(s => s.type === 'workshop').length },
    { key: 'brainstorm', label: 'Brainstorms', count: sessions.filter(s => s.type === 'brainstorm').length },
    { key: 'review', label: 'Reviews', count: sessions.filter(s => s.type === 'review').length },
    { key: 'training', label: 'Training', count: sessions.filter(s => s.type === 'training').length }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🤝 Advanced Collaboration Tools</h2>
              <p className="text-teal-100 mt-1">Enhanced team collaboration and meeting management</p>
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
                  <p className="text-sm text-blue-600 font-medium">Active Sessions</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {sessions.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <div className="text-3xl">🎥</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Total Sessions</p>
                  <p className="text-2xl font-bold text-green-800">{sessions.length}</p>
                </div>
                <div className="text-3xl">📅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Templates</p>
                  <p className="text-2xl font-bold text-purple-800">{templates.length}</p>
                </div>
                <div className="text-3xl">📋</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Participants</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {sessions.reduce((sum, s) => sum + s.participants.length, 0)}
                  </p>
                </div>
                <div className="text-3xl">👥</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Avg Duration</p>
                  <p className="text-2xl font-bold text-red-800">
                    {formatDuration(Math.floor(sessions.reduce((sum, s) => sum + s.duration, 0) / sessions.length))}
                  </p>
                </div>
                <div className="text-3xl">⏱️</div>
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
                    {types.map(type => (
                      <option key={type.key} value={type.key}>
                        {type.label} ({type.count})
                      </option>
                    ))}
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
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={createSession}
                  disabled={isCreatingSession}
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingSession ? '⏳ Creating...' : '➕ Create Session'}
                </button>
              </div>
            </div>
          </div>

          {/* Collaboration Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Collaboration Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{metric.metric}</h4>
                    <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium text-gray-900">{metric.value}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium text-blue-600">{metric.target}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Trend:</span>
                      <span className={`font-medium ${getTrendColor(metric.trend)}`}>
                        {metric.trend}
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-teal-500 h-2 rounded-full"
                          style={{ width: `${(metric.value / metric.target) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {((metric.value / metric.target) * 100).toFixed(0)}% of target
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collaboration Templates */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Collaboration Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div key={template.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{template.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(template.type)}`}>
                      {template.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-blue-600">{formatDuration(template.duration)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-medium text-green-600">{template.participants}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Agenda Items:</span>
                      <span className="font-medium text-purple-600">{template.agenda.length}</span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Tools:</div>
                      <div className="text-xs text-gray-600">
                        {template.tools.join(', ')}
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
              <h3 className="text-lg font-semibold text-gray-800">Collaboration Sessions ({filteredSessions.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{session.name}</div>
                          <div className="text-sm text-gray-500">{session.description}</div>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDuration(session.duration)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(session.startTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => startSession(session.id)}
                          disabled={isStartingSession || session.status !== 'scheduled'}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                        >
                          {isStartingSession ? 'Starting...' : 'Start'}
                        </button>
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
