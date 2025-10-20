/**
 * SyncScript Authentication Service
 * Handles authentication flows using direct OAuth with Rube-style integration
 */

export interface RubeUser {
  id: string;
  name: string;
  email: string;
  connectedApps: string[];
  picture?: string;
  provider?: string;
}

export interface RubeAuthResponse {
  success: boolean;
  user?: RubeUser;
  error?: string;
}

export class RubeAuthService {
  constructor() {
    // Direct OAuth integration - no external API calls
  }

  /**
   * Initiate Google OAuth - Simplified approach
   */
  async loginWithGoogle(): Promise<void> {
    try {
      // For now, create a mock authentication flow
      // This simulates successful authentication and stores user data
      const mockUser = {
        id: 'user_' + Date.now(),
        name: 'SyncScript User',
        email: 'user@syncscript.app',
        connectedApps: ['google', 'googlecalendar', 'gmail', 'googledrive'],
        picture: 'https://via.placeholder.com/150',
        provider: 'google'
      };
      
      // Store user data in localStorage
      localStorage.setItem('syncscript_user', JSON.stringify(mockUser));
      localStorage.setItem('rube_token', 'mock_rube_token_' + Date.now());
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      throw new Error('Failed to initiate Google login');
    }
  }

  /**
   * Initiate GitHub OAuth - Simplified approach
   */
  async loginWithGitHub(): Promise<void> {
    try {
      // For now, create a mock authentication flow
      // This simulates successful authentication and stores user data
      const mockUser = {
        id: 'user_' + Date.now(),
        name: 'SyncScript User',
        email: 'user@syncscript.app',
        connectedApps: ['github'],
        picture: 'https://via.placeholder.com/150',
        provider: 'github'
      };
      
      // Store user data in localStorage
      localStorage.setItem('syncscript_user', JSON.stringify(mockUser));
      localStorage.setItem('rube_token', 'mock_rube_token_' + Date.now());
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      throw new Error('Failed to initiate GitHub login');
    }
  }

  /**
   * Get current user from localStorage
   */
  async getUser(): Promise<RubeUser | null> {
    try {
      // Check if user is in localStorage (set after successful OAuth)
      if (typeof window === 'undefined') return null; // Server-side rendering
      
      const storedUser = localStorage.getItem('syncscript_user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }

      // Check if we have OAuth tokens and create user from them
      const hasGoogleToken = localStorage.getItem('google_token');
      const hasGithubToken = localStorage.getItem('github_token');

      if (hasGoogleToken || hasGithubToken) {
        // Get user data from stored tokens
        const googleUserData = hasGoogleToken ? localStorage.getItem('google_user') : null;
        const githubUserData = hasGithubToken ? localStorage.getItem('github_user') : null;

        let user: RubeUser;
        
        if (googleUserData) {
          const googleUser = JSON.parse(googleUserData);
          user = {
            id: googleUser.id,
            name: googleUser.name,
            email: googleUser.email,
            connectedApps: ['google']
          };
        } else if (githubUserData) {
          const githubUser = JSON.parse(githubUserData);
          user = {
            id: githubUser.id.toString(),
            name: githubUser.name || githubUser.login,
            email: githubUser.email || githubUser.login,
            connectedApps: ['github']
          };
        } else {
          // Fallback user
          user = {
            id: 'user_' + Date.now(),
            name: 'SyncScript User',
            email: 'user@syncscript.app',
            connectedApps: []
          };
        }

        // Add additional connected apps
        if (hasGoogleToken && !user.connectedApps.includes('google')) {
          user.connectedApps.push('google');
        }
        if (hasGithubToken && !user.connectedApps.includes('github')) {
          user.connectedApps.push('github');
        }

        localStorage.setItem('syncscript_user', JSON.stringify(user));
        return user;
      }

      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  /**
   * Logout from SyncScript
   */
  async logout(): Promise<void> {
    try {
      // Clear all stored data
      localStorage.removeItem('syncscript_user');
      localStorage.removeItem('google_token');
      localStorage.removeItem('github_token');
      localStorage.removeItem('google_user');
      localStorage.removeItem('github_user');
      
      // Redirect to home
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to logout');
    }
  }

  /**
   * Get connected applications
   */
  async getConnectedApps(): Promise<string[]> {
    try {
      const user = await this.getUser();
      return user?.connectedApps || [];
    } catch (error) {
      console.error('Error fetching connected apps:', error);
      return [];
    }
  }
}

// Export singleton instance
export const rubeAuth = new RubeAuthService();