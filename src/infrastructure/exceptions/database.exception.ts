import { HttpStatus } from '@nestjs/common';
import { AppHttpException } from './http.exception';

export class DatabaseException extends AppHttpException {
  constructor(message: string, error?: any) {
    super(
      error?.status ||
        error?.response?.status ||
        HttpStatus.INTERNAL_SERVER_ERROR,
      500,
      DatabaseException.name,
      error?.detail || error?.message || message,
    );
  }
}
