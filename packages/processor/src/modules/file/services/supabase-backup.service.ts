import { Inject, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InfrastructureKeys } from 'src/modules/infrastructure/infrastructure.keys';
import { SupabaseClient } from 'src/modules/infrastructure/storage/supabase.client';
import { FileEntity } from '../domain/file.entity';
import { BackupService } from './backup.service';

export class SupabaseBackupService implements BackupService {
  constructor(
    @Inject(InfrastructureKeys.SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
    private eventEmitter: EventEmitter2,
  ) {}

  async backup(file: FileEntity): Promise<void> {
    console.log(file.getProps());

    const backup = await this.supabaseClient.defaultBucket.upload(
      file.getProps().filename,
      file.getProps().buffer,
    );

    if (backup.error) {
      throw new Error(backup.error.message);
    }

    const {
      data: { publicUrl },
    } = await this.supabaseClient.defaultBucket.getPublicUrl(
      file.getProps().filename,
    );

    file.backup(publicUrl);

    file.publishEvents(new Logger(), this.eventEmitter);
  }
}
