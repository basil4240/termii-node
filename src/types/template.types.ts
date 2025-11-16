/** Media types allowed in template with media */
export interface TemplateMedia {
  /** Public URL of media: image, document, video, or location resource */
  url: string;
  /** Caption for the media (required) */
  caption: string;
}

/** Request to send a WhatsApp template message without media */
export interface SendTemplateRequest {
  /** Recipient phone number in international format (e.g., "23490126727") */
  phone_number: string;
  /** Device ID for WhatsApp (alphanumeric) */
  device_id: string;
  /** The ID of the approved WhatsApp template */
  template_id: string;
  /** API key (will be injected by client) */
  api_key?: string;
  /** Key-value data to populate template placeholders */
  data: Record<string, string | number>;
}

export interface SendTemplateWithMediaRequest extends SendTemplateRequest {
  /** Media object for media-based template */
  media: TemplateMedia;
}

/** Response for sending a template message (with or without media) */
export interface SendTemplateResponse {
  /** Response code (e.g., "ok") */
  code: string;
  /** Remaining account balance */
  balance: number;
  /** Unique message identifier */
  message_id: string;
  /** Status message from API */
  message: string;
  /** Your Termii username/account name */
  user: string;
  /** Optional: second form of message id as string (if returned) */
  message_id_str?: string;
}