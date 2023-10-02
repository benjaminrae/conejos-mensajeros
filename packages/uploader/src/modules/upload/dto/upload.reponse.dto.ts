export class UploadResponseDTO {
  url: string;
  id: string;
  filename: string;
  mimetype: string;
  fileSize: number;
  ownerId: string;
  status: string;

  constructor(props: UploadResponseDTO) {
    this.url = props.url;
    this.id = props.id;
    this.filename = props.filename;
    this.mimetype = props.mimetype;
    this.fileSize = props.fileSize;
    this.ownerId = props.ownerId;
    this.status = props.status;
  }
}
