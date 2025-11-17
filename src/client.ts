import { DEFAULT_CONFIG } from './config';
import { PhonebookResource } from './resources';
import { MessagingResource } from './resources/messaging.resource';
import { NumberResource } from './resources/number.resource';
import { SenderIdResource } from './resources/sender-id.resource';
import { TemplateResource } from './resources/template.resource';
import { Logger, TermiiConfig } from './types';
import { TermiiValidationError } from './utils/errors';
import { HTTPClient } from './utils/http.client';

export class TermiiClient {
  private config: Required<Omit<TermiiConfig, 'logger'>> & { logger?: Logger };
  private http: HTTPClient;
  public readonly apiKey: string;

  // Resources
  public readonly messaging: MessagingResource;
  public readonly senderId: SenderIdResource;
  public readonly numberMessage: NumberResource;
  public readonly templateMessage: TemplateResource;
  public readonly phonebook: PhonebookResource;

  constructor(config: TermiiConfig) {
    // Validate API key
    if (!config.apiKey || typeof config.apiKey !== 'string') {
      throw new TermiiValidationError('API key is required and must be a string');
    }

    // Merge with defaults
    this.config = {
      apiKey: config.apiKey,
      baseUrl: config.baseUrl || DEFAULT_CONFIG.baseUrl,
      timeout: config.timeout || DEFAULT_CONFIG.timeout,
      retries: config.retries || DEFAULT_CONFIG.retries,
      validateInput: config.validateInput ?? DEFAULT_CONFIG.validateInput,
      logger: config.logger,
    };

    this.apiKey = this.config.apiKey;

    // Initialize HTTP client
    this.http = new HTTPClient(
      this.config.baseUrl,
      this.config.timeout,
      this.config.retries,
      this.config.logger
    );

    // Initialize resources
    this.messaging = this.createMessagingResource();
    this.senderId = this.createSenderIdResource();
    this.numberMessage = this.createNumberResource();
    this.templateMessage = this.createTemplateResource();
    this.phonebook = this.createPhonebookResource();

    // Log the initialization
    this.config.logger?.info('Termii client initialized', {
      baseUrl: this.config.baseUrl,
    });
  }

  /**
   * Create client from environment variables
   */
  static fromEnv(): TermiiClient {
    const apiKey = process.env.TERMII_API_KEY;
    const baseUrl = process.env.TERMII_BASE_URL;

    if (!apiKey) {
      throw new TermiiValidationError('TERMII_API_KEY environment variable is required');
    }

    return new TermiiClient({
      apiKey,
      baseUrl,
    });
  }

  private createMessagingResource(): MessagingResource {
    const resource = new MessagingResource(this.http, this.config.logger);
    // Inject apiKey into resource
    (resource as any).apiKey = this.apiKey;
    return resource;
  }

  private createSenderIdResource(): SenderIdResource {
    const resource = new SenderIdResource(this.http, this.config.logger);
    // Inject apiKey into resource
    (resource as any).apiKey = this.apiKey;
    return resource;
  }

  private createNumberResource(): NumberResource {
    const resource = new NumberResource(this.http, this.config.logger);
    // Inject apiKey into resource
    (resource as any).apiKey = this.apiKey;
    return resource;
  }

  private createTemplateResource(): TemplateResource {
    const resource = new TemplateResource(this.http, this.config.logger);
    // Inject apiKey into resource
    (resource as any).apiKey = this.apiKey;
    return resource;
  }

  private createPhonebookResource(): PhonebookResource {
    const resource = new PhonebookResource(this.http, this.config.logger);
    // Inject apiKey into resource
    (resource as any).apiKey = this.apiKey;
    return resource;
  }

  /**
   * Get HTTP client instance (for resources)
   */
  getHttpClient(): HTTPClient {
    return this.http;
  }

  /**
   * Get logger instance
   */
  getLogger(): Logger | undefined {
    return this.config.logger;
  }

  /**
   * Get configuration
   */
  getConfig(): Readonly<Required<Omit<TermiiConfig, 'logger'>> & { logger?: Logger }> {
    return this.config;
  }

  /**
   * Check if input validation is enabled
   */
  shouldValidateInput(): boolean {
    return this.config.validateInput;
  }
}
