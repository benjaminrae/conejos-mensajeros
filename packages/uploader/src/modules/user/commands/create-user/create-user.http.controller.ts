import { Either } from '@conejos-mensajeros/ddd';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserRequestDTO } from '../../dtos/create-user.request.dto';
import { CreateUserCommand } from './create-user.command';

@Controller('v1')
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The user already exists.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Post('users')
  async createUser(
    @Body(new ValidationPipe({ transform: true }))
    createUserRequestDTO: CreateUserRequestDTO,
  ) {
    console.log('createUserRequestDTO', createUserRequestDTO);
    const userCommand = new CreateUserCommand({
      email: createUserRequestDTO.email,
      password: createUserRequestDTO.password,
    });

    const userResult = await this.commandBus.execute<
      CreateUserCommand,
      Either<string, Error>
    >(userCommand);

    if (userResult.isFailure()) {
      console.error(userResult.value);
      throw userResult.value;
    }

    return {
      id: userResult.value,
    };
  }
}
