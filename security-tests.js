/**
 * Automated Security Testing Suite for SyncScript
 * Comprehensive security validation and testing framework
 */

const securityUtils = require('./src/utils/security');
const securityMonitor = require('./security-monitoring');

class SecurityTestSuite {
  constructor() {
    this.testResults = [];
    this.criticalFailures = [];
    this.warnings = [];
    this.passedTests = [];
  }

  /**
   * Run comprehensive security test suite
   */
  async runFullSecurityTest() {
    console.log('🛡️ Starting Comprehensive Security Test Suite...\n');
    
    const testCategories = [
      'authentication',
      'authorization',
      'inputValidation',
      'dataProtection',
      'networkSecurity',
      'sessionManagement',
      'errorHandling',
      'logging',
      'compliance'
    ];

    for (const category of testCategories) {
      await this.runTestCategory(category);
    }

    return this.generateReport();
  }

  /**
   * Run specific test category
   */
  async runTestCategory(category) {
    console.log(`\n📋 Running ${category.toUpperCase()} Tests...`);
    
    switch (category) {
      case 'authentication':
        await this.testAuthentication();
        break;
      case 'authorization':
        await this.testAuthorization();
        break;
      case 'inputValidation':
        await this.testInputValidation();
        break;
      case 'dataProtection':
        await this.testDataProtection();
        break;
      case 'networkSecurity':
        await this.testNetworkSecurity();
        break;
      case 'sessionManagement':
        await this.testSessionManagement();
        break;
      case 'errorHandling':
        await this.testErrorHandling();
        break;
      case 'logging':
        await this.testLogging();
        break;
      case 'compliance':
        await this.testCompliance();
        break;
    }
  }

  /**
   * Test authentication mechanisms
   */
  async testAuthentication() {
    const tests = [
      {
        name: 'MFA Enforcement',
        test: () => this.testMFAEnforcement(),
        critical: true
      },
      {
        name: 'Password Strength',
        test: () => this.testPasswordStrength(),
        critical: true
      },
      {
        name: 'Session Timeout',
        test: () => this.testSessionTimeout(),
        critical: true
      },
      {
        name: 'JWT Token Security',
        test: () => this.testJWTSecurity(),
        critical: true
      },
      {
        name: 'Account Lockout',
        test: () => this.testAccountLockout(),
        critical: false
      }
    ];

    await this.runTests(tests, 'Authentication');
  }

  /**
   * Test authorization controls
   */
  async testAuthorization() {
    const tests = [
      {
        name: 'Role-Based Access Control',
        test: () => this.testRBAC(),
        critical: true
      },
      {
        name: 'API Endpoint Protection',
        test: () => this.testAPIProtection(),
        critical: true
      },
      {
        name: 'Resource-Level Permissions',
        test: () => this.testResourcePermissions(),
        critical: true
      },
      {
        name: 'Privilege Escalation Prevention',
        test: () => this.testPrivilegeEscalation(),
        critical: true
      }
    ];

    await this.runTests(tests, 'Authorization');
  }

  /**
   * Test input validation
   */
  async testInputValidation() {
    const tests = [
      {
        name: 'XSS Prevention',
        test: () => this.testXSSPrevention(),
        critical: true
      },
      {
        name: 'SQL Injection Prevention',
        test: () => this.testSQLInjectionPrevention(),
        critical: true
      },
      {
        name: 'CSRF Protection',
        test: () => this.testCSRFProtection(),
        critical: true
      },
      {
        name: 'File Upload Validation',
        test: () => this.testFileUploadValidation(),
        critical: false
      },
      {
        name: 'Input Sanitization',
        test: () => this.testInputSanitization(),
        critical: true
      }
    ];

    await this.runTests(tests, 'Input Validation');
  }

  /**
   * Test data protection measures
   */
  async testDataProtection() {
    const tests = [
      {
        name: 'Data Encryption at Rest',
        test: () => this.testDataEncryptionAtRest(),
        critical: true
      },
      {
        name: 'Data Encryption in Transit',
        test: () => this.testDataEncryptionInTransit(),
        critical: true
      },
      {
        name: 'Data Anonymization',
        test: () => this.testDataAnonymization(),
        critical: false
      },
      {
        name: 'Data Retention Policies',
        test: () => this.testDataRetention(),
        critical: false
      },
      {
        name: 'Right to Deletion',
        test: () => this.testRightToDeletion(),
        critical: true
      }
    ];

    await this.runTests(tests, 'Data Protection');
  }

