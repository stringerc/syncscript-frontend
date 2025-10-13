/**
 * Security Middleware for SyncScript API Routes
 * Implements comprehensive security controls for all API endpoints
 */

const securityMonitor = require('../security-monitoring');

// Input validation middleware
const validateInput = (req, res, next) => {
  try {
    // Check for malicious patterns in request body
    const body = JSON.stringify(req.body || {});
    const query = JSON.stringify(req.query || {});
    const params = JSON.stringify(req.params || {});
    
    const maliciousPatterns = [
      /<script/i,
      /javascript:/i,
      /onload=/i,
      /onerror=/i,
      /union.*select/i,
      /\.\.\//,
      /eval\(/i,
      /exec\(/i,
      /system\(/i,
      /shell_exec\(/i
    ];

    const allInput = `${body}${query}${params}`;
    
    for (const pattern of maliciousPatterns) {
      if (pattern.test(allInput)) {
        securityMonitor.logSuspiciousActivity('MALICIOUS_INPUT_DETECTED', {
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          endpoint: req.path,
          method: req.method,
          pattern: pattern.toString(),
          input: allInput.substring(0, 500) // Log first 500 chars
        });
        
        return res.status(400).json({
          error: 'Invalid input detected',
          message: 'Request contains potentially malicious content'
        });
      }
    }
    
    next();
  } catch (error) {
    securityMonitor.logSecurityEvent('INPUT_VALIDATION_ERROR', {
      error: error.message,
      ip: req.ip,
      endpoint: req.path
    }, 'error');
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Input validation failed'
    });
  }
};

// Request size limiting middleware
const limitRequestSize = (maxSize = '1mb') => {
  return (req, res, next) => {
    const contentLength = parseInt(req.get('content-length') || '0');
    const maxBytes = parseSize(maxSize);
    
    if (contentLength > maxBytes) {
      securityMonitor.logSecurityEvent('REQUEST_SIZE_EXCEEDED', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        endpoint: req.path,
        contentLength,
        maxBytes
      }, 'warn');
      
      return res.status(413).json({
        error: 'Request too large',
        message: `Request size exceeds maximum allowed size of ${maxSize}`
      });
    }
    
    next();
  };
};

// Parse size string to bytes
function parseSize(size) {
  const units = {
    'b': 1,
    'kb': 1024,
    'mb': 1024 * 1024,
    'gb': 1024 * 1024 * 1024
  };
  
  const match = size.match(/^(\d+(?:\.\d+)?)\s*([a-z]+)$/i);
  if (!match) return 1024 * 1024; // Default 1MB
  
  const [, value, unit] = match;
  return parseFloat(value) * (units[unit.toLowerCase()] || 1);
}

// Authentication middleware
const requireAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      securityMonitor.logAuthEvent('AUTH_TOKEN_MISSING', null, {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        failureReason: 'No authorization token provided'
      });
      
      return res.status(401).json({
        error: 'Authentication required',
        message: 'No authorization token provided'
      });
    }
    
    // Here you would validate the JWT token with Auth0
    // For now, we'll just log the attempt
    securityMonitor.logAuthEvent('TOKEN_VALIDATION_ATTEMPT', null, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      success: true
    });
    
    next();
  } catch (error) {
    securityMonitor.logSecurityEvent('AUTH_MIDDLEWARE_ERROR', {
      error: error.message,
      ip: req.ip,
      endpoint: req.path
    }, 'error');
    
    return res.status(500).json({
      error: 'Authentication error',
      message: 'Failed to process authentication'
    });
  }
};

// Authorization middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    try {
      // Extract user role from token (this would be done after JWT validation)
      const userRole = req.user?.role || 'user';
      
      if (!roles.includes(userRole)) {
        securityMonitor.logAuthzFailure(req.user?.id, req.path, req.method, {
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          reason: `Insufficient permissions. Required: ${roles.join(', ')}, User has: ${userRole}`
        });
        
        return res.status(403).json({
          error: 'Insufficient permissions',
          message: `Access denied. Required roles: ${roles.join(', ')}`
        });
      }
      
      next();
    } catch (error) {
      securityMonitor.logSecurityEvent('AUTHZ_MIDDLEWARE_ERROR', {
        error: error.message,
        ip: req.ip,
        endpoint: req.path
      }, 'error');
      
      return res.status(500).json({
        error: 'Authorization error',
        message: 'Failed to process authorization'
      });
    }
  };
};

// API key validation middleware
const validateAPIKey = (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      securityMonitor.logSecurityEvent('API_KEY_MISSING', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        endpoint: req.path
      }, 'warn');
      
      return res.status(401).json({
        error: 'API key required',
        message: 'X-API-Key header is required for this endpoint'
      });
    }
    
    // Validate API key (in production, this would check against a database)
    const validKeys = process.env.VALID_API_KEYS?.split(',') || [];
    
    if (!validKeys.includes(apiKey)) {
      securityMonitor.logSecurityEvent('INVALID_API_KEY', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        endpoint: req.path,
        apiKey: apiKey.substring(0, 8) + '...' // Log partial key for debugging
      }, 'warn');
      
      return res.status(401).json({
        error: 'Invalid API key',
        message: 'The provided API key is not valid'
      });
    }
    
    next();
  } catch (error) {
    securityMonitor.logSecurityEvent('API_KEY_VALIDATION_ERROR', {
      error: error.message,
      ip: req.ip,
      endpoint: req.path
    }, 'error');
    
    return res.status(500).json({
      error: 'API key validation error',
      message: 'Failed to validate API key'
    });
  }
};

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://syncscript.vercel.app',
      'https://www.syncscript.com',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      securityMonitor.logSecurityEvent('CORS_VIOLATION', {
        origin,
        ip: req?.ip,
        userAgent: req?.get('User-Agent')
      }, 'warn');
      
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  maxAge: 86400 // 24 hours
};

// Request logging middleware
const logRequest = (req, res, next) => {
  const startTime = Date.now();
  
  // Log the request
  securityMonitor.logAPIEvent(req.path, req.method, null, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user?.id,
    timestamp: new Date().toISOString()
  });
  
  // Override res.end to log response
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const responseTime = Date.now() - startTime;
    
    securityMonitor.logAPIEvent(req.path, req.method, res.statusCode, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      userId: req.user?.id,
      responseTime,
      timestamp: new Date().toISOString()
    });
    
    originalEnd.call(this, chunk, encoding);
  };
  
  next();
};

// Error handling middleware
const handleErrors = (err, req, res, next) => {
  // Log the error
  securityMonitor.logSecurityEvent('API_ERROR', {
    error: err.message,
    stack: err.stack,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    endpoint: req.path,
    method: req.method
  }, 'error');
  
  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    });
  } else {
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
};

module.exports = {
  validateInput,
  limitRequestSize,
  requireAuth,
  requireRole,
  validateAPIKey,
  corsOptions,
  logRequest,
  handleErrors
};
