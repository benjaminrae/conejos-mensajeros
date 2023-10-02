import { Command, CommandProps } from '@conejos-mensajeros/ddd';
import { CreateUserCommandProps } from '../../domain/types';

export class CreateUserCommand extends Command {
  readonly email: string;
  readonly password: string;

  constructor(props: CommandProps<CreateUserCommandProps>) {
    super(props);

    this.email = props.email;
    this.password = props.password;
  }
}
