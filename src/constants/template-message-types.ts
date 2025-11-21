export const TEMPLATE_MESSAGE_TYPE = {
  NO_MEDIA: 'no_media',
  WITH_MEDIA: 'media',
} as const;

export type TemplateMessageType =
  (typeof TEMPLATE_MESSAGE_TYPE)[keyof typeof TEMPLATE_MESSAGE_TYPE];
