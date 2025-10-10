import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/CommandPalette.css';

interface Command {
  id: string;
  label: string;
  icon: string;
  shortcut?: string;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, commands }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter commands based on search
  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            handleClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  const handleClose = () => {
    setSearch('');
    setSelectedIndex(0);
    onClose();
  };

  const handleCommandClick = (command: Command) => {
    command.action();
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="command-palette-overlay" onClick={handleClose} />
          <motion.div
            className="command-palette"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Search Input */}
            <div className="command-search">
              <span className="search-icon">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                className="search-input"
              />
              <kbd className="search-hint">ESC</kbd>
            </div>

            {/* Commands List */}
            <div className="command-results">
              {Object.keys(groupedCommands).length === 0 ? (
                <div className="no-results">
                  <span className="no-results-icon">😕</span>
                  <p>No commands found</p>
                </div>
              ) : (
                Object.entries(groupedCommands).map(([category, cmds]) => (
                  <div key={category} className="command-group">
                    <div className="command-category">{category}</div>
                    {cmds.map((cmd, index) => {
                      const globalIndex = filteredCommands.indexOf(cmd);
                      return (
                        <button
                          key={cmd.id}
                          className={`command-item ${globalIndex === selectedIndex ? 'selected' : ''}`}
                          onClick={() => handleCommandClick(cmd)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <span className="command-icon">{cmd.icon}</span>
                          <span className="command-label">{cmd.label}</span>
                          {cmd.shortcut && (
                            <kbd className="command-shortcut">{cmd.shortcut}</kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="command-footer">
              <div className="command-hint">
                <kbd>↑</kbd><kbd>↓</kbd> Navigate
                <span className="hint-separator">·</span>
                <kbd>↵</kbd> Select
                <span className="hint-separator">·</span>
                <kbd>ESC</kbd> Close
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
