# Termii SDK API Documentation

Complete API reference for the Termii Node.js SDK.

## Table of Contents

- [Client Initialization](#client-initialization)
- [Messaging](#messaging)
  - [send()](#send)
  - [sendBulk()](#sendbulk)
  - [sendWithMedia()](#sendwithmedia)
- [Sender ID](#sender-id) *(Coming Soon)*
- [Phone Numbers](#phone-numbers) *(Coming Soon)*
- [Templates](#templates) *(Coming Soon)*
- [Phonebooks](#phonebooks) *(Coming Soon)*
- [Types](#types)
- [Error Handling](#error-handling)

---

## Client Initialization

### `new TermiiClient(config)`

Creates a new Termii client instance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `config` | `TermiiConfig` | Yes | Configuration object |
| `config.apiKey` | `string` | Yes | Your Termii API key |
| `config.baseUrl` | `string` | No | API base URL (default: `https://api.ng.termii.com`) |
| `config.timeout` | `number` | No | Request timeout in ms (default: `30000`) |
| `config.retries` | `number` | No | Number of retries (default: `3`) |
| `config.validateInput` | `boolean` | No | Enable input validation (default: `true`) |
| `config.logger` | `Logger` | No | Custom logger instance |

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

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `to` | `string \| string[]` | Yes | Recipient phone number(s) in international format |
| `from` | `string` | Yes | Sender ID (alphanumeric, max 11 characters) |
| `sms` | `string` | Yes | Message content |
| `type` | `'plain' \| 'unicode'` | Yes | Message type |
| `channel` | `'generic' \| 'dnd' \| 'whatsapp'` | Yes | Delivery channel |
| `media` | `MediaObject` | No | Media attachment (WhatsApp only) |

**Returns:** `Promise<SendMessageResponse>`

| Property | Type | Description |
|----------|------|-------------|
| `message_id` | `string` | Unique message identifier |
| `message` | `string` | Status message |
| `balance` | `number` | Remaining account balance |
| `user` | `string` | Account username |

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

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `to` | `string[]` | Yes | Array of recipient phone numbers (max 10,000) |
| `from` | `string` | Yes | Sender ID (alphanumeric, max 11 characters) |
| `sms` | `string` | Yes | Message content |
| `type` | `'plain' \| 'unicode'` | Yes | Message type |
| `channel` | `'generic' \| 'dnd' \| 'whatsapp'` | Yes | Delivery channel |

**Returns:** `Promise<SendBulkMessageResponse>`

| Property | Type | Description |
|----------|------|-------------|
| `message_id` | `string` | Unique message identifier |
| `message` | `string` | Status message |
| `balance` | `number` | Remaining account balance |
| `user` | `string` | Account username |

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

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `to` | `string` | Yes | Recipient phone number |
| `from` | `string` | Yes | Sender ID |
| `type` | `'plain'` | Yes | Message type (must be 'plain') |
| `channel` | `'whatsapp'` | Yes | Must be 'whatsapp' |
| `media` | `MediaObject` | Yes | Media attachment |
| `media.url` | `string` | Yes | Public URL of the media file |
| `media.caption` | `string` | No | Optional caption for the media |

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

*(Coming Soon)*

Documentation for sender ID management will be added here.

---

## Phone Numbers

*(Coming Soon)*

Documentation for phone number operations will be added here.

---

## Templates

*(Coming Soon)*

Documentation for template management will be added here.

---

## Phonebooks

*(Coming Soon)*

Documentation for phonebook operations will be added here.

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
  await termii.messaging.send({ /* invalid params */ });
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