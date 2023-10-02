import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FileDownloadedEvent } from '../domain/events/file-downloaded.event';
import { FileKeys } from '../file.keys';
import { ProcessService } from '../services/process.service';
import { mimetypeToStrategyMap } from '../strategies/mimetype-strategy-map';

export class FileDownloadedSubscriber {
  constructor(
    @Inject(FileKeys.PROCESS_SERVICE) private processService: ProcessService,
  ) {}

  @OnEvent(FileDownloadedEvent.name)
  handle(event: FileDownloadedEvent) {
    const file = event.file;

    const mimetype = file.getProps().mimetype;
    const strategy =
      mimetypeToStrategyMap[mimetype] ?? mimetypeToStrategyMap.skip;

    this.processService.setStrategy(strategy);
    this.processService.process(file);
  }
}
