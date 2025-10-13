/**
 * Frontend Security Utilities for SyncScript
 * Implements client-side security controls and validation
 */

class SecurityUtils {
  constructor() {
    this.allowedDomains = [
      'syncscript.vercel.app',
      'www.syncscript.com',
      'localhost:3000',
      'localhost:3001',
      'localhost:3002'
    ];
  }

  /**
   * Sanitize HTML content to prevent XSS
   */
  sanitizeHTML(input) {
    if (typeof input !== 'string') return input;
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  /**
   * Validate email format
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const checks = {
      length: password.length >= minLength,
      upperCase: hasUpperCase,
      lowerCase: hasLowerCase,
      numbers: hasNumbers,
      specialChar: hasSpecialChar
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    const strength = score < 3 ? 'weak' : score < 5 ? 'medium' : 'strong';
    
    return {
      isValid: score >= 4,
      strength,
      checks,
      score
    };
  }

  /**
   * Validate input against malicious patterns
   */
  validateInput(input) {
    if (typeof input !== 'string') return { isValid: true, sanitized: input };
    
    const maliciousPatterns = [
      /<script/i,
      /javascript:/i,
      /onload=/i,
      /onerror=/i,
      /union.*select/i,
      /\.\.\//,
      /eval\(/i,
      /exec\(/i,
      /system\(/i
    ];
    
    for (const pattern of maliciousPatterns) {
      if (pattern.test(input)) {
        return {
          isValid: false,
          sanitized: this.sanitizeHTML(input),
          reason: 'Malicious pattern detected'
        };
      }
    }
    
    return {
      isValid: true,
      sanitized: this.sanitizeHTML(input)
    };
  }

  /**
   * Generate secure random token
   */
  generateSecureToken(length = 32) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Hash sensitive data (client-side)
   */
  async hashData(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Validate file upload
   */
  validateFileUpload(file, options = {}) {
    const {
      maxSize = 10 * 1024 * 1024, // 10MB default
      allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    } = options;
    
    const errors = [];
    
    // Check file size
    if (file.size > maxSize) {
      errors.push(`File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`);
    }
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not allowed`);
    }
    
    // Check file extension
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      errors.push(`File extension ${extension} is not allowed`);
    }
    
    // Check for malicious file names
    if (/[<>:"/\\|?*]/.test(file.name)) {
      errors.push('File name contains invalid characters');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      sanitizedName: file.name.replace(/[<>:"/\\|?*]/g, '_')
    };
  }

  /**
   * Secure local storage operations
   */
  secureStorage = {
    setItem(key, value) {
      try {
        const sanitizedKey = this.sanitizeHTML(key);
        const sanitizedValue = this.sanitizeHTML(JSON.stringify(value));
        localStorage.setItem(sanitizedKey, sanitizedValue);
        return true;
      } catch (error) {
        console.error('Failed to set secure storage item:', error);
        return false;
      }
    },
    
    getItem(key) {
      try {
        const sanitizedKey = this.sanitizeHTML(key);
        const item = localStorage.getItem(sanitizedKey);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Failed to get secure storage item:', error);
        return null;
      }
    },
    
    removeItem(key) {
      try {
        const sanitizedKey = this.sanitizeHTML(key);
        localStorage.removeItem(sanitizedKey);
        return true;
      } catch (error) {
        console.error('Failed to remove secure storage item:', error);
        return false;
      }
    },
    
    clear() {
      try {
        localStorage.clear();
        return true;
      } catch (error) {
        console.error('Failed to clear secure storage:', error);
        return false;
      }
    }
  };

  /**
   * Validate URL to prevent open redirects
   */
  validateURL(url) {
    try {
      const urlObj = new URL(url);
      
      // Check if URL is from allowed domains
      if (!this.allowedDomains.includes(urlObj.hostname)) {
        return {
          isValid: false,
          reason: 'URL not from allowed domain'
        };
      }
      
      // Check for suspicious protocols
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return {
          isValid: false,
          reason: 'Invalid protocol'
        };
      }
      
      return {
        isValid: true,
        url: urlObj.toString()
      };
    } catch (error) {
      return {
        isValid: false,
        reason: 'Invalid URL format'
      };
    }
  }

  /**
   * Create secure API request
   */
  async secureRequest(url, options = {}) {
    const {
      method = 'GET',
      headers = {},
      body = null,
      timeout = 30000
    } = options;
    
    // Validate URL
    const urlValidation = this.validateURL(url);
    if (!urlValidation.isValid) {
      throw new Error(`Invalid URL: ${urlValidation.reason}`);
    }
    
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(urlValidation.url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...headers
        },
        body: body ? JSON.stringify(body) : null,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Detect and prevent clickjacking
   */
  preventClickjacking() {
    // Check if page is in iframe
    if (window.self !== window.top) {
      // Redirect to top-level window
      window.top.location = window.self.location;
      return false;
    }
    return true;
  }

  /**
   * Generate CSRF token
   */
  generateCSRFToken() {
    return this.generateSecureToken(32);
  }

  /**
   * Validate CSRF token
   */
  validateCSRFToken(token, storedToken) {
    return token && storedToken && token === storedToken;
  }

  /**
   * Secure cookie operations
   */
  secureCookies = {
    set(name, value, options = {}) {
      const {
        expires = 7, // days
        secure = true,
        httpOnly = false,
        sameSite = 'strict'
      } = options;
      
      const date = new Date();
      date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
      
      const cookieString = [
        `${name}=${encodeURIComponent(value)}`,
        `expires=${date.toUTCString()}`,
        `path=/`,
        secure ? 'secure' : '',
        httpOnly ? 'httpOnly' : '',
        `sameSite=${sameSite}`
      ].filter(Boolean).join('; ');
      
      document.cookie = cookieString;
    },
    
    get(name) {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
      return null;
    },
    
    remove(name) {
      this.set(name, '', { expires: -1 });
    }
  };

  /**
   * Initialize security measures
   */
  initialize() {
    // Prevent clickjacking
    this.preventClickjacking();
    
    // Set up CSP violation reporting
    document.addEventListener('securitypolicyviolation', (e) => {
      console.warn('CSP Violation:', e);
      // In production, send to security monitoring
    });
    
    // Set up error boundary for security
    window.addEventListener('error', (e) => {
      console.error('Security Error:', e);
      // In production, send to security monitoring
    });
    
    // Set up unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled Promise Rejection:', e);
      // In production, send to security monitoring
    });
  }
}

// Create singleton instance
const securityUtils = new SecurityUtils();

// Initialize security measures
if (typeof window !== 'undefined') {
  securityUtils.initialize();
}

export default securityUtils;
