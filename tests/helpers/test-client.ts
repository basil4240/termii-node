import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HTTPClient } from '../../src/utils/http.client';

export interface TestClientSetup {
  httpClient: HTTPClient;
  mockAxios: MockAdapter;
  axiosInstance: AxiosInstance;
}

/**
 * Creates a test HTTPClient with mocked axios instance
 * This allows us to mock HTTP requests in tests
 */
export function createTestHTTPClient(
  baseURL: string = 'https://api.ng.termii.com'
): TestClientSetup {
  // Create axios instance
  const axiosInstance = axios.create({ baseURL });
  
  // Create mock adapter for the axios instance
  const mockAxios = new MockAdapter(axiosInstance);

  // Create HTTPClient
  const httpClient = new HTTPClient(baseURL, 30000, 3, undefined);
  
  // Replace the internal client with our mocked one
  (httpClient as any).client = axiosInstance;

  return { httpClient, mockAxios, axiosInstance };
}

/**
 * Helper to reset mocks between tests
 */
export function resetTestClient(mockAxios: MockAdapter): void {
  mockAxios.reset();
}

/**
 * Helper to restore mocks after all tests
 */
export function restoreTestClient(mockAxios: MockAdapter): void {
  mockAxios.restore();
}