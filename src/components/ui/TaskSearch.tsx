import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type SortOption = 'priority' | 'due_date' | 'points' | 'energy_match' | 'created_at';

interface TaskSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
  resultsCount: number;
  totalCount: number;
}

const TaskSearch: React.FC<TaskSearchProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  resultsCount,
  totalCount
}) => {
  return (
    <div className="task-search">
      <div className="search-container">
        {/* Search Input */}
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                className="clear-search-btn"
                onClick={() => onSearchChange('')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Sort Dropdown */}
        <div className="sort-dropdown-wrapper">
          <svg className="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M7 12h10m-7 6h4"/>
          </svg>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="sort-dropdown"
          >
            <option value="energy_match">Energy Match</option>
            <option value="priority">Priority</option>
            <option value="due_date">Due Date</option>
            <option value="points">Points</option>
            <option value="created_at">Recently Created</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || resultsCount !== totalCount) && (
        <motion.div
          className="results-count"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 11l3 3L22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
          <span>
            {resultsCount === totalCount ? (
              <>{resultsCount} task{resultsCount !== 1 ? 's' : ''}</>
            ) : (
              <>{resultsCount} of {totalCount} task{totalCount !== 1 ? 's' : ''}</>
            )}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default TaskSearch;

