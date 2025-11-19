import { TermiiClient } from './client';
export * from './types';
export * from './utils';

// Export TermiiClient as named export
export { TermiiClient } from './client';

// // Export TermiiClient as default export
export default TermiiClient;

// Export Core Models
export type { TermiiConfig, Logger, TermiiResponse } from './types';

// Export errors
export * from './utils';

// Export Messaging Models
export type {
  SendMessageRequest,
  SendBulkMessageRequest,
  SendMessageResponse,
  SendBulkMessageResponse,
  MediaObject,
} from './types';

// Export Sender Id Models
export type {
  PageableSort,
  Pageable,
  SortInfo,
  SenderIdEntry,
  FetchSenderIdResponse,
  RequestSenderIdRequest,
  RequestSenderIdResponse,
} from './types';

// Export Number Message Models
export type { SendNumberMessageRequest, SendNumberMessageResponse } from './types';

// Export Template Message Models
export type {
  TemplateMedia,
  SendTemplateRequest,
  SendTemplateWithMediaRequest,
  SendTemplateResponse,
} from './types';

// Export Phonebook Models
export type {
  PhonebookEntry,
  FetchPhonebooksResponse,
  CreatePhonebookRequest,
  CreatePhonebookResponse,
  UpdatePhonebookRequest,
  UpdatePhonebookResponse,
  DeletePhonebookResponse,
} from './types';

// Export Campaing Models
export type {
  SendCampaignRequest,
  SendCampaignResponse,
  CampaignRecord,
  FetchCampaignsResponse,
  CampaignHistory,
  FetchCampaignHistoryResponse,
  RetryCampaignRequest,
  RetryCampaignResponse,
} from './types';

// Export Campaing Models
export type {
  ContactKeyValue,
  FetchContactsResponse,
  AddSingleContactRequest,
  AddMultipleContactsRequest,
  ContactEntry,
  AddSingleContactResponse,
  AddMultipleContactsResponse,
  DeleteContactResponse,
} from './types';

// Export constants
export * from './constants';
