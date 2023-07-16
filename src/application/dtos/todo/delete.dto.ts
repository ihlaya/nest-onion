/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsNumber, IsPositive } from 'class-validator';

export class TodoDeleteDTO {
  @IsNumber()
  @IsPositive()
  id: number;

  constructor({ id }: any = {}) {
    this.id = id;
  }
}
