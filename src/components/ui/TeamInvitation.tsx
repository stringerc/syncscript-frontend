import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Team, TeamMember, getRoleInfo, validateInviteToken } from '../../utils/teamUtils';

interface TeamInvitationProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team;
  inviter: TeamMember;
  inviteToken: string;
  onAcceptInvite: (teamId: string, token: string) => void;
  onDeclineInvite: (teamId: string, token: string) => void;
}

const TeamInvitation: React.FC<TeamInvitationProps> = ({
  isOpen,
  onClose,
  team,
  inviter,
  inviteToken,
  onAcceptInvite,
  onDeclineInvite
}) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen && inviteToken) {
      validateInvitation();
    }
  }, [isOpen, inviteToken]);

  const validateInvitation = async () => {
    setIsValidating(true);
    setError(null);

    try {
      // In a real app, you'd validate the token with the backend
      // For now, we'll simulate validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in reality, this would be an API call
      const mockInvite = {
        id: 'mock-invite-id',
        teamId: team.id,
        email: 'user@example.com',
        invitedBy: inviter.userId,
        role: 'member' as const,
        token: inviteToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        status: 'pending' as const
      };
      
      const valid = validateInviteToken(mockInvite);
      setIsValid(valid);
      
      if (!valid) {
        setError('This invitation has expired or is no longer valid.');
      }
    } catch (err) {
      console.error('Validation error:', err);
      setError('Failed to validate invitation. Please try again.');
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      await onAcceptInvite(team.id, inviteToken);
    } catch (err) {
      console.error('Accept error:', err);
      setError('Failed to accept invitation. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecline = async () => {
    setIsProcessing(true);
    try {
      await onDeclineInvite(team.id, inviteToken);
    } catch (err) {
      console.error('Decline error:', err);
      setError('Failed to decline invitation. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getRoleInfo = (role: string) => {
    const roleInfo = {
      owner: { label: 'Owner', color: '#8B5CF6', icon: '👑' },
      admin: { label: 'Admin', color: '#F59E0B', icon: '🛡️' },
      member: { label: 'Member', color: '#10B981', icon: '👤' },
      viewer: { label: 'Viewer', color: '#6B7280', icon: '👁️' }
    };
    
    return roleInfo[role as keyof typeof roleInfo] || roleInfo.member;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="invitation-overlay" onClick={onClose}>
          <motion.div
            className="invitation-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="invitation-header">
              <div className="invitation-icon">👥</div>
              <h2 className="invitation-title">Team Invitation</h2>
            </div>

            <div className="invitation-content">
              {isValidating ? (
                <div className="invitation-loading">
                  <div className="loading-spinner"></div>
                  <p>Validating invitation...</p>
                </div>
              ) : error ? (
                <div className="invitation-error">
                  <div className="error-icon">⚠️</div>
                  <h3>Invitation Error</h3>
                  <p>{error}</p>
                  <button className="btn btn-primary" onClick={onClose}>
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Team Info */}
                  <div className="team-info">
                    <div className="team-avatar">
                      <span className="team-avatar-text">
                        {team.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="team-details">
                      <h3 className="team-name">{team.name}</h3>
                      <p className="team-description">
                        {team.description || 'A collaborative workspace for productivity and teamwork'}
                      </p>
                      <div className="team-stats">
                        <span className="team-stat">
                          👥 {team.memberCount} members
                        </span>
                        <span className="team-stat">
                          📁 Active projects
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Inviter Info */}
                  <div className="inviter-info">
                    <div className="inviter-avatar">
                      {inviter.avatar ? (
                        <img src={inviter.avatar} alt={inviter.name} />
                      ) : (
                        <span className="inviter-avatar-text">
                          {inviter.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="inviter-details">
                      <p className="invitation-text">
                        <strong>{inviter.name}</strong> has invited you to join this team
                      </p>
                      <div className="inviter-role">
                        <span 
                          className="role-badge"
                          style={{ color: getRoleInfo(inviter.role).color }}
                        >
                          {getRoleInfo(inviter.role).icon} {getRoleInfo(inviter.role).label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="invitation-benefits">
                    <h4>What you&apos;ll get:</h4>
                    <div className="benefits-list">
                      <div className="benefit-item">
                        <span className="benefit-icon">🎯</span>
                        <span>Collaborative task management</span>
                      </div>
                      <div className="benefit-item">
                        <span className="benefit-icon">📊</span>
                        <span>Team productivity insights</span>
                      </div>
                      <div className="benefit-item">
                        <span className="benefit-icon">⚡</span>
                        <span>Energy-based task optimization</span>
                      </div>
                      <div className="benefit-item">
                        <span className="benefit-icon">🤝</span>
                        <span>Real-time collaboration</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="invitation-actions">
                    <button
                      className="btn btn-ghost"
                      onClick={handleDecline}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Decline'}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleAccept}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Joining...' : 'Accept Invitation'}
                    </button>
                  </div>

                  {/* Terms */}
                  <div className="invitation-terms">
                    <p>
                      By accepting this invitation, you agree to join the team and 
                      collaborate on shared projects and tasks.
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TeamInvitation;
