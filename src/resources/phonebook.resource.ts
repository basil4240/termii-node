import {
  CreatePhonebookRequest,
  CreatePhonebookResponse,
  DeletePhonebookResponse,
  UpdatePhonebookRequest,
  UpdatePhonebookResponse,
} from '../types';
import { FetchPhonebooksResponse } from '../types';
import { TermiiValidationError, Validator } from '../utils';
import { BaseResource } from './base.resource';

export class PhonebookResource extends BaseResource {
  private readonly PHONEBOOKS_ENDPOINT = '/api/phonebooks';

  /**
   * Fetch all phonebooks (paginated)
   */
  async fetchAll(): Promise<FetchPhonebooksResponse> {
    this.debug('Fetching all phonebooks...');

    const response = await this.http.get<FetchPhonebooksResponse>(this.PHONEBOOKS_ENDPOINT, {
      api_key: (this as any).apiKey,
    });

    this.debug('Fetch result:', response.data);
    return response.data;
  }

  /**
   * Create a new phonebook
   */
  async create(params: CreatePhonebookRequest): Promise<CreatePhonebookResponse> {
    this.debug('Creating phonebook with params:', params);

    Validator.validateRequired({
      phonebook_name: params.phonebook_name,
    });

    // Prepare request payload
    const payload: CreatePhonebookRequest = {
      ...params,
      api_key: (this as any).apiKey,
    };

    const response = await this.http.post<CreatePhonebookResponse>(
      this.PHONEBOOKS_ENDPOINT,
      payload
    );

    this.debug('Phonebook created:', response.data);
    return response.data;
  }

  /**
   * Update an existing phonebook
   */
  async update(
    phonebook_id: string,
    params: UpdatePhonebookRequest
  ): Promise<UpdatePhonebookResponse> {
    this.debug('Updating phonebook:', phonebook_id, params);

    if (!phonebook_id) {
      throw new TermiiValidationError('phonebook_id is required');
    }

    Validator.validateRequired({
      phonebook_name: params.phonebook_name,
      description: params.description,
    });

    // Prepare request payload
    const payload: CreatePhonebookRequest = {
      ...params,
      api_key: (this as any).apiKey,
    };

    const response = await this.http.patch<UpdatePhonebookResponse>(
      `${this.PHONEBOOKS_ENDPOINT}/${phonebook_id}`,
      { data: payload }
    );

    this.debug('Phonebook updated:', response.data);
    return response.data;
  }

  /**
   * Delete a phonebook
   */
  async delete(phonebook_id: string): Promise<DeletePhonebookResponse> {
    this.debug('Deleting phonebook:', phonebook_id);

    if (!phonebook_id) {
      throw new TermiiValidationError('phonebook_id is required');
    }

    const response = await this.http.delete<DeletePhonebookResponse>(
      `${this.PHONEBOOKS_ENDPOINT}/${phonebook_id}`,
      { params: { api_key: (this as any).apiKey } }
    );

    this.debug('Phonebook deleted:', response.data);
    return response.data;
  }
}
