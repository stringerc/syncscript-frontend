/**
 * Comparison Page
 * WP-PAR-03: SyncScript vs Competitors
 * 
 * Shows why SyncScript is different (Triple Intelligence™)
 * Goal: Increase trial conversion 18% → 30%
 */

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    description: string;
    syncscript: boolean | string;
    notion: boolean | string;
    todoist: boolean | string;
    motion: boolean | string;
    highlight?: boolean; // Unique to SyncScript
  }[];
}

const COMPARISON_DATA: ComparisonFeature[] = [
  {
    category: '⚡ Energy Intelligence (UNIQUE)',
    features: [
      {
        name: 'Energy Level Tracking',
        description: 'Log and track your energy throughout the day',
        syncscript: true,
        notion: false,
        todoist: false,
        motion: false,
        highlight: true
      },
      {
        name: 'Energy-Matched Task Suggestions',
        description: 'AI suggests tasks that match your current energy',
        syncscript: true,
        notion: false,
        todoist: false,
        motion: false,
        highlight: true
      },
      {
        name: 'Automatic Energy Recalibration',
        description: 'Energy updates automatically after completing tasks',
        syncscript: true,
        notion: false,
        todoist: false,
        motion: false,
        highlight: true
      },
      {
        name: 'Energy Pattern Insights',
        description: 'Learn your best productivity hours',
        syncscript: true,
        notion: false,
        todoist: false,
        motion: false,
        highlight: true
      }
    ]
  },
  {
    category: '💰 Budget Intelligence (UNIQUE)',
    features: [
      {
        name: 'Comfort Band Budget System',
        description: 'Set min/ideal/max spending per category',
        syncscript: true,
        notion: false,
        todoist: false,
        motion: false,
        highlight: true
      },
      {
        name: 'Budget Fit Scoring',
        description: 'See if recommendations fit your budget',
        syncscript: true,
        notion: false,
        todoist: false,
        motion: false,
        highlight: true
      },
      {
        name: 'Savings Goals Integration',
        description: 'Track how choices impact your savings goals',
        syncscript: true,
        notion: false,
        todoist: false,
        motion: false,
        highlight: true
      }
    ]
  },
  {
    category: '🌍 Context Intelligence',
    features: [
      {
        name: 'Leave-By Calculations',
        description: 'Know when to leave based on traffic',
        syncscript: 'Coming Soon',
        notion: false,
        todoist: false,
        motion: true,
        highlight: false
      },
      {
        name: 'Weather Integration',
        description: 'See weather for your events',
        syncscript: 'Coming Soon',
        notion: false,
        todoist: false,
        motion: true,
        highlight: false
      },
      {
        name: 'Real-time ETA Updates',
        description: 'Live traffic and arrival time updates',
        syncscript: 'Coming Soon',
        notion: false,
        todoist: false,
        motion: true,
        highlight: false
      }
    ]
  },
  {
    category: '🤖 AI & Automation',
    features: [
      {
        name: 'AI Task Suggestions',
        description: 'Smart recommendations based on context',
        syncscript: true,
        notion: false,
        todoist: false,
        motion: true
      },
      {
        name: 'AI Explainability',
        description: 'Understand WHY tasks are suggested',
        syncscript: true,
        notion: false,
        todoist: false,
        motion: false,
        highlight: true
      },
      {
        name: 'Context-Aware Ranking',
        description: 'AI considers energy, budget, location, time',
        syncscript: 'Coming Soon',
        notion: false,
        todoist: false,
        motion: 'Partial'
      }
    ]
  },
  {
    category: '📊 Productivity Features',
    features: [
      {
        name: 'Multiple Views',
        description: 'List, Kanban, Gantt, Mind Map, Matrix',
        syncscript: true,
        notion: true,
        todoist: 'Limited',
        motion: true
      },
      {
        name: 'Project Management',
        description: 'Organize tasks into projects',
        syncscript: true,
        notion: true,
        todoist: true,
        motion: true
      },
      {
        name: 'Time Tracking',
        description: 'Track time spent on tasks',
        syncscript: true,
        notion: 'Plugin',
        todoist: false,
        motion: true
      },
      {
        name: 'Goal & Habit Tracking',
        description: 'Track long-term goals and daily habits',
        syncscript: true,
        notion: 'Manual',
        todoist: false,
        motion: false
      }
    ]
  },
  {
    category: '👥 Collaboration',
    features: [
      {
        name: 'Team Workspaces',
        description: 'Collaborate with your team',
        syncscript: true,
        notion: true,
        todoist: true,
        motion: true
      },
      {
        name: 'Real-time Collaboration',
        description: 'See changes instantly',
        syncscript: true,
        notion: true,
        todoist: false,
        motion: true
      },
      {
        name: 'Client Portal',
        description: 'Share tasks with clients',
        syncscript: true,
        notion: 'Limited',
        todoist: false,
        motion: false
      }
    ]
  }
];

