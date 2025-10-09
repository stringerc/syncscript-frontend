import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Team, TeamMember, TeamAnalytics, SharedProject, getRoleInfo, hasPermission, formatMemberStatus, calculateTeamProductivityScore } from '../../utils/teamUtils';

interface TeamDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team;
  members: TeamMember[];
  projects: SharedProject[];
  analytics: TeamAnalytics;
  currentUserRole: string;
  onInviteMember: (email: string, role: string) => void;
  onManageMember: (memberId: string, action: 'remove' | 'changeRole') => void;
  onCreateProject: (project: Omit<SharedProject, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const TeamDashboard: React.FC<TeamDashboardProps> = ({
  isOpen,
  onClose,
  team,
  members,
  projects,
  analytics,
  currentUserRole,
  onInviteMember,
  onManageMember,
  onCreateProject
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'projects' | 'analytics'>('overview');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const productivityScore = calculateTeamProductivityScore(
    analytics.completedTasks,
    analytics.totalTasks,
    analytics.averageEnergy,
    members.length
  );

  const handleInvite = () => {
    if (inviteEmail && hasPermission(currentUserRole as 'owner' | 'admin' | 'member' | 'viewer', 'canInviteMembers')) {
      onInviteMember(inviteEmail, inviteRole);
      setInviteEmail('');
      setShowInviteModal(false);
    }
  };

  const formatHour = (hour: number) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}${ampm}`;
  };

  const getEnergyColor = (level: number) => {
    if (level >= 70) return '#7ED321';
    if (level >= 40) return '#F5A623';
    return '#D0021B';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="team-modal-overlay" onClick={onClose}>
          <motion.div
            className="team-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="team-modal-header">
              <div className="header-content">
                <div className="team-icon">👥</div>
                <div>
                  <h2 className="team-title">{team.name}</h2>
                  <p className="team-subtitle">{team.description || 'Team workspace'}</p>
                </div>
              </div>
              <button className="team-close-btn" onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="team-tabs">
              <button
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <span className="tab-icon">📊</span>
                <span>Overview</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'members' ? 'active' : ''}`}
                onClick={() => setActiveTab('members')}
              >
                <span className="tab-icon">👥</span>
                <span>Members</span>
                <span className="tab-badge">{members.length}</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <span className="tab-icon">📁</span>
                <span>Projects</span>
                <span className="tab-badge">{projects.length}</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                <span className="tab-icon">📈</span>
                <span>Analytics</span>
              </button>
            </div>

            <div className="team-modal-content">
              {activeTab === 'overview' && (
                <div className="team-overview">
                  {/* Team Stats */}
                  <div className="team-stats">
                    <div className="stat-card">
                      <div className="stat-icon">📋</div>
                      <div className="stat-content">
                        <span className="stat-value">{analytics.totalTasks}</span>
                        <span className="stat-label">Total Tasks</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">✅</div>
                      <div className="stat-content">
                        <span className="stat-value">{analytics.completedTasks}</span>
                        <span className="stat-label">Completed</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">⚡</div>
                      <div className="stat-content">
                        <span className="stat-value">{analytics.averageEnergy}%</span>
                        <span className="stat-label">Avg Energy</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">🏆</div>
                      <div className="stat-content">
                        <span className="stat-value">{productivityScore}</span>
                        <span className="stat-label">Productivity</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Performers */}
                  <div className="top-performers">
                    <h3>Top Performers</h3>
                    <div className="performers-list">
                      {analytics.topPerformers.slice(0, 3).map((performer, index) => (
                        <div key={performer.userId} className="performer-card">
                          <div className="performer-rank">#{index + 1}</div>
                          <div className="performer-avatar">
                            {performer.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="performer-info">
                            <span className="performer-name">{performer.name}</span>
                            <span className="performer-stats">
                              {performer.completedTasks} tasks • {performer.energyLevel}% energy
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="recent-activity">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                      <div className="activity-item">
                        <span className="activity-icon">🎯</span>
                        <span className="activity-text">Team completed 15 tasks this week</span>
                        <span className="activity-time">2 hours ago</span>
                      </div>
                      <div className="activity-item">
                        <span className="activity-icon">👤</span>
                        <span className="activity-text">Sarah joined the team</span>
                        <span className="activity-time">1 day ago</span>
                      </div>
                      <div className="activity-item">
                        <span className="activity-icon">📁</span>
                        <span className="activity-text">New project &ldquo;Q4 Planning&rdquo; created</span>
                        <span className="activity-time">2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'members' && (
                <div className="team-members">
                  <div className="members-header">
                    <h3>Team Members</h3>
                    {hasPermission(currentUserRole as 'owner' | 'admin' | 'member' | 'viewer', 'canInviteMembers') && (
                      <button
                        className="btn btn-primary"
                        onClick={() => setShowInviteModal(true)}
                      >
                        <span>➕</span>
                        Invite Member
                      </button>
                    )}
                  </div>

                  <div className="members-list">
                    {members.map((member) => {
                      const roleInfo = getRoleInfo(member.role);
                      const statusInfo = formatMemberStatus(member.status);
                      
                      return (
                        <div key={member.id} className="member-card">
                          <div className="member-avatar">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name} />
                            ) : (
                              member.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="member-info">
                            <div className="member-name">{member.name}</div>
                            <div className="member-email">{member.email}</div>
                            <div className="member-meta">
                              <span 
                                className="member-role"
                                style={{ color: roleInfo.color }}
                              >
                                {roleInfo.icon} {roleInfo.label}
                              </span>
                              <span 
                                className="member-status"
                                style={{ color: statusInfo.color }}
                              >
                                {statusInfo.icon} {statusInfo.label}
                              </span>
                            </div>
                          </div>
                          <div className="member-actions">
                            {hasPermission(currentUserRole as 'owner' | 'admin' | 'member' | 'viewer', 'canRemoveMembers') && (
                              <button
                                className="btn btn-sm btn-ghost"
                                onClick={() => onManageMember(member.id, 'remove')}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="team-projects">
                  <div className="projects-header">
                    <h3>Shared Projects</h3>
                    {hasPermission(currentUserRole as 'owner' | 'admin' | 'member' | 'viewer', 'canCreateProjects') && (
                      <button className="btn btn-primary">
                        <span>➕</span>
                        Create Project
                      </button>
                    )}
                  </div>

                  <div className="projects-grid">
                    {projects.map((project) => (
                      <div key={project.id} className="project-card">
                        <div 
                          className="project-color-bar"
                          style={{ backgroundColor: project.color }}
                        />
                        <div className="project-content">
                          <h4 className="project-name">{project.name}</h4>
                          <p className="project-description">{project.description}</p>
                          <div className="project-meta">
                            <span className="project-members">
                              👥 {project.memberCount} members
                            </span>
                            <span className="project-created">
                              Created {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="team-analytics">
                  <h3>Team Analytics</h3>
                  
                  {/* Energy Patterns */}
                  <div className="energy-patterns">
                    <h4>Energy Patterns</h4>
                    <div className="energy-chart">
                      {analytics.energyPatterns.map((pattern) => (
                        <div key={pattern.hour} className="energy-bar">
                          <div 
                            className="energy-fill"
                            style={{ 
                              height: `${(pattern.averageEnergy / 100) * 100}%`,
                              backgroundColor: getEnergyColor(pattern.averageEnergy)
                            }}
                          />
                          <span className="energy-label">{formatHour(pattern.hour)}</span>
                          <span className="energy-value">{pattern.averageEnergy}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Productivity Trends */}
                  <div className="productivity-trends">
                    <h4>Productivity Trends</h4>
                    <div className="trend-cards">
                      <div className="trend-card">
                        <span className="trend-label">Completion Rate</span>
                        <span className="trend-value">
                          {Math.round((analytics.completedTasks / analytics.totalTasks) * 100)}%
                        </span>
                      </div>
                      <div className="trend-card">
                        <span className="trend-label">Avg Energy</span>
                        <span className="trend-value">{analytics.averageEnergy}%</span>
                      </div>
                      <div className="trend-card">
                        <span className="trend-label">Productivity Score</span>
                        <span className="trend-value">{analytics.productivityScore}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Invite Modal */}
            <AnimatePresence>
              {showInviteModal && (
                <div className="invite-modal-overlay" onClick={() => setShowInviteModal(false)}>
                  <motion.div
                    className="invite-modal"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3>Invite Team Member</h3>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="colleague@company.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}>
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </div>
                    <div className="invite-actions">
                      <button 
                        className="btn btn-ghost" 
                        onClick={() => setShowInviteModal(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="btn btn-primary" 
                        onClick={handleInvite}
                        disabled={!inviteEmail}
                      >
                        Send Invite
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TeamDashboard;
