export class UpdateProcessedUploadDTO {
  uploadId: string;
  mimetype: string;
  filename: string;
  fileSize: number;
  url: string;

  constructor(props: UpdateProcessedUploadDTO) {
    this.uploadId = props.uploadId;
    this.mimetype = props.mimetype;
    this.filename = props.filename;
    this.fileSize = props.fileSize;
    this.url = props.url;
  }
}
