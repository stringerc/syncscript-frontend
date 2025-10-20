import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Star,
  Users,
  Zap,
  Gift
} from 'lucide-react';

export default function Beta() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interests: []
  });

  const interests = [
    'AI Features',
    'Team Collaboration',
    'Analytics & Reporting',
    'Mobile App',
    'API Integration',
    'Custom Workflows'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle beta signup
    console.log('Beta signup:', formData);
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <>
      <Head>
        <title>Join SyncScript Beta - Early Access</title>
        <meta name="description" content="Get early access to SyncScript's latest features and help shape the future of productivity." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Beta Program
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join the
              <span className="text-blue-600"> Beta Program</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get early access to SyncScript's revolutionary features and help us shape 
              the future of productivity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Beta Benefits</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Early Access</h3>
                    <p className="text-gray-600">Be the first to try new features before public release</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Direct Feedback</h3>
                    <p className="text-gray-600">Share your thoughts directly with our development team</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Premium Support</h3>
                    <p className="text-gray-600">Get priority support and dedicated beta community access</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Exclusive Perks</h3>
                    <p className="text-gray-600">Receive special rewards and recognition for your participation</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <Gift className="h-6 w-6 text-yellow-500 mr-2" />
                  <h3 className="font-semibold text-gray-900">Beta Exclusive</h3>
                </div>
                <p className="text-gray-600">
                  Beta users get 6 months of premium features free when we launch publicly!
                </p>
              </div>
            </motion.div>

            {/* Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Join Beta Program</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your company (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your role</option>
                      <option value="product-manager">Product Manager</option>
                      <option value="developer">Developer</option>
                      <option value="designer">Designer</option>
                      <option value="marketer">Marketer</option>
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Areas of Interest
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {interests.map((interest) => (
                        <label key={interest} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => toggleInterest(interest)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Join Beta Program
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </form>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  We'll notify you when beta access is available. No spam, we promise!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
