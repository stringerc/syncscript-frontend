import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { parseNaturalLanguageToTask } from '../../utils/aiHelper';
import '../../styles/VoiceToTask.css';

interface VoiceToTaskProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: any) => void;
}

const VoiceToTask: React.FC<VoiceToTaskProps> = ({ isOpen, onClose, onCreateTask }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcriptResult = event.results[current][0].transcript;
          setTranscript(transcriptResult);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          toast.error('Speech recognition error. Please try again.');
        };

        setRecognition(recognitionInstance);
      }
    }
  }, []);

  const startListening = () => {
    if (!recognition) {
      toast.error('Speech recognition not supported in this browser');
      return;
    }

    setTranscript('');
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  const handleCreateFromVoice = async () => {
    if (!transcript.trim()) {
      toast.error('No voice input detected');
      return;
    }

    setIsProcessing(true);

    try {
      // Use AI to parse the transcript
      const task = await parseNaturalLanguageToTask(transcript);
      onCreateTask(task);
      toast.success('✅ Task created from voice!');
      setTranscript('');
      onClose();
    } catch (error) {
      console.error('Error creating task from voice:', error);
      toast.error('Failed to create task. Try again!');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="voice-modal-overlay" onClick={onClose}>
          <motion.div
            className="voice-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="voice-modal-header">
              <div className="header-content">
                <span className="header-icon">🎤</span>
                <div>
                  <h2>Voice-to-Task</h2>
                  <p>Speak to create a task instantly</p>
                </div>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            {/* Content */}
            <div className="voice-modal-content">
              {/* Microphone Button */}
              <div className="microphone-section">
                <button
                  className={`mic-button ${isListening ? 'listening' : ''}`}
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                >
                  <motion.div
                    className="mic-icon"
                    animate={isListening ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{
                      duration: 1,
                      repeat: isListening ? Infinity : 0
                    }}
                  >
                    🎤
                  </motion.div>
                  {isListening && (
                    <motion.div
                      className="listening-ring"
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity
                      }}
                    />
                  )}
                </button>
                <p className="mic-instruction">
                  {isListening ? 'Listening... Speak now!' : 'Click to start recording'}
                </p>
              </div>

              {/* Transcript Display */}
              {transcript && (
                <motion.div
                  className="transcript-display"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="transcript-label">You said:</div>
                  <div className="transcript-text">{transcript}</div>
                </motion.div>
              )}

              {/* Examples */}
              {!transcript && !isListening && (
                <div className="voice-examples">
                  <h4>Try saying:</h4>
                  <ul>
                    <li>"Schedule dentist appointment next Tuesday at 3pm"</li>
                    <li>"Call mom tomorrow afternoon"</li>
                    <li>"Buy groceries after work today"</li>
                    <li>"Finish project proposal by Friday"</li>
                  </ul>
                </div>
              )}

              {/* Browser Support Warning */}
              {typeof window !== 'undefined' && !recognition && (
                <div className="browser-warning">
                  ⚠️ Speech recognition not supported in this browser. 
                  Try Chrome, Edge, or Safari.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="voice-modal-footer">
              <button className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
              {transcript && (
                <button 
                  className="btn btn-primary"
                  onClick={handleCreateFromVoice}
                  disabled={isProcessing || isListening}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner"></span>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <span>✅</span>
                      <span>Create Task</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VoiceToTask;
