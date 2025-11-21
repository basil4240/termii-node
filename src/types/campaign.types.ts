import { CampaignType, Channel, MessageType, ScheduleSmsStatus } from '../constants';

export interface SendCampaignRequest {
  /** API key (will be injected) */
  api_key?: string;

  /** Country dialing code (e.g., "234") */
  country_code: string;

  /** Sender ID alphanumeric or numeric */
  sender_id: string;

  /** Message text to be sent */
  message: string;

  /** Delivery channel: "generic" or "dnd" */
  channel: Channel;

  /** Message type: "plain" or "unicode" */
  message_type: MessageType;

  /** ID of the phonebook group to send campaign to */
  phonebook_id: string;

  /** Enable link click tracking */
  enable_link_tracking?: boolean;

  /** Type of campaign: "personalized" or "regular" */
  campaign_type: CampaignType;

  /** Schedule status: "scheduled" or "regular" */
  schedule_sms_status: ScheduleSmsStatus;

  /** Time to run the campaign (if scheduled), format per Termii docs */
  schedule_time?: string;

  /** Delimiter for campaign personalization (if personalized) */
  delimiter?: string;

  /** Remove duplicate recipients? "yes" or "no" per Termii docs */
  remove_duplicate?: string;
}

export interface SendCampaignResponse {
  /** Status message from API (e.g. "Your campaign has been scheduled") */
  message: string;

  /** Campaign identifier */
  campaignId: string;

  /** Result status, e.g. "success" */
  status: string;
}

export interface CampaignRecord {
  campaign_id: string;
  run_at: string;
  status: string;
  created_at: number;
  phone_book: string;
  camp_type: string;
  total_recipients: number;
}

export interface FetchCampaignsResponse {
  content: CampaignRecord[];

  /** Pagination “pageable” info per the API response */
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };

  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export interface CampaignHistory {
  id: string;
  applicationId: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  campaignId: string;
  phonebookId: string;
  phonebookName: string;
  sender: string;
  message: string;
  countryCode: string;
  smsType: MessageType;
  campaignType: CampaignType;
  status: string;
  cost: number;
  totalRecipient: number;
  totalDelivered: number;
  totalFailed: number;
  sent: number;
  runAt: string;
  isLinkTrackingEnabled: boolean;
  rerun: boolean;
  sendBy: string;
  personalized: boolean;
}

export type FetchCampaignHistoryResponse = CampaignHistory;

export type RetryCampaignRequest = Record<string, never>;

export interface RetryCampaignResponse {
  message: string;
  status: string;
}
