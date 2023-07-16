import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { customExpectaionFactory } from 'infrastructure/helpers/exceptionFacroty';

import { AppModule } from 'infrastructure/modules';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: customExpectaionFactory,
    }),
  );

  await app.listen(5050, () => Logger.log('HTTP Service is listening', 'App'));
}
bootstrap();
