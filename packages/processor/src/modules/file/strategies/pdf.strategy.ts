import { FileEntity } from '../domain/file.entity';
import { FileStrategy } from './file.strategy';

export class PdfStrategy implements FileStrategy {
  async execute(file: FileEntity): Promise<FileEntity> {
    await new Promise((resolve) => setTimeout(resolve, 60000));

    return file;
  }
}
