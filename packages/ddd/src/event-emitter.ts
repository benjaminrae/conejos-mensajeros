import { type DomainEvent } from './domain-event';

export interface EventEmitter {
  emit(eventName: string, event: DomainEvent): boolean;
  emitAsync(eventName: string, event: DomainEvent): Promise<unknown>;
}
