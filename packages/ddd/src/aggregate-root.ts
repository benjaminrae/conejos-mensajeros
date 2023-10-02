import { type DomainEvent } from './domain-event';
import { Entity } from './entity';
import { type EventEmitter } from './event-emitter';
import { type Logger } from './logger';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  #domainEvents: DomainEvent[] = [];

  public clearEvents(): void {
    this.#domainEvents = [];
  }

  public async publishEvents(
    logger: Logger,
    eventEmitter: EventEmitter,
  ): Promise<void> {
    this.domainEvents.map(async event => {
      logger.debug(
        `[${event.constructor.name}][${
          this.constructor.name
        }] : publishing event : ${event.getAggregateId()} ${JSON.stringify(
          event,
        )}`,
      );

      return eventEmitter.emitAsync(event.constructor.name, event);
    });

    this.clearEvents();
  }

  public get domainEvents(): DomainEvent[] {
    return this.#domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this.#domainEvents.push(domainEvent);
  }
}
