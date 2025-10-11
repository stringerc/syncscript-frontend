/**
 * Landing Page - Complete Redesign
 * Phase 2: 60-Day Enhancements
 * 
 * World-class marketing page showcasing Triple Intelligence™
 */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>SyncScript - The Only Productivity App with Triple Intelligence™</title>
        <meta name="description" content="Match tasks to your energy, stay within budget, and never be late. The only productivity platform with Energy, Budget, and Context Intelligence." />
        <meta property="og:title" content="SyncScript - Triple Intelligence™ Productivity" />
        <meta property="og:description" content="The only app that matches tasks to your energy, budget, and real-world context." />
        <meta property="og:image" content="/og-image.png" />
      </Head>

      <div className="landing-page" style={{ background: '#ffffff', minHeight: '100vh' }}>
        {/* Navigation */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 48px',
          borderBottom: '1px solid #E5E7EB'
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ⚡ SyncScript
          </div>
          
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/compare" style={{ fontSize: '15px', fontWeight: '600', color: '#6B7280', textDecoration: 'none' }}>
              Compare
            </Link>
            <Link href="/pricing" style={{ fontSize: '15px', fontWeight: '600', color: '#6B7280', textDecoration: 'none' }}>
              Pricing
            </Link>
            <Link href="/api/auth/login" style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              color: 'white',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.2s'
            }}>
              Start Free Trial
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{
          padding: '120px 48px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%)'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{
              fontSize: '64px',
              fontWeight: '900',
              lineHeight: '1.1',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 60%, #F093FB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              The Only Productivity App<br />with Triple Intelligence™
            </h1>
            
            <p style={{
              fontSize: '24px',
              color: '#6B7280',
              maxWidth: '800px',
              margin: '0 auto 48px',
              lineHeight: '1.6'
            }}>
              Match tasks to your <span style={{ color: '#667EEA', fontWeight: '700' }}>energy</span>, 
              stay within your <span style={{ color: '#10B981', fontWeight: '700' }}>budget</span>, 
              and never be late with <span style={{ color: '#F59E0B', fontWeight: '700' }}>real-world context</span>.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '48px' }}>
              <Link href="/api/auth/login" style={{
                padding: '20px 48px',
                background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                color: 'white',
                borderRadius: '14px',
                fontSize: '18px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s',
                display: 'inline-block'
              }}>
                Start Free Trial →
              </Link>
              
              <Link href="/compare" style={{
                padding: '20px 48px',
                background: 'white',
                color: '#667EEA',
                border: '2px solid #667EEA',
                borderRadius: '14px',
                fontSize: '18px',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'all 0.3s',
                display: 'inline-block'
              }}>
                See Comparison
              </Link>
            </div>
            
            <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
              ✨ No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </section>

        {/* Triple Intelligence Section */}
        <section style={{
          padding: '100px 48px',
          background: 'white'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: '16px',
              color: '#1F2937'
            }}>
              Triple Intelligence™
            </h2>
            
            <p style={{
              fontSize: '20px',
              color: '#6B7280',
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto 80px'
            }}>
              The only platform that combines Energy, Budget, and Context awareness
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              marginBottom: '60px'
            }}>
              {/* Energy Intelligence */}
              <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(102, 126, 234, 0.2)' }}
                style={{
                  background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                  padding: '40px',
                  borderRadius: '20px',
                  border: '2px solid #BFDBFE',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ fontSize: '56px', marginBottom: '20px' }}>⚡</div>
                <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '12px' }}>
                  Energy Intelligence
                </h3>
                <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: '1.6', marginBottom: '20px' }}>
                  Match tasks to your current energy level. Automatic recalibration after every task. 
                  Work with your body, not against it.
                </p>
                <ul style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
                  <li>✅ Auto energy updates</li>
                  <li>✅ Energy-matched suggestions</li>
                  <li>✅ Emblem rewards system</li>
                  <li>✅ Anti-gaming protection</li>
                </ul>
              </motion.div>
              
              {/* Budget Intelligence */}
              <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(16, 185, 129, 0.2)' }}
                style={{
                  background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
                  padding: '40px',
                  borderRadius: '20px',
                  border: '2px solid #A7F3D0',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ fontSize: '56px', marginBottom: '20px' }}>💰</div>
                <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '12px' }}>
                  Budget Intelligence
                </h3>
                <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: '1.6', marginBottom: '20px' }}>
                  Set spending comfort zones. See budget fit stars on recommendations. 
                  Connect spending to savings goals.
                </p>
                <ul style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
                  <li>✅ Comfort band system</li>
                  <li>✅ 5-star budget fit ratings</li>
                  <li>✅ Savings goal integration</li>
                  <li>✅ "Skip = $X saved" motivation</li>
                </ul>
              </motion.div>
              
              {/* Context Intelligence */}
              <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(245, 158, 11, 0.2)' }}
                style={{
                  background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                  padding: '40px',
                  borderRadius: '20px',
                  border: '2px solid #FDE68A',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ fontSize: '56px', marginBottom: '20px' }}>🌍</div>
                <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '12px' }}>
                  Context Intelligence
                </h3>
                <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: '1.6', marginBottom: '20px' }}>
                  Know when to leave with traffic awareness. See weather on events. 
                  Real-world context for planning.
                </p>
                <ul style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
                  <li>✅ Leave-by time chips</li>
                  <li>✅ Traffic-aware routing</li>
                  <li>✅ Weather integration</li>
                  <li>✅ Multi-modal travel</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{
          padding: '100px 48px',
          background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
          color: 'white'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: '60px'
            }}>
              Achieve More with Intelligence
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '40px',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '56px', fontWeight: '900', marginBottom: '8px' }}>90%</div>
                <div style={{ fontSize: '16px', opacity: 0.9 }}>Energy-Matched Completion</div>
              </div>
              <div>
                <div style={{ fontSize: '56px', fontWeight: '900', marginBottom: '8px' }}>85%</div>
                <div style={{ fontSize: '16px', opacity: 0.9 }}>On-Time Arrival Rate</div>
              </div>
              <div>
                <div style={{ fontSize: '56px', fontWeight: '900', marginBottom: '8px' }}>$1,200+</div>
                <div style={{ fontSize: '16px', opacity: 0.9 }}>Saved Annually</div>
              </div>
              <div>
                <div style={{ fontSize: '56px', fontWeight: '900', marginBottom: '8px' }}>70%</div>
                <div style={{ fontSize: '16px', opacity: 0.9 }}>AI Acceptance Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Deep Dive */}
        <section style={{
          padding: '100px 48px',
          background: 'white'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: '80px',
              color: '#1F2937'
            }}>
              Built Different
            </h2>
            
            {/* Feature 1: Energy */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              marginBottom: '100px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#EFF6FF',
                  color: '#667EEA',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '700',
                  marginBottom: '16px'
                }}>
                  ENERGY INTELLIGENCE
                </div>
                <h3 style={{ fontSize: '40px', fontWeight: '800', color: '#1F2937', marginBottom: '20px' }}>
                  Match Tasks to Your Energy
                </h3>
                <p style={{ fontSize: '18px', color: '#6B7280', lineHeight: '1.7', marginBottom: '24px' }}>
                  Ever try to do deep work when you&apos;re exhausted? Or feel restless doing admin when you&apos;re energized? 
                  SyncScript is the <strong>only app</strong> that matches tasks to how you actually feel.
                </p>
                <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '2' }}>
                  <li>🎯 Automatic energy recalibration after every task</li>
                  <li>⚡ Energy-matched smart suggestions</li>
                  <li>💎 Emblem rewards for perfect energy matches</li>
                  <li>🛡️ Anti-gaming protection for fair play</li>
                </ul>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                padding: '60px',
                borderRadius: '24px',
                border: '2px solid #BFDBFE',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '120px', marginBottom: '20px' }}>⚡</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#667EEA' }}>
                  90% Energy-Matched Completion
                </div>
              </div>
            </div>

            {/* Feature 2: Budget */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              marginBottom: '100px',
              alignItems: 'center'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
                padding: '60px',
                borderRadius: '24px',
                border: '2px solid #A7F3D0',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '120px', marginBottom: '20px' }}>💰</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#10B981' }}>
                  Save $1,200+ Annually
                </div>
              </div>
              <div>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#ECFDF5',
                  color: '#10B981',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '700',
                  marginBottom: '16px'
                }}>
                  BUDGET INTELLIGENCE
                </div>
                <h3 style={{ fontSize: '40px', fontWeight: '800', color: '#1F2937', marginBottom: '20px' }}>
                  Stay Within Budget Effortlessly
                </h3>
                <p style={{ fontSize: '18px', color: '#6B7280', lineHeight: '1.7', marginBottom: '24px' }}>
                  See budget fit stars before you commit. Connect spending to your savings goals. 
                  The <strong>only app</strong> that helps you achieve financial goals while being productive.
                </p>
                <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '2' }}>
                  <li>💰 Set min/ideal/max spending per category</li>
                  <li>⭐ 5-star budget fit on all recommendations</li>
                  <li>🎯 Link spending to savings goals</li>
                  <li>💡 "Skip this = $50 closer to vacation"</li>
                </ul>
              </div>
            </div>

            {/* Feature 3: Context */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#FFFBEB',
                  color: '#F59E0B',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '700',
                  marginBottom: '16px'
                }}>
                  CONTEXT INTELLIGENCE
                </div>
                <h3 style={{ fontSize: '40px', fontWeight: '800', color: '#1F2937', marginBottom: '20px' }}>
                  Never Be Late, Never Surprised
                </h3>
                <p style={{ fontSize: '18px', color: '#6B7280', lineHeight: '1.7', marginBottom: '24px' }}>
                  Know exactly when to leave with traffic-aware calculations. See weather on every event. 
                  The <strong>only app</strong> that combines real-world context with productivity.
                </p>
                <ul style={{ fontSize: '16px', color: '#4B5563', lineHeight: '2' }}>
                  <li>🚗 "Leave by 2:25 PM" with traffic awareness</li>
                  <li>🌤️ Weather badges on all events</li>
                  <li>⚠️ Severe weather warnings</li>
                  <li>🎯 85% on-time arrival rate</li>
                </ul>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                padding: '60px',
                borderRadius: '24px',
                border: '2px solid #FDE68A',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '120px', marginBottom: '20px' }}>🌍</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#F59E0B' }}>
                  Real-World Awareness
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{
          padding: '100px 48px',
          background: 'linear-gradient(180deg, #F9FAFB 0%, #F3F4F6 100%)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: '60px',
              color: '#1F2937'
            }}>
              Loved by Productive People
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px'
            }}>
              {[
                {
                  quote: "Finally, an app that understands how I actually work. The energy matching is game-changing.",
                  author: "Sarah M.",
                  role: "Product Manager",
                  rating: 5
                },
                {
                  quote: "I've saved over $1,200 this year just by seeing budget fit stars before committing. Love it!",
                  author: "James K.",
                  role: "Entrepreneur",
                  rating: 5
                },
                {
                  quote: "Never late anymore. The leave-by chips with traffic awareness are genius. Worth it for that alone.",
                  author: "Maria R.",
                  role: "Consultant",
                  rating: 5
                }
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'white',
                    padding: '32px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div style={{ fontSize: '18px', marginBottom: '16px' }}>
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                  <p style={{
                    fontSize: '16px',
                    color: '#1F2937',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    fontStyle: 'italic'
                  }}>
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#667EEA' }}>
                    {testimonial.author}
                  </div>
                  <div style={{ fontSize: '13px', color: '#9CA3AF' }}>
                    {testimonial.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '120px 48px',
          background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '56px',
            fontWeight: '900',
            marginBottom: '24px'
          }}>
            Ready to Work Smarter?
          </h2>
          <p style={{
            fontSize: '22px',
            opacity: 0.95,
            marginBottom: '48px',
            maxWidth: '700px',
            margin: '0 auto 48px'
          }}>
            Join thousands of productive people using Triple Intelligence™
          </p>
          
          <Link href="/api/auth/login" style={{
            display: 'inline-block',
            padding: '24px 64px',
            background: 'white',
            color: '#667EEA',
            borderRadius: '14px',
            fontSize: '20px',
            fontWeight: '700',
            textDecoration: 'none',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s'
          }}>
            Start Free Trial →
          </Link>
          
          <p style={{ fontSize: '14px', marginTop: '24px', opacity: 0.8 }}>
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </section>

        {/* Footer */}
        <footer style={{
          padding: '60px 48px',
          background: '#1F2937',
          color: 'white'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px'
          }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>
                ⚡ SyncScript
              </div>
              <p style={{ fontSize: '14px', opacity: 0.7 }}>
                The only productivity platform with Triple Intelligence™
              </p>
            </div>
            
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Product</div>
              <div style={{ fontSize: '14px', opacity: 0.7, lineHeight: '2' }}>
                <div><Link href="/compare" style={{ color: 'white', textDecoration: 'none' }}>Compare</Link></div>
                <div><Link href="/pricing" style={{ color: 'white', textDecoration: 'none' }}>Pricing</Link></div>
                <div><Link href="/features" style={{ color: 'white', textDecoration: 'none' }}>Features</Link></div>
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Company</div>
              <div style={{ fontSize: '14px', opacity: 0.7, lineHeight: '2' }}>
                <div><Link href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link></div>
                <div><Link href="/blog" style={{ color: 'white', textDecoration: 'none' }}>Blog</Link></div>
                <div><Link href="/privacy" style={{ color: 'white', textDecoration: 'none' }}>Privacy</Link></div>
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Connect</div>
              <div style={{ fontSize: '14px', opacity: 0.7, lineHeight: '2' }}>
                <div>Twitter</div>
                <div>LinkedIn</div>
                <div>Email</div>
              </div>
            </div>
          </div>
          
          <div style={{
            maxWidth: '1200px',
            margin: '60px auto 0',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '14px',
            opacity: 0.6,
            textAlign: 'center'
          }}>
            © 2025 SyncScript. All rights reserved. Triple Intelligence™ is a trademark of SyncScript.
          </div>
        </footer>
      </div>
    </>
  );
}
