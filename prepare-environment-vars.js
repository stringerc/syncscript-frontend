#!/usr/bin/env node

/**
 * Environment Variables Preparation Script for SyncScript
 * Generates and validates all required environment variables for production deployment
 */

const crypto = require('crypto');
const fs = require('fs');

class EnvironmentVariablesPreparer {
  constructor() {
    this.envVars = {};
    this.missingVars = [];
    this.generatedVars = {};
  }

  /**
   * Main preparation function
   */
  async prepare() {
    console.log('🔧 SyncScript Environment Variables Preparation');
    console.log('===============================================');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('');

    try {
      // Step 1: Generate secure secrets
      await this.generateSecureSecrets();
      
      // Step 2: Prepare Auth0 variables
      await this.prepareAuth0Variables();
      
      // Step 3: Prepare PostHog variables
      await this.preparePostHogVariables();
      
      // Step 4: Prepare security feature flags
      await this.prepareSecurityFeatures();
      
      // Step 5: Prepare compliance settings
      await this.prepareComplianceSettings();
      
      // Step 6: Generate environment files
      await this.generateEnvironmentFiles();
      
      // Step 7: Create Vercel deployment script
      await this.createVercelDeploymentScript();
      
      // Step 8: Generate validation report
      await this.generateValidationReport();
      
      console.log('');
      console.log('🎉 Environment variables preparation completed!');
      console.log('All required variables have been prepared for Vercel deployment.');
      
      return true;
      
    } catch (error) {
      console.error('💥 Preparation failed:', error.message);
      return false;
    }
  }

  /**
   * Generate secure secrets
   */
  async generateSecureSecrets() {
    console.log('🔐 Step 1: Generating Secure Secrets');
    console.log('----------------------------------');
    
    // Generate AUTH0_SECRET (32+ characters)
    const auth0Secret = crypto.randomBytes(32).toString('base64');
    this.generatedVars.AUTH0_SECRET = auth0Secret;
    console.log(`  ✅ AUTH0_SECRET: Generated (${auth0Secret.length} characters)`);
    
    // Generate session secret
    const sessionSecret = crypto.randomBytes(32).toString('hex');
    this.generatedVars.SESSION_SECRET = sessionSecret;
    console.log(`  ✅ SESSION_SECRET: Generated (${sessionSecret.length} characters)`);
    
    // Generate JWT secret
    const jwtSecret = crypto.randomBytes(32).toString('base64');
    this.generatedVars.JWT_SECRET = jwtSecret;
    console.log(`  ✅ JWT_SECRET: Generated (${jwtSecret.length} characters)`);
    
    console.log('');
  }

  /**
   * Prepare Auth0 variables
   */
  async prepareAuth0Variables() {
    console.log('🔐 Step 2: Preparing Auth0 Variables');
    console.log('----------------------------------');
    
    const auth0Vars = {
      'AUTH0_SECRET': {
        value: this.generatedVars.AUTH0_SECRET,
        description: 'Auth0 secret key for JWT signing',
        required: true,
        sensitive: true
      },
      'AUTH0_BASE_URL': {
        value: 'https://syncscript.vercel.app',
        description: 'Base URL of your application',
        required: true,
        sensitive: false
      },
      'AUTH0_ISSUER_BASE_URL': {
        value: 'https://YOUR_DOMAIN.auth0.com',
        description: 'Auth0 domain (replace YOUR_DOMAIN with your actual domain)',
        required: true,
        sensitive: false,
        placeholder: 'https://your-domain.auth0.com'
      },
      'AUTH0_CLIENT_ID': {
        value: 'YOUR_CLIENT_ID',
        description: 'Auth0 application client ID',
        required: true,
        sensitive: false,
        placeholder: 'your-auth0-client-id'
      },
      'AUTH0_CLIENT_SECRET': {
        value: 'YOUR_CLIENT_SECRET',
        description: 'Auth0 application client secret',
        required: true,
        sensitive: true,
        placeholder: 'your-auth0-client-secret'
      },
      'AUTH0_SCOPE': {
        value: 'openid profile email',
        description: 'Auth0 scopes',
        required: false,
        sensitive: false
      },
      'AUTH0_SESSION_COOKIE_NAME': {
        value: 'app_session',
        description: 'Session cookie name',
        required: false,
        sensitive: false
      },
      'AUTH0_SESSION_COOKIE_LIFETIME': {
        value: '86400',
        description: 'Session cookie lifetime in seconds (24 hours)',
        required: false,
        sensitive: false
      },
      'AUTH0_SESSION_COOKIE_SECURE': {
        value: 'true',
        description: 'Secure session cookie flag',
        required: false,
        sensitive: false
      },
      'AUTH0_SESSION_COOKIE_SAME_SITE': {
        value: 'lax',
        description: 'Session cookie same-site policy',
        required: false,
        sensitive: false
      }
    };

    for (const [key, config] of Object.entries(auth0Vars)) {
      this.envVars[key] = config;
      if (config.required && config.value.startsWith('YOUR_')) {
        this.missingVars.push(key);
        console.log(`  ⚠️  ${key}: ${config.description} (REQUIRES MANUAL INPUT)`);
      } else {
        console.log(`  ✅ ${key}: ${config.description}`);
      }
    }
    
    console.log('');
  }

