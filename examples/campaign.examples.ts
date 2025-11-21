import {
  CAMPAIGN_TYPE,
  CHANNELS,
  ConsoleLogger,
  MESSAGE_TYPES,
  TermiiAPIError,
  TermiiAuthenticationError,
  TermiiClient,
  TermiiNetworkError,
  TermiiRateLimitError,
  TermiiValidationError,
} from '../src';
import { SCHEDULE_STATUS } from '../src/constants/shedule-status';
import { apiKey, baseUrl, senderId } from './sample-payload';

// Initialize client
const termii = new TermiiClient({
  baseUrl: baseUrl,
  apiKey: apiKey,
  logger: new ConsoleLogger(),
});

// NOTE: Replace these with valid IDs from your Termii account for successful API calls.
const PHONEBOOK_ID_PLACEHOLDER = 'YOUR_VALID_PHONEBOOK_ID';
const CAMPAIGN_ID_PLACEHOLDER = 'YOUR_VALID_CAMPAIGN_ID';

// ============================================================================
// Example 1: Send a Regular SMS Campaign
// ============================================================================
async function sendRegularCampaign() {
  try {
    const result = await termii.campaign.send({
      country_code: '234',
      sender_id: senderId,
      message: 'Hello from Termii! This is a regular campaign message.',
      channel: CHANNELS.GENERIC,
      message_type: MESSAGE_TYPES.PLAIN,
      phonebook_id: PHONEBOOK_ID_PLACEHOLDER,
      campaign_type: CAMPAIGN_TYPE.REGULAR,
      schedule_sms_status: SCHEDULE_STATUS.REGULAR,
    });

    console.log('Regular Campaign Sent:', result);
  } catch (error) {
    console.error('Error Sending Regular Campaign');
    if (error instanceof TermiiValidationError) {
      console.error('Validation error:', error.message);
    } else if (error instanceof TermiiAuthenticationError) {
      console.error('Authentication error:', error.message);
    } else if (error instanceof TermiiAPIError) {
      console.error('API error:', error.message, error.statusCode);
    } else if (error instanceof TermiiNetworkError) {
      console.error('Network error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// ============================================================================
// Example 2: Send a Personalized SMS Campaign
// ============================================================================
async function sendPersonalizedCampaign() {
  try {
    const result = await termii.campaign.send({
      country_code: '234',
      sender_id: senderId,
      message: 'Hello {{name}}, your order {{order_id}} is confirmed!', // Message with placeholders
      channel: CHANNELS.GENERIC,
      message_type: MESSAGE_TYPES.PLAIN,
      phonebook_id: PHONEBOOK_ID_PLACEHOLDER,
      campaign_type: CAMPAIGN_TYPE.PERSONALIZED,
      schedule_sms_status: SCHEDULE_STATUS.REGULAR,
      delimiter: '{{}}', // Specify delimiter for placeholders
      // Note: Recipient details with placeholder values would be managed in the phonebook contacts.
    });

    console.log('Personalized Campaign Sent:', result);
  } catch (error) {
    console.error('Error Sending Personalized Campaign');
    if (error instanceof TermiiValidationError) {
      console.error('Validation error:', error.message);
    } else if (error instanceof TermiiAuthenticationError) {
      console.error('Authentication error:', error.message);
    } else if (error instanceof TermiiAPIError) {
      console.error('API error:', error.message, error.statusCode);
    } else if (error instanceof TermiiNetworkError) {
      console.error('Network error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// ============================================================================
// Example 3: Send a Scheduled SMS Campaign
// ============================================================================
async function sendScheduledCampaign() {
  try {
    // NOTE: schedule_time must be in the future and adhere to Termii's expected format.
    const futureTime = new Date(Date.now() + 60 * 60 * 1000)
      .toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/, '$1-$2-$3 $4:$5'); // Format to dd-MM-yyyy HH:mm

    const result = await termii.campaign.send({
      country_code: '234',
      sender_id: senderId,
      message: 'Your appointment is tomorrow at 10 AM.',
      channel: CHANNELS.GENERIC,
      message_type: MESSAGE_TYPES.PLAIN,
      phonebook_id: PHONEBOOK_ID_PLACEHOLDER,
      campaign_type: CAMPAIGN_TYPE.REGULAR, // Scheduled can be regular or personalized
      schedule_sms_status: SCHEDULE_STATUS.SCHEDULED,
      schedule_time: futureTime,
    });

    console.log('Scheduled Campaign Sent:', result);
  } catch (error) {
    console.error('Error Sending Scheduled Campaign');
    if (error instanceof TermiiValidationError) {
      console.error('Validation error:', error.message);
    } else if (error instanceof TermiiAuthenticationError) {
      console.error('Authentication error:', error.message);
    } else if (error instanceof TermiiAPIError) {
      console.error('API error:', error.message, error.statusCode);
    } else if (error instanceof TermiiNetworkError) {
      console.error('Network error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// ============================================================================
// Example 4: Fetch campaigns
// NOTE: Ensure your API Key and baseUrl are correctly configured.
// ============================================================================
async function fetchCampaigns() {
  try {
    const result = await termii.campaign.fetchAll();

    console.log('Campaigns fetched', result);
  } catch (error) {
    console.error('Error fetching campaigns');
    if (error instanceof TermiiValidationError) {
      console.error('Validation error:', error.message);
    } else if (error instanceof TermiiAuthenticationError) {
      console.error('Authentication error:', error.message);
    } else if (error instanceof TermiiAPIError) {
      console.error('API error:', error.message, error.statusCode);
    } else if (error instanceof TermiiNetworkError) {
      console.error('Network error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// ============================================================================
// Example 5: Fetch campaign history
// NOTE: Replace 'YOUR_VALID_CAMPAIGN_ID' with an actual campaign ID from fetchCampaigns() result.
// ============================================================================
async function fetchCampaignHistory() {
  try {
    const result = await termii.campaign.history(CAMPAIGN_ID_PLACEHOLDER);

    console.log('Campaign history fetched', result);
  } catch (error) {
    console.error('Error fetching campaign history');
    if (error instanceof TermiiValidationError) {
      console.error('Validation error:', error.message);
    } else if (error instanceof TermiiAuthenticationError) {
      console.error('Authentication error:', error.message);
    } else if (error instanceof TermiiAPIError) {
      console.error('API error:', error.message, error.statusCode);
    } else if (error instanceof TermiiNetworkError) {
      console.error('Network error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// ============================================================================
// Example 6: Retry campaign
// NOTE: Replace 'YOUR_VALID_CAMPAIGN_ID' with an actual campaign ID that failed or is incomplete.
// ============================================================================
async function retryCampaign() {
  try {
    const result = await termii.campaign.retry(CAMPAIGN_ID_PLACEHOLDER);

    console.log('Retry campaign', result);
  } catch (error) {
    console.error('Error Retrying campaign');
    if (error instanceof TermiiValidationError) {
      console.error('Validation error:', error.message);
    } else if (error instanceof TermiiAuthenticationError) {
      console.error('Authentication error:', error.message);
    } else if (error instanceof TermiiAPIError) {
      console.error('API error:', error.message, error.statusCode);
    } else if (error instanceof TermiiNetworkError) {
      console.error('Network error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Run examples
(async () => {
  await sendRegularCampaign();
  await sendPersonalizedCampaign();
  await sendScheduledCampaign();
  await fetchCampaigns();
  await fetchCampaignHistory();
  await retryCampaign();
})();