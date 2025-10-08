import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EnergySelector from '../src/components/ui/EnergySelector';
import TaskCard from '../src/components/ui/TaskCard';
import { useAuthenticatedFetch } from '../src/hooks/useAuthenticatedFetch';

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
}

interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  created_at: string;
  archived: boolean;
}

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const authenticatedFetch = useAuthenticatedFetch();
  
  const [currentEnergy, setCurrentEnergy] = React.useState(3);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Load user data on mount
  const loadUserData = React.useCallback(async () => {
    try {
      setLoading(true);
      
      // Load tasks
      const tasksResponse = await authenticatedFetch('/api/tasks');
      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        setTasks(tasksData.tasks || []);
      }

      // Load projects
      const projectsResponse = await authenticatedFetch('/api/projects');
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        setProjects(projectsData.projects || []);
      }

      // Load latest energy
      const energyResponse = await authenticatedFetch('/api/energy/latest');
      if (energyResponse.ok) {
        const energyData = await energyResponse.json();
        if (energyData.energy) {
          setCurrentEnergy(energyData.energy.level);
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
    }
  }, [user, isLoading, loadUserData]);

  const handleEnergyChange = async (energy: number) => {
    setCurrentEnergy(energy);
    
    try {
      // Log energy to backend
      await authenticatedFetch('/api/energy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level: energy,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Error logging energy:', error);
    }
  };

  const handleTaskComplete = async (taskId: string) => {
    try {
      const response = await authenticatedFetch(`/api/tasks/${taskId}/complete`, {
        method: 'POST',
      });
      
      if (response.ok) {
        // Update local state
        setTasks(prev => prev.map(task => 
          task.id === taskId ? { ...task, completed: true } : task
        ));
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      const response = await authenticatedFetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setTasks(prev => prev.filter(task => task.id !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskEdit = (taskId: string) => {
    // TODO: Implement task editing modal
    console.log('Edit task:', taskId);
  };

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

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

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
        </motion.section>

        {/* Active Tasks Section */}
        <motion.section 
          className="dashboard-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <div className="section-header">
            <h2 className="section-title">Active Tasks</h2>
            <p className="section-description">
              Tasks matched to your current energy level ({currentEnergy}/5)
            </p>
          </div>
          
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
              <button className="btn btn-primary">
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
                      completed: task.completed,
                      points: task.points,
                      createdAt: task.created_at,
                      dueDate: task.due_date
                    }}
                    currentEnergy={currentEnergy}
                    onComplete={handleTaskComplete}
                    onDelete={handleTaskDelete}
                    onEdit={handleTaskEdit}
                  />
                </motion.div>
              ))}
            </div>
          )}
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
                      completed: task.completed,
                      points: task.points,
                      createdAt: task.created_at,
                      dueDate: task.due_date
                    }}
                    currentEnergy={currentEnergy}
                    onComplete={handleTaskComplete}
                    onDelete={handleTaskDelete}
                    onEdit={handleTaskEdit}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
