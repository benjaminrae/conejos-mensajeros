import { DomainEvent, DomainEventProps } from '@conejos-mensajeros/ddd';
import { FileEntity } from '../file.entity';

export class FileCreatedEvent extends DomainEvent {
  #file: FileEntity;

  constructor(file: FileEntity) {
    super({
      aggregateId: file.id.toString(),
      metadata: {
        timestamp: Date.now(),
      },
    });

    this.#file = file;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_props: DomainEventProps<FileEntity>) {
    return;
  }

  get file() {
    return this.#file;
  }
}
