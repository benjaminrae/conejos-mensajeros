import { Either, failure, success } from '@conejos-mensajeros/ddd';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UploadReadRepository } from '../../persistence/upload-read.repository';
import { UploadWriteRepository } from '../../persistence/upload-write.repository';
import { UploadKeys } from '../../upload.keys';
import { FinishProcessedUploadCommand } from './finish-processed-upload.command';

@CommandHandler(FinishProcessedUploadCommand)
export class FinishProcessedUploadHandler {
  constructor(
    @Inject(UploadKeys.UPLOAD_READ_REPOSITORY)
    private readonly uploadReadRepository: UploadReadRepository,
    @Inject(UploadKeys.UPLOAD_WRITE_REPOSITORY)
    private readonly uploadWriteRepository: UploadWriteRepository,
  ) {}

  async execute(
    command: FinishProcessedUploadCommand,
  ): Promise<Either<string, Error>> {
    try {
      const persistedUpload = await this.uploadReadRepository.findById(
        command.upload.uploadId,
      );

      persistedUpload.update(command.upload);
      persistedUpload.finish();

      await this.uploadWriteRepository.update(persistedUpload);
      return success(persistedUpload.id);
    } catch (error) {
      console.error(error.message);
      return failure(error);
    }
  }
}
