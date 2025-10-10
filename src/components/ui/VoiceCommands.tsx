import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface VoiceCommandsProps {
  onCommand: (command: { type: string; data?: Record<string, unknown> }) => void;
}

const VoiceCommands: React.FC<VoiceCommandsProps> = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.interimResults = false;
    recog.lang = 'en-US';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recog.onresult = (event: any) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase();
      setLastCommand(command);
      processCommand(command);
    };

    setRecognition(recog);
  }, []);

  const processCommand = (command: string) => {
    if (command.includes('create task') || command.includes('new task')) {
      onCommand({ type: 'CREATE_TASK' });
      toast.success('🎤 Creating new task...');
    } else if (command.includes('show today') || command.includes('today\'s tasks')) {
      onCommand({ type: 'SHOW_TODAY' });
      toast.success('🎤 Showing today&apos;s tasks...');
    } else if (command.includes('log energy') || command.includes('check in')) {
      onCommand({ type: 'LOG_ENERGY' });
      toast.success('🎤 Opening energy log...');
    } else if (command.includes('focus mode') || command.includes('start focus')) {
      onCommand({ type: 'FOCUS_MODE' });
      toast.success('🎤 Starting focus mode...');
    } else if (command.includes('analytics') || command.includes('show stats')) {
      onCommand({ type: 'ANALYTICS' });
      toast.success('🎤 Opening analytics...');
    } else if (command.includes('calendar')) {
      onCommand({ type: 'CALENDAR' });
      toast.success('🎤 Opening calendar...');
    } else if (command.includes('help')) {
      onCommand({ type: 'HELP' });
      toast.success('🎤 Showing help...');
    } else {
      toast.error(`🎤 Command not recognized: "${command}"`);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
      toast.success('🎤 Voice commands off');
    } else {
      recognition?.start();
      setIsListening(true);
      toast.success('🎤 Voice commands on - Say "Hey SyncScript"');
    }
  };

  return (
    <div className="voice-commands">
      <button
        className={`voice-toggle-btn ${isListening ? 'listening' : ''}`}
        onClick={toggleListening}
        title="Toggle voice commands"
      >
        {isListening ? '🎤 Listening' : '🎤 Voice'}
      </button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            className="voice-status"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="listening-indicator">
              <span className="pulse"></span>
              Voice commands active
            </div>
            {lastCommand && (
              <div className="last-command">
                Last: &ldquo;{lastCommand}&rdquo;
              </div>
            )}
            <div className="available-commands">
              <p>Try saying:</p>
              <ul>
                <li>&ldquo;Create task&rdquo;</li>
                <li>&ldquo;Show today&rdquo;</li>
                <li>&ldquo;Log energy&rdquo;</li>
                <li>&ldquo;Focus mode&rdquo;</li>
                <li>&ldquo;Open calendar&rdquo;</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceCommands;
