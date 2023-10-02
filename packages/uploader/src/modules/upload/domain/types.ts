export enum EUploadStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}

export type UploadStatus = `${EUploadStatus}`;

export type UploadProps = {
  ownerId: string;
  status: UploadStatus;
  filename: string;
  fileSize: number;
  mimetype: string;
  url: string;
};

export type CreateUploadProps = {
  ownerId: string;
  status: UploadStatus;
  filename: string;
  fileSize: number;
  mimetype: string;
  url: string;
};

export type CreateUploadCommandProps = {
  buffer: Buffer;
  userId: string;
  filename: string;
  mimetype: string;
  fileSize: number;
  url: string;
};
