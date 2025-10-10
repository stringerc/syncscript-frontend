import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/WorkloadBalancer.css';

interface WorkloadAnalysis {
  isOverloaded: boolean;
  workloadScore: number;
  recommendations: string[];
  tasksToDelegate: string[];
  tasksToReschedule: string[];
  suggestedActions: string[];
}

interface Task {
  completed: boolean;
  priority: number;
  estimated_duration?: number;
  [key: string]: unknown;
}

interface WorkloadBalancerProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  energyLevel: number;
  teamMembers?: Array<Record<string, unknown>>;
}

const WorkloadBalancer: React.FC<WorkloadBalancerProps> = ({ 
  isOpen, 
  onClose, 
  tasks, 
  energyLevel,
  teamMembers = []
}) => {
  const [analysis, setAnalysis] = useState<WorkloadAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      analyzeWorkload();
    }
  }, [isOpen]);

  const analyzeWorkload = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simple workload calculation
      const pendingTasks = tasks.filter(t => !t.completed);
      const highPriorityCount = pendingTasks.filter(t => t.priority >= 4).length;
      const totalEstimatedHours = pendingTasks.reduce((sum, t) => sum + (t.estimated_duration || 60), 0) / 60;
      
      const workloadScore = Math.min(100, (pendingTasks.length * 5) + (highPriorityCount * 10));
      const isOverloaded = workloadScore > 70 || totalEstimatedHours > 40;

      const mockAnalysis: WorkloadAnalysis = {
        isOverloaded,
        workloadScore,
        recommendations: [
          isOverloaded ? 'Consider delegating or rescheduling some tasks' : 'Your workload is manageable',
          energyLevel < 50 ? 'Your energy is low - focus on high-priority items only' : 'Good energy level for tackling challenging tasks',
          `You have ${totalEstimatedHours.toFixed(1)} hours of estimated work`
        ],
        tasksToDelegate: pendingTasks
          .filter(t => t.priority <= 3 && teamMembers.length > 0)
          .slice(0, 3)
          .map(t => t.id),
        tasksToReschedule: pendingTasks
          .filter(t => !t.due_date || new Date(t.due_date) > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
          .slice(0, 3)
          .map(t => t.id),
        suggestedActions: [
          'Break down large tasks into smaller subtasks',
          'Schedule focus blocks for high-priority work',
          'Delegate low-priority tasks to team members'
        ]
      };

      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Workload analysis error:', error);
      toast.error('Failed to analyze workload');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getWorkloadColor = (score: number): string => {
    if (score >= 80) return '#EF4444';
    if (score >= 60) return '#F59E0B';
    if (score >= 40) return '#3B82F6';
    return '#10B981';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="workload-overlay" onClick={onClose}>
          <motion.div
            className="workload-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="workload-header">
              <div>
                <h2>⚖️ Workload Balancer</h2>
                <p>AI-powered workload analysis</p>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="workload-content">
              {isAnalyzing ? (
                <div className="analyzing-state">
                  <div className="spinner"></div>
                  <p>Analyzing your workload...</p>
                </div>
              ) : analysis ? (
                <>
                  {/* Workload Score */}
                  <div className="workload-score-card">
                    <h3>Workload Score</h3>
                    <div 
                      className="score-display"
                      style={{ color: getWorkloadColor(analysis.workloadScore) }}
                    >
                      {analysis.workloadScore}/100
                    </div>
                    {analysis.isOverloaded && (
                      <div className="overload-badge">⚠️ Overloaded</div>
                    )}
                  </div>

                  {/* Recommendations */}
                  <div className="recommendations-section">
                    <h4>💡 Recommendations</h4>
                    {analysis.recommendations.map((rec, idx) => (
                      <div key={idx} className="recommendation-item">
                        <span className="rec-icon">→</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Suggested Actions */}
                  <div className="actions-section">
                    <h4>🚀 Suggested Actions</h4>
                    <div className="actions-grid">
                      {analysis.tasksToDelegate.length > 0 && (
                        <div className="action-card">
                          <h5>👥 Delegate ({analysis.tasksToDelegate.length})</h5>
                          <p>Free up time by delegating low-priority tasks</p>
                          <button className="btn btn-outline btn-sm">View Tasks</button>
                        </div>
                      )}

                      {analysis.tasksToReschedule.length > 0 && (
                        <div className="action-card">
                          <h5>📅 Reschedule ({analysis.tasksToReschedule.length})</h5>
                          <p>Move non-urgent tasks to later dates</p>
                          <button className="btn btn-outline btn-sm">View Tasks</button>
                        </div>
                      )}

                      <div className="action-card">
                        <h5>⚡ Energy Break</h5>
                        <p>Take a break to recharge</p>
                        <button className="btn btn-outline btn-sm">Start Break</button>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="tips-section">
                    <h4>📝 Pro Tips</h4>
                    <ul>
                      {analysis.suggestedActions.map((action, idx) => (
                        <li key={idx}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : null}
            </div>

            <div className="workload-footer">
              <button className="btn btn-ghost" onClick={analyzeWorkload}>
                🔄 Re-analyze
              </button>
              <button className="btn btn-primary" onClick={onClose}>
                Got It!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WorkloadBalancer;
