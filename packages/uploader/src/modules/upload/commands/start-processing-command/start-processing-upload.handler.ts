import { Either, failure, success } from '@conejos-mensajeros/ddd';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UploadWriteRepository } from '../../persistence/upload-write.repository';
import { UploadKeys } from '../../upload.keys';
import { StartProcessingUploadCommand } from './start-processing-upload.command';

@CommandHandler(StartProcessingUploadCommand)
export class StartProcessingUploadHandler implements ICommandHandler {
  constructor(
    @Inject(UploadKeys.UPLOAD_WRITE_REPOSITORY)
    private readonly uploadWriteRepository: UploadWriteRepository,
  ) {}

  async execute(
    command: StartProcessingUploadCommand,
  ): Promise<Either<string, Error>> {
    try {
      const upload = command.upload;
      upload.process();

      await this.uploadWriteRepository.update(upload);
      return success(upload.id);
    } catch (error) {
      console.error(error.message);
      return failure(error);
    }
  }
}
