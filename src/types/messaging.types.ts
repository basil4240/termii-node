import { Channel, MessageType } from "../constants";

export interface MediaObject {
  /** URL to the media file */
  url: string;
  
  /** Caption for the media file */
  caption?: string;
}

export interface SendMessageRequest {
  /** Destination phone number(s) in international format (e.g., 2347065250817) */
  to: string | string[];
  
  /** Sender ID (3-11 alphanumeric characters) */
  from: string;
  
  /** Message content (not used with media) */
  sms?: string;
  
  /** Message type */
  type: MessageType;
  
  /** Message channel/route */
  channel: Channel;
  
  /** API key (automatically added by client) */
  api_key?: string;
  
  /** Media object (only for WhatsApp, mutually exclusive with sms) */
  media?: MediaObject;
}

export interface SendBulkMessageRequest {
  /** Array of phone numbers (up to 10,000) in international format */
  to: string[];
  
  /** Sender ID (3-11 alphanumeric characters) */
  from: string;
  
  /** Message content */
  sms: string;
  
  /** Message type */
  type: MessageType;
  
  /** Message channel/route */
  channel: Channel;
  
  /** API key (automatically added by client) */
  api_key?: string;
}

export interface SendMessageResponse {
  /** Unique message identifier */
  message_id: string;
  
  /** Status message */
  message: string;
  
  /** Remaining balance */
  balance: number;
  
  /** User/account name */
  user: string;
}

export interface SendBulkMessageResponse {
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