import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone, Calendar, FileText, BarChart3, Target, Users, Mail, Share2, Image, Video, Globe, TrendingUp, Clock, CheckCircle, AlertTriangle, Plus, Edit, Trash2, Save, Copy, ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'react-hot-toast';

// Marketing & Launch Preparation interfaces
interface MarketingAsset {
  id: string;
  name: string;
  type: 'logo' | 'banner' | 'social_post' | 'email_template' | 'press_release' | 'video' | 'infographic';
  status: 'draft' | 'review' | 'approved' | 'published';
  url: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

interface LaunchCampaign {
  id: string;
  name: string;
  type: 'product_hunt' | 'social_media' | 'email' | 'pr' | 'influencer' | 'content';
  status: 'planned' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
  budget: number;
  targetAudience: string[];
  metrics: CampaignMetrics;
  content: CampaignContent[];
}

interface CampaignMetrics {
  reach: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  roi: number;
}

interface CampaignContent {
  id: string;
  type: 'post' | 'email' | 'video' | 'article' | 'ad';
  title: string;
  content: string;
  platform: string;
  status: 'draft' | 'scheduled' | 'published';
  publishDate?: string;
}

interface ContentCalendar {
  id: string;
  title: string;
  type: 'blog_post' | 'social_media' | 'email' | 'video' | 'webinar';
  status: 'planned' | 'in_progress' | 'published';
  publishDate: string;
  platform: string;
  tags: string[];
}

interface PressKit {
  id: string;
  title: string;
  type: 'press_release' | 'media_kit' | 'fact_sheet' | 'biography';
  status: 'draft' | 'review' | 'approved' | 'distributed';
  content: string;
  attachments: string[];
  createdAt: string;
}

interface LaunchMetrics {
  totalReach: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalCost: number;
  averageROI: number;
  engagementRate: number;
  conversionRate: number;
}

const MarketingLaunchPreparation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [marketingAssets, setMarketingAssets] = useState<MarketingAsset[]>([]);
  const [launchCampaigns, setLaunchCampaigns] = useState<LaunchCampaign[]>([]);
  const [contentCalendar, setContentCalendar] = useState<ContentCalendar[]>([]);
  const [pressKit, setPressKit] = useState<PressKit[]>([]);
  const [launchMetrics, setLaunchMetrics] = useState<LaunchMetrics | null>(null);

