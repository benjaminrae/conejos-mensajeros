import { DomainEvent, DomainEventProps } from '@conejos-mensajeros/ddd';
import { User } from '../user.entity';

export class UserCreatedEvent extends DomainEvent {
  #user: User;

  constructor(user: User) {
    super({
      aggregateId: user.id.toString(),
      metadata: {
        timestamp: Date.now(),
      },
    });

    this.#user = user;
  }

  get user(): User {
    return this.#user;
  }

  validate(props: DomainEventProps<User>): void {
    if (!props.aggregateId) {
      throw new Error('aggregateId is required');
    }
  }
}
