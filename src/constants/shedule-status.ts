export const SCHEDULE_STATUS = {
  SCHEDULED: "scheduled",
  REGULAR: "regular",
} as const;

export type ScheduleSmsStatus = typeof SCHEDULE_STATUS[keyof typeof SCHEDULE_STATUS];