export class TermiiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'TermiiError';
    Object.setPrototypeOf(this, TermiiError.prototype);
  }
}

export class TermiiAuthenticationError extends TermiiError {
  constructor(message: string = 'Authentication failed. Please check your API key.', details?: any) {
    super(message, 401, 'AUTHENTICATION_ERROR', details);
    this.name = 'TermiiAuthenticationError';
    Object.setPrototypeOf(this, TermiiAuthenticationError.prototype);
  }
}

export class TermiiValidationError extends TermiiError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'TermiiValidationError';
    Object.setPrototypeOf(this, TermiiValidationError.prototype);
  }
}

export class TermiiRateLimitError extends TermiiError {
  constructor(message: string = 'Rate limit exceeded. Please try again later.', details?: any) {
    super(message, 429, 'RATE_LIMIT_ERROR', details);
    this.name = 'TermiiRateLimitError';
    Object.setPrototypeOf(this, TermiiRateLimitError.prototype);
  }
}

export class TermiiNetworkError extends TermiiError {
  constructor(message: string = 'Network request failed. Please check your connection.', details?: any) {
    super(message, undefined, 'NETWORK_ERROR', details);
    this.name = 'TermiiNetworkError';
    Object.setPrototypeOf(this, TermiiNetworkError.prototype);
  }
}

export class TermiiAPIError extends TermiiError {
  constructor(message: string, statusCode: number, details?: any) {
    super(message, statusCode, 'API_ERROR', details);
    this.name = 'TermiiAPIError';
    Object.setPrototypeOf(this, TermiiAPIError.prototype);
  }
}