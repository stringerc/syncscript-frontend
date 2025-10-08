import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="title-gradient">SyncScript</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The most advanced productivity platform powered by energy intelligence
          </motion.p>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Match your tasks to your energy levels for maximum productivity. 
            Experience the future of intelligent task management with our 
            ribbon-inspired design and neural circuit intelligence.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/api/auth/login" className="btn btn-primary btn-lg">
              <svg className="neural-icon" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              Get Started
            </Link>
            
            <Link href="#features" className="btn btn-secondary btn-lg">
              <svg className="neural-icon" viewBox="0 0 24 24">
                <path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              View Features
            </Link>
          </motion.div>
        </div>
        
        {/* Ribbon Animation */}
        <div className="ribbon-animation">
          <div className="ribbon-flow"></div>
          <div className="ribbon-flow"></div>
          <div className="ribbon-flow"></div>
          <div className="ribbon-flow"></div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        id="features"
        className="features-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="features-content">
          <h2 className="features-title">Legendary Features</h2>
          
          <div className="features-grid">
            <div className="feature-card card card-md">
              <div className="feature-icon">
                <div className="energy-demo">
                  <div className="energy-dot energy-low"></div>
                  <div className="energy-dot energy-medium"></div>
                  <div className="energy-dot energy-peak"></div>
                </div>
              </div>
              <h3 className="feature-title">Energy Intelligence</h3>
              <p className="feature-description">
                AI-powered energy prediction and task matching for optimal productivity
              </p>
            </div>
            
            <div className="feature-card card card-md">
              <div className="feature-icon">
                <div className="neural-circuit-demo">
                  <svg viewBox="0 0 60 20">
                    <circle cx="10" cy="10" r="2" fill="currentColor" />
                    <path d="M10 10 L20 10" stroke="currentColor" strokeWidth="1" />
                    <circle cx="20" cy="10" r="2" fill="currentColor" />
                    <path d="M20 10 L30 10" stroke="currentColor" strokeWidth="1" />
                    <circle cx="30" cy="10" r="2" fill="currentColor" />
                    <path d="M30 10 L40 10" stroke="currentColor" strokeWidth="1" />
                    <circle cx="40" cy="10" r="2" fill="currentColor" />
                    <path d="M40 10 L50 10" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="10" r="2" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <h3 className="feature-title">Neural Intelligence</h3>
              <p className="feature-description">
                Circuit-like patterns representing advanced AI and connectivity
              </p>
            </div>
            
            <div className="feature-card card card-md">
              <div className="feature-icon">
                <div className="ribbon-gradient"></div>
              </div>
              <h3 className="feature-title">Ribbon Design</h3>
              <p className="feature-description">
                Flowing, dynamic visual elements with blue→green→orange spectrum
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Productivity?</h2>
          <p className="cta-description">
            Join the future of intelligent task management with SyncScript
          </p>
          <Link href="/api/auth/login" className="btn btn-primary btn-lg">
            <svg className="neural-icon" viewBox="0 0 24 24">
              <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            Start Your Journey
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
