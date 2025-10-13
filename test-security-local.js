/**
 * Local Security Testing Suite for SyncScript
 * Comprehensive testing before production deployment
 */

const fs = require('fs');
const path = require('path');

class LocalSecurityTester {
  constructor() {
    this.testResults = [];
    this.criticalIssues = [];
    this.warnings = [];
  }

  /**
   * Run comprehensive local security tests
   */
  async runAllTests() {
    console.log('🛡️ Starting Local Security Testing Suite...\n');
    
    const tests = [
      'configFiles',
      'securityHeaders',
      'rateLimiting',
      'authentication',
      'inputValidation',
      'dataProtection',
      'monitoring',
      'compliance'
    ];

    for (const test of tests) {
      await this.runTest(test);
    }

    return this.generateReport();
  }

  /**
   * Test configuration files
   */
  async testConfigFiles() {
    console.log('📋 Testing Configuration Files...');
    
    const configFiles = [
      'next.config.js',
      'security-headers.js',
      'rate-limiting.js',
      'security-monitoring.js',
      'middleware/security.js',
      'src/utils/security.js'
    ];

    for (const file of configFiles) {
      const exists = fs.existsSync(file);
      if (!exists) {
        this.criticalIssues.push(`Missing configuration file: ${file}`);
        console.log(`  ❌ Missing: ${file}`);
      } else {
        console.log(`  ✅ Found: ${file}`);
        
        // Check for security configurations
        const content = fs.readFileSync(file, 'utf8');
        if (this.checkSecurityConfigurations(file, content)) {
          console.log(`  ✅ Security configurations present in ${file}`);
        } else {
          this.warnings.push(`Security configurations may be missing in ${file}`);
          console.log(`  ⚠️  Security configurations may be missing in ${file}`);
        }
      }
    }
  }

  /**
   * Test security headers configuration
   */
  async testSecurityHeaders() {
    console.log('🔒 Testing Security Headers Configuration...');
    
    const nextConfigPath = 'next.config.js';
    if (fs.existsSync(nextConfigPath)) {
      const content = fs.readFileSync(nextConfigPath, 'utf8');
      
      const requiredHeaders = [
        'X-Content-Type-Options',
        'X-Frame-Options',
        'X-XSS-Protection',
        'Strict-Transport-Security',
        'Content-Security-Policy',
        'Permissions-Policy'
      ];

      for (const header of requiredHeaders) {
        if (content.includes(header)) {
          console.log(`  ✅ ${header} configured`);
        } else {
          this.criticalIssues.push(`Missing security header: ${header}`);
          console.log(`  ❌ Missing: ${header}`);
        }
      }

      // Check CSP configuration
      if (content.includes('Content-Security-Policy')) {
        console.log(`  ✅ Content Security Policy configured`);
      } else {
        this.criticalIssues.push('Content Security Policy not configured');
        console.log(`  ❌ Content Security Policy not configured`);
      }
    } else {
      this.criticalIssues.push('next.config.js not found');
      console.log(`  ❌ next.config.js not found`);
    }
  }

  /**
   * Test rate limiting configuration
   */
  async testRateLimiting() {
    console.log('⏱️  Testing Rate Limiting Configuration...');
    
    const rateLimitPath = 'rate-limiting.js';
    if (fs.existsSync(rateLimitPath)) {
      const content = fs.readFileSync(rateLimitPath, 'utf8');
      
      const requiredLimits = [
        'generalLimiter',
        'authLimiter',
        'apiLimiter',
        'uploadLimiter',
        'passwordResetLimiter'
      ];

      for (const limit of requiredLimits) {
        if (content.includes(limit)) {
          console.log(`  ✅ ${limit} configured`);
        } else {
          this.warnings.push(`Rate limiting may be missing: ${limit}`);
          console.log(`  ⚠️  Rate limiting may be missing: ${limit}`);
        }
      }
    } else {
      this.warnings.push('Rate limiting configuration not found');
      console.log(`  ⚠️  Rate limiting configuration not found`);
    }
  }

