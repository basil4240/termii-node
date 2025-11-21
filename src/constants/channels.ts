export const CHANNELS = {
  GENERIC: 'generic',
  DND: 'dnd',
  WHATSAPP: 'whatsapp',
} as const;

export type Channel = (typeof CHANNELS)[keyof typeof CHANNELS];
