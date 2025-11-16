import { TermiiClient } from '../src';
import { apiKey, baseUrl } from './sample-payload';

// Initialize client
const termii = new TermiiClient({
  baseUrl: baseUrl,
  apiKey: apiKey,
});

// ============================================================================
// Example 1: Fetch a paginated list of Sender IDs
// ============================================================================
async function fetchSenderIds() {
  try {
    const result = await termii.senderId.fetch();

    console.log('Sender Id Fetched:', result);
  } catch (error) {
    console.error('Error Fetching Sender Id', error);
  }
}

// ============================================================================
// Example 2: Request/register a new Sender ID.
// ============================================================================
async function registerSenderId() {
  try {
    const result = await termii.senderId.request({
      sender_id: 'Suuii',
      useCase: 'Your OTP code is:',
      company: 'Suuii Corp',
    });

    console.log('Sender Id Request successful:', result);
  } catch (error) {
    console.error('Error:', (error as any)?.details);
  }
}

// Run examples
(async () => {
  await registerSenderId();
  await fetchSenderIds();
})();
