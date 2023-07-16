import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

type Db = {
  get: (service: ConfigService) => Record<string, any>;
};

export class TypeOrmInstance implements TypeOrmModule {
  databaseConfig: Db;
  constructor(servise: Db) {
    this.databaseConfig = servise;
  }
  connect() {
    const t = TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: this.databaseConfig.get,
      inject: [ConfigService],
    });
    return t;
  }

  forFeature(entities: any[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