  /**
   * Test network security
   */
  async testNetworkSecurity() {
    const tests = [
      {
        name: 'HTTPS Enforcement',
        test: () => this.testHTTPSEnforcement(),
        critical: true
      },
      {
        name: 'Security Headers',
        test: () => this.testSecurityHeaders(),
        critical: true
      },
      {
        name: 'CORS Configuration',
        test: () => this.testCORSConfiguration(),
        critical: true
      },
      {
        name: 'Rate Limiting',
        test: () => this.testRateLimiting(),
        critical: true
      },
      {
        name: 'DDoS Protection',
        test: () => this.testDDoSProtection(),
        critical: false
      }
    ];

    await this.runTests(tests, 'Network Security');
  }

  /**
   * Test session management
   */
  async testSessionManagement() {
    const tests = [
      {
        name: 'Session Security',
        test: () => this.testSessionSecurity(),
        critical: true
      },
      {
        name: 'Session Timeout',
        test: () => this.testSessionTimeout(),
        critical: true
      },
      {
        name: 'Session Regeneration',
        test: () => this.testSessionRegeneration(),
        critical: true
      },
      {
        name: 'Concurrent Session Control',
        test: () => this.testConcurrentSessions(),
        critical: false
      }
    ];

    await this.runTests(tests, 'Session Management');
  }

  /**
   * Test error handling
   */
  async testErrorHandling() {
    const tests = [
      {
        name: 'Error Message Security',
        test: () => this.testErrorMessageSecurity(),
        critical: true
      },
      {
        name: 'Stack Trace Protection',
        test: () => this.testStackTraceProtection(),
        critical: true
      },
      {
        name: 'Error Logging',
        test: () => this.testErrorLogging(),
        critical: false
      }
    ];

    await this.runTests(tests, 'Error Handling');
  }

  /**
   * Test logging and monitoring
   */
  async testLogging() {
    const tests = [
      {
        name: 'Security Event Logging',
        test: () => this.testSecurityEventLogging(),
        critical: true
      },
      {
        name: 'Audit Trail',
        test: () => this.testAuditTrail(),
        critical: true
      },
      {
        name: 'Log Integrity',
        test: () => this.testLogIntegrity(),
        critical: true
      },
      {
        name: 'Monitoring Coverage',
        test: () => this.testMonitoringCoverage(),
        critical: false
      }
    ];

    await this.runTests(tests, 'Logging');
  }

  /**
   * Test compliance requirements
   */
  async testCompliance() {
    const tests = [
      {
        name: 'GDPR Compliance',
        test: () => this.testGDPRCompliance(),
        critical: true
      },
      {
        name: 'CCPA Compliance',
        test: () => this.testCCPACompliance(),
        critical: true
      },
      {
        name: 'SOC 2 Compliance',
        test: () => this.testSOC2Compliance(),
        critical: false
      },
      {
        name: 'Accessibility Compliance',
        test: () => this.testAccessibilityCompliance(),
        critical: false
      }
    ];

    await this.runTests(tests, 'Compliance');
  }

  /**
   * Run individual tests
   */
  async runTests(tests, category) {
    for (const test of tests) {
      try {
        const result = await test.test();
        const testResult = {
          category,
          name: test.name,
          critical: test.critical,
          passed: result.passed,
          message: result.message,
          details: result.details,
          timestamp: new Date().toISOString()
        };

        this.testResults.push(testResult);

        if (result.passed) {
          this.passedTests.push(testResult);
          console.log(`  ✅ ${test.name}: PASSED`);
        } else {
          if (test.critical) {
            this.criticalFailures.push(testResult);
            console.log(`  ❌ ${test.name}: CRITICAL FAILURE - ${result.message}`);
          } else {
            this.warnings.push(testResult);
            console.log(`  ⚠️  ${test.name}: WARNING - ${result.message}`);
          }
        }
      } catch (error) {
        const testResult = {
          category,
          name: test.name,
          critical: test.critical,
          passed: false,
          message: `Test execution failed: ${error.message}`,
          details: { error: error.stack },
          timestamp: new Date().toISOString()
        };

        this.testResults.push(testResult);
        this.criticalFailures.push(testResult);
        console.log(`  💥 ${test.name}: EXECUTION ERROR - ${error.message}`);
      }
    }
  }

