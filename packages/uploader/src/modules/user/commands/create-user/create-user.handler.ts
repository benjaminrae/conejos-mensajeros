import {
  Either,
  WriteRepository,
  failure,
  success,
} from '@conejos-mensajeros/ddd';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserCredentials } from '../../domain/user-credentials.entity';
import { User } from '../../domain/user.entity';
import { PasswordService } from '../../services/password.service';
import { UserKeys } from '../../user.keys';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler {
  constructor(
    @Inject(UserKeys.USER_WRITE_REPOSITORY)
    protected readonly userWriteRepository: WriteRepository<User>,
    @Inject(UserKeys.USER_CREDENTIALS_WRITE_REPOSITORY)
    protected readonly userCredentialsWriteRepository: WriteRepository<UserCredentials>,
    @Inject(UserKeys.PASSWORD_SERVICE)
    protected readonly passwordService: PasswordService,
  ) {}

  async execute(command: CreateUserCommand): Promise<Either<string, Error>> {
    try {
      const user = User.create({
        email: command.email,
      });

      const password = await this.passwordService.hashPassword(
        command.password,
      );

      const userCredentials = UserCredentials.create({
        password,
        userId: user.id,
      });

      await this.userWriteRepository.create(user);
      await this.userCredentialsWriteRepository.create(userCredentials);

      return success(user.id);
    } catch (error) {
      return failure(error);
    }
  }
}
