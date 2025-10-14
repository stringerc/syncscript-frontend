/**
 * Leaderboards System Component
 * 
 * Team and global competitions with rankings
 * Includes real-time rankings, competitions, and social features
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  score: number;
  level: number;
  badge: string;
  team?: string;
  change: 'up' | 'down' | 'same';
  changeAmount: number;
  achievements: number;
  streak: number;
}

interface Competition {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'special';
  status: 'active' | 'upcoming' | 'ended';
  startDate: string;
  endDate: string;
  participants: number;
  prize: string;
  rules: string[];
  leaderboard: LeaderboardEntry[];
}

interface Team {
  id: string;
  name: string;
  members: number;
  totalScore: number;
  rank: number;
  badge: string;
  joinCode: string;
  isPublic: boolean;
  description: string;
}

interface LeaderboardsSystemProps {
  onClose: () => void;
}

const LeaderboardsSystem: React.FC<LeaderboardsSystemProps> = ({ onClose }) => {
  const [globalLeaderboard, setGlobalLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [teamLeaderboard, setTeamLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'global' | 'team' | 'competitions' | 'teams'>('global');
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    loadLeaderboardData();
  }, []);

  const loadLeaderboardData = async () => {
    setIsLoading(true);
    
    try {
      // Mock global leaderboard
      const mockGlobalLeaderboard: LeaderboardEntry[] = [
        {
          id: 'user-1',
          rank: 1,
          name: 'Alex Chen',
          avatar: '👨‍💻',
          score: 15420,
          level: 25,
          badge: '🏆',
          change: 'up',
          changeAmount: 3,
          achievements: 45,
          streak: 12
        },
        {
          id: 'user-2',
          rank: 2,
          name: 'Sarah Johnson',
          avatar: '👩‍💼',
          score: 14890,
          level: 24,
          badge: '🥈',
          change: 'down',
          changeAmount: 1,
          achievements: 42,
          streak: 8
        },
        {
          id: 'user-3',
          rank: 3,
          name: 'Mike Rodriguez',
          avatar: '👨‍🎨',
          score: 14250,
          level: 23,
          badge: '🥉',
          change: 'up',
          changeAmount: 2,
          achievements: 38,
          streak: 15
        },
        {
          id: 'user-4',
          rank: 4,
          name: 'Emma Wilson',
          avatar: '👩‍🔬',
          score: 13890,
          level: 22,
          badge: '⭐',
          change: 'same',
          changeAmount: 0,
          achievements: 35,
          streak: 6
        },
        {
          id: 'user-5',
          rank: 5,
          name: 'David Kim',
          avatar: '👨‍🚀',
          score: 13560,
          level: 22,
          badge: '⭐',
          change: 'up',
          changeAmount: 1,
          achievements: 33,
          streak: 9
        }
      ];

      // Mock team leaderboard
      const mockTeamLeaderboard: LeaderboardEntry[] = [
        {
          id: 'team-1',
          rank: 1,
          name: 'Productivity Masters',
          avatar: '🚀',
          score: 45680,
          level: 15,
          badge: '🏆',
          team: 'Productivity Masters',
          change: 'up',
          changeAmount: 2,
          achievements: 120,
          streak: 25
        },
        {
          id: 'team-2',
          rank: 2,
          name: 'Task Warriors',
          avatar: '⚔️',
          score: 42150,
          level: 14,
          badge: '🥈',
          team: 'Task Warriors',
          change: 'down',
          changeAmount: 1,
          achievements: 98,
          streak: 18
        },
        {
          id: 'team-3',
          rank: 3,
          name: 'Energy Boosters',
          avatar: '⚡',
          score: 38920,
          level: 13,
          badge: '🥉',
          team: 'Energy Boosters',
          change: 'up',
          changeAmount: 3,
          achievements: 85,
          streak: 22
        }
      ];

      // Mock competitions
      const mockCompetitions: Competition[] = [
        {
          id: 'comp-1',
          name: 'Weekly Sprint Challenge',
          description: 'Complete the most tasks in a week',
          type: 'weekly',
          status: 'active',
          startDate: new Date(Date.now() - 86400000).toISOString(),
          endDate: new Date(Date.now() + 518400000).toISOString(),
          participants: 1250,
          prize: 'Premium subscription + 1000 points',
          rules: [
            'Complete at least 10 tasks',
            'Tasks must be marked as completed',
            'No duplicate tasks allowed',
            'Must maintain energy level above 5'
          ],
          leaderboard: mockGlobalLeaderboard.slice(0, 10)
        },
        {
          id: 'comp-2',
          name: 'Monthly Team Championship',
          description: 'Team with highest combined score wins',
          type: 'monthly',
          status: 'active',
          startDate: new Date(Date.now() - 2592000000).toISOString(),
          endDate: new Date(Date.now() + 2592000000).toISOString(),
          participants: 45,
          prize: 'Team trophy + $500 gift cards',
          rules: [
            'Teams must have 3-8 members',
            'All team members must be active',
            'Score calculated from all team activities',
            'No cheating or artificial inflation'
          ],
          leaderboard: mockTeamLeaderboard
        },
        {
          id: 'comp-3',
          name: 'Spring Productivity Festival',
          description: 'Seasonal challenge with special rewards',
          type: 'seasonal',
          status: 'upcoming',
          startDate: new Date(Date.now() + 86400000).toISOString(),
          endDate: new Date(Date.now() + 7776000000).toISOString(),
          participants: 0,
          prize: 'Exclusive spring theme + legendary badge',
          rules: [
            'Complete spring-themed challenges',
            'Maintain 7-day streak during event',
            'Participate in community activities',
            'Share achievements on social media'
          ],
          leaderboard: []
        }
      ];

      // Mock teams
      const mockTeams: Team[] = [
        {
          id: 'team-1',
          name: 'Productivity Masters',
          members: 8,
          totalScore: 45680,
          rank: 1,
          badge: '🏆',
          joinCode: 'PROD2024',
          isPublic: true,
          description: 'Elite productivity team focused on maximum efficiency'
        },
        {
          id: 'team-2',
          name: 'Task Warriors',
          members: 6,
          totalScore: 42150,
          rank: 2,
          badge: '🥈',
          joinCode: 'WARRIOR',
          isPublic: true,
          description: 'Battle-tested team conquering every task'
        },
        {
          id: 'team-3',
          name: 'Energy Boosters',
          members: 7,
          totalScore: 38920,
          rank: 3,
          badge: '🥉',
          joinCode: 'ENERGY',
          isPublic: false,
          description: 'High-energy team maintaining peak performance'
        },
        {
          id: 'team-4',
          name: 'Code Crushers',
          members: 5,
          totalScore: 32150,
          rank: 4,
          badge: '⭐',
          joinCode: 'CODE2024',
          isPublic: true,
          description: 'Development-focused team crushing coding challenges'
        }
      ];

      setGlobalLeaderboard(mockGlobalLeaderboard);
      setTeamLeaderboard(mockTeamLeaderboard);
      setCompetitions(mockCompetitions);
      setTeams(mockTeams);
    } catch (error) {
      console.error('Failed to load leaderboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const joinTeam = async (teamId: string) => {
    setIsJoining(true);
    
    try {
      // Simulate team join
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Joined team: ${teamId}`);
    } catch (error) {
      console.error('Failed to join team:', error);
    } finally {
      setIsJoining(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'same': return '➡️';
      default: return '📊';
    }
  };

  const getChangeColor = (change: string) => {
    switch (change) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'same': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getCompetitionStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'ended': return 'text-gray-600 bg-gray-100';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading leaderboards...</span>
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Leaderboards</h2>
              <p className="text-blue-100 mt-1">Team and global competitions with rankings</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Global Players:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {globalLeaderboard.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Teams:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {teams.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Competitions:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {competitions.length}
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
              { id: 'global', name: 'Global', icon: '🌍' },
              { id: 'team', name: 'Teams', icon: '👥' },
              { id: 'competitions', name: 'Competitions', icon: '🏆' },
              { id: 'teams', name: 'Join Team', icon: '🤝' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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
          {selectedTab === 'global' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Global Leaderboard</h3>
              
              <div className="space-y-3">
                {globalLeaderboard.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      entry.rank <= 3 ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getRankIcon(entry.rank)}</span>
                        <span className="text-lg font-bold text-gray-900">#{entry.rank}</span>
                      </div>
                      
                      <div className="text-3xl">{entry.avatar}</div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{entry.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Level {entry.level}</span>
                          <span>{entry.achievements} achievements</span>
                          <span>{entry.streak} day streak</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{entry.score.toLocaleString()}</div>
                        <div className="flex items-center space-x-1 text-sm">
                          <span className={getChangeColor(entry.change)}>
                            {getChangeIcon(entry.change)}
                          </span>
                          <span className={getChangeColor(entry.change)}>
                            {entry.changeAmount > 0 ? '+' : ''}{entry.changeAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Team Leaderboard</h3>
              
              <div className="space-y-3">
                {teamLeaderboard.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      entry.rank <= 3 ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getRankIcon(entry.rank)}</span>
                        <span className="text-lg font-bold text-gray-900">#{entry.rank}</span>
                      </div>
                      
                      <div className="text-3xl">{entry.avatar}</div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{entry.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Level {entry.level}</span>
                          <span>{entry.achievements} achievements</span>
                          <span>{entry.streak} day streak</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{entry.score.toLocaleString()}</div>
                        <div className="flex items-center space-x-1 text-sm">
                          <span className={getChangeColor(entry.change)}>
                            {getChangeIcon(entry.change)}
                          </span>
                          <span className={getChangeColor(entry.change)}>
                            {entry.changeAmount > 0 ? '+' : ''}{entry.changeAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'competitions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Active Competitions</h3>
              
              <div className="space-y-4">
                {competitions.map((competition) => (
                  <motion.div
                    key={competition.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{competition.name}</h4>
                        <p className="text-sm text-gray-600">{competition.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(competition.startDate).toLocaleDateString()} - {new Date(competition.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCompetitionStatusColor(competition.status)}`}>
                          {competition.status.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {competition.participants} participants
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Prize: {competition.prize}</div>
                      <div className="text-sm font-medium text-gray-700">Rules:</div>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {competition.rules.map((rule, index) => (
                          <li key={index}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Join Competition
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        View Leaderboard
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'teams' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Available Teams</h3>
              
              <div className="space-y-4">
                {teams.map((team) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{team.badge}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{team.name}</h4>
                          <p className="text-sm text-gray-600">{team.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Rank #{team.rank}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          team.isPublic ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {team.isPublic ? 'PUBLIC' : 'PRIVATE'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Members:</span>
                        <span className="ml-2 text-gray-900">{team.members}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Score:</span>
                        <span className="ml-2 text-gray-900">{team.totalScore.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Join Code:</span>
                        <span className="ml-2 text-gray-900 font-mono">{team.joinCode}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => joinTeam(team.id)}
                        disabled={isJoining}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all disabled:opacity-50"
                      >
                        {isJoining ? 'Joining...' : 'Join Team'}
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        View Details
                      </button>
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
            Leaderboards • {globalLeaderboard.length} global players • {teams.length} teams • {competitions.length} competitions
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
                console.log('Exporting leaderboard data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderboardsSystem;