  /**
   * Test authentication configuration
   */
  async testAuthentication() {
    console.log('🔐 Testing Authentication Configuration...');
    
    // Check for Auth0 configuration
    const envFile = '.env.local';
    if (fs.existsSync(envFile)) {
      const content = fs.readFileSync(envFile, 'utf8');
      
      const authConfigs = [
        'AUTH0_SECRET',
        'AUTH0_BASE_URL',
        'AUTH0_ISSUER_BASE_URL',
        'AUTH0_CLIENT_ID',
        'AUTH0_CLIENT_SECRET'
      ];

      for (const config of authConfigs) {
        if (content.includes(config)) {
          console.log(`  ✅ ${config} configured`);
        } else {
          this.warnings.push(`Auth0 configuration may be missing: ${config}`);
          console.log(`  ⚠️  Auth0 configuration may be missing: ${config}`);
        }
      }
    } else {
      this.warnings.push('Environment configuration file not found');
      console.log(`  ⚠️  Environment configuration file not found`);
    }

    // Check for MFA enforcement
    console.log(`  ℹ️  MFA enforcement should be configured in Auth0 dashboard`);
  }

  /**
   * Test input validation
   */
  async testInputValidation() {
    console.log('🛡️  Testing Input Validation Configuration...');
    
    const securityUtilsPath = 'src/utils/security.js';
    if (fs.existsSync(securityUtilsPath)) {
      const content = fs.readFileSync(securityUtilsPath, 'utf8');
      
      const validationMethods = [
        'validateInput',
        'sanitizeHTML',
        'validateEmail',
        'validatePassword',
        'validateFileUpload'
      ];

      for (const method of validationMethods) {
        if (content.includes(method)) {
          console.log(`  ✅ ${method} implemented`);
        } else {
          this.criticalIssues.push(`Input validation missing: ${method}`);
          console.log(`  ❌ Missing: ${method}`);
        }
      }
    } else {
      this.criticalIssues.push('Security utilities not found');
      console.log(`  ❌ Security utilities not found`);
    }
  }

  /**
   * Test data protection
   */
  async testDataProtection() {
    console.log('🔒 Testing Data Protection Configuration...');
    
    // Check for encryption configurations
    const nextConfigPath = 'next.config.js';
    if (fs.existsSync(nextConfigPath)) {
      const content = fs.readFileSync(nextConfigPath, 'utf8');
      
      if (content.includes('https') || content.includes('SSL') || content.includes('TLS')) {
        console.log(`  ✅ HTTPS/TLS configuration detected`);
      } else {
        this.warnings.push('HTTPS/TLS configuration may be missing');
        console.log(`  ⚠️  HTTPS/TLS configuration may be missing`);
      }
    }

    // Check for data persistence utilities
    const dataPersistencePath = 'src/utils/dataPersistence.ts';
    if (fs.existsSync(dataPersistencePath)) {
      console.log(`  ✅ Data persistence utilities found`);
    } else {
      this.warnings.push('Data persistence utilities not found');
      console.log(`  ⚠️  Data persistence utilities not found`);
    }
  }

  /**
   * Test monitoring configuration
   */
  async testMonitoring() {
    console.log('📊 Testing Monitoring Configuration...');
    
    const monitoringPath = 'security-monitoring.js';
    if (fs.existsSync(monitoringPath)) {
      const content = fs.readFileSync(monitoringPath, 'utf8');
      
      const monitoringFeatures = [
        'logSecurityEvent',
        'logAuthEvent',
        'logAPIEvent',
        'logDataAccess',
        'detectAttack'
      ];

      for (const feature of monitoringFeatures) {
        if (content.includes(feature)) {
          console.log(`  ✅ ${feature} implemented`);
        } else {
          this.warnings.push(`Monitoring feature may be missing: ${feature}`);
          console.log(`  ⚠️  Monitoring feature may be missing: ${feature}`);
        }
      }
    } else {
      this.criticalIssues.push('Security monitoring not found');
      console.log(`  ❌ Security monitoring not found`);
    }
  }

