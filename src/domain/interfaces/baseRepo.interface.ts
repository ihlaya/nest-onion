import {
  DeepPartial,
  FindOptionsRelationByString,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  QueryRunner,
  Repository,
} from 'typeorm';

export interface IAbstractRepository<Entity extends ObjectLiteral> {
  getByParams({
    where,
    limit,
    throwError,
    relations,
    qr,
  }: {
    where?: FindOptionsWhere<Entity>;
    limit?: number;
    throwError?: boolean;
    relations?: FindOptionsRelations<Entity> | FindOptionsRelationByString;
    qr?: QueryRunner;
  }): Promise<Entity[]>;

  getOneByParams({
    where,
    throwError,
    relations,
    qr,
  }: {
    where: FindOptionsWhere<Entity>;
    throwError?: boolean;
    relations?: FindOptionsRelations<Entity> | FindOptionsRelationByString;
    qr?: QueryRunner;
  }): Promise<Entity>;

  save(data: DeepPartial<Entity>, qr?: QueryRunner): Promise<Entity>;

  saveMany(data: DeepPartial<Entity>[], qr?: QueryRunner): Promise<Entity[]>;
  getRepository(qr?: QueryRunner): Repository<Entity>;
}
