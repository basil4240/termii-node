# Termii Node.js SDK - API Documentation

Complete API reference for the Termii Node.js SDK.

## Table of Contents

- [Client Initialization](#client-initialization)
  - [`new TermiiClient(config)`](#new-termiiclientconfig)
  - [`TermiiClient.fromEnv()`](#termiiclientfromenv)
- [Resources](#resources)
  - [Messaging](#messaging)
  - [Sender ID](#sender-id)
  - [Number](#number)
  - [Templates](#templates)
  - [Phonebook](#phonebook)
  - [Contacts](#contacts)
  - [Campaigns](#campaigns)
- [Error Handling](#error-handling)

---

## Client Initialization

The `TermiiClient` is the main entry point for interacting with the Termii API.

### `new TermiiClient(config)`

Creates a new Termii client instance.

-   **`config`**: `TermiiConfig` - The configuration object.
    -   `apiKey`: `string` - **Required**. Your Termii API key.
    -   `baseUrl?`: `string` - Optional. The base URL for API requests. Defaults to `https://api.ng.termii.com`.
    -   `timeout?`: `number` - Optional. Request timeout in milliseconds. Defaults to `30000`.
    -   `retries?`: `number` - Optional. Number of retry attempts for failed requests. Defaults to `3`.
    -   `validateInput?`: `boolean` - Optional. Enable input validation before API calls. Defaults to `true`.
    -   `logger?`: `Logger` - Optional. A custom logger instance (e.g., `console`).

**Example:**

```typescript
import { TermiiClient } from 'termii-node';

const termii = new TermiiClient({
  apiKey: 'YOUR_API_KEY',
});
```

### `TermiiClient.fromEnv()`

Creates a client instance from environment variables.

**Environment Variables:**

-   `TERMII_API_KEY`: **Required**. Your Termii API key.
-   `TERMII_BASE_URL`: Optional.

**Example:**

```typescript
import { TermiiClient } from 'termii-node';

const termii = TermiiClient.fromEnv();
```

---

## Resources

### Messaging

Accessed via `termii.messaging`.

#### `send(params)`

Sends an SMS message to a single or multiple recipients (up to 100).

-   **`params`**: `Omit<SendMessageRequest, 'api_key'>`
-   **Returns**: `Promise<SendMessageResponse>`

**Example:**

```typescript
const response = await termii.messaging.send({
  to: '2347065250817',
  from: 'YourBrand',
  sms: 'Hello from Termii SDK!',
  type: 'plain',
  channel: 'generic',
});
console.log('Message sent:', response.message_id);
```

#### `sendBulk(params)`

Sends bulk SMS messages to multiple recipients (up to 10,000).

-   **`params`**: `Omit<SendBulkMessageRequest, 'api_key'>`
-   **Returns**: `Promise<SendBulkMessageResponse>`

**Example:**

```typescript
const response = await termii.messaging.sendBulk({
  to: ['2347065250817', '2348012345678'],
  from: 'YourBrand',
  sms: 'Bulk message to all users!',
  type: 'plain',
  channel: 'generic',
});
```

#### `sendWithMedia(params)`

Sends a message with media, primarily for WhatsApp.

-   **`params`**: `Omit<SendMessageRequest, 'api_key' | 'sms'> & { media: Required<SendMessageRequest>['media'] }`
-   **Returns**: `Promise<SendMessageResponse>`

**Example:**

```typescript
const response = await termii.messaging.sendWithMedia({
  to: '2347065250817',
  from: 'YourBrand',
  type: 'plain',
  channel: 'whatsapp',
  media: {
    url: 'https://example.com/image.jpg',
    caption: 'Check out this amazing offer!',
  },
});
```

### Sender ID

Accessed via `termii.senderId`.

#### `request(params)`

Requests a new Sender ID for approval.

-   **`params`**: `Omit<RequestSenderIdRequest, 'api_key'>`
-   **Returns**: `Promise<RequestSenderIdResponse>`

**Example:**

```typescript
const response = await termii.senderId.request({
  sender_id: 'MyBrand',
  useCase: 'Customer notifications and alerts',
  company: 'My Company Ltd',
});
```

#### `fetch(params)`

Fetches a paginated list of your Sender IDs.

-   **`params?`**: `{ page?: number; size?: number; status?: SenderIdStatus }`
-   **Returns**: `Promise<FetchSenderIdResponse>`

**Example:**

```typescript
const response = await termii.senderId.fetch({ status: 'active' });
console.log(response.content);
```

### Number

Accessed via `termii.numberMessage`.

#### `send(params)`

Sends a message using Termii's auto-generated messaging numbers.

-   **`params`**: `Omit<SendNumberMessageRequest, 'api_key'>`
-   **Returns**: `Promise<SendNumberMessageResponse>`

**Example:**

```typescript
const response = await termii.numberMessage.send({
  to: '2347065250817',
  sms: 'Hello from Termii Number API!',
});
```

### Templates

Accessed via `termii.templateMessage`.

#### `send(params)`

Sends a pre-approved message template.

-   **`params`**: `Omit<SendTemplateRequest, 'api_key'>`
-   **Returns**: `Promise<SendTemplateResponse>`

**Example:**

```typescript
const response = await termii.templateMessage.send({
  phone_number: '2347065250817',
  device_id: 'YOUR_DEVICE_ID',
  template_id: 'TEMPLATE_ID_123',
  data: {
    first_name: 'John',
    code: '48291',
  },
});
```

### Phonebook

Accessed via `termii.phonebook`.

#### `fetchAll()`

Retrieves all existing phonebooks on your account.

-   **Returns**: `Promise<FetchPhonebooksResponse>`

**Example:**

```typescript
const phonebooks = await termii.phonebook.fetchAll();
console.log(phonebooks.content);
```

#### `create(params)`

Creates a new phonebook.

-   **`params`**: `CreatePhonebookRequest`
-   **Returns**: `Promise<CreatePhonebookResponse>`

**Example:**

```typescript
const response = await termii.phonebook.create({
  phonebook_name: 'VIP Customers',
  description: 'High value customers',
});
```

#### `update(phonebook_id, params)`

Modifies an existing phonebook.

-   **`phonebook_id`**: `string`
-   **`params`**: `UpdatePhonebookRequest`
-   **Returns**: `Promise<UpdatePhonebookResponse>`

**Example:**

```typescript
const response = await termii.phonebook.update('phonebook-id-123', {
  phonebook_name: 'VIP Clients',
  description: 'Premium clients',
});
```

#### `delete(phonebook_id)`

Removes a phonebook permanently.

-   **`phonebook_id`**: `string`
-   **Returns**: `Promise<DeletePhonebookResponse>`

**Example:**

```typescript
await termii.phonebook.delete('phonebook-id-123');
```

### Contacts

Accessed via `termii.contact`.

#### `fetch(phonebook_id)`

Retrieves all contacts in a specific phonebook.

-   **`phonebook_id`**: `string`
-   **Returns**: `Promise<FetchContactsResponse>`

**Example:**

```typescript
const contacts = await termii.contact.fetch('phonebook-id-123');
console.log(contacts.content);
```

#### `addSingle(params)`

Adds a single contact to a phonebook.

-   **`params`**: `AddSingleContactRequest`
-   **Returns**: `Promise<AddSingleContactResponse>`

**Example:**

```typescript
const newContact = await termii.contact.addSingle({
  pid: 'phonebook-id-123',
  phone_number: '2348012345678',
  first_name: 'John',
});
```

#### `addMultiple(params)`

Adds multiple contacts to a phonebook in a single request.

-   **`params`**: `AddMultipleContactsRequest`
-   **Returns**: `Promise<AddMultipleContactsResponse>`

**Example:**

```typescript
const response = await termii.contact.addMultiple({
  pid: 'phonebook-id-123',
  contacts: [
    { phone_number: '2348012345678', first_name: 'John' },
    { phone_number: '2349087654321', first_name: 'Jane' },
  ],
});
```

#### `delete(id)`

Deletes a specific contact.

-   **`id`**: `string` - The ID of the contact to delete.
-   **Returns**: `Promise<DeleteContactResponse>`

**Example:**

```typescript
await termii.contact.delete('contact-id-123');
```

### Campaigns

Accessed via `termii.campaign`.

#### `send(params)`

Sends a new campaign.

-   **`params`**: `SendCampaignRequest`
-   **Returns**: `Promise<SendCampaignResponse>`

**Example:**

```typescript
const response = await termii.campaign.send({
  country_code: '234',
  sender_id: 'YourBrand',
  message: 'Hello customers, enjoy 20% off this week!',
  channel: 'generic',
  message_type: 'plain',
  phonebook_id: 'phonebook-id-123',
  campaign_type: 'regular',
  schedule_sms_status: 'regular',
});
```

#### `fetchAll()`

Retrieves all campaigns.

-   **Returns**: `Promise<FetchCampaignsResponse>`

**Example:**

```typescript
const campaigns = await termii.campaign.fetchAll();
console.log(campaigns.content);
```

#### `history(campaign_id)`

Retrieves detailed history for a specific campaign.

-   **`campaign_id`**: `string`
-   **Returns**: `Promise<FetchCampaignHistoryResponse>`

**Example:**

```typescript
const history = await termii.campaign.history('campaign-id-123');
```

#### `retry(campaign_id)`

Retries sending a failed or incomplete campaign.

-   **`campaign_id`**: `string`
-   **Returns**: `Promise<RetryCampaignResponse>`

**Example:**

```typescript
await termii.campaign.retry('campaign-id-123');
```

---

## Error Handling

The SDK throws specific error classes for different scenarios, all extending from a base `TermiiError`.

-   **`TermiiValidationError`**: For invalid input parameters.
-   **`TermiiAuthenticationError`**: For authentication failures (e.g., invalid API key).
-   **`TermiiRateLimitError`**: For when the API rate limit is exceeded.
-   **`TermiiAPIError`**: For general errors returned by the Termii API.
-   **`TermiiNetworkError`**: For network or connection issues.

**Example:**

```typescript
import { TermiiClient, TermiiValidationError } from 'termii-node';

try {
  // ... API call
} catch (error) {
  if (error instanceof TermiiValidationError) {
    console.error('Validation failed:', error.message);
  } else {
    console.error('An unexpected error occurred:', error);
  }
}
```