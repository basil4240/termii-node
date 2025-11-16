import { TermiiValidationError } from '../utils';
import { MESSAGE_TYPES } from '../constants';
import {
  SendBulkMessageRequest,
  SendBulkMessageResponse,
  SendMessageRequest,
  SendMessageResponse,
} from '../types';
import { BaseResource } from './base.resource';
import { CHANNELS } from '../constants';
import { Validator } from '../utils';

export class MessagingResource extends BaseResource {
  private readonly SEND_ENDPOINT = '/api/sms/send';
  private readonly SEND_BULK_ENDPOINT = '/api/sms/send/bulk';
  private readonly MAX_RECIPIENTS_SINGLE = 100;
  private readonly MAX_RECIPIENTS_BULK = 10000;

  /**
   * Send SMS message to single or multiple recipients (up to 100)
   *
   * @example
   * // Promise pattern
   * const result = await termii.messaging.send({
   *   to: '2347065250817',
   *   from: 'YourBrand',
   *   sms: 'Hello from Termii!',
   *   type: 'plain',
   *   channel: 'generic'
   * });
   *
   */
  async send(params: Omit<SendMessageRequest, 'api_key'>): Promise<SendMessageResponse> {
    this.debug('Sending message', params);

    // Validate inputs
    this.validateSendRequest(params);

    // Prepare request payload
    const payload: SendMessageRequest = {
      ...params,
      api_key: (this as any).apiKey,
    };

    // Send request
    const response = await this.http.post<SendMessageResponse>(this.SEND_ENDPOINT, payload);

    this.info('Message sent successfully', {
      message_id: response.data.message_id,
    });

    return response.data;
  }

  /**
   * Send bulk SMS messages to multiple recipients (up to 10,000)
   *
   * @example
   * // Promise pattern
   * const result = await termii.messaging.sendBulk({
   *   to: ['2347065250817', '2348012345678'],
   *   from: 'YourBrand',
   *   sms: 'Bulk message to all recipients',
   *   type: 'plain',
   *   channel: 'generic'
   * });
   *
   */
  async sendBulk(
    params: Omit<SendBulkMessageRequest, 'api_key'>
  ): Promise<SendBulkMessageResponse> {
    this.debug('Sending bulk message', {
      recipientCount: params.to.length,
    });

    // Validate inputs
    this.validateBulkSendRequest(params);

    // Prepare request payload
    const payload: SendBulkMessageRequest = {
      ...params,
      api_key: (this as any).apiKey,
    };

    // Send request
    const response = await this.http.post<SendBulkMessageResponse>(
      this.SEND_BULK_ENDPOINT,
      payload
    );

    this.info('Bulk message sent successfully', {
      message_id: response.data.message_id,
      recipientCount: params.to.length,
    });

    return response.data;
  }

  /**
   * Send message with media (WhatsApp only)
   *
   * @example
   * // Promise pattern
   * const result = await termii.messaging.sendWithMedia({
   *   to: '2347065250817',
   *   from: 'YourBrand',
   *   type: 'plain',
   *   channel: 'whatsapp',
   *   media: {
   *     url: 'https://example.com/image.jpg',
   *     caption: 'Check out this image!'
   *   }
   * });
   *
   */
  async sendWithMedia(
    params: Omit<SendMessageRequest, 'api_key' | 'sms'> & {
      media: Required<SendMessageRequest>['media'];
    },
  ): Promise<SendMessageResponse> {
    this.debug('Sending message with media', params);

      // Validate that channel is WhatsApp
      if (params.channel !== CHANNELS.WHATSAPP) {
        throw new TermiiValidationError('Media messages are only supported on WhatsApp channel');
      }

      // Validate media object
      if (!params.media || !params.media.url) {
        throw new TermiiValidationError('Media URL is required');
      }

      // Validate inputs (excluding sms since we're using media)
      this.validateSendRequest(params as any, true);

      // Prepare request payload
      const payload: SendMessageRequest = {
        ...params,
        api_key: (this as any).apiKey,
      };

      // Send request
      const response = await this.http.post<SendMessageResponse>(this.SEND_ENDPOINT, payload);

      this.info('Media message sent successfully', {
        message_id: response.data.message_id,
      });

      return response.data;
  }

  /**
   * Validate send message request
   */
  private validateSendRequest(
    params: Omit<SendMessageRequest, 'api_key'>,
    isMedia: boolean = false
  ): void {
    // Validate required fields
    Validator.validateRequired({
      to: params.to,
      from: params.from,
      type: params.type,
      channel: params.channel,
    });

    // Validate message content (either sms or media, but not both)
    if (!isMedia && !params.sms) {
      throw new TermiiValidationError('Message content (sms) is required');
    }

    if (params.sms && params.media) {
      throw new TermiiValidationError(
        'Cannot use both sms and media parameters. Use sendWithMedia() for media messages.'
      );
    }

    // Validate sender ID
    Validator.validateSenderId(params.from);

    // Validate channel
    if (!Object.values(CHANNELS).includes(params.channel as any)) {
      throw new TermiiValidationError(
        `Invalid channel. Must be one of: ${Object.values(CHANNELS).join(', ')}`
      );
    }

    // Validate message type
    if (!Object.values(MESSAGE_TYPES).includes(params.type as any)) {
      throw new TermiiValidationError(
        `Invalid message type. Must be one of: ${Object.values(MESSAGE_TYPES).join(', ')}`
      );
    }

    // Validate recipients
    if (Array.isArray(params.to)) {
      if (params.to.length === 0) {
        throw new TermiiValidationError('Recipient list cannot be empty');
      }

      if (params.to.length > this.MAX_RECIPIENTS_SINGLE) {
        throw new TermiiValidationError(
          `Maximum ${this.MAX_RECIPIENTS_SINGLE} recipients allowed for single send. Use sendBulk() for more recipients.`
        );
      }

      Validator.validatePhoneNumbers(params.to);
    } else {
      Validator.validatePhoneNumber(params.to);
    }
  }

  /**
   * Validate bulk send message request
   */
  private validateBulkSendRequest(params: Omit<SendBulkMessageRequest, 'api_key'>): void {
    // Validate required fields
    Validator.validateRequired({
      to: params.to,
      from: params.from,
      sms: params.sms,
      type: params.type,
      channel: params.channel,
    });

    // Validate sender ID
    Validator.validateSenderId(params.from);

    // Validate channel
    if (!Object.values(CHANNELS).includes(params.channel as any)) {
      throw new TermiiValidationError(
        `Invalid channel. Must be one of: ${Object.values(CHANNELS).join(', ')}`
      );
    }

    // Validate message type
    if (!Object.values(MESSAGE_TYPES).includes(params.type as any)) {
      throw new TermiiValidationError(
        `Invalid message type. Must be one of: ${Object.values(MESSAGE_TYPES).join(', ')}`
      );
    }

    // Validate recipients array
    if (!Array.isArray(params.to)) {
      throw new TermiiValidationError('Recipients must be an array for bulk send');
    }

    if (params.to.length === 0) {
      throw new TermiiValidationError('Recipient list cannot be empty');
    }

    if (params.to.length > this.MAX_RECIPIENTS_BULK) {
      throw new TermiiValidationError(
        `Maximum ${this.MAX_RECIPIENTS_BULK} recipients allowed for bulk send`
      );
    }

    Validator.validatePhoneNumbers(params.to);
  }
}
