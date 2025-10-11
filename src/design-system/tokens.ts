/**
 * SyncScript Design Tokens
 * Single source of truth for all design decisions
 * 
 * Usage:
 * import { tokens } from '@/design-system/tokens';
 * 
 * Or use CSS variables:
 * color: var(--color-primary-500);
 */

export const tokens = {
  /**
   * COLOR SYSTEM
   * Based on Tailwind's color scale (50-900)
   */
  colors: {
    // Primary Brand Color (Blues)
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#4A90E2', // Main brand color
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },

    // Energy Level Colors (Core Feature)
    energy: {
      1: { 
        main: '#EF4444', // Low energy (Red)
        light: '#FEE2E2',
        dark: '#B91C1C',
      },
      2: {
        main: '#F97316', // Medium-low (Orange)
        light: '#FFEDD5',
        dark: '#C2410C',
      },
      3: {
        main: '#F59E0B', // Medium (Amber)
        light: '#FEF3C7',
        dark: '#B45309',
      },
      4: {
        main: '#10B981', // Medium-high (Green)
        light: '#D1FAE5',
        dark: '#047857',
      },
      5: {
        main: '#8B5CF6', // High energy (Purple)
        light: '#EDE9FE',
        dark: '#6D28D9',
      },
    },

    // Semantic Colors
    semantic: {
      success: {
        main: '#10B981',
        light: '#D1FAE5',
        dark: '#047857',
      },
      warning: {
        main: '#F59E0B',
        light: '#FEF3C7',
        dark: '#B45309',
      },
      error: {
        main: '#EF4444',
        light: '#FEE2E2',
        dark: '#B91C1C',
      },
      info: {
        main: '#3B82F6',
        light: '#DBEAFE',
        dark: '#1E40AF',
      },
    },

    // Neutral Colors (Grays)
    neutral: {
      0: '#FFFFFF',
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
      950: '#030712',
    },

    // SyncScript Cream (Brand Backgrounds)
    cream: {
      50: '#FEFDFB',
      100: '#FDF8F0',
      200: '#FAF1E4',
      300: '#F7E9D7',
    },

    // Gamification Colors
    gamification: {
      gold: '#F59E0B',
      silver: '#94A3B8',
      bronze: '#B45309',
      xp: '#8B5CF6',
      level: '#4A90E2',
    },
  },

  /**
   * SPACING SYSTEM
   * Based on 4px grid (0.25rem base unit)
   */
  spacing: {
    0: '0px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
  },

  /**
   * TYPOGRAPHY SYSTEM
   */
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: '"Fira Code", "Roboto Mono", "Courier New", monospace',
    },
    fontSize: {
      xs: { size: '0.75rem', lineHeight: '1rem' },      // 12px
      sm: { size: '0.875rem', lineHeight: '1.25rem' },  // 14px
      base: { size: '1rem', lineHeight: '1.5rem' },     // 16px
      lg: { size: '1.125rem', lineHeight: '1.75rem' },  // 18px
      xl: { size: '1.25rem', lineHeight: '1.75rem' },   // 20px
      '2xl': { size: '1.5rem', lineHeight: '2rem' },    // 24px
      '3xl': { size: '1.875rem', lineHeight: '2.25rem' }, // 30px
      '4xl': { size: '2.25rem', lineHeight: '2.5rem' }, // 36px
      '5xl': { size: '3rem', lineHeight: '1' },         // 48px
      '6xl': { size: '3.75rem', lineHeight: '1' },      // 60px
      '7xl': { size: '4.5rem', lineHeight: '1' },       // 72px
      '8xl': { size: '6rem', lineHeight: '1' },         // 96px
      '9xl': { size: '8rem', lineHeight: '1' },         // 128px
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },

  /**
   * SHADOW SYSTEM
   */
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    glow: '0 0 20px rgba(74, 144, 226, 0.3)',
    energy: {
      1: '0 0 20px rgba(239, 68, 68, 0.3)',
      2: '0 0 20px rgba(249, 115, 22, 0.3)',
      3: '0 0 20px rgba(245, 158, 11, 0.3)',
      4: '0 0 20px rgba(16, 185, 129, 0.3)',
      5: '0 0 20px rgba(139, 92, 246, 0.3)',
    },
  },

  /**
   * BORDER RADIUS
   */
  radius: {
    none: '0px',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',
  },

  /**
   * Z-INDEX LAYERS
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
    max: 9999,
  },

  /**
   * ANIMATION SYSTEM
   * Purposeful motion with consistent timing
   */
  motion: {
    // Duration tiers
    duration: {
      instant: '0ms',
      fast: '150ms',
      base: '250ms',
      slow: '400ms',
      slower: '600ms',
    },
    
    // Easing functions
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Ribbon-inspired
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },

    // Animation presets
    presets: {
      fadeIn: {
        keyframes: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        duration: '250ms',
        easing: 'cubic-bezier(0, 0, 0.2, 1)',
      },
      slideUp: {
        keyframes: {
          from: { transform: 'translateY(10px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
        duration: '250ms',
        easing: 'cubic-bezier(0, 0, 0.2, 1)',
      },
      scaleIn: {
        keyframes: {
          from: { transform: 'scale(0.95)', opacity: 0 },
          to: { transform: 'scale(1)', opacity: 1 },
        },
        duration: '250ms',
        easing: 'cubic-bezier(0, 0, 0.2, 1)',
      },
      ribbonFlow: {
        keyframes: {
          '0%': { transform: 'translateY(20px) scaleY(0.8)', opacity: 0 },
          '60%': { transform: 'translateY(-5px) scaleY(1.02)' },
          '100%': { transform: 'translateY(0) scaleY(1)', opacity: 1 },
        },
        duration: '600ms',
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },

  /**
   * BREAKPOINTS
   * Mobile-first responsive design
   */
  breakpoints: {
    sm: '640px',   // Mobile landscape
    md: '768px',   // Tablet portrait
    lg: '1024px',  // Tablet landscape / Small desktop
    xl: '1280px',  // Desktop
    '2xl': '1536px', // Large desktop
  },

  /**
   * TRANSITIONS
   * Standard transitions for consistency
   */
  transitions: {
    all: 'all 250ms cubic-bezier(0, 0, 0.2, 1)',
    colors: 'background-color 250ms cubic-bezier(0, 0, 0.2, 1), color 250ms cubic-bezier(0, 0, 0.2, 1), border-color 250ms cubic-bezier(0, 0, 0.2, 1)',
    opacity: 'opacity 250ms cubic-bezier(0, 0, 0.2, 1)',
    shadow: 'box-shadow 250ms cubic-bezier(0, 0, 0.2, 1)',
    transform: 'transform 250ms cubic-bezier(0, 0, 0.2, 1)',
  },
} as const;

/**
 * HELPER FUNCTIONS
 */

// Get energy color by level
export function getEnergyColor(level: 1 | 2 | 3 | 4 | 5): string {
  return tokens.colors.energy[level].main;
}

// Get energy color (light variant)
export function getEnergyColorLight(level: 1 | 2 | 3 | 4 | 5): string {
  return tokens.colors.energy[level].light;
}

// Get energy color (dark variant)
export function getEnergyColorDark(level: 1 | 2 | 3 | 4 | 5): string {
  return tokens.colors.energy[level].dark;
}

// Get energy shadow
export function getEnergyShadow(level: 1 | 2 | 3 | 4 | 5): string {
  return tokens.shadows.energy[level];
}

// Spacing helper
export function spacing(...values: Array<keyof typeof tokens.spacing>): string {
  return values.map(v => tokens.spacing[v]).join(' ');
}

// Type exports
export type EnergyLevel = 1 | 2 | 3 | 4 | 5;
export type ColorKey = keyof typeof tokens.colors;
export type SpacingKey = keyof typeof tokens.spacing;
export type RadiusKey = keyof typeof tokens.radius;
export type ShadowKey = keyof typeof tokens.shadows;

