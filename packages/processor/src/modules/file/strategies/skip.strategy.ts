import { FileEntity } from '../domain/file.entity';
import { FileStrategy } from './file.strategy';

export class SkipStrategy implements FileStrategy {
  async execute(file: FileEntity) {
    await new Promise((resolve) => setTimeout(resolve, 60000));

    return file;
  }
}
