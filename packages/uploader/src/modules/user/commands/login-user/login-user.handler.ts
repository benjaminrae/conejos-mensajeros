import { Either, failure, success } from '@conejos-mensajeros/ddd';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthKeys } from 'src/modules/auth/auth.keys';
import { TokenService } from '../../../auth/services/token.service';
import { JwtTokenPayload } from '../../../auth/types';
import { UserCredentialsReadRepositoryPort } from '../../persistence/user-credentials.read.repository';
import { UserReadRepositoryPort } from '../../persistence/user-read.repository';
import { PasswordService } from '../../services/password.service';
import { UserKeys } from '../../user.keys';
import { LoginUserCommand } from './login-user.command';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler {
  constructor(
    @Inject(UserKeys.USER_READ_REPOSITORY)
    private readonly userReadRepository: UserReadRepositoryPort,
    @Inject(UserKeys.USER_CREDENTIALS_READ_REPOSITORY)
    private readonly userCredentialsReadRepository: UserCredentialsReadRepositoryPort,
    @Inject(UserKeys.PASSWORD_SERVICE)
    private readonly passwordService: PasswordService,
    @Inject(AuthKeys.JWT_TOKEN_SERVICE)
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: LoginUserCommand): Promise<Either<string, Error>> {
    const user = await this.userReadRepository.findByEmail(command.email);

    if (user === undefined) {
      return failure(new Error('Invalid credentials'));
    }

    const userCredentials =
      await this.userCredentialsReadRepository.findByUserId(user.id);

    if (userCredentials === undefined) {
      return failure(new Error('User credentials not found'));
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      command.password,
      userCredentials.getProps().password,
    );

    if (!isPasswordValid) {
      return failure(new Error('Invalid credentials'));
    }

    const token = this.tokenService.generateToken<JwtTokenPayload>({
      id: user.id,
      email: user.getProps().email,
    });

    return success(token);
  }
}
