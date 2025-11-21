// Global test setup
import { jest } from '@jest/globals';

// Set test timeout
jest.setTimeout(10000);

// Mock console methods
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: console.error,
};
