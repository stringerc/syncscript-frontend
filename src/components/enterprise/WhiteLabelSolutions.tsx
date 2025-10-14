/**
 * White-Label Solutions Component
 * 
 * Custom branding and domain management for enterprise clients
 * Includes theme customization, domain configuration, and brand assets
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BrandTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  logo?: string;
  favicon?: string;
  customCSS?: string;
}

interface DomainConfig {
  id: string;
  domain: string;
  subdomain: string;
  sslEnabled: boolean;
  status: 'active' | 'pending' | 'error';
  createdAt: string;
  lastVerified?: string;
}

interface BrandAsset {
  id: string;
  name: string;
  type: 'logo' | 'favicon' | 'banner' | 'icon' | 'background';
  url: string;
  size: number;
  format: string;
  uploadedAt: string;
}

interface WhiteLabelConfig {
  organizationName: string;
  tagline: string;
  contactEmail: string;
  supportUrl: string;
  privacyPolicyUrl: string;
  termsOfServiceUrl: string;
  customFooterText: string;
  features: {
    customDomain: boolean;
    customBranding: boolean;
    customEmail: boolean;
    customSupport: boolean;
    removeBranding: boolean;
  };
}

interface WhiteLabelSolutionsProps {
  onClose: () => void;
}

const WhiteLabelSolutions: React.FC<WhiteLabelSolutionsProps> = ({ onClose }) => {
  const [brandThemes, setBrandThemes] = useState<BrandTheme[]>([]);
  const [domainConfigs, setDomainConfigs] = useState<DomainConfig[]>([]);
  const [brandAssets, setBrandAssets] = useState<BrandAsset[]>([]);
  const [whiteLabelConfig, setWhiteLabelConfig] = useState<WhiteLabelConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'themes' | 'domains' | 'assets' | 'config'>('themes');
  const [selectedTheme, setSelectedTheme] = useState<BrandTheme | null>(null);

  useEffect(() => {
    loadWhiteLabelData();
  }, []);

  const loadWhiteLabelData = async () => {
    setIsLoading(true);
    
    try {
      // Mock brand themes
      const mockThemes: BrandTheme[] = [
        {
          id: 'theme-1',
          name: 'Corporate Blue',
          primaryColor: '#2563eb',
          secondaryColor: '#1d4ed8',
          accentColor: '#3b82f6',
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          logo: 'https://example.com/logos/corporate-blue.png',
          favicon: 'https://example.com/favicons/corporate-blue.ico',
          customCSS: `
            .primary-button {
              background-color: #2563eb;
              color: white;
            }
            .header {
              background: linear-gradient(135deg, #2563eb, #1d4ed8);
            }
          `
        },
        {
          id: 'theme-2',
          name: 'Modern Green',
          primaryColor: '#059669',
          secondaryColor: '#047857',
          accentColor: '#10b981',
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          logo: 'https://example.com/logos/modern-green.png',
          favicon: 'https://example.com/favicons/modern-green.ico',
          customCSS: `
            .primary-button {
              background-color: #059669;
              color: white;
            }
            .header {
              background: linear-gradient(135deg, #059669, #047857);
            }
          `
        },
        {
          id: 'theme-3',
          name: 'Elegant Purple',
          primaryColor: '#7c3aed',
          secondaryColor: '#6d28d9',
          accentColor: '#8b5cf6',
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          logo: 'https://example.com/logos/elegant-purple.png',
          favicon: 'https://example.com/favicons/elegant-purple.ico',
          customCSS: `
            .primary-button {
              background-color: #7c3aed;
              color: white;
            }
            .header {
              background: linear-gradient(135deg, #7c3aed, #6d28d9);
            }
          `
        }
      ];

      // Mock domain configurations
      const mockDomains: DomainConfig[] = [
        {
          id: 'domain-1',
          domain: 'productivity.acme.com',
          subdomain: 'productivity',
          sslEnabled: true,
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z',
          lastVerified: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'domain-2',
          domain: 'tasks.company.com',
          subdomain: 'tasks',
          sslEnabled: true,
          status: 'pending',
          createdAt: '2024-01-15T00:00:00Z',
          lastVerified: undefined
        }
      ];

      // Mock brand assets
      const mockAssets: BrandAsset[] = [
        {
          id: 'asset-1',
          name: 'Company Logo',
          type: 'logo',
          url: 'https://example.com/assets/company-logo.png',
          size: 245760, // 240KB
          format: 'PNG',
          uploadedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: 'asset-2',
          name: 'Favicon',
          type: 'favicon',
          url: 'https://example.com/assets/favicon.ico',
          size: 10240, // 10KB
          format: 'ICO',
          uploadedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: 'asset-3',
          name: 'Hero Banner',
          type: 'banner',
          url: 'https://example.com/assets/hero-banner.jpg',
          size: 1048576, // 1MB
          format: 'JPG',
          uploadedAt: '2024-01-05T00:00:00Z'
        }
      ];

      // Mock white label configuration
      const mockConfig: WhiteLabelConfig = {
        organizationName: 'Acme Corporation',
        tagline: 'Empowering Productivity Through Innovation',
        contactEmail: 'support@acme.com',
        supportUrl: 'https://support.acme.com',
        privacyPolicyUrl: 'https://acme.com/privacy',
        termsOfServiceUrl: 'https://acme.com/terms',
        customFooterText: '© 2024 Acme Corporation. All rights reserved.',
        features: {
          customDomain: true,
          customBranding: true,
          customEmail: true,
          customSupport: true,
          removeBranding: true
        }
      };

      setBrandThemes(mockThemes);
      setDomainConfigs(mockDomains);
      setBrandAssets(mockAssets);
      setWhiteLabelConfig(mockConfig);
    } catch (error) {
      console.error('Failed to load white label data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createBrandTheme = async (theme: Omit<BrandTheme, 'id'>) => {
    try {
      const newTheme: BrandTheme = {
        ...theme,
        id: `theme_${Date.now()}`
      };
      
      setBrandThemes(prev => [...prev, newTheme]);
    } catch (error) {
      console.error('Failed to create brand theme:', error);
    }
  };

  const addDomain = async (domain: Omit<DomainConfig, 'id' | 'createdAt'>) => {
    try {
      const newDomain: DomainConfig = {
        ...domain,
        id: `domain_${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      
      setDomainConfigs(prev => [...prev, newDomain]);
    } catch (error) {
      console.error('Failed to add domain:', error);
    }
  };

  const uploadAsset = async (asset: Omit<BrandAsset, 'id' | 'uploadedAt'>) => {
    try {
      const newAsset: BrandAsset = {
        ...asset,
        id: `asset_${Date.now()}`,
        uploadedAt: new Date().toISOString()
      };
      
      setBrandAssets(prev => [...prev, newAsset]);
    } catch (error) {
      console.error('Failed to upload asset:', error);
    }
  };

  const updateWhiteLabelConfig = async (updates: Partial<WhiteLabelConfig>) => {
    try {
      if (whiteLabelConfig) {
        setWhiteLabelConfig({ ...whiteLabelConfig, ...updates });
      }
    } catch (error) {
      console.error('Failed to update white label config:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'logo': return '🖼️';
      case 'favicon': return '🌐';
      case 'banner': return '📸';
      case 'icon': return '🎨';
      case 'background': return '🖼️';
      default: return '📁';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading white label configuration...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">White-Label Solutions</h2>
              <p className="text-indigo-100 mt-1">Custom branding and domain management</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-200 text-sm">Themes:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {brandThemes.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-200 text-sm">Domains:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {domainConfigs.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-200 text-sm">Assets:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {brandAssets.length}
                  </span>
                </div>
              </div>
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

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'themes', name: 'Brand Themes', icon: '🎨' },
              { id: 'domains', name: 'Domains', icon: '🌐' },
              { id: 'assets', name: 'Brand Assets', icon: '📁' },
              { id: 'config', name: 'Configuration', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'themes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Brand Themes</h3>
                <button
                  onClick={() => {
                    createBrandTheme({
                      name: 'Custom Theme',
                      primaryColor: '#000000',
                      secondaryColor: '#333333',
                      accentColor: '#666666',
                      backgroundColor: '#ffffff',
                      textColor: '#000000'
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create Theme
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brandThemes.map((theme) => (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900">{theme.name}</h4>
                      <p className="text-sm text-gray-600">Custom brand theme</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: theme.primaryColor }}
                        ></div>
                        <span className="text-sm text-gray-600">Primary: {theme.primaryColor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: theme.secondaryColor }}
                        ></div>
                        <span className="text-sm text-gray-600">Secondary: {theme.secondaryColor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: theme.accentColor }}
                        ></div>
                        <span className="text-sm text-gray-600">Accent: {theme.accentColor}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedTheme(theme)}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200 transition-all"
                      >
                        Preview
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Apply
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'domains' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Domain Configuration</h3>
                <button
                  onClick={() => {
                    addDomain({
                      domain: 'new.company.com',
                      subdomain: 'new',
                      sslEnabled: true,
                      status: 'pending'
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Domain
                </button>
              </div>
              
              <div className="space-y-4">
                {domainConfigs.map((domain) => (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{domain.domain}</h4>
                        <p className="text-sm text-gray-600">Subdomain: {domain.subdomain}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(domain.status)}`}>
                          {domain.status.toUpperCase()}
                        </span>
                        {domain.sslEnabled && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            SSL
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Created:</span>
                        <span className="ml-2 text-gray-900">{new Date(domain.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Verified:</span>
                        <span className="ml-2 text-gray-900">
                          {domain.lastVerified ? new Date(domain.lastVerified).toLocaleDateString() : 'Never'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Verify
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Configure DNS
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'assets' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Brand Assets</h3>
                <button
                  onClick={() => {
                    uploadAsset({
                      name: 'New Asset',
                      type: 'logo',
                      url: 'https://example.com/new-asset.png',
                      size: 102400,
                      format: 'PNG'
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Upload Asset
                </button>
              </div>
              
              <div className="space-y-4">
                {brandAssets.map((asset) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getAssetTypeIcon(asset.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{asset.name}</h4>
                        <p className="text-sm text-gray-600">
                          {asset.format} • {formatFileSize(asset.size)}
                        </p>
                      </div>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {asset.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Uploaded:</span>
                        <span className="ml-2 text-gray-900">{new Date(asset.uploadedAt).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Size:</span>
                        <span className="ml-2 text-gray-900">{formatFileSize(asset.size)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <a
                        href={asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all"
                      >
                        View
                      </a>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Download
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'config' && whiteLabelConfig && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">White-Label Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Organization Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                      <input
                        type="text"
                        value={whiteLabelConfig.organizationName}
                        onChange={(e) => updateWhiteLabelConfig({ organizationName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={whiteLabelConfig.tagline}
                        onChange={(e) => updateWhiteLabelConfig({ tagline: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                      <input
                        type="email"
                        value={whiteLabelConfig.contactEmail}
                        onChange={(e) => updateWhiteLabelConfig({ contactEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">URLs & Links</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Support URL</label>
                      <input
                        type="url"
                        value={whiteLabelConfig.supportUrl}
                        onChange={(e) => updateWhiteLabelConfig({ supportUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Privacy Policy URL</label>
                      <input
                        type="url"
                        value={whiteLabelConfig.privacyPolicyUrl}
                        onChange={(e) => updateWhiteLabelConfig({ privacyPolicyUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Terms of Service URL</label>
                      <input
                        type="url"
                        value={whiteLabelConfig.termsOfServiceUrl}
                        onChange={(e) => updateWhiteLabelConfig({ termsOfServiceUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Features</h4>
                  <div className="space-y-3">
                    {Object.entries(whiteLabelConfig.features).map(([feature, enabled]) => (
                      <div key={feature} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize">{feature.replace(/([A-Z])/g, ' $1')}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => updateWhiteLabelConfig({
                              features: { ...whiteLabelConfig.features, [feature]: e.target.checked }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Custom Footer</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
                    <textarea
                      value={whiteLabelConfig.customFooterText}
                      onChange={(e) => updateWhiteLabelConfig({ customFooterText: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            White-Label Solutions • {brandThemes.length} themes • {domainConfigs.length} domains • {brandAssets.length} assets
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                console.log('Exporting white label data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WhiteLabelSolutions;
