/**
 * White-Label System Component
 * 
 * Provides customizable branding and theming for enterprise clients
 * Includes logo upload, color schemes, domain customization, and branding options
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BrandingSettings {
  logo: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    surface: string;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
    fontSize: 'small' | 'medium' | 'large';
  };
  domain: {
    customDomain: string;
    subdomain: string;
    sslEnabled: boolean;
  };
  features: {
    showBranding: boolean;
    customFooter: string;
    customFavicon: string;
    emailTemplates: boolean;
  };
}

interface WhiteLabelSystemProps {
  userId: string;
  onClose: () => void;
}

const FONT_OPTIONS = [
  { id: 'inter', name: 'Inter', category: 'Modern Sans-serif' },
  { id: 'roboto', name: 'Roboto', category: 'Google Font' },
  { id: 'opensans', name: 'Open Sans', category: 'Google Font' },
  { id: 'lato', name: 'Lato', category: 'Google Font' },
  { id: 'montserrat', name: 'Montserrat', category: 'Google Font' },
  { id: 'playfair', name: 'Playfair Display', category: 'Serif' },
  { id: 'merriweather', name: 'Merriweather', category: 'Serif' },
  { id: 'sourcecode', name: 'Source Code Pro', category: 'Monospace' }
];

const COLOR_PRESETS = [
  {
    name: 'Corporate Blue',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#1f2937',
      surface: '#f9fafb'
    }
  },
  {
    name: 'Professional Gray',
    colors: {
      primary: '#374151',
      secondary: '#1f2937',
      accent: '#6b7280',
      background: '#ffffff',
      text: '#111827',
      surface: '#f3f4f6'
    }
  },
  {
    name: 'Modern Purple',
    colors: {
      primary: '#7c3aed',
      secondary: '#5b21b6',
      accent: '#8b5cf6',
      background: '#ffffff',
      text: '#1f2937',
      surface: '#faf5ff'
    }
  },
  {
    name: 'Enterprise Green',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10b981',
      background: '#ffffff',
      text: '#1f2937',
      surface: '#f0fdf4'
    }
  },
  {
    name: 'Tech Orange',
    colors: {
      primary: '#ea580c',
      secondary: '#c2410c',
      accent: '#f97316',
      background: '#ffffff',
      text: '#1f2937',
      surface: '#fff7ed'
    }
  },
  {
    name: 'Dark Theme',
    colors: {
      primary: '#6366f1',
      secondary: '#4f46e5',
      accent: '#818cf8',
      background: '#0f172a',
      text: '#f1f5f9',
      surface: '#1e293b'
    }
  }
];

const WhiteLabelSystem: React.FC<WhiteLabelSystemProps> = ({ userId, onClose }) => {
  const [brandingSettings, setBrandingSettings] = useState<BrandingSettings>({
    logo: {
      url: '',
      alt: 'Company Logo',
      width: 120,
      height: 40
    },
    colors: COLOR_PRESETS[0].colors,
    typography: {
      fontFamily: 'inter',
      headingFont: 'inter',
      fontSize: 'medium'
    },
    domain: {
      customDomain: '',
      subdomain: '',
      sslEnabled: true
    },
    features: {
      showBranding: false,
      customFooter: '',
      customFavicon: '',
      emailTemplates: false
    }
  });
  
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const handleColorChange = (colorKey: keyof BrandingSettings['colors'], value: string) => {
    setBrandingSettings(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value
      }
    }));
  };

  const handlePresetApply = (presetName: string) => {
    const preset = COLOR_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setBrandingSettings(prev => ({
        ...prev,
        colors: preset.colors
      }));
      setSelectedPreset(presetName);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUrl = URL.createObjectURL(file);
      setBrandingSettings(prev => ({
        ...prev,
        logo: {
          ...prev.logo,
          url: mockUrl
        }
      }));
    } catch (error) {
      console.error('Failed to upload logo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('✅ White-label settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const generateCSSVariables = () => {
    const { colors, typography } = brandingSettings;
    return `
:root {
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-background: ${colors.background};
  --color-text: ${colors.text};
  --color-surface: ${colors.surface};
  --font-family: ${typography.fontFamily};
  --heading-font: ${typography.headingFont};
  --font-size: ${typography.fontSize};
}
    `.trim();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">White-Label System</h2>
              <p className="text-purple-100 mt-1">Customize branding and appearance for your organization</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[60vh]">
          {/* Settings Panel */}
          <div className="w-1/2 border-r border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-8">
              {/* Logo Upload */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo & Branding</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Logo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {brandingSettings.logo.url ? (
                        <div className="space-y-2">
                          <img
                            src={brandingSettings.logo.url}
                            alt={brandingSettings.logo.alt}
                            className="max-h-20 mx-auto"
                          />
                          <p className="text-sm text-gray-600">Logo uploaded successfully</p>
                          <button
                            onClick={() => setBrandingSettings(prev => ({ ...prev, logo: { ...prev.logo, url: '' } }))}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="mt-2">
                            <label htmlFor="logo-upload" className="cursor-pointer">
                              <span className="text-blue-600 hover:text-blue-800 font-medium">
                                Upload a logo
                              </span>
                              <input
                                id="logo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="hidden"
                              />
                            </label>
                            <p className="text-sm text-gray-600">PNG, JPG, SVG up to 2MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Scheme */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Scheme</h3>
                
                {/* Presets */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Presets
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => handlePresetApply(preset.name)}
                        className={`p-2 border rounded-lg text-left transition-all ${
                          selectedPreset === preset.name
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex space-x-1 mb-1">
                          {Object.values(preset.colors).slice(0, 4).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="text-xs font-medium text-gray-900">{preset.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Colors */}
                <div className="space-y-3">
                  {Object.entries(brandingSettings.colors).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-3">
                      <label className="w-24 text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </label>
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key as keyof BrandingSettings['colors'], e.target.value)}
                        className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleColorChange(key as keyof BrandingSettings['colors'], e.target.value)}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Family
                    </label>
                    <select
                      value={brandingSettings.typography.fontFamily}
                      onChange={(e) => setBrandingSettings(prev => ({
                        ...prev,
                        typography: { ...prev.typography, fontFamily: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {FONT_OPTIONS.map((font) => (
                        <option key={font.id} value={font.id}>
                          {font.name} - {font.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size
                    </label>
                    <select
                      value={brandingSettings.typography.fontSize}
                      onChange={(e) => setBrandingSettings(prev => ({
                        ...prev,
                        typography: { ...prev.typography, fontSize: e.target.value as any }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Domain Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Domain & Hosting</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Domain
                    </label>
                    <input
                      type="text"
                      value={brandingSettings.domain.customDomain}
                      onChange={(e) => setBrandingSettings(prev => ({
                        ...prev,
                        domain: { ...prev.domain, customDomain: e.target.value }
                      }))}
                      placeholder="yourcompany.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subdomain
                    </label>
                    <input
                      type="text"
                      value={brandingSettings.domain.subdomain}
                      onChange={(e) => setBrandingSettings(prev => ({
                        ...prev,
                        domain: { ...prev.domain, subdomain: e.target.value }
                      }))}
                      placeholder="app.yourcompany.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-1/2 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`px-3 py-1 text-sm rounded ${
                    previewMode === 'desktop' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'
                  }`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`px-3 py-1 text-sm rounded ${
                    previewMode === 'mobile' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'
                  }`}
                >
                  Mobile
                </button>
              </div>
            </div>

            {/* Preview Container */}
            <div className={`border border-gray-300 rounded-lg overflow-hidden ${
              previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
            }`}>
              <div
                className="p-6"
                style={{
                  backgroundColor: brandingSettings.colors.background,
                  color: brandingSettings.colors.text,
                  fontFamily: brandingSettings.typography.fontFamily
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  {brandingSettings.logo.url ? (
                    <img
                      src={brandingSettings.logo.url}
                      alt={brandingSettings.logo.alt}
                      className="h-8"
                    />
                  ) : (
                    <div
                      className="h-8 w-24 rounded"
                      style={{ backgroundColor: brandingSettings.colors.primary }}
                    />
                  )}
                  <div className="flex space-x-2">
                    <button
                      className="px-3 py-1 rounded text-sm"
                      style={{
                        backgroundColor: brandingSettings.colors.surface,
                        color: brandingSettings.colors.text
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      className="px-3 py-1 rounded text-sm text-white"
                      style={{ backgroundColor: brandingSettings.colors.primary }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>

                {/* Main Content */}
                <div className="space-y-4">
                  <h1
                    className="text-2xl font-bold"
                    style={{ color: brandingSettings.colors.primary }}
                  >
                    Welcome to Your Platform
                  </h1>
                  <p className="text-gray-600">
                    This is a preview of how your customized platform will look with your branding.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: brandingSettings.colors.surface }}
                    >
                      <h3 className="font-semibold mb-2">Feature 1</h3>
                      <p className="text-sm text-gray-600">Description of feature</p>
                    </div>
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: brandingSettings.colors.surface }}
                    >
                      <h3 className="font-semibold mb-2">Feature 2</h3>
                      <p className="text-sm text-gray-600">Description of feature</p>
                    </div>
                  </div>

                  <button
                    className="w-full py-2 rounded-lg text-white font-medium"
                    style={{ backgroundColor: brandingSettings.colors.primary }}
                  >
                    Get Started Now
                  </button>
                </div>
              </div>
            </div>

            {/* CSS Variables */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">Generated CSS Variables</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateCSSVariables()}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Changes will be applied to your white-label instance
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WhiteLabelSystem;
