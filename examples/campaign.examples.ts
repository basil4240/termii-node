import {
  CAMPAIGN_TYPE,
  CHANNELS,
  ConsoleLogger,
  MESSAGE_TYPES,
  SCHEDULE_STATUS,
  TermiiAPIError,
  TermiiAuthenticationError,
  TermiiClient,
  TermiiNetworkError,
  TermiiRateLimitError,
  TermiiValidationError,
} from '../src';
import { apiKey, baseUrl, senderId } from './sample-payload';

// Initialize client
const termii = new TermiiClient({
  baseUrl: baseUrl,
  apiKey: apiKey,
  logger: new ConsoleLogger(),
});

// ============================================================================
// Example 1: Send a campaign
// ============================================================================
async function sendCampaign() {
  try {
    const result = await termii.campaign.send({
      country_code: '234',
      sender_id: senderId,
      message: 'Welcome to Termii.',
      channel: CHANNELS.GENERIC,
      message_type: MESSAGE_TYPES.PLAIN,
      phonebook_id: '2d9f4a02-85b8-45e5-9f5b-30f93ef472e2',
      delimiter: ',',
      remove_duplicate: 'yes',
      enable_link_tracking: true,
      campaign_type: CAMPAIGN_TYPE.PERSONALIZED,
      schedule_time: '12-12-2025 06:00',
      schedule_sms_status: SCHEDULE_STATUS.SCHEDULED,
    });

    console.log('Campaign Sent:', result);
  } catch (error) {
    console.error('Error Sending Campaign');
    if (error instanceof TermiiValidationError) {
      // Invalid input parameters
      console.error('Validation error:', error.message);
    } else if (error instanceof TermiiAuthenticationError) {
      // Invalid API key or unauthorized
      console.error('Authentication error:', error.message);
    } else if (error instanceof TermiiRateLimitError) {
      // Rate limit exceeded
      console.error('Rate limit exceeded:', error.message);
    } else if (error instanceof TermiiAPIError) {
      // API error (4xx, 5xx)
      console.error('API error:', error.message, error.statusCode);
    } else if (error instanceof TermiiNetworkError) {
      // Network/connection error
      console.error('Network error:', error.message);
    } else {
      // Unknown error
      console.error('Unexpected error:', error);
    }
  }
}

// ============================================================================
// Example 2: Fetch campaigns
// ============================================================================
async function fetchCampaigns() {
  try {
    const result = await termii.campaign.fetchAll();

    console.log('campaigns fetched', result);
  } catch (error) {
    console.error('Error fetching campaigns');
    if (error instanceof TermiiValidationError) {
      // Invalid input parameters
      console.error('Validation error:', error.message);
    } else if (error instanceof TermiiAuthenticationError) {
      // Invalid API key or unauthorized
      console.error('Authentication error:', error.message);
    } else if (error instanceof TermiiRateLimitError) {
      // Rate limit exceeded
      console.error('Rate limit exceeded:', error.message);
    } else if (error instanceof TermiiAPIError) {
      // API error (4xx, 5xx)
      console.error('API error:', error.message, error.statusCode);
    } else if (error instanceof TermiiNetworkError) {
      // Network/connection error
      console.error('Network error:', error.message);
    } else {
      // Unknown error
      console.error('Unexpected error:', error);
    }
  }
}

// ============================================================================
// Example 3: Fetch campaign history
// ============================================================================
async function fetchCampaignHistory() {
  try {
    const result = await termii.campaign.history('C714360330258');

    console.log('campaign history fetched', result);
  } catch (error) {
    console.error('Error fetching campaign history');
    if (error instanceof TermiiValidationError) {
      // Invalid input parameters
      console.error('Validation error:', error.message);
    } else if (error instanceof TermiiAuthenticationError) {
      // Invalid API key or unauthorized
      console.error('Authentication error:', error.message);
    } else if (error instanceof TermiiRateLimitError) {
      // Rate limit exceeded
      console.error('Rate limit exceeded:', error.message);
    } else if (error instanceof TermiiAPIError) {
      // API error (4xx, 5xx)
      console.error('API error:', error.message, error.statusCode);
    } else if (error instanceof TermiiNetworkError) {
      // Network/connection error
      console.error('Network error:', error.message);
    } else {
      // Unknown error
      console.error('Unexpected error:', error);
    }
  }
}

// ============================================================================
// Example 4: Retry campaign
// ============================================================================
async function retrycampaign() {
  try {
    const result = await termii.campaign.retry('C714360330258');

    console.log('Retry campaign', result);
  } catch (error) {
    console.error('Error Retring campaign');
    if (error instanceof TermiiValidationError) {
      // Invalid input parameters
      console.error('Validation error:', error.message);
    } else if (error instanceof TermiiAuthenticationError) {
      // Invalid API key or unauthorized
      console.error('Authentication error:', error.message);
    } else if (error instanceof TermiiRateLimitError) {
      // Rate limit exceeded
      console.error('Rate limit exceeded:', error.message);
    } else if (error instanceof TermiiAPIError) {
      // API error (4xx, 5xx)
      console.error('API error:', error.message, error.statusCode);
    } else if (error instanceof TermiiNetworkError) {
      // Network/connection error
      console.error('Network error:', error.message);
    } else {
      // Unknown error
      console.error('Unexpected error:', error);
    }
  }
}

// Run examples
(async () => {
  await sendCampaign();
  await fetchCampaigns();
  await fetchCampaignHistory();
  await retrycampaign();
})();