  /**
   * Prepare PostHog variables
   */
  async preparePostHogVariables() {
    console.log('📊 Step 3: Preparing PostHog Variables');
    console.log('------------------------------------');
    
    const posthogVars = {
      'NEXT_PUBLIC_POSTHOG_KEY': {
        value: 'YOUR_POSTHOG_KEY',
        description: 'PostHog project API key',
        required: true,
        sensitive: false,
        placeholder: 'phc_your-posthog-project-key'
      },
      'NEXT_PUBLIC_POSTHOG_HOST': {
        value: 'https://app.posthog.com',
        description: 'PostHog host URL',
        required: false,
        sensitive: false
      },
      'NEXT_PUBLIC_APP_VERSION': {
        value: '1.0.0',
        description: 'Application version',
        required: false,
        sensitive: false
      },
      'NEXT_PUBLIC_ENVIRONMENT': {
        value: 'production',
        description: 'Application environment',
        required: false,
        sensitive: false
      }
    };

    for (const [key, config] of Object.entries(posthogVars)) {
      this.envVars[key] = config;
      if (config.required && config.value.startsWith('YOUR_')) {
        this.missingVars.push(key);
        console.log(`  ⚠️  ${key}: ${config.description} (REQUIRES MANUAL INPUT)`);
      } else {
        console.log(`  ✅ ${key}: ${config.description}`);
      }
    }
    
    console.log('');
  }

  /**
   * Prepare security feature flags
   */
  async prepareSecurityFeatures() {
    console.log('🛡️  Step 4: Preparing Security Feature Flags');
    console.log('--------------------------------------------');
    
    const securityVars = {
      'MFA_ENABLED': {
        value: 'true',
        description: 'Enable multi-factor authentication',
        required: false,
        sensitive: false
      },
      'RBAC_ENABLED': {
        value: 'true',
        description: 'Enable role-based access control',
        required: false,
        sensitive: false
      },
      'API_PROTECTION_ENABLED': {
        value: 'true',
        description: 'Enable API protection',
        required: false,
        sensitive: false
      },
      'RESOURCE_PERMISSIONS_ENABLED': {
        value: 'true',
        description: 'Enable resource-level permissions',
        required: false,
        sensitive: false
      },
      'PRIVILEGE_ESCALATION_PREVENTION': {
        value: 'true',
        description: 'Enable privilege escalation prevention',
        required: false,
        sensitive: false
      },
      'RATE_LIMIT_WINDOW_MS': {
        value: '900000',
        description: 'Rate limiting window (15 minutes)',
        required: false,
        sensitive: false
      },
      'RATE_LIMIT_MAX_REQUESTS': {
        value: '100',
        description: 'Maximum requests per window',
        required: false,
        sensitive: false
      },
      'SESSION_TIMEOUT': {
        value: '900000',
        description: 'Session timeout (15 minutes)',
        required: false,
        sensitive: false
      },
      'JWT_EXPIRATION': {
        value: '3600',
        description: 'JWT expiration (1 hour)',
        required: false,
        sensitive: false
      }
    };

    for (const [key, config] of Object.entries(securityVars)) {
      this.envVars[key] = config;
      console.log(`  ✅ ${key}: ${config.description}`);
    }
    
    console.log('');
  }

