export const PIN_TYPES = {
  NUMERIC: 'numeric',
  ALPHANUMERIC: 'alphanumeric',
} as const;

export type PinType = (typeof PIN_TYPES)[keyof typeof PIN_TYPES];
