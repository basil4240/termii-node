import { SENDER_ID_STATUS, SenderIdStatus } from '../constants';
import {
  FetchSenderIdResponse,
  RequestSenderIdRequest,
  RequestSenderIdResponse,
} from '../types';
import { TermiiValidationError } from '../utils';
import { Validator } from '../utils';
import { BaseResource } from './base.resource';

export class SenderIdResource extends BaseResource {
  // Endpoints — adjust if your Termii docs specify different paths
  private readonly FETCH_ENDPOINT = '/api/sender-id';
  private readonly REQUEST_ENDPOINT = '/api/sender-id/request';

  /**
   * Fetch a paginated list of Sender IDs.
   *
   * Example:
   * const result = await termii.senderId.fetch({ page: 0, size: 20, status: SENDER_ID_STATUS.PENDING });
   */
  async fetch(params?: {
    page?: number;
    size?: number;
    status?: SenderIdStatus;
  }): Promise<FetchSenderIdResponse> {
    this.debug('Fetching sender id list', params ?? {});

    this.validateFetchParams(params);

    // Build query params
    const query: Record<string, any> = {
      api_key: (this as any).apiKey,
    };

    if (params?.page !== undefined) query.page = params.page;
    if (params?.size !== undefined) query.size = params.size;
    if (params?.status !== undefined) query.status = params.status;

    const response = await this.http.get<FetchSenderIdResponse>(this.FETCH_ENDPOINT, query);

    this.info('Fetched sender id list', {
      totalElements: response.data?.totalElements,
      page: response.data?.number,
    });

    return response.data;
  }

  /**
   * Request/register a new Sender ID.
   *
   * Example:
   * const result = await termii.senderId.request({
   *   sender_id: 'MyBrand',
   *   company: 'Acme Inc',
   *   usecase: 'Transactional OTP messages for user login'
   * });
   */
  async request(params: Omit<RequestSenderIdRequest, 'api_key'>): Promise<RequestSenderIdResponse> {
    this.debug('Requesting new sender id', params);

    // Validate required fields
    Validator.validateRequired({
      sender_id: params.sender_id,
      'useCase': params.useCase,
      company: params.company,
    });

    // Validate sender id format and lengths
    Validator.validateSenderId(params.sender_id);

    // Prepare payload (inject api_key)
    const payload: RequestSenderIdRequest = {
      ...params,
      api_key: (this as any).apiKey,
    };

    const response = await this.http.post<RequestSenderIdResponse>(this.REQUEST_ENDPOINT, payload);

    this.info('Sender ID request created', {
      message: response.data?.message,
    });

    return response.data;
  }

  /**
   * Helper to validate any client-provided filters for fetch()
   */
  private validateFetchParams(params?: {
    page?: number;
    size?: number;
    status?: SenderIdStatus;
  }): void {
    if (!params) return;

    if (params.page !== undefined && (!Number.isInteger(params.page) || params.page < 0)) {
      throw new TermiiValidationError('Page must be a non-negative integer');
    }

    if (params.size !== undefined && (!Number.isInteger(params.size) || params.size <= 0)) {
      throw new TermiiValidationError('Size must be a positive integer');
    }

    if (
      params.status !== undefined &&
      !Object.values(SENDER_ID_STATUS).includes(params.status as any)
    ) {
      throw new TermiiValidationError(
        `Invalid status. Must be one of: ${Object.values(SENDER_ID_STATUS).join(', ')}`
      );
    }
  }
}
