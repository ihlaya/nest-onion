import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { TodoRepository } from 'infrastructure/repositories/todo.repository';
import { TodoCreateDTO } from 'src/application/dtos/todo/create.dto';
import { TodoDeleteDTO } from 'src/application/dtos/todo/delete.dto';
import { TodoUpdateDTO } from 'src/application/dtos/todo/update.dto';
import { Todo } from '../entities/todo.entity';
import { TodoCompleteDTO } from './../../application/dtos/todo/complete.dto';

@Injectable()
export class TodoService {
  constructor(readonly todoRepository: TodoRepository) {}

  async findAll(): Promise<Todo[]> {
    const results: Todo[] = await this.todoRepository.getAll();
    return results;
  }

  async create(todoCreateDTO: TodoCreateDTO): Promise<Todo> {
    const errors = await validate(todoCreateDTO);

    if (errors.length) throw errors;

    const newTodo = await this.todoRepository.create(todoCreateDTO);
    return newTodo;
  }

  async update(todoUpdateDto: TodoUpdateDTO): Promise<Todo> {
    const errors = await validate(todoUpdateDto);

    if (errors.length) throw errors;

    const candidate = await this.todoRepository.getOneByParams({
      where: { id: todoUpdateDto.id },
    });
    candidate.title = todoUpdateDto.title;
    candidate.description = todoUpdateDto.description;

    const newTodo = await this.todoRepository.update(candidate);
    return newTodo;
  }

  async delete(todoDeleteDto: TodoDeleteDTO): Promise<Todo[]> {
    const errors = await validate(todoDeleteDto);

    if (errors.length) throw errors;

    await this.todoRepository.getOneByParams({
      where: { id: todoDeleteDto.id },
    });

    await this.todoRepository.delete(todoDeleteDto);

    return await this.todoRepository.getAll();
  }

  async complete(todoCompleteDTO: TodoCompleteDTO): Promise<Todo> {
    const errors = await validate(todoCompleteDTO);

    if (errors.length) throw errors;

    const candidate = await this.todoRepository.getOneByParams({
      where: { id: todoCompleteDTO.id },
    });

    candidate.done = todoCompleteDTO.done;

    const newTodo = await this.todoRepository.update(candidate);
    return newTodo;
  }
}
