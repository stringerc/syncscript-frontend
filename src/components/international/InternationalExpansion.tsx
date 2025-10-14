import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, MapPin, Clock, DollarSign, Users, TrendingUp, Shield, CheckCircle, AlertTriangle, Settings, RefreshCw, Download, Upload, Maximize, Minimize, Filter, Search, Plus, Minus, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Code, Database, Cpu, HardDrive, Network, Lock, Bell, Eye, BarChart3, PieChart, LineChart, Activity, Star, Award, Crown, Sparkles, Zap, Target, Heart, ThumbsUp, ThumbsDown, Smile, Frown, Meh, Laugh, Angry, Surprised, MessageCircle, Mail, Phone, Video, Mic, Camera, Image, FileText, Link, Share2 } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  country: string;
  continent: string;
  timezone: string;
  currency: string;
  language: string;
  population: number;
  gdp: number;
  techAdoption: number;
  status: 'active' | 'pending' | 'maintenance' | 'planned';
  infrastructure: {
    cdn: boolean;
    database: boolean;
    api: boolean;
    storage: boolean;
    monitoring: boolean;
  };
  performance: {
    latency: number;
    uptime: number;
    throughput: number;
    errorRate: number;
  };
  compliance: {
    gdpr: boolean;
    ccpa: boolean;
    pipeda: boolean;
    lgpd: boolean;
    iso27001: boolean;
  };
  users: {
    total: number;
    active: number;
    premium: number;
    growth: number;
  };
  revenue: {
    monthly: number;
    annual: number;
    growth: number;
    currency: string;
  };
  lastDeployment: Date;
  nextMaintenance: Date;
}

interface Localization {
  id: string;
  language: string;
  locale: string;
  region: string;
  progress: {
    ui: number;
    content: number;
    features: number;
    documentation: number;
    overall: number;
  };
  translators: {
    total: number;
    active: number;
    native: number;
    certified: number;
  };
  quality: {
    score: number;
    reviews: number;
    issues: number;
    lastReview: Date;
  };
  content: {
    strings: number;
    translated: number;
    reviewed: number;
    published: number;
  };
  features: {
    rtl: boolean;
    currency: boolean;
    dateFormat: boolean;
    numberFormat: boolean;
    cultural: boolean;
  };
  status: 'active' | 'in-progress' | 'review' | 'pending';
  lastUpdated: Date;
  nextReview: Date;
}

interface RegionalCompliance {
  id: string;
  region: string;
  framework: 'gdpr' | 'ccpa' | 'pipeda' | 'lgpd' | 'iso27001' | 'sox' | 'hipaa';
  status: 'compliant' | 'partial' | 'non-compliant';
  score: number;
  requirements: {
    dataProcessing: boolean;
    consentManagement: boolean;
    dataPortability: boolean;
    rightToErasure: boolean;
    breachNotification: boolean;
    privacyByDesign: boolean;
  };
  implementation: {
    technical: boolean;
    legal: boolean;
    operational: boolean;
    training: boolean;
  };
  audit: {
    lastAudit: Date;
    nextAudit: Date;
    auditor: string;
    findings: string[];
    recommendations: string[];
  };
  documentation: {
    policies: string[];
    procedures: string[];
    training: string[];
    certifications: string[];
  };
}

interface CDNConfiguration {
  id: string;
  name: string;
  provider: 'cloudflare' | 'aws-cloudfront' | 'azure-cdn' | 'google-cloud-cdn';
  region: string;
  status: 'active' | 'pending' | 'maintenance';
  performance: {
    cacheHitRate: number;
    averageLatency: number;
    throughput: number;
    bandwidth: number;
  };
  configuration: {
    caching: {
      static: number;
      dynamic: number;
      api: number;
    };
    compression: boolean;
    minification: boolean;
    imageOptimization: boolean;
  };
  security: {
    ddosProtection: boolean;
    waf: boolean;
    ssl: boolean;
    encryption: boolean;
  };
  cost: {
    monthly: number;
    bandwidth: number;
    requests: number;
    currency: string;
  };
  lastOptimization: Date;
  nextReview: Date;
}

