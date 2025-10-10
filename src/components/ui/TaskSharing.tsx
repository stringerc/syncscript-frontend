import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface TaskSharingProps {
  task: {
    id: string;
    title: string;
    description?: string;
    priority: number;
    due_date?: string;
  };
}

const TaskSharing: React.FC<TaskSharingProps> = ({ task }) => {
  const [shareLink, setShareLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const generateShareLink = async () => {
    setIsGenerating(true);
    
    try {
      // Generate unique token
      const token = `${task.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const link = `https://www.syncscript.app/shared/${token}`;
      
      // In production, save to database
      localStorage.setItem(`share_${token}`, JSON.stringify(task));
      
      setShareLink(link);
      toast.success('🔗 Share link generated!');
    } catch (error) {
      toast.error('Failed to generate link');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success('📋 Link copied to clipboard!');
  };

  return (
    <div className="task-sharing">
      {!shareLink ? (
        <button
          className="btn btn-outline"
          onClick={generateShareLink}
          disabled={isGenerating}
        >
          {isGenerating ? '⏳ Generating...' : '🔗 Share Task'}
        </button>
      ) : (
        <div className="share-link-container">
          <div className="share-link-display">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="share-link-input"
            />
            <button className="btn btn-primary" onClick={copyToClipboard}>
              📋 Copy
            </button>
          </div>

          <div className="share-actions">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setShowQR(!showQR)}
            >
              {showQR ? 'Hide QR' : '📱 Show QR Code'}
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setShareLink('')}
            >
              🔄 New Link
            </button>
          </div>

          {showQR && (
            <div className="qr-code-container">
              <div className="qr-placeholder">
                📱 QR Code
                <span className="qr-note">(Install qrcode.react for actual QR)</span>
              </div>
            </div>
          )}

          <div className="share-info">
            <p className="info-text">
              💡 Anyone with this link can view this task (read-only)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSharing;
