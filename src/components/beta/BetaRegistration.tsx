/**
 * Beta User Registration Component
 * 
 * Provides a beautiful, engaging interface for users to join the beta program
 * Includes tier selection, testing focus areas, and reward preview
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { userTestingProgram } from '../../utils/userTestingProgram';

interface BetaRegistrationProps {
  onClose: () => void;
  onSuccess: (userId: string) => void;
}

interface RegistrationForm {
  email: string;
  name: string;
  tier: 'early-adopter' | 'power-user' | 'casual-user';
  testingFocus: string[];
  motivation: string;
}

const TIER_DESCRIPTIONS = {
  'early-adopter': {
    title: 'Early Adopter',
    description: 'You love being first to try new features and provide detailed feedback',
    icon: '🚀',
    color: 'from-purple-500 to-pink-500',
    benefits: ['First access to new features', 'Direct line to development team', 'Exclusive beta badges']
  },
  'power-user': {
    title: 'Power User',
    description: 'You use productivity tools extensively and can provide expert insights',
    icon: '⚡',
    color: 'from-blue-500 to-cyan-500',
    benefits: ['Advanced feature testing', 'Performance optimization feedback', 'Workflow integration insights']
  },
  'casual-user': {
    title: 'Casual User',
    description: 'You use productivity tools occasionally and provide fresh perspective',
    icon: '🌟',
    color: 'from-green-500 to-emerald-500',
    benefits: ['User-friendly feedback', 'Onboarding experience insights', 'Accessibility testing']
  }
};

const TESTING_FOCUS_OPTIONS = [
  { id: 'morning-brief', label: 'Morning Brief', description: 'Daily planning and energy management' },
  { id: 'evening-brief', label: 'Evening Brief', description: 'Daily reflection and task completion' },
  { id: 'ai-explainability', label: 'AI Explainability', description: 'Understanding AI recommendations' },
  { id: 'emblem-transparency', label: 'Emblem Transparency', description: 'Energy system and gamification' },
  { id: 'analytics-dashboard', label: 'Analytics Dashboard', description: 'Productivity insights and trends' },
  { id: 'budget-intelligence', label: 'Budget Intelligence', description: 'Financial productivity features' },
  { id: 'energy-recalibration', label: 'Energy Recalibration', description: 'Smart task recommendations' }
];

const BetaRegistration: React.FC<BetaRegistrationProps> = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RegistrationForm>({
    email: '',
    name: '',
    tier: 'early-adopter',
    testingFocus: [],
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof RegistrationForm, value: string | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleTestingFocusToggle = (focusId: string) => {
    setForm(prev => ({
      ...prev,
      testingFocus: prev.testingFocus.includes(focusId)
        ? prev.testingFocus.filter(id => id !== focusId)
        : [...prev.testingFocus, focusId]
    }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.name || form.testingFocus.length === 0) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await userTestingProgram.registerBetaUser({
        email: form.email,
        name: form.name,
        tier: form.tier,
        testingFocus: form.testingFocus
      });

      if (result.success) {
        onSuccess(result.userId!);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to register for beta program. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Join SyncScript Beta Program</h2>
              <p className="text-blue-100 mt-1">Help shape the future of productivity</p>
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
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNum <= step ? 'bg-white text-blue-600' : 'bg-white/20 text-white/60'
                  }`}
                >
                  {stepNum}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to SyncScript Beta! 🚀</h3>
                  <p className="text-gray-600">
                    Join our exclusive beta program and help us build the most powerful productivity platform ever created.
                    Get early access to cutting-edge features and shape the future of productivity.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Beta Tier</h3>
                  <p className="text-gray-600">
                    Select the tier that best describes your testing style and expertise level.
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(TIER_DESCRIPTIONS).map(([tierKey, tier]) => (
                    <motion.div
                      key={tierKey}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        form.tier === tierKey
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInputChange('tier', tierKey as any)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tier.color} flex items-center justify-center text-2xl`}>
                          {tier.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{tier.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{tier.description}</p>
                          <ul className="mt-2 space-y-1">
                            {tier.benefits.map((benefit, index) => (
                              <li key={index} className="text-xs text-gray-500 flex items-center">
                                <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          form.tier === tierKey ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                        }`}>
                          {form.tier === tierKey && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Testing Focus Areas</h3>
                  <p className="text-gray-600">
                    Choose the features you'd like to help test and provide feedback on.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TESTING_FOCUS_OPTIONS.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        form.testingFocus.includes(option.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleTestingFocusToggle(option.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          form.testingFocus.includes(option.id)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {form.testingFocus.includes(option.id) && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{option.label}</h4>
                          <p className="text-gray-600 text-sm mt-1">{option.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What motivates you to join our beta program?
                  </label>
                  <textarea
                    value={form.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Tell us what excites you about SyncScript..."
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {step < 3 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Joining Beta...' : 'Join Beta Program'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BetaRegistration;
