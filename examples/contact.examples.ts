import path from 'path';
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
// Example 1: Fetch contacts by phonebook ID
// ============================================================================
async function fetchContact() {
  try {
    const result = await termii.contact.fetch('691dfb5d36e83f18898bd72e');

    console.log('Contact Fetched:', result);
  } catch (error) {
    console.error('Error Fetching contact');
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
async function addSingleContact() {
  try {
    const result = await termii.contact.addSingle({
      phone_number: '8123696237',
      email_address: 'test@gmail.com',
      pid: '691dfb5d36e83f18898bd72e',
      first_name: 'test',
      last_name: 'contact',
      company: 'Termii',
      country_code: '234',
    });

    console.log('Contact Added:', result);
  } catch (error) {
    console.error('Error adding contact');
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
// ============================================================================
async function addMultipleContact() {
  try {
    const result = await termii.contact.addMultipleBulk({
      file: path.join(__dirname, 'sample-contacts.csv'),
      pid: '691dfb5d36e83f18898bd72e',
      country_code: '234',
    });

    console.log('Multiple contacts Added', result);
  } catch (error) {
    console.error('Error adding Multiple contacts');
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
// ============================================================================
async function deleteContact() {
  try {
    const result = await termii.contact.delete('691dfb5d36e83f18898bd72e');

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
  await fetchContact();
  await addSingleContact();
  await addMultipleContact();
  await deleteContact();
})();