  /**
   * Test compliance configuration
   */
  async testCompliance() {
    console.log('📋 Testing Compliance Configuration...');
    
    const complianceDocs = [
      'SECURITY_FRAMEWORK.md',
      'SECURITY_AUDIT_CHECKLIST.md',
      'COMPLIANCE_DOCUMENTATION.md',
      'SECURITY_POLICIES.md',
      'INCIDENT_RESPONSE_PLAN.md'
    ];

    for (const doc of complianceDocs) {
      if (fs.existsSync(doc)) {
        console.log(`  ✅ ${doc} found`);
      } else {
        this.warnings.push(`Compliance documentation missing: ${doc}`);
        console.log(`  ⚠️  Missing: ${doc}`);
      }
    }

    // Check for GDPR/CCPA compliance features
    const securityUtilsPath = 'src/utils/security.js';
    if (fs.existsSync(securityUtilsPath)) {
      const content = fs.readFileSync(securityUtilsPath, 'utf8');
      
      if (content.includes('GDPR') || content.includes('CCPA') || content.includes('privacy')) {
        console.log(`  ✅ Privacy compliance features detected`);
      } else {
        this.warnings.push('Privacy compliance features may be missing');
        console.log(`  ⚠️  Privacy compliance features may be missing`);
      }
    }
  }

  /**
   * Check security configurations in file content
   */
  checkSecurityConfigurations(fileName, content) {
    const securityKeywords = [
      'security',
      'encrypt',
      'auth',
      'validate',
      'sanitize',
      'monitor',
      'log',
      'protect'
    ];

    const keywordCount = securityKeywords.filter(keyword => 
      content.toLowerCase().includes(keyword)
    ).length;

    return keywordCount >= 3; // At least 3 security-related keywords
  }

  /**
   * Run individual test
   */
  async runTest(testName) {
    try {
      await this[`test${testName.charAt(0).toUpperCase() + testName.slice(1)}`]();
      this.testResults.push({
        test: testName,
        status: 'completed',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      this.criticalIssues.push(`Test ${testName} failed: ${error.message}`);
      console.log(`  💥 Test ${testName} failed: ${error.message}`);
    }
  }

  /**
   * Generate test report
   */
  generateReport() {
    const totalTests = this.testResults.length;
    const criticalCount = this.criticalIssues.length;
    const warningCount = this.warnings.length;
    
    const report = {
      summary: {
        totalTests,
        criticalIssues: criticalCount,
        warnings: warningCount,
        status: criticalCount === 0 ? 'READY' : 'NEEDS_ATTENTION',
        timestamp: new Date().toISOString()
      },
      criticalIssues: this.criticalIssues,
      warnings: this.warnings,
      recommendations: this.generateRecommendations()
    };

    console.log('\n📊 LOCAL SECURITY TEST REPORT');
    console.log('==============================');
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Critical Issues: ${criticalCount}`);
    console.log(`Warnings: ${warningCount}`);
    console.log(`Status: ${criticalCount === 0 ? '✅ READY FOR DEPLOYMENT' : '❌ NEEDS ATTENTION'}`);

    if (criticalCount > 0) {
      console.log('\n❌ CRITICAL ISSUES:');
      this.criticalIssues.forEach(issue => {
        console.log(`  - ${issue}`);
      });
    }

    if (warningCount > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => {
        console.log(`  - ${warning}`);
      });
    }

    return report;
  }

  /**
   * Generate recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.criticalIssues.length > 0) {
      recommendations.push({
        priority: 'CRITICAL',
        action: 'Fix all critical issues before deployment',
        description: 'Critical issues must be resolved to ensure security'
      });
    }

    if (this.warnings.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        action: 'Address warnings before production deployment',
        description: 'Warnings should be addressed to ensure optimal security'
      });
    }

    if (this.criticalIssues.length === 0 && this.warnings.length === 0) {
      recommendations.push({
        priority: 'INFO',
        action: 'Proceed with deployment',
        description: 'All security configurations are properly implemented'
      });
    }

    return recommendations;
  }
}

// Export for use in other modules
module.exports = LocalSecurityTester;

// Run tests if called directly
if (require.main === module) {
  const tester = new LocalSecurityTester();
  tester.runAllTests().then(report => {
    console.log('\n🎯 RECOMMENDATIONS:');
    report.recommendations.forEach(rec => {
      console.log(`[${rec.priority}] ${rec.action}: ${rec.description}`);
    });
    
    process.exit(report.summary.status === 'READY' ? 0 : 1);
  }).catch(error => {
    console.error('Local security test execution failed:', error);
    process.exit(1);
  });
}
