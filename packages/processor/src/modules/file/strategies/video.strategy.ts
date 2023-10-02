import { FileEntity } from '../domain/file.entity';
import { FileStrategy } from './file.strategy';

export class VideoStrategy implements FileStrategy {
  async execute(file: FileEntity): Promise<FileEntity> {
    await new Promise((resolve) => setTimeout(resolve, 240000));

    return file;
  }
}
