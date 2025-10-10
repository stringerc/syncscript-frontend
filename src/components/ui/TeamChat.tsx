import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/TeamChat.css';

interface Message {
  id: string;
  text: string;
  user_name: string;
  user_id: string;
  created_at: string;
}

interface TeamChatProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  userName: string;
  userId: string;
}

const TeamChat: React.FC<TeamChatProps> = ({ isOpen, onClose, teamId, userName, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Load chat history
      loadMessages();
    }
  }, [isOpen, teamId]);

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadMessages = () => {
    // In production, load from database/socket.io
    // For now, use mock data
    const mockMessages: Message[] = [
      {
        id: '1',
        text: 'Hey team! How is everyone doing?',
        user_name: 'Sarah',
        user_id: 'user1',
        created_at: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: '2',
        text: 'Great! Just finished the design mockups',
        user_name: 'Mike',
        user_id: 'user2',
        created_at: new Date(Date.now() - 1800000).toISOString()
      }
    ];
    setMessages(mockMessages);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      user_name: userName,
      user_id: userId,
      created_at: new Date().toISOString()
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // In production, emit via socket.io:
    // socket.emit('send-message', { teamId, message });
    
    toast.success('💬 Message sent!');
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="team-chat-overlay" onClick={onClose}>
      <motion.div
        className="team-chat-modal"
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="team-chat-header">
          <div>
            <h2>💬 Team Chat</h2>
            <p>{messages.length} messages</p>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="team-chat-messages">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <span className="empty-icon">💭</span>
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.user_id === userId ? 'own-message' : ''}`}
              >
                <div className="message-avatar">
                  {message.user_name[0].toUpperCase()}
                </div>
                <div className="message-bubble">
                  <div className="message-header">
                    <span className="message-author">{message.user_name}</span>
                    <span className="message-time">{formatTime(message.created_at)}</span>
                  </div>
                  <p className="message-text">{message.text}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="team-chat-input">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
            rows={3}
            className="chat-textarea"
          />
          <button
            className="send-btn"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            📤 Send
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamChat;
