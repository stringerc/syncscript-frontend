/**
 * Social Features System Component
 * 
 * Team challenges, sharing, and collaboration
 * Includes social interactions, team building, and community features
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamChallenge {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  status: 'active' | 'upcoming' | 'completed';
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants: number;
  requirements: string[];
  rewards: {
    points: number;
    badges: string[];
    titles: string[];
  };
  progress: number;
  maxProgress: number;
}

interface SocialPost {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  type: 'achievement' | 'milestone' | 'challenge' | 'tip' | 'celebration';
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: 'leader' | 'member' | 'mentor';
  level: number;
  score: number;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastActive: string;
  achievements: number;
  streak: number;
}

interface CommunityEvent {
  id: string;
  name: string;
  description: string;
  type: 'workshop' | 'competition' | 'meetup' | 'webinar';
  date: string;
  duration: number;
  attendees: number;
  maxAttendees: number;
  host: string;
  status: 'upcoming' | 'live' | 'ended';
  link?: string;
}

interface SocialFeaturesProps {
  onClose: () => void;
}

const SocialFeatures: React.FC<SocialFeaturesProps> = ({ onClose }) => {
  const [teamChallenges, setTeamChallenges] = useState<TeamChallenge[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [communityEvents, setCommunityEvents] = useState<CommunityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'challenges' | 'feed' | 'team' | 'events'>('challenges');
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    loadSocialData();
  }, []);

  const loadSocialData = async () => {
    setIsLoading(true);
    
    try {
      // Mock team challenges
      const mockTeamChallenges: TeamChallenge[] = [
        {
          id: 'challenge-1',
          name: 'Productivity Sprint',
          description: 'Complete 1000 tasks as a team in one week',
          type: 'weekly',
          status: 'active',
          startDate: new Date(Date.now() - 86400000).toISOString(),
          endDate: new Date(Date.now() + 518400000).toISOString(),
          participants: 8,
          maxParticipants: 10,
          requirements: [
            'Complete at least 50 tasks per member',
            'Maintain team energy above 7',
            'Share progress daily'
          ],
          rewards: {
            points: 2000,
            badges: ['team-sprint'],
            titles: ['Sprint Champions']
          },
          progress: 750,
          maxProgress: 1000
        },
        {
          id: 'challenge-2',
          name: 'Energy Mastery',
          description: 'Reach maximum energy level 100 times as a team',
          type: 'monthly',
          status: 'active',
          startDate: new Date(Date.now() - 2592000000).toISOString(),
          endDate: new Date(Date.now() + 2592000000).toISOString(),
          participants: 6,
          maxParticipants: 8,
          requirements: [
            'Each member reaches energy level 10',
            'Maintain high energy for 5 consecutive days',
            'Share energy tips with team'
          ],
          rewards: {
            points: 1500,
            badges: ['energy-masters'],
            titles: ['Energy Champions']
          },
          progress: 45,
          maxProgress: 100
        },
        {
          id: 'challenge-3',
          name: 'Innovation Challenge',
          description: 'Create and implement 5 new productivity workflows',
          type: 'special',
          status: 'upcoming',
          startDate: new Date(Date.now() + 86400000).toISOString(),
          endDate: new Date(Date.now() + 1209600000).toISOString(),
          participants: 0,
          maxParticipants: 12,
          requirements: [
            'Design innovative workflow',
            'Test with team members',
            'Document results and share'
          ],
          rewards: {
            points: 3000,
            badges: ['innovation-leader'],
            titles: ['Innovation Master']
          },
          progress: 0,
          maxProgress: 5
        }
      ];

      // Mock social posts
      const mockSocialPosts: SocialPost[] = [
        {
          id: 'post-1',
          author: 'Sarah Johnson',
          authorAvatar: '👩‍💼',
          content: 'Just completed my 100th task! 🎉 The achievement system is so motivating!',
          type: 'achievement',
          image: 'https://via.placeholder.com/400x200/4ECDC4/FFFFFF?text=100+Tasks+Completed',
          likes: 24,
          comments: 8,
          shares: 3,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          isLiked: true
        },
        {
          id: 'post-2',
          author: 'Mike Rodriguez',
          authorAvatar: '👨‍🎨',
          content: 'Pro tip: Use the energy tracking to schedule your most important tasks during peak hours! ⚡',
          type: 'tip',
          likes: 18,
          comments: 5,
          shares: 12,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          isLiked: false
        },
        {
          id: 'post-3',
          author: 'Emma Wilson',
          authorAvatar: '👩‍🔬',
          content: 'Our team just won the weekly productivity challenge! 🏆 Thanks to everyone for the amazing collaboration!',
          type: 'celebration',
          image: 'https://via.placeholder.com/400x200/FF6B6B/FFFFFF?text=Team+Victory',
          likes: 32,
          comments: 15,
          shares: 8,
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          isLiked: true
        },
        {
          id: 'post-4',
          author: 'David Kim',
          authorAvatar: '👨‍🚀',
          content: 'Reached level 25! The gamification features make productivity so much more engaging 🎮',
          type: 'milestone',
          likes: 15,
          comments: 6,
          shares: 2,
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          isLiked: false
        }
      ];

      // Mock team members
      const mockTeamMembers: TeamMember[] = [
        {
          id: 'member-1',
          name: 'Sarah Johnson',
          avatar: '👩‍💼',
          role: 'leader',
          level: 25,
          score: 15420,
          status: 'online',
          lastActive: new Date(Date.now() - 300000).toISOString(),
          achievements: 45,
          streak: 12
        },
        {
          id: 'member-2',
          name: 'Mike Rodriguez',
          avatar: '👨‍🎨',
          role: 'mentor',
          level: 22,
          score: 12890,
          status: 'away',
          lastActive: new Date(Date.now() - 1800000).toISOString(),
          achievements: 38,
          streak: 8
        },
        {
          id: 'member-3',
          name: 'Emma Wilson',
          avatar: '👩‍🔬',
          role: 'member',
          level: 20,
          score: 11250,
          status: 'online',
          lastActive: new Date(Date.now() - 600000).toISOString(),
          achievements: 32,
          streak: 15
        },
        {
          id: 'member-4',
          name: 'David Kim',
          avatar: '👨‍🚀',
          role: 'member',
          level: 18,
          score: 9850,
          status: 'busy',
          lastActive: new Date(Date.now() - 900000).toISOString(),
          achievements: 28,
          streak: 6
        },
        {
          id: 'member-5',
          name: 'Lisa Chen',
          avatar: '👩‍💻',
          role: 'member',
          level: 16,
          score: 8750,
          status: 'offline',
          lastActive: new Date(Date.now() - 3600000).toISOString(),
          achievements: 25,
          streak: 4
        }
      ];

      // Mock community events
      const mockCommunityEvents: CommunityEvent[] = [
        {
          id: 'event-1',
          name: 'Productivity Masterclass',
          description: 'Learn advanced productivity techniques from industry experts',
          type: 'workshop',
          date: new Date(Date.now() + 86400000).toISOString(),
          duration: 120,
          attendees: 45,
          maxAttendees: 100,
          host: 'SyncScript Academy',
          status: 'upcoming',
          link: 'https://syncscript.com/masterclass'
        },
        {
          id: 'event-2',
          name: 'Weekly Challenge Showdown',
          description: 'Compete in real-time productivity challenges',
          type: 'competition',
          date: new Date(Date.now() + 172800000).toISOString(),
          duration: 60,
          attendees: 23,
          maxAttendees: 50,
          host: 'Challenge Team',
          status: 'upcoming'
        },
        {
          id: 'event-3',
          name: 'Team Building Meetup',
          description: 'Virtual meetup for team leaders and members',
          type: 'meetup',
          date: new Date(Date.now() + 259200000).toISOString(),
          duration: 90,
          attendees: 12,
          maxAttendees: 25,
          host: 'Community Team',
          status: 'upcoming'
        },
        {
          id: 'event-4',
          name: 'AI Productivity Webinar',
          description: 'Discover how AI can enhance your productivity',
          type: 'webinar',
          date: new Date(Date.now() - 86400000).toISOString(),
          duration: 60,
          attendees: 78,
          maxAttendees: 100,
          host: 'AI Team',
          status: 'ended'
        }
      ];

      setTeamChallenges(mockTeamChallenges);
      setSocialPosts(mockSocialPosts);
      setTeamMembers(mockTeamMembers);
      setCommunityEvents(mockCommunityEvents);
    } catch (error) {
      console.error('Failed to load social data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const joinChallenge = async (challengeId: string) => {
    setIsJoining(true);
    
    try {
      // Simulate joining challenge
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setTeamChallenges(prev => prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, participants: challenge.participants + 1 }
          : challenge
      ));
      
      console.log(`Joined challenge: ${challengeId}`);
    } catch (error) {
      console.error('Failed to join challenge:', error);
    } finally {
      setIsJoining(false);
    }
  };

  const likePost = (postId: string) => {
    setSocialPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'online': return 'text-green-600 bg-green-100';
      case 'away': return 'text-yellow-600 bg-yellow-100';
      case 'busy': return 'text-red-600 bg-red-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return '📅';
      case 'weekly': return '📆';
      case 'monthly': return '🗓️';
      case 'special': return '⭐';
      case 'achievement': return '🏆';
      case 'milestone': return '🎯';
      case 'challenge': return '⚔️';
      case 'tip': return '💡';
      case 'celebration': return '🎉';
      case 'workshop': return '🎓';
      case 'competition': return '🏆';
      case 'meetup': return '🤝';
      case 'webinar': return '📺';
      default: return '📄';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'leader': return '👑';
      case 'mentor': return '🎓';
      case 'member': return '👤';
      default: return '👤';
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
            <span className="text-lg font-medium text-gray-700">Loading social features...</span>
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
              <h2 className="text-2xl font-bold">Social Features</h2>
              <p className="text-green-100 mt-1">Team challenges, sharing, and collaboration</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Challenges:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {teamChallenges.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Posts:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {socialPosts.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Team Members:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {teamMembers.length}
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
              { id: 'challenges', name: 'Challenges', icon: '⚔️' },
              { id: 'feed', name: 'Feed', icon: '📱' },
              { id: 'team', name: 'Team', icon: '👥' },
              { id: 'events', name: 'Events', icon: '📅' }
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
          {selectedTab === 'challenges' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Team Challenges</h3>
              
              <div className="space-y-4">
                {teamChallenges.map((challenge) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(challenge.type)}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{challenge.name}</h4>
                          <p className="text-sm text-gray-600">{challenge.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(challenge.status)}`}>
                          {challenge.status.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {challenge.participants}/{challenge.maxParticipants}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress:</span>
                        <span className="text-gray-900">
                          {challenge.progress} / {challenge.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Requirements:</div>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {challenge.requirements.map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => joinChallenge(challenge.id)}
                        disabled={isJoining || challenge.participants >= challenge.maxParticipants}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all disabled:opacity-50"
                      >
                        {isJoining ? 'Joining...' : 'Join Challenge'}
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

          {selectedTab === 'feed' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Social Feed</h3>
              
              <div className="space-y-4">
                {socialPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="text-2xl">{post.authorAvatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{post.author}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(post.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{post.content}</p>
                      </div>
                      <span className="text-lg">{getTypeIcon(post.type)}</span>
                    </div>
                    
                    {post.image && (
                      <div className="mb-3">
                        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500">Image: {post.image}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => likePost(post.id)}
                        className={`flex items-center space-x-1 text-sm ${
                          post.isLiked ? 'text-red-600' : 'text-gray-600'
                        }`}
                      >
                        <span>{post.isLiked ? '❤️' : '🤍'}</span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-gray-600">
                        <span>💬</span>
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-gray-600">
                        <span>📤</span>
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
              
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{member.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <span className="text-lg">{getRoleIcon(member.role)}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Level {member.level}</span>
                          <span>{member.achievements} achievements</span>
                          <span>{member.streak} day streak</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{member.score.toLocaleString()}</div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(member.status)}`}>
                          {member.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'events' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Community Events</h3>
              
              <div className="space-y-4">
                {communityEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(event.type)}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{event.name}</h4>
                          <p className="text-sm text-gray-600">{event.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Host: {event.host}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {event.attendees}/{event.maxAttendees}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <span className="ml-2 text-gray-900">
                          {new Date(event.date).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <span className="ml-2 text-gray-900">{event.duration} minutes</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Join Event
                      </button>
                      {event.link && (
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                          View Link
                        </button>
                      )}
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
            Social Features • {teamChallenges.length} challenges • {socialPosts.length} posts • {teamMembers.length} team members
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
                console.log('Exporting social data...');
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

export default SocialFeatures;
