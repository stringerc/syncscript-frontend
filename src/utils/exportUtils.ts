// Data Export Utilities for SyncScript

interface Task {
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

interface EnergyLog {
  id: string;
  energy_level: number;
  created_at: string;
  notes?: string;
}

interface Project {
  id: string;
  name: string;
  color: string;
}

interface User {
  sub: string;
  email: string;
  name: string;
}

export interface ExportOptions {
  format: 'csv' | 'json' | 'pdf';
  includeCompleted: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

/**
 * Export tasks to CSV
 */
export function exportTasksToCSV(tasks: Task[], filename: string = 'syncscript-tasks.csv'): void {
  const headers = ['Title', 'Description', 'Priority', 'Energy', 'Status', 'Due Date', 'Project', 'Created', 'Completed'];
  
  const rows = tasks.map(task => [
    task.title,
    task.description || '',
    task.priority,
    task.energy_requirement,
    task.completed ? 'Completed' : 'Pending',
    task.due_date ? new Date(task.due_date).toLocaleDateString() : '',
    task.project_name || '',
    new Date(task.created_at).toLocaleDateString(),
    task.completed_at ? new Date(task.completed_at).toLocaleDateString() : ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  downloadFile(csvContent, filename, 'text/csv');
}

/**
 * Export tasks to JSON
 */
export function exportTasksToJSON(tasks: Task[] | object[], filename: string = 'syncscript-tasks.json'): void {
  const jsonContent = JSON.stringify(tasks, null, 2);
  downloadFile(jsonContent, filename, 'application/json');
}

/**
 * Export analytics data to CSV
 */
export function exportAnalyticsToCSV(analytics: Record<string, string | number>, filename: string = 'syncscript-analytics.csv'): void {
  const data = [
    ['Metric', 'Value'],
    ['Total Tasks', analytics.totalTasks],
    ['Completed Tasks', analytics.completedTasks],
    ['Completion Rate', `${analytics.completionRate}%`],
    ['Average Energy', analytics.avgEnergy],
    ['Productivity Score', analytics.productivityScore],
    ['Current Streak', analytics.streak],
    ['Total Points', analytics.totalPoints]
  ];

  const csvContent = data.map(row => row.join(',')).join('\n');
  downloadFile(csvContent, filename, 'text/csv');
}

/**
 * Export energy logs to CSV
 */
export function exportEnergyLogsToCSV(energyLogs: EnergyLog[], filename: string = 'syncscript-energy.csv'): void {
  const headers = ['Date', 'Time', 'Energy Level', 'Notes'];
  
  const rows = energyLogs.map(log => [
    new Date(log.created_at).toLocaleDateString(),
    new Date(log.created_at).toLocaleTimeString(),
    log.energy_level,
    log.notes || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  downloadFile(csvContent, filename, 'text/csv');
}

/**
 * Create a comprehensive backup of all user data
 */
export function exportCompleteBackup(data: {
  tasks: Task[];
  projects: Project[];
  energyLogs: EnergyLog[];
  user: User;
}): void {
  const backup = {
    exportDate: new Date().toISOString(),
    version: '1.0.0',
    user: {
      id: data.user.sub,
      email: data.user.email,
      name: data.user.name
    },
    tasks: data.tasks,
    projects: data.projects,
    energyLogs: data.energyLogs,
    stats: {
      totalTasks: data.tasks.length,
      completedTasks: data.tasks.filter((t: Task) => t.completed).length,
      totalProjects: data.projects.length,
      totalEnergyLogs: data.energyLogs.length
    }
  };

  const filename = `syncscript-backup-${new Date().toISOString().split('T')[0]}.json`;
  exportTasksToJSON([backup], filename);
}

/**
 * Download file helper
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Filter tasks by date range
 */
export function filterTasksByDateRange(
  tasks: Task[],
  startDate?: Date,
  endDate?: Date
): Task[] {
  return tasks.filter(task => {
    const createdAt = new Date(task.created_at);
    
    if (startDate && createdAt < startDate) return false;
    if (endDate && createdAt > endDate) return false;
    
    return true;
  });
}

/**
 * Generate productivity report text
 */
export function generateProductivityReport(
  tasks: Task[],
  energyLogs: EnergyLog[],
  dateRange: { start: Date; end: Date }
): string {
  const completed = tasks.filter(t => t.completed).length;
  const completionRate = tasks.length > 0 ? (completed / tasks.length * 100).toFixed(1) : 0;
  const avgEnergy = energyLogs.length > 0 
    ? (energyLogs.reduce((sum: number, log) => sum + log.energy_level, 0) / energyLogs.length).toFixed(1)
    : 0;

  return `
SyncScript Productivity Report
Generated: ${new Date().toLocaleString()}
Period: ${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}

SUMMARY:
- Total Tasks: ${tasks.length}
- Completed: ${completed}
- Completion Rate: ${completionRate}%
- Average Energy: ${avgEnergy}/100

BREAKDOWN:
- High Priority: ${tasks.filter(t => t.priority >= 4).length}
- Medium Priority: ${tasks.filter(t => t.priority === 3).length}
- Low Priority: ${tasks.filter(t => t.priority <= 2).length}

ENERGY PATTERNS:
- Total Energy Logs: ${energyLogs.length}
- Average Energy Level: ${avgEnergy}
- Peak Energy: ${Math.max(...energyLogs.map(l => l.energy_level), 0)}
- Low Energy: ${Math.min(...energyLogs.map(l => l.energy_level), 100)}

Generated by SyncScript - Energy-Based Productivity Platform
  `.trim();
}
