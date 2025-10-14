/**
 * Time Zone Management System Component
 * 
 * Global team coordination across time zones
 * Includes time zone selection, meeting scheduling, and global time display
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeZone {
  id: string;
  name: string;
  offset: string;
  abbreviation: string;
  location: string;
  country: string;
  flag: string;
  users: number;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  timezone: string;
  location: string;
  workingHours: {
    start: string;
    end: string;
    days: string[];
  };
  status: 'online' | 'offline' | 'away' | 'busy';
}

interface MeetingSlot {
  id: string;
  start: string;
  end: string;
  timezone: string;
  participants: string[];
  availability: 'available' | 'busy' | 'conflict';
  suggested: boolean;
}

interface TimeZoneManagementProps {
  onClose: () => void;
}

const TimeZoneManagement: React.FC<TimeZoneManagementProps> = ({ onClose }) => {
  const [timeZones, setTimeZones] = useState<TimeZone[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [meetingSlots, setMeetingSlots] = useState<MeetingSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'timezones' | 'team' | 'meetings' | 'world-clock'>('timezones');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadTimeZoneData();
    
    // Update current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const loadTimeZoneData = async () => {
    setIsLoading(true);
    
    try {
      // Mock time zones
      const mockTimeZones: TimeZone[] = [
        {
          id: 'utc',
          name: 'UTC',
          offset: '+00:00',
          abbreviation: 'UTC',
          location: 'Coordinated Universal Time',
          country: 'Global',
          flag: '🌍',
          users: 1250
        },
        {
          id: 'est',
          name: 'Eastern Time',
          offset: '-05:00',
          abbreviation: 'EST',
          location: 'New York',
          country: 'United States',
          flag: '🇺🇸',
          users: 890
        },
        {
          id: 'pst',
          name: 'Pacific Time',
          offset: '-08:00',
          abbreviation: 'PST',
          location: 'Los Angeles',
          country: 'United States',
          flag: '🇺🇸',
          users: 650
        },
        {
          id: 'gmt',
          name: 'Greenwich Mean Time',
          offset: '+00:00',
          abbreviation: 'GMT',
          location: 'London',
          country: 'United Kingdom',
          flag: '🇬🇧',
          users: 720
        },
        {
          id: 'cet',
          name: 'Central European Time',
          offset: '+01:00',
          abbreviation: 'CET',
          location: 'Paris',
          country: 'France',
          flag: '🇫🇷',
          users: 580
        },
        {
          id: 'jst',
          name: 'Japan Standard Time',
          offset: '+09:00',
          abbreviation: 'JST',
          location: 'Tokyo',
          country: 'Japan',
          flag: '🇯🇵',
          users: 420
        },
        {
          id: 'ist',
          name: 'India Standard Time',
          offset: '+05:30',
          abbreviation: 'IST',
          location: 'Mumbai',
          country: 'India',
          flag: '🇮🇳',
          users: 680
        },
        {
          id: 'aest',
          name: 'Australian Eastern Time',
          offset: '+10:00',
          abbreviation: 'AEST',
          location: 'Sydney',
          country: 'Australia',
          flag: '🇦🇺',
          users: 320
        }
      ];

      // Mock team members
      const mockTeamMembers: TeamMember[] = [
        {
          id: 'member-1',
          name: 'Sarah Johnson',
          email: 'sarah@company.com',
          timezone: 'est',
          location: 'New York',
          workingHours: {
            start: '09:00',
            end: '17:00',
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
          },
          status: 'online'
        },
        {
          id: 'member-2',
          name: 'Ahmed Al-Rashid',
          email: 'ahmed@company.com',
          timezone: 'gmt',
          location: 'London',
          workingHours: {
            start: '08:00',
            end: '16:00',
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
          },
          status: 'away'
        },
        {
          id: 'member-3',
          name: 'Yuki Tanaka',
          email: 'yuki@company.com',
          timezone: 'jst',
          location: 'Tokyo',
          workingHours: {
            start: '09:00',
            end: '18:00',
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
          },
          status: 'busy'
        },
        {
          id: 'member-4',
          name: 'Carlos Silva',
          email: 'carlos@company.com',
          timezone: 'pst',
          location: 'San Francisco',
          workingHours: {
            start: '10:00',
            end: '18:00',
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
          },
          status: 'online'
        }
      ];

      // Mock meeting slots
      const mockMeetingSlots: MeetingSlot[] = [
        {
          id: 'slot-1',
          start: '2024-01-15T14:00:00Z',
          end: '2024-01-15T15:00:00Z',
          timezone: 'utc',
          participants: ['member-1', 'member-2'],
          availability: 'available',
          suggested: true
        },
        {
          id: 'slot-2',
          start: '2024-01-15T16:00:00Z',
          end: '2024-01-15T17:00:00Z',
          timezone: 'utc',
          participants: ['member-1', 'member-3'],
          availability: 'conflict',
          suggested: false
        },
        {
          id: 'slot-3',
          start: '2024-01-15T18:00:00Z',
          end: '2024-01-15T19:00:00Z',
          timezone: 'utc',
          participants: ['member-2', 'member-4'],
          availability: 'available',
          suggested: true
        }
      ];

      setTimeZones(mockTimeZones);
      setTeamMembers(mockTeamMembers);
      setMeetingSlots(mockMeetingSlots);
    } catch (error) {
      console.error('Failed to load timezone data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTimeInTimezone = (timezone: string) => {
    try {
      return new Date().toLocaleString('en-US', {
        timeZone: timezone,
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (error) {
      return 'Invalid timezone';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'away': return 'text-yellow-600 bg-yellow-100';
      case 'busy': return 'text-red-600 bg-red-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-red-600 bg-red-100';
      case 'conflict': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading timezone management...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Time Zone Management</h2>
              <p className="text-green-100 mt-1">Global team coordination across time zones</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Time Zones:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {timeZones.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Team Members:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {teamMembers.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Current Time:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {currentTime.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'timezones', name: 'Time Zones', icon: '🌍' },
              { id: 'team', name: 'Team', icon: '👥' },
              { id: 'meetings', name: 'Meetings', icon: '📅' },
              { id: 'world-clock', name: 'World Clock', icon: '🕐' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'timezones' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Supported Time Zones</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timeZones.map((timezone) => (
                  <motion.div
                    key={timezone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{timezone.flag}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{timezone.name}</h4>
                        <p className="text-sm text-gray-600">{timezone.location}, {timezone.country}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Offset:</span>
                        <span className="text-sm font-medium text-gray-900">{timezone.offset}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Abbreviation:</span>
                        <span className="text-sm font-medium text-gray-900">{timezone.abbreviation}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Users:</span>
                        <span className="text-sm font-medium text-gray-900">{timezone.users}</span>
                      </div>
                      <div className="mt-2 p-2 bg-gray-50 rounded text-sm font-mono">
                        {getTimeInTimezone(timezone.location)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
              
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <p className="text-xs text-gray-500">{member.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(member.status)}`}>
                          {member.status.toUpperCase()}
                        </span>
                        <span className="text-lg">
                          {timeZones.find(tz => tz.id === member.timezone)?.flag}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Working Hours:</span>
                        <span className="ml-2 text-gray-900">
                          {member.workingHours.start} - {member.workingHours.end}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Days:</span>
                        <span className="ml-2 text-gray-900">
                          {member.workingHours.days.join(', ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                      <span className="text-gray-600">Local Time: </span>
                      <span className="font-mono text-gray-900">
                        {getTimeInTimezone(timeZones.find(tz => tz.id === member.timezone)?.location || 'UTC')}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'meetings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Meeting Scheduling</h3>
              
              <div className="space-y-4">
                {meetingSlots.map((slot) => (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      slot.suggested ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleString()}
                        </h4>
                        <p className="text-sm text-gray-600">UTC Time</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getAvailabilityColor(slot.availability)}`}>
                          {slot.availability.toUpperCase()}
                        </span>
                        {slot.suggested && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            SUGGESTED
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Participants:</div>
                      <div className="flex flex-wrap gap-2">
                        {slot.participants.map((participantId) => {
                          const participant = teamMembers.find(m => m.id === participantId);
                          return participant ? (
                            <span key={participantId} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                              {participant.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Schedule
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'world-clock' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">World Clock</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {timeZones.slice(0, 8).map((timezone) => (
                  <motion.div
                    key={timezone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{timezone.flag}</div>
                      <h4 className="font-medium text-gray-900 mb-1">{timezone.location}</h4>
                      <p className="text-sm text-gray-600 mb-3">{timezone.name}</p>
                      <div className="text-lg font-mono text-gray-900">
                        {getTimeInTimezone(timezone.location)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {timezone.offset} ({timezone.abbreviation})
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Time Zone Management • {timeZones.length} time zones • {teamMembers.length} team members • {meetingSlots.length} meeting slots
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                console.log('Exporting timezone data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimeZoneManagement;
