import { DomainEvent, DomainEventProps } from '@conejos-mensajeros/ddd';
import { Upload } from '../upload.entity';

export class FileUploadedEvent extends DomainEvent {
  #upload;

  constructor(upload: Upload) {
    super({
      aggregateId: upload.id.toString(),
      metadata: {
        timestamp: Date.now(),
      },
    });

    this.#upload = upload;
  }

  get upload() {
    return this.#upload;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_props: DomainEventProps<Upload>) {
    return;
  }
}
