/**
 * React Hook for Rube.app Integration
 * 
 * Provides easy access to Rube.app integration services
 * with loading states and error handling
 */

import { useState, useEffect, useCallback } from 'react';
import { rubeIntegration, CalendarEvent, EmailMessage, Integration, ApiResponse } from '../services/rubeIntegration';

export interface UseRubeIntegrationReturn {
  // State
  loading: boolean;
  error: string | null;
  connected: boolean;

  // Calendar methods
  events: CalendarEvent[];
  fetchEvents: () => Promise<void>;
  createEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<boolean>;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;

  // Email methods
  messages: EmailMessage[];
  fetchMessages: () => Promise<void>;
  sendMessage: (to: string, subject: string, body: string) => Promise<boolean>;

  // Integration methods
  integrations: Integration[];
  fetchIntegrations: () => Promise<void>;
  connectIntegration: (integration: string, authCode?: string) => Promise<boolean>;
  disconnectIntegration: (integration: string) => Promise<boolean>;

  // Utility methods
  clearError: () => void;
  refresh: () => Promise<void>;
}

export function useRubeIntegration(): UseRubeIntegrationReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  // Clear error helper
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Check connection status
  const checkConnection = useCallback(async () => {
    try {
      const response = await rubeIntegration.getHealthStatus();
      setConnected(response.success);
      if (!response.success) {
        setError(response.error || 'Connection failed');
      }
    } catch (err) {
      setConnected(false);
      setError('Failed to check connection status');
    }
  }, []);

  // Calendar methods
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await rubeIntegration.getCalendarEvents();
      if (response.success && response.data) {
        setEvents(response.data.events || []);
      } else {
        setError(response.error || 'Failed to fetch events');
      }
    } catch (err) {
      setError('Failed to fetch calendar events');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (event: Omit<CalendarEvent, 'id'>): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await rubeIntegration.createCalendarEvent(event);
      if (response.success) {
        await fetchEvents(); // Refresh events list
        return true;
      } else {
        setError(response.error || 'Failed to create event');
        return false;
      }
    } catch (err) {
      setError('Failed to create calendar event');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchEvents]);

  const updateEvent = useCallback(async (id: string, event: Partial<CalendarEvent>): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await rubeIntegration.updateCalendarEvent(id, event);
      if (response.success) {
        await fetchEvents(); // Refresh events list
        return true;
      } else {
        setError(response.error || 'Failed to update event');
        return false;
      }
    } catch (err) {
      setError('Failed to update calendar event');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchEvents]);

  const deleteEvent = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await rubeIntegration.deleteCalendarEvent(id);
      if (response.success) {
        await fetchEvents(); // Refresh events list
        return true;
      } else {
        setError(response.error || 'Failed to delete event');
        return false;
      }
    } catch (err) {
      setError('Failed to delete calendar event');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchEvents]);

  // Email methods
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await rubeIntegration.getEmailMessages();
      if (response.success && response.data) {
        setMessages(response.data.messages || []);
      } else {
        setError(response.error || 'Failed to fetch messages');
      }
    } catch (err) {
      setError('Failed to fetch email messages');
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (to: string, subject: string, body: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await rubeIntegration.sendEmail(to, subject, body);
      if (response.success) {
        return true;
      } else {
        setError(response.error || 'Failed to send message');
        return false;
      }
    } catch (err) {
      setError('Failed to send email');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Integration methods
  const fetchIntegrations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await rubeIntegration.getIntegrations();
      if (response.success && response.data) {
        setIntegrations(response.data.integrations || []);
      } else {
        setError(response.error || 'Failed to fetch integrations');
      }
    } catch (err) {
      setError('Failed to fetch integrations');
    } finally {
      setLoading(false);
    }
  }, []);

  const connectIntegration = useCallback(async (integration: string, authCode?: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await rubeIntegration.connectIntegration(integration, authCode);
      if (response.success) {
        await fetchIntegrations(); // Refresh integrations list
        return true;
      } else {
        setError(response.error || 'Failed to connect integration');
        return false;
      }
    } catch (err) {
      setError('Failed to connect integration');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchIntegrations]);

  const disconnectIntegration = useCallback(async (integration: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await rubeIntegration.disconnectIntegration(integration);
      if (response.success) {
        await fetchIntegrations(); // Refresh integrations list
        return true;
      } else {
        setError(response.error || 'Failed to disconnect integration');
        return false;
      }
    } catch (err) {
      setError('Failed to disconnect integration');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchIntegrations]);

  // Refresh all data
  const refresh = useCallback(async () => {
    await Promise.all([
      checkConnection(),
      fetchEvents(),
      fetchMessages(),
      fetchIntegrations(),
    ]);
  }, [checkConnection, fetchEvents, fetchMessages, fetchIntegrations]);

  // Initialize on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    // State
    loading,
    error,
    connected,

    // Calendar
    events,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,

    // Email
    messages,
    fetchMessages,
    sendMessage,

    // Integrations
    integrations,
    fetchIntegrations,
    connectIntegration,
    disconnectIntegration,

    // Utility
    clearError,
    refresh,
  };
}