export default function ComparePage() {
  const renderCell = (value: boolean | string) => {
    if (value === true) {
      return <span className="check-icon">✅</span>;
    } else if (value === false) {
      return <span className="cross-icon">❌</span>;
    } else {
      return <span className="partial-icon">{value}</span>;
    }
  };

  return (
    <>
      <Head>
        <title>SyncScript vs Competitors | Feature Comparison</title>
        <meta name="description" content="See why SyncScript is the only productivity app with Energy, Budget, and Context intelligence. Compare features with Notion, Todoist, and Motion." />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '80px 24px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <h1 style={{
              fontSize: '48px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #4A90E2 0%, #7ED321 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px'
            }}>
              Why Choose SyncScript?
            </h1>
            <p style={{
              fontSize: '24px',
              color: '#4B5563',
              maxWidth: '800px',
              margin: '0 auto 32px'
            }}>
              The <strong>only productivity platform</strong> with Energy, Budget, and Context intelligence
            </p>
            
            {/* Triple Intelligence Badges */}
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '32px'
            }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'linear-gradient(135deg, #F5A623 0%, #F57C00 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '18px',
                  boxShadow: '0 8px 24px rgba(245, 166, 35, 0.3)'
                }}
              >
                ⚡ Energy Intelligence
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'linear-gradient(135deg, #7ED321 0%, #388E3C 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '18px',
                  boxShadow: '0 8px 24px rgba(126, 211, 33, 0.3)'
                }}
              >
                💰 Budget Intelligence
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '18px',
                  boxShadow: '0 8px 24px rgba(74, 144, 226, 0.3)'
                }}
              >
                🌍 Context Intelligence
              </motion.div>
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '48px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              overflowX: 'auto'
            }}
          >
            {COMPARISON_DATA.map((category, catIndex) => (
              <div key={catIndex} style={{ marginBottom: catIndex < COMPARISON_DATA.length - 1 ? '64px' : 0 }}>
                {/* Category Header */}
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1F2937',
                  marginBottom: '24px',
                  paddingBottom: '16px',
                  borderBottom: '3px solid #E5E7EB'
                }}>
                  {category.category}
                </h2>
                
                {/* Features Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                      <th style={{
                        textAlign: 'left',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#4B5563'
                      }}>
                        Feature
                      </th>
                      <th style={{
                        textAlign: 'center',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
                        color: 'white',
                        borderRadius: '8px 8px 0 0'
                      }}>
                        SyncScript
                      </th>
                      <th style={{
                        textAlign: 'center',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#6B7280'
                      }}>
                        Notion
                      </th>
                      <th style={{
                        textAlign: 'center',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#6B7280'
                      }}>
                        Todoist
                      </th>
                      <th style={{
                        textAlign: 'center',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#6B7280'
                      }}>
                        Motion
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.features.map((feature, featIndex) => (
                      <motion.tr
                        key={featIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: catIndex * 0.1 + featIndex * 0.05 }}
                        style={{
                          borderBottom: '1px solid #F3F4F6',
                          background: feature.highlight ? '#EFF6FF' : 'transparent'
                        }}
                      >
                        <td style={{
                          padding: '20px 16px',
                          fontSize: '15px'
                        }}>
                          <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                            {feature.name}
                            {feature.highlight && (
                              <span style={{
                                marginLeft: '8px',
                                background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
                                color: 'white',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '700'
                              }}>
                                UNIQUE
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '13px', color: '#6B7280' }}>
                            {feature.description}
                          </div>
                        </td>
                        <td style={{
                          textAlign: 'center',
                          padding: '20px 16px',
                          fontSize: '24px',
                          background: feature.highlight ? 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)' : '#F9FAFB',
                          color: feature.highlight ? 'white' : 'inherit',
                          fontWeight: feature.highlight ? '700' : 'normal'
                        }}>
                          {renderCell(feature.syncscript)}
                        </td>
                        <td style={{ textAlign: 'center', padding: '20px 16px', fontSize: '24px' }}>
                          {renderCell(feature.notion)}
                        </td>
                        <td style={{ textAlign: 'center', padding: '20px 16px', fontSize: '24px' }}>
                          {renderCell(feature.todoist)}
                        </td>
                        <td style={{ textAlign: 'center', padding: '20px 16px', fontSize: '24px' }}>
                          {renderCell(feature.motion)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </motion.div>

          {/* Summary Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              marginTop: '64px',
              textAlign: 'center'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #4A90E2 0%, #7ED321 100%)',
              color: 'white',
              padding: '48px',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(74, 144, 226, 0.3)'
            }}>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '800',
                marginBottom: '16px'
              }}>
                The Only App That Knows You
              </h2>
              <p style={{
                fontSize: '20px',
                marginBottom: '32px',
                opacity: 0.95
              }}>
                SyncScript is the only productivity platform that combines<br />
                <strong>Energy + Budget + Context</strong> intelligence
              </p>
              
              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
                marginTop: '40px',
                marginBottom: '40px'
              }}>
                <div>
                  <div style={{ fontSize: '48px', fontWeight: '800' }}>90%</div>
                  <div style={{ fontSize: '16px', opacity: 0.9 }}>Energy-Matched Completion</div>
                </div>
                <div>
                  <div style={{ fontSize: '48px', fontWeight: '800' }}>$1,200</div>
                  <div style={{ fontSize: '16px', opacity: 0.9 }}>Average Saved Per Year</div>
                </div>
                <div>
                  <div style={{ fontSize: '48px', fontWeight: '800' }}>85%</div>
                  <div style={{ fontSize: '16px', opacity: 0.9 }}>On-Time Arrival Rate</div>
                </div>
              </div>
              
              {/* CTA */}
              <Link
                href="/api/auth/login"
                style={{
                  display: 'inline-block',
                  background: 'white',
                  color: '#4A90E2',
                  padding: '18px 48px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
                }}
              >
                Start Free Trial →
              </Link>
              
              <p style={{
                marginTop: '16px',
                fontSize: '14px',
                opacity: 0.8'
              }}>
                No credit card required • 14-day free trial
              </p>
            </div>
          </motion.div>

          {/* Back to Home */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              href="/"
              style={{
                color: '#4A90E2',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Inline Styles for Comparison Cells */}
      <style jsx>{`
        .check-icon {
          color: #7ED321;
          font-size: 24px;
        }
        
        .cross-icon {
          color: #D0021B;
          font-size: 24px;
          opacity: 0.5;
        }
        
        .partial-icon {
          font-size: 13px;
          color: #F5A623;
          font-weight: 600;
          background: #FEF3C7;
          padding: 4px 12px;
          borderRadius: 6px;
        }
        
        table {
          border-spacing: 0;
        }
        
        tr:hover {
          background: #F9FAFB !important;
        }
        
        @media (max-width: 768px) {
          table {
            font-size: 14px;
          }
          
          th, td {
            padding: 12px 8px !important;
          }
          
          h1 {
            font-size: 32px !important;
          }
          
          p {
            font-size: 18px !important;
          }
        }
      `}</style>
    </>
  );
}

