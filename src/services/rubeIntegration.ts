/**
 * Rube.app Integration Service
 * 
 * Handles API calls to our Rube.app integration server
 * for Google Calendar, Outlook, Slack, and other integrations
 */

const RUBE_API_URL = process.env.NEXT_PUBLIC_RUBE_INTEGRATION_URL || 'http://localhost:3002';

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  source: string;
  attendees?: string[];
}

export interface EmailMessage {
  id: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  source: string;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'enabled' | 'disabled' | 'connected' | 'disconnected';
  description: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string;
}

class RubeIntegrationService {
  private baseURL: string;

  constructor() {
    this.baseURL = RUBE_API_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Request failed',
          details: data.details,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error',
        details: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Calendar Integration Methods
  async getCalendarEvents(): Promise<ApiResponse<{ events: CalendarEvent[] }>> {
    return this.request<{ events: CalendarEvent[] }>('/api/calendar/events');
  }

  async createCalendarEvent(event: Omit<CalendarEvent, 'id'>): Promise<ApiResponse<{ event: CalendarEvent }>> {
    return this.request<{ event: CalendarEvent }>('/api/calendar/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async updateCalendarEvent(id: string, event: Partial<CalendarEvent>): Promise<ApiResponse<{ event: CalendarEvent }>> {
    return this.request<{ event: CalendarEvent }>(`/api/calendar/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(event),
    });
  }

  async deleteCalendarEvent(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(`/api/calendar/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Email Integration Methods
  async getEmailMessages(): Promise<ApiResponse<{ messages: EmailMessage[] }>> {
    return this.request<{ messages: EmailMessage[] }>('/api/email/messages');
  }

  async sendEmail(to: string, subject: string, body: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>('/api/email/send', {
      method: 'POST',
      body: JSON.stringify({ to, subject, body }),
    });
  }

  // Integration Management Methods
  async getIntegrations(): Promise<ApiResponse<{ integrations: Integration[] }>> {
    return this.request<{ integrations: Integration[] }>('/api/integrations');
  }

  async connectIntegration(integration: string, authCode?: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>('/api/auth/connect', {
      method: 'POST',
      body: JSON.stringify({ integration, authCode }),
    });
  }

  async disconnectIntegration(integration: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(`/api/auth/disconnect/${integration}`, {
      method: 'DELETE',
    });
  }

  // Health Check
  async getHealthStatus(): Promise<ApiResponse<any>> {
    return this.request<any>('/health');
  }

  // API Info
  async getApiInfo(): Promise<ApiResponse<any>> {
    return this.request<any>('/api');
  }
}

// Export singleton instance
export const rubeIntegration = new RubeIntegrationService();

// Export types
export type { CalendarEvent, EmailMessage, Integration, ApiResponse };
