import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface LearningCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearningCenter: React.FC<LearningCenterProps> = ({ isOpen, onClose }) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses: Course[] = [
    {
      id: 'getting-started',
      title: 'Getting Started with SyncScript',
      description: 'Learn the basics of energy-based productivity',
      icon: '🚀',
      lessons: 5,
      duration: '30 min',
      level: 'beginner'
    },
    {
      id: 'energy-optimization',
      title: 'Energy Optimization Mastery',
      description: 'Master your energy patterns for peak productivity',
      icon: '⚡',
      lessons: 8,
      duration: '60 min',
      level: 'intermediate'
    },
    {
      id: 'ai-features',
      title: 'AI Features Deep Dive',
      description: 'Maximize productivity with AI tools',
      icon: '🤖',
      lessons: 6,
      duration: '45 min',
      level: 'intermediate'
    },
    {
      id: 'team-collaboration',
      title: 'Team Collaboration Best Practices',
      description: 'Lead productive teams with SyncScript',
      icon: '👥',
      lessons: 7,
      duration: '50 min',
      level: 'advanced'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="learning-overlay" onClick={onClose}>
      <motion.div
        className="learning-modal"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="learning-header">
          <div>
            <h2>🎓 Learning Center</h2>
            <p>Master productivity with SyncScript</p>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="learning-content">
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-icon">{course.icon}</div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span>{course.lessons} lessons</span>
                  <span>•</span>
                  <span>{course.duration}</span>
                  <span className={`level-badge ${course.level}`}>
                    {course.level}
                  </span>
                </div>
                <button className="btn btn-primary btn-block">
                  Start Course →
                </button>
              </div>
            ))}
          </div>

          <div className="certification-section">
            <h4>🏆 Get Certified</h4>
            <p>Complete courses and earn productivity certifications</p>
            <button className="btn btn-outline">View Certifications</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LearningCenter;
