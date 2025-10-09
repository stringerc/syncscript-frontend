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
import { useAuthenticatedFetch } from '../src/hooks/useAuthenticatedFetch';
import { TaskTemplate, createTaskFromTemplate } from '../src/utils/templateUtils';
import { useKeyboardShortcuts } from '../src/hooks/useKeyboardShortcuts';
import { updateLoginStreak, updateCompletionStreak, getStreakData, checkNewMilestone } from '../src/utils/streakUtils';
import { Tag } from '../src/utils/tagUtils';
import { Subtask } from '../src/utils/subtaskUtils';
import { TaskNote } from '../src/utils/noteUtils';
import { RecurrenceConfig, calculateNextDueDate, shouldEndRecurrence } from '../src/utils/recurrenceUtils';

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
    },
    onQuickEnergy: (level) => {
      handleEnergyChange(level);
    }
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
    }
  }, [user, isLoading, loadUserData]);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your SyncScript dashboard...</p>
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
          <div className="header-left">
            <h1 className="dashboard-title">
              <span className="title-gradient">SyncScript</span>
            </h1>
            <p className="dashboard-subtitle">
              Welcome back, {user.name || user.email}!
            </p>
          </div>
          
          <div className="header-right">
            <UserStats
              points={userPoints}
              level={userLevel}
              tasksCompleted={completedTasks.length}
            />
            <StreakCounter
              loginStreak={streakData.loginStreak}
              completionStreak={streakData.completionStreak}
              longestLoginStreak={streakData.longestLoginStreak}
              longestCompletionStreak={streakData.longestCompletionStreak}
            />
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
      </motion.header>

      {/* Main Content */}
      <main className="dashboard-main">
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

      {/* Keyboard Shortcuts Hint */}
      <KeyboardHint />
    </div>
  );
}
