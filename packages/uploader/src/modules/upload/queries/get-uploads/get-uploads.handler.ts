import { Either, failure, success } from '@conejos-mensajeros/ddd';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UploadResponseDTO } from '../../dto/upload.reponse.dto';
import { UploadReadRepository } from '../../persistence/upload-read.repository';
import { UploadKeys } from '../../upload.keys';
import { GetUploadsQuery } from './get-uploads.query';

@QueryHandler(GetUploadsQuery)
export class GetUploadsHandler implements IQueryHandler {
  constructor(
    @Inject(UploadKeys.UPLOAD_READ_REPOSITORY)
    private readonly uploadReadRepository: UploadReadRepository,
  ) {}

  async execute(
    query: GetUploadsQuery,
  ): Promise<Either<UploadResponseDTO[], Error>> {
    try {
      const uploads = await this.uploadReadRepository.getUploadsByOwnerId(
        query.ownerId,
      );

      const uploadViews = uploads.map((upload) =>
        this.uploadReadRepository.mapper.toPresenter(upload),
      ) as UploadResponseDTO[];

      return success(uploadViews);
    } catch (error) {
      console.error(error.message);
      return failure(error);
    }
  }
}
