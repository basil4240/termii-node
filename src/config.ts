export const DEFAULT_CONFIG = {
  baseUrl: 'https://api.ng.termii.com',
  timeout: 30000,
  retries: 3,
  validateInput: true,
} as const;

export const API_VERSION = 'v1';

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
} as const;