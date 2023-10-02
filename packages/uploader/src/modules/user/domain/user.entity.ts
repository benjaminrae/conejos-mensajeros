import { AggregateRoot, UniqueEntityId } from '@conejos-mensajeros/ddd';
import { UserCreatedEvent } from './events/user-created.event';
import { CreateUserProps, UserProps } from './types';

export class User extends AggregateRoot<UserProps> {
  static create(props: CreateUserProps): User {
    const user = new User({
      id: new UniqueEntityId(),
      props,
    });

    user.addEvent(new UserCreatedEvent(user));

    return user;
  }

  protected validate(props: UserProps): void {
    if (!props.email) {
      throw new Error('email is required');
    }
  }
}
