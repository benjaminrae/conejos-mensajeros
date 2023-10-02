import { Inject, Module, OnModuleInit, Provider } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { FileKeys } from './file.keys';
import { ProcessService } from './services/process.service';
import { SupabaseBackupService } from './services/supabase-backup.service';
import { FileBackedUpSubscriber } from './subscribers/file-backed-up.subscriber';
import { FileCreatedSubscriber } from './subscribers/file-created.subscriber';
import { FileDownloadedSubscriber } from './subscribers/file-downloaded.subscriber';
import { FileProcessedSubscriber } from './subscribers/file-processed.subscriber';
import { UploadsExchangeSubscriber } from './subscribers/upload-exchange.subscriber';

const subscribers: Provider[] = [
  {
    provide: FileKeys.UPLOADS_SUBSCRIBER,
    useClass: UploadsExchangeSubscriber,
  },
  {
    provide: FileKeys.PROCESS_SERVICE,
    useClass: ProcessService,
  },
  {
    provide: FileKeys.BACKUP_SERVICE,
    useClass: SupabaseBackupService,
  },
  FileCreatedSubscriber,
  FileDownloadedSubscriber,
  FileProcessedSubscriber,
  FileBackedUpSubscriber,
];

@Module({
  imports: [InfrastructureModule],
  providers: [...subscribers],
})
export class FileModule implements OnModuleInit {
  constructor(
    @Inject(FileKeys.UPLOADS_SUBSCRIBER)
    private readonly uploadsSubscriber: UploadsExchangeSubscriber,
  ) {}

  onModuleInit(): any {
    this.uploadsSubscriber.subscribe();
  }
}
