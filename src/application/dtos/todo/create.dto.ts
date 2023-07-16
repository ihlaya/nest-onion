/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsDefined, IsOptional, MaxLength } from 'class-validator';

export class TodoCreateDTO {
  @IsDefined()
  @MaxLength(50)
  title: string;
  @MaxLength(100)
  @IsOptional()
  description?: string;

  constructor({ title, description }: any = {}) {
    this.title = title;
    this.description = description;
  }
}
