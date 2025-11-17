import { ConsoleLogger, TermiiClient } from '../src';
import { apiKey, baseUrl, singlePhoneNumber } from './sample-payload';

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

    console.log('Phonebook Fetch:', result);
  } catch (error) {
    console.error('Error Fetching phonebook', error);
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
    console.error('Error Creating Phonebook', error);
  }
}

// ============================================================================
// Example 3: Update Phonebook
// ============================================================================
async function updatePhonebook() {
  try {
    const result = await termii.phonebook.update('691b515f68ac147441352d31', {
      phonebook_name: 'Updated Phone test',
      description: 'Updated Phonebook for test',
    });

    console.log('Phonebook Updated:', result);
  } catch (error) {
    console.error('Error Updating Phonebook', error);
  }
}

// ============================================================================
// Example 4: Delete Phonebook
// ============================================================================
async function deletePhonebook() {
  try {
    const result = await termii.phonebook.delete('691b515f68ac147441352d31');

    console.log('Phonebook Deleted:', result);
  } catch (error) {
    console.error('Error Deleting Phonebook', error);
  }
}

// Run examples
(async () => {
  await fetchAllPhonebook();
  // await createPhonebook();
  // await updatePhonebook();
  // await deletePhonebook();
})();