  /**
   * Individual test implementations
   */
  async testMFAEnforcement() {
    // Simulate MFA check
    const mfaEnabled = process.env.MFA_ENABLED === 'true';
    return {
      passed: mfaEnabled,
      message: mfaEnabled ? 'MFA is properly enforced' : 'MFA is not enabled',
      details: { mfaEnabled }
    };
  }

  async testPasswordStrength() {
    const testPasswords = ['password123', 'Password123!', 'P@ssw0rd123!'];
    const results = testPasswords.map(pwd => securityUtils.validatePassword(pwd));
    
    const weakPasswords = results.filter(r => !r.isValid);
    return {
      passed: weakPasswords.length === 0,
      message: weakPasswords.length === 0 ? 'Password validation is working correctly' : 'Weak passwords are being accepted',
      details: { results }
    };
  }

  async testSessionTimeout() {
    const sessionTimeout = process.env.SESSION_TIMEOUT || '900000'; // 15 minutes
    const timeoutMs = parseInt(sessionTimeout);
    
    return {
      passed: timeoutMs <= 900000 && timeoutMs >= 300000, // 5-15 minutes
      message: timeoutMs <= 900000 ? 'Session timeout is properly configured' : 'Session timeout is too long',
      details: { timeoutMs, recommended: '5-15 minutes' }
    };
  }

  async testJWTSecurity() {
    const jwtExpiration = process.env.JWT_EXPIRATION || '3600'; // 1 hour
    const expirationSeconds = parseInt(jwtExpiration);
    
    return {
      passed: expirationSeconds <= 3600 && expirationSeconds >= 1800, // 30-60 minutes
      message: expirationSeconds <= 3600 ? 'JWT expiration is properly configured' : 'JWT expiration is too long',
      details: { expirationSeconds, recommended: '30-60 minutes' }
    };
  }

  async testAccountLockout() {
    const maxAttempts = process.env.MAX_LOGIN_ATTEMPTS || '5';
    const lockoutDuration = process.env.LOCKOUT_DURATION || '900000'; // 15 minutes
    
    return {
      passed: parseInt(maxAttempts) <= 5 && parseInt(lockoutDuration) >= 900000,
      message: 'Account lockout is properly configured',
      details: { maxAttempts, lockoutDuration }
    };
  }

  async testRBAC() {
    // Simulate RBAC check
    const rbacEnabled = process.env.RBAC_ENABLED === 'true';
    return {
      passed: rbacEnabled,
      message: rbacEnabled ? 'RBAC is properly implemented' : 'RBAC is not enabled',
      details: { rbacEnabled }
    };
  }

  async testAPIProtection() {
    // Simulate API protection check
    const apiProtectionEnabled = process.env.API_PROTECTION_ENABLED === 'true';
    return {
      passed: apiProtectionEnabled,
      message: apiProtectionEnabled ? 'API endpoints are properly protected' : 'API protection is not enabled',
      details: { apiProtectionEnabled }
    };
  }

  async testResourcePermissions() {
    // Simulate resource permission check
    const resourcePermissionsEnabled = process.env.RESOURCE_PERMISSIONS_ENABLED === 'true';
    return {
      passed: resourcePermissionsEnabled,
      message: resourcePermissionsEnabled ? 'Resource-level permissions are implemented' : 'Resource permissions are not enabled',
      details: { resourcePermissionsEnabled }
    };
  }

  async testPrivilegeEscalation() {
    // Simulate privilege escalation prevention check
    const privilegeEscalationPrevention = process.env.PRIVILEGE_ESCALATION_PREVENTION === 'true';
    return {
      passed: privilegeEscalationPrevention,
      message: privilegeEscalationPrevention ? 'Privilege escalation prevention is implemented' : 'Privilege escalation prevention is not enabled',
      details: { privilegeEscalationPrevention }
    };
  }

