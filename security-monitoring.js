/**
 * Security Monitoring & Logging for SyncScript
 * Implements comprehensive security event logging and monitoring
 */

class SecurityMonitor {
  constructor() {
    this.logLevels = {
      INFO: 'info',
      WARN: 'warn',
      ERROR: 'error',
      CRITICAL: 'critical'
    };
  }

  /**
   * Log security events with structured data
   */
  logSecurityEvent(eventType, details, severity = 'info') {
    const logEntry = {
      timestamp: new Date().toISOString(),
      eventType,
      severity: severity.toUpperCase(),
      details,
      source: 'syncscript-security-monitor',
      version: process.env.APP_VERSION || '1.0.0'
    };

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[SECURITY ${logEntry.severity}] ${eventType}:`, details);
    }

    // In production, this would send to a SIEM system
    this.sendToSIEM(logEntry);
  }

  /**
   * Log authentication events
   */
  logAuthEvent(event, userId, details = {}) {
    this.logSecurityEvent('AUTHENTICATION', {
      event,
      userId,
      ip: details.ip,
      userAgent: details.userAgent,
      success: details.success,
      failureReason: details.failureReason,
      timestamp: new Date().toISOString()
    }, details.success ? 'info' : 'warn');
  }

  /**
   * Log authorization failures
   */
  logAuthzFailure(userId, resource, action, details = {}) {
    this.logSecurityEvent('AUTHORIZATION_FAILURE', {
      userId,
      resource,
      action,
      ip: details.ip,
      userAgent: details.userAgent,
      reason: details.reason
    }, 'warn');
  }

  /**
   * Log suspicious activity
   */
  logSuspiciousActivity(activityType, details) {
    this.logSecurityEvent('SUSPICIOUS_ACTIVITY', {
      activityType,
      ...details
    }, 'error');
  }

  /**
   * Log API security events
   */
  logAPIEvent(endpoint, method, statusCode, details = {}) {
    const severity = statusCode >= 400 ? 'warn' : 'info';
    
    this.logSecurityEvent('API_ACCESS', {
      endpoint,
      method,
      statusCode,
      ip: details.ip,
      userAgent: details.userAgent,
      userId: details.userId,
      responseTime: details.responseTime,
      timestamp: new Date().toISOString()
    }, severity);
  }

  /**
   * Log data access events
   */
  logDataAccess(userId, dataType, action, details = {}) {
    this.logSecurityEvent('DATA_ACCESS', {
      userId,
      dataType,
      action,
      ip: details.ip,
      userAgent: details.userAgent,
      recordCount: details.recordCount,
      timestamp: new Date().toISOString()
    }, 'info');
  }

  /**
   * Log configuration changes
   */
  logConfigChange(userId, configType, change, details = {}) {
    this.logSecurityEvent('CONFIG_CHANGE', {
      userId,
      configType,
      change,
      ip: details.ip,
      userAgent: details.userAgent,
      previousValue: details.previousValue,
      newValue: details.newValue,
      timestamp: new Date().toISOString()
    }, 'warn');
  }

  /**
   * Log admin actions
   */
  logAdminAction(userId, action, details = {}) {
    this.logSecurityEvent('ADMIN_ACTION', {
      userId,
      action,
      ip: details.ip,
      userAgent: details.userAgent,
      targetUserId: details.targetUserId,
      timestamp: new Date().toISOString()
    }, 'info');
  }

  /**
   * Send logs to SIEM system (placeholder for production implementation)
   */
  sendToSIEM(logEntry) {
    // In production, this would integrate with:
    // - Splunk
    // - ELK Stack
    // - AWS Security Hub
    // - Azure Sentinel
    // - Google Cloud Security Command Center
    
    if (process.env.SIEM_ENDPOINT) {
      // Example implementation for Splunk
      fetch(process.env.SIEM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SIEM_TOKEN}`
        },
        body: JSON.stringify(logEntry)
      }).catch(error => {
        console.error('Failed to send security log to SIEM:', error);
      });
    }
  }

  /**
   * Detect and log potential attacks
   */
  detectAttack(ip, userAgent, endpoint, details = {}) {
    const attackIndicators = [
      'sql injection',
      'xss',
      'csrf',
      'path traversal',
      'command injection',
      'ldap injection',
      'no-sql injection'
    ];

    const suspiciousPatterns = [
      /union.*select/i,
      /script.*alert/i,
      /\.\.\//,
      /<script/i,
      /javascript:/i,
      /onload=/i,
      /onerror=/i
    ];

    const isAttack = attackIndicators.some(indicator => 
      endpoint.toLowerCase().includes(indicator) ||
      userAgent.toLowerCase().includes(indicator)
    ) || suspiciousPatterns.some(pattern => 
      pattern.test(endpoint) || pattern.test(userAgent)
    );

    if (isAttack) {
      this.logSecurityEvent('POTENTIAL_ATTACK', {
        ip,
        userAgent,
        endpoint,
        attackType: 'suspicious_pattern_detected',
        ...details
      }, 'critical');
    }

    return isAttack;
  }

  /**
   * Rate limiting violation handler
   */
  handleRateLimitViolation(ip, endpoint, details = {}) {
    this.logSecurityEvent('RATE_LIMIT_VIOLATION', {
      ip,
      endpoint,
      userAgent: details.userAgent,
      attempts: details.attempts,
      windowMs: details.windowMs,
      timestamp: new Date().toISOString()
    }, 'warn');

    // Check for potential DDoS
    if (details.attempts > 100) {
      this.logSecurityEvent('POTENTIAL_DDOS', {
        ip,
        endpoint,
        attempts: details.attempts,
        timestamp: new Date().toISOString()
      }, 'critical');
    }
  }

  /**
   * Log security policy violations
   */
  logPolicyViolation(policyType, userId, details = {}) {
    this.logSecurityEvent('POLICY_VIOLATION', {
      policyType,
      userId,
      ip: details.ip,
      userAgent: details.userAgent,
      violation: details.violation,
      timestamp: new Date().toISOString()
    }, 'error');
  }
}

// Create singleton instance
const securityMonitor = new SecurityMonitor();

module.exports = securityMonitor;
