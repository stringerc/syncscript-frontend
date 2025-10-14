import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'stream' | 'webhook';
  description: string;
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  connectionString: string;
  lastSync: Date;
  recordCount: number;
  dataSize: number;
  schema: DataSchema;
  permissions: DataPermission[];
  retentionPolicy: RetentionPolicy;
  encryption: EncryptionSettings;
}

interface DataSchema {
  tables: DataTable[];
  relationships: DataRelationship[];
  indexes: DataIndex[];
  constraints: DataConstraint[];
}

interface DataTable {
  name: string;
  columns: DataColumn[];
  rowCount: number;
  size: number;
  lastModified: Date;
}

interface DataColumn {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  foreignKey: string | null;
  defaultValue: any;
  constraints: string[];
}

interface DataRelationship {
  id: string;
  fromTable: string;
  toTable: string;
  fromColumn: string;
  toColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

interface DataIndex {
  name: string;
  table: string;
  columns: string[];
  type: 'primary' | 'unique' | 'index';
  performance: number;
}

interface DataConstraint {
  name: string;
  table: string;
  type: 'check' | 'foreign-key' | 'unique' | 'not-null';
  definition: string;
}

interface DataPermission {
  id: string;
  user: string;
  role: string;
  permissions: string[];
  tables: string[];
  grantedBy: string;
  grantedAt: Date;
  expiresAt: Date | null;
}

interface RetentionPolicy {
  enabled: boolean;
  duration: number;
  unit: 'days' | 'weeks' | 'months' | 'years';
  action: 'delete' | 'archive' | 'compress';
  tables: string[];
}

interface EncryptionSettings {
  enabled: boolean;
  algorithm: string;
  keyManagement: 'internal' | 'external';
  encryptedColumns: string[];
  compliance: string[];
}

interface DataQualityRule {
  id: string;
  name: string;
  description: string;
  table: string;
  column: string;
  ruleType: 'completeness' | 'accuracy' | 'consistency' | 'validity' | 'uniqueness';
  condition: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  lastRun: Date;
  violations: number;
}

interface DataLineage {
  id: string;
  source: string;
  target: string;
  transformation: string;
  dependencies: string[];
  lastUpdated: Date;
  impact: 'low' | 'medium' | 'high';
}

const AdvancedDataManagement: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [qualityRules, setQualityRules] = useState<DataQualityRule[]>([]);
  const [dataLineage, setDataLineage] = useState<DataLineage[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isRunningQualityCheck, setIsRunningQualityCheck] = useState(false);
  const [isOptimizingData, setIsOptimizingData] = useState(false);

