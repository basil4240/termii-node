export const PIN_TYPES = {
  NUMERIC: 'NUMERIC',
  ALPHANUMERIC: 'ALPHANUMERIC',
} as const;

export type PinType = typeof PIN_TYPES[keyof typeof PIN_TYPES];