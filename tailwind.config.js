/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["class"],
  theme: {
    container: { 
      center: true, 
      padding: "1rem", 
      screens: { "2xl": "1400px" } 
    },
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "Monaco", "monospace"],
      },
      colors: {
        // Brand + UI tokens from blueprint
        bg: { 
          DEFAULT: "#0E1116", 
          raised: "#151923", 
          sunken: "#0B0E13" 
        },
        text: { 
          primary: "#E6EAF2", 
          subtle: "#B8C0CF", 
          mute: "#8C95A6" 
        },
        card: { 
          DEFAULT: "#141926", 
          hover: "#1A2132" 
        },
        border: { 
          DEFAULT: "#1F2A3B", 
          soft: "#131927" 
        },
        accent: { 
          green: "#3AE08D", 
          blue: "#51A4FF", 
          amber: "#F6A21A", 
          red: "#F07178", 
          purple: "#A78BFA" 
        },
        // Legacy colors for backward compatibility
        'syncscript-blue': {
          50: '#EBF5FF',
          100: '#D6EBFF',
          200: '#ADD6FF',
          300: '#85C2FF',
          400: '#5CADFF',
          500: '#51A4FF', // Updated to match accent.blue
          600: '#0A7AFF',
          700: '#0062CC',
          800: '#004999',
          900: '#003166',
        },
        'syncscript-green': {
          50: '#F0FFF4',
          100: '#C6F6D5',
          200: '#9AE6B4',
          300: '#68D391',
          400: '#48BB78',
          500: '#3AE08D', // Updated to match accent.green
          600: '#2F855A',
          700: '#276749',
          800: '#22543D',
          900: '#1C4532',
        },
      },
      borderRadius: { 
        xl: "16px", 
        "2xl": "20px" 
      },
      boxShadow: {
        card: "0 2px 24px rgba(0,0,0,.35)",
        glow: "0 0 0 1px rgba(255,255,255,.04), 0 10px 40px rgba(0,0,0,.55)",
        // Legacy shadows
        'glow-legacy': '0 depth 20px rgba(51, 153, 255, 0.5)',
        'glow-lg-legacy': '0 0 40px rgba(51, 153, 255, 0.6)',
      },
      backdropBlur: { 
        xs: "2px" 
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}

