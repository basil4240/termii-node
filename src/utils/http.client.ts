import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import {
  TermiiNetworkError,
  TermiiAuthenticationError,
  TermiiRateLimitError,
  TermiiAPIError,
} from './errors';
import { HTTPRequestConfig, HTTPResponse, Logger } from '../types';

export class HTTPClient {
  private client: AxiosInstance;
  private retries: number;
  private logger?: Logger;

  constructor(baseURL: string, timeout: number = 30000, retries: number = 3, logger?: Logger) {
    this.retries = retries;
    this.logger = logger;

    this.client = axios.create({
      baseURL,
      timeout,
      decompress: true,
      headers: {
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        this.logger?.debug('HTTP Request', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
        });
        return config;
      },
      (error) => {
        this.logger?.error('Request interceptor error', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        this.logger?.debug('HTTP Response', {
          status: response.status,
          data: response.data,
        });
        return response;
      },
      async (error: AxiosError) => {
        return this.handleError(error);
      }
    );
  }

  private async handleError(error: AxiosError): Promise<never> {
    if (!error.response) {
      // Network error (no response received)
      this.logger?.error('Network error', error.message);
      throw new TermiiNetworkError(error.message || 'Network request failed', {
        originalError: error,
      });
    }

    const { status, data } = error.response;
    const errorMessage = this.extractErrorMessage(data);

    this.logger?.error('API error', { status, message: errorMessage, data });

    // Handle specific status codes
    switch (status) {
      case 401:
      case 403:
        throw new TermiiAuthenticationError(errorMessage, data);

      case 429:
        throw new TermiiRateLimitError(errorMessage, data);

      case 400:
      case 422:
        throw new TermiiAPIError(errorMessage, status, data);

      case 500:
      case 502:
      case 503:
      case 504:
        throw new TermiiAPIError('Server error occurred. Please try again later.', status, data);

      default:
        throw new TermiiAPIError(errorMessage, status, data);
    }
  }

  private extractErrorMessage(data: unknown): string {
    if (typeof data === 'string') return data;
    if (typeof data === 'object' && data !== null) {
      if ('message' in data && typeof (data as { message: unknown }).message === 'string') {
        return (data as { message: string }).message;
      }
      if ('error' in data && typeof (data as { error: unknown }).error === 'string') {
        return (data as { error: string }).error;
      }
      if ('errors' in data) {
        const errors = (data as { errors: unknown }).errors;
        if (Array.isArray(errors) && errors.every((e) => typeof e === 'string')) {
          return errors.join(', ');
        }
        if (typeof errors === 'object' && errors !== null) {
          // If errors is an object, stringify it
          return JSON.stringify(errors);
        }
      }
    }
    return 'An error occurred while processing your request';
  }

  private async retryRequest<T>(
    config: AxiosRequestConfig,
    attempt: number = 0
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.client.request<T>(config);
    } catch (error) {
      const isRetryable = this.isRetryableError(error);
      const shouldRetry = attempt < this.retries && isRetryable;

      if (shouldRetry) {
        const delay = this.calculateBackoff(attempt);
        this.logger?.warn(
          `Retrying request (attempt ${attempt + 1}/${this.retries}) after ${delay}ms`
        );

        await this.sleep(delay);
        return this.retryRequest<T>(config, attempt + 1);
      }

      throw error;
    }
  }

  private isRetryableError(error: unknown): boolean {
    // Retry on network errors or 5xx server errors
    if (error instanceof TermiiNetworkError) return true;
    if (error instanceof TermiiAPIError) {
      return error.statusCode ? error.statusCode >= 500 : false;
    }
    return false;
  }

  private calculateBackoff(attempt: number): number {
    // Exponential backoff: 1s, 2s, 4s, 8s...
    return Math.min(1000 * Math.pow(2, attempt), 10000);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async request<T = unknown>(config: HTTPRequestConfig): Promise<HTTPResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      method: config.method,
      url: config.url,
      data: config.data,
      params: config.params,
      headers: config.headers,
      timeout: config.timeout,
    };

    const response = await this.retryRequest<T>(axiosConfig);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
    };
  }

  async get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<HTTPResponse<T>> {
    return this.request<T>({ method: 'GET', url, params });
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<HTTPResponse<T>> {
    return this.request<T>({ method: 'POST', url, data, headers });
  }

  async put<T = unknown>(url: string, data?: unknown): Promise<HTTPResponse<T>> {
    return this.request<T>({ method: 'PUT', url, data });
  }

  async patch<T = unknown>(
    url: string,
    payload?: { params?: Record<string, unknown>; data?: unknown }
  ): Promise<HTTPResponse<T>> {
    return this.request<T>({ method: 'PATCH', url, params: payload?.params, data: payload?.data });
  }

  async delete<T = unknown>(
    url: string,
    payload?: { params?: Record<string, unknown>; data?: unknown }
  ): Promise<HTTPResponse<T>> {
    return this.request<T>({ method: 'DELETE', url, params: payload?.params, data: payload?.data });
  }
}