  // Generate data management data
  useEffect(() => {
    const generateDataSources = (): DataSource[] => {
      const sourceData = [
        {
          name: 'PostgreSQL Main DB',
          type: 'database' as const,
          description: 'Primary application database',
          status: 'active' as const,
          connectionString: 'postgresql://user:***@localhost:5432/syncscript',
          recordCount: 1250000,
          dataSize: 2048000000
        },
        {
          name: 'MongoDB Analytics',
          type: 'database' as const,
          description: 'Analytics and reporting database',
          status: 'active' as const,
          connectionString: 'mongodb://user:***@localhost:27017/analytics',
          recordCount: 890000,
          dataSize: 1536000000
        },
        {
          name: 'Redis Cache',
          type: 'database' as const,
          description: 'In-memory cache and session store',
          status: 'active' as const,
          connectionString: 'redis://localhost:6379',
          recordCount: 45000,
          dataSize: 128000000
        },
        {
          name: 'External API Gateway',
          type: 'api' as const,
          description: 'Third-party API integrations',
          status: 'active' as const,
          connectionString: 'https://api.external-service.com/v1',
          recordCount: 0,
          dataSize: 0
        },
        {
          name: 'File Storage System',
          type: 'file' as const,
          description: 'Document and media file storage',
          status: 'active' as const,
          connectionString: 's3://syncscript-files/',
          recordCount: 12500,
          dataSize: 5120000000
        },
        {
          name: 'Kafka Stream',
          type: 'stream' as const,
          description: 'Real-time event streaming',
          status: 'maintenance' as const,
          connectionString: 'kafka://localhost:9092',
          recordCount: 0,
          dataSize: 0
        },
        {
          name: 'Webhook Endpoints',
          type: 'webhook' as const,
          description: 'Incoming webhook data collection',
          status: 'error' as const,
          connectionString: 'https://webhooks.syncscript.com',
          recordCount: 0,
          dataSize: 0
        }
      ];

      return sourceData.map((source, index) => {
        const tables: DataTable[] = [];
        const tableCount = Math.floor(Math.random() * 10) + 5;
        
        for (let i = 0; i < tableCount; i++) {
          const columns: DataColumn[] = [];
          const columnCount = Math.floor(Math.random() * 15) + 5;
          
          for (let j = 0; j < columnCount; j++) {
            columns.push({
              name: `column_${j}`,
              type: ['varchar', 'integer', 'timestamp', 'boolean', 'text'][Math.floor(Math.random() * 5)],
              nullable: Math.random() > 0.3,
              primaryKey: j === 0,
              foreignKey: j > 0 && Math.random() > 0.7 ? `table_${Math.floor(Math.random() * tableCount)}.id` : null,
              defaultValue: null,
              constraints: []
            });
          }

          tables.push({
            name: `table_${i}`,
            columns,
            rowCount: Math.floor(Math.random() * 100000) + 1000,
            size: Math.floor(Math.random() * 100000000) + 1000000,
            lastModified: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
          });
        }

        const relationships: DataRelationship[] = [];
        for (let i = 0; i < Math.floor(tableCount / 2); i++) {
          relationships.push({
            id: `rel-${i}`,
            fromTable: `table_${i}`,
            toTable: `table_${i + 1}`,
            fromColumn: 'id',
            toColumn: 'foreign_id',
            type: 'one-to-many'
          });
        }

        const indexes: DataIndex[] = [];
        for (let i = 0; i < Math.floor(tableCount * 2); i++) {
          indexes.push({
            name: `index_${i}`,
            table: `table_${Math.floor(Math.random() * tableCount)}`,
            columns: ['id', 'created_at'],
            type: 'index',
            performance: Math.random() * 100
          });
        }

        const constraints: DataConstraint[] = [];
        for (let i = 0; i < Math.floor(tableCount * 1.5); i++) {
          constraints.push({
            name: `constraint_${i}`,
            table: `table_${Math.floor(Math.random() * tableCount)}`,
            type: 'check',
            definition: 'value > 0'
          });
        }

        const permissions: DataPermission[] = [];
        const users = ['admin', 'analyst', 'developer', 'readonly'];
        for (let i = 0; i < users.length; i++) {
          permissions.push({
            id: `perm-${i}`,
            user: users[i],
            role: users[i] === 'admin' ? 'admin' : 'user',
            permissions: users[i] === 'admin' ? ['read', 'write', 'delete'] : ['read'],
            tables: tables.map(t => t.name),
            grantedBy: 'admin',
            grantedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            expiresAt: null
          });
        }

        return {
          id: `source-${index}`,
          ...source,
          lastSync: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
          schema: {
            tables,
            relationships,
            indexes,
            constraints
          },
          permissions,
          retentionPolicy: {
            enabled: Math.random() > 0.3,
            duration: Math.floor(Math.random() * 365) + 30,
            unit: 'days',
            action: 'archive',
            tables: tables.slice(0, Math.floor(tableCount / 2)).map(t => t.name)
          },
          encryption: {
            enabled: Math.random() > 0.2,
            algorithm: 'AES-256',
            keyManagement: 'internal',
            encryptedColumns: ['password', 'email', 'phone'],
            compliance: ['GDPR', 'SOC2']
          }
        };
      });
    };

    const generateQualityRules = (): DataQualityRule[] => {
      const ruleData = [
        {
          name: 'Email Format Validation',
          description: 'Ensure email addresses are in valid format',
          table: 'users',
          column: 'email',
          ruleType: 'validity' as const,
          condition: 'email ~* \'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$\'',
          severity: 'high' as const,
          enabled: true,
          violations: 12
        },
        {
          name: 'Required Field Check',
          description: 'Ensure required fields are not null',
          table: 'tasks',
          column: 'title',
          ruleType: 'completeness' as const,
          condition: 'title IS NOT NULL',
          severity: 'critical' as const,
          enabled: true,
          violations: 0
        },
        {
          name: 'Date Range Validation',
          description: 'Ensure dates are within valid range',
          table: 'projects',
          column: 'due_date',
          ruleType: 'validity' as const,
          condition: 'due_date >= created_at',
          severity: 'medium' as const,
          enabled: true,
          violations: 5
        },
        {
          name: 'Unique Constraint Check',
          description: 'Ensure unique constraints are maintained',
          table: 'users',
          column: 'username',
          ruleType: 'uniqueness' as const,
          condition: 'COUNT(*) = 1',
          severity: 'high' as const,
          enabled: true,
          violations: 2
        },
        {
          name: 'Data Consistency Check',
          description: 'Ensure data consistency across related tables',
          table: 'tasks',
          column: 'project_id',
          ruleType: 'consistency' as const,
          condition: 'EXISTS (SELECT 1 FROM projects WHERE id = project_id)',
          severity: 'high' as const,
          enabled: true,
          violations: 8
        }
      ];

      return ruleData.map((rule, index) => ({
        id: `rule-${index}`,
        ...rule,
        lastRun: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
      }));
    };

    const generateDataLineage = (): DataLineage[] => {
      const lineageData = [
        {
          source: 'users',
          target: 'user_analytics',
          transformation: 'aggregate user activity',
          dependencies: ['sessions', 'events'],
          impact: 'high' as const
        },
        {
          source: 'tasks',
          target: 'task_reports',
          transformation: 'calculate completion rates',
          dependencies: ['projects', 'time_logs'],
          impact: 'medium' as const
        },
        {
          source: 'projects',
          target: 'project_dashboard',
          transformation: 'summarize project metrics',
          dependencies: ['tasks', 'team_members'],
          impact: 'high' as const
        },
        {
          source: 'events',
          target: 'event_analytics',
          transformation: 'process event streams',
          dependencies: ['users', 'sessions'],
          impact: 'medium' as const
        }
      ];

      return lineageData.map((lineage, index) => ({
        id: `lineage-${index}`,
        ...lineage,
        lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      }));
    };

    setDataSources(generateDataSources());
    setQualityRules(generateQualityRules());
    setDataLineage(generateDataLineage());
  }, []);

