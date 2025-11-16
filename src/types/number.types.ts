import { NumberMessageType } from "../constants/number-message-types";

export interface SendNumberMessageRequest {
  /** Destination phone number in international format (e.g., 2347065250817) */
  to: string;

  /** Text content of the message */
  sms: string;

  /** API key (automatically added by client) */
  api_key?: string;

  /** Message type (optional, default 'plain') */
  type?: NumberMessageType;
}

export interface SendNumberMessageResponse {
  /** Response code */
  code: string;

  /** Unique message identifier */
  message_id: string;

  /** Status message */
  message: string;

  /** Remaining balance */
  balance: number;

  /** User/account name */
  user: string;
}