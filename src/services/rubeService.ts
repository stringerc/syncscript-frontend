/**
 * Rube Integration Service
 * Provides a clean interface for Rube MCP tool integration
 */

export interface RubeApp {
  toolkit: string;
  name: string;
  description: string;
  connected: boolean;
  color: string;
  icon?: string;
}

export interface RubeActivity {
  id: string;
  action: string;
  app: string;
  timestamp: string;
  icon: string;
}

export class RubeService {
  private connectedApps: RubeApp[] = [
    {
      toolkit: 'slack',
      name: 'Slack',
      description: 'Team communication and collaboration',
      connected: true,
      color: 'purple'
    },
    {
      toolkit: 'todoist',
      name: 'Todoist',
      description: 'Task and project management',
      connected: true,
      color: 'red'
    },
    {
      toolkit: 'googlecalendar',
      name: 'Google Calendar',
      description: 'Calendar and scheduling management',
      connected: true,
      color: 'blue'
    },
    {
      toolkit: 'gmail',
      name: 'Gmail',
      description: 'Email management and communication',
      connected: true,
      color: 'red'
    },
    {
      toolkit: 'github',
      name: 'GitHub',
      description: 'Code repository and project management',
      connected: true,
      color: 'gray'
    },
    {
      toolkit: 'googledrive',
      name: 'Google Drive',
      description: 'File storage and collaboration',
      connected: true,
      color: 'yellow'
    },
    {
      toolkit: 'outlook',
      name: 'Outlook',
      description: 'Email and calendar management',
      connected: true,
      color: 'blue'
    },
    {
      toolkit: 'microsoft_teams',
      name: 'Microsoft Teams',
      description: 'Team collaboration and meetings',
      connected: true,
      color: 'purple'
    },
    {
      toolkit: 'notion',
      name: 'Notion',
      description: 'Note-taking and project management',
      connected: true,
      color: 'gray'
    },
    {
      toolkit: 'discord',
      name: 'Discord',
      description: 'Community and team communication',
      connected: true,
      color: 'indigo'
    }
  ];

  /**
   * Get all available applications
   */
  getApps(): RubeApp[] {
    return this.connectedApps;
  }

  /**
   * Get connected applications
   */
  getConnectedApps(): RubeApp[] {
    return this.connectedApps.filter(app => app.connected);
  }

  /**
   * Get application by toolkit name
   */
  getAppByToolkit(toolkit: string): RubeApp | undefined {
    return this.connectedApps.find(app => app.toolkit === toolkit);
  }

  /**
   * Get recent activity (mock data for now)
   */
  async getRecentActivity(): Promise<RubeActivity[]> {
    // Mock recent activity data
    return [
      {
        id: '1',
        action: 'Created new task in Todoist',
        app: 'Todoist',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        icon: '📝'
      },
      {
        id: '2',
        action: 'Received email notification',
        app: 'Gmail',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        icon: '📧'
      },
      {
        id: '3',
        action: 'Calendar event updated',
        app: 'Google Calendar',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        icon: '📅'
      },
      {
        id: '4',
        action: 'New message in Slack',
        app: 'Slack',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
        icon: '💬'
      },
      {
        id: '5',
        action: 'File shared in Google Drive',
        app: 'Google Drive',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        icon: '📁'
      }
    ];
  }

  /**
   * Check if user is authenticated with SyncScript
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('syncscript_user');
  }

  /**
   * Get user's connected applications based on Rube authentication
   */
  getUserConnectedApps(): string[] {
    if (typeof window === 'undefined') return [];
    
    const apps: string[] = [];
    
    // Check for Rube authentication
    if (localStorage.getItem('rube_token')) {
      // If authenticated through Rube, show all available apps as connected
      return this.connectedApps.map(app => app.toolkit);
    }
    
    // Fallback to individual tokens (for backward compatibility)
    if (localStorage.getItem('google_token')) {
      apps.push('google', 'googlecalendar', 'gmail', 'googledrive');
    }
    
    if (localStorage.getItem('github_token')) {
      apps.push('github');
    }
    
    return apps;
  }

  /**
   * Get authentication status for each app
   */
  getAppAuthStatus(): Record<string, boolean> {
    const status: Record<string, boolean> = {};
    const userApps = this.getUserConnectedApps();
    
    this.connectedApps.forEach(app => {
      status[app.toolkit] = userApps.includes(app.toolkit);
    });
    
    return status;
  }
}

// Export singleton instance
export const rubeService = new RubeService();