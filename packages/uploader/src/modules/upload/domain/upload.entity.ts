import { AggregateRoot, UniqueEntityId } from '@conejos-mensajeros/ddd';
import { FileUploadedEvent } from './events/file-uploaded.event';
import { UploadFinishedEvent } from './events/upload-finished.event';
import { UploadProcessingEvent } from './events/upload-processing.event';
import { UploadProps } from './types';

export class Upload extends AggregateRoot<UploadProps> {
  static create(props: UploadProps): Upload {
    const upload = new Upload({
      id: new UniqueEntityId(),
      props,
    });

    upload.addEvent(new FileUploadedEvent(upload));

    return upload;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected validate(props: UploadProps): void {
    return;
  }

  process() {
    this.update({
      status: 'PROCESSING',
    });

    this.addEvent(new UploadProcessingEvent(this));
  }

  finish() {
    this.update({
      status: 'FINISHED',
    });

    this.addEvent(new UploadFinishedEvent(this));
  }
}
