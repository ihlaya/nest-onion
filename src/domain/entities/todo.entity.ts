import { Column, Entity } from 'typeorm';
import { DefaultFields } from './default.schema';

@Entity()
export class Todo extends DefaultFields {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  done: boolean;
}
