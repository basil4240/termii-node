export interface TermiiConfig {
  /** Your Termii API key (required) */
  apiKey: string;
  
  /** Base URL for API requests (optional, defaults to https://api.ng.termii.com) */
  baseUrl?: string;
  
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  
  /** Number of retry attempts for failed requests (default: 3) */
  retries?: number;
  
  /** Enable input validation before API calls (default: true) */
  validateInput?: boolean;
  
  /** Custom logger instance */
  logger?: Logger;
}

export interface Logger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

export interface TermiiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    requestId?: string;
    timestamp: Date;
  };
}

export interface HTTPRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface HTTPResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}