import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class DefaultFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamptz', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
