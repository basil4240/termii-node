import { ReadStream } from 'fs';
import { Pageable } from './common.types';

export interface ContactKeyValue {
  key: string;
  value: string;
}

export interface AddSingleContactRequest {
  /** API key (can be injected by client) */
  api_key?: string;

  /** Phonebook ID where the contact belongs */
  pid: string;

  /** Recipient phone number, international format */
  phone_number: string;

  /** Country code, e.g., "234" */
  country_code?: string;

  /** Email address of the contact */
  email_address?: string;

  /** First name of the contact */
  first_name?: string;

  /** Last name of the contact */
  last_name?: string;

  /** Company name for the contact */
  company?: string;
}

export interface AddMultipleContactsRequest {
  /** API key (can be injected by client) */
  api_key?: string;

  /** Phonebook ID where contacts should be uploaded */
  pid: string;

  /** Country code for the uploaded contacts, e.g. "234" */
  country_code: string;

  /** CSV file readable stream or file path string */
  file: ReadStream | string;
}

export interface ContactEntry {
  /** Unique contact identifier */
  id: string;

  /** Phonebook ID the contact belongs to */
  pid: string;

  /** Contact’s phone number (international) */
  phone_number: string;

  /** List of key/value custom fields for the contact */
  contact_list_key_value: ContactKeyValue[];
}

export interface FetchContactsResponse {
  /** All contacts in the phonebook */
  content: ContactEntry[];

  /** Pagination metadata */
  pageable: Pageable;

  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface AddSingleContactResponse {
  /** New contact object with created fields */
  id: string;
  phone_number: string;
  email_address?: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  created_at: string;
  updated_at: string;
}

export interface AddMultipleContactsResponse {
  /** Status message about the bulk upload */
  message: string;
}

export interface DeleteContactResponse {
  /** Response code / status */
  code: number;

  /** Data object containing deletion message */
  data: {
    message: string;
  };

  /** General message about the deletion */
  message: string;

  /** Operation status (e.g. "success") */
  status: string;
}
