import { SendMessageResponse, SendBulkMessageResponse } from '../../src/types/messaging.types';

export const mockSendMessageResponse: SendMessageResponse = {
  message_id: '9122821270554876574',
  message: 'Successfully Sent',
  balance: 9,
  user: 'test_user',
};

export const mockBulkMessageResponse: SendBulkMessageResponse = {
  message_id: '1234567890',
  message: 'Successfully Sent',
  balance: 8.5,
  user: 'test_user',
  code: ''
};

export const mockErrorResponse = {
  message: 'Invalid API key',
  error: 'Authentication failed',
};

export const validSendMessageParams = {
  to: '2347065250817',
  from: 'TestBrand',
  sms: 'Hello from Termii!',
  type: 'plain' as const,
  channel: 'generic' as const,
};

export const validBulkMessageParams = {
  to: ['2347065250817', '2348012345678'],
  from: 'TestBrand',
  sms: 'Bulk message test',
  type: 'plain' as const,
  channel: 'generic' as const,
};

export const validMediaMessageParams = {
  to: '2347065250817',
  from: 'TestBrand',
  type: 'plain' as const,
  channel: 'whatsapp' as const,
  media: {
    url: 'https://example.com/image.jpg',
    caption: 'Test image',
  },
};