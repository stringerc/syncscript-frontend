// Data Persistence Utilities for SyncScript
// Handles localStorage persistence for all critical user data

export interface PersistedData {
  tasks: any[];
  projects: any[];
  userPoints: number;
  userLevel: number;
  currentEnergy: number;
  energyLogs: Array<{ level: number; timestamp: string }>;
  lastEnergyLogTime: number;
  focusSessionsCount: number;
  totalFocusMinutes: number;
  streakData: any;
  achievements: any[];
  settings: any;
}

const STORAGE_KEYS = {
  TASKS: 'syncscript_tasks',
  PROJECTS: 'syncscript_projects', 
  USER_POINTS: 'syncscript_user_points',
  USER_LEVEL: 'syncscript_user_level',
  CURRENT_ENERGY: 'syncscript_current_energy',
  ENERGY_LOGS: 'syncscript_energy_logs',
  LAST_ENERGY_LOG_TIME: 'syncscript_last_energy_log_time',
  FOCUS_SESSIONS: 'syncscript_focus_sessions',
  TOTAL_FOCUS_MINUTES: 'syncscript_total_focus_minutes',
  STREAK_DATA: 'syncscript_streak_data',
  ACHIEVEMENTS: 'syncscript_achievements',
  SETTINGS: 'syncscript_settings',
  LAST_SAVE_TIME: 'syncscript_last_save_time'
};