  const filteredDataSources = dataSources.filter(source => 
    (selectedType === 'all' || source.type === selectedType) &&
    (selectedStatus === 'all' || source.status === selectedStatus)
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'database': return 'bg-blue-100 text-blue-800';
      case 'api': return 'bg-green-100 text-green-800';
      case 'file': return 'bg-purple-100 text-purple-800';
      case 'stream': return 'bg-orange-100 text-orange-800';
      case 'webhook': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRuleTypeColor = (ruleType: string): string => {
    switch (ruleType) {
      case 'completeness': return 'bg-blue-100 text-blue-800';
      case 'accuracy': return 'bg-green-100 text-green-800';
      case 'consistency': return 'bg-purple-100 text-purple-800';
      case 'validity': return 'bg-orange-100 text-orange-800';
      case 'uniqueness': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const runQualityCheck = async () => {
    setIsRunningQualityCheck(true);
    
    // Simulate quality check
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setQualityRules(prev => prev.map(rule => ({
      ...rule,
      lastRun: new Date(),
      violations: Math.floor(Math.random() * 20)
    })));
    
    setIsRunningQualityCheck(false);
  };

  const optimizeData = async () => {
    setIsOptimizingData(true);
    
    // Simulate data optimization
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    setDataSources(prev => prev.map(source => ({
      ...source,
      lastSync: new Date(),
      dataSize: Math.floor(source.dataSize * 0.95) // 5% reduction
    })));
    
    setIsOptimizingData(false);
  };

  const types = [
    { key: 'all', label: 'All Types', count: dataSources.length },
    { key: 'database', label: 'Database', count: dataSources.filter(s => s.type === 'database').length },
    { key: 'api', label: 'API', count: dataSources.filter(s => s.type === 'api').length },
    { key: 'file', label: 'File', count: dataSources.filter(s => s.type === 'file').length },
    { key: 'stream', label: 'Stream', count: dataSources.filter(s => s.type === 'stream').length },
    { key: 'webhook', label: 'Webhook', count: dataSources.filter(s => s.type === 'webhook').length }
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
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🗄️ Advanced Data Management</h2>
              <p className="text-green-100 mt-1">Data governance, quality, and lineage management</p>
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
          {/* Data Management Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Data Sources</p>
                  <p className="text-2xl font-bold text-blue-800">{dataSources.length}</p>
                </div>
                <div className="text-3xl">🗄️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Total Records</p>
                  <p className="text-2xl font-bold text-green-800">
                    {dataSources.reduce((sum, s) => sum + s.recordCount, 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Data Size</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {formatBytes(dataSources.reduce((sum, s) => sum + s.dataSize, 0))}
                  </p>
                </div>
                <div className="text-3xl">💾</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Quality Rules</p>
                  <p className="text-2xl font-bold text-orange-800">{qualityRules.length}</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Violations</p>
                  <p className="text-2xl font-bold text-red-800">
                    {qualityRules.reduce((sum, r) => sum + r.violations, 0)}
                  </p>
                </div>
                <div className="text-3xl">⚠️</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Type:</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    {types.map(type => (
                      <option key={type.key} value={type.key}>
                        {type.label} ({type.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="error">Error</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={runQualityCheck}
                  disabled={isRunningQualityCheck}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningQualityCheck ? '⏳ Checking...' : '🔍 Quality Check'}
                </button>
                <button
                  onClick={optimizeData}
                  disabled={isOptimizingData}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isOptimizingData ? '⏳ Optimizing...' : '⚡ Optimize'}
                </button>
              </div>
            </div>
          </div>

          {/* Data Quality Rules */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Quality Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {qualityRules.map((rule) => (
                <div key={rule.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{rule.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(rule.severity)}`}>
                      {rule.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRuleTypeColor(rule.ruleType)}`}>
                        {rule.ruleType}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Table:</span>
                      <span className="font-medium text-blue-600">{rule.table}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Violations:</span>
                      <span className={`font-medium ${rule.violations > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {rule.violations}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Run:</span>
                      <span className="text-gray-500">{formatDate(rule.lastRun)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Lineage */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Lineage</h3>
            <div className="space-y-4">
              {dataLineage.map((lineage) => (
                <div key={lineage.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {lineage.source} → {lineage.target}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(lineage.impact)}`}>
                      {lineage.impact} impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{lineage.transformation}</p>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Dependencies:</span>
                      <span className="ml-2">{lineage.dependencies.join(', ')}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Last Updated:</span>
                      <span className="ml-2">{formatDate(lineage.lastUpdated)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Data Sources ({filteredDataSources.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tables</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDataSources.map((source) => (
                    <tr key={source.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{source.name}</div>
                          <div className="text-sm text-gray-500">{source.description}</div>
                          <div className="text-xs text-gray-400">{source.connectionString}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(source.type)}`}>
                          {source.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(source.status)}`}>
                          {source.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {source.recordCount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatBytes(source.dataSize)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {source.schema.tables.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(source.lastSync)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedDataManagement;
