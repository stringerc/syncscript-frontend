import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Target, 
  Users, 
  BarChart3,
  Star,
  Play,
  Shield,
  Clock,
  Brain
} from 'lucide-react';

export default function LandingV2() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Intelligence",
      description: "Advanced AI that learns your patterns and optimizes your workflow automatically."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-level security with SOC 2 compliance and end-to-end encryption."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time Optimization",
      description: "Smart scheduling that maximizes your productivity and minimizes wasted time."
    }
  ];

  return (
    <>
      <Head>
        <title>SyncScript v2 - Next-Gen Productivity</title>
        <meta name="description" content="Experience the future of productivity with SyncScript v2's revolutionary AI-powered features." />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-50 to-pink-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4 mr-2" />
                SyncScript v2 - Now Available
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                The Future of
                <span className="text-purple-600"> Productivity</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Experience revolutionary AI-powered productivity with SyncScript v2. 
                Smarter, faster, and more intuitive than ever before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center">
                  Try v2 Beta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Revolutionary Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover what makes SyncScript v2 the most advanced productivity platform.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-purple-600 mb-6 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready for the Future?
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Be among the first to experience SyncScript v2's revolutionary features.
              </p>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center mx-auto">
                Join Beta Program
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
