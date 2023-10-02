import { AggregateRoot, UniqueEntityId } from '@conejos-mensajeros/ddd';
import { FileBackedUpEvent } from './events/file-backed-up.event';
import { FileCreatedEvent } from './events/file-created.event';
import { FileDownloadedEvent } from './events/file-downloaded.event';
import { FileProcessedEvent } from './events/file-processed.event';

export interface FileEntityProps {
  url: string;
  filename: string;
  fileSize: number;
  mimetype: string;
  uploadId: string;
  buffer: Buffer;
}

export class FileEntity extends AggregateRoot<FileEntityProps> {
  constructor(props: FileEntityProps) {
    super({
      id: new UniqueEntityId(),
      props,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected validate(_props: FileEntityProps): void {
    return;
  }

  static create(props: FileEntityProps): FileEntity {
    const file = new FileEntity(props);

    file.addEvent(new FileCreatedEvent(file));

    return file;
  }

  backup(backupUrl: string): void {
    this.update({
      url: backupUrl,
    });

    this.addEvent(new FileBackedUpEvent(this));
  }

  download(buffer: Buffer): void {
    this.update({
      buffer,
    });

    this.addEvent(new FileDownloadedEvent(this));
  }

  process(file: FileEntityProps): void {
    this.update(file);

    this.addEvent(new FileProcessedEvent(this));
  }
}
