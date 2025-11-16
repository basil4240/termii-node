import { TermiiClient, CHANNELS, MESSAGE_TYPES } from '../src';
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
    console.error('Error sending message:', error);
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
    console.error('Error:', error);
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
    console.error('Error sending bulk message:', error);
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
    console.error('Error sending WhatsApp media:', error);
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
    console.error('Error:', error);
  }
}

// Run examples
(async () => {
  await sendSingleSMS();
  // await sendToMultiple();
  // await sendBulkSMS();
  // await sendWhatsAppMedia();
  // await sendDNDMessage();
})();
