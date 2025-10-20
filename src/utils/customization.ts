import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomizationSettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  animations: boolean;
  soundEffects: boolean;
  notifications: boolean;
  sidebarCollapsed: boolean;
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface CustomizationStore {
  settings: CustomizationSettings;
  updateSetting: <K extends keyof CustomizationSettings>(
    key: K,
    value: CustomizationSettings[K]
  ) => void;
  resetSettings: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;
}

const defaultSettings: CustomizationSettings = {
  theme: 'auto',
  fontSize: 'medium',
  compactMode: false,
  animations: true,
  soundEffects: true,
  notifications: true,
  sidebarCollapsed: false,
  customColors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    accent: '#F59E0B'
  }
};

export const useCustomizationStore = create<CustomizationStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,

      updateSetting: (key, value) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value
          }
        }));
      },

      resetSettings: () => {
        set({ settings: defaultSettings });
      },

      exportSettings: () => {
        const settings = useCustomizationStore.getState().settings;
        return JSON.stringify(settings, null, 2);
      },

      importSettings: (settingsJson: string) => {
        try {
          const importedSettings = JSON.parse(settingsJson);
          
          // Validate the imported settings
          if (typeof importedSettings === 'object' && importedSettings !== null) {
            set({ settings: { ...defaultSettings, ...importedSettings } });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Failed to import settings:', error);
          return false;
        }
      }
    }),
    {
      name: 'customization-storage',
      version: 1
    }
  )
);

export const getTheme = (): string => {
  const settings = useCustomizationStore.getState().settings;
  
  if (settings.theme === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  return settings.theme;
};

export const applyCustomColors = (): void => {
  const settings = useCustomizationStore.getState().settings;
  const root = document.documentElement;
  
  root.style.setProperty('--color-primary', settings.customColors.primary);
  root.style.setProperty('--color-secondary', settings.customColors.secondary);
  root.style.setProperty('--color-accent', settings.customColors.accent);
};

export const toggleSidebar = (): void => {
  const currentState = useCustomizationStore.getState().settings.sidebarCollapsed;
  useCustomizationStore.getState().updateSetting('sidebarCollapsed', !currentState);
};
