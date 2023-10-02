import { FileEntity } from '../domain/file.entity';

export interface FileStrategy {
  execute(file: FileEntity): Promise<FileEntity>;
}
