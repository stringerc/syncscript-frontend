import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import EnergySelector from '../src/components/ui/EnergySelector';
import TaskCard from '../src/components/ui/TaskCard';
import CreateTaskModal, { NewTaskData } from '../src/components/ui/CreateTaskModal';
import EnergyInsights from '../src/components/ui/EnergyInsights';
import UserStats from '../src/components/ui/UserStats';
import ProjectCard from '../src/components/ui/ProjectCard';
import CreateProjectModal from '../src/components/ui/CreateProjectModal';
import EditTaskModal from '../src/components/ui/EditTaskModal';
import TaskFilter from '../src/components/ui/TaskFilter';
import TaskSearch, { SortOption } from '../src/components/ui/TaskSearch';
import KeyboardHint from '../src/components/ui/KeyboardHint';
import StreakCounter from '../src/components/ui/StreakCounter';
import SaveTemplateModal from '../src/components/ui/SaveTemplateModal';
import TemplateLibrary from '../src/components/ui/TemplateLibrary';
import BulkActionToolbar from '../src/components/ui/BulkActionToolbar';
import FocusTimer from '../src/components/ui/FocusTimer';
import AdvancedAnalytics from '../src/components/ui/AdvancedAnalytics';
import ThemeSettings from '../src/components/ui/ThemeSettings';
import NotificationCenter from '../src/components/ui/NotificationCenter';
import InstallPWA from '../src/components/ui/InstallPWA';
import SmartSuggestions from '../src/components/ui/SmartSuggestions';
import AchievementGallery from '../src/components/ui/AchievementGallery';
import AchievementUnlockNotification from '../src/components/ui/AchievementUnlockNotification';
import DailyChallenges from '../src/components/ui/DailyChallenges';
import CalendarIntegration from '../src/components/ui/CalendarIntegration';
import TeamDashboard from '../src/components/ui/TeamDashboard';
import TeamInvitation from '../src/components/ui/TeamInvitation';
import { useAuthenticatedFetch } from '../src/hooks/useAuthenticatedFetch';
import { useNotifications } from '../src/hooks/useNotifications';
import { useAchievements } from '../src/hooks/useAchievements';
import { TaskTemplate, createTaskFromTemplate } from '../src/utils/templateUtils';
import { useKeyboardShortcuts } from '../src/hooks/useKeyboardShortcuts';
import { updateLoginStreak, updateCompletionStreak, getStreakData, checkNewMilestone } from '../src/utils/streakUtils';
import { Tag } from '../src/utils/tagUtils';
import { Subtask } from '../src/utils/subtaskUtils';
import { TaskNote } from '../src/utils/noteUtils';
import { RecurrenceConfig, calculateNextDueDate, shouldEndRecurrence } from '../src/utils/recurrenceUtils';
import { checkQuickWins, saveQuickWinPoints } from '../src/utils/quickWinBadges';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energy_requirement: 1 | 2 | 3 | 4 | 5;
  completed: boolean;
  points: number;
  created_at: string;
  due_date?: string;
  estimated_duration?: number;
  project_id?: string;
  project?: {
    id: string;
    name: string;
    color: string;
  };
  tags?: Tag[];
  subtasks?: Subtask[];
  notes?: TaskNote[];
  recurrence?: RecurrenceConfig;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  created_at: string;
  updated_at: string;
  archived: boolean;
}

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const authenticatedFetch = useAuthenticatedFetch();
  
  const [currentEnergy, setCurrentEnergy] = React.useState(3);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [energyLogs, setEnergyLogs] = React.useState<Array<{ level: number; timestamp: string }>>([]);
  const [userPoints, setUserPoints] = React.useState(0);
  const [userLevel, setUserLevel] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);
  const [filterProjectId, setFilterProjectId] = React.useState<string | null>(null);
  const [filterTag, setFilterTag] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState<SortOption>('energy_match');
  const [streakData, setStreakData] = React.useState(getStreakData());
  const [showMilestoneConfetti, setShowMilestoneConfetti] = React.useState(false);
  const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = React.useState(false);
  const [templateTaskData, setTemplateTaskData] = React.useState<{
    title: string;
    description?: string;
    priority: 1 | 2 | 3 | 4 | 5;
    energy_requirement: 1 | 2 | 3 | 4 | 5;
    estimated_duration?: number;
    project_id?: string;
    tags?: Tag[];
  } | null>(null);
  const [templateRefresh, setTemplateRefresh] = React.useState(0);
  const [selectedTaskIds, setSelectedTaskIds] = React.useState<Set<string>>(new Set());
  const [focusTaskId, setFocusTaskId] = React.useState<string | null>(null);
  const [focusTaskTitle, setFocusTaskTitle] = React.useState<string>('');
  const [showAnalytics, setShowAnalytics] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [showThemeSettings, setShowThemeSettings] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showAchievements, setShowAchievements] = React.useState(false);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [focusSessionsCount, setFocusSessionsCount] = React.useState(0);
  const [totalFocusMinutes, setTotalFocusMinutes] = React.useState(0);
  const [showTeamDashboard, setShowTeamDashboard] = React.useState(false);
  const [showTeamInvitation, setShowTeamInvitation] = React.useState(false);

  // Notifications
  const {
    notifications,
    unreadCount,
    preferences: notificationPreferences,
    updatePreferences: updateNotificationPreferences,
    markAsRead,
    deleteNotification: deleteNotif,
    clearAll: clearAllNotifications
  } = useNotifications(tasks, currentEnergy, streakData);

  // Achievements
  const {
    unlockedAchievements,
    newlyUnlocked,
    achievementProgress,
    totalPoints: achievementPoints,
    completionPercentage: achievementCompletion,
    totalAchievements,
    unlockedCount,
    clearNewlyUnlocked
  } = useAchievements({
    tasks,
    energyLogs,
    projects,
    currentStreak: streakData.loginStreak,
    focusSessions: focusSessionsCount,
    focusMinutes: totalFocusMinutes
  });

  // Keyboard shortcuts for power users
  useKeyboardShortcuts({
    onNewTask: () => setIsCreateModalOpen(true),
    onNewProject: () => setIsCreateProjectModalOpen(true),
    onFocusSearch: () => {
      const searchInput = document.querySelector('.search-input') as HTMLInputElement;
      searchInput?.focus();
    },
    onEscapePressed: () => {
      setIsCreateModalOpen(false);
      setIsCreateProjectModalOpen(false);
      setIsEditTaskModalOpen(false);
      setShowThemeSettings(false);
      setShowAchievements(false);
      setShowSuggestions(false);
    },
    onQuickEnergy: (level) => {
      handleEnergyChange(level);
    },
    onOpenAchievements: () => setShowAchievements(prev => !prev),
    onOpenSuggestions: () => setShowSuggestions(true),
    onOpenTheme: () => setShowThemeSettings(true),
    onOpenAnalytics: () => setShowAnalytics(prev => !prev)
  });

  // Load user data on mount - PARALLELIZED for 3x faster loading!
  const loadUserData = React.useCallback(async () => {
    try {
      setLoading(true);
      
      // Load all data in parallel for maximum speed
      const [tasksResponse, projectsResponse, energyResponse, energyLogsResponse] = await Promise.all([
        authenticatedFetch('/api/tasks'),
        authenticatedFetch('/api/projects'),
        authenticatedFetch('/api/energy/latest'),
        authenticatedFetch('/api/energy?limit=100')
      ]);

      // Process tasks
      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        setTasks(tasksData.tasks || []);
      }

      // Process projects
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        setProjects(projectsData.projects || []);
      }

      // Process latest energy
      if (energyResponse.ok) {
        const energyData = await energyResponse.json();
        if (energyData.energy) {
          setCurrentEnergy(energyData.energy.level);
        }
      }

      // Process energy logs
      if (energyLogsResponse.ok) {
        const logsData = await energyLogsResponse.json();
        if (logsData.logs) {
          setEnergyLogs(logsData.logs.map((log: { energy_level: number; logged_at: string }) => ({
            level: log.energy_level,
            timestamp: log.logged_at
          })));
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  }, [authenticatedFetch]);

  React.useEffect(() => {
    if (user && !isLoading) {
      loadUserData();
      
      // Safety timeout - if loading takes more than 10 seconds, force it to stop
      const loadingTimeout = setTimeout(() => {
        if (loading) {
          console.warn('Loading timeout - forcing completion');
          setLoading(false);
        }
      }, 10000);
      
      // Update login streak
      const oldStreak = streakData.loginStreak;
      const newStreakData = updateLoginStreak();
      setStreakData(newStreakData);
      
      // Check for milestone achievement
      const milestone = checkNewMilestone(oldStreak, newStreakData.loginStreak);
      if (milestone) {
        setShowMilestoneConfetti(true);
        toast.success(`${milestone.emoji} ${milestone.label} Login Streak! ${newStreakData.loginStreak} days!`, {
          duration: 5000,
          icon: milestone.emoji
        });
        setTimeout(() => setShowMilestoneConfetti(false), 3000);
      }

      return () => clearTimeout(loadingTimeout);
    }
  }, [user, isLoading, loadUserData]);

  // Load focus session data from localStorage
  React.useEffect(() => {
    const savedSessions = localStorage.getItem('focusSessions');
    const savedMinutes = localStorage.getItem('focusMinutes');
    
    if (savedSessions) {
      setFocusSessionsCount(parseInt(savedSessions, 10) || 0);
    }
    if (savedMinutes) {
      setTotalFocusMinutes(parseInt(savedMinutes, 10) || 0);
    }
  }, []);

  const handleEnergyChange = async (energy: number) => {
    const previousEnergy = currentEnergy;
    setCurrentEnergy(energy);
    
    const energyLabels = ['', 'Low', 'Medium-Low', 'Medium', 'High', 'Peak'];
    
    try {
      // Log energy to backend
      const response = await authenticatedFetch('/api/energy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          energy_level: energy,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        toast.success(`Energy updated to ${energyLabels[energy]}! 🎯`, {
          duration: 3000,
          icon: '⚡',
        });
        
        // Add the new energy log to state
        if (data.energy_log) {
          setEnergyLogs(prev => [...prev, {
            level: data.energy_log.energy_level,
            timestamp: data.energy_log.logged_at
          }]);
        }
      }
    } catch (error) {
      console.error('Error logging energy:', error);
      setCurrentEnergy(previousEnergy); // Revert on error
      toast.error('Failed to update energy level. Please try again.', {
        duration: 4000,
      });
    }
  };

  const handleTaskComplete = async (taskId: string) => {
    try {
      const completedTask = tasks.find(t => t.id === taskId);
      
      const response = await authenticatedFetch(`/api/tasks/${taskId}/complete`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Update local state
        setTasks(prev => prev.map(task => 
          task.id === taskId ? { ...task, completed: true } : task
        ));
        
        // Check for quick wins!
        const quickWins = checkQuickWins(
          {
            completed_at: new Date().toISOString(),
            created_at: completedTask?.created_at,
            project_id: completedTask?.project_id
          },
          tasks,
          energyLogs
        );

        // Show quick win badges
        if (quickWins.length > 0) {
          const totalQuickWinPoints = quickWins.reduce((sum, win) => sum + win.points, 0);
          saveQuickWinPoints(totalQuickWinPoints);
          setUserPoints(prev => prev + totalQuickWinPoints);

          // Show each quick win
          quickWins.forEach((win, index) => {
            setTimeout(() => {
              toast.success(`${win.emoji} ${win.title}! ${win.message} +${win.points}pts`, {
                duration: 3000,
                style: {
                  background: 'linear-gradient(135deg, #4A90E2 0%, #7ED321 100%)',
                  color: 'white',
                  fontWeight: 'bold'
                }
              });
            }, index * 800); // Stagger the notifications
          });
        }

        toast.success(`Task completed! +${data.points_earned} points earned! 🎉`, {
          duration: 4000,
          icon: '✅',
        });

        // Handle recurring task - create next instance
        if (completedTask?.recurrence && completedTask.recurrence.frequency !== 'none' && completedTask.recurrence.is_active) {
          setTimeout(async () => {
            try {
              const nextDueDate = completedTask.due_date 
                ? calculateNextDueDate(completedTask.due_date, completedTask.recurrence!)
                : new Date();
              
              // Check if recurrence should continue
              if (!shouldEndRecurrence(completedTask.recurrence!, nextDueDate)) {
                // Create next instance - build clean object
                const nextTaskData: NewTaskData = {
                  title: completedTask.title,
                  priority: completedTask.priority,
                  energy_requirement: completedTask.energy_requirement,
                  recurrence: completedTask.recurrence
                };
                
                // Only add optional fields if they exist
                if (completedTask.description) nextTaskData.description = completedTask.description;
                if (completedTask.estimated_duration) nextTaskData.estimated_duration = completedTask.estimated_duration;
                if (completedTask.project_id) nextTaskData.project_id = completedTask.project_id;
                if (completedTask.tags && completedTask.tags.length > 0) nextTaskData.tags = completedTask.tags;
                
                // Set next due date
                nextTaskData.due_date = nextDueDate.toISOString();
                
                await handleCreateTask(nextTaskData);
                
                toast.success(`🔄 Next "${completedTask.title}" task created!`, {
                  duration: 3000,
                  icon: '🔄',
                });
              }
            } catch (error) {
              console.error('Error creating recurring task:', error);
              toast.error('Failed to create next recurring task');
            }
          }, 500); // Small delay to avoid race conditions
        }

        // Update completion streak
        const oldCompletionStreak = streakData.completionStreak;
        const newStreakData = updateCompletionStreak();
        setStreakData(newStreakData);
        
        // Check for completion streak milestone
        const milestone = checkNewMilestone(oldCompletionStreak, newStreakData.completionStreak);
        if (milestone) {
          setTimeout(() => {
            toast.success(`${milestone.emoji} ${milestone.label} Completion Streak! ${newStreakData.completionStreak} days!`, {
              duration: 5000,
              icon: milestone.emoji
            });
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error completing task:', error);
      toast.error('Failed to complete task. Please try again.');
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      const response = await authenticatedFetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        toast.success('Task deleted successfully', {
          icon: '🗑️',
        });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again.');
    }
  };

  const handleTaskEdit = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setIsEditTaskModalOpen(true);
    }
  };

  const handleTaskEditSuccess = async () => {
    try {
      // Only reload tasks, not everything
      const response = await authenticatedFetch('/api/tasks');
      
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks || []);
      }
    } catch (error) {
      console.error('Error reloading tasks:', error);
    }
  };

  const handleCreateTask = async (taskData: NewTaskData) => {
    try {
      const response = await authenticatedFetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Add new task to the list
        setTasks(prev => [data.task, ...prev]);
        
        toast.success('Task created successfully! 🎉', {
          duration: 3000,
          icon: '✨',
        });
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task. Please try again.');
      throw error; // Re-throw to keep modal open on error
    }
  };

  const handleCreateProject = () => {
    setIsCreateProjectModalOpen(true);
    setEditingProject(null);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsCreateProjectModalOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await authenticatedFetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Project deleted successfully! 🗑️', {
          duration: 3000,
          icon: '📁',
        });
        
        // Reload projects
        loadUserData();
        
        // Clear selection if this project was selected
        if (selectedProject?.id === projectId) {
          setSelectedProject(null);
        }
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project. Please try again.', {
        duration: 4000,
      });
    }
  };

  const handleProjectSuccess = async () => {
    try {
      // Only reload projects, not everything
      const response = await authenticatedFetch('/api/projects');
      
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Error reloading projects:', error);
    }
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setFilterProjectId(project.id);
  };

  const handleFilterChange = (projectId: string | null) => {
    setFilterProjectId(projectId);
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      setSelectedProject(project || null);
    } else {
      setSelectedProject(null);
    }
  };

  const handleSaveAsTemplate = (task: Task) => {
    setTemplateTaskData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      energy_requirement: task.energy_requirement,
      estimated_duration: task.estimated_duration,
      project_id: task.project_id,
      tags: task.tags
    });
    setIsSaveTemplateModalOpen(true);
  };

  const handleUseTemplate = async (template: TaskTemplate) => {
    try {
      const taskData = createTaskFromTemplate(template);
      await handleCreateTask(taskData);
    } catch (error) {
      console.error('Error creating task from template:', error);
      toast.error('Failed to create task from template');
    }
  };

  // Bulk selection handlers
  const handleToggleSelect = (taskId: string) => {
    setSelectedTaskIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    const allTaskIds = activeTasks.map(t => t.id);
    setSelectedTaskIds(new Set(allTaskIds));
  };

  const handleClearSelection = () => {
    setSelectedTaskIds(new Set());
  };

  const handleBulkComplete = async () => {
    const count = selectedTaskIds.size;
    if (count === 0) return;

    try {
      // Complete all selected tasks in parallel
      await Promise.all(
        Array.from(selectedTaskIds).map(taskId =>
          authenticatedFetch(`/api/tasks/${taskId}/complete`, {
            method: 'POST',
          })
        )
      );

      // Update local state
      setTasks(prev => prev.map(task => 
        selectedTaskIds.has(task.id) ? { ...task, completed: true } : task
      ));

      toast.success(`${count} task${count > 1 ? 's' : ''} completed! 🎉`, {
        duration: 3000,
        icon: '✅',
      });

      setSelectedTaskIds(new Set());
    } catch (error) {
      console.error('Error completing tasks:', error);
      toast.error('Failed to complete some tasks');
    }
  };

  const handleBulkDelete = async () => {
    const count = selectedTaskIds.size;
    if (count === 0) return;

    if (!confirm(`Delete ${count} task${count > 1 ? 's' : ''}? This cannot be undone.`)) {
      return;
    }

    try {
      // Delete all selected tasks in parallel
      await Promise.all(
        Array.from(selectedTaskIds).map(taskId =>
          authenticatedFetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
          })
        )
      );

      // Update local state
      setTasks(prev => prev.filter(task => !selectedTaskIds.has(task.id)));

      toast.success(`${count} task${count > 1 ? 's' : ''} deleted`, {
        icon: '🗑️',
      });

      setSelectedTaskIds(new Set());
    } catch (error) {
      console.error('Error deleting tasks:', error);
      toast.error('Failed to delete some tasks');
    }
  };

  const handleStartFocus = (taskId: string, taskTitle: string) => {
    setFocusTaskId(taskId);
    setFocusTaskTitle(taskTitle);
  };

  const handleFocusComplete = () => {
    // Track focus session for achievements
    setFocusSessionsCount(prev => prev + 1);
    setTotalFocusMinutes(prev => prev + 25); // Pomodoro is 25 minutes
    
    // Save to localStorage for persistence
    localStorage.setItem('focusSessions', String(focusSessionsCount + 1));
    localStorage.setItem('focusMinutes', String(totalFocusMinutes + 25));
    
    // Track today's focus sessions for daily challenges
    const today = new Date().toDateString();
    const todaySessionsStr = localStorage.getItem('todayFocusSessions');
    const todayDate = localStorage.getItem('focusSessionsDate');
    
    if (todayDate === today) {
      const count = parseInt(todaySessionsStr || '0', 10) + 1;
      localStorage.setItem('todayFocusSessions', String(count));
    } else {
      localStorage.setItem('todayFocusSessions', '1');
      localStorage.setItem('focusSessionsDate', today);
    }
    
    toast.success('Focus session saved! Great work! 🎯', {
      duration: 3000,
      icon: '✅',
    });
    setFocusTaskId(null);
    setFocusTaskTitle('');
  };

  const handleFocusCancel = () => {
    setFocusTaskId(null);
    setFocusTaskTitle('');
  };

  const handleBulkMove = async (projectId: string | null) => {
    const count = selectedTaskIds.size;
    if (count === 0) return;

    try {
      // Move all selected tasks in parallel
      await Promise.all(
        Array.from(selectedTaskIds).map(taskId =>
          authenticatedFetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({ project_id: projectId }),
          })
        )
      );

      // Reload tasks to get updated project info
      const response = await authenticatedFetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks || []);
      }

      const projectName = projectId 
        ? projects.find(p => p.id === projectId)?.name || 'project'
        : 'No Project';

      toast.success(`${count} task${count > 1 ? 's' : ''} moved to ${projectName}! 📁`, {
        duration: 3000,
      });

      setSelectedTaskIds(new Set());
    } catch (error) {
      console.error('Error moving tasks:', error);
      toast.error('Failed to move some tasks');
    }
  };

  // Calculate stats from tasks
  const allActiveTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  // Apply filters first (for proper counts)
  const filteredTasks = React.useMemo(() => {
    let filtered = allActiveTasks;
    
    // Apply project filter
    if (filterProjectId) {
      if (filterProjectId === 'none') {
        filtered = filtered.filter(task => !task.project_id);
      } else {
        filtered = filtered.filter(task => task.project_id === filterProjectId);
      }
    }
    
    // Apply tag filter
    if (filterTag) {
      filtered = filtered.filter(task => 
        task.tags?.some(tag => tag.label === filterTag)
      );
    }
    
    return filtered;
  }, [allActiveTasks, filterProjectId, filterTag]);

  // Apply search and sort to filtered tasks
  const activeTasks = React.useMemo(() => {
    let filtered = filteredTasks;

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        (task.description?.toLowerCase().includes(query))
      );
    }

    // Apply sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return b.priority - a.priority;
        case 'due_date':
          if (!a.due_date && !b.due_date) return 0;
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        case 'points':
          return b.points - a.points;
        case 'energy_match':
          const matchA = Math.abs(a.energy_requirement - currentEnergy);
          const matchB = Math.abs(b.energy_requirement - currentEnergy);
          if (matchA === matchB) return b.priority - a.priority;
          return matchA - matchB;
        case 'created_at':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    return sorted;
  }, [filteredTasks, searchQuery, sortBy, currentEnergy]);

  // Calculate task counts for filter (only active tasks, no search applied)
  const taskCounts = React.useMemo(() => {
    const counts = {
      all: allActiveTasks.length,
      noProject: allActiveTasks.filter(t => !t.project_id).length,
      byProject: {} as { [key: string]: number }
    };
    
    projects.forEach(project => {
      counts.byProject[project.id] = allActiveTasks.filter(t => t.project_id === project.id).length;
    });
    
    return counts;
  }, [allActiveTasks, projects]);
  const totalPoints = completedTasks.reduce((sum, task) => sum + (task.points || 0), 0);
  const calculatedLevel = Math.floor(totalPoints / 1000) + 1;

  // Update points and level when tasks change
  React.useEffect(() => {
    setUserPoints(totalPoints);
    setUserLevel(calculatedLevel);
  }, [totalPoints, calculatedLevel]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-syncscript-cream-50">
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #4A90E2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }}></div>
          <div style={{
            fontSize: '18px',
            color: '#4B5563',
            margin: '0',
            fontWeight: '500',
            transform: 'none !important',
            animation: 'none !important'
          }}>Loading your SyncScript dashboard...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <motion.header 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="header-content">
          {/* Left Side - Title and Welcome */}
          <div className="header-left">
            <h1 className="dashboard-title">
              <span className="title-gradient">SyncScript</span>
            </h1>
            <p className="dashboard-subtitle">
              Welcome back, {user.name || user.email}!
            </p>
          </div>
          
          {/* Right Side - Stats and Actions */}
          <div className="header-right">
            {/* Stats Row - Compact and Clean */}
            <div className="header-stats-compact">
              {/* Level Progress - Prominent */}
              <div className="level-progress-card">
                <div className="level-info">
                  <span className="level-badge">
                    Level {userLevel}
                    {unlockedCount > 0 && (
                      <span className="mini-trophy" title={`${unlockedCount} achievements unlocked`}>
                        🏆
                      </span>
                    )}
                  </span>
                  <span className="points-text">⚡ {userPoints} pts</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(userPoints % 1000) / 10}%` }}
                  />
                </div>
              </div>
              
              {/* Compact Stats */}
              <div className="compact-stats">
                <div className="stat-item">
                  <span className="stat-icon">✅</span>
                  <span className="stat-text">{completedTasks.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🔥</span>
                  <span className="stat-text">{streakData.loginStreak}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">📋</span>
                  <span className="stat-text">{tasks.filter(t => !t.completed).length}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="header-actions">
              <button
                className="btn btn-secondary notif-btn"
                onClick={() => setShowNotifications(true)}
                style={{ position: 'relative', overflow: 'visible' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                {unreadCount > 0 && (
                  <span 
                    className="notif-count"
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      minWidth: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#ef4444',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '0 5px',
                      zIndex: 9999,
                      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
                      border: '2px solid white',
                      pointerEvents: 'none'
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowCalendar(true)}
                title="Connect your calendar"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Calendar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowTeamDashboard(true)}
                title="Team collaboration"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Team
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setShowSuggestions(true)}
                title="Get AI-powered task suggestions"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                </svg>
                Suggestions
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowAchievements(!showAchievements)}
                title="View your achievements"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <circle cx="12" cy="8" r="7"/>
                  <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
                </svg>
                Achievements
                {unlockedCount > 0 && (
                  <span className="achievement-badge">{unlockedCount}</span>
                )}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
                Analytics
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowThemeSettings(true)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
                </svg>
                Theme
              </button>
              <Link href="/api/auth/logout" className="btn btn-ghost">
                <svg className="neural-icon" viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" fill="none" />
                  <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" fill="none" />
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Analytics Dashboard */}
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: 'var(--space-6)' }}
          >
            <AdvancedAnalytics 
              tasks={tasks}
              energyLogs={energyLogs}
              projects={projects}
              authenticatedFetch={authenticatedFetch}
            />
          </motion.div>
        )}

        {/* Achievement Gallery */}
        {showAchievements && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: 'var(--space-6)' }}
          >
            <AchievementGallery
              achievementProgress={achievementProgress}
              unlockedCount={unlockedCount}
              totalPoints={achievementPoints}
              completionPercentage={achievementCompletion}
            />
          </motion.div>
        )}

        {/* Energy Selector Section */}
        <motion.section 
          className="dashboard-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <div className="section-header">
            <h2 className="section-title">Current Energy Level</h2>
            <p className="section-description">
              Select your current energy to see tasks matched to your capacity
            </p>
          </div>
          
          <EnergySelector
            currentEnergy={currentEnergy}
            onEnergyChange={handleEnergyChange}
            className="dashboard-energy-selector"
          />

          {/* Daily Challenges */}
          <DailyChallenges
            tasks={tasks}
            energyLogs={energyLogs}
            focusSessions={focusSessionsCount}
            currentStreak={streakData.loginStreak}
            onChallengeComplete={(challenge, points) => {
              setUserPoints(prev => prev + points);
              toast.success(`🎉 Challenge Complete! +${points} bonus points!`, {
                duration: 4000
              });
            }}
          />

          {/* Energy Insights */}
          {energyLogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              style={{ marginTop: 'var(--space-6)' }}
            >
              <EnergyInsights
                energyLogs={energyLogs}
                currentEnergy={currentEnergy}
              />
            </motion.div>
          )}
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          className="dashboard-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <div className="section-header">
            <div>
              <h2 className="section-title">Projects</h2>
              <p className="section-description">
                Organize your tasks into projects for better focus
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleCreateProject}
            >
              <svg className="neural-icon" viewBox="0 0 24 24">
                <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              New Project
            </button>
          </div>

          {projects.length > 0 ? (
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                  onSelect={handleProjectSelect}
                  isSelected={selectedProject?.id === project.id}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2z"/>
                  <path d="M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8V5z"/>
                </svg>
              </div>
              <h3 className="empty-title">No projects yet</h3>
              <p className="empty-description">
                Create your first project to organize your tasks
              </p>
              <button
                className="btn btn-primary"
                onClick={handleCreateProject}
              >
                <svg className="neural-icon" viewBox="0 0 24 24">
                  <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                Create Project
              </button>
            </div>
          )}
        </motion.section>

        {/* Active Tasks Section */}
        <motion.section 
          className="dashboard-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <div className="section-header">
            <div>
              <h2 className="section-title">Active Tasks</h2>
              <p className="section-description">
                Tasks matched to your current energy level ({currentEnergy}/5)
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <svg className="neural-icon" viewBox="0 0 24 24">
                <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              New Task
            </button>
          </div>

          {/* Template Library */}
          <TemplateLibrary 
            onUseTemplate={handleUseTemplate}
            refreshTrigger={templateRefresh}
          />

          {/* Task Filter and Tasks Grid Layout */}
          <div className="tasks-section-layout">
            {/* Filter Sidebar */}
            {(projects.length > 0 || allActiveTasks.length > 0) && (
              <div className="filter-sidebar">
                <TaskFilter
                  projects={projects}
                  selectedProjectId={filterProjectId}
                  onFilterChange={handleFilterChange}
                  taskCounts={taskCounts}
                  tasks={allActiveTasks}
                  selectedTag={filterTag}
                  onTagFilterChange={setFilterTag}
                />
              </div>
            )}

            {/* Tasks Content */}
            <div className="tasks-content">
              {/* Bulk Action Toolbar */}
              <BulkActionToolbar
                selectedCount={selectedTaskIds.size}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
                onBulkComplete={handleBulkComplete}
                onBulkDelete={handleBulkDelete}
                onBulkMove={handleBulkMove}
                projects={projects}
                totalCount={activeTasks.length}
              />

              {/* Search and Sort */}
              <TaskSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                resultsCount={activeTasks.length}
                totalCount={filteredTasks.length}
              />

              {activeTasks.length === 0 ? (
            <div className="empty-state card card-md">
              <div className="empty-icon">
                <svg className="neural-icon" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3 className="empty-title">No active tasks</h3>
              <p className="empty-description">
                Create your first task to get started with energy-matched productivity
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <svg className="neural-icon" viewBox="0 0 24 24">
                  <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                Create Task
              </button>
            </div>
          ) : (
            <div className="tasks-grid">
              {activeTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.6 + (index * 0.1),
                    ease: "easeOut"
                  }}
                >
                  <TaskCard
                    task={{
                      id: task.id,
                      title: task.title,
                      description: task.description,
                      priority: task.priority,
                      energyRequirement: task.energy_requirement,
                      energy_requirement: task.energy_requirement,
                      completed: task.completed,
                      points: task.points,
                      createdAt: task.created_at,
                      created_at: task.created_at,
                      dueDate: task.due_date,
                      estimatedDuration: task.estimated_duration,
                      estimated_duration: task.estimated_duration,
                      project_id: task.project_id,
                      project: task.project,
                      tags: task.tags,
                      subtasks: task.subtasks,
                      notes: task.notes,
                      recurrence: task.recurrence
                    }}
                    currentEnergy={currentEnergy}
                    onComplete={handleTaskComplete}
                    onDelete={handleTaskDelete}
                    onEdit={handleTaskEdit}
                    onSaveAsTemplate={handleSaveAsTemplate}
                    onStartFocus={handleStartFocus}
                    isSelected={selectedTaskIds.has(task.id)}
                    onToggleSelect={handleToggleSelect}
                  />
                </motion.div>
              ))}
            </div>
          )}
            </div>
          </div>
        </motion.section>

        {/* Completed Tasks Section */}
        {completedTasks.length > 0 && (
          <motion.section 
            className="dashboard-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
          >
            <div className="section-header">
              <h2 className="section-title">Completed Tasks</h2>
              <p className="section-description">
                Great work! Here are your completed tasks
              </p>
            </div>
            
            <div className="tasks-grid">
              {completedTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 1.0 + (index * 0.1),
                    ease: "easeOut"
                  }}
                >
                  <TaskCard
                    task={{
                      id: task.id,
                      title: task.title,
                      description: task.description,
                      priority: task.priority,
                      energyRequirement: task.energy_requirement,
                      energy_requirement: task.energy_requirement,
                      completed: task.completed,
                      points: task.points,
                      createdAt: task.created_at,
                      created_at: task.created_at,
                      dueDate: task.due_date,
                      estimatedDuration: task.estimated_duration,
                      estimated_duration: task.estimated_duration,
                      project_id: task.project_id,
                      project: task.project,
                      tags: task.tags,
                      subtasks: task.subtasks,
                      notes: task.notes,
                      recurrence: task.recurrence
                    }}
                    currentEnergy={currentEnergy}
                    onComplete={handleTaskComplete}
                    onDelete={handleTaskDelete}
                    onEdit={handleTaskEdit}
                    onSaveAsTemplate={handleSaveAsTemplate}
                    onStartFocus={handleStartFocus}
                    isSelected={selectedTaskIds.has(task.id)}
                    onToggleSelect={handleToggleSelect}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTask={handleCreateTask}
        currentEnergy={currentEnergy}
        projects={projects}
      />

      {/* Create/Edit Project Modal */}
      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => {
          setIsCreateProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSuccess={handleProjectSuccess}
        editProject={editingProject}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        onClose={() => {
          setIsEditTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSuccess={handleTaskEditSuccess}
        task={editingTask}
        projects={projects}
      />

      {/* Save Template Modal */}
      <SaveTemplateModal
        isOpen={isSaveTemplateModalOpen}
        onClose={() => {
          setIsSaveTemplateModalOpen(false);
          setTemplateTaskData(null);
          setTemplateRefresh(prev => prev + 1); // Trigger template library refresh
        }}
        taskData={templateTaskData}
      />

      {/* Focus Timer */}
      {focusTaskId && (
        <FocusTimer
          taskTitle={focusTaskTitle}
          onComplete={handleFocusComplete}
          onCancel={handleFocusCancel}
        />
      )}

      {/* Theme Settings Modal */}
      <ThemeSettings
        isOpen={showThemeSettings}
        onClose={() => setShowThemeSettings(false)}
      />

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        unreadCount={unreadCount}
        preferences={notificationPreferences}
        onMarkAsRead={markAsRead}
        onDelete={deleteNotif}
        onClearAll={clearAllNotifications}
        onUpdatePreferences={updateNotificationPreferences}
      />

      {/* Smart Suggestions */}
      <SmartSuggestions
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        onAcceptSuggestion={(taskId) => {
          setShowSuggestions(false);
          // Find the task and open it
          const task = tasks.find(t => t.id === taskId);
          if (task) {
            setEditingTask(task);
            setIsEditTaskModalOpen(true);
          }
        }}
        authenticatedFetch={authenticatedFetch}
      />

      {/* Calendar Integration */}
      <CalendarIntegration
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        onImportTasks={(events) => {
          // Convert calendar events to tasks
          events.forEach(event => {
            // Parse and format the date as full ISO datetime (backend requires this)
            const dueDate = new Date(event.start);
            const formattedDateTime = dueDate.toISOString(); // Full ISO 8601 format with time
            
            const taskData: NewTaskData = {
              title: event.summary.substring(0, 200), // Limit title length
              description: (event.description || 'Imported from Google Calendar').substring(0, 1000), // Limit description
              priority: 3,
              energy_requirement: 3,
              due_date: formattedDateTime // Full datetime string
            };
            handleCreateTask(taskData);
          });
          setShowCalendar(false);
        }}
      />

      {/* Achievement Unlock Notification */}
      <AchievementUnlockNotification
        achievement={newlyUnlocked[0] || null}
        onClose={clearNewlyUnlocked}
      />

      {/* PWA Install Prompt */}
      <InstallPWA />

      {/* Keyboard Shortcuts Hint */}
      <KeyboardHint />

      {/* Team Dashboard */}
      <TeamDashboard
        isOpen={showTeamDashboard}
        onClose={() => setShowTeamDashboard(false)}
        team={{
          id: 'team-1',
          name: 'SyncScript Team',
          description: 'The core development team working on SyncScript',
          ownerId: user?.sub || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          memberCount: 5,
          settings: {
            allowMemberInvites: true,
            defaultMemberRole: 'member',
            requireApprovalForTasks: false,
            energyInsightsVisible: true,
            maxMembers: 50,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          }
        }}
        members={[
          {
            id: 'member-1',
            teamId: 'team-1',
            userId: user?.sub || '',
            email: user?.email || '',
            name: user?.name || 'You',
            role: 'owner',
            joinedAt: new Date().toISOString(),
            status: 'active'
          },
          {
            id: 'member-2',
            teamId: 'team-1',
            userId: 'user-2',
            email: 'sarah@syncscript.com',
            name: 'Sarah Chen',
            role: 'admin',
            joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active'
          },
          {
            id: 'member-3',
            teamId: 'team-1',
            userId: 'user-3',
            email: 'mike@syncscript.com',
            name: 'Mike Rodriguez',
            role: 'member',
            joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active'
          }
        ]}
        projects={[
          {
            id: 'project-1',
            name: 'Q4 Planning',
            description: 'Quarterly planning and goal setting',
            color: '#4A90E2',
            teamId: 'team-1',
            createdBy: user?.sub || '',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            memberCount: 3,
            settings: {
              allowMemberTaskCreation: true,
              allowMemberTaskAssignment: true,
              requireApprovalForTasks: false,
              showEnergyLevels: true,
              autoAssignByEnergy: false
            }
          }
        ]}
        analytics={{
          teamId: 'team-1',
          period: 'week',
          totalTasks: 45,
          completedTasks: 38,
          averageEnergy: 72,
          productivityScore: 85,
          topPerformers: [
            {
              userId: user?.sub || '',
              name: user?.name || 'You',
              completedTasks: 15,
              energyLevel: 78
            },
            {
              userId: 'user-2',
              name: 'Sarah Chen',
              completedTasks: 12,
              energyLevel: 82
            },
            {
              userId: 'user-3',
              name: 'Mike Rodriguez',
              completedTasks: 11,
              energyLevel: 68
            }
          ],
          energyPatterns: [
            { hour: 9, averageEnergy: 85, taskCount: 8 },
            { hour: 10, averageEnergy: 88, taskCount: 12 },
            { hour: 11, averageEnergy: 82, taskCount: 10 },
            { hour: 14, averageEnergy: 90, taskCount: 15 },
            { hour: 15, averageEnergy: 86, taskCount: 9 },
            { hour: 16, averageEnergy: 88, taskCount: 11 }
          ]
        }}
        currentUserRole="owner"
        onInviteMember={(email, role) => {
          toast.success(`Invitation sent to ${email} as ${role}`);
        }}
        onManageMember={(memberId, action) => {
          toast.success(`Member ${action} successful`);
        }}
        onCreateProject={(project) => {
          toast.success(`Project "${project.name}" created`);
        }}
      />

      {/* Team Invitation */}
      <TeamInvitation
        isOpen={showTeamInvitation}
        onClose={() => setShowTeamInvitation(false)}
        team={{
          id: 'team-1',
          name: 'SyncScript Team',
          description: 'The core development team working on SyncScript',
          ownerId: user?.sub || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          memberCount: 5,
          settings: {
            allowMemberInvites: true,
            defaultMemberRole: 'member',
            requireApprovalForTasks: false,
            energyInsightsVisible: true,
            maxMembers: 50,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          }
        }}
        inviter={{
          id: 'member-2',
          teamId: 'team-1',
          userId: 'user-2',
          email: 'sarah@syncscript.com',
          name: 'Sarah Chen',
          role: 'admin',
          joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        }}
        inviteToken="mock-invite-token-123"
        onAcceptInvite={(_teamId, _token) => {
          toast.success('Welcome to the team!');
          setShowTeamInvitation(false);
        }}
        onDeclineInvite={(_teamId, _token) => {
          toast.success('Invitation declined');
          setShowTeamInvitation(false);
        }}
      />
    </div>
  );
}