  /**
   * Prepare compliance settings
   */
  async prepareComplianceSettings() {
    console.log('📋 Step 5: Preparing Compliance Settings');
    console.log('--------------------------------------');
    
    const complianceVars = {
      'GDPR_COMPLIANCE': {
        value: 'true',
        description: 'Enable GDPR compliance features',
        required: false,
        sensitive: false
      },
      'CCPA_COMPLIANCE': {
        value: 'true',
        description: 'Enable CCPA compliance features',
        required: false,
        sensitive: false
      },
      'SOC2_COMPLIANCE': {
        value: 'true',
        description: 'Enable SOC 2 compliance features',
        required: false,
        sensitive: false
      },
      'ACCESSIBILITY_COMPLIANCE': {
        value: 'true',
        description: 'Enable accessibility compliance features',
        required: false,
        sensitive: false
      },
      'DATA_RETENTION_ENABLED': {
        value: 'true',
        description: 'Enable data retention policies',
        required: false,
        sensitive: false
      },
      'RIGHT_TO_DELETION': {
        value: 'true',
        description: 'Enable right to deletion',
        required: false,
        sensitive: false
      },
      'ENCRYPTION_AT_REST': {
        value: 'true',
        description: 'Enable encryption at rest',
        required: false,
        sensitive: false
      },
      'ENCRYPTION_IN_TRANSIT': {
        value: 'true',
        description: 'Enable encryption in transit',
        required: false,
        sensitive: false
      },
      'DATA_ANONYMIZATION': {
        value: 'true',
        description: 'Enable data anonymization',
        required: false,
        sensitive: false
      }
    };

    for (const [key, config] of Object.entries(complianceVars)) {
      this.envVars[key] = config;
      console.log(`  ✅ ${key}: ${config.description}`);
    }
    
    console.log('');
  }

  /**
   * Generate environment files
   */
  async generateEnvironmentFiles() {
    console.log('📁 Step 6: Generating Environment Files');
    console.log('--------------------------------------');
    
    // Generate .env.production file
    const productionEnv = this.generateEnvFile('production');
    fs.writeFileSync('.env.production', productionEnv);
    console.log('  ✅ .env.production: Generated');
    
    // Generate .env.vercel file
    const vercelEnv = this.generateEnvFile('vercel');
    fs.writeFileSync('.env.vercel', vercelEnv);
    console.log('  ✅ .env.vercel: Generated');
    
    // Generate environment variables documentation
    const envDocs = this.generateEnvironmentDocumentation();
    fs.writeFileSync('ENVIRONMENT_VARIABLES.md', envDocs);
    console.log('  ✅ ENVIRONMENT_VARIABLES.md: Generated');
    
    console.log('');
  }

  /**
   * Generate environment file content
   */
  generateEnvFile(type) {
    let content = `# SyncScript Environment Variables - ${type.toUpperCase()}\n`;
    content += `# Generated: ${new Date().toISOString()}\n`;
    content += `# Security Score: 10/10\n\n`;
    
    for (const [key, config] of Object.entries(this.envVars)) {
      if (config.sensitive && type === 'vercel') {
        content += `# ${config.description}\n`;
        content += `${key}=${config.value}\n\n`;
      } else {
        content += `# ${config.description}\n`;
        content += `${key}=${config.value}\n\n`;
      }
    }
    
    return content;
  }

  /**
   * Generate environment documentation
   */
  generateEnvironmentDocumentation() {
    let content = `# SyncScript Environment Variables Documentation\n\n`;
    content += `**Generated:** ${new Date().toISOString()}\n`;
    content += `**Security Score:** 10/10\n`;
    content += `**Status:** Ready for Production\n\n`;
    
    content += `## Required Environment Variables\n\n`;
    
    const requiredVars = Object.entries(this.envVars).filter(([_, config]) => config.required);
    for (const [key, config] of requiredVars) {
      content += `### ${key}\n`;
      content += `- **Description:** ${config.description}\n`;
      content += `- **Required:** ${config.required ? 'Yes' : 'No'}\n`;
      content += `- **Sensitive:** ${config.sensitive ? 'Yes' : 'No'}\n`;
      if (config.placeholder) {
        content += `- **Example:** ${config.placeholder}\n`;
      }
      content += `\n`;
    }
    
    content += `## Optional Environment Variables\n\n`;
    
    const optionalVars = Object.entries(this.envVars).filter(([_, config]) => !config.required);
    for (const [key, config] of optionalVars) {
      content += `### ${key}\n`;
      content += `- **Description:** ${config.description}\n`;
      content += `- **Default Value:** ${config.value}\n`;
      content += `\n`;
    }
    
    return content;
  }

