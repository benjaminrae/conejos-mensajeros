import { DomainEvent } from '@conejos-mensajeros/ddd';
import { Upload } from '../upload.entity';

export class UploadFinishedEvent extends DomainEvent {
  #upload: Upload;

  constructor(upload: Upload) {
    super({
      aggregateId: upload.id.toString(),
      metadata: {
        timestamp: Date.now(),
      },
    });

    this.#upload = upload;
  }

  validate(): void {
    return;
  }

  get upload(): Upload {
    return this.#upload;
  }
}
