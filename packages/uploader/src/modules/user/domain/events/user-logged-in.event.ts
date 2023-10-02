import { DomainEvent, DomainEventProps } from '@conejos-mensajeros/ddd';
import { User } from '../user.entity';

export class UserLoggedInEvent extends DomainEvent {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_props: DomainEventProps<User>): void {
    return;
  }
}
