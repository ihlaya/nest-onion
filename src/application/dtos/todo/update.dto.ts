/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class TodoUpdateDTO {
  @IsNumber()
  @IsPositive()
  id: number;
  @IsDefined()
  @MaxLength(50)
  title: string;
  @MaxLength(100)
  @IsOptional()
  description: string;

  constructor({ title, description, id }: any = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
