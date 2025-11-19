import {
  SendTemplateRequest,
  SendTemplateResponse,
  SendTemplateWithMediaRequest,
} from '../types';
import { TermiiValidationError } from '../utils';
import { Validator } from '../utils';
import { BaseResource } from './base.resource';

export class TemplateResource extends BaseResource {
  private readonly SEND_TEMPLATE_ENDPOINT = '/api/send/template';
  private readonly SEND_MEDIA_TEMPLATE_ENDPOINT = '/api/send/template/media';

  /**
   * Send template message (without media)
   */
  async sendTemplate(params: SendTemplateRequest): Promise<SendTemplateResponse> {
    this.debug('Sending templated message', params);

    Validator.validateRequired({
      phone_number: params.phone_number,
      device_id: params.device_id,
      template_id: params.template_id,
      data: params.data,
    });

    Validator.validatePhoneNumber(params.phone_number);

    if (typeof params.data !== 'object') {
      throw new TermiiValidationError('Template data must be an object of key-value pairs');
    }

    // Prepare request payload
    const payload: SendTemplateRequest = {
      ...params,
      api_key: this.apiKey,
    };

    // Send request
    const response = await this.http.post<SendTemplateResponse>(
      this.SEND_TEMPLATE_ENDPOINT,
      payload
    );

    this.info('Template message sent successfully', {
      message_id: response.data.message_id,
    });

    return response.data;
  }

  /**
   * Send template message (with media)
   */
  async sendTemplateWithMedia(params: SendTemplateWithMediaRequest): Promise<SendTemplateResponse> {
    this.debug('Sending templated message with media', params);

    Validator.validateRequired({
      phone_number: params.phone_number,
      device_id: params.device_id,
      template_id: params.template_id,
      data: params.data,
      media: params.media,
    });

    Validator.validatePhoneNumber(params.phone_number);

    if (typeof params.data !== 'object') {
      throw new TermiiValidationError('Template data must be an object of key-value pairs');
    }

    if (!params.media.url) {
      throw new TermiiValidationError('Media URL is required');
    }

    if (!params.media.caption) {
      throw new TermiiValidationError('Media caption is required');
    }

    // Prepare request payload
    const payload: SendTemplateWithMediaRequest = {
      ...params,
      api_key: this.apiKey,
    };

    // Send request
    const response = await this.http.post<SendTemplateResponse>(
      this.SEND_MEDIA_TEMPLATE_ENDPOINT,
      payload
    );

    this.info('Templated message with media sent successfully', {
      message_id: response.data.message_id,
    });

    return response.data;
  }
}
