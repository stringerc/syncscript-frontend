-- SyncScript Database Migration Script
-- Phase 2 Enhanced Features & Beta Program Support
-- 
-- This script creates the enhanced database schema for:
-- - User analytics and insights
-- - Budget intelligence features
-- - Beta program management
-- - Enhanced task management
-- - Briefing system support

-- =====================================================
-- 1. ENHANCED USER MANAGEMENT
-- =====================================================

-- Enhanced Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth0_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  timezone VARCHAR(50) DEFAULT 'UTC',
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE,
  subscription_tier VARCHAR(50) DEFAULT 'free',
  beta_user BOOLEAN DEFAULT FALSE,
  beta_tier VARCHAR(50),
  beta_signup_date TIMESTAMP WITH TIME ZONE,
  preferences JSONB DEFAULT '{}',
  settings JSONB DEFAULT '{}'
);

-- User Sessions Table
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- 2. ANALYTICS & INSIGHTS
-- =====================================================

-- User Analytics Table
CREATE TABLE IF NOT EXISTS user_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  energy_level INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  tasks_created INTEGER DEFAULT 0,
  focus_time_minutes INTEGER DEFAULT 0,
  productivity_score DECIMAL(5,2) DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Energy Logs Table
CREATE TABLE IF NOT EXISTS energy_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  energy_level INTEGER NOT NULL CHECK (energy_level >= 0 AND energy_level <= 10),
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'manual',
  context JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Productivity Insights Table
CREATE TABLE IF NOT EXISTS productivity_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  insight_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  data JSONB DEFAULT '{}',
  confidence_score DECIMAL(3,2) DEFAULT 0,
  is_actionable BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_read BOOLEAN DEFAULT FALSE
);

-- =====================================================
-- 3. BUDGET INTELLIGENCE
-- =====================================================

-- Budget Categories Table
CREATE TABLE IF NOT EXISTS budget_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  budget_amount DECIMAL(10,2) NOT NULL,
  spent_amount DECIMAL(10,2) DEFAULT 0,
  color VARCHAR(7) DEFAULT '#3B82F6',
  icon VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES budget_categories(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  description VARCHAR(255) NOT NULL,
  expense_date DATE NOT NULL,
  payment_method VARCHAR(50),
  merchant VARCHAR(255),
  tags TEXT[],
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Savings Goals Table
CREATE TABLE IF NOT EXISTS savings_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  target_amount DECIMAL(10,2) NOT NULL,
  current_amount DECIMAL(10,2) DEFAULT 0,
  target_date DATE,
  priority VARCHAR(20) DEFAULT 'medium',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. BETA PROGRAM
-- =====================================================

-- Beta Users Table
CREATE TABLE IF NOT EXISTS beta_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tier VARCHAR(50) NOT NULL,
  testing_focus TEXT[],
  feedback_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  preferences JSONB DEFAULT '{}'
);

-- Feedback Submissions Table
CREATE TABLE IF NOT EXISTS feedback_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  feature VARCHAR(100) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  suggestions TEXT[],
  category VARCHAR(50) NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(20) DEFAULT 'submitted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testing Sessions Table
CREATE TABLE IF NOT EXISTS testing_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  feature VARCHAR(100) NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_time TIMESTAMP WITH TIME ZONE,
  completion_rate DECIMAL(5,2) DEFAULT 0,
  satisfaction INTEGER CHECK (satisfaction >= 1 AND satisfaction <= 5),
  actions JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}'
);

-- =====================================================
-- 5. ENHANCED TASK MANAGEMENT
-- =====================================================

-- Enhanced Tasks Table (if not exists)
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority INTEGER CHECK (priority >= 1 AND priority <= 5),
  energy_requirement INTEGER CHECK (energy_requirement >= 1 AND energy_requirement <= 5),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  points INTEGER DEFAULT 0,
  estimated_duration INTEGER,
  actual_duration INTEGER,
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  recurrence_config JSONB,
  tags JSONB DEFAULT '[]',
  subtasks JSONB DEFAULT '[]',
  notes JSONB DEFAULT '[]'
);

-- Projects Table (if not exists)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  archived BOOLEAN DEFAULT FALSE
);

-- =====================================================
-- 6. BRIEFING SYSTEM
-- =====================================================

-- Briefing Settings Table
CREATE TABLE IF NOT EXISTS briefing_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  morning_brief_enabled BOOLEAN DEFAULT TRUE,
  evening_brief_enabled BOOLEAN DEFAULT TRUE,
  morning_time TIME DEFAULT '08:00',
  evening_time TIME DEFAULT '18:00',
  content_modules JSONB DEFAULT '{}',
  delivery_channels JSONB DEFAULT '{}',
  tone VARCHAR(20) DEFAULT 'professional',
  frequency VARCHAR(20) DEFAULT 'daily',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Briefing History Table
