import { Inject, Module, OnModuleInit, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateUploadHandler } from './commands/create-upload/create-upload.handler';
import { CreateUploadHttpController } from './commands/create-upload/create-upload.http.controller';
import { FinishProcessedUploadHandler } from './commands/finish-processed-upload/finish-processed-upload.handler';
import { StartProcessingUploadHandler } from './commands/start-processing-command/start-processing-upload.handler';
import { UploadMapper } from './mappers/upload.mapper';
import { UploadReadRepository } from './persistence/upload-read.repository';
import { UploadWriteRepository } from './persistence/upload-write.repository';
import { UploadModel } from './persistence/upload.model';
import { GetUploadsHandler } from './queries/get-uploads/get-uploads.handler';
import { GetUploadsHttpController } from './queries/get-uploads/get-uploads.http.controller';
import { FileUploadedSubscriber } from './subscribers/file-uploaded.subscriber';
import { ProcessorExchangeSubscriber } from './subscribers/processor-exchange.subscriber';
import { UploadKeys } from './upload.keys';

const httpControllers = [CreateUploadHttpController, GetUploadsHttpController];

const commandHandlers: Provider[] = [
  CreateUploadHandler,
  StartProcessingUploadHandler,
  FinishProcessedUploadHandler,
];

const queryHandlers: Provider[] = [GetUploadsHandler];

const writeRepositories: Provider[] = [
  {
    provide: UploadKeys.UPLOAD_WRITE_REPOSITORY,
    useClass: UploadWriteRepository,
  },
  {
    provide: UploadKeys.UPLOAD_READ_REPOSITORY,
    useClass: UploadReadRepository,
  },
];

const mappers: Provider[] = [
  {
    provide: UploadKeys.UPLOAD_MAPPER,
    useClass: UploadMapper,
  },
];

const subscribers: Provider[] = [
  FileUploadedSubscriber,
  {
    provide: UploadKeys.PROCESSOR_SUBSCRIBER,
    useClass: ProcessorExchangeSubscriber,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([UploadModel]),
    CqrsModule,
    AuthModule,
    MulterModule.register({
      dest: './uploads',
    }),
    InfrastructureModule,
  ],
  controllers: [...httpControllers],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...writeRepositories,
    ...mappers,
    ...subscribers,
  ],
})
export class UploadModule implements OnModuleInit {
  constructor(
    @Inject(UploadKeys.PROCESSOR_SUBSCRIBER)
    private readonly processorSubscriber: ProcessorExchangeSubscriber,
  ) {}

  onModuleInit() {
    this.processorSubscriber.subscribe();
  }
}
