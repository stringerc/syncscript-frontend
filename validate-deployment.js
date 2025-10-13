#!/usr/bin/env node

/**
 * SyncScript Post-Deployment Validation
 * Comprehensive validation of deployed security configurations
 */

const https = require('https');
const http = require('http');
const fs = require('fs');

class DeploymentValidator {
  constructor() {
    this.validationResults = [];
    this.errors = [];
    this.warnings = [];
    this.successCount = 0;
    this.baseUrl = process.env.DEPLOYMENT_URL || 'https://syncscript.vercel.app';
  }

  /**
   * Main validation function
   */
  async validate() {
    console.log('🔍 SyncScript Post-Deployment Validation Starting...');
    console.log('==================================================');
    console.log(`Target URL: ${this.baseUrl}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('');

    try {
      // Phase 1: Basic connectivity
      await this.validateConnectivity();
      
      // Phase 2: Security headers validation
      await this.validateSecurityHeaders();
      
      // Phase 3: Authentication validation
      await this.validateAuthentication();
      
      // Phase 4: Rate limiting validation
      await this.validateRateLimiting();
      
      // Phase 5: Input validation
      await this.validateInputValidation();
      
      // Phase 6: Performance validation
      await this.validatePerformance();
      
      // Phase 7: Monitoring validation
      await this.validateMonitoring();
      
      // Generate validation report
      this.generateValidationReport();
      
      console.log('');
      console.log('🎉 Post-deployment validation completed!');
      console.log(`Success Rate: ${((this.successCount / (this.successCount + this.errors.length)) * 100).toFixed(1)}%`);
      
      return this.errors.length === 0;
      
    } catch (error) {
      console.error('💥 Validation failed:', error.message);
      this.errors.push(error.message);
      this.generateValidationReport();
      return false;
    }
  }

  /**
   * Validate basic connectivity
   */
  async validateConnectivity() {
    console.log('🌐 Phase 1: Basic Connectivity Validation');
    console.log('---------------------------------------');
    
    const endpoints = [
      '/',
      '/dashboard',
      '/api/health',
      '/api/auth/me'
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`  🔍 Testing ${endpoint}...`);
        const response = await this.makeRequest(endpoint);
        
        if (response.statusCode >= 200 && response.statusCode < 400) {
          console.log(`  ✅ ${endpoint} - Status: ${response.statusCode}`);
          this.successCount++;
        } else {
          console.log(`  ⚠️  ${endpoint} - Status: ${response.statusCode}`);
          this.warnings.push(`${endpoint} returned status ${response.statusCode}`);
        }
      } catch (error) {
        console.log(`  ❌ ${endpoint} - Error: ${error.message}`);
        this.errors.push(`${endpoint}: ${error.message}`);
      }
    }
    
    console.log('');
  }

  /**
   * Validate security headers
   */
  async validateSecurityHeaders() {
    console.log('🔒 Phase 2: Security Headers Validation');
    console.log('-------------------------------------');
    
    const requiredHeaders = [
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'strict-transport-security',
      'content-security-policy',
      'permissions-policy'
    ];

    try {
      console.log('  🔍 Testing security headers...');
      const response = await this.makeRequest('/dashboard');
      const headers = response.headers;
      
      for (const header of requiredHeaders) {
        if (headers[header]) {
          console.log(`  ✅ ${header}: ${headers[header]}`);
          this.successCount++;
        } else {
          console.log(`  ❌ Missing header: ${header}`);
          this.errors.push(`Missing security header: ${header}`);
        }
      }
      
      // Validate specific header values
      this.validateHeaderValues(headers);
      
    } catch (error) {
      console.log(`  ❌ Security headers validation failed: ${error.message}`);
      this.errors.push(`Security headers validation: ${error.message}`);
    }
    
    console.log('');
  }

  /**
   * Validate header values
   */
  validateHeaderValues(headers) {
    // Validate X-Content-Type-Options
    if (headers['x-content-type-options'] !== 'nosniff') {
      this.warnings.push('X-Content-Type-Options should be "nosniff"');
    }

    // Validate X-Frame-Options
    if (!headers['x-frame-options'] || !headers['x-frame-options'].includes('SAMEORIGIN')) {
      this.warnings.push('X-Frame-Options should include "SAMEORIGIN"');
    }

    // Validate X-XSS-Protection
    if (!headers['x-xss-protection'] || !headers['x-xss-protection'].includes('1; mode=block')) {
      this.warnings.push('X-XSS-Protection should be "1; mode=block"');
    }

    // Validate Strict-Transport-Security
    if (!headers['strict-transport-security'] || !headers['strict-transport-security'].includes('max-age')) {
      this.warnings.push('Strict-Transport-Security should include max-age');
    }

    // Validate Content-Security-Policy
    if (!headers['content-security-policy']) {
      this.errors.push('Content-Security-Policy header is missing');
    } else {
      const csp = headers['content-security-policy'];
      if (!csp.includes('default-src')) {
        this.warnings.push('CSP should include default-src directive');
      }
      if (!csp.includes('script-src')) {
        this.warnings.push('CSP should include script-src directive');
      }
    }
  }

  /**
   * Validate authentication
   */
  async validateAuthentication() {
    console.log('🔐 Phase 3: Authentication Validation');
    console.log('-----------------------------------');
    
    try {
      // Test protected endpoint without auth
      console.log('  🔍 Testing protected endpoint without authentication...');
      const response = await this.makeRequest('/api/auth/me');
      
      if (response.statusCode === 401) {
        console.log('  ✅ Protected endpoint correctly returns 401');
        this.successCount++;
      } else {
        console.log(`  ⚠️  Protected endpoint returned ${response.statusCode} (expected 401)`);
        this.warnings.push('Protected endpoint should return 401 without authentication');
      }
      
      // Test invalid token
      console.log('  🔍 Testing invalid token...');
      const invalidTokenResponse = await this.makeRequest('/api/auth/me', {
        'Authorization': 'Bearer invalid-token'
      });
      
      if (invalidTokenResponse.statusCode === 401) {
        console.log('  ✅ Invalid token correctly returns 401');
        this.successCount++;
      } else {
        console.log(`  ⚠️  Invalid token returned ${invalidTokenResponse.statusCode} (expected 401)`);
        this.warnings.push('Invalid token should return 401');
      }
      
    } catch (error) {
      console.log(`  ❌ Authentication validation failed: ${error.message}`);
      this.errors.push(`Authentication validation: ${error.message}`);
    }
    
    console.log('');
  }

  /**
   * Validate rate limiting
   */
  async validateRateLimiting() {
    console.log('⏱️  Phase 4: Rate Limiting Validation');
    console.log('----------------------------------');
    
    try {
      console.log('  🔍 Testing rate limiting...');
      
      // Make multiple requests to trigger rate limiting
      const requests = [];
      for (let i = 0; i < 10; i++) {
        requests.push(this.makeRequest('/api/test'));
      }
      
      const responses = await Promise.all(requests);
      const rateLimitedResponses = responses.filter(r => r.statusCode === 429);
      
      if (rateLimitedResponses.length > 0) {
        console.log(`  ✅ Rate limiting active (${rateLimitedResponses.length} requests rate limited)`);
        this.successCount++;
      } else {
        console.log('  ⚠️  No rate limiting detected');
        this.warnings.push('Rate limiting may not be active');
      }
      
    } catch (error) {
      console.log(`  ❌ Rate limiting validation failed: ${error.message}`);
      this.warnings.push(`Rate limiting validation: ${error.message}`);
    }
    
    console.log('');
  }

  /**
   * Validate input validation
   */
  async validateInputValidation() {
    console.log('🛡️  Phase 5: Input Validation Validation');
    console.log('--------------------------------------');
    
    const maliciousInputs = [
      '<script>alert("xss")</script>',
      'javascript:alert("xss")',
      '"><script>alert("xss")</script>',
      '${7*7}',
      '{{7*7}}',
      '../../etc/passwd'
    ];

    for (const input of maliciousInputs) {
      try {
        console.log(`  🔍 Testing malicious input: ${input.substring(0, 30)}...`);
        
        const response = await this.makeRequest('/api/test', {}, {
          method: 'POST',
          body: JSON.stringify({ input: input }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.statusCode === 400 || response.statusCode === 403) {
          console.log(`  ✅ Malicious input blocked (${response.statusCode})`);
          this.successCount++;
        } else {
          console.log(`  ⚠️  Malicious input not blocked (${response.statusCode})`);
          this.warnings.push(`Malicious input not blocked: ${input.substring(0, 30)}`);
        }
        
      } catch (error) {
        console.log(`  ⚠️  Input validation test failed: ${error.message}`);
        this.warnings.push(`Input validation test: ${error.message}`);
      }
    }
    
    console.log('');
  }

  /**
   * Validate performance
   */
  async validatePerformance() {
    console.log('⚡ Phase 6: Performance Validation');
    console.log('--------------------------------');
    
    try {
      console.log('  🔍 Testing page load performance...');
      
      const startTime = Date.now();
      const response = await this.makeRequest('/dashboard');
      const endTime = Date.now();
      
      const loadTime = endTime - startTime;
      
      if (loadTime < 2000) {
        console.log(`  ✅ Page load time: ${loadTime}ms (excellent)`);
        this.successCount++;
      } else if (loadTime < 5000) {
        console.log(`  ✅ Page load time: ${loadTime}ms (acceptable)`);
        this.successCount++;
      } else {
        console.log(`  ⚠️  Page load time: ${loadTime}ms (slow)`);
        this.warnings.push(`Slow page load time: ${loadTime}ms`);
      }
      
    } catch (error) {
      console.log(`  ❌ Performance validation failed: ${error.message}`);
      this.errors.push(`Performance validation: ${error.message}`);
    }
    
    console.log('');
  }

  /**
   * Validate monitoring
   */
  async validateMonitoring() {
    console.log('📊 Phase 7: Monitoring Validation');
    console.log('--------------------------------');
    
    try {
      // Check if monitoring endpoints are accessible
      const monitoringEndpoints = [
        '/api/monitoring/health',
        '/api/monitoring/metrics',
        '/api/monitoring/security'
      ];

      for (const endpoint of monitoringEndpoints) {
        try {
          console.log(`  🔍 Testing monitoring endpoint: ${endpoint}...`);
          const response = await this.makeRequest(endpoint);
          
          if (response.statusCode === 200) {
            console.log(`  ✅ ${endpoint} accessible`);
            this.successCount++;
          } else {
            console.log(`  ⚠️  ${endpoint} returned ${response.statusCode}`);
            this.warnings.push(`Monitoring endpoint ${endpoint} returned ${response.statusCode}`);
          }
        } catch (error) {
          console.log(`  ⚠️  ${endpoint} not accessible: ${error.message}`);
          this.warnings.push(`Monitoring endpoint ${endpoint} not accessible`);
        }
      }
      
    } catch (error) {
      console.log(`  ❌ Monitoring validation failed: ${error.message}`);
      this.warnings.push(`Monitoring validation: ${error.message}`);
    }
    
    console.log('');
  }

  /**
   * Make HTTP request
   */
  makeRequest(path, headers = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL(path, this.baseUrl);
      const isHttps = url.protocol === 'https:';
      const client = isHttps ? https : http;
      
      const requestOptions = {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method: options.method || 'GET',
        headers: {
          'User-Agent': 'SyncScript-Deployment-Validator/1.0',
          ...headers
        },
        timeout: 10000
      };

      const req = client.request(requestOptions, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data
          });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      if (options.body) {
        req.write(options.body);
      }

      req.end();
    });
  }

  /**
   * Generate validation report
   */
  generateValidationReport() {
    const report = {
      validationId: this.generateValidationId(),
      timestamp: new Date().toISOString(),
      targetUrl: this.baseUrl,
      status: this.errors.length === 0 ? 'PASSED' : 'FAILED',
      summary: {
        totalTests: this.successCount + this.errors.length + this.warnings.length,
        passedTests: this.successCount,
        failedTests: this.errors.length,
        warnings: this.warnings.length,
        successRate: ((this.successCount / (this.successCount + this.errors.length)) * 100).toFixed(1) + '%'
      },
      errors: this.errors,
      warnings: this.warnings,
      securityScore: this.calculateSecurityScore(),
      recommendations: this.generateRecommendations()
    };

    // Save report to file
    fs.writeFileSync('validation-report.json', JSON.stringify(report, null, 2));
    
    console.log('📊 Validation Report Generated');
    console.log('=============================');
    console.log(`Validation ID: ${report.validationId}`);
    console.log(`Status: ${report.status}`);
    console.log(`Success Rate: ${report.summary.successRate}`);
    console.log(`Security Score: ${report.securityScore}`);
    console.log(`Passed Tests: ${report.summary.passedTests}`);
    console.log(`Failed Tests: ${report.summary.failedTests}`);
    console.log(`Warnings: ${report.summary.warnings}`);
    
    if (report.errors.length > 0) {
      console.log('\n❌ Failed Tests:');
      report.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (report.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      report.warnings.forEach(warning => console.log(`  - ${warning}`));
    }
    
    console.log('\n🎯 Recommendations:');
    report.recommendations.forEach(rec => console.log(`  - ${rec}`));
  }

  /**
   * Calculate security score
   */
  calculateSecurityScore() {
    const totalPossiblePoints = 100;
    const errorPenalty = this.errors.length * 20; // 20 points per error
    const warningPenalty = this.warnings.length * 5; // 5 points per warning
    
    const score = Math.max(0, totalPossiblePoints - errorPenalty - warningPenalty);
    return `${score}/100`;
  }

  /**
   * Generate validation ID
   */
  generateValidationId() {
    return `VALIDATE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.errors.length === 0) {
      recommendations.push('All critical validations passed - deployment is secure');
      recommendations.push('Continue monitoring production metrics');
      recommendations.push('Schedule regular security assessments');
    } else {
      recommendations.push('Fix all failed validations before considering deployment secure');
      recommendations.push('Review security configurations');
      recommendations.push('Re-run validation after fixes');
    }

    if (this.warnings.length > 0) {
      recommendations.push('Address warnings to improve security posture');
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      recommendations.push('Deployment is production-ready with excellent security');
    }

    return recommendations;
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const validator = new DeploymentValidator();

  if (args.includes('--url')) {
    const urlIndex = args.indexOf('--url');
    if (urlIndex + 1 < args.length) {
      validator.baseUrl = args[urlIndex + 1];
    }
  }

  validator.validate()
    .then((success) => {
      console.log(`\n${success ? '✅' : '❌'} Validation ${success ? 'PASSED' : 'FAILED'}`);
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('💥 Validation failed:', error.message);
      process.exit(1);
    });
}

module.exports = DeploymentValidator;
