import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';
export type AccentColor = 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'teal';
export type FontSize = 'small' | 'medium' | 'large';
export type Density = 'comfortable' | 'compact';

interface ThemeSettings {
  mode: ThemeMode;
  accentColor: AccentColor;
  fontSize: FontSize;
  density: Density;
}

interface ThemeContextType {
  theme: ThemeSettings;
  setMode: (mode: ThemeMode) => void;
  setAccentColor: (color: AccentColor) => void;
  setFontSize: (size: FontSize) => void;
  setDensity: (density: Density) => void;
  resetTheme: () => void;
}

const defaultTheme: ThemeSettings = {
  mode: 'light',
  accentColor: 'blue',
  fontSize: 'medium',
  density: 'comfortable'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('syncscript-theme');
    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme));
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('syncscript-theme', JSON.stringify(theme));
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme.mode);
    document.documentElement.setAttribute('data-accent', theme.accentColor);
    document.documentElement.setAttribute('data-font-size', theme.fontSize);
    document.documentElement.setAttribute('data-density', theme.density);
  }, [theme]);

  const setMode = (mode: ThemeMode) => {
    setTheme(prev => ({ ...prev, mode }));
  };

  const setAccentColor = (accentColor: AccentColor) => {
    setTheme(prev => ({ ...prev, accentColor }));
  };

  const setFontSize = (fontSize: FontSize) => {
    setTheme(prev => ({ ...prev, fontSize }));
  };

  const setDensity = (density: Density) => {
    setTheme(prev => ({ ...prev, density }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setMode,
      setAccentColor,
      setFontSize,
      setDensity,
      resetTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

