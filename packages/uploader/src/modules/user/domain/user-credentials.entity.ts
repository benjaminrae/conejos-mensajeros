import { AggregateRoot, UniqueEntityId } from '@conejos-mensajeros/ddd';
import { CreateUserCredentialsProps, UserCredentialsProps } from './types';

export class UserCredentials extends AggregateRoot<UserCredentialsProps> {
  static create(props: CreateUserCredentialsProps): UserCredentials {
    return new UserCredentials({
      id: new UniqueEntityId(),
      props,
    });
  }

  protected validate(props: UserCredentialsProps): void {
    if (!props.password) {
      throw new Error('password is required');
    }
  }
}
