import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchFilters {
  query: string;
  status: 'all' | 'pending' | 'completed';
  priority: 'all' | '1' | '2' | '3' | '4' | '5';
  energy: 'all' | '1' | '2' | '3' | '4' | '5';
  project: string;
  tags: string[];
  dateRange: 'all' | 'today' | 'week' | 'month' | 'custom';
  sortBy: 'created' | 'due_date' | 'priority' | 'energy';
  sortOrder: 'asc' | 'desc';
}

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
  projects: Array<{ id: string; name: string }>;
  availableTags: string[];
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  isOpen,
  onClose,
  onSearch,
  projects,
  availableTags
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    status: 'all',
    priority: 'all',
    energy: 'all',
    project: '',
    tags: [],
    dateRange: 'all',
    sortBy: 'created',
    sortOrder: 'desc'
  });

  const [savedSearches, setSavedSearches] = useState<Array<{ name: string; filters: SearchFilters }>>([]);
  const [searchName, setSearchName] = useState('');

  const handleFilterChange = (key: keyof SearchFilters, value: string | string[] | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      query: '',
      status: 'all',
      priority: 'all',
      energy: 'all',
      project: '',
      tags: [],
      dateRange: 'all',
      sortBy: 'created',
      sortOrder: 'desc'
    });
  };

  const handleSaveSearch = () => {
    if (!searchName.trim()) return;
    
    setSavedSearches(prev => [...prev, { name: searchName, filters }]);
    setSearchName('');
  };

  const handleLoadSearch = (savedFilters: SearchFilters) => {
    setFilters(savedFilters);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="advanced-search-overlay" onClick={onClose}>
          <motion.div
            className="advanced-search-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="advanced-search-header">
              <div className="header-content">
                <span className="header-icon">🔍</span>
                <div>
                  <h2>Advanced Search</h2>
                  <p>Find tasks with powerful filters</p>
                </div>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            {/* Content */}
            <div className="advanced-search-content">
              {/* Search Query */}
              <div className="search-field">
                <label>Search Query</label>
                <input
                  type="text"
                  value={filters.query}
                  onChange={(e) => handleFilterChange('query', e.target.value)}
                  placeholder="Search task title or description..."
                  className="search-input"
                />
              </div>

              {/* Filters Grid */}
              <div className="filters-grid">
                {/* Status */}
                <div className="filter-group">
                  <label>Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Priority */}
                <div className="filter-group">
                  <label>Priority</label>
                  <select
                    value={filters.priority}
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All</option>
                    <option value="5">5 - Critical</option>
                    <option value="4">4 - High</option>
                    <option value="3">3 - Medium</option>
                    <option value="2">2 - Low</option>
                    <option value="1">1 - Minimal</option>
                  </select>
                </div>

                {/* Energy */}
                <div className="filter-group">
                  <label>Energy Required</label>
                  <select
                    value={filters.energy}
                    onChange={(e) => handleFilterChange('energy', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All</option>
                    <option value="5">5 - Very High</option>
                    <option value="4">4 - High</option>
                    <option value="3">3 - Medium</option>
                    <option value="2">2 - Low</option>
                    <option value="1">1 - Very Low</option>
                  </select>
                </div>

                {/* Project */}
                <div className="filter-group">
                  <label>Project</label>
                  <select
                    value={filters.project}
                    onChange={(e) => handleFilterChange('project', e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Projects</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range */}
                <div className="filter-group">
                  <label>Date Range</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="filter-group">
                  <label>Sort By</label>
                  <div className="sort-controls">
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="filter-select"
                    >
                      <option value="created">Created Date</option>
                      <option value="due_date">Due Date</option>
                      <option value="priority">Priority</option>
                      <option value="energy">Energy</option>
                    </select>
                    <button
                      className="sort-order-btn"
                      onClick={() => handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                      {filters.sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {availableTags.length > 0 && (
                <div className="tags-section">
                  <label>Tags</label>
                  <div className="tags-list">
                    {availableTags.map(tag => (
                      <button
                        key={tag}
                        className={`tag-btn ${filters.tags.includes(tag) ? 'selected' : ''}`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Searches */}
              {savedSearches.length > 0 && (
                <div className="saved-searches-section">
                  <label>Saved Searches</label>
                  <div className="saved-searches-list">
                    {savedSearches.map((saved, idx) => (
                      <button
                        key={idx}
                        className="saved-search-btn"
                        onClick={() => handleLoadSearch(saved.filters)}
                      >
                        📌 {saved.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Save Search */}
              <div className="save-search-section">
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Name this search..."
                  className="save-search-input"
                />
                <button
                  className="btn btn-outline btn-sm"
                  onClick={handleSaveSearch}
                  disabled={!searchName.trim()}
                >
                  💾 Save Search
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="advanced-search-footer">
              <button className="btn btn-ghost" onClick={handleReset}>
                Reset
              </button>
              <div className="footer-actions">
                <button className="btn btn-outline" onClick={onClose}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSearch}>
                  🔍 Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdvancedSearch;
