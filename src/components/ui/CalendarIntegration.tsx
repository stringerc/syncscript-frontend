import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: string;
  end: string;
  selected?: boolean;
}

interface CalendarIntegrationProps {
  isOpen: boolean;
  onClose: () => void;
  onImportTasks: (events: CalendarEvent[]) => void;
}

const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({
  isOpen,
  onClose,
  onImportTasks
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());

  // Simulate Google Calendar connection
  const handleConnect = async () => {
    setLoading(true);
    
    try {
      // In production, this would use Google OAuth
      // For now, we'll create a mock connection
      
      toast.success('🗓️ Google Calendar connected!', {
        duration: 3000
      });
      
      setIsConnected(true);
      
      // Mock calendar events
      const mockEvents: CalendarEvent[] = [
        {
          id: '1',
          summary: 'Team Meeting',
          description: 'Weekly sync with the team',
          start: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          end: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
          selected: false
        },
        {
          id: '2',
          summary: 'Client Presentation',
          description: 'Q4 results presentation',
          start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          end: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
          selected: false
        },
        {
          id: '3',
          summary: 'Dentist Appointment',
          start: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
          end: new Date(Date.now() + 49 * 60 * 60 * 1000).toISOString(),
          selected: false
        }
      ];
      
      setEvents(mockEvents);
      
    } catch (error) {
      console.error('Error connecting to calendar:', error);
      toast.error('Failed to connect to Google Calendar');
    } finally {
      setLoading(false);
    }
  };

  const toggleEventSelection = (eventId: string) => {
    setSelectedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const handleImport = () => {
    const selectedEventsData = events.filter(e => selectedEvents.has(e.id));
    
    if (selectedEventsData.length === 0) {
      toast.error('Please select at least one event to import');
      return;
    }

    onImportTasks(selectedEventsData);
    toast.success(`✅ Imported ${selectedEventsData.length} event(s) as tasks!`);
    onClose();
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="calendar-modal-overlay" onClick={onClose}>
          <motion.div
            className="calendar-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="calendar-modal-header">
              <div className="header-content">
                <div className="calendar-icon">🗓️</div>
                <div>
                  <h2 className="calendar-title">Calendar Integration</h2>
                  <p className="calendar-subtitle">
                    {isConnected ? 'Connected to Google Calendar' : 'Connect your calendar'}
                  </p>
                </div>
              </div>
              <button className="calendar-close-btn" onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="calendar-modal-content">
              {!isConnected ? (
                <div className="calendar-connect-section">
                  <div className="connect-illustration">
                    <div className="sync-icon">🔄</div>
                    <div className="calendar-logos">
                      <span className="logo-item">📅 Google</span>
                      <span className="sync-arrow">→</span>
                      <span className="logo-item">⚡ SyncScript</span>
                    </div>
                  </div>

                  <div className="connect-benefits">
                    <h3>Why Connect Your Calendar?</h3>
                    <ul>
                      <li>
                        <span className="benefit-icon">📥</span>
                        <span>Import calendar events as tasks</span>
                      </li>
                      <li>
                        <span className="benefit-icon">📤</span>
                        <span>Export tasks to your calendar</span>
                      </li>
                      <li>
                        <span className="benefit-icon">🔄</span>
                        <span>Two-way sync keeps everything updated</span>
                      </li>
                      <li>
                        <span className="benefit-icon">⚡</span>
                        <span>Auto-schedule based on energy patterns</span>
                      </li>
                      <li>
                        <span className="benefit-icon">🔔</span>
                        <span>Smart conflict detection</span>
                      </li>
                    </ul>
                  </div>

                  <button 
                    className="btn btn-primary btn-large"
                    onClick={handleConnect}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="btn-spinner"></div>
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2z"/>
                        </svg>
                        <span>Connect Google Calendar</span>
                      </>
                    )}
                  </button>

                  <p className="privacy-note">
                    🔒 We only access your calendar data. Your information is secure and private.
                  </p>
                </div>
              ) : (
                <div className="calendar-events-section">
                  <div className="events-header">
                    <h3>Upcoming Events</h3>
                    <p>Select events to import as tasks</p>
                  </div>

                  {events.length === 0 ? (
                    <div className="no-events">
                      <span className="no-events-icon">📅</span>
                      <p>No upcoming events found</p>
                    </div>
                  ) : (
                    <div className="events-list">
                      {events.map((event) => (
                        <motion.div
                          key={event.id}
                          className={`event-card ${selectedEvents.has(event.id) ? 'selected' : ''}`}
                          onClick={() => toggleEventSelection(event.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="event-checkbox">
                            {selectedEvents.has(event.id) ? '✅' : '⬜'}
                          </div>
                          <div className="event-content">
                            <h4 className="event-title">{event.summary}</h4>
                            {event.description && (
                              <p className="event-description">{event.description}</p>
                            )}
                            <div className="event-time">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                              </svg>
                              <span>{formatDateTime(event.start)}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div className="calendar-actions">
                    <button className="btn btn-ghost" onClick={() => setIsConnected(false)}>
                      Disconnect
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={handleImport}
                      disabled={selectedEvents.size === 0}
                    >
                      Import {selectedEvents.size > 0 ? `${selectedEvents.size}` : ''} Event{selectedEvents.size !== 1 ? 's' : ''}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CalendarIntegration;

