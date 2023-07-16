import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from 'src/domain/entities/todo.entity';
import { TodoService } from 'src/domain/services/todo.service';
import { TodoCreateDTO } from '../dtos/todo/create.dto';
import { TodoDeleteDTO } from '../dtos/todo/delete.dto';
import { TodoUpdateDTO } from '../dtos/todo/update.dto';
import { TodoCompleteDTO } from '../dtos/todo/complete.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    const todos = await this.todoService.findAll();
    // const dtos: MovieGetDTO[] = movies.map((movie) => new MovieGetDTO(movie));

    return todos;
  }

  @Post()
  async create(@Body() todoCreateDTO: TodoCreateDTO): Promise<Todo> {
    const dto = new TodoCreateDTO(todoCreateDTO);
    const todo = await this.todoService.create(dto);
    return todo;
  }

  @Put()
  async update(@Body() todoUpdateDto: TodoUpdateDTO): Promise<Todo> {
    const dto = new TodoUpdateDTO(todoUpdateDto);
    const todo = await this.todoService.update(dto);
    return todo;
  }

  @Delete()
  async delete(@Body() todoDeleteDto: TodoDeleteDTO): Promise<Todo[]> {
    const dto = new TodoDeleteDTO(todoDeleteDto);
    const todo = await this.todoService.delete(dto);
    return todo;
  }

  @Patch()
  async complete(@Body() todoCompleteDto: TodoCompleteDTO): Promise<Todo> {
    const dto = new TodoCompleteDTO(todoCompleteDto);
    const todo = await this.todoService.complete(dto);
    return todo;
  }
}
