import { Validator } from '../../../src/utils/validator';
import { TermiiValidationError } from '../../../src/utils/errors';

describe('Validator', () => {
  describe('validatePhoneNumber', () => {
    it('should not throw for a valid phone number', () => {
      expect(() => Validator.validatePhoneNumber('2347065250817')).not.toThrow();
      expect(() => Validator.validatePhoneNumber('2348012345678')).not.toThrow();
    });

    it('should throw TermiiValidationError if phone number is missing', () => {
      expect(() => Validator.validatePhoneNumber('')).toThrow(TermiiValidationError);
      expect(() => Validator.validatePhoneNumber('')).toThrow('Phone number is required');
      expect(() => Validator.validatePhoneNumber(undefined as any)).toThrow(TermiiValidationError);
      expect(() => Validator.validatePhoneNumber(undefined as any)).toThrow(
        'Phone number is required'
      );
      expect(() => Validator.validatePhoneNumber(null as any)).toThrow(TermiiValidationError);
      expect(() => Validator.validatePhoneNumber(null as any)).toThrow('Phone number is required');
    });

    it('should throw TermiiValidationError for non-digit characters', () => {
      expect(() => Validator.validatePhoneNumber('23470ABC50817')).toThrow(TermiiValidationError);
      expect(() => Validator.validatePhoneNumber('23470ABC50817')).toThrow(
        'Phone number must contain only digits'
      );
    });

    it('should throw TermiiValidationError for phone number too short', () => {
      expect(() => Validator.validatePhoneNumber('12345')).toThrow(TermiiValidationError);
      expect(() => Validator.validatePhoneNumber('12345')).toThrow(
        'Phone number must be between 10 and 15 digits'
      );
    });

    it('should throw TermiiValidationError for phone number too long', () => {
      expect(() => Validator.validatePhoneNumber('1234567890123456')).toThrow(
        TermiiValidationError
      );
      expect(() => Validator.validatePhoneNumber('1234567890123456')).toThrow(
        'Phone number must be between 10 and 15 digits'
      );
    });

    it('should handle phone numbers with spaces and hyphens correctly', () => {
      expect(() => Validator.validatePhoneNumber('234 706 525 0817')).not.toThrow();
      expect(() => Validator.validatePhoneNumber('234-706-525-0817')).not.toThrow();
    });
  });

  describe('validateSenderId', () => {
    it('should not throw for a valid sender ID', () => {
      expect(() => Validator.validateSenderId('MyBrand')).not.toThrow();
      expect(() => Validator.validateSenderId('Test123')).not.toThrow();
    });

    it('should throw TermiiValidationError if sender ID is missing', () => {
      expect(() => Validator.validateSenderId('')).toThrow(TermiiValidationError);
      expect(() => Validator.validateSenderId('')).toThrow('Sender ID is required');
      expect(() => Validator.validateSenderId(undefined as any)).toThrow(TermiiValidationError);
      expect(() => Validator.validateSenderId(undefined as any)).toThrow('Sender ID is required');
      expect(() => Validator.validateSenderId(null as any)).toThrow(TermiiValidationError);
      expect(() => Validator.validateSenderId(null as any)).toThrow('Sender ID is required');
    });

    it('should throw TermiiValidationError if sender ID is too short', () => {
      expect(() => Validator.validateSenderId('AB')).toThrow(TermiiValidationError);
      expect(() => Validator.validateSenderId('AB')).toThrow(
        'Sender ID must be between 3 and 11 characters'
      );
    });

    it('should throw TermiiValidationError if sender ID is too long', () => {
      expect(() => Validator.validateSenderId('TooLongSender')).toThrow(TermiiValidationError);
      expect(() => Validator.validateSenderId('TooLongSender')).toThrow(
        'Sender ID must be between 3 and 11 characters'
      );
    });

    it('should throw TermiiValidationError for non-alphanumeric characters', () => {
      expect(() => Validator.validateSenderId('My Brand')).toThrow(TermiiValidationError);
      expect(() => Validator.validateSenderId('My-Brand')).toThrow(
        'Sender ID must contain only alphanumeric characters'
      );
    });
  });

  describe('validateRequired', () => {
    it('should not throw if all required fields are present', () => {
      expect(() => Validator.validateRequired({ a: 'value', b: 123 })).not.toThrow();
      expect(() => Validator.validateRequired({ c: true, d: [1] })).not.toThrow();
    });

    it('should throw TermiiValidationError for a single missing field (undefined)', () => {
      expect(() => Validator.validateRequired({ a: 'value', b: undefined })).toThrow(
        TermiiValidationError
      );
      expect(() => Validator.validateRequired({ a: 'value', b: undefined })).toThrow(
        'Missing required fields: b'
      );
    });

    it('should throw TermiiValidationError for a single missing field (null)', () => {
      expect(() => Validator.validateRequired({ a: 'value', b: null })).toThrow(
        TermiiValidationError
      );
      expect(() => Validator.validateRequired({ a: 'value', b: null })).toThrow(
        'Missing required fields: b'
      );
    });

    it('should throw TermiiValidationError for a single missing field (empty string)', () => {
      expect(() => Validator.validateRequired({ a: 'value', b: '' })).toThrow(
        TermiiValidationError
      );
      expect(() => Validator.validateRequired({ a: 'value', b: '' })).toThrow(
        'Missing required fields: b'
      );
    });

    it('should throw TermiiValidationError for multiple missing fields', () => {
      expect(() => Validator.validateRequired({ a: 'value', b: undefined, c: '' })).toThrow(
        TermiiValidationError
      );
      expect(() => Validator.validateRequired({ a: 'value', b: undefined, c: '' })).toThrow(
        'Missing required fields: b, c'
      );
    });
  });

  describe('validatePinLength', () => {
    it('should not throw for a valid PIN length', () => {
      expect(() => Validator.validatePinLength(4)).not.toThrow();
      expect(() => Validator.validatePinLength(8)).not.toThrow();
      expect(() => Validator.validatePinLength(6)).not.toThrow();
    });

    it('should throw TermiiValidationError if PIN length is too short', () => {
      expect(() => Validator.validatePinLength(3)).toThrow(TermiiValidationError);
      expect(() => Validator.validatePinLength(3)).toThrow('PIN length must be between 4 and 8');
    });

    it('should throw TermiiValidationError if PIN length is too long', () => {
      expect(() => Validator.validatePinLength(9)).toThrow(TermiiValidationError);
      expect(() => Validator.validatePinLength(9)).toThrow('PIN length must be between 4 and 8');
    });
  });

  describe('validatePinAttempts', () => {
    it('should not throw for valid PIN attempts', () => {
      expect(() => Validator.validatePinAttempts(1)).not.toThrow();
      expect(() => Validator.validatePinAttempts(5)).not.toThrow();
    });

    it('should throw TermiiValidationError if PIN attempts is less than 1', () => {
      expect(() => Validator.validatePinAttempts(0)).toThrow(TermiiValidationError);
      expect(() => Validator.validatePinAttempts(0)).toThrow('PIN attempts must be at least 1');
      expect(() => Validator.validatePinAttempts(-1)).toThrow(TermiiValidationError);
      expect(() => Validator.validatePinAttempts(-1)).toThrow('PIN attempts must be at least 1');
    });
  });

  describe('validatePinTimeToLive', () => {
    it('should not throw for valid PIN time to live', () => {
      expect(() => Validator.validatePinTimeToLive(0)).not.toThrow();
      expect(() => Validator.validatePinTimeToLive(30)).not.toThrow();
      expect(() => Validator.validatePinTimeToLive(60)).not.toThrow();
    });

    it('should throw TermiiValidationError if PIN TTL is too low', () => {
      expect(() => Validator.validatePinTimeToLive(-1)).toThrow(TermiiValidationError);
      expect(() => Validator.validatePinTimeToLive(-1)).toThrow(
        'PIN time to live must be between 0 and 60 minutes'
      );
    });

    it('should throw TermiiValidationError if PIN TTL is too high', () => {
      expect(() => Validator.validatePinTimeToLive(61)).toThrow(TermiiValidationError);
      expect(() => Validator.validatePinTimeToLive(61)).toThrow(
        'PIN time to live must be between 0 and 60 minutes'
      );
    });
  });

  describe('validatePhoneNumbers', () => {
    it('should not throw for a valid array of phone numbers', () => {
      expect(() =>
        Validator.validatePhoneNumbers(['2347065250817', '2348012345678'])
      ).not.toThrow();
    });

    it('should throw TermiiValidationError if phoneNumbers is not an array', () => {
      expect(() => Validator.validatePhoneNumbers(undefined as any)).toThrow(TermiiValidationError);
      expect(() => Validator.validatePhoneNumbers(undefined as any)).toThrow(
        'Phone numbers must be a non-empty array'
      );
      expect(() => Validator.validatePhoneNumbers(null as any)).toThrow(TermiiValidationError);
      expect(() => Validator.validatePhoneNumbers(null as any)).toThrow(
        'Phone numbers must be a non-empty array'
      );
      expect(() => Validator.validatePhoneNumbers('not an array' as any)).toThrow(
        TermiiValidationError
      );
      expect(() => Validator.validatePhoneNumbers('not an array' as any)).toThrow(
        'Phone numbers must be a non-empty array'
      );
    });

    it('should throw TermiiValidationError if phoneNumbers array is empty', () => {
      expect(() => Validator.validatePhoneNumbers([])).toThrow(TermiiValidationError);
      expect(() => Validator.validatePhoneNumbers([])).toThrow(
        'Phone numbers must be a non-empty array'
      );
    });

    it('should throw TermiiValidationError if any phone number in the array is invalid', () => {
      expect(() => Validator.validatePhoneNumbers(['2347065250817', 'invalid-number'])).toThrow(
        TermiiValidationError
      );
      expect(() => Validator.validatePhoneNumbers(['2347065250817', 'invalid-number'])).toThrow(
        'Invalid phone number at index 1: Phone number must contain only digits'
      );
    });
  });
});
