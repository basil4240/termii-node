export const NUMBER_MESSAGE_TYPES = {
  PLAIN: 'plain',
} as const;

export type NumberMessageType =
  (typeof NUMBER_MESSAGE_TYPES)[keyof typeof NUMBER_MESSAGE_TYPES];
