import {
  AggregateRoot,
  EventEmitter,
  Logger,
  Mapper,
  WriteRepository,
} from '@conejos-mensajeros/ddd';
import { DataSource } from 'typeorm';

export abstract class TypeormWriteRepositoryAdapter<
  DomainEntity extends AggregateRoot<unknown>,
  PersistedModel extends object,
> implements WriteRepository<DomainEntity>
{
  abstract table: string;

  constructor(
    private readonly datasource: DataSource,
    protected readonly mapper: Mapper<DomainEntity, PersistedModel>,
    protected readonly eventEmitter: EventEmitter,
    protected readonly logger: Logger,
  ) {}

  async create(entity: DomainEntity): Promise<DomainEntity> {
    const model = this.mapper.toPersistence(entity);

    const [persistedModel] = await this.datasource.query(
      `INSERT INTO ${this.table} (${Object.keys(model).join(
        ', ',
      )}) VALUES (${Object.keys(model)
        .map((_, index) => `$${index + 1}`)
        .join(', ')}) RETURNING *`,
      Object.values(model),
    );

    console.log(entity.domainEvents);
    entity.publishEvents(this.logger, this.eventEmitter);

    return this.mapper.toDomain(persistedModel);
  }

  async update(entity: DomainEntity): Promise<DomainEntity> {
    const model = this.mapper.toPersistence(entity);

    const persistedModel = await this.datasource.query(
      `UPDATE ${this.table} SET ${Object.keys(model)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ')} WHERE id = $${Object.keys(model).length + 1} RETURNING *`,
      [...Object.values(model), entity.id],
    );

    entity.publishEvents(this.logger, this.eventEmitter);

    return this.mapper.toDomain(persistedModel);
  }

  async delete(entity: DomainEntity): Promise<DomainEntity> {
    await this.datasource.query(
      `DELETE FROM ${this.table} WHERE id = $1 RETURNING *`,
      [entity.id],
    );

    entity.publishEvents(this.logger, this.eventEmitter);

    return entity;
  }

  createQueryBuilder() {
    const queryBuilder = this.datasource.createQueryBuilder();

    return queryBuilder;
  }
}
