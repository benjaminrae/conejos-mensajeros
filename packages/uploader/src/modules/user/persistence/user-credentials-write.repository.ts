import { WriteRepository } from '@conejos-mensajeros/ddd';
import { Inject, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TypeormWriteRepositoryAdapter } from 'src/modules/infrastructure/persistence/adapters/typeorm-write-repository.adapter';
import { DataSource } from 'typeorm';
import { UserCredentials } from '../domain/user-credentials.entity';
import { UserCredentialsMapper } from '../mappers/user-credentials.mapper';
import { UserKeys } from '../user.keys';
import { UserCredentialsModel } from './models/user-credentials.model';

export class UserCredentialsWriteRepository
  extends TypeormWriteRepositoryAdapter<UserCredentials, UserCredentialsModel>
  implements WriteRepository<UserCredentials>
{
  table = UserKeys.USER_CREDENTIALS_TABLE;

  constructor(
    datasource: DataSource,
    @Inject(UserKeys.USER_CREDENTIALS_MAPPER) mapper: UserCredentialsMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(
      datasource,
      mapper,
      eventEmitter,
      new Logger(UserCredentialsWriteRepository.name),
    );
  }
}
