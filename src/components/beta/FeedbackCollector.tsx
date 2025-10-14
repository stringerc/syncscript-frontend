/**
 * In-App Feedback Collection Component
 * 
 * Provides seamless feedback collection for beta users
 * Includes rating, categorization, and suggestion submission
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { userTestingProgram } from '../../utils/userTestingProgram';

interface FeedbackCollectorProps {
  feature: string;
  userId: string;
  onClose: () => void;
  onSuccess: (feedbackId: string) => void;
}

interface FeedbackForm {
  rating: number;
  feedback: string;
  suggestions: string[];
  category: 'bug' | 'improvement' | 'feature-request' | 'general';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const FEATURE_NAMES: Record<string, string> = {
  'morning-brief': 'Morning Brief',
  'evening-brief': 'Evening Brief',
  'ai-explainability': 'AI Explainability',
  'emblem-transparency': 'Emblem Transparency',
  'analytics-dashboard': 'Analytics Dashboard',
  'budget-intelligence': 'Budget Intelligence',
  'energy-recalibration': 'Energy Recalibration'
};

const CATEGORY_ICONS = {
  'bug': '🐛',
  'improvement': '💡',
  'feature-request': '✨',
  'general': '💬'
};

const PRIORITY_COLORS = {
  'low': 'text-green-600 bg-green-50',
  'medium': 'text-yellow-600 bg-yellow-50',
  'high': 'text-orange-600 bg-orange-50',
  'critical': 'text-red-600 bg-red-50'
};

const FeedbackCollector: React.FC<FeedbackCollectorProps> = ({
  feature,
  userId,
  onClose,
  onSuccess
}) => {
  const [form, setForm] = useState<FeedbackForm>({
    rating: 0,
    feedback: '',
    suggestions: [],
    category: 'general',
    priority: 'medium'
  });
  const [currentSuggestion, setCurrentSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FeedbackForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const addSuggestion = () => {
    if (currentSuggestion.trim() && !form.suggestions.includes(currentSuggestion.trim())) {
      setForm(prev => ({
        ...prev,
        suggestions: [...prev.suggestions, currentSuggestion.trim()]
      }));
      setCurrentSuggestion('');
    }
  };

  const removeSuggestion = (index: number) => {
    setForm(prev => ({
      ...prev,
      suggestions: prev.suggestions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    if (!form.feedback.trim()) {
      setError('Please provide your feedback');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await userTestingProgram.submitFeedback({
        userId,
        feature,
        rating: form.rating,
        feedback: form.feedback,
        suggestions: form.suggestions,
        category: form.category,
        priority: form.priority
      });

      if (result.success) {
        onSuccess(result.feedbackId!);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Share Your Feedback</h2>
              <p className="text-green-100 mt-1">
                Help us improve {FEATURE_NAMES[feature] || feature}
              </p>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How would you rate this feature?
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <motion.button
                  key={rating}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleInputChange('rating', rating)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                    rating <= form.rating
                      ? 'bg-yellow-400 text-white'
                      : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                  }`}
                >
                  ⭐
                </motion.button>
              ))}
              {form.rating > 0 && (
                <span className="ml-3 text-sm text-gray-600">
                  {form.rating === 1 && 'Poor'}
                  {form.rating === 2 && 'Fair'}
                  {form.rating === 3 && 'Good'}
                  {form.rating === 4 && 'Very Good'}
                  {form.rating === 5 && 'Excellent'}
                </span>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What type of feedback is this?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(CATEGORY_ICONS).map(([category, icon]) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange('category', category as any)}
                  className={`p-3 border-2 rounded-lg text-left transition-all ${
                    form.category === category
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{icon}</span>
                    <span className="font-medium capitalize">{category.replace('-', ' ')}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Priority Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(PRIORITY_COLORS).map(([priority, colorClass]) => (
                <motion.button
                  key={priority}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange('priority', priority as any)}
                  className={`p-2 rounded-lg text-center transition-all ${
                    form.priority === priority
                      ? `${colorClass} border-2 border-current`
                      : 'border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium capitalize">{priority}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback *
            </label>
            <textarea
              value={form.feedback}
              onChange={(e) => handleInputChange('feedback', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Tell us what you think about this feature..."
            />
          </div>

          {/* Suggestions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suggestions for Improvement
            </label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentSuggestion}
                  onChange={(e) => setCurrentSuggestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSuggestion()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a suggestion..."
                />
                <button
                  onClick={addSuggestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
              
              {form.suggestions.length > 0 && (
                <div className="space-y-2">
                  {form.suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">{suggestion}</span>
                      <button
                        onClick={() => removeSuggestion(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !form.feedback.trim()}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackCollector;
