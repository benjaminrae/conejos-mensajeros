import { Inject } from '@nestjs/common';
import { TypeormReadRepositoryAdapter } from 'src/modules/infrastructure/persistence/adapters/typeorm-read-repository.adapter';
import { DataSource } from 'typeorm';
import { Upload } from '../domain/upload.entity';
import { UploadMapper } from '../mappers/upload.mapper';
import { UploadKeys } from '../upload.keys';
import { UploadModel } from './upload.model';

export interface UploadReadRepositoryPort {
  getUploadsByOwnerId(ownerId: string): Promise<Upload[]>;
}

export class UploadReadRepository
  extends TypeormReadRepositoryAdapter<Upload, UploadModel>
  implements UploadReadRepositoryPort
{
  table: string = UploadKeys.UPLOAD_TABLE;

  constructor(
    datasource: DataSource,
    @Inject(UploadKeys.UPLOAD_MAPPER) mapper: UploadMapper,
  ) {
    super(datasource, mapper);
  }

  async getUploadsByOwnerId(ownerId: string): Promise<Upload[]> {
    const uploads: UploadModel[] = await this.createQueryBuilder()
      .select()
      .from(this.table, 'upload')
      .where('upload.owner_id = :ownerId', { ownerId })
      .execute();

    return uploads.map((upload) => this.mapper.toDomain(upload));
  }
}
