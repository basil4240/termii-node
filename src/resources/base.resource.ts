import type { HTTPClient } from '../utils/http.client';
import type { Logger } from '../types/common.types';

export abstract class BaseResource {
  protected http: HTTPClient;
  protected apiKey: string;
  protected logger?: Logger;
  protected validateInput?: boolean;

  constructor(http: HTTPClient, apiKey: string, logger?: Logger, validateInput?: boolean) {
    this.http = http;
    this.logger = logger;
    this.apiKey = apiKey;
    this.validateInput = validateInput;
  }

  /**
   * Log debug message
   */
  protected debug(message: string, ...args: any[]): void {
    this.logger?.debug(`[${this.constructor.name}] ${message}`, ...args);
  }

  /**
   * Log info message
   */
  protected info(message: string, ...args: any[]): void {
    this.logger?.info(`[${this.constructor.name}] ${message}`, ...args);
  }

  /**
   * Log warning message
   */
  protected warn(message: string, ...args: any[]): void {
    this.logger?.warn(`[${this.constructor.name}] ${message}`, ...args);
  }

  /**
   * Log error message
   */
  protected error(message: string, ...args: any[]): void {
    this.logger?.error(`[${this.constructor.name}] ${message}`, ...args);
  }
}