export class DataPersistence {
  // Save individual data pieces
  static saveTasks(tasks: any[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      this.updateLastSaveTime();
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }

  static saveProjects(projects: any[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      this.updateLastSaveTime();
    } catch (error) {
      console.error('Failed to save projects:', error);
    }
  }

  static saveUserPoints(points: number) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_POINTS, String(points));
      this.updateLastSaveTime();
    } catch (error) {
      console.error('Failed to save user points:', error);
    }
  }

  static saveUserLevel(level: number) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_LEVEL, String(level));
      this.updateLastSaveTime();
    } catch (error) {
      console.error('Failed to save user level:', error);
    }
  }

  static saveCurrentEnergy(energy: number) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ENERGY, String(energy));
      this.updateLastSaveTime();
    } catch (error) {
      console.error('Failed to save current energy:', error);
    }
  }

  static saveEnergyLogs(logs: Array<{ level: number; timestamp: string }>) {
    try {
      localStorage.setItem(STORAGE_KEYS.ENERGY_LOGS, JSON.stringify(logs));
      this.updateLastSaveTime();
    } catch (error) {
      console.error('Failed to save energy logs:', error);
    }
  }

  static saveLastEnergyLogTime(time: number) {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_ENERGY_LOG_TIME, String(time));
      this.updateLastSaveTime();
    } catch (error) {
      console.error('Failed to save last energy log time:', error);
    }
  }

  static saveFocusSessions(count: number) {
    try {
      localStorage.setItem(STORAGE_KEYS.FOCUS_SESSIONS, String(count));
      this.updateLastSaveTime();
    } catch (error) {
      console.error('Failed to save focus sessions:', error);
    }
  }

  static saveTotalFocusMinutes(minutes: number) {
    try {
      localStorage.setItem(STORAGE_KEYS.TOTAL_FOCUS_MINUTES, String(minutes));
      this.updateLastSaveTime();
    } catch (error) {
      console.error('Failed to save total focus minutes:', error);
    }
  }

  static saveStreakData(streakData: any) {
    try {
      localStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify(streakData));
      this.updateLastSaveTime();
    } catch (error) {
      console.error('Failed to save streak data:', error);
    }
  }

  static saveAchievements(achievements: any[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
      this.updateLastSaveTime();
    } catch (error) {
      console.error('Failed to save achievements:', error);
    }
  }

  static saveSettings(settings: any) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      this.updateLastSaveTime();
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  // Load individual data pieces
  static loadTasks(): any[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load tasks:', error);
      return [];
    }
  }

  static loadProjects(): any[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load projects:', error);
      return [];
    }
  }

  static loadUserPoints(): number {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_POINTS);
      return data ? parseInt(data, 10) : 0;
    } catch (error) {
      console.error('Failed to load user points:', error);
      return 0;
    }
  }

  static loadUserLevel(): number {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_LEVEL);
      return data ? parseInt(data, 10) : 1;
    } catch (error) {
      console.error('Failed to load user level:', error);
      return 1;
    }
  }

  static loadCurrentEnergy(): number {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_ENERGY);
      return data ? parseInt(data, 10) : 3;
    } catch (error) {
      console.error('Failed to load current energy:', error);
      return 3;
    }
  }

  static loadEnergyLogs(): Array<{ level: number; timestamp: string }> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENERGY_LOGS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load energy logs:', error);
      return [];
    }
  }

  static loadLastEnergyLogTime(): number {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LAST_ENERGY_LOG_TIME);
      return data ? parseInt(data, 10) : Date.now();
    } catch (error) {
      console.error('Failed to load last energy log time:', error);
      return Date.now();
    }
  }

  static loadFocusSessions(): number {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FOCUS_SESSIONS);
      return data ? parseInt(data, 10) : 0;
    } catch (error) {
      console.error('Failed to load focus sessions:', error);
      return 0;
    }
  }

  static loadTotalFocusMinutes(): number {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TOTAL_FOCUS_MINUTES);
      return data ? parseInt(data, 10) : 0;
    } catch (error) {
      console.error('Failed to load total focus minutes:', error);
      return 0;
    }
  }

  static loadStreakData(): any {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STREAK_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load streak data:', error);
      return null;
    }
  }

  static loadAchievements(): any[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load achievements:', error);
      return [];
    }
  }

  static loadSettings(): any {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Failed to load settings:', error);
      return {};
    }
  }

  // Bulk operations
  static saveAll(data: Partial<PersistedData>) {
    try {
      if (data.tasks) this.saveTasks(data.tasks);
      if (data.projects) this.saveProjects(data.projects);
      if (data.userPoints !== undefined) this.saveUserPoints(data.userPoints);
      if (data.userLevel !== undefined) this.saveUserLevel(data.userLevel);
      if (data.currentEnergy !== undefined) this.saveCurrentEnergy(data.currentEnergy);
      if (data.energyLogs) this.saveEnergyLogs(data.energyLogs);
      if (data.lastEnergyLogTime !== undefined) this.saveLastEnergyLogTime(data.lastEnergyLogTime);
      if (data.focusSessionsCount !== undefined) this.saveFocusSessions(data.focusSessionsCount);
      if (data.totalFocusMinutes !== undefined) this.saveTotalFocusMinutes(data.totalFocusMinutes);
      if (data.streakData) this.saveStreakData(data.streakData);
      if (data.achievements) this.saveAchievements(data.achievements);
      if (data.settings) this.saveSettings(data.settings);
      
      console.log('✅ All data saved to localStorage');
    } catch (error) {
      console.error('Failed to save all data:', error);
    }
  }

  static loadAll(): PersistedData {
    return {
      tasks: this.loadTasks(),
      projects: this.loadProjects(),
      userPoints: this.loadUserPoints(),
      userLevel: this.loadUserLevel(),
      currentEnergy: this.loadCurrentEnergy(),
      energyLogs: this.loadEnergyLogs(),
      lastEnergyLogTime: this.loadLastEnergyLogTime(),
      focusSessionsCount: this.loadFocusSessions(),
      totalFocusMinutes: this.loadTotalFocusMinutes(),
      streakData: this.loadStreakData(),
      achievements: this.loadAchievements(),
      settings: this.loadSettings()
    };
  }

  // Utility methods
  static updateLastSaveTime() {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_SAVE_TIME, String(Date.now()));
    } catch (error) {
      console.error('Failed to update last save time:', error);
    }
  }

  static getLastSaveTime(): number {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LAST_SAVE_TIME);
      return data ? parseInt(data, 10) : 0;
    } catch (error) {
      console.error('Failed to get last save time:', error);
      return 0;
    }
  }

  static clearAll() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      console.log('✅ All SyncScript data cleared from localStorage');
    } catch (error) {
      console.error('Failed to clear all data:', error);
    }
  }

  static hasData(): boolean {
    return this.getLastSaveTime() > 0;
  }

  static getDataSize(): number {
    try {
      let totalSize = 0;
      Object.values(STORAGE_KEYS).forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          totalSize += data.length;
        }
      });
      return totalSize;
    } catch (error) {
      console.error('Failed to calculate data size:', error);
      return 0;
    }
  }
}

// Auto-save hook for React components
export function useAutoSave<T>(data: T, delay: number = 1000) {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (typeof data === 'object' && data !== null) {
        DataPersistence.saveAll(data as any);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay]);
}

export default DataPersistence;
