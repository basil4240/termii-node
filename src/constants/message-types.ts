export const MESSAGE_TYPES = {
  PLAIN: 'plain',
} as const;

export type MessageType = typeof MESSAGE_TYPES[keyof typeof MESSAGE_TYPES];

