import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnergyLevel {
  id: number;
  label: string;
  description: string;
  color: string;
  gradient: string;
}

const ENERGY_LEVELS: EnergyLevel[] = [
  {
    id: 1,
    label: 'Low',
    description: 'Feeling drained, need rest',
    color: 'energy-low',
    gradient: 'linear-gradient(135deg, #4A90E2 0%, #1976D2 100%)'
  },
  {
    id: 2,
    label: 'Medium-Low',
    description: 'Below average energy',
    color: 'energy-medium-low',
    gradient: 'linear-gradient(135deg, #64B5F6 0%, #7ED321 100%)'
  },
  {
    id: 3,
    label: 'Medium',
    description: 'Steady, balanced energy',
    color: 'energy-medium',
    gradient: 'linear-gradient(135deg, #7ED321 0%, #388E3C 100%)'
  },
  {
    id: 4,
    label: 'High',
    description: 'Above average energy',
    color: 'energy-high',
    gradient: 'linear-gradient(135deg, #9CCC65 0%, #F5A623 100%)'
  },
  {
    id: 5,
    label: 'Peak',
    description: 'Maximum energy, ready to tackle anything',
    color: 'energy-peak',
    gradient: 'linear-gradient(135deg, #F5A623 0%, #F57C00 100%)'
  }
];

interface EnergySelectorProps {
  currentEnergy?: number;
  onEnergyChange: (energy: number) => void;
  className?: string;
}

export const EnergySelector: React.FC<EnergySelectorProps> = ({
  currentEnergy = 3,
  onEnergyChange,
  className = ''
}) => {
  const [selectedEnergy, setSelectedEnergy] = useState(currentEnergy);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setSelectedEnergy(currentEnergy);
  }, [currentEnergy]);

  const handleEnergySelect = (energy: number) => {
    if (energy === selectedEnergy) return;
    
    setIsAnimating(true);
    setSelectedEnergy(energy);
    onEnergyChange(energy);
    
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 500);
  };

  const selectedLevel = ENERGY_LEVELS.find(level => level.id === selectedEnergy);

  return (
    <div className={`energy-selector ${className}`}>
      {/* Header with current selection */}
      <motion.div 
        className="energy-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h3 className="energy-title">Current Energy Level</h3>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEnergy}
            className="energy-selection"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div 
              className={`energy-indicator ${selectedLevel?.color} active`}
              style={{ background: selectedLevel?.gradient }}
            >
              {selectedEnergy}
            </div>
            <div className="energy-info">
              <span className="energy-label">{selectedLevel?.label}</span>
              <span className="energy-description">{selectedLevel?.description}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Energy level options */}
      <div className="energy-options">
        {ENERGY_LEVELS.map((level) => (
          <motion.button
            key={level.id}
            className={`energy-option ${level.color} ${selectedEnergy === level.id ? 'active' : ''}`}
            onClick={() => handleEnergySelect(level.id)}
            style={{ background: level.gradient }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: level.id * 0.1,
              ease: "easeOut"
            }}
          >
            <div className="energy-number">{level.id}</div>
            <div className="energy-details">
              <span className="energy-label">{level.label}</span>
              <span className="energy-desc">{level.description}</span>
            </div>
            
            {/* Neural circuit indicator */}
            <div className="neural-indicator">
              <svg className="neural-icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="2" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
                <circle cx="6" cy="6" r="1" />
                <circle cx="18" cy="6" r="1" />
                <circle cx="6" cy="18" r="1" />
                <circle cx="18" cy="18" r="1" />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Completion animation */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="energy-completion"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="completion-ring">
              <svg viewBox="0 0 24 24" className="completion-icon">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnergySelector;
