import { TermiiValidationError } from './errors';

export class Validator {
  /**
   * Validate phone number format (international format)
   */
  static validatePhoneNumber(phoneNumber: string): void {
    if (!phoneNumber) {
      throw new TermiiValidationError('Phone number is required');
    }

    // Remove spaces and special characters
    // eslint-disable-next-line no-useless-escape
    const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, '');

    // Must be digits only and start with country code
    if (!/^\d+$/.test(cleaned)) {
      throw new TermiiValidationError(
        'Phone number must contain only digits (international format, e.g., 2347065250817)'
      );
    }

    // Check length (minimum 10 digits, maximum 15)
    if (cleaned.length < 10 || cleaned.length > 15) {
      throw new TermiiValidationError(
        'Phone number must be between 10 and 15 digits'
      );
    }
  }

  /**
   * Validate sender ID format
   */
  static validateSenderId(senderId: string): void {
    if (!senderId) {
      throw new TermiiValidationError('Sender ID is required');
    }

    if (senderId.length < 3 || senderId.length > 11) {
      throw new TermiiValidationError(
        'Sender ID must be between 3 and 11 characters'
      );
    }

    // Only alphanumeric characters allowed
    if (!/^[a-zA-Z0-9]+$/.test(senderId)) {
      throw new TermiiValidationError(
        'Sender ID must contain only alphanumeric characters'
      );
    }
  }

  /**
   * Validate required fields
   */
  static validateRequired(fields: Record<string, any>): void {
    const missing: string[] = [];

    for (const [key, value] of Object.entries(fields)) {
      if (value === undefined || value === null || value === '') {
        missing.push(key);
      }
    }

    if (missing.length > 0) {
      throw new TermiiValidationError(
        `Missing required fields: ${missing.join(', ')}`
      );
    }
  }

  /**
   * Validate PIN length
   */
  static validatePinLength(length: number): void {
    if (length < 4 || length > 8) {
      throw new TermiiValidationError('PIN length must be between 4 and 8');
    }
  }

  /**
   * Validate PIN attempts
   */
  static validatePinAttempts(attempts: number): void {
    if (attempts < 1) {
      throw new TermiiValidationError('PIN attempts must be at least 1');
    }
  }

  /**
   * Validate PIN time to live (in minutes)
   */
  static validatePinTimeToLive(ttl: number): void {
    if (ttl < 0 || ttl > 60) {
      throw new TermiiValidationError('PIN time to live must be between 0 and 60 minutes');
    }
  }

  /**
   * Validate array of phone numbers
   */
  static validatePhoneNumbers(phoneNumbers: string[]): void {
    if (!Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
      throw new TermiiValidationError('Phone numbers must be a non-empty array');
    }

    phoneNumbers.forEach((phone, index) => {
      try {
        this.validatePhoneNumber(phone);
      } catch (error) {
        throw new TermiiValidationError(
          `Invalid phone number at index ${index}: ${(error as Error).message}`
        );
      }
    });
  }
}