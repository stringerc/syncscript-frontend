import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface Comment {
  id: string;
  text: string;
  user_name: string;
  user_avatar?: string;
  created_at: string;
}

interface TaskCommentsProps {
  taskId: string;
  userName: string;
}

const TaskComments: React.FC<TaskCommentsProps> = ({ taskId, userName }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      user_name: userName,
      created_at: new Date().toISOString()
    };

    setComments([...comments, comment]);
    setNewComment('');
    toast.success('💬 Comment added!');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="task-comments">
      <h4 className="comments-title">💬 Comments ({comments.length})</h4>
      
      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            <span className="no-comments-icon">💭</span>
            <p>No comments yet. Start the conversation!</p>
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-avatar">{comment.user_name[0].toUpperCase()}</div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{comment.user_name}</span>
                  <span className="comment-time">{formatTime(comment.created_at)}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
          className="comment-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              handleAddComment();
            }
          }}
        />
        <button
          className="btn btn-primary btn-sm"
          onClick={handleAddComment}
          disabled={!newComment.trim()}
        >
          💬 Comment
        </button>
      </div>
    </div>
  );
};

export default TaskComments;
