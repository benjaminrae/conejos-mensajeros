import { Either } from '@conejos-mensajeros/ddd';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserRequestDTO } from '../../dtos/login-user.request.dto';
import { LoginUserCommand } from './login-user.command';

@Controller('v1')
export class LoginUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Post('login')
  async loginUser(@Body() loginUserRequestDTO: LoginUserRequestDTO): Promise<{
    token: string;
  }> {
    const loginUserCommand = new LoginUserCommand({
      email: loginUserRequestDTO.email,
      password: loginUserRequestDTO.password,
    });

    const loginUserResult = await this.commandBus.execute<
      LoginUserCommand,
      Either<string, Error>
    >(loginUserCommand);

    if (loginUserResult.isFailure()) {
      console.error(loginUserResult.value);
      throw loginUserResult.value;
    }

    return {
      token: loginUserResult.value,
    };
  }
}
