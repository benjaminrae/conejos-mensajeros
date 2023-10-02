import { FileStrategy } from './file.strategy';
import { PdfStrategy } from './pdf.strategy';
import { SharpImageStrategy } from './sharp-image.strategy';
import { SkipStrategy } from './skip.strategy';
import { TextStrategy } from './text.strategy';
import { VideoStrategy } from './video.strategy';

const imageStrategy = new SharpImageStrategy();

export const mimetypeToStrategyMap: Record<string, FileStrategy> = {
  'image/jpeg': imageStrategy,
  'image/png': imageStrategy,
  'image/gif': imageStrategy,
  'image/webp': imageStrategy,
  'image/svg+xml': imageStrategy,
  'image/avif': imageStrategy,
  'image/jpg': imageStrategy,
  'application/pdf': new PdfStrategy(),
  'video/mp4': new VideoStrategy(),
  'text/plain': new TextStrategy(),
  skip: new SkipStrategy(),
};
