# Termii Node.js SDK

[![npm version](https://badge.fury.io/js/%40yourcompany%2Ftermii-sdk.svg)](https://badge.fury.io/js/%40yourcompany%2Ftermii-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://github.com/yourcompany/termii-sdk/workflows/CI/badge.svg)](https://github.com/yourcompany/termii-sdk/actions)

Official Node.js SDK for the [Termii API](https://termii.com). Send SMS, verify phone numbers, and manage messaging at scale with a simple, type-safe interface.

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
  - [Sender ID](#sender-id) *(Coming Soon)*
  - [Phone Numbers](#phone-numbers) *(Coming Soon)*
  - [Templates](#templates) *(Coming Soon)*
  - [Phonebooks](#phonebooks) *(Coming Soon)*
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

*(Coming Soon)*

Manage your sender IDs for SMS campaigns.
```typescript
// This section will be added when sender ID resource is implemented
```

### Phone Numbers

*(Coming Soon)*

Search and verify phone numbers.
```typescript
// This section will be added when number resource is implemented
```

### Templates

*(Coming Soon)*

Create and manage message templates.
```typescript
// This section will be added when template resource is implemented
```

### Phonebooks

*(Coming Soon)*

Organize contacts into phonebooks for easy bulk messaging.
```typescript
// This section will be added when phonebook resource is implemented
```

## Configuration

Customize the SDK behavior with configuration options:
```typescript
const termii = new TermiiClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.ng.termii.com',  // Optional: Custom API endpoint
  timeout: 30000,                         // Optional: Request timeout in ms (default: 30000)
  retries: 3,                             // Optional: Number of retries (default: 3)
  validateInput: true,                    // Optional: Validate inputs before API calls (default: true)
  logger: {                               // Optional: Custom logger
    debug: (message, meta) => console.debug(message, meta),
    info: (message, meta) => console.info(message, meta),
    warn: (message, meta) => console.warn(message, meta),
    error: (message, meta) => console.error(message, meta),
  },
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | **Required** | Your Termii API key |
| `baseUrl` | `string` | `https://api.ng.termii.com` | API base URL |
| `timeout` | `number` | `30000` | Request timeout in milliseconds |
| `retries` | `number` | `3` | Number of automatic retries for failed requests |
| `validateInput` | `boolean` | `true` | Validate inputs before making API calls |
| `logger` | `Logger` | `undefined` | Custom logger instance |

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

| Error Class | Description | HTTP Status |
|-------------|-------------|-------------|
| `TermiiValidationError` | Invalid input parameters | N/A |
| `TermiiAuthenticationError` | Authentication failed | 401, 403 |
| `TermiiRateLimitError` | Too many requests | 429 |
| `TermiiAPIError` | General API error | 400, 422, 500+ |
| `TermiiNetworkError` | Network/connection error | N/A |

## Examples

Check out the [examples](./examples) directory for more usage examples:

- [Basic Usage](./examples/basic-usage.ts) - Simple message sending
- [Send Message](./examples/send-message.ts) - Complete messaging examples
- [Error Handling](./examples/error-handling.ts) - Comprehensive error handling
- [Bulk Messaging](./examples/bulk-messaging.ts) - Sending to many recipients
- [WhatsApp Media](./examples/whatsapp-media.ts) - Sending media via WhatsApp

### Running Examples
```bash
# Install dependencies
npm install

# Run an example
npm run example examples/send-message.ts
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