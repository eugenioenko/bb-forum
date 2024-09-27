export class HttpException extends Error {
  public status: number;
  public message: string;
  public code?: number;

  constructor(status: number, message: string, code?: number) {
    super(message);
    this.status = status;
    this.message = message;
    this.code = code;
  }
}

interface ExceptionMessage {
  status: number;
  message: string;
}

export enum ErrorCode {
  InvalidToken = 100,
  AuthenticationRequired = 101,
  ExpiredToken = 102,
  InvalidRefreshToken = 103,
}

export const Exceptions: { [code: number]: ExceptionMessage } = {
  100: {
    status: 401,
    message: "Invalid token",
  },
  101: {
    status: 401,
    message: "Authentication required",
  },
  102: {
    status: 401,
    message: "Expired token",
  },
  103: {
    status: 401,
    message: "Invalid refresh token",
  },
};

export function panic(code: ErrorCode): HttpException {
  const exception = Exceptions[code];
  return new HttpException(exception.status, exception.message, code);
}
