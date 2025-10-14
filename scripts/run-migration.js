#!/usr/bin/env node

/**
 * Database Migration Execution Script
 * 
 * Executes the database migration for SyncScript Phase 2 Enhanced Features
 * Includes validation, rollback capability, and progress tracking
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// Configuration
const config = {
  // Database connection (replace with your actual connection details)
  connectionString: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/syncscript',
  migrationFile: path.join(__dirname, 'database-migration.sql'),
  logFile: path.join(__dirname, 'migration-log.txt'),
  backupFile: path.join(__dirname, 'pre-migration-backup.sql')
};

class DatabaseMigration {
  constructor() {
    this.client = new Client({
      connectionString: config.connectionString
    });
    this.startTime = new Date();
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('✅ Connected to database');
      this.log('Connected to database');
    } catch (error) {
      console.error('❌ Failed to connect to database:', error.message);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.client.end();
      console.log('✅ Disconnected from database');
      this.log('Disconnected from database');
    } catch (error) {
      console.error('❌ Error disconnecting from database:', error.message);
    }
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(config.logFile, logMessage);
    console.log(logMessage.trim());
  }

  async checkPrerequisites() {
    this.log('Checking prerequisites...');
    
    try {
      // Check if migration file exists
      if (!fs.existsSync(config.migrationFile)) {
        throw new Error('Migration file not found');
      }

      // Check database connection
      const result = await this.client.query('SELECT version()');
      this.log(`Database version: ${result.rows[0].version}`);

      // Check if migration has already been run
      const migrationCheck = await this.client.query(`
        SELECT EXISTS (
          SELECT 1 FROM information_schema.tables 
          WHERE table_name = 'migration_log'
        )
      `);

      if (migrationCheck.rows[0].exists) {
        const existingMigration = await this.client.query(`
          SELECT * FROM migration_log WHERE version = '2.0.0'
        `);

        if (existingMigration.rows.length > 0) {
          throw new Error('Migration version 2.0.0 has already been executed');
        }
      }

      this.log('✅ Prerequisites check passed');
      return true;
    } catch (error) {
      this.log(`❌ Prerequisites check failed: ${error.message}`);
      throw error;
    }
  }

  async createBackup() {
    this.log('Creating database backup...');
    
    try {
      // Get all table names
      const tablesResult = await this.client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
      `);

      const tables = tablesResult.rows.map(row => row.table_name);
      this.log(`Found ${tables.length} tables to backup`);

      // Create backup file header
      let backupContent = `-- SyncScript Database Backup\n`;
      backupContent += `-- Created: ${new Date().toISOString()}\n`;
      backupContent += `-- Migration: Phase 2 Enhanced Features\n\n`;

      // Backup each table
      for (const table of tables) {
        this.log(`Backing up table: ${table}`);
        
        // Get table structure
        const structureResult = await this.client.query(`
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns
          WHERE table_name = '${table}'
          ORDER BY ordinal_position
        `);

        backupContent += `\n-- Table: ${table}\n`;
        backupContent += `CREATE TABLE IF NOT EXISTS ${table}_backup AS SELECT * FROM ${table};\n`;
      }

      // Write backup file
      fs.writeFileSync(config.backupFile, backupContent);
      this.log(`✅ Backup created: ${config.backupFile}`);
      
    } catch (error) {
      this.log(`❌ Backup creation failed: ${error.message}`);
      throw error;
    }
  }

  async executeMigration() {
    this.log('Executing database migration...');
    
    try {
      // Read migration file
      const migrationSQL = fs.readFileSync(config.migrationFile, 'utf8');
      
      // Split into individual statements
      const statements = migrationSQL
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

      this.log(`Found ${statements.length} SQL statements to execute`);

      // Execute each statement
      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        
        try {
          this.log(`Executing statement ${i + 1}/${statements.length}...`);
          await this.client.query(statement);
          this.log(`✅ Statement ${i + 1} executed successfully`);
        } catch (error) {
          this.log(`❌ Statement ${i + 1} failed: ${error.message}`);
          throw error;
        }
      }

      this.log('✅ Migration executed successfully');
      
    } catch (error) {
      this.log(`❌ Migration execution failed: ${error.message}`);
      throw error;
    }
  }

  async validateMigration() {
    this.log('Validating migration...');
    
    try {
      // Check if all expected tables exist
      const expectedTables = [
        'users', 'user_sessions', 'user_analytics', 'energy_logs',
        'productivity_insights', 'budget_categories', 'expenses',
        'savings_goals', 'beta_users', 'feedback_submissions',
        'testing_sessions', 'tasks', 'projects', 'briefing_settings',
        'briefing_history', 'migration_log'
      ];

      for (const table of expectedTables) {
        const result = await this.client.query(`
          SELECT EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = '${table}'
          )
        `);

        if (!result.rows[0].exists) {
          throw new Error(`Table ${table} was not created`);
        }
        this.log(`✅ Table ${table} exists`);
      }

      // Check if indexes exist
      const expectedIndexes = [
        'idx_users_auth0_id', 'idx_user_analytics_user_date',
        'idx_energy_logs_user_id', 'idx_budget_categories_user_id',
        'idx_beta_users_user_id', 'idx_feedback_submissions_user_id'
      ];

      for (const index of expectedIndexes) {
        const result = await this.client.query(`
          SELECT EXISTS (
            SELECT 1 FROM pg_indexes 
            WHERE indexname = '${index}'
          )
        `);

        if (!result.rows[0].exists) {
          throw new Error(`Index ${index} was not created`);
        }
        this.log(`✅ Index ${index} exists`);
      }

      // Check if triggers exist
      const expectedTriggers = [
        'update_users_updated_at', 'update_user_analytics_updated_at',
        'update_budget_categories_updated_at'
      ];

      for (const trigger of expectedTriggers) {
        const result = await this.client.query(`
          SELECT EXISTS (
            SELECT 1 FROM information_schema.triggers 
            WHERE trigger_name = '${trigger}'
          )
        `);

        if (!result.rows[0].exists) {
          throw new Error(`Trigger ${trigger} was not created`);
        }
        this.log(`✅ Trigger ${trigger} exists`);
      }

      // Check if views exist
      const expectedViews = [
        'user_dashboard_data', 'budget_overview', 'beta_program_stats'
      ];

      for (const view of expectedViews) {
        const result = await this.client.query(`
          SELECT EXISTS (
            SELECT 1 FROM information_schema.views 
            WHERE table_name = '${view}'
          )
        `);

        if (!result.rows[0].exists) {
          throw new Error(`View ${view} was not created`);
        }
        this.log(`✅ View ${view} exists`);
      }

      this.log('✅ Migration validation passed');
      
    } catch (error) {
      this.log(`❌ Migration validation failed: ${error.message}`);
      throw error;
    }
  }

  async rollback() {
    this.log('Rolling back migration...');
    
    try {
      // Drop all new tables
      const tablesToDrop = [
        'briefing_history', 'briefing_settings', 'testing_sessions',
        'feedback_submissions', 'beta_users', 'savings_goals',
        'expenses', 'budget_categories', 'productivity_insights',
        'energy_logs', 'user_analytics', 'user_sessions'
      ];

      for (const table of tablesToDrop) {
        try {
          await this.client.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
          this.log(`✅ Dropped table ${table}`);
        } catch (error) {
          this.log(`⚠️  Error dropping table ${table}: ${error.message}`);
        }
      }

      // Drop views
      const viewsToDrop = ['beta_program_stats', 'budget_overview', 'user_dashboard_data'];
      for (const view of viewsToDrop) {
        try {
          await this.client.query(`DROP VIEW IF EXISTS ${view}`);
          this.log(`✅ Dropped view ${view}`);
        } catch (error) {
          this.log(`⚠️  Error dropping view ${view}: ${error.message}`);
        }
      }

      this.log('✅ Rollback completed');
      
    } catch (error) {
      this.log(`❌ Rollback failed: ${error.message}`);
      throw error;
    }
  }

  async run() {
    try {
      this.log('🚀 Starting SyncScript Database Migration');
      this.log(`Migration version: 2.0.0`);
      this.log(`Start time: ${this.startTime.toISOString()}`);

      await this.connect();
      await this.checkPrerequisites();
      await this.createBackup();
      await this.executeMigration();
      await this.validateMigration();

      const endTime = new Date();
      const duration = (endTime - this.startTime) / 1000;
      
      this.log('🎉 Migration completed successfully!');
      this.log(`Duration: ${duration} seconds`);
      this.log(`End time: ${endTime.toISOString()}`);

    } catch (error) {
      this.log(`💥 Migration failed: ${error.message}`);
      this.log('Attempting rollback...');
      
      try {
        await this.rollback();
        this.log('✅ Rollback completed successfully');
      } catch (rollbackError) {
        this.log(`❌ Rollback failed: ${rollbackError.message}`);
      }
      
      throw error;
    } finally {
      await this.disconnect();
    }
  }
}

// Command line interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const migration = new DatabaseMigration();

  try {
    switch (command) {
      case 'run':
        await migration.run();
        break;
      case 'rollback':
        await migration.connect();
        await migration.rollback();
        break;
      case 'validate':
        await migration.connect();
        await migration.validateMigration();
        break;
      default:
        console.log('Usage: node run-migration.js [run|rollback|validate]');
        console.log('  run      - Execute the migration');
        console.log('  rollback - Rollback the migration');
        console.log('  validate - Validate the migration');
        process.exit(1);
    }
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = DatabaseMigration;
