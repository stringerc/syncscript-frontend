import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  color: string;
}

interface BulkActionToolbarProps {
  selectedCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBulkComplete: () => void;
  onBulkDelete: () => void;
  onBulkMove: (projectId: string | null) => void;
  projects: Project[];
  totalCount: number;
}

const BulkActionToolbar: React.FC<BulkActionToolbarProps> = ({
  selectedCount,
  onSelectAll,
  onClearSelection,
  onBulkComplete,
  onBulkDelete,
  onBulkMove,
  projects,
  totalCount
}) => {
  const [showMoveMenu, setShowMoveMenu] = useState(false);

  if (selectedCount === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="bulk-action-toolbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bulk-toolbar-content">
          {/* Selection Info */}
          <div className="selection-info">
            <svg className="selection-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            <span className="selection-count">
              <strong>{selectedCount}</strong> selected
            </span>
            {selectedCount < totalCount && (
              <button
                className="btn-link"
                onClick={onSelectAll}
              >
                Select all ({totalCount})
              </button>
            )}
          </div>

          {/* Bulk Actions */}
          <div className="bulk-actions">
            <button
              className="btn btn-sm btn-success"
              onClick={onBulkComplete}
              title="Complete selected tasks"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/>
              </svg>
              Complete
            </button>

            <div className="bulk-move-wrapper">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setShowMoveMenu(!showMoveMenu)}
                title="Move to project"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2z"/>
                  <path d="M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8V5z"/>
                </svg>
                Move
                <svg className={`dropdown-icon ${showMoveMenu ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              <AnimatePresence>
                {showMoveMenu && (
                  <motion.div
                    className="move-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <button
                      className="move-option"
                      onClick={() => {
                        onBulkMove(null);
                        setShowMoveMenu(false);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M3 9h18"/>
                      </svg>
                      No Project
                    </button>
                    {projects.map((project) => (
                      <button
                        key={project.id}
                        className="move-option"
                        onClick={() => {
                          onBulkMove(project.id);
                          setShowMoveMenu(false);
                        }}
                      >
                        <div
                          className="project-dot"
                          style={{ background: project.color }}
                        ></div>
                        {project.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="btn btn-sm btn-danger"
              onClick={onBulkDelete}
              title="Delete selected tasks"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
              Delete
            </button>

            <button
              className="btn btn-sm btn-ghost"
              onClick={onClearSelection}
              title="Clear selection"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Clear
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BulkActionToolbar;
