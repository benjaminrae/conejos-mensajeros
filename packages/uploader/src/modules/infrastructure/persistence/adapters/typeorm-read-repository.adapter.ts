import {
  AggregateRoot,
  Mapper,
  Paginated,
  PaginatedQuery,
  Query,
  ReadRepository,
} from '@conejos-mensajeros/ddd';
import { DataSource } from 'typeorm';

export abstract class TypeormReadRepositoryAdapter<
  DomainEntity extends AggregateRoot<unknown>,
  PersistedModel extends object,
> implements ReadRepository<DomainEntity>
{
  abstract table: string;

  constructor(
    private readonly datasource: DataSource,
    public readonly mapper: Mapper<DomainEntity, PersistedModel>,
  ) {}

  async findOne(query?: unknown): Promise<DomainEntity> {
    const entity: PersistedModel = await this.datasource.query(
      `SELECT * FROM ${this.table} WHERE ${query}`,
    );

    return this.mapper.toDomain(entity);
  }

  async findById(id: string): Promise<DomainEntity> {
    const [entity] = await this.createQueryBuilder()
      .select()
      .from(this.table, 'entity')
      .where('entity.id = :id', { id })
      .execute();

    if (!entity) {
      throw new Error(`Entity with id ${id} not found`);
    }

    return this.mapper.toDomain(entity);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(query: Query): Promise<DomainEntity[]> {
    const entities: PersistedModel[] = await this.datasource.query(
      `SELECT * FROM ${this.table}`,
    );

    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findAllPaginated(
    query: PaginatedQuery<DomainEntity>,
  ): Promise<Paginated<DomainEntity>> {
    const pagination = query.pagination;

    const entities: PersistedModel[] = await this.datasource.query(
      `SELECT * FROM ${this.table} LIMIT $1 OFFSET $2`,
      [pagination.limit, pagination.offset],
    );

    const data = entities.map((entity) => this.mapper.toDomain(entity));

    return new Paginated<DomainEntity>({
      count: data.length,
      page: pagination.page,
      limit: pagination.limit,
      data,
    });
  }

  createQueryBuilder() {
    const queryBuilder = this.datasource.createQueryBuilder();

    return queryBuilder;
  }
}
