import { Command, CommandProps } from '@conejos-mensajeros/ddd';
import { LoginUserCommandProps } from '../../domain/types';

export class LoginUserCommand extends Command {
  readonly email: string;
  readonly password: string;

  constructor(props: CommandProps<LoginUserCommandProps>) {
    super(props);

    this.email = props.email;
    this.password = props.password;
  }
}