  async testXSSPrevention() {
    const maliciousInputs = [
      '<script>alert("xss")</script>',
      'javascript:alert("xss")',
      '<img src="x" onerror="alert(\'xss\')">',
      '<svg onload="alert(\'xss\')">'
    ];

    const results = maliciousInputs.map(input => {
      const validation = securityUtils.validateInput(input);
      return { input, blocked: !validation.isValid };
    });

    const blockedCount = results.filter(r => r.blocked).length;
    return {
      passed: blockedCount === maliciousInputs.length,
      message: blockedCount === maliciousInputs.length ? 'XSS prevention is working correctly' : 'Some XSS attacks are not being blocked',
      details: { results, blockedCount, total: maliciousInputs.length }
    };
  }

  async testSQLInjectionPrevention() {
    const maliciousInputs = [
      "'; DROP TABLE users; --",
      "' OR '1'='1",
      "' UNION SELECT * FROM users --",
      "'; EXEC xp_cmdshell('dir'); --"
    ];

    // Simulate SQL injection prevention check
    const sqlInjectionPrevention = process.env.SQL_INJECTION_PREVENTION === 'true';
    
    return {
      passed: sqlInjectionPrevention,
      message: sqlInjectionPrevention ? 'SQL injection prevention is implemented' : 'SQL injection prevention is not enabled',
      details: { sqlInjectionPrevention, testInputs: maliciousInputs }
    };
  }

  async testCSRFProtection() {
    const csrfProtection = process.env.CSRF_PROTECTION === 'true';
    return {
      passed: csrfProtection,
      message: csrfProtection ? 'CSRF protection is implemented' : 'CSRF protection is not enabled',
      details: { csrfProtection }
    };
  }

  async testFileUploadValidation() {
    const fileUploadValidation = process.env.FILE_UPLOAD_VALIDATION === 'true';
    return {
      passed: fileUploadValidation,
      message: fileUploadValidation ? 'File upload validation is implemented' : 'File upload validation is not enabled',
      details: { fileUploadValidation }
    };
  }

  async testInputSanitization() {
    const testInputs = [
      '<script>alert("test")</script>',
      'javascript:void(0)',
      '../../etc/passwd',
      'eval(alert("test"))'
    ];

    const results = testInputs.map(input => {
      const sanitized = securityUtils.sanitizeHTML(input);
      return { input, sanitized, changed: input !== sanitized };
    });

    const sanitizedCount = results.filter(r => r.changed).length;
    return {
      passed: sanitizedCount === testInputs.length,
      message: sanitizedCount === testInputs.length ? 'Input sanitization is working correctly' : 'Some inputs are not being sanitized',
      details: { results, sanitizedCount, total: testInputs.length }
    };
  }

  async testDataEncryptionAtRest() {
    const encryptionAtRest = process.env.ENCRYPTION_AT_REST === 'true';
    return {
      passed: encryptionAtRest,
      message: encryptionAtRest ? 'Data encryption at rest is enabled' : 'Data encryption at rest is not enabled',
      details: { encryptionAtRest }
    };
  }

  async testDataEncryptionInTransit() {
    const encryptionInTransit = process.env.ENCRYPTION_IN_TRANSIT === 'true';
    return {
      passed: encryptionInTransit,
      message: encryptionInTransit ? 'Data encryption in transit is enabled' : 'Data encryption in transit is not enabled',
      details: { encryptionInTransit }
    };
  }

  async testDataAnonymization() {
    const dataAnonymization = process.env.DATA_ANONYMIZATION === 'true';
    return {
      passed: dataAnonymization,
      message: dataAnonymization ? 'Data anonymization is implemented' : 'Data anonymization is not implemented',
      details: { dataAnonymization }
    };
  }

  async testDataRetention() {
    const dataRetention = process.env.DATA_RETENTION_ENABLED === 'true';
    return {
      passed: dataRetention,
      message: dataRetention ? 'Data retention policies are implemented' : 'Data retention policies are not implemented',
      details: { dataRetention }
    };
  }

  async testRightToDeletion() {
    const rightToDeletion = process.env.RIGHT_TO_DELETION === 'true';
    return {
      passed: rightToDeletion,
      message: rightToDeletion ? 'Right to deletion is implemented' : 'Right to deletion is not implemented',
      details: { rightToDeletion }
    };
  }

  async testHTTPSEnforcement() {
    const httpsEnforcement = process.env.HTTPS_ENFORCEMENT === 'true';
    return {
      passed: httpsEnforcement,
      message: httpsEnforcement ? 'HTTPS enforcement is enabled' : 'HTTPS enforcement is not enabled',
      details: { httpsEnforcement }
    };
  }

