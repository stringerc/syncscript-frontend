/**
 * Actionable Error Messages (M4)
 * Convert generic errors into specific, helpful messages with actions
 */

export interface ErrorDetails {
  code: string
  message: string
  userMessage: string
  action?: {
    label: string
    onClick: () => void
  }
  documentation?: string
}

// Error code to user-friendly message mapping
const ERROR_MESSAGES: Record<string, ErrorDetails> = {
  'NETWORK_ERROR': {
    code: 'NETWORK_ERROR',
    message: 'Network request failed',
    userMessage: 'Unable to connect to the server. Please check your internet connection and try again.',
    action: {
      label: 'Retry',
      onClick: () => window.location.reload()
    }
  },
  'AUTH_REQUIRED': {
    code: 'AUTH_REQUIRED',
    message: 'Authentication required',
    userMessage: 'Your session has expired. Please sign in again to continue.',
    action: {
      label: 'Sign In',
      onClick: () => window.location.href = '/api/auth/login'
    }
  },
  'PERMISSION_DENIED': {
    code: 'PERMISSION_DENIED',
    message: 'Permission denied',
    userMessage: 'You don\'t have permission to perform this action. Contact your team admin for access.',
    documentation: '/docs/permissions'
  },
  'VALIDATION_ERROR': {
    code: 'VALIDATION_ERROR',
    message: 'Validation failed',
    userMessage: 'Please check your input and fix the highlighted errors.',
  },
  'NOT_FOUND': {
    code: 'NOT_FOUND',
    message: 'Resource not found',
    userMessage: 'The item you\'re looking for doesn\'t exist or has been deleted.',
    action: {
      label: 'Go to Dashboard',
      onClick: () => window.location.href = '/dashboard'
    }
  },
  'RATE_LIMIT': {
    code: 'RATE_LIMIT',
    message: 'Rate limit exceeded',
    userMessage: 'You\'ve made too many requests. Please wait a moment and try again.',
  },
  'SERVER_ERROR': {
    code: 'SERVER_ERROR',
    message: 'Internal server error',
    userMessage: 'Something went wrong on our end. Our team has been notified. Please try again later.',
    action: {
      label: 'Contact Support',
      onClick: () => window.location.href = '/support'
    }
  },
  'TIMEOUT': {
    code: 'TIMEOUT',
    message: 'Request timeout',
    userMessage: 'The request took too long. This might be due to a slow connection. Please try again.',
    action: {
      label: 'Retry',
      onClick: () => window.location.reload()
    }
  }
}

export function getErrorMessage(error: Error | string | unknown): ErrorDetails {
  if (typeof error === 'string') {
    // Check if it matches a known error code
    const errorDetails = ERROR_MESSAGES[error]
    if (errorDetails) return errorDetails

    // Generic string error
    return {
      code: 'UNKNOWN',
      message: error,
      userMessage: error
    }
  }

  if (error instanceof Error) {
    // Try to match error message to known patterns
    const message = error.message.toUpperCase()
    
    if (message.includes('NETWORK') || message.includes('FETCH')) {
      return ERROR_MESSAGES['NETWORK_ERROR']
    }
    if (message.includes('AUTH') || message.includes('UNAUTHORIZED')) {
      return ERROR_MESSAGES['AUTH_REQUIRED']
    }
    if (message.includes('PERMISSION') || message.includes('FORBIDDEN')) {
      return ERROR_MESSAGES['PERMISSION_DENIED']
    }
    if (message.includes('NOT FOUND') || message.includes('404')) {
      return ERROR_MESSAGES['NOT_FOUND']
    }
    if (message.includes('TIMEOUT')) {
      return ERROR_MESSAGES['TIMEOUT']
    }
    if (message.includes('500') || message.includes('SERVER')) {
      return ERROR_MESSAGES['SERVER_ERROR']
    }

    // Generic error
    return {
      code: 'ERROR',
      message: error.message,
      userMessage: error.message || 'An unexpected error occurred. Please try again.'
    }
  }

  // Unknown error type
  return {
    code: 'UNKNOWN',
    message: 'Unknown error',
    userMessage: 'An unexpected error occurred. Please try again.'
  }
}

// Form validation error messages
export const VALIDATION_MESSAGES = {
  required: (field: string) => `${field} is required`,
  minLength: (field: string, min: number) => `${field} must be at least ${min} characters`,
  maxLength: (field: string, max: number) => `${field} must be no more than ${max} characters`,
  email: (field: string) => `${field} must be a valid email address`,
  url: (field: string) => `${field} must be a valid URL`,
  min: (field: string, min: number) => `${field} must be at least ${min}`,
  max: (field: string, max: number) => `${field} must be no more than ${max}`,
  pattern: (field: string) => `${field} format is invalid`,
  custom: (field: string, message: string) => message
}

// Helper to format API errors
export function formatApiError(response: Response | unknown): string {
  if (response instanceof Response) {
    switch (response.status) {
      case 400: return 'Invalid request. Please check your input and try again.'
      case 401: return 'Authentication required. Please sign in.'
      case 403: return 'You don\'t have permission to perform this action.'
      case 404: return 'The requested resource was not found.'
      case 429: return 'Too many requests. Please slow down and try again.'
      case 500: return 'Server error. Our team has been notified.'
      case 503: return 'Service temporarily unavailable. Please try again later.'
      default: return `Request failed with status ${response.status}`
    }
  }
  
  return 'An unexpected error occurred'
}

