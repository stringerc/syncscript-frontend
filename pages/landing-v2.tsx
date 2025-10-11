/**
 * Landing Page v2 - Conversion Optimized
 * 60-DAY ENHANCEMENT #1: Landing Page Redesign
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingV2() {
  return (
    <div style={{ fontFamily: 'var(--font-sans)', background: 'var(--color-cream-50)' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8) var(--space-4)',
        background: 'linear-gradient(135deg, var(--color-cream-50) 0%, var(--color-primary-50) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '800px', zIndex: 2 }}
        >
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'var(--font-black)',
            marginBottom: 'var(--space-6)',
            background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-energy-5))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Productivity That Matches Your Energy
          </h1>
          
          <p style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--color-neutral-700)',
            marginBottom: 'var(--space-8)',
            lineHeight: 'var(--leading-relaxed)'
          }}>
            The AI-powered productivity platform that adapts to how you feel.
            Log your energy, get matched tasks, and accomplish more without burnout.
          </p>
          
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/api/auth/login"
              style={{
                background: 'var(--color-primary-500)',
                color: 'white',
                padding: '16px 48px',
                borderRadius: 'var(--radius-xl)',
                textDecoration: 'none',
                fontWeight: 'var(--font-bold)',
                fontSize: 'var(--text-lg)',
                boxShadow: 'var(--shadow-xl)',
                display: 'inline-block',
                transition: 'var(--transition-all)'
              }}
            >
              Start Free Trial →
            </Link>
            
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent',
                color: 'var(--color-primary-600)',
                padding: '16px 48px',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--color-primary-500)',
                fontWeight: 'var(--font-bold)',
                fontSize: 'var(--text-lg)',
                cursor: 'pointer',
                transition: 'var(--transition-all)'
              }}
            >
              See How It Works
            </button>
          </div>
          
          <p style={{
            marginTop: 'var(--space-6)',
            color: 'var(--color-neutral-600)',
            fontSize: 'var(--text-sm)'
          }}>
            ✨ Free forever • 🚀 No credit card required • ⚡ 60-second setup
          </p>
        </motion.div>
        
        {/* Floating energy badges (decorative) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.3 }}>
          {[1, 2, 3, 4, 5].map(level => (
            <div
              key={level}
              style={{
                position: 'absolute',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `var(--color-energy-${level})`,
                filter: 'blur(40px)',
                animation: `float ${3 + level}s ease-in-out infinite`,
                top: `${20 * level}%`,
                left: `${15 * level}%`
              }}
            />
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section style={{
        padding: 'var(--space-12) var(--space-4)',
        background: 'var(--color-neutral-0)',
        textAlign: 'center'
      }}>
        <p style={{ color: 'var(--color-neutral-600)', marginBottom: 'var(--space-6)' }}>
          Trusted by productive people worldwide
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-8)',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div>
            <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary-500)' }}>
              105+
            </div>
            <div style={{ color: 'var(--color-neutral-600)' }}>Features</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-energy-4)' }}>
              95%
            </div>
            <div style={{ color: 'var(--color-neutral-600)' }}>User Satisfaction</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-energy-5)' }}>
              WCAG AA
            </div>
            <div style={{ color: 'var(--color-neutral-600)' }}>Accessible</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{
        padding: 'var(--space-16) var(--space-4)',
        background: 'var(--color-cream-50)'
      }}>
        <h2 style={{
          fontSize: 'var(--text-4xl)',
          fontWeight: 'var(--font-bold)',
          textAlign: 'center',
          marginBottom: 'var(--space-12)'
        }}>
          Everything You Need to Stay Productive
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-6)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { icon: '⚡', title: 'Energy-Based Matching', desc: 'Tasks matched to your current energy level' },
            { icon: '🤖', title: 'AI-Powered', desc: 'Smart suggestions and automated task breakdown' },
            { icon: '📊', title: '6 View Modes', desc: 'List, Kanban, Gantt, Calendar, Mind Map, Matrix' },
            { icon: '📱', title: 'Mobile Perfect', desc: 'Works flawlessly on any device' },
            { icon: '🏆', title: 'Gamification', desc: 'Level up, earn achievements, maintain streaks' },
            { icon: '👥', title: 'Team Collaboration', desc: 'Chat, share tasks, track team progress' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'white',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
                transition: 'var(--transition-all)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>{feature.icon}</div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'var(--color-neutral-600)' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: 'var(--space-16) var(--space-4)',
        background: 'var(--color-primary-500)',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)' }}>
          Ready to Match Your Tasks to Your Energy?
        </h2>
        <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)', opacity: 0.9 }}>
          Join thousands of productive people using SyncScript
        </p>
        <Link
          href="/api/auth/login"
          style={{
            background: 'white',
            color: 'var(--color-primary-500)',
            padding: '16px 48px',
            borderRadius: 'var(--radius-xl)',
            textDecoration: 'none',
            fontWeight: 'var(--font-bold)',
            fontSize: 'var(--text-lg)',
            display: 'inline-block',
            boxShadow: 'var(--shadow-2xl)'
          }}
        >
          Get Started Free →
        </Link>
      </section>
    </div>
  );
}

