import { SenderIdStatus } from "../constants";

/** Pagination sort info */
export interface PageableSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

/** Pagination wrapper */
export interface Pageable {
  sort: PageableSort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

/** Sort info (top-level) */
export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

/** A Sender ID entry (in fetch list) */
export interface SenderIdEntry {
  /** Country of the sender ID */
  country: string;

  /** Status of the sender ID (e.g., active, pending, blocked) */
  status: SenderIdStatus;

  /** Date/time when this sender ID was created (format: YYYY-MM-DD hh:mm:ss) */
  createdAt: string;

  /** The sender ID value (alphanumeric or numeric) */
  sender_id: string;

  /** (Optional) Company name associated with this sender ID request */
  company?: string;

  /** (Optional) Use case description for this sender ID request */
  usecase?: string;
}

export interface FetchSenderIdResponse {
  /** List of sender ID entries */
  content: SenderIdEntry[];

  /** Pagination details */
  pageable: Pageable;

  /** Total number of elements across all pages */
  totalElements: number;

  /** Whether this is the last page */
  last: boolean;

  /** Total number of pages */
  totalPages: number;

  /** Sort information at top-level */
  sort: SortInfo;

  /** Size of the page */
  size: number;

  /** Current page number (zero-based) */
  number: number;

  /** Number of elements on this page */
  numberOfElements: number;

  /** Whether this is the first page */
  first: boolean;

  /** Whether the content array is empty */
  empty: boolean;
}

export interface RequestSenderIdRequest {
  /** Your API key (found on Termii dashboard) */
  api_key: string;

  /** The sender ID you want to register (alphanumeric or numeric; alphanumeric length should be 3-11 chars) */
  sender_id: string;

  /** A sample of the type of message you'll send using this sender ID */
  'useCase': string;

  /** The name of the company associated with this sender ID */
  company: string;
}

export interface RequestSenderIdResponse {
  /** Code indicating outcome (e.g., "ok") */
  code: string;

  /** Message giving more details about the outcome */
  message: string;
}
