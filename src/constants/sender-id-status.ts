export const SENDER_ID_STATUS = {
  ACTIVE: "active",
  PENDING: "pending",
  BLOCKED: "blocked",
} as const;

export type SenderIdStatus =
  typeof SENDER_ID_STATUS[keyof typeof SENDER_ID_STATUS];
