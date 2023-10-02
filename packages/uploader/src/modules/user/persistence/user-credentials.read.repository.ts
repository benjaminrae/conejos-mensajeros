import { ReadRepository } from '@conejos-mensajeros/ddd';
import { Inject } from '@nestjs/common';
import { TypeormReadRepositoryAdapter } from 'src/modules/infrastructure/persistence/adapters/typeorm-read-repository.adapter';
import { DataSource } from 'typeorm';
import { UserCredentials } from '../domain/user-credentials.entity';
import { UserCredentialsMapper } from '../mappers/user-credentials.mapper';
import { UserKeys } from '../user.keys';
import { UserCredentialsModel } from './models/user-credentials.model';

export interface UserCredentialsReadRepositoryPort
  extends ReadRepository<UserCredentials> {
  findByUserId(userId: string): Promise<UserCredentials | undefined>;
}

export class UserCredentialsReadRepository
  extends TypeormReadRepositoryAdapter<UserCredentials, UserCredentialsModel>
  implements UserCredentialsReadRepositoryPort
{
  table = UserKeys.USER_CREDENTIALS_TABLE;

  constructor(
    datasource: DataSource,
    @Inject(UserKeys.USER_CREDENTIALS_MAPPER) mapper: UserCredentialsMapper,
  ) {
    super(datasource, mapper);
  }

  async findByUserId(userId: string): Promise<UserCredentials | undefined> {
    const [userCredentials] = await this.createQueryBuilder()
      .select()
      .from(this.table, 'credentials')
      .where('credentials.user_id = :userId', { userId })
      .execute();

    if (!userCredentials) {
      return undefined;
    }

    return this.mapper.toDomain(userCredentials as UserCredentialsModel);
  }
}
