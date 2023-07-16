import { HttpStatus } from '@nestjs/common';
import { AppHttpException } from './http.exception';

export class NotFoundException extends AppHttpException {
  constructor(message: string, error?: any) {
    super(
      error?.status || error?.response?.status || HttpStatus.NOT_FOUND,
      404,
      message || NotFoundException.name,
      error?.detail || error?.message || error || message,
    );
  }
}
