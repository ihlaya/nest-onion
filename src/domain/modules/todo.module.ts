import { Module } from '@nestjs/common';
import { Orm } from 'infrastructure/database/orm';
import { TodoRepository } from 'infrastructure/repositories/todo.repository';
import { TodoController } from 'src/application/controllers/todo.controller';
import { Todo } from '../entities/todo.entity';
import { TodoService } from '../services/todo.service';

@Module({
  imports: [Orm.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
  exports: [TodoService, TodoRepository],
})
export class TodoModule {}
