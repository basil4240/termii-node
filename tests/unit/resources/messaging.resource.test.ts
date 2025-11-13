import MockAdapter from 'axios-mock-adapter';
import { MessagingResource } from '../../../src/resources/messaging.resource';
import { TermiiValidationError } from '../../../src/utils/errors';
import { createTestHTTPClient, resetTestClient, restoreTestClient } from '../../helpers/test-client';
import {
  mockSendMessageResponse,
  mockBulkMessageResponse,
  mockErrorResponse,
  validSendMessageParams,
  validBulkMessageParams,
  validMediaMessageParams,
} from '../../fixtures/messaging.fixtures';

describe('MessagingResource', () => {
  let messagingResource: MessagingResource;
  let mockAxios: MockAdapter;
  const apiKey = 'test_api_key_123456';

  beforeEach(() => {
    // Create test HTTP client with mocked axios
    const testSetup = createTestHTTPClient();
    mockAxios = testSetup.mockAxios;
    
    // Create messaging resource with the mocked HTTP client (no logger in tests)
    messagingResource = new MessagingResource(testSetup.httpClient, undefined);
    
    // Inject API key (mimicking what TermiiClient does)
    (messagingResource as any).apiKey = apiKey;
  });

  afterEach(() => {
    // Reset mocks after each test
    resetTestClient(mockAxios);
  });

  afterAll(() => {
    // Restore mocks after all tests
    restoreTestClient(mockAxios);
  });

  describe('send()', () => {
    const endpoint = '/api/sms/send';

    it('should send a message successfully with single recipient', async () => {
      // Arrange
      mockAxios.onPost(endpoint).reply(200, mockSendMessageResponse);

      // Act
      const result = await messagingResource.send(validSendMessageParams);

      // Assert
      expect(result).toEqual(mockSendMessageResponse);
      expect(mockAxios.history.post.length).toBe(1);
      expect(mockAxios.history.post[0].url).toBe(endpoint);
      
      const requestData = JSON.parse(mockAxios.history.post[0].data);
      expect(requestData).toMatchObject({
        ...validSendMessageParams,
        api_key: apiKey,
      });
    });

    it('should send a message with multiple recipients (array)', async () => {
      // Arrange
      const params = {
        ...validSendMessageParams,
        to: ['2347065250817', '2348012345678'],
      };
      mockAxios.onPost(endpoint).reply(200, mockSendMessageResponse);

      // Act
      const result = await messagingResource.send(params);

      // Assert
      expect(result).toEqual(mockSendMessageResponse);
      const requestData = JSON.parse(mockAxios.history.post[0].data);
      expect(requestData.to).toEqual(params.to);
    });

    it('should throw validation error for missing required field', async () => {
      // Arrange
      const invalidParams = { ...validSendMessageParams, from: '' };

      // Act & Assert
      await expect(messagingResource.send(invalidParams as any)).rejects.toThrow(
        TermiiValidationError
      );
    });

    it('should throw validation error for invalid phone number', async () => {
      // Arrange
      const invalidParams = { ...validSendMessageParams, to: 'invalid' };

      // Act & Assert
      await expect(messagingResource.send(invalidParams)).rejects.toThrow(TermiiValidationError);
    });

    it('should throw validation error for invalid channel', async () => {
      // Arrange
      const invalidParams = { ...validSendMessageParams, channel: 'invalid' as any };

      // Act & Assert
      await expect(messagingResource.send(invalidParams)).rejects.toThrow(TermiiValidationError);
      await expect(messagingResource.send(invalidParams)).rejects.toThrow(/Invalid channel/);
    });

    it('should throw validation error for invalid message type', async () => {
      // Arrange
      const invalidParams = { ...validSendMessageParams, type: 'invalid' as any };

      // Act & Assert
      await expect(messagingResource.send(invalidParams)).rejects.toThrow(TermiiValidationError);
      await expect(messagingResource.send(invalidParams)).rejects.toThrow(/Invalid message type/);
    });

    it('should throw validation error for empty message', async () => {
      // Arrange
      const invalidParams = { ...validSendMessageParams, sms: '' };

      // Act & Assert
      await expect(messagingResource.send(invalidParams)).rejects.toThrow(TermiiValidationError);
    });

    it('should throw validation error when recipients exceed limit', async () => {
      // Arrange
      const tooManyRecipients = Array(101).fill('2347065250817');
      const invalidParams = { ...validSendMessageParams, to: tooManyRecipients };

      // Act & Assert
      await expect(messagingResource.send(invalidParams)).rejects.toThrow(TermiiValidationError);
      await expect(messagingResource.send(invalidParams)).rejects.toThrow(
        /Maximum 100 recipients/
      );
    });

    it('should throw validation error for empty recipient array', async () => {
      // Arrange
      const invalidParams = { ...validSendMessageParams, to: [] };

      // Act & Assert
      await expect(messagingResource.send(invalidParams)).rejects.toThrow(TermiiValidationError);
      await expect(messagingResource.send(invalidParams)).rejects.toThrow(
        /Recipient list cannot be empty/
      );
    });

    it('should throw validation error when both sms and media are provided', async () => {
      // Arrange
      const invalidParams = {
        ...validSendMessageParams,
        media: { url: 'https://example.com/image.jpg', caption: 'Test' },
      };

      // Act & Assert
      await expect(messagingResource.send(invalidParams as any)).rejects.toThrow(
        TermiiValidationError
      );
      await expect(messagingResource.send(invalidParams as any)).rejects.toThrow(
        /Cannot use both sms and media/
      );
    });

    it('should handle 400 API error responses', async () => {
      // Arrange
      mockAxios.onPost(endpoint).reply(400, mockErrorResponse);

      // Act & Assert
      await expect(messagingResource.send(validSendMessageParams)).rejects.toThrow();
    });

    it('should handle 401 authentication errors', async () => {
      // Arrange
      mockAxios.onPost(endpoint).reply(401, { message: 'Invalid API key' });

      // Act & Assert
      await expect(messagingResource.send(validSendMessageParams)).rejects.toThrow();
    });

    it('should handle 429 rate limit errors', async () => {
      // Arrange
      mockAxios.onPost(endpoint).reply(429, { message: 'Rate limit exceeded' });

      // Act & Assert
      await expect(messagingResource.send(validSendMessageParams)).rejects.toThrow();
    });

    it('should handle 500 server errors', async () => {
      // Arrange
      mockAxios.onPost(endpoint).reply(500, { message: 'Internal server error' });

      // Act & Assert
      await expect(messagingResource.send(validSendMessageParams)).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      // Arrange
      mockAxios.onPost(endpoint).networkError();

      // Act & Assert
      await expect(messagingResource.send(validSendMessageParams)).rejects.toThrow();
    });

    it('should handle timeout errors', async () => {
      // Arrange
      mockAxios.onPost(endpoint).timeout();

      // Act & Assert
      await expect(messagingResource.send(validSendMessageParams)).rejects.toThrow();
    });
  });

  describe('sendBulk()', () => {
    const endpoint = '/api/sms/send/bulk';

    it('should send bulk message successfully', async () => {
      // Arrange
      mockAxios.onPost(endpoint).reply(200, mockBulkMessageResponse);

      // Act
      const result = await messagingResource.sendBulk(validBulkMessageParams);

      // Assert
      expect(result).toEqual(mockBulkMessageResponse);
      expect(mockAxios.history.post.length).toBe(1);
      expect(mockAxios.history.post[0].url).toBe(endpoint);
      
      const requestData = JSON.parse(mockAxios.history.post[0].data);
      expect(requestData).toMatchObject({
        ...validBulkMessageParams,
        api_key: apiKey,
      });
    });

    it('should handle large recipient lists', async () => {
      // Arrange
      const largeRecipientList = Array(5000)
        .fill(null)
        .map((_, i) => `23470652${String(i).padStart(5, '0')}`);
      const params = { ...validBulkMessageParams, to: largeRecipientList };
      mockAxios.onPost(endpoint).reply(200, mockBulkMessageResponse);

      // Act
      const result = await messagingResource.sendBulk(params);

      // Assert
      expect(result).toEqual(mockBulkMessageResponse);
      const requestData = JSON.parse(mockAxios.history.post[0].data);
      expect(requestData.to.length).toBe(5000);
    });

    it('should throw validation error if recipients is not an array', async () => {
      // Arrange
      const invalidParams = { ...validBulkMessageParams, to: '2347065250817' as any };

      // Act & Assert
      await expect(messagingResource.sendBulk(invalidParams)).rejects.toThrow(
        TermiiValidationError
      );
      await expect(messagingResource.sendBulk(invalidParams)).rejects.toThrow(
        /Recipients must be an array/
      );
    });

    it('should throw validation error when bulk recipients exceed limit', async () => {
      // Arrange
      const tooManyRecipients = Array(10001).fill('2347065250817');
      const invalidParams = { ...validBulkMessageParams, to: tooManyRecipients };

      // Act & Assert
      await expect(messagingResource.sendBulk(invalidParams)).rejects.toThrow(
        TermiiValidationError
      );
      await expect(messagingResource.sendBulk(invalidParams)).rejects.toThrow(
        /Maximum 10000 recipients/
      );
    });

    it('should throw validation error for empty bulk recipient array', async () => {
      // Arrange
      const invalidParams = { ...validBulkMessageParams, to: [] };

      // Act & Assert
      await expect(messagingResource.sendBulk(invalidParams)).rejects.toThrow(
        TermiiValidationError
      );
    });

    it('should validate all phone numbers in bulk array', async () => {
      // Arrange
      const invalidParams = {
        ...validBulkMessageParams,
        to: ['2347065250817', 'invalid', '2348012345678'],
      };

      // Act & Assert
      await expect(messagingResource.sendBulk(invalidParams)).rejects.toThrow(
        TermiiValidationError
      );
    });
  });

  describe('sendWithMedia()', () => {
    const endpoint = '/api/sms/send';

    it('should send media message successfully on WhatsApp', async () => {
      // Arrange
      mockAxios.onPost(endpoint).reply(200, mockSendMessageResponse);

      // Act
      const result = await messagingResource.sendWithMedia(validMediaMessageParams);

      // Assert
      expect(result).toEqual(mockSendMessageResponse);
      const requestData = JSON.parse(mockAxios.history.post[0].data);
      expect(requestData.media).toEqual(validMediaMessageParams.media);
      expect(requestData).not.toHaveProperty('sms');
      expect(requestData.channel).toBe('whatsapp');
    });

    it('should include caption in media message', async () => {
      // Arrange
      mockAxios.onPost(endpoint).reply(200, mockSendMessageResponse);
      const params = {
        ...validMediaMessageParams,
        media: {
          url: 'https://example.com/video.mp4',
          caption: 'Check out this video!',
        },
      };

      // Act
      await messagingResource.sendWithMedia(params);

      // Assert
      const requestData = JSON.parse(mockAxios.history.post[0].data);
      expect(requestData.media.caption).toBe('Check out this video!');
    });

    it('should throw validation error for non-WhatsApp channel', async () => {
      // Arrange
      const invalidParams = { ...validMediaMessageParams, channel: 'generic' as any };

      // Act & Assert
      await expect(messagingResource.sendWithMedia(invalidParams)).rejects.toThrow(
        TermiiValidationError
      );
      await expect(messagingResource.sendWithMedia(invalidParams)).rejects.toThrow(
        /only supported on WhatsApp/
      );
    });

    it('should throw validation error for missing media URL', async () => {
      // Arrange
      const invalidParams = { 
        ...validMediaMessageParams, 
        media: { url: '', caption: 'Test' } 
      };

      // Act & Assert
      await expect(messagingResource.sendWithMedia(invalidParams as any)).rejects.toThrow(
        TermiiValidationError
      );
      await expect(messagingResource.sendWithMedia(invalidParams as any)).rejects.toThrow(
        /Media URL is required/
      );
    });

    it('should throw validation error for missing media object', async () => {
      // Arrange
      const invalidParams = { ...validMediaMessageParams, media: undefined as any };

      // Act & Assert
      await expect(messagingResource.sendWithMedia(invalidParams)).rejects.toThrow(
        TermiiValidationError
      );
    });

    it('should throw validation error for invalid recipient in media message', async () => {
      // Arrange
      const invalidParams = { ...validMediaMessageParams, to: 'invalid' };

      // Act & Assert
      await expect(messagingResource.sendWithMedia(invalidParams)).rejects.toThrow(
        TermiiValidationError
      );
    });
  });
});