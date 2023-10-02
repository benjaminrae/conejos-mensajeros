import { Mapper, UniqueEntityId } from '@conejos-mensajeros/ddd';
import { UploadStatus } from '../domain/types';
import { Upload } from '../domain/upload.entity';
import { UploadResponseDTO } from '../dto/upload.reponse.dto';
import { UploadModel } from '../persistence/upload.model';

export class UploadMapper
  implements Mapper<Upload, UploadModel, UploadResponseDTO>
{
  toPresenter(entity: Upload): UploadResponseDTO {
    const props = entity.getProps();

    return new UploadResponseDTO({
      id: entity.id.toString(),
      filename: props.filename,
      mimetype: props.mimetype,
      fileSize: props.fileSize,
      ownerId: props.ownerId,
      url: props.url,
      status: props.status,
    });
  }
  public toDomain(model: UploadModel): Upload {
    const upload = new Upload({
      id: new UniqueEntityId(model.id),
      createdAt: model.created_at,
      updatedAt: model.updated_at,
      props: {
        filename: model.filename,
        mimetype: model.mimetype,
        fileSize: model.file_size,
        ownerId: model.owner_id,
        status: model.status as UploadStatus,
        url: model.url,
      },
    });

    return upload;
  }

  public toPersistence(entity: Upload): UploadModel {
    const uploadModel = new UploadModel();

    const uploadProps = entity.getProps();

    uploadModel.id = entity.id;
    uploadModel.filename = uploadProps.filename;
    uploadModel.mimetype = uploadProps.mimetype;
    uploadModel.file_size = uploadProps.fileSize;
    uploadModel.created_at = entity.createdAt;
    uploadModel.updated_at = entity.updatedAt;
    uploadModel.owner_id = uploadProps.ownerId;
    uploadModel.status = uploadProps.status;
    uploadModel.url = uploadProps.url;

    return uploadModel;
  }
}
