/**
 * Community Hub System Component
 * 
 * User-generated content and sharing
 * Includes community features, content sharing, and collaboration
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
    followers: number;
  };
  category: 'tip' | 'workflow' | 'template' | 'question' | 'showcase' | 'announcement';
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
  attachments?: Array<{
    type: 'image' | 'file' | 'link';
    url: string;
    name: string;
  }>;
}

interface CommunityComment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
  replies?: CommunityComment[];
}

interface CommunityTemplate {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'workflow' | 'automation' | 'customization';
  author: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  downloads: number;
  rating: number;
  tags: string[];
  preview: string;
  isPublic: boolean;
  isFree: boolean;
  price?: number;
  createdAt: string;
  lastUpdated: string;
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  type: 'webinar' | 'workshop' | 'meetup' | 'challenge' | 'contest';
  host: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  startDate: string;
  endDate: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  isRegistered: boolean;
  isLive: boolean;
  tags: string[];
  createdAt: string;
}

interface CommunityHubProps {
  onClose: () => void;
}

const CommunityHub: React.FC<CommunityHubProps> = ({ onClose }) => {
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [communityComments, setCommunityComments] = useState<CommunityComment[]>([]);
  const [communityTemplates, setCommunityTemplates] = useState<CommunityTemplate[]>([]);
  const [communityEvents, setCommunityEvents] = useState<CommunityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'feed' | 'templates' | 'events' | 'trending'>('feed');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCommunityData();
  }, []);

  const loadCommunityData = async () => {
    setIsLoading(true);
    
    try {
      // Mock community posts
      const mockCommunityPosts: CommunityPost[] = [
        {
          id: 'post-1',
          title: '10 Productivity Tips That Changed My Life',
          content: 'After using SyncScript for 6 months, I\'ve discovered some incredible productivity techniques that have transformed how I work. Here are my top 10 tips...',
          author: {
            id: 'user-1',
            name: 'Sarah Johnson',
            avatar: 'https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=SJ',
            isVerified: true,
            followers: 1234
          },
          category: 'tip',
          tags: ['productivity', 'tips', 'workflow', 'efficiency'],
          likes: 89,
          comments: 23,
          shares: 12,
          views: 456,
          isLiked: false,
          isBookmarked: true,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          updatedAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'post-2',
          title: 'My Custom Task Automation Workflow',
          content: 'I\'ve created a powerful automation workflow that handles my daily tasks automatically. Here\'s how I set it up and how you can replicate it...',
          author: {
            id: 'user-2',
            name: 'Mike Chen',
            avatar: 'https://via.placeholder.com/40x40/059669/FFFFFF?text=MC',
            isVerified: true,
            followers: 892
          },
          category: 'workflow',
          tags: ['automation', 'workflow', 'tasks', 'productivity'],
          likes: 156,
          comments: 45,
          shares: 28,
          views: 789,
          isLiked: true,
          isBookmarked: false,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          updatedAt: new Date(Date.now() - 7200000).toISOString(),
          attachments: [
            {
              type: 'file',
              url: 'https://example.com/workflow-template.json',
              name: 'automation-workflow.json'
            }
          ]
        },
        {
          id: 'post-3',
          title: 'Showcase: My SyncScript Dashboard Setup',
          content: 'Check out my custom SyncScript dashboard! I\'ve organized everything for maximum efficiency and it\'s been a game-changer for my productivity.',
          author: {
            id: 'user-3',
            name: 'Emily Rodriguez',
            avatar: 'https://via.placeholder.com/40x40/DC2626/FFFFFF?text=ER',
            isVerified: false,
            followers: 567
          },
          category: 'showcase',
          tags: ['dashboard', 'customization', 'showcase', 'ui'],
          likes: 67,
          comments: 18,
          shares: 9,
          views: 234,
          isLiked: false,
          isBookmarked: false,
          createdAt: new Date(Date.now() - 10800000).toISOString(),
          updatedAt: new Date(Date.now() - 10800000).toISOString(),
          attachments: [
            {
              type: 'image',
              url: 'https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=Dashboard+Screenshot',
              name: 'dashboard-screenshot.png'
            }
          ]
        }
      ];

      // Mock community comments
      const mockCommunityComments: CommunityComment[] = [
        {
          id: 'comment-1',
          postId: 'post-1',
          author: {
            id: 'user-4',
            name: 'Alex Thompson',
            avatar: 'https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=AT',
            isVerified: true
          },
          content: 'Great tips! I especially love the energy management technique. It\'s made such a difference in my daily routine.',
          likes: 12,
          isLiked: false,
          createdAt: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: 'comment-2',
          postId: 'post-2',
          author: {
            id: 'user-5',
            name: 'Lisa Wang',
            avatar: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=LW',
            isVerified: false
          },
          content: 'This workflow is amazing! I\'ve been using it for a week and it\'s saved me so much time. Thank you for sharing!',
          likes: 8,
          isLiked: true,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        }
      ];

      // Mock community templates
      const mockCommunityTemplates: CommunityTemplate[] = [
        {
          id: 'template-1',
          name: 'Daily Productivity Template',
          description: 'A comprehensive template for daily productivity tracking and goal setting',
          category: 'productivity',
          author: {
            id: 'user-1',
            name: 'Sarah Johnson',
            avatar: 'https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=SJ',
            isVerified: true
          },
          downloads: 1234,
          rating: 4.8,
          tags: ['productivity', 'daily', 'goals', 'tracking'],
          preview: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Productivity+Template',
          isPublic: true,
          isFree: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          lastUpdated: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'template-2',
          name: 'Team Collaboration Workflow',
          description: 'Advanced workflow template for team collaboration and project management',
          category: 'workflow',
          author: {
            id: 'user-2',
            name: 'Mike Chen',
            avatar: 'https://via.placeholder.com/40x40/059669/FFFFFF?text=MC',
            isVerified: true
          },
          downloads: 892,
          rating: 4.9,
          tags: ['team', 'collaboration', 'workflow', 'project'],
          preview: 'https://via.placeholder.com/400x300/059669/FFFFFF?text=Team+Workflow',
          isPublic: true,
          isFree: false,
          price: 9.99,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          lastUpdated: new Date(Date.now() - 259200000).toISOString()
        },
        {
          id: 'template-3',
          name: 'Custom Theme Pack',
          description: 'Beautiful custom theme pack with multiple color schemes and layouts',
          category: 'customization',
          author: {
            id: 'user-6',
            name: 'Design Studio',
            avatar: 'https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=DS',
            isVerified: true
          },
          downloads: 567,
          rating: 4.6,
          tags: ['theme', 'customization', 'ui', 'design'],
          preview: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Theme+Pack',
          isPublic: true,
          isFree: false,
          price: 4.99,
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          lastUpdated: new Date(Date.now() - 345600000).toISOString()
        }
      ];

      // Mock community events
      const mockCommunityEvents: CommunityEvent[] = [
        {
          id: 'event-1',
          title: 'SyncScript Masterclass: Advanced Automation',
          description: 'Learn advanced automation techniques and workflow optimization in this comprehensive masterclass.',
          type: 'webinar',
          host: {
            id: 'user-7',
            name: 'SyncScript Team',
            avatar: 'https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=SS',
            isVerified: true
          },
          startDate: new Date(Date.now() + 86400000).toISOString(),
          endDate: new Date(Date.now() + 90000000).toISOString(),
          location: 'Online',
          maxParticipants: 100,
          currentParticipants: 67,
          isRegistered: true,
          isLive: false,
          tags: ['automation', 'webinar', 'learning', 'advanced'],
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'event-2',
          title: 'Productivity Challenge: 30-Day Transformation',
          description: 'Join our 30-day productivity challenge and transform your work habits with daily tasks and community support.',
          type: 'challenge',
          host: {
            id: 'user-1',
            name: 'Sarah Johnson',
            avatar: 'https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=SJ',
            isVerified: true
          },
          startDate: new Date(Date.now() + 172800000).toISOString(),
          endDate: new Date(Date.now() + 2592000000).toISOString(),
          location: 'Online',
          maxParticipants: 500,
          currentParticipants: 234,
          isRegistered: false,
          isLive: false,
          tags: ['challenge', 'productivity', '30-day', 'transformation'],
          createdAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'event-3',
          title: 'Live Q&A: SyncScript Tips & Tricks',
          description: 'Join us for a live Q&A session where we\'ll answer your questions and share expert tips.',
          type: 'meetup',
          host: {
            id: 'user-8',
            name: 'Community Moderators',
            avatar: 'https://via.placeholder.com/40x40/059669/FFFFFF?text=CM',
            isVerified: true
          },
          startDate: new Date(Date.now() + 3600000).toISOString(),
          endDate: new Date(Date.now() + 7200000).toISOString(),
          location: 'Online',
          maxParticipants: 200,
          currentParticipants: 89,
          isRegistered: false,
          isLive: true,
          tags: ['q&a', 'tips', 'live', 'community'],
          createdAt: new Date(Date.now() - 3600000).toISOString()
        }
      ];

      setCommunityPosts(mockCommunityPosts);
      setCommunityComments(mockCommunityComments);
      setCommunityTemplates(mockCommunityTemplates);
      setCommunityEvents(mockCommunityEvents);
    } catch (error) {
      console.error('Failed to load community data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const likePost = async (postId: string) => {
    try {
      setCommunityPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      ));
      
      console.log(`Liked post: ${postId}`);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const bookmarkPost = async (postId: string) => {
    try {
      setCommunityPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      ));
      
      console.log(`Bookmarked post: ${postId}`);
    } catch (error) {
      console.error('Failed to bookmark post:', error);
    }
  };

  const registerEvent = async (eventId: string) => {
    try {
      setCommunityEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { 
              ...event, 
              isRegistered: !event.isRegistered,
              currentParticipants: event.isRegistered 
                ? event.currentParticipants - 1 
                : event.currentParticipants + 1
            }
          : event
      ));
      
      console.log(`Registered for event: ${eventId}`);
    } catch (error) {
      console.error('Failed to register for event:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tip': return '💡';
      case 'workflow': return '⚡';
      case 'template': return '📋';
      case 'question': return '❓';
      case 'showcase': return '🎨';
      case 'announcement': return '📢';
      case 'productivity': return '📈';
      case 'automation': return '🤖';
      case 'customization': return '🎨';
      case 'webinar': return '🎓';
      case 'workshop': return '🔧';
      case 'meetup': return '👥';
      case 'challenge': return '🏆';
      case 'contest': return '🏅';
      default: return '📄';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tip': return 'text-blue-600 bg-blue-100';
      case 'workflow': return 'text-green-600 bg-green-100';
      case 'template': return 'text-purple-600 bg-purple-100';
      case 'question': return 'text-yellow-600 bg-yellow-100';
      case 'showcase': return 'text-pink-600 bg-pink-100';
      case 'announcement': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'webinar': return 'text-blue-600 bg-blue-100';
      case 'workshop': return 'text-green-600 bg-green-100';
      case 'meetup': return 'text-purple-600 bg-purple-100';
      case 'challenge': return 'text-orange-600 bg-orange-100';
      case 'contest': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredPosts = communityPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading community hub...</span>
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
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Community Hub</h2>
              <p className="text-pink-100 mt-1">User-generated content and sharing</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-pink-200 text-sm">Posts:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {communityPosts.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-pink-200 text-sm">Templates:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {communityTemplates.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-pink-200 text-sm">Events:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {communityEvents.length}
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

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search community content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              {['all', 'tip', 'workflow', 'template', 'question', 'showcase'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-pink-100 text-pink-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{getCategoryIcon(category)}</span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'feed', name: 'Community Feed', icon: '📰' },
              { id: 'templates', name: 'Templates', icon: '📋' },
              { id: 'events', name: 'Events', icon: '📅' },
              { id: 'trending', name: 'Trending', icon: '🔥' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-pink-500 text-pink-600'
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
          {selectedTab === 'feed' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Community Feed</h3>
              
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{post.author.name}</h4>
                          {post.author.isVerified && (
                            <span className="text-blue-500">✓</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Date(post.createdAt).toLocaleDateString()} • {post.author.followers} followers
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {getCategoryIcon(post.category)} {post.category.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900">{post.title}</h5>
                      <p className="text-sm text-gray-600">{post.content}</p>
                      
                      {post.attachments && (
                        <div className="space-y-2">
                          {post.attachments.map((attachment, index) => (
                            <div key={index} className="p-2 bg-gray-100 rounded text-sm">
                              <span className="text-gray-600">{attachment.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <span>{post.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{post.comments} comments</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{post.shares} shares</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => likePost(post.id)}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          post.isLiked 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        ❤️ {post.likes}
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        💬 Comment
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        📤 Share
                      </button>
                      <button
                        onClick={() => bookmarkPost(post.id)}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          post.isBookmarked 
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        🔖 Bookmark
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'templates' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Community Templates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {communityTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="space-y-3">
                      <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-gray-500">Template Preview</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <img 
                          src={template.author.avatar} 
                          alt={template.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.author.name}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          template.isFree ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {template.isFree ? 'FREE' : `$${template.price}`}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600">{template.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-gray-900">{template.rating}</span>
                        </div>
                        <div className="text-gray-600">{template.downloads} downloads</div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Download
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Preview
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'events' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Community Events</h3>
              
              <div className="space-y-4">
                {communityEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getCategoryIcon(event.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getEventTypeColor(event.type)}`}>
                          {event.type.toUpperCase()}
                        </span>
                        {event.isLive && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                            LIVE
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-600">Host:</span>
                          <span className="text-gray-900">{event.host.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-600">Date:</span>
                          <span className="text-gray-900">
                            {new Date(event.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-600">Location:</span>
                          <span className="text-gray-900">{event.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-600">Participants:</span>
                          <span className="text-gray-900">
                            {event.currentParticipants}/{event.maxParticipants}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {event.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => registerEvent(event.id)}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          event.isRegistered 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {event.isRegistered ? 'Unregister' : 'Register'}
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'trending' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Trending Content</h3>
              
              <div className="space-y-4">
                {communityPosts
                  .sort((a, b) => b.likes - a.likes)
                  .slice(0, 5)
                  .map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-pink-600">#{index + 1}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{post.title}</h4>
                          <p className="text-sm text-gray-600">{post.author.name}</p>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <span className="text-red-500">❤️</span>
                            <span className="text-gray-900">{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-blue-500">💬</span>
                            <span className="text-gray-900">{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Community Hub • {communityPosts.length} posts • {communityTemplates.length} templates • {communityEvents.length} events
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
                console.log('Exporting community hub data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CommunityHub;
