import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Award, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Star,
  Users,
  Zap
} from 'lucide-react';

export default function QualityDashboard() {
  const [qualityMetrics, setQualityMetrics] = useState({
    overallScore: 87,
    codeQuality: 92,
    testCoverage: 78,
    performanceScore: 85,
    securityScore: 94,
    userSatisfaction: 4.2,
    bugCount: 3,
    technicalDebt: 15
  });

  const [recentImprovements, setRecentImprovements] = useState([
    {
      id: 1,
      area: 'Code Quality',
      improvement: 'Improved error handling',
      impact: '+5%',
      date: '2 days ago'
    },
    {
      id: 2,
      area: 'Performance',
      improvement: 'Optimized database queries',
      impact: '+12%',
      date: '1 week ago'
    },
    {
      id: 3,
      area: 'Security',
      improvement: 'Updated authentication',
      impact: '+3%',
      date: '2 weeks ago'
    }
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <>
      <Head>
        <title>Quality Dashboard - SyncScript</title>
        <meta name="description" content="Monitor code quality, performance, and user satisfaction metrics." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quality Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor code quality, performance, and user satisfaction
              </p>
            </div>

            {/* Overall Score */}
            <div className="bg-white rounded-lg shadow p-8 mb-8">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBgColor(qualityMetrics.overallScore)} mb-4`}
                >
                  <span className={`text-4xl font-bold ${getScoreColor(qualityMetrics.overallScore)}`}>
                    {qualityMetrics.overallScore}
                  </span>
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Overall Quality Score
                </h2>
                <p className="text-gray-600">
                  Based on code quality, performance, security, and user satisfaction
                </p>
              </div>
            </div>

            {/* Quality Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Code Quality</p>
                    <p className={`text-2xl font-semibold ${getScoreColor(qualityMetrics.codeQuality)}`}>
                      {qualityMetrics.codeQuality}%
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Test Coverage</p>
                    <p className={`text-2xl font-semibold ${getScoreColor(qualityMetrics.testCoverage)}`}>
                      {qualityMetrics.testCoverage}%
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Zap className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Performance</p>
                    <p className={`text-2xl font-semibold ${getScoreColor(qualityMetrics.performanceScore)}`}>
                      {qualityMetrics.performanceScore}%
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Security</p>
                    <p className={`text-2xl font-semibold ${getScoreColor(qualityMetrics.securityScore)}`}>
                      {qualityMetrics.securityScore}%
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Satisfaction */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  User Satisfaction
                </h2>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-8 w-8 ${
                          i < Math.floor(qualityMetrics.userSatisfaction)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">
                    {qualityMetrics.userSatisfaction}/5.0
                  </p>
                  <p className="text-gray-600">Based on 1,247 reviews</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Excellent (5★)</span>
                    <span className="text-gray-900 font-medium">68%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Good (4★)</span>
                    <span className="text-gray-900 font-medium">22%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Average (3★)</span>
                    <span className="text-gray-900 font-medium">8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Poor (2★)</span>
                    <span className="text-gray-900 font-medium">2%</span>
                  </div>
                </div>
              </div>

              {/* Recent Improvements */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  Recent Improvements
                </h2>
                <div className="space-y-4">
                  {recentImprovements.map((improvement) => (
                    <div key={improvement.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">
                          {improvement.area}
                        </h3>
                        <span className="text-green-600 font-semibold">
                          {improvement.impact}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {improvement.improvement}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {improvement.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Issues & Technical Debt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  Active Issues
                </h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600 mb-2">
                    {qualityMetrics.bugCount}
                  </p>
                  <p className="text-gray-600">Open bugs requiring attention</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-yellow-500" />
                  Technical Debt
                </h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-600 mb-2">
                    {qualityMetrics.technicalDebt}
                  </p>
                  <p className="text-gray-600">Story points of technical debt</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
