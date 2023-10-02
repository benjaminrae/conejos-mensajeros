import { ReadRepository } from '@conejos-mensajeros/ddd';
import { Inject, Injectable } from '@nestjs/common';
import { TypeormReadRepositoryAdapter } from 'src/modules/infrastructure/persistence/adapters/typeorm-read-repository.adapter';
import { DataSource } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { UserKeys } from '../user.keys';
import { UserModel } from './models/user.model';

export interface UserReadRepositoryPort extends ReadRepository<User> {
  findByEmail(email: string): Promise<User | undefined>;
}

@Injectable()
export class UserReadRepository
  extends TypeormReadRepositoryAdapter<User, UserModel>
  implements UserReadRepositoryPort
{
  table = UserKeys.USER_TABLE;

  constructor(
    datasource: DataSource,
    @Inject(UserKeys.USER_MAPPER) mapper: UserMapper,
  ) {
    super(datasource, mapper);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.createQueryBuilder()
      .select()
      .from(this.table, 'user')
      .where('user.email = :email', { email })
      .execute();

    if (!user) {
      return undefined;
    }

    return this.mapper.toDomain(user as UserModel);
  }
}
