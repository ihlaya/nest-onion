import {
  DatabaseException,
  NotFoundException,
} from 'infrastructure/exceptions';
import { IAbstractRepository } from 'src/domain/interfaces/baseRepo.interface';

import {
  DataSource,
  DeepPartial,
  EntityTarget,
  FindOptionsRelationByString,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  QueryRunner,
} from 'typeorm';

export function BaseRepository<Entity extends ObjectLiteral>(
  ref: EntityTarget<Entity>,
): {
  new (dataSource: DataSource): IAbstractRepository<Entity>;
} {
  abstract class AbstractRepository implements IAbstractRepository<Entity> {
    constructor(protected readonly dataSource: DataSource) {}

    async getByParams(
      {
        where,
        limit,
        throwError = true,
        relations = [],
        qr,
      }: {
        where?: FindOptionsWhere<Entity>;
        limit?: number;
        throwError?: boolean;
        relations?: FindOptionsRelations<Entity> | FindOptionsRelationByString;
        qr?: QueryRunner;
      } = { throwError: true },
    ): Promise<Entity[]> {
      try {
        const repo = this.getRepository(qr);
        const data = await repo.find({
          where: where,
          take: limit,
          relations,
        });

        if (throwError && (!data || !data?.length)) {
          throw new NotFoundException('Data not found!', { where });
        }

        return data;
      } catch (error) {
        if (error instanceof NotFoundException) throw error;
        throw new DatabaseException(error.message, error);
      }
    }

    async getOneByParams({
      where,
      throwError = true,
      relations = [],
      qr,
    }: {
      where: FindOptionsWhere<Entity>;
      throwError?: boolean;
      relations?: FindOptionsRelations<Entity> | FindOptionsRelationByString;
      qr?: QueryRunner;
    }): Promise<Entity> {
      const data = await this.getByParams({
        where,
        limit: 1,
        throwError,
        relations,
        qr,
      });
      return data[0];
    }

    async save(data: DeepPartial<Entity>, qr?: QueryRunner): Promise<Entity> {
      try {
        const repo = this.getRepository(qr);

        return await repo.save(data);
      } catch (error) {
        throw new DatabaseException(error.message, error);
      }
    }

    async saveMany(
      data: DeepPartial<Entity>[],
      qr?: QueryRunner,
    ): Promise<Entity[]> {
      try {
        const repo = this.getRepository(qr);

        return await repo.save(data);
      } catch (error) {
        throw new DatabaseException(error.message, error);
      }
    }

    getRepository(qr?: QueryRunner) {
      if (qr) {
        return qr.manager.getRepository(ref);
      }
      return this.dataSource.getRepository(ref);
    }
  }

  return AbstractRepository as any;
}
