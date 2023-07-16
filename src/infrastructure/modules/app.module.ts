import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'infrastructure/config/env.objects';
import { validate } from 'infrastructure/config/env.validation';
import { Orm } from 'infrastructure/database/orm';
import { TodoModule } from 'src/domain/modules/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    Orm.connect(),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
