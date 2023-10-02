import { type Paginated } from './paginated';
import { type PaginatedQuery } from './query';

export interface ReadRepository<Entity> {
  findById(id: string): Promise<Entity>;
  findOne(query?: unknown): Promise<Entity>;
  findAll(query?: unknown): Promise<Entity[]>;
  findAllPaginated(query: PaginatedQuery<Entity>): Promise<Paginated<Entity>>;
}
