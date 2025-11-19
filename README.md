# Termii Node.js SDK

[![npm version](https://badge.fury.io/js/%40basil4240%2Ftermii-node.svg)](https://badge.fury.io/js/%40basil4240%2Ftermii-node)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)



Node.js SDK for the [Termii API](https://termii.com). Send SMS, verify phone numbers, and manage messaging at scale with a simple, type-safe interface.

## Features

- ✅ **Type-safe** - Full TypeScript support with comprehensive type definitions
- 🚀 **Easy to use** - Simple, intuitive API that follows best practices
- 🔄 **Automatic retries** - Built-in retry logic with exponential backoff
- 📝 **Detailed logging** - Optional logging for debugging and monitoring
- ✨ **Input validation** - Validates all inputs before making API calls
- 🎯 **Promise-based** - Modern async/await support
- 🧪 **Well tested** - Comprehensive test coverage
- 📚 **Great documentation** - Detailed docs with examples

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Authentication](#authentication)
- [Usage](#usage)
  - [Messaging](#messaging)
  - [Sender ID](#sender-id)
  - [Number](#number)
  - [Templates](#templates)
  - [Phonebooks](#phonebook)
  - [Contacts](#contacts)
  - [Campaigns](#campaigns)
  - [Token](#token) _(Coming Soon)_
  - [Insights](#insight) _(Coming Soon)_
  - [Conversations](#conversation) _(Coming Soon)_
- [Configuration](#configuration)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install termii-node
```

or

```bash
yarn add termii-node
```

## Quick Start

```typescript
import { TermiiClient } from 'termii-node';

// Initialize the client
const termii = new TermiiClient({
  apiKey: 'your-api-key-here',
});

// Send an SMS
async function sendMessage() {
  try {
    const result = await termii.messaging.send({
      to: '2347065250817',
      from: 'YourBrand',
      sms: 'Hello from Termii SDK!',
      type: 'plain',
      channel: 'generic',
    });

    console.log('Message sent:', result.message_id);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

sendMessage();
```

## Authentication

Get your API key from your [Termii Dashboard](https://accounts.termii.com/#/login).

### Using API Key Directly

```typescript
const termii = new TermiiClient({
  apiKey: 'your-api-key-here',
});
```

### Using Environment Variables

```typescript
// Set environment variable
// TERMII_API_KEY=your-api-key-here

const termii = TermiiClient.fromEnv();
```

**.env file:**

```env
TERMII_API_KEY=your-api-key-here
TERMII_BASE_URL=https://api.ng.termii.com  # Optional
```

## Usage

### Messaging

Send SMS messages to single or multiple recipients.

#### Send Single Message

```typescript
const result = await termii.messaging.send({
  to: '2347065250817',
  from: 'YourBrand',
  sms: 'Hello from Termii!',
  type: 'plain',
  channel: 'generic',
});

console.log(result);
// {
//   code: 'ok',
//   message_id: '9122821270554876574',
//   message: 'Successfully Sent',
//   balance: 9,
//   user: 'your_username',
//   message_id_str: '3017630758537652201857972'
// }
```

#### Send to Multiple Recipients

Send the same message to up to 100 recipients:

```typescript
const result = await termii.messaging.send({
  to: ['2347065250817', '2348012345678', '2349087654321'],
  from: 'YourBrand',
  sms: 'Hello everyone!',
  type: 'plain',
  channel: 'generic',
});
```

#### Send Bulk Messages

Send messages to up to 10,000 recipients:

```typescript
const recipients = [
  '2347065250817',
  '2348012345678',
  // ... up to 10,000 numbers
];

const result = await termii.messaging.sendBulk({
  to: recipients,
  from: 'YourBrand',
  sms: 'Important announcement to all users',
  type: 'plain',
  channel: 'generic',
});
```

#### Send Media Messages (WhatsApp)

Send images, videos, or documents via WhatsApp:

```typescript
const result = await termii.messaging.sendWithMedia({
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

#### Message Types

- `plain` - Regular text message
- `unicode` - Messages with special characters (emojis, non-Latin scripts)

#### Available Channels

- `generic` - Standard SMS routing
- `dnd` - For reaching DND-enabled numbers
- `whatsapp` - Send via WhatsApp Business API

### Sender ID

Manage and request Sender IDs for branding your outbound SMS messages.

#### Request Sender ID

Create a new Sender ID request for approval:

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

#### Fetch Sender IDs

Fetch paginated Sender IDs associated with your account (supports page, size and status filters):

```typescript
const result = await termii.senderId.fetch({
  page: 0,
  size: 20,
  status: SENDER_ID_STATUS.PENDING,
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

#### Fetch Sender IDs by Status

Filter Sender IDs by status (`pending`, `active`, `blocked`):

```typescript
const result = await termii.senderId.fetch({
  status: SENDER_ID_STATUS.ACTIVE,
});

console.log(result);
// {
//   content: [
//     {
//       sender_id: 'MyBrand',
//       status: 'active',
//       createdAt: '2024-01-12T10:20:30Z',
//       country: 'NG'
//     }
//   ],
//   totalElements: 1,
//   number: 0,
//   size: 20
// }
```

#### Sender ID Status Values

- `pending` - Awaiting approval
- `active` - Approved and available for use
- `blocked` - Rejected or blocked by the Termii team

### Number

This API allows businesses send messages to customers using Termii's auto-generated messaging numbers that adapt to customers location.

#### Send Message

Send a single message to a phone number:

```typescript
const result = await termii.numberMessage.send({
  to: '2347065250817',
  sms: 'Hello from Termii Number API!',
  type: 'plain',
});

console.log(result);
// {
//   code: 'ok',
//   message_id: '9122821270554876574',
//   message: 'Successfully Sent',
//   balance: 9,
//   user: 'your_username'
// }
```

#### Message Types

- `plain` - Regular text message

### Templates

Send pre-approved messaging templates to users via Termii's template engine. Templates allow you to send structured, reusable messages with dynamic variables with or without media attachments.

#### Send Template Message

Send a template message without media:

```typescript
const result = await termii.templateMessage.sendTemplate({
  phone_number: '2347065250817',
  device_id: 'YOUR_DEVICE_ID',
  template_id: 'TEMPLATE_ID_123',
  data: {
    first_name: 'John',
    code: '48291',
  },
});

console.log(result);
// {
//   message_id: "9122821270554876574",
//   status: "success",
//   message: "Template message sent",
//   balance: 9,
//   user: "your_username"
// }
```

#### Send Template Message With Media

Send a template message with an image, document, video, or other supported media type:

```typescript
const result = await termii.templateMessage.sendTemplateWithMedia({
  phone_number: '2347065250817',
  device_id: 'YOUR_DEVICE_ID',
  template_id: 'TEMPLATE_ID_123',
  data: {
    first_name: 'Jane',
    order_id: 'ORD-9981',
  },
  media: {
    url: 'https://example.com/invoice.pdf',
    caption: 'Your order invoice',
  },
});
```

#### Template Data Parameters

Template variables (data) must match the structure defined in your Termii dashboard template.

Example template:

```
Hello {{first_name}}, your verification code is {{code}}.
```

Your request must include:

```json
{
  "first_name": "John",
  "code": "48291"
}
```

#### Supported Media Types

- **Images**: jpg, jpeg, png
- **Documents**: pdf, doc, docx
- **Videos**: mp4, 3gp
- Others supported based on WhatsApp business media rules

#### When to Use Templates

Templates are ideal for:

- OTP notifications
- Order confirmations
- Account alerts
- Automated customer updates
- Structured WhatsApp messages
- Any message requiring parameterized content

#### Termii Template API Requirements

- Templates must be created and approved in the Termii Dashboard
- `template_id` is assigned by Termii upon approval
- All dynamic fields must be passed in the `data` object
- Sending a template without all required fields will cause a validation error

### Phonebook

Manage contact groups used for messaging, segmentation, and campaign targeting. The Phonebook API allows you to create, update, fetch, and delete phonebooks.

#### Fetch All Phonebooks

Retrieve all existing phonebooks on your Termii account:
```typescript
const result = await termii.phonebook.fetchAll();

console.log(result);
// {
//   page: 1,
//   total_pages: 1,
//   phonebooks: [
//     {
//       phonebook_id: "pb_12345",
//       phonebook_name: "Customers",
//       description: "All active customers",
//       contacts: 1200
//     }
//   ]
// }
```

#### Create Phonebook

Create a new phonebook for storing and grouping contacts:
```typescript
const result = await termii.phonebook.create({
  phonebook_name: "VIP Customers",
  description: "High value customers",
});

console.log(result);
// {
//   phonebook_id: "pb_83920",
//   message: "Phonebook created successfully"
// }
```

#### Update Phonebook

Modify the name or description of an existing phonebook:
```typescript
const result = await termii.phonebook.update("pb_83920", {
  phonebook_name: "VIP Clients",
  description: "Premium clients with high transaction value",
});

console.log(result);
// {
//   phonebook_id: "pb_83920",
//   message: "Phonebook updated successfully"
// }
```

#### Delete Phonebook

Remove a phonebook permanently from your Termii account:
```typescript
await termii.phonebook.delete("pb_83920");
// No content returned.
// Phonebook removed successfully.
```

## Configuration

Customize the SDK behavior with configuration options:

```typescript
const termii = new TermiiClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.ng.termii.com', // Optional: Custom API endpoint
  timeout: 30000, // Optional: Request timeout in ms (default: 30000)
  retries: 3, // Optional: Number of retries (default: 3)
  validateInput: true, // Optional: Validate inputs before API calls (default: true)
  logger: {
    // Optional: Custom logger
    debug: (message, meta) => console.debug(message, meta),
    info: (message, meta) => console.info(message, meta),
    warn: (message, meta) => console.warn(message, meta),
    error: (message, meta) => console.error(message, meta),
  },
});
```

### Contacts

Manage your phonebook contacts: add, fetch, bulk upload, and delete contacts.

#### Fetch Contacts

Retrieve all contacts in a specific phonebook:
```typescript
const contacts = await termii.contact.fetch("phonebook_id_123");

console.log(contacts.content);
// [
//   {
//     id: "c1d2e3f4",
//     pid: "phonebook_id_123",
//     phone_number: "2348012345678",
//     contact_list_key_value: [
//       { key: "first_name", value: "John" },
//       { key: "last_name", value: "Doe" },
//     ]
//   },
//   ...
// ]
```

#### Add Contact

Add a single contact to a phonebook:
```typescript
const newContact = await termii.contact.addSingle({
  pid: "phonebook_id_123",
  phone_number: "2348012345678",
  first_name: "John",
  last_name: "Doe",
  email_address: "john.doe@example.com",
  company: "Acme Inc."
});

console.log(newContact);
// {
//   id: "c1d2e3f4",
//   phone_number: "2348012345678",
//   first_name: "John",
//   last_name: "Doe",
//   email_address: "john.doe@example.com",
//   company: "Acme Inc.",
//   created_at: "2025-11-18T12:34:56Z",
//   updated_at: "2025-11-18T12:34:56Z"
// }
```

#### Bulk Upload Contacts

Upload multiple contacts using a CSV file:
```typescript
const uploadResult = await termii.contact.addMultipleBulkF({
  pid: "phonebook_id_123",
  country_code: "234",
  file: csvFile, // File object or Blob
});

console.log(uploadResult);
// { message: "Contacts uploaded successfully" }
```

#### Delete Contact

Delete a specific contact from a phonebook:
```typescript
const deleted = await termii.contact.delete({
  pid: "phonebook_id_123",
  id: "c1d2e3f4",
});

console.log(deleted);
// {
//   code: 200,
//   data: { message: "Contact deleted successfully" },
//   message: "Contact deleted successfully",
//   status: "success"
// }
```

#### Notes

- `phone_number` must be in international format
- `pid` refers to the Phonebook ID the contact belongs to
- Bulk uploads require a CSV file with the correct headers matching Termii contact fields


### Campaigns

Create and manage SMS campaigns sent to contacts saved in your Termii phonebook. You can send regular or personalized messages, schedule them, enable link tracking, and view campaign history.

#### Send Campaign

Send an SMS campaign to a phonebook group:
```typescript
const result = await termii.campaign.send({
  country_code: "234",
  sender_id: "YourBrand",
  message: "Hello customers, enjoy 20% off this week!",
  channel: "generic",
  message_type: "plain",
  phonebook_id: "5f1e8e...",
  enable_link_tracking: true,
  campaign_type: "regular",
  schedule_sms_status: "regular",
});

console.log(result);
// {
//   message: "Your campaign has been scheduled",
//   campaignId: "dcf2b2b3-af63-41f0-82d6-32956543c4d1",
//   status: "success"
// }
```

#### Personalised Campaign Example
```typescript
await termii.campaign.send({
  country_code: "234",
  sender_id: "YourBrand",
  message: "Hello {{name}}, your balance is {{balance}}",
  channel: "generic",
  message_type: "plain",
  phonebook_id: "5f1e8e...",
  delimiter: "{{}}",
  campaign_type: "personalized",
  schedule_sms_status: "regular",
});
```

#### Scheduled Campaign Example
```typescript
await termii.campaign.send({
  country_code: "234",
  sender_id: "BrandX",
  message: "Tomorrow is the deadline!",
  channel: "dnd",
  message_type: "plain",
  phonebook_id: "group123",
  schedule_sms_status: "scheduled",
  schedule_time: "2025-10-23 14:30",
});
```

#### Fetch All Campaigns

Retrieve all campaigns with pagination support:
```typescript
const campaigns = await termii.campaign.fetchAll();

console.log(campaigns.content);
// [
//   {
//     campaign_id: "d89230f...",
//     run_at: "2024-01-15T08:00:00Z",
//     status: "completed",
//     phone_book: "Customers",
//     total_recipients: 1500,
//     ...
//   },
//   ...
// ]
```

#### Fetch Campaign History

Retrieve detailed analytics, delivery stats, and metadata for a specific campaign:
```typescript
const history = await termii.campaign.history("d89230f...");

console.log(history);
// {
//   campaignId: "...",
//   phonebookName: "VIP Customers",
//   message: "Hello VIP customer...",
//   totalRecipient: 150,
//   totalDelivered: 142,
//   totalFailed: 8,
//   cost: 450,
//   runAt: "2024-02-10T17:30:00Z",
//   status: "completed"
// }
```

#### Retry Campaign

Retry sending a failed or incomplete campaign:
```typescript
const retry = await termii.campaign.retry("d89230f...");

console.log(retry);
// {
//   message: "Campaign has been sent",
//   status: "success"
// }
```

#### Campaign Message Types

- `plain` - Standard text messages
- `unicode` - Supports emojis and multilingual scripts

#### Campaign Channels

- `generic` - Default route for SMS delivery
- `dnd` - Attempts delivery to DND-enabled numbers

#### Campaign Types

- `regular` - Standard message sent to all recipients
- `personalized` - Message fields dynamically replaced per contact

#### Scheduling

- `regular` - Sends immediately
- `scheduled` - Sends at `schedule_time` provided

### Configuration Options

| Option          | Type      | Default                     | Description                                     |
| --------------- | --------- | --------------------------- | ----------------------------------------------- |
| `apiKey`        | `string`  | **Required**                | Your Termii API key                             |
| `baseUrl`       | `string`  | `https://api.ng.termii.com` | API base URL                                    |
| `timeout`       | `number`  | `30000`                     | Request timeout in milliseconds                 |
| `retries`       | `number`  | `3`                         | Number of automatic retries for failed requests |
| `validateInput` | `boolean` | `true`                      | Validate inputs before making API calls         |
| `logger`        | `Logger`  | `undefined`                 | Custom logger instance                          |

## Error Handling

The SDK provides specific error classes for different scenarios:

```typescript
import {
  TermiiValidationError,
  TermiiAuthenticationError,
  TermiiRateLimitError,
  TermiiAPIError,
  TermiiNetworkError,
} from 'termii-node';

try {
  const result = await termii.messaging.send({
    to: '2347065250817',
    from: 'YourBrand',
    sms: 'Hello!',
    type: 'plain',
    channel: 'generic',
  });
} catch (error) {
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
```

### Error Types

| Error Class                 | Description              | HTTP Status    |
| --------------------------- | ------------------------ | -------------- |
| `TermiiValidationError`     | Invalid input parameters | N/A            |
| `TermiiAuthenticationError` | Authentication failed    | 401, 403       |
| `TermiiRateLimitError`      | Too many requests        | 429            |
| `TermiiAPIError`            | General API error        | 400, 422, 500+ |
| `TermiiNetworkError`        | Network/connection error | N/A            |

## Examples

Check out the [examples](./examples) directory for more usage examples:

- [Messaging](./examples/messaging.examples) - Complete messaging examples
- [Sender Id](./examples/sender-id.examples) - Complete sender id examples
- [Number](./examples/number.examples) - Complete number examples
- [Template](./examples/template.examples) - Complete template examples
- [Phonebook](./examples/phonebook.examples) - Complete phonebook examples
- [Contact](./examples/contact.examples) - Complete contact examples

### Running Examples

Before running the examples, make sure you edit sample-payload.example to sample-payload.ts and edit the content to proper data, or just edit each of the example you want to run and add proper data to them

```bash
# Install dependencies
npm install

# Run an example
npm run example examples/messaging.examples.ts

# Run an example (Alternative)
npx tsx examples/messaging.examples.ts

# short and direct
npm run example:messaging
npm run example:sender-id
npm run example:number
npm run example:template
npm run example:phonebook
npm run example:contact
npm run example:campaign
```

## API Documentation

For detailed API documentation, see [API.md](./docs/API.md).

## TypeScript Support

This SDK is written in TypeScript and includes type definitions. You get full IntelliSense support in VS Code and other TypeScript-aware editors.

```typescript
import { TermiiClient, SendMessageRequest, SendMessageResponse } from 'termii-node';

// Types are automatically inferred
const termii = new TermiiClient({ apiKey: 'your-api-key' });

// Full type safety and autocomplete
const params: SendMessageRequest = {
  to: '2347065250817',
  from: 'YourBrand',
  sms: 'Hello!',
  type: 'plain',
  channel: 'generic',
};

const result: SendMessageResponse = await termii.messaging.send(params);
```

## Requirements

- Node.js >= 14.0.0
- TypeScript >= 5.0 (if using TypeScript)

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## Support

- 📧 Email: basil4240@gmail.com
- 💬 Issues: [GitHub Issues](https://github.com/basil4240/termii-node/issues)
- 📖 Documentation: [API Docs](./docs/API.md)
- 🌐 Termii API Docs: [https://developers.termii.com](https://developers.termii.com)

## License

MIT © [Mc-Ben Ba-ana](https://github.com/basil4240)

See [LICENSE](./LICENSE) for more information.

## Acknowledgments

- Thanks to [Termii](https://termii.com) for providing the messaging API
- Built with ❤️ by [Mc-Ben](https://github.com/basil4240)

---

**Made with ❤️ for developers who build great things**
