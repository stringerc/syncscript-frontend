import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CacheEntry {
  id: string;
  key: string;
  type: 'api' | 'static' | 'user' | 'session';
  size: number;
  hits: number;
  misses: number;
  lastAccessed: Date;
  ttl: number;
  status: 'active' | 'expired' | 'invalidated';
}

interface CacheStats {
  totalEntries: number;
  totalSize: number;
  hitRate: number;
  missRate: number;
  memoryUsage: number;
  diskUsage: number;
  networkSavings: number;
}

const AdvancedCaching: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [stats, setStats] = useState<CacheStats>({
    totalEntries: 0,
    totalSize: 0,
    hitRate: 0,
    missRate: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkSavings: 0
  });
  const [selectedType, setSelectedType] = useState<string>('all');
  const [cacheStrategy, setCacheStrategy] = useState<'lru' | 'lfu' | 'fifo' | 'ttl'>('lru');
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Simulate cache data
  useEffect(() => {
    const generateCacheEntries = (): CacheEntry[] => {
      const types: ('api' | 'static' | 'user' | 'session')[] = ['api', 'static', 'user', 'session'];
      const entries: CacheEntry[] = [];

      for (let i = 0; i < 50; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const size = Math.random() * 1000 + 100;
        const hits = Math.floor(Math.random() * 100);
        const misses = Math.floor(Math.random() * 20);
        
        entries.push({
          id: `cache-${i}`,
          key: `${type}-${i}-${Math.random().toString(36).substr(2, 9)}`,
          type,
          size,
          hits,
          misses,
          lastAccessed: new Date(Date.now() - Math.random() * 86400000),
          ttl: Math.floor(Math.random() * 3600) + 300,
          status: Math.random() > 0.1 ? 'active' : 'expired'
        });
      }

      return entries;
    };

    const entries = generateCacheEntries();
    setCacheEntries(entries);

    // Calculate stats
    const totalEntries = entries.length;
    const totalSize = entries.reduce((sum, entry) => sum + entry.size, 0);
    const totalHits = entries.reduce((sum, entry) => sum + entry.hits, 0);
    const totalMisses = entries.reduce((sum, entry) => sum + entry.misses, 0);
    const hitRate = totalHits / (totalHits + totalMisses) * 100;
    const missRate = 100 - hitRate;
    const memoryUsage = (totalSize / 1024 / 1024) * 0.8; // 80% in memory
    const diskUsage = (totalSize / 1024 / 1024) * 0.2; // 20% on disk
    const networkSavings = totalHits * 0.5; // 0.5MB saved per hit

    setStats({
      totalEntries,
      totalSize,
      hitRate,
      missRate,
      memoryUsage,
      diskUsage,
      networkSavings
    });
  }, []);

  const filteredEntries = cacheEntries.filter(entry => 
    selectedType === 'all' || entry.type === selectedType
  );

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getCacheTypeColor = (type: string): string => {
    switch (type) {
      case 'api': return 'bg-blue-100 text-blue-800';
      case 'static': return 'bg-green-100 text-green-800';
      case 'user': return 'bg-purple-100 text-purple-800';
      case 'session': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-yellow-100 text-yellow-800';
      case 'invalidated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const optimizeCache = async () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Remove expired entries
    setCacheEntries(prev => prev.filter(entry => entry.status === 'active'));
    
    setIsOptimizing(false);
  };

  const clearCache = (type?: string) => {
    if (type) {
      setCacheEntries(prev => prev.filter(entry => entry.type !== type));
    } else {
      setCacheEntries([]);
    }
  };

  const invalidateEntry = (entryId: string) => {
    setCacheEntries(prev => prev.map(entry => 
      entry.id === entryId ? { ...entry, status: 'invalidated' } : entry
    ));
  };

  const cacheTypes = [
    { key: 'all', label: 'All Types', count: cacheEntries.length },
    { key: 'api', label: 'API Cache', count: cacheEntries.filter(e => e.type === 'api').length },
    { key: 'static', label: 'Static Assets', count: cacheEntries.filter(e => e.type === 'static').length },
    { key: 'user', label: 'User Data', count: cacheEntries.filter(e => e.type === 'user').length },
    { key: 'session', label: 'Session Data', count: cacheEntries.filter(e => e.type === 'session').length }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">⚡ Advanced Caching System</h2>
              <p className="text-green-100 mt-1">Multi-layer caching strategy and optimization</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Cache Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Entries</p>
                  <p className="text-2xl font-bold text-blue-800">{stats.totalEntries}</p>
                </div>
                <div className="text-3xl">📦</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Hit Rate</p>
                  <p className="text-2xl font-bold text-green-800">{stats.hitRate.toFixed(1)}%</p>
                </div>
                <div className="text-3xl">🎯</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Memory Usage</p>
                  <p className="text-2xl font-bold text-purple-800">{formatBytes(stats.memoryUsage * 1024 * 1024)}</p>
                </div>
                <div className="text-3xl">💾</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Network Savings</p>
                  <p className="text-2xl font-bold text-orange-800">{formatBytes(stats.networkSavings * 1024 * 1024)}</p>
                </div>
                <div className="text-3xl">🚀</div>
              </div>
            </div>
          </div>

          {/* Cache Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Strategy:</label>
                  <select
                    value={cacheStrategy}
                    onChange={(e) => setCacheStrategy(e.target.value as any)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="lru">LRU (Least Recently Used)</option>
                    <option value="lfu">LFU (Least Frequently Used)</option>
                    <option value="fifo">FIFO (First In First Out)</option>
                    <option value="ttl">TTL (Time To Live)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Type:</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    {cacheTypes.map(type => (
                      <option key={type.key} value={type.key}>
                        {type.label} ({type.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={optimizeCache}
                  disabled={isOptimizing}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isOptimizing ? '⏳ Optimizing...' : '🔧 Optimize Cache'}
                </button>
                <button
                  onClick={() => clearCache()}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Cache Entries Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Cache Entries ({filteredEntries.length})</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hits/Misses</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Accessed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TTL</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredEntries.map((entry) => (
                      <motion.tr
                        key={entry.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {entry.key}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCacheTypeColor(entry.type)}`}>
                            {entry.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatBytes(entry.size)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center space-x-2">
                              <span className="text-green-600">{entry.hits}</span>
                              <span className="text-gray-400">/</span>
                              <span className="text-red-600">{entry.misses}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {((entry.hits / (entry.hits + entry.misses)) * 100).toFixed(1)}% hit rate
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(entry.lastAccessed)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Math.floor(entry.ttl / 60)}m {entry.ttl % 60}s
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(entry.status)}`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => invalidateEntry(entry.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            Invalidate
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cache Performance Chart */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cache Performance Over Time</h3>
            <div className="h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📊</div>
                <p>Cache performance visualization would be displayed here</p>
                <p className="text-sm mt-2">Hit rate: {stats.hitRate.toFixed(1)}% | Miss rate: {stats.missRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedCaching;