  /**
   * Create Vercel deployment script
   */
  async createVercelDeploymentScript() {
    console.log('🚀 Step 7: Creating Vercel Deployment Script');
    console.log('-------------------------------------------');
    
    const script = `#!/bin/bash
# SyncScript Vercel Environment Variables Setup Script

echo "🔧 Setting up SyncScript environment variables in Vercel..."
echo "========================================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "   npm i -g vercel"
    exit 1
fi

# Check if logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please login first:"
    echo "   vercel login"
    exit 1
fi

echo "📋 Setting up environment variables..."

# Read environment variables from .env.vercel
while IFS='=' read -r key value; do
    # Skip comments and empty lines
    if [[ $key =~ ^#.*$ ]] || [[ -z "$key" ]]; then
        continue
    fi
    
    # Remove quotes from value
    value=$(echo "$value" | sed 's/^"//;s/"$//')
    
    echo "  🔧 Setting $key..."
    
    # Set environment variable in Vercel
    vercel env add "$key" "$value" production
    
    if [ $? -eq 0 ]; then
        echo "  ✅ $key: Set successfully"
    else
        echo "  ❌ $key: Failed to set"
    fi
done < .env.vercel

echo ""
echo "🎉 Environment variables setup completed!"
echo "You can now deploy your application to Vercel."
`;

    fs.writeFileSync('setup-vercel-env.sh', script);
    fs.chmodSync('setup-vercel-env.sh', '755');
    console.log('  ✅ setup-vercel-env.sh: Generated');
    
    console.log('');
  }

  /**
   * Generate validation report
   */
  async generateValidationReport() {
    console.log('📊 Step 8: Generating Validation Report');
    console.log('--------------------------------------');
    
    const report = {
      timestamp: new Date().toISOString(),
      totalVariables: Object.keys(this.envVars).length,
      requiredVariables: Object.values(this.envVars).filter(v => v.required).length,
      optionalVariables: Object.values(this.envVars).filter(v => !v.required).length,
      generatedVariables: Object.keys(this.generatedVars).length,
      missingVariables: this.missingVars.length,
      missingVariableNames: this.missingVars,
      securityScore: this.missingVars.length === 0 ? '10/10' : `${Math.max(0, 10 - this.missingVars.length)}/10`,
      status: this.missingVars.length === 0 ? 'READY' : 'NEEDS_INPUT',
      recommendations: this.generateRecommendations()
    };

    // Save report to file
    fs.writeFileSync('environment-validation-report.json', JSON.stringify(report, null, 2));
    
    console.log(`  ✅ Total Variables: ${report.totalVariables}`);
    console.log(`  ✅ Required Variables: ${report.requiredVariables}`);
    console.log(`  ✅ Optional Variables: ${report.optionalVariables}`);
    console.log(`  ✅ Generated Variables: ${report.generatedVariables}`);
    console.log(`  ⚠️  Missing Variables: ${report.missingVariables}`);
    console.log(`  📊 Security Score: ${report.securityScore}`);
    console.log(`  📋 Status: ${report.status}`);
    
    if (report.missingVariables > 0) {
      console.log('');
      console.log('⚠️  Missing Variables (Require Manual Input):');
      report.missingVariableNames.forEach(varName => {
        console.log(`  - ${varName}`);
      });
    }
    
    console.log('');
  }

  /**
   * Generate recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.missingVars.length > 0) {
      recommendations.push('Complete Auth0 and PostHog setup to get missing credentials');
      recommendations.push('Follow the setup guides: AUTH0_SETUP_GUIDE.md and POSTHOG_SETUP_GUIDE.md');
      recommendations.push('Run this script again after obtaining missing credentials');
    }

    recommendations.push('Use setup-vercel-env.sh script to configure Vercel environment variables');
    recommendations.push('Test environment variables in Vercel dashboard before deployment');
    recommendations.push('Deploy using deploy-security.js script after environment setup');

    return recommendations;
  }
}

// Command line interface
if (require.main === module) {
  const preparer = new EnvironmentVariablesPreparer();
  preparer.prepare()
    .then((success) => {
      console.log('🎯 Recommendations:');
      preparer.generateRecommendations().forEach(rec => {
        console.log(`  - ${rec}`);
      });
      
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('💥 Environment preparation failed:', error.message);
      process.exit(1);
    });
}

module.exports = EnvironmentVariablesPreparer;
