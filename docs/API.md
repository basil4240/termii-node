# Termii SDK API Documentation

Complete API reference for the Termii Node.js SDK.

## Table of Contents

- [Client Initialization](#client-initialization)
- [Messaging](#messaging)
  - [send()](#send)
  - [sendBulk()](#sendbulk)
  - [sendWithMedia()](#sendwithmedia)
- [Sender ID](#sender-id)
  - [request()](#request)
  - [fetch()](#fetch)
- [Number](#number)
  - [send()](#send)
- [Templates](#templates)
  - [sendTemplate()](#sendTemplate)
  - [sendTemplateWithMedia()](#sendTemplateWithMedia)
- [Phonebooks](#phonebook)
- [Types](#types)
- [Error Handling](#error-handling)

---

## Client Initialization

### `new TermiiClient(config)`

Creates a new Termii client instance.

**Parameters:**

| Name                   | Type           | Required | Description                                         |
| ---------------------- | -------------- | -------- | --------------------------------------------------- |
| `config`               | `TermiiConfig` | Yes      | Configuration object                                |
| `config.apiKey`        | `string`       | Yes      | Your Termii API key                                 |
| `config.baseUrl`       | `string`       | No       | API base URL (default: `https://api.ng.termii.com`) |
| `config.timeout`       | `number`       | No       | Request timeout in ms (default: `30000`)            |
| `config.retries`       | `number`       | No       | Number of retries (default: `3`)                    |
| `config.validateInput` | `boolean`      | No       | Enable input validation (default: `true`)           |
| `config.logger`        | `Logger`       | No       | Custom logger instance                              |

**Example:**

```typescript
import { TermiiClient } from 'termii-node';

const termii = new TermiiClient({
  apiKey: 'your-api-key',
  timeout: 30000,
  retries: 3,
});
```

### `TermiiClient.fromEnv()`

Creates a client from environment variables.

**Environment Variables:**

- `TERMII_API_KEY` (required)
- `TERMII_BASE_URL` (optional)

**Example:**

```typescript
const termii = TermiiClient.fromEnv();
```

---

## Messaging

Send SMS messages to single or multiple recipients.

### `send()`

Send an SMS message to a single recipient or multiple recipients (up to 100).

**Signature:**

```typescript
messaging.send(params: SendMessageRequest): Promise<SendMessageResponse>
```

**Parameters:**

| Name      | Type                               | Required | Description                                       |
| --------- | ---------------------------------- | -------- | ------------------------------------------------- |
| `to`      | `string \| string[]`               | Yes      | Recipient phone number(s) in international format |
| `from`    | `string`                           | Yes      | Sender ID (alphanumeric, max 11 characters)       |
| `sms`     | `string`                           | Yes      | Message content                                   |
| `type`    | `'plain' \| 'unicode'`             | Yes      | Message type                                      |
| `channel` | `'generic' \| 'dnd' \| 'whatsapp'` | Yes      | Delivery channel                                  |
| `media`   | `MediaObject`                      | No       | Media attachment (WhatsApp only)                  |

**Returns:** `Promise<SendMessageResponse>`

| Property     | Type     | Description               |
| ------------ | -------- | ------------------------- |
| `message_id` | `string` | Unique message identifier |
| `message`    | `string` | Status message            |
| `balance`    | `number` | Remaining account balance |
| `user`       | `string` | Account username          |

**Example:**

```typescript
// Single recipient
const result = await termii.messaging.send({
  to: '2347065250817',
  from: 'YourBrand',
  sms: 'Hello from Termii!',
  type: 'plain',
  channel: 'generic',
});

// Multiple recipients (max 100)
const result = await termii.messaging.send({
  to: ['2347065250817', '2348012345678'],
  from: 'YourBrand',
  sms: 'Hello everyone!',
  type: 'plain',
  channel: 'generic',
});
```

**Throws:**

- `TermiiValidationError` - Invalid input parameters
- `TermiiAuthenticationError` - Authentication failed
- `TermiiAPIError` - API error response
- `TermiiNetworkError` - Network/connection error

---

### `sendBulk()`

Send SMS messages to multiple recipients (up to 10,000).

**Signature:**

```typescript
messaging.sendBulk(params: SendBulkMessageRequest): Promise<SendBulkMessageResponse>
```

**Parameters:**

| Name      | Type                               | Required | Description                                   |
| --------- | ---------------------------------- | -------- | --------------------------------------------- |
| `to`      | `string[]`                         | Yes      | Array of recipient phone numbers (max 10,000) |
| `from`    | `string`                           | Yes      | Sender ID (alphanumeric, max 11 characters)   |
| `sms`     | `string`                           | Yes      | Message content                               |
| `type`    | `'plain' \| 'unicode'`             | Yes      | Message type                                  |
| `channel` | `'generic' \| 'dnd' \| 'whatsapp'` | Yes      | Delivery channel                              |

**Returns:** `Promise<SendBulkMessageResponse>`

| Property     | Type     | Description               |
| ------------ | -------- | ------------------------- |
| `message_id` | `string` | Unique message identifier |
| `message`    | `string` | Status message            |
| `balance`    | `number` | Remaining account balance |
| `user`       | `string` | Account username          |

**Example:**

```typescript
const recipients = [
  '2347065250817',
  '2348012345678',
  '2349087654321',
  // ... up to 10,000 numbers
];

const result = await termii.messaging.sendBulk({
  to: recipients,
  from: 'YourBrand',
  sms: 'Important announcement',
  type: 'plain',
  channel: 'generic',
});
```

**Throws:**

- `TermiiValidationError` - Invalid input or too many recipients
- `TermiiAuthenticationError` - Authentication failed
- `TermiiAPIError` - API error response
- `TermiiNetworkError` - Network/connection error

---

### `sendWithMedia()`

Send a message with media attachment via WhatsApp.

**Signature:**

```typescript
messaging.sendWithMedia(params: SendWithMediaRequest): Promise<SendMessageResponse>
```

**Parameters:**

| Name            | Type          | Required | Description                    |
| --------------- | ------------- | -------- | ------------------------------ |
| `to`            | `string`      | Yes      | Recipient phone number         |
| `from`          | `string`      | Yes      | Sender ID                      |
| `type`          | `'plain'`     | Yes      | Message type (must be 'plain') |
| `channel`       | `'whatsapp'`  | Yes      | Must be 'whatsapp'             |
| `media`         | `MediaObject` | Yes      | Media attachment               |
| `media.url`     | `string`      | Yes      | Public URL of the media file   |
| `media.caption` | `string`      | No       | Optional caption for the media |

**Returns:** `Promise<SendMessageResponse>`

**Supported Media Types:**

- Images: JPG, PNG, GIF
- Videos: MP4, 3GP
- Documents: PDF, DOC, DOCX, XLS, XLSX

**Example:**

```typescript
// Send image with caption
const result = await termii.messaging.sendWithMedia({
  to: '2347065250817',
  from: 'YourBrand',
  type: 'plain',
  channel: 'whatsapp',
  media: {
    url: 'https://example.com/promo-image.jpg',
    caption: 'Check out our latest offer!',
  },
});

// Send document
const result = await termii.messaging.sendWithMedia({
  to: '2347065250817',
  from: 'YourBrand',
  type: 'plain',
  channel: 'whatsapp',
  media: {
    url: 'https://example.com/invoice.pdf',
    caption: 'Your invoice for June 2024',
  },
});
```

**Throws:**

- `TermiiValidationError` - Invalid channel or missing media URL
- `TermiiAuthenticationError` - Authentication failed
- `TermiiAPIError` - API error response
- `TermiiNetworkError` - Network/connection error

---

## Sender ID

Manage and request Sender IDs for branding your outbound SMS messages.

### `request()`

Request a new Sender ID for approval.

**Signature:**

```typescript
senderId.request(params: RequestSenderIdRequest): Promise<RequestSenderIdResponse>
```

**Parameters:**

| Name        | Type     | Required | Description                                                          |
| ----------- | -------- | -------- | -------------------------------------------------------------------- |
| `sender_id` | `string` | Yes      | The sender ID you want to register (alphanumeric, max 11 characters) |
| `usecase`   | `string` | Yes      | Brief description of how the sender ID will be used                  |
| `company`   | `string` | Yes      | Company or organization name                                         |

**Returns:** `Promise<RequestSenderIdResponse>`

| Property  | Type     | Description          |
| --------- | -------- | -------------------- |
| `code`    | `string` | Response status code |
| `message` | `string` | Response message     |

**Example:**

```typescript
const result = await termii.senderId.request({
  sender_id: 'MyBrand',
  usecase: 'Customer notifications and alerts',
  company: 'My Company Ltd',
});

console.log(result);
// {
//   code: 'ok',
//   message: 'Sender ID request submitted successfully'
// }
```

**Throws:**

- `TermiiValidationError` - Invalid input parameters
- `TermiiAuthenticationError` - Authentication failed
- `TermiiAPIError` - API error response
- `TermiiNetworkError` - Network/connection error

---

### `fetch()`

Fetch a paginated list of Sender IDs associated with your account.

**Signature:**

```typescript
senderId.fetch(params?: {
  page?: number;
  size?: number;
  status?: SenderIdStatus;
}): Promise<FetchSenderIdResponse>
```

**Parameters:**

| Name     | Type             | Required | Description                                       |
| -------- | ---------------- | -------- | ------------------------------------------------- |
| `page`   | `number`         | No       | Page number for pagination (default 0)            |
| `size`   | `number`         | No       | Number of items per page (default 20)             |
| `status` | `SenderIdStatus` | No       | Filter by status (`pending`, `active`, `blocked`) |

**Returns:** `Promise<FetchSenderIdResponse>`

| Property        | Type              | Description                |
| --------------- | ----------------- | -------------------------- |
| `content`       | `SenderIdEntry[]` | List of sender ID entries  |
| `totalElements` | `number`          | Total number of sender IDs |
| `number`        | `number`          | Current page number        |
| `size`          | `number`          | Page size                  |
| `totalPages`    | `number`          | Total number of pages      |
| `first`         | `boolean`         | True if first page         |
| `last`          | `boolean`         | True if last page          |

**Example:**

```typescript
// Fetch all sender IDs (first page, 20 per page)
const result = await termii.senderId.fetch({
  page: 0,
  size: 20,
});

console.log(result);
// {
//   content: [
//     {
//       sender_id: 'MyBrand',
//       status: 'pending',
//       createdAt: '2024-01-12T10:20:30Z',
//       country: 'NG',
//       company: 'My Company Ltd',
//       usecase: 'Customer notifications and alerts'
//     }
//   ],
//   totalElements: 1,
//   number: 0,
//   size: 20,
//   totalPages: 1,
//   first: true,
//   last: true
// }
```

**Throws:**

- `TermiiValidationError` - Invalid input parameters
- `TermiiAuthenticationError` - Authentication failed
- `TermiiAPIError` - API error response
- `TermiiNetworkError` - Network/connection error

---

## Number

This API allows businesses send messages to customers using Termii's auto-generated messaging numbers that adapt to customers location.

### `send()`

Send a message to a phone number.

**Signature:**

```typescript
numberMessage.send(params: SendNumberMessageRequest): Promise<SendNumberMessageResponse>
```

**Parameters:**

| Name   | Type      | Required | Description                                                          |
| ------ | --------- | -------- | -------------------------------------------------------------------- |
| `to`   | `string`  | Yes      | Recipient phone number in international format (e.g., 2347065250817) |
| `sms`  | `string`  | Yes      | Message content                                                      |
| `type` | `'plain'` | No       | Message type (default `'plain'`)                                     |

**Returns:** `Promise<SendNumberMessageResponse>`

| Property     | Type     | Description               |
| ------------ | -------- | ------------------------- |
| `code`       | `string` | Response status code      |
| `message_id` | `string` | Unique message identifier |
| `message`    | `string` | Status message            |
| `balance`    | `number` | Remaining account balance |
| `user`       | `string` | Account username          |

**Example:**

```typescript
// Single recipient
const result = await termii.numberMessage.send({
  to: '2347065250817',
  sms: 'Hello from Termii Number API!',
  type: 'plain',
});
```

**Throws:**

- `TermiiValidationError` - Invalid input parameters
- `TermiiAuthenticationError` - Authentication failed
- `TermiiAPIError` - API error response
- `TermiiNetworkError` - Network/connection error

---

## Templates

Send predefined and approved message templates through Termii. Templates allow structured messaging with dynamic variables, ensuring consistency and compliance across customer communications. Templates may also include optional media attachments for richer messaging experiences.

---

### `sendTemplate()`

Send a template message **without** media.

**Signature:**

```typescript
templateMessage.sendTemplate(params: SendTemplateRequest): Promise<SendTemplateResponse>
```

**Parameters:**

| Name           | Type                  | Required | Description                                      |
| -------------- | --------------------- | -------- | ------------------------------------------------ |
| `phone_number` | `string`              | Yes      | Recipient's phone number in international format |
| `device_id`    | `string`              | Yes      | Device ID associated with your Termii account    |
| `template_id`  | `string`              | Yes      | Template identifier from your Termii dashboard   |
| `data`         | `Record<string, any>` | Yes      | Dynamic fields required by the template          |

**Returns:** `Promise<SendTemplateResponse>`

| Property     | Type     | Description                      |
| ------------ | -------- | -------------------------------- |
| `message_id` | `string` | Unique ID for the sent message   |
| `status`     | `string` | Message delivery status          |
| `message`    | `string` | Description of the API result    |
| `balance`    | `number` | Remaining Termii account balance |
| `user`       | `string` | Your Termii username             |

**Example:**

```typescript
const result = await termii.templateMessage.sendTemplate({
  phone_number: '2347065250817',
  device_id: 'DEV_001',
  template_id: 'TMP_2001',
  data: {
    first_name: 'John',
    code: '48291',
  },
});
```

**Throws:**

- `TermiiValidationError` - Missing required fields or invalid phone number
- `TermiiAuthenticationError` - Invalid API key or unauthorized access
- `TermiiAPIError` - Termii API returned an error response
- `TermiiNetworkError` - Network or connectivity issue

---

### `sendTemplateWithMedia()`

Send a template message with media, such as images, videos, or documents.

**Signature:**

```typescript
templateMessage.sendTemplateWithMedia(params: SendTemplateWithMediaRequest): Promise<SendTemplateResponse>
```

**Parameters:**

| Name            | Type                  | Required | Description                        |
| --------------- | --------------------- | -------- | ---------------------------------- |
| `phone_number`  | `string`              | Yes      | Recipient's phone number           |
| `device_id`     | `string`              | Yes      | Device ID tied to your account     |
| `template_id`   | `string`              | Yes      | Approved Termii template ID        |
| `data`          | `Record<string, any>` | Yes      | Template variable values           |
| `media`         | `MediaObject`         | Yes      | Media payload (URL + caption)      |
| `media.url`     | `string`              | Yes      | URL pointing to the media file     |
| `media.caption` | `string`              | Yes      | Caption that accompanies the media |

**Returns:** `Promise<SendTemplateResponse>`

Same return structure as `sendTemplate()`.

**Supported Media Types:**

| Category  | Types          |
| --------- | -------------- |
| Images    | JPG, JPEG, PNG |
| Documents | PDF, DOC, DOCX |
| Videos    | MP4, 3GP       |

Media must be hosted on a publicly accessible URL.

**Example:**

```typescript
const result = await termii.templateMessage.sendTemplateWithMedia({
  phone_number: '2348098765432',
  device_id: 'DEV_002',
  template_id: 'TMP_3002',
  data: {
    customer_name: 'Mary',
    invoice_number: 'INV-9033',
  },
  media: {
    url: 'https://example.com/invoice.pdf',
    caption: 'Invoice INV-9033',
  },
});
```

**Throws:**

- `TermiiValidationError` - Missing media, invalid template data, or missing required arguments
- `TermiiAuthenticationError` - API key invalid or unauthorized
- `TermiiAPIError` - Error response returned from Termii servers
- `TermiiNetworkError` - Connection issue or timeout

---

### Template Data Requirements

Each template in your Termii dashboard defines required variables. Your request must include all variables in the `data` object.

**Example Template:**

```
Hello {{first_name}}, your verification code is {{code}}.
```

**Matching Request Body:**

```json
{
  "first_name": "John",
  "code": "48291"
}
```

---

### When to Use Templates

Templates are ideal for:

- OTP / Verification codes
- Payment confirmations
- Delivery updates
- Account activity alerts
- Automated WhatsApp messages
- Invoice and document delivery
- Transaction updates

Templates ensure brand consistency and reduce message composition errors.

---

### Notes

- Templates must be created and approved in the Termii dashboard.
- Only approved templates can be sent.
- Dynamic fields are validated by Termii; missing fields will cause an error.
- Media messages may incur higher routing costs depending on channel support.

---

### Example Use Cases

**Verification Code Message:**

```typescript
await termii.templateMessage.sendTemplate({
  phone_number: '2348012345678',
  device_id: 'DEV_992',
  template_id: 'VERIFY_101',
  data: { name: 'Samuel', code: '55221' },
});
```

**Invoice Delivery With Media:**

```typescript
await termii.templateMessage.sendTemplateWithMedia({
  phone_number: '2348098765432',
  device_id: 'DEV_992',
  template_id: 'INV_300',
  data: { customer_name: 'Mary', invoice_number: 'INV-9033' },
  media: {
    url: 'https://example.com/invoice.pdf',
    caption: 'Your Invoice INV-9033',
  },
});
```

Templates offer a reliable, scalable way to automate structured communication while ensuring message consistency and approval compliance.

## Phonebook

Manage and organize customer groups for messaging and segmentation. The Phonebook API lets you **create**, **list**, **update**, and **delete** phonebooks on your Termii account.

---

### `fetchAll()`

Retrieve all phonebooks created on your Termii account.

**Signature:**
```typescript
phonebook.fetchAll(): Promise<FetchPhonebooksResponse>
```

**Returns:** `Promise<FetchPhonebooksResponse>`

| Property | Type | Description |
|----------|------|-------------|
| `content` | `PhonebookEntry[]` | List of phonebooks |
| `pageable` | `Pageable` | Pagination metadata |
| `totalPages` | `number` | Total pages |
| `totalElements` | `number` | Total number of phonebooks |
| `size` | `number` | Page size |
| `number` | `number` | Current page index |
| `empty` | `boolean` | Indicates if page contains no data |

**Example:**
```typescript
const phonebooks = await termii.phonebook.fetchAll();
// phonebooks.content[0] = {
//   id: "c3d32e8b-22f2-4dfb-af45-84a1cb8916fb",
//   name: "Customers",
//   total_number_of_contacts: 420,
//   date_created: "2023-08-10T12:45:00Z"
// }
```

**Throws:**
- `TermiiAuthenticationError` - Authentication failed
- `TermiiAPIError` - API error response
- `TermiiNetworkError` - Network/connection error

---

### `create()`

Create a new phonebook for storing contacts.

**Signature:**
```typescript
phonebook.create(params: CreatePhonebookRequest): Promise<CreatePhonebookResponse>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phonebook_name` | `string` | Yes | Name of the phonebook |
| `description` | `string` | No | Optional phonebook description |

**Returns:** `Promise<CreatePhonebookResponse>`

| Property | Type | Description |
|----------|------|-------------|
| `message` | `string` | Status message |
| `status` | `string` | Operation result |

**Example:**
```typescript
const result = await termii.phonebook.create({
  phonebook_name: "VIP Customers",
  description: "High-value customers",
});
// {
//   message: "Phonebook created successfully",
//   status: "success"
// }
```

**Throws:**
- `TermiiValidationError` - Missing required fields
- `TermiiAuthenticationError` - Authentication failed
- `TermiiAPIError` - API error response

---

### `update()`

Update an existing phonebook's name or description.

**Signature:**
```typescript
phonebook.update(id: string, params: UpdatePhonebookRequest): Promise<UpdatePhonebookResponse>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phonebook_name` | `string` | Yes | Updated phonebook name |
| `description` | `string` | Yes | Updated description |

**Returns:** `Promise<UpdatePhonebookResponse>`

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Phonebook ID |
| `name` | `string` | Updated name |
| `description` | `string` | Updated description |
| `numberOfContacts` | `number` | Count of contacts |
| `temp` | `boolean` | Indicates temporary phonebook |
| `createdAt` | `string` | Timestamp |
| `updatedAt` | `string` | Timestamp |

**Example:**
```typescript
const updated = await termii.phonebook.update("pb_123", {
  phonebook_name: "Engaged Leads",
  description: "Contacts who frequently interact",
});
```

**Throws:**
- `TermiiValidationError` - Invalid input parameters
- `TermiiAuthenticationError` - Authentication failed
- `TermiiAPIError` - API error response

---

### `delete()`

Delete a phonebook by ID.

**Signature:**
```typescript
phonebook.delete(id: string): Promise<DeletePhonebookResponse>
```

**Returns:** `Promise<DeletePhonebookResponse>`

| Property | Type | Description |
|----------|------|-------------|
| `message` | `string` | Status confirming deletion |

**Example:**
```typescript
await termii.phonebook.delete("pb_12345");
// {
//   message: "Phonebook deleted successfully"
// }
```

**Throws:**
- `TermiiAuthenticationError` - Authentication failed
- `TermiiAPIError` - API error response

---

### Notes and Behavior

- Termii phonebooks help you segment users for targeted communication.
- Fetch endpoint returns full pagination metadata.
- Deleting a phonebook does not delete the contacts themselves unless removed separately.
- Phonebook IDs are UUIDs.
- Creating or updating a phonebook requires minimal fields, making it easily automatable.

---

## Types

### Core Types

```typescript
interface TermiiConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  validateInput?: boolean;
  logger?: Logger;
}

interface Logger {
  debug(message: string, meta?: any): void;
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
}
```

### Messaging Types

```typescript
interface SendMessageRequest {
  to: string | string[];
  from: string;
  sms: string;
  type: 'plain' | 'unicode';
  channel: 'generic' | 'dnd' | 'whatsapp';
  media?: MediaObject;
}

interface SendBulkMessageRequest {
  to: string[];
  from: string;
  sms: string;
  type: 'plain' | 'unicode';
  channel: 'generic' | 'dnd' | 'whatsapp';
}

interface SendMessageResponse {
  message_id: string;
  message: string;
  balance: number;
  user: string;
}

interface SendBulkMessageResponse {
  message_id: string;
  message: string;
  balance: number;
  user: string;
}

interface MediaObject {
  url: string;
  caption?: string;
}
```

---

## Error Handling

All errors extend from the base `TermiiError` class.

### Error Classes

#### `TermiiValidationError`

Thrown when input validation fails.

```typescript
try {
  await termii.messaging.send({
    /* invalid params */
  });
} catch (error) {
  if (error instanceof TermiiValidationError) {
    console.error('Validation failed:', error.message);
  }
}
```

#### `TermiiAuthenticationError`

Thrown for authentication failures (HTTP 401, 403).

```typescript
try {
  await termii.messaging.send(params);
} catch (error) {
  if (error instanceof TermiiAuthenticationError) {
    console.error('Invalid API key:', error.message);
  }
}
```

#### `TermiiRateLimitError`

Thrown when rate limit is exceeded (HTTP 429).

```typescript
try {
  await termii.messaging.send(params);
} catch (error) {
  if (error instanceof TermiiRateLimitError) {
    console.error('Rate limit exceeded. Retry after:', error.retryAfter);
  }
}
```

#### `TermiiAPIError`

Thrown for API errors (HTTP 4xx, 5xx).

```typescript
try {
  await termii.messaging.send(params);
} catch (error) {
  if (error instanceof TermiiAPIError) {
    console.error('API error:', error.message);
    console.error('Status code:', error.statusCode);
    console.error('Response:', error.response);
  }
}
```

#### `TermiiNetworkError`

Thrown for network/connection errors.

```typescript
try {
  await termii.messaging.send(params);
} catch (error) {
  if (error instanceof TermiiNetworkError) {
    console.error('Network error:', error.message);
  }
}
```

---

## Rate Limits

Termii enforces rate limits on API requests:

- **Default**: 100 requests per minute
- **Burst**: Up to 200 requests per minute for short periods

The SDK automatically retries failed requests with exponential backoff.

---

## Best Practices

1. **Use Environment Variables**: Store API keys securely
2. **Handle Errors Gracefully**: Implement proper error handling
3. **Validate Phone Numbers**: Ensure numbers are in international format
4. **Use Bulk Methods**: For sending to multiple recipients
5. **Monitor Balance**: Check your balance regularly
6. **Test in Staging**: Test with test credentials before production

---

## Support

For questions or issues:

- 📧 Email: basil@gmail.com
- 💬 Issues: [GitHub Issues](https://github.com/basil4240/termii-node/issues)
- 🌐 Termii Docs: [https://developers.termii.com](https://developers.termii.com)
