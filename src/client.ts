import { DEFAULT_CONFIG } from './config';
import {
  CampaignResource,
  MessagingResource,
  NumberResource,
  PhonebookResource,
  SenderIdResource,
  TemplateResource,
} from './resources';
import { ContactResource } from './resources/contact.resource';
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
  public readonly campaign: CampaignResource;
  public readonly contact: ContactResource;

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
    this.messaging = new MessagingResource(this.http, this.apiKey, this.config.logger);
    this.senderId = new SenderIdResource(this.http, this.apiKey, this.config.logger);
    this.numberMessage = new NumberResource(this.http, this.apiKey, this.config.logger);
    this.templateMessage = new TemplateResource(this.http, this.apiKey, this.config.logger);
    this.phonebook = new PhonebookResource(this.http, this.apiKey, this.config.logger);
    this.campaign = new CampaignResource(this.http, this.apiKey, this.config.logger);
    this.contact = new ContactResource(this.http, this.apiKey, this.config.logger);

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