  // SSR-safe data loading
  useEffect(() => {
    const loadMarketingData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock marketing assets
        const mockAssets: MarketingAsset[] = [
          {
            id: 'asset-1',
            name: 'SyncScript Logo Pack',
            type: 'logo',
            status: 'approved',
            url: '/assets/logo-pack.zip',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['branding', 'logo', 'primary']
          },
          {
            id: 'asset-2',
            name: 'Product Hunt Launch Banner',
            type: 'banner',
            status: 'published',
            url: '/assets/ph-banner.png',
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['product-hunt', 'launch', 'banner']
          }
        ];

        // Mock launch campaigns
        const mockCampaigns: LaunchCampaign[] = [
          {
            id: 'campaign-1',
            name: 'Product Hunt Launch',
            type: 'product_hunt',
            status: 'active',
            startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            budget: 5000,
            targetAudience: ['tech_enthusiasts', 'early_adopters'],
            metrics: {
              reach: 25000,
              impressions: 150000,
              clicks: 2500,
              conversions: 125,
              cost: 3500,
              roi: 257
            },
            content: [
              {
                id: 'content-1',
                type: 'post',
                title: 'Product Hunt Launch Post',
                content: '🚀 SyncScript is now live on Product Hunt!',
                platform: 'product_hunt',
                status: 'published',
                publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
              }
            ]
          }
        ];

        // Mock content calendar
        const mockCalendar: ContentCalendar[] = [
          {
            id: 'calendar-1',
            title: 'SyncScript Feature Spotlight',
            type: 'blog_post',
            status: 'planned',
            publishDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            platform: 'blog',
            tags: ['features', 'spotlight']
          }
        ];

        // Mock press kit
        const mockPressKit: PressKit[] = [
          {
            id: 'press-1',
            title: 'SyncScript Launch Press Release',
            type: 'press_release',
            status: 'approved',
            content: 'SyncScript revolutionizes productivity with AI-powered task management...',
            attachments: ['press-release.pdf', 'media-kit.zip'],
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock launch metrics
        const mockMetrics: LaunchMetrics = {
          totalReach: 50000,
          totalImpressions: 300000,
          totalClicks: 5000,
          totalConversions: 250,
          totalCost: 8000,
          averageROI: 312,
          engagementRate: 8.5,
          conversionRate: 5.0
        };

        setMarketingAssets(mockAssets);
        setLaunchCampaigns(mockCampaigns);
        setContentCalendar(mockCalendar);
        setPressKit(mockPressKit);
        setLaunchMetrics(mockMetrics);

        toast.success('Marketing & launch preparation data loaded successfully!');
      } catch (error) {
        console.error('Failed to load marketing data:', error);
        toast.error('Failed to load marketing data');
      } finally {
        setIsLoading(false);
      }
    };

    loadMarketingData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'assets', label: 'Assets', icon: Image },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'press', label: 'Press Kit', icon: FileText },
    { id: 'metrics', label: 'Metrics', icon: TrendingUp }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'review': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'published': return 'text-blue-600 bg-blue-100';
      case 'planned': return 'text-purple-600 bg-purple-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-orange-600 bg-orange-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Megaphone className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Marketing & Launch Preparation</h2>
                <p className="text-purple-100">Go-to-market strategy and launch campaigns</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-sm">Active</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-purple-100 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 h-full overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Total Reach</p>
                          <p className="text-3xl font-bold">{launchMetrics?.totalReach.toLocaleString()}</p>
                        </div>
                        <Users className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Conversions</p>
                          <p className="text-3xl font-bold">{launchMetrics?.totalConversions}</p>
                        </div>
                        <Target className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Average ROI</p>
                          <p className="text-3xl font-bold">{launchMetrics?.averageROI}%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Engagement Rate</p>
                          <p className="text-3xl font-bold">{launchMetrics?.engagementRate}%</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={launchCampaigns.map(campaign => ({
                          name: campaign.name,
                          roi: campaign.metrics.roi,
                          conversions: campaign.metrics.conversions
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="roi" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Asset Status</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Published', value: marketingAssets.filter(a => a.status === 'published').length },
                              { name: 'Approved', value: marketingAssets.filter(a => a.status === 'approved').length },
                              { name: 'Review', value: marketingAssets.filter(a => a.status === 'review').length },
                              { name: 'Draft', value: marketingAssets.filter(a => a.status === 'draft').length }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#3b82f6" />
                            <Cell fill="#10b981" />
                            <Cell fill="#f59e0b" />
                            <Cell fill="#6b7280" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'assets' && (
                <motion.div
                  key="assets"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {marketingAssets.map((asset) => (
                    <div key={asset.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Image className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{asset.name}</h3>
                            <p className="text-sm text-gray-600">{asset.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(asset.status)}`}>
                            {asset.status}
                          </span>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <ExternalLink className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {asset.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Edit
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'campaigns' && (
                <motion.div
                  key="campaigns"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {launchCampaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Target className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{campaign.name}</h3>
                            <p className="text-sm text-gray-600">{campaign.type.replace('_', ' ')} campaign</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            ROI: {campaign.metrics.roi}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Budget</span>
                          <p className="font-semibold">${campaign.budget.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Reach</span>
                          <p className="font-semibold">{campaign.metrics.reach.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Conversions</span>
                          <p className="font-semibold">{campaign.metrics.conversions}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Cost</span>
                          <p className="font-semibold">${campaign.metrics.cost.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'calendar' && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {contentCalendar.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Calendar className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {new Date(item.publishDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'press' && (
                <motion.div
                  key="press"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {pressKit.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <FileText className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{item.content.substring(0, 200)}...</p>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Edit
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Distribute
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'metrics' && launchMetrics && (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Total Impressions</p>
                          <p className="text-3xl font-bold">{launchMetrics.totalImpressions.toLocaleString()}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Total Clicks</p>
                          <p className="text-3xl font-bold">{launchMetrics.totalClicks.toLocaleString()}</p>
                        </div>
                        <Target className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Conversion Rate</p>
                          <p className="text-3xl font-bold">{launchMetrics.conversionRate}%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Total Cost</p>
                          <p className="text-3xl font-bold">${launchMetrics.totalCost.toLocaleString()}</p>
                        </div>
                        <Clock className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MarketingLaunchPreparation;