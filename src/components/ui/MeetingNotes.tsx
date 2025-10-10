import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/MeetingNotes.css';

interface ActionItem {
  task: string;
  assignee: string;
  dueDate: string | null;
  priority: number;
  energy: number;
}

interface MeetingNotesData {
  summary: string;
  keyDecisions: string[];
  actionItems: ActionItem[];
  nextSteps: string[];
  attendees: string[];
}

interface MeetingNotesProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTasks: (tasks: ActionItem[]) => void;
}

const MeetingNotes: React.FC<MeetingNotesProps> = ({ isOpen, onClose, onCreateTasks }) => {
  const [transcript, setTranscript] = useState('');
  const [notes, setNotes] = useState<MeetingNotesData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleProcessNotes = async () => {
    if (!transcript.trim()) {
      toast.error('Please enter meeting notes or transcript');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/ai/meeting-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript })
      });

      if (response.ok) {
        const data = await response.json();
        setNotes(data.notes);
        toast.success('✅ Meeting notes processed!');
      } else {
        toast.error('Failed to process notes');
      }
    } catch (error) {
      console.error('Error processing notes:', error);
      toast.error('Failed to process notes');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateAllTasks = () => {
    if (!notes) return;
    
    onCreateTasks(notes.actionItems);
    toast.success(`✅ Created ${notes.actionItems.length} tasks from meeting!`);
    onClose();
  };

  const startRecording = () => {
    setIsRecording(true);
    toast.info('🎤 Recording started (feature requires Web Speech API)');
    // In production, implement voice recording
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast.success('⏹️ Recording stopped');
    // Process recording
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="meeting-notes-overlay" onClick={onClose}>
          <motion.div
            className="meeting-notes-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="meeting-notes-header">
              <div>
                <h2>📝 AI Meeting Notes</h2>
                <p>Extract action items from meetings</p>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="meeting-notes-content">
              {!notes ? (
                <>
                  <div className="input-section">
                    <div className="input-controls">
                      <button
                        className={`record-btn ${isRecording ? 'recording' : ''}`}
                        onClick={isRecording ? stopRecording : startRecording}
                      >
                        {isRecording ? '⏹️ Stop' : '🎤 Record'}
                      </button>
                      <span className="or-divider">OR</span>
                      <span className="paste-hint">Paste transcript below</span>
                    </div>

                    <textarea
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      placeholder="Paste your meeting transcript here, or click Record to capture audio...&#10;&#10;The AI will extract:&#10;- Action items&#10;- Key decisions&#10;- Next steps&#10;- Attendees"
                      rows={12}
                      className="transcript-input"
                    />
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleProcessNotes}
                    disabled={!transcript.trim() || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="spinner-sm"></span>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>🤖</span>
                        <span>Extract Action Items</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <div className="notes-summary">
                    <h3>📋 Summary</h3>
                    <p>{notes.summary}</p>
                  </div>

                  {notes.keyDecisions.length > 0 && (
                    <div className="decisions-section">
                      <h4>✅ Key Decisions</h4>
                      <ul>
                        {notes.keyDecisions.map((decision, idx) => (
                          <li key={idx}>{decision}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="action-items-section">
                    <h4>🎯 Action Items ({notes.actionItems.length})</h4>
                    {notes.actionItems.map((item, idx) => (
                      <div key={idx} className="action-item-card">
                        <div className="item-task">{item.task}</div>
                        <div className="item-meta">
                          <span>👤 {item.assignee}</span>
                          {item.dueDate && <span>📅 {item.dueDate}</span>}
                          <span>P{item.priority}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="create-tasks-section">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={handleCreateAllTasks}
                    >
                      ✨ Create {notes.actionItems.length} Tasks
                    </button>
                  </div>

                  <button
                    className="btn btn-ghost btn-block"
                    onClick={() => setNotes(null)}
                  >
                    ← Process Another Meeting
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MeetingNotes;
