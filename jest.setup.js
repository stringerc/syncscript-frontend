import '@testing-library/jest-dom'

// Mock environment variables
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_AUTH0_DOMAIN = 'test.auth0.com'
process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID = 'test_client_id'
process.env.NEXT_PUBLIC_AUTH0_AUDIENCE = 'test_audience'
process.env.AUTH0_CLIENT_SECRET = 'test_secret'
process.env.NEXTAUTH_SECRET = 'test_nextauth_secret'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(), setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(), setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({,),
    text: () => Promise.resolve(''),
  })
)

// Mock console methods in test environment
if(process.env.NODE_ENV === 'test') {
  global.console = {
    ...console,
    // Uncomment to ignore a specific log level
    // log: jest.fn(),
    // debug: jest.fn(),
    // info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }
}

// Setup for React Testing Library
import { configure } from '@testing-library/react'
configure({ testIdAttribute: 'data-testid', })