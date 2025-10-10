import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { exportTasksToCSV, exportTasksToJSON, exportEnergyLogsToCSV, exportAnalyticsToCSV, exportCompleteBackup, filterTasksByDateRange, generateProductivityReport } from '../../utils/exportUtils';

interface DataExportTask {
  id: string;
  title: string;
  description?: string;
  priority: number;
  energy_requirement: number;
  completed: boolean;
  due_date?: string;
  project_name?: string;
  created_at: string;
  completed_at?: string;
}

interface DataExportProject {
  id: string;
  name: string;
  color: string;
}

interface DataExportEnergyLog {
  id: string;
  energy_level: number;
  created_at: string;
}

interface DataExportUser {
  sub: string;
  email: string;
  name: string;
}

interface DataExportProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: DataExportTask[];
  projects: DataExportProject[];
  energyLogs: DataExportEnergyLog[];
  user: DataExportUser;
}

const DataExport: React.FC<DataExportProps> = ({ 
  isOpen, 
  onClose, 
  tasks, 
  projects, 
  energyLogs, 
  user 
}) => {
  const [exportType, setExportType] = useState<'tasks' | 'energy' | 'analytics' | 'complete'>('tasks');
  const [format, setFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [includeCompleted, setIncludeCompleted] = useState(true);
  const [dateRange, setDateRange] = useState<'all' | 'week' | 'month' | 'custom'>('all');

  const handleExport = () => {
    try {
      let dataToExport = tasks;

      // Filter by date range
      if (dateRange === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        dataToExport = filterTasksByDateRange(tasks, weekAgo);
      } else if (dateRange === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        dataToExport = filterTasksByDateRange(tasks, monthAgo);
      }

      // Filter by completion status
      if (!includeCompleted) {
        dataToExport = dataToExport.filter(t => !t.completed);
      }

      // Export based on type
      switch (exportType) {
        case 'tasks':
          if (format === 'csv') {
            exportTasksToCSV(dataToExport);
          } else if (format === 'json') {
            exportTasksToJSON(dataToExport);
          }
          break;

        case 'energy':
          exportEnergyLogsToCSV(energyLogs);
          break;

        case 'analytics':
          const analytics = {
            totalTasks: tasks.length,
            completedTasks: tasks.filter(t => t.completed).length,
            completionRate: tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length * 100).toFixed(1) : 0,
            avgEnergy: energyLogs.length > 0 ? (energyLogs.reduce((sum: number, log: DataExportEnergyLog) => sum + log.energy_level, 0) / energyLogs.length).toFixed(1) : 0,
            productivityScore: 85, // Calculate this properly
            streak: 0, // Get from streak utils
            totalPoints: 0 // Get from gamification
          };
          exportAnalyticsToCSV(analytics);
          break;

        case 'complete':
          exportCompleteBackup({ tasks, projects, energyLogs, user });
          break;
      }

      toast.success(`✅ Exported ${exportType} successfully!`);
      onClose();
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="export-modal-overlay" onClick={onClose}>
          <motion.div
            className="export-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="export-modal-header">
              <h2>📊 Export Data</h2>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="export-modal-content">
              {/* Export Type */}
              <div className="export-section">
                <label>What to export:</label>
                <div className="export-options">
                  <button 
                    className={`option-btn ${exportType === 'tasks' ? 'active' : ''}`}
                    onClick={() => setExportType('tasks')}
                  >
                    📋 Tasks
                  </button>
                  <button 
                    className={`option-btn ${exportType === 'energy' ? 'active' : ''}`}
                    onClick={() => setExportType('energy')}
                  >
                    ⚡ Energy Logs
                  </button>
                  <button 
                    className={`option-btn ${exportType === 'analytics' ? 'active' : ''}`}
                    onClick={() => setExportType('analytics')}
                  >
                    📈 Analytics
                  </button>
                  <button 
                    className={`option-btn ${exportType === 'complete' ? 'active' : ''}`}
                    onClick={() => setExportType('complete')}
                  >
                    💾 Complete Backup
                  </button>
                </div>
              </div>

              {/* Format */}
              {exportType !== 'complete' && (
                <div className="export-section">
                  <label>Format:</label>
                  <div className="export-options">
                    <button 
                      className={`option-btn ${format === 'csv' ? 'active' : ''}`}
                      onClick={() => setFormat('csv')}
                    >
                      📄 CSV
                    </button>
                    <button 
                      className={`option-btn ${format === 'json' ? 'active' : ''}`}
                      onClick={() => setFormat('json')}
                    >
                      🔧 JSON
                    </button>
                  </div>
                </div>
              )}

              {/* Options */}
              {exportType === 'tasks' && (
                <>
                  <div className="export-section">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={includeCompleted}
                        onChange={(e) => setIncludeCompleted(e.target.checked)}
                      />
                      <span>Include completed tasks</span>
                    </label>
                  </div>

                  <div className="export-section">
                    <label>Date range:</label>
                    <select 
                      value={dateRange} 
                      onChange={(e) => setDateRange(e.target.value as 'all' | 'week' | 'month' | 'custom')}
                      className="date-range-select"
                    >
                      <option value="all">All time</option>
                      <option value="week">Last 7 days</option>
                      <option value="month">Last 30 days</option>
                    </select>
                  </div>
                </>
              )}

              {/* Preview */}
              <div className="export-preview">
                <h4>Preview:</h4>
                <p>
                  {exportType === 'tasks' && `${tasks.filter(t => includeCompleted || !t.completed).length} tasks`}
                  {exportType === 'energy' && `${energyLogs.length} energy logs`}
                  {exportType === 'analytics' && 'Productivity analytics summary'}
                  {exportType === 'complete' && 'Complete data backup (all tasks, projects, energy logs)'}
                </p>
              </div>
            </div>

            <div className="export-modal-footer">
              <button className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleExport}>
                <span>📥</span>
                <span>Export {format.toUpperCase()}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DataExport;
