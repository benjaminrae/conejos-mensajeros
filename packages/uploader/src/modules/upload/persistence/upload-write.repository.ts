import { WriteRepository } from '@conejos-mensajeros/ddd';
import { Inject, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TypeormWriteRepositoryAdapter } from 'src/modules/infrastructure/persistence/adapters/typeorm-write-repository.adapter';
import { DataSource } from 'typeorm';
import { Upload } from '../domain/upload.entity';
import { UploadMapper } from '../mappers/upload.mapper';
import { UploadKeys } from '../upload.keys';
import { UploadModel } from './upload.model';

export interface UploadWriteRepositoryPort extends WriteRepository<Upload> {}

export class UploadWriteRepository
  extends TypeormWriteRepositoryAdapter<Upload, UploadModel>
  implements UploadWriteRepositoryPort
{
  table: string = UploadKeys.UPLOAD_TABLE;

  constructor(
    datasource: DataSource,
    @Inject(UploadKeys.UPLOAD_MAPPER) mapper: UploadMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(
      datasource,
      mapper,
      eventEmitter,
      new Logger(UploadWriteRepository.constructor.name),
    );
  }
}
