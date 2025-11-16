import { NUMBER_MESSAGE_TYPES, TermiiClient } from '../src';
import { apiKey, baseUrl, singlePhoneNumber } from './sample-payload';

// Initialize client
const termii = new TermiiClient({
  baseUrl: baseUrl,
  apiKey: apiKey,
});

// ============================================================================
// Example 1: Send a message to a phone number
// ============================================================================
async function sendMessage() {
  try {
    const result = await termii.numberMessage.send({
      to: singlePhoneNumber,
      sms: 'Hello from Termii Number API!',
      type: NUMBER_MESSAGE_TYPES.PLAIN

    });

    console.log('Number Sent:', result);
  } catch (error) {
    console.error('Error Sending Message', error);
  }
}

// Run examples
(async () => {
  await sendMessage();
})();
