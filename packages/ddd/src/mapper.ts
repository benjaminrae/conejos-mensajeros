import { type Entity } from './entity';

export interface Mapper<
  DomainEntity extends Entity<unknown>,
  DataModel,
  Response = unknown,
> {
  toDomain(data: DataModel): DomainEntity;
  toPersistence(domainEntity: DomainEntity): DataModel;
  toPresenter(domainEntity: DomainEntity): Response;
}
