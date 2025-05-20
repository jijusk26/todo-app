export const HttpStatus = {
  SUCCESS: 0,
  FAILED: 1,
  UNAUTHORIZED: 2,
  NOTFOUND: 3,
  FORBIDDEN: 4,
  CONFLICT: 5,
} as const;

export type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];
