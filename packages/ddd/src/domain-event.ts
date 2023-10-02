import { randomUUID } from 'node:crypto';

export type DomainEventMetadata = {
  [index: string]: unknown;
  readonly timestamp: number;
};

export type DomainEventProps<T> = T & {
  aggregateId: string;
  metadata?: DomainEventMetadata;
};

export abstract class DomainEvent {
  #id: string;
  #aggregateId: string;
  #timestamp: number;
  #metadata?: DomainEventMetadata;

  constructor(props: DomainEventProps<unknown>) {
    this.validate(props);
    this.#aggregateId = props.aggregateId;
    this.#metadata = props.metadata;
    this.#timestamp = props.metadata?.timestamp ?? Date.now();
    this.#id = randomUUID();
  }

  get id(): string {
    return this.#id;
  }

  getAggregateId(): string {
    return this.#aggregateId;
  }

  getDateOccurred(): Date {
    return new Date(this.#timestamp);
  }

  abstract validate(props: DomainEventProps<unknown>): void;
}
