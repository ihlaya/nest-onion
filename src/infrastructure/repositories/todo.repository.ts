import { Injectable } from '@nestjs/common';
import { runWithQueryRunner } from 'infrastructure/helpers/queryRunner';
import { Todo } from 'src/domain/entities/todo.entity';
import { TodoRepo } from 'src/domain/interfaces/todoRepo.interface';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';

@Injectable()
export class TodoRepository extends BaseRepository(Todo) implements TodoRepo {
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource);
  }
  async create(todoCreateDTO) {
    return await runWithQueryRunner(this.dataSource, async (qr) => {
      const todoRepository = this.getRepository(qr);
      return await todoRepository.save(todoCreateDTO);
    });
  }

  async getAll() {
    return await runWithQueryRunner(this.dataSource, async (qr) => {
      const todoRepository = this.getRepository(qr);
      return await todoRepository.find();
    });
  }

  async update(todoUpdateDTO) {
    return await runWithQueryRunner(this.dataSource, async (qr) => {
      const todoRepository = this.getRepository(qr);
      return await todoRepository.save(todoUpdateDTO);
    });
  }
  async delete(todoDeleteDTO) {
    return await runWithQueryRunner(this.dataSource, async (qr) => {
      const todoRepository = this.getRepository(qr);
      return await todoRepository.delete({ id: todoDeleteDTO.id });
    });
  }
}
