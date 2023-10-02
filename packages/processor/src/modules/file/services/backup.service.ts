import { FileEntity } from '../domain/file.entity';

export interface BackupService {
  backup(file: FileEntity): Promise<void>;
}
