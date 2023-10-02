export interface UploadState {
  uploads: Upload[];
}

export interface Upload {
  id: string;
  filename: string;
  fileSize: number;
  mimetype: string;
  status: string;
  url: string;
}
