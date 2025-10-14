// Backend API Error Handling and Fallback System
// This utility handles backend connectivity issues and provides fallback data

interface ApiResponse<T> {
  data?: T;
  error?: string;
  fallback?: boolean;
}

interface FallbackData {
  energy: any[];
  projects: any[];
  tasks: any[];
  lastUpdated: Date;
}

class BackendApiManager {
  private fallbackData: FallbackData = {
    energy: [],
    projects: [],
    tasks: [],
    lastUpdated: new Date()
  };

  private isBackendAvailable = true;
  private lastHealthCheck = 0;
  private healthCheckInterval = 30000; // 30 seconds

  constructor() {
    this.initializeFallbackData();
    this.startHealthCheck();
  }

  private initializeFallbackData() {
    // Initialize with sample data for offline mode
    this.fallbackData = {
      energy: [
        {
          id: 'fallback-energy-1',
          level: 5,
          timestamp: new Date().toISOString(),
          source: 'fallback',
          notes: 'Offline mode - sample data'
        }
      ],
      projects: [
        {
          id: 'fallback-project-1',
          name: 'Sample Project',
          description: 'This is sample data for offline mode',
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      tasks: [
        {
          id: 'fallback-task-1',
          title: 'Sample Task',
          description: 'This is sample data for offline mode',
          status: 'pending',
          priority: 3,
          energy_level: 5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      lastUpdated: new Date()
    };
  }

  private async startHealthCheck() {
    setInterval(async () => {
      try {
        const response = await fetch('https://syncscript-backend-1.onrender.com/api/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(5000) // 5 second timeout
        });
        
        this.isBackendAvailable = response.ok;
        this.lastHealthCheck = Date.now();
      } catch (error) {
        this.isBackendAvailable = false;
        this.lastHealthCheck = Date.now();
        console.warn('Backend health check failed:', error);
      }
    }, this.healthCheckInterval);
  }

  private async makeApiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    // Check if backend is available
    if (!this.isBackendAvailable && Date.now() - this.lastHealthCheck < this.healthCheckInterval) {
      return {
        data: this.getFallbackData(endpoint) as T,
        fallback: true,
        error: 'Backend unavailable, using fallback data'
      };
    }

    try {
      const response = await fetch(`https://syncscript-backend-1.onrender.com${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      this.isBackendAvailable = true;
      
      return { data };
    } catch (error) {
      console.warn(`API call failed for ${endpoint}:`, error);
      this.isBackendAvailable = false;
      
      return {
        data: this.getFallbackData(endpoint) as T,
        fallback: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private getFallbackData(endpoint: string): any {
    switch (endpoint) {
      case '/api/energy/latest':
        return this.fallbackData.energy[0];
      case '/api/energy':
        return this.fallbackData.energy;
      case '/api/projects':
        return this.fallbackData.projects;
      case '/api/tasks':
        return this.fallbackData.tasks;
      default:
        return null;
    }
  }

  // Public API methods
  async getLatestEnergy(): Promise<ApiResponse<any>> {
    return this.makeApiCall('/api/energy/latest');
  }

  async getEnergyHistory(limit: number = 100): Promise<ApiResponse<any[]>> {
    return this.makeApiCall(`/api/energy?limit=${limit}`);
  }

  async getProjects(): Promise<ApiResponse<any[]>> {
    return this.makeApiCall('/api/projects');
  }

  async getTasks(): Promise<ApiResponse<any[]>> {
    return this.makeApiCall('/api/tasks');
  }

  async createTask(task: any): Promise<ApiResponse<any>> {
    return this.makeApiCall('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task)
    });
  }

  async updateTask(id: string, task: any): Promise<ApiResponse<any>> {
    return this.makeApiCall(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task)
    });
  }

  async deleteTask(id: string): Promise<ApiResponse<any>> {
    return this.makeApiCall(`/api/tasks/${id}`, {
      method: 'DELETE'
    });
  }

  // Utility methods
  isBackendHealthy(): boolean {
    return this.isBackendAvailable;
  }

  getLastHealthCheck(): Date {
    return new Date(this.lastHealthCheck);
  }

  getFallbackDataInfo(): FallbackData {
    return { ...this.fallbackData };
  }
}

// Create singleton instance
export const backendApi = new BackendApiManager();

// Export types
export type { ApiResponse, FallbackData };