interface RegionalAnalytics {
  id: string;
  region: string;
  period: string;
  metrics: {
    users: {
      total: number;
      new: number;
      active: number;
      retention: number;
    };
    engagement: {
      sessions: number;
      duration: number;
      pages: number;
      bounceRate: number;
    };
    conversion: {
      signups: number;
      trials: number;
      paid: number;
      churn: number;
    };
    performance: {
      loadTime: number;
      errorRate: number;
      uptime: number;
      satisfaction: number;
    };
  };
  trends: {
    growth: number;
    engagement: number;
    conversion: number;
    performance: number;
  };
  insights: {
    topFeatures: string[];
    userBehavior: string[];
    painPoints: string[];
    opportunities: string[];
  };
  benchmarks: {
    industry: number;
    competitors: number;
    global: number;
  };
  lastUpdated: Date;
}

const InternationalExpansion: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [localizations, setLocalizations] = useState<Localization[]>([]);
  const [compliance, setCompliance] = useState<RegionalCompliance[]>([]);
  const [cdnConfigurations, setCdnConfigurations] = useState<CDNConfiguration[]>([]);
  const [regionalAnalytics, setRegionalAnalytics] = useState<RegionalAnalytics[]>([]);
  const [isDeployingRegion, setIsDeployingRegion] = useState(false);
  const [isUpdatingLocalization, setIsUpdatingLocalization] = useState(false);
  const [isOptimizingCDN, setIsOptimizingCDN] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedLocalization, setSelectedLocalization] = useState<Localization | null>(null);

  // Generate international expansion data
  useEffect(() => {
    const generateRegions = (): Region[] => {
      return [
        {
          id: 'region-1',
          name: 'North America',
          country: 'United States',
          continent: 'North America',
          timezone: 'America/New_York',
          currency: 'USD',
          language: 'en-US',
          population: 331000000,
          gdp: 23000000000000,
          techAdoption: 95,
          status: 'active',
          infrastructure: {
            cdn: true,
            database: true,
            api: true,
            storage: true,
            monitoring: true
          },
          performance: {
            latency: 45,
            uptime: 99.9,
            throughput: 10000,
            errorRate: 0.1
          },
          compliance: {
            gdpr: false,
            ccpa: true,
            pipeda: false,
            lgpd: false,
            iso27001: true
          },
          users: {
            total: 1500000,
            active: 1200000,
            premium: 450000,
            growth: 15
          },
          revenue: {
            monthly: 2500000,
            annual: 30000000,
            growth: 25,
            currency: 'USD'
          },
          lastDeployment: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'region-2',
          name: 'Europe',
          country: 'Germany',
          continent: 'Europe',
          timezone: 'Europe/Berlin',
          currency: 'EUR',
          language: 'de-DE',
          population: 83000000,
          gdp: 4200000000000,
          techAdoption: 88,
          status: 'active',
          infrastructure: {
            cdn: true,
            database: true,
            api: true,
            storage: true,
            monitoring: true
          },
          performance: {
            latency: 65,
            uptime: 99.8,
            throughput: 8500,
            errorRate: 0.2
          },
          compliance: {
            gdpr: true,
            ccpa: false,
            pipeda: false,
            lgpd: false,
            iso27001: true
          },
          users: {
            total: 850000,
            active: 680000,
            premium: 255000,
            growth: 22
          },
          revenue: {
            monthly: 1800000,
            annual: 21600000,
            growth: 30,
            currency: 'EUR'
          },
          lastDeployment: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          nextMaintenance: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'region-3',
          name: 'Asia Pacific',
          country: 'Japan',
          continent: 'Asia',
          timezone: 'Asia/Tokyo',
          currency: 'JPY',
          language: 'ja-JP',
          population: 125000000,
          gdp: 5000000000000,
          techAdoption: 92,
          status: 'pending',
          infrastructure: {
            cdn: true,
            database: false,
            api: false,
            storage: true,
            monitoring: false
          },
          performance: {
            latency: 120,
            uptime: 99.5,
            throughput: 6000,
            errorRate: 0.5
          },
          compliance: {
            gdpr: false,
            ccpa: false,
            pipeda: false,
            lgpd: false,
            iso27001: false
          },
          users: {
            total: 420000,
            active: 336000,
            premium: 126000,
            growth: 35
          },
          revenue: {
            monthly: 950000,
            annual: 11400000,
            growth: 40,
            currency: 'JPY'
          },
          lastDeployment: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          nextMaintenance: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'region-4',
          name: 'Latin America',
          country: 'Brazil',
          continent: 'South America',
          timezone: 'America/Sao_Paulo',
          currency: 'BRL',
          language: 'pt-BR',
          population: 215000000,
          gdp: 1600000000000,
          techAdoption: 75,
          status: 'planned',
          infrastructure: {
            cdn: false,
            database: false,
            api: false,
            storage: false,
            monitoring: false
          },
          performance: {
            latency: 200,
            uptime: 0,
            throughput: 0,
            errorRate: 0
          },
          compliance: {
            gdpr: false,
            ccpa: false,
            pipeda: false,
            lgpd: true,
            iso27001: false
          },
          users: {
            total: 180000,
            active: 144000,
            premium: 54000,
            growth: 50
          },
          revenue: {
            monthly: 380000,
            annual: 4560000,
            growth: 60,
            currency: 'BRL'
          },
          lastDeployment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          nextMaintenance: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    const generateLocalizations = (): Localization[] => {
      return [
        {
          id: 'loc-1',
          language: 'English',
          locale: 'en-US',
          region: 'North America',
          progress: {
            ui: 100,
            content: 100,
            features: 100,
            documentation: 100,
            overall: 100
          },
          translators: {
            total: 5,
            active: 5,
            native: 5,
            certified: 5
          },
          quality: {
            score: 98,
            reviews: 15,
            issues: 2,
            lastReview: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          },
          content: {
            strings: 2500,
            translated: 2500,
            reviewed: 2500,
            published: 2500
          },
          features: {
            rtl: false,
            currency: true,
            dateFormat: true,
            numberFormat: true,
            cultural: true
          },
          status: 'active',
          lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'loc-2',
          language: 'German',
          locale: 'de-DE',
          region: 'Europe',
          progress: {
            ui: 95,
            content: 88,
            features: 92,
            documentation: 85,
            overall: 90
          },
          translators: {
            total: 4,
            active: 4,
            native: 4,
            certified: 3
          },
          quality: {
            score: 92,
            reviews: 12,
            issues: 8,
            lastReview: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
          },
          content: {
            strings: 2500,
            translated: 2200,
            reviewed: 2100,
            published: 2000
          },
          features: {
            rtl: false,
            currency: true,
            dateFormat: true,
            numberFormat: true,
            cultural: true
          },
          status: 'active',
          lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'loc-3',
          language: 'Japanese',
          locale: 'ja-JP',
          region: 'Asia Pacific',
          progress: {
            ui: 75,
            content: 65,
            features: 70,
            documentation: 60,
            overall: 68
          },
          translators: {
            total: 3,
            active: 3,
            native: 3,
            certified: 2
          },
          quality: {
            score: 85,
            reviews: 8,
            issues: 15,
            lastReview: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
          },
          content: {
            strings: 2500,
            translated: 1625,
            reviewed: 1500,
            published: 1400
          },
          features: {
            rtl: false,
            currency: true,
            dateFormat: true,
            numberFormat: true,
            cultural: false
          },
          status: 'in-progress',
          lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'loc-4',
          language: 'Portuguese (Brazil)',
          locale: 'pt-BR',
          region: 'Latin America',
          progress: {
            ui: 45,
            content: 30,
            features: 35,
            documentation: 25,
            overall: 34
          },
          translators: {
            total: 2,
            active: 2,
            native: 2,
            certified: 1
          },
          quality: {
            score: 78,
            reviews: 5,
            issues: 25,
            lastReview: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
          },
          content: {
            strings: 2500,
            translated: 850,
            reviewed: 750,
            published: 600
          },
          features: {
            rtl: false,
            currency: true,
            dateFormat: false,
            numberFormat: false,
            cultural: false
          },
          status: 'in-progress',
          lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    const generateCompliance = (): RegionalCompliance[] => {
      return [
        {
          id: 'comp-1',
          region: 'Europe',
          framework: 'gdpr',
          status: 'compliant',
          score: 95,
          requirements: {
            dataProcessing: true,
            consentManagement: true,
            dataPortability: true,
            rightToErasure: true,
            breachNotification: true,
            privacyByDesign: true
          },
          implementation: {
            technical: true,
            legal: true,
            operational: true,
            training: true
          },
          audit: {
            lastAudit: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            nextAudit: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
            auditor: 'Deloitte',
            findings: ['Minor documentation gap in data retention policy'],
            recommendations: ['Update data retention documentation', 'Implement automated consent tracking']
          },
          documentation: {
            policies: ['GDPR Privacy Policy', 'Data Processing Agreement'],
            procedures: ['Data Breach Response', 'Consent Management'],
            training: ['GDPR Compliance Training', 'Data Protection Workshop'],
            certifications: ['ISO 27001', 'SOC 2 Type II']
          }
        },
        {
          id: 'comp-2',
          region: 'California',
          framework: 'ccpa',
          status: 'compliant',
          score: 92,
          requirements: {
            dataProcessing: true,
            consentManagement: true,
            dataPortability: true,
            rightToErasure: true,
            breachNotification: true,
            privacyByDesign: false
          },
          implementation: {
            technical: true,
            legal: true,
            operational: true,
            training: false
          },
          audit: {
            lastAudit: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            nextAudit: new Date(Date.now() + 305 * 24 * 60 * 60 * 1000),
            auditor: 'PwC',
            findings: ['Training program needs completion', 'Privacy by design implementation pending'],
            recommendations: ['Complete CCPA training program', 'Implement privacy by design framework']
          },
          documentation: {
            policies: ['CCPA Privacy Policy', 'Consumer Rights Policy'],
            procedures: ['Consumer Request Handling', 'Data Sale Opt-Out'],
            training: ['CCPA Compliance Training'],
            certifications: ['SOC 2 Type II']
          }
        },
        {
          id: 'comp-3',
          region: 'Brazil',
          framework: 'lgpd',
          status: 'partial',
          score: 68,
          requirements: {
            dataProcessing: true,
            consentManagement: true,
            dataPortability: false,
            rightToErasure: true,
            breachNotification: false,
            privacyByDesign: false
          },
          implementation: {
            technical: true,
            legal: true,
            operational: false,
            training: false
          },
          audit: {
            lastAudit: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            nextAudit: new Date(Date.now() + 275 * 24 * 60 * 60 * 1000),
            auditor: 'KPMG',
            findings: ['Data portability not implemented', 'Breach notification system missing', 'Training program not established'],
            recommendations: ['Implement data portability features', 'Establish breach notification system', 'Create LGPD training program']
          },
          documentation: {
            policies: ['LGPD Privacy Policy'],
            procedures: [],
            training: [],
            certifications: []
          }
        }
      ];
    };

    const generateCDNConfigurations = (): CDNConfiguration[] => {
      return [
        {
          id: 'cdn-1',
          name: 'North America CDN',
          provider: 'cloudflare',
          region: 'North America',
          status: 'active',
          performance: {
            cacheHitRate: 92,
            averageLatency: 45,
            throughput: 10000,
            bandwidth: 5000
          },
          configuration: {
            caching: {
              static: 86400,
              dynamic: 300,
              api: 60
            },
            compression: true,
            minification: true,
            imageOptimization: true
          },
          security: {
            ddosProtection: true,
            waf: true,
            ssl: true,
            encryption: true
          },
          cost: {
            monthly: 2500,
            bandwidth: 2000,
            requests: 500,
            currency: 'USD'
          },
          lastOptimization: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'cdn-2',
          name: 'Europe CDN',
          provider: 'aws-cloudfront',
          region: 'Europe',
          status: 'active',
          performance: {
            cacheHitRate: 89,
            averageLatency: 65,
            throughput: 8500,
            bandwidth: 4200
          },
          configuration: {
            caching: {
              static: 86400,
              dynamic: 300,
              api: 60
            },
            compression: true,
            minification: true,
            imageOptimization: true
          },
          security: {
            ddosProtection: true,
            waf: true,
            ssl: true,
            encryption: true
          },
          cost: {
            monthly: 2200,
            bandwidth: 1800,
            requests: 450,
            currency: 'EUR'
          },
          lastOptimization: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'cdn-3',
          name: 'Asia Pacific CDN',
          provider: 'azure-cdn',
          region: 'Asia Pacific',
          status: 'pending',
          performance: {
            cacheHitRate: 0,
            averageLatency: 0,
            throughput: 0,
            bandwidth: 0
          },
          configuration: {
            caching: {
              static: 86400,
              dynamic: 300,
              api: 60
            },
            compression: false,
            minification: false,
            imageOptimization: false
          },
          security: {
            ddosProtection: false,
            waf: false,
            ssl: false,
            encryption: false
          },
          cost: {
            monthly: 0,
            bandwidth: 0,
            requests: 0,
            currency: 'JPY'
          },
          lastOptimization: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    const generateRegionalAnalytics = (): RegionalAnalytics[] => {
      return [
        {
          id: 'analytics-1',
          region: 'North America',
          period: 'Last 30 days',
          metrics: {
            users: {
              total: 1500000,
              new: 45000,
              active: 1200000,
              retention: 87
            },
            engagement: {
              sessions: 8500000,
              duration: 18.5,
              pages: 4.2,
              bounceRate: 23
            },
            conversion: {
              signups: 45000,
              trials: 18000,
              paid: 7200,
              churn: 5.2
            },
            performance: {
              loadTime: 1.2,
              errorRate: 0.1,
              uptime: 99.9,
              satisfaction: 4.6
            }
          },
          trends: {
            growth: 15,
            engagement: 8,
            conversion: 12,
            performance: 5
          },
          insights: {
            topFeatures: ['Task Management', 'Analytics Dashboard', 'Team Collaboration'],
            userBehavior: ['Morning usage peak at 9 AM', 'Mobile usage increasing', 'Weekend engagement growing'],
            painPoints: ['Complex onboarding', 'Mobile app performance', 'Feature discovery'],
            opportunities: ['Mobile optimization', 'Onboarding simplification', 'Advanced analytics']
          },
          benchmarks: {
            industry: 4.2,
            competitors: 4.4,
            global: 4.3
          },
          lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: 'analytics-2',
          region: 'Europe',
          period: 'Last 30 days',
          metrics: {
            users: {
              total: 850000,
              new: 25000,
              active: 680000,
              retention: 91
            },
            engagement: {
              sessions: 4800000,
              duration: 22.3,
              pages: 5.1,
              bounceRate: 18
            },
            conversion: {
              signups: 25000,
              trials: 12000,
              paid: 4800,
              churn: 3.8
            },
            performance: {
              loadTime: 1.4,
              errorRate: 0.2,
              uptime: 99.8,
              satisfaction: 4.7
            }
          },
          trends: {
            growth: 22,
            engagement: 12,
            conversion: 18,
            performance: 8
          },
          insights: {
            topFeatures: ['Privacy Controls', 'Data Export', 'Team Management'],
            userBehavior: ['Strong privacy focus', 'Longer session duration', 'High feature adoption'],
            painPoints: ['Localization gaps', 'Payment methods', 'Support language'],
            opportunities: ['Enhanced privacy features', 'Local payment integration', 'Multi-language support']
          },
          benchmarks: {
            industry: 4.1,
            competitors: 4.3,
            global: 4.3
          },
          lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000)
        }
      ];
    };

    setRegions(generateRegions());
    setLocalizations(generateLocalizations());
    setCompliance(generateCompliance());
    setCdnConfigurations(generateCDNConfigurations());
    setRegionalAnalytics(generateRegionalAnalytics());
  }, []);

  const deployRegion = async (regionId: string) => {
    setIsDeployingRegion(true);
    
    // Simulate region deployment
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    // Update region status
    setRegions(prev => prev.map(region => 
      region.id === regionId 
        ? { 
            ...region, 
            status: 'active' as const,
            infrastructure: {
              cdn: true,
              database: true,
              api: true,
              storage: true,
              monitoring: true
            },
            performance: {
              ...region.performance,
              latency: Math.max(region.performance.latency - 20, 30),
              uptime: 99.8,
              errorRate: 0.2
            },
            lastDeployment: new Date()
          }
        : region
    ));
    
    setIsDeployingRegion(false);
  };

  const updateLocalization = async (localizationId: string) => {
    setIsUpdatingLocalization(true);
    
    // Simulate localization update
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Update localization progress
    setLocalizations(prev => prev.map(loc => 
      loc.id === localizationId 
        ? { 
            ...loc, 
            progress: {
              ui: Math.min(loc.progress.ui + 5, 100),
              content: Math.min(loc.progress.content + 8, 100),
              features: Math.min(loc.progress.features + 6, 100),
              documentation: Math.min(loc.progress.documentation + 7, 100),
              overall: Math.min(loc.progress.overall + 7, 100)
            },
            quality: {
              ...loc.quality,
              score: Math.min(loc.quality.score + 2, 100),
              issues: Math.max(loc.quality.issues - 2, 0)
            },
            lastUpdated: new Date()
          }
        : loc
    ));
    
    setIsUpdatingLocalization(false);
  };

  const optimizeCDN = async (cdnId: string) => {
    setIsOptimizingCDN(true);
    
    // Simulate CDN optimization
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Update CDN performance
    setCdnConfigurations(prev => prev.map(cdn => 
      cdn.id === cdnId 
        ? { 
            ...cdn, 
            performance: {
              cacheHitRate: Math.min(cdn.performance.cacheHitRate + 3, 100),
              averageLatency: Math.max(cdn.performance.averageLatency - 5, 20),
              throughput: cdn.performance.throughput + 500,
              bandwidth: cdn.performance.bandwidth + 200
            },
            lastOptimization: new Date()
          }
        : cdn
    ));
    
    setIsOptimizingCDN(false);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': case 'compliant': return 'bg-green-100 text-green-800';
      case 'pending': case 'in-progress': case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'planned': case 'review': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const totalRegions = regions.length;
  const activeRegions = regions.filter(r => r.status === 'active').length;
  const totalUsers = regions.reduce((sum, r) => sum + r.users.total, 0);
  const totalRevenue = regions.reduce((sum, r) => sum + r.revenue.monthly, 0);
  const avgUptime = regions.reduce((sum, r) => sum + r.performance.uptime, 0) / regions.length || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🌍 International Expansion</h2>
              <p className="text-blue-100 mt-1">Multi-region deployment and localization for global reach</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Global Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Active Regions</p>
                  <p className="text-2xl font-bold text-blue-800">{activeRegions}/{totalRegions}</p>
                  <p className="text-xs text-blue-600">Global presence</p>
                </div>
                <Globe className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-green-800">{formatNumber(totalUsers)}</p>
                  <p className="text-xs text-green-600">Global users</p>
                </div>
                <Users className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-purple-800">${formatNumber(totalRevenue)}</p>
                  <p className="text-xs text-purple-600">Global revenue</p>
                </div>
                <DollarSign className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Avg Uptime</p>
                  <p className="text-2xl font-bold text-indigo-800">{avgUptime.toFixed(1)}%</p>
                  <p className="text-xs text-indigo-600">Global performance</p>
                </div>
                <TrendingUp className="text-3xl text-indigo-600" />
              </div>
            </div>
          </div>

          {/* International Expansion Actions */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-blue-700 font-medium">
                🌍 International Expansion Active - Managing global regions, localizations, and compliance!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => deployRegion('region-3')}
                  disabled={isDeployingRegion}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isDeployingRegion ? '⏳ Deploying...' : '🚀 Deploy Region'}
                </button>
                <button
                  onClick={() => updateLocalization('loc-3')}
                  disabled={isUpdatingLocalization}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isUpdatingLocalization ? '⏳ Updating...' : '🌐 Update Localization'}
                </button>
                <button
                  onClick={() => optimizeCDN('cdn-1')}
                  disabled={isOptimizingCDN}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isOptimizingCDN ? '⏳ Optimizing...' : '⚡ Optimize CDN'}
                </button>
              </div>
            </div>
          </div>

          {/* Regional Deployment */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2 text-blue-600" />
              Regional Deployment ({regions.length})
            </h3>
            <div className="space-y-4">
              {regions.map((region) => (
                <div key={region.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{region.name}</h4>
                      <p className="text-sm text-gray-600">{region.country} • {region.continent} • {region.currency}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(region.status)}`}>
                      {region.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Users:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatNumber(region.users.total)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-gray-900 ml-1">{region.currency} {formatNumber(region.revenue.monthly)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Latency:</span>
                      <span className="font-medium text-gray-900 ml-1">{region.performance.latency}ms</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Uptime:</span>
                      <span className="font-medium text-gray-900 ml-1">{region.performance.uptime}%</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Infrastructure:</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {Object.entries(region.infrastructure).map(([key, value]) => (
                        <span key={key} className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {key}: {value ? '✅' : '❌'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Compliance:</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {Object.entries(region.compliance).map(([key, value]) => (
                        <span key={key} className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {key}: {value ? '✅' : '❌'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Language:</span> {region.language} | 
                    <span className="font-medium ml-2">Timezone:</span> {region.timezone} | 
                    <span className="font-medium ml-2">Last Deployment:</span> {region.lastDeployment.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Growth:</span> +{region.users.growth}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Localization Management */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Globe className="mr-2 text-green-600" />
              Localization Management ({localizations.length})
            </h3>
            <div className="space-y-4">
              {localizations.map((localization) => (
                <div key={localization.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{localization.language}</h4>
                      <p className="text-sm text-gray-600">{localization.locale} • {localization.region}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(localization.status)}`}>
                      {localization.status}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Overall Progress</span>
                      <span className="font-medium text-gray-900">{localization.progress.overall}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          localization.progress.overall >= 80 ? 'bg-green-500' :
                          localization.progress.overall >= 60 ? 'bg-yellow-500' :
                          localization.progress.overall >= 40 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${localization.progress.overall}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">UI:</span>
                      <span className="font-medium text-gray-900 ml-1">{localization.progress.ui}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Content:</span>
                      <span className="font-medium text-gray-900 ml-1">{localization.progress.content}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Features:</span>
                      <span className="font-medium text-gray-900 ml-1">{localization.progress.features}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Quality:</span>
                      <span className="font-medium text-gray-900 ml-1">{localization.quality.score}/100</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Features:</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {Object.entries(localization.features).map(([key, value]) => (
                        <span key={key} className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {key}: {value ? '✅' : '❌'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Translators:</span>
                      <span className="font-medium text-gray-900 ml-1">{localization.translators.active}/{localization.translators.total}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Strings:</span>
                      <span className="font-medium text-gray-900 ml-1">{localization.content.translated}/{localization.content.strings}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Issues:</span>
                      <span className="font-medium text-red-600 ml-1">{localization.quality.issues}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Reviews:</span>
                      <span className="font-medium text-gray-900 ml-1">{localization.quality.reviews}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last Updated:</span> {localization.lastUpdated.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Next Review:</span> {localization.nextReview.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Native Speakers:</span> {localization.translators.native}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Compliance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="mr-2 text-red-600" />
              Regional Compliance ({compliance.length})
            </h3>
            <div className="space-y-4">
              {compliance.map((comp) => (
                <div key={comp.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{comp.framework.toUpperCase()}</h4>
                      <p className="text-sm text-gray-600">{comp.region}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(comp.status)}`}>
                        {comp.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {comp.score}/100
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Compliance Score</span>
                      <span className="font-medium text-gray-900">{comp.score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          comp.score >= 90 ? 'bg-green-500' :
                          comp.score >= 70 ? 'bg-yellow-500' :
                          comp.score >= 50 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${comp.score}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Requirements:</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(comp.requirements).map(([key, value]) => (
                        <span key={key} className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {key}: {value ? '✅' : '❌'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Implementation:</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {Object.entries(comp.implementation).map(([key, value]) => (
                        <span key={key} className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {key}: {value ? '✅' : '❌'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last Audit:</span> {comp.audit.lastAudit.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Next Audit:</span> {comp.audit.nextAudit.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Auditor:</span> {comp.audit.auditor} | 
                    <span className="font-medium ml-2">Findings:</span> {comp.audit.findings.length}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CDN Configuration */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Network className="mr-2 text-purple-600" />
              CDN Configuration ({cdnConfigurations.length})
            </h3>
            <div className="space-y-4">
              {cdnConfigurations.map((cdn) => (
                <div key={cdn.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{cdn.name}</h4>
                      <p className="text-sm text-gray-600">{cdn.provider} • {cdn.region}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cdn.status)}`}>
                      {cdn.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Cache Hit Rate:</span>
                      <span className="font-medium text-gray-900 ml-1">{cdn.performance.cacheHitRate}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Latency:</span>
                      <span className="font-medium text-gray-900 ml-1">{cdn.performance.averageLatency}ms</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Throughput:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatNumber(cdn.performance.throughput)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Monthly Cost:</span>
                      <span className="font-medium text-gray-900 ml-1">{cdn.cost.currency} {formatNumber(cdn.cost.monthly)}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Security:</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {Object.entries(cdn.security).map(([key, value]) => (
                        <span key={key} className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {key}: {value ? '✅' : '❌'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last Optimization:</span> {cdn.lastOptimization.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Next Review:</span> {cdn.nextReview.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Bandwidth:</span> {formatNumber(cdn.performance.bandwidth)} GB
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InternationalExpansion;
