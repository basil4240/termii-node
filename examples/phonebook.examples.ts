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
// Example 1: Fetch phonebook
// ============================================================================
async function fetchAllPhonebook() {
  try {
    const result = await termii.phonebook.fetchAll();

    console.log('Phonebook Fetched:', result);
  } catch (error) {
    console.error('Error Fetching phonebook');
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
// Example 2: Create Phonebook
// ============================================================================
async function createPhonebook() {
  try {
    const result = await termii.phonebook.create({
      phonebook_name: 'Phone test',
      description: 'Phonebook for test',
    });

    console.log('Phonebook Created:', result);
  } catch (error) {
    console.error('Error Creating Phonebook');
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
// Example 3: Update Phonebook
// NOTE: Replace '691b515f68ac147441352d31' with a valid phonebook ID from your Termii account.
// ============================================================================
async function updatePhonebook() {
  try {
    const result = await termii.phonebook.update('691b515f68ac147441352d31', {
      phonebook_name: 'Updated Phone test',
      description: 'Updated Phonebook for test',
    });

    console.log('Phonebook Updated:', result);
  } catch (error) {
    console.error('Error Updating Phonebook');
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
// Example 4: Delete Phonebook
// NOTE: Replace '691b515f68ac147441352d31' with a valid phonebook ID from your Termii account.
// ============================================================================
async function deletePhonebook() {
  try {
    const result = await termii.phonebook.delete('691b515f68ac147441352d31');

    console.log('Phonebook Deleted:', result);
  } catch (error) {
    console.error('Error Deleting Phonebook');
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
  await fetchAllPhonebook();
  await createPhonebook();
  await updatePhonebook();
  await deletePhonebook();
})();
