import fs from 'fs';
import FormData from 'form-data';
import {
  AddMultipleContactsRequest,
  AddMultipleContactsResponse,
  AddSingleContactRequest,
  AddSingleContactResponse,
  DeleteContactResponse,
  FetchContactsResponse,
  HTTPResponse,
} from '../types';
import { TermiiValidationError, Validator } from '../utils';
import { BaseResource } from './base.resource';
import path from 'path';

export class ContactResource extends BaseResource {
  private readonly CONTACTS_ENDPOINT = '/api/phonebooks';

  /**
   * Fetch contacts in a phonebook
   */
  async fetch(phonebookId: string): Promise<FetchContactsResponse> {
    this.debug('Fetching contacts', { phonebookId });

    Validator.validateRequired({ phonebookId });

    const response = await this.http.get<HTTPResponse<FetchContactsResponse>>(
      `${this.CONTACTS_ENDPOINT}/${phonebookId}/contacts`,
      { api_key: this.apiKey }
    );

    this.debug('Fetch contacts response', response.data.data);
    return response.data.data;
  }

  /**
   * Add a single contact to a phonebook
   */
  async addSingle(params: AddSingleContactRequest): Promise<AddSingleContactResponse> {
    this.debug('Adding contact', params);

    Validator.validateRequired({
      pid: params.pid,
      phone_number: params.phone_number,
    });

    Validator.validatePhoneNumber(params.phone_number);

    // Prepare request payload
    const payload: AddSingleContactRequest = {
      ...params,
      api_key: this.apiKey,
    };

    const response = await this.http.post<AddSingleContactResponse>(
      `${this.CONTACTS_ENDPOINT}/${params.pid}/contacts`,
      payload
    );

    this.debug('Add contact response', response.data);
    return response.data;
  }

  /**
   * Bulk upload contacts via CSV file
   */
  async addMultipleBulk(params: AddMultipleContactsRequest): Promise<AddMultipleContactsResponse> {
    this.debug('Bulk upload contacts', params);

    // validate
    this.validateAddMultipleBulk(params);

    const formData = new FormData();

    const fileStream =
      typeof params.file === 'string' ? fs.createReadStream(params.file) : params.file;

    formData.append('file', fileStream);
    formData.append(
      'contact',
      JSON.stringify({
        pid: params.pid,
        country_code: params.country_code,
        api_key: this.apiKey,
      }),
      { contentType: 'application/json' }
    );

    const response = await this.http.post<AddMultipleContactsResponse>(
      `${this.CONTACTS_ENDPOINT}/contacts/upload`,
      formData,
      formData.getHeaders()
    );

    this.debug('Bulk upload response', response.data);
    return response.data;
  }

  /**
   * Delete a contact from a phonebook
   */
  async delete(phonebookId: string): Promise<DeleteContactResponse> {
    this.debug('Deleting contact', phonebookId);

    Validator.validateRequired({
      phonebookId,
    });

    const response = await this.http.delete<DeleteContactResponse>(
      `${this.CONTACTS_ENDPOINT}/${phonebookId}/contacts`,
      { params: { api_key: this.apiKey } }
    );

    this.debug('Delete contact response', response.data);
    return response.data;
  }

  private validateAddMultipleBulk(params: AddMultipleContactsRequest): void {
    Validator.validateRequired({
      pid: params.pid,
      country_code: params.country_code,
      file: params.file,
    });

    const filePath =
      typeof params.file === 'string'
        ? params.file
        : typeof params.file.path === 'string'
          ? params.file.path
          : null;

    if (!filePath || path.extname(filePath).toLowerCase() !== '.csv') {
      throw new TermiiValidationError('The provided file must be a valid .csv file.');
    }
  }
}
