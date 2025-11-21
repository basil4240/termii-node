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
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}

export interface TermiiResponse<T = unknown> {
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
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface HTTPResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/** Pagination sort info */
export interface PageableSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

/** Pagination wrapper */
export interface Pageable {
  sort: PageableSort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

/** Sort info (top-level) */
export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
