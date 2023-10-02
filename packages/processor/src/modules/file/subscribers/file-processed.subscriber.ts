import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FileProcessedEvent } from '../domain/events/file-processed.event';
import { FileKeys } from '../file.keys';
import { BackupService } from '../services/backup.service';

export class FileProcessedSubscriber {
  constructor(
    @Inject(FileKeys.BACKUP_SERVICE) private backupService: BackupService,
  ) {}

  @OnEvent(FileProcessedEvent.name)
  async handle(event: FileProcessedEvent) {
    const file = event.file;

    await this.backupService.backup(file);
  }
}
