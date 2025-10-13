/**
 * Rate Limiting Middleware for SyncScript
 * Implements comprehensive rate limiting for API endpoints
 */

const rateLimit = require('express-rate-limit');

// General API rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'Too many requests from this IP, please try again later.',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000)
    });
  }
});

// Authentication endpoints rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth attempts per windowMs
  message: {
    error: 'Too many authentication attempts from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
  handler: (req, res) => {
    // Log suspicious activity
    console.warn(`Rate limit exceeded for auth endpoint from IP: ${req.ip}`, {
      userAgent: req.get('User-Agent'),
      endpoint: req.path,
      timestamp: new Date().toISOString()
    });
    
    res.status(429).json({
      error: 'Authentication rate limit exceeded',
      message: 'Too many authentication attempts from this IP, please try again later.',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000)
    });
  }
});

// API endpoints rate limiting (more restrictive)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 API requests per windowMs
  message: {
    error: 'Too many API requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'API rate limit exceeded',
      message: 'Too many API requests from this IP, please try again later.',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000)
    });
  }
});

// File upload rate limiting
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 uploads per hour
  message: {
    error: 'Too many file uploads from this IP, please try again later.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Upload rate limit exceeded',
      message: 'Too many file uploads from this IP, please try again later.',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000)
    });
  }
});

// Password reset rate limiting (very restrictive)
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 password reset attempts per hour
  message: {
    error: 'Too many password reset attempts from this IP, please try again later.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    // Log potential attack
    console.error(`Password reset rate limit exceeded from IP: ${req.ip}`, {
      userAgent: req.get('User-Agent'),
      endpoint: req.path,
      timestamp: new Date().toISOString(),
      severity: 'HIGH'
    });
    
    res.status(429).json({
      error: 'Password reset rate limit exceeded',
      message: 'Too many password reset attempts from this IP, please try again later.',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000)
    });
  }
});

module.exports = {
  generalLimiter,
  authLimiter,
  apiLimiter,
  uploadLimiter,
  passwordResetLimiter
};
