import { MESSAGE_TYPES } from "../constants";
import { SendNumberMessageRequest, SendNumberMessageResponse } from "../types";
import { TermiiValidationError } from "../utils";
import { Validator } from "../utils";
import { BaseResource } from "./base.resource";

export class NumberResource extends BaseResource {
  private readonly SEND_NUMBER_ENDPOINT = '/api/sms/number/send';

  /**
   * Send a message to a phone number via the Number API
   *
   * @example
   * const result = await termii.number.send({
   *   to: '2347065250817',
   *   sms: 'Hello from Termii Number API!',
   *   type: 'plain',
   * });
   */
  async send(params: Omit<SendNumberMessageRequest, 'api_key'>): Promise<SendNumberMessageResponse> {
    this.debug('Sending number message', params);

    // Validate required fields
    Validator.validateRequired({
      to: params.to,
      sms: params.sms,
    });

    // Validate phone number
    Validator.validatePhoneNumber(params.to);

    // Validate message type
    if (params.type && !Object.values(MESSAGE_TYPES).includes(params.type as any)) {
      throw new TermiiValidationError(
        `Invalid message type. Must be one of: ${Object.values(MESSAGE_TYPES).join(', ')}`
      );
    }

    // Prepare request payload
    const payload: SendNumberMessageRequest = {
      ...params,
      api_key: this.apiKey,
    };

    // Send request
    const response = await this.http.post<SendNumberMessageResponse>(this.SEND_NUMBER_ENDPOINT, payload);

    this.info('Number message sent successfully', {
      message_id: response.data.message_id,
    });

    return response.data;
  }
}
