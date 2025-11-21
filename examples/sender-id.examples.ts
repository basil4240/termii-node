import {
  ConsoleLogger,
  TermiiAPIError,
  TermiiAuthenticationError,
  TermiiClient,
  TermiiNetworkError,
  TermiiRateLimitError,
  TermiiValidationError,
} from '../src';
import { apiKey, baseUrl } from './sample-payload';

// Initialize client
const termii = new TermiiClient({
  baseUrl: baseUrl,
  apiKey: apiKey,
  logger: new ConsoleLogger(),
});

// ============================================================================
// Example 1: Fetch a paginated list of Sender IDs
// ============================================================================
async function fetchSenderIds() {
  try {
    const result = await termii.senderId.fetch();

    console.log('Sender Id Fetched:', result);
  } catch (error) {
    console.error('Error Fetching Sender Id');
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
// Example 2: Request/register a new Sender ID.
// ============================================================================
async function registerSenderId() {
  try {
    const result = await termii.senderId.request({
      sender_id: 'Suuii',
      useCase: 'Sending OTPs for user authentication and verification.',
      company: 'Suuii Corp',
    });

    console.log('Sender Id Request successful:', result);
  } catch (error) {
    console.error('Error registering sender ID:');
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
  await registerSenderId();
  await fetchSenderIds();
})();
