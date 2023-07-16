import { TodoCreateDTO } from 'src/application/dtos/todo/create.dto';
import { Todo } from '../entities/todo.entity';
import { IAbstractRepository } from './baseRepo.interface';

export interface TodoRepo extends IAbstractRepository<Todo> {
  getAll: () => Promise<Todo[]>;
  create: (createDto: TodoCreateDTO) => Promise<Todo[]>;
  update: (updateDto: TodoCreateDTO) => Promise<Todo>;
}
