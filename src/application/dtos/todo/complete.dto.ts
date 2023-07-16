/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsPositive } from 'class-validator';

export class TodoCompleteDTO {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  done: boolean;

  constructor({ id, done }: any = {}) {
    this.id = id;
    this.done = done;
  }
}
