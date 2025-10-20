import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Zap, 
  Target, 
  Brain,
  ArrowRight,
  Plus
} from 'lucide-react';

export default function SmartSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, time: '09:00', task: 'Morning Standup', duration: 30, type: 'meeting' },
    { id: 2, time: '10:00', task: 'Deep Work - Project Alpha', duration: 120, type: 'focus' },
    { id: 3, time: '14:00', task: 'Client Review', duration: 60, type: 'meeting' },
    { id: 4, time: '16:00', task: 'Email & Admin', duration: 45, type: 'admin' }
  ]);

  const scheduleTask = (timeSlot: any) => {
    console.log('Scheduling task:', timeSlot);
    // Handle task scheduling
  };

  const addNewTask = () => {
    const newTask = {
      id: Date.now(),
      time: '09:00',
      task: 'New Task',
      duration: 60,
      type: 'general'
    };
    setTimeSlots([...timeSlots, newTask]);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'focus': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Head>
        <title>Smart Schedule - SyncScript</title>
        <meta name="description" content="AI-powered smart scheduling to optimize your productivity and time management." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Smart Schedule
                </h1>
                <p className="text-gray-600">
                  AI-powered scheduling to optimize your productivity
                </p>
              </div>
              <button
                onClick={addNewTask}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Task
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Calendar Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Calendar
                  </h2>
                  <div className="space-y-2">
                    {Array.from({ length: 7 }, (_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      const isToday = date.toDateString() === new Date().toDateString();
                      const isSelected = date.toDateString() === selectedDate.toDateString();
                      
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(date)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            isSelected 
                              ? 'bg-blue-100 text-blue-900' 
                              : isToday 
                                ? 'bg-gray-100 text-gray-900' 
                                : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="text-sm font-medium">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="text-lg font-semibold">
                            {date.getDate()}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-white rounded-lg shadow p-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    AI Insights
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Peak Energy:</strong> 10:00 AM - 12:00 PM
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Recommendation:</strong> Schedule deep work in morning
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Warning:</strong> Too many meetings today
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {timeSlots.map((slot) => (
                        <motion.div
                          key={slot.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center mr-4">
                            <Clock className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="font-mono text-sm text-gray-600">
                              {slot.time}
                            </span>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {slot.task}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(slot.type)}`}>
                                {slot.type}
                              </span>
                              <span className="ml-2 text-sm text-gray-500">
                                {slot.duration} min
                              </span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => scheduleTask(slot)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center"
                          >
                            <ArrowRight className="h-4 w-4 mr-1" />
                            Schedule
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    {timeSlots.length === 0 && (
                      <div className="text-center py-12">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No tasks scheduled
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Add tasks to get started with smart scheduling
                        </p>
                        <button
                          onClick={addNewTask}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add Your First Task
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