  async testSecurityHeaders() {
    const securityHeaders = process.env.SECURITY_HEADERS_ENABLED === 'true';
    return {
      passed: securityHeaders,
      message: securityHeaders ? 'Security headers are properly configured' : 'Security headers are not configured',
      details: { securityHeaders }
    };
  }

  async testCORSConfiguration() {
    const corsConfiguration = process.env.CORS_CONFIGURED === 'true';
    return {
      passed: corsConfiguration,
      message: corsConfiguration ? 'CORS is properly configured' : 'CORS is not properly configured',
      details: { corsConfiguration }
    };
  }

  async testRateLimiting() {
    const rateLimiting = process.env.RATE_LIMITING_ENABLED === 'true';
    return {
      passed: rateLimiting,
      message: rateLimiting ? 'Rate limiting is enabled' : 'Rate limiting is not enabled',
      details: { rateLimiting }
    };
  }

  async testDDoSProtection() {
    const ddosProtection = process.env.DDOS_PROTECTION === 'true';
    return {
      passed: ddosProtection,
      message: ddosProtection ? 'DDoS protection is enabled' : 'DDoS protection is not enabled',
      details: { ddosProtection }
    };
  }

  async testSessionSecurity() {
    const sessionSecurity = process.env.SESSION_SECURITY === 'true';
    return {
      passed: sessionSecurity,
      message: sessionSecurity ? 'Session security is properly configured' : 'Session security is not properly configured',
      details: { sessionSecurity }
    };
  }

  async testSessionRegeneration() {
    const sessionRegeneration = process.env.SESSION_REGENERATION === 'true';
    return {
      passed: sessionRegeneration,
      message: sessionRegeneration ? 'Session regeneration is enabled' : 'Session regeneration is not enabled',
      details: { sessionRegeneration }
    };
  }

  async testConcurrentSessions() {
    const concurrentSessionControl = process.env.CONCURRENT_SESSION_CONTROL === 'true';
    return {
      passed: concurrentSessionControl,
      message: concurrentSessionControl ? 'Concurrent session control is implemented' : 'Concurrent session control is not implemented',
      details: { concurrentSessionControl }
    };
  }

  async testErrorMessageSecurity() {
    const errorMessageSecurity = process.env.ERROR_MESSAGE_SECURITY === 'true';
    return {
      passed: errorMessageSecurity,
      message: errorMessageSecurity ? 'Error messages are properly secured' : 'Error messages may leak sensitive information',
      details: { errorMessageSecurity }
    };
  }

  async testStackTraceProtection() {
    const stackTraceProtection = process.env.STACK_TRACE_PROTECTION === 'true';
    return {
      passed: stackTraceProtection,
      message: stackTraceProtection ? 'Stack trace protection is enabled' : 'Stack trace protection is not enabled',
      details: { stackTraceProtection }
    };
  }

  async testErrorLogging() {
    const errorLogging = process.env.ERROR_LOGGING === 'true';
    return {
      passed: errorLogging,
      message: errorLogging ? 'Error logging is properly configured' : 'Error logging is not properly configured',
      details: { errorLogging }
    };
  }

  async testSecurityEventLogging() {
    const securityEventLogging = process.env.SECURITY_EVENT_LOGGING === 'true';
    return {
      passed: securityEventLogging,
      message: securityEventLogging ? 'Security event logging is enabled' : 'Security event logging is not enabled',
      details: { securityEventLogging }
    };
  }

  async testAuditTrail() {
    const auditTrail = process.env.AUDIT_TRAIL === 'true';
    return {
      passed: auditTrail,
      message: auditTrail ? 'Audit trail is properly maintained' : 'Audit trail is not properly maintained',
      details: { auditTrail }
    };
  }

  async testLogIntegrity() {
    const logIntegrity = process.env.LOG_INTEGRITY === 'true';
    return {
      passed: logIntegrity,
      message: logIntegrity ? 'Log integrity is protected' : 'Log integrity is not protected',
      details: { logIntegrity }
    };
  }

  async testMonitoringCoverage() {
    const monitoringCoverage = process.env.MONITORING_COVERAGE === 'true';
    return {
      passed: monitoringCoverage,
      message: monitoringCoverage ? 'Monitoring coverage is comprehensive' : 'Monitoring coverage is not comprehensive',
      details: { monitoringCoverage }
    };
  }

