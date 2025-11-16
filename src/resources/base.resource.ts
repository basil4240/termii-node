import { Logger } from "../types";
import { HTTPClient } from "../utils";

export abstract class BaseResource {
  protected http: HTTPClient;
  protected logger?: Logger;

  constructor(http: HTTPClient, logger?: Logger) {
    this.http = http;
    this.logger = logger;
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