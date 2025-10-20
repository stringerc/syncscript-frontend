/**
 * Rube API Integration Service
 * Handles all Rube.app API interactions with proper error handling and automation
 */

export interface RubeApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

export interface RubeConnection {
  toolkit: string;
  name: string;
  description: string;
  connected: boolean;
  color: string;
  lastSync?: string;
  permissions?: string[];
}

export interface RubeUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
  connectedApps: string[];
  rubeToken?: string;
}

class RubeApiService {
  private baseUrl = 'https://api.rube.app';
  private apiKey: string | null = null;

  constructor() {
    // Initialize API key from environment
    if (typeof window !== 'undefined') {
      this.apiKey = localStorage.getItem('rube_api_key');
    }
  }

  /**
   * Set API key for authentication
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    if (typeof window !== 'undefined') {
      localStorage.setItem('rube_api_key', apiKey);
    }
  }

  /**
   * Get API key
   */
  getApiKey(): string | null {
    return this.apiKey;
  }

  /**
   * Make authenticated API request to Rube
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<RubeApiResponse<T>> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'API key not set. Please authenticate with Rube first.'
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}`,
          status: response.status
        };
      }

      return {
        success: true,
        data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get user's connected applications from Rube
   */
  async getConnectedApps(): Promise<RubeApiResponse<RubeConnection[]>> {
    return this.makeRequest<RubeConnection[]>('/user/connections');
  }

  /**
   * Get user profile from Rube
   */
  async getUserProfile(): Promise<RubeApiResponse<RubeUser>> {
    return this.makeRequest<RubeUser>('/user/profile');
  }

  /**
   * Initiate OAuth flow for a specific app
   */
  async initiateOAuth(toolkit: string, redirectUri: string): Promise<RubeApiResponse<{ authUrl: string }>> {
    return this.makeRequest<{ authUrl: string }>('/auth/initiate', {
      method: 'POST',
      body: JSON.stringify({
        toolkit,
        redirectUri
      })
    });
  }

  /**
   * Handle OAuth callback
   */
  async handleOAuthCallback(code: string, state: string): Promise<RubeApiResponse<{ token: string; user: RubeUser }>> {
    return this.makeRequest<{ token: string; user: RubeUser }>('/auth/callback', {
      method: 'POST',
      body: JSON.stringify({
        code,
        state
      })
    });
  }

  /**
   * Test connection to a specific app
   */
  async testConnection(toolkit: string): Promise<RubeApiResponse<{ connected: boolean; lastSync?: string }>> {
    return this.makeRequest<{ connected: boolean; lastSync?: string }>(`/connections/${toolkit}/test`);
  }

  /**
   * Get recent activity from connected apps
   */
  async getRecentActivity(limit: number = 10): Promise<RubeApiResponse<any[]>> {
    return this.makeRequest<any[]>(`/activity/recent?limit=${limit}`);
  }

  /**
   * Disconnect an app
   */
  async disconnectApp(toolkit: string): Promise<RubeApiResponse<void>> {
    return this.makeRequest<void>(`/connections/${toolkit}`, {
      method: 'DELETE'
    });
  }

  /**
   * Refresh connection for an app
   */
  async refreshConnection(toolkit: string): Promise<RubeApiResponse<void>> {
    return this.makeRequest<void>(`/connections/${toolkit}/refresh`, {
      method: 'POST'
    });
  }

  /**
   * Get app-specific data
   */
  async getAppData(toolkit: string, endpoint: string): Promise<RubeApiResponse<any>> {
    return this.makeRequest<any>(`/apps/${toolkit}${endpoint}`);
  }

  /**
   * Execute action on connected app
   */
  async executeAction(toolkit: string, action: string, params: any): Promise<RubeApiResponse<any>> {
    return this.makeRequest<any>(`/apps/${toolkit}/actions/${action}`, {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }
}

// Export singleton instance
export const rubeApi = new RubeApiService();

// Export types for use in other files
export type { RubeApiResponse, RubeConnection, RubeUser };
