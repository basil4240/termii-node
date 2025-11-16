import { TermiiClient } from './client';
export * from './types';
export * from './utils/errors';

// Export TermiiClient as named export
export { TermiiClient } from './client';

// // Export TermiiClient as default export
export default TermiiClient;

// Export types
export type { TermiiConfig, Logger, TermiiResponse } from './types/common.types';

// Export errors
export {
  TermiiError,
  TermiiAuthenticationError,
  TermiiValidationError,
  TermiiRateLimitError,
  TermiiNetworkError,
  TermiiAPIError,
} from './utils/errors';

// Export Messaging Models
export type {
  SendMessageRequest,
  SendBulkMessageRequest,
  SendMessageResponse,
  SendBulkMessageResponse,
  MediaObject,
} from './types/messaging.types';

// Export Sender Id Models
export type {
  PageableSort,
  Pageable,
  SortInfo,
  SenderIdEntry,
  FetchSenderIdResponse,
  RequestSenderIdRequest,
  RequestSenderIdResponse
} from './types/sender-id.types'

// Export Number Message Models
export type {
  SendNumberMessageRequest,
  SendNumberMessageResponse
} from './types/number.types';

// Export constants
export { CHANNELS } from './constants/channels';
export type { Channel } from './constants/channels';
export { PIN_TYPES } from './constants/pin-types';
export type { PinType } from './constants/pin-types';
export { MESSAGE_TYPES } from './constants/message-types';
export type { MessageType } from './constants/message-types';
export { SENDER_ID_STATUS } from './constants/sender-id-status';
export type { SenderIdStatus } from './constants/sender-id-status';
export { NUMBER_MESSAGE_TYPES } from './constants/number-message-types';
export type { NumberMessageType } from './constants/number-message-types';
