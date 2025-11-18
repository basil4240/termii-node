import {
  ConsoleLogger,
  TermiiAPIError,
  TermiiAuthenticationError,
  TermiiClient,
  TermiiNetworkError,
  TermiiRateLimitError,
  TermiiValidationError,
} from '../src';
import { apiKey, baseUrl, singlePhoneNumber } from './sample-payload';

// Initialize client
const termii = new TermiiClient({
  baseUrl: baseUrl,
  apiKey: apiKey,
  logger: new ConsoleLogger(),
});

// ============================================================================
// Example 1: Send Template Message (No Media Attachment)
// ============================================================================
async function sendTemplateMessage() {
  try {
    const result = await termii.templateMessage.sendTemplate({
      phone_number: singlePhoneNumber,
      device_id: 'f3f4f7b0-52d8-40bc-91fc-120da11ff936',
      template_id: '1493-csdn3-ns34w-sd3434-dfdf',
      data: {
        product_name: 'Termii',
        otp: 120435,
        expiry_time: '10 minutes',
      },
    });

    console.log('Template Message Sent:', result);
  } catch (error) {
    console.error('Error Sending Message');
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
// Example 1: Send Template Message with Media Attachment
// ============================================================================
async function sendTemplateMessageWithMedia() {
  try {
    const result = await termii.templateMessage.sendTemplateWithMedia({
      phone_number: singlePhoneNumber,
      device_id: 'f3f4f7b0-52d8-40bc-91fc-120da11ff936',
      template_id: '1493-csdn3-ns34w-sd3434-dfdf',
      data: {
        name: 'Windows',
      },
      media: {
        caption: 'Document',
        url: 'https://docs.google.com/document/d/.....',
      },
    });

    console.log('Template Message WithMedia Sent:', result);
  } catch (error) {
    console.error('Error Sending Message', error);
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
  await sendTemplateMessage();
  await sendTemplateMessageWithMedia();
})();
