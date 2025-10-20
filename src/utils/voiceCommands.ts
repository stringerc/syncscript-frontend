import { create } from 'zustand';

interface VoiceCommand {
  id: string;
  phrase: string;
  action: string;
  description: string;
  category: 'navigation' | 'productivity' | 'search' | 'creation' | 'system';
  isEnabled: boolean;
  parameters?: string[];
}

interface VoiceSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  commands: VoiceCommand[];
  isActive: boolean;
}

interface VoiceStore {
  commands: VoiceCommand[];
  currentSession: VoiceSession | null;
  isListening: boolean;
  isSupported: boolean;
  recognition: any;
  addCommand: (command: Omit<VoiceCommand, 'id'>) => void;
  updateCommand: (id: string, updates: Partial<VoiceCommand>) => void;
  deleteCommand: (id: string) => void;
  startListening: () => void;
  stopListening: () => void;
  processVoiceInput: (transcript: string) => Promise<void>;
  initializeRecognition: () => void;
  getCommandsByCategory: (category: VoiceCommand['category']) => VoiceCommand[];
}

const defaultCommands: VoiceCommand[] = [
  {
    id: '1',
    phrase: 'create task',
    action: 'create_task',
    description: 'Create a new task',
    category: 'creation',
    isEnabled: true,
    parameters: ['title', 'description']
  },
  {
    id: '2',
    phrase: 'show dashboard',
    action: 'navigate',
    description: 'Navigate to dashboard',
    category: 'navigation',
    isEnabled: true,
    parameters: ['/dashboard']
  },
  {
    id: '3',
    phrase: 'search for',
    action: 'search',
    description: 'Perform a search',
    category: 'search',
    isEnabled: true,
    parameters: ['query']
  },
  {
    id: '4',
    phrase: 'start timer',
    action: 'start_timer',
    description: 'Start a productivity timer',
    category: 'productivity',
    isEnabled: true,
    parameters: ['duration']
  },
  {
    id: '5',
    phrase: 'stop listening',
    action: 'stop_voice',
    description: 'Stop voice recognition',
    category: 'system',
    isEnabled: true
  }
];

export const useVoiceStore = create<VoiceStore>((set, get) => ({
  commands: defaultCommands,
  currentSession: null,
  isListening: false,
  isSupported: false,
  recognition: null,

  addCommand: (commandData) => {
    const newCommand: VoiceCommand = {
      ...commandData,
      id: Date.now().toString()
    };

    set((state) => ({
      commands: [...state.commands, newCommand]
    }));
  },

  updateCommand: (id, updates) => {
    set((state) => ({
      commands: state.commands.map((command) =>
        command.id === id ? { ...command, ...updates } : command
      )
    }));
  },

  deleteCommand: (id) => {
    set((state) => ({
      commands: state.commands.filter((command) => command.id !== id)
    }));
  },

  startListening: () => {
    const { recognition } = get();
    if (!recognition) return;

    try {
      recognition.start();
      set({ isListening: true });

      const newSession: VoiceSession = {
        id: Date.now().toString(),
        startTime: new Date(),
        commands: [],
        isActive: true
      };

      set({ currentSession: newSession });
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  },

  stopListening: () => {
    const { recognition, currentSession } = get();
    if (!recognition) return;

    try {
      recognition.stop();
      set({ isListening: false });

      if (currentSession) {
        set((state) => ({
          currentSession: {
            ...state.currentSession!,
            endTime: new Date(),
            isActive: false
          }
        }));
      }
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  },

  processVoiceInput: async (transcript) => {
    const { commands } = get();
    const lowerTranscript = transcript.toLowerCase();

    // Find matching command
    const matchingCommand = commands.find(command => 
      command.isEnabled && lowerTranscript.includes(command.phrase.toLowerCase())
    );

    if (matchingCommand) {
      // Execute the command action
      await executeCommand(matchingCommand, transcript);
      
      // Update session
      set((state) => {
        if (state.currentSession) {
          return {
            currentSession: {
              ...state.currentSession,
              commands: [...state.currentSession.commands, matchingCommand]
            }
          };
        }
        return state;
      });
    }
  },

  initializeRecognition: () => {
    if (typeof window === 'undefined') return;

    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      set({ isSupported: false });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');

      if (event.results[event.resultIndex].isFinal) {
        get().processVoiceInput(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Voice recognition error:', event.error);
      set({ isListening: false });
    };

    recognition.onend = () => {
      set({ isListening: false });
    };

    set({ 
      recognition,
      isSupported: true
    });
  },

  getCommandsByCategory: (category) => {
    return get().commands.filter(command => command.category === category);
  }
}));

const executeCommand = async (command: VoiceCommand, transcript: string) => {
  console.log(`Executing command: ${command.action}`);
  
  switch (command.action) {
    case 'create_task':
      // Trigger task creation modal
      window.dispatchEvent(new CustomEvent('voice:createTask', { 
        detail: { transcript } 
      }));
      break;
      
    case 'navigate':
      if (command.parameters && command.parameters[0]) {
        window.location.href = command.parameters[0];
      }
      break;
      
    case 'search':
      // Extract search query from transcript
      const searchQuery = transcript.replace(command.phrase, '').trim();
      window.dispatchEvent(new CustomEvent('voice:search', { 
        detail: { query: searchQuery } 
      }));
      break;
      
    case 'start_timer':
      window.dispatchEvent(new CustomEvent('voice:startTimer', { 
        detail: { transcript } 
      }));
      break;
      
    case 'stop_voice':
      useVoiceStore.getState().stopListening();
      break;
      
    default:
      console.log(`Unknown command: ${command.action}`);
  }
};

export const initializeVoiceCommands = () => {
  useVoiceStore.getState().initializeRecognition();
};

export const getVoiceInsights = () => {
  const commands = useVoiceStore.getState().commands;
  const currentSession = useVoiceStore.getState().currentSession;
  
  return {
    totalCommands: commands.length,
    enabledCommands: commands.filter(c => c.isEnabled).length,
    commandsByCategory: commands.reduce((acc, cmd) => {
      acc[cmd.category] = (acc[cmd.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    currentSessionCommands: currentSession?.commands.length || 0,
    isSupported: useVoiceStore.getState().isSupported
  };
};