CREATE TABLE IF NOT EXISTS briefing_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  briefing_type VARCHAR(20) NOT NULL,
  content JSONB NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  viewed_at TIMESTAMP WITH TIME ZONE,
  is_viewed BOOLEAN DEFAULT FALSE
);

-- =====================================================
-- 7. INDEXES FOR PERFORMANCE
-- =====================================================

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_auth0_id ON users(auth0_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_beta_user ON users(beta_user);
CREATE INDEX IF NOT EXISTS idx_users_last_active ON users(last_active);

-- User sessions indexes
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON user_sessions(expires_at);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_date ON user_analytics(user_id, date);
CREATE INDEX IF NOT EXISTS idx_user_analytics_date ON user_analytics(date);
CREATE INDEX IF NOT EXISTS idx_user_analytics_productivity ON user_analytics(productivity_score);

-- Energy logs indexes
CREATE INDEX IF NOT EXISTS idx_energy_logs_user_id ON energy_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_energy_logs_logged_at ON energy_logs(logged_at);
CREATE INDEX IF NOT EXISTS idx_energy_logs_energy_level ON energy_logs(energy_level);

-- Productivity insights indexes
CREATE INDEX IF NOT EXISTS idx_productivity_insights_user_id ON productivity_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_productivity_insights_type ON productivity_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_productivity_insights_created ON productivity_insights(created_at);

-- Budget categories indexes
CREATE INDEX IF NOT EXISTS idx_budget_categories_user_id ON budget_categories(user_id);
CREATE INDEX IF NOT EXISTS idx_budget_categories_active ON budget_categories(is_active);

-- Expenses indexes
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_category_id ON expenses(category_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_expenses_amount ON expenses(amount);

-- Savings goals indexes
CREATE INDEX IF NOT EXISTS idx_savings_goals_user_id ON savings_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_savings_goals_active ON savings_goals(is_active);
CREATE INDEX IF NOT EXISTS idx_savings_goals_target_date ON savings_goals(target_date);

-- Beta users indexes
CREATE INDEX IF NOT EXISTS idx_beta_users_user_id ON beta_users(user_id);
CREATE INDEX IF NOT EXISTS idx_beta_users_tier ON beta_users(tier);
CREATE INDEX IF NOT EXISTS idx_beta_users_status ON beta_users(status);

-- Feedback submissions indexes
CREATE INDEX IF NOT EXISTS idx_feedback_submissions_user_id ON feedback_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_submissions_feature ON feedback_submissions(feature);
CREATE INDEX IF NOT EXISTS idx_feedback_submissions_rating ON feedback_submissions(rating);
CREATE INDEX IF NOT EXISTS idx_feedback_submissions_created ON feedback_submissions(created_at);

-- Testing sessions indexes
CREATE INDEX IF NOT EXISTS idx_testing_sessions_user_id ON testing_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_testing_sessions_feature ON testing_sessions(feature);
CREATE INDEX IF NOT EXISTS idx_testing_sessions_start_time ON testing_sessions(start_time);

-- Tasks indexes
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_energy_requirement ON tasks(energy_requirement);

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_archived ON projects(archived);

-- Briefing settings indexes
CREATE INDEX IF NOT EXISTS idx_briefing_settings_user_id ON briefing_settings(user_id);

-- Briefing history indexes
CREATE INDEX IF NOT EXISTS idx_briefing_history_user_id ON briefing_history(user_id);
CREATE INDEX IF NOT EXISTS idx_briefing_history_type ON briefing_history(briefing_type);
CREATE INDEX IF NOT EXISTS idx_briefing_history_generated ON briefing_history(generated_at);

-- =====================================================
-- 8. TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_analytics_updated_at BEFORE UPDATE ON user_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_budget_categories_updated_at BEFORE UPDATE ON budget_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_savings_goals_updated_at BEFORE UPDATE ON savings_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feedback_submissions_updated_at BEFORE UPDATE ON feedback_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_briefing_settings_updated_at BEFORE UPDATE ON briefing_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 9. SAMPLE DATA FOR TESTING
-- =====================================================

-- Insert sample user for testing
INSERT INTO users (auth0_id, email, name, beta_user, beta_tier) 
VALUES ('auth0|sample', 'beta@syncscript.app', 'Beta Tester', TRUE, 'early-adopter')
ON CONFLICT (email) DO NOTHING;

-- Insert sample budget categories
INSERT INTO budget_categories (user_id, name, budget_amount, color, icon)
SELECT u.id, 'Food & Dining', 800.00, '#EF4444', '🍽️'
FROM users u WHERE u.email = 'beta@syncscript.app'
ON CONFLICT DO NOTHING;

INSERT INTO budget_categories (user_id, name, budget_amount, color, icon)
SELECT u.id, 'Transportation', 600.00, '#3B82F6', '🚗'
FROM users u WHERE u.email = 'beta@syncscript.app'
ON CONFLICT DO NOTHING;

INSERT INTO budget_categories (user_id, name, budget_amount, color, icon)
SELECT u.id, 'Entertainment', 400.00, '#8B5CF6', '🎬'
FROM users u WHERE u.email = 'beta@syncscript.app'
ON CONFLICT DO NOTHING;

-- Insert sample savings goals
INSERT INTO savings_goals (user_id, name, target_amount, current_amount, target_date, priority)
SELECT u.id, 'Emergency Fund', 10000.00, 7500.00, '2024-12-31', 'high'
FROM users u WHERE u.email = 'beta@syncscript.app'
ON CONFLICT DO NOTHING;

INSERT INTO savings_goals (user_id, name, target_amount, current_amount, target_date, priority)
SELECT u.id, 'Vacation Fund', 3000.00, 1200.00, '2024-08-15', 'medium'
FROM users u WHERE u.email = 'beta@syncscript.app'
ON CONFLICT DO NOTHING;

-- Insert sample analytics data
INSERT INTO user_analytics (user_id, date, energy_level, tasks_completed, tasks_created, focus_time_minutes, productivity_score, streak_days, points_earned)
SELECT u.id, CURRENT_DATE, 8, 5, 3, 120, 87.5, 12, 150
FROM users u WHERE u.email = 'beta@syncscript.app'
ON CONFLICT (user_id, date) DO NOTHING;

-- =====================================================
-- 10. VIEWS FOR COMMON QUERIES
-- =====================================================

-- User dashboard view
CREATE OR REPLACE VIEW user_dashboard_data AS
SELECT 
    u.id as user_id,
    u.name,
    u.email,
    u.beta_user,
    u.beta_tier,
    ua.date,
    ua.energy_level,
    ua.tasks_completed,
    ua.tasks_created,
    ua.productivity_score,
    ua.streak_days,
    ua.points_earned,
    (SELECT COUNT(*) FROM tasks t WHERE t.user_id = u.id AND t.completed = FALSE) as active_tasks,
    (SELECT COUNT(*) FROM tasks t WHERE t.user_id = u.id AND t.completed = TRUE) as completed_tasks
FROM users u
LEFT JOIN user_analytics ua ON u.id = ua.user_id AND ua.date = CURRENT_DATE;

-- Budget overview view
CREATE OR REPLACE VIEW budget_overview AS
SELECT 
    u.id as user_id,
    u.name,
    COUNT(bc.id) as total_categories,
    SUM(bc.budget_amount) as total_budget,
    SUM(bc.spent_amount) as total_spent,
    SUM(bc.budget_amount) - SUM(bc.spent_amount) as remaining_budget,
    COUNT(sg.id) as active_savings_goals,
    SUM(sg.target_amount) as total_savings_target,
    SUM(sg.current_amount) as current_savings
FROM users u
LEFT JOIN budget_categories bc ON u.id = bc.user_id AND bc.is_active = TRUE
LEFT JOIN savings_goals sg ON u.id = sg.user_id AND sg.is_active = TRUE
GROUP BY u.id, u.name;

-- Beta program statistics view
CREATE OR REPLACE VIEW beta_program_stats AS
SELECT 
    bu.tier,
    COUNT(*) as user_count,
    AVG(fs.rating) as avg_rating,
    COUNT(fs.id) as total_feedback,
    COUNT(ts.id) as total_sessions,
    AVG(ts.completion_rate) as avg_completion_rate
FROM beta_users bu
LEFT JOIN feedback_submissions fs ON bu.user_id = fs.user_id
LEFT JOIN testing_sessions ts ON bu.user_id = ts.user_id
GROUP BY bu.tier;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Log migration completion
INSERT INTO migration_log (version, description, executed_at) 
VALUES ('2.0.0', 'Phase 2 Enhanced Features & Beta Program Support', NOW())
ON CONFLICT DO NOTHING;

-- Create migration log table if it doesn't exist
CREATE TABLE IF NOT EXISTS migration_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version VARCHAR(20) UNIQUE NOT NULL,
  description TEXT,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMIT;
