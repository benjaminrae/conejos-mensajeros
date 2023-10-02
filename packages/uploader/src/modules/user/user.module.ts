import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CreateUserHandler } from './commands/create-user/create-user.handler';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { LoginUserHandler } from './commands/login-user/login-user.handler';
import { LoginUserHttpController } from './commands/login-user/login-user.http.controller';
import { UserCredentialsMapper } from './mappers/user-credentials.mapper';
import { UserMapper } from './mappers/user.mapper';
import { UserModel } from './persistence/models/user.model';
import { UserCredentialsWriteRepository } from './persistence/user-credentials-write.repository';
import { UserCredentialsReadRepository } from './persistence/user-credentials.read.repository';
import { UserReadRepository } from './persistence/user-read.repository';
import { UserWriteRepository } from './persistence/user-write.repository';
import { BcryptPasswordService } from './services/bcrypt-password.service';
import { UserKeys } from './user.keys';

const httpControllers = [CreateUserHttpController, LoginUserHttpController];

const commandHandlers: Provider[] = [CreateUserHandler, LoginUserHandler];

const queryHandlers: Provider[] = [];

const writeRepositories: Provider[] = [
  {
    provide: UserKeys.USER_WRITE_REPOSITORY,
    useClass: UserWriteRepository,
  },
  {
    provide: UserKeys.USER_CREDENTIALS_WRITE_REPOSITORY,
    useClass: UserCredentialsWriteRepository,
  },
];

const readRepositories: Provider[] = [
  {
    provide: UserKeys.USER_READ_REPOSITORY,
    useClass: UserReadRepository,
  },
  {
    provide: UserKeys.USER_CREDENTIALS_READ_REPOSITORY,
    useClass: UserCredentialsReadRepository,
  },
];

const mappers: Provider[] = [
  {
    provide: UserKeys.USER_MAPPER,
    useClass: UserMapper,
  },
  {
    provide: UserKeys.USER_CREDENTIALS_MAPPER,
    useClass: UserCredentialsMapper,
  },
];

const services: Provider[] = [
  {
    provide: UserKeys.PASSWORD_SERVICE,
    useClass: BcryptPasswordService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), CqrsModule, AuthModule],
  controllers: [...httpControllers],
  providers: [
    Logger,
    ...services,
    ...mappers,
    ...readRepositories,
    ...writeRepositories,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class UserModule {}
