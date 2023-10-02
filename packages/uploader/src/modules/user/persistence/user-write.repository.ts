import { WriteRepository } from '@conejos-mensajeros/ddd';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TypeormWriteRepositoryAdapter } from 'src/modules/infrastructure/persistence/adapters/typeorm-write-repository.adapter';
import { DataSource } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { UserKeys } from '../user.keys';
import { UserModel } from './models/user.model';

@Injectable()
export class UserWriteRepository
  extends TypeormWriteRepositoryAdapter<User, UserModel>
  implements WriteRepository<User>
{
  table = UserKeys.USER_TABLE;

  constructor(
    datasource: DataSource,
    @Inject(UserKeys.USER_MAPPER) mapper: UserMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(
      datasource,
      mapper,
      eventEmitter,
      new Logger(UserWriteRepository.name),
    );
  }
}
