import { Pageable, SortInfo } from "./common.types";

/** A phonebook record */
export interface PhonebookEntry {
  /** Unique identifier for the phonebook */
  id: string;

  /** Name of the phonebook */
  name: string;

  /** Total number of contacts in this phonebook */
  total_number_of_contacts: number;

  /** Date / time when this phonebook was created (string) */
  date_created: string;
}

// ========================= Request / Response Interfaces =========================

/** Response for fetching all phonebooks (paginated) */
export interface FetchPhonebooksResponse {
  content: PhonebookEntry[];
  pageable: Pageable;
  totalPages: number;
  last: boolean;
  totalElements: number;
  sort: SortInfo;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

/** Request body for creating a new phonebook */
export interface CreatePhonebookRequest {
  /** API key (optional, injected by client) */
  api_key?: string;

  /** Name of the phonebook */
  phonebook_name: string;

  /** Description of the phonebook (optional) */
  description?: string;
}

/** Response for create phonebook */
export interface CreatePhonebookResponse {
  /** Message indicating result */
  message: string;

  /** Status of operation, e.g., "success" */
  status: string;
}

/** Request body for updating a phonebook */
export interface UpdatePhonebookRequest {
  /** API key (optional) */
  api_key?: string;

  /** New name of the phonebook */
  phonebook_name: string;

  /** New description */
  description: string;
}

/** Response for updating a phonebook */
export interface UpdatePhonebookResponse {
  /** Unique id of the updated phonebook */
  id: string;

  /** Phonebook name */
  name: string;

  /** Description */
  description: string;

  /** Number of contacts under this phonebook */
  numberOfContacts: number;

  /** Whether this phonebook is temporary */
  temp: boolean;

  /** Time created */
  createdAt: string;

  /** Time updated */
  updatedAt: string;
}

/** Response for deleting a phonebook */
export interface DeletePhonebookResponse {
  /** Message confirming deletion */
  message: string;
}
