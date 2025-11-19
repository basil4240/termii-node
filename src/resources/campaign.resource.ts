import {
  FetchCampaignHistoryResponse,
  FetchCampaignsResponse,
  RetryCampaignResponse,
  SendCampaignRequest,
  SendCampaignResponse,
} from '../types/campaign.types';
import { TermiiValidationError, Validator } from '../utils';
import { BaseResource } from './base.resource';

export class CampaignResource extends BaseResource {
  private readonly SEND_CAMPAIGN_ENDPOINT = '/api/sms/campaigns/send';
  private readonly CAMPAIGNS_ENDPOINT = '/api/sms/campaigns';

  /**
   * Send campaign (regular, personalised, scheduled)
   */
  async send(params: SendCampaignRequest): Promise<SendCampaignResponse> {
    this.debug('Sending campaing', params);

    Validator.validateRequired({
      country_code: params.country_code,
      sender_id: params.sender_id,
      message: params.message,
      channel: params.channel,
      message_type: params.message_type,
      phonebook_id: params.phonebook_id,
      campaign_type: params.campaign_type,
      schedule_sms_status: params.schedule_sms_status,
    });

    Validator.validateSenderId(params.sender_id);

    if (params.schedule_sms_status === 'scheduled' && !params.schedule_time) {
      throw new TermiiValidationError(
        "schedule_time is required when schedule_sms_status = 'scheduled'"
      );
    }

    // Prepare request payload
    const payload: SendCampaignRequest = {
      ...params,
      api_key: this.apiKey,
    };

    const response = await this.http.post<SendCampaignResponse>(
      this.SEND_CAMPAIGN_ENDPOINT,
      payload
    );

    this.debug('Campaign sent successfully', response);

    return response.data;
  }

  /**
   * Fetch all campaigns
   */
  async fetchAll(): Promise<FetchCampaignsResponse> {
    this.debug('Fetching all campaing');

    const response = await this.http.get<FetchCampaignsResponse>(this.CAMPAIGNS_ENDPOINT, {
      api_key: this.apiKey,
    });

    this.debug('All Campaign fetched', response);
    return response.data;
  }

  /**
   * Fetch specific campaign history
   */
  async history(campaignId: string): Promise<FetchCampaignHistoryResponse> {
    this.debug('Fetching campaing Campaign', { campaignId });

    Validator.validateRequired({ campaignId });

    const response = await this.http.get<FetchCampaignHistoryResponse>(
      `${this.CAMPAIGNS_ENDPOINT}?campaign_id=${campaignId}`,
      { api_key: this.apiKey }
    );

    this.debug('Campaign history response:', response);
    return response.data;
  }

  /**
   * Retry a failed or incomplete campaign
   */
  async retry(campaignId: string): Promise<RetryCampaignResponse> {
    this.debug('Campaign.retry() called with:', { campaignId });

    Validator.validateRequired({ campaignId });

    const response = await this.http.patch<RetryCampaignResponse>(
      `${this.CAMPAIGNS_ENDPOINT}/${campaignId}`,
      {
        data: { api_key: this.apiKey },
      }
    );

    this.debug('Campaign.retry() response:', response);
    return response.data;
  }
}