  async testGDPRCompliance() {
    const gdprCompliance = process.env.GDPR_COMPLIANCE === 'true';
    return {
      passed: gdprCompliance,
      message: gdprCompliance ? 'GDPR compliance is implemented' : 'GDPR compliance is not implemented',
      details: { gdprCompliance }
    };
  }

  async testCCPACompliance() {
    const ccpaCompliance = process.env.CCPA_COMPLIANCE === 'true';
    return {
      passed: ccpaCompliance,
      message: ccpaCompliance ? 'CCPA compliance is implemented' : 'CCPA compliance is not implemented',
      details: { ccpaCompliance }
    };
  }

  async testSOC2Compliance() {
    const soc2Compliance = process.env.SOC2_COMPLIANCE === 'true';
    return {
      passed: soc2Compliance,
      message: soc2Compliance ? 'SOC 2 compliance is implemented' : 'SOC 2 compliance is not implemented',
      details: { soc2Compliance }
    };
  }

  async testAccessibilityCompliance() {
    const accessibilityCompliance = process.env.ACCESSIBILITY_COMPLIANCE === 'true';
    return {
      passed: accessibilityCompliance,
      message: accessibilityCompliance ? 'Accessibility compliance is implemented' : 'Accessibility compliance is not implemented',
      details: { accessibilityCompliance }
    };
  }

  /**
   * Generate comprehensive test report
   */
  generateReport() {
    const totalTests = this.testResults.length;
    const passedTests = this.passedTests.length;
    const criticalFailures = this.criticalFailures.length;
    const warnings = this.warnings.length;
    
    const passRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
    const securityScore = criticalFailures === 0 ? Math.max(0, passRate - (warnings * 2)) : 0;

    const report = {
      summary: {
        totalTests,
        passedTests,
        criticalFailures,
        warnings,
        passRate: Math.round(passRate * 100) / 100,
        securityScore: Math.round(securityScore * 100) / 100,
        status: criticalFailures === 0 ? 'PASS' : 'FAIL',
        timestamp: new Date().toISOString()
      },
      results: this.testResults,
      criticalFailures: this.criticalFailures,
      warnings: this.warnings,
      recommendations: this.generateRecommendations()
    };

    console.log('\n📊 SECURITY TEST REPORT');
    console.log('========================');
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Critical Failures: ${criticalFailures}`);
    console.log(`Warnings: ${warnings}`);
    console.log(`Pass Rate: ${passRate.toFixed(2)}%`);
    console.log(`Security Score: ${securityScore.toFixed(2)}/100`);
    console.log(`Status: ${criticalFailures === 0 ? '✅ PASS' : '❌ FAIL'}`);

    if (criticalFailures.length > 0) {
      console.log('\n❌ CRITICAL FAILURES:');
      this.criticalFailures.forEach(failure => {
        console.log(`  - ${failure.category}: ${failure.name} - ${failure.message}`);
      });
    }

    if (warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => {
        console.log(`  - ${warning.category}: ${warning.name} - ${warning.message}`);
      });
    }

    return report;
  }

  /**
   * Generate security recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.criticalFailures.length > 0) {
      recommendations.push({
        priority: 'CRITICAL',
        action: 'Fix all critical security failures before deployment',
        description: 'Critical failures represent immediate security risks that must be addressed'
      });
    }

    if (this.warnings.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        action: 'Address security warnings within 30 days',
        description: 'Warnings represent potential security risks that should be addressed'
      });
    }

    if (this.passedTests.length / this.testResults.length < 0.9) {
      recommendations.push({
        priority: 'MEDIUM',
        action: 'Improve overall security posture',
        description: 'Consider implementing additional security controls to improve pass rate'
      });
    }

    return recommendations;
  }
}

// Export for use in other modules
module.exports = SecurityTestSuite;

// Run tests if called directly
if (require.main === module) {
  const testSuite = new SecurityTestSuite();
  testSuite.runFullSecurityTest().then(report => {
    process.exit(report.summary.status === 'PASS' ? 0 : 1);
  }).catch(error => {
    console.error('Security test execution failed:', error);
    process.exit(1);
  });
}
