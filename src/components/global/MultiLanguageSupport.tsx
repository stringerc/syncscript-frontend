/**
 * Multi-Language Support System Component
 * 
 * Internationalization (i18n) for global users
 * Includes language selection, translation management, and RTL support
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Language {
  id: string;
  name: string;
  nativeName: string;
  code: string;
  flag: string;
  rtl: boolean;
  completeness: number;
  lastUpdated: string;
  translator: string;
}

interface Translation {
  id: string;
  key: string;
  category: 'ui' | 'navigation' | 'features' | 'messages' | 'errors';
  translations: Record<string, string>;
  context?: string;
  needsReview: boolean;
}

interface LanguagePack {
  id: string;
  language: string;
  version: string;
  totalKeys: number;
  translatedKeys: number;
  downloadCount: number;
  rating: number;
}

interface MultiLanguageSupportProps {
  onClose: () => void;
}

const MultiLanguageSupport: React.FC<MultiLanguageSupportProps> = ({ onClose }) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [languagePacks, setLanguagePacks] = useState<LanguagePack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'languages' | 'translations' | 'packs' | 'settings'>('languages');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    loadLanguageData();
  }, []);

  const loadLanguageData = async () => {
    setIsLoading(true);
    
    try {
      // Mock languages
      const mockLanguages: Language[] = [
        {
          id: 'en',
          name: 'English',
          nativeName: 'English',
          code: 'en',
          flag: '🇺🇸',
          rtl: false,
          completeness: 100,
          lastUpdated: new Date(Date.now() - 86400000).toISOString(),
          translator: 'SyncScript Team'
        },
        {
          id: 'es',
          name: 'Spanish',
          nativeName: 'Español',
          code: 'es',
          flag: '🇪🇸',
          rtl: false,
          completeness: 95,
          lastUpdated: new Date(Date.now() - 172800000).toISOString(),
          translator: 'María García'
        },
        {
          id: 'fr',
          name: 'French',
          nativeName: 'Français',
          code: 'fr',
          flag: '🇫🇷',
          rtl: false,
          completeness: 88,
          lastUpdated: new Date(Date.now() - 259200000).toISOString(),
          translator: 'Pierre Dubois'
        },
        {
          id: 'de',
          name: 'German',
          nativeName: 'Deutsch',
          code: 'de',
          flag: '🇩🇪',
          rtl: false,
          completeness: 82,
          lastUpdated: new Date(Date.now() - 345600000).toISOString(),
          translator: 'Hans Mueller'
        },
        {
          id: 'zh',
          name: 'Chinese',
          nativeName: '中文',
          code: 'zh',
          flag: '🇨🇳',
          rtl: false,
          completeness: 75,
          lastUpdated: new Date(Date.now() - 432000000).toISOString(),
          translator: 'Li Wei'
        },
        {
          id: 'ja',
          name: 'Japanese',
          nativeName: '日本語',
          code: 'ja',
          flag: '🇯🇵',
          rtl: false,
          completeness: 68,
          lastUpdated: new Date(Date.now() - 518400000).toISOString(),
          translator: 'Yuki Tanaka'
        },
        {
          id: 'ko',
          name: 'Korean',
          nativeName: '한국어',
          code: 'ko',
          flag: '🇰🇷',
          rtl: false,
          completeness: 60,
          lastUpdated: new Date(Date.now() - 604800000).toISOString(),
          translator: 'Min-jun Kim'
        },
        {
          id: 'ar',
          name: 'Arabic',
          nativeName: 'العربية',
          code: 'ar',
          flag: '🇸🇦',
          rtl: true,
          completeness: 45,
          lastUpdated: new Date(Date.now() - 691200000).toISOString(),
          translator: 'Ahmed Al-Rashid'
        },
        {
          id: 'hi',
          name: 'Hindi',
          nativeName: 'हिन्दी',
          code: 'hi',
          flag: '🇮🇳',
          rtl: false,
          completeness: 35,
          lastUpdated: new Date(Date.now() - 777600000).toISOString(),
          translator: 'Priya Sharma'
        },
        {
          id: 'pt',
          name: 'Portuguese',
          nativeName: 'Português',
          code: 'pt',
          flag: '🇧🇷',
          rtl: false,
          completeness: 70,
          lastUpdated: new Date(Date.now() - 864000000).toISOString(),
          translator: 'Carlos Silva'
        }
      ];

      // Mock translations
      const mockTranslations: Translation[] = [
        {
          id: 'trans-1',
          key: 'dashboard.title',
          category: 'ui',
          translations: {
            en: 'Dashboard',
            es: 'Panel de Control',
            fr: 'Tableau de Bord',
            de: 'Dashboard',
            zh: '仪表板',
            ja: 'ダッシュボード',
            ko: '대시보드',
            ar: 'لوحة التحكم',
            hi: 'डैशबोर्ड',
            pt: 'Painel'
          },
          context: 'Main dashboard page title'
        },
        {
          id: 'trans-2',
          key: 'task.create',
          category: 'features',
          translations: {
            en: 'Create Task',
            es: 'Crear Tarea',
            fr: 'Créer une Tâche',
            de: 'Aufgabe Erstellen',
            zh: '创建任务',
            ja: 'タスクを作成',
            ko: '작업 생성',
            ar: 'إنشاء مهمة',
            hi: 'कार्य बनाएं',
            pt: 'Criar Tarefa'
          },
          context: 'Button to create a new task'
        },
        {
          id: 'trans-3',
          key: 'energy.level',
          category: 'features',
          translations: {
            en: 'Energy Level',
            es: 'Nivel de Energía',
            fr: 'Niveau d\'Énergie',
            de: 'Energielevel',
            zh: '能量等级',
            ja: 'エネルギーレベル',
            ko: '에너지 레벨',
            ar: 'مستوى الطاقة',
            hi: 'ऊर्जा स्तर',
            pt: 'Nível de Energia'
          },
          context: 'Energy level indicator'
        },
        {
          id: 'trans-4',
          key: 'error.network',
          category: 'errors',
          translations: {
            en: 'Network Error',
            es: 'Error de Red',
            fr: 'Erreur Réseau',
            de: 'Netzwerkfehler',
            zh: '网络错误',
            ja: 'ネットワークエラー',
            ko: '네트워크 오류',
            ar: 'خطأ في الشبكة',
            hi: 'नेटवर्क त्रुटि',
            pt: 'Erro de Rede'
          },
          context: 'Error message for network issues',
          needsReview: true
        }
      ];

      // Mock language packs
      const mockLanguagePacks: LanguagePack[] = [
        {
          id: 'pack-1',
          language: 'Spanish',
          version: '1.2.0',
          totalKeys: 1250,
          translatedKeys: 1187,
          downloadCount: 15420,
          rating: 4.8
        },
        {
          id: 'pack-2',
          language: 'French',
          version: '1.1.5',
          totalKeys: 1250,
          translatedKeys: 1100,
          downloadCount: 12850,
          rating: 4.6
        },
        {
          id: 'pack-3',
          language: 'German',
          version: '1.1.0',
          totalKeys: 1250,
          translatedKeys: 1025,
          downloadCount: 9870,
          rating: 4.4
        },
        {
          id: 'pack-4',
          language: 'Chinese',
          version: '1.0.8',
          totalKeys: 1250,
          translatedKeys: 937,
          downloadCount: 21500,
          rating: 4.7
        }
      ];

      setLanguages(mockLanguages);
      setTranslations(mockTranslations);
      setLanguagePacks(mockLanguagePacks);
    } catch (error) {
      console.error('Failed to load language data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (languageCode: string) => {
    setIsTranslating(true);
    
    try {
      // Simulate language change
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentLanguage(languageCode);
      console.log(`Language changed to: ${languageCode}`);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const getCompletenessColor = (completeness: number) => {
    if (completeness >= 90) return 'text-green-600 bg-green-100';
    if (completeness >= 70) return 'text-yellow-600 bg-yellow-100';
    if (completeness >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ui': return '🎨';
      case 'navigation': return '🧭';
      case 'features': return '⚙️';
      case 'messages': return '💬';
      case 'errors': return '⚠️';
      default: return '📄';
    }
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading language support...</span>
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
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Multi-Language Support</h2>
              <p className="text-blue-100 mt-1">Internationalization (i18n) for global users</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Languages:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {languages.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Translations:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {translations.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Current:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {languages.find(l => l.code === currentLanguage)?.name || 'English'}
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
              { id: 'languages', name: 'Languages', icon: '🌍' },
              { id: 'translations', name: 'Translations', icon: '📝' },
              { id: 'packs', name: 'Language Packs', icon: '📦' },
              { id: 'settings', name: 'Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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
          {selectedTab === 'languages' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Supported Languages</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {languages.map((language) => (
                  <motion.div
                    key={language.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all cursor-pointer ${
                      currentLanguage === language.code 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                    onClick={() => changeLanguage(language.code)}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{language.flag}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{language.name}</h4>
                        <p className="text-sm text-gray-600">{language.nativeName}</p>
                      </div>
                      {language.rtl && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          RTL
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Completeness:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCompletenessColor(language.completeness)}`}>
                          {language.completeness}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all" 
                          style={{ width: `${language.completeness}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Translator: {language.translator}
                      </div>
                      <div className="text-xs text-gray-500">
                        Updated: {new Date(language.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {isTranslating && currentLanguage === language.code && (
                      <div className="mt-2 flex items-center space-x-2 text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-sm">Switching...</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'translations' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Translation Management</h3>
              
              <div className="space-y-4">
                {translations.map((translation) => (
                  <motion.div
                    key={translation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getCategoryIcon(translation.category)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{translation.key}</h4>
                        <p className="text-sm text-gray-600 capitalize">{translation.category}</p>
                        {translation.context && (
                          <p className="text-xs text-gray-500 mt-1">{translation.context}</p>
                        )}
                      </div>
                      {translation.needsReview && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          NEEDS REVIEW
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {Object.entries(translation.translations).map(([lang, text]) => (
                        <div key={lang} className="p-2 bg-gray-50 rounded text-sm">
                          <div className="font-medium text-gray-700 mb-1">
                            {languages.find(l => l.code === lang)?.flag} {lang.toUpperCase()}
                          </div>
                          <div className="text-gray-600">{text}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'packs' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Language Packs</h3>
              
              <div className="space-y-4">
                {languagePacks.map((pack) => (
                  <motion.div
                    key={pack.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{pack.language}</h4>
                        <p className="text-sm text-gray-600">Version {pack.version}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {Math.round((pack.translatedKeys / pack.totalKeys) * 100)}% Complete
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          ⭐ {pack.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Keys:</span>
                        <span className="ml-2 text-gray-900">{pack.totalKeys}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Translated:</span>
                        <span className="ml-2 text-gray-900">{pack.translatedKeys}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Downloads:</span>
                        <span className="ml-2 text-gray-900">{pack.downloadCount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Rating:</span>
                        <span className="ml-2 text-gray-900">{pack.rating}/5</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Download
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Install
                      </button>
                      <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all">
                        Contribute
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Language Settings</h3>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Language Preferences</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Auto-detect language from browser</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Remember language preference</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">Show language selector in header</span>
                    </label>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Translation Settings</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Enable community translations</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">Show translation progress</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Notify about missing translations</span>
                    </label>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">RTL Support</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Enable RTL layout for Arabic/Hebrew</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Mirror UI elements for RTL</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Multi-Language Support • {languages.length} languages • {translations.length} translations • Current: {languages.find(l => l.code === currentLanguage)?.name || 'English'}
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
                console.log('Exporting language data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MultiLanguageSupport;
