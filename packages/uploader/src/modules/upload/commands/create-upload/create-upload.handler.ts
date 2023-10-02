import { Either, failure, success } from '@conejos-mensajeros/ddd';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Upload } from '../../domain/upload.entity';
import { UploadWriteRepositoryPort } from '../../persistence/upload-write.repository';
import { UploadKeys } from '../../upload.keys';
import { CreateUploadCommand } from './create-upload.command';

@CommandHandler(CreateUploadCommand)
export class CreateUploadHandler implements ICommandHandler {
  constructor(
    @Inject(UploadKeys.UPLOAD_WRITE_REPOSITORY)
    private readonly uploadWriteRepository: UploadWriteRepositoryPort,
  ) {}

  async execute(command: CreateUploadCommand): Promise<Either<string, Error>> {
    try {
      const upload = Upload.create({
        filename: command.filename,
        fileSize: command.fileSize,
        mimetype: command.mimetype,
        ownerId: command.userId,
        url: command.url,
        status: 'PENDING',
      });

      await this.uploadWriteRepository.create(upload);

      return success(upload.id);
    } catch (error) {
      return failure(error);
    }
  }
}
