import { TermiiClient, CHANNELS, MESSAGE_TYPES, ConsoleLogger, TermiiValidationError, TermiiAuthenticationError, TermiiRateLimitError, TermiiAPIError, TermiiNetworkError } from '../src';
import {
  apiKey,
  baseUrl,
  multiplePhoneNumber,
  senderId,
  singlePhoneNumber,
} from './sample-payload';

// Initialize client
const termii = new TermiiClient({
  baseUrl: baseUrl,
  apiKey: apiKey,
  logger: new ConsoleLogger(),
});

// ============================================================================
// Example 1: Send single SMS
// ============================================================================
async function sendSingleSMS() {
  try {
    const result = await termii.messaging.send({
      to: singlePhoneNumber,
      from: senderId,
      sms: 'Hello from Termii SDK!',
      type: MESSAGE_TYPES.PLAIN,
      channel: CHANNELS.GENERIC,
    });

    console.log('Message sent:', result);
    console.log('Message ID:', result.message_id);
    console.log('Remaining balance:', result.balance);
  } catch (error) {
    console.error('Error sending message:');
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
// Example 2: Send to multiple recipients (up to 100)
// ============================================================================
async function sendToMultiple() {
  try {
    const result = await termii.messaging.send({
      to: multiplePhoneNumber,
      from: senderId,
      sms: 'Bulk message to selected recipients',
      type: MESSAGE_TYPES.PLAIN,
      channel: CHANNELS.GENERIC,
    });

    console.log('Message sent to multiple recipients:', result);
  } catch (error) {
    console.error('Error Sending Multiple Messages:');
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
// Example 3: Send bulk SMS (up to 10,000 recipients)
// ============================================================================
async function sendBulkSMS() {
  try {
    const result = await termii.messaging.sendBulk({
      to: multiplePhoneNumber,
      from: senderId,
      sms: 'This is a bulk message to all recipients',
      type: MESSAGE_TYPES.PLAIN,
      channel: CHANNELS.GENERIC,
    });

    console.log('Bulk message sent:', result);
    console.log('Response code:', result.code);
  } catch (error) {
    console.error('Error sending bulk message:');
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
// Example 4: Send WhatsApp message with media
// ============================================================================
async function sendWhatsAppMedia() {
  try {
    const result = await termii.messaging.sendWithMedia({
      to: singlePhoneNumber,
      from: senderId,
      type: MESSAGE_TYPES.PLAIN,
      channel: CHANNELS.WHATSAPP,
      media: {
        url: 'https://example.com/images/product.jpg',
        caption: 'Check out our new product!',
      },
    });

    console.log('WhatsApp media message sent:', result);
  } catch (error) {
    console.error('Error sending WhatsApp media:');
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
// Example 5: Send DND message (for Nigerian numbers with DND enabled)
// ============================================================================
async function sendDNDMessage() {
  try {
    const result = await termii.messaging.send({
      to: singlePhoneNumber,
      from: senderId,
      sms: 'Important message delivered via DND route',
      type: MESSAGE_TYPES.PLAIN,
      channel: CHANNELS.DND,
    });

    console.log('DND message sent:', result);
  } catch (error) {
    console.error('Error Sending DND Message:', error);
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
  await sendSingleSMS();
  await sendToMultiple();
  await sendBulkSMS();
  await sendWhatsAppMedia();
  await sendDNDMessage();
})();
